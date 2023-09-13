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
        const decimals = await instance.decimals();

        expect(signerBalance).to.equal(500n * 10n ** decimals);
    });

    it("Test mint100 can not be called twice", async function () {
        const signer = (await ethers.getSigners())[0];

        const signerAddress = await signer.getAddress();
        const decimals = await instance.decimals();

        await instance.mint100();
        let signerBalance = await instance.balanceOf(signerAddress);
        expect(signerBalance).to.equal(100n * 10n ** decimals);

        await expect(instance.mint100()).to.be.revertedWithCustomError(instance, "AlreadyMinted");

        signerBalance = await instance.balanceOf(signerAddress);
        expect(signerBalance).to.equal(100n * 10n ** decimals);
    });

    it("Test owner-only restrictions for minting functions", async function () {
        const nonOwner = (await ethers.getSigners())[1];
        const nonOwnerAddress = await nonOwner.getAddress();

        await expect(instance.connect(nonOwner).mint(nonOwnerAddress, 1000)).to.be.revertedWith(
            "Ownable: caller is not the owner",
        );
    });
});
