import { EnglishQuestion } from './englishQuestions';

// Expert-level English questions (difficulty 8-10) - Rebalanced answer distribution
export const expertEnglishQuestions: EnglishQuestion[] = [
  // Difficulty 8 - Advanced Analysis
  {
    id: "exp001",
    question: "The author's use of zeugma in the phrase 'She lowered her standards and her neckline' serves to:",
    options: [
      { letter: "A", text: "establish a satirical tone through wordplay" },
      { letter: "B", text: "emphasize the character's moral decline" },
      { letter: "C", text: "illustrate the narrator's disapproval" },
      { letter: "D", text: "create humor through unexpected pairing of abstract and concrete" }
    ],
    correctAnswer: "A",
    explanation: "Zeugma pairs disparate concepts under one verb for satirical effect. While D notes the technique, A captures the broader rhetorical purpose of establishing satire.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp002",
    question: "In the context of the passage, the phrase 'conspicuous by its absence' functions as:",
    options: [
      { letter: "A", text: "a litotes understating the significance of omission" },
      { letter: "B", text: "an oxymoron highlighting paradoxical visibility" },
      { letter: "C", text: "an apophasis drawing attention through denial" },
      { letter: "D", text: "a paraprosdokian subverting expectations" }
    ],
    correctAnswer: "B",
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
      { letter: "A", text: "establish thematic coherence across clauses" },
      { letter: "B", text: "create rhythmic emphasis through terminal repetition" },
      { letter: "C", text: "reinforce the inevitability of the conclusion" },
      { letter: "D", text: "demonstrate mastery of classical rhetoric" }
    ],
    correctAnswer: "C",
    explanation: "Epistrophe (ending repetition) creates rhythm, builds thematic unity, and most importantly emphasizes inevitability—the conclusion feels inescapable.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Patterns",
    difficultyRating: 8
  },
  {
    id: "exp004",
    question: "Which revision most effectively employs periodic sentence structure to build suspense?\n\nOriginal: 'The detective finally revealed the murderer after questioning all suspects, reviewing evidence, and considering every possibility.'",
    options: [
      { letter: "A", text: "The detective, after questioning all suspects, finally revealed the murderer." },
      { letter: "B", text: "Finally, after all the questioning and reviewing, the murderer was revealed by the detective." },
      { letter: "C", text: "Questioning suspects, reviewing evidence, considering possibilities—the detective revealed the murderer." },
      { letter: "D", text: "After questioning all suspects, reviewing evidence, and considering every possibility, the detective finally revealed the murderer." }
    ],
    correctAnswer: "D",
    explanation: "Periodic sentences delay the main clause until the end, building suspense. D places all subordinate elements first, withholding the revelation until the final position.",
    difficulty: "Hard",
    domain: "Expression of Ideas",
    skill: "Sentence Structure",
    difficultyRating: 8
  },
  {
    id: "exp005",
    question: "The passage's shift from paratactic to hypotactic syntax in the final section suggests:",
    options: [
      { letter: "A", text: "a transition from observation to analysis" },
      { letter: "B", text: "increasing complexity of thought" },
      { letter: "C", text: "the narrator's growing uncertainty" },
      { letter: "D", text: "a movement from action to reflection" }
    ],
    correctAnswer: "A",
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
      { letter: "A", text: "emotional escalation via structural mirroring" },
      { letter: "B", text: "logical progression through linked repetition" },
      { letter: "C", text: "causal chain emphasized by terminal-initial echo" },
      { letter: "D", text: "rhythmic momentum building toward climax" }
    ],
    correctAnswer: "B",
    explanation: "Anadiplosis (repeating the end of one clause at the start of the next) creates logical progression through linked repetition, making the causal sequence feel inevitable.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp007",
    question: "Which choice best describes the function of the em-dash in: 'The solution—if one could call it that—satisfied no one'?",
    options: [
      { letter: "A", text: "emphatic interruption signaling doubt" },
      { letter: "B", text: "dramatic pause heightening skepticism" },
      { letter: "C", text: "syntactic isolation of conditional hedging" },
      { letter: "D", text: "parenthetical qualification undermining the noun" }
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
      { letter: "B", text: "emphasize geographical comprehensiveness" },
      { letter: "C", text: "establish parallel grammatical rhythm" },
      { letter: "D", text: "build cumulative rhetorical force" }
    ],
    correctAnswer: "D",
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
      { letter: "D", text: "parallel structure with inverted word order" }
    ],
    correctAnswer: "A",
    explanation: "Chiasmus works through syntactic inversion that creates a memorable contrast. The reversal pattern makes the message stick in the reader's mind.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 8
  },
  {
    id: "exp010",
    question: "The strategic use of asyndeton in 'I came, I saw, I conquered' creates:",
    options: [
      { letter: "A", text: "emphatic separation of distinct achievements" },
      { letter: "B", text: "breathless pace suggesting swift action" },
      { letter: "C", text: "rhetorical compression mirroring military efficiency" },
      { letter: "D", text: "staccato rhythm emphasizing each verb" }
    ],
    correctAnswer: "B",
    explanation: "Asyndeton (omitting conjunctions) creates a breathless pace suggesting swift action—the lack of 'and' between clauses speeds the rhythm dramatically.",
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
      { letter: "B", text: "If I am wealthy, I will donate more to charity." },
      { letter: "C", text: "If I were wealthy, I would donate more to charity." },
      { letter: "D", text: "If I be wealthy, I would donate more to charity." }
    ],
    correctAnswer: "C",
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
      { letter: "B", text: "suggest overwhelming accumulation of forces" },
      { letter: "C", text: "create biblical or epic register" },
      { letter: "D", text: "establish a formal, elevated tone" }
    ],
    correctAnswer: "D",
    explanation: "Polysyndeton (repeated conjunctions) establishes a formal, elevated tone that contrasts with journalistic prose, evoking biblical and classical traditions.",
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
      { letter: "A", text: "suggest reluctance overcome by other factors" },
      { letter: "B", text: "express cautious affirmation through double negative" },
      { letter: "C", text: "maintain formal register through understatement" },
      { letter: "D", text: "create ambiguity about the subject's true feelings" }
    ],
    correctAnswer: "B",
    explanation: "Litotes (understatement via negation) expresses cautious affirmation through double negative, conveying willingness while maintaining restraint.",
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
      { letter: "D", text: "formal disruption reflecting psychological fragmentation" }
    ],
    correctAnswer: "A",
    explanation: "Anacoluthon (grammatical break mid-sentence) mimics interrupted thought—the syntactic rupture directly performs the mental interruption it describes.",
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
      { letter: "D", text: "subtle attack disguised as restraint" }
    ],
    correctAnswer: "B",
    explanation: "Praeteritio (mentioning by claiming not to mention) provides plausible deniability while making accusations—the speaker can claim they didn't make the charge.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp019",
    question: "The strategic placement of a syllepsis in 'She took his advice and his wallet' creates:",
    options: [
      { letter: "A", text: "comedic bathos through unexpected descent" },
      { letter: "B", text: "characterization through juxtaposed actions" },
      { letter: "C", text: "zeugmatic yoking of abstract and concrete under one verb" },
      { letter: "D", text: "ironic contrast between trust and betrayal" }
    ],
    correctAnswer: "C",
    explanation: "Syllepsis (one word in different senses with two objects) achieves zeugmatic yoking—'took' means different things with 'advice' (followed) versus 'wallet' (stole).",
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
      { letter: "D", text: "blur the boundary between animate and inanimate" }
    ],
    correctAnswer: "A",
    explanation: "Catachresis deliberately violates categorical boundaries to personify nature—attributing human voice to wind where no proper term exists.",
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
      { letter: "D", text: "inverted sequence reflecting disoriented mental state" }
    ],
    correctAnswer: "B",
    explanation: "Hysteron proteron (putting the logically later thing first) creates anti-climax here—the sequence moves from death to lesser states, suggesting consciousness fading.",
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
      { letter: "D", text: "demonstrate intellectual humility" }
    ],
    correctAnswer: "C",
    explanation: "Aporia (expression of doubt) here suggests the inadequacy of binary categories—the speaker indicates that neither term fully captures the complexity.",
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
      { letter: "D", text: "progressive specification from general to precise" }
    ],
    correctAnswer: "A",
    explanation: "Epanorthosis (self-correction) intensifies rather than retracts—'reckless' is stronger than 'brave,' so the correction escalates the characterization.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp025",
    question: "The passage's elaborate periphrasis ('the rosy-fingered herald of dawn' for 'sunrise') functions to:",
    options: [
      { letter: "A", text: "demonstrate the speaker's classical education" },
      { letter: "B", text: "elevate register through Homeric allusion" },
      { letter: "C", text: "slow perception to match the phenomenon described" },
      { letter: "D", text: "add visual imagery to abstract concept" }
    ],
    correctAnswer: "B",
    explanation: "Periphrasis (circumlocution) elevates register through Homeric allusion—'rosy-fingered' echoes Homer's famous epithet, lending classical weight.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Figurative Language",
    difficultyRating: 9
  },
  {
    id: "exp026",
    question: "The syntactic embedding in 'The theory that the hypothesis which the data supports may be false is controversial' creates:",
    options: [
      { letter: "A", text: "center-embedding that strains processing capacity" },
      { letter: "B", text: "performative demonstration of cognitive limits" },
      { letter: "C", text: "deliberate difficulty mirroring conceptual complexity" },
      { letter: "D", text: "hierarchical structure reflecting nested relationships" }
    ],
    correctAnswer: "A",
    explanation: "Multiple center-embeddings strain processing capacity—readers must hold multiple incomplete clauses in memory, creating genuine cognitive difficulty.",
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
      { letter: "D", text: "colloquial emphasis through expletive insertion" }
    ],
    correctAnswer: "D",
    explanation: "Tmesis (word-splitting insertion) achieves colloquial emphasis through expletive insertion—the interruption intensifies the adverb dramatically.",
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
      { letter: "D", text: "debate structure without human interlocutors" }
    ],
    correctAnswer: "B",
    explanation: "Prosopopoeia externalizes internal moral conflict—by giving voice to abstract virtues, the passage dramatizes the competing claims within a moral dilemma.",
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
      { letter: "D", text: "it produces a proverbial or aphoristic quality" }
    ],
    correctAnswer: "A",
    explanation: "Antimetabole differs from chiasmus by repeating actual words—'tough' and 'going' appear twice, whereas chiasmus merely reverses grammatical structure.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 9
  },
  {
    id: "exp030",
    question: "A brachylogy such as 'The more, the merrier' achieves its effect primarily through:",
    options: [
      { letter: "A", text: "elliptical compression requiring inferential completion" },
      { letter: "B", text: "proverbial form suggesting universal wisdom" },
      { letter: "C", text: "comparative structure implying proportional relationship" },
      { letter: "D", text: "memorable brevity enhancing quotability" }
    ],
    correctAnswer: "C",
    explanation: "Brachylogy (compressed expression) implies proportional relationship—'the more [people], the merrier [the occasion]' suggests direct correlation between variables.",
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
      { letter: "D", text: "structural mirroring between embedded and framing narratives" }
    ],
    correctAnswer: "D",
    explanation: "Mise en abyme (story within story mirroring the whole) creates structural mirroring—the embedded narrative reflects and comments on the framing narrative.",
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
      { letter: "D", text: "accusation disguised as diplomatic omission" }
    ],
    correctAnswer: "C",
    explanation: "Paralepsis and apophasis together perform restraint ironically—the speaker claims silence while actually speaking, exercising no restraint at all.",
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
      { letter: "D", text: "create postmodern self-awareness in the text" }
    ],
    correctAnswer: "A",
    explanation: "Metaleptic transgression (crossing narrative levels) destabilizes ontological boundaries—characters and narrator exist on supposedly separate levels that metalepsis violates.",
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
      { letter: "D", text: "chronological disruption emphasizing memory's non-linearity" }
    ],
    correctAnswer: "B",
    explanation: "Embedded temporal shifts (flashback in flash-forward) problematize linear causation—events no longer follow simple cause-effect sequence when time is nested.",
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
      { letter: "D", text: "democratic multiplicity of perspective within single text" }
    ],
    correctAnswer: "A",
    explanation: "Heteroglossia (multiple social voices) embodies dialogic capacity—Bakhtin argued this capacity distinguishes the novel from monologic genres like epic.",
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
      { letter: "D", text: "suggests events occurring without human causation" }
    ],
    correctAnswer: "A",
    explanation: "Ergative constructions (presenting the patient as subject) efface agency—by removing the actor, events seem to happen inevitably, without human intervention.",
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
      { letter: "D", text: "gap between character perception and textual reality" }
    ],
    correctAnswer: "A",
    explanation: "Unreliable focalization via FID creates dramatic irony—readers perceive the focalizer's limitations while the focalizer remains unaware of them.",
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
      { letter: "D", text: "formal resistance to narrative coherence" }
    ],
    correctAnswer: "C",
    explanation: "Parataxis (simple coordination without subordination) in trauma representation refuses causal logic—by avoiding subordination, the prose resists imposing meaning on meaninglessness.",
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
      { letter: "D", text: "it demands sustained interpretive vigilance from readers" }
    ],
    correctAnswer: "D",
    explanation: "Extended antiphrasis demands sustained interpretive vigilance—readers must continuously invert meaning across extended passages, unlike momentary ironic flashes.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Rhetorical Devices",
    difficultyRating: 10
  },
  {
    id: "exp040",
    question: "The text's deployment of sylleptic focalization—simultaneous access to multiple characters' interiorities—achieves:",
    options: [
      { letter: "A", text: "omniscient perspective that transcends individual limitation" },
      { letter: "B", text: "thematic emphasis on intersubjective connection" },
      { letter: "C", text: "formal representation of empathic or telepathic states" },
      { letter: "D", text: "narrative authority encompassing multiple consciousnesses" }
    ],
    correctAnswer: "B",
    explanation: "Sylleptic focalization (multiple simultaneous internal views) emphasizes intersubjective connection—characters' interiorities are presented as linked or resonant.",
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
      { letter: "D", text: "approximation as the only available strategy for the ineffable" }
    ],
    correctAnswer: "A",
    explanation: "Catachresis for ineffable experience shows language straining against its own limits—when no proper term exists, language must extend itself improperly.",
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
      { letter: "D", text: "generate anticipatory dread through foreshadowing" }
    ],
    correctAnswer: "C",
    explanation: "Proleptic irony foregrounds storytelling's constructed, retrospective nature—the narrator's foreknowledge reminds readers that events are being shaped after the fact.",
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
      { letter: "D", text: "its transformation of figure into character" }
    ],
    correctAnswer: "D",
    explanation: "Extended prosopopoeia transforms figure into character—sustained non-human speech develops the abstract concept or object into a full-fledged speaking presence.",
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
      { letter: "D", text: "highlight the constructed nature of historical representation" }
    ],
    correctAnswer: "B",
    explanation: "Anachronism in historical narrative comments on the present through historical parallax—the temporal displacement creates perspective on contemporary issues.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Temporality",
    difficultyRating: 10
  },
  {
    id: "exp045",
    question: "The author's sustained use of hyperbaton (unusual word order) throughout the passage creates:",
    options: [
      { letter: "A", text: "defamiliarization that slows reading and heightens attention" },
      { letter: "B", text: "poetic register distinguishing the text from everyday prose" },
      { letter: "C", text: "emphasis on displaced elements through positional foregrounding" },
      { letter: "D", text: "syntactic complexity requiring careful parsing" }
    ],
    correctAnswer: "A",
    explanation: "Sustained hyperbaton defamiliarizes language, slowing reading and heightening attention—unusual word order prevents automatic processing.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Syntactic Analysis",
    difficultyRating: 10
  },
  {
    id: "exp046",
    question: "The passage's deployment of the 'unreliable narrator' trope is complicated by the presence of an 'implied author' whose values differ from the narrator's, creating:",
    options: [
      { letter: "A", text: "layered irony requiring readers to navigate multiple perspectives" },
      { letter: "B", text: "normative guidance despite narrator's distortions" },
      { letter: "C", text: "ethical framework against which to measure narrator's limitations" },
      { letter: "D", text: "stable interpretive ground outside the narration" }
    ],
    correctAnswer: "B",
    explanation: "The implied author provides normative guidance despite narrator's distortions—readers sense authorial values that diverge from and correct the narrator's.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Theory",
    difficultyRating: 10
  },
  {
    id: "exp047",
    question: "The text's systematic disruption of collocations (expected word pairings) achieves:",
    options: [
      { letter: "A", text: "cognitive jolt that refreshes perception of familiar concepts" },
      { letter: "B", text: "poetic estrangement through violated expectations" },
      { letter: "C", text: "demonstration that language constrains thought" },
      { letter: "D", text: "liberation from automatic phraseology" }
    ],
    correctAnswer: "A",
    explanation: "Disrupted collocations achieve cognitive jolt that refreshes perception—when expected pairings are violated, readers must think about words they normally process automatically.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Stylistic Analysis",
    difficultyRating: 10
  },
  {
    id: "exp048",
    question: "The author's use of 'narrative metalepsis'—where characters seem aware of being in a story—creates:",
    options: [
      { letter: "A", text: "ontological vertigo as fiction's boundaries become uncertain" },
      { letter: "B", text: "comic effect through violated convention" },
      { letter: "C", text: "philosophical meditation on the nature of reality" },
      { letter: "D", text: "self-aware play with narrative conventions" }
    ],
    correctAnswer: "D",
    explanation: "Narrative metalepsis creates self-aware play with narrative conventions—characters' awareness of their fictionality plays with the rules of storytelling.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Narrative Theory",
    difficultyRating: 10
  },
  {
    id: "exp049",
    question: "The passage's extended use of the 'pathetic fallacy'—attributing human emotions to nature—in a postmodern text functions differently than in Romantic poetry because:",
    options: [
      { letter: "A", text: "it is deployed ironically, aware of its own artificiality" },
      { letter: "B", text: "it critiques rather than endorses the human-nature connection" },
      { letter: "C", text: "it foregrounds the figure as figure rather than as natural perception" },
      { letter: "D", text: "it questions the validity of anthropomorphic projection" }
    ],
    correctAnswer: "C",
    explanation: "Postmodern pathetic fallacy foregrounds the figure as figure—unlike Romantic usage where nature 'naturally' reflects feeling, postmodern use shows the device as constructed.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Literary History",
    difficultyRating: 10
  },
  {
    id: "exp050",
    question: "The text's strategic deployment of 'floating signifiers'—terms whose meaning shifts depending on context—creates:",
    options: [
      { letter: "A", text: "semantic instability that mirrors thematic concerns about meaning" },
      { letter: "B", text: "interpretive difficulty requiring active reader construction" },
      { letter: "C", text: "polysemy that enriches rather than confuses" },
      { letter: "D", text: "deliberate ambiguity resisting single interpretation" }
    ],
    correctAnswer: "A",
    explanation: "Floating signifiers create semantic instability mirroring thematic concerns—if the text is about unstable meaning, shifting word meanings enact that theme formally.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Literary Theory",
    difficultyRating: 10
  }
];
