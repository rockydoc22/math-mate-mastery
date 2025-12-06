import { EnglishQuestion } from './englishQuestions';
import { rateDifficulty } from '@/utils/difficultyRating';

// Helper to add difficulty ratings
function addRating(q: Omit<EnglishQuestion, 'difficultyRating'>): EnglishQuestion {
  return {
    ...q,
    difficultyRating: rateDifficulty(q.question, q.options, q.domain, q.skill)
  };
}

// Uploaded English questions from HTML files
export const uploadedEnglishQuestions: EnglishQuestion[] = [
  addRating({
    id: "ueng001",
    question: "Which sentence best maintains parallel structure?",
    options: [
      { letter: "A", text: "She likes running, to swim, and biking." },
      { letter: "B", text: "She likes to run, to swim, and to bike." },
      { letter: "C", text: "She likes running, swimming, and to bike." },
      { letter: "D", text: "She likes to run, swimming, and biking." }
    ],
    correctAnswer: "B",
    explanation: "Parallel structure requires consistent grammatical forms. Option B uses 'to + verb' consistently for all three activities.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Parallel Structure"
  }),
  addRating({
    id: "ueng002",
    question: "Based on the table, which word best fits the context?",
    options: [
      { letter: "A", text: "elated" },
      { letter: "B", text: "melancholy" },
      { letter: "C", text: "neutral" },
      { letter: "D", text: "furious" }
    ],
    correctAnswer: "A",
    explanation: "The tone in the passage is positive and joyful. 'Elated' means extremely happy, which matches the positive context.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Vocabulary in Context"
  }),
  addRating({
    id: "ueng003",
    question: "Which revision improves sentence clarity?",
    options: [
      { letter: "A", text: "Due to the fact that he was late, he missed the bus." },
      { letter: "B", text: "Because he was late, he missed the bus." },
      { letter: "C", text: "He missed the bus because of his lateness." },
      { letter: "D", text: "He was late, therefore he missed the bus." }
    ],
    correctAnswer: "B",
    explanation: "Concise wording improves clarity. 'Because' is more direct than 'Due to the fact that' and the sentence structure is cleaner.",
    difficulty: "Easy",
    domain: "Writing",
    skill: "Concision"
  }),
  addRating({
    id: "ueng004",
    question: "Which choice best completes the sentence logically?",
    options: [
      { letter: "A", text: "Although the data were inconclusive," },
      { letter: "B", text: "Because the data were inconclusive," },
      { letter: "C", text: "Since the data were conclusive," },
      { letter: "D", text: "Despite the data being conclusive," }
    ],
    correctAnswer: "A",
    explanation: "The sentence suggests a contrast. 'Although' introduces a contrasting idea, indicating the action proceeded despite the inconclusive data.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Transitions"
  }),
  addRating({
    id: "ueng005",
    question: "Which sentence uses correct subject-verb agreement?",
    options: [
      { letter: "A", text: "The list of items are on the desk." },
      { letter: "B", text: "The list of items is on the desk." },
      { letter: "C", text: "The items in the list is on the desk." },
      { letter: "D", text: "The items in the list has been on the desk." }
    ],
    correctAnswer: "B",
    explanation: "The subject is 'list,' which is singular. Therefore, the singular verb 'is' must be used, not the plural 'are.'",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Subject-Verb Agreement"
  }),
  // New linguistics-themed reading comprehension questions (Rating 5-7)
  addRating({
    id: "ueng006",
    question: "In the context of the passage, which choice best describes the author's attitude toward prescriptive grammar rules?",
    options: [
      { letter: "A", text: "They are essential for clarity and precision." },
      { letter: "B", text: "They are outdated and hinder linguistic evolution." },
      { letter: "C", text: "They serve as flexible guidelines rather than strict laws." },
      { letter: "D", text: "They are irrelevant in academic discourse." }
    ],
    correctAnswer: "C",
    explanation: "The passage suggests that prescriptive rules should be viewed as adaptable, not rigid, aligning with choice C.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Author's Purpose"
  }),
  addRating({
    id: "ueng007",
    question: "Which choice best supports the claim that language standardization is influenced by social hierarchy?",
    options: [
      { letter: "A", text: "Dialects often emerge in isolated communities." },
      { letter: "B", text: "Prestige forms of language are adopted by those seeking upward mobility." },
      { letter: "C", text: "Linguistic diversity is a sign of cultural richness." },
      { letter: "D", text: "Language change is primarily driven by technological innovation." }
    ],
    correctAnswer: "B",
    explanation: "The claim relates to social hierarchy; adopting prestige forms for upward mobility directly supports it.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Evidence and Support"
  }),
  addRating({
    id: "ueng008",
    question: "Which choice best describes the rhetorical effect of juxtaposing colloquial and formal diction in the passage?",
    options: [
      { letter: "A", text: "It undermines the credibility of the argument." },
      { letter: "B", text: "It emphasizes the tension between spoken and written norms." },
      { letter: "C", text: "It creates a humorous tone that trivializes the issue." },
      { letter: "D", text: "It signals the author's indecision about linguistic standards." }
    ],
    correctAnswer: "B",
    explanation: "Juxtaposing colloquial and formal diction highlights the contrast between spoken and written norms, supporting choice B.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Rhetorical Analysis"
  }),
  addRating({
    id: "ueng009",
    question: "Which choice most effectively conveys the author's view on linguistic descriptivism?",
    options: [
      { letter: "A", text: "It erodes the foundation of language." },
      { letter: "B", text: "It acknowledges language as a dynamic system." },
      { letter: "C", text: "It imposes unnecessary constraints on writers." },
      { letter: "D", text: "It disregards historical linguistic norms." }
    ],
    correctAnswer: "B",
    explanation: "Descriptivism treats language as evolving and dynamic, aligning with choice B.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Author's Purpose"
  }),
  addRating({
    id: "ueng010",
    question: "Which choice best explains the author's use of statistical evidence in the passage?",
    options: [
      { letter: "A", text: "To illustrate the decline of formal writing in digital communication." },
      { letter: "B", text: "To argue that linguistic change is unpredictable." },
      { letter: "C", text: "To demonstrate the widespread acceptance of informal expressions." },
      { letter: "D", text: "To suggest that prescriptive norms remain dominant." }
    ],
    correctAnswer: "C",
    explanation: "Statistical evidence shows informal expressions are widely accepted, supporting choice C.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Evidence and Support"
  }),
  addRating({
    id: "ueng011",
    question: "Which choice best captures the author's stance on code-switching?",
    options: [
      { letter: "A", text: "It reflects linguistic inconsistency." },
      { letter: "B", text: "It is a strategic adaptation to social contexts." },
      { letter: "C", text: "It undermines language purity." },
      { letter: "D", text: "It is a symptom of inadequate education." }
    ],
    correctAnswer: "B",
    explanation: "The author views code-switching as a deliberate, strategic adaptation, supporting choice B.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Author's Purpose"
  }),
  addRating({
    id: "ueng012",
    question: "Which choice best explains the author's critique of linguistic purism?",
    options: [
      { letter: "A", text: "It fosters inclusivity and diversity." },
      { letter: "B", text: "It resists natural language evolution." },
      { letter: "C", text: "It promotes clarity and precision." },
      { letter: "D", text: "It encourages creative expression." }
    ],
    correctAnswer: "B",
    explanation: "The critique focuses on purism resisting natural evolution, aligning with choice B.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Author's Purpose"
  }),
  addRating({
    id: "ueng013",
    question: "Which choice best describes the author's purpose in contrasting written and spoken registers?",
    options: [
      { letter: "A", text: "To argue that spoken language is superior." },
      { letter: "B", text: "To highlight the adaptability of language across contexts." },
      { letter: "C", text: "To suggest that written norms should govern speech." },
      { letter: "D", text: "To claim that spoken language lacks complexity." }
    ],
    correctAnswer: "B",
    explanation: "Contrasting registers shows adaptability across contexts, supporting choice B.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Rhetorical Analysis"
  }),
  addRating({
    id: "ueng014",
    question: "Which choice best explains the author's use of historical examples of language change?",
    options: [
      { letter: "A", text: "To argue that language should remain static." },
      { letter: "B", text: "To illustrate that change is inevitable and recurring." },
      { letter: "C", text: "To show that past changes were detrimental." },
      { letter: "D", text: "To suggest that modern changes are unprecedented." }
    ],
    correctAnswer: "B",
    explanation: "Historical examples illustrate inevitability and recurrence of change, supporting choice B.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Evidence and Support"
  }),
  addRating({
    id: "ueng015",
    question: "Which choice best describes the author's view on linguistic innovation in digital media?",
    options: [
      { letter: "A", text: "It threatens the integrity of language." },
      { letter: "B", text: "It accelerates natural linguistic evolution." },
      { letter: "C", text: "It creates confusion and ambiguity." },
      { letter: "D", text: "It should be strictly regulated." }
    ],
    correctAnswer: "B",
    explanation: "Digital media accelerates evolution, aligning with choice B.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Author's Purpose"
  }),
  // Advanced passage-based reading comprehension (Rating 6-8)
  addRating({
    id: "ueng016",
    question: "In the realm of epistemology, the debate between foundationalism and coherentism persists as a central tension. Foundationalists argue that certain basic beliefs provide an indubitable bedrock for knowledge, whereas coherentists maintain that justification emerges from the mutual support among beliefs within a system.\n\nWhich choice best captures the primary purpose of the passage?",
    options: [
      { letter: "A", text: "To argue that coherentism offers a superior solution to the regress problem." },
      { letter: "B", text: "To describe two competing theories of epistemic justification and their respective challenges." },
      { letter: "C", text: "To demonstrate that foundationalism is untenable in modern philosophical discourse." },
      { letter: "D", text: "To propose a synthesis between foundationalism and coherentism as a resolution." }
    ],
    correctAnswer: "B",
    explanation: "The passage neutrally presents both foundationalism and coherentism, outlining their core claims and difficulties without endorsing one or proposing a synthesis.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Main Idea"
  }),
  addRating({
    id: "ueng017",
    question: "In literary theory, the concept of intertextuality posits that no text exists in isolation; rather, every work is a mosaic of quotations, influences, and cultural echoes. This perspective challenges traditional notions of authorship and originality.\n\nThe author's attitude toward intertextuality can best be described as:",
    options: [
      { letter: "A", text: "Skeptical, emphasizing its limitations in literary analysis." },
      { letter: "B", text: "Neutral, presenting it as one of many competing theories." },
      { letter: "C", text: "Affirmative, highlighting its transformative impact on concepts of authorship and meaning." },
      { letter: "D", text: "Critical, arguing that it undermines interpretive coherence." }
    ],
    correctAnswer: "C",
    explanation: "The passage frames intertextuality as a significant shift in literary theory, challenging traditional ideas and redefining interpretation, indicating an affirmative stance.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Author's Tone"
  }),
  addRating({
    id: "ueng018",
    question: "Economic models predicated on rational choice theory assume agents possess complete information and act to maximize utility. Behavioral economics, however, introduces cognitive biases and heuristics that systematically deviate from rationality.\n\nWhich choice best describes the relationship between rational choice theory and behavioral economics?",
    options: [
      { letter: "A", text: "Behavioral economics refines rational choice theory by incorporating empirical anomalies." },
      { letter: "B", text: "Rational choice theory invalidates the assumptions underlying behavioral economics." },
      { letter: "C", text: "Behavioral economics dismisses rational choice theory as entirely obsolete." },
      { letter: "D", text: "Rational choice theory and behavioral economics operate in unrelated domains." }
    ],
    correctAnswer: "A",
    explanation: "The passage indicates that behavioral economics builds upon and modifies rational choice theory by accounting for systematic deviations, not rejecting it wholesale.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Relationships"
  }),
  addRating({
    id: "ueng019",
    question: "In discussions of constitutional interpretation, originalism asserts that the meaning of the text is fixed at the time of enactment, whereas living constitutionalism contends that interpretation must adapt to evolving societal norms.\n\nThe author's primary purpose is to:",
    options: [
      { letter: "A", text: "Advocate for originalism as the most principled approach." },
      { letter: "B", text: "Critique living constitutionalism for enabling judicial overreach." },
      { letter: "C", text: "Compare two interpretive frameworks and note their respective strengths and criticisms." },
      { letter: "D", text: "Demonstrate that constitutional interpretation is inherently indeterminate." }
    ],
    correctAnswer: "C",
    explanation: "The passage juxtaposes originalism and living constitutionalism, presenting arguments and criticisms for each without endorsing one.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Author's Purpose"
  }),
  addRating({
    id: "ueng020",
    question: "In the philosophy of science, Kuhn's notion of paradigm shifts challenges the cumulative view of scientific progress. Rather than a linear accretion of knowledge, Kuhn posits episodic revolutions wherein prevailing frameworks are supplanted by incommensurable alternatives.\n\nWhich choice best captures the implication of Kuhn's theory?",
    options: [
      { letter: "A", text: "Scientific progress is gradual and predictable." },
      { letter: "B", text: "Paradigm shifts render previous scientific knowledge entirely irrelevant." },
      { letter: "C", text: "Scientific development involves radical changes that alter evaluative standards." },
      { letter: "D", text: "Kuhn's theory denies the possibility of objective scientific truth." }
    ],
    correctAnswer: "C",
    explanation: "The passage emphasizes that paradigm shifts transform evaluative criteria, indicating radical, not incremental, change.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Inference"
  }),
  addRating({
    id: "ueng021",
    question: "In sociolinguistics, the Sapir-Whorf hypothesis posits that language influences thought, suggesting that linguistic categories shape cognitive processes. While strong determinist interpretations have waned, contemporary research explores subtler forms of linguistic relativity.\n\nThe passage primarily serves to:",
    options: [
      { letter: "A", text: "Argue that linguistic determinism is empirically untenable." },
      { letter: "B", text: "Present the evolution of a hypothesis from strict determinism to nuanced relativity." },
      { letter: "C", text: "Demonstrate that language has no measurable impact on cognition." },
      { letter: "D", text: "Criticize contemporary research for overstating linguistic influence." }
    ],
    correctAnswer: "B",
    explanation: "The passage traces the shift from strong determinism to more nuanced investigations of linguistic relativity.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Main Idea"
  }),
  addRating({
    id: "ueng022",
    question: "In ethics, deontological frameworks prioritize adherence to duty over consequentialist calculations of utility. Kantian morality, for instance, grounds obligation in the categorical imperative, which demands actions be universalizable.\n\nWhich choice best describes the author's approach to deontological ethics?",
    options: [
      { letter: "A", text: "Condemnatory, portraying it as impractical in real-world scenarios." },
      { letter: "B", text: "Expository, outlining its principles and the debate surrounding them." },
      { letter: "C", text: "Persuasive, urging readers to adopt Kantian morality." },
      { letter: "D", text: "Skeptical, questioning its philosophical coherence." }
    ],
    correctAnswer: "B",
    explanation: "The passage explains deontological ethics and notes criticisms and defenses without advocating or dismissing it.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Author's Tone"
  }),
  addRating({
    id: "ueng023",
    question: "In aesthetics, the notion of the sublime transcends mere beauty, invoking experiences of awe and terror that defy rational comprehension. Philosophers from Burke to Kant have grappled with its paradoxical nature: simultaneously pleasurable and overwhelming.\n\nThe passage suggests that the sublime is characterized by:",
    options: [
      { letter: "A", text: "Harmonious simplicity and clarity." },
      { letter: "B", text: "A blend of pleasure and overwhelming intensity." },
      { letter: "C", text: "Exclusively aesthetic delight devoid of discomfort." },
      { letter: "D", text: "Rational comprehensibility and predictability." }
    ],
    correctAnswer: "B",
    explanation: "The passage emphasizes the sublime's paradoxical mix of pleasure and awe, often bordering on terror.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Detail"
  }),
  addRating({
    id: "ueng024",
    question: "In political theory, deliberative democracy emphasizes reasoned discourse among citizens as the foundation of legitimate governance. This model contrasts with aggregative approaches that reduce democracy to preference tallying.\n\nThe author's tone toward deliberative democracy is best described as:",
    options: [
      { letter: "A", text: "Dismissive, highlighting its impracticality." },
      { letter: "B", text: "Tentative, acknowledging merits while noting limitations." },
      { letter: "C", text: "Enthusiastic, portraying it as the ideal democratic model." },
      { letter: "D", text: "Neutral, avoiding any evaluative stance." }
    ],
    correctAnswer: "B",
    explanation: "The passage presents deliberative democracy's strengths and criticisms, suggesting a balanced, tentative tone.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Author's Tone"
  }),
  addRating({
    id: "ueng025",
    question: "In metaphysics, the problem of universals interrogates whether properties exist independently of particulars or merely as conceptual abstractions. Realists contend that universals have objective existence, while nominalists deny such ontological status.\n\nWhich choice best states the central issue discussed in the passage?",
    options: [
      { letter: "A", text: "Whether universals are empirically verifiable phenomena." },
      { letter: "B", text: "Whether properties exist independently or only as mental constructs." },
      { letter: "C", text: "Whether language can accurately capture metaphysical truths." },
      { letter: "D", text: "Whether nominalism offers a superior account of reality." }
    ],
    correctAnswer: "B",
    explanation: "The passage frames the debate as concerning the ontological status of universals—independent existence versus conceptual abstraction.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Main Idea"
  })
];
