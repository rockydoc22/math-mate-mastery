// Seeded random number generator for deterministic, unique question generation
// Uses a simple mulberry32 algorithm

export const createSeededRandom = (seed: number) => {
  let state = seed;
  
  return () => {
    state |= 0;
    state = state + 0x6D2B79F5 | 0;
    let t = Math.imul(state ^ state >>> 15, 1 | state);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

// Generate unique values from a range without duplicates
export const generateUniqueValues = (
  count: number,
  minA: number,
  maxA: number,
  minB: number,
  maxB: number,
  seed: number
): Array<{ a: number; b: number }> => {
  const random = createSeededRandom(seed);
  const seen = new Set<string>();
  const values: Array<{ a: number; b: number }> = [];
  
  let attempts = 0;
  const maxAttempts = count * 10;
  
  while (values.length < count && attempts < maxAttempts) {
    const a = Math.floor(random() * (maxA - minA + 1)) + minA;
    const b = Math.floor(random() * (maxB - minB + 1)) + minB;
    const key = `${a}-${b}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      values.push({ a, b });
    }
    attempts++;
  }
  
  // If we couldn't get enough unique values, fill with sequential ones
  if (values.length < count) {
    for (let a = minA; a <= maxA && values.length < count; a++) {
      for (let b = minB; b <= maxB && values.length < count; b++) {
        const key = `${a}-${b}`;
        if (!seen.has(key)) {
          seen.add(key);
          values.push({ a, b });
        }
      }
    }
  }
  
  return values;
};

// Generate unique single values
export const generateUniqueSingleValues = (
  count: number,
  min: number,
  max: number,
  seed: number
): number[] => {
  const random = createSeededRandom(seed);
  const seen = new Set<number>();
  const values: number[] = [];
  
  // If range is smaller than count, use all values in range
  const range = max - min + 1;
  const targetCount = Math.min(count, range);
  
  let attempts = 0;
  const maxAttempts = targetCount * 10;
  
  while (values.length < targetCount && attempts < maxAttempts) {
    const val = Math.floor(random() * range) + min;
    if (!seen.has(val)) {
      seen.add(val);
      values.push(val);
    }
    attempts++;
  }
  
  // Fill remaining with sequential if needed
  if (values.length < targetCount) {
    for (let v = min; v <= max && values.length < targetCount; v++) {
      if (!seen.has(v)) {
        seen.add(v);
        values.push(v);
      }
    }
  }
  
  return values;
};
