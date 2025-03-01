export function clamp(target: number, min: number, max: number): number {
  return Math.max(min, Math.min(target, max));
}

export function toNumber(n: string): number {
  return parseFloat(n);
}
