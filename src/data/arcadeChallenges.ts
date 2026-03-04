// Arcade challenge generator for SAT/PSAT/ACT test prep
// Generates quick-recall questions suitable for arcade games

import { ExamType } from '@/utils/examConfig';

export type ArcadeSkill = 'math' | 'english' | 'mixed';

export interface ArcadeChallenge {
  prompt: string;
  correctAnswer: string;
  distractors: string[];
  category: string;
}

// ── Helpers ──

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function uniqueDistractors(correct: number, min: number, max: number, count: number): string[] {
  const set = new Set<number>();
  let attempts = 0;
  while (set.size < count && attempts < 50) {
    const d = randInt(min, max);
    if (d !== correct) set.add(d);
    attempts++;
  }
  while (set.size < count) {
    set.add(correct + set.size + 1);
  }
  return [...set].map(String);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Vocab & Grammar Data ──

const vocabPairs: [string, string, string, string, string][] = [
  ['Ubiquitous', 'Found everywhere', 'Rarely seen', 'Extremely loud', 'Very old'],
  ['Ephemeral', 'Short-lived', 'Eternal', 'Bright', 'Heavy'],
  ['Pragmatic', 'Practical', 'Idealistic', 'Lazy', 'Romantic'],
  ['Ambiguous', 'Unclear', 'Obvious', 'Angry', 'Musical'],
  ['Eloquent', 'Fluent & persuasive', 'Silent', 'Confused', 'Hostile'],
  ['Concise', 'Brief & clear', 'Long-winded', 'Mysterious', 'Colorful'],
  ['Benevolent', 'Kind & generous', 'Cruel', 'Wealthy', 'Shy'],
  ['Diligent', 'Hardworking', 'Lazy', 'Fast', 'Clever'],
  ['Resilient', 'Able to recover', 'Fragile', 'Quiet', 'Tall'],
  ['Inevitable', 'Certain to happen', 'Unlikely', 'Optional', 'Sudden'],
  ['Prolific', 'Highly productive', 'Inactive', 'Destructive', 'Small'],
  ['Candid', 'Honest & direct', 'Secretive', 'Timid', 'Elaborate'],
  ['Meticulous', 'Very careful', 'Careless', 'Quick', 'Bold'],
  ['Vindicate', 'Clear of blame', 'Accuse', 'Punish', 'Ignore'],
  ['Juxtapose', 'Place side by side', 'Separate', 'Destroy', 'Hide'],
  ['Ameliorate', 'Make better', 'Worsen', 'Maintain', 'Delay'],
  ['Exacerbate', 'Make worse', 'Improve', 'Explain', 'Simplify'],
  ['Perfunctory', 'Done without care', 'Thorough', 'Enthusiastic', 'Novel'],
  ['Complacent', 'Smugly satisfied', 'Anxious', 'Ambitious', 'Angry'],
  ['Tenacious', 'Persistent', 'Giving up easily', 'Quiet', 'Nervous'],
];

const grammarQuestions: [string, string, string, string, string][] = [
  ['The data ___ inconclusive.', 'were', 'was', 'is being', 'has'],
  ['Neither the students nor the teacher ___ ready.', 'was', 'were', 'are', 'been'],
  ['Each of the players ___ a trophy.', 'receives', 'receive', 'receiving', 'received'],
  ['The team ___ their jerseys.', 'wore', 'weared', 'was wearing', 'wored'],
  ['She is taller ___ her brother.', 'than', 'then', 'that', 'from'],
  ['If I ___ rich, I would travel.', 'were', 'was', 'am', 'be'],
  ['The books on the shelf ___ dusty.', 'are', 'is', 'was', 'been'],
  ['He runs ___ than his sister.', 'faster', 'more fast', 'most fast', 'fastest'],
  ['They ___ to the store yesterday.', 'went', 'goed', 'goes', 'going'],
  ['_____ the rain, they played outside.', 'Despite', 'Although', 'Because', 'Since'],
  ['The committee ___ divided on the issue.', 'was', 'were', 'are', 'been'],
  ['She ___ studying when I called.', 'was', 'is', 'were', 'been'],
];

// ── Math Quick-Recall Questions ──

const mathChallenges: (() => ArcadeChallenge)[] = [
  () => {
    const a = randInt(2, 9); const x = randInt(1, 12); const b = randInt(1, 20);
    const result = a * x + b;
    return { prompt: `${a}x + ${b} = ${result}. x = ?`, correctAnswer: `${x}`, distractors: uniqueDistractors(x, 1, 20, 3), category: 'Algebra' };
  },
  () => {
    const r1 = randInt(1, 8); const r2 = randInt(1, 8);
    return { prompt: `x² − ${r1 + r2}x + ${r1 * r2} = 0. One root?`, correctAnswer: `${r1}`, distractors: uniqueDistractors(r1, 1, 15, 3), category: 'Quadratics' };
  },
  () => {
    const base = randInt(2, 5); const exp = randInt(2, 4); const ans = Math.pow(base, exp);
    return { prompt: `${base}^${exp} = ?`, correctAnswer: `${ans}`, distractors: uniqueDistractors(ans, 4, 200, 3), category: 'Exponents' };
  },
  () => {
    const pct = [10, 15, 20, 25, 30, 40, 50, 75][randInt(0, 7)];
    const whole = [40, 60, 80, 100, 120, 200, 300][randInt(0, 6)];
    const ans = (pct / 100) * whole;
    return { prompt: `${pct}% of ${whole} = ?`, correctAnswer: `${ans}`, distractors: uniqueDistractors(ans, 1, whole, 3), category: 'Percentages' };
  },
  () => {
    const x1 = randInt(0, 5), y1 = randInt(0, 5);
    const x2 = x1 + randInt(1, 4), y2 = y1 + randInt(-3, 5);
    const rise = y2 - y1, run = x2 - x1;
    const g = gcd(Math.abs(rise), Math.abs(run));
    const ans = g === run ? `${rise / g}` : `${rise / g}/${run / g}`;
    return { prompt: `Slope of (${x1},${y1}) to (${x2},${y2})?`, correctAnswer: ans, distractors: [`${rise + 1}/${run}`, `${run}/${rise || 1}`, `${-rise / g}/${run / g}`].slice(0, 3), category: 'Slope' };
  },
  () => {
    const a = randInt(11, 25); const b = randInt(11, 25);
    return { prompt: `${a} × ${b} = ?`, correctAnswer: `${a * b}`, distractors: uniqueDistractors(a * b, 100, 700, 3), category: 'Arithmetic' };
  },
  () => {
    const n = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144][randInt(0, 10)];
    return { prompt: `√${n} = ?`, correctAnswer: `${Math.sqrt(n)}`, distractors: uniqueDistractors(Math.sqrt(n), 2, 15, 3), category: 'Roots' };
  },
  () => {
    const n = randInt(-15, -1);
    return { prompt: `|${n}| = ?`, correctAnswer: `${-n}`, distractors: [`${n}`, `${-n + 1}`, `${-n - 1}`], category: 'Absolute Value' };
  },
];

