import period2Raw from './apushPeriod2Extra.json';
import unit7Raw from './apushUnit7Extra.json';

export interface SupplementalQuestion {
  id: string | number;
  period?: string;
  question: string;
  choices?: string[];
  options?: string[];
  answer: string;
  explanation: string;
  difficulty?: string;
  tags?: string[];
}

export interface ValidationIssue {
  id: string | number;
  source: string;
  problems: string[];
}

export interface ImportSummary {
  totalLoaded: number;
  validCount: number;
  issues: ValidationIssue[];
  bySubject: Record<string, number>;
  byPeriod: Record<string, number>;
}

function validate(q: SupplementalQuestion, source: string): ValidationIssue | null {
  const problems: string[] = [];
  const opts = q.choices ?? q.options ?? [];
  if (!q.question || q.question.trim().length < 10) problems.push('missing/short question');
  if (opts.length < 2) problems.push('fewer than 2 choices');
  if (!q.answer || !q.answer.toString().trim()) problems.push('missing answer');
  if (!q.explanation || q.explanation.trim().length < 10) problems.push('missing/short explanation');
  // Truncated tag detection
  if (q.tags) {
    for (const t of q.tags) {
      if (!t || t.length < 2 || /[,;]$/.test(t)) problems.push(`suspicious tag: "${t}"`);
    }
  }
  // Verify the answer matches a choice (letter or text)
  if (opts.length && q.answer) {
    const ans = q.answer.toString().trim();
    const isLetter = /^[A-D]$/.test(ans);
    const matchesText = opts.some(o => o.includes(ans) || ans.includes(o.replace(/^[A-D]\)\s*/, '')));
    if (!isLetter && !matchesText) problems.push('answer does not match any choice');
  }
  return problems.length ? { id: q.id, source, problems } : null;
}

const sources: Array<{ name: string; subject: string; data: SupplementalQuestion[] }> = [
  { name: 'APUSH Period 1-2 Extra', subject: 'AP US History', data: period2Raw as SupplementalQuestion[] },
  { name: 'APUSH Unit 7 Extra', subject: 'AP US History', data: unit7Raw as SupplementalQuestion[] },
];

export function buildImportSummary(): ImportSummary {
  const issues: ValidationIssue[] = [];
  const bySubject: Record<string, number> = {};
  const byPeriod: Record<string, number> = {};
  let total = 0;

  for (const src of sources) {
    for (const q of src.data) {
      total++;
      const issue = validate(q, src.name);
      if (issue) issues.push(issue);
      bySubject[src.subject] = (bySubject[src.subject] ?? 0) + 1;
      const period = q.period ?? 'unspecified';
      byPeriod[`Period ${period}`] = (byPeriod[`Period ${period}`] ?? 0) + 1;
    }
  }

  return {
    totalLoaded: total,
    validCount: total - issues.length,
    issues,
    bySubject,
    byPeriod,
  };
}

export function getAllSupplementalQuestions(): SupplementalQuestion[] {
  return sources.flatMap(s => s.data);
}