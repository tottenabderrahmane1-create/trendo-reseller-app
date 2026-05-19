export function calculateMarkup(dhgatePrice: number, percent = 8): number {
  const markedUp = dhgatePrice * (1 + percent / 100);
  return Number(markedUp.toFixed(2));
}
