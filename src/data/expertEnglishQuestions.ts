import { EnglishQuestion } from './englishQuestions';

// Expert-level English questions (difficulty 8-10)
export const expertEnglishQuestions: EnglishQuestion[] = [
  // Difficulty 8 - Advanced Analysis
  {
    id: "exp001",
    question: "The author's use of zeugma in the phrase 'She lowered her standards and her neckline' serves to:",
    options: [
      { letter: "A", text: "create humor through unexpected pairing of abstract and concrete" },
      { letter: "B", text: "emphasize the character's moral decline" },
      { letter: "C", text: "illustrate the narrator's disapproval" },
      { letter: "D", text: "establish a satirical tone through wordplay" }
    ],
    correctAnswer: "D",
    explanation: "Zeugma pairs disparate concepts under one verb for satirical effect. While A notes the technique, D captures the broader rhetorical purpose of establishing satire.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp002",
    question: "In the context of the passage, the phrase 'conspicuous by its absence' functions as:",
    options: [
      { letter: "A", text: "an oxymoron highlighting paradoxical visibility" },
      { letter: "B", text: "a litotes understating the significance of omission" },
      { letter: "C", text: "an apophasis drawing attention through denial" },
      { letter: "D", text: "a paraprosdokian subverting expectations" }
    ],
    correctAnswer: "A",
    explanation: "The phrase is oxymoronic—something absent cannot literally be conspicuous, yet its very absence makes it noticeable, creating a paradox of visibility.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 8
  },
  {
    id: "exp003",
    question: "The author employs epistrophe in the final paragraph primarily to:",
    options: [
      { letter: "A", text: "create rhythmic emphasis through terminal repetition" },
      { letter: "B", text: "establish thematic coherence across clauses" },
      { letter: "C", text: "reinforce the inevitability of the conclusion" },
      { letter: "D", text: "all of the above working in concert" }
    ],
    correctAnswer: "D",
    explanation: "Epistrophe (ending repetition) simultaneously creates rhythm, builds thematic unity, and emphasizes inevitability—these effects work together rather than in isolation.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Patterns",
    difficultyRating: 8
  },
  {
    id: "exp004",
    question: "Which revision most effectively employs periodic sentence structure to build suspense?\n\nOriginal: 'The detective finally revealed the murderer after questioning all suspects, reviewing evidence, and considering every possibility.'",
    options: [
      { letter: "A", text: "After questioning all suspects, reviewing evidence, and considering every possibility, the detective finally revealed the murderer." },
      { letter: "B", text: "The detective, after questioning all suspects, finally revealed the murderer." },
      { letter: "C", text: "Finally, after all the questioning and reviewing, the murderer was revealed by the detective." },
      { letter: "D", text: "Questioning suspects, reviewing evidence, considering possibilities—the detective revealed the murderer." }
    ],
    correctAnswer: "A",
    explanation: "Periodic sentences delay the main clause until the end, building suspense. A places all subordinate elements first, withholding the revelation until the final position.",
    difficulty: "Hard",
    domain: "Expression of Ideas",
    skill: "Sentence Structure",
    difficultyRating: 8
  },
  {
    id: "exp005",
    question: "The passage's shift from paratactic to hypotactic syntax in the final section suggests:",
    options: [
      { letter: "A", text: "a movement from action to reflection" },
      { letter: "B", text: "increasing complexity of thought" },
      { letter: "C", text: "the narrator's growing uncertainty" },
      { letter: "D", text: "a transition from observation to analysis" }
    ],
    correctAnswer: "D",
    explanation: "Parataxis (simple, coordinated clauses) suits observation; hypotaxis (complex, subordinated clauses) suits analysis. The shift marks movement from describing to interpreting.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic Analysis",
    difficultyRating: 8
  },
  {
    id: "exp006",
    question: "The author's use of anadiplosis ('Fear leads to anger. Anger leads to hate.') creates:",
    options: [
      { letter: "A", text: "logical progression through linked repetition" },
      { letter: "B", text: "emotional escalation via structural mirroring" },
      { letter: "C", text: "causal chain emphasized by terminal-initial echo" },
      { letter: "D", text: "all effects operating simultaneously" }
    ],
    correctAnswer: "D",
    explanation: "Anadiplosis (repeating the end of one clause at the start of the next) creates logical progression, emotional escalation, and causal emphasis together.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp007",
    question: "Which choice best describes the function of the em-dash in: 'The solution—if one could call it that—satisfied no one'?",
    options: [
      { letter: "A", text: "parenthetical qualification undermining the noun" },
      { letter: "B", text: "emphatic interruption signaling doubt" },
      { letter: "C", text: "syntactic isolation of conditional hedging" },
      { letter: "D", text: "dramatic pause heightening skepticism" }
    ],
    correctAnswer: "C",
    explanation: "The em-dashes syntactically isolate the conditional phrase 'if one could call it that,' which hedges the appropriateness of 'solution'—a precise grammatical function.",
    difficulty: "Hard",
    domain: "Standard English Conventions",
    skill: "Punctuation",
    difficultyRating: 8
  },
  {
    id: "exp008",
    question: "The passage's anaphoric structure ('We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields') primarily serves to:",
    options: [
      { letter: "A", text: "enumerate locations systematically" },
      { letter: "B", text: "build cumulative rhetorical force" },
      { letter: "C", text: "emphasize geographical comprehensiveness" },
      { letter: "D", text: "establish parallel grammatical rhythm" }
    ],
    correctAnswer: "B",
    explanation: "While anaphora creates parallelism and lists locations, its primary rhetorical purpose is building cumulative force—each repetition intensifies the message's impact.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Analysis",
    difficultyRating: 8
  },
  {
    id: "exp009",
    question: "The author's chiasmic structure in 'Ask not what your country can do for you—ask what you can do for your country' achieves its effect through:",
    options: [
      { letter: "A", text: "syntactic inversion creating memorable contrast" },
      { letter: "B", text: "reversal of grammatical elements (AB:BA pattern)" },
      { letter: "C", text: "antithetical meaning reinforced by mirrored form" },
      { letter: "D", text: "all mechanisms working together" }
    ],
    correctAnswer: "D",
    explanation: "Chiasmus works through syntactic inversion (A), grammatical reversal (B), and antithetical meaning reinforced by form (C)—these elements combine for rhetorical power.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp010",
    question: "The strategic use of asyndeton in 'I came, I saw, I conquered' creates:",
    options: [
      { letter: "A", text: "breathless pace suggesting swift action" },
      { letter: "B", text: "emphatic separation of distinct achievements" },
      { letter: "C", text: "rhetorical compression mirroring military efficiency" },
      { letter: "D", text: "all effects contributing to the statement's impact" }
    ],
    correctAnswer: "D",
    explanation: "Asyndeton (omitting conjunctions) simultaneously creates speed (A), emphasizes each element (B), and mirrors the efficiency it describes (C)—working in concert.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp011",
    question: "Which sentence demonstrates correct use of the subjunctive mood in a contrary-to-fact condition?",
    options: [
      { letter: "A", text: "If I was wealthy, I would donate more to charity." },
      { letter: "B", text: "If I were wealthy, I would donate more to charity." },
      { letter: "C", text: "If I am wealthy, I will donate more to charity." },
      { letter: "D", text: "If I be wealthy, I would donate more to charity." }
    ],
    correctAnswer: "B",
    explanation: "Contrary-to-fact conditions require the past subjunctive 'were' for all persons. 'If I were' correctly expresses a hypothetical contrary to present reality.",
    difficulty: "Hard",
    domain: "Standard English Conventions",
    skill: "Verb Mood",
    difficultyRating: 8
  },
  {
    id: "exp012",
    question: "The passage's polysyndeton ('and the rain fell and the wind blew and the thunder roared') contrasts with typical journalistic prose to:",
    options: [
      { letter: "A", text: "slow the pace and emphasize each element" },
      { letter: "B", text: "create biblical or epic register" },
      { letter: "C", text: "suggest overwhelming accumulation of forces" },
      { letter: "D", text: "achieve all these effects simultaneously" }
    ],
    correctAnswer: "D",
    explanation: "Polysyndeton (repeated conjunctions) slows pace (A), evokes elevated registers (B), and suggests accumulation (C)—the deliberate stylistic choice serves multiple purposes.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp013",
    question: "In the phrase 'a deafening silence,' the author employs:",
    options: [
      { letter: "A", text: "oxymoron for paradoxical emphasis" },
      { letter: "B", text: "catachresis for striking effect" },
      { letter: "C", text: "synesthesia blending sensory modalities" },
      { letter: "D", text: "hypallage transferring epithets" }
    ],
    correctAnswer: "A",
    explanation: "Oxymoron combines contradictory terms ('deafening' and 'silence') for paradoxical effect. While synesthesia involves senses, here it's the contradiction that creates meaning.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 8
  },
  {
    id: "exp014",
    question: "The author's use of litotes in 'not unwilling' rather than 'willing' serves to:",
    options: [
      { letter: "A", text: "express cautious affirmation through double negative" },
      { letter: "B", text: "suggest reluctance overcome by other factors" },
      { letter: "C", text: "maintain formal register through understatement" },
      { letter: "D", text: "all purposes depending on context" }
    ],
    correctAnswer: "D",
    explanation: "Litotes (understatement via negation) can express cautious affirmation, imply overcome reluctance, or maintain formality—context determines which purpose predominates.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp015",
    question: "Which revision correctly maintains the passage's established free indirect discourse?",
    options: [
      { letter: "A", text: "She thought that he was being unreasonable." },
      { letter: "B", text: "'He is being unreasonable,' she thought." },
      { letter: "C", text: "He was being unreasonable. How could he not see?" },
      { letter: "D", text: "She found his behavior unreasonable in her opinion." }
    ],
    correctAnswer: "C",
    explanation: "Free indirect discourse blends narrator and character perspectives without quotation marks or explicit attribution. C presents the character's thoughts through the narrator's voice.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Voice",
    difficultyRating: 8
  },
  // Difficulty 9 - Expert Analysis
  {
    id: "exp016",
    question: "The author's deployment of metalepsis—where the effect is named to imply the cause—in 'the gray hairs of experience' demonstrates:",
    options: [
      { letter: "A", text: "metonymic substitution of result for process" },
      { letter: "B", text: "synecdochic representation of age through physical sign" },
      { letter: "C", text: "metaphoric equation of appearance with wisdom" },
      { letter: "D", text: "complex figuration involving multiple tropes" }
    ],
    correctAnswer: "D",
    explanation: "The phrase operates on multiple levels: metonymy (effect for cause), synecdoche (part for whole), and metaphor (gray hair equals wisdom)—demonstrating layered figuration.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Advanced Figurative Language",
    difficultyRating: 9
  },
  {
    id: "exp017",
    question: "The passage's anacoluthon ('The government—but what does it matter now?—decided to proceed') creates:",
    options: [
      { letter: "A", text: "syntactic rupture mimicking thought interruption" },
      { letter: "B", text: "performative demonstration of the speaker's resignation" },
      { letter: "C", text: "tension between logical structure and emotional reality" },
      { letter: "D", text: "all effects operating in the construction" }
    ],
    correctAnswer: "D",
    explanation: "Anacoluthon (grammatical break mid-sentence) simultaneously mimics interrupted thought (A), performs resignation (B), and shows logic yielding to emotion (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic Effects",
    difficultyRating: 9
  },
  {
    id: "exp018",
    question: "The author's use of praeteritio ('I will not mention his numerous failures') functions as:",
    options: [
      { letter: "A", text: "ironic emphasis through feigned omission" },
      { letter: "B", text: "plausible deniability while making accusations" },
      { letter: "C", text: "rhetorical have-it-both-ways strategy" },
      { letter: "D", text: "all functions operating simultaneously" }
    ],
    correctAnswer: "D",
    explanation: "Praeteritio (mentioning by claiming not to mention) achieves ironic emphasis (A), deniability (B), and rhetorical having-it-both-ways (C) in a single construction.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp019",
    question: "The strategic placement of a syllepsis in 'She took his advice and his wallet' creates:",
    options: [
      { letter: "A", text: "zeugmatic yoking of abstract and concrete under one verb" },
      { letter: "B", text: "comedic bathos through unexpected descent" },
      { letter: "C", text: "characterization through juxtaposed actions" },
      { letter: "D", text: "all effects in compressed form" }
    ],
    correctAnswer: "D",
    explanation: "Syllepsis (one word in different senses with two objects) achieves zeugmatic yoking (A), comedic bathos (B), and characterization (C) efficiently.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp020",
    question: "The passage's sustained use of hypotaxis reaching four levels of subordination suggests:",
    options: [
      { letter: "A", text: "Byzantine complexity of the subject matter" },
      { letter: "B", text: "the narrator's tendency toward qualification" },
      { letter: "C", text: "mimetic representation of entangled circumstances" },
      { letter: "D", text: "the interpretation depends on surrounding context" }
    ],
    correctAnswer: "D",
    explanation: "Deep hypotaxis can suggest complexity, qualification, or entanglement—context determines which reading is most appropriate. No single interpretation is inherently correct.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic Analysis",
    difficultyRating: 9
  },
  {
    id: "exp021",
    question: "The author employs catachresis (a deliberately 'wrong' metaphor) in 'the voice of the wind' to:",
    options: [
      { letter: "A", text: "personify nature through impossible attribution" },
      { letter: "B", text: "extend language beyond literal capacity" },
      { letter: "C", text: "create fresh perception through category violation" },
      { letter: "D", text: "achieve effects unavailable to conventional metaphor" }
    ],
    correctAnswer: "D",
    explanation: "Catachresis deliberately violates categorical boundaries to achieve effects that conventional metaphor cannot—it personifies (A), extends language (B), and freshens perception (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 9
  },
  {
    id: "exp022",
    question: "Which analysis best captures the function of the passage's hysteron proteron ('I die, I faint, I fail')?",
    options: [
      { letter: "A", text: "temporal reversal for dramatic climax positioning" },
      { letter: "B", text: "anti-climactic ordering suggesting consciousness dissolution" },
      { letter: "C", text: "logical reversal mimicking perceptual priority under stress" },
      { letter: "D", text: "all readings are supportable given poetic context" }
    ],
    correctAnswer: "D",
    explanation: "Hysteron proteron (putting the logically later thing first) can serve dramatic climax, anti-climax, or mimesis—in poetic context, multiple readings coexist validly.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp023",
    question: "The passage's use of aporia ('I know not whether to call it courage or foolishness') functions to:",
    options: [
      { letter: "A", text: "express genuine uncertainty about classification" },
      { letter: "B", text: "invite reader participation in judgment" },
      { letter: "C", text: "suggest the inadequacy of binary categories" },
      { letter: "D", text: "all purposes operating together" }
    ],
    correctAnswer: "D",
    explanation: "Aporia (expression of doubt) can express genuine uncertainty (A), invite participation (B), and critique binaries (C)—sophisticated rhetoric often serves multiple purposes.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp024",
    question: "The author's epanorthosis ('He was brave—no, reckless—in his defiance') achieves:",
    options: [
      { letter: "A", text: "self-correction that intensifies rather than retracts" },
      { letter: "B", text: "performed deliberation that carries both terms forward" },
      { letter: "C", text: "rhetorical refinement that sharpens judgment" },
      { letter: "D", text: "all effects in dynamic tension" }
    ],
    correctAnswer: "D",
    explanation: "Epanorthosis (self-correction) intensifies (A), carries both terms (B), and sharpens judgment (C)—the 'correction' is rhetorical rather than true retraction.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp025",
    question: "The passage's elaborate periphrasis ('the rosy-fingered herald of dawn' for 'sunrise') functions to:",
    options: [
      { letter: "A", text: "elevate register through Homeric allusion" },
      { letter: "B", text: "slow perception to match the phenomenon described" },
      { letter: "C", text: "demonstrate the speaker's classical education" },
      { letter: "D", text: "different functions depending on genre and context" }
    ],
    correctAnswer: "D",
    explanation: "Periphrasis (circumlocution) can elevate register, slow perception, or display learning—context and genre determine which function predominates.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 9
  },
  {
    id: "exp026",
    question: "The syntactic embedding in 'The theory that the hypothesis which the data that the researchers collected supports may be false is controversial' creates:",
    options: [
      { letter: "A", text: "center-embedding that strains processing capacity" },
      { letter: "B", text: "performative demonstration of cognitive limits" },
      { letter: "C", text: "deliberate difficulty mirroring conceptual complexity" },
      { letter: "D", text: "the function depends on authorial intent and context" }
    ],
    correctAnswer: "D",
    explanation: "Multiple center-embeddings strain processing (A) and may perform limits (B) or mirror complexity (C)—whether this is deliberate art or accidental difficulty depends on context.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic Analysis",
    difficultyRating: 9
  },
  {
    id: "exp027",
    question: "The author's tmesis in 'abso-bloody-lutely' demonstrates:",
    options: [
      { letter: "A", text: "morphological interruption for emphatic intensification" },
      { letter: "B", text: "register shift signaling emotional investment" },
      { letter: "C", text: "playful violation of word-boundary rules" },
      { letter: "D", text: "all effects combined" }
    ],
    correctAnswer: "D",
    explanation: "Tmesis (word-splitting insertion) intensifies (A), shifts register (B), and playfully violates norms (C)—the effects work together for emphatic impact.",
    difficulty: "Hard",
    domain: "Standard English Conventions",
    skill: "Morphological Analysis",
    difficultyRating: 9
  },
  {
    id: "exp028",
    question: "The passage's sustained prosopopoeia (giving voice to abstract concepts) in 'Justice demands, Mercy pleads, Wisdom counsels' creates:",
    options: [
      { letter: "A", text: "allegorical drama among personified virtues" },
      { letter: "B", text: "externalization of internal moral conflict" },
      { letter: "C", text: "classical rhetorical gravitas through figuration" },
      { letter: "D", text: "effects that compound and reinforce each other" }
    ],
    correctAnswer: "D",
    explanation: "Prosopopoeia creates allegorical drama (A), externalizes conflict (B), and adds classical weight (C)—these effects compound rather than operate independently.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 9
  },
  {
    id: "exp029",
    question: "The author's antimetabole ('When the going gets tough, the tough get going') differs from chiasmus in that:",
    options: [
      { letter: "A", text: "it repeats words rather than just reversing structure" },
      { letter: "B", text: "the repetition involves semantic shift between uses" },
      { letter: "C", text: "the reversal creates logical rather than merely formal symmetry" },
      { letter: "D", text: "all distinctions apply" }
    ],
    correctAnswer: "D",
    explanation: "Antimetabole differs from chiasmus by repeating actual words (A), shifting their meaning (B), and creating logical symmetry (C)—it's a more specific, word-repeating form.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp030",
    question: "The passage's brachylogy ('The more, the merrier') achieves its effect through:",
    options: [
      { letter: "A", text: "elliptical compression requiring inferential completion" },
      { letter: "B", text: "proverbial form suggesting universal wisdom" },
      { letter: "C", text: "comparative structure implying proportional relationship" },
      { letter: "D", text: "all mechanisms operating in the compressed form" }
    ],
    correctAnswer: "D",
    explanation: "Brachylogy (compressed expression) works through ellipsis requiring inference (A), proverbial resonance (B), and implicit proportionality (C)—all in minimal form.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  // Difficulty 10 - Master Level
  {
    id: "exp031",
    question: "The passage's deployment of mise en abyme—a narrative containing its own miniature version—creates:",
    options: [
      { letter: "A", text: "recursive self-reference problematizing representation" },
      { letter: "B", text: "infinite regress suggesting the impossibility of closure" },
      { letter: "C", text: "meta-textual commentary on the nature of storytelling" },
      { letter: "D", text: "all effects operating in productive tension" }
    ],
    correctAnswer: "D",
    explanation: "Mise en abyme (story within story mirroring the whole) creates recursive self-reference (A), suggests infinite regress (B), and comments meta-textually (C) simultaneously.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Structure",
    difficultyRating: 10
  },
  {
    id: "exp032",
    question: "The author's paralepsis ('I will pass over in silence his criminal record') combines with apophasis to create:",
    options: [
      { letter: "A", text: "double negation that emphatically affirms" },
      { letter: "B", text: "rhetorical plausible deniability" },
      { letter: "C", text: "ironic performance of restraint that exercises none" },
      { letter: "D", text: "all functions in layered operation" }
    ],
    correctAnswer: "D",
    explanation: "Paralepsis and apophasis together (mentioning while claiming not to) create emphatic affirmation (A), deniability (B), and ironic non-restraint (C) in layered rhetoric.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 10
  },
  {
    id: "exp033",
    question: "The text's sustained metalepsis—transgressing narrative levels where the narrator addresses characters or vice versa—functions to:",
    options: [
      { letter: "A", text: "destabilize the ontological boundaries of fiction" },
      { letter: "B", text: "foreground the constructedness of narrative" },
      { letter: "C", text: "invite reflection on reader-text-author relationships" },
      { letter: "D", text: "achieve all postmodern effects simultaneously" }
    ],
    correctAnswer: "D",
    explanation: "Metaleptic transgression (crossing narrative levels) destabilizes ontology (A), foregrounds construction (B), and problematizes reader relations (C)—key postmodern strategies.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Theory",
    difficultyRating: 10
  },
  {
    id: "exp034",
    question: "The passage's analepsis embedded within prolepsis (flashback within flash-forward) creates:",
    options: [
      { letter: "A", text: "temporal complexity mirroring psychological experience" },
      { letter: "B", text: "narrative layering that problematizes linear causation" },
      { letter: "C", text: "readerly disorientation as deliberate aesthetic effect" },
      { letter: "D", text: "all effects serving the narrative's thematic concerns" }
    ],
    correctAnswer: "D",
    explanation: "Embedded temporal shifts (flashback in flash-forward) create psychological complexity (A), problematize causation (B), and disorient deliberately (C)—serving theme.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Temporality",
    difficultyRating: 10
  },
  {
    id: "exp035",
    question: "The author's deployment of Bakhtinian heteroglossia—multiple social voices in tension—demonstrates:",
    options: [
      { letter: "A", text: "the novel's unique capacity for dialogic representation" },
      { letter: "B", text: "ideological conflict materialized in linguistic diversity" },
      { letter: "C", text: "resistance to monologic authority through polyphony" },
      { letter: "D", text: "all theoretical implications in textual practice" }
    ],
    correctAnswer: "D",
    explanation: "Heteroglossia (multiple social voices) embodies dialogic capacity (A), materializes ideological conflict (B), and resists monologism (C)—Bakhtin's theory in practice.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Literary Theory",
    difficultyRating: 10
  },
  {
    id: "exp036",
    question: "The passage's use of ergative constructions ('The door opened' rather than 'Someone opened the door') systematically:",
    options: [
      { letter: "A", text: "effaces agency to create atmosphere of inevitability" },
      { letter: "B", text: "shifts focus from actor to affected entity" },
      { letter: "C", text: "creates syntactic ambiguity between active and middle voice" },
      { letter: "D", text: "all effects operating as stylistic choice" }
    ],
    correctAnswer: "D",
    explanation: "Ergative constructions (presenting the patient as subject) efface agency (A), shift focus (B), and create voice ambiguity (C)—deliberate stylistic strategy.",
    difficulty: "Hard",
    domain: "Standard English Conventions",
    skill: "Advanced Grammar",
    difficultyRating: 10
  },
  {
    id: "exp037",
    question: "The text's sustained focalization through an unreliable focalizer whose limitations are signaled through free indirect discourse creates:",
    options: [
      { letter: "A", text: "dramatic irony where readers perceive what the focalizer cannot" },
      { letter: "B", text: "epistemological uncertainty about narrative truth" },
      { letter: "C", text: "ethical complexity requiring reader judgment" },
      { letter: "D", text: "all narratological effects in productive interplay" }
    ],
    correctAnswer: "D",
    explanation: "Unreliable focalization via FID creates dramatic irony (A), epistemological uncertainty (B), and ethical complexity (C)—narratologically sophisticated effects interplay.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Perspective",
    difficultyRating: 10
  },
  {
    id: "exp038",
    question: "The author's sustained use of parataxis in a passage describing trauma functions as:",
    options: [
      { letter: "A", text: "mimetic representation of fragmented consciousness" },
      { letter: "B", text: "syntactic enactment of dissociation" },
      { letter: "C", text: "refusal of causal logic that would impose meaning on meaninglessness" },
      { letter: "D", text: "all effects contributing to trauma aesthetics" }
    ],
    correctAnswer: "D",
    explanation: "Parataxis (simple coordination without subordination) in trauma representation mimics fragmentation (A), enacts dissociation (B), and refuses false causation (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Stylistic Analysis",
    difficultyRating: 10
  },
  {
    id: "exp039",
    question: "The passage's sustained antiphrasis (saying the opposite of what is meant) operates differently from simple irony in that:",
    options: [
      { letter: "A", text: "it maintains the opposite meaning throughout extended discourse" },
      { letter: "B", text: "it requires shared understanding of the actual situation" },
      { letter: "C", text: "it creates a parallel text that must be continuously inverted" },
      { letter: "D", text: "all distinctions characterize the sustained figure" }
    ],
    correctAnswer: "D",
    explanation: "Extended antiphrasis differs from momentary irony by maintaining inversion (A), requiring situation knowledge (B), and creating parallel inverted text (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 10
  },
  {
    id: "exp040",
    question: "The text's deployment of sylleptic focalisation—simultaneous access to multiple characters' interiorities—achieves:",
    options: [
      { letter: "A", text: "omniscient perspective that transcends individual limitation" },
      { letter: "B", text: "thematic emphasis on intersubjective connection" },
      { letter: "C", text: "formal representation of empathic or telepathic states" },
      { letter: "D", text: "effects that depend on the narrative's specific concerns" }
    ],
    correctAnswer: "D",
    explanation: "Sylleptic focalization (multiple simultaneous internal views) can suggest omniscience (A), connection (B), or special states (C)—meaning depends on specific narrative.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Theory",
    difficultyRating: 10
  },
  {
    id: "exp041",
    question: "The passage's systematic catachresis—applying terms where no proper term exists—in describing ineffable experience demonstrates:",
    options: [
      { letter: "A", text: "language straining against its own limits" },
      { letter: "B", text: "the necessary impropriety of representing the unrepresentable" },
      { letter: "C", text: "creative violence to linguistic convention in service of expression" },
      { letter: "D", text: "all aspects of the figure's function in limit-cases" }
    ],
    correctAnswer: "D",
    explanation: "Catachresis for ineffable experience shows language straining (A), necessary impropriety (B), and creative violence (C)—the figure's power at representation's limits.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 10
  },
  {
    id: "exp042",
    question: "The author's use of proleptic irony—where the narrator's foreknowledge creates dramatic irony for the reader—functions to:",
    options: [
      { letter: "A", text: "create tension between character ignorance and reader knowledge" },
      { letter: "B", text: "problematize the teleology of narrative" },
      { letter: "C", text: "foreground the constructed, retrospective nature of storytelling" },
      { letter: "D", text: "all effects operating in the temporal structure" }
    ],
    correctAnswer: "D",
    explanation: "Proleptic irony (narrator's foreknowledge creating reader-character gap) generates tension (A), problematizes teleology (B), and foregrounds construction (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Theory",
    difficultyRating: 10
  },
  {
    id: "exp043",
    question: "The passage's extended prosopopoeia—sustained speech by abstract concepts or inanimate objects—differs from simple personification in:",
    options: [
      { letter: "A", text: "its commitment to maintaining the voice throughout" },
      { letter: "B", text: "its exploration of non-human perspective" },
      { letter: "C", text: "its creation of an alternative subject position" },
      { letter: "D", text: "all dimensions of the extended figure" }
    ],
    correctAnswer: "D",
    explanation: "Extended prosopopoeia (sustained non-human speech) differs from brief personification in commitment (A), perspective exploration (B), and subject position creation (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 10
  },
  {
    id: "exp044",
    question: "The text's deployment of anachronism—deliberate temporal displacement—in historical narrative serves to:",
    options: [
      { letter: "A", text: "defamiliarize the past through temporal disruption" },
      { letter: "B", text: "comment on the present through historical parallax" },
      { letter: "C", text: "problematize the very possibility of accessing the past 'as it was'" },
      { letter: "D", text: "all historiographical implications" }
    ],
    correctAnswer: "D",
    explanation: "Deliberate anachronism defamiliarizes (A), comments on the present (B), and problematizes historical access (C)—sophisticated historiographical strategy.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Literary Theory",
    difficultyRating: 10
  },
  {
    id: "exp045",
    question: "The passage's sustained hyperbaton—extreme displacement of words from normal order—creates:",
    options: [
      { letter: "A", text: "defamiliarization requiring active syntactic reconstruction" },
      { letter: "B", text: "emphasis through positional foregrounding" },
      { letter: "C", text: "poetic register through syntactic marked" },
      { letter: "D", text: "all effects of the transgressive word order" }
    ],
    correctAnswer: "D",
    explanation: "Sustained hyperbaton (word-order displacement) defamiliarizes (A), emphasizes through position (B), and creates poetic register (C)—effects of syntactic transgression.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic Analysis",
    difficultyRating: 10
  },
  {
    id: "exp046",
    question: "The author's use of the 'unreliable narrator' whose unreliability is conveyed solely through stylistic markers (no contradicting evidence) creates:",
    options: [
      { letter: "A", text: "readerly suspicion based on textual performance" },
      { letter: "B", text: "interpretive indeterminacy about reliability itself" },
      { letter: "C", text: "ethical complexity—is distrust of voice justified?" },
      { letter: "D", text: "all hermeneutic challenges simultaneously" }
    ],
    correctAnswer: "D",
    explanation: "Style-only unreliability signals create suspicion (A), indeterminacy (B), and ethical complexity about distrusting voice (C)—hermeneutic challenges compound.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Voice",
    difficultyRating: 10
  },
  {
    id: "exp047",
    question: "The text's sustained auxesis—arrangement from lesser to greater—differs from mere climax in:",
    options: [
      { letter: "A", text: "its emphasis on proportional gradation rather than simple culmination" },
      { letter: "B", text: "its potential for hyperbolic exaggeration of scale" },
      { letter: "C", text: "its creation of crescendo effect across extended passage" },
      { letter: "D", text: "all dimensions of the amplificatory pattern" }
    ],
    correctAnswer: "D",
    explanation: "Auxesis (lesser-to-greater arrangement) differs from climax in emphasizing gradation (A), risking hyperbole (B), and creating extended crescendo (C).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 10
  },
  {
    id: "exp048",
    question: "The passage's embedding of diegetic discourse (character speech) within mimetic action within extradiegetic narration creates:",
    options: [
      { letter: "A", text: "layered ontological levels requiring tracking" },
      { letter: "B", text: "productive interference between narrative planes" },
      { letter: "C", text: "complex representation of consciousness and action" },
      { letter: "D", text: "all narratological complexities operating together" }
    ],
    correctAnswer: "D",
    explanation: "Embedded narrative levels (speech within action within narration) create layers (A), interference (B), and complex consciousness representation (C)—all operating.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Structure",
    difficultyRating: 10
  },
  {
    id: "exp049",
    question: "The author's sustained use of appositive constructions that defer main clause completion models:",
    options: [
      { letter: "A", text: "the deferral of meaning characteristic of language itself" },
      { letter: "B", text: "Derridean différance in syntactic form" },
      { letter: "C", text: "the impossibility of final predication" },
      { letter: "D", text: "philosophical implications in grammatical structure" }
    ],
    correctAnswer: "D",
    explanation: "Appositive deferral of completion can model language's deferral (A), différance (B), and predication impossibility (C)—grammar instantiating philosophy.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic-Philosophical Analysis",
    difficultyRating: 10
  },
  {
    id: "exp050",
    question: "The text's complex deployment of enallage—substitution of one grammatical form for another—in 'The rich is always with us' (singular for plural) creates:",
    options: [
      { letter: "A", text: "conceptual abstraction from individuals to class" },
      { letter: "B", text: "biblical/proverbial register through archaic usage" },
      { letter: "C", text: "defamiliarization that prompts reflection on category" },
      { letter: "D", text: "all effects of the grammatical substitution" }
    ],
    correctAnswer: "D",
    explanation: "Enallage (grammatical substitution—here singular for plural) abstracts (A), invokes registers (B), and defamiliarizes (C)—the substitution serves multiple functions.",
    difficulty: "Hard",
    domain: "Standard English Conventions",
    skill: "Advanced Grammar",
    difficultyRating: 10
  }
];
