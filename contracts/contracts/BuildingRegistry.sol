
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuildingRegistry {
    struct Building {
        uint256 id;
        address owner;
        string metadataURI;
    }

    uint256 public buildingCount;
    mapping(uint256 => Building) public buildings;

    event BuildingCreated(uint256 indexed id, address indexed owner, string metadataURI);

    function createBuilding(string memory metadataURI) external {
        buildingCount++;
        buildings[buildingCount] = Building(buildingCount, msg.sender, metadataURI);
        emit BuildingCreated(buildingCount, msg.sender, metadataURI);
    }

    function isOwner(uint256 buildingId, address user) public view returns (bool) {
        return buildings[buildingId].owner == user;
    }
}
