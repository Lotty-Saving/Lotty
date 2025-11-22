import { rpc } from "@stellar/stellar-sdk";

export const sorobanServer = new rpc.Server(process.env.NEXT_PUBLIC_RPC_URL!);
