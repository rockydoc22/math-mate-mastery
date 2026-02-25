import { Question } from './questions';

// AP Chemistry Units (College Board curriculum):
// Unit 1: Atomic Structure and Properties
// Unit 2: Molecular and Ionic Compound Structure and Properties
// Unit 3: Intermolecular Forces and Properties
// Unit 4: Chemical Reactions
// Unit 5: Kinetics
// Unit 6: Thermodynamics
// Unit 7: Equilibrium
// Unit 8: Acids and Bases
// Unit 9: Applications of Thermodynamics

export interface APChemUnit {
  id: string;
  unitNumber: number;
  name: string;
  description: string;
  icon: string;
}

export const AP_CHEM_UNITS: APChemUnit[] = [
  { id: 'unit-1', unitNumber: 1, name: 'Atomic Structure and Properties', description: 'Moles, mass spectrometry, electron configurations, photoelectron spectroscopy, periodic trends', icon: '⚛️' },
  { id: 'unit-2', unitNumber: 2, name: 'Molecular and Ionic Compound Structure and Properties', description: 'Lewis structures, VSEPR, bond polarity, ionic vs covalent bonding', icon: '🔗' },
  { id: 'unit-3', unitNumber: 3, name: 'Intermolecular Forces and Properties', description: 'IMFs, solubility, vapor pressure, phase diagrams, solutions', icon: '💧' },
  { id: 'unit-4', unitNumber: 4, name: 'Chemical Reactions', description: 'Net ionic equations, oxidation-reduction, stoichiometry, types of reactions', icon: '💥' },
  { id: 'unit-5', unitNumber: 5, name: 'Kinetics', description: 'Reaction rates, rate laws, activation energy, reaction mechanisms, catalysis', icon: '⏱️' },
  { id: 'unit-6', unitNumber: 6, name: 'Thermodynamics', description: 'Enthalpy, calorimetry, Hess\'s law, bond enthalpies', icon: '🔥' },
  { id: 'unit-7', unitNumber: 7, name: 'Equilibrium', description: 'Equilibrium constants, Le Chatelier\'s principle, ICE tables, solubility equilibria', icon: '⚖️' },
  { id: 'unit-8', unitNumber: 8, name: 'Acids and Bases', description: 'pH, strong/weak acids and bases, buffers, titrations', icon: '🧪' },
  { id: 'unit-9', unitNumber: 9, name: 'Applications of Thermodynamics', description: 'Entropy, Gibbs free energy, electrochemistry, galvanic and electrolytic cells', icon: '⚡' },
];

// ─── UNIT 1: Atomic Structure and Properties ───
const unit1Questions: Question[] = [
  {
    id: 'ap-chem-1-001',
    question: 'A sample of neon gas contains the isotopes Ne-20 (90.48%), Ne-21 (0.27%), and Ne-22 (9.25%). What is the average atomic mass of neon in this sample?',
    options: [
      { letter: 'A', text: '20.00 amu' },
      { letter: 'B', text: '20.18 amu' },
      { letter: 'C', text: '20.99 amu' },
      { letter: 'D', text: '21.00 amu' },
    ],
    correctAnswer: 'B',
    explanation: 'Average atomic mass = (20 × 0.9048) + (21 × 0.0027) + (22 × 0.0925) = 18.096 + 0.0567 + 2.035 = 20.18 amu. This weighted average accounts for the relative abundance of each isotope.',
    difficulty: 'Medium',
    domain: 'Atomic Structure',
    skill: 'Isotopes and Mass Spectrometry',
  },
  {
    id: 'ap-chem-1-002',
    question: 'Which of the following electron configurations represents a ground-state atom of phosphorus (Z = 15)?',
    options: [
      { letter: 'A', text: '1s² 2s² 2p⁶ 3s² 3p³' },
      { letter: 'B', text: '1s² 2s² 2p⁶ 3s² 3d³' },
      { letter: 'C', text: '1s² 2s² 2p⁶ 3s¹ 3p⁴' },
      { letter: 'D', text: '1s² 2s² 2p⁶ 3s² 3p² 3d¹' },
    ],
    correctAnswer: 'A',
    explanation: 'Phosphorus has 15 electrons. Following the Aufbau principle and filling orbitals in order of increasing energy: 1s² 2s² 2p⁶ 3s² 3p³. The 3p subshell has 3 electrons, each in a separate orbital with parallel spins (Hund\'s rule).',
    difficulty: 'Easy',
    domain: 'Atomic Structure',
    skill: 'Electron Configuration',
  },
  {
    id: 'ap-chem-1-003',
    question: 'In a photoelectron spectrum (PES) of nitrogen, which peak would have the highest binding energy?',
    options: [
      { letter: 'A', text: 'The peak corresponding to the 2p electrons' },
      { letter: 'B', text: 'The peak corresponding to the 2s electrons' },
      { letter: 'C', text: 'The peak corresponding to the 1s electrons' },
      { letter: 'D', text: 'All peaks have the same binding energy' },
    ],
    correctAnswer: 'C',
    explanation: 'The 1s electrons are closest to the nucleus and experience the greatest effective nuclear charge, so they have the highest binding energy. In PES, the 1s peak appears furthest to the left (highest binding energy). For nitrogen: BE order is 1s > 2s > 2p.',
    difficulty: 'Medium',
    domain: 'Atomic Structure',
    skill: 'Photoelectron Spectroscopy',
  },
  {
    id: 'ap-chem-1-004',
    question: 'Which of the following correctly ranks the atomic radii from smallest to largest?',
    options: [
      { letter: 'A', text: 'Na < Mg < Al < Si' },
      { letter: 'B', text: 'Si < Al < Mg < Na' },
      { letter: 'C', text: 'Al < Si < Na < Mg' },
      { letter: 'D', text: 'Na < Si < Mg < Al' },
    ],
    correctAnswer: 'B',
    explanation: 'Atomic radius decreases across a period (left to right) due to increasing effective nuclear charge pulling electrons closer. All four elements are in Period 3: Na (largest) > Mg > Al > Si (smallest). From smallest to largest: Si < Al < Mg < Na.',
    difficulty: 'Easy',
    domain: 'Atomic Structure',
    skill: 'Periodic Trends',
  },
  {
    id: 'ap-chem-1-005',
    question: 'A mass spectrum of a sample of bromine (Br₂) shows three peaks at m/z values of 158, 160, and 162. Bromine has two naturally occurring isotopes: ⁷⁹Br and ⁸¹Br. Which peak corresponds to the Br₂ molecule containing one atom of each isotope?',
    options: [
      { letter: 'A', text: '158' },
      { letter: 'B', text: '160' },
      { letter: 'C', text: '162' },
      { letter: 'D', text: 'Both 158 and 162' },
    ],
    correctAnswer: 'B',
    explanation: 'A Br₂ molecule with one ⁷⁹Br and one ⁸¹Br has a combined mass of 79 + 81 = 160 amu. The peak at 158 corresponds to ⁷⁹Br–⁷⁹Br (79+79), and the peak at 162 corresponds to ⁸¹Br–⁸¹Br (81+81). The peak at 160 would be the tallest since it can form in two ways.',
    difficulty: 'Medium',
    domain: 'Atomic Structure',
    skill: 'Isotopes and Mass Spectrometry',
  },
];

