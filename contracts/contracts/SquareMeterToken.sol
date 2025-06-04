
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SquareMeterToken is ERC1155, Ownable {
    mapping(uint256 => uint256) public totalSupply;

    constructor() ERC1155("ipfs://Qm.../{id}.json") Ownable(msg.sender) {}

    function mintSquareMeters(
        address to,
        uint256 apartmentId,
        uint256 squareMeters
    ) external onlyOwner {
        totalSupply[apartmentId] += squareMeters;
        _mint(to, apartmentId, squareMeters, "");
    }
}
