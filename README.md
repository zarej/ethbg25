# Fractional Real Estate NFT Marketplace

## Summary

This project is a decentralized platform for managing and trading real estate properties using NFTs and ERC-1155 tokens. Each apartment is represented as an ERC-721 NFT, and its square meters are fractionalized into ERC-1155 tokens, allowing for shared ownership and democratic decision-making.

## Features

Building Registry: Owners can register buildings and add apartments with metadata.

ERC-721 Apartment NFTs: Each apartment is a unique NFT.

ERC-1155 Square Meter Tokens: Each apartment's area is split into fungible tokens representing square meters.

Fractional Ownership: Square meter tokens can be distributed to multiple investors.

Buyout Marketplace:

- Anyone can bid to buy an apartment.

- A buyout requires approval from 70% of square meter token holders.

- Upon approval, ownership transfers to the bidder.

Manual Payouts:

- Token holders can manually claim their share of the buyout offer in ETH.

- Funds are held securely in the contract until claimed.


## Polkadot run execution measurements

```
cd contracts

# sepolia
npx hardhat run scripts/measure-sepolia.ts --network sepoli
# polkadot
npx hardhat run scripts/measure-polkadot.ts --network passet
```