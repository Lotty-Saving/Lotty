"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  TrendingUp,
  Shield,
  Zap,
  Users,
  Coins,
  Clock,
  Trophy,
} from "lucide-react";

interface LuckySavingLandingProps {
  poolData: {
    totalPool: number;
    prize: number;
    apy: number;
    tickets: number;
    winners: number;
  };
  onGetStarted: () => void;
}

export function LuckySavingLanding({
  poolData,
  onGetStarted,
}: LuckySavingLandingProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <Badge className="mb-4 border-3 border-[#2C1810] bg-[#FFD93D] font-bold text-[#2C1810] shadow-lg hover:bg-[#F4A825]">
          🎉 No-Loss Savings System
        </Badge>
        <h1 className="cuphead-text mb-4 text-4xl font-bold text-[#2C1810]">
          Lucky Saving
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-semibold text-[#5D4E37]">
          Save, earn interest and participate in weekly prize draws. Your
          capital is always protected.
        </p>
      </div>

      {/* Stats Cards con animación */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 transition-all hover:scale-110 hover:shadow-[6px_6px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold tracking-wider text-[#5D4E37] uppercase">
                Total Pool
              </p>
              <p className="cuphead-text mt-2 text-3xl font-bold text-[#D62828]">
                ${(poolData.totalPool / 1000).toFixed(1)}M
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-[#2C1810]" />
          </div>
        </Card>

        <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 transition-all hover:scale-110 hover:shadow-[6px_6px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold tracking-wider text-[#5D4E37] uppercase">
                Next Prize
              </p>
              <p className="cuphead-text mt-2 text-3xl font-bold text-[#D62828]">
                ${poolData.prize.toLocaleString()}
              </p>
            </div>
            <Trophy className="h-8 w-8 text-[#FFD93D]" />
          </div>
        </Card>

        <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-6 transition-all hover:scale-110 hover:shadow-[6px_6px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold tracking-wider text-[#5D4E37] uppercase">
                Average APY
              </p>
              <p className="cuphead-text mt-2 text-3xl font-bold text-[#2C1810]">
                ~{poolData.apy}%
              </p>
            </div>
            <Coins className="h-8 w-8 text-[#2C1810]" />
          </div>
        </Card>
      </div>

      {/* Cómo Funciona */}
      <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-8 shadow-2xl">
        <h2 className="cuphead-text mb-6 text-2xl font-bold text-[#2C1810]">
          How It Works?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2C1810] bg-[#FFD93D] shadow-lg">
                <Coins className="h-8 w-8 text-[#2C1810]" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-[#2C1810]">1. Buy Tickets</h3>
            <p className="text-sm font-medium text-[#5D4E37]">
              Buy tickets with USDC/XLM. Fixed price of $10 per ticket.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2C1810] bg-[#F4A825] shadow-lg">
                <TrendingUp className="h-8 w-8 text-[#2C1810]" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-[#2C1810]">2. Earn Interest</h3>
            <p className="text-sm font-medium text-[#5D4E37]">
              Your funds generate yield via DeFi protocols (Defindex).
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2C1810] bg-[#fefcf4] shadow-lg">
                <Clock className="h-8 w-8 text-[#D62828]" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-[#2C1810]">3. Weekly Draw</h3>
            <p className="text-sm font-medium text-[#5D4E37]">
              Every Sunday a random selection of winners is executed.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2C1810] bg-[#D62828] shadow-lg">
                <Trophy className="h-8 w-8 text-[#fefcf4]" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-[#2C1810]">4. Win Prizes</h3>
            <p className="text-sm font-medium text-[#5D4E37]">
              Winners receive all the generated interest.
            </p>
          </div>
        </div>
      </Card>

      {/* Beneficios */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start gap-4">
            <Shield className="mt-1 h-6 w-6 text-[#D62828]" />
            <div>
              <h3 className="mb-2 font-bold text-[#2C1810]">No Loss Risk</h3>
              <p className="text-sm font-medium text-[#5D4E37]">
                Your capital is always protected. We only use interest for
                prizes. You can withdraw anytime.
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start gap-4">
            <Zap className="mt-1 h-6 w-6 text-[#FFD93D]" />
            <div>
              <h3 className="mb-2 font-bold text-[#2C1810]">Streak Rewards</h3>
              <p className="text-sm font-medium text-[#5D4E37]">
                Keep your saving streak to increase your APY. Up to 13.5% APY
                for 365-day streaks.
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start gap-4">
            <Users className="mt-1 h-6 w-6 text-[#F4A825]" />
            <div>
              <h3 className="mb-2 font-bold text-[#2C1810]">
                Multiple Winners
              </h3>
              <p className="text-sm font-medium text-[#5D4E37]">
                Each draw has {poolData.winners} winners. More chances to win
                prizes.
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]">
          <div className="flex items-start gap-4">
            <TrendingUp className="mt-1 h-6 w-6 text-[#D62828]" />
            <div>
              <h3 className="mb-2 font-bold text-[#2C1810]">Competitive APY</h3>
              <p className="text-sm font-medium text-[#5D4E37]">
                Above-market returns thanks to yield farming optimization.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA */}
      <Card className="border-4 border-[#2C1810] bg-gradient-to-r from-[#FFD93D] to-[#F4A825] p-8 shadow-2xl">
        <div className="text-center">
          <h2 className="cuphead-outline mb-4 text-2xl font-bold text-[#2C1810]">
            Ready to Start Saving?
          </h2>
          <p className="mb-6 font-bold text-[#5D4E37]">
            Join {poolData.tickets.toLocaleString()} participants who are
            already saving and winning.
          </p>
          <Button
            size="lg"
            className="cursor-pointer border-4 border-[#2C1810] bg-[#D62828] font-bold text-[#fefcf4] shadow-lg transition-all hover:scale-110 hover:bg-[#A02020] hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]"
            onClick={onGetStarted}
          >
            Buy Tickets Now
          </Button>
        </div>
      </Card>
    </div>
  );
}