// ─── UNIT 2: Molecular and Ionic Compound Structure and Properties ───
const unit2Questions: Question[] = [
  {
    id: 'ap-chem-2-001',
    question: 'What is the molecular geometry of XeF₄ according to VSEPR theory?',
    options: [
      { letter: 'A', text: 'Tetrahedral' },
      { letter: 'B', text: 'Square planar' },
      { letter: 'C', text: 'See-saw' },
      { letter: 'D', text: 'Square pyramidal' },
    ],
    correctAnswer: 'B',
    explanation: 'XeF₄ has 4 bonding pairs and 2 lone pairs on the central Xe atom (electron domain geometry: octahedral). The 2 lone pairs occupy opposite axial positions to minimize repulsion, resulting in a square planar molecular geometry.',
    difficulty: 'Medium',
    domain: 'Molecular Structure',
    skill: 'VSEPR Theory',
  },
  {
    id: 'ap-chem-2-002',
    question: 'Which of the following molecules is polar?',
    options: [
      { letter: 'A', text: 'CO₂' },
      { letter: 'B', text: 'BF₃' },
      { letter: 'C', text: 'CH₂Cl₂' },
      { letter: 'D', text: 'CCl₄' },
    ],
    correctAnswer: 'C',
    explanation: 'CH₂Cl₂ (dichloromethane) is polar because the C–H and C–Cl bond dipoles do not cancel out due to the asymmetric arrangement. CO₂ is linear (dipoles cancel), BF₃ is trigonal planar (dipoles cancel), and CCl₄ is tetrahedral with identical substituents (dipoles cancel).',
    difficulty: 'Easy',
    domain: 'Molecular Structure',
    skill: 'Bond Polarity and Molecular Polarity',
  },
  {
    id: 'ap-chem-2-003',
    question: 'The Lewis structure for the nitrate ion (NO₃⁻) shows resonance. How many equivalent resonance structures can be drawn for NO₃⁻?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation: 'The nitrate ion has 3 equivalent resonance structures. In each structure, nitrogen forms a double bond with one oxygen atom and single bonds with the other two (which carry the formal negative charges). The double bond rotates among the three equivalent positions.',
    difficulty: 'Easy',
    domain: 'Molecular Structure',
    skill: 'Lewis Structures and Resonance',
  },
  {
    id: 'ap-chem-2-004',
    question: 'Which compound has the highest lattice energy?',
    options: [
      { letter: 'A', text: 'NaF' },
      { letter: 'B', text: 'NaCl' },
      { letter: 'C', text: 'MgO' },
      { letter: 'D', text: 'KBr' },
    ],
    correctAnswer: 'C',
    explanation: 'Lattice energy increases with increasing charge and decreasing ionic radii (Coulomb\'s law). MgO has the highest lattice energy because both ions are doubly charged (Mg²⁺ and O²⁻) and have relatively small radii. The other compounds have only singly charged ions.',
    difficulty: 'Medium',
    domain: 'Molecular Structure',
    skill: 'Ionic Bonding and Lattice Energy',
  },
  {
    id: 'ap-chem-2-005',
    question: 'The formal charge on the nitrogen atom in the ammonium ion (NH₄⁺) is:',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '+1' },
      { letter: 'C', text: '-1' },
      { letter: 'D', text: '+2' },
    ],
    correctAnswer: 'B',
    explanation: 'Formal charge = (valence electrons) - (lone pair electrons) - (½ bonding electrons). For N in NH₄⁺: FC = 5 - 0 - ½(8) = 5 - 0 - 4 = +1. Nitrogen has 5 valence electrons, no lone pairs, and 4 bonds (8 shared electrons) in the ammonium ion.',
    difficulty: 'Easy',
    domain: 'Molecular Structure',
    skill: 'Lewis Structures and Formal Charge',
  },
];

