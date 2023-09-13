import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken } from "../typechain-types";

describe("SDSToken", function () {
    let instance: SDSToken;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SDSToken");
        instance = await ContractFactory.deploy();
        await instance.waitForDeployment();
    });

    it("Test contract name", async function () {
        const contractName = await instance.name();
        expect(contractName).to.equal("SDSToken");
    });

    it("Test myBalance function", async function () {
        const signer = (await ethers.getSigners())[0];
        const signerAddress = await signer.getAddress();
        const mintAmount = 1000n;

        await instance.mint(signerAddress, mintAmount);

        const balance = await instance.myBalance();
        const decimals = await instance.decimals();

        expect(balance).to.equal(mintAmount * 10n ** decimals);
    });
});
