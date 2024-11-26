import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, ReactNode } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");

function WalletContextProvider({ children }: { children: ReactNode }) {
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter()];
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default WalletContextProvider;
