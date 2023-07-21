import { expect } from "chai";
import { ethers } from "hardhat";

describe("SDSToken", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("SDSToken");

    const instance = await ContractFactory.deploy();
    await instance.waitForDeployment();

    expect(await instance.name()).to.equal("SDSToken");
  });
});
