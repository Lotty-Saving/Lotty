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
        <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
          🎉 Sistema de Ahorro Sin Pérdida
        </Badge>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Lucky Saving</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Ahorra, gana intereses y participa en sorteos semanales. Tu capital
          siempre está protegido.
        </p>
      </div>

      {/* Stats Cards con animación */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-6 transition-transform hover:scale-105">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Pool Total</p>
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
              <p className="text-sm font-medium text-blue-700">APY Promedio</p>
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
              Tus fondos generan rendimiento vía protocolos DeFi (Defindex).
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
                Tu capital siempre está protegido. Solo usamos los intereses
                para los premios. Puedes retirar en cualquier momento.
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
                Mantén tu racha de ahorro para aumentar tu APY. Hasta 13.5% APY
                para rachas de 365 días.
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
                Rendimientos superiores al promedio del mercado gracias a la
                optimización de yield farming.
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
            Únete a los {poolData.tickets.toLocaleString()} participantes que ya
            están ahorrando y ganando.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={onGetStarted}
          >
            Comprar Tickets Ahora
          </Button>
        </div>
      </Card>
    </div>
  );
}
