"use client";

import { useState, useEffect } from "react";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getTimeUntilNextSunday } from "~/utils/timeUtils";

interface PoolsSectionProps {
  address: string | null;
  poolData: {
    totalPool: number;
    prize: number;
    apy: number;
    tickets: number;
    winners: number;
    round: number;
    userTickets: number;
  };
}

// Mock data para historial de ganadores
const mockWinnerHistory = [
  {
    poolId: "#847",
    date: "2024-01-20",
    prize: "$3,200",
    ticketId: "#7F3A",
    totalTickets: 120247,
    winners: 15,
  },
  {
    poolId: "#846",
    date: "2024-01-13",
    prize: "$2,850",
    ticketId: "#9B2E",
    totalTickets: 115823,
    winners: 12,
  },
  {
    poolId: "#845",
    date: "2024-01-06",
    prize: "$3,100",
    ticketId: "#4D1C",
    totalTickets: 118456,
    winners: 14,
  },
  {
    poolId: "#844",
    date: "2023-12-30",
    prize: "$2,950",
    ticketId: "#2A8F",
    totalTickets: 112390,
    winners: 13,
  },
  {
    poolId: "#843",
    date: "2023-12-23",
    prize: "$3,400",
    ticketId: "#5K9P",
    totalTickets: 125678,
    winners: 16,
  },
];

export function PoolsSection({ address, poolData }: PoolsSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilNextSunday());
  const isParticipating = poolData.userTickets > 0;

  // Actualizar el contador cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeUntilNextSunday());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-bold text-[#2C1810]">
          <span className="text-primary">{">"}</span> Pool Information and
          Statistics
        </h2>
        <p className="mt-2 text-base font-semibold text-[#5D4E37]">
          Round #{poolData.round} • Próximo sorteo en{" "}
          {String(timeRemaining.hours).padStart(2, "0")}:
          {String(timeRemaining.minutes).padStart(2, "0")}:
          {String(timeRemaining.seconds).padStart(2, "0")}
        </p>
      </div>

      {/* Grid Principal de Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Dinero Acumulado */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-3xl">💰</p>
            <p className="mt-2 text-xs font-bold text-[#5D4E37] uppercase">
              Dinero Acumulado
            </p>
            <p className="mt-2 text-2xl font-black text-[#2C1810]">
              ${(poolData.totalPool / 1000).toFixed(0)}K
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
              USD en el pool
            </p>
          </div>
        </div>

        {/* Premio Semanal */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#FFD93D] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-3xl">🏆</p>
            <p className="mt-2 text-xs font-bold text-[#2C1810] uppercase">
              Premio Semanal
            </p>
            <p className="mt-2 text-2xl font-black text-[#2C1810]">
              ${poolData.prize.toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#2C1810]">
              Para {poolData.winners} ganadores
            </p>
          </div>
        </div>

        {/* Tickets Participando */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-3xl">🎟️</p>
            <p className="mt-2 text-xs font-bold text-[#5D4E37] uppercase">
              Tickets Participando
            </p>
            <p className="mt-2 text-2xl font-black text-[#2C1810]">
              {poolData.tickets.toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
              tickets en total
            </p>
          </div>
        </div>

        {/* Participación del Usuario */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-3xl">👤</p>
            <p className="mt-2 text-xs font-bold text-[#5D4E37] uppercase">
              Tu Participación
            </p>
            {isParticipating ? (
              <>
                <p className="mt-2 text-2xl font-black text-[#FFD93D]">
                  {poolData.userTickets}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
                  tickets activos
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-xl font-black text-[#2C1810]">
                  No Participas
                </p>
                <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
                  Compra tickets
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grid Secundario de Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Tiempo Restante */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-xs font-bold text-[#5D4E37] uppercase">
              ⏱️ Tiempo Restante
            </p>
            <p className="mt-2 text-3xl font-black text-[#2C1810]">
              {String(timeRemaining.hours).padStart(2, "0")}:
              {String(timeRemaining.minutes).padStart(2, "0")}:
              {String(timeRemaining.seconds).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
              Hasta el sorteo
            </p>
          </div>
        </div>

        {/* APY */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-xs font-bold text-[#5D4E37] uppercase">
              📈 Rendimiento APY
            </p>
            <p className="mt-2 text-3xl font-black text-[#2C1810]">
              {poolData.apy}%
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
              Anual estimado
            </p>
          </div>
        </div>

        {/* Ganadores */}
        <div className="rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-xs font-bold text-[#5D4E37] uppercase">
              🎊 Cantidad de Ganadores
            </p>
            <p className="mt-2 text-3xl font-black text-[#2C1810]">
              {poolData.winners}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5D4E37]">
              ganadores esta ronda
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de Historial de Ganadores */}
      <div className="flex-1 overflow-hidden">
        <div className="mb-4 shrink-0">
          <h3 className="text-xl font-bold text-[#2C1810]">
            <span className="text-primary">{">"}</span> Historial de Ganadores
          </h3>
          <p className="mt-1 text-sm font-semibold text-[#5D4E37]">
            Resultados de pools anteriores
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="max-h-[300px] overflow-y-auto p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-[#2C1810] hover:bg-transparent">
                  <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                    Pool ID
                  </TableHead>
                  <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                    Fecha
                  </TableHead>
                  <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                    Premio
                  </TableHead>

                  <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                    Total Tickets
                  </TableHead>
                  <TableHead className="text-right text-sm font-black text-[#2C1810] uppercase">
                    Ganadores
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWinnerHistory.map(
                  (
                    record: {
                      poolId: string;
                      date: string;
                      prize: string;
                      ticketId: string;
                      totalTickets: number;
                      winners: number;
                    },
                    idx: number,
                  ) => (
                    <TableRow
                      key={idx}
                      className="border-b border-[#2C1810]/20 transition-colors hover:bg-[#FFD93D]/20"
                    >
                      <TableCell className="font-black text-[#2C1810]">
                        {record.poolId}
                      </TableCell>
                      <TableCell className="font-semibold text-[#5D4E37]">
                        {record.date}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-primary text-primary-foreground border-2 border-[#2C1810] font-black">
                          {record.prize}
                        </Badge>
                      </TableCell>

                      <TableCell className="font-semibold text-[#5D4E37]">
                        {record.totalTickets.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-black text-[#2C1810]">
                        {record.winners}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
