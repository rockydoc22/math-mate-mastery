import { SATFact } from "./satFacts";

/**
 * Ultra-short instant-recall facts.
 * Every question should be answerable in under 3 seconds by a prepared student.
 */
export const rapidFireFacts: SATFact[] = [
  // ══════════════════════════════════════════
  // QUICK NUMBER FACTS — perfect squares, cubes, roots
  // ══════════════════════════════════════════
  { id: "rf1", category: "math", exam: ["sat", "psat", "act"], question: "√144 = ?", correctAnswer: "12", wrongAnswers: ["11", "13", "14"] },
  { id: "rf2", category: "math", exam: ["sat", "psat", "act"], question: "√169 = ?", correctAnswer: "13", wrongAnswers: ["12", "14", "11"] },
  { id: "rf3", category: "math", exam: ["sat", "psat", "act"], question: "√196 = ?", correctAnswer: "14", wrongAnswers: ["13", "15", "12"] },
  { id: "rf4", category: "math", exam: ["sat", "psat", "act"], question: "√225 = ?", correctAnswer: "15", wrongAnswers: ["14", "16", "13"] },
  { id: "rf5", category: "math", exam: ["sat", "psat", "act"], question: "√256 = ?", correctAnswer: "16", wrongAnswers: ["15", "17", "14"] },
  { id: "rf6", category: "math", exam: ["sat", "psat", "act"], question: "13² = ?", correctAnswer: "169", wrongAnswers: ["144", "156", "196"] },
  { id: "rf7", category: "math", exam: ["sat", "psat", "act"], question: "15² = ?", correctAnswer: "225", wrongAnswers: ["215", "250", "196"] },
  { id: "rf8", category: "math", exam: ["sat", "psat", "act"], question: "20² = ?", correctAnswer: "400", wrongAnswers: ["200", "300", "500"] },
  { id: "rf9", category: "math", exam: ["sat", "psat", "act"], question: "25² = ?", correctAnswer: "625", wrongAnswers: ["525", "500", "650"] },
  { id: "rf10", category: "math", exam: ["sat", "psat", "act"], question: "2⁵ = ?", correctAnswer: "32", wrongAnswers: ["16", "64", "24"] },
  { id: "rf11", category: "math", exam: ["sat", "psat", "act"], question: "2⁶ = ?", correctAnswer: "64", wrongAnswers: ["32", "128", "48"] },
  { id: "rf12", category: "math", exam: ["sat", "psat", "act"], question: "2⁸ = ?", correctAnswer: "256", wrongAnswers: ["128", "512", "64"] },
  { id: "rf13", category: "math", exam: ["sat", "psat", "act"], question: "2¹⁰ = ?", correctAnswer: "1024", wrongAnswers: ["512", "2048", "1000"] },
  { id: "rf14", category: "math", exam: ["sat", "psat", "act"], question: "3³ = ?", correctAnswer: "27", wrongAnswers: ["9", "81", "24"] },
  { id: "rf15", category: "math", exam: ["sat", "psat", "act"], question: "4³ = ?", correctAnswer: "64", wrongAnswers: ["48", "16", "81"] },
  { id: "rf16", category: "math", exam: ["sat", "psat", "act"], question: "5³ = ?", correctAnswer: "125", wrongAnswers: ["150", "75", "100"] },
  { id: "rf17", category: "math", exam: ["sat", "psat", "act"], question: "∛27 = ?", correctAnswer: "3", wrongAnswers: ["9", "4", "2"] },
  { id: "rf18", category: "math", exam: ["sat", "psat", "act"], question: "∛64 = ?", correctAnswer: "4", wrongAnswers: ["8", "3", "6"] },
  { id: "rf19", category: "math", exam: ["sat", "psat", "act"], question: "∛125 = ?", correctAnswer: "5", wrongAnswers: ["25", "4", "6"] },
  { id: "rf20", category: "math", exam: ["sat", "psat", "act"], question: "11² = ?", correctAnswer: "121", wrongAnswers: ["111", "132", "110"] },
  { id: "rf21", category: "math", exam: ["sat", "psat", "act"], question: "12² = ?", correctAnswer: "144", wrongAnswers: ["132", "156", "124"] },
  { id: "rf22", category: "math", exam: ["sat", "psat", "act"], question: "14² = ?", correctAnswer: "196", wrongAnswers: ["184", "169", "225"] },
  { id: "rf23", category: "math", exam: ["sat", "psat", "act"], question: "16² = ?", correctAnswer: "256", wrongAnswers: ["225", "196", "289"] },
  { id: "rf24", category: "math", exam: ["sat", "psat", "act"], question: "√289 = ?", correctAnswer: "17", wrongAnswers: ["16", "18", "19"] },
  { id: "rf25", category: "math", exam: ["sat", "psat", "act"], question: "√324 = ?", correctAnswer: "18", wrongAnswers: ["16", "17", "19"] },

  // ══════════════════════════════════════════
  // ANGLE & DEGREE FACTS
  // ══════════════════════════════════════════
  { id: "rf26", category: "math", exam: ["sat", "psat", "act"], question: "90° is called a _____ angle.", correctAnswer: "right", wrongAnswers: ["acute", "obtuse", "straight"] },
  { id: "rf27", category: "math", exam: ["sat", "psat", "act"], question: "180° is called a _____ angle.", correctAnswer: "straight", wrongAnswers: ["right", "reflex", "obtuse"] },
  { id: "rf28", category: "math", exam: ["sat", "psat", "act"], question: "An angle < 90° is:", correctAnswer: "acute", wrongAnswers: ["obtuse", "right", "reflex"] },
  { id: "rf29", category: "math", exam: ["sat", "psat", "act"], question: "An angle between 90° and 180° is:", correctAnswer: "obtuse", wrongAnswers: ["acute", "right", "reflex"] },
  { id: "rf30", category: "math", exam: ["sat", "psat", "act"], question: "360° = ? radians", correctAnswer: "2π", wrongAnswers: ["π", "4π", "π/2"] },
  { id: "rf31", category: "math", exam: ["sat", "psat", "act"], question: "90° = ? radians", correctAnswer: "π/2", wrongAnswers: ["π", "2π", "π/4"] },
  { id: "rf32", category: "math", exam: ["sat", "psat", "act"], question: "45° = ? radians", correctAnswer: "π/4", wrongAnswers: ["π/2", "π/3", "π/6"] },
  { id: "rf33", category: "math", exam: ["sat", "psat", "act"], question: "60° = ? radians", correctAnswer: "π/3", wrongAnswers: ["π/4", "π/6", "π/2"] },
  { id: "rf34", category: "math", exam: ["sat", "psat", "act"], question: "30° = ? radians", correctAnswer: "π/6", wrongAnswers: ["π/3", "π/4", "π/12"] },
  { id: "rf35", category: "math", exam: ["sat", "psat", "act"], question: "270° = ? radians", correctAnswer: "3π/2", wrongAnswers: ["π", "2π", "π/2"] },

  // ══════════════════════════════════════════
  // FRACTION / DECIMAL / PERCENT CONVERSIONS
  // ══════════════════════════════════════════
  { id: "rf36", category: "math", exam: ["sat", "psat", "act"], question: "1/3 as a decimal?", correctAnswer: "0.333...", wrongAnswers: ["0.3", "0.25", "0.5"] },
  { id: "rf37", category: "math", exam: ["sat", "psat", "act"], question: "1/4 as a percent?", correctAnswer: "25%", wrongAnswers: ["20%", "40%", "15%"] },
  { id: "rf38", category: "math", exam: ["sat", "psat", "act"], question: "1/5 as a decimal?", correctAnswer: "0.2", wrongAnswers: ["0.5", "0.15", "0.25"] },
  { id: "rf39", category: "math", exam: ["sat", "psat", "act"], question: "1/6 as a decimal?", correctAnswer: "0.1666...", wrongAnswers: ["0.15", "0.2", "0.125"] },
  { id: "rf40", category: "math", exam: ["sat", "psat", "act"], question: "1/8 as a decimal?", correctAnswer: "0.125", wrongAnswers: ["0.1", "0.15", "0.2"] },
  { id: "rf41", category: "math", exam: ["sat", "psat", "act"], question: "3/4 as a percent?", correctAnswer: "75%", wrongAnswers: ["70%", "80%", "60%"] },
  { id: "rf42", category: "math", exam: ["sat", "psat", "act"], question: "2/5 as a percent?", correctAnswer: "40%", wrongAnswers: ["25%", "50%", "35%"] },
  { id: "rf43", category: "math", exam: ["sat", "psat", "act"], question: "3/8 as a decimal?", correctAnswer: "0.375", wrongAnswers: ["0.35", "0.38", "0.325"] },
  { id: "rf44", category: "math", exam: ["sat", "psat", "act"], question: "5/6 as a decimal?", correctAnswer: "0.8333...", wrongAnswers: ["0.85", "0.8", "0.75"] },
  { id: "rf45", category: "math", exam: ["sat", "psat", "act"], question: "7/8 as a decimal?", correctAnswer: "0.875", wrongAnswers: ["0.78", "0.85", "0.9"] },

  // ══════════════════════════════════════════
  // QUICK TRIG — fill in the blank
  // ══════════════════════════════════════════
  { id: "rf46", category: "math", exam: ["sat", "psat", "act"], question: "cos(45°) = ?", correctAnswer: "√2/2", wrongAnswers: ["1/2", "√3/2", "1"] },
  { id: "rf47", category: "math", exam: ["sat", "psat", "act"], question: "sin(60°) = ?", correctAnswer: "√3/2", wrongAnswers: ["1/2", "√2/2", "1"] },
  { id: "rf48", category: "math", exam: ["sat", "psat", "act"], question: "tan(30°) = ?", correctAnswer: "1/√3 (or √3/3)", wrongAnswers: ["√3", "1", "√2"] },
  { id: "rf49", category: "math", exam: ["sat", "psat", "act"], question: "cos(180°) = ?", correctAnswer: "−1", wrongAnswers: ["0", "1", "−1/2"] },
  { id: "rf50", category: "math", exam: ["sat", "psat", "act"], question: "sin(180°) = ?", correctAnswer: "0", wrongAnswers: ["1", "−1", "1/2"] },
  { id: "rf51", category: "math", exam: ["sat", "psat", "act"], question: "cos(270°) = ?", correctAnswer: "0", wrongAnswers: ["1", "−1", "1/2"] },
  { id: "rf52", category: "math", exam: ["sat", "psat", "act"], question: "sin(270°) = ?", correctAnswer: "−1", wrongAnswers: ["0", "1", "−1/2"] },
  { id: "rf53", category: "math", exam: ["sat", "psat", "act"], question: "cos(360°) = ?", correctAnswer: "1", wrongAnswers: ["0", "−1", "1/2"] },

  // ══════════════════════════════════════════
  // SLOPE & LINE FACTS
  // ══════════════════════════════════════════
  { id: "rf54", category: "math", exam: ["sat", "psat", "act"], question: "A horizontal line has slope:", correctAnswer: "0", wrongAnswers: ["undefined", "1", "−1"] },
  { id: "rf55", category: "math", exam: ["sat", "psat", "act"], question: "A vertical line has slope:", correctAnswer: "undefined", wrongAnswers: ["0", "1", "∞"] },
  { id: "rf56", category: "math", exam: ["sat", "psat", "act"], question: "Slope of y = 3x + 7?", correctAnswer: "3", wrongAnswers: ["7", "−3", "3/7"] },
  { id: "rf57", category: "math", exam: ["sat", "psat", "act"], question: "y-intercept of y = 5x − 2?", correctAnswer: "−2", wrongAnswers: ["5", "2", "−5"] },
  { id: "rf58", category: "math", exam: ["sat", "psat", "act"], question: "If slope = 2, the perpendicular slope is:", correctAnswer: "−1/2", wrongAnswers: ["1/2", "−2", "2"] },

  // ══════════════════════════════════════════
  // ALGEBRA SPEED CHECKS
  // ══════════════════════════════════════════
  { id: "rf59", category: "math", exam: ["sat", "psat", "act"], question: "If 2x = 10, x = ?", correctAnswer: "5", wrongAnswers: ["10", "2", "20"] },
  { id: "rf60", category: "math", exam: ["sat", "psat", "act"], question: "If x + 7 = 12, x = ?", correctAnswer: "5", wrongAnswers: ["7", "19", "12"] },
  { id: "rf61", category: "math", exam: ["sat", "psat", "act"], question: "If 3x − 6 = 0, x = ?", correctAnswer: "2", wrongAnswers: ["3", "6", "−2"] },
  { id: "rf62", category: "math", exam: ["sat", "psat", "act"], question: "|−5| = ?", correctAnswer: "5", wrongAnswers: ["−5", "0", "−1"] },
  { id: "rf63", category: "math", exam: ["sat", "psat", "act"], question: "(−2)³ = ?", correctAnswer: "−8", wrongAnswers: ["8", "−6", "6"] },
  { id: "rf64", category: "math", exam: ["sat", "psat", "act"], question: "(−1)¹⁰⁰ = ?", correctAnswer: "1", wrongAnswers: ["−1", "0", "100"] },
  { id: "rf65", category: "math", exam: ["sat", "psat", "act"], question: "(−1)⁹⁹ = ?", correctAnswer: "−1", wrongAnswers: ["1", "0", "99"] },
  { id: "rf66", category: "math", exam: ["sat", "psat", "act"], question: "0! = ?", correctAnswer: "1", wrongAnswers: ["0", "undefined", "−1"] },
  { id: "rf67", category: "math", exam: ["sat", "psat", "act"], question: "5! = ?", correctAnswer: "120", wrongAnswers: ["60", "24", "720"] },
  { id: "rf68", category: "math", exam: ["sat", "psat", "act"], question: "Any number × 0 = ?", correctAnswer: "0", wrongAnswers: ["1", "the number", "undefined"] },
  { id: "rf69", category: "math", exam: ["sat", "psat", "act"], question: "0/5 = ?", correctAnswer: "0", wrongAnswers: ["5", "undefined", "1"] },
  { id: "rf70", category: "math", exam: ["sat", "psat", "act"], question: "5/0 = ?", correctAnswer: "undefined", wrongAnswers: ["0", "5", "∞"] },

  // ══════════════════════════════════════════
  // GEOMETRY INSTANT RECALL
  // ══════════════════════════════════════════
  { id: "rf71", category: "math", exam: ["sat", "psat", "act"], question: "Sides of a hexagon?", correctAnswer: "6", wrongAnswers: ["5", "7", "8"] },
  { id: "rf72", category: "math", exam: ["sat", "psat", "act"], question: "Sides of a pentagon?", correctAnswer: "5", wrongAnswers: ["4", "6", "7"] },
  { id: "rf73", category: "math", exam: ["sat", "psat", "act"], question: "Sides of an octagon?", correctAnswer: "8", wrongAnswers: ["6", "7", "10"] },
  { id: "rf74", category: "math", exam: ["sat", "psat", "act"], question: "Interior angle of a regular hexagon?", correctAnswer: "120°", wrongAnswers: ["90°", "108°", "135°"] },
  { id: "rf75", category: "math", exam: ["sat", "psat", "act"], question: "Interior angle of a square?", correctAnswer: "90°", wrongAnswers: ["60°", "120°", "45°"] },
  { id: "rf76", category: "math", exam: ["sat", "psat", "act"], question: "Equilateral triangle: each angle = ?", correctAnswer: "60°", wrongAnswers: ["90°", "45°", "30°"] },
  { id: "rf77", category: "math", exam: ["sat", "psat", "act"], question: "Diagonal of a square with side s?", correctAnswer: "s√2", wrongAnswers: ["2s", "s/2", "s²"] },
  { id: "rf78", category: "math", exam: ["sat", "psat", "act"], question: "π ≈ ?", correctAnswer: "3.14159", wrongAnswers: ["3.15", "3.12", "3.2"] },

  // ══════════════════════════════════════════
  // STATISTICS & DATA INSTANT FACTS
  // ══════════════════════════════════════════
  { id: "rf79", category: "math", exam: ["sat", "psat", "act"], question: "Mode = ?", correctAnswer: "most frequent value", wrongAnswers: ["middle value", "average", "largest − smallest"] },
  { id: "rf80", category: "math", exam: ["sat", "psat", "act"], question: "A positive skew means the tail is:", correctAnswer: "to the right", wrongAnswers: ["to the left", "symmetric", "no tail"] },
  { id: "rf81", category: "math", exam: ["sat", "psat", "act"], question: "In a normal distribution, ~68% falls within:", correctAnswer: "1 standard deviation", wrongAnswers: ["2 standard deviations", "3 standard deviations", "the mean only"] },
  { id: "rf82", category: "math", exam: ["sat", "psat", "act"], question: "~95% falls within _____ standard deviations.", correctAnswer: "2", wrongAnswers: ["1", "3", "1.5"] },
  { id: "rf83", category: "math", exam: ["sat", "psat", "act"], question: "Correlation does NOT prove:", correctAnswer: "causation", wrongAnswers: ["association", "a relationship", "a trend"] },

  // ══════════════════════════════════════════
  // GRAMMAR INSTANT RECALL — which is correct?
  // ══════════════════════════════════════════
  { id: "rfg1", category: "grammar", exam: ["sat", "psat", "act"], question: "Your or You're: '___ going home.'", correctAnswer: "You're", wrongAnswers: ["Your", "Youre", "Yore"] },
  { id: "rfg2", category: "grammar", exam: ["sat", "psat", "act"], question: "Who's or Whose: '___ book is this?'", correctAnswer: "Whose", wrongAnswers: ["Who's", "Whos", "Whom's"] },
  { id: "rfg3", category: "grammar", exam: ["sat", "psat", "act"], question: "Loose or Lose: 'Don't ___ your keys.'", correctAnswer: "lose", wrongAnswers: ["loose", "loos", "loss"] },
  { id: "rfg4", category: "grammar", exam: ["sat", "psat", "act"], question: "Then or Than: 'She is taller ___ him.'", correctAnswer: "than", wrongAnswers: ["then", "that", "this"] },
  { id: "rfg5", category: "grammar", exam: ["sat", "psat", "act"], question: "Ensure or Insure: '___ means to make certain.'", correctAnswer: "Ensure", wrongAnswers: ["Insure", "Assure", "Insure"] },
  { id: "rfg6", category: "grammar", exam: ["sat", "psat", "act"], question: "'Neither A ___ B' — fill in:", correctAnswer: "nor", wrongAnswers: ["or", "and", "but"] },
  { id: "rfg7", category: "grammar", exam: ["sat", "psat", "act"], question: "'Either A ___ B' — fill in:", correctAnswer: "or", wrongAnswers: ["nor", "and", "but"] },
  { id: "rfg8", category: "grammar", exam: ["sat", "psat", "act"], question: "'Not only A ___ also B':", correctAnswer: "but", wrongAnswers: ["and", "or", "nor"] },
  { id: "rfg9", category: "grammar", exam: ["sat", "psat", "act"], question: "FANBOYS stands for:", correctAnswer: "for, and, nor, but, or, yet, so", wrongAnswers: ["first, also, now, but, or, yes, so", "for, after, nor, but, of, yet, since", "for, and, not, but, or, you, so"] },
  { id: "rfg10", category: "grammar", exam: ["sat", "psat", "act"], question: "A comma goes _____ a coordinating conjunction in a compound sentence.", correctAnswer: "before", wrongAnswers: ["after", "never", "both sides"] },
  { id: "rfg11", category: "grammar", exam: ["sat", "psat", "act"], question: "'The data ___ clear.' (data is plural)", correctAnswer: "are", wrongAnswers: ["is", "was", "has been"] },
  { id: "rfg12", category: "grammar", exam: ["sat", "psat", "act"], question: "'Each student ___ a textbook.'", correctAnswer: "has", wrongAnswers: ["have", "are having", "were having"] },

  // ══════════════════════════════════════════
  // VOCAB — SPEED ROUND (one-word answers)
  // ══════════════════════════════════════════
  { id: "rfv1", category: "vocab", exam: ["sat", "psat", "act"], question: "Opposite of 'verbose':", correctAnswer: "concise", wrongAnswers: ["wordy", "eloquent", "talkative"] },
  { id: "rfv2", category: "vocab", exam: ["sat", "psat", "act"], question: "Opposite of 'benevolent':", correctAnswer: "malevolent", wrongAnswers: ["generous", "kind", "helpful"] },
  { id: "rfv3", category: "vocab", exam: ["sat", "psat", "act"], question: "Opposite of 'ephemeral':", correctAnswer: "permanent", wrongAnswers: ["brief", "fleeting", "temporary"] },
  { id: "rfv4", category: "vocab", exam: ["sat", "psat", "act"], question: "Opposite of 'lethargic':", correctAnswer: "energetic", wrongAnswers: ["tired", "sluggish", "lazy"] },
  { id: "rfv5", category: "vocab", exam: ["sat", "psat", "act"], question: "Opposite of 'austere':", correctAnswer: "luxurious", wrongAnswers: ["plain", "harsh", "strict"] },
  { id: "rfv6", category: "vocab", exam: ["sat", "psat", "act"], question: "'Credulous' is the opposite of:", correctAnswer: "skeptical", wrongAnswers: ["gullible", "believing", "trusting"] },
  { id: "rfv7", category: "vocab", exam: ["sat", "psat", "act"], question: "Synonym for 'ubiquitous':", correctAnswer: "everywhere", wrongAnswers: ["rare", "unique", "scarce"] },
  { id: "rfv8", category: "vocab", exam: ["sat", "psat", "act"], question: "Synonym for 'pragmatic':", correctAnswer: "practical", wrongAnswers: ["idealistic", "dramatic", "poetic"] },
  { id: "rfv9", category: "vocab", exam: ["sat", "psat", "act"], question: "Synonym for 'alleviate':", correctAnswer: "relieve", wrongAnswers: ["worsen", "create", "ignore"] },
  { id: "rfv10", category: "vocab", exam: ["sat", "psat", "act"], question: "Synonym for 'meticulous':", correctAnswer: "thorough / careful", wrongAnswers: ["careless", "quick", "reckless"] },
  { id: "rfv11", category: "vocab", exam: ["sat", "psat", "act"], question: "'Gregarious' means:", correctAnswer: "sociable", wrongAnswers: ["greedy", "aggressive", "solitary"] },
  { id: "rfv12", category: "vocab", exam: ["sat", "psat", "act"], question: "'Cogent' means:", correctAnswer: "clear and convincing", wrongAnswers: ["confused", "gentle", "rotating"] },
  { id: "rfv13", category: "vocab", exam: ["sat", "psat", "act"], question: "'Pernicious' means:", correctAnswer: "harmful in a subtle way", wrongAnswers: ["beneficial", "obvious", "loud"] },
  { id: "rfv14", category: "vocab", exam: ["sat", "psat", "act"], question: "'Abate' means:", correctAnswer: "to reduce in intensity", wrongAnswers: ["to increase", "to argue", "to fish"] },
  { id: "rfv15", category: "vocab", exam: ["sat", "psat", "act"], question: "'Lucid' means:", correctAnswer: "clear and easy to understand", wrongAnswers: ["lucky", "dark", "confusing"] },
  { id: "rfv16", category: "vocab", exam: ["sat", "psat", "act"], question: "'Admonish' means:", correctAnswer: "to warn or scold gently", wrongAnswers: ["to praise", "to demolish", "to admire"] },
  { id: "rfv17", category: "vocab", exam: ["sat", "psat", "act"], question: "'Ample' means:", correctAnswer: "more than enough", wrongAnswers: ["barely enough", "too little", "exactly right"] },
  { id: "rfv18", category: "vocab", exam: ["sat", "psat", "act"], question: "'Concur' means:", correctAnswer: "to agree", wrongAnswers: ["to disagree", "to conquer", "to happen simultaneously"] },
  { id: "rfv19", category: "vocab", exam: ["sat", "psat", "act"], question: "'Denounce' means:", correctAnswer: "to publicly condemn", wrongAnswers: ["to announce", "to support", "to pronounce"] },
  { id: "rfv20", category: "vocab", exam: ["sat", "psat", "act"], question: "'Feasible' means:", correctAnswer: "possible to do", wrongAnswers: ["impossible", "easy", "festival-like"] },

  // ══════════════════════════════════════════
  // ACT SCIENCE — INSTANT RECALL
  // ══════════════════════════════════════════
  { id: "rfs1", category: "science", exam: ["act"], question: "Water boils at (°C):", correctAnswer: "100°C", wrongAnswers: ["90°C", "212°C", "80°C"] },
  { id: "rfs2", category: "science", exam: ["act"], question: "Water freezes at (°C):", correctAnswer: "0°C", wrongAnswers: ["32°C", "−10°C", "10°C"] },
  { id: "rfs3", category: "science", exam: ["act"], question: "Water boils at (°F):", correctAnswer: "212°F", wrongAnswers: ["100°F", "200°F", "180°F"] },
  { id: "rfs4", category: "science", exam: ["act"], question: "Water freezes at (°F):", correctAnswer: "32°F", wrongAnswers: ["0°F", "28°F", "40°F"] },
  { id: "rfs5", category: "science", exam: ["act"], question: "pH of pure water:", correctAnswer: "7", wrongAnswers: ["0", "14", "1"] },
  { id: "rfs6", category: "science", exam: ["act"], question: "Normal human body temp (°F):", correctAnswer: "98.6°F", wrongAnswers: ["96°F", "100°F", "97°F"] },
  { id: "rfs7", category: "science", exam: ["act"], question: "Speed of light ≈ ?", correctAnswer: "3 × 10⁸ m/s", wrongAnswers: ["3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁵ m/s"] },
  { id: "rfs8", category: "science", exam: ["act"], question: "Density = ?", correctAnswer: "mass / volume", wrongAnswers: ["volume / mass", "mass × volume", "weight / area"] },
  { id: "rfs9", category: "science", exam: ["act"], question: "DNA stands for:", correctAnswer: "deoxyribonucleic acid", wrongAnswers: ["dinitrogen acid", "double nucleic acid", "deoxynitric acid"] },
  { id: "rfs10", category: "science", exam: ["act"], question: "Photosynthesis converts CO₂ + H₂O into:", correctAnswer: "glucose + O₂", wrongAnswers: ["protein + CO₂", "fat + H₂O", "starch + N₂"] },
  { id: "rfs11", category: "science", exam: ["act"], question: "Mitosis produces ___ identical cells.", correctAnswer: "2", wrongAnswers: ["4", "1", "8"] },
  { id: "rfs12", category: "science", exam: ["act"], question: "Meiosis produces ___ cells.", correctAnswer: "4", wrongAnswers: ["2", "1", "8"] },
  { id: "rfs13", category: "science", exam: ["act"], question: "Protons have a _____ charge.", correctAnswer: "positive", wrongAnswers: ["negative", "neutral", "variable"] },
  { id: "rfs14", category: "science", exam: ["act"], question: "Electrons have a _____ charge.", correctAnswer: "negative", wrongAnswers: ["positive", "neutral", "variable"] },
  { id: "rfs15", category: "science", exam: ["act"], question: "Neutrons have a _____ charge.", correctAnswer: "neutral (no charge)", wrongAnswers: ["positive", "negative", "both"] },
  { id: "rfs16", category: "science", exam: ["act"], question: "Atomic number = number of:", correctAnswer: "protons", wrongAnswers: ["neutrons", "electrons only", "protons + neutrons"] },
  { id: "rfs17", category: "science", exam: ["act"], question: "Mass number = protons + ?", correctAnswer: "neutrons", wrongAnswers: ["electrons", "atoms", "ions"] },
  { id: "rfs18", category: "science", exam: ["act"], question: "The powerhouse of the cell is the:", correctAnswer: "mitochondria", wrongAnswers: ["nucleus", "ribosome", "golgi body"] },
  { id: "rfs19", category: "science", exam: ["act"], question: "An exothermic reaction _____ heat.", correctAnswer: "releases", wrongAnswers: ["absorbs", "stores", "ignores"] },
  { id: "rfs20", category: "science", exam: ["act"], question: "An endothermic reaction _____ heat.", correctAnswer: "absorbs", wrongAnswers: ["releases", "creates", "destroys"] },
  { id: "rfs21", category: "science", exam: ["act"], question: "F = ma is _____ second law.", correctAnswer: "Newton's", wrongAnswers: ["Einstein's", "Boyle's", "Mendel's"] },
  { id: "rfs22", category: "science", exam: ["act"], question: "PV = nRT is the _____ gas law.", correctAnswer: "ideal", wrongAnswers: ["Boyle's", "Charles's", "combined"] },
  { id: "rfs23", category: "science", exam: ["act"], question: "As pressure ↑ (constant temp), volume:", correctAnswer: "↓ (decreases)", wrongAnswers: ["↑ (increases)", "stays same", "doubles"] },
  { id: "rfs24", category: "science", exam: ["act"], question: "Dominant allele is shown with:", correctAnswer: "uppercase letter (e.g., A)", wrongAnswers: ["lowercase", "subscript", "italic"] },
  { id: "rfs25", category: "science", exam: ["act"], question: "Recessive allele is shown with:", correctAnswer: "lowercase letter (e.g., a)", wrongAnswers: ["uppercase", "bold", "superscript"] },
  { id: "rfs26", category: "science", exam: ["act"], question: "Genotype Aa is:", correctAnswer: "heterozygous", wrongAnswers: ["homozygous dominant", "homozygous recessive", "codominant"] },
  { id: "rfs27", category: "science", exam: ["act"], question: "Genotype AA is:", correctAnswer: "homozygous dominant", wrongAnswers: ["heterozygous", "homozygous recessive", "incomplete dominant"] },
  { id: "rfs28", category: "science", exam: ["act"], question: "Catalyst _____ a reaction without being consumed.", correctAnswer: "speeds up", wrongAnswers: ["slows down", "stops", "reverses"] },
  { id: "rfs29", category: "science", exam: ["act"], question: "Kinetic energy = ?", correctAnswer: "½mv²", wrongAnswers: ["mgh", "mv", "ma"] },
  { id: "rfs30", category: "science", exam: ["act"], question: "Potential energy (gravitational) = ?", correctAnswer: "mgh", wrongAnswers: ["½mv²", "mv", "ma"] },

  // ══════════════════════════════════════════
  // STRATEGY — INSTANT DECISIONS
  // ══════════════════════════════════════════
  { id: "rft1", category: "strategy", exam: ["sat", "psat", "act"], question: "Two answers say the same thing differently — they're both:", correctAnswer: "wrong (correct answer must be unique)", wrongAnswers: ["right", "partial credit", "pick either"] },
  { id: "rft2", category: "strategy", exam: ["sat", "psat", "act"], question: "An answer with 'always' or 'never' is usually:", correctAnswer: "wrong (too extreme)", wrongAnswers: ["correct", "partially right", "a safe bet"] },
  { id: "rft3", category: "strategy", exam: ["sat", "psat", "act"], question: "Should you change your answer on a hunch?", correctAnswer: "No — stick with your first instinct unless you find an error", wrongAnswers: ["Yes, always", "Only on math", "Only if time is left"] },
  { id: "rft4", category: "strategy", exam: ["sat", "psat", "act"], question: "Best use of the last 2 minutes:", correctAnswer: "fill in any blanks (no penalty for guessing)", wrongAnswers: ["recheck everything", "start a new passage", "leave blanks"] },
  { id: "rft5", category: "strategy", exam: ["sat", "psat"], question: "On Digital SAT, you can flag questions to:", correctAnswer: "review them later in the same module", wrongAnswers: ["skip them permanently", "get extra time", "ask for a hint"] },
  { id: "rft6", category: "strategy", exam: ["act"], question: "ACT English: 75 questions in ___ minutes.", correctAnswer: "45", wrongAnswers: ["60", "35", "50"] },
  { id: "rft7", category: "strategy", exam: ["act"], question: "ACT Reading: ___ passages in 35 minutes.", correctAnswer: "4", wrongAnswers: ["5", "3", "6"] },
  { id: "rft8", category: "strategy", exam: ["act"], question: "ACT Reading: seconds per question ≈", correctAnswer: "53 seconds", wrongAnswers: ["30 seconds", "75 seconds", "90 seconds"] },
  { id: "rft9", category: "strategy", exam: ["sat", "psat"], question: "SAT has ___ modules per section.", correctAnswer: "2", wrongAnswers: ["1", "3", "4"] },
  { id: "rft10", category: "strategy", exam: ["sat", "psat", "act"], question: "Wrong answer on SAT/ACT costs:", correctAnswer: "0 points (no penalty)", wrongAnswers: ["−¼ point", "−½ point", "−1 point"] },
];
