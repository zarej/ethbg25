import hre, { network } from "hardhat";
import { deployApartmentBuyout, deployApartmentNFT, deployBuilderRegistry, deploySquareMeterToken } from "./deploy-methods";

async function main() {
    // polkadot
    const contractAddress = "0x0c7332f1e091335b26aaf0756777284ada87ECA0"; // replace with actual address
    
    // sepolia
    // const contractAddress = "0xE12d5218c5413d583A8A71d9CE7119845d80Af39";
    
    const buildingRegistry = await ethers.getContractAt(
        "contracts/BuildingRegistry.sol:BuildingRegistry",
        contractAddress
    );

    // Measure time
    const start = performance.now();

    const tx = await buildingRegistry.createBuilding("ipfs://building-metadata");
    await tx.wait(); // wait for mining

    const end = performance.now();

    console.log(`createBuilding executed in ${(end - start).toFixed(2)} milliseconds`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });