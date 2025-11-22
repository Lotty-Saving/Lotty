"use client";
import Image from "next/image";
import { useWallet } from "../hooks/useWallet";
import { WalletButton } from "~/components/WalletButton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#fefcf4] via-[#FFD93D] to-[#fefcf4]">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="container mx-auto flex max-w-7xl items-center justify-end px-6 py-4">
          <WalletButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container w-full px-6 py-16 md:py-24">
        <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo Izquierdo - Lotty Guy */}
          <div className="relative flex flex-col items-center lg:w-2/5">
            <div className="animate-bounce-slow relative">
              <Image
                src="/lottyGuy.png"
                alt="Lotty Guy"
                width={300}
                height={300}
                className="hover:animate-rubber-band drop-shadow-2xl transition-transform hover:scale-110"
                priority
              />
            </div>
            <Image src="/lotty.png" alt="Lotty" width={400} height={400} />
          </div>

          {/* Contenido Principal - Derecha */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-6 text-5xl leading-tight font-bold text-[#2C1810] md:text-6xl lg:text-7xl">
              Save Money, Win Prizes,{" "}
              <span className="text-[#FFD93D]">Never Lose!</span>
            </h1>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Deposit",
                  text: "Fixed price of $10 per ticket with USDC/XLM",
                  emoji: (
                    <Image
                      src="/lottyPig.png"
                      alt="Lotty Pig"
                      width={80}
                      height={80}
                      className="drop-shadow-2xl transition-transform hover:scale-110"
                      style={{ transform: "scaleX(-1)" }}
                      priority
                    />
                  ),
                },
                {
                  step: "02",
                  title: "Win Prizes",
                  text: "Your tickets enter you into weekly prize draws",
                  emoji: (
                    <Image
                      src="/lottyRuleta.png"
                      alt="Lotty Ruleta"
                      width={80}
                      height={80}
                      className="drop-shadow-2xl transition-transform hover:scale-110"
                      style={{ transform: "scaleX(-1)" }}
                      priority
                    />
                  ),
                },
                {
                  step: "03",
                  title: "No Loss",
                  text: "Zero fees and you cant lose, you win :)",
                  emoji: (
                    <Image
                      src="/lottyCaja.png"
                      alt="Lotty Caja"
                      width={80}
                      height={80}
                      className="drop-shadow-2xl transition-transform hover:scale-110"
                      style={{ transform: "scaleX(-1)" }}
                      priority
                    />
                  ),
                },
              ].map((feature, idx) => (
                <Card
                  key={idx}
                  className="group border-foreground relative overflow-hidden border-4 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <CardHeader className="space-y-4 p-8 text-center">
                    {/* Step Number */}
                    <div className="text-primary/20 absolute top-4 right-4 text-5xl font-black">
                      {feature.step}
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="rounded-full bg-[#fefcf4] p-4">
                        {feature.emoji}
                      </div>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-foreground text-2xl font-black tracking-tight uppercase">
                      {feature.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-foreground/70 text-base leading-relaxed font-semibold">
                      {feature.text}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <p className="mb-4 text-sm font-bold tracking-wide text-[#5D4E37] uppercase">
            Scroll Down
          </p>
          <div className="animate-bounce">
            <svg
              className="h-6 w-6 text-[#2C1810]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mx-auto max-w-7xl px-6 py-20"
      >
        <div className="mb-8 text-center">
          <h2 className="cuphead-text mb-4 text-4xl font-bold text-[#2C1810] md:text-5xl">
            How It Works?
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-semibold text-[#5D4E37]">
            A revolutionary no-loss prize savings system where everyone wins
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Buy Tickets */}
          <Card className="border-foreground border-4 bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="border-foreground bg-primary flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-4xl">
                🎟️
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  <span className="bg-foreground rounded-full px-3 py-1 text-sm font-black text-white">
                    STEP 1
                  </span>
                  <h3 className="text-foreground text-2xl font-black uppercase">
                    Buy Tickets
                  </h3>
                </div>
                <p className="text-foreground/70 text-base font-semibold">
                  Purchase tickets at a fixed price of $10 USD using USDC or
                  XLM. Your money is safe and stays yours!
                </p>
              </div>
            </div>
          </Card>

          {/* Step 2: Generate Yield */}
          <Card className="border-foreground border-4 bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="border-foreground bg-secondary flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-4xl">
                📈
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  <span className="bg-foreground rounded-full px-3 py-1 text-sm font-black text-white">
                    STEP 2
                  </span>
                  <h3 className="text-foreground text-2xl font-black uppercase">
                    Funds Generate Yield
                  </h3>
                </div>
                <p className="text-foreground/70 text-base font-semibold">
                  All tickets from all users are pooled together and deposited
                  into DeFi protocols to generate interest throughout the week.
                  Your principal is always protected!
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3: Weekly Draw */}
          <Card className="border-foreground border-4 bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="border-foreground bg-accent flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-4xl">
                🎰
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  <span className="bg-foreground rounded-full px-3 py-1 text-sm font-black text-white">
                    STEP 3
                  </span>
                  <h3 className="text-foreground text-2xl font-black uppercase">
                    Weekly Prize Draw
                  </h3>
                </div>
                <p className="text-foreground/70 text-base font-semibold">
                  Every Sunday, winners are randomly selected. The generated
                  interest is split: a percentage goes to the winners and a
                  small fee goes to the app.
                </p>
              </div>
            </div>
          </Card>

          {/* Step 4: Streak Bonus */}
          <Card className="border-foreground bg-primary/10 border-4 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="border-foreground bg-primary flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-4xl">
                🔥
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  <span className="bg-foreground rounded-full px-3 py-1 text-sm font-black text-white">
                    BONUS
                  </span>
                  <h3 className="text-foreground text-2xl font-black uppercase">
                    Streak Multiplier System
                  </h3>
                </div>
                <p className="text-foreground/70 text-base font-semibold">
                  Buy tickets on consecutive days to build your streak! The
                  longer your streak, the higher percentage of the prize pool
                  you'll win if you're selected. Consistency pays off!
                </p>
              </div>
            </div>
          </Card>

          {/* No Loss Guarantee */}
          <Card className="border-secondary bg-secondary/10 border-4 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center">
              <h3 className="text-foreground mb-3 text-3xl font-black uppercase">
                100% No-Loss Guarantee
              </h3>
              <p className="text-foreground/70 mx-auto max-w-3xl text-lg font-bold">
                Your principal is never at risk. You can withdraw your money
                anytime. Zero fees. You literally cannot lose - you can only
                win!
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#2C1810]">
                Hackathon Stellar 2025 - Buenos Aires 🇦🇷
              </span>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="border-b-2 border-transparent font-bold text-[#fefcf4] transition-all hover:scale-110 hover:border-[#FFD93D] hover:text-[#FFD93D]"
              >
                Docs
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent font-bold text-[#fefcf4] transition-all hover:scale-110 hover:border-[#FFD93D] hover:text-[#FFD93D]"
              >
                GitHub
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent font-bold text-[#fefcf4] transition-all hover:scale-110 hover:border-[#FFD93D] hover:text-[#FFD93D]"
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
