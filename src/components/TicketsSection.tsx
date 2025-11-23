"use client";

import { Button } from "~/components/ui/button";
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
import { BuyTicketsForm } from "~/components/BuyTicketsForm";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { currentTestnet, sdk } from "~/hooks/useDefindex";
import { useWallet } from "~/hooks/useWallet";

interface TicketsSectionProps {
  address: string | null;
  ticketAmount: number;
  setTicketAmount: (amount: number) => void;
  mockTickets: Array<{
    id: string;
    amount: string;
    date: string;
    envelopeXdr?: string;
    redeemed?: boolean;
    withdrawXdr?: string;
  }>;
  onTicketsPurchased?: (
    tickets: Array<{
      id: string;
      amount: string;
      date: string;
      envelopeXdr?: string;
      redeemed?: boolean;
      withdrawXdr?: string;
    }>,
  ) => void;
  onTicketRedeemed?: (ticketId: string, withdrawXdr: string) => void;
}

export function TicketsSection({
  address,
  ticketAmount,
  setTicketAmount,
  mockTickets,
  onTicketsPurchased,
  onTicketRedeemed,
}: TicketsSectionProps) {
  const { signTransaction } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [redeemingTicketId, setRedeemingTicketId] = useState<string | null>(
    null,
  );
  // const mockTickets = [] as any;
  const hasTickets = mockTickets.length > 0;

  const copyEnvelopeXdr = async (envelopeXdr: string, ticketId: string) => {
    try {
      await navigator.clipboard.writeText(envelopeXdr);
      setCopiedId(ticketId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleRedeem = async (ticketId: string) => {
    if (!signTransaction || !address || redeemingTicketId) return;

    setRedeemingTicketId(ticketId);
    try {
      // Precio fijo por ticket: 1000000000 shares
      const withdrawShares = 1000000000;

      // Preparar el withdraw desde el vault usando withdrawShares
      const withdrawResponse = await sdk.withdrawShares(
        process.env.NEXT_PUBLIC_VAULT_ADDRESS!,
        {
          shares: withdrawShares,
          caller: address,
          slippageBps: 100, // 1% slippage tolerance
        },
        currentTestnet,
      );

      if (!withdrawResponse?.xdr) {
        throw new Error("No XDR returned from withdraw");
      }

      // Firmar la transacción
      const signedXDR = await signTransaction(withdrawResponse.xdr);

      console.log("Signed withdraw XDR:", signedXDR);

      // Enviar la transacción
      const result = await sdk.sendTransaction(
        signedXDR.signedTxXdr,
        currentTestnet,
        false,
      );

      console.log("Withdraw result:", result);

      // Actualizar el ticket con el estado de redeemed y el withdrawXdr
      if (onTicketRedeemed && result.envelopeXdr) {
        onTicketRedeemed(ticketId, result.envelopeXdr);
      }

      // Aquí podrías agregar una notificación de éxito
    } catch (error) {
      console.error("Error redeeming ticket:", error);
      // Aquí podrías agregar una notificación de error
    } finally {
      setRedeemingTicketId(null);
    }
  };

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
            <span className="text-primary">{">"}</span> Buy Tickets
          </h2>
          <p className="mt-2 text-base font-semibold text-[#5D4E37]">
            Buy your first ticket and participate in the draw
          </p>
        </div>

        {/* Contenido del formulario */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border-4 border-[#2C1810] bg-[#fefcf4] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <BuyTicketsForm
              ticketAmount={ticketAmount}
              setTicketAmount={setTicketAmount}
              address={address!}
              isInline={true}
              onTicketsPurchased={(tickets) => {
                if (onTicketsPurchased) {
                  onTicketsPurchased(tickets);
                }
                setIsDialogOpen(false);
              }}
            />
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
            <Button className="bg-primary text-primary-foreground h-12 border-4 border-[#2C1810] px-8 text-base font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-primary-foreground">{">"} BUY TICKET</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="border-4 border-[#2C1810] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-[#2C1810]">
                Buy Tickets
              </DialogTitle>
              <DialogDescription className="font-semibold text-[#5D4E37]">
                Select the number of tickets you want to buy
              </DialogDescription>
            </DialogHeader>

            <BuyTicketsForm
              ticketAmount={ticketAmount}
              setTicketAmount={setTicketAmount}
              address={address!}
              onTicketsPurchased={(tickets) => {
                if (onTicketsPurchased) {
                  onTicketsPurchased(tickets);
                }
                setIsDialogOpen(false);
              }}
            />
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
                  Amount
                </TableHead>
                <TableHead className="text-sm font-black text-[#2C1810] uppercase">
                  Purchase Date
                </TableHead>
                <TableHead className="text-right text-sm font-black text-[#2C1810] uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTickets.map(
                (
                  ticket: {
                    id: string;
                    amount: string;
                    date: string;
                    envelopeXdr?: string;
                    redeemed?: boolean;
                    withdrawXdr?: string;
                  },
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
                      <div className="flex items-center justify-end gap-2">
                        {(ticket.envelopeXdr ?? ticket.withdrawXdr) && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyEnvelopeXdr(
                                      ticket.withdrawXdr ?? ticket.envelopeXdr!,
                                      ticket.id,
                                    )
                                  }
                                  className="border-2 border-[#2C1810] bg-transparent font-black uppercase transition-all hover:bg-[#2C1810] hover:text-[#FFD93D]"
                                >
                                  {copiedId === ticket.id
                                    ? "COPIED!"
                                    : ticket.withdrawXdr
                                      ? "COPY WITHDRAW XDR"
                                      : "COPY XDR"}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {ticket.withdrawXdr
                                    ? "Copy withdraw transaction XDR"
                                    : "Copy deposit transaction XDR"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRedeem(ticket.id)}
                          disabled={
                            redeemingTicketId === ticket.id || ticket.redeemed
                          }
                          className={`border-2 font-black uppercase transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                            ticket.redeemed
                              ? "border-green-600 bg-green-500 text-white hover:bg-green-600"
                              : "border-[#2C1810] bg-transparent hover:bg-[#2C1810] hover:text-[#FFD93D]"
                          }`}
                        >
                          {redeemingTicketId === ticket.id ? (
                            <span className="flex items-center gap-2">
                              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                              REDEEMING...
                            </span>
                          ) : ticket.redeemed ? (
                            <span className="flex items-center gap-2">
                              <span className="text-lg">✓</span>
                              REDEEMED
                            </span>
                          ) : (
                            "REDEEM"
                          )}
                        </Button>
                      </div>
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
