import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken, RouletteGame } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SDSToken", function () {
    let instance: SDSToken;
    let RouletteInstance: RouletteGame;
    let player1: HardhatEthersSigner;
    //let player1Address: string;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SDSToken");
        instance = await ContractFactory.deploy();
        await instance.waitForDeployment();
        const gameAddress = await instance.rouletteContract();
        RouletteInstance = await ethers.getContractAt("RouletteGame", gameAddress);
        let otherSigners: HardhatEthersSigner[] = [];
        [player1, ...otherSigners] = await ethers.getSigners();
        //player1Address = await player1.getAddress();
        const mintAmount = 100n;
        await instance.mint(await player1.getAddress(), mintAmount);
        for (const signer of otherSigners) {
            await instance.mint(await signer.getAddress(), mintAmount);
        }
    });
    it("A Winning player should get the tokens, and a losing player should lose his tokens", async function () {
        const amount_of_retries = 10;
        const chosen_color = 2;
        const betted_amount = 10;
        for (let i = 0; i < amount_of_retries; i++) {
            const balance_before_play = await instance.connect(player1).myBalance();
            await instance.connect(player1).playRoulette(betted_amount, chosen_color);
            const balance_after_play = await instance.connect(player1).myBalance();
            const resultColor = await RouletteInstance.getResult();
            expect(balance_before_play).to.not.equal(balance_after_play);
            if (chosen_color == resultColor) {
                expect(balance_before_play).to.lessThan(balance_after_play);
            } else {
                expect(balance_before_play).to.greaterThan(balance_after_play);
            }
        }
    });
});
