"use client";

import { Card } from "~/components/ui/card";
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
    <div className="space-y-6">
      <div>
        <h2 className="cuphead-text text-2xl font-bold text-[#2C1810]">
          Your Profile
        </h2>
        <p className="mt-1 text-sm font-bold text-[#5D4E37]">
          Statistics and progress of your savings
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* User Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-4 border-[#2C1810] bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Total Balance
                </p>
                <p className="cuphead-text mt-2 text-3xl font-bold text-[#2C1810]">
                  ${poolData.userBalance}
                </p>
              </div>
              <Coins className="h-8 w-8 text-[#FFD93D]" />
            </div>
          </Card>

          <Card className="border-4 border-[#2C1810] bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Active Tickets
                </p>
                <p className="cuphead-text mt-2 text-3xl font-bold text-[#2C1810]">
                  {poolData.userTickets}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-[#FFD93D]" />
            </div>
          </Card>

          <Card className="border-4 border-[#2C1810] bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Current APY
                </p>
                <p className="cuphead-text mt-2 text-3xl font-bold text-[#2C1810]">
                  {userStats.currentAPY}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#FFD93D]" />
            </div>
          </Card>
        </div>

        {/* Wallet Info */}
        <Card className="border-4 border-[#2C1810] bg-white p-6 shadow-lg">
          <h3 className="cuphead-text mb-4 text-lg font-bold text-[#2C1810]">
            Wallet Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-3 border-[#2C1810] py-2">
              <span className="text-sm font-bold text-[#5D4E37] uppercase">
                Address:
              </span>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer rounded border-2 border-[#2C1810] bg-[#F5E6D3] px-2 py-1 font-mono text-sm font-bold text-[#2C1810] transition-colors hover:bg-[#FFD93D]">
                        {address?.slice(0, 4)}...{address?.slice(-4)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="border-3 border-[#2C1810] bg-[#FFF8DC]">
                      <p className="font-mono text-xs font-bold text-[#2C1810]">
                        {address}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <button
                  onClick={() => copyToClipboard(address ?? "")}
                  className="rounded border-2 border-[#2C1810] bg-[#F5E6D3] p-1 transition-all hover:scale-110 hover:bg-[#FFD93D]"
                  aria-label="Copy address"
                >
                  {copied ? (
                    <svg
                      className="h-4 w-4 text-[#D62828]"
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
            <div className="flex items-center justify-between border-b-3 border-[#2C1810] py-2">
              <span className="text-sm font-bold text-[#5D4E37] uppercase">
                XLM Balance:
              </span>
              <span className="font-bold text-[#2C1810]">
                {walletState.xlm}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-[#5D4E37] uppercase">
                USDC Balance:
              </span>
              <span className="font-bold text-[#2C1810]">
                {walletState.usdc}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
