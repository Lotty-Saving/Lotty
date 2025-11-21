"use server";

import { signIn, signOut } from "~/server/auth";

export async function signInWithDiscord() {
  await signIn("discord", { redirectTo: "/dashboard" });
}

export async function signInWithWallet(walletAddress: string) {
  // Mock de verificación de wallet
  // En producción aquí se verificaría la firma de la wallet
  await signIn("wallet", {
    address: walletAddress,
    signature: "mock-signature",
    redirectTo: "/dashboard",
  });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
