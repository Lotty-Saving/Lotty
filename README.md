# Lotty - Decentralized Lottery on Stellar

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`, integrated with Soroban smart contracts on Stellar.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## Project Structure

```
Lotty/
├── contracts/           # Smart contracts Soroban (Rust)
│   └── lottery/         # Main lottery contract
├── src/                 # Next.js frontend
│   ├── app/             # App router pages
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── soroban/         # Soroban integration utilities
│   └── ...
├── scripts/             # Build and deployment scripts
└── prisma/              # Database schema
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### 3. Setup Database

```bash
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contracts Development

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup#install-the-stellar-cli)
- Wasm target: `rustup target add wasm32-unknown-unknown`

### Build Contracts

```bash
npm run contract:build
```

### Test Contracts

```bash
npm run contract:test
```

### Deploy to Testnet

```bash
npm run contract:deploy
```

For more details, see [contracts/README.md](./contracts/README.md)

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run typecheck` - Run TypeScript type checking

### Database

- `npm run db:push` - Push schema changes
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma client

### Smart Contracts

- `npm run contract:build` - Build all contracts
- `npm run contract:test` - Run contract tests
- `npm run contract:deploy` - Deploy to testnet
- `npm run contract:clean` - Clean build artifacts

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Prisma](https://prisma.io) - Database ORM
- [NextAuth.js](https://next-auth.js.org) - Authentication

### Blockchain

- [Soroban](https://soroban.stellar.org/) - Smart contracts platform
- [Stellar SDK](https://stellar.github.io/js-stellar-sdk/) - Stellar interaction
- [Freighter Wallet](https://www.freighter.app/) - Wallet integration

## How do I deploy this?

### Frontend Deployment

Follow deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker).

### Smart Contract Deployment

See the [contracts README](./contracts/README.md) for detailed deployment instructions.