// ─── UNIT 3: Intermolecular Forces and Properties ───
const unit3Questions: Question[] = [
  {
    id: 'ap-chem-3-001',
    question: 'Which intermolecular force is primarily responsible for the high boiling point of water compared to H₂S?',
    options: [
      { letter: 'A', text: 'London dispersion forces' },
      { letter: 'B', text: 'Dipole-dipole interactions' },
      { letter: 'C', text: 'Hydrogen bonding' },
      { letter: 'D', text: 'Ion-dipole forces' },
    ],
    correctAnswer: 'C',
    explanation: 'Water (H₂O) has a much higher boiling point than H₂S because water molecules form strong hydrogen bonds (O–H···O). H₂S cannot form hydrogen bonds because sulfur is not electronegative enough. Despite H₂S being a larger molecule with stronger London dispersion forces, the hydrogen bonding in water dominates.',
    difficulty: 'Easy',
    domain: 'Intermolecular Forces',
    skill: 'Types of IMFs',
  },
  {
    id: 'ap-chem-3-002',
    question: 'A solution is made by dissolving 5.85 g of NaCl (molar mass = 58.5 g/mol) in enough water to make 500 mL of solution. What is the molarity of the solution?',
    options: [
      { letter: 'A', text: '0.10 M' },
      { letter: 'B', text: '0.20 M' },
      { letter: 'C', text: '0.50 M' },
      { letter: 'D', text: '1.00 M' },
    ],
    correctAnswer: 'B',
    explanation: 'Moles of NaCl = 5.85 g ÷ 58.5 g/mol = 0.100 mol. Molarity = moles ÷ volume in liters = 0.100 mol ÷ 0.500 L = 0.200 M.',
    difficulty: 'Easy',
    domain: 'Intermolecular Forces',
    skill: 'Solutions and Concentration',
  },
  {
    id: 'ap-chem-3-003',
    question: 'Which of the following would you expect to be most soluble in water?',
    options: [
      { letter: 'A', text: 'CH₃CH₂CH₂CH₃ (butane)' },
      { letter: 'B', text: 'CH₃OH (methanol)' },
      { letter: 'C', text: 'CCl₄ (carbon tetrachloride)' },
      { letter: 'D', text: 'C₆H₆ (benzene)' },
    ],
    correctAnswer: 'B',
    explanation: '"Like dissolves like." Water is a polar solvent that forms hydrogen bonds. Methanol (CH₃OH) is the most soluble because it is polar and can form hydrogen bonds with water through its –OH group. Butane, CCl₄, and benzene are all nonpolar or only slightly polar.',
    difficulty: 'Easy',
    domain: 'Intermolecular Forces',
    skill: 'Solubility and Miscibility',
  },
  {
    id: 'ap-chem-3-004',
    question: 'A liquid has a high viscosity, high surface tension, and a relatively high boiling point. Which of the following best explains these properties?',
    options: [
      { letter: 'A', text: 'The liquid has weak London dispersion forces' },
      { letter: 'B', text: 'The liquid has strong intermolecular forces' },
      { letter: 'C', text: 'The liquid has a low molar mass' },
      { letter: 'D', text: 'The liquid is a gas at room temperature' },
    ],
    correctAnswer: 'B',
    explanation: 'High viscosity, high surface tension, and high boiling point are all properties associated with strong intermolecular forces. Strong IMFs make it harder for molecules to move past each other (viscosity), harder to break the surface (surface tension), and require more energy to vaporize (boiling point).',
    difficulty: 'Medium',
    domain: 'Intermolecular Forces',
    skill: 'Physical Properties and IMFs',
  },
  {
    id: 'ap-chem-3-005',
    question: 'At a given temperature, which gas would deviate most from ideal gas behavior?',
    options: [
      { letter: 'A', text: 'He' },
      { letter: 'B', text: 'N₂' },
      { letter: 'C', text: 'NH₃' },
      { letter: 'D', text: 'Ar' },
    ],
    correctAnswer: 'C',
    explanation: 'Ammonia (NH₃) deviates most from ideal gas behavior because it has strong hydrogen bonding between molecules. Ideal gas behavior assumes no intermolecular forces and negligible molecular volume. Polar molecules with strong IMFs like NH₃ deviate the most, especially at high pressures and low temperatures.',
    difficulty: 'Medium',
    domain: 'Intermolecular Forces',
    skill: 'Ideal vs Real Gases',
  },
];

// ─── UNIT 4: Chemical Reactions ───
const unit4Questions: Question[] = [
  {
    id: 'ap-chem-4-001',
    question: 'When solutions of lead(II) nitrate and potassium iodide are mixed, a yellow precipitate forms. What is the net ionic equation for this reaction?',
    options: [
      { letter: 'A', text: 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)' },
      { letter: 'B', text: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)' },
      { letter: 'C', text: 'K⁺(aq) + NO₃⁻(aq) → KNO₃(s)' },
      { letter: 'D', text: 'Pb²⁺(aq) + I⁻(aq) → PbI(s)' },
    ],
    correctAnswer: 'A',
    explanation: 'The net ionic equation removes spectator ions (K⁺ and NO₃⁻) and shows only the ions that form the precipitate. Pb²⁺ and I⁻ combine to form insoluble PbI₂ (yellow precipitate). The balanced equation requires 2 iodide ions per lead ion.',
    difficulty: 'Medium',
    domain: 'Chemical Reactions',
    skill: 'Net Ionic Equations',
  },
  {
    id: 'ap-chem-4-002',
    question: 'In the reaction 2Fe₂O₃ + 3C → 4Fe + 3CO₂, how many moles of iron are produced from 1.5 moles of Fe₂O₃?',
    options: [
      { letter: 'A', text: '1.5 mol' },
      { letter: 'B', text: '2.0 mol' },
      { letter: 'C', text: '3.0 mol' },
      { letter: 'D', text: '4.0 mol' },
    ],
    correctAnswer: 'C',
    explanation: 'From the balanced equation, 2 mol Fe₂O₃ produces 4 mol Fe. The mole ratio is 4 Fe / 2 Fe₂O₃ = 2 Fe per Fe₂O₃. So 1.5 mol Fe₂O₃ × (4 mol Fe / 2 mol Fe₂O₃) = 3.0 mol Fe.',
    difficulty: 'Easy',
    domain: 'Chemical Reactions',
    skill: 'Stoichiometry',
  },
  {
    id: 'ap-chem-4-003',
    question: 'Which of the following represents an oxidation half-reaction?',
    options: [
      { letter: 'A', text: 'Cu²⁺ + 2e⁻ → Cu' },
      { letter: 'B', text: 'Zn → Zn²⁺ + 2e⁻' },
      { letter: 'C', text: 'Ag⁺ + e⁻ → Ag' },
      { letter: 'D', text: 'Fe³⁺ + e⁻ → Fe²⁺' },
    ],
    correctAnswer: 'B',
    explanation: 'Oxidation is the loss of electrons (OIL RIG: Oxidation Is Loss). Zn → Zn²⁺ + 2e⁻ shows zinc losing 2 electrons, which is oxidation. All other options show species gaining electrons (reduction).',
    difficulty: 'Easy',
    domain: 'Chemical Reactions',
    skill: 'Oxidation-Reduction Reactions',
  },
  {
    id: 'ap-chem-4-004',
    question: 'A 5.00 g sample of a hydrate of copper(II) sulfate (CuSO₄·xH₂O) is heated until all water is removed. The anhydrous salt remaining has a mass of 3.20 g. What is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation: 'Mass of water lost = 5.00 - 3.20 = 1.80 g. Moles CuSO₄ = 3.20 g ÷ 159.6 g/mol = 0.0200 mol. Moles H₂O = 1.80 g ÷ 18.02 g/mol = 0.0999 mol ≈ 0.100 mol. Ratio = 0.100 / 0.0200 = 5. Therefore x = 5, giving CuSO₄·5H₂O.',
    difficulty: 'Hard',
    domain: 'Chemical Reactions',
    skill: 'Stoichiometry',
  },
  {
    id: 'ap-chem-4-005',
    question: 'Which type of reaction occurs when an acid reacts with a metal carbonate?',
    options: [
      { letter: 'A', text: 'Combustion' },
      { letter: 'B', text: 'Gas-evolution reaction producing CO₂' },
      { letter: 'C', text: 'Synthesis reaction' },
      { letter: 'D', text: 'Single replacement' },
    ],
    correctAnswer: 'B',
    explanation: 'When an acid reacts with a metal carbonate, it produces a salt, water, and carbon dioxide gas. For example: 2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂↑. This is classified as a gas-evolution reaction. The carbonic acid (H₂CO₃) intermediate decomposes to H₂O and CO₂.',
    difficulty: 'Easy',
    domain: 'Chemical Reactions',
    skill: 'Types of Chemical Reactions',
  },
];

