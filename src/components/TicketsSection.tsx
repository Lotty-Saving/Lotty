"use client";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Shield, Coins, Ticket } from "lucide-react";

interface TicketsSectionProps {
  address: string | null;
  ticketAmount: number;
  setTicketAmount: (amount: number) => void;
  mockTickets: Array<{
    id: string;
    amount: number;
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
    <div className="space-y-6">
      <div>
        <h2 className="cuphead-text text-2xl font-bold text-[#2C1810]">
          Your Tickets
        </h2>
        <p className="mt-1 text-sm font-bold text-[#5D4E37]">
          Buy tickets and manage your participation
        </p>
      </div>

      {!address && (
        <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center">
            <Shield className="mb-4 h-16 w-16 text-[#2C1810]" />
            <h3 className="cuphead-text mb-2 text-xl font-bold text-[#2C1810]">
              Connect Your Wallet
            </h3>
            <p className="text-sm font-bold text-[#5D4E37]">
              Connect your wallet to buy tickets
            </p>
          </div>
        </Card>
      )}

      {address && (
        <>
          {/* Purchase Tickets */}
          <Card className="border-4 border-[#2C1810] bg-[#F5E6D3] p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <Ticket className="h-8 w-8 text-[#D62828]" />
              <h3 className="cuphead-text text-lg font-bold text-[#2C1810]">
                Buy Tickets
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#2C1810] uppercase">
                  Number of Tickets
                </label>
                <Input
                  type="number"
                  min="1"
                  value={ticketAmount}
                  onChange={(e) => setTicketAmount(Number(e.target.value))}
                  className="w-full border-3 border-[#2C1810] font-bold"
                />
              </div>
              <div className="rounded-lg border-3 border-[#2C1810] bg-[#FFF8DC] p-4">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-[#5D4E37]">
                    Price per ticket:
                  </span>
                  <span className="font-bold text-[#2C1810]">$10.00 USD</span>
                </div>
                <div className="mt-2 flex justify-between text-lg font-bold">
                  <span className="text-[#2C1810]">Total to pay:</span>
                  <span className="cuphead-text text-[#D62828]">
                    ${(ticketAmount * 10).toFixed(2)} USD
                  </span>
                </div>
              </div>
              <div className="rounded-lg border-3 border-[#2C1810] bg-[#FFD93D]/50 p-4">
                <h4 className="mb-2 font-bold text-[#2C1810]">How It Works</h4>
                <ul className="space-y-1 text-sm font-medium text-[#5D4E37]">
                  <li>• Fixed price: 10 USD per ticket</li>
                  <li>• Each ticket has equal probability of winning</li>
                  <li>• No purchase limit per user</li>
                  <li>• Your funds earn yield while participating</li>
                </ul>
              </div>
              <Button
                className="w-full cursor-pointer border-4 border-[#2C1810] bg-[#D62828] font-bold text-[#FFF8DC] shadow-lg transition-all hover:scale-105 hover:bg-[#A02020] hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]"
                size="lg"
              >
                Buy Tickets
              </Button>
            </div>
          </Card>

          {/* Your Active Tickets */}
          <Card className="border-4 border-[#2C1810] bg-[#FFF8DC] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="cuphead-text text-lg font-bold text-[#2C1810]">
                Active Tickets
              </h3>
              <div className="rounded-full border-3 border-[#2C1810] bg-[#FFD93D] px-4 py-1">
                <span className="font-bold text-[#2C1810]">
                  {mockTickets.length} tickets
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {mockTickets.length === 0 ? (
                <div className="rounded-lg border-3 border-[#2C1810] bg-[#F5E6D3] p-8 text-center">
                  <Ticket className="mx-auto mb-3 h-12 w-12 text-[#5D4E37]" />
                  <p className="font-bold text-[#5D4E37]">
                    You don't have tickets yet
                  </p>
                  <p className="text-sm text-[#5D4E37]">
                    Buy your first tickets to participate!
                  </p>
                </div>
              ) : (
                mockTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between rounded-lg border-3 border-[#2C1810] bg-[#F5E6D3] p-4 transition-all hover:scale-102 hover:bg-[#FFD93D]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg border-2 border-[#2C1810] bg-[#FFD93D] p-3">
                        <Coins className="h-5 w-5 text-[#2C1810]" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-[#2C1810]">
                          {ticket.id}
                        </p>
                        <p className="text-sm font-medium text-[#5D4E37]">
                          {ticket.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2C1810]">
                        ${ticket.amount.toFixed(2)} USD
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-2 border-[#2C1810] bg-[#FFF8DC] font-bold hover:bg-[#FFD93D]"
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Ticket Stats */}
          <Card className="border-4 border-[#2C1810] bg-[#FFD93D] p-6 shadow-2xl">
            <h3 className="cuphead-text mb-4 text-lg font-bold text-[#2C1810]">
              Your Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border-3 border-[#2C1810] bg-[#FFF8DC] p-4">
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Total Invested
                </p>
                <p className="cuphead-text mt-2 text-2xl font-bold text-[#2C1810]">
                  $
                  {mockTickets.reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border-3 border-[#2C1810] bg-[#FFF8DC] p-4">
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Active Tickets
                </p>
                <p className="cuphead-text mt-2 text-2xl font-bold text-[#D62828]">
                  {mockTickets.length}
                </p>
              </div>
              <div className="rounded-lg border-3 border-[#2C1810] bg-[#FFF8DC] p-4">
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Win Rate
                </p>
                <p className="cuphead-text mt-2 text-2xl font-bold text-[#2C1810]">
                  12.5%
                </p>
              </div>
              <div className="rounded-lg border-3 border-[#2C1810] bg-[#FFF8DC] p-4">
                <p className="text-sm font-bold text-[#5D4E37] uppercase">
                  Total Wins
                </p>
                <p className="cuphead-text mt-2 text-2xl font-bold text-[#D62828]">
                  $240.00
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
