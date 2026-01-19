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
    question: "The author describes the protagonist's reaction to receiving the long-awaited letter as one of pure joy. Which word best captures this emotional state?",
    options: [
      { letter: "A", text: "elated" },
      { letter: "B", text: "melancholy" },
      { letter: "C", text: "neutral" },
      { letter: "D", text: "furious" }
    ],
    correctAnswer: "A",
    explanation: "The passage describes 'pure joy,' which indicates an extremely happy emotional state. 'Elated' means feeling extremely happy and excited, which perfectly matches the described reaction. 'Melancholy' (sad) and 'furious' (angry) contradict the joyful tone, while 'neutral' fails to capture the intensity of the emotion.",
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
  // Writing and rhetoric questions (Rating 5-7)
  addRating({
    id: "ueng016",
    question: "In context, which choice best maintains the tone and logical progression of the passage?\n\nDespite the committee's insistence on transparency, the report was...",
    options: [
      { letter: "A", text: "opaque and convoluted, leaving readers perplexed." },
      { letter: "B", text: "clear and concise, satisfying all expectations." },
      { letter: "C", text: "verbose yet illuminating, offering clarity." },
      { letter: "D", text: "brief but misleading, obscuring critical details." }
    ],
    correctAnswer: "A",
    explanation: "The phrase 'Despite the committee's insistence on transparency' suggests the report failed to meet expectations, making 'opaque and convoluted' the most logical choice.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Logical Progression"
  }),
  addRating({
    id: "ueng017",
    question: "Which revision most improves sentence structure?\n\nThe scientist, who was renowned for groundbreaking research, published findings that were controversial.",
    options: [
      { letter: "A", text: "Renowned for groundbreaking research, the scientist published controversial findings." },
      { letter: "B", text: "The scientist published findings that were controversial and groundbreaking." },
      { letter: "C", text: "The scientist, renowned for research, published findings that were controversial." },
      { letter: "D", text: "Publishing controversial findings, the scientist was renowned for research." }
    ],
    correctAnswer: "A",
    explanation: "Option A eliminates unnecessary words and improves clarity while maintaining meaning.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Sentence Structure"
  }),
  addRating({
    id: "ueng018",
    question: "Which choice best supports the claim that technological progress can exacerbate inequality?",
    options: [
      { letter: "A", text: "Innovations often reduce costs for consumers." },
      { letter: "B", text: "Automation disproportionately affects low-income workers." },
      { letter: "C", text: "Advancements in AI improve efficiency in all sectors." },
      { letter: "D", text: "Digital platforms increase global connectivity." }
    ],
    correctAnswer: "B",
    explanation: "Automation replacing low-income jobs directly supports the claim about inequality.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Evidence and Support"
  }),
  addRating({
    id: "ueng019",
    question: "The author's tone in the passage is best described as:",
    options: [
      { letter: "A", text: "cautiously optimistic." },
      { letter: "B", text: "vehemently critical." },
      { letter: "C", text: "detached and analytical." },
      { letter: "D", text: "exuberantly celebratory." }
    ],
    correctAnswer: "C",
    explanation: "The passage uses objective language and analysis, indicating a detached and analytical tone.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Author's Tone"
  }),
  addRating({
    id: "ueng020",
    question: "Which sentence most effectively combines the two ideas without redundancy?\n\nShe admired the painting. The painting was created by a local artist.",
    options: [
      { letter: "A", text: "She admired the painting, which was created by a local artist." },
      { letter: "B", text: "She admired the painting and it was created by a local artist." },
      { letter: "C", text: "She admired the painting; the painting was by a local artist." },
      { letter: "D", text: "She admired the painting because it was created by a local artist." }
    ],
    correctAnswer: "A",
    explanation: "Option A combines the ideas smoothly without redundancy.",
    difficulty: "Easy",
    domain: "Writing",
    skill: "Sentence Combining"
  }),
  addRating({
    id: "ueng021",
    question: "Which choice best maintains parallel structure?\n\nThe internship taught her to write clearly, think critically, and she learned collaboration.",
    options: [
      { letter: "A", text: "write clearly, think critically, and collaborate effectively." },
      { letter: "B", text: "writing clearly, thinking critically, and collaboration." },
      { letter: "C", text: "write clearly, thinking critically, and collaborating." },
      { letter: "D", text: "writing clearly, think critically, and collaborate effectively." }
    ],
    correctAnswer: "A",
    explanation: "Option A maintains parallel structure with all verbs in the same form.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Parallel Structure"
  }),
  addRating({
    id: "ueng022",
    question: "Which choice most logically completes the sentence?\n\nAlthough the policy aimed to reduce emissions, critics argued that...",
    options: [
      { letter: "A", text: "it would accelerate climate change." },
      { letter: "B", text: "its implementation was costly and ineffective." },
      { letter: "C", text: "it was universally praised by environmentalists." },
      { letter: "D", text: "it aligned with global sustainability goals." }
    ],
    correctAnswer: "B",
    explanation: "Critics would argue against effectiveness, making B the best choice.",
    difficulty: "Medium",
    domain: "Writing",
    skill: "Logical Completion"
  }),
  addRating({
    id: "ueng023",
    question: "Which choice best improves the clarity of the sentence?\n\nDue to the fact that the project was delayed, the team had to work overtime.",
    options: [
      { letter: "A", text: "Because the project was delayed, the team had to work overtime." },
      { letter: "B", text: "The project was delayed, so the team had to work overtime." },
      { letter: "C", text: "The team had to work overtime due to the project delay." },
      { letter: "D", text: "All of the above." }
    ],
    correctAnswer: "D",
    explanation: "All options improve clarity compared to the original sentence.",
    difficulty: "Easy",
    domain: "Writing",
    skill: "Concision"
  }),
  addRating({
    id: "ueng024",
    question: "Which choice best supports the argument that art influences culture?",
    options: [
      { letter: "A", text: "Art reflects societal values and norms." },
      { letter: "B", text: "Art is often displayed in museums." },
      { letter: "C", text: "Artists sometimes collaborate internationally." },
      { letter: "D", text: "Art requires creativity and skill." }
    ],
    correctAnswer: "A",
    explanation: "Option A directly connects art to cultural influence.",
    difficulty: "Medium",
    domain: "Reading",
    skill: "Evidence and Support"
  }),
  addRating({
    id: "ueng025",
    question: "Which choice best maintains the formal tone?\n\nThe results were pretty surprising to the researchers.",
    options: [
      { letter: "A", text: "The results were quite surprising to the researchers." },
      { letter: "B", text: "The results were surprising to the researchers." },
      { letter: "C", text: "The results were rather surprising to the researchers." },
      { letter: "D", text: "The results were significantly surprising to the researchers." }
    ],
    correctAnswer: "B",
    explanation: "Option B is formal and concise, avoiding informal words like 'pretty.'",
    difficulty: "Easy",
    domain: "Writing",
    skill: "Formal Tone"
  })
];
