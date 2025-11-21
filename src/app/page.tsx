"use client";
import Image from "next/image";
import { useWallet } from "../hooks/useWallet";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { WalletButton } from "~/components/WalletButton";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useState, useEffect } from "react";
import {
  Loader2,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Coins,
  Clock,
  Trophy,
  Flame,
  Snowflake,
} from "lucide-react";

type TabId = "lucky-saving" | "pools" | "profile" | "settings";

export default function HomePage() {
  const { address, signTransaction, isPending } = useWallet();
  const walletState = useWalletBalance();
  const [activeTab, setActiveTab] = useState<TabId>("lucky-saving");
  const [copied, setCopied] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 72,
    minutes: 45,
    seconds: 12,
  });

  // Mock data - En producción esto vendría de la blockchain
  const poolData = {
    totalPool: 1200000,
    prize: 3200,
    apy: 13.5,
    tickets: 120247,
    winners: 15,
    round: 847,
    userTickets: 8,
    userBalance: 80,
  };

  const userStats = {
    streak: 78,
    weekActivity: [true, false, true, true, false, false, false], // Lun-Dom
    currentAPY: 11,
  };

  const mockTickets = [
    { id: "#7F3A", amount: 10, date: "2024-01-15" },
    { id: "#9B2E", amount: 10, date: "2024-01-18" },
    { id: "#4D1C", amount: 10, date: "2024-01-20" },
    { id: "#2A8F", amount: 10, date: "2024-01-22" },
    { id: "#56EF", amount: 10, date: "2024-01-22" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "lucky-saving":
        // Landing Page
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
                🎉 Sistema de Ahorro Sin Pérdida
              </Badge>
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                Lucky Saving
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Ahorra, gana intereses y participa en sorteos semanales. Tu
                capital siempre está protegido.
              </p>
            </div>

            {/* Stats Cards con animación */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-6 transition-transform hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">
                      Pool Total
                    </p>
                    <p className="mt-2 text-3xl font-bold text-purple-900">
                      ${(poolData.totalPool / 1000).toFixed(1)}M
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </Card>

              <Card className="border-green-200 bg-linear-to-br from-green-50 to-green-100 p-6 transition-transform hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Próximo Premio
                    </p>
                    <p className="mt-2 text-3xl font-bold text-green-900">
                      ${poolData.prize.toLocaleString()}
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
              </Card>

              <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-6 transition-transform hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      APY Promedio
                    </p>
                    <p className="mt-2 text-3xl font-bold text-blue-900">
                      ~{poolData.apy}%
                    </p>
                  </div>
                  <Coins className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
            </div>

            {/* Cómo Funciona */}
            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                ¿Cómo Funciona?
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                      <Coins className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    1. Compra Tickets
                  </h3>
                  <p className="text-sm text-gray-600">
                    Compra tickets con USDC/XLM. Precio fijo de $10 por ticket.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    2. Genera Intereses
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tus fondos generan rendimiento vía protocolos DeFi
                    (Defindex).
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Clock className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    3. Sorteo Semanal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cada domingo se ejecuta la selección aleatoria de ganadores.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                      <Trophy className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    4. Gana Premios
                  </h3>
                  <p className="text-sm text-gray-600">
                    Los ganadores reciben todos los intereses generados.
                  </p>
                </div>
              </div>
            </Card>

            {/* Beneficios */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="mt-1 h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Sin Riesgo de Pérdida
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tu capital siempre está protegido. Solo usamos los
                      intereses para los premios. Puedes retirar en cualquier
                      momento.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Zap className="mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Recompensas por Racha
                    </h3>
                    <p className="text-sm text-gray-600">
                      Mantén tu racha de ahorro para aumentar tu APY. Hasta
                      13.5% APY para rachas de 365 días.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Users className="mt-1 h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Múltiples Ganadores
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cada sorteo tiene {poolData.winners} ganadores. Más
                      oportunidades de ganar premios.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="mt-1 h-6 w-6 text-orange-600" />
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      APY Competitivo
                    </h3>
                    <p className="text-sm text-gray-600">
                      Rendimientos superiores al promedio del mercado gracias a
                      la optimización de yield farming.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA */}
            <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-8">
              <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  ¿Listo para empezar a ahorrar?
                </h2>
                <p className="mb-6 text-gray-600">
                  Únete a los {poolData.tickets.toLocaleString()} participantes
                  que ya están ahorrando y ganando.
                </p>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setActiveTab("pools")}
                >
                  Comprar Tickets Ahora
                </Button>
              </div>
            </Card>
          </div>
        );

      case "pools":
        // Pools + Tickets Section
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Pool de Liquidez
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Información del pool actual y gestiona tus tickets
              </p>
            </div>

            {!address && (
              <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <Shield className="mb-4 h-16 w-16 text-blue-600" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Conecta tu Wallet
                  </h3>
                  <p className="text-sm text-gray-600">
                    Conecta tu wallet para participar en el pool
                  </p>
                </div>
              </Card>
            )}

            {address && (
              <>
                {/* Pool Info Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pool Total</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          ${(poolData.totalPool / 1000).toFixed(1)}M USD
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          ≈ ${(poolData.totalPool * 1000).toLocaleString()} ARS
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Premio ({poolData.apy}% APY)
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          ${poolData.prize.toLocaleString()} USD
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          ≈ ${(poolData.prize * 1781).toLocaleString()} ARS
                        </p>
                      </div>
                      <Trophy className="h-8 w-8 text-yellow-600" />
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Próximo Sorteo</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          {String(timeRemaining.hours).padStart(2, "0")}:
                          {String(timeRemaining.minutes).padStart(2, "0")}:
                          {String(timeRemaining.seconds).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Round #{poolData.round}
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                  </Card>
                </div>

                {/* Additional Pool Stats */}
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Estadísticas del Pool
                  </h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-gray-600">APY</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">
                        ~{poolData.apy}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tickets Totales</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">
                        {poolData.tickets.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ganadores</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">
                        {poolData.winners}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tu Estado</p>
                      <Badge className="mt-1 bg-green-100 text-green-700">
                        Participando
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Purchase Tickets */}
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Comprar Tickets
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Cantidad de Tickets
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={ticketAmount}
                        onChange={(e) =>
                          setTicketAmount(Number(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Precio por ticket:
                        </span>
                        <span className="font-semibold">$10.00 USD</span>
                      </div>
                      <div className="mt-2 flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total a pagar:</span>
                        <span className="text-purple-600">
                          ${(ticketAmount * 10).toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <h4 className="mb-2 font-semibold text-blue-900">
                        Cómo Funciona
                      </h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>• Precio fijo: 10 USD por ticket</li>
                        <li>• Cada ticket tiene igual probabilidad de ganar</li>
                        <li>• Sin límite de compra por usuario</li>
                        <li>
                          • Tus fondos generan rendimiento mientras participas
                        </li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      Comprar Tickets
                    </Button>
                  </div>
                </Card>

                {/* Your Tickets */}
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Tus Tickets
                  </h3>
                  <div className="space-y-3">
                    {mockTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-lg bg-purple-100 p-3">
                            <Coins className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-mono font-semibold text-gray-900">
                              {ticket.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              {ticket.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${ticket.amount.toFixed(2)} USD
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Redeem
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        );

      case "profile":
        // User Stats Section
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
                    Compra tickets 3 de 7 días de la semana para mantener tu
                    racha
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
                              reward.active
                                ? "text-orange-900"
                                : "text-gray-600"
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

      default:
        return <div>Sección en desarrollo</div>;
    }
  };

  return (
    <main className="relative flex h-screen w-screen flex-col bg-[#e8e6f0]">
      {/* Header */}
      <header className="flex w-full justify-between px-6 py-2">
        <Image src="/lotty.png" alt="Lotty" width={80} height={36} />
        <WalletButton />
      </header>

      {/* Contenido principal */}
      <section className="flex h-[calc(100vh-54px)] w-full gap-4 p-6 pt-0">
        {/* Navegación */}
        <nav className="h-full w-full max-w-[280px] rounded-2xl py-4">
          <div className="flex flex-col gap-4">
            {[
              {
                id: "lucky-saving" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                label: "Lucky Saving",
              },
              {
                id: "pools" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                label: "Pools de liquidez",
              },
              {
                id: "profile" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ),
                label: "Tu perfil",
              },
              {
                id: "settings" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                label: "Configuración",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-[#d3d1e0] text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100/50"
                }`}
              >
                <span
                  className={
                    activeTab === item.id ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <Card className="flex-1 overflow-y-auto scroll-auto bg-white p-6">
          {renderContent()}
        </Card>
      </section>
    </main>
  );
}
