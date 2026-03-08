// Anatomy Atlas Data - Musculoskeletal System
// All content is original to avoid IP concerns

export interface AnatomyStructure {
  id: string;
  name: string;
  aliases: string[]; // acceptable alternate answers
  category: "muscle" | "bone" | "joint";
  system: string;
  region: string;
  description: string;
  function?: string;
  // SVG hotspot coordinates (percentage-based for responsive)
  hotspot: { x: number; y: number; width: number; height: number };
  difficulty: "easy" | "medium" | "hard";
}

export interface AnatomyDiagram {
  id: string;
  title: string;
  description: string;
  view: "anterior" | "posterior" | "lateral";
  system: "muscular" | "skeletal";
  structures: AnatomyStructure[];
}

export const ANATOMY_DIAGRAMS: AnatomyDiagram[] = [
  {
    id: "anterior_muscles",
    title: "Anterior Muscles",
    description: "Major muscles visible from the front of the body",
    view: "anterior",
    system: "muscular",
    structures: [
      {
        id: "m_frontalis",
        name: "Frontalis",
        aliases: ["frontalis muscle", "frontal belly"],
        category: "muscle",
        system: "muscular",
        region: "head",
        description: "Flat muscle of the forehead",
        function: "Raises eyebrows, wrinkles forehead",
        hotspot: { x: 46, y: 3, width: 8, height: 3 },
        difficulty: "medium",
      },
      {
        id: "m_sternocleidomastoid",
        name: "Sternocleidomastoid",
        aliases: ["SCM", "sternocleidomastoid muscle"],
        category: "muscle",
        system: "muscular",
        region: "neck",
        description: "Large muscle on each side of the neck",
        function: "Rotates and flexes the head",
        hotspot: { x: 43, y: 9, width: 5, height: 4 },
        difficulty: "medium",
      },
      {
        id: "m_trapezius",
        name: "Trapezius",
        aliases: ["trap", "traps", "trapezius muscle"],
        category: "muscle",
        system: "muscular",
        region: "shoulder",
        description: "Large triangular muscle of the upper back and neck",
        function: "Stabilizes and moves the scapula",
        hotspot: { x: 38, y: 10, width: 5, height: 5 },
        difficulty: "easy",
      },
      {
        id: "m_deltoid",
        name: "Deltoid",
        aliases: ["delt", "delts", "deltoid muscle"],
        category: "muscle",
        system: "muscular",
        region: "shoulder",
        description: "Triangular muscle covering the shoulder joint",
        function: "Abducts, flexes, and extends the arm",
        hotspot: { x: 32, y: 14, width: 7, height: 6 },
        difficulty: "easy",
      },
      {
        id: "m_pectoralis_major",
        name: "Pectoralis Major",
        aliases: ["pec", "pecs", "pectoralis", "chest muscle"],
        category: "muscle",
        system: "muscular",
        region: "chest",
        description: "Large fan-shaped muscle of the chest",
        function: "Flexes, adducts, and medially rotates the arm",
        hotspot: { x: 40, y: 16, width: 10, height: 7 },
        difficulty: "easy",
      },
      {
        id: "m_biceps_brachii",
        name: "Biceps Brachii",
        aliases: ["biceps", "bicep"],
        category: "muscle",
        system: "muscular",
        region: "arm",
        description: "Two-headed muscle on the front of the upper arm",
        function: "Flexes the elbow, supinates the forearm",
        hotspot: { x: 30, y: 22, width: 5, height: 7 },
        difficulty: "easy",
      },
      {
        id: "m_brachioradialis",
        name: "Brachioradialis",
        aliases: ["brachioradialis muscle"],
        category: "muscle",
        system: "muscular",
        region: "forearm",
        description: "Muscle of the lateral forearm",
        function: "Flexes the forearm at the elbow",
        hotspot: { x: 28, y: 30, width: 4, height: 6 },
        difficulty: "hard",
      },
      {
        id: "m_rectus_abdominis",
        name: "Rectus Abdominis",
        aliases: ["abs", "six pack", "rectus abdominis muscle"],
        category: "muscle",
        system: "muscular",
        region: "abdomen",
        description: "Long flat muscle running vertically along the abdomen",
        function: "Flexes the trunk, compresses abdominal contents",
        hotspot: { x: 45, y: 25, width: 8, height: 10 },
        difficulty: "easy",
      },
      {
        id: "m_external_oblique",
        name: "External Oblique",
        aliases: ["obliques", "external oblique muscle"],
        category: "muscle",
        system: "muscular",
        region: "abdomen",
        description: "Broad muscle on the lateral abdomen",
        function: "Rotates and laterally flexes the trunk",
        hotspot: { x: 37, y: 26, width: 6, height: 8 },
        difficulty: "medium",
      },
      {
        id: "m_quadriceps",
        name: "Quadriceps Femoris",
        aliases: ["quads", "quadriceps", "quad"],
        category: "muscle",
        system: "muscular",
        region: "thigh",
        description: "Group of four muscles on the front of the thigh",
        function: "Extends the knee",
        hotspot: { x: 39, y: 42, width: 8, height: 14 },
        difficulty: "easy",
      },
      {
        id: "m_rectus_femoris",
        name: "Rectus Femoris",
        aliases: ["rectus femoris muscle"],
        category: "muscle",
        system: "muscular",
        region: "thigh",
        description: "Central muscle of the quadriceps group",
        function: "Extends the knee and flexes the hip",
        hotspot: { x: 42, y: 44, width: 5, height: 10 },
        difficulty: "medium",
      },
      {
        id: "m_sartorius",
        name: "Sartorius",
        aliases: ["sartorius muscle", "tailor's muscle"],
        category: "muscle",
        system: "muscular",
        region: "thigh",
        description: "Longest muscle in the body, crossing the thigh diagonally",
        function: "Flexes, abducts, and laterally rotates the thigh",
        hotspot: { x: 44, y: 40, width: 4, height: 15 },
        difficulty: "medium",
      },
      {
        id: "m_adductors",
        name: "Adductor Group",
        aliases: ["adductors", "inner thigh", "adductor muscles"],
        category: "muscle",
        system: "muscular",
        region: "thigh",
        description: "Group of muscles on the medial thigh",
        function: "Adducts the thigh",
        hotspot: { x: 46, y: 45, width: 5, height: 10 },
        difficulty: "medium",
      },
      {
        id: "m_tibialis_anterior",
        name: "Tibialis Anterior",
        aliases: ["tibialis anterior muscle", "shin muscle"],
        category: "muscle",
        system: "muscular",
        region: "leg",
        description: "Muscle on the lateral side of the tibia",
        function: "Dorsiflexes and inverts the foot",
        hotspot: { x: 42, y: 60, width: 4, height: 10 },
        difficulty: "medium",
      },
      {
        id: "m_gastrocnemius",
        name: "Gastrocnemius",
        aliases: ["gastroc", "calf muscle", "gastrocnemius muscle"],
        category: "muscle",
        system: "muscular",
        region: "leg",
        description: "Superficial calf muscle with two heads",
        function: "Plantarflexes the foot, flexes the knee",
        hotspot: { x: 55, y: 60, width: 5, height: 10 },
        difficulty: "medium",
      },
      {
        id: "m_serratus_anterior",
        name: "Serratus Anterior",
        aliases: ["serratus", "boxer's muscle"],
        category: "muscle",
        system: "muscular",
        region: "chest",
        description: "Saw-toothed muscle along the lateral rib cage",
        function: "Protracts and stabilizes the scapula",
        hotspot: { x: 35, y: 22, width: 4, height: 5 },
        difficulty: "hard",
      },
    ],
  },
  {
    id: "anterior_skeleton",
    title: "Anterior Skeleton",
    description: "Major bones visible from the front of the body",
    view: "anterior",
    system: "skeletal",
    structures: [
      {
        id: "b_frontal",
        name: "Frontal Bone",
        aliases: ["frontal", "forehead bone"],
        category: "bone",
        system: "skeletal",
        region: "head",
        description: "Bone of the forehead",
        hotspot: { x: 46, y: 2, width: 8, height: 4 },
        difficulty: "easy",
      },
      {
        id: "b_mandible",
        name: "Mandible",
        aliases: ["jaw", "jawbone", "lower jaw"],
        category: "bone",
        system: "skeletal",
        region: "head",
        description: "Lower jaw bone, the largest facial bone",
        hotspot: { x: 46, y: 7, width: 7, height: 3 },
        difficulty: "easy",
      },
      {
        id: "b_clavicle",
        name: "Clavicle",
        aliases: ["collarbone", "collar bone"],
        category: "bone",
        system: "skeletal",
        region: "shoulder",
        description: "S-shaped bone connecting sternum to scapula",
        hotspot: { x: 38, y: 12, width: 12, height: 2 },
        difficulty: "easy",
      },
      {
        id: "b_sternum",
        name: "Sternum",
        aliases: ["breastbone", "breast bone"],
        category: "bone",
        system: "skeletal",
        region: "chest",
        description: "Flat bone in the center of the chest",
        hotspot: { x: 47, y: 15, width: 4, height: 8 },
        difficulty: "easy",
      },
      {
        id: "b_ribs",
        name: "Ribs",
        aliases: ["rib cage", "ribcage", "costal bones"],
        category: "bone",
        system: "skeletal",
        region: "chest",
        description: "12 pairs of curved bones forming the thoracic cage",
        hotspot: { x: 39, y: 16, width: 10, height: 10 },
        difficulty: "easy",
      },
      {
        id: "b_humerus",
        name: "Humerus",
        aliases: ["upper arm bone"],
        category: "bone",
        system: "skeletal",
        region: "arm",
        description: "Long bone of the upper arm",
        hotspot: { x: 32, y: 18, width: 4, height: 10 },
        difficulty: "easy",
      },
      {
        id: "b_radius",
        name: "Radius",
        aliases: ["radial bone"],
        category: "bone",
        system: "skeletal",
        region: "forearm",
        description: "Lateral bone of the forearm (thumb side)",
        hotspot: { x: 30, y: 30, width: 3, height: 8 },
        difficulty: "medium",
      },
      {
        id: "b_ulna",
        name: "Ulna",
        aliases: ["ulnar bone"],
        category: "bone",
        system: "skeletal",
        region: "forearm",
        description: "Medial bone of the forearm (pinky side)",
        hotspot: { x: 33, y: 30, width: 3, height: 8 },
        difficulty: "medium",
      },
      {
        id: "b_pelvis",
        name: "Pelvis",
        aliases: ["hip bone", "pelvic bone", "os coxa", "innominate"],
        category: "bone",
        system: "skeletal",
        region: "hip",
        description: "Basin-shaped structure supporting the spine",
        hotspot: { x: 40, y: 34, width: 12, height: 8 },
        difficulty: "easy",
      },
      {
        id: "b_femur",
        name: "Femur",
        aliases: ["thigh bone", "thighbone"],
        category: "bone",
        system: "skeletal",
        region: "thigh",
        description: "Longest and strongest bone in the body",
        hotspot: { x: 41, y: 42, width: 5, height: 14 },
        difficulty: "easy",
      },
      {
        id: "b_patella",
        name: "Patella",
        aliases: ["kneecap", "knee cap"],
        category: "bone",
        system: "skeletal",
        region: "knee",
        description: "Sesamoid bone embedded in the quadriceps tendon",
        hotspot: { x: 42, y: 56, width: 4, height: 3 },
        difficulty: "easy",
      },
      {
        id: "b_tibia",
        name: "Tibia",
        aliases: ["shinbone", "shin bone"],
        category: "bone",
        system: "skeletal",
        region: "leg",
        description: "Larger medial bone of the lower leg",
        hotspot: { x: 42, y: 60, width: 4, height: 12 },
        difficulty: "easy",
      },
      {
        id: "b_fibula",
        name: "Fibula",
        aliases: ["calf bone"],
        category: "bone",
        system: "skeletal",
        region: "leg",
        description: "Thinner lateral bone of the lower leg",
        hotspot: { x: 46, y: 60, width: 3, height: 12 },
        difficulty: "medium",
      },
      {
        id: "b_scapula",
        name: "Scapula",
        aliases: ["shoulder blade", "shoulderblade"],
        category: "bone",
        system: "skeletal",
        region: "shoulder",
        description: "Flat triangular bone on the posterior thorax",
        hotspot: { x: 35, y: 14, width: 5, height: 6 },
        difficulty: "easy",
      },
      {
        id: "b_vertebral_column",
        name: "Vertebral Column",
        aliases: ["spine", "spinal column", "backbone"],
        category: "bone",
        system: "skeletal",
        region: "trunk",
        description: "Series of 33 vertebrae forming the axial support",
        hotspot: { x: 48, y: 12, width: 3, height: 22 },
        difficulty: "easy",
      },
    ],
  },
];

// Quiz modes
export type AtlasQuizMode = "identify" | "drag_drop";

// Grading helper - check if answer matches structure
export function checkAnatomyAnswer(
  userAnswer: string,
  structure: AnatomyStructure
): { correct: boolean; closestMatch?: string } {
  const normalized = userAnswer.trim().toLowerCase();
  const correctName = structure.name.toLowerCase();
  
  // Exact match
  if (normalized === correctName) return { correct: true };
  
  // Alias match
  for (const alias of structure.aliases) {
    if (normalized === alias.toLowerCase()) return { correct: true };
  }
  
  // Fuzzy match - allow minor typos (Levenshtein distance ≤ 2 for short names, ≤ 3 for long)
  const threshold = correctName.length > 10 ? 3 : 2;
  if (levenshtein(normalized, correctName) <= threshold) {
    return { correct: true, closestMatch: structure.name };
  }
  
  for (const alias of structure.aliases) {
    if (levenshtein(normalized, alias.toLowerCase()) <= threshold) {
      return { correct: true, closestMatch: alias };
    }
  }
  
  return { correct: false };
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}
