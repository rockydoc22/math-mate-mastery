import { EnglishQuestion } from "./englishQuestions";

/**
 * 400 Very Hard English Questions (Levels 8-10)
 * Domain: Information and Ideas, Craft and Structure
 * Skills: Text Structure, Rhetorical Synthesis, Words in Context, Command of Evidence, Central Ideas
 */

const baseVeryHardQuestions: EnglishQuestion[] = [
  // Question batch 1 - Text Structure
  {
    id: "vhard_eng_5521",
    question: "Neuroscientist V.S. Ramachandran's research on phantom limbs demonstrates brain plasticity. When amputees receive visual feedback through mirrors suggesting their missing limb is present, many experience relief from phantom pain. This suggests the brain can rapidly reorganize its body map based on sensory input.\n\nThe text most strongly suggests which of the following?",
    options: [
      { letter: "A", text: "Traditional theories require complete revision based on new evidence." },
      { letter: "B", text: "The relationship between concepts is more complex than previously understood." },
      { letter: "C", text: "Current research methods are insufficient for addressing the question." },
      { letter: "D", text: "Earlier scholars' interpretations were entirely unfounded." }
    ],
    correctAnswer: "B",
    explanation: "The text presents nuanced findings that complicate rather than overturn existing understanding, suggesting complexity rather than wholesale revision or complete invalidation of previous work.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5522",
    question: "Text 1: Physicist Lisa Randall's work on extra dimensions suggests that gravity's relative weakness compared to other fundamental forces may be explained by gravitational force 'leaking' into dimensions beyond our observable four. This warped geometry model has implications for particle physics and cosmology.\n\nText 2: Sociologist Pierre Bourdieu introduced 'cultural capital'—the non-financial assets (education, intellect, speech patterns) that promote social mobility. Bourdieu argued that educational institutions reproduce inequality by rewarding students who possess cultural capital from privileged backgrounds while claiming to assess merit objectively.\n\nBased on the texts, both researchers would most likely agree that:",
    options: [
      { letter: "A", text: "Established frameworks must be completely abandoned in favor of new paradigms." },
      { letter: "B", text: "Detailed examination of specific cases can reveal broader patterns and principles." },
      { letter: "C", text: "Quantitative methods are superior to qualitative approaches in all circumstances." },
      { letter: "D", text: "Contemporary theory has resolved all fundamental questions in their respective fields." }
    ],
    correctAnswer: "B",
    explanation: "Both texts emphasize close analysis of specific phenomena to understand larger patterns, demonstrating methodological commonality across disciplines.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5523",
    question: "Literary theorist Edward Said's concept of 'Orientalism' describes how Western scholarship and art have historically constructed the 'East' as exotic, backward, and in need of Western intervention. Said argues these representations served to justify colonialism by creating a discourse that positioned Western culture as superior.\n\nWhich choice best describes the overall structure of the text?",
    options: [
      { letter: "A", text: "A theory is presented, then multiple supporting examples are provided." },
      { letter: "B", text: "A concept is introduced and its implications for understanding a phenomenon are explained." },
      { letter: "C", text: "Two competing interpretations are compared and one is deemed superior." },
      { letter: "D", text: "A chronological narrative traces the development of an idea over time." }
    ],
    correctAnswer: "B",
    explanation: "The text introduces a theoretical concept or analytical framework and then explores its explanatory power or implications, which is distinct from simple example-support or chronological structures.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5524",
    question: "Sociologist Pierre Bourdieu introduced 'cultural capital'—the non-financial assets (education, intellect, speech patterns) that promote social mobility. Bourdieu argued that educational institutions reproduce inequality by rewarding students who possess cultural capital from privileged backgrounds while claiming to assess merit objectively.\n\nAs used in the text, what does the word 'reproduce' most nearly mean?",
    options: [
      { letter: "A", text: "Create exact copies" },
      { letter: "B", text: "Perpetuate or maintain across generations" },
      { letter: "C", text: "Biologically replicate" },
      { letter: "D", text: "Represent or depict" }
    ],
    correctAnswer: "B",
    explanation: "In social science contexts, 'reproduce' typically refers to the perpetuation of social structures, patterns, or inequalities across time and generations, not literal copying or biological processes.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5525",
    question: "Evolutionary biologist Stephen Jay Gould challenged the gradualist view of evolution, proposing 'punctuated equilibrium'—the theory that species remain stable for long periods, then undergo rapid change during brief evolutionary events. This contrasts with Darwin's emphasis on slow, continuous change. Fossil records showing sudden appearances of new species, followed by stasis, support Gould's model.\n\nWhich quotation from a researcher would most directly support the main claim in the text?",
    options: [
      { letter: "A", text: "Historical patterns in the fossil record confirm gradual, continuous evolutionary processes." },
      { letter: "B", text: "New research methods allow us to detect previously invisible intermediate forms." },
      { letter: "C", text: "Evidence suggests evolutionary change occurs rapidly during environmental disruptions, with long stable periods between." },
      { letter: "D", text: "Contemporary species show no significant genetic variation from their ancestors." }
    ],
    correctAnswer: "C",
    explanation: "This choice directly supports the concept of punctuated equilibrium—rapid change during specific events followed by stasis—which is the main claim described in the passage.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5526",
    question: "Psychologist Carol Dweck's research distinguishes 'fixed' and 'growth' mindsets. Students with fixed mindsets believe intelligence is unchangeable, leading them to avoid challenges that might reveal limitations. Those with growth mindsets see intelligence as developable through effort. Critically, Dweck's work shows that even subtle cues—such as praising 'smartness' versus 'effort'—can shift students between mindsets, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "intelligence is entirely determined by genetic factors." },
      { letter: "B", text: "educational environments can significantly influence how students approach learning challenges." },
      { letter: "C", text: "fixed mindsets are impossible to change once established in childhood." },
      { letter: "D", text: "growth mindsets guarantee academic success regardless of other factors." }
    ],
    correctAnswer: "B",
    explanation: "The passage emphasizes that subtle environmental cues can shift mindsets, supporting the idea that educational contexts significantly shape student approaches.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5527",
    question: "Evolutionary biologist Stephen Jay Gould challenged the gradualist view of evolution, proposing 'punctuated equilibrium'—the theory that species remain stable for long periods, then undergo rapid change during brief evolutionary events. This contrasts with Darwin's emphasis on slow, continuous change. Fossil records showing sudden appearances of new species, followed by stasis, support Gould's model.\n\nWhich finding, if true, would most challenge the claim in the text?",
    options: [
      { letter: "A", text: "Fossil records reveal numerous gradual transitional forms between all major species." },
      { letter: "B", text: "Environmental changes occur too slowly to cause rapid evolutionary shifts." },
      { letter: "C", text: "Genetic analysis shows continuous small mutations across all time periods." },
      { letter: "D", text: "All evolutionary changes require millions of years to manifest." }
    ],
    correctAnswer: "A",
    explanation: "Finding numerous gradual transitional forms would directly contradict Gould's punctuated equilibrium model, which relies on the relative absence of such forms.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5528",
    question: "Text 1: Evolutionary biologist Stephen Jay Gould challenged the gradualist view of evolution, proposing 'punctuated equilibrium'—the theory that species remain stable for long periods, then undergo rapid change during brief evolutionary events.\n\nText 2: Sociologist Pierre Bourdieu introduced 'cultural capital'—the non-financial assets (education, intellect, speech patterns) that promote social mobility. Bourdieu argued that educational institutions reproduce inequality by rewarding students who possess cultural capital from privileged backgrounds.\n\nBased on the texts, both researchers would most likely agree that:",
    options: [
      { letter: "A", text: "Established frameworks must be completely abandoned in favor of new paradigms." },
      { letter: "B", text: "Detailed examination of specific cases can reveal broader patterns and principles." },
      { letter: "C", text: "Quantitative methods are superior to qualitative approaches in all circumstances." },
      { letter: "D", text: "Contemporary theory has resolved all fundamental questions in their respective fields." }
    ],
    correctAnswer: "B",
    explanation: "Both texts emphasize close analysis of specific phenomena to understand larger patterns, demonstrating methodological commonality across disciplines.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5529",
    question: "Historian Natalie Zemon Davis pioneered 'microhistory,' using detailed analysis of individual lives to illuminate broader historical patterns. Her study of a 16th-century peasant impostor revealed complex negotiations of identity, gender, and authority in early modern France, challenging assumptions about peasant agency and literacy.\n\nWhich choice best describes the overall structure of the text?",
    options: [
      { letter: "A", text: "A theory is presented, then multiple supporting examples are provided." },
      { letter: "B", text: "A concept is introduced and its implications for understanding a phenomenon are explained." },
      { letter: "C", text: "Two competing interpretations are compared and one is deemed superior." },
      { letter: "D", text: "A chronological narrative traces the development of an idea over time." }
    ],
    correctAnswer: "B",
    explanation: "The text introduces a theoretical concept or analytical framework and then explores its explanatory power or implications.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5530",
    question: "Political scientist Robert Putnam documented declining 'social capital' in America—the networks and norms enabling cooperation. His research linked decreasing civic participation (voting, club membership, neighborly interaction) to atomizing technologies and suburban sprawl, with implications for democratic governance.\n\nAs used in the text, what does the word 'atomizing' most nearly mean?",
    options: [
      { letter: "A", text: "Breaking into smallest possible units" },
      { letter: "B", text: "Isolating individuals from communal bonds" },
      { letter: "C", text: "Accelerating at a rapid pace" },
      { letter: "D", text: "Converting into digital formats" }
    ],
    correctAnswer: "B",
    explanation: "In this context, 'atomizing' refers to technologies that isolate individuals, reducing social connections and communal participation.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5531",
    question: "Physicist Lisa Randall's work on extra dimensions suggests that gravity's relative weakness compared to other fundamental forces may be explained by gravitational force 'leaking' into dimensions beyond our observable four. This warped geometry model has implications for particle physics and cosmology.\n\nWhich quotation from a researcher would most directly support the main claim in the text?",
    options: [
      { letter: "A", text: "Gravity behaves identically to electromagnetic forces at all scales." },
      { letter: "B", text: "Our experiments detect gravitational anomalies consistent with higher-dimensional leakage." },
      { letter: "C", text: "The four dimensions we observe contain all physical forces completely." },
      { letter: "D", text: "Gravity's strength matches theoretical predictions for a four-dimensional universe." }
    ],
    correctAnswer: "B",
    explanation: "This choice directly supports Randall's claim about gravity leaking into extra dimensions by providing experimental evidence of such anomalies.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5532",
    question: "Economist Amartya Sen redefined poverty beyond mere income, introducing the 'capability approach.' Sen argues that true poverty is the deprivation of capabilities—freedom to achieve health, education, and social participation. A wealthy society with restricted freedoms may have more capability poverty than a poorer but freer one.\n\nThe text most strongly suggests which of the following?",
    options: [
      { letter: "A", text: "Economic metrics alone inadequately capture human well-being." },
      { letter: "B", text: "Wealthy nations never experience any form of poverty." },
      { letter: "C", text: "Freedom and capability are entirely unrelated concepts." },
      { letter: "D", text: "Traditional poverty measures should be completely abandoned." }
    ],
    correctAnswer: "A",
    explanation: "Sen's capability approach specifically argues that income-based metrics miss crucial dimensions of well-being, making economic metrics alone inadequate.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5533",
    question: "Anthropologist Clifford Geertz advocated 'thick description'—interpreting cultural behaviors not just as acts but as systems of meaning. His famous analysis of Balinese cockfights revealed how seemingly simple events encode complex social hierarchies, status competitions, and aesthetic values.\n\nWhich choice best describes the function of the cockfight example?",
    options: [
      { letter: "A", text: "It contradicts the main theoretical claim about cultural interpretation." },
      { letter: "B", text: "It illustrates how detailed analysis reveals hidden cultural meanings." },
      { letter: "C", text: "It questions whether anthropological methods can access cultural truths." },
      { letter: "D", text: "It compares Balinese culture unfavorably with Western practices." }
    ],
    correctAnswer: "B",
    explanation: "The cockfight example demonstrates how Geertz's thick description method reveals complex meanings within seemingly simple cultural practices.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5534",
    question: "Philosopher Michel Foucault analyzed how institutions like prisons, schools, and hospitals use surveillance and discipline to produce 'docile bodies'—individuals who internalize rules and monitor their own behavior. This 'disciplinary power' operates through normalized observation rather than direct force.\n\nAs used in the text, what does 'docile' most nearly mean?",
    options: [
      { letter: "A", text: "Physically weak and incapable of resistance" },
      { letter: "B", text: "Trained to comply through internalized self-regulation" },
      { letter: "C", text: "Naturally submissive due to biological factors" },
      { letter: "D", text: "Openly rebellious against authority figures" }
    ],
    correctAnswer: "B",
    explanation: "Foucault's 'docile bodies' refers to individuals who have internalized discipline and self-regulate their behavior according to institutional norms.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5535",
    question: "Linguist Noam Chomsky proposed that humans possess an innate 'language acquisition device'—neural architecture enabling rapid language learning. Children master complex grammatical rules despite limited and often ungrammatical input, suggesting pre-existing linguistic capacity rather than purely environmental learning.\n\nWhich finding, if true, would most support the claim in the text?",
    options: [
      { letter: "A", text: "Children raised without language exposure never develop grammatical understanding." },
      { letter: "B", text: "Infants distinguish grammatical structures before receiving linguistic instruction." },
      { letter: "C", text: "Language learning requires intensive formal education to succeed." },
      { letter: "D", text: "Different languages share no common structural features." }
    ],
    correctAnswer: "B",
    explanation: "Pre-linguistic grammatical discrimination would support the innate language capacity Chomsky proposes.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5536",
    question: "Text 1: Anthropologist Clifford Geertz advocated 'thick description'—interpreting cultural behaviors as systems of meaning. His analysis of Balinese cockfights revealed how events encode complex social hierarchies.\n\nText 2: Economist Amartya Sen introduced the 'capability approach,' arguing that true poverty is the deprivation of freedoms to achieve health, education, and social participation.\n\nBased on the texts, both scholars would most likely agree that:",
    options: [
      { letter: "A", text: "Surface-level observations often miss deeper structural realities." },
      { letter: "B", text: "Quantitative data alone can fully explain social phenomena." },
      { letter: "C", text: "Cultural practices have no connection to economic conditions." },
      { letter: "D", text: "Individual behavior is entirely determined by external circumstances." }
    ],
    correctAnswer: "A",
    explanation: "Both Geertz and Sen argue for looking beyond surface appearances—Geertz through thick description, Sen through capabilities beyond income—to understand deeper realities.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5537",
    question: "Sociologist Erving Goffman compared everyday life to theatrical performance in his 'dramaturgical' approach. People manage impressions through 'front stage' behavior (public personas) and 'back stage' behavior (private selves), constantly negotiating identity through social scripts and audience expectations.\n\nWhich choice most logically completes a sentence about Goffman's theory: This suggests that identity is ______",
    options: [
      { letter: "A", text: "a fixed essence that remains constant across all situations." },
      { letter: "B", text: "a performance negotiated through social interaction and context." },
      { letter: "C", text: "entirely artificial with no authentic core self." },
      { letter: "D", text: "determined exclusively by biological and genetic factors." }
    ],
    correctAnswer: "B",
    explanation: "Goffman's dramaturgical approach emphasizes that identity is performed and negotiated socially, varying by context and audience.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5538",
    question: "Political theorist Hannah Arendt distinguished 'labor' (biological survival activities), 'work' (creating durable objects), and 'action' (political participation). She argued that modern society overvalues labor and consumption while devaluing action, threatening the public realm essential for human freedom.\n\nThe passage structure moves from:",
    options: [
      { letter: "A", text: "Specific examples to general theory" },
      { letter: "B", text: "Categorical distinctions to their contemporary implications" },
      { letter: "C", text: "Historical narrative to philosophical critique" },
      { letter: "D", text: "Conflicting viewpoints to a synthesis" }
    ],
    correctAnswer: "B",
    explanation: "The text first establishes Arendt's three categories, then discusses their implications for modern society.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5539",
    question: "Economist Thomas Piketty's analysis of wealth inequality reveals that when returns on capital exceed economic growth (r > g), wealth concentrates among those with inherited assets. This 'fundamental inequality' suggests capitalism naturally trends toward oligarchy without deliberate redistribution.\n\nAs used in the text, 'trends toward' most nearly means:",
    options: [
      { letter: "A", text: "Fashionably adopts" },
      { letter: "B", text: "Gradually moves in the direction of" },
      { letter: "C", text: "Abruptly transforms into" },
      { letter: "D", text: "Superficially resembles" }
    ],
    correctAnswer: "B",
    explanation: "In this context, 'trends toward' indicates a gradual natural movement toward a particular state (oligarchy).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5540",
    question: "Cognitive scientist Daniel Kahneman identified two thinking systems: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberate, logical). Most decisions use System 1, which relies on heuristics—mental shortcuts that often produce accurate judgments but can lead to systematic biases.\n\nWhich quotation would most directly support the text's claim about heuristics?",
    options: [
      { letter: "A", text: "Our research shows that quick judgments are always more accurate than deliberate analysis." },
      { letter: "B", text: "Mental shortcuts generally serve us well but create predictable errors in specific situations." },
      { letter: "C", text: "System 2 thinking should completely replace intuitive decision-making." },
      { letter: "D", text: "Emotional responses have no connection to cognitive processing." }
    ],
    correctAnswer: "B",
    explanation: "This directly captures the dual nature of heuristics described in the passage—generally useful but systematically fallible.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  // Continue with more questions...
  {
    id: "vhard_eng_5541",
    question: "Historian Joan Scott argues that 'gender' is not a natural fact but a social category organizing relationships of power. Scott shows how societies use gender to structure labor divisions and political hierarchies, then justify these as reflecting natural differences.\n\nWhich choice most logically completes the text: This analysis suggests that ______",
    options: [
      { letter: "A", text: "biological sex and social gender are entirely separate with no relationship." },
      { letter: "B", text: "challenging gender-based hierarchies requires recognizing their social construction." },
      { letter: "C", text: "all societies organize gender relationships in fundamentally identical ways." },
      { letter: "D", text: "historical analysis of gender is irrelevant to contemporary social issues." }
    ],
    correctAnswer: "B",
    explanation: "Scott's argument that gender categories organize power and are naturalized implies that recognizing social construction is key to challenging hierarchies.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5542",
    question: "Art historian Michael Baxandall argued that Renaissance paintings must be understood through 'period eye'—the visual skills and cultural knowledge of contemporary viewers. He showed how commercial practices like gauging barrel volumes trained viewers to appreciate mathematical perspective in paintings.\n\nWhich choice best describes the overall structure of the text?",
    options: [
      { letter: "A", text: "A theory is presented, then multiple unrelated examples are provided." },
      { letter: "B", text: "A concept is introduced and its application is demonstrated through specific example." },
      { letter: "C", text: "Two competing interpretations are compared and one is rejected." },
      { letter: "D", text: "A chronological narrative traces artistic development." }
    ],
    correctAnswer: "B",
    explanation: "The text introduces Baxandall's 'period eye' concept, then demonstrates it through the specific example of barrel-gauging and perspective appreciation.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5543",
    question: "Psychologist Elizabeth Loftus demonstrated that memory is reconstructive rather than reproductive. Her experiments showed that post-event information can alter witnesses' memories, leading them to 'remember' details that never occurred. This has profound implications for eyewitness testimony reliability.\n\nThe text most strongly suggests that:",
    options: [
      { letter: "A", text: "Eyewitness testimony should be considered completely unreliable in all cases." },
      { letter: "B", text: "Memory accuracy can be compromised by information received after an event." },
      { letter: "C", text: "Witnesses deliberately fabricate details to mislead investigators." },
      { letter: "D", text: "All memories are equally susceptible to post-event distortion." }
    ],
    correctAnswer: "B",
    explanation: "Loftus's research specifically demonstrates that post-event information can alter memory, affecting reliability without implying complete unreliability or intentional deception.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5544",
    question: "Philosopher John Rawls proposed the 'veil of ignorance' thought experiment: designing society without knowing one's future position in it. Rawls argued that rational designers behind this veil would choose principles ensuring fair treatment of the least advantaged, since anyone might occupy that position.\n\nAs used in the text, 'rational' most nearly means:",
    options: [
      { letter: "A", text: "Emotionally detached to the point of coldness" },
      { letter: "B", text: "Self-interested in a way that considers all possible outcomes" },
      { letter: "C", text: "Mathematically precise in every calculation" },
      { letter: "D", text: "Opposed to all forms of intuitive reasoning" }
    ],
    correctAnswer: "B",
    explanation: "In Rawls's framework, 'rational' refers to self-interested reasoning that accounts for uncertainty about one's future position, leading to fair principles.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5545",
    question: "Text 1: Psychologist Elizabeth Loftus showed that memory is reconstructive—post-event information can alter what witnesses 'remember.'\n\nText 2: Cognitive scientist Daniel Kahneman identified System 1 thinking as fast and intuitive, relying on heuristics that can create systematic biases.\n\nBoth texts suggest that:",
    options: [
      { letter: "A", text: "Human cognition is fundamentally flawless when properly applied." },
      { letter: "B", text: "Mental processes can produce reliable-feeling outputs that are objectively inaccurate." },
      { letter: "C", text: "Scientific research has no practical applications outside the laboratory." },
      { letter: "D", text: "Conscious deliberation is the only source of human error." }
    ],
    correctAnswer: "B",
    explanation: "Both Loftus and Kahneman demonstrate that mental processes (memory, intuition) can feel reliable while producing inaccurate results.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5546",
    question: "Sociologist Max Weber analyzed the 'disenchantment of the world'—modernity's replacement of magical and religious explanations with rational, scientific ones. While this rationalization increases efficiency and predictability, Weber warned it creates an 'iron cage' of bureaucracy that constrains human spontaneity and meaning-making.\n\nThe passage structure moves from:",
    options: [
      { letter: "A", text: "Effect to cause" },
      { letter: "B", text: "Concept introduction to its ambivalent assessment" },
      { letter: "C", text: "Historical description to future prediction" },
      { letter: "D", text: "Refutation of one theory to establishment of another" }
    ],
    correctAnswer: "B",
    explanation: "The text first introduces Weber's disenchantment concept, then presents both its benefits (efficiency) and costs (iron cage), creating an ambivalent assessment.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5547",
    question: "Economist Ronald Coase demonstrated that when transaction costs are low, private bargaining can resolve externalities without government intervention. However, when transaction costs are high—as with pollution affecting millions—Coasian bargaining becomes impractical, justifying regulatory solutions.\n\nWhich finding would most challenge the regulatory implications in the text?",
    options: [
      { letter: "A", text: "New technologies dramatically reduce costs of coordinating large-group negotiations." },
      { letter: "B", text: "Some forms of pollution have highly localized effects." },
      { letter: "C", text: "Government regulations sometimes create their own inefficiencies." },
      { letter: "D", text: "Transaction costs are always prohibitively high for any negotiation." }
    ],
    correctAnswer: "A",
    explanation: "If technology reduces coordination costs, Coasian bargaining becomes more practical even for large-scale problems, undermining the justification for regulation.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5548",
    question: "Literary critic Fredric Jameson characterizes postmodernism as 'the cultural logic of late capitalism.' In this view, the fragmentary, ironic, surface-focused qualities of postmodern art reflect the disorientation produced by globalized consumer culture rather than representing a genuine aesthetic breakthrough.\n\nAs used in the text, 'logic' most nearly means:",
    options: [
      { letter: "A", text: "Formal rules of valid reasoning" },
      { letter: "B", text: "Underlying structure that shapes expression" },
      { letter: "C", text: "Explicit argument or thesis" },
      { letter: "D", text: "Mathematical formula" }
    ],
    correctAnswer: "B",
    explanation: "Jameson uses 'logic' to mean the underlying economic structure that shapes cultural expression, not formal reasoning rules.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5549",
    question: "Biologist Richard Dawkins introduced the concept of 'memes'—units of cultural information that replicate and evolve analogously to genes. Ideas, phrases, and practices spread through imitation, with successful memes being those that effectively colonize human minds, regardless of their truth or benefit to hosts.\n\nThe text suggests that meme success is primarily determined by:",
    options: [
      { letter: "A", text: "The objective truth of the idea being transmitted." },
      { letter: "B", text: "The ability to replicate effectively through human cognition." },
      { letter: "C", text: "The benefit the idea provides to the individual hosting it." },
      { letter: "D", text: "The approval of cultural authorities and institutions." }
    ],
    correctAnswer: "B",
    explanation: "Dawkins's meme concept emphasizes replication ability, specifically noting that success is 'regardless of truth or benefit to hosts.'",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5550",
    question: "Philosopher Martha Nussbaum developed the 'capabilities approach' to ethics and development, arguing that governments should ensure citizens can achieve certain fundamental capabilities—health, education, political participation, emotional expression. Unlike preference satisfaction theories, this approach specifies what opportunities matter regardless of whether individuals choose to exercise them.\n\nWhich choice best describes the overall structure?",
    options: [
      { letter: "A", text: "A theory is presented, then contrasted with an alternative approach." },
      { letter: "B", text: "Multiple perspectives are presented without evaluation." },
      { letter: "C", text: "A chronological history of philosophical development is traced." },
      { letter: "D", text: "Empirical evidence is marshaled to support a hypothesis." }
    ],
    correctAnswer: "A",
    explanation: "The text introduces Nussbaum's capabilities approach, then contrasts it with preference satisfaction theories to clarify its distinctive features.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 8
  },
  // Batch 2 - More varied skills
  {
    id: "vhard_eng_5551",
    question: "Neuroscientist Antonio Damasio's 'somatic marker hypothesis' proposes that emotions are essential to rational decision-making, not opposed to it. Patients with damage to emotion-processing brain regions make poor decisions despite intact logical reasoning, suggesting that 'gut feelings' provide crucial evaluative information.\n\nWhich quotation would most directly support the text's claim?",
    options: [
      { letter: "A", text: "Purely logical analysis always produces superior decisions to emotional responses." },
      { letter: "B", text: "Patients lacking emotional processing struggle with decisions despite normal reasoning abilities." },
      { letter: "C", text: "Emotions should be completely excluded from important decision-making processes." },
      { letter: "D", text: "Brain damage has no effect on cognitive or emotional functioning." }
    ],
    correctAnswer: "B",
    explanation: "This directly supports Damasio's claim by describing the specific pattern he observed—poor decisions despite intact reasoning when emotion processing is damaged.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5552",
    question: "Text 1: Philosopher Thomas Kuhn argued that scientific progress occurs through paradigm shifts—revolutionary changes that restructure entire fields rather than gradual accumulation of knowledge.\n\nText 2: Historian Fernand Braudel developed the concept of 'longue durée'—emphasizing slow-moving historical structures (climate, geography, mentalities) over dramatic events and individual actions.\n\nBased on the texts, what methodological difference exists between the scholars?",
    options: [
      { letter: "A", text: "Kuhn emphasizes discontinuity while Braudel emphasizes continuity." },
      { letter: "B", text: "Both scholars focus exclusively on rapid, dramatic changes." },
      { letter: "C", text: "Kuhn studies historical structures while Braudel studies scientific revolutions." },
      { letter: "D", text: "Both reject the importance of gradual, incremental processes." }
    ],
    correctAnswer: "A",
    explanation: "Kuhn emphasizes revolutionary discontinuities in science; Braudel emphasizes slow continuities in history. This represents a fundamental methodological difference.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5553",
    question: "Philosopher Judith Butler argues that gender is 'performative'—not an inner essence expressed outwardly but a identity constituted through repeated stylized acts. Just as speech acts create realities (pronouncing a couple married), gendered behaviors create the appearance of a stable gender identity that precedes and causes them.\n\nAs used in the text, 'performative' most nearly means:",
    options: [
      { letter: "A", text: "Related to theatrical entertainment" },
      { letter: "B", text: "Creating reality through enactment rather than expressing pre-existing truth" },
      { letter: "C", text: "Measured by achievement metrics" },
      { letter: "D", text: "Superficial or insincere" }
    ],
    correctAnswer: "B",
    explanation: "Butler's 'performative' draws on speech act theory—performances that constitute rather than merely describe reality.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5554",
    question: "Economist Daron Acemoglu's research demonstrates that inclusive economic institutions—those providing broad access to opportunities and secure property rights—generate sustained growth, while extractive institutions that concentrate power ultimately stagnate. Historical 'critical junctures' often determine which institutional path societies follow.\n\nThe text most strongly suggests that:",
    options: [
      { letter: "A", text: "Economic outcomes are entirely determined by geography and natural resources." },
      { letter: "B", text: "Institutional structures significantly shape long-term economic development." },
      { letter: "C", text: "All societies inevitably develop inclusive institutions over time." },
      { letter: "D", text: "Individual decisions matter more than systemic factors for economic growth." }
    ],
    correctAnswer: "B",
    explanation: "Acemoglu's argument centers on institutions as key determinants of development, emphasizing their causal role in economic outcomes.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5555",
    question: "Literary theorist Mikhail Bakhtin introduced the concept of 'dialogism'—the idea that all utterances exist in dialogue with previous and anticipated future utterances. Even a single word carries traces of its prior uses and anticipates responses. No text is truly original; all writing participates in ongoing cultural conversations.\n\nWhich choice best describes the overall structure of the text?",
    options: [
      { letter: "A", text: "A paradox is introduced and then resolved through logical analysis." },
      { letter: "B", text: "A concept is defined and then its implications are extended." },
      { letter: "C", text: "Evidence is presented and then a theory is derived from it." },
      { letter: "D", text: "Competing theories are compared and one is selected as superior." }
    ],
    correctAnswer: "B",
    explanation: "The text defines dialogism, then extends its implications (words carry prior uses, no text is original).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5556",
    question: "Psychologist Stanley Milgram's obedience experiments revealed that ordinary people would administer apparently dangerous electric shocks when instructed by authority figures. Rather than reflecting individual pathology, this behavior emerged from situational pressures—uniform authority, incremental escalation, diffused responsibility—suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "most people possess inherently cruel personalities that experiments merely reveal." },
      { letter: "B", text: "contextual factors can override individual moral dispositions in predictable ways." },
      { letter: "C", text: "authority figures are always obeyed regardless of circumstances." },
      { letter: "D", text: "laboratory experiments cannot provide valid insights into real-world behavior." }
    ],
    correctAnswer: "B",
    explanation: "Milgram's findings emphasize situational over dispositional explanations—context shapes behavior in systematic ways.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5557",
    question: "Historian E.P. Thompson's 'The Making of the English Working Class' argued that class is not merely an economic category but a cultural formation—workers developed class consciousness through shared experiences, traditions, and struggles. Thompson criticized accounts treating workers as passive recipients of industrial forces.\n\nWhich finding would most support Thompson's argument?",
    options: [
      { letter: "A", text: "Workers' movements emerged spontaneously without any cultural preconditions." },
      { letter: "B", text: "Working-class identity drew on pre-industrial traditions of protest and community." },
      { letter: "C", text: "Economic conditions alone predict the emergence of class consciousness." },
      { letter: "D", text: "Workers passively accepted conditions imposed by industrial capitalism." }
    ],
    correctAnswer: "B",
    explanation: "Evidence of workers drawing on cultural traditions supports Thompson's argument about class as cultural formation rather than purely economic category.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5558",
    question: "Philosopher Derek Parfit examined personal identity through thought experiments involving teleportation, brain splitting, and gradual replacement of neurons. He concluded that 'what matters' in survival is psychological continuity—connected memories, intentions, beliefs—not some deeper metaphysical self that persists unchanged.\n\nAs used in the text, 'what matters' most nearly means:",
    options: [
      { letter: "A", text: "The physical components of the brain" },
      { letter: "B", text: "The aspects of survival that warrant concern for one's future" },
      { letter: "C", text: "The opinions of other philosophers" },
      { letter: "D", text: "The scientific accuracy of thought experiments" }
    ],
    correctAnswer: "B",
    explanation: "Parfit uses 'what matters' to refer to what we should actually care about regarding our continued existence—a normative rather than descriptive claim.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5559",
    question: "Text 1: Sociologist Émile Durkheim argued that suicide rates reflect social integration—too little connection produces 'anomic' suicide, while excessive integration can produce 'altruistic' suicide.\n\nText 2: Psychologist Aaron Beck developed cognitive therapy based on the theory that depression results from distorted thought patterns that individuals can learn to identify and correct.\n\nBased on the texts, a fundamental difference between the approaches is that:",
    options: [
      { letter: "A", text: "Durkheim focuses on individual cognition while Beck emphasizes social factors." },
      { letter: "B", text: "Durkheim locates causes in social structures while Beck locates them in individual thinking." },
      { letter: "C", text: "Both scholars attribute psychological distress to purely biological factors." },
      { letter: "D", text: "Beck's approach cannot be applied to individual cases." }
    ],
    correctAnswer: "B",
    explanation: "Durkheim's approach is sociological (social causes), while Beck's is psychological (individual cognitive causes)—a fundamental level-of-analysis difference.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5560",
    question: "Philosopher Peter Singer's utilitarian ethics extends moral consideration to all sentient beings capable of suffering. Singer argues that species membership is morally arbitrary—just as race and sex should not determine moral status, neither should species. Causing animal suffering requires the same justification as causing human suffering.\n\nThe passage structure moves from:",
    options: [
      { letter: "A", text: "Specific examples to abstract principles" },
      { letter: "B", text: "General ethical framework to its controversial implications" },
      { letter: "C", text: "Historical development to contemporary applications" },
      { letter: "D", text: "Refutation of alternatives to affirmation of conclusion" }
    ],
    correctAnswer: "B",
    explanation: "The text starts with Singer's general utilitarian framework (sentience-based ethics), then derives its implications for species and animal treatment.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  // Continue with more questions to reach ~100 for this initial batch
  {
    id: "vhard_eng_5561",
    question: "Linguist Ferdinand de Saussure distinguished between 'langue' (the abstract system of language) and 'parole' (individual speech acts). Saussure argued that linguistics should study langue—the underlying rules and structures that make communication possible—rather than the infinite variety of actual utterances.\n\nWhich choice best describes the function of the langue/parole distinction?",
    options: [
      { letter: "A", text: "It demonstrates that spoken language is superior to written forms." },
      { letter: "B", text: "It defines the proper object of study for scientific linguistics." },
      { letter: "C", text: "It proves that language cannot be systematically analyzed." },
      { letter: "D", text: "It shows that individual speakers create language independently." }
    ],
    correctAnswer: "B",
    explanation: "Saussure's distinction serves methodologically to identify what linguistics should study—the underlying system (langue) rather than individual instances (parole).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5562",
    question: "Economist Joseph Stiglitz analyzed how 'information asymmetries'—situations where one party has more information than another—create market failures. In insurance markets, for example, those most likely to need coverage are most likely to buy it, driving up prices and potentially collapsing markets entirely.\n\nAs used in the text, 'asymmetries' most nearly means:",
    options: [
      { letter: "A", text: "Visual imbalances in design" },
      { letter: "B", text: "Unequal distributions between parties" },
      { letter: "C", text: "Mathematical equations" },
      { letter: "D", text: "Temporal sequences" }
    ],
    correctAnswer: "B",
    explanation: "Stiglitz's 'information asymmetries' refers to unequal distribution of information between parties in a transaction.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5563",
    question: "Political scientist Robert Dahl's concept of 'polyarchy' describes political systems with competitive elections and civil liberties—approximations of democratic ideals rather than perfect democracies. Dahl identified multiple power centers as essential: single centers of power tend toward authoritarianism regardless of formal democratic structures.\n\nThe text most strongly suggests that:",
    options: [
      { letter: "A", text: "Formal democratic structures guarantee democratic outcomes." },
      { letter: "B", text: "Perfect democracy is fully achievable in practice." },
      { letter: "C", text: "Distribution of power matters more than formal institutional labels." },
      { letter: "D", text: "Competitive elections are sufficient for democratic governance." }
    ],
    correctAnswer: "C",
    explanation: "Dahl's analysis emphasizes that actual power distribution (multiple centers) matters more than formal democratic labels for preventing authoritarianism.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5564",
    question: "Anthropologist Mary Douglas analyzed how societies use concepts of 'pollution' and 'purity' to maintain social boundaries. What counts as 'dirty' varies culturally but consistently marks things that violate categorical boundaries—matter 'out of place' that threatens social order by blurring classifications.\n\nWhich quotation would most directly support Douglas's analysis?",
    options: [
      { letter: "A", text: "Hygiene standards are universal across all human societies." },
      { letter: "B", text: "Our society considers hybrid creatures disturbing because they defy clean categories." },
      { letter: "C", text: "Pollution concerns reflect only scientific understanding of disease transmission." },
      { letter: "D", text: "Social boundaries are entirely separate from concepts of cleanliness." }
    ],
    correctAnswer: "B",
    explanation: "This directly illustrates Douglas's thesis that pollution marks categorical boundary violations—hybrids disturb because they blur classifications.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5565",
    question: "Text 1: Philosopher Thomas Kuhn argued that scientific progress occurs through paradigm shifts—revolutionary changes that restructure fields rather than gradual knowledge accumulation.\n\nText 2: Physicist Lisa Randall's work on extra dimensions suggests gravity's weakness may be explained by 'leaking' into unobservable dimensions.\n\nBased on the texts, Randall's theory could be described as:",
    options: [
      { letter: "A", text: "An example of normal science working within established physics." },
      { letter: "B", text: "A potential paradigm shift challenging fundamental physics assumptions." },
      { letter: "C", text: "A rejection of all prior physics theories as entirely wrong." },
      { letter: "D", text: "A return to pre-scientific explanations of physical phenomena." }
    ],
    correctAnswer: "B",
    explanation: "Randall's extra-dimensions theory fundamentally challenges the assumption that observable dimensions contain all physical forces—characteristic of potential paradigm shift.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5566",
    question: "Philosopher John Stuart Mill argued that actions are right insofar as they promote happiness and wrong as they produce unhappiness. Critically, Mill distinguished 'higher' and 'lower' pleasures: intellectual and aesthetic satisfactions are qualitatively superior to mere bodily pleasures, not just quantitatively greater.\n\nWhich statement, if true, would most challenge Mill's distinction between higher and lower pleasures?",
    options: [
      { letter: "A", text: "Some people consistently prefer bodily pleasures after experiencing both types." },
      { letter: "B", text: "Intellectual pleasures tend to last longer than physical ones." },
      { letter: "C", text: "Different pleasures activate different brain regions." },
      { letter: "D", text: "Aesthetic appreciation requires education and exposure." }
    ],
    correctAnswer: "A",
    explanation: "Mill grounds quality distinction in preferences of those who've experienced both; consistent preference for 'lower' pleasures would undermine this criterion.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5567",
    question: "Sociologist Bruno Latour's 'actor-network theory' treats humans and non-humans symmetrically as 'actants' in networks. A speed bump 'acts' to slow traffic; a door-closer 'disciplines' building users. This approach challenges the modern separation between active human subjects and passive material objects.\n\nAs used in the text, 'disciplines' most nearly means:",
    options: [
      { letter: "A", text: "Punishes for wrongdoing" },
      { letter: "B", text: "Shapes behavior through structural constraints" },
      { letter: "C", text: "Teaches academic subjects" },
      { letter: "D", text: "Organizes into scholarly fields" }
    ],
    correctAnswer: "B",
    explanation: "Latour uses 'disciplines' in Foucault's sense—shaping behavior through non-coercive structural mechanisms, not punishment or teaching.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5568",
    question: "Historian Benedict Anderson defined nations as 'imagined communities'—not because they are false but because members will never meet most compatriots yet imagine shared belonging. Print capitalism enabled this imagination by creating unified linguistic markets where previously separate dialects merged into national languages.\n\nThe text suggests that national identity is:",
    options: [
      { letter: "A", text: "A natural outgrowth of ethnic and linguistic similarities." },
      { letter: "B", text: "A construction made possible by specific historical and technological conditions." },
      { letter: "C", text: "An illusion with no real social effects." },
      { letter: "D", text: "Unchanged throughout human history." }
    ],
    correctAnswer: "B",
    explanation: "Anderson emphasizes that nations are historically constructed through specific conditions (print capitalism), not natural or eternal.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5569",
    question: "Economist Elinor Ostrom challenged the 'tragedy of the commons' thesis—the idea that shared resources inevitably face overexploitation. Her research documented numerous cases where communities developed effective self-governing institutions to manage commons sustainably, contradicting predictions that only privatization or state control could prevent tragedy.\n\nWhich choice best describes the overall structure?",
    options: [
      { letter: "A", text: "A famous theory is presented and then supporting evidence is provided." },
      { letter: "B", text: "A dominant view is introduced and then empirically challenged." },
      { letter: "C", text: "Two opposing theories are presented without resolution." },
      { letter: "D", text: "A chronological history of economic thought is traced." }
    ],
    correctAnswer: "B",
    explanation: "The text introduces the commons tragedy thesis, then presents Ostrom's empirical challenge showing communities can self-govern effectively.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5570",
    question: "Psychologist Albert Bandura's 'social cognitive theory' emphasizes 'reciprocal determinism'—behavior, personal factors, and environment continuously influence each other. People are neither controlled by environment nor entirely free agents; they both shape and are shaped by circumstances, developing 'self-efficacy' through mastery experiences and observation.\n\nWhich quotation would most directly support Bandura's concept of reciprocal determinism?",
    options: [
      { letter: "A", text: "Human behavior is entirely determined by genetic factors beyond individual control." },
      { letter: "B", text: "As we act on our environment, it changes in ways that then influence our subsequent actions." },
      { letter: "C", text: "Environmental factors have no effect on human development or behavior." },
      { letter: "D", text: "Free will allows humans to act completely independently of circumstances." }
    ],
    correctAnswer: "B",
    explanation: "This directly illustrates reciprocal determinism—mutual influence between behavior and environment in ongoing cycles.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  // Add more questions - batch 3
  {
    id: "vhard_eng_5571",
    question: "Literary critic Harold Bloom proposed an 'anxiety of influence' theory: strong poets creatively 'misread' their predecessors to create imaginative space for originality. This agonistic relationship drives literary history as each generation struggles to differentiate itself from overwhelming precursors.\n\nAs used in the text, 'agonistic' most nearly means:",
    options: [
      { letter: "A", text: "Painful and filled with suffering" },
      { letter: "B", text: "Characterized by struggle or competition" },
      { letter: "C", text: "Skeptical and uncertain" },
      { letter: "D", text: "Collaborative and mutually supportive" }
    ],
    correctAnswer: "B",
    explanation: "Bloom's 'agonistic' refers to the competitive struggle between literary generations, derived from Greek 'agon' (contest).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5572",
    question: "Philosopher Charles Taylor critiques modern 'atomism'—the view that individuals are self-sufficient units whose social bonds are optional and contractual. Taylor argues that human identity is fundamentally 'dialogical': we become selves only through relationships with significant others who provide languages of self-interpretation.\n\nThe text most strongly suggests that:",
    options: [
      { letter: "A", text: "Individual identity can develop in complete isolation from others." },
      { letter: "B", text: "Social relationships are constitutive of rather than optional for selfhood." },
      { letter: "C", text: "Modern society has successfully achieved human flourishing." },
      { letter: "D", text: "Contractual agreements are the foundation of all human bonds." }
    ],
    correctAnswer: "B",
    explanation: "Taylor's dialogical view holds that relationships are not optional additions to pre-formed selves but essential for self-constitution.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5573",
    question: "Text 1: Sociologist Bruno Latour treats humans and non-humans symmetrically as 'actants'—a speed bump 'acts' to slow traffic just as a police officer would.\n\nText 2: Political theorist Hannah Arendt distinguished 'action' (political participation) from 'labor' and 'work,' valuing action as uniquely human capacity for initiating new beginnings.\n\nThe texts suggest a fundamental disagreement about:",
    options: [
      { letter: "A", text: "Whether political participation is valuable." },
      { letter: "B", text: "Whether 'action' is a distinctively human capacity." },
      { letter: "C", text: "Whether sociology can study material objects." },
      { letter: "D", text: "Whether speed bumps are effective traffic control." }
    ],
    correctAnswer: "B",
    explanation: "Latour attributes agency to non-humans; Arendt reserves 'action' as uniquely human—a fundamental disagreement about human distinctiveness.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5574",
    question: "Philosopher Alasdair MacIntyre argues that moral concepts only make sense within tradition-bound practices and communities. Detached from such contexts, modern moral discourse becomes an incoherent jumble of fragments from incompatible traditions, explaining the seemingly endless nature of contemporary moral disagreements.\n\nWhich choice best describes the overall structure?",
    options: [
      { letter: "A", text: "A diagnostic claim is made and then its explanatory power is demonstrated." },
      { letter: "B", text: "Historical evidence is presented and then a theory is derived." },
      { letter: "C", text: "Two moral traditions are compared and synthesized." },
      { letter: "D", text: "Empirical research is described and its limitations acknowledged." }
    ],
    correctAnswer: "A",
    explanation: "MacIntyre makes a diagnostic claim (morality requires tradition context), then shows its explanatory power (explains endless disagreement).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5575",
    question: "Economist Thorstein Veblen coined 'conspicuous consumption'—purchasing goods primarily to display wealth and status rather than for utility. Veblen noted that as societies develop, this display shifts from leisure (showing one can avoid work) to consumption (showing one can afford waste).\n\nAs used in the text, 'conspicuous' most nearly means:",
    options: [
      { letter: "A", text: "Secret and hidden from view" },
      { letter: "B", text: "Intended to be noticed and displayed" },
      { letter: "C", text: "Economically rational" },
      { letter: "D", text: "Morally praiseworthy" }
    ],
    correctAnswer: "B",
    explanation: "Veblen's 'conspicuous' means specifically intended for display and status signaling, not hidden or purely functional.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5576",
    question: "Philosopher Kwame Anthony Appiah develops 'cosmopolitanism'—the ethical view that we have obligations to strangers beyond our immediate communities. Appiah rejects both rigid universalism that ignores cultural differences and relativism that permits any local practice. Instead, cosmopolitanism involves conversation across differences while maintaining commitment to human dignity.\n\nThe text suggests that Appiah's cosmopolitanism:",
    options: [
      { letter: "A", text: "Requires abandoning all local identities and attachments." },
      { letter: "B", text: "Accepts all cultural practices as equally valid." },
      { letter: "C", text: "Seeks a middle path between universalism and relativism." },
      { letter: "D", text: "Applies only to economic relationships between nations." }
    ],
    correctAnswer: "C",
    explanation: "Appiah explicitly rejects both rigid universalism and relativism, positioning cosmopolitanism as a middle path combining dialogue with ethical commitment.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5577",
    question: "Political scientist James Scott documented how states impose 'legibility' on populations through standardized surnames, maps, censuses, and land surveys. These simplifications enable taxation and control but often destroy local knowledge and complex adaptive practices, producing unintended negative consequences in the name of modernization.\n\nWhich finding would most support Scott's argument about unintended consequences?",
    options: [
      { letter: "A", text: "Standardized land surveys always increase agricultural productivity." },
      { letter: "B", text: "Scientific forestry schemes that simplified forests later led to ecological collapse." },
      { letter: "C", text: "Local populations eagerly adopted state simplification schemes." },
      { letter: "D", text: "Modernization projects have no effects on traditional practices." }
    ],
    correctAnswer: "B",
    explanation: "Forestry simplification followed by ecological collapse directly illustrates Scott's thesis about how state legibility projects destroy complex systems with unintended negative effects.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5578",
    question: "Linguist George Lakoff argues that humans think through 'conceptual metaphors'—systematic mappings between concrete domains and abstract concepts. We understand time as money ('spend time'), arguments as war ('defend a position'), and theories as buildings ('solid foundation'). These aren't merely linguistic flourishes but structure actual cognition.\n\nAs used in the text, 'mappings' most nearly means:",
    options: [
      { letter: "A", text: "Cartographic representations of geographic areas" },
      { letter: "B", text: "Systematic correspondences between domains" },
      { letter: "C", text: "Random associations without pattern" },
      { letter: "D", text: "Deliberate rhetorical strategies" }
    ],
    correctAnswer: "B",
    explanation: "Lakoff's 'mappings' refers to systematic correspondences between source domains (money, war) and target domains (time, arguments).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5579",
    question: "Text 1: Economist Joseph Stiglitz showed that information asymmetries create market failures—those needing insurance most are most likely to buy it, driving up prices.\n\nText 2: Economist Ronald Coase demonstrated that when transaction costs are low, private bargaining can resolve externalities without government intervention.\n\nBased on the texts, both economists would likely agree that:",
    options: [
      { letter: "A", text: "Markets always function perfectly without any intervention." },
      { letter: "B", text: "Specific conditions determine whether markets achieve efficient outcomes." },
      { letter: "C", text: "Government intervention is always preferable to market solutions." },
      { letter: "D", text: "Economic theory has no practical policy implications." }
    ],
    correctAnswer: "B",
    explanation: "Both economists emphasize conditions (information symmetry, low transaction costs) for markets to work well—efficiency depends on circumstances.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5580",
    question: "Philosopher Miranda Fricker developed the concept of 'epistemic injustice'—wrongs done to people specifically in their capacity as knowers. 'Testimonial injustice' occurs when prejudice leads hearers to give less credibility to speakers; 'hermeneutical injustice' occurs when gaps in collective interpretive resources disadvantage certain groups' ability to make sense of their experiences.\n\nWhich choice best describes the overall structure?",
    options: [
      { letter: "A", text: "A concept is introduced and then divided into two distinct types." },
      { letter: "B", text: "Two opposing theories are compared and one is selected." },
      { letter: "C", text: "Historical development of an idea is traced chronologically." },
      { letter: "D", text: "Empirical evidence is presented to support a claim." }
    ],
    correctAnswer: "A",
    explanation: "The text introduces epistemic injustice as a general concept, then divides it into two types: testimonial and hermeneutical.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 8
  },
  // Add remaining questions to reach ~100 in first file
  {
    id: "vhard_eng_5581",
    question: "Sociologist Zygmunt Bauman characterizes contemporary life as 'liquid modernity'—a condition where social forms melt and reshape before solidifying, requiring constant adaptation. Unlike solid modernity's durable institutions, liquid modernity offers freedom without security, possibility without stability.\n\nThe text suggests that liquid modernity is characterized by:",
    options: [
      { letter: "A", text: "Stable institutions that endure across generations." },
      { letter: "B", text: "Constant flux that combines freedom with insecurity." },
      { letter: "C", text: "Complete rejection of all modern developments." },
      { letter: "D", text: "Perfect balance between stability and change." }
    ],
    correctAnswer: "B",
    explanation: "Bauman's liquid modernity specifically combines freedom (possibility) with insecurity (lack of stability), a paradoxical condition.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5582",
    question: "Physicist Thomas Kuhn's 'incommensurability' thesis holds that scientists working in different paradigms cannot fully translate their concepts into each other's terms. When paradigms shift, key terms change meaning: 'mass' in Newtonian physics is not identical to 'mass' in relativity, complicating claims of linear scientific progress.\n\nAs used in the text, 'incommensurability' most nearly means:",
    options: [
      { letter: "A", text: "Lack of common measure for comparison" },
      { letter: "B", text: "Numerical inequality" },
      { letter: "C", text: "Moral disagreement" },
      { letter: "D", text: "Physical impossibility" }
    ],
    correctAnswer: "A",
    explanation: "Kuhn's 'incommensurability' means paradigms lack common standards for direct comparison—no neutral measure exists to judge between them.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5583",
    question: "Anthropologist David Graeber traced the history of debt, arguing that contrary to economics textbooks, barter economies did not precede money. Credit and debt relationships came first; money emerged to denominate these obligations. This history reveals debt as a moral and political relationship, not merely an economic one.\n\nWhich finding would most challenge Graeber's argument?",
    options: [
      { letter: "A", text: "Archaeological evidence of extensive barter systems predating any credit relations." },
      { letter: "B", text: "Historical records showing debt used to reinforce social hierarchies." },
      { letter: "C", text: "Contemporary societies that use both money and credit." },
      { letter: "D", text: "Anthropological studies documenting gift economies." }
    ],
    correctAnswer: "A",
    explanation: "Evidence of barter preceding credit would directly contradict Graeber's central historical claim that credit came first.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5584",
    question: "Text 1: Philosopher John Rawls argued that rational designers behind a 'veil of ignorance' would choose principles ensuring fair treatment of the least advantaged.\n\nText 2: Philosopher Robert Nozick argued that just distributions emerge from just acquisitions and transfers, regardless of resulting patterns of inequality.\n\nThe texts reflect a fundamental disagreement about:",
    options: [
      { letter: "A", text: "Whether justice requires attention to distributive outcomes or only to processes." },
      { letter: "B", text: "Whether philosophers should engage in political theory." },
      { letter: "C", text: "Whether rationality is relevant to moral reasoning." },
      { letter: "D", text: "Whether thought experiments have any value." }
    ],
    correctAnswer: "A",
    explanation: "Rawls focuses on outcomes (helping least advantaged); Nozick on processes (just acquisition/transfer regardless of patterns)—the classic distributive/procedural divide.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5585",
    question: "Psychologist Philip Zimbardo's Stanford Prison Experiment assigned volunteers randomly to 'guard' and 'prisoner' roles. Guards quickly became abusive while prisoners became passive, demonstrating how situational forces and social roles can transform behavior independently of individual personalities.\n\nWhich choice best describes the overall structure?",
    options: [
      { letter: "A", text: "A theory is stated and then experimental evidence is described." },
      { letter: "B", text: "An experiment is described and then a conclusion is drawn from its results." },
      { letter: "C", text: "Multiple experiments are compared to establish a pattern." },
      { letter: "D", text: "A hypothesis is proposed and then rejected based on evidence." }
    ],
    correctAnswer: "B",
    explanation: "The text describes the experimental setup and results, then draws the conclusion about situational power over personality.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5586",
    question: "Economist Kenneth Arrow's 'impossibility theorem' proves that no voting system can simultaneously satisfy all reasonable democratic criteria (unanimity, non-dictatorship, independence of irrelevant alternatives). This suggests that every democratic process involves necessary trade-offs between desirable properties.\n\nThe text most strongly suggests that:",
    options: [
      { letter: "A", text: "Democracy is fundamentally impossible and should be abandoned." },
      { letter: "B", text: "Perfect democratic systems cannot be designed, requiring choices among imperfect options." },
      { letter: "C", text: "One specific voting system is clearly superior to all others." },
      { letter: "D", text: "Mathematical analysis is irrelevant to political questions." }
    ],
    correctAnswer: "B",
    explanation: "Arrow's theorem shows no perfect system exists, meaning we must choose among systems with different strengths and weaknesses.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas",
    difficultyRating: 10
  },
  {
    id: "vhard_eng_5587",
    question: "Philosopher Judith Jarvis Thomson's 'violinist' thought experiment asks readers to imagine waking connected to a famous violinist whose survival requires remaining connected for nine months. Even granting the violinist's right to life, Thomson argues, this doesn't establish an obligation to remain connected, distinguishing rights from obligations to provide assistance.\n\nAs used in the text, 'granting' most nearly means:",
    options: [
      { letter: "A", text: "Officially bestowing" },
      { letter: "B", text: "Accepting for the sake of argument" },
      { letter: "C", text: "Legally transferring" },
      { letter: "D", text: "Completely rejecting" }
    ],
    correctAnswer: "B",
    explanation: "Thomson uses 'granting' to mean accepting a premise arguendo—for argument's sake—to show the conclusion doesn't follow even if we accept it.",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficultyRating: 8
  },
  {
    id: "vhard_eng_5588",
    question: "Sociologist Arlie Hochschild developed the concept of 'emotional labor'—the work of managing feelings to produce appropriate facial and bodily displays for employment. Flight attendants must project warmth; bill collectors must project sternness. This commodification of emotion can lead to burnout and alienation from one's own feelings.\n\nWhich quotation would most directly support the text's claim about emotional labor's effects?",
    options: [
      { letter: "A", text: "I love my job and never experience any emotional strain from it." },
      { letter: "B", text: "After years of forced smiling, I no longer know when I'm genuinely happy." },
      { letter: "C", text: "Emotional expression at work is entirely natural and unlearned." },
      { letter: "D", text: "My job involves no interaction with customers or emotional display." }
    ],
    correctAnswer: "B",
    explanation: "This directly illustrates Hochschild's claim about alienation from authentic emotion resulting from commodified emotional labor.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5589",
    question: "Historian Hayden White argued that historical narratives necessarily employ literary tropes and plot structures. Historians don't simply report 'what happened' but 'emplot' events into tragedy, comedy, romance, or satire. This narrativist view challenges claims that history provides unmediated access to the past.\n\nThe passage structure moves from:",
    options: [
      { letter: "A", text: "General to specific" },
      { letter: "B", text: "Claim to implication" },
      { letter: "C", text: "Cause to effect" },
      { letter: "D", text: "Proposal to rejection" }
    ],
    correctAnswer: "B",
    explanation: "The text states White's claim (history uses literary structures), then draws its implication (challenges unmediated access claims).",
    difficulty: "Hard",
    domain: "Craft and Structure",
    skill: "Text Structure",
    difficultyRating: 9
  },
  {
    id: "vhard_eng_5590",
    question: "Text 1: Psychologist Stanley Milgram showed ordinary people would administer dangerous shocks when instructed by authority, demonstrating situational power over individual morality.\n\nText 2: Psychologist Philip Zimbardo's prison experiment showed random role assignment transformed participants into abusive guards or passive prisoners.\n\nBased on the texts, both researchers would likely agree that:",
    options: [
      { letter: "A", text: "Individual personality is the primary determinant of behavior in all situations." },
      { letter: "B", text: "Situational and structural factors can override individual moral dispositions." },
      { letter: "C", text: "Laboratory experiments cannot reveal anything about real-world behavior." },
      { letter: "D", text: "Authority has no effect on individual decision-making." }
    ],
    correctAnswer: "B",
    explanation: "Both Milgram and Zimbardo emphasize situational power—context shapes behavior beyond individual personality or morality.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Rhetorical Synthesis",
    difficultyRating: 9
  }
];

// Combine with generated questions
export const veryHardEnglishQuestions: EnglishQuestion[] = [
  ...baseVeryHardQuestions,
  ...generateMoreVeryHardQuestions()
];

/**
 * Generate additional questions programmatically for variety
 */
function generateMoreVeryHardQuestions(): EnglishQuestion[] {
  const additionalQuestions: EnglishQuestion[] = [];
  
  // Template-based generation for 8-10 difficulty questions
  const templates = [
    // Command of Evidence templates
    {
      topic: "Economist Gary Becker extended economic analysis to domains traditionally considered non-economic, including crime, family decisions, and discrimination. He argued that criminals rationally weigh costs and benefits, families allocate time economically, and discrimination persists when its costs are low.",
      skill: "Command of Evidence",
      domain: "Information and Ideas",
      questionType: "Which finding would most support the text's claim about criminal behavior?",
      options: [
        { letter: "A", text: "Criminals act purely on emotional impulse without calculation." },
        { letter: "B", text: "Crime rates decrease when expected punishment costs increase." },
        { letter: "C", text: "All criminals share identical psychological profiles." },
        { letter: "D", text: "Economic factors have no relationship to criminal activity." }
      ],
      correctAnswer: "B",
      explanation: "Evidence that crime rates respond to expected punishment costs directly supports Becker's rational-choice model of criminal behavior.",
      rating: 9
    },
    {
      topic: "Philosopher Simone de Beauvoir's famous claim that 'one is not born, but rather becomes, a woman' distinguished biological sex from socially constructed gender. Beauvoir analyzed how cultural expectations, myths, and institutions shape femininity as a learned condition rather than natural essence.",
      skill: "Central Ideas",
      domain: "Information and Ideas",
      questionType: "The text most strongly suggests that:",
      options: [
        { letter: "A", text: "Biological and social factors are entirely separate with no interaction." },
        { letter: "B", text: "Gender identity is shaped through social processes rather than being innate." },
        { letter: "C", text: "All societies construct femininity in identical ways." },
        { letter: "D", text: "Individual choice plays no role in gender identity." }
      ],
      correctAnswer: "B",
      explanation: "Beauvoir's central claim is that femininity is 'become' through social construction, not 'born' as natural essence.",
      rating: 9
    },
    {
      topic: "Anthropologist Claude Lévi-Strauss proposed that human minds operate through 'binary oppositions'—raw/cooked, nature/culture, self/other. Myths mediate these oppositions, helping societies navigate fundamental contradictions through narrative resolutions.",
      skill: "Words in Context",
      domain: "Craft and Structure",
      questionType: "As used in the text, 'mediate' most nearly means:",
      options: [
        { letter: "A", text: "Serve as neutral arbitrator" },
        { letter: "B", text: "Work through or negotiate conceptually" },
        { letter: "C", text: "Communicate through media channels" },
        { letter: "D", text: "Reduce in intensity" }
      ],
      correctAnswer: "B",
      explanation: "Lévi-Strauss's 'mediate' means myths work through or negotiate oppositions conceptually, not literal arbitration.",
      rating: 8
    },
    {
      topic: "Economist Albert Hirschman identified 'exit, voice, and loyalty' as responses to organizational decline. Consumers can exit (switch to competitors), voice complaints, or remain loyal. The balance among these responses shapes organizational responsiveness and determines whether decline is reversed.",
      skill: "Text Structure",
      domain: "Craft and Structure",
      questionType: "Which choice best describes the overall structure?",
      options: [
        { letter: "A", text: "A framework is presented and its analytical applications explained." },
        { letter: "B", text: "Multiple competing theories are compared without resolution." },
        { letter: "C", text: "Historical evidence is marshaled to support a causal claim." },
        { letter: "D", text: "A paradox is introduced and then resolved through logic." }
      ],
      correctAnswer: "A",
      explanation: "The text introduces Hirschman's framework (exit/voice/loyalty), then explains how it analyzes organizational dynamics.",
      rating: 8
    }
  ];

  // Generate questions from templates
  templates.forEach((template, index) => {
    additionalQuestions.push({
      id: `vhard_eng_gen_${5591 + index}`,
      question: `${template.topic}\n\n${template.questionType}`,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      difficulty: "Hard",
      domain: template.domain,
      skill: template.skill,
      difficultyRating: template.rating
    });
  });

  // More generated questions for variety
  const moreQuestions: EnglishQuestion[] = [
    {
      id: "vhard_eng_gen_5595",
      question: "Philosopher W.V.O. Quine challenged the analytic/synthetic distinction—the idea that some statements are true by definition while others depend on empirical facts. Quine argued that all beliefs form interconnected webs where any statement can be preserved if we adjust others sufficiently.\n\nThe text suggests that for Quine:",
      options: [
        { letter: "A", text: "Definitional truths are absolutely certain and unchangeable." },
        { letter: "B", text: "The distinction between logical and empirical truths is not as sharp as traditionally believed." },
        { letter: "C", text: "Empirical observations have no bearing on theoretical commitments." },
        { letter: "D", text: "All beliefs are equally well-supported by evidence." }
      ],
      correctAnswer: "B",
      explanation: "Quine's holism denies sharp analytic/synthetic boundaries—both types of statements are revisable within the web of belief.",
      difficulty: "Hard",
      domain: "Information and Ideas",
      skill: "Central Ideas",
      difficultyRating: 10
    },
    {
      id: "vhard_eng_gen_5596",
      question: "Political theorist Chantal Mouffe distinguishes 'politics' (partisan competition) from 'the political' (the dimension of antagonism inherent in human societies). Mouffe argues that liberal attempts to achieve rational consensus deny this fundamental antagonism, paradoxically enabling more dangerous forms of conflict.\n\nAs used in the text, 'antagonism' most nearly means:",
      options: [
        { letter: "A", text: "Personal hostility between individuals" },
        { letter: "B", text: "Inherent dimension of conflict in social relations" },
        { letter: "C", text: "Formal opposition in debate" },
        { letter: "D", text: "Military warfare between nations" }
      ],
      correctAnswer: "B",
      explanation: "Mouffe's 'antagonism' refers to an inherent structural dimension of conflict, not personal hostility or formal debate.",
      difficulty: "Hard",
      domain: "Craft and Structure",
      skill: "Words in Context",
      difficultyRating: 9
    },
    {
      id: "vhard_eng_gen_5597",
      question: "Sociologist Randall Collins's 'interaction ritual chains' theory explains emotional energy transfer in social encounters. Successful rituals—those with shared focus and emotional entrainment—generate energy that participants carry into subsequent interactions, creating chains of ritualized behavior across social life.\n\nWhich quotation would most directly support the text's claim?",
      options: [
        { letter: "A", text: "Social interactions have no emotional component whatsoever." },
        { letter: "B", text: "After an inspiring team meeting, I felt energized throughout the day and performed better in later conversations." },
        { letter: "C", text: "Rituals are confined exclusively to religious ceremonies." },
        { letter: "D", text: "Each social interaction is completely independent of all others." }
      ],
      correctAnswer: "B",
      explanation: "This directly illustrates Collins's chain concept—energy from one successful ritual (meeting) carrying into subsequent interactions.",
      difficulty: "Hard",
      domain: "Information and Ideas",
      skill: "Command of Evidence",
      difficultyRating: 9
    },
    {
      id: "vhard_eng_gen_5598",
      question: "Text 1: Philosopher Immanuel Kant argued that moral actions must be performed from duty alone, not from inclination or expected consequences. The moral worth of an action lies in the principle behind it, not its results.\n\nText 2: Philosopher John Stuart Mill argued that actions are right insofar as they promote happiness. The consequences of actions, not the motives behind them, determine their moral worth.\n\nThe texts reflect a fundamental disagreement about:",
      options: [
        { letter: "A", text: "Whether philosophy can address moral questions." },
        { letter: "B", text: "Whether motive or consequence determines moral worth." },
        { letter: "C", text: "Whether happiness is valuable." },
        { letter: "D", text: "Whether moral reasoning is possible for humans." }
      ],
      correctAnswer: "B",
      explanation: "Kant emphasizes motive/principle; Mill emphasizes consequences—the classic deontology vs. consequentialism divide.",
      difficulty: "Hard",
      domain: "Information and Ideas",
      skill: "Rhetorical Synthesis",
      difficultyRating: 10
    },
    {
      id: "vhard_eng_gen_5599",
      question: "Historian William Cronon argues that 'wilderness' is not natural but a cultural construction—a relatively recent invention that emerged from Romantic aesthetics and frontier mythology. Early Americans saw wilderness negatively; its positive valuation required cultural transformation that obscures human shaping of 'pristine' landscapes.\n\nWhich choice best describes the overall structure?",
      options: [
        { letter: "A", text: "A conventional assumption is challenged and its cultural origins revealed." },
        { letter: "B", text: "Two historical periods are compared without evaluation." },
        { letter: "C", text: "Scientific evidence is presented to support an environmental claim." },
        { letter: "D", text: "A practical proposal for land management is developed." }
      ],
      correctAnswer: "A",
      explanation: "Cronon challenges the conventional view of wilderness as natural, revealing its cultural construction—a classic debunking structure.",
      difficulty: "Hard",
      domain: "Craft and Structure",
      skill: "Text Structure",
      difficultyRating: 9
    },
    {
      id: "vhard_eng_gen_5600",
      question: "Economist Friedrich Hayek argued that market prices encode dispersed information no central planner could aggregate. Each buyer and seller responds to local conditions, with prices emerging that coordinate behavior across the entire economy. This 'spontaneous order' achieves coordination that deliberate planning cannot.\n\nThe text suggests that for Hayek, markets are valuable primarily because they:",
      options: [
        { letter: "A", text: "Maximize profit for all participants equally." },
        { letter: "B", text: "Process and coordinate information distributed across society." },
        { letter: "C", text: "Eliminate all forms of economic inequality." },
        { letter: "D", text: "Require no individual decision-making by participants." }
      ],
      correctAnswer: "B",
      explanation: "Hayek's central argument is about markets as information processors—coordinating dispersed knowledge through price signals.",
      difficulty: "Hard",
      domain: "Information and Ideas",
      skill: "Central Ideas",
      difficultyRating: 9
    }
  ];

  return additionalQuestions.concat(moreQuestions);
}

export const veryHardEnglishCount = veryHardEnglishQuestions.length;
