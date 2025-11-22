"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Shield, TrendingUp, Trophy, Clock } from "lucide-react";

interface PoolsSectionProps {
  address: string | null;
  poolData: {
    totalPool: number;
    prize: number;
    apy: number;
    tickets: number;
    winners: number;
    round: number;
  };
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export function PoolsSection({
  address,
  poolData,
  timeRemaining,
}: PoolsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="cuphead-text text-2xl font-bold text-[#2C1810]">
          Liquidity Pool
        </h2>
        <p className="mt-1 text-sm font-bold text-[#5D4E37]">
          Current pool information and statistics
        </p>
      </div>

      {!address && (
        <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center">
            <Shield className="mb-4 h-16 w-16 text-[#2C1810]" />
            <h3 className="cuphead-text mb-2 text-xl font-bold text-[#2C1810]">
              Connect Your Wallet
            </h3>
            <p className="text-sm font-bold text-[#5D4E37]">
              Connect your wallet to participate in the pool
            </p>
          </div>
        </Card>
      )}

      {address && (
        <>
          {/* Pool Info Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-lg transition-all hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#5D4E37] uppercase">
                    Total Pool
                  </p>
                  <p className="cuphead-text mt-1 text-2xl font-bold text-[#2C1810]">
                    ${(poolData.totalPool / 1000).toFixed(1)}M USD
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#5D4E37]">
                    ≈ ${(poolData.totalPool * 1000).toLocaleString()} ARS
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#D62828]" />
              </div>
            </Card>

            <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-6 shadow-lg transition-all hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#5D4E37] uppercase">
                    Prize ({poolData.apy}% APY)
                  </p>
                  <p className="cuphead-text mt-1 text-2xl font-bold text-[#2C1810]">
                    ${poolData.prize.toLocaleString()} USD
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#5D4E37]">
                    ≈ ${(poolData.prize * 1781).toLocaleString()} ARS
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-[#2C1810]" />
              </div>
            </Card>

            <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-lg transition-all hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#5D4E37] uppercase">
                    Next Draw
                  </p>
                  <p className="cuphead-text mt-1 text-2xl font-bold text-[#D62828]">
                    {String(timeRemaining.hours).padStart(2, "0")}:
                    {String(timeRemaining.minutes).padStart(2, "0")}:
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#5D4E37]">
                    Round #{poolData.round}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-[#2C1810]" />
              </div>
            </Card>
          </div>

          {/* Additional Pool Stats */}
          <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-2xl">
            <h3 className="cuphead-text mb-4 text-lg font-bold text-[#2C1810]">
              Pool Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  APY
                </p>
                <p className="mt-1 text-xl font-bold text-[#2C1810]">
                  ~{poolData.apy}%
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Total Tickets
                </p>
                <p className="mt-1 text-xl font-bold text-[#2C1810]">
                  {poolData.tickets.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Winners
                </p>
                <p className="mt-1 text-xl font-bold text-[#2C1810]">
                  {poolData.winners}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Your Status
                </p>
                <Badge className="mt-1 border-2 border-[#2C1810] bg-[#FFD93D] font-bold text-[#2C1810]">
                  Participating
                </Badge>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
