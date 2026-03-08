import { Question } from './questions';

export interface APPhys1Unit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_PHYS1_UNITS: APPhys1Unit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Kinematics', description: 'Motion in 1D and 2D, projectiles', icon: '🏃' },
  { id: 'unit-2', unitNumber: 2, name: 'Dynamics', description: "Newton's laws, friction, forces", icon: '💪' },
  { id: 'unit-3', unitNumber: 3, name: 'Circular Motion and Gravitation', description: 'Centripetal force, orbits, gravity', icon: '🌍' },
  { id: 'unit-4', unitNumber: 4, name: 'Energy', description: 'Work, kinetic/potential energy, conservation', icon: '⚡' },
  { id: 'unit-5', unitNumber: 5, name: 'Momentum', description: 'Impulse, collisions, conservation of momentum', icon: '🎱' },
  { id: 'unit-6', unitNumber: 6, name: 'Simple Harmonic Motion', description: 'Springs, pendulums, oscillations', icon: '🔄' },
  { id: 'unit-7', unitNumber: 7, name: 'Torque and Rotational Motion', description: 'Torque, angular momentum, rotational inertia', icon: '🎡' },
];

interface RawQuestion { id: string; question: string; choices: Record<string, string>; answer: string; explanation: string; difficulty?: number; }

function convertQuestion(raw: RawQuestion, skill: string): Question {
  return {
    id: raw.id.toLowerCase(),
    question: raw.question,
    options: ['A','B','C','D'].filter(l => raw.choices[l] !== undefined).map(l => ({ letter: l, text: raw.choices[l] })),
    correctAnswer: raw.answer,
    explanation: raw.explanation,
    difficulty: 'Medium',
    domain: 'Physics 1',
    skill,
  };
}

let _bankCache: Record<string, Question[]> | null = null;
let _bankPromise: Promise<Record<string, Question[]>> | null = null;

async function loadBank(): Promise<Record<string, Question[]>> {
  if (_bankCache) return _bankCache;
  if (_bankPromise) return _bankPromise;
  _bankPromise = import('./AP_Physics_1_question_bank_200.json').then(mod => {
    const raw = mod.default as RawQuestion[];
    const result: Record<string, Question[]> = {};
    raw.forEach((q, i) => {
      const key = `unit-${(i % AP_PHYS1_UNITS.length) + 1}`;
      if (!result[key]) result[key] = [];
      result[key].push(convertQuestion(q, AP_PHYS1_UNITS[i % AP_PHYS1_UNITS.length].name));
    });
    _bankCache = result;
    return result;
  });
  return _bankPromise;
}

export async function loadAPPhys1Questions(): Promise<Record<string, Question[]>> { return loadBank(); }
export const apPhys1QuestionsByUnit: Record<string, Question[]> = Object.fromEntries(AP_PHYS1_UNITS.map(u => [u.id, []]));
