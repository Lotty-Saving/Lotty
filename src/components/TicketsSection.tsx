"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useState } from "react";

interface TicketsSectionProps {
  address: string | null;
  ticketAmount: number;
  setTicketAmount: (amount: number) => void;
  mockTickets: Array<{
    id: string;
    amount: string;
    date: string;
  }>;
}

export function TicketsSection({
  address,
  ticketAmount,
  setTicketAmount,
  mockTickets,
}: TicketsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const mockTickets = [] as any;
  const hasTickets = mockTickets.length > 0;

  const handleBuyTickets = () => {
    // Aquí iría la lógica para comprar tickets
    console.log(`Comprando ${ticketAmount} tickets`);
    setIsDialogOpen(false);
    // Reset del formulario
    setTicketAmount(1);
  };

  // Si no hay tickets, mostrar formulario directamente
  if (!hasTickets) {
    return (
      <div className="flex h-full flex-col space-y-6">
        {/* Header con título */}
        <div className="shrink-0">
          <h2 className="text-2xl font-bold text-[#2C1810]">
            <span className="text-primary">{">"}</span> Comprar Tickets
          </h2>
          <p className="mt-2 text-base font-semibold text-[#5D4E37]">
            Compra tu primer ticket y participa en el sorteo
          </p>
        </div>

        {/* Contenido del formulario */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-6 rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-2 block text-xs font-bold uppercase">
                  Cantidad de Tickets
                </label>
                <Input
                  type="number"
                  min="1"
                  value={ticketAmount}
                  onChange={(e) => setTicketAmount(Number(e.target.value))}
                  className="border-foreground bg-background h-12 border-2 text-lg font-bold"
                />
              </div>

              <div className="bg-muted border-foreground/20 rounded-xl border-2 p-4">
                <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                  Precio por Ticket
                </p>
                <p className="text-foreground text-2xl font-black">$10 USD</p>
              </div>

              <div className="bg-primary/20 border-foreground rounded-xl border-2 p-4">
                <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                  Total a Pagar
                </p>
                <p className="text-foreground text-3xl font-black">
                  ${ticketAmount * 10} USD
                </p>
              </div>
            </div>

            <div className="bg-muted border-foreground/20 rounded-xl border-2 p-4">
              <h4 className="text-foreground mb-3 text-sm font-black uppercase">
                Cómo Funciona
              </h4>
              <ul className="text-foreground/80 space-y-2 text-sm font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-black">{">"}</span>
                  <span>Precio fijo: 10 USD por ticket</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-black">{">"}</span>
                  <span>Cada ticket tiene igual probabilidad de ganar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-black">{">"}</span>
                  <span>Sin límite de compra por usuario</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-black">{">"}</span>
                  <span>
                    Tus fondos generan rendimiento mientras participas
                  </span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handleBuyTickets}
              className="border-foreground bg-primary text-primary-foreground h-14 w-full border-4 text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              disabled={ticketAmount === 0}
            >
              <span className="text-primary-foreground">
                {">"} COMPRAR TICKETS
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Si tiene tickets, mostrar tabla
  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Header con título y botón */}
      <div className="flex shrink-0 items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2C1810]">
          <span className="text-primary">{">"}</span> Your Tickets and manage
          your participation
        </h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="border-foreground bg-primary text-primary-foreground h-12 border-4 px-8 text-base font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-primary-foreground">
                {">"} COMPRAR TICKET
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="border-4 border-[#2C1810] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-[#2C1810]">
                Comprar Tickets
              </DialogTitle>
              <DialogDescription className="font-semibold text-[#5D4E37]">
                Selecciona la cantidad de tickets que deseas comprar
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-muted-foreground mb-2 block text-xs font-bold uppercase">
                    Cantidad de Tickets
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={ticketAmount}
                    onChange={(e) => setTicketAmount(Number(e.target.value))}
                    className="border-foreground bg-background h-12 border-2 text-lg font-bold"
                  />
                </div>

                <div className="bg-muted border-foreground/20 rounded-xl border-2 p-4">
                  <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                    Precio por Ticket
                  </p>
                  <p className="text-foreground text-2xl font-black">$10 USD</p>
                </div>

                <div className="bg-primary/20 border-foreground rounded-xl border-2 p-4">
                  <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                    Total a Pagar
                  </p>
                  <p className="text-foreground text-3xl font-black">
                    ${ticketAmount * 10} USD
                  </p>
                </div>
              </div>

              <div className="bg-muted border-foreground/20 rounded-xl border-2 p-4">
                <h4 className="text-foreground mb-3 text-sm font-black uppercase">
                  Cómo Funciona
                </h4>
                <ul className="text-foreground/80 space-y-2 text-sm font-semibold">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-black">{">"}</span>
                    <span>Precio fijo: 10 USD por ticket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-black">{">"}</span>
                    <span>Cada ticket tiene igual probabilidad de ganar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-black">{">"}</span>
                    <span>Sin límite de compra por usuario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-black">{">"}</span>
                    <span>
                      Tus fondos generan rendimiento mientras participas
                    </span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleBuyTickets}
                className="border-foreground bg-primary text-primary-foreground h-14 w-full border-4 text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                disabled={ticketAmount === 0}
              >
                <span className="text-primary-foreground">
                  {">"} COMPRAR TICKETS
                </span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla de tickets */}
      <div className="flex-1 overflow-hidden rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="h-full overflow-y-auto p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-[#2C1810] hover:bg-transparent">
                <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                  Ticket ID
                </TableHead>
                <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                  Monto
                </TableHead>
                <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                  Fecha de Compra
                </TableHead>
                <TableHead className="text-right text-sm font-black text-[#2C1810] uppercase">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTickets.map(
                (
                  ticket: { id: string; amount: string; date: string },
                  idx: number,
                ) => (
                  <TableRow
                    key={idx}
                    className="border-b border-[#2C1810]/20 transition-colors hover:bg-[#FFD93D]/20"
                  >
                    <TableCell className="font-black text-[#2C1810]">
                      {ticket.id}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary text-primary-foreground border-2 border-[#2C1810] font-black">
                        {ticket.amount}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-[#5D4E37]">
                      {ticket.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-[#2C1810] bg-transparent font-black uppercase transition-all hover:bg-[#2C1810] hover:text-[#FFD93D]"
                      >
                        REDEEM
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
