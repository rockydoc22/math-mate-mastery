/**
 * Official SAT Test Dates
 * Updated: January 2026
 */

export interface SATTestDate {
  date: string; // ISO format YYYY-MM-DD
  label: string; // Human readable
  registrationDeadline?: string;
}

export const SAT_TEST_DATES: SATTestDate[] = [
  { date: "2026-03-14", label: "March 14, 2026" },
  { date: "2026-05-02", label: "May 2, 2026" },
  { date: "2026-06-06", label: "June 6, 2026" },
  { date: "2026-08-15", label: "August 15, 2026" },
  { date: "2026-09-12", label: "September 12, 2026" },
  { date: "2026-10-03", label: "October 3, 2026" },
  { date: "2026-11-07", label: "November 7, 2026" },
  { date: "2026-12-05", label: "December 5, 2026" },
  { date: "2027-03-13", label: "March 13, 2027" },
  { date: "2027-05-01", label: "May 1, 2027" },
  { date: "2027-06-05", label: "June 5, 2027" },
];

/**
 * Get upcoming SAT dates (dates that haven't passed yet)
 */
export function getUpcomingSATDates(): SATTestDate[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return SAT_TEST_DATES.filter(d => new Date(d.date) >= today);
}

/**
 * Get the next SAT date
 */
export function getNextSATDate(): SATTestDate | null {
  const upcoming = getUpcomingSATDates();
  return upcoming.length > 0 ? upcoming[0] : null;
}

/**
 * Calculate days until a specific SAT date
 */
export function getDaysUntilSAT(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const satDate = new Date(dateStr);
  return Math.ceil((satDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Format days as a readable countdown
 */
export function formatCountdown(days: number): string {
  if (days < 0) return "Passed";
  if (days === 0) return "Today!";
  if (days === 1) return "Tomorrow!";
  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.ceil(days / 7)} weeks`;
  return `${Math.ceil(days / 30)} months`;
}
