"use client";
import Image from "next/image";
import { useWallet } from "../../hooks/useWallet";
import { useWalletBalance } from "../../hooks/useWalletBalance";
import { WalletButton } from "~/components/WalletButton";
import { Card } from "~/components/ui/card";
import { PoolsSection } from "~/components/PoolsSection";
import { ProfileSection } from "~/components/ProfileSection";
import { SavingStreakSection } from "~/components/SavingStreakSection";
import { TicketsSection } from "~/components/TicketsSection";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type TabId = "profile" | "tickets" | "pools" | "saving-streak";

export default function DashboardPage() {
  const { address, isPending } = useWallet();
  const walletState = useWalletBalance();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("pools");
  const [copied, setCopied] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);

  // Protección de ruta: redirigir si no hay wallet conectada
  useEffect(() => {
    if (!isPending && !address) {
      router.push("/");
    }
  }, [address, isPending, router]);

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
    weekActivity: [true, true, false, true, true, false, false], // Lun-Dom (4 activos)
    currentAPY: 11,
  };

  const mockTickets = [
    { id: "#7F3A", amount: "$10.00", date: "2024-01-15" },
    { id: "#9B2E", amount: "$10.00", date: "2024-01-18" },
    { id: "#4D1C", amount: "$10.00", date: "2024-01-20" },
    { id: "#2A8F", amount: "$10.00", date: "2024-01-22" },
  ];

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
      case "profile":
        return (
          <ProfileSection
            address={address ?? null}
            poolData={poolData}
            userStats={userStats}
            walletState={walletState}
            copied={copied}
            copyToClipboard={copyToClipboard}
          />
        );

      case "tickets":
        return (
          <TicketsSection
            address={address ?? null}
            ticketAmount={ticketAmount}
            setTicketAmount={setTicketAmount}
            mockTickets={mockTickets}
          />
        );

      case "pools":
        return <PoolsSection address={address ?? null} poolData={poolData} />;

      case "saving-streak":
        return (
          <SavingStreakSection
            address={address ?? null}
            userStats={userStats}
          />
        );

      default:
        return (
          <div className="cuphead-text text-center text-2xl font-bold text-[#2C1810]">
            Section under development
          </div>
        );
    }
  };

  // Mostrar loading mientras se verifica la conexión
  if (isPending || !address) {
    return (
      <main className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#fefcf4] to-[#FFD93D]">
        <div className="rounded-2xl border-4 border-[#FFD93D] bg-[#2C1810] p-8 text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#FFD93D] border-r-transparent"></div>
          <p className="cuphead-text text-xl font-bold text-[#FFD93D]">
            Verifying connection...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex h-screen w-screen flex-col">
      {/* Header */}
      <header className="flex w-full shrink-0 justify-end px-6 py-2">
        <WalletButton />
      </header>

      {/* Contenido principal */}
      <section className="flex h-[calc(100vh-54px)] w-full gap-4 p-6 pt-0">
        {/* Navegación */}
        <nav className="flex h-full w-full max-w-[280px] flex-col justify-between py-4">
          <div className="flex flex-col gap-4 p-2">
            {[
              {
                id: "pools" as TabId,
                icon: (
                  <Image
                    src="/lottyRuleta.png"
                    alt="Pool"
                    width={32}
                    height={32}
                  />
                ),
                label: "Pool Information",
              },

              {
                id: "tickets" as TabId,
                icon: (
                  <Image
                    src="/lottyPig.png"
                    alt="Tickets"
                    width={32}
                    height={32}
                  />
                ),
                label: "Your Tickets",
              },

              {
                id: "saving-streak" as TabId,
                icon: (
                  <Image
                    src="/lottyCaja.png"
                    alt="Tickets"
                    width={32}
                    height={32}
                  />
                ),
                label: "Saving Streak",
              },
              {
                id: "profile" as TabId,
                icon: (
                  <Image
                    src="/lottyGuy.png"
                    alt="Tickets"
                    width={32}
                    height={32}
                  />
                ),
                label: "Your Profile",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border-3 px-4 py-3 text-left text-sm font-bold transition-all duration-200 ${
                  activeTab === item.id
                    ? "scale-105 border-[#2C1810] bg-[#FFD93D] text-[#2C1810] shadow-lg"
                    : "border-transparent text-[#5D4E37] hover:scale-105 hover:border-[#2C1810]"
                }`}
              >
                <span
                  className={
                    activeTab === item.id ? "text-[#2C1810]" : "text-[#5D4E37]"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col gap-3 px-4">
            {/* Pool Total */}
            <div className="group border-foreground hover:border-primary relative overflow-hidden rounded-lg border-2 bg-[#fefcf4] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-2 right-2 text-2xl opacity-20">
                💰
              </div>
              <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wide uppercase">
                Pool Total
              </p>
              <p className="text-foreground text-2xl font-black">
                ${(poolData.totalPool / 1000).toFixed(0)}K
              </p>
            </div>

            {/* User Tickets */}
            <div className="group border-foreground hover:border-primary relative overflow-hidden rounded-lg border-2 bg-[#fefcf4] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-2 right-2 text-2xl opacity-30">
                🎟️
              </div>
              <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wide uppercase">
                Your Tickets
              </p>
              <p className="text-primary text-2xl font-black">
                {poolData.userTickets}
              </p>
            </div>

            {/* Weekly Prize */}
            <div className="group hover:border-primary relative overflow-hidden rounded-lg border-2 bg-[#fefcf4] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(246,197,66,1)]">
              <div className="absolute top-2 right-2 text-2xl opacity-30">
                🏆
              </div>
              <p className="text-foreground/70 mb-1 text-xs font-bold tracking-wide uppercase">
                Weekly Prize
              </p>
              <p className="text-foreground text-2xl font-black">
                ${poolData.prize.toLocaleString()}
              </p>
            </div>
          </div>
        </nav>

        <Card className="flex-1 overflow-y-auto scroll-auto border-0 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]">
          <div style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            {renderContent()}
          </div>
        </Card>
      </section>
    </main>
  );
}
