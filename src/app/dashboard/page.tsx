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
  const { address, signTransaction, isPending } = useWallet();
  const walletState = useWalletBalance();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [copied, setCopied] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 72,
    minutes: 45,
    seconds: 12,
  });

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
    weekActivity: [true, false, true, true, false, false, false], // Lun-Dom
    currentAPY: 11,
  };

  const mockTickets = [
    { id: "#7F3A", amount: "$10.00", date: "2024-01-15" },
    { id: "#9B2E", amount: "$10.00", date: "2024-01-18" },
    { id: "#4D1C", amount: "$10.00", date: "2024-01-20" },
    { id: "#2A8F", amount: "$10.00", date: "2024-01-22" },
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
        return (
          <PoolsSection
            address={address ?? null}
            poolData={poolData}
            timeRemaining={timeRemaining}
          />
        );

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
    <main className="relative flex h-screen w-screen flex-col bg-[#fefcf4]">
      {/* Header */}
      <header className="flex w-full justify-between px-6 py-2">
        <Image
          src="/lotty.png"
          alt="Lotty"
          width={80}
          height={36}
          className="animate-wiggle ml-24"
        />
        <WalletButton />
      </header>

      {/* Contenido principal */}
      <section className="flex h-[calc(100vh-54px)] w-full gap-4 p-6 pt-0">
        {/* Navegación */}
        <nav className="flex h-full w-full max-w-[280px] flex-col justify-between py-4">
          <div className="flex flex-col gap-4 p-2">
            {[
              {
                id: "profile" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ),
                label: "Your Profile",
              },
              {
                id: "tickets" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                ),
                label: "Your Tickets",
              },
              {
                id: "pools" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                label: "Pool Information",
              },
              {
                id: "saving-streak" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                ),
                label: "Saving Streak",
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
          <div className="grid grid-cols-2 gap-3 px-4">
            {/* Pool Total */}
            <div className="border-foreground rounded-xl border-2 bg-white p-4 text-center shadow-lg">
              <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                Pool Total
              </p>
              <p className="text-foreground text-xl font-black">
                ${(poolData.totalPool / 1000).toFixed(0)}K
              </p>
            </div>

            {/* User Tickets */}
            <div className="border-foreground rounded-xl border-2 bg-white p-4 text-center shadow-lg">
              <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                Tus Tickets
              </p>
              <p className="text-foreground text-xl font-black">
                {poolData.userTickets}
              </p>
            </div>

            {/* Weekly Prize */}
            <div className="border-primary bg-primary/10 rounded-xl border-2 p-4 text-center shadow-lg">
              <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                Premio Semanal
              </p>
              <p className="text-primary text-xl font-black">
                ${poolData.prize.toLocaleString()}
              </p>
            </div>

            {/* Jackpot */}
            <div className="border-secondary bg-secondary/10 rounded-xl border-2 p-4 text-center shadow-lg">
              <p className="text-muted-foreground mb-1 text-xs font-bold uppercase">
                Jackpot
              </p>
              <p className="text-secondary text-xl font-black">
                ${((poolData.totalPool * 0.1) / 1000).toFixed(0)}K
              </p>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="animate-bounce-slow relative">
              <Image
                src="/lottyGuy.png"
                alt="Lotty"
                width={150}
                height={150}
                className="hover:animate-rubber-band drop-shadow-2xl transition-transform hover:scale-110"
              />
            </div>
          </div>
        </nav>

        <Card className="border-foreground flex-1 overflow-y-auto scroll-auto border-4 bg-[#fefcf4] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {renderContent()}
        </Card>
      </section>
    </main>
  );
}
