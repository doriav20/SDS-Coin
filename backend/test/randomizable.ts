import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken } from "../typechain-types";

describe("Randomizable", function () {
    let instance: SDSToken;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SDSToken");
        instance = await ContractFactory.deploy();
        await instance.waitForDeployment();
    });

    it("Test getRandomNumber", async function () {
        const numbers = new Set();
        const amount_of_numbers_to_generate = 64;

        for (let i = 0; i < amount_of_numbers_to_generate; i++) {
            await instance.generateRandomNumber();
            const randomNumber = await instance.getRandomNumber();
            numbers.add(randomNumber);
        }

        expect(numbers.size).to.equal(64); // We expect 64 unique numbers
    });
});
