const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fractional Real Estate System", function () {
  it("should allow third-party holder to approve and claim from buyout", async function () {
    const [owner, bidder, holder] = await ethers.getSigners();

    // Deploy contracts
    const BuildingRegistry = await ethers.getContractFactory("contracts/BuildingRegistry.sol:BuildingRegistry");
    const buildingRegistry = await (await BuildingRegistry.deploy()).waitForDeployment();

    const ApartmentNFT = await ethers.getContractFactory("contracts/ApartmentNFT.sol:ApartmentNFT");
    const apartmentNFT = await (await ApartmentNFT.deploy(await buildingRegistry.getAddress())).waitForDeployment();

    const SquareMeterToken = await ethers.getContractFactory("contracts/SquareMeterToken.sol:SquareMeterToken");
    const sqmToken = await (await SquareMeterToken.deploy()).waitForDeployment();

    const ApartmentBuyout = await ethers.getContractFactory("contracts/ApartmentBuyout.sol:ApartmentBuyout");
    const buyout = await (await ApartmentBuyout.deploy(
      await apartmentNFT.getAddress(),
      await sqmToken.getAddress()
    )).waitForDeployment();

    // Create building and mint apartment NFT
    await buildingRegistry.createBuilding("ipfs://building-metadata");
    const apartmentId = 1;
    await apartmentNFT.mintApartment(1, 100, ethers.parseEther("1"), "ipfs://apartment");

    expect(await apartmentNFT.ownerOf(apartmentId)).to.equal(await owner.getAddress());

    // Mint square meter tokens to a third party (holder)
    await sqmToken.mintSquareMeters(await holder.getAddress(), apartmentId, 100);
    expect(await sqmToken.balanceOf(await holder.getAddress(), apartmentId)).to.equal(100);

    // Owner approves the buyout contract to transfer the NFT
    await apartmentNFT.connect(owner).approve(await buyout.getAddress(), apartmentId);

    // Bidder starts a buyout offer with 10 ETH
    await buyout.connect(bidder).startBuyout(apartmentId, {
      value: ethers.parseEther("10")
    });

    // Token holder approves the buyout
    await buyout.connect(holder).approveBuyout(apartmentId);

    // Ownership of the NFT should now transfer to the bidder
    expect(await apartmentNFT.ownerOf(apartmentId)).to.equal(await bidder.getAddress());

    // Token holder manually claims their ETH
    const before = await ethers.provider.getBalance(await holder.getAddress());
    const tx = await buyout.connect(holder).claim(apartmentId);
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed * receipt.gasPrice;
    const after = await ethers.provider.getBalance(await holder.getAddress());

    // Holder should receive almost 10 ETH (minus gas)
    expect(after).to.be.closeTo(
      before + ethers.parseEther("10") - gasUsed,
      ethers.parseEther("0.01")
    );
  });
});
