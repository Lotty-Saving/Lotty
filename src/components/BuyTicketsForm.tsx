"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { currentTestnet, sdk } from "~/hooks/useDefindex";
import { useWallet } from "~/hooks/useWallet";
import { toBaseUnits } from "~/utils/xlmCovert";
import { xdr } from "@stellar/stellar-sdk";
import { sorobanServer } from "~/hooks/useRiffle";
import { depositToVault } from "~/soroban/deposit";

interface BuyTicketsFormProps {
  ticketAmount: number;
  setTicketAmount: (amount: number) => void;
  isInline?: boolean; // Para controlar si está dentro de un dialog o no
  address: string;
}

export function BuyTicketsForm({
  ticketAmount,
  setTicketAmount,
  isInline = false,
  address,
}: BuyTicketsFormProps) {
  const { signTransaction } = useWallet();

  const onBuyTickets = async () => {
    const xlmAmount = toBaseUnits(ticketAmount);

    if (!signTransaction) return;

    await depositToVault({
      userAddress: address,
      amountInUnits: xlmAmount,
      signTransaction,
    });
  };

  return (
    <div className={`space-y-6 ${isInline ? "" : "py-4"}`}>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold text-[#5D4E37] uppercase">
            Number of Tickets
          </label>
          <Input
            type="number"
            min="1"
            value={ticketAmount}
            onChange={(e) => setTicketAmount(Number(e.target.value))}
            className="h-12 border-2 border-[#2C1810] bg-white text-lg font-bold"
          />
        </div>

        <div className="rounded-xl border-3 border-[#2C1810] bg-[#fefcf4] p-4">
          <p className="mb-1 text-xs font-bold text-[#5D4E37] uppercase">
            Price per Ticket
          </p>
          <p className="text-2xl font-black text-[#2C1810]">$10 USD</p>
        </div>

        <div className="rounded-xl border-3 border-[#2C1810] bg-[#FFD93D] p-4">
          <p className="mb-1 text-xs font-bold text-[#2C1810] uppercase">
            Total to Pay
          </p>
          <p className="text-3xl font-black text-[#2C1810]">
            ${ticketAmount * 10} USD
          </p>
        </div>
      </div>

      <div className="rounded-xl border-3 border-[#2C1810] bg-[#fefcf4] p-4">
        <h4 className="mb-3 text-sm font-black text-[#2C1810] uppercase">
          How It Works
        </h4>
        <ul className="space-y-2 text-sm font-semibold text-[#5D4E37]">
          <li className="flex items-start gap-2">
            <span className="text-primary font-black">{">"}</span>
            <span>Fixed price: 10 USD per ticket</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-black">{">"}</span>
            <span>Each ticket has equal probability of winning</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-black">{">"}</span>
            <span>No purchase limit per user</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-black">{">"}</span>
            <span>Your funds generate returns while you participate</span>
          </li>
        </ul>
      </div>

      <Button
        onClick={onBuyTickets}
        className="bg-primary text-primary-foreground h-14 w-full border-4 border-[#2C1810] text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        disabled={ticketAmount === 0}
      >
        <span className="text-primary-foreground">{">"} BUY TICKETS</span>
      </Button>
    </div>
  );
}
