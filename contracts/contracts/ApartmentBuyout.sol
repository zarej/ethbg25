
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ApartmentBuyout {
    struct Buyout {
        address bidder;
        uint256 offerAmount;
        uint256 approvalWeight;
        bool active;
        mapping(address => bool) voted;
    }

    mapping(uint256 => Buyout) private buyouts;
    IERC721 public apartmentNFT;
    IERC1155 public squareMeterToken;

    uint256 public constant approvalThreshold = 7000; // 70% in basis points

    constructor(address _aptNFT, address _sqmToken) {
        apartmentNFT = IERC721(_aptNFT);
        squareMeterToken = IERC1155(_sqmToken);
    }

    function startBuyout(uint256 apartmentId) external payable {
        require(!buyouts[apartmentId].active, "Buyout in progress");
        require(msg.value > 0, "Offer must include ETH");

        Buyout storage b = buyouts[apartmentId];
        b.bidder = msg.sender;
        b.offerAmount = msg.value;
        b.active = true;
    }

    function approveBuyout(uint256 apartmentId) external {
        Buyout storage b = buyouts[apartmentId];
        require(b.active, "No active buyout");
        require(!b.voted[msg.sender], "Already voted");

        uint256 holderBalance = squareMeterToken.balanceOf(msg.sender, apartmentId);
        require(holderBalance > 0, "Must own square meters to vote");

        b.voted[msg.sender] = true;
        b.approvalWeight += holderBalance;

        uint256 totalSupply = SquareMeterToken(address(squareMeterToken)).totalSupply(apartmentId);
        if (b.approvalWeight * 10000 / totalSupply >= approvalThreshold) {
            apartmentNFT.transferFrom(apartmentNFT.ownerOf(apartmentId), b.bidder, apartmentId);
            payable(apartmentNFT.ownerOf(apartmentId)).transfer(b.offerAmount);
            delete buyouts[apartmentId];
        }
    }
}

interface SquareMeterToken is IERC1155 {
    function totalSupply(uint256 id) external view returns (uint256);
}
