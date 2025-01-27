export function chunk<T>(array: T[], chunkSize: number = 20): T[][] {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

export function clamp(target: number, min: number, max: number): number {
  return Math.max(min, Math.min(target, max));
}