// ── English Quick-Recall Questions ──

const englishChallenges: (() => ArcadeChallenge)[] = [
  ...vocabPairs.map(([word, def, d1, d2, d3]) => () => ({
    prompt: `"${word}" means:`,
    correctAnswer: def,
    distractors: [d1, d2, d3],
    category: 'Vocabulary',
  })),
  ...grammarQuestions.map(([sentence, correct, d1, d2, d3]) => () => ({
    prompt: sentence,
    correctAnswer: correct,
    distractors: [d1, d2, d3],
    category: 'Grammar',
  })),
];

// ── AP Chemistry Speed-Recall Questions ──

const apChemChallenges: (() => ArcadeChallenge)[] = [
  () => ({ prompt: 'Color of Phenolphthalein in base?', correctAnswer: 'Pink', distractors: ['Colorless', 'Blue', 'Yellow'], category: 'Lab' }),
  () => ({ prompt: 'Hybridization of 3 electron domains?', correctAnswer: 'sp2', distractors: ['sp', 'sp3', 'dsp3'], category: 'Bonding' }),
  () => ({ prompt: 'Charge of an alpha particle?', correctAnswer: '+2', distractors: ['-1', '0', '+1'], category: 'Atomic' }),
  () => ({ prompt: 'Slope of a 1st order ln[A] vs t plot?', correctAnswer: '-k', distractors: ['k', '1/k', 'ln(k)'], category: 'Kinetics' }),
  () => ({ prompt: 'Strong acid or weak: HClO4?', correctAnswer: 'Strong', distractors: ['Weak'], category: 'Acids' }),
  () => ({ prompt: 'R-value for Liters-Atmospheres?', correctAnswer: '0.0821', distractors: ['8.314', '6.022', '1.987'], category: 'Gases' }),
  () => ({ prompt: 'Bond angle in CH4?', correctAnswer: '109.5°', distractors: ['90°', '104.5°', '107°'], category: 'Bonding' }),
  () => ({ prompt: 'Sign of ΔH for endothermic?', correctAnswer: 'Positive (+)', distractors: ['Negative (-)'], category: 'Thermo' }),
  () => ({ prompt: 'Units of k for 0 order reaction?', correctAnswer: 'M/s', distractors: ['s⁻¹', 'M⁻¹s⁻¹', 'M⁻²s⁻¹'], category: 'Kinetics' }),
  () => ({ prompt: 'Oxidation state of O in H2O2?', correctAnswer: '-1', distractors: ['-2', '0', '+1'], category: 'Redox' }),
  () => ({ prompt: 'Half-equivalence point relationship?', correctAnswer: 'pH = pKa', distractors: ['pH = 7', 'pOH = pKb', 'Kw = Ka'], category: 'Titrations' }),
  () => ({ prompt: 'Shape of an s-orbital?', correctAnswer: 'Spherical', distractors: ['Dumbbell', 'Clover', 'Donut'], category: 'Atomic' }),
  () => ({ prompt: 'Standard Temperature at STP?', correctAnswer: '0°C', distractors: ['25°C', '100°C', '273°C'], category: 'Gases' }),
  () => ({ prompt: 'Molecular shape of SF6?', correctAnswer: 'Octahedral', distractors: ['Tetrahedral', 'Square Planar', 'Bent'], category: 'Bonding' }),
  () => ({ prompt: 'Anion flow in salt bridge?', correctAnswer: 'Toward Anode', distractors: ['Toward Cathode'], category: 'Electrochem' }),
  () => ({ prompt: 'Is boiling water physical or chemical?', correctAnswer: 'Physical', distractors: ['Chemical'], category: 'Reactions' }),
  () => ({ prompt: 'Paramagnetic means...', correctAnswer: 'Unpaired electrons', distractors: ['All paired'], category: 'Atomic' }),
  () => ({ prompt: 'Sign of ΔG for spontaneous?', correctAnswer: 'Negative (-)', distractors: ['Positive (+)'], category: 'Thermo' }),
  () => ({ prompt: 'Primary IMF in noble gases?', correctAnswer: 'LDF', distractors: ['Dipole-Dipole', 'H-Bonding', 'Ionic'], category: 'IMFs' }),
  () => ({ prompt: 'Geometry of CO2?', correctAnswer: 'Linear', distractors: ['Bent', 'Trigonal Planar', 'Tetrahedral'], category: 'Bonding' }),
  () => ({ prompt: 'Color of Cu2+ in solution?', correctAnswer: 'Blue', distractors: ['Green', 'Colorless', 'Pink'], category: 'Lab' }),
  () => ({ prompt: 'Ideal Gas Law equation?', correctAnswer: 'PV=nRT', distractors: ['P=nRT/V', 'V=nRT/P', 'All of these'], category: 'Gases' }),
  () => ({ prompt: 'Flame test color for Lithium?', correctAnswer: 'Red/Crimson', distractors: ['Yellow', 'Violet', 'Green'], category: 'Lab' }),
  () => ({ prompt: 'Is NH3 polar or nonpolar?', correctAnswer: 'Polar', distractors: ['Nonpolar'], category: 'Bonding' }),
  () => ({ prompt: 'pH of 0.01 M HCl?', correctAnswer: '2', distractors: ['1', '7', '12'], category: 'Acids' }),
  () => ({ prompt: 'Standard pressure in mmHg?', correctAnswer: '760', distractors: ['1', '100', '101.3'], category: 'Gases' }),
  () => ({ prompt: 'State of Br2 at room temp?', correctAnswer: 'Liquid', distractors: ['Gas', 'Solid'], category: 'Elements' }),
  () => ({ prompt: 'Charge of a sulfate ion?', correctAnswer: '-2', distractors: ['-1', '-3', '+2'], category: 'Ions' }),
  () => ({ prompt: 'Highest electronegativity element?', correctAnswer: 'Fluorine', distractors: ['Oxygen', 'Chlorine', 'Nitrogen'], category: 'Periodic Trends' }),
  () => ({ prompt: "Avogadro's Number?", correctAnswer: '6.022 × 10²³', distractors: ['1.66 × 10⁻²⁴', '8.314', '0.0821'], category: 'Constants' }),
  () => ({ prompt: 'Energy of a photon formula?', correctAnswer: 'E=hf', distractors: ['c=fλ', 'E=mc²', 'PV=nRT'], category: 'Atomic' }),
  () => ({ prompt: 'Charge of an electron?', correctAnswer: '-1', distractors: ['+1', '0'], category: 'Atomic' }),
  () => ({ prompt: 'Strong base: NaOH or NH3?', correctAnswer: 'NaOH', distractors: ['NH3'], category: 'Bases' }),
  () => ({ prompt: 'Sign of ΔS for melting ice?', correctAnswer: 'Positive (+)', distractors: ['Negative (-)'], category: 'Thermo' }),
  () => ({ prompt: 'Molar mass of H2O?', correctAnswer: '18 g/mol', distractors: ['10', '16', '20'], category: 'Stoich' }),
  () => ({ prompt: 'What is a Cation?', correctAnswer: 'Positive ion', distractors: ['Negative ion'], category: 'Ions' }),
  () => ({ prompt: 'Bond in NaCl?', correctAnswer: 'Ionic', distractors: ['Covalent', 'Metallic'], category: 'Bonding' }),
  () => ({ prompt: 'Valence electrons in Carbon?', correctAnswer: '4', distractors: ['2', '6', '8'], category: 'Atomic' }),
  () => ({ prompt: 'Formula for Molarity?', correctAnswer: 'mol / L', distractors: ['g / L', 'mol / kg', 'L / mol'], category: 'Stoich' }),
  () => ({ prompt: 'Symbol for Silver?', correctAnswer: 'Ag', distractors: ['Au', 'Si', 'Sr'], category: 'Elements' }),
  () => ({ prompt: 'Name for Group 17?', correctAnswer: 'Halogens', distractors: ['Alkali', 'Noble', 'Chalcogens'], category: 'Periodic Table' }),
  () => ({ prompt: 'Is boiling endothermic?', correctAnswer: 'Yes', distractors: ['No'], category: 'Thermo' }),
  () => ({ prompt: 'Formula for Formal Charge?', correctAnswer: 'Valence - (Dots + Lines)', distractors: ['Lines - Dots', 'Valence + Lines', 'Dots / Lines'], category: 'Bonding' }),
  () => ({ prompt: 'Does a catalyst change ΔH?', correctAnswer: 'No', distractors: ['Yes'], category: 'Kinetics' }),
  () => ({ prompt: 'What is an intermediate?', correctAnswer: 'Produced then consumed', distractors: ['Consumed then produced', 'Speeds up reaction', 'Remains at end'], category: 'Kinetics' }),
  () => ({ prompt: "Beer's Law: A = ?", correctAnswer: 'abc', distractors: ['mcΔT', 'nRT', '-log[H+]'], category: 'Lab' }),
  () => ({ prompt: 'Solubility of all Nitrates?', correctAnswer: 'Soluble', distractors: ['Insoluble'], category: 'Solubility' }),
  () => ({ prompt: 'Acid + Base → ?', correctAnswer: 'Salt + Water', distractors: ['CO₂ + Water', 'H₂ + Salt', 'Metal + O₂'], category: 'Reactions' }),
  () => ({ prompt: 'What is pKa + pKb?', correctAnswer: '14', distractors: ['7', '1', 'Kw'], category: 'Acids' }),
  () => ({ prompt: 'Standard enthalpy of element?', correctAnswer: '0', distractors: ['1', '100', '-1'], category: 'Thermo' }),
  () => ({ prompt: 'ΔG = ?', correctAnswer: 'ΔH - TΔS', distractors: ['ΔH + TΔS', 'TΔS - ΔH', 'q + w'], category: 'Thermo' }),
  () => ({ prompt: 'Anode sign in Galvanic cell?', correctAnswer: 'Negative (-)', distractors: ['Positive (+)'], category: 'Electrochem' }),
  () => ({ prompt: 'Bond angle in NH3?', correctAnswer: '107°', distractors: ['104.5°', '109.5°', '120°'], category: 'Bonding' }),
  () => ({ prompt: 'Units of molarity?', correctAnswer: 'mol/L', distractors: ['mol/kg', 'g/L', 'L/mol'], category: 'Stoich' }),
  () => ({ prompt: "What does 'volatile' mean?", correctAnswer: 'Evaporates easily', distractors: ['Reactive', 'Explosive', 'Dense'], category: 'Properties' }),
  () => ({ prompt: 'Strong acid: HF or HI?', correctAnswer: 'HI', distractors: ['HF'], category: 'Acids' }),
  () => ({ prompt: 'Mass of an electron?', correctAnswer: '~0 amu', distractors: ['1 amu', '0.5 amu'], category: 'Atomic' }),
  () => ({ prompt: 'Oxidation state of F?', correctAnswer: '-1', distractors: ['0', '+1', 'variable'], category: 'Redox' }),
  () => ({ prompt: 'First Law of Thermo: ΔE = ?', correctAnswer: 'q + w', distractors: ['q - w', 'w - q', 'ΔH'], category: 'Thermo' }),
  () => ({ prompt: 'Bond in Br2?', correctAnswer: 'Nonpolar covalent', distractors: ['Polar covalent', 'Ionic', 'Metallic'], category: 'Bonding' }),
  () => ({ prompt: 'Is vaporization endo or exo?', correctAnswer: 'Endothermic', distractors: ['Exothermic'], category: 'Thermo' }),
  () => ({ prompt: 'Symbol for Enthalpy?', correctAnswer: 'H', distractors: ['E', 'S', 'G'], category: 'Thermo' }),
  () => ({ prompt: 'Gas constant for Energy units?', correctAnswer: '8.314 J/mol·K', distractors: ['0.0821', '1.987'], category: 'Constants' }),
  () => ({ prompt: 'What is 10^(-pH)?', correctAnswer: '[H⁺]', distractors: ['pOH', 'Ka', '[OH⁻]'], category: 'Acids' }),
  () => ({ prompt: 'Electron geometry of H2O?', correctAnswer: 'Tetrahedral', distractors: ['Bent', 'Linear', 'Trigonal'], category: 'Bonding' }),
  () => ({ prompt: 'Rate = k[A]⁰ is which order?', correctAnswer: 'Zero', distractors: ['First', 'Second'], category: 'Kinetics' }),
  () => ({ prompt: 'Amphoteric means...', correctAnswer: 'Acts as acid or base', distractors: ['Strong', 'Insoluble', 'Neutral'], category: 'Acids' }),
  () => ({ prompt: 'Oxidation state of Cr in Cr₂O₇²⁻?', correctAnswer: '+6', distractors: ['+3', '+7', '+12'], category: 'Redox' }),
  () => ({ prompt: 'Faraday constant value?', correctAnswer: '~96500 C/mol', distractors: ['8.314', '0.0821', '6.022'], category: 'Electrochem' }),
  () => ({ prompt: 'Is MgO ionic or covalent?', correctAnswer: 'Ionic', distractors: ['Covalent'], category: 'Bonding' }),
  () => ({ prompt: 'Which is larger: Ca or Ca²⁺?', correctAnswer: 'Ca', distractors: ['Ca²⁺'], category: 'Periodic Trends' }),
  () => ({ prompt: "Boyle's Law formula?", correctAnswer: 'P₁V₁ = P₂V₂', distractors: ['V₁/T₁ = V₂/T₂', 'P/T = k'], category: 'Gases' }),
  () => ({ prompt: "What is 'n' in ΔG = -nFE?", correctAnswer: 'Moles of electrons', distractors: ['Moles of gas', 'Moles of solute'], category: 'Electrochem' }),
  () => ({ prompt: 'Bond angle in BF3?', correctAnswer: '120°', distractors: ['90°', '109.5°', '180°'], category: 'Bonding' }),
  () => ({ prompt: 'Strongest IMF in CH3OH?', correctAnswer: 'Hydrogen Bonding', distractors: ['LDF', 'Dipole-Dipole'], category: 'IMFs' }),
  () => ({ prompt: 'What is -log(Ka)?', correctAnswer: 'pKa', distractors: ['pH', 'pKb', 'Kw'], category: 'Acids' }),
  () => ({ prompt: 'Slope of 1/[A] vs t?', correctAnswer: 'k', distractors: ['-k', 'ln k'], category: 'Kinetics' }),
  () => ({ prompt: 'Standard pressure in kPa?', correctAnswer: '101.3', distractors: ['1.0', '760'], category: 'Gases' }),
  () => ({ prompt: 'Anode: oxidation or reduction?', correctAnswer: 'Oxidation', distractors: ['Reduction'], category: 'Electrochem' }),
  () => ({ prompt: 'Sigma bonds in a double bond?', correctAnswer: '1', distractors: ['2', '0'], category: 'Bonding' }),
  () => ({ prompt: 'Gas density formula?', correctAnswer: 'PM/RT', distractors: ['m/V', 'n/V', 'P/RT'], category: 'Gases' }),
  () => ({ prompt: 'What is Ka × Kb?', correctAnswer: 'Kw', distractors: ['pH', 'pKa', '14'], category: 'Acids' }),
  () => ({ prompt: 'More polar: C-H or O-H?', correctAnswer: 'O-H', distractors: ['C-H'], category: 'Bonding' }),
  () => ({ prompt: 'Volume of 1 mol gas at STP?', correctAnswer: '22.4 L', distractors: ['1.0 L', '24.5 L', '100 L'], category: 'Gases' }),
  () => ({ prompt: 'Hybridization of CO2?', correctAnswer: 'sp', distractors: ['sp2', 'sp3'], category: 'Bonding' }),
  () => ({ prompt: 'Does a catalyst lower ΔH?', correctAnswer: 'No', distractors: ['Yes'], category: 'Kinetics' }),
  () => ({ prompt: 'pH of neutral water at 25°C?', correctAnswer: '7', distractors: ['0', '1', '14'], category: 'Acids' }),
  () => ({ prompt: 'Stronger IMF: LDF or H-bond?', correctAnswer: 'H-bond', distractors: ['LDF'], category: 'IMFs' }),
  () => ({ prompt: 'Is diamond network covalent?', correctAnswer: 'Yes', distractors: ['No'], category: 'Bonding' }),
  () => ({ prompt: 'Color of Potassium flame?', correctAnswer: 'Lavender', distractors: ['Yellow', 'Red', 'Green'], category: 'Lab' }),
  () => ({ prompt: 'Noble gas in Period 2?', correctAnswer: 'Neon', distractors: ['Helium', 'Argon', 'Krypton'], category: 'Periodic Table' }),
  () => ({ prompt: 'Direction of heat flow?', correctAnswer: 'Hot to Cold', distractors: ['Cold to Hot'], category: 'Thermo' }),
  () => ({ prompt: 'Does T increase average KE?', correctAnswer: 'Yes', distractors: ['No'], category: 'KMT' }),
  () => ({ prompt: 'Bond order of O2?', correctAnswer: '2', distractors: ['1', '3', '1.5'], category: 'Bonding' }),
  () => ({ prompt: 'Prefix for 4 in naming?', correctAnswer: 'Tetra-', distractors: ['Di-', 'Tri-', 'Penta-'], category: 'Naming' }),
  () => ({ prompt: 'Oxidation state of pure Na(s)?', correctAnswer: '0', distractors: ['+1', '-1', '+2'], category: 'Redox' }),
  () => ({ prompt: 'Symbol for Entropy?', correctAnswer: 'S', distractors: ['H', 'G', 'E'], category: 'Thermo' }),
  () => ({ prompt: 'Is dissolving sugar physical?', correctAnswer: 'Yes', distractors: ['No'], category: 'Reactions' }),
  () => ({ prompt: 'Is glass crystalline?', correctAnswer: 'No (Amorphous)', distractors: ['Yes'], category: 'Solids' }),
  () => ({ prompt: 'Halogen in Period 3?', correctAnswer: 'Chlorine', distractors: ['Fluorine', 'Bromine', 'Iodine'], category: 'Periodic Table' }),
  () => ({ prompt: 'Definition of an isotope?', correctAnswer: 'Same protons, diff neutrons', distractors: ['Same neutrons, diff protons', 'Diff electrons', 'Diff charge'], category: 'Atomic' }),
  () => ({ prompt: 'What is an alpha particle?', correctAnswer: 'Helium nucleus', distractors: ['Electron', 'Proton', 'Neutron'], category: 'Atomic' }),
  () => ({ prompt: 'Density formula?', correctAnswer: 'D = m/V', distractors: ['D = V/m', 'D = m×V', 'D = P/RT'], category: 'Stoich' }),
  () => ({ prompt: 'Pressure formula?', correctAnswer: 'Force / Area', distractors: ['A / F', 'F × A', 'm × g'], category: 'Gases' }),
];

