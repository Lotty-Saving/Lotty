"use client";
import Image from "next/image";
import { useWallet } from "../hooks/useWallet";
import { WalletButton } from "~/components/WalletButton";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { address } = useWallet();
  const router = useRouter();

  // Si ya hay wallet conectada, redirigir al dashboard
  useEffect(() => {
    if (address) {
      router.push("/dashboard");
    }
  }, [address, router]);

  const features = [
    {
      icon: (
        <svg
          className="h-8 w-8"
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
      title: "Save & Win",
      description:
        "Deposit your funds and automatically enter weekly prize draws without losing your principal.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "100% Secure",
      description:
        "Your money is protected by audited smart contracts on the Stellar blockchain.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "Competitive APY",
      description:
        "Earn up to 13.5% APY in interest plus the chance to win weekly prizes.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Instant Withdrawal",
      description:
        "Withdraw your funds anytime without penalties or waiting periods.",
    },
  ];

  const stats = [
    { value: "$1.2M", label: "Total Deposited" },
    { value: "120K", label: "Active Tickets" },
    { value: "$3.2K", label: "Next Prize" },
    { value: "13.5%", label: "Average APY" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#FFF8DC] via-[#FFD93D] to-[#F5E6D3]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-4 border-[#2C1810] bg-[#FFD93D]/90 shadow-lg backdrop-blur-md">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Image src="/lotty.png" alt="Lotty" width={100} height={40} />
          <WalletButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo Izquierdo - Lotty Guy */}
          <div className="relative flex flex-col items-center lg:w-2/5">
            <div className="animate-bounce-slow relative">
              <Image
                src="/lottyGuy.png"
                alt="Lotty Guy"
                width={350}
                height={350}
                className="hover:animate-rubber-band drop-shadow-2xl transition-transform hover:scale-110"
                priority
              />
            </div>
            <div className="mt-6 rounded-xl border-4 border-[#FFD93D] bg-[#2C1810] px-6 py-3 text-center shadow-lg">
              <p className="cuphead-text text-xl font-bold text-[#FFD93D]">
                Lotty Guy
              </p>
              <p className="text-sm text-[#F5E6D3]">Your Savings Buddy</p>
            </div>
          </div>

          {/* Contenido Principal - Derecha */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="cuphead-outline mb-6 text-5xl leading-tight font-bold text-[#2C1810] md:text-6xl lg:text-7xl">
              Save Money, Win Prizes,{" "}
              <span className="animate-pulse text-[#FFD93D]">Never Lose!</span>
            </h1>
            <p className="mb-6 rounded-2xl border-4 border-[#2C1810] bg-[#FFF8DC]/90 px-6 py-4 text-xl font-semibold text-[#5D4E37] shadow-xl md:text-2xl">
              The most fun way to save securely! Participate in prize draws
              where you can win money without ever losing your savings.
            </p>
            <p className="mb-8 text-lg font-bold text-[#2C1810]">
              🎰 Weekly Prize Draws • 💰 Your Money Always Safe • 📈 Earn
              Interest Too
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <WalletButton />
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer border-4 border-[#2C1810] bg-[#F4A825] text-lg font-bold text-[#2C1810] shadow-lg transition-all hover:scale-110 hover:bg-[#FFD93D] hover:shadow-2xl"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                How It Works?
              </Button>
            </div>
          </div>
        </div>

        {/* Decoración de fondo estilo Cuphead */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 -left-20 h-72 w-72 animate-pulse rounded-full bg-[#FFD93D]/40 blur-3xl"></div>
          <div className="animation-delay-500 absolute top-40 -right-20 h-96 w-96 animate-pulse rounded-full bg-[#F4A825]/40 blur-3xl"></div>

          {/* Círculos decorativos estilo vintage */}
          <div className="absolute top-10 left-1/4 h-4 w-4 animate-bounce rounded-full bg-[#2C1810]"></div>
          <div className="animation-delay-500 absolute right-1/3 bottom-20 h-6 w-6 animate-bounce rounded-full bg-[#D62828]"></div>
          <div className="animate-wiggle absolute top-1/2 left-10 h-5 w-5 rounded-full border-2 border-[#2C1810] bg-[#FFD93D]"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-4 border-[#2C1810] bg-[#FFF8DC] p-6 text-center shadow-2xl transition-all hover:scale-110 hover:shadow-[8px_8px_0px_0px_rgba(44,24,16,1)]"
            >
              <div className="cuphead-text mb-2 text-3xl font-bold text-[#D62828] md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm font-bold tracking-wider text-[#5D4E37] uppercase md:text-base">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mx-auto max-w-7xl px-6 py-20"
      >
        <Card className="border-4 border-[#2C1810] bg-[#F5E6D3] p-8 shadow-2xl">
          <h2 className="cuphead-text mb-6 text-center text-3xl font-bold text-[#2C1810] md:text-4xl">
            How It Works?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              {
                icon: "💰",
                title: "Buy Tickets",
                description: "Fixed price of $10 per ticket with USDC/XLM",
              },
              {
                icon: "📈",
                title: "Earn Interest",
                description: "Your funds generate yield via DeFi protocols",
              },
              {
                icon: "🎰",
                title: "Weekly Draw",
                description: "Every Sunday winners are randomly selected",
              },
              {
                icon: "🏆",
                title: "Win Prizes",
                description: "Winners receive all the generated interest",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2C1810] bg-[#FFD93D] text-3xl shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="mb-2 font-bold text-[#2C1810]">{step.title}</h3>
                <p className="text-sm font-medium text-[#5D4E37]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <Badge className="mb-4 border-3 border-[#2C1810] bg-[#FFD93D] font-bold text-[#2C1810] shadow-lg">
            🎉 No-Loss Savings System
          </Badge>
          <h2 className="cuphead-outline mb-4 text-3xl font-bold text-[#2C1810] md:text-4xl">
            Why Choose Lotty?
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-4 border-[#2C1810] bg-[#FFF8DC] p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)]"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full border-3 border-[#2C1810] bg-[#FFD93D] p-2 shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-[#2C1810]">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-[#5D4E37]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Lotty Pig Section - Your Lucky Piggy Bank */}
      <section className="border-y-4 border-[#2C1810] bg-gradient-to-b from-[#F4A825] to-[#FFD93D] py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="relative flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-center">
            {/* Lotty Pig - Izquierda */}
            <div className="relative flex flex-col items-center lg:w-2/5">
              <div className="animate-bounce-slow animation-delay-500 relative">
                <Image
                  src="/lottyPig.png"
                  alt="Lotty Pig"
                  width={320}
                  height={320}
                  className="hover:animate-rubber-band drop-shadow-2xl transition-transform hover:scale-110"
                  style={{ transform: "scaleX(-1)" }}
                  priority
                />
              </div>
              <div className="mt-6 rounded-xl border-4 border-[#D62828] bg-[#2C1810] px-6 py-3 text-center shadow-lg">
                <p className="cuphead-text text-xl font-bold text-[#D62828]">
                  Lotty Pig
                </p>
                <p className="text-sm text-[#F5E6D3]">Your Lucky Piggy Bank</p>
              </div>

              {/* Badge de premio */}
              <div className="animate-wiggle absolute -top-6 -right-6 rounded-xl border-4 border-[#FFD93D] bg-[#2C1810] px-6 py-3 text-center shadow-2xl">
                <p className="cuphead-text text-2xl font-bold text-[#FFD93D]">
                  $3.2K
                </p>
                <p className="text-xs font-bold text-[#F5E6D3]">NEXT PRIZE</p>
              </div>
            </div>

            {/* Contenido Derecha */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="cuphead-outline mb-6 text-4xl font-bold text-[#2C1810] md:text-5xl">
                Save & Win <span className="text-[#D62828]">Together!</span>
              </h2>
              <p className="mb-6 rounded-2xl border-4 border-[#2C1810] bg-[#FFF8DC]/90 px-6 py-4 text-lg font-semibold text-[#5D4E37] shadow-xl">
                Your money is always safe, earns daily interest, and
                participates in weekly prize draws. No risk, only rewards!
              </p>

              {/* Quick Benefits */}
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { emoji: "💰", text: "100% Safe" },
                  { emoji: "📈", text: "Up to 13.5% APY" },
                  { emoji: "🎰", text: "Weekly Prizes" },
                  { emoji: "⚡", text: "Instant Access" },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border-3 border-[#2C1810] bg-[#2C1810] px-4 py-3 shadow-lg transition-all hover:scale-105"
                  >
                    <span className="text-2xl">{benefit.emoji}</span>
                    <span className="font-bold text-[#FFD93D]">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-6 py-20">
        <Card className="animate-wiggle hover:animate-rubber-band border-8 border-[#2C1810] bg-gradient-to-r from-[#D62828] to-[#F4A825] p-12 text-center shadow-2xl">
          <h2 className="cuphead-outline mb-4 text-4xl font-bold text-[#FFF8DC] md:text-5xl">
            Ready to Start Winning?
          </h2>
          <p className="mb-8 rounded-xl bg-[#2C1810]/30 px-6 py-3 text-xl font-bold text-[#FFF8DC] backdrop-blur">
            Connect your wallet and start saving while participating in weekly
            prize draws!
          </p>
          <div className="inline-block">
            <WalletButton />
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-[#2C1810] bg-[#5D4E37] py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/lotty.png"
                alt="Lotty"
                width={80}
                height={32}
                className="animate-wiggle"
              />
              <span className="text-sm font-bold text-[#FFD93D]">
                © 2024 Lotty. Powered by Stellar.
              </span>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="border-b-2 border-transparent font-bold text-[#F5E6D3] transition-all hover:scale-110 hover:border-[#FFD93D] hover:text-[#FFD93D]"
              >
                Docs
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent font-bold text-[#F5E6D3] transition-all hover:scale-110 hover:border-[#FFD93D] hover:text-[#FFD93D]"
              >
                GitHub
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent font-bold text-[#F5E6D3] transition-all hover:scale-110 hover:border-[#FFD93D] hover:text-[#FFD93D]"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
