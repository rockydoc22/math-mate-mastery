import type { Question } from '@/data/questions';

export interface DuplicateGroup {
  hash: string;
  questions: {
    id: string;
    question: string;
    source: string;
  }[];
  similarity: 'exact' | 'near';
}

export interface DuplicateReport {
  totalQuestions: number;
  uniqueQuestions: number;
  duplicateGroups: DuplicateGroup[];
  duplicateCount: number;
}

// Normalize question text for comparison
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\\w\\s]/g, '')
    .trim();
};

// Generate a hash for quick comparison
const generateHash = (question: string): string => {
  const normalized = normalizeText(question);
  // Simple hash based on first 50 chars + length
  return `${normalized.slice(0, 50)}_${normalized.length}`;
};

// Calculate similarity between two strings (Jaccard similarity)
const calculateSimilarity = (a: string, b: string): number => {
  const setA = new Set(normalizeText(a).split(' '));
  const setB = new Set(normalizeText(b).split(' '));
  
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  return intersection.size / union.size;
};

// Detect source file from question ID
const detectSource = (id: string): string => {
  if (id.startsWith('math')) return 'mathQuestionsRaw.json';
  if (id.startsWith('add')) return 'additionalMathQuestions.ts';
  if (id.startsWith('newmath')) return 'newMathQuestions.ts';
  if (id.startsWith('upload')) return 'uploadedMathQuestions.ts';
  if (id.startsWith('hard')) return 'hardMathQuestions.ts';
  if (id.startsWith('sat-')) return 'importedSATQuestions*.ts';
  if (id.startsWith('level8')) return 'level8QuestionsExtra.ts';
  if (id.startsWith('pdf')) return 'pdfSATQuestions.ts';
  if (id.startsWith('level')) return 'allLevelQuestions.ts';
  if (id.startsWith('filler')) return 'levelFillerQuestions.ts';
  if (id.startsWith('balanced')) return 'balancedMathQuestions.ts';
  if (id.startsWith('medium')) return 'mediumMathQuestions*.ts';
  if (id.startsWith('eng')) return 'englishQuestions*.ts';
  return 'unknown';
};

// Find exact duplicates (same question text)
export const findExactDuplicates = (questions: Question[]): DuplicateGroup[] => {
  const hashMap = new Map<string, { id: string; question: string; source: string }[]>();
  
  for (const q of questions) {
    const hash = generateHash(q.question);
    const source = detectSource(q.id);
    
    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash)!.push({ id: q.id, question: q.question, source });
  }
  
  return Array.from(hashMap.entries())
    .filter(([_, items]) => items.length > 1)
    .map(([hash, questions]) => ({
      hash,
      questions,
      similarity: 'exact' as const
    }));
};

// Find near duplicates (similar question text, threshold 0.85)
export const findNearDuplicates = (
  questions: Question[], 
  threshold: number = 0.85,
  maxComparisons: number = 50000
): DuplicateGroup[] => {
  const nearDuplicates: DuplicateGroup[] = [];
  const processed = new Set<string>();
  let comparisons = 0;
  
  for (let i = 0; i < questions.length && comparisons < maxComparisons; i++) {
    if (processed.has(questions[i].id)) continue;
    
    const group: { id: string; question: string; source: string }[] = [{
      id: questions[i].id,
      question: questions[i].question,
      source: detectSource(questions[i].id)
    }];
    
    for (let j = i + 1; j < questions.length && comparisons < maxComparisons; j++) {
      if (processed.has(questions[j].id)) continue;
      
      comparisons++;
      const similarity = calculateSimilarity(questions[i].question, questions[j].question);
      
      if (similarity >= threshold && similarity < 1) {
        group.push({
          id: questions[j].id,
          question: questions[j].question,
          source: detectSource(questions[j].id)
        });
        processed.add(questions[j].id);
      }
    }
    
    if (group.length > 1) {
      processed.add(questions[i].id);
      nearDuplicates.push({
        hash: `near_${i}`,
        questions: group,
        similarity: 'near'
      });
    }
  }
  
  return nearDuplicates;
};

// Generate full duplicate report
export const generateDuplicateReport = (
  questions: Question[],
  includeNearDuplicates: boolean = true,
  nearDuplicateThreshold: number = 0.85
): DuplicateReport => {
  const exactDuplicates = findExactDuplicates(questions);
  
  let nearDuplicates: DuplicateGroup[] = [];
  if (includeNearDuplicates) {
    // Filter out questions already in exact duplicates for near duplicate check
    const exactIds = new Set(exactDuplicates.flatMap(g => g.questions.map(q => q.id)));
    const remainingQuestions = questions.filter(q => !exactIds.has(q.id));
    nearDuplicates = findNearDuplicates(remainingQuestions, nearDuplicateThreshold);
  }
  
  const allDuplicateGroups = [...exactDuplicates, ...nearDuplicates];
  const duplicateCount = allDuplicateGroups.reduce(
    (sum, group) => sum + group.questions.length - 1, 
    0
  );
  
  return {
    totalQuestions: questions.length,
    uniqueQuestions: questions.length - duplicateCount,
    duplicateGroups: allDuplicateGroups,
    duplicateCount
  };
};

// Get IDs of duplicate questions to remove (keeps first occurrence)
export const getDuplicateIdsToRemove = (report: DuplicateReport): string[] => {
  const idsToRemove: string[] = [];
  
  for (const group of report.duplicateGroups) {
    // Keep the first question, remove the rest
    for (let i = 1; i < group.questions.length; i++) {
      idsToRemove.push(group.questions[i].id);
    }
  }
  
  return idsToRemove;
};

// Filter out duplicates from question array
export const removeDuplicates = (questions: Question[]): Question[] => {
  const report = generateDuplicateReport(questions, false); // Only exact duplicates
  const idsToRemove = new Set(getDuplicateIdsToRemove(report));
  return questions.filter(q => !idsToRemove.has(q.id));
};
