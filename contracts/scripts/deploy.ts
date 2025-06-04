import hre, { network } from "hardhat";
import { deployApartmentBuyout, deployApartmentNFT, deployBuilderRegistry, deploySquareMeterToken } from "./deploy-methods";

async function main() {

  const buildingRegistry = await deployBuilderRegistry();
  const apartmentNFT = await deployApartmentNFT(buildingRegistry);
  const sqmToken = await deploySquareMeterToken();
  const buyout = await deployApartmentBuyout(apartmentNFT, sqmToken);

  // Verify the contract if network is not hardhat/localhost
//   if (network.name !== "hardhat" && network.name !== "localhost") {
//     try {
//       await hre.run(`verify:verify`, {
//         address: await buildingRegistry.getAddress()
//       });
//     } catch (error) {
//       console.log(
//         `❌ Failed to verify the BuildingRegistry smart contract on Etherscan: ${error}`
//       );
//     }
//   }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });