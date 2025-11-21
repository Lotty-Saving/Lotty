"use client";
import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { connectWallet, disconnectWallet } from "../utils/wallet";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LogOutIcon, WalletIcon } from "lucide-react";

export const WalletButton = () => {
  const [open, setOpen] = useState(false);
  const { address, isPending } = useWallet();
  const buttonLabel = isPending ? "Loading..." : "Connect Wallet";

  if (!address) {
    return (
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        onClick={() => void connectWallet()}
      >
        <WalletIcon /> {buttonLabel}
      </Button>
    );
  }

  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          title={address}
        >
          <WalletIcon />
          {shortAddress}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disconnect Wallet</DialogTitle>
          <DialogDescription>
            Are you sure you want to disconnect your wallet?
            <br />
            <code className="mt-2 flex items-center justify-center gap-2 rounded bg-amber-500/10 px-2 py-1 text-xs text-amber-500">
              <WalletIcon className="h-4 w-4" />
              {address}
            </code>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              disconnectWallet();
              setOpen(false);
            }}
            className="cursor-pointer bg-amber-500 text-white hover:bg-amber-600"
          >
            <LogOutIcon className="h-4 w-4" /> Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
