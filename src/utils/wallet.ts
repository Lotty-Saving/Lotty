import { Horizon } from "@stellar/stellar-sdk";

import {
  type ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";
export const stellarNetwork: "TESTNET" | "PUBLIC" | "LOCAL" = "TESTNET";

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: "Test SDF Network ; September 2015" as WalletNetwork,
  // network: networkPassphrase as WalletNetwork,
  modules: allowAllModules(),
});

export const connectWallet = async () => {
  await kit.openModal({
    modalTitle: "Connect to your wallet",
    onWalletSelected: (option: ISupportedWallet) => {
      const selectedId = option.id;
      kit.setWallet(selectedId);

      // Now open selected wallet's login flow by calling `getAddress` --
      // Yes, it's strange that a getter has a side effect of opening a modal
      void kit.getAddress().then((address) => {
        // Once `getAddress` returns successfully, we know they actually
        // connected the selected wallet, and we set our localStorage
        if (address.address) {
          window.localStorage.setItem("walletId", selectedId);
          window.localStorage.setItem("walletAddress", address.address);
        } else {
          window.localStorage.setItem("walletId", "");
          window.localStorage.setItem("walletAddress", "");
        }
      });
      if (selectedId == "freighter" || selectedId == "hot-wallet") {
        void kit.getNetwork().then((network) => {
          if (network.network && network.networkPassphrase) {
            window.localStorage.setItem("walletNetwork", network.network);
            window.localStorage.setItem(
              "networkPassphrase",
              network.networkPassphrase,
            );
          } else {
            window.localStorage.setItem("walletNetwork", "");
            window.localStorage.setItem("networkPassphrase", "");
          }
        });
      }
    },
  });
};

export const disconnectWallet = async () => {
  await kit.disconnect();
  window.localStorage.removeItem("walletId");
  window.localStorage.removeItem("walletAddress");
  window.localStorage.removeItem("walletNetwork");
  window.localStorage.removeItem("networkPassphrase");
};

function getHorizonHost(mode: string) {
  switch (mode) {
    case "LOCAL":
      return "http://localhost:8000";
    case "FUTURENET":
      return "https://horizon-futurenet.stellar.org";
    case "TESTNET":
      return "https://horizon-testnet.stellar.org";
    case "PUBLIC":
      return "https://horizon.stellar.org";
    default:
      throw new Error(`Unknown Stellar network: ${mode}`);
  }
}

export const fetchBalance = async (address: string) => {
  const horizonServer = new Horizon.Server(getHorizonHost(stellarNetwork));
  const response = await horizonServer.accounts().accountId(address).call();
  const { balances } = response;
  return balances;
};

export type Balance = Awaited<ReturnType<typeof fetchBalance>>[number];
