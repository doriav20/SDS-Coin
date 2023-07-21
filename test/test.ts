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

    it("Test mint500", async function () {
        const signer = (await ethers.getSigners())[0];

        const signerAddress = await signer.getAddress();

        await instance.mint500(signerAddress);

        const signerBalance = await instance.balanceOf(signerAddress);

        expect(signerBalance).to.equal(500);
    });
});
