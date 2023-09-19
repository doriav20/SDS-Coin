import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken, RouletteGame } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SDSToken", function () {
    let instance: SDSToken;
    let RouletteInstance: RouletteGame;
    let player1: HardhatEthersSigner;
    enum colors {
        red,
        green,
        black,
    }

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
        const chosen_color = colors.black;
        const bettedAmountOnRed = 0n;
        const bettedAmountOnGreen = 0n;
        const bettedAmountOnBlack = 10n;

        for (let i = 0; i < amount_of_retries; i++) {
            const balance_before_play = await instance.connect(player1).myBalance();
            await instance.connect(player1).playRoulette(bettedAmountOnRed, bettedAmountOnGreen, bettedAmountOnBlack);
            const balance_after_play = await instance.connect(player1).myBalance();
            const resultColor = await RouletteInstance.getResult();
            //console.log(resultColor + ":" + balance_before_play + "," + balance_after_play);
            expect(balance_before_play).to.not.equal(balance_after_play);
            if (chosen_color == resultColor) {
                expect(balance_before_play).to.lessThan(balance_after_play);
            } else {
                expect(balance_before_play).to.greaterThan(balance_after_play);
            }
        }
    });
    it("When betting on both red and black nothing the balance shouldn't change or lose twice the amount", async function () {
        const amount_of_retries = 5;
        const bettedAmountOnRed = 10n;
        const bettedAmountOnGreen = 0n;
        const bettedAmountOnBlack = 10n;

        for (let i = 0; i < amount_of_retries; i++) {
            const balance_before_play = await instance.connect(player1).myBalance();
            await instance.connect(player1).playRoulette(bettedAmountOnRed, bettedAmountOnGreen, bettedAmountOnBlack);
            const balance_after_play = await instance.connect(player1).myBalance();
            const resultColor = await RouletteInstance.getResult();
            if (resultColor != colors.green) {
                expect(balance_before_play).to.equal(balance_after_play); //
            } else {
                expect(balance_before_play - bettedAmountOnRed - bettedAmountOnBlack).to.equal(balance_after_play);
            }
        }
    });
});
