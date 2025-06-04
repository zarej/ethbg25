import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { WagmiProvider } from 'wagmi';

import { config } from './../config';

const queryClient = new QueryClient();

export default function Web3Provider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
