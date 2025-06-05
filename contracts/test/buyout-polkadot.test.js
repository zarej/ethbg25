const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fractional Real Estate System", function () {
  it("test execution time", async function () {
    const [owner, bidder, holder] = await ethers.getSigners();

    // Deploy contracts
    const BuildingRegistry = await ethers.getContractFactory("contracts/BuildingRegistry.sol:BuildingRegistry");
    const buildingRegistry = await (await BuildingRegistry.deploy()).waitForDeployment();

    // Measure time
    const start = performance.now();

    const tx = await buildingRegistry.createBuilding("ipfs://building-metadata");
    await tx.wait(); // wait for mining

    const end = performance.now();

    console.log(`createBuilding executed in ${(end - start).toFixed(2)} milliseconds`);
  });
});
