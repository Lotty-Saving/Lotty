export function toBaseUnits(amountHuman: number): string {
  const factor = 10 ** 7;
  return BigInt(Math.round(amountHuman * factor)).toString();
}