// ─── UNIT 5: Kinetics ───
const unit5Questions: Question[] = [
  {
    id: 'ap-chem-5-001',
    question: 'For the reaction A → Products, the following data was collected:\n\n[A] = 0.100 M, Rate = 2.0 × 10⁻³ M/s\n[A] = 0.200 M, Rate = 8.0 × 10⁻³ M/s\n\nWhat is the order of the reaction with respect to A?',
    options: [
      { letter: 'A', text: 'Zero order' },
      { letter: 'B', text: 'First order' },
      { letter: 'C', text: 'Second order' },
      { letter: 'D', text: 'Third order' },
    ],
    correctAnswer: 'C',
    explanation: 'When [A] doubles (0.100 → 0.200), the rate quadruples (2.0 × 10⁻³ → 8.0 × 10⁻³). Since rate = k[A]ⁿ, and (2)ⁿ = 4, n = 2. The reaction is second order with respect to A. Rate = k[A]².',
    difficulty: 'Medium',
    domain: 'Kinetics',
    skill: 'Rate Laws and Reaction Order',
  },
  {
    id: 'ap-chem-5-002',
    question: 'A first-order reaction has a half-life of 20 minutes. What fraction of the reactant remains after 60 minutes?',
    options: [
      { letter: 'A', text: '1/4' },
      { letter: 'B', text: '1/6' },
      { letter: 'C', text: '1/8' },
      { letter: 'D', text: '1/3' },
    ],
    correctAnswer: 'C',
    explanation: '60 minutes = 3 half-lives (60 ÷ 20 = 3). After each half-life, half the reactant remains. After 3 half-lives: (1/2)³ = 1/8 of the original amount remains.',
    difficulty: 'Easy',
    domain: 'Kinetics',
    skill: 'Half-Life',
  },
  {
    id: 'ap-chem-5-003',
    question: 'A proposed mechanism for the reaction 2NO₂ + F₂ → 2NO₂F is:\nStep 1: NO₂ + F₂ → NO₂F + F (slow)\nStep 2: NO₂ + F → NO₂F (fast)\n\nWhat is the rate law predicted by this mechanism?',
    options: [
      { letter: 'A', text: 'Rate = k[NO₂]²[F₂]' },
      { letter: 'B', text: 'Rate = k[NO₂][F₂]' },
      { letter: 'C', text: 'Rate = k[NO₂][F]' },
      { letter: 'D', text: 'Rate = k[F₂]' },
    ],
    correctAnswer: 'B',
    explanation: 'The rate-determining step (slow step) determines the rate law. Step 1 involves one molecule of NO₂ and one molecule of F₂, so the rate law is Rate = k[NO₂][F₂]. The rate law only includes reactants from the slow step (when it is the first step).',
    difficulty: 'Medium',
    domain: 'Kinetics',
    skill: 'Reaction Mechanisms',
  },
  {
    id: 'ap-chem-5-004',
    question: 'Which of the following best explains why increasing temperature increases the rate of a chemical reaction?',
    options: [
      { letter: 'A', text: 'The activation energy of the reaction decreases' },
      { letter: 'B', text: 'A greater fraction of molecules have kinetic energy equal to or greater than the activation energy' },
      { letter: 'C', text: 'The enthalpy of the reaction becomes more negative' },
      { letter: 'D', text: 'The equilibrium shifts to favor products' },
    ],
    correctAnswer: 'B',
    explanation: 'At higher temperatures, the Maxwell-Boltzmann distribution shifts so that more molecules have sufficient kinetic energy to overcome the activation energy barrier. This results in more effective collisions per unit time. The activation energy itself does not change with temperature.',
    difficulty: 'Medium',
    domain: 'Kinetics',
    skill: 'Activation Energy and Temperature',
  },
  {
    id: 'ap-chem-5-005',
    question: 'A catalyst increases the rate of a reaction by:',
    options: [
      { letter: 'A', text: 'Increasing the activation energy' },
      { letter: 'B', text: 'Providing an alternate reaction pathway with a lower activation energy' },
      { letter: 'C', text: 'Increasing the enthalpy change of the reaction' },
      { letter: 'D', text: 'Shifting the equilibrium toward products' },
    ],
    correctAnswer: 'B',
    explanation: 'A catalyst provides an alternative reaction pathway (mechanism) with a lower activation energy. This allows more molecules to have sufficient energy to react, increasing the rate. Importantly, a catalyst does not change the overall thermodynamics (ΔH or ΔG) or the equilibrium position—it only speeds up the rate at which equilibrium is reached.',
    difficulty: 'Easy',
    domain: 'Kinetics',
    skill: 'Catalysis',
  },
];

// ─── UNIT 6: Thermodynamics ───
const unit6Questions: Question[] = [
  {
    id: 'ap-chem-6-001',
    question: 'When 50.0 mL of 1.0 M HCl is mixed with 50.0 mL of 1.0 M NaOH in a calorimeter, the temperature rises by 6.8°C. Assuming the density of the solution is 1.0 g/mL and the specific heat is 4.18 J/(g·°C), what is the enthalpy of neutralization per mole of water formed?',
    options: [
      { letter: 'A', text: '-28.4 kJ/mol' },
      { letter: 'B', text: '-56.8 kJ/mol' },
      { letter: 'C', text: '-2.84 kJ/mol' },
      { letter: 'D', text: '-5.68 kJ/mol' },
    ],
    correctAnswer: 'B',
    explanation: 'q = mcΔT = (100.0 g)(4.18 J/g·°C)(6.8°C) = 2842 J = 2.84 kJ. Moles of water formed = 0.050 L × 1.0 mol/L = 0.050 mol. ΔH = -q/n = -2.84 kJ / 0.050 mol = -56.8 kJ/mol. The negative sign indicates an exothermic reaction.',
    difficulty: 'Hard',
    domain: 'Thermodynamics',
    skill: 'Calorimetry',
  },
  {
    id: 'ap-chem-6-002',
    question: 'Using Hess\'s law, calculate ΔH for the reaction:\nC(s) + ½O₂(g) → CO(g)\n\nGiven:\nC(s) + O₂(g) → CO₂(g), ΔH = -393.5 kJ\nCO(g) + ½O₂(g) → CO₂(g), ΔH = -283.0 kJ',
    options: [
      { letter: 'A', text: '-110.5 kJ' },
      { letter: 'B', text: '-676.5 kJ' },
      { letter: 'C', text: '+110.5 kJ' },
      { letter: 'D', text: '+283.0 kJ' },
    ],
    correctAnswer: 'A',
    explanation: 'Using Hess\'s law: Reverse the second equation (CO₂ → CO + ½O₂, ΔH = +283.0 kJ) and add it to the first equation. ΔH = -393.5 + 283.0 = -110.5 kJ. This is the enthalpy of formation of carbon monoxide.',
    difficulty: 'Medium',
    domain: 'Thermodynamics',
    skill: 'Hess\'s Law',
  },
  {
    id: 'ap-chem-6-003',
    question: 'The bond enthalpies for H–H, Cl–Cl, and H–Cl are 436, 243, and 431 kJ/mol respectively. What is the estimated ΔH for the reaction H₂(g) + Cl₂(g) → 2HCl(g)?',
    options: [
      { letter: 'A', text: '-183 kJ' },
      { letter: 'B', text: '+183 kJ' },
      { letter: 'C', text: '-248 kJ' },
      { letter: 'D', text: '-862 kJ' },
    ],
    correctAnswer: 'A',
    explanation: 'ΔH = Σ(bonds broken) - Σ(bonds formed). Bonds broken: 1 H–H (436) + 1 Cl–Cl (243) = 679 kJ. Bonds formed: 2 H–Cl (2 × 431) = 862 kJ. ΔH = 679 - 862 = -183 kJ. The negative value indicates the reaction is exothermic.',
    difficulty: 'Medium',
    domain: 'Thermodynamics',
    skill: 'Bond Enthalpies',
  },
  {
    id: 'ap-chem-6-004',
    question: 'An endothermic reaction is spontaneous at high temperatures. What are the signs of ΔH and ΔS for this reaction?',
    options: [
      { letter: 'A', text: 'ΔH > 0, ΔS > 0' },
      { letter: 'B', text: 'ΔH > 0, ΔS < 0' },
      { letter: 'C', text: 'ΔH < 0, ΔS > 0' },
      { letter: 'D', text: 'ΔH < 0, ΔS < 0' },
    ],
    correctAnswer: 'A',
    explanation: 'For a spontaneous reaction, ΔG = ΔH - TΔS < 0. Endothermic means ΔH > 0. For the reaction to be spontaneous at high T, TΔS must exceed ΔH, which requires ΔS > 0. At high T, the TΔS term dominates, making ΔG negative.',
    difficulty: 'Medium',
    domain: 'Thermodynamics',
    skill: 'Gibbs Free Energy and Spontaneity',
  },
  {
    id: 'ap-chem-6-005',
    question: 'For the reaction N₂(g) + 3H₂(g) → 2NH₃(g), ΔH°f for NH₃ is -45.9 kJ/mol. What is ΔH° for the reaction?',
    options: [
      { letter: 'A', text: '-45.9 kJ' },
      { letter: 'B', text: '-91.8 kJ' },
      { letter: 'C', text: '+91.8 kJ' },
      { letter: 'D', text: '-137.7 kJ' },
    ],
    correctAnswer: 'B',
    explanation: 'ΔH°rxn = Σ(ΔH°f products) - Σ(ΔH°f reactants). Since N₂ and H₂ are elements in their standard states, ΔH°f = 0. ΔH°rxn = 2(-45.9) - 0 = -91.8 kJ.',
    difficulty: 'Easy',
    domain: 'Thermodynamics',
    skill: 'Enthalpy of Formation',
  },
];

