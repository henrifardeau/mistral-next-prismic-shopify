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

export function safeJSON<T>(data: string): T | null {
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function toNumber(n: string): number {
  return parseFloat(n);
}
