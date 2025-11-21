"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Shield, TrendingUp, Trophy, Clock, Coins } from "lucide-react";

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
  ticketAmount: number;
  setTicketAmount: (amount: number) => void;
  mockTickets: Array<{
    id: string;
    amount: number;
    date: string;
  }>;
}

export function PoolsSection({
  address,
  poolData,
  timeRemaining,
  ticketAmount,
  setTicketAmount,
  mockTickets,
}: PoolsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pool de Liquidez</h2>
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
                  onChange={(e) => setTicketAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio por ticket:</span>
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
                  <li>• Tus fondos generan rendimiento mientras participas</li>
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
                      <p className="text-sm text-gray-600">{ticket.date}</p>
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
}