// ─── UNIT 7: Equilibrium ───
const unit7Questions: Question[] = [
  {
    id: 'ap-chem-7-001',
    question: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what is the expression for the equilibrium constant Kc?',
    options: [
      { letter: 'A', text: 'Kc = [NH₃]² / ([N₂][H₂]³)' },
      { letter: 'B', text: 'Kc = [N₂][H₂]³ / [NH₃]²' },
      { letter: 'C', text: 'Kc = [NH₃] / ([N₂][H₂])' },
      { letter: 'D', text: 'Kc = 2[NH₃] / ([N₂] + 3[H₂])' },
    ],
    correctAnswer: 'A',
    explanation: 'The equilibrium constant expression is Kc = [products]^coefficients / [reactants]^coefficients. For this reaction: Kc = [NH₃]² / ([N₂]¹[H₂]³). Concentrations are raised to the power of their stoichiometric coefficients.',
    difficulty: 'Easy',
    domain: 'Equilibrium',
    skill: 'Equilibrium Constants',
  },
  {
    id: 'ap-chem-7-002',
    question: 'For the equilibrium PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), which change will shift the equilibrium to the right?',
    options: [
      { letter: 'A', text: 'Adding more PCl₃' },
      { letter: 'B', text: 'Decreasing the volume of the container' },
      { letter: 'C', text: 'Removing Cl₂ from the system' },
      { letter: 'D', text: 'Adding a catalyst' },
    ],
    correctAnswer: 'C',
    explanation: 'By Le Chatelier\'s principle, removing a product (Cl₂) shifts the equilibrium to the right to replace it. Adding PCl₃ would shift left. Decreasing volume favors fewer moles of gas (left, since 1 mol → 2 mol). A catalyst does not shift equilibrium.',
    difficulty: 'Medium',
    domain: 'Equilibrium',
    skill: 'Le Chatelier\'s Principle',
  },
  {
    id: 'ap-chem-7-003',
    question: 'At a certain temperature, Ksp for AgCl is 1.8 × 10⁻¹⁰. What is the molar solubility of AgCl in pure water?',
    options: [
      { letter: 'A', text: '1.3 × 10⁻⁵ M' },
      { letter: 'B', text: '1.8 × 10⁻¹⁰ M' },
      { letter: 'C', text: '9.0 × 10⁻⁶ M' },
      { letter: 'D', text: '3.2 × 10⁻²⁰ M' },
    ],
    correctAnswer: 'A',
    explanation: 'AgCl → Ag⁺ + Cl⁻. If solubility = s, then [Ag⁺] = s and [Cl⁻] = s. Ksp = s × s = s². s = √(1.8 × 10⁻¹⁰) = 1.34 × 10⁻⁵ M.',
    difficulty: 'Medium',
    domain: 'Equilibrium',
    skill: 'Solubility Equilibria',
  },
  {
    id: 'ap-chem-7-004',
    question: 'Initially, a container holds 0.100 mol/L of N₂O₄. At equilibrium, [NO₂] = 0.040 M for the reaction N₂O₄(g) ⇌ 2NO₂(g). What is Kc?',
    options: [
      { letter: 'A', text: '0.020' },
      { letter: 'B', text: '0.016' },
      { letter: 'C', text: '0.040' },
      { letter: 'D', text: '0.080' },
    ],
    correctAnswer: 'A',
    explanation: 'Using an ICE table: N₂O₄ starts at 0.100 M and changes by -x; NO₂ starts at 0 and changes by +2x. Since [NO₂] = 0.040 M, 2x = 0.040, so x = 0.020. [N₂O₄] = 0.100 - 0.020 = 0.080 M. Kc = [NO₂]² / [N₂O₄] = (0.040)² / 0.080 = 0.0016/0.080 = 0.020.',
    difficulty: 'Hard',
    domain: 'Equilibrium',
    skill: 'ICE Tables',
  },
  {
    id: 'ap-chem-7-005',
    question: 'If Q > K for a reaction at equilibrium, which direction will the reaction shift?',
    options: [
      { letter: 'A', text: 'Toward products (right)' },
      { letter: 'B', text: 'Toward reactants (left)' },
      { letter: 'C', text: 'No shift; the system is at equilibrium' },
      { letter: 'D', text: 'It depends on the temperature' },
    ],
    correctAnswer: 'B',
    explanation: 'When Q > K, there are more products relative to the equilibrium position. The reaction shifts to the left (toward reactants) to decrease Q until Q = K. When Q < K, the reaction shifts right. When Q = K, the system is at equilibrium.',
    difficulty: 'Easy',
    domain: 'Equilibrium',
    skill: 'Reaction Quotient',
  },
];

