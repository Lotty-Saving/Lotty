"use client";
import Image from "next/image";
import { useWallet } from "../hooks/useWallet";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { WalletButton } from "~/components/WalletButton";
import { Card } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type TabId = "lucky-saving" | "pools" | "profile" | "settings";

export default function HomePage() {
  const { address, signTransaction, isPending } = useWallet();
  const walletState = useWalletBalance();
  const [activeTab, setActiveTab] = useState<TabId>("lucky-saving");
  const [copied, setCopied] = useState(false);

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
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lucky Saving</h2>
              <p className="mt-1 text-sm text-gray-600">
                Gestiona tus ahorros y participa en sorteos
              </p>
            </div>

            {isPending && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
              </div>
            )}

            {!address && !isPending && (
              <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <svg
                    className="mb-4 h-16 w-16 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Conecta tu Wallet
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Para ver tus datos y gestionar tus ahorros, necesitas
                    conectar tu wallet primero
                  </p>
                  <p className="text-xs text-gray-500">
                    Haz clic en el botón "Connect Wallet" en la parte superior
                    derecha
                  </p>
                </div>
              </Card>
            )}

            {/* Información de Wallet */}
            {address && (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Balance XLM */}
                  <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">
                          Balance XLM
                        </p>
                        <p className="mt-2 text-3xl font-bold text-purple-900">
                          {walletState.isLoading ? (
                            <span className="text-lg">Cargando...</span>
                          ) : (
                            walletState.xlm
                          )}
                        </p>
                      </div>
                      <svg
                        className="h-8 w-8 text-purple-600"
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
                    </div>
                  </Card>

                  {/* Balance USDC */}
                  <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Balance USDC
                        </p>
                        <p className="mt-2 text-3xl font-bold text-blue-900">
                          {walletState.isLoading ? (
                            <span className="text-lg">Cargando...</span>
                          ) : (
                            walletState.usdc
                          )}
                        </p>
                      </div>
                      <svg
                        className="h-8 w-8 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </Card>
                </div>

                {/* Wallet Status */}
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Estado de la Wallet
                  </h3>
                  <div className="space-y-3">
                    {address && (
                      <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="text-sm font-medium text-gray-600">
                          Dirección:
                        </span>
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-pointer rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-900 transition-colors hover:bg-gray-100">
                                  {address.slice(0, 4)}...{address.slice(-4)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-mono text-xs">{address}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <button
                            onClick={() => copyToClipboard(address)}
                            className="rounded p-1 transition-colors hover:bg-gray-100"
                            aria-label="Copiar dirección"
                          >
                            {copied ? (
                              <svg
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-4 w-4 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b border-gray-100 py-2">
                      <span className="text-sm font-medium text-gray-600">
                        Estado de fondeo:
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          walletState.isFunded
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {walletState.isFunded ? "Fondeada" : "No fondeada"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-600">
                        Total de activos:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {walletState.balances.length}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Error Message */}
                {walletState.error && (
                  <Card className="border-red-200 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-red-900">
                          Error
                        </h4>
                        <p className="mt-1 text-sm text-red-700">
                          {walletState.error.message}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        );
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
      <section className="relative flex h-full w-full gap-4 p-6 pt-0">
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

        <Card className="flex-1 overflow-y-auto bg-white p-6">
          {renderContent()}
        </Card>
      </section>
    </main>
  );
}
