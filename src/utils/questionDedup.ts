/**
 * Universal question deduplication by ID.
 * Keeps first occurrence of each ID (case-insensitive).
 */
export function deduplicateById<T extends { id: string }>(questions: T[]): T[] {
  const seen = new Set<string>();
  return questions.filter(q => {
    const key = q.id.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Deduplicates a Record<string, Question[]> — removes dupes within each unit
 * AND across all units (a question appearing in unit-1 won't appear again in unit-3).
 */
export function deduplicateBank<T extends { id: string }>(
  bank: Record<string, T[]>
): Record<string, T[]> {
  const globalSeen = new Set<string>();
  const result: Record<string, T[]> = {};
  for (const [key, questions] of Object.entries(bank)) {
    result[key] = questions.filter(q => {
      const id = q.id.toLowerCase();
      if (globalSeen.has(id)) return false;
      globalSeen.add(id);
      return true;
    });
  }
  return result;
}
