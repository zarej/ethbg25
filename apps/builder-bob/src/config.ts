import { getDefaultConfig } from 'connectkit';
import { createPublicClient } from 'viem';
import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const { VITE_ALCHEMY_ID, VITE_WALLETCONNECT_PROJECT_ID } = import.meta.env;

export const client = createPublicClient({
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${VITE_ALCHEMY_ID}`),
});

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${VITE_ALCHEMY_ID}`
      ),
    },
    walletConnectProjectId: VITE_WALLETCONNECT_PROJECT_ID,
    appName: 'Bob The Builder',
  })
);
