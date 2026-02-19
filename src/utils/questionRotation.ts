/**
 * Persistent Question Rotation
 * 
 * Tracks correctly answered questions in localStorage so they are not
 * repeated until ALL other questions in the pool are exhausted.
 * Persists across browser closes, PWA reopens, and sessions.
 * 
 * Separate tracking for each mode: quiz, daily, practice-test, battle.
 */

const STORAGE_PREFIX = "sat_mastery_rotation_";

/**
 * Get the set of question IDs that have been answered correctly
 * and should be deprioritized until the pool is exhausted.
 */
export function getCorrectlyAnsweredIds(mode: string = "global"): Set<string> {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${mode}`);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

/**
 * Mark a question as correctly answered for rotation purposes.
 */
export function markQuestionCorrect(questionId: string, mode: string = "global"): void {
  try {
    const current = getCorrectlyAnsweredIds(mode);
    current.add(questionId);
    localStorage.setItem(`${STORAGE_PREFIX}${mode}`, JSON.stringify([...current]));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Reset the rotation for a given mode (e.g., when all questions exhausted).
 */
export function resetRotation(mode: string = "global"): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${mode}`);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Filter a question pool to prioritize unanswered questions.
 * If all questions have been answered, resets rotation and returns the full pool.
 * 
 * @param pool - Full question pool
 * @param count - Number of questions needed
 * @param mode - Rotation tracking mode (e.g., "quiz", "daily")
 * @returns Filtered pool prioritizing unanswered questions
 */
export function applyRotation<T extends { id: string }>(
  pool: T[],
  count: number,
  mode: string = "global"
): T[] {
  const correctIds = getCorrectlyAnsweredIds(mode);
  
  if (correctIds.size === 0) return pool;
  
  const unanswered = pool.filter(q => !correctIds.has(q.id));
  
  // If enough unanswered questions remain, use only those
  if (unanswered.length >= count) {
    return unanswered;
  }
  
  // If all or nearly all exhausted, reset rotation and return full pool
  if (unanswered.length === 0) {
    resetRotation(mode);
    return pool;
  }
  
  // Mix: unanswered first, then fill with previously answered
  const answered = pool.filter(q => correctIds.has(q.id));
  return [...unanswered, ...answered];
}
