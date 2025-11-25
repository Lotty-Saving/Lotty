"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Coins, Trophy, TrendingUp } from "lucide-react";

interface ProfileSectionProps {
  address: string | null;
  poolData: {
    userTickets: number;
    userBalance: number;
  };
  userStats: {
    streak: number;
    weekActivity: boolean[];
    currentAPY: number;
  };
  walletState: {
    xlm: string;
    usdc: string;
  };
  copied: boolean;
  copyToClipboard: (text: string) => void;
}

export function ProfileSection({
  address,
  poolData,
  userStats,
  walletState,
  copied,
  copyToClipboard,
}: ProfileSectionProps) {
  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-bold text-[#2C1810]">
          <span className="text-primary">{">"}</span> Statistics and Progress of
          Your Savings
        </h2>
        <p className="mt-2 text-base font-semibold text-[#5D4E37]">
          Track your balance, tickets, and rewards
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* User Overview Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Total Balance */}
          <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-[#5D4E37] uppercase">
                  Total Balance
                </p>
                <p className="mt-3 text-3xl font-black text-[#2C1810]">
                  ${poolData.userBalance}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
                  USD in Pool
                </p>
              </div>
              <div className="rounded-full border-3 border-[#2C1810] bg-[#FFD93D] p-2">
                <Coins className="h-6 w-6 text-[#2C1810]" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Active Tickets */}
          <div className="rounded-2xl border-4 border-[#2C1810] bg-[#FFD93D] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-[#2C1810] uppercase">
                  Active Tickets
                </p>
                <p className="mt-3 text-3xl font-black text-[#2C1810]">
                  {poolData.userTickets}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#2C1810]">
                  Tickets in Play
                </p>
              </div>
              <div className="rounded-full border-3 border-[#2C1810] bg-white p-2">
                <Trophy className="h-6 w-6 text-[#2C1810]" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Current APY */}
          <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-[#5D4E37] uppercase">
                  Current APY
                </p>
                <p className="mt-3 text-3xl font-black text-[#2C1810]">
                  {userStats.currentAPY}%
                </p>
                <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
                  Annual Return
                </p>
              </div>
              <div className="rounded-full border-3 border-[#2C1810] bg-[#FFD93D] p-2">
                <TrendingUp
                  className="h-6 w-6 text-[#2C1810]"
                  strokeWidth={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Info */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="mb-4 text-lg font-bold text-[#2C1810]">
            <span className="text-primary">{">"}</span> Wallet Information
          </h3>
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-center justify-between rounded-xl border-3 border-[#2C1810] bg-white p-4">
              <span className="text-sm font-bold text-[#5D4E37] uppercase">
                Address:
              </span>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer rounded-lg border-3 border-[#2C1810] bg-[#fefcf4] px-3 py-1 font-mono text-sm font-bold text-[#2C1810] transition-all hover:bg-[#FFD93D]">
                        {address?.slice(0, 4)}...{address?.slice(-4)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="border-3 border-[#2C1810] bg-[#fefcf4]">
                      <p className="font-mono text-xs font-bold text-[#2C1810]">
                        {address}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <button
                  onClick={() => copyToClipboard(address ?? "")}
                  className="rounded-lg border-3 border-[#2C1810] bg-[#fefcf4] p-2 transition-all hover:bg-[#FFD93D]"
                  aria-label="Copy address"
                >
                  {copied ? (
                    <svg
                      className="h-4 w-4 text-[#2C1810]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 text-[#2C1810]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* XLM Balance */}
            <div className="flex items-center justify-between rounded-xl border-3 border-[#2C1810] bg-white p-4">
              <span className="text-sm font-bold text-[#5D4E37] uppercase">
                XLM Balance:
              </span>
              <span className="text-lg font-black text-[#2C1810]">
                {walletState.xlm}
              </span>
            </div>

            {/* USDC Balance */}
            <div className="flex items-center justify-between rounded-xl border-3 border-[#2C1810] bg-white p-4">
              <span className="text-sm font-bold text-[#5D4E37] uppercase">
                USDC Balance:
              </span>
              <span className="text-lg font-black text-[#2C1810]">
                {walletState.usdc}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
