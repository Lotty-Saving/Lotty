"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

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
  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="shrink-0">
        <h2 className="cuphead-text text-2xl font-bold text-[#2C1810]">
          Your Tickets
        </h2>
        <p className="mt-1 text-sm font-bold text-[#5D4E37]">
          Buy tickets and manage your participation
        </p>
      </div>

      <div className="flex w-full flex-1 gap-8">
        <Card className="border-foreground h-full w-1/2 border-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-card pb-1">
            <CardTitle className="flex items-center gap-2 text-2xl font-black uppercase">
              <span className="text-primary">{">"}</span> PURCHASE_TICKET
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-card space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-2 block text-xs font-bold uppercase">
                  Cantidad de Tickets
                </label>
                <Input
                  type="number"
                  min="0"
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
              className="border-foreground bg-primary text-primary-foreground h-14 w-full border-4 text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              disabled={ticketAmount === 0}
            >
              <span className="text-primary-foreground">
                {">"} COMPRAR TICKETS
              </span>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-foreground h-full w-1/2 border-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-card pb-1">
            <CardTitle className="flex items-center gap-2 text-2xl font-black uppercase">
              <span className="text-primary">{">"}</span> YOUR_TICKETS
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-card">
            <div className="space-y-3">
              {mockTickets.map((ticket, idx) => (
                <div
                  key={idx}
                  className="bg-muted border-foreground/20 hover:border-foreground/40 rounded-xl border-2 p-4 transition-colors"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs font-bold uppercase">
                        Ticket ID
                      </p>
                      <p className="text-foreground text-lg font-black">
                        {ticket.id}
                      </p>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground border-foreground border-2 font-black">
                      {ticket.amount}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs font-bold">
                        {ticket.date}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-foreground hover:bg-foreground hover:text-background bg-background border-2 font-black uppercase"
                    >
                      REDEEM
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
