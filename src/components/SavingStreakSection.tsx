"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Users } from "lucide-react";
import Image from "next/image";
interface SavingStreakSectionProps {
  address: string | null;
  userStats: {
    streak: number;
    weekActivity: boolean[];
    currentAPY: number;
  };
}

const fireIcon = (
  <Image src="/lottyFire.png" alt="Fire" width={64} height={64} />
);
const snowflakeIcon = (
  <Image src="/lottyCopo.png" alt="Snowflake" width={64} height={64} />
);

export function SavingStreakSection({
  address,
  userStats,
}: SavingStreakSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2C1810]">Saving Streak</h2>
        <p className="mt-1 text-sm font-bold text-[#5D4E37]">
          Keep your consistency and get better rewards
        </p>
      </div>

      {!address && (
        <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center">
            <Users className="mb-4 h-16 w-16 text-[#2C1810]" />
            <h3 className="mb-2 text-xl font-bold text-[#2C1810]">
              Connect Your Wallet
            </h3>
            <p className="text-sm font-bold text-[#5D4E37]">
              Connect your wallet to see your streak
            </p>
          </div>
        </Card>
      )}

      {address && (
        <>
          {/* Saving Streak */}
          <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-bold text-[#2C1810]">
              Your Current Streak
            </h3>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border-4 border-[#2C1810] bg-[#FFD93D] px-6 py-3 shadow-lg">
                {fireIcon}
                <span className="text-3xl font-bold text-[#2C1810]">
                  {userStats.streak}
                </span>
                <span className="text-sm font-bold text-[#5D4E37]">days</span>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="mb-4">
              <p className="mb-3 text-sm font-bold text-[#2C1810] uppercase">
                Weekly Activity
              </p>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <div key={day} className="text-center">
                      <div
                        className={`mb-2 flex h-12 w-full items-center justify-center rounded-lg border-3 border-[#2C1810] ${
                          userStats.weekActivity[index]
                            ? "bg-[#FFD93D]"
                            : "bg-[#fefcf4]"
                        }`}
                      >
                        {userStats.weekActivity[index]
                          ? fireIcon
                          : snowflakeIcon}
                      </div>
                      <p className="text-xs font-bold text-[#5D4E37]">{day}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <p className="text-center text-sm font-bold text-[#5D4E37]">
              Buy tickets 3 of 7 days a week to keep your streak
            </p>
          </Card>

          {/* Streak Rewards */}
          <Card className="border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-bold text-[#2C1810]">
              Streak Rewards
            </h3>
            <p className="mb-4 text-sm font-bold text-[#5D4E37]">
              Keep your streak to unlock higher APY rates!
            </p>
            <div className="space-y-3">
              {[
                { days: 0, apy: 8, active: true },
                { days: 7, apy: 9, active: true },
                { days: 30, apy: 10, active: true },
                { days: 60, apy: 11, active: true },
                { days: 100, apy: 12, active: false },
                { days: 365, apy: 13, active: false },
              ].map((reward) => (
                <div
                  key={reward.days}
                  className={`flex items-center justify-between rounded-lg border-3 border-[#2C1810] p-4 transition-all hover:scale-102 ${
                    reward.active ? "bg-[#FFD93D]" : "bg-[#fefcf4]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {reward.active ? fireIcon : snowflakeIcon}
                    <span
                      className={`font-bold ${
                        reward.active ? "text-[#2C1810]" : "text-[#5D4E37]"
                      }`}
                    >
                      {reward.days} days
                    </span>
                  </div>
                  <Badge
                    className={
                      reward.active
                        ? "border-2 border-[#2C1810] bg-[#D62828] font-bold text-[#fefcf4]"
                        : "border-2 border-[#2C1810] bg-[#E8D5B7] font-bold text-[#5D4E37]"
                    }
                  >
                    {reward.apy}% APY
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Tips Card */}
          <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              {fireIcon}
              <div>
                <h3 className="mb-2 text-lg font-bold text-[#2C1810]">
                  Streak Tips
                </h3>
                <ul className="space-y-2 text-sm font-bold text-[#5D4E37]">
                  <li>
                    • Buy tickets at least 3 days a week to maintain your streak
                  </li>
                  <li>• The longer your streak, the higher your APY rewards</li>
                  <li>
                    • Don't break your streak! Set reminders to stay consistent
                  </li>
                  <li>
                    • Your APY increases automatically as you hit milestones
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
