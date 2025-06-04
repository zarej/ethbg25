import { getDefaultConfig } from 'connectkit';
import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const { VITE_ALCHEMY_ID, VITE_WALLETCONNECT_PROJECT_ID } = import.meta.env;

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${VITE_ALCHEMY_ID}`
      ),
    },
    // Required API Keys
    walletConnectProjectId: VITE_WALLETCONNECT_PROJECT_ID,
    // Required App Info
    appName: 'Bob The Builder',
  })
);
