export function toBaseUnits(amountHuman: number): number {
  const factor = 10 ** 8;
  return Math.round(amountHuman * factor);
}
