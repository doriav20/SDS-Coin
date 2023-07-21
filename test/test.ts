import { expect } from "chai";
import { ethers } from "hardhat";
import { SDSToken } from "../typechain-types";

describe("SDSToken", function () {
  let instance: SDSToken

  beforeEach(async function() {
    const ContractFactory = await ethers.getContractFactory("SDSToken");
    instance = await ContractFactory.deploy();
    await instance.waitForDeployment();
  });

  it("Test contract name", async function () {
    const contractName = await instance.name();
    expect(contractName).to.equal("SDSToken");
  });
});
