import {
  Address,
  Contract,
  nativeToScVal,
  rpc,
  TransactionBuilder,
  Transaction,
} from "@stellar/stellar-sdk";
import { currentTestnet } from "~/hooks/useDefindex";
import { sorobanServer } from "~/hooks/useRiffle";

export async function depositToVault({
  userAddress,
  amountInUnits,
  signTransaction,
}: {
  userAddress: string;
  amountInUnits: string;
  signTransaction: (
    xdr: string,
    options: { network: string },
  ) => Promise<{ signedXdr?: string } | string>;
}) {
  // userAddress: clave pública del usuario (G...)
  // amountInUnits: monto en la unidad "base" que tu contrato espera (ej: si token tiene 7 decimales)
  // freighterAccount: objeto / dirección de la cuenta conectada en Freighter

  // 1) Traer la info de la cuenta para construir transaction (sequence)
  const account = await sorobanServer.getAccount(userAddress);

  console.log(account, " account");

  // Para simplificar (y evitar diferencias de versiones en helpers xdr),
  // usaremos la clase Contract de soroban-client que facilita la llamada:
  const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID!);

  // Construimos un TransactionBuilder (sin sorobanData todavía)
  const txBuilder = new TransactionBuilder(account, {
    fee: process.env.NEXT_PUBLIC_FEE!,
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!,
  });

  // Agregamos la llamada via Operation.invokeHostFunction o usando el helper del contrato.
  // Usaremos el helper: contract.call(fn, args...), que internamente genera la operación.
  // Nota: la firma exacta depende de la versión del sdk; este es el patrón general.
  const contractCallOp = contract.call(
    "deposit_and_buy",
    ...[
      new Address(userAddress).toScVal(),
      nativeToScVal(amountInUnits, { type: "i128" }),
    ],
  );

  txBuilder.addOperation(contractCallOp);
  txBuilder.setTimeout(300);

  // 3) Simular la transacción para obtener footprint/sorobanData (NECESARIO)
  const tx = txBuilder.build();
  console.log(tx.toXDR());
  // muchas versiones del sdk tienen server.simulateTransaction, usamos la idea:
  const simulation = await sorobanServer.simulateTransaction(tx); // devuelve sorobanData con footprint
  // setear soroban data en la tx antes de pedir firma
  const prepped_tx = rpc.assembleTransaction(tx, simulation);
  const built_tx = prepped_tx.build();
  // 4) Pedir a Freighter que firme la XDR
  const txXdr = built_tx.toXDR(); // string base64
  const signed = await signTransaction(txXdr, { network: currentTestnet }); // devuelve signedXDR o similar
  // Dependiendo de la versión, freighterSign puede devolver { signedXdr } o solo xdr.
  const signedXdr =
    typeof signed === "string" ? signed : (signed.signedXdr ?? signed);
  console.log(signedXdr, " signedXdr");

  // 5) Enviar transacción firmada al RPC
  const signedTransaction = TransactionBuilder.fromXDR(
    signedXdr as string,
    process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!,
  );
  const submitRes = await sorobanServer.sendTransaction(signedTransaction);
  return submitRes; // hash, status, etc.
}
