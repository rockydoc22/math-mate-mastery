// Stride-sample N items evenly across buckets so a short version still
// touches every dimension/trait/type rather than clustering on one bucket.
export function pickQuick<T>(items: T[], count: number, key: keyof T): T[] {
  if (items.length <= count) return items;
  const buckets: Record<string, T[]> = {};
  for (const it of items) {
    const k = String((it as any)[key] ?? "_");
    (buckets[k] ||= []).push(it);
  }
  const keys = Object.keys(buckets);
  const per = Math.max(1, Math.floor(count / keys.length));
  const out: T[] = [];
  keys.forEach((k) => {
    const arr = buckets[k];
    const stride = Math.max(1, Math.floor(arr.length / per));
    for (let i = 0, taken = 0; i < arr.length && taken < per; i += stride, taken++) {
      out.push(arr[i]);
    }
  });
  // Top up in original order if under target after balanced split.
  let i = 0;
  while (out.length < count && i < items.length) {
    if (!out.includes(items[i])) out.push(items[i]);
    i++;
  }
  return out.slice(0, count);
}