import { DefindexSDK, SupportedNetworks } from "@defindex/sdk";

export const currentTestnet = SupportedNetworks.TESTNET;

export const sdk = new DefindexSDK({
  apiKey: process.env.NEXT_PUBLIC_DEFINDEX_API_KEY!,
  baseUrl: "https://api.defindex.io",
});

// export const healthCheck = async () => {
//   return await sdk.healthCheck();
// };

// // Get factory address
// const factory = await sdk.getFactoryAddress(SupportedNetworks.TESTNET);

// // Get vault information
// const vaultAddress = "CVAULT_CONTRACT_ADDRESS...";
// const vaultInfo = await sdk.getVaultInfo(
//   vaultAddress,
//   SupportedNetworks.TESTNET,
// );

// Sign the XDR with your wallet and submit
// const signedXdr = await yourWallet.sign(depositResponse.xdr);
// const result = await sdk.sendTransaction(signedXdr, SupportedNetworks.TESTNET, false);
