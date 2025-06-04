
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBuildingRegistry {
    function isOwner(uint256 buildingId, address user) external view returns (bool);
}

contract ApartmentNFT is ERC721URIStorage, Ownable {
    struct Apartment {
        uint256 id;
        uint256 buildingId;
        uint256 sizeInSqM;
        uint256 pricePerSqM;
    }

    uint256 public apartmentCounter;
    mapping(uint256 => Apartment) public apartments;

    IBuildingRegistry public buildingRegistry;

    constructor(address registryAddress) ERC721("ApartmentNFT", "APT") {
        buildingRegistry = IBuildingRegistry(registryAddress);
    }

    function mintApartment(
        uint256 buildingId,
        uint256 sizeInSqM,
        uint256 pricePerSqM,
        string memory tokenURI
    ) external {
        require(
            buildingRegistry.isOwner(buildingId, msg.sender),
            "Only building owner can mint"
        );

        apartmentCounter++;
        uint256 tokenId = apartmentCounter;

        apartments[tokenId] = Apartment(tokenId, buildingId, sizeInSqM, pricePerSqM);
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function getFullPrice(uint256 tokenId) public view returns (uint256) {
        Apartment memory apt = apartments[tokenId];
        return apt.sizeInSqM * apt.pricePerSqM;
    }
}
