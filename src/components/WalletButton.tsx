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
        className="cursor-pointer border-3 border-[#2C1810] bg-[#FFD93D] font-bold text-[#2C1810] shadow-md transition-all hover:scale-105 hover:border-[#2C1810] hover:bg-[#F4A825] hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        onClick={() => void connectWallet()}
      >
        <WalletIcon className="h-5 w-5" /> {buttonLabel}
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
          className="cursor-pointer border-3 border-[#2C1810] bg-[#FFD93D] font-bold text-[#2C1810] shadow-md transition-all hover:scale-105 hover:border-[#2C1810] hover:bg-[#F4A825] hover:text-[#fefcf4] hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          title={address}
        >
          <WalletIcon className="h-5 w-5" />
          {shortAddress}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-4 border-[#2C1810] bg-[#fefcf4] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2C1810]">
            Disconnect Wallet
          </DialogTitle>
          <DialogDescription className="text-[#5D4E37]">
            Are you sure you want to disconnect your wallet?
            <br />
            <code className="mt-3 flex items-center justify-center gap-2 rounded-lg border-3 border-[#2C1810] bg-[#FFD93D]/30 px-3 py-2 text-xs font-bold text-[#2C1810]">
              <WalletIcon className="h-4 w-4" />
              {address}
            </code>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer border-3 border-[#2C1810] bg-[#fefcf4] font-bold text-[#2C1810] transition-all hover:scale-105 hover:bg-[#E8D5B7] hover:shadow-[3px_3px_0px_0px_rgba(44,24,16,1)]"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              void disconnectWallet();
              setOpen(false);
            }}
            className="cursor-pointer border-3 border-[#2C1810] bg-[#D62828] font-bold text-[#fefcf4] transition-all hover:scale-105 hover:bg-[#A02020] hover:shadow-[3px_3px_0px_0px_rgba(44,24,16,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <LogOutIcon className="h-4 w-4" /> Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
