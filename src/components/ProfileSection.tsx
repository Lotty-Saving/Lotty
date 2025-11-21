"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Users,
  Coins,
  Trophy,
  TrendingUp,
  Flame,
  Snowflake,
} from "lucide-react";

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
        <h2 className="text-2xl font-bold text-gray-900">Tu Perfil</h2>
        <p className="mt-1 text-sm text-gray-600">
          Estadísticas y progreso de tus ahorros
        </p>
      </div>

      {!address && (
        <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <Users className="mb-4 h-16 w-16 text-blue-600" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Conecta tu Wallet
            </h3>
            <p className="text-sm text-gray-600">
              Conecta tu wallet para ver tus estadísticas
            </p>
          </div>
        </Card>
      )}

      {address && (
        <>
          {/* User Overview */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    Balance Total
                  </p>
                  <p className="mt-2 text-3xl font-bold text-purple-900">
                    ${poolData.userBalance}
                  </p>
                </div>
                <Coins className="h-8 w-8 text-purple-600" />
              </div>
            </Card>

            <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Tickets Activos
                  </p>
                  <p className="mt-2 text-3xl font-bold text-blue-900">
                    {poolData.userTickets}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </Card>

            <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">
                    APY Actual
                  </p>
                  <p className="mt-2 text-3xl font-bold text-orange-900">
                    {userStats.currentAPY}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </Card>
          </div>

          {/* Saving Streak */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Racha de Ahorro
            </h3>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-6 py-3">
                <Flame className="h-6 w-6 text-orange-600" />
                <span className="text-3xl font-bold text-orange-900">
                  {userStats.streak}
                </span>
                <span className="text-sm font-medium text-orange-700">
                  días
                </span>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="mb-4">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Actividad Semanal
              </p>
              <div className="grid grid-cols-7 gap-2">
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(
                  (day, index) => (
                    <div key={day} className="text-center">
                      <div
                        className={`mb-2 flex h-12 w-full items-center justify-center rounded-lg ${
                          userStats.weekActivity[index]
                            ? "bg-orange-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {userStats.weekActivity[index] ? (
                          <Flame className="h-6 w-6 text-orange-600" />
                        ) : (
                          <Snowflake className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{day}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <p className="text-center text-sm text-gray-600">
              Compra tickets 3 de 7 días de la semana para mantener tu racha
            </p>
          </Card>

          {/* Streak Rewards */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Recompensas por Racha
            </h3>
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
                  className={`flex items-center justify-between rounded-lg p-4 ${
                    reward.active
                      ? "border border-orange-200 bg-orange-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {reward.active ? (
                      <Flame className="h-5 w-5 text-orange-600" />
                    ) : (
                      <Snowflake className="h-5 w-5 text-gray-400" />
                    )}
                    <span
                      className={`font-medium ${
                        reward.active ? "text-orange-900" : "text-gray-600"
                      }`}
                    >
                      {reward.days} días
                    </span>
                  </div>
                  <Badge
                    className={
                      reward.active
                        ? "bg-orange-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }
                  >
                    {reward.apy}% APY
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Wallet Info */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Información de Wallet
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 py-2">
                <span className="text-sm font-medium text-gray-600">
                  Dirección:
                </span>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-900 transition-colors hover:bg-gray-100">
                          {address.slice(0, 4)}...{address.slice(-4)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-mono text-xs">{address}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <button
                    onClick={() => copyToClipboard(address)}
                    className="rounded p-1 transition-colors hover:bg-gray-100"
                    aria-label="Copiar dirección"
                  >
                    {copied ? (
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 py-2">
                <span className="text-sm font-medium text-gray-600">
                  Balance XLM:
                </span>
                <span className="font-semibold text-gray-900">
                  {walletState.xlm}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-600">
                  Balance USDC:
                </span>
                <span className="font-semibold text-gray-900">
                  {walletState.usdc}
                </span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