// ─── UNIT 8: Acids and Bases ───
const unit8Questions: Question[] = [
  {
    id: 'ap-chem-8-001',
    question: 'What is the pH of a 0.010 M HCl solution?',
    options: [
      { letter: 'A', text: '1.0' },
      { letter: 'B', text: '2.0' },
      { letter: 'C', text: '3.0' },
      { letter: 'D', text: '12.0' },
    ],
    correctAnswer: 'B',
    explanation: 'HCl is a strong acid that completely dissociates: HCl → H⁺ + Cl⁻. [H⁺] = 0.010 M = 1.0 × 10⁻² M. pH = -log[H⁺] = -log(1.0 × 10⁻²) = 2.0.',
    difficulty: 'Easy',
    domain: 'Acids and Bases',
    skill: 'pH Calculations',
  },
  {
    id: 'ap-chem-8-002',
    question: 'Acetic acid (CH₃COOH) has Ka = 1.8 × 10⁻⁵. What is the pH of a 0.10 M acetic acid solution?',
    options: [
      { letter: 'A', text: '1.00' },
      { letter: 'B', text: '2.87' },
      { letter: 'C', text: '4.74' },
      { letter: 'D', text: '5.00' },
    ],
    correctAnswer: 'B',
    explanation: 'For weak acid: Ka = x²/(0.10 - x) ≈ x²/0.10. x² = 1.8 × 10⁻⁶. x = [H⁺] = 1.34 × 10⁻³ M. pH = -log(1.34 × 10⁻³) = 2.87. The approximation is valid since x << 0.10.',
    difficulty: 'Medium',
    domain: 'Acids and Bases',
    skill: 'Weak Acid Equilibrium',
  },
  {
    id: 'ap-chem-8-003',
    question: 'A buffer solution is prepared using 0.20 M CH₃COOH and 0.20 M CH₃COONa. Ka for acetic acid is 1.8 × 10⁻⁵. What is the pH of this buffer?',
    options: [
      { letter: 'A', text: '2.87' },
      { letter: 'B', text: '4.74' },
      { letter: 'C', text: '7.00' },
      { letter: 'D', text: '9.26' },
    ],
    correctAnswer: 'B',
    explanation: 'Using the Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA]). pKa = -log(1.8 × 10⁻⁵) = 4.74. Since [CH₃COO⁻] = [CH₃COOH] = 0.20 M, log(0.20/0.20) = log(1) = 0. pH = 4.74 + 0 = 4.74.',
    difficulty: 'Medium',
    domain: 'Acids and Bases',
    skill: 'Buffer Solutions',
  },
  {
    id: 'ap-chem-8-004',
    question: 'During a titration of 25.0 mL of 0.10 M HCl with 0.10 M NaOH, what is the pH at the equivalence point?',
    options: [
      { letter: 'A', text: '4.74' },
      { letter: 'B', text: '7.00' },
      { letter: 'C', text: '9.26' },
      { letter: 'D', text: '13.00' },
    ],
    correctAnswer: 'B',
    explanation: 'At the equivalence point of a strong acid-strong base titration, all HCl has reacted with NaOH to form NaCl and water. NaCl is a neutral salt (Na⁺ and Cl⁻ are spectator ions that don\'t hydrolyze). The solution contains only water, so pH = 7.00.',
    difficulty: 'Easy',
    domain: 'Acids and Bases',
    skill: 'Titrations',
  },
  {
    id: 'ap-chem-8-005',
    question: 'Which of the following 0.10 M solutions has the lowest pH?',
    options: [
      { letter: 'A', text: 'NaCl' },
      { letter: 'B', text: 'NH₄Cl' },
      { letter: 'C', text: 'Na₂CO₃' },
      { letter: 'D', text: 'NaCH₃COO' },
    ],
    correctAnswer: 'B',
    explanation: 'NH₄Cl dissociates to give NH₄⁺ (a weak acid, conjugate of weak base NH₃) and Cl⁻ (spectator). NH₄⁺ hydrolyzes: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺, producing an acidic solution (pH < 7). NaCl is neutral (pH = 7). Na₂CO₃ and NaCH₃COO are basic (pH > 7). Therefore NH₄Cl has the lowest pH.',
    difficulty: 'Medium',
    domain: 'Acids and Bases',
    skill: 'Salt Hydrolysis',
  },
];

