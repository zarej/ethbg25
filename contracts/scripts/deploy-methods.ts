import hre, { ethers } from "hardhat";
import {
  ApartmentNFT,
  ApartmentNFT__factory,
  BuildingRegistry,
  BuildingRegistry__factory,
} from "../typechain-types";

export async function deployBuilderRegistry(): Promise<BuildingRegistry> {
  let [deployer] = await ethers.getSigners();
  
  console.log(
    `ℹ️  Attempting to deploy the BuildingRegistry smart contract to the ${hre.network.name} blockchain using ${deployer.address} address`
  );

  const uniswapFactory: BuildingRegistry__factory =
    (await hre.ethers.getContractFactory(
      "BuildingRegistry"
    )) as BuildingRegistry__factory;

  const buildingRegistry: BuildingRegistry = await uniswapFactory
    .connect(deployer)
    .deploy();

  const buildingRegistryDeployed = await buildingRegistry.waitForDeployment();
  console.log("✅ BuildingRegistry:", await buildingRegistryDeployed.getAddress());


  return buildingRegistryDeployed;
}

export async function deployApartmentNFT(buildingRegistry: BuildingRegistry): Promise<ApartmentNFT> {
  let [deployer] = await ethers.getSigners();
  
  console.log(
    `ℹ️  Attempting to deploy the ApartmentNFT smart contract to the ${hre.network.name} blockchain using ${deployer.address} address`
  );

  const apartmentNFT: ApartmentNFT__factory =
    (await hre.ethers.getContractFactory(
      "ApartmentNFT"
    )) as ApartmentNFT__factory;

  const apartmentNFTDeployed = await apartmentNFT.connect(deployer).deploy(buildingRegistry.getAddress());
  console.log("✅ ApartmentNFT:", await apartmentNFTDeployed.getAddress());

  return apartmentNFTDeployed;
}

export async function deploySquareMeterToken(): Promise<string> {
  let [deployer] = await ethers.getSigners();
  
  console.log(
    `ℹ️  Attempting to deploy the SquareMeterToken smart contract to the ${hre.network.name} blockchain using ${deployer.address} address`
  );

  const SquareMeterToken = await ethers.getContractFactory("contracts/SquareMeterToken.sol:SquareMeterToken");
  const sqmToken = await (await SquareMeterToken.deploy()).waitForDeployment();
  
  console.log("✅ SquareMeterToken:", await sqmToken.getAddress());

  return sqmToken.getAddress();
}

export async function deployApartmentBuyout(apartmentNFT: ApartmentNFT, sqmToken: string): Promise<string> {
  let [deployer] = await ethers.getSigners();
  
  console.log(
    `ℹ️  Attempting to deploy the ApartmentBuyout smart contract to the ${hre.network.name} blockchain using ${deployer.address} address`
  );

  const ApartmentBuyout = await ethers.getContractFactory("contracts/ApartmentBuyout.sol:ApartmentBuyout");
  const buyout = await (await ApartmentBuyout.deploy(
    await apartmentNFT.getAddress(),
    await sqmToken
  )).waitForDeployment();

  console.log("✅ ApartmentBuyout:", await buyout.getAddress());

  return buyout.getAddress();
}
