"use client";

import { Badge } from "~/components/ui/badge";
import Image from "next/image";

interface SavingStreakSectionProps {
  address: string | null;
  userStats: {
    streak: number;
    weekActivity: boolean[];
    currentAPY: number;
  };
}

const fireIconSmall = (
  <Image src="/lottyFire.png" alt="Fire" width={64} height={64} />
);
const snowflakeIconSmall = (
  <Image src="/lottyCopo.png" alt="Snowflake" width={64} height={64} />
);

// Función para determinar el nivel actual y siguiente basado en el streak
function getStreakLevels(streak: number) {
  const levels = [
    { days: 0, apy: 8 },
    { days: 7, apy: 9 },
    { days: 30, apy: 10 },
    { days: 60, apy: 11 },
    { days: 100, apy: 12 },
    { days: 365, apy: 13 },
  ];

  let currentIndex = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (streak >= levels[i]!.days) {
      currentIndex = i;
      break;
    }
  }

  return {
    current: levels[currentIndex]!,
    next: levels[currentIndex + 1],
    then: levels[currentIndex + 2],
  };
}

export function SavingStreakSection({
  address,
  userStats,
}: SavingStreakSectionProps) {
  const streakLevels = getStreakLevels(userStats.streak);
  const activeCount = userStats.weekActivity.filter(Boolean).length;

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Header con Racha */}
      <div className="shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2C1810]">
              <span className="text-primary">{">"}</span> TU RACHA
            </h2>
            <p className="mt-2 text-base font-semibold text-[#5D4E37]">
              Compra tickets 3 de 7 días de la semana para mantener tu racha
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-5xl font-black text-[#2C1810]">
              {userStats.streak}
            </span>
            {fireIconSmall}
          </div>
        </div>
      </div>

      {/* Resumen de tu semana */}
      <div className="shrink-0 rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#2C1810]">
            resumen de tu semana
          </h3>
          <p className="text-base font-bold text-[#5D4E37]">
            {activeCount}/7 tickets comprados
          </p>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {[
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
          ].map((day, index) => (
            <div
              key={day}
              className={`flex flex-col items-center justify-center rounded-2xl border-3 border-[#2C1810] p-3 transition-all ${
                userStats.weekActivity[index]
                  ? "bg-[#ffd93d] text-[#5D4E37]"
                  : "bg-[#E8E8E8] text-[#5D4E37]"
              }`}
            >
              <span className="mb-2 text-xs font-bold">{day}</span>
              <div className="text-2xl">
                {userStats.weekActivity[index]
                  ? fireIconSmall
                  : snowflakeIconSmall}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout de Progression y Rewards */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Streak Progression */}
        <div className="space-y-4">
          {/* Current Level */}
          <div className="rounded-2xl border-4 border-[#2C1810] bg-[#FFD93D] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-2 text-xs font-bold text-[#5D4E37] uppercase">
              CURRENT
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-[#2C1810] bg-[#FFD93D]">
                  <span className="text-lg font-black text-[#2C1810]">
                    {streakLevels.current.days}d
                  </span>
                </div>
              </div>
              <Badge className="border-2 border-[#2C1810] bg-[#2C1810] px-4 py-2 text-base font-black text-[#FFD93D]">
                {streakLevels.current.apy}% APY
              </Badge>
            </div>
          </div>

          {/* Next and Then Levels */}
          {streakLevels.next && (
            <div className="flex gap-4">
              <div className="flex-1 rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="mb-2 text-xs font-bold text-[#5D4E37] uppercase">
                  NEXT
                </p>
                <div className="text-center">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-3 border-[#2C1810] bg-[#E8E8E8]">
                    <span className="text-sm font-black text-[#2C1810]">
                      {streakLevels.next.days}d
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#5D4E37]">
                    {streakLevels.next.apy}%
                  </p>
                </div>
              </div>

              {streakLevels.then && (
                <div className="flex-1 rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="mb-2 text-xs font-bold text-[#5D4E37] uppercase">
                    THEN
                  </p>
                  <div className="text-center">
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-3 border-[#2C1810] bg-[#E8E8E8]">
                      <span className="text-sm font-black text-[#2C1810]">
                        {streakLevels.then.days}d
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#5D4E37]">
                      {streakLevels.then.apy}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Benefits Checklist */}
          <div className="space-y-2">
            <div className="rounded-xl border-3 border-[#2C1810] bg-[#FFD93D] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#2C1810]">✓</span>
                <span className="text-sm font-bold text-[#2C1810]">
                  buy tickets daily
                </span>
              </div>
            </div>
            <div className="rounded-xl border-3 border-[#2C1810] bg-[#fefcf4] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#2C1810]">✓</span>
                <span className="text-sm font-bold text-[#2C1810]">
                  keep your streak
                </span>
              </div>
            </div>
            <div className="rounded-xl border-3 border-[#2C1810] bg-[#fefcf4] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#2C1810]">✓</span>
                <span className="text-sm font-bold text-[#2C1810]">
                  win bigger prizes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* All Rewards */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="mb-4 text-base font-bold text-[#5D4E37] uppercase">
            ALL REWARDS
          </h3>
          <div className="space-y-3">
            {[
              { days: 0, apy: 8, unlocked: true },
              { days: 7, apy: 9, unlocked: userStats.streak >= 7 },
              { days: 30, apy: 10, unlocked: userStats.streak >= 30 },
              { days: 60, apy: 11, unlocked: userStats.streak >= 60 },
              { days: 100, apy: 12, unlocked: userStats.streak >= 100 },
              { days: 365, apy: 13, unlocked: userStats.streak >= 365 },
            ].map((reward) => (
              <div
                key={reward.days}
                className={`flex items-center justify-between rounded-xl border-3 border-[#2C1810] p-4 transition-all ${
                  reward.unlocked ? "bg-[#FFF9E6]" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {reward.unlocked ? "✓" : "❄️"}
                  </span>
                  <span className="font-bold text-[#2C1810]">
                    {reward.days} días
                  </span>
                </div>
                <Badge
                  className={`border-2 border-[#2C1810] px-3 py-1 font-black ${
                    reward.unlocked
                      ? "bg-[#2C1810] text-white"
                      : "bg-[#E8E8E8] text-[#5D4E37]"
                  }`}
                >
                  {reward.apy}% APY
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
