
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ApartmentBuyout {
    struct Buyout {
        address bidder;
        uint256 offerAmount;
        uint256 approvalWeight;
        bool completed;
        bool active;
        uint256 totalSupply;
        mapping(address => bool) voted;
        mapping(address => bool) claimed;
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
        require(!buyouts[apartmentId].active, "Buyout already in progress");
        require(msg.value > 0, "Offer must include ETH");

        Buyout storage b = buyouts[apartmentId];
        b.bidder = msg.sender;
        b.offerAmount = msg.value;
        b.active = true;
        b.completed = false;

        b.totalSupply = SquareMeterToken(address(squareMeterToken)).totalSupply(apartmentId);
        require(b.totalSupply > 0, "Invalid total supply");
    }

    function approveBuyout(uint256 apartmentId) external {
        Buyout storage b = buyouts[apartmentId];
        require(b.active, "No active buyout");
        require(!b.voted[msg.sender], "Already voted");
        require(!b.completed, "Buyout already completed");

        uint256 holderBalance = squareMeterToken.balanceOf(msg.sender, apartmentId);
        require(holderBalance > 0, "Must own square meters to vote");

        b.voted[msg.sender] = true;
        b.approvalWeight += holderBalance;

        if (b.approvalWeight * 10000 / b.totalSupply >= approvalThreshold) {
            // Mark buyout as completed and transfer NFT
            address owner = apartmentNFT.ownerOf(apartmentId);
            apartmentNFT.transferFrom(owner, b.bidder, apartmentId);
            b.completed = true;
            b.active = false;
        }
    }

    function claim(uint256 apartmentId) external {
        Buyout storage b = buyouts[apartmentId];
        require(b.completed, "Buyout not completed");
        require(!b.claimed[msg.sender], "Already claimed");

        uint256 balance = squareMeterToken.balanceOf(msg.sender, apartmentId);
        require(balance > 0, "Not a token holder");

        uint256 payout = (b.offerAmount * balance) / b.totalSupply;
        b.claimed[msg.sender] = true;

        payable(msg.sender).transfer(payout);
    }
}

interface SquareMeterToken is IERC1155 {
    function totalSupply(uint256 id) external view returns (uint256);
}
