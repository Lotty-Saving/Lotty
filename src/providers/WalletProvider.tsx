"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";

const stellarWalletsKit: StellarWalletsKit = new StellarWalletsKit({
  network: "Test SDF Network ; September 2015" as WalletNetwork,
  modules: allowAllModules(),
});

export interface WalletContextType {
  address?: string;
  network?: string;
  networkPassphrase?: string;
  isPending: boolean;
  signTransaction?: typeof stellarWalletsKit.signTransaction;
}

const initialState = {
  address: undefined,
  network: undefined,
  networkPassphrase: undefined,
};

const POLL_INTERVAL = 1000;

export const WalletContext = // eslint-disable-line react-refresh/only-export-components
  createContext<WalletContextType>({ isPending: true });

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] =
    useState<Omit<WalletContextType, "isPending">>(initialState);
  const [isPending, startTransition] = useTransition();
  const popupLock = useRef(false);

  // Use ref to track current state without causing rerenders
  const stateRef = useRef(state);

  // Update ref when state changes
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Memoize signTransaction to prevent recreation on every render
  const signTransaction = useMemo(
    () => stellarWalletsKit.signTransaction.bind(stellarWalletsKit),
    [],
  );

  // Memoize updateState to prevent recreation
  const updateState = useCallback(
    (newState: Omit<WalletContextType, "isPending">) => {
      setState((prev: Omit<WalletContextType, "isPending">) => {
        // Only update if values actually changed
        if (
          prev.address !== newState.address ||
          prev.network !== newState.network ||
          prev.networkPassphrase !== newState.networkPassphrase
        ) {
          return newState;
        }
        return prev;
      });
    },
    [],
  );

  const nullify = useCallback(() => {
    updateState(initialState);
    window.localStorage.setItem("walletId", "");
    window.localStorage.setItem("walletAddress", "");
    window.localStorage.setItem("walletNetwork", "");
    window.localStorage.setItem("networkPassphrase", "");
  }, [updateState]);

  const updateCurrentWalletState = useCallback(async () => {
    // check if the wallet is connected by checking our storage item
    const walletId = window.localStorage.getItem("walletId");
    const walletNetwork = window.localStorage.getItem("walletNetwork");
    const walletAddr = window.localStorage.getItem("walletAddress");
    const passphrase = window.localStorage.getItem("networkPassphrase");

    // Use ref to get current state without creating dependency
    const currentState = stateRef.current;

    // If we have wallet data in storage but not in state, restore it
    if (
      !currentState.address &&
      walletAddr !== null &&
      walletNetwork !== null &&
      passphrase !== null
    ) {
      updateState({
        address: walletAddr,
        network: walletNetwork,
        networkPassphrase: passphrase,
      });
    }

    if (!walletId) {
      // Only nullify if we actually have state to clear
      if (currentState.address) {
        nullify();
      }
    } else {
      if (popupLock.current) return;
      // If our storage item is there, then we try to get the user's address &
      // network from their wallet. Note: `getAddress` MAY open their wallet
      // extension, depending on which wallet they select!
      try {
        popupLock.current = true;
        stellarWalletsKit.setWallet(walletId);

        // For non-freighter wallets with stored address, skip API call
        if (walletId !== "freighter" && walletAddr !== null) {
          return;
        }

        const [a, n] = await Promise.all([
          stellarWalletsKit.getAddress(),
          stellarWalletsKit.getNetwork(),
        ]);

        if (!a.address) {
          window.localStorage.setItem("walletId", "");
        } else if (
          a.address !== currentState.address ||
          n.network !== currentState.network ||
          n.networkPassphrase !== currentState.networkPassphrase
        ) {
          // Only update if values actually changed
          window.localStorage.setItem("walletAddress", a.address);
          updateState({ ...a, ...n });
        }
      } catch (e) {
        // If `getNetwork` or `getAddress` throw errors, sign the user out
        nullify();
        // Log the error for visibility
        console.error(e);
      } finally {
        popupLock.current = false;
      }
    }
  }, [nullify, updateState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isMounted = true;

    // Create recursive polling function to check wallet state continuously
    const pollWalletState = async () => {
      if (!isMounted) return;

      await updateCurrentWalletState();

      if (isMounted) {
        timer = setTimeout(() => void pollWalletState(), POLL_INTERVAL);
      }
    };

    // Get the wallet address when the component is mounted for the first time
    startTransition(async () => {
      await updateCurrentWalletState();
      // Start polling after initial state is loaded

      if (isMounted) {
        timer = setTimeout(() => void pollWalletState(), POLL_INTERVAL);
      }
    });

    // Clear the timeout and stop polling when the component unmounts
    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
    // updateCurrentWalletState is now memoized with useCallback, so it's stable
  }, [updateCurrentWalletState]);

  const contextValue = useMemo(
    () => ({
      ...state,
      isPending,
      signTransaction,
    }),
    [state, isPending, signTransaction],
  );

  return <WalletContext value={contextValue}>{children}</WalletContext>;
};