// ─── UNIT 9: Applications of Thermodynamics ───
const unit9Questions: Question[] = [
  {
    id: 'ap-chem-9-001',
    question: 'For the reaction 2H₂(g) + O₂(g) → 2H₂O(l), predict the sign of ΔS°.',
    options: [
      { letter: 'A', text: 'Positive (ΔS° > 0)' },
      { letter: 'B', text: 'Negative (ΔS° < 0)' },
      { letter: 'C', text: 'Zero' },
      { letter: 'D', text: 'Cannot be determined' },
    ],
    correctAnswer: 'B',
    explanation: 'ΔS° is negative because the reaction goes from 3 moles of gas (2H₂ + O₂) to 2 moles of liquid (2H₂O). Gases have much higher entropy than liquids, and the total number of moles decreases. Both factors lead to a decrease in entropy.',
    difficulty: 'Easy',
    domain: 'Applications of Thermodynamics',
    skill: 'Entropy',
  },
  {
    id: 'ap-chem-9-002',
    question: 'Calculate ΔG° for a reaction at 298 K given ΔH° = -100 kJ and ΔS° = -200 J/K.',
    options: [
      { letter: 'A', text: '-40.4 kJ' },
      { letter: 'B', text: '-159.6 kJ' },
      { letter: 'C', text: '+40.4 kJ' },
      { letter: 'D', text: '-300 kJ' },
    ],
    correctAnswer: 'A',
    explanation: 'ΔG° = ΔH° - TΔS° = -100 kJ - (298 K)(-0.200 kJ/K) = -100 + 59.6 = -40.4 kJ. Note: ΔS° must be converted to kJ/K (-200 J/K = -0.200 kJ/K) to match units with ΔH°.',
    difficulty: 'Medium',
    domain: 'Applications of Thermodynamics',
    skill: 'Gibbs Free Energy',
  },
  {
    id: 'ap-chem-9-003',
    question: 'In a galvanic cell, Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s). Given E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V, what is E°cell?',
    options: [
      { letter: 'A', text: '+0.42 V' },
      { letter: 'B', text: '+1.10 V' },
      { letter: 'C', text: '-0.42 V' },
      { letter: 'D', text: '-1.10 V' },
    ],
    correctAnswer: 'B',
    explanation: 'E°cell = E°cathode - E°anode. Cu²⁺ is reduced (cathode, E° = +0.34 V) and Zn is oxidized (anode, E° = -0.76 V). E°cell = 0.34 - (-0.76) = +1.10 V. A positive E°cell indicates a spontaneous reaction.',
    difficulty: 'Medium',
    domain: 'Applications of Thermodynamics',
    skill: 'Electrochemistry',
  },
  {
    id: 'ap-chem-9-004',
    question: 'During the electrolysis of aqueous NaCl, what is produced at the anode?',
    options: [
      { letter: 'A', text: 'Na(s)' },
      { letter: 'B', text: 'H₂(g)' },
      { letter: 'C', text: 'Cl₂(g)' },
      { letter: 'D', text: 'O₂(g)' },
    ],
    correctAnswer: 'C',
    explanation: 'At the anode (oxidation occurs), Cl⁻ ions are oxidized to Cl₂ gas: 2Cl⁻ → Cl₂ + 2e⁻. At the cathode, water is reduced to H₂ gas (not Na, because the reduction potential for water is more favorable than Na⁺ in aqueous solution).',
    difficulty: 'Medium',
    domain: 'Applications of Thermodynamics',
    skill: 'Electrolytic Cells',
  },
  {
    id: 'ap-chem-9-005',
    question: 'For the relationship ΔG° = -nFE°, if E°cell = +1.10 V and n = 2 (using F = 96485 C/mol), what is ΔG°?',
    options: [
      { letter: 'A', text: '-212 kJ' },
      { letter: 'B', text: '+212 kJ' },
      { letter: 'C', text: '-106 kJ' },
      { letter: 'D', text: '-96.5 kJ' },
    ],
    correctAnswer: 'A',
    explanation: 'ΔG° = -nFE° = -(2)(96485 C/mol)(1.10 V) = -212,267 J = -212 kJ. The negative ΔG° confirms the reaction is spontaneous, consistent with the positive E°cell.',
    difficulty: 'Hard',
    domain: 'Applications of Thermodynamics',
    skill: 'Relating ΔG° and E°cell',
  },
];

// ─── Exports ───
export const apChemQuestionsByUnit: Record<string, Question[]> = {
  'unit-1': unit1Questions,
  'unit-2': unit2Questions,
  'unit-3': unit3Questions,
  'unit-4': unit4Questions,
  'unit-5': unit5Questions,
  'unit-6': unit6Questions,
  'unit-7': unit7Questions,
  'unit-8': unit8Questions,
  'unit-9': unit9Questions,
};

export const allAPChemQuestions: Question[] = [
  ...unit1Questions,
  ...unit2Questions,
  ...unit3Questions,
  ...unit4Questions,
  ...unit5Questions,
  ...unit6Questions,
  ...unit7Questions,
  ...unit8Questions,
  ...unit9Questions,
];
