import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface WalletProfile {
  id: string;
  address: string;
  name: string;
}

/**
 * Proveedor de autenticación con Wallet (mockeado)
 * En producción, esto debería conectarse con una wallet real (MetaMask, WalletConnect, etc.)
 */
export default function WalletProvider<P extends WalletProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "wallet",
    name: "Crypto Wallet",
    type: "oauth",
    // Mock de endpoints - en producción estos serían reales
    authorization: {
      url: "https://mock-wallet-auth.example.com/authorize",
      params: { scope: "wallet:read" },
    },
    token: "https://mock-wallet-auth.example.com/token",
    userinfo: {
      url: "https://mock-wallet-auth.example.com/userinfo",
      async request() {
        // Simulación de datos de wallet
        // En producción, aquí se verificaría la firma de la wallet
        return {
          id: `wallet-${Date.now()}`,
          address: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, "0")}`,
          name: "Mock Wallet User",
        };
      },
    },
    profile(profile: P) {
      return {
        id: profile.id,
        name: profile.name,
        email: `${profile.address}@wallet.local`,
        image: `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.address}`,
      };
    },
    style: {
      logo: "/wallet-icon.svg",
      bg: "#fff",
      text: "#000",
    },
    options,
  };
}
