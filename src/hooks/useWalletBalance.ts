"use client";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { fetchBalance, type Balance } from "../utils/wallet";

const formatter = new Intl.NumberFormat();

const checkFunding = (balances: Balance[]) =>
  balances.some(({ balance }) =>
    !Number.isNaN(Number(balance)) ? Number(balance) > 0 : false,
  );

type WalletBalance = {
  balances: Balance[];
  xlm: string;
  usdc: string;
  isFunded: boolean;
  isLoading: boolean;
  error: Error | null;
};

export const useWalletBalance = () => {
  const { address } = useWallet();
  const [state, setState] = useState<WalletBalance>({
    balances: [],
    xlm: "-",
    usdc: "-",
    isFunded: false,
    isLoading: false,
    error: null,
  });

  const updateBalance = useCallback(async () => {
    if (!address) return;
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const balances = await fetchBalance(address);
      const isFunded = checkFunding(balances);
      const native = balances.find(
        ({ asset_type }: { asset_type: string }) => asset_type === "native",
      );

      // Get USDC balance using env variables
      const usdcAssetCode = process.env.PUBLIC_USDC_ASSET_CODE;
      const usdcAssetIssuer = process.env.PUBLIC_USDC_ASSET_ISSUER;

      let usdcBalance = "-";
      if (usdcAssetCode && usdcAssetIssuer) {
        const usdcAsset = balances.find((b) => {
          if ("asset_code" in b && "asset_issuer" in b) {
            return (
              b.asset_code === usdcAssetCode &&
              b.asset_issuer === usdcAssetIssuer
            );
          }
          return false;
        });

        if (usdcAsset && "balance" in usdcAsset) {
          usdcBalance = formatter.format(Number(usdcAsset.balance));
        }
      }

      setState({
        isLoading: false,
        balances,
        xlm: native?.balance ? formatter.format(Number(native.balance)) : "-",
        usdc: usdcBalance,
        isFunded,
        error: null,
      });
    } catch (err) {
      if (err instanceof Error && /not found/i.exec(err.message)) {
        setState({
          isLoading: false,
          balances: [],
          xlm: "-",
          usdc: "-",
          isFunded: false,
          error: new Error("Error fetching balance. Is your wallet funded?"),
        });
      } else {
        console.error(err);
        setState({
          isLoading: false,
          balances: [],
          xlm: "-",
          usdc: "-",
          isFunded: false,
          error: new Error("Unknown error fetching balance."),
        });
      }
    }
  }, [address]);

  useEffect(() => {
    void updateBalance();
  }, [updateBalance]);

  return {
    ...state,
    updateBalance,
  };
};
