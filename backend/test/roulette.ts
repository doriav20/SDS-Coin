import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Roulette", function () {
    let instance: SDSToken;
    let player1: HardhatEthersSigner;
    enum Color {
        UNKNOWN,
        RED,
        GREEN,
        BLACK,
    }

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SDSToken");
        instance = await ContractFactory.deploy();
        await instance.waitForDeployment();
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
        const chosen_color = Color.BLACK;
        const bettedAmountOnRed = 0n;
        const bettedAmountOnGreen = 0n;
        const bettedAmountOnBlack = 10n;

        for (let i = 0; i < amount_of_retries; i++) {
            const balance_before_play = await instance.connect(player1).myBalance();
            await instance.connect(player1).playRoulette(bettedAmountOnRed, bettedAmountOnGreen, bettedAmountOnBlack);
            const balance_after_play = await instance.connect(player1).myBalance();
            const resultColor = await instance.connect(player1).getRouletteResultForPlayer();
            expect(balance_before_play).to.not.equal(balance_after_play);
            if (chosen_color == resultColor) {
                expect(balance_before_play).to.lessThan(balance_after_play);
            } else {
                expect(balance_before_play).to.greaterThan(balance_after_play);
            }
        }
    });
    it("When betting on both red and black nothing the balance shouldn't change or lose twice the amount", async function () {
        const amountOfRetries = 5;

        const betAmountOnRed = 10n;
        const betAmountOnGreen = 0n;
        const betAmountOnBlack = 10n;

        for (let i = 0; i < amountOfRetries; i++) {
            const balanceBeforePlay = await instance.connect(player1).myBalance();
            await instance.connect(player1).playRoulette(betAmountOnRed, betAmountOnGreen, betAmountOnBlack);
            const balanceAfterPlay = await instance.connect(player1).myBalance();
            const resultColor = Number(await instance.connect(player1).getRouletteResultForPlayer());

            switch (resultColor) {
                case Number(Color.RED):
                case Number(Color.BLACK):
                    expect(balanceBeforePlay).to.equal(balanceAfterPlay);
                    break;
                case Number(Color.GREEN):
                    expect(balanceBeforePlay - betAmountOnRed - betAmountOnBlack).to.equal(balanceAfterPlay);
                    break;
                default:
                    throw new Error("Unknown color");
            }
        }
    });
});