// ── Public API ──

export function generateArcadeChallenges(skill: ArcadeSkill, count: number, _examType?: ExamType): ArcadeChallenge[] {
  // Use AP Chemistry challenges when exam type starts with 'ap-'
  const isAP = _examType && _examType.startsWith('ap-');

  let generators: (() => ArcadeChallenge)[];
  if (isAP) {
    generators = shuffle([...apChemChallenges]);
  } else if (skill === 'math') {
    generators = mathChallenges;
  } else if (skill === 'english') {
    generators = englishChallenges;
  } else {
    generators = shuffle([...mathChallenges, ...englishChallenges]);
  }

  const challenges: ArcadeChallenge[] = [];
  for (let i = 0; i < count; i++) {
    const gen = generators[i % generators.length];
    const c = gen();
    const allAnswers = shuffle([c.correctAnswer, ...c.distractors.slice(0, 3)]);
    challenges.push({ ...c, distractors: allAnswers.filter(a => a !== c.correctAnswer) });
  }
  return challenges;
}

export function generateHardChallenge(skill: ArcadeSkill, _examType?: ExamType): ArcadeChallenge {
  const isAP = _examType && _examType.startsWith('ap-');
  const generators = isAP ? apChemChallenges
    : skill === 'math' ? mathChallenges
    : skill === 'english' ? englishChallenges
    : [...mathChallenges, ...englishChallenges];
  const gen = generators[Math.floor(Math.random() * generators.length)];
  return gen();
}
