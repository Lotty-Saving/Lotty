"use client";
import Image from "next/image";
import { useWallet } from "../hooks/useWallet";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { WalletButton } from "~/components/WalletButton";
import { Card } from "~/components/ui/card";
import { LuckySavingLanding } from "~/components/LuckySavingLanding";
import { PoolsSection } from "~/components/PoolsSection";
import { ProfileSection } from "~/components/ProfileSection";
import { useState, useEffect } from "react";

type TabId = "lucky-saving" | "pools" | "profile" | "settings";

export default function HomePage() {
  const { address, signTransaction, isPending } = useWallet();
  const walletState = useWalletBalance();
  const [activeTab, setActiveTab] = useState<TabId>("lucky-saving");
  const [copied, setCopied] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 72,
    minutes: 45,
    seconds: 12,
  });

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
    { id: "#7F3A", amount: 10, date: "2024-01-15" },
    { id: "#9B2E", amount: 10, date: "2024-01-18" },
    { id: "#4D1C", amount: 10, date: "2024-01-20" },
    { id: "#2A8F", amount: 10, date: "2024-01-22" },
    { id: "#56EF", amount: 10, date: "2024-01-22" },
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
      case "lucky-saving":
        return (
          <LuckySavingLanding
            poolData={poolData}
            onGetStarted={() => setActiveTab("pools")}
          />
        );

      case "pools":
        return (
          <PoolsSection
            address={address ?? null}
            poolData={poolData}
            timeRemaining={timeRemaining}
            ticketAmount={ticketAmount}
            setTicketAmount={setTicketAmount}
            mockTickets={mockTickets}
          />
        );

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

      default:
        return <div>Sección en desarrollo</div>;
    }
  };

  return (
    <main className="relative flex h-screen w-screen flex-col bg-[#e8e6f0]">
      {/* Header */}
      <header className="flex w-full justify-between px-6 py-2">
        <Image src="/lotty.png" alt="Lotty" width={80} height={36} />
        <WalletButton />
      </header>

      {/* Contenido principal */}
      <section className="flex h-[calc(100vh-54px)] w-full gap-4 p-6 pt-0">
        {/* Navegación */}
        <nav className="h-full w-full max-w-[280px] rounded-2xl py-4">
          <div className="flex flex-col gap-4">
            {[
              {
                id: "lucky-saving" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                label: "Lucky Saving",
              },
              {
                id: "pools" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                label: "Pools de liquidez",
              },
              {
                id: "profile" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ),
                label: "Tu perfil",
              },
              {
                id: "settings" as TabId,
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                label: "Configuración",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-[#d3d1e0] text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100/50"
                }`}
              >
                <span
                  className={
                    activeTab === item.id ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <Card className="flex-1 overflow-y-auto scroll-auto bg-white p-6">
          {renderContent()}
        </Card>
      </section>
    </main>
  );
}
