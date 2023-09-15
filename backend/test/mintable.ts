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

    it("Test mint100 can not be called twice", async function () {
        const signer = (await ethers.getSigners())[0];

        const signerAddress = await signer.getAddress();
        const decimals = await instance.decimals();

        await instance.mint100();
        let signerBalance = await instance.balanceOf(signerAddress);
        expect(signerBalance).to.equal(100n * 10n ** decimals);

        await expect(instance.mint100()).to.be.revertedWithCustomError(
            instance,
            "FunctionCanOnlyBeCalledOnceByTheCaller",
        );

        const canMint100 = await instance.canMint100();
        expect(canMint100).to.equal(false);

        signerBalance = await instance.balanceOf(signerAddress);
        expect(signerBalance).to.equal(100n * 10n ** decimals);
    });
});
