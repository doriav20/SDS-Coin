import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken } from "../typechain-types";

describe("Mintable", function () {
    let instance: SDSToken;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SDSToken");
        instance = await ContractFactory.deploy();
        await instance.waitForDeployment();
    });

    it("Test mint500", async function () {
        const signer = (await ethers.getSigners())[0];

        const signerAddress = await signer.getAddress();

        await instance.mint500(signerAddress);

        const signerBalance = await instance.balanceOf(signerAddress);

        expect(signerBalance).to.equal(500_000_000_000_000_000_000n);
    });

    it("Test mint100 can not be called twice", async function () {
        const signer = (await ethers.getSigners())[0];

        const signerAddress = await signer.getAddress();

        await instance.mint100();
        let signerBalance = await instance.balanceOf(signerAddress);
        expect(signerBalance).to.equal(100_000_000_000_000_000_000n);

        await expect(instance.mint100()).to.be.revertedWithCustomError(instance, "AlreadyMinted");

        signerBalance = await instance.balanceOf(signerAddress);
        expect(signerBalance).to.equal(100_000_000_000_000_000_000n);
    });
});
