import * as dotenv from "dotenv";

import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/c965a52a0af7448d9713e2a5b0a57ed0",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
};

export default config;