import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    /**
     * Provider de Wallet (mockeado)
     * En producción esto se conectaría con MetaMask, WalletConnect, etc.
     */
    CredentialsProvider({
      id: "wallet",
      name: "Crypto Wallet",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        // Simulación de verificación de wallet
        // En producción aquí se verificaría la firma criptográfica
        if (credentials?.address) {
          const walletAddress = credentials.address as string;

          // Crear usuario mock con la dirección de wallet
          return {
            id: `wallet-${walletAddress}`,
            name: `Wallet User`,
            email: `${walletAddress}@wallet.local`,
            image: `https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`,
            walletAddress,
          };
        }
        return null;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error - walletAddress es custom
        if (user.walletAddress) {
          // @ts-expect-error - walletAddress es custom
          token.walletAddress = user.walletAddress;
        }
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        walletAddress: token.walletAddress as string | undefined,
      },
    }),
  },
  pages: {
    signIn: "/",
  },
} satisfies NextAuthConfig;
