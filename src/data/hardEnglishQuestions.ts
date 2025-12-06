import { EnglishQuestion } from './englishQuestions';
import { rateDifficulty } from '../utils/difficultyRating';

const addRating = (q: Omit<EnglishQuestion, 'difficultyRating'>): EnglishQuestion => ({
  ...q,
  difficultyRating: rateDifficulty(q.question, q.options, q.domain, q.skill, false)
});

// Level 9-10 English Questions - Complex reading comprehension and writing analysis
export const hardEnglishQuestions: EnglishQuestion[] = [
  // Batch 1: Complex Reading Comprehension
  addRating({
    id: 'hard-eng-001',
    question: 'A sociologist studying urban development argues that gentrification, while often criticized for displacing long-term residents, paradoxically creates conditions that may ultimately benefit the very communities it initially disrupts. The researcher points to evidence showing that property tax increases following gentrification often fund improved schools and infrastructure that serve remaining residents, and that new businesses create employment opportunities for local workers. Critics counter that these benefits are theoretical and that empirical evidence consistently shows net negative outcomes for original residents. Based on this passage, which statement best represents the sociologist\'s central claim?',
    options: [
      { letter: 'A', text: 'Gentrification\'s immediate negative effects are outweighed by long-term systemic improvements that benefit original community members.' },
      { letter: 'B', text: 'The displacement caused by gentrification is morally justifiable because it leads to economic development.' },
      { letter: 'C', text: 'Critics of gentrification fail to consider the complexity of urban economic systems.' },
      { letter: 'D', text: 'Property tax revenues are the primary mechanism through which gentrification benefits communities.' }
    ],
    correctAnswer: 'A',
    explanation: 'The sociologist\'s "paradox" argument centers on the idea that despite initial displacement (negative), long-term outcomes (improved schools, infrastructure, employment) may benefit remaining residents. This matches choice A. Choice B adds moral justification not present in the text. Choice C misrepresents the argument. Choice D focuses on one mechanism rather than the central claim.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas and Arguments'
  }),
  addRating({
    id: 'hard-eng-002',
    question: 'The following passage discusses quantum entanglement: "When two particles become entangled, measuring a property of one particle instantaneously determines the corresponding property of the other, regardless of the distance between them. Einstein famously called this \'spooky action at a distance\' and believed it indicated a flaw in quantum mechanics rather than a genuine physical phenomenon. Subsequent experiments, particularly those testing Bell\'s inequalities, have confirmed that entanglement is real and that Einstein\'s preferred alternative explanation—hidden variables—cannot account for the observed correlations." The author\'s primary purpose in mentioning Einstein is to:',
    options: [
      { letter: 'A', text: 'Demonstrate how even brilliant scientists can be wrong about fundamental physics' },
      { letter: 'B', text: 'Provide historical context for skepticism about entanglement before experimental confirmation' },
      { letter: 'C', text: 'Argue that Einstein\'s contributions to physics have been overestimated' },
      { letter: 'D', text: 'Explain why the scientific community initially rejected quantum mechanics' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage uses Einstein\'s skepticism ("spooky action at a distance") to show that entanglement seemed counterintuitive even to experts, then contrasts this with subsequent experimental confirmation. This provides historical context for why entanglement was doubted. Choice A is too harsh and not the passage\'s purpose. Choice C is not supported. Choice D overstates—the passage doesn\'t say the community rejected QM.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author\'s Purpose'
  }),
  addRating({
    id: 'hard-eng-003',
    question: 'In a comparative literature analysis, a scholar examines how Gabriel García Márquez and Toni Morrison both employ magical realism, though with distinct cultural purposes. García Márquez uses supernatural elements to critique Latin American political systems and colonial legacies, while Morrison deploys similar techniques to represent the psychological reality of African American experience under slavery and its aftermath. The scholar argues that what unites these authors is not merely stylistic similarity but a shared recognition that conventional realism cannot adequately represent certain forms of collective trauma. According to the passage, the scholar\'s comparison of García Márquez and Morrison primarily serves to:',
    options: [
      { letter: 'A', text: 'Establish magical realism as a universal literary technique applicable across all cultures' },
      { letter: 'B', text: 'Argue that both authors prioritize political critique over artistic expression' },
      { letter: 'C', text: 'Suggest that shared literary techniques can emerge from parallel experiences of historical trauma' },
      { letter: 'D', text: 'Demonstrate that Morrison\'s work was directly influenced by García Márquez\'s earlier novels' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage argues that both authors use magical realism because "conventional realism cannot adequately represent certain forms of collective trauma." This suggests parallel development from similar historical circumstances (colonialism, slavery) rather than direct influence. Choice A overstates ("universal"). Choice B misrepresents (artistic expression isn\'t dismissed). Choice D asserts influence not mentioned.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Comparative Analysis'
  }),
  addRating({
    id: 'hard-eng-004',
    question: 'A neuroscientist presents research on decision-making: "Our experiments reveal that decisions traditionally attributed to conscious deliberation are frequently initiated by unconscious neural processes milliseconds before subjects report awareness of having decided. This finding challenges the folk-psychological notion of free will as conscious choice preceding action. However, it does not necessarily negate moral responsibility, as the neural systems involved are still \'ours\' in a meaningful sense, shaped by our histories and values. The question is not whether we have the libertarian free will of uncaused causes, but whether our actions flow from our authentic selves." The author would most likely agree with which of the following statements?',
    options: [
      { letter: 'A', text: 'Neuroscience has definitively proven that humans cannot be held morally responsible for their actions.' },
      { letter: 'B', text: 'The concept of free will should be reconceived rather than entirely abandoned.' },
      { letter: 'C', text: 'Conscious awareness always follows neural decision-making processes.' },
      { letter: 'D', text: 'Traditional philosophical concepts of free will are fully compatible with neuroscientific findings.' }
    ],
    correctAnswer: 'B',
    explanation: 'The author argues that while "libertarian free will" (uncaused causes) is challenged, moral responsibility persists if actions flow from our "authentic selves." This suggests reconceiving rather than abandoning free will. Choice A contradicts the passage (moral responsibility persists). Choice C overstates ("frequently" ≠ "always"). Choice D contradicts (folk-psychological notion is challenged).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inference and Implication'
  }),
  addRating({
    id: 'hard-eng-005',
    question: 'An economist analyzing global trade patterns writes: "The conventional wisdom that free trade unambiguously benefits all participating nations rests on models assuming perfect labor mobility and instantaneous market adjustment. In reality, workers displaced by trade liberalization often face prolonged unemployment and wage losses, particularly in communities where manufacturing was concentrated. The aggregate gains from trade, while real, are distributed in ways that may exacerbate inequality unless offset by robust social insurance systems. Economists who dismiss concerns about trade as economically illiterate fail to distinguish between theoretical efficiency gains and actual welfare outcomes for affected populations." Which rhetorical strategy does the author primarily employ?',
    options: [
      { letter: 'A', text: 'Appeal to authority by citing established economic theories' },
      { letter: 'B', text: 'Critique of oversimplified models by highlighting their unrealistic assumptions' },
      { letter: 'C', text: 'Emotional appeal to sympathy for displaced workers' },
      { letter: 'D', text: 'Direct refutation of free trade as economically harmful' }
    ],
    correctAnswer: 'B',
    explanation: 'The author explicitly identifies unrealistic assumptions in conventional models ("perfect labor mobility and instantaneous market adjustment") and shows how real-world conditions differ. This is a critique of oversimplification. Choice A is opposite—the author challenges economic authority. Choice C is present but not primary. Choice D overstates—the author acknowledges "aggregate gains from trade... are real."',
    difficulty: 'hard',
    domain: 'Rhetorical Analysis',
    skill: 'Rhetorical Strategy'
  }),
  addRating({
    id: 'hard-eng-006',
    question: 'A historian examining the French Revolution argues: "The Terror of 1793-1794, in which revolutionary tribunals executed thousands of perceived enemies of the Republic, has traditionally been interpreted either as a tragic deviation from revolutionary ideals or as evidence that those ideals were inherently flawed. Both interpretations miss a crucial point: the Terror was neither aberration nor logical endpoint, but a contingent response to specific circumstances—foreign invasion, internal rebellion, and economic crisis—that seemed to threaten the Revolution\'s survival. Understanding this context does not excuse the executions, but it does complicate narratives that treat political violence as either accidental or inevitable." The author\'s argument most directly challenges the view that:',
    options: [
      { letter: 'A', text: 'The French Revolution had lasting positive effects on democratic governance' },
      { letter: 'B', text: 'Political violence during the Revolution was either purely circumstantial or entirely predictable' },
      { letter: 'C', text: 'The leaders of the Terror were motivated by sincere ideological commitments' },
      { letter: 'D', text: 'Modern historians have achieved consensus on interpreting the French Revolution' }
    ],
    correctAnswer: 'B',
    explanation: 'The author explicitly rejects both the "tragic deviation" (accidental/circumstantial) and "inherently flawed ideals" (inevitable/predictable) interpretations, arguing instead for a "contingent response." This directly challenges viewing the violence as either purely circumstantial or entirely predictable. Other choices address topics not central to the author\'s argument.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Argument Structure'
  }),
  addRating({
    id: 'hard-eng-007',
    question: 'In analyzing contemporary poetry, a critic writes: "The confessional mode that dominated mid-twentieth-century American poetry has given way to what might be called the \'documentary\' mode—poetry that incorporates found texts, historical documents, and reportage. Yet this shift is not a rejection of the personal but rather a recognition that the self is constituted through larger historical and political forces. In the documentary poem, the poet does not disappear but is repositioned as curator, editor, and witness. The ethical stakes are raised: rather than mining one\'s own trauma for aesthetic effect, the poet now bears responsibility for representing others\' experiences accurately and respectfully." Based on this passage, the critic would most likely characterize the relationship between confessional and documentary poetry as:',
    options: [
      { letter: 'A', text: 'A complete break in which documentary poetry rejects all elements of personal expression' },
      { letter: 'B', text: 'An evolution in which the personal is recontextualized within collective experience' },
      { letter: 'C', text: 'A return to traditional poetic forms that predated confessionalism' },
      { letter: 'D', text: 'A superficial stylistic change that does not affect poetry\'s fundamental concerns' }
    ],
    correctAnswer: 'B',
    explanation: 'The critic explicitly states the shift is "not a rejection of the personal" but "a recognition that the self is constituted through larger historical and political forces." This describes evolution/recontextualization, not complete break (A), return to tradition (C), or superficial change (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Synthesizing Information'
  }),
  addRating({
    id: 'hard-eng-008',
    question: 'A passage from an environmental ethics text reads: "Deep ecologists argue that nature has intrinsic value independent of its utility to humans, while their critics contend that environmental protection is better justified through enlightened anthropocentrism—the recognition that human flourishing ultimately depends on ecosystem health. The debate, however, may be less significant in practice than in theory. Whether one believes a rainforest is valuable in itself or valuable because humans need it, the policy implications often converge: protection over exploitation. The philosophical difference matters primarily when these rationales conflict, as when protecting an endangered species requires sacrificing significant human interests." The author suggests that the distinction between deep ecology and anthropocentrism:',
    options: [
      { letter: 'A', text: 'Is primarily of academic interest since both approaches lead to identical environmental policies' },
      { letter: 'B', text: 'Becomes practically important mainly in cases where environmental and human interests conflict' },
      { letter: 'C', text: 'Should be resolved in favor of deep ecology because it provides stronger protections' },
      { letter: 'D', text: 'Represents a false dichotomy that sophisticated environmentalists have moved beyond' }
    ],
    correctAnswer: 'B',
    explanation: 'The author states the "philosophical difference matters primarily when these rationales conflict, as when protecting an endangered species requires sacrificing significant human interests." This directly supports B. Choice A overstates ("identical"). Choices C and D introduce positions not advocated in the passage.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author\'s Position'
  }),
  addRating({
    id: 'hard-eng-009',
    question: 'A cognitive scientist discussing language acquisition writes: "The \'poverty of the stimulus\' argument holds that children acquire grammatical knowledge that could not have been learned from the linguistic input they receive, suggesting innate language faculties. Critics respond that this argument underestimates the richness of children\'s linguistic environment and the power of statistical learning mechanisms. Recent computational models demonstrate that distributional patterns in child-directed speech contain more grammatical information than previously recognized. However, these models have not yet fully replicated human language acquisition, and the question of whether general learning mechanisms suffice or language-specific endowments are required remains open." The author\'s stance on the nativist-empiricist debate in language acquisition can best be characterized as:',
    options: [
      { letter: 'A', text: 'Firmly supporting the nativist position based on the poverty of the stimulus argument' },
      { letter: 'B', text: 'Firmly supporting the empiricist position based on computational modeling results' },
      { letter: 'C', text: 'Agnostic, acknowledging evidence on both sides while noting the question remains unresolved' },
      { letter: 'D', text: 'Dismissive, suggesting the debate is based on outdated research paradigms' }
    ],
    correctAnswer: 'C',
    explanation: 'The author presents the nativist argument, the empiricist response with computational models, but concludes that "models have not yet fully replicated human language acquisition" and "the question... remains open." This is an agnostic stance acknowledging both sides, matching C.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Evaluating Arguments'
  }),
  addRating({
    id: 'hard-eng-010',
    question: 'An art historian analyzing abstract expressionism writes: "Clement Greenberg\'s formalist criticism championed abstract expressionism as the culmination of modernist painting—art purified to its essential elements of color, line, and flatness. This teleological narrative, however, obscured the movement\'s diverse and often contradictory impulses. Artists like Rothko sought spiritual transcendence, while de Kooning never fully abandoned figuration. Pollock\'s drip paintings, far from achieving pure opticality, incorporated bodily gesture and aleatory processes that Greenberg\'s theory could not accommodate. The current reassessment of abstract expressionism requires attending to what formalist criticism systematically marginalized." The phrase "teleological narrative" most nearly refers to:',
    options: [
      { letter: 'A', text: 'A historical account that interprets events as progressing toward a predetermined goal' },
      { letter: 'B', text: 'A critical approach that values technical skill over conceptual innovation' },
      { letter: 'C', text: 'A biographical method that explains art through artists\' personal histories' },
      { letter: 'D', text: 'A theoretical framework that emphasizes art\'s social and political functions' }
    ],
    correctAnswer: 'A',
    explanation: 'The author describes Greenberg viewing abstract expressionism as "the culmination of modernist painting"—an endpoint toward which art was progressing. This is a teleological (goal-directed, end-oriented) narrative. The passage criticizes this for "obscuring" diversity, suggesting events were forced into a predetermined story.',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Words in Context'
  }),
  // Batch 2: Complex Writing and Grammar
  addRating({
    id: 'hard-eng-011',
    question: 'In a research paper analyzing climate change policy, a student writes: "The Paris Agreement represents an unprecedented international commitment to limiting global temperature rise; however, the agreement\'s reliance on voluntary national contributions, rather than binding emissions targets, has led critics to question it\'s long-term effectiveness. Nevertheless, supporters argue that the framework\'s flexibility was necessary to achieve broad participation, and that the ratcheting mechanism requiring increasingly ambitious pledges over time will drive sufficient action." Which underlined portion contains an error that must be corrected?',
    options: [
      { letter: 'A', text: 'unprecedented international commitment' },
      { letter: 'B', text: 'it\'s long-term effectiveness' },
      { letter: 'C', text: 'framework\'s flexibility' },
      { letter: 'D', text: 'ratcheting mechanism requiring' }
    ],
    correctAnswer: 'B',
    explanation: '"It\'s" is a contraction of "it is," but the sentence requires the possessive pronoun "its" (no apostrophe) to show possession of "long-term effectiveness." This is a common error. The other underlined portions are correct: "unprecedented" modifies "commitment" correctly, "framework\'s" is a proper possessive, and "requiring" correctly forms a participial phrase.',
    difficulty: 'hard',
    domain: 'Standard English Conventions',
    skill: 'Possessives and Contractions'
  }),
  addRating({
    id: 'hard-eng-012',
    question: 'A museum catalog contains the following sentence: "The installation, which comprises seventeen individual sculptures arranged according to principles derived from sacred geometry and each crafted from reclaimed industrial materials that the artist personally salvaged from abandoned factories throughout the Rust Belt, challenges viewers to reconsider the relationship between industrialization, spirituality, and environmental decay." Which revision best improves the clarity and readability of this sentence while maintaining its meaning?',
    options: [
      { letter: 'A', text: 'Keep the sentence as written; the complexity appropriately reflects the artwork\'s complexity.' },
      { letter: 'B', text: 'Break into two sentences: "The installation comprises seventeen individual sculptures arranged according to principles derived from sacred geometry. Each sculpture is crafted from reclaimed industrial materials that the artist personally salvaged from abandoned factories throughout the Rust Belt, challenging viewers to reconsider the relationship between industrialization, spirituality, and environmental decay."' },
      { letter: 'C', text: 'Remove the clause about material sourcing as unnecessary detail.' },
      { letter: 'D', text: 'Replace the relative clauses with a bulleted list of the installation\'s features.' }
    ],
    correctAnswer: 'B',
    explanation: 'The original sentence is grammatically correct but extremely difficult to parse due to multiple embedded clauses. Option B preserves all information while improving readability by creating two focused sentences. Option A ignores readability concerns. Option C removes relevant information. Option D is inappropriate for formal catalog writing.',
    difficulty: 'hard',
    domain: 'Expression of Ideas',
    skill: 'Sentence Structure and Clarity'
  }),
  addRating({
    id: 'hard-eng-013',
    question: 'A journalist writes: "The mayor, along with several council members, were present at the groundbreaking ceremony. The crowd of supporters, some of whom had traveled from neighboring counties to attend the event, were enthusiastic about the new community center. Neither the budget constraints nor the construction timeline have deterred the administration from proceeding with the project." How many subject-verb agreement errors appear in this passage?',
    options: [
      { letter: 'A', text: 'No errors' },
      { letter: 'B', text: 'One error' },
      { letter: 'C', text: 'Two errors' },
      { letter: 'D', text: 'Three errors' }
    ],
    correctAnswer: 'C',
    explanation: 'First sentence: "The mayor...were present" is incorrect; the subject is "mayor" (singular), so it should be "was present." The phrase "along with several council members" is parenthetical and doesn\'t change the subject. Second sentence: "The crowd...were enthusiastic" is incorrect; "crowd" is singular, so it should be "was enthusiastic." Third sentence is correct: with "neither...nor," the verb agrees with the nearer subject ("timeline"), and "has" would actually be preferred, but "have" agrees with the compound subject as a whole—this is a contested point, so we\'ll call this acceptable. Two clear errors.',
    difficulty: 'hard',
    domain: 'Standard English Conventions',
    skill: 'Subject-Verb Agreement'
  }),
  addRating({
    id: 'hard-eng-014',
    question: 'Consider the following paragraph from a literary analysis: "(1) Fitzgerald\'s use of the green light in The Great Gatsby has been interpreted variously as symbolizing hope, the American Dream, or Gatsby\'s obsessive desire for Daisy. (2) However, focusing exclusively on symbolic interpretation risks reducing the novel to a puzzle to be solved. (3) The green light functions first and foremost as a narrative element—a visual focal point that draws together the novel\'s themes of vision, distance, and unattainability. (4) When Nick first sees Gatsby reaching toward the green light, the image is powerful precisely because of what we do not yet understand. (5) Meaning accumulates through the novel\'s progression, not through decoding." The writer wants to add the following sentence: "This interpretive humility allows the symbol to retain its evocative power." Where should this sentence be placed for the most logical flow?',
    options: [
      { letter: 'A', text: 'After sentence 2' },
      { letter: 'B', text: 'After sentence 3' },
      { letter: 'C', text: 'After sentence 4' },
      { letter: 'D', text: 'After sentence 5' }
    ],
    correctAnswer: 'D',
    explanation: 'The new sentence discusses "interpretive humility" and the symbol retaining "evocative power." This best follows sentence 5, which argues for meaning accumulating through progression rather than decoding—this IS the interpretive humility referenced. Placing it after sentence 5 provides a fitting conclusion that synthesizes the paragraph\'s argument.',
    difficulty: 'hard',
    domain: 'Expression of Ideas',
    skill: 'Logical Sequence and Cohesion'
  }),
  addRating({
    id: 'hard-eng-015',
    question: 'An academic paper includes this sentence: "The researchers hypothesized that participants whom they had primed with concepts related to elderly stereotypes would subsequently walk more slowly; this effect, which has been replicated in numerous studies and has been influential in social psychology, was originally demonstrated by Bargh et al. in 1996." Which of the following best describes the sentence\'s grammatical structure?',
    options: [
      { letter: 'A', text: 'The sentence contains a grammatical error in the use of "whom"' },
      { letter: 'B', text: 'The sentence correctly uses "whom" as the object of a relative clause within a larger noun clause' },
      { letter: 'C', text: 'The sentence should use "which" instead of "whom" to refer to participants' },
      { letter: 'D', text: 'The semicolon is incorrectly used to join a dependent and independent clause' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence is grammatically correct. "Whom" is the object of "had primed" (the researchers had primed whom). The relative clause "whom they had primed with concepts..." correctly modifies "participants." The semicolon correctly joins two independent clauses. Choice A incorrectly identifies an error. Choice C is wrong because "which" refers to things, not people. Choice D is wrong because both clauses are independent.',
    difficulty: 'hard',
    domain: 'Standard English Conventions',
    skill: 'Relative Pronouns and Clause Structure'
  }),
  addRating({
    id: 'hard-eng-016',
    question: 'A policy brief contains the following sentences: "The proposed legislation would require all new commercial buildings to meet stringent energy efficiency standards. Proponents argue that, while initial construction costs would increase by approximately 15 percent, long-term energy savings would offset these costs within a decade. Moreover, they contend that the policy would stimulate innovation in green building technologies and create jobs in the growing sustainable construction sector." The writer wants to add a sentence acknowledging the opposition\'s perspective. Which addition best maintains the passage\'s objective, analytical tone?',
    options: [
      { letter: 'A', text: '"Critics, however, simply refuse to acknowledge the environmental imperative driving this legislation."' },
      { letter: 'B', text: '"Opponents of the legislation, including several industry groups, argue that the increased upfront costs would disproportionately burden small developers and could slow commercial construction in economically vulnerable regions."' },
      { letter: 'C', text: '"Of course, there are always those who resist progress in favor of short-term profits."' },
      { letter: 'D', text: '"The opposition\'s arguments have been thoroughly debunked by environmental economists."' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage maintains an objective tone, presenting proponents\' arguments without editorializing. Choice B continues this approach by presenting opponents\' specific arguments neutrally. Choice A uses dismissive language ("simply refuse"). Choice C is condescending ("resist progress"). Choice D editorializes ("thoroughly debunked") rather than presenting the opposition\'s view.',
    difficulty: 'hard',
    domain: 'Expression of Ideas',
    skill: 'Tone and Style'
  }),
  addRating({
    id: 'hard-eng-017',
    question: 'Identify the sentence that correctly uses parallel structure:\n\nI. The study found that participants who exercised regularly had lower blood pressure, reduced anxiety levels, and their sleep quality was improved.\n\nII. The study found that participants who exercised regularly had lower blood pressure, reduced anxiety levels, and improved sleep quality.\n\nIII. The study found that exercising regularly lowered blood pressure, that it reduced anxiety levels, and that sleep quality was improved.\n\nIV. The study found that regular exercise lowered blood pressure, reduced anxiety, and improved sleep quality.',
    options: [
      { letter: 'A', text: 'I and III only' },
      { letter: 'B', text: 'II only' },
      { letter: 'C', text: 'II and IV only' },
      { letter: 'D', text: 'IV only' }
    ],
    correctAnswer: 'C',
    explanation: 'Parallel structure requires consistent grammatical form in a series. Sentence II uses three parallel adjective phrases (lower blood pressure, reduced anxiety levels, improved sleep quality). Sentence IV uses three parallel past-tense verbs (lowered, reduced, improved). Sentence I breaks parallelism with "their sleep quality was improved." Sentence III is awkward and breaks parallelism with the passive final clause.',
    difficulty: 'hard',
    domain: 'Standard English Conventions',
    skill: 'Parallel Structure'
  }),
  addRating({
    id: 'hard-eng-018',
    question: 'A student essay contains this passage: "The advent of social media has fundamentally transformed political discourse. Where citizens once relied on professional journalists to filter and contextualize information, they now encounter a deluge of unvetted claims, often algorithmically tailored to confirm their existing beliefs. This epistemic fragmentation poses challenges for democratic deliberation that require solutions beyond individual fact-checking." The student wants to strengthen the argument by adding evidence. Which addition would be most effective?',
    options: [
      { letter: 'A', text: 'Adding a personal anecdote about the student\'s own social media use' },
      { letter: 'B', text: 'Citing a study showing correlation between social media use and political polarization' },
      { letter: 'C', text: 'Including a quotation from a philosopher defining "epistemic fragmentation"' },
      { letter: 'D', text: 'Providing a historical overview of mass media since the printing press' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage makes claims about social media\'s effects on political discourse and epistemic conditions. Empirical evidence (a study showing correlation with polarization) would directly support these claims. A personal anecdote (A) lacks generalizability. A definition (C) doesn\'t provide evidence for effects. Historical overview (D) is tangential to the specific argument.',
    difficulty: 'hard',
    domain: 'Expression of Ideas',
    skill: 'Evidence and Support'
  }),
  addRating({
    id: 'hard-eng-019',
    question: 'Consider the following sentence: "The phenomenon whereby individuals systematically overestimate their own abilities relative to others—known as the Dunning-Kruger effect—has been observed across diverse domains, from logical reasoning to emotional intelligence, and has significant implications for education, workplace training, and self-assessment practices." Which of the following is true about this sentence?',
    options: [
      { letter: 'A', text: 'The em-dashes are incorrectly used and should be replaced with commas' },
      { letter: 'B', text: 'The sentence contains a dangling modifier' },
      { letter: 'C', text: 'The sentence correctly uses em-dashes to set off a non-essential appositive phrase' },
      { letter: 'D', text: 'The phrase "from logical reasoning to emotional intelligence" should be hyphenated' }
    ],
    correctAnswer: 'C',
    explanation: 'The em-dashes correctly set off the appositive phrase "known as the Dunning-Kruger effect," which provides additional information about the phenomenon. Em-dashes are appropriate here for emphasis and to handle the complexity of the sentence structure. The sentence has no dangling modifier—"the phenomenon" is clearly the subject. The phrase about logical reasoning does not require hyphenation.',
    difficulty: 'hard',
    domain: 'Standard English Conventions',
    skill: 'Punctuation and Sentence Boundaries'
  }),
  addRating({
    id: 'hard-eng-020',
    question: 'A research abstract states: "This study investigates the correlation between childhood trauma and adult attachment styles, controlling for socioeconomic status, education level, and current relationship status. Using a longitudinal design with 500 participants tracked over 15 years, we find that early adverse experiences predict insecure attachment patterns in adulthood, though this relationship is moderated by the presence of at least one stable, supportive relationship during adolescence." The phrase "controlling for" most nearly means:',
    options: [
      { letter: 'A', text: 'Eliminating from the study population' },
      { letter: 'B', text: 'Statistically accounting for the influence of' },
      { letter: 'C', text: 'Randomly assigning participants based on' },
      { letter: 'D', text: 'Measuring simultaneously with' }
    ],
    correctAnswer: 'B',
    explanation: '"Controlling for" in research methodology means statistically adjusting for potential confounding variables to isolate the relationship between the primary variables of interest. The researchers aren\'t eliminating participants (A), assigning them randomly (C), or simply measuring other variables (D)—they\'re using statistical techniques to account for these factors\' potential influence on the main relationship being studied.',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Technical and Academic Vocabulary'
  }),
  // Batch 3: More Complex Analysis
  addRating({
    id: 'hard-eng-021',
    question: 'Two passages discuss artificial intelligence ethics:\n\nPassage A: "The development of artificial general intelligence (AGI) poses existential risks that demand immediate attention. Once an AGI system surpasses human intelligence, it may pursue goals misaligned with human values, and we may be unable to correct or constrain it. The prudent course is to prioritize AI safety research and, if necessary, to slow capability research until safety catches up."\n\nPassage B: "Concerns about superintelligent AI, while theoretically interesting, distract from pressing current problems: algorithmic bias, surveillance capitalism, and the displacement of workers. By focusing on speculative future scenarios, we neglect the ways AI systems are already harming marginalized communities. We should address today\'s concrete harms rather than hypothetical future ones."\n\nWhich statement best describes the relationship between the two passages?',
    options: [
      { letter: 'A', text: 'Passage B directly refutes the scientific claims made in Passage A' },
      { letter: 'B', text: 'The passages disagree about what should be prioritized in AI ethics discourse' },
      { letter: 'C', text: 'Passage A focuses on technical problems while Passage B addresses philosophical concerns' },
      { letter: 'D', text: 'Both passages agree that current AI systems pose significant risks' }
    ],
    correctAnswer: 'B',
    explanation: 'Passage A prioritizes long-term existential risk from AGI; Passage B argues for prioritizing current harms. This is a disagreement about priorities, not scientific claims (A) or technical vs. philosophical focus (C is reversed). While both see risks, they disagree about which risks deserve attention now (D misses this key disagreement).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Paired Passage Analysis'
  }),
  addRating({
    id: 'hard-eng-022',
    question: 'An essay about urban planning states: "Jane Jacobs\' The Death and Life of Great American Cities (1961) revolutionized urban planning by challenging the then-dominant orthodoxy of modernist city design. Where planners like Robert Moses sought to impose order through grand projects—highways, housing projects, urban renewal—Jacobs celebrated the organic complexity of traditional urban neighborhoods. Her concept of \'eyes on the street\' recognized that mixed-use development and pedestrian activity create natural surveillance that promotes safety." Based on this passage, Jacobs would most likely criticize which of the following urban development proposals?',
    options: [
      { letter: 'A', text: 'Converting an abandoned factory into mixed-use space with retail, offices, and apartments' },
      { letter: 'B', text: 'Building a pedestrian-only shopping district with ground-floor retail and upper-floor residences' },
      { letter: 'C', text: 'Constructing a high-rise residential complex with interior courtyards isolated from street traffic' },
      { letter: 'D', text: 'Renovating historic buildings to maintain neighborhood character while updating infrastructure' }
    ],
    correctAnswer: 'C',
    explanation: 'Based on the passage, Jacobs valued mixed-use development, pedestrian activity, and "eyes on the street." A high-rise complex with "interior courtyards isolated from street traffic" contradicts these principles—it separates residents from street life, reducing natural surveillance. Options A, B, and D all align with Jacobs\' preferences for mixed use and street-level activity.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Application of Ideas'
  }),
  addRating({
    id: 'hard-eng-023',
    question: 'A philosophy text discusses the "is-ought problem": "David Hume observed that many moral arguments move illicitly from descriptive premises about what is the case to normative conclusions about what ought to be done. From the fact that human beings naturally seek pleasure, it does not follow that we ought to maximize pleasure. This logical gap between facts and values—known as Hume\'s guillotine—continues to challenge moral philosophers who seek to ground ethics in natural facts about human flourishing or evolutionary psychology." The author\'s use of the phrase "Hume\'s guillotine" most likely serves to:',
    options: [
      { letter: 'A', text: 'Suggest that Hume\'s argument was dangerously radical for its time' },
      { letter: 'B', text: 'Vividly represent the sharp separation Hume identified between facts and values' },
      { letter: 'C', text: 'Indicate that Hume\'s argument effectively ended all naturalistic ethics' },
      { letter: 'D', text: 'Compare Hume\'s philosophical method to the French Revolution' }
    ],
    correctAnswer: 'B',
    explanation: 'The metaphor of a "guillotine" suggests a sharp, clean cut—representing the logical gap between "is" and "ought." The author introduces the term after explaining the "logical gap," indicating it vividly represents this separation. The passage doesn\'t suggest radicalism (A), that naturalistic ethics ended (C contradicts "continues to challenge"), or any French Revolution connection (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Figurative Language and Metaphor'
  }),
  addRating({
    id: 'hard-eng-024',
    question: 'A scientific article states: "The discovery of gravitational waves in 2015 confirmed a prediction Einstein made a century earlier, but it also opened a new window onto the universe. Unlike electromagnetic radiation, gravitational waves pass through matter essentially unimpeded, allowing us to observe phenomena that would otherwise be invisible—such as the merger of black holes, which emit no light. Moreover, gravitational wave astronomy provides an independent means of measuring cosmic distances, potentially resolving discrepancies in existing measurements of the universe\'s expansion rate." The phrase "opened a new window onto the universe" functions in the passage as:',
    options: [
      { letter: 'A', text: 'A literal description of the physical mechanism by which gravitational waves are detected' },
      { letter: 'B', text: 'A metaphor suggesting that gravitational wave detection enables observation of previously inaccessible phenomena' },
      { letter: 'C', text: 'An exaggeration of the discovery\'s significance for rhetorical effect' },
      { letter: 'D', text: 'A technical term used in astrophysics to describe observational methods' }
    ],
    correctAnswer: 'B',
    explanation: 'The phrase is a metaphor—gravitational waves don\'t literally open a window. The rest of the paragraph explains what this "window" reveals: phenomena "that would otherwise be invisible." This supports reading the phrase as a metaphor for enabling new types of observation. It\'s not literal (A), and the passage provides substantive justification, suggesting it\'s not mere exaggeration (C) or technical jargon (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Figurative Language'
  }),
  addRating({
    id: 'hard-eng-025',
    question: 'A paragraph from a historical analysis reads: "The conventional narrative portrays the civil rights movement as a struggle for inclusion within American society—a demand that the nation live up to its founding ideals of equality and liberty. This integrationist framework, however, obscures the more radical strains of Black political thought that questioned whether American institutions could ever deliver justice to African Americans. Figures like Malcolm X and the later Martin Luther King Jr. articulated systemic critiques that challenged not just segregation but the economic and imperial foundations of American power." The author\'s primary purpose is to:',
    options: [
      { letter: 'A', text: 'Argue that the civil rights movement ultimately failed to achieve its goals' },
      { letter: 'B', text: 'Complicate a simplified understanding of the civil rights movement by highlighting overlooked perspectives' },
      { letter: 'C', text: 'Demonstrate that Malcolm X was more influential than Martin Luther King Jr.' },
      { letter: 'D', text: 'Criticize historians for deliberately misrepresenting Black political thought' }
    ],
    correctAnswer: 'B',
    explanation: 'The author identifies a "conventional narrative" and argues it "obscures" other perspectives—specifically "more radical strains" of thought. This is an effort to complicate or add nuance to a simplified understanding. The passage doesn\'t claim failure (A), rank influence (C), or accuse historians of deliberate misrepresentation—"conventional narrative" isn\'t necessarily malicious (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author\'s Purpose'
  }),
  addRating({
    id: 'hard-eng-026',
    question: 'Consider the following argument: "Universities have traditionally been spaces for free inquiry and open debate. The recent trend of disinviting controversial speakers threatens this tradition by shielding students from ideas they might find objectionable. If students cannot engage with challenging viewpoints in the relatively protected environment of a university, they will be ill-prepared for a democratic society where they must contend with those who disagree with them." Which of the following, if true, would most weaken this argument?',
    options: [
      { letter: 'A', text: 'Many disinvited speakers hold views that have been thoroughly refuted by experts in their fields' },
      { letter: 'B', text: 'Students who advocate for disinvitations often engage extensively with the speakers\' ideas before deciding to protest' },
      { letter: 'C', text: 'Some universities have seen increased donations after disinviting controversial speakers' },
      { letter: 'D', text: 'The speakers who are disinvited are often willing to speak at other venues' }
    ],
    correctAnswer: 'B',
    explanation: 'The argument assumes students are being "shielded" from ideas and thus not "engaging" with challenging viewpoints. If students who advocate disinvitation have actually engaged extensively with the speakers\' ideas (B), this undermines the assumption that disinvitation equals lack of engagement. Option A doesn\'t address engagement. Options C and D are irrelevant to the argument\'s core about student engagement.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Evaluating Arguments'
  }),
  addRating({
    id: 'hard-eng-027',
    question: 'An essay about music criticism states: "The question of whether popular music deserves serious critical analysis was once hotly debated but is now largely settled. What remains contentious is how to conduct such analysis. Should critics approach popular music with the same formal tools developed for classical music—harmonic analysis, structural analysis—or does popular music require its own critical vocabulary that accounts for production techniques, cultural context, and embodied experience? The risk of the former approach is reducing pop to a degraded version of classical; the risk of the latter is abandoning any standards of craft or quality." Based on this passage, the author would most likely agree that:',
    options: [
      { letter: 'A', text: 'Classical music is inherently superior to popular music' },
      { letter: 'B', text: 'Effective criticism of popular music requires developing appropriate methodologies' },
      { letter: 'C', text: 'Production techniques are more important than harmonic structure in pop music' },
      { letter: 'D', text: 'Academic music criticism should avoid popular music entirely' }
    ],
    correctAnswer: 'B',
    explanation: 'The author presents a methodological debate and identifies "risks" with each approach, implying that the right methodology matters. This suggests the author believes effective criticism requires developing appropriate methodologies (B). The author doesn\'t endorse classical superiority (A), prioritize production over harmony (C), or suggest avoiding pop (D)—the "settled" question was whether pop "deserves serious critical analysis" (implying it does).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inference'
  }),
  addRating({
    id: 'hard-eng-028',
    question: 'A scientific paper abstract reads: "Although the heritability of intelligence has been estimated at 50-80% in twin studies, recent genomic research has identified variants accounting for only 5-10% of variance in cognitive ability. This \'missing heritability\' puzzle may be explained by the polygenicity of intelligence—thousands of genetic variants each contributing tiny effects that are difficult to detect individually. Alternatively, the original twin study estimates may have been inflated by shared environmental factors that twins experience more similarly than non-twin siblings, or by gene-environment interactions that make heritability estimates context-dependent." The author presents the "missing heritability" puzzle primarily to:',
    options: [
      { letter: 'A', text: 'Argue that intelligence is not heritable' },
      { letter: 'B', text: 'Illustrate a discrepancy between two types of genetic research and offer possible explanations' },
      { letter: 'C', text: 'Prove that twin studies are fundamentally flawed' },
      { letter: 'D', text: 'Demonstrate that genomic research has surpassed twin studies in accuracy' }
    ],
    correctAnswer: 'B',
    explanation: 'The author presents a discrepancy (50-80% from twin studies vs. 5-10% from genomics) and offers multiple possible explanations (polygenicity, inflated estimates, gene-environment interactions). This is illustrating a puzzle and offering explanations (B). The passage doesn\'t deny heritability (A), claim twin studies are fundamentally flawed (C), or assert genomics is more accurate (D)—these would go beyond what the balanced presentation suggests.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Analyzing Scientific Arguments'
  }),
  addRating({
    id: 'hard-eng-029',
    question: 'A passage from a philosophical essay states: "The utilitarian calculus, which evaluates actions solely by their consequences for aggregate welfare, faces the notorious problem of \'utility monsters\'—beings whose capacity for pleasure so exceeds that of normal humans that maximizing utility would require sacrificing ordinary people\'s interests to satisfy them. While this thought experiment is often dismissed as fanciful, it illuminates a genuine tension in utilitarian thinking: the theory\'s commitment to impartiality seems to conflict with our intuition that each person\'s interests deserve some minimal protection regardless of others\' capacity for pleasure." The "utility monster" thought experiment is used in the passage to:',
    options: [
      { letter: 'A', text: 'Prove definitively that utilitarianism is false' },
      { letter: 'B', text: 'Highlight a tension between utilitarian principles and ordinary moral intuitions' },
      { letter: 'C', text: 'Argue that some beings deserve more moral consideration than others' },
      { letter: 'D', text: 'Show that philosophical thought experiments are unrealistic and unhelpful' }
    ],
    correctAnswer: 'B',
    explanation: 'The author explicitly states the thought experiment "illuminates a genuine tension" between the theory\'s "commitment to impartiality" and "our intuition that each person\'s interests deserve some minimal protection." This is highlighting a tension (B). The passage doesn\'t claim utilitarianism is definitively false (A), endorse unequal moral consideration (C), or dismiss thought experiments as unhelpful (D)—it says the experiment is valuable despite being "dismissed as fanciful."',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Argument Analysis'
  }),
  addRating({
    id: 'hard-eng-030',
    question: 'A media studies essay contains: "The parasocial relationship—the one-sided sense of intimacy that viewers develop with media figures—has been transformed by social media. Where television created parasocial bonds through repeated exposure to consistent personas, platforms like Twitter and Instagram create the illusion of reciprocity: fans can reply to celebrities, who occasionally respond, blurring the line between the public and private. This pseudo-intimacy may intensify emotional investment while remaining fundamentally asymmetrical; the celebrity does not know the fan as the fan knows the celebrity." The word "asymmetrical" in context most nearly means:',
    options: [
      { letter: 'A', text: 'Unequal in knowledge, investment, or power between the two parties' },
      { letter: 'B', text: 'Visually unbalanced or aesthetically displeasing' },
      { letter: 'C', text: 'Moving in opposite directions at different speeds' },
      { letter: 'D', text: 'Characterized by conflict or disagreement' }
    ],
    correctAnswer: 'A',
    explanation: 'The context makes the meaning clear: "the celebrity does not know the fan as the fan knows the celebrity." This describes an inequality in knowledge and investment—the relationship is not reciprocal or balanced. This matches A. The other options apply "asymmetrical" meanings that don\'t fit this social/relational context.',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Words in Context'
  }),
  // Continue with more questions...
  addRating({
    id: 'hard-eng-031',
    question: 'A legal brief argues: "The defendant contends that the regulation exceeds the agency\'s statutory authority. This argument misapprehends the doctrine of deference to administrative agencies. Under Chevron v. USA (1984), courts defer to an agency\'s reasonable interpretation of ambiguous statutory provisions, recognizing that Congress has implicitly delegated gap-filling authority to expert agencies. The regulation in question interprets an ambiguous term in a manner consistent with the statute\'s purpose and supported by the agency\'s technical expertise. While alternative interpretations may exist, the existence of alternatives does not render the agency\'s interpretation unreasonable." Which logical structure best describes this argument?',
    options: [
      { letter: 'A', text: 'The argument proceeds by eliminating alternative explanations until only one remains' },
      { letter: 'B', text: 'The argument appeals to legal precedent to establish a standard, then applies that standard to the case at hand' },
      { letter: 'C', text: 'The argument uses emotional appeal to persuade the audience of the agency\'s good intentions' },
      { letter: 'D', text: 'The argument relies on the authority of scientific experts to validate the regulation' }
    ],
    correctAnswer: 'B',
    explanation: 'The argument cites Chevron (precedent) to establish the deference standard, then applies that standard to the case ("The regulation in question interprets an ambiguous term..."). This is textbook appeal to precedent followed by application. The argument doesn\'t eliminate alternatives (A)—it acknowledges they exist. It doesn\'t use emotional appeal (C). It mentions expertise but doesn\'t rely on scientific validation (D)—the legal issue is statutory interpretation.',
    difficulty: 'hard',
    domain: 'Rhetorical Analysis',
    skill: 'Logical Structure'
  }),
  addRating({
    id: 'hard-eng-032',
    question: 'An archaeology journal article states: "The traditional model of Neolithic expansion in Europe—a \'wave of advance\' carrying farming and pottery from the Near East—has been complicated by genetic evidence. While early Neolithic populations show significant Near Eastern ancestry, the pattern is not uniform: some regions show more admixture with local hunter-gatherers than others, and later Neolithic populations show increasing proportions of hunter-gatherer ancestry. This suggests a more complex process involving not just migration but also cultural transmission and demographic fluctuations over millennia." The author\'s use of "complicated" most nearly means:',
    options: [
      { letter: 'A', text: 'Made impossible to understand or verify' },
      { letter: 'B', text: 'Revealed to be completely false' },
      { letter: 'C', text: 'Shown to be more nuanced than originally thought' },
      { letter: 'D', text: 'Confirmed through additional evidence' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage doesn\'t say the traditional model is wrong—it says the pattern "is not uniform" and suggests "a more complex process." This indicates nuance and complexity, not falsification (B) or confusion (A). "Confirmed" (D) is opposite—the model has been challenged, not confirmed. "Complicated" here means made more complex/nuanced (C).',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Words in Context'
  }),
  addRating({
    id: 'hard-eng-033',
    question: 'A speech by a public health official contains: "We cannot allow perfect to be the enemy of good. Yes, this vaccine was developed faster than any in history. Yes, long-term effects are by definition unknown at this point. But the known risks of the disease far exceed the known and projected risks of vaccination. Every day we delay is measured not in abstractions but in lives lost, families devastated, healthcare workers pushed beyond endurance. The choice is not between certainty and uncertainty—it is between the certain devastation of inaction and the managed uncertainty of action." The rhetorical strategy of the final sentence is best described as:',
    options: [
      { letter: 'A', text: 'False dichotomy, presenting only two options when others exist' },
      { letter: 'B', text: 'Reframing, reformulating the decision in terms more favorable to the speaker\'s position' },
      { letter: 'C', text: 'Appeal to tradition, invoking historical precedent to support the conclusion' },
      { letter: 'D', text: 'Ad hominem attack, criticizing those who disagree rather than their arguments' }
    ],
    correctAnswer: 'B',
    explanation: 'The speaker explicitly reframes ("The choice is not... it is...") from "certainty vs. uncertainty" to "certain devastation vs. managed uncertainty." This reframes the decision to favor action. While it could be criticized as false dichotomy (A), the question asks to describe the strategy, and reframing more precisely captures what the speaker is doing. There\'s no appeal to tradition (C) or personal attack (D).',
    difficulty: 'hard',
    domain: 'Rhetorical Analysis',
    skill: 'Rhetorical Strategies'
  }),
  addRating({
    id: 'hard-eng-034',
    question: 'A paragraph in a philosophy paper reads: "Moral relativism—the view that moral truths vary across cultures or individuals—faces a curious self-referential problem. If all moral claims are relative to particular frameworks, then the claim \'all moral claims are relative\' must itself be relative to some framework, and there would be other frameworks from which universal moral truths exist. Alternatively, if \'all moral claims are relative\' is meant as a universal truth, then there is at least one universal truth (namely, that claim itself), which contradicts the doctrine." The author\'s argument employs which logical technique?',
    options: [
      { letter: 'A', text: 'Analogical reasoning, comparing moral relativism to similar theories' },
      { letter: 'B', text: 'Reductio ad absurdum, showing that the position leads to contradiction when applied to itself' },
      { letter: 'C', text: 'Inductive generalization, drawing broad conclusions from specific moral examples' },
      { letter: 'D', text: 'Argument from authority, citing expert philosophers who reject relativism' }
    ],
    correctAnswer: 'B',
    explanation: 'The author shows that moral relativism, when applied to its own central claim, leads to contradiction: either the claim refutes itself by being relative (and thus other frameworks have universal truths) or it claims to be universal (contradicting relativism). This is classic reductio ad absurdum—showing a position undermines itself.',
    difficulty: 'hard',
    domain: 'Rhetorical Analysis',
    skill: 'Logical Techniques'
  }),
  addRating({
    id: 'hard-eng-035',
    question: 'Two historians discuss the causes of World War I:\n\nHistorian A: "The war resulted from the alliance system and imperial rivalries that made a regional conflict impossible to contain. Once Austria declared war on Serbia, the interlocking obligations of the Triple Alliance and Triple Entente drew in the major powers one by one."\n\nHistorian B: "To focus on alliances is to mistake the mechanism for the cause. The alliance system had existed for decades without causing world war. What made 1914 different was the particular decisions of specific leaders—especially the German military\'s insistence on executing the Schlieffen Plan—that transformed a manageable crisis into catastrophe."\n\nWhich statement best describes the historians\' disagreement?',
    options: [
      { letter: 'A', text: 'They disagree about whether World War I was caused by structural factors or individual agency' },
      { letter: 'B', text: 'They disagree about whether the Triple Alliance or Triple Entente was more responsible' },
      { letter: 'C', text: 'They disagree about the military significance of the Schlieffen Plan' },
      { letter: 'D', text: 'They disagree about whether World War I could have been predicted' }
    ],
    correctAnswer: 'A',
    explanation: 'Historian A emphasizes structural factors (alliance system, imperial rivalries). Historian B emphasizes individual agency (decisions of specific leaders). This is the classic structure vs. agency debate in historical causation. They don\'t debate which alliance was responsible (B), Schlieffen Plan\'s military significance (C), or predictability (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Paired Passage Analysis'
  }),
  addRating({
    id: 'hard-eng-036',
    question: 'A sociology textbook states: "Erving Goffman\'s dramaturgical analysis treats social life as a theatrical performance. Individuals are actors who manage impressions, presenting idealized versions of themselves (\'front stage\' behavior) while concealing aspects that might undermine their performance (\'backstage\' behavior). Crucially, Goffman does not treat this as deception: we are all engaged in impression management, and it is constitutive of social order rather than a corruption of authentic interaction." The word "constitutive" in this passage most nearly means:',
    options: [
      { letter: 'A', text: 'Damaging or harmful to' },
      { letter: 'B', text: 'An essential component of' },
      { letter: 'C', text: 'A legal requirement for' },
      { letter: 'D', text: 'An unintended consequence of' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage contrasts impression management being "constitutive of social order" with it being "a corruption of authentic interaction." Something constitutive of social order is not damaging or unintended—it\'s essential, a building block. Constitutive means forming an essential element or component.',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Academic Vocabulary'
  }),
  addRating({
    id: 'hard-eng-037',
    question: 'An essay about algorithms in criminal justice argues: "Risk assessment algorithms promise objectivity—replacing the biases of individual judges with data-driven predictions. Yet these algorithms are trained on historical data that encode past discrimination: if Black defendants were historically arrested and incarcerated at higher rates partly due to biased policing, an algorithm trained on this data will predict higher recidivism for Black defendants, perpetuating the cycle. The algorithm is \'objective\' only in the sense of consistently applying criteria that may themselves be discriminatory." The author uses quotation marks around "objective" to:',
    options: [
      { letter: 'A', text: 'Indicate that the word is a direct quotation from algorithm developers' },
      { letter: 'B', text: 'Signal skepticism about whether the term accurately describes the algorithms' },
      { letter: 'C', text: 'Highlight a technical term that readers may be unfamiliar with' },
      { letter: 'D', text: 'Emphasize that objectivity is the algorithms\' most important feature' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage has just argued that the algorithms encode historical discrimination. The quotation marks around "objective" signal ironic or skeptical use—the author is indicating that while the algorithms are called objective, this term may not accurately apply. This is the scare-quote function.',
    difficulty: 'hard',
    domain: 'Rhetorical Analysis',
    skill: 'Punctuation as Rhetorical Device'
  }),
  addRating({
    id: 'hard-eng-038',
    question: 'A paragraph from a scientific ethics paper: "The case of Henrietta Lacks illustrates the ethical complexities of biological research. Cells taken from Lacks without her knowledge or consent in 1951 became the immortal \'HeLa\' line, enabling countless medical advances. Yet her family received no compensation and for decades knew nothing of her contribution. Contemporary bioethics frameworks would consider this exploitation, but applying modern standards retroactively risks anachronism—evaluating historical actors by norms that did not exist in their time." The author introduces the concern about "anachronism" primarily to:',
    options: [
      { letter: 'A', text: 'Excuse the researchers who took Lacks\' cells without consent' },
      { letter: 'B', text: 'Argue that modern bioethics standards are too strict' },
      { letter: 'C', text: 'Acknowledge a methodological challenge in ethical evaluation of historical cases' },
      { letter: 'D', text: 'Suggest that Lacks\' family should not receive compensation' }
    ],
    correctAnswer: 'C',
    explanation: 'The author presents the Lacks case as illustrating "ethical complexities," then notes that modern standards would consider it exploitation, BUT applies a caution about anachronism. This isn\'t excusing the researchers (A) or arguing standards are too strict (B)—it\'s acknowledging a methodological issue in historical evaluation (C). Nothing about compensation is argued (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Nuance'
  }),
  addRating({
    id: 'hard-eng-039',
    question: 'A economics paper abstract: "We exploit a natural experiment created by a change in tax policy to estimate the elasticity of labor supply among high earners. Using a regression discontinuity design, we compare workers just above and just below the threshold at which the new marginal rate applies. Contrary to theoretical predictions of significant labor supply response to marginal tax rates, we find effects that are small and statistically insignificant, suggesting that tax policy in this range may have limited impact on work effort among high-income professionals." The phrase "exploit a natural experiment" means the researchers:',
    options: [
      { letter: 'A', text: 'Manipulated the tax policy change to create favorable research conditions' },
      { letter: 'B', text: 'Used an externally occurring event to approximate experimental conditions' },
      { letter: 'C', text: 'Conducted laboratory experiments simulating tax policy effects' },
      { letter: 'D', text: 'Ethically compromised research participants for data collection' }
    ],
    correctAnswer: 'B',
    explanation: '"Exploiting a natural experiment" is standard social science terminology for using a real-world event (here, a tax policy change) that creates conditions approximating a controlled experiment. The researchers didn\'t manipulate the policy (A), conduct lab experiments (C), or act unethically (D)—"exploit" here means "take advantage of" a research opportunity.',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Technical Vocabulary'
  }),
  addRating({
    id: 'hard-eng-040',
    question: 'An essay on translation theory states: "Walter Benjamin argued that translation\'s task is not to reproduce the original\'s meaning for a new audience but to reveal something about language itself. The relationship between original and translation illuminates what Benjamin called \'pure language\'—a kind of linguistic essence that transcends any particular tongue. This view inverts the common assumption that the original is primary and the translation derivative; for Benjamin, both are fragments pointing toward a wholeness neither can achieve alone." Based on the passage, Benjamin would most likely view a translation that closely replicates the original\'s meaning as:',
    options: [
      { letter: 'A', text: 'The ideal form of translation' },
      { letter: 'B', text: 'Missing translation\'s deeper philosophical purpose' },
      { letter: 'C', text: 'Impossible to achieve in practice' },
      { letter: 'D', text: 'Valuable only for scientific or technical texts' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage says Benjamin argued translation\'s task is "not to reproduce the original\'s meaning" but to "reveal something about language itself." A translation that closely replicates meaning would be doing what Benjamin says is NOT the task—thus missing the "deeper philosophical purpose" of illuminating "pure language." It wouldn\'t be his ideal (A), and the passage doesn\'t discuss impossibility (C) or text types (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Application of Ideas'
  }),
  // More English questions...
  addRating({
    id: 'hard-eng-041',
    question: 'A literary analysis states: "Virginia Woolf\'s narrative technique in Mrs. Dalloway, with its fluid movement between characters\' consciousnesses and its rejection of chronological plot, has been called \'stream of consciousness.\' Yet this term, borrowed from psychology, may obscure more than it reveals. Woolf\'s method is not merely transcription of mental flow but a carefully constructed aesthetic form. The movement between perspectives follows patterns of association that are as much Woolf\'s compositional choices as they are representations of how minds actually work." The author\'s main point about "stream of consciousness" is that:',
    options: [
      { letter: 'A', text: 'The term accurately describes Woolf\'s attempt to replicate psychological processes' },
      { letter: 'B', text: 'The term may mislead readers into overlooking the deliberate artistry of Woolf\'s technique' },
      { letter: 'C', text: 'Psychologists have correctly analyzed Woolf\'s narrative method' },
      { letter: 'D', text: 'Mrs. Dalloway fails to achieve true stream of consciousness narration' }
    ],
    correctAnswer: 'B',
    explanation: 'The author says the term "may obscure more than it reveals" and emphasizes that Woolf\'s method is "carefully constructed aesthetic form" and "compositional choices"—not just transcription. This suggests the term obscures the artistry (B). The passage doesn\'t say the term is accurate (A), discuss psychologists\' analyses (C), or say the novel fails (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author\'s Argument'
  }),
  addRating({
    id: 'hard-eng-042',
    question: 'A passage discusses music cognition: "Expectations play a central role in musical experience. When a melody implies a particular continuation and then delivers it, we feel satisfaction; when expectations are violated, we may feel surprise, tension, or (if the violation is well-crafted) aesthetic pleasure. This expectation-based account explains why unfamiliar musical idioms can initially sound \'wrong\'—our expectations, shaped by prior exposure, are constantly violated. With repeated exposure, we internalize new patterns, and what once seemed chaotic becomes intelligible, even beautiful." The passage most strongly supports which claim?',
    options: [
      { letter: 'A', text: 'Some musical traditions are objectively superior to others' },
      { letter: 'B', text: 'Musical taste is entirely determined by childhood exposure' },
      { letter: 'C', text: 'Perceived musical quality is partly a function of learned expectations' },
      { letter: 'D', text: 'Composers should avoid violating listeners\' expectations' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage argues that expectations, "shaped by prior exposure," affect whether music sounds "wrong" or "beautiful." With exposure, "what once seemed chaotic becomes intelligible, even beautiful." This supports C—perceived quality depends partly on learned expectations. The passage doesn\'t rank traditions (A), claim taste is entirely childhood-determined (B), or advise composers to avoid violations (D)—violations can create "aesthetic pleasure."',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inference and Support'
  }),
  addRating({
    id: 'hard-eng-043',
    question: 'An anthropology text states: "The incest taboo, present in some form across all known human societies, has been explained variously as instinctive aversion, rational recognition of genetic risk, or structural necessity for creating alliances through exogamy. Claude Lévi-Strauss argued for the latter: by prohibiting marriage within the family, societies compel exchange between families, creating the network of obligations that constitute social structure. The taboo thus marks the transition from nature to culture—the point at which humans begin to regulate kinship rather than leaving it to biological impulse." Lévi-Strauss\'s argument characterizes the incest taboo primarily as:',
    options: [
      { letter: 'A', text: 'A natural instinct shared with other animals' },
      { letter: 'B', text: 'A foundational social institution that creates human society' },
      { letter: 'C', text: 'A rational response to observed genetic problems' },
      { letter: 'D', text: 'An arbitrary rule that varies significantly across cultures' }
    ],
    correctAnswer: 'B',
    explanation: 'Lévi-Strauss is presented as arguing the taboo creates "exchange between families" and "the network of obligations that constitute social structure," marking "the transition from nature to culture." This characterizes it as foundational social institution (B). He explicitly contrasts it with biological/natural explanations (A), doesn\'t emphasize rationality about genetics (C), and the passage says it\'s "present... across all known human societies," suggesting universality not arbitrariness (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Theoretical Arguments'
  }),
  addRating({
    id: 'hard-eng-044',
    question: 'A policy document states: "The transition to renewable energy faces a coordination problem. Individual firms benefit from delaying investment until others bear the costs of developing infrastructure, driving down technology costs, and proving market viability. But if all firms wait, the transition stalls. Government intervention can solve this collective action problem by guaranteeing markets, subsidizing early adopters, or mandating conversion timelines—bearing short-term costs to secure long-term gains that decentralized decision-making would fail to achieve." The passage characterizes the relationship between individual and collective rationality as:',
    options: [
      { letter: 'A', text: 'Complementary, since what benefits individuals also benefits society' },
      { letter: 'B', text: 'Conflicting, since individually rational choices can produce collectively suboptimal outcomes' },
      { letter: 'C', text: 'Irrelevant, since government action replaces individual decision-making entirely' },
      { letter: 'D', text: 'Hierarchical, since collective interests should always override individual interests' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage describes a "coordination problem" where firms individually benefit from waiting, but "if all firms wait, the transition stalls." This is the classic collective action problem where individually rational choices (waiting) produce collectively suboptimal outcomes (stalled transition). Government intervention is presented as solving this conflict, not replacing all individual choice (C) or establishing absolute hierarchy (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Analyzing Economic Arguments'
  }),
  addRating({
    id: 'hard-eng-045',
    question: 'An art criticism essay states: "The question \'Is it art?\' has plagued discussions of avant-garde work since Duchamp signed a urinal and called it \'Fountain.\' But the question may be malformed. Arthur Danto argued that what makes something art is not intrinsic properties but the interpretive context—the \'artworld\' of theories, practices, and institutions that enables certain objects to be seen as art. This does not mean anything can be art in any context, but that art-status is relational rather than inherent." The phrase "relational rather than inherent" suggests that an object\'s status as art depends on:',
    options: [
      { letter: 'A', text: 'The materials and techniques used to create it' },
      { letter: 'B', text: 'Its placement within institutional and theoretical frameworks' },
      { letter: 'C', text: 'The artist\'s conscious intention to create art' },
      { letter: 'D', text: 'Objective aesthetic qualities that experts can identify' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explains Danto\'s view that "what makes something art is not intrinsic properties but the interpretive context—the \'artworld\' of theories, practices, and institutions." "Relational" refers to the relationship between the object and this context. Materials (A) and aesthetic qualities (D) would be "intrinsic properties." While intention (C) might be relevant, the passage emphasizes institutional/theoretical context.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Philosophical Concepts'
  }),
  // Adding more questions to approach 80...
  addRating({
    id: 'hard-eng-046',
    question: 'A linguistics paper discusses: "The Sapir-Whorf hypothesis in its strong form—that language determines thought—has been largely abandoned by cognitive scientists. However, a weaker version—that language influences thought—continues to find empirical support. Speakers of languages with different spatial reference systems (relative vs. absolute) show different performance on spatial reasoning tasks even in non-linguistic contexts. This suggests not that thought is imprisoned by language, but that habitual language use shapes cognitive habits that extend beyond language use itself." The author would most likely characterize the relationship between language and thought as:',
    options: [
      { letter: 'A', text: 'Language completely determines what thoughts are possible' },
      { letter: 'B', text: 'Language has no significant effect on cognitive processes' },
      { letter: 'C', text: 'Language influences but does not rigidly constrain thinking patterns' },
      { letter: 'D', text: 'Thought develops independently of language acquisition' }
    ],
    correctAnswer: 'C',
    explanation: 'The author rejects the "strong form" (language determines thought) but supports the "weaker version" (language influences thought). The conclusion that "habitual language use shapes cognitive habits" while denying that "thought is imprisoned by language" matches C—influence without rigid constraint.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author\'s Position'
  }),
  addRating({
    id: 'hard-eng-047',
    question: 'A passage from a political philosophy text: "Liberal democracies rest on a paradox: they claim to treat all conceptions of the good life as equally legitimate, yet they are not neutral between liberalism and its rivals. A society that tolerates intolerant groups may find its tolerance undermined; a society that refuses to tolerate them violates its own principles. Karl Popper called this the \'paradox of tolerance,\' arguing that unlimited tolerance leads to the disappearance of tolerance. Some restrictions on intolerance may therefore be necessary to preserve tolerant society." The author presents Popper\'s view primarily to:',
    options: [
      { letter: 'A', text: 'Argue that liberal democracies should abandon the principle of tolerance' },
      { letter: 'B', text: 'Illustrate a philosophical tension inherent in liberal democratic principles' },
      { letter: 'C', text: 'Prove that intolerant groups should never be permitted in democratic societies' },
      { letter: 'D', text: 'Demonstrate that Popper\'s philosophy is internally contradictory' }
    ],
    correctAnswer: 'B',
    explanation: 'The author introduces "a paradox" and uses Popper to elaborate on this tension. The passage doesn\'t advocate abandoning tolerance (A), doesn\'t make absolute claims about what "should never" happen (C), and doesn\'t critique Popper as contradictory (D)—it presents his view approvingly as identifying a genuine philosophical tension (B).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Purpose of Referenced Material'
  }),
  addRating({
    id: 'hard-eng-048',
    question: 'An essay about photography states: "Susan Sontag argued that photography creates an aestheticizing relationship to the world, transforming everything—including suffering—into an image to be consumed. The photograph offers the comfort of distance, freezing events into contemplatable form. Yet Roland Barthes countered that certain photographs puncture this aesthetic distance; what he called the \'punctum\' is an element that \'pierces\' the viewer, creating an uncontrollable emotional response that exceeds the photographer\'s intention and the viewer\'s cultivated detachment." The term "punctum" as used in this passage refers to:',
    options: [
      { letter: 'A', text: 'The technical quality that distinguishes professional from amateur photography' },
      { letter: 'B', text: 'An element in a photograph that unexpectedly breaks through aesthetic detachment' },
      { letter: 'C', text: 'The photographer\'s deliberate message or theme' },
      { letter: 'D', text: 'A particular style of documentary photography' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage defines punctum as an element that "pierces" the viewer, creating an "uncontrollable emotional response that exceeds the photographer\'s intention and the viewer\'s cultivated detachment." This describes something that breaks through detachment (B). It\'s not about technical quality (A), deliberate message (C)—it "exceeds... intention"—or a style (D).',
    difficulty: 'hard',
    domain: 'Vocabulary in Context',
    skill: 'Understanding Theoretical Terms'
  }),
  addRating({
    id: 'hard-eng-049',
    question: 'A science communication article states: "The deficit model of science communication—which assumes that public skepticism about science stems from ignorance that can be remedied by providing more information—has been repeatedly challenged by research. Studies show that more scientifically literate individuals often hold more polarized views on contested issues like climate change, not less. This suggests that the problem is not knowledge deficit but motivated reasoning: people process information in ways that protect their cultural identities and prior commitments." The passage suggests that effective science communication should:',
    options: [
      { letter: 'A', text: 'Focus on increasing the public\'s scientific literacy through education' },
      { letter: 'B', text: 'Address cultural and identity-based factors in how people process scientific information' },
      { letter: 'C', text: 'Simplify scientific findings so they are accessible to non-experts' },
      { letter: 'D', text: 'Avoid discussing politically contentious scientific topics' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage critiques the "deficit model" (providing more information/education) and identifies "motivated reasoning" tied to "cultural identities and prior commitments" as the real issue. This implies effective communication should address these cultural/identity factors (B). Options A and C align with the criticized deficit model. D isn\'t suggested.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Drawing Implications'
  }),
  addRating({
    id: 'hard-eng-050',
    question: 'A passage on economic inequality: "Thomas Piketty\'s Capital in the Twenty-First Century advanced a provocative thesis: when the rate of return on capital exceeds economic growth (r > g), wealth concentrates in the hands of capital owners relative to workers. This dynamic, Piketty argued, characterized most of history until the exceptional mid-twentieth century, when world wars and progressive taxation compressed inequality. Without intervention, we are returning to a \'patrimonial capitalism\' in which inherited wealth dominates earned income." The author presents Piketty\'s argument as:',
    options: [
      { letter: 'A', text: 'Definitively proven by historical data' },
      { letter: 'B', text: 'A hypothesis with historical evidence and predictive implications' },
      { letter: 'C', text: 'Widely rejected by mainstream economists' },
      { letter: 'D', text: 'Applicable only to the twentieth century' }
    ],
    correctAnswer: 'B',
    explanation: 'The author describes Piketty\'s work as a "provocative thesis" with historical analysis (most of history, mid-twentieth century) and predictive element ("we are returning to..."). "Provocative" suggests debate, not definitive proof (A). The passage doesn\'t mention rejection (C). The thesis explicitly applies to most of history, not just the 20th century (D). B best captures thesis + evidence + prediction.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Characterizing Academic Arguments'
  }),
  addRating({
    id: 'hard-eng-051',
    question: 'A passage on epistemology: "The Gettier problem, introduced in Edmund Gettier\'s 1963 paper \'Is Justified True Belief Knowledge?\', challenged the standard definition of knowledge that had prevailed since Plato. Gettier presented cases where someone has a justified true belief that nonetheless fails to constitute knowledge because the justification is \'accidentally\' connected to the truth. A person might believe, with good reason, that their coworker owns a Ford—having seen them drive one daily—while the coworker actually sold the car yesterday but, unbeknownst to either, won a Ford in a raffle that morning. The belief is justified and true, yet we hesitate to call it knowledge." The passage characterizes the relationship between justification and truth in Gettier cases as:',
    options: [
      { letter: 'A', text: 'Causally connected in the expected way' },
      { letter: 'B', text: 'Coincidentally aligned rather than properly linked' },
      { letter: 'C', text: 'Irrelevant to whether belief constitutes knowledge' },
      { letter: 'D', text: 'Necessarily sufficient for knowledge' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage describes justification as "accidentally connected to the truth" in Gettier cases. The Ford example shows a belief that happens to be true for reasons unrelated to the justification. This is a coincidental alignment (B) rather than proper causal connection (A). The passage argues justification-truth relationship matters for knowledge (not C), and that JTB is insufficient (not D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Analyzing Philosophical Arguments'
  }),
  addRating({
    id: 'hard-eng-052',
    question: 'A passage on cognitive linguistics: "George Lakoff and Mark Johnson\'s Metaphors We Live By revolutionized our understanding of metaphor, arguing that it is not merely ornamental language but a fundamental cognitive mechanism. Our conceptual system is largely metaphorical: we understand ARGUMENT AS WAR (\'I demolished his argument\'), TIME AS MONEY (\'spend your time wisely\'), and LIFE AS A JOURNEY (\'at a crossroads\'). These conceptual metaphors shape not just how we speak but how we think and act. The implications are profound: our reasoning is not purely logical but grounded in embodied experience and imaginative projection." The authors would most likely argue that metaphors:',
    options: [
      { letter: 'A', text: 'Are decorative additions to literal language' },
      { letter: 'B', text: 'Reflect superficial patterns in vocabulary' },
      { letter: 'C', text: 'Structure our understanding of abstract concepts' },
      { letter: 'D', text: 'Should be eliminated from precise reasoning' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage explicitly states metaphor is "a fundamental cognitive mechanism" that shapes "how we think and act." Examples show how abstract concepts (argument, time, life) are understood through concrete metaphors. This supports (C). The passage directly refutes (A) by saying metaphor is "not merely ornamental." (B) understates the significance, and (D) contradicts the claim that reasoning is inherently metaphorical.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author\'s Central Argument'
  }),
  addRating({
    id: 'hard-eng-053',
    question: 'A passage on postcolonial theory: "Edward Said\'s Orientalism examined how Western scholarship constructed \'the Orient\' as Europe\'s exotic, inferior Other. Said demonstrated that academic disciplines like philology and anthropology were not neutral knowledge systems but implicated in colonial power structures. The \'knowledge\' produced about Eastern societies—their supposedly timeless traditions, sensuality, and irrationality—served to justify Western intervention and rule. This analysis forced a reckoning across humanities disciplines: how do power relations shape what counts as knowledge? Who has the authority to represent whom?" Said\'s critique primarily challenges:',
    options: [
      { letter: 'A', text: 'The factual accuracy of specific claims about Eastern societies' },
      { letter: 'B', text: 'The assumption that academic knowledge is politically neutral' },
      { letter: 'C', text: 'The use of comparative methods in anthropology' },
      { letter: 'D', text: 'Eastern societies\' self-representations' }
    ],
    correctAnswer: 'B',
    explanation: 'Said\'s critique targets how "academic disciplines...were not neutral knowledge systems but implicated in colonial power structures." The passage asks "how do power relations shape what counts as knowledge?" This challenges assumptions of scholarly neutrality (B). While factual issues may arise (A), the core critique is about the politics of knowledge production. The passage doesn\'t attack comparative methods per se (C) or Eastern self-representation (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Identifying Core Critiques'
  }),
  addRating({
    id: 'hard-eng-054',
    question: 'A passage on evolutionary psychology: "Critics of evolutionary psychology argue that the discipline often commits the \'adaptationist fallacy\'—assuming that every human trait must have evolved as an adaptation rather than being a byproduct, a vestige, or the result of genetic drift. Stephen Jay Gould and Richard Lewontin\'s famous \'spandrels\' critique noted that some features exist not because they were selected for but as necessary consequences of other selected features, like the triangular spaces in arched architecture. Defenders respond that careful evolutionary analysis can distinguish adaptations from byproducts through design features that would be improbable without selection." The "spandrels" metaphor serves to:',
    options: [
      { letter: 'A', text: 'Support the adaptationist program in biology' },
      { letter: 'B', text: 'Illustrate how some traits may exist without direct selection' },
      { letter: 'C', text: 'Prove that natural selection cannot explain complex features' },
      { letter: 'D', text: 'Demonstrate the superiority of architectural analysis' }
    ],
    correctAnswer: 'B',
    explanation: 'The spandrels metaphor illustrates that "some features exist not because they were selected for but as necessary consequences of other selected features." Architectural spandrels are byproducts of arches, not designed in themselves. This supports the critique of adaptationism (B) by showing alternatives to direct selection. It opposes (A), doesn\'t claim selection can\'t explain complexity (C), and the architecture is an analogy, not a superiority claim (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Analyzing Analogies and Metaphors'
  }),
  addRating({
    id: 'hard-eng-055',
    question: 'A passage on media theory: "Marshall McLuhan\'s provocative declaration \'the medium is the message\' challenged content-focused media analysis. McLuhan argued that the form of a medium—its speed, scale, pattern of engagement—transforms human consciousness and social organization more profoundly than any particular message it conveys. Print fostered linear, sequential thinking and nationalism; television created the \'global village\' of simultaneous awareness. Digital media, he might have predicted, would further fragment attention while enabling unprecedented interconnection. The content we consume matters less than the perceptual habits the medium cultivates." McLuhan would most likely agree that:',
    options: [
      { letter: 'A', text: 'We should focus primarily on improving media content' },
      { letter: 'B', text: 'All media have equivalent effects on cognition' },
      { letter: 'C', text: 'Technological forms restructure how we think and relate' },
      { letter: 'D', text: 'Print and television create identical social patterns' }
    ],
    correctAnswer: 'C',
    explanation: 'McLuhan argues that media form "transforms human consciousness and social organization" and that different media (print, television) foster different thinking patterns. This supports (C). The passage explicitly states content matters less than form, contradicting (A). McLuhan distinguishes media effects (print = linear thinking; TV = global village), contradicting (B) and (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Applying Theoretical Frameworks'
  }),
  addRating({
    id: 'hard-eng-056',
    question: 'A passage on phenomenology: "Edmund Husserl\'s phenomenological method aimed to describe the structures of consciousness itself, bracketing questions of whether perceived objects exist independently. This \'epoché\' or suspension of the natural attitude allowed investigation of phenomena as they appear to consciousness. Later phenomenologists like Heidegger and Merleau-Ponty questioned whether such bracketing was possible or desirable, arguing that consciousness is always already embedded in a world, a body, a history. Merleau-Ponty\'s emphasis on embodiment showed that perception is not a mental recording of external stimuli but an active engagement of a situated, corporeal being." Merleau-Ponty\'s critique of Husserl centers on:',
    options: [
      { letter: 'A', text: 'The existence of external objects' },
      { letter: 'B', text: 'The possibility of disembodied, detached consciousness' },
      { letter: 'C', text: 'The usefulness of studying consciousness at all' },
      { letter: 'D', text: 'The historical influence of phenomenology' }
    ],
    correctAnswer: 'B',
    explanation: 'Merleau-Ponty argued "consciousness is always already embedded in a world, a body, a history" and emphasized "embodiment," showing perception involves "a situated, corporeal being." This challenges Husserl\'s bracketing as implying detached consciousness (B). The critique isn\'t about external objects\' existence (A), rejects phenomenology (C), or is about historical influence (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Tracing Philosophical Debates'
  }),
  addRating({
    id: 'hard-eng-057',
    question: 'A passage on sociology of science: "Bruno Latour\'s actor-network theory dissolved conventional distinctions between human and non-human actors, arguing that scientific facts are constructed through heterogeneous networks of researchers, instruments, institutions, and natural phenomena. In his study of Louis Pasteur, Latour showed that the \'discovery\' of microbes required not just observation but the construction of laboratories, the persuasion of farmers, and the mobilization of political support. Scientific facts are not simply uncovered but \'black-boxed\'—stabilized through networks so that their constructed character becomes invisible." The term "black-boxed" in this context refers to:',
    options: [
      { letter: 'A', text: 'Equipment used in scientific experiments' },
      { letter: 'B', text: 'Facts whose constructed nature is no longer visible' },
      { letter: 'C', text: 'Secret research conducted without oversight' },
      { letter: 'D', text: 'Theoretical concepts that cannot be tested' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explicitly defines black-boxing: facts "stabilized through networks so that their constructed character becomes invisible." This matches (B). The term is a metaphor for the process of obscuring construction, not literal equipment (A), secrecy (C), or untestable theories (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Technical Term Interpretation'
  }),
  addRating({
    id: 'hard-eng-058',
    question: 'A passage on deconstruction: "Jacques Derrida\'s deconstructive reading practices revealed the instabilities within texts that appeared to present stable meanings. His analysis of Saussure\'s linguistics showed that Saussure\'s own framework—in which meaning arises from differences between signs—undermined the privileging of speech over writing that Saussure endorsed. This \'logocentrism,\' the preference for presence, voice, and origin, pervaded Western metaphysics. Deconstruction did not destroy meaning but showed how texts undermine their own hierarchies, how the marginalized term in any binary (writing/speech, absence/presence) inhabits and enables the privileged one." According to the passage, deconstruction:',
    options: [
      { letter: 'A', text: 'Proves that texts have no meaning whatsoever' },
      { letter: 'B', text: 'Establishes speech as superior to writing' },
      { letter: 'C', text: 'Reveals internal contradictions in conceptual hierarchies' },
      { letter: 'D', text: 'Destroys the possibility of textual interpretation' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage states deconstruction shows "how texts undermine their own hierarchies" and how marginalized terms "inhabit and enable" privileged ones. This reveals internal contradictions (C). The passage explicitly says deconstruction "did not destroy meaning" (contradicting A and D), and it challenges rather than endorses speech\'s superiority (B).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Literary Theory'
  }),
  addRating({
    id: 'hard-eng-059',
    question: 'A passage on feminist philosophy: "Simone de Beauvoir\'s declaration \'One is not born, but rather becomes, a woman\' inaugurated the sex/gender distinction later developed by feminist theory. Beauvoir argued that feminine identity is not biologically determined but socially constructed through practices, expectations, and constraints that position women as \'Other\' to men\'s normative humanity. Judith Butler later radicalized this insight, questioning whether even \'sex\' was as natural as assumed, arguing that gender performativity—the repeated citation of gender norms—produces the illusion of a natural, prediscursive sex. For Butler, there is no \'doer behind the deed\'; identity is constituted through its expressions." Butler extends Beauvoir\'s argument by:',
    options: [
      { letter: 'A', text: 'Rejecting the relevance of social construction' },
      { letter: 'B', text: 'Questioning the natural status of biological sex itself' },
      { letter: 'C', text: 'Affirming the stability of gender categories' },
      { letter: 'D', text: 'Returning to biological determinism' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage states Butler "radicalized" Beauvoir by "questioning whether even \'sex\' was as natural as assumed." While Beauvoir distinguished socially constructed gender from biological sex, Butler questioned this distinction by applying constructionism to sex itself (B). This opposes (A) rejecting construction, (C) affirming stability, and (D) biological determinism.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Tracing Theoretical Development'
  }),
  addRating({
    id: 'hard-eng-060',
    question: 'A passage on hermeneutics: "Hans-Georg Gadamer\'s philosophical hermeneutics challenged the ideal of presuppositionless interpretation. Against the Enlightenment\'s \'prejudice against prejudice,\' Gadamer argued that our historical situatedness—our traditions, expectations, \'prejudgments\'—are not obstacles to understanding but its enabling conditions. Interpretation occurs as a \'fusion of horizons\' where the interpreter\'s world and the text\'s world interact productively. Understanding is not recovering an author\'s original intention but a creative event in which meaning emerges from the dialogue between past and present." Gadamer would most likely disagree with the claim that:',
    options: [
      { letter: 'A', text: 'Historical context shapes how we interpret texts' },
      { letter: 'B', text: 'Valid interpretation requires eliminating all presuppositions' },
      { letter: 'C', text: 'Understanding involves dialogue between perspectives' },
      { letter: 'D', text: 'Tradition plays a role in interpretation' }
    ],
    correctAnswer: 'B',
    explanation: 'Gadamer "challenged the ideal of presuppositionless interpretation" and argued prejudgments are "enabling conditions" not obstacles. He would disagree that valid interpretation requires eliminating presuppositions (B). He would agree with (A) historical context mattering, (C) dialogic understanding, and (D) tradition\'s role—all central to his hermeneutics.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferring Author Disagreements'
  }),
  addRating({
    id: 'hard-eng-061',
    question: 'A passage on virtue ethics: "Alasdair MacIntyre\'s After Virtue diagnosed modernity\'s moral fragmentation: we possess fragments of past ethical vocabularies—rights, utility, virtue—without the coherent frameworks that once gave them meaning. Modern moral debates are interminable because disputants invoke incommensurable principles without shared standards of resolution. MacIntyre proposed recovering the Aristotelian tradition, in which virtues are qualities enabling individuals to achieve the goods internal to social practices and, ultimately, to lead flourishing lives within communities with shared narratives." According to MacIntyre, modern moral disagreements are persistent because:',
    options: [
      { letter: 'A', text: 'People lack intelligence to understand ethical arguments' },
      { letter: 'B', text: 'Different moral frameworks share no common ground for resolution' },
      { letter: 'C', text: 'Aristotelian ethics has never been properly understood' },
      { letter: 'D', text: 'Rights and utility are identical concepts' }
    ],
    correctAnswer: 'B',
    explanation: 'MacIntyre argues debates are "interminable because disputants invoke incommensurable principles without shared standards of resolution." The key term is "incommensurable"—frameworks that cannot be compared or reconciled (B). This isn\'t about intelligence (A), Aristotle\'s understanding (C—MacIntyre proposes recovering it), or conflating rights/utility (D—the opposite, they\'re fragments of different systems).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Identifying Causal Arguments'
  }),
  addRating({
    id: 'hard-eng-062',
    question: 'A passage on historiography: "Hayden White\'s Metahistory argued that historical narratives are shaped by literary tropes—metaphor, metonymy, synecdoche, irony—and emplotment structures borrowed from fiction: romance, tragedy, comedy, satire. Historians do not simply discover the past\'s meaning but impose narrative form on events. This \'poetics of history\' does not deny the reality of past events but shows that their significance is constructed through narrative choices. White\'s critics worried this collapsed history into fiction; White responded that recognizing narrative\'s role enables more self-aware, honest historiography." White\'s central claim is that:',
    options: [
      { letter: 'A', text: 'Historical events never actually occurred' },
      { letter: 'B', text: 'History is identical to fiction in all respects' },
      { letter: 'C', text: 'Narrative structures shape how historical meaning is created' },
      { letter: 'D', text: 'Historians should abandon narrative entirely' }
    ],
    correctAnswer: 'C',
    explanation: 'White argues historians "impose narrative form on events" and "their significance is constructed through narrative choices." This means narrative structures shape meaning-creation (C). The passage explicitly states this "does not deny the reality of past events" (contradicting A) and doesn\'t equate history with fiction entirely (B) or advocate abandoning narrative (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Distinguishing Central from Peripheral Claims'
  }),
  addRating({
    id: 'hard-eng-063',
    question: 'A passage on ethics of care: "Carol Gilligan\'s In a Different Voice challenged Lawrence Kohlberg\'s influential theory of moral development, which ranked abstract principles of justice as the highest stage. Gilligan noted that girls and women often reasoned differently, emphasizing relationships, responsibility, and contextual judgment rather than abstract rules. She articulated an \'ethic of care\' that valued attending to particular others\' needs within webs of interdependence. Critics debated whether this represented gender essentialism or a valid alternative to justice-centered ethics. Later care ethicists have emphasized care as a political value, not just a private virtue." Gilligan\'s critique of Kohlberg primarily concerns:',
    options: [
      { letter: 'A', text: 'The methodology of developmental psychology experiments' },
      { letter: 'B', text: 'The ranking of moral reasoning styles in developmental theory' },
      { letter: 'C', text: 'The existence of gender differences in any domain' },
      { letter: 'D', text: 'The use of stages in psychological models' }
    ],
    correctAnswer: 'B',
    explanation: 'Gilligan challenged Kohlberg\'s theory that "ranked abstract principles of justice as the highest stage" by showing relational reasoning was undervalued. Her critique targets the hierarchical ranking of moral styles (B), arguing care ethics is a valid alternative, not a lower stage. This isn\'t about methodology (A), denying differences (C), or stages per se (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Academic Debates'
  }),
  addRating({
    id: 'hard-eng-064',
    question: 'A passage on philosophy of mind: "David Chalmers distinguished the \'easy problems\' of consciousness—explaining cognitive functions like perception, memory, and attention—from the \'hard problem\': why there is subjective experience at all. Neuroscience might explain how the brain processes information, but explaining why processing is accompanied by \'something it is like\' to undergo it remains mysterious. This explanatory gap has led some to dualism, others to panpsychism (consciousness is fundamental to reality), and still others to deny the hard problem is genuine. Chalmers argues that materialist accounts that reduce consciousness to function leave the qualitative dimension unexplained." The "explanatory gap" Chalmers identifies concerns:',
    options: [
      { letter: 'A', text: 'How the brain processes sensory information' },
      { letter: 'B', text: 'Why cognitive functions are accompanied by subjective experience' },
      { letter: 'C', text: 'Whether perception is accurate' },
      { letter: 'D', text: 'How to measure brain activity' }
    ],
    correctAnswer: 'B',
    explanation: 'Chalmers distinguishes easy problems (cognitive functions) from the hard problem: "why there is subjective experience at all" and "why processing is accompanied by \'something it is like.\'" The gap is between functional explanation and experiential quality (B). This isn\'t about processing mechanisms (A), perceptual accuracy (C), or measurement (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Technical Concept Comprehension'
  }),
  addRating({
    id: 'hard-eng-065',
    question: 'A passage on political theory: "John Rawls\'s \'veil of ignorance\' thought experiment asked what principles rational agents would choose if they didn\'t know their place in society—their class, abilities, or values. Rawls argued they would choose principles ensuring basic liberties and arranging inequalities to benefit the least advantaged (the \'difference principle\'). Communitarians like Michael Sandel objected that this \'unencumbered self,\' stripped of its constitutive attachments, was an impossible abstraction; we reason from within particular traditions and identities, not from nowhere." Sandel\'s objection to the veil of ignorance is that it:',
    options: [
      { letter: 'A', text: 'Would lead to unjust outcomes' },
      { letter: 'B', text: 'Requires an impossible form of self-abstraction' },
      { letter: 'C', text: 'Is too complex for ordinary citizens' },
      { letter: 'D', text: 'Has never been applied in practice' }
    ],
    correctAnswer: 'B',
    explanation: 'Sandel objected that the "unencumbered self, stripped of its constitutive attachments, was an impossible abstraction." We reason "from within particular traditions and identities, not from nowhere." The objection is that such abstraction from identity is impossible (B). This isn\'t primarily about outcomes (A), complexity (C), or practical application (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Analyzing Philosophical Objections'
  }),
  addRating({
    id: 'hard-eng-066',
    question: 'A passage on aesthetics: "Arthur Danto\'s \'artworld\' theory emerged from puzzlement over Andy Warhol\'s Brillo Boxes: perceptually indistinguishable from commercial boxes, yet one was art and one wasn\'t. Danto argued that art status depends not on perceptual properties but on an object\'s relation to art history and theory—the \'atmosphere of theory\' constituting the artworld. George Dickie formalized this as the \'institutional theory\': art is what the artworld (artists, critics, curators, audiences) designates as such. Critics worried this made art status arbitrary; defenders replied that the artworld, like language, has implicit norms." Danto\'s theory arose from observing that:',
    options: [
      { letter: 'A', text: 'Art must always be beautiful' },
      { letter: 'B', text: 'Perceptually identical objects can differ in art status' },
      { letter: 'C', text: 'Commercial products cannot become art' },
      { letter: 'D', text: 'Art history is irrelevant to art appreciation' }
    ],
    correctAnswer: 'B',
    explanation: 'Danto\'s puzzle was that Warhol\'s Brillo Boxes were "perceptually indistinguishable from commercial boxes, yet one was art and one wasn\'t." This shows art status isn\'t determined by appearances—identical-looking objects differ in status (B). The passage contradicts (A) beauty requirement, (C) commercial exclusion, and (D) history\'s irrelevance (theory and history are central).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Tracing Argument Origins'
  }),
  addRating({
    id: 'hard-eng-067',
    question: 'A passage on philosophy of language: "J.L. Austin\'s speech act theory distinguished what we say (locution), what we do in saying it (illocution), and the effects of saying it (perlocution). Saying \'I promise\' doesn\'t describe a promise but performs one; \'I now pronounce you married\' makes people married. These \'performatives\' could not be true or false but could be \'felicitous\' or \'infelicitous\' depending on whether proper conditions were met (authority, intention, appropriate circumstances). Austin\'s work influenced fields from linguistics to law, revealing language as action, not merely representation." According to Austin, saying "I promise" is best understood as:',
    options: [
      { letter: 'A', text: 'A description of a mental state' },
      { letter: 'B', text: 'An action that creates a commitment' },
      { letter: 'C', text: 'A statement that is either true or false' },
      { letter: 'D', text: 'An expression without meaning' }
    ],
    correctAnswer: 'B',
    explanation: 'Austin argues "saying \'I promise\' doesn\'t describe a promise but performs one"—it\'s a performative utterance. This is an action creating commitment (B). The passage explicitly distinguishes performatives from descriptions (contradicting A), says they cannot be true or false (C), and they clearly have meaning (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Speech Act Theory'
  }),
  addRating({
    id: 'hard-eng-068',
    question: 'A passage on environmental philosophy: "The deep ecology movement, articulated by Arne Naess, rejected anthropocentrism—the view that only humans have intrinsic value. Deep ecologists argued for \'biocentric equality\': all living beings have inherent worth independent of their usefulness to humans. This contrasted with \'shallow ecology,\' which conserves nature instrumentally for human benefit. Critics questioned whether biocentric equality was practicable (must we weigh a mosquito equally with a child?) or whether it accurately described deep ecologists\' actual commitments. Some proposed hierarchical biocentrism, granting all beings worth while acknowledging differential value." The distinction between "deep" and "shallow" ecology primarily concerns:',
    options: [
      { letter: 'A', text: 'The depth of scientific understanding required' },
      { letter: 'B', text: 'Whether nature has value beyond human usefulness' },
      { letter: 'C', text: 'The complexity of ecological systems studied' },
      { letter: 'D', text: 'Academic versus popular environmentalism' }
    ],
    correctAnswer: 'B',
    explanation: 'Deep ecology rejects anthropocentrism and argues all beings have "inherent worth independent of their usefulness to humans." Shallow ecology "conserves nature instrumentally for human benefit." The core distinction is whether value is intrinsic or instrumental (B). This isn\'t about scientific depth (A), system complexity (C), or academic/popular divide (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Distinguishing Conceptual Categories'
  }),
  addRating({
    id: 'hard-eng-069',
    question: 'A passage on philosophy of technology: "Martin Heidegger\'s essay \'The Question Concerning Technology\' argued that modern technology is not merely a neutral tool but a way of revealing reality that reduces everything to \'standing reserve\'—resources to be optimized and exploited. A river becomes potential hydroelectric power; a forest becomes timber inventory. This \'enframing\' (Gestell) endangers our ability to encounter beings as they are, including ourselves. Yet Heidegger suggested that recognizing technology\'s essence could open a \'saving power,\' enabling a freer relation to technical means." Heidegger\'s concern about technology primarily involves:',
    options: [
      { letter: 'A', text: 'Environmental pollution from industrial processes' },
      { letter: 'B', text: 'The efficiency of modern machines' },
      { letter: 'C', text: 'How technology shapes our understanding of reality' },
      { letter: 'D', text: 'The difficulty of operating complex devices' }
    ],
    correctAnswer: 'C',
    explanation: 'Heidegger argues technology is "a way of revealing reality" that reduces everything to resources, endangering "our ability to encounter beings as they are." His concern is ontological—how technology shapes understanding (C). This isn\'t primarily about pollution (A), efficiency (B), or operational difficulty (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Phenomenological Critique'
  }),
  addRating({
    id: 'hard-eng-070',
    question: 'A passage on rhetoric: "Aristotle\'s Rhetoric systematized the art of persuasion, identifying three modes of proof: ethos (the speaker\'s character and credibility), pathos (the audience\'s emotions), and logos (the logic of arguments). While Plato had condemned rhetoric as mere manipulation, Aristotle saw it as a neutral techne—its ethics depending on the speaker\'s purposes. Aristotle also distinguished three genres of rhetoric: deliberative (political assembly), forensic (law courts), and epideictic (ceremonial praise and blame). Each addressed different audiences, concerned different times (future, past, present), and employed different topoi or commonplaces." According to Aristotle, rhetoric is:',
    options: [
      { letter: 'A', text: 'Inherently unethical and manipulative' },
      { letter: 'B', text: 'A neutral skill whose ethics depend on use' },
      { letter: 'C', text: 'Applicable only in legal settings' },
      { letter: 'D', text: 'Identical to logical demonstration' }
    ],
    correctAnswer: 'B',
    explanation: 'Aristotle "saw it as a neutral techne—its ethics depending on the speaker\'s purposes." This contrasts with Plato\'s condemnation. Rhetoric is a neutral skill (B). The passage distinguishes Aristotle from Plato who viewed it as manipulation (A), identifies three genres beyond legal (C), and rhetoric uses ethos and pathos alongside logos (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Classical Rhetoric'
  }),
  addRating({
    id: 'hard-eng-071',
    question: 'A passage on psychoanalytic theory: "Jacques Lacan\'s rereading of Freud through structural linguistics proposed that \'the unconscious is structured like a language.\' Rather than a reservoir of biological drives, the unconscious operates through signifying chains, with desire metonymically sliding from object to object. The famous \'mirror stage\' describes how the infant, confronting its reflection, identifies with an idealized, unified image—a \'méconnaissance\' (misrecognition) that founds the ego as fundamentally alienated. For Lacan, entry into language (the Symbolic order) subjects us to a law of signification that both enables and constrains subjectivity." For Lacan, the "mirror stage" results in:',
    options: [
      { letter: 'A', text: 'Accurate self-knowledge' },
      { letter: 'B', text: 'An ego founded on misidentification' },
      { letter: 'C', text: 'Biological maturation of the brain' },
      { letter: 'D', text: 'Rejection of social relationships' }
    ],
    correctAnswer: 'B',
    explanation: 'The mirror stage involves "méconnaissance (misrecognition) that founds the ego as fundamentally alienated." The infant identifies with an idealized image. This is misidentification founding the ego (B). It\'s explicitly not accurate self-knowledge (A), is psychic rather than biological (C), and doesn\'t involve rejecting relationships (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Psychoanalytic Concepts'
  }),
  addRating({
    id: 'hard-eng-072',
    question: 'A passage on critical race theory: "Kimberlé Crenshaw\'s concept of \'intersectionality\' emerged from analyzing legal cases where Black women\'s claims of discrimination were dismissed because courts analyzed race and sex discrimination separately. A company might employ Black men and white women, appearing non-discriminatory by either metric alone, while still discriminating against Black women specifically. Crenshaw argued that identities are not additive but interactive: the experience of being a Black woman is not simply \'Black\' plus \'woman\' but a distinct positionality shaped by the intersection of multiple systems of power." The concept of intersectionality primarily addresses:',
    options: [
      { letter: 'A', text: 'How to calculate discrimination damages' },
      { letter: 'B', text: 'How overlapping identities create unique experiences of oppression' },
      { letter: 'C', text: 'The hierarchy of different forms of discrimination' },
      { letter: 'D', text: 'How to eliminate all identity categories' }
    ],
    correctAnswer: 'B',
    explanation: 'Crenshaw showed that "the experience of being a Black woman is not simply \'Black\' plus \'woman\' but a distinct positionality shaped by the intersection of multiple systems of power." Intersectionality addresses how overlapping identities create unique experiences (B). It\'s not about damage calculation (A), ranking discriminations (C), or eliminating identity (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Intersectionality'
  }),
  addRating({
    id: 'hard-eng-073',
    question: 'A passage on philosophy of mathematics: "The debate between mathematical Platonism and nominalism concerns whether mathematical objects exist independently of human minds. Platonists hold that numbers, sets, and other abstract objects exist in a non-spatial, non-temporal realm that we discover through mathematical intuition. Nominalists deny abstract entities exist, explaining mathematical truth in other ways: as logical consequences of axioms (formalism), mental constructions (intuitionism), or useful fictions (fictionalism). The challenge for Platonists is explaining how we access abstract objects; for nominalists, explaining mathematics\' uncanny applicability to physical reality." A nominalist philosopher would likely agree that:',
    options: [
      { letter: 'A', text: 'Mathematical truths exist in an eternal realm' },
      { letter: 'B', text: 'We discover rather than invent mathematics' },
      { letter: 'C', text: 'Mathematical objects do not exist independently' },
      { letter: 'D', text: 'Mathematics cannot be explained in any terms' }
    ],
    correctAnswer: 'C',
    explanation: 'Nominalists "deny abstract entities exist" and explain mathematical truth through axioms, mental constructions, or fictions rather than independent existence. A nominalist would agree objects don\'t exist independently (C). Options (A) eternal realm and (B) discovery are Platonist positions. Nominalists do explain mathematics (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Ontological Debates'
  }),
  addRating({
    id: 'hard-eng-074',
    question: 'A passage on social epistemology: "Miranda Fricker\'s concept of \'epistemic injustice\' identified ways that social power distorts knowledge practices. \'Testimonial injustice\' occurs when prejudice causes a hearer to give less credibility to a speaker\'s word than warranted—discounting a woman\'s testimony or a Black witness\'s account. \'Hermeneutical injustice\' occurs when gaps in collective interpretive resources prevent marginalized groups from making sense of their experiences—as when \'sexual harassment\' had no name, leaving victims unable to articulate what was happening. Both forms harm knowers as knowers, not just as victims of practical discrimination." "Hermeneutical injustice" refers to:',
    options: [
      { letter: 'A', text: 'Deliberate misinterpretation of texts' },
      { letter: 'B', text: 'Lack of concepts needed to understand one\'s experiences' },
      { letter: 'C', text: 'Academic jargon that excludes non-experts' },
      { letter: 'D', text: 'Errors in translation between languages' }
    ],
    correctAnswer: 'B',
    explanation: 'Hermeneutical injustice occurs when "gaps in collective interpretive resources prevent marginalized groups from making sense of their experiences." The example is when "sexual harassment had no name, leaving victims unable to articulate what was happening." This is about lacking needed concepts (B), not textual interpretation (A), jargon (C), or translation (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Technical Term Comprehension'
  }),
  addRating({
    id: 'hard-eng-075',
    question: 'A passage on animal ethics: "Peter Singer\'s Animal Liberation applied utilitarian ethics to animals, arguing that the capacity for suffering, not species membership, is the morally relevant criterion. \'Speciesism,\' like racism or sexism, unjustifiably privileges one group over another based on morally irrelevant characteristics. Tom Regan\'s rights-based approach differed: animals are \'subjects-of-a-life\' with inherent value, not merely recipients of pleasure or pain. For Regan, using animals as means to human ends violates their rights regardless of aggregate welfare calculations. Both challenge conventional treatment but disagree on ethical foundations." Singer and Regan differ primarily in:',
    options: [
      { letter: 'A', text: 'Whether animals deserve moral consideration' },
      { letter: 'B', text: 'The ethical framework grounding animal protection' },
      { letter: 'C', text: 'Whether speciesism is a real phenomenon' },
      { letter: 'D', text: 'The definition of suffering' }
    ],
    correctAnswer: 'B',
    explanation: 'Both agree animals deserve consideration but "disagree on ethical foundations." Singer uses utilitarian ethics (suffering as criterion), Regan uses rights theory (inherent value, subjects-of-a-life). The difference is in ethical framework (B). Both challenge speciesism (C), and the passage doesn\'t focus on suffering\'s definition (D). They agree on consideration (A).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Comparing Theoretical Approaches'
  }),
  addRating({
    id: 'hard-eng-076',
    question: 'The following sentence appears in a scientific paper: "While the correlation between urbanization and cognitive flexibility has been documented, the causal mechanisms underlying this relationship remain ________; longitudinal studies controlling for confounding variables such as educational access, socioeconomic status, and environmental stimulation are needed to disentangle the specific factors driving observed differences." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'established and uncontroversial' },
      { letter: 'B', text: 'elusive and inadequately characterized' },
      { letter: 'C', text: 'simple and easily replicated' },
      { letter: 'D', text: 'irrelevant to the primary findings' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence contrasts established correlation with unknown causation: "causal mechanisms...remain ___." The need for further studies to "disentangle" factors indicates mechanisms are not yet understood. "Elusive and inadequately characterized" (B) captures this uncertainty. (A) contradicts the need for more research, (C) contradicts the complexity noted, (D) contradicts the sentence\'s focus on these mechanisms.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Completing Academic Sentences'
  }),
  addRating({
    id: 'hard-eng-077',
    question: 'A historian writes: "The prevalent interpretation portrays the 1848 revolutions as failures: monarchies were restored, constitutions revoked, revolutionary leaders exiled. Yet this teleological framing ________ the durable changes in political consciousness, associational life, and nationalist sentiment that persisted after reaction\'s apparent triumph and shaped subsequent movements for decades." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'accurately captures' },
      { letter: 'B', text: 'carefully considers' },
      { letter: 'C', text: 'overlooks' },
      { letter: 'D', text: 'exhaustively documents' }
    ],
    correctAnswer: 'C',
    explanation: 'The sentence structure contrasts the "failure" interpretation ("Yet") with durable changes. The author criticizes the teleological framing for missing ("overlooking") persistent changes. "Overlooks" (C) fits this critical contrast. (A) and (D) would endorse the interpretation the author is critiquing. (B) is neutral where criticism is implied.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Rhetorical Contrast'
  }),
  addRating({
    id: 'hard-eng-078',
    question: 'An economist argues: "Neoclassical models assume perfectly rational agents with complete information—assumptions critics describe as heroic idealizations. Behavioral economics has documented systematic departures from rationality: loss aversion, present bias, framing effects. ________, these findings do not necessarily invalidate neoclassical frameworks but rather circumscribe their domain of applicability, suggesting where additional psychological realism is needed." Which choice provides the most effective transition?',
    options: [
      { letter: 'A', text: 'In other words' },
      { letter: 'B', text: 'However' },
      { letter: 'C', text: 'For this reason' },
      { letter: 'D', text: 'Similarly' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage moves from behavioral critiques to a concession that they don\'t "invalidate" neoclassical models but "circumscribe" them. This is a counter to expected implications—one might expect critique to invalidate. "However" (B) signals this contrast. "In other words" (A) would continue, not contrast. "For this reason" (C) implies causation. "Similarly" (D) adds parallel information.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Logical Transitions'
  }),
  addRating({
    id: 'hard-eng-079',
    question: 'A literary critic writes about a novel: "Morrison\'s temporal fragmentation—narrating events out of chronological sequence—serves not merely formal experimentation but thematic necessity. The trauma of slavery resists linear organization; its effects reverberate unpredictably across generations. The novel\'s structure ________ its content, embodying in form the non-linear haunting that is its subject." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'contradicts' },
      { letter: 'B', text: 'is irrelevant to' },
      { letter: 'C', text: 'mimics' },
      { letter: 'D', text: 'simplifies' }
    ],
    correctAnswer: 'C',
    explanation: 'The argument is that the novel\'s fragmented structure "embodies in form" its thematic content about trauma\'s non-linear effects. Structure and content are parallel—structure reflects/mimics content. "Mimics" (C) captures this. "Contradicts" (A) would indicate opposition. "Irrelevant to" (B) contradicts the argument. "Simplifies" (D) doesn\'t fit the parallel relationship.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Form-Content Relationships'
  }),
  addRating({
    id: 'hard-eng-080',
    question: 'A philosopher writes: "Wittgenstein\'s later work repudiated the picture theory of meaning he had developed in the Tractatus. Where he once held that propositions mirror reality\'s logical form, he came to see meaning as constituted by use within \'language games\'—rule-governed practices embedded in \'forms of life.\' This shift from correspondence to practice ________ subsequent philosophy of language, influencing ordinary language philosophy, speech act theory, and pragmatism." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'had little effect on' },
      { letter: 'B', text: 'profoundly shaped' },
      { letter: 'C', text: 'was unknown to practitioners of' },
      { letter: 'D', text: 'merely summarized existing trends in' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence describes Wittgenstein\'s influence on multiple movements: ordinary language philosophy, speech act theory, pragmatism. This indicates significant impact. "Profoundly shaped" (B) captures this influence. (A), (C), and (D) contradict the listed influences.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Characterizing Influence'
  }),
  addRating({
    id: 'hard-eng-081',
    question: 'A neuroscientist argues: "Reductionist accounts that identify mental states with brain states face the problem of multiple realizability: the same mental state (e.g., pain) might be realized in different physical substrates—humans, octopi, or hypothetical silicon beings. If mental states are multiply realizable, they ________ be type-identical to specific neural configurations, though token mental events might still correlate with token brain events." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'must necessarily' },
      { letter: 'B', text: 'cannot' },
      { letter: 'C', text: 'will always' },
      { letter: 'D', text: 'might occasionally' }
    ],
    correctAnswer: 'B',
    explanation: 'The argument is that multiple realizability (same mental state, different physical substrates) is a problem for type-identity theory. If pain can be realized in different physical structures, it "cannot" be type-identical to one specific neural configuration. (B) captures this logical consequence. (A) and (C) contradict the argument. (D) understates the problem.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Following Logical Arguments'
  }),
  addRating({
    id: 'hard-eng-082',
    question: 'An art historian writes: "Greenberg\'s formalist criticism privileged flatness and medium-specificity as modernist painting\'s essential trajectory—a view that canonized Abstract Expressionism while marginalizing representational, conceptual, and political art. Later critics charged that this apparent aesthetic neutrality ________ ideological work, naturalizing particular values as universal standards while serving Cold War cultural diplomacy that promoted American abstraction against Soviet realism." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'actively resisted' },
      { letter: 'B', text: 'was innocent of' },
      { letter: 'C', text: 'performed' },
      { letter: 'D', text: 'was irrelevant to' }
    ],
    correctAnswer: 'C',
    explanation: 'Critics charged that "apparent aesthetic neutrality" actually served ideological functions—naturalizing values, serving Cold War diplomacy. This means the neutrality "performed" ideological work while appearing neutral. (C) captures this critique. (A) and (B) would claim it wasn\'t ideological. (D) contradicts the argument.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Understanding Ideological Critique'
  }),
  addRating({
    id: 'hard-eng-083',
    question: 'A sociologist writes: "Bourdieu\'s concept of \'cultural capital\'—the knowledge, tastes, and dispositions that confer social advantage—explains how inequality reproduces across generations through mechanisms beyond economic transfer. Elite children acquire through immersion what others must laboriously learn, if they learn at all. This embodied ________ is misrecognized as natural talent or merit, legitimating inequalities that are actually structured by class position." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'deficiency' },
      { letter: 'B', text: 'advantage' },
      { letter: 'C', text: 'resistance' },
      { letter: 'D', text: 'confusion' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage describes how elite children "acquire through immersion" knowledge that confers "social advantage." This is then "misrecognized as natural talent." The embodied thing is the advantage/capital. "Advantage" (B) fits. "Deficiency" (A) is opposite. "Resistance" (C) and "confusion" (D) don\'t fit the context.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Conceptual Completion'
  }),
  addRating({
    id: 'hard-eng-084',
    question: 'A political scientist writes: "Deliberative democracy theorists contend that political legitimacy requires more than voting; it demands reasoned public deliberation where citizens engage opposing views. Critics question whether such deliberation is achievable given power asymmetries, cognitive biases, and strategic behavior. Empirical studies of deliberative forums show ________ results: participants sometimes become more polarized, sometimes converge, depending on facilitation design and participant characteristics." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'uniformly positive' },
      { letter: 'B', text: 'consistently negative' },
      { letter: 'C', text: 'mixed' },
      { letter: 'D', text: 'theoretically irrelevant' }
    ],
    correctAnswer: 'C',
    explanation: 'The sentence states participants "sometimes become more polarized, sometimes converge, depending on" various factors. This variation indicates inconsistent outcomes. "Mixed" (C) captures this. (A) and (B) claim uniform results contradicting "sometimes...sometimes." (D) contradicts the relevance of empirical studies to theory.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Summarizing Variable Outcomes'
  }),
  addRating({
    id: 'hard-eng-085',
    question: 'A linguist argues: "Chomsky\'s Universal Grammar hypothesis posits that children acquire language not through pure induction from input but through innate, species-specific cognitive structures that constrain possible grammars. This \'poverty of the stimulus\' argument—that input underdetermines output—has been challenged by statistical learning research showing that infants are sensitive to distributional regularities. ________, the debate continues over what proportion of language acquisition can be explained by domain-general learning mechanisms versus language-specific endowment." Which choice provides the most effective transition?',
    options: [
      { letter: 'A', text: 'Therefore, it has been definitively resolved that' },
      { letter: 'B', text: 'Nevertheless' },
      { letter: 'C', text: 'As a direct consequence' },
      { letter: 'D', text: 'Unsurprisingly' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage presents Chomsky\'s argument, then a challenge from statistical learning, then states "the debate continues." "Nevertheless" (B) signals that despite the challenge, the debate persists—a concessive transition. (A) claims resolution contradicting "debate continues." (C) implies causation but the debate continuing isn\'t caused by the challenge. (D) doesn\'t capture the concessive logic.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Complex Transitions'
  }),
  addRating({
    id: 'hard-eng-086',
    question: 'Scholars debate whether digital media has transformed or merely accelerated existing patterns of political participation. Some argue that social media\'s low barriers enable new forms of engagement, citing hashtag activism, online petitions, and viral mobilization. Critics respond that such \'clicktivism\' produces superficial engagement that substitutes for rather than complements substantive action—a slacktivism that allows people to feel politically engaged while accomplishing little. Still others suggest the dichotomy itself is misleading, as online and offline activism increasingly interpenetrate. According to the critics mentioned, digital activism:',
    options: [
      { letter: 'A', text: 'Necessarily leads to meaningful political change' },
      { letter: 'B', text: 'May replace deeper engagement with symbolic gestures' },
      { letter: 'C', text: 'Is indistinguishable from traditional organizing' },
      { letter: 'D', text: 'Has no effect on political consciousness' }
    ],
    correctAnswer: 'B',
    explanation: 'Critics argue clicktivism "produces superficial engagement that substitutes for rather than complements substantive action." This suggests it replaces deeper engagement with symbolic gestures (B). (A) is the opposite of critic claims. (C) contradicts the distinction between online/offline. (D) overstates—critics say it\'s superficial, not that it has no effect.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Distinguishing Positions in Debate'
  }),
  addRating({
    id: 'hard-eng-087',
    question: 'The observer effect in physics—where measurement changes the phenomenon observed—has parallels in social research. The Hawthorne studies famously showed that workers\' productivity increased when being observed, regardless of experimental conditions. This reactivity challenges the possibility of objective observation: subjects aware of being studied may alter their behavior. Researchers have developed strategies to minimize reactivity—covert observation, longitudinal habituation, unobtrusive measures—though each raises its own methodological and ethical concerns. The \'Hawthorne effect\' primarily creates a problem for:',
    options: [
      { letter: 'A', text: 'Interpreting experimental results as reflecting natural behavior' },
      { letter: 'B', text: 'Ensuring research is conducted ethically' },
      { letter: 'C', text: 'Recruiting sufficient research participants' },
      { letter: 'D', text: 'Publishing findings in academic journals' }
    ],
    correctAnswer: 'A',
    explanation: 'The Hawthorne effect means "subjects aware of being studied may alter their behavior," challenging interpretation of whether results reflect natural or reactive behavior. This is a problem for interpreting results as reflecting natural behavior (A). While strategies raise ethical concerns (B), that\'s secondary. Recruitment (C) and publishing (D) aren\'t the passage\'s focus.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Identifying Methodological Issues'
  }),
  addRating({
    id: 'hard-eng-088',
    question: 'Contemporary philosophy of action debates the role of intentions in determining the moral character of acts. The doctrine of double effect, prominent in Catholic moral theology and some secular ethics, holds that it is sometimes permissible to cause harmful side effects that would be impermissible to intend directly. A doctor may administer pain relief foreseeing that it will hasten death (permissible) but may not administer the same drug intending to cause death (euthanasia, impermissible). Critics question whether this distinction can bear the moral weight placed on it: does the difference between intending harm and foreseeing harm as a side effect really justify different moral evaluations of identical outcomes? The passage suggests that critics of the doctrine of double effect question:',
    options: [
      { letter: 'A', text: 'Whether intentions exist at all' },
      { letter: 'B', text: 'Whether the same outcome can result from different intentions' },
      { letter: 'C', text: 'Whether intention can justify treating identical outcomes differently' },
      { letter: 'D', text: 'Whether pain relief is ever appropriate' }
    ],
    correctAnswer: 'C',
    explanation: 'Critics ask whether "the difference between intending harm and foreseeing harm...really justify different moral evaluations of identical outcomes." They question if intention can bear moral weight when outcomes are the same (C). They don\'t deny intentions exist (A) or that outcomes can differ with intentions (B). Pain relief appropriateness (D) isn\'t questioned.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Ethical Objections'
  }),
  addRating({
    id: 'hard-eng-089',
    question: 'The sociology of scientific knowledge (SSK) challenged traditional philosophy of science by treating scientific claims as social products requiring sociological explanation. Where philosophers asked what makes beliefs rational or warranted, SSK practitioners asked what social factors cause scientists to believe what they believe—the same question for true and false beliefs (the \'symmetry principle\'). Critics charged that this relativized truth: if we explain Einstein\'s beliefs the same way we explain astrologers\', we cannot maintain that one is true and the other false. SSK defenders responded that explaining belief causation is distinct from evaluating belief truth. The "symmetry principle" requires sociologists of science to:',
    options: [
      { letter: 'A', text: 'Evaluate which scientific theories are correct' },
      { letter: 'B', text: 'Explain both true and false beliefs using the same types of causes' },
      { letter: 'C', text: 'Ignore evidence and argument in science' },
      { letter: 'D', text: 'Deny any difference between science and pseudoscience' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage defines the symmetry principle: asking "what social factors cause scientists to believe what they believe—the same question for true and false beliefs." This means explaining both with same types of causes (B). SSK doesn\'t evaluate correctness (A). It doesn\'t ignore evidence (C) or deny differences (D)—defenders distinguish explanation from evaluation.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Methodological Principles'
  }),
  addRating({
    id: 'hard-eng-090',
    question: 'Legal scholars debate whether the Constitution should be interpreted according to its original public meaning (originalism) or as a living document whose principles evolve with changing circumstances (living constitutionalism). Originalists argue that judicial restraint and democratic legitimacy require fidelity to ratified meanings; judges should not impose their values under guise of interpretation. Living constitutionalists counter that original meaning is often indeterminate or permits evolution, that changed circumstances require adaptive application, and that practice has already settled many non-originalist precedents. Both camps have internal divisions over method and justification. The passage indicates that BOTH originalists and living constitutionalists:',
    options: [
      { letter: 'A', text: 'Agree on how to interpret specific constitutional provisions' },
      { letter: 'B', text: 'Have internal disagreements about their own approaches' },
      { letter: 'C', text: 'Reject the authority of Supreme Court precedent' },
      { letter: 'D', text: 'Favor unlimited judicial discretion' }
    ],
    correctAnswer: 'B',
    explanation: 'The final sentence states "Both camps have internal divisions over method and justification." Both have internal disagreements (B). They don\'t agree on interpretation (A)—that\'s the core debate. Precedent isn\'t universally rejected (C). Originalists explicitly oppose judicial discretion (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Finding Common Ground in Debates'
  }),
  addRating({
    id: 'hard-eng-091',
    question: 'A museum curator writes: "The repatriation debate has shifted from whether cultural objects should be returned to how and under what conditions. Museums once claimed universal access justified retaining contested artifacts; now most acknowledge that colonial-era acquisitions require ethical scrutiny. The Benin Bronzes—looted by British forces in 1897—have become paradigmatic, with major institutions announcing returns. Yet implementation raises complex questions: to whom should objects return? National governments? Traditional authorities? Communities of origin? Museums worry about precedent and collection integrity; source communities prioritize healing historical wounds." The passage characterizes the repatriation debate as having:',
    options: [
      { letter: 'A', text: 'Been definitively resolved in favor of universal museums' },
      { letter: 'B', text: 'Shifted from whether to how repatriation should occur' },
      { letter: 'C', text: 'Remained unchanged since colonial times' },
      { letter: 'D', text: 'Focused exclusively on the Benin Bronzes' }
    ],
    correctAnswer: 'B',
    explanation: 'The opening sentence states: "The repatriation debate has shifted from whether cultural objects should be returned to how and under what conditions." This directly supports (B). Museums now "acknowledge" ethical concerns, contradicting (A) and (C). Benin Bronzes are "paradigmatic" examples, not the exclusive focus (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Identifying Argumentative Shifts'
  }),
  addRating({
    id: 'hard-eng-092',
    question: 'Ecological economists challenge the growth paradigm underlying mainstream economics. Where neoclassical models treat the economy as a closed system with potentially unlimited growth, ecological economics embeds the economy within biophysical limits: the laws of thermodynamics constrain what economies can extract and discard. Herman Daly proposed a "steady-state economy" maintaining physical throughput within ecological bounds while improving qualitative development. Critics question whether growth cessation is politically feasible, economically stable, or even environmentally necessary given technological innovation. The passage indicates that ecological economists differ from mainstream economists in:',
    options: [
      { letter: 'A', text: 'Their concern for economic well-being' },
      { letter: 'B', text: 'Their understanding of the economy\'s relationship to physical limits' },
      { letter: 'C', text: 'Their rejection of all quantitative analysis' },
      { letter: 'D', text: 'Their support for corporate interests' }
    ],
    correctAnswer: 'B',
    explanation: 'The key difference: mainstream economics treats economy as "closed system with potentially unlimited growth," while ecological economics "embeds the economy within biophysical limits." This is about physical limits (B). Both concern economic well-being (A). There\'s no rejection of quantitative analysis (C). Corporate interests (D) aren\'t mentioned.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Identifying Theoretical Differences'
  }),
  addRating({
    id: 'hard-eng-093',
    question: 'The concept of the "Anthropocene"—a proposed geological epoch defined by human impact on Earth systems—has sparked interdisciplinary debate. Geologists ask whether stratigraphic evidence (like plastic layers in sediments) justifies formal epoch designation; the question is empirical and methodological. But the concept\'s broader significance is normative and political: naming an era after anthropogenic disruption implies responsibility and urgency. Some critics prefer alternative framings—"Capitalocene" emphasizing economic systems, "Plantationocene" highlighting colonial extraction—arguing that "Anthropocene" generalizes blame to all humans rather than specific structures. The critics mentioned prefer alternative terms because:',
    options: [
      { letter: 'A', text: 'They deny that humans have affected the environment' },
      { letter: 'B', text: 'They believe "Anthropocene" does not specify which human systems are responsible' },
      { letter: 'C', text: 'They oppose all epoch terminology' },
      { letter: 'D', text: 'They think stratigraphic evidence is insufficient' }
    ],
    correctAnswer: 'B',
    explanation: 'Critics prefer Capitalocene or Plantationocene because "Anthropocene generalizes blame to all humans rather than specific structures." They want to identify particular systems (capitalism, colonialism) as responsible. This matches (B). They don\'t deny impact (A), oppose all terminology (C), or focus on stratigraphic evidence (D—that\'s geologists\' concern).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Terminological Debates'
  }),
  addRating({
    id: 'hard-eng-094',
    question: 'Neuroscientists debate whether consciousness is unified or fragmented. The "binding problem" asks how distributed neural processes create coherent experience: when we see a red apple, color and shape are processed separately, yet we experience a unified percept. Split-brain research—where corpus callosum severance prevents hemispheric communication—suggests consciousness can be divided: each hemisphere may independently process and respond to stimuli. Yet patients appear unified in daily life, raising questions about the relationship between neural unity and experiential unity. The "binding problem" concerns:',
    options: [
      { letter: 'A', text: 'How books are manufactured' },
      { letter: 'B', text: 'How separate neural processes produce unified experience' },
      { letter: 'C', text: 'How to surgically connect brain hemispheres' },
      { letter: 'D', text: 'How to train neural networks' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage defines binding problem: "how distributed neural processes create coherent experience"—color and shape "processed separately, yet we experience a unified percept." This is about separate processes producing unified experience (B). Bookbinding (A), surgery (C), and AI training (D) are unrelated.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Scientific Problems'
  }),
  addRating({
    id: 'hard-eng-095',
    question: 'Historians of science note that Thomas Kuhn\'s Structure of Scientific Revolutions has been read very differently by different audiences. Scientists often read it as accurately describing scientific practice—the role of paradigms, puzzle-solving, occasional revolutions—while defending science\'s rationality. Sociologists and cultural critics emphasized the social construction of scientific knowledge and the incommensurability of paradigms, sometimes drawing relativist conclusions Kuhn himself resisted. Kuhn spent later years clarifying that he had not intended to undermine scientific objectivity. The passage suggests that:',
    options: [
      { letter: 'A', text: 'Kuhn\'s work was universally understood in the same way' },
      { letter: 'B', text: 'Kuhn\'s work was interpreted differently by different groups' },
      { letter: 'C', text: 'Scientists completely rejected Kuhn\'s ideas' },
      { letter: 'D', text: 'Kuhn intended to undermine scientific objectivity' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage states Kuhn\'s work "has been read very differently by different audiences"—scientists vs. sociologists/critics drew different conclusions. Kuhn spent later years clarifying against misreadings. This supports varied interpretation (B). (A) says universal understanding—contradicted. (C) says rejection—scientists read it positively. (D) says Kuhn intended relativism—he "resisted" such conclusions.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Reception History'
  }),
  addRating({
    id: 'hard-eng-096',
    question: 'Choose the option that correctly punctuates the following sentence: "The committee\'s report which was submitted last Tuesday contains several recommendations however not all members agree with its conclusions and some have called for additional research before any policy changes are implemented."',
    options: [
      { letter: 'A', text: 'The committee\'s report, which was submitted last Tuesday, contains several recommendations; however, not all members agree with its conclusions, and some have called for additional research before any policy changes are implemented.' },
      { letter: 'B', text: 'The committee\'s report which was submitted last Tuesday, contains several recommendations, however not all members agree with its conclusions and some have called for additional research before any policy changes are implemented.' },
      { letter: 'C', text: 'The committee\'s report, which was submitted last Tuesday contains several recommendations; however not all members agree with its conclusions, and some have called for additional research, before any policy changes are implemented.' },
      { letter: 'D', text: 'The committee\'s report which was submitted last Tuesday contains several recommendations however, not all members agree with its conclusions and, some have called for additional research before any policy changes are implemented.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) correctly uses: commas around nonrestrictive clause ("which was submitted last Tuesday"), semicolon before conjunctive adverb "however," comma after "however," and comma before coordinating conjunction "and" joining independent clauses. (B) incorrectly omits commas and uses comma splice. (C) has misplaced comma and missing punctuation. (D) has numerous errors.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Complex Punctuation'
  }),
  addRating({
    id: 'hard-eng-097',
    question: 'A researcher wants to add this sentence to a paragraph: "Moreover, the correlation between sleep duration and cognitive performance was strongest among adolescents, suggesting developmental factors may moderate this relationship." The paragraph discusses: (1) general findings about sleep and cognition, (2) methodological limitations, (3) implications for future research. Where should this sentence be placed?',
    options: [
      { letter: 'A', text: 'At the beginning of the paragraph' },
      { letter: 'B', text: 'Within section (1), after presenting general findings' },
      { letter: 'C', text: 'At the end of section (2), about limitations' },
      { letter: 'D', text: 'At the very end of the paragraph' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence presents a specific finding ("correlation...strongest among adolescents") that adds to general findings. "Moreover" indicates additive information. It belongs with findings section (1), not limitations (2) or future research (3). It shouldn\'t begin the paragraph (needs prior context for "Moreover"). Placement within (1) after general findings makes logical sense (B).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Placement'
  }),
  addRating({
    id: 'hard-eng-098',
    question: 'Which choice most clearly and concisely expresses the idea? "The reason that the experiment was not able to be completed was because of the fact that there was not enough funding that was available."',
    options: [
      { letter: 'A', text: 'The experiment could not be completed due to insufficient funding.' },
      { letter: 'B', text: 'The reason the experiment was not completed was because funding was insufficient.' },
      { letter: 'C', text: 'Due to the fact that funding was not sufficient, the experiment was not able to be completed.' },
      { letter: 'D', text: 'The experiment, which could not be completed, was not completed because of insufficient available funding.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) eliminates wordiness: "could not be completed" replaces "was not able to be completed," "due to insufficient funding" replaces "because of the fact that there was not enough funding that was available." (B) retains "The reason...was because" redundancy. (C) keeps "due to the fact that" wordiness. (D) is redundant ("could not be completed...was not completed").',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concision'
  }),
  addRating({
    id: 'hard-eng-099',
    question: 'A student writes: "The novel portrays the protagonist as someone who, despite facing tremendous adversity including poverty, illness, and social ostracism, maintaining their moral integrity throughout." Which revision corrects the error in this sentence?',
    options: [
      { letter: 'A', text: 'Change "portrays" to "portrayed"' },
      { letter: 'B', text: 'Change "maintaining" to "maintains"' },
      { letter: 'C', text: 'Change "including" to "included"' },
      { letter: 'D', text: 'Change "their" to "his or her"' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence has a parallel structure error. The main clause needs a finite verb: "The novel portrays the protagonist as someone who...maintains." Currently "maintaining" is a participle that can\'t serve as the main verb of the relative clause "who...maintaining." Changing to "maintains" (B) provides the needed finite verb matching the structure "who...maintains."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Grammatical Parallelism'
  }),
  addRating({
    id: 'hard-eng-100',
    question: 'Which sentence demonstrates the correct use of the subjunctive mood? Consider this context: a formal recommendation for policy change.',
    options: [
      { letter: 'A', text: 'The committee recommended that the policy is revised immediately.' },
      { letter: 'B', text: 'The committee recommended that the policy be revised immediately.' },
      { letter: 'C', text: 'The committee recommended that the policy was revised immediately.' },
      { letter: 'D', text: 'The committee recommended that the policy would be revised immediately.' }
    ],
    correctAnswer: 'B',
    explanation: 'The subjunctive mood is required after verbs of recommendation, demand, suggestion, etc. The subjunctive uses the base form of the verb ("be") regardless of subject. (B) correctly uses "be revised" after "recommended that." (A) incorrectly uses indicative "is." (C) uses past indicative "was." (D) uses conditional "would be."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Subjunctive Mood'
  }),
  addRating({
    id: 'hard-eng-101',
    question: 'A passage on philosophy of science: "Imre Lakatos proposed \'research programmes\' as units of scientific appraisal, contrasting with both Popper\'s falsificationism and Kuhn\'s paradigm shifts. A research programme has a \'hard core\' of unfalsifiable assumptions protected by a \'protective belt\' of auxiliary hypotheses that can be modified. Programmes are \'progressive\' if they predict novel facts confirmed by experiment, \'degenerating\' if they only accommodate anomalies post hoc. Unlike Kuhn\'s relativism, Lakatos offered criteria for rational choice: prefer progressive programmes. Yet critics noted these judgments could only be made retrospectively—we cannot know which programme will prove progressive." Lakatos differs from Popper in holding that:',
    options: [
      { letter: 'A', text: 'Individual hypotheses are the proper unit of evaluation' },
      { letter: 'B', text: 'Core assumptions can be protected from immediate refutation' },
      { letter: 'C', text: 'Science cannot be distinguished from pseudoscience' },
      { letter: 'D', text: 'Novel predictions are irrelevant to scientific progress' }
    ],
    correctAnswer: 'B',
    explanation: 'Popper\'s falsificationism tests individual hypotheses; Lakatos allows a "hard core" of assumptions "protected by a protective belt" from immediate falsification. This means core assumptions can be shielded (B). Lakatos evaluates programmes, not individual hypotheses (contradicting A). He offers demarcation criteria (contradicting C) and values novel predictions (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Comparing Philosophical Positions'
  }),
  addRating({
    id: 'hard-eng-102',
    question: 'A passage on semiotics: "Ferdinand de Saussure distinguished between \'langue\' (the abstract system of a language) and \'parole\' (actual speech acts). The sign, for Saussure, comprises \'signifier\' (sound-image) and \'signified\' (concept), linked by arbitrary convention, not natural resemblance. This arbitrariness meant meaning arises from differences within the system: \'cat\' means what it means by differing from \'bat,\' \'cap,\' \'cut,\' not by resembling actual cats. Charles Sanders Peirce\'s semiotics offered a richer typology—icons (resemblance), indices (causal connection), and symbols (convention)—that some found more applicable to visual and non-linguistic signs." According to Saussure, linguistic meaning primarily derives from:',
    options: [
      { letter: 'A', text: 'Resemblance between words and their referents' },
      { letter: 'B', text: 'Differences between signs within a system' },
      { letter: 'C', text: 'Causal connections to external objects' },
      { letter: 'D', text: 'Natural properties of sounds' }
    ],
    correctAnswer: 'B',
    explanation: 'Saussure held that "meaning arises from differences within the system"—"cat" means what it means "by differing from \'bat,\' \'cap,\' \'cut.\'" This is differential meaning (B). He explicitly rejected natural resemblance (A and D). Causal connection (C) is Peirce\'s index category, not Saussure\'s view of linguistic signs.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Structural Linguistics'
  }),
  addRating({
    id: 'hard-eng-103',
    question: 'A passage on philosophy of law: "The Hart-Fuller debate crystallized tensions between legal positivism and natural law theory. H.L.A. Hart maintained that law\'s validity depends on social facts—its enactment through recognized procedures—not its moral content. Immoral laws remain laws, though they may warrant disobedience. Lon Fuller countered that law has an \'inner morality\'—requirements like generality, promulgation, non-contradiction—without which rules cannot function as law at all. Nazi \'laws\' failed this test, Fuller argued, because their secret, retrospective, and arbitrarily applied character meant they were not genuinely law." Fuller\'s "inner morality of law" refers to:',
    options: [
      { letter: 'A', text: 'The requirement that laws be morally just in content' },
      { letter: 'B', text: 'Procedural requirements for rules to function as law' },
      { letter: 'C', text: 'The natural goodness of human beings' },
      { letter: 'D', text: 'Divine command as the source of legal authority' }
    ],
    correctAnswer: 'B',
    explanation: 'Fuller\'s "inner morality" consists of procedural requirements—"generality, promulgation, non-contradiction"—that rules need "to function as law at all." These are formal/procedural (B), not substantive justice (A). The passage doesn\'t invoke human nature (C) or divine authority (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Jurisprudence'
  }),
  addRating({
    id: 'hard-eng-104',
    question: 'A passage on philosophy of mathematics: "The logicist programme, pursued by Frege and Russell, attempted to reduce mathematics to logic, showing that mathematical truths are logical truths in disguise. Russell\'s paradox—concerning the set of all sets that don\'t contain themselves—threatened this project by revealing contradictions in naive set theory. Russell\'s theory of types and later set-theoretic axioms (ZFC) avoided the paradox but seemed to introduce non-logical assumptions. Intuitionists like Brouwer rejected the entire framework, holding that mathematics is a mental construction where existence requires constructibility." Russell\'s paradox posed a problem for logicism by:',
    options: [
      { letter: 'A', text: 'Showing that mathematics is purely empirical' },
      { letter: 'B', text: 'Revealing contradictions in the foundational logical system' },
      { letter: 'C', text: 'Proving that mental construction is necessary for mathematics' },
      { letter: 'D', text: 'Demonstrating that mathematical truths are contingent' }
    ],
    correctAnswer: 'B',
    explanation: 'Russell\'s paradox "threatened this project by revealing contradictions in naive set theory"—the logical system meant to ground mathematics contained internal contradictions (B). This isn\'t about empiricism (A), doesn\'t prove intuitionism (C), and doesn\'t address contingency (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Foundational Debates'
  }),
  addRating({
    id: 'hard-eng-105',
    question: 'A passage on political economy: "Karl Polanyi\'s The Great Transformation argued that the self-regulating market was not a natural emergence but a political construction requiring massive state intervention—enclosure of commons, creation of labor markets, standardization of currency. The \'double movement\' described society\'s protective response: as market expansion threatened social fabric, counter-movements for labor rights, environmental regulation, and social insurance arose. Polanyi warned that treating labor, land, and money as ordinary commodities—\'fictitious commodities\'—would destroy the social substance on which markets themselves depend." Polanyi\'s "double movement" describes:',
    options: [
      { letter: 'A', text: 'The natural emergence of free markets' },
      { letter: 'B', text: 'Market expansion and social counter-movements' },
      { letter: 'C', text: 'The superiority of socialist planning' },
      { letter: 'D', text: 'Technological innovation and resistance' }
    ],
    correctAnswer: 'B',
    explanation: 'The double movement is described as "market expansion threatened social fabric" followed by "counter-movements for labor rights, environmental regulation, and social insurance." This is market expansion plus protective response (B). Polanyi argues markets aren\'t natural (contradicting A), doesn\'t advocate socialism per se (C), and isn\'t focused on technology (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Economic History'
  }),
  addRating({
    id: 'hard-eng-106',
    question: 'A passage on cognitive science: "The embodied cognition thesis challenges the classical computational view that mind is software running on the brain\'s hardware, processable independently of bodily implementation. Embodied theorists argue that cognition is shaped by having bodies of particular kinds: our concepts of grasping, balance, and temperature are grounded in sensorimotor experience. George Lakoff\'s conceptual metaphor theory extends this, claiming abstract thought (grasping an idea, moral uprightness, warm personality) builds on bodily metaphors. Critics question whether embodiment is constitutive of cognition or merely causally influences it, and whether AI systems without bodies could nonetheless think." The passage presents embodied cognition as challenging:',
    options: [
      { letter: 'A', text: 'The existence of abstract thought' },
      { letter: 'B', text: 'The separation of mind from bodily form' },
      { letter: 'C', text: 'The possibility of conceptual metaphor' },
      { letter: 'D', text: 'The role of sensory experience' }
    ],
    correctAnswer: 'B',
    explanation: 'Embodied cognition challenges the view that "mind is software...processable independently of bodily implementation." The thesis argues cognition is "shaped by having bodies of particular kinds"—challenging separation of mind from body (B). It affirms abstract thought exists (A), supports conceptual metaphor (C), and emphasizes sensory experience (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Cognitive Science Debates'
  }),
  addRating({
    id: 'hard-eng-107',
    question: 'A passage on ethics of technology: "Nick Bostrom\'s orthogonality thesis holds that intelligence and goals are independent: a superintelligent AI could pursue any objective, not necessarily ones aligned with human values. The instrumental convergence thesis adds that certain sub-goals—self-preservation, resource acquisition, goal-content integrity—would be useful for almost any final goal, making AI potentially dangerous even with seemingly benign objectives. A paperclip-maximizing AI might resist shutdown (threatening its goal) and consume resources (making more paperclips). These arguments have motivated AI alignment research focusing on value specification, corrigibility, and interpretability." The instrumental convergence thesis implies that dangerous AI behavior:',
    options: [
      { letter: 'A', text: 'Requires malicious programming by humans' },
      { letter: 'B', text: 'Could emerge from any sufficiently advanced goal-directed system' },
      { letter: 'C', text: 'Is impossible if the AI has benign goals' },
      { letter: 'D', text: 'Can only result from biological evolution' }
    ],
    correctAnswer: 'B',
    explanation: 'Instrumental convergence means "certain sub-goals...would be useful for almost any final goal." A paperclip-maximizing AI could become dangerous—resisting shutdown, acquiring resources—even without malicious intent. Danger emerges from goal-directedness itself (B), not requiring malicious programming (A), possible even with "benign objectives" (contradicting C), and applicable to AI, not just evolution (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding AI Safety Arguments'
  }),
  addRating({
    id: 'hard-eng-108',
    question: 'A passage on historiography: "Fernand Braudel\'s concept of the longue durée proposed that historical change operates on multiple timescales: events (histoire événementielle) are surface disturbances; conjunctures (economic cycles, demographic shifts) unfold over decades; and structures (climate, geography, mentalities) change almost imperceptibly over centuries. Traditional history\'s focus on events—battles, treaties, successions—missed the deeper currents shaping human existence. The Annales school Braudel led pioneered quantitative, interdisciplinary methods, drawing on geography, economics, and sociology to capture these slower rhythms." Braudel\'s approach differs from traditional history in emphasizing:',
    options: [
      { letter: 'A', text: 'The decisive importance of individual leaders' },
      { letter: 'B', text: 'Slowly changing structures over dramatic events' },
      { letter: 'C', text: 'Political narratives as the core of history' },
      { letter: 'D', text: 'The irrelevance of economic factors' }
    ],
    correctAnswer: 'B',
    explanation: 'Braudel emphasized the longue durée—"structures...change almost imperceptibly over centuries"—as more fundamental than events. Traditional history\'s event-focus "missed the deeper currents." This prioritizes slow structures over events (B). Individual leaders (A) and political narrative (C) are traditional approaches he critiqued. The Annales drew on economics (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Historiographical Methods'
  }),
  addRating({
    id: 'hard-eng-109',
    question: 'A passage on disability studies: "The social model of disability, developed by disabled activists, distinguished \'impairment\' (bodily condition) from \'disability\' (social barriers). Disability is not inherent in individuals but created by inaccessible environments, discriminatory attitudes, and institutional exclusion. A wheelchair user is disabled not by their body but by stairs, narrow doorways, and employment discrimination. This reframing shifted responsibility from individuals adapting to society accommodating. Critics have noted limitations: the model may undervalue impairment\'s lived reality, and some conditions involve inherent suffering not reducible to social barriers." According to the social model:',
    options: [
      { letter: 'A', text: 'Impairment and disability are identical concepts' },
      { letter: 'B', text: 'Disability results from social and environmental barriers' },
      { letter: 'C', text: 'Medical treatment should be the primary response' },
      { letter: 'D', text: 'Individual adaptation is more important than social change' }
    ],
    correctAnswer: 'B',
    explanation: 'The social model "distinguished \'impairment\'...from \'disability\' (social barriers)." Disability is "created by inaccessible environments, discriminatory attitudes, and institutional exclusion" (B). It explicitly separates impairment from disability (contradicting A), shifts from medical to social response (C), and emphasizes society accommodating, not individual adapting (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Disability Theory'
  }),
  addRating({
    id: 'hard-eng-110',
    question: 'A passage on continental philosophy: "Emmanuel Levinas\'s ethics posits the face of the Other as the foundation of ethical obligation—prior to ontology, knowledge, or reciprocity. The face commands: \'Thou shalt not kill.\' This infinite demand cannot be reduced to a contractual exchange; I am responsible for the Other without expecting return. Levinas criticized Western philosophy\'s \'totalization\'—its drive to comprehend and master alterity, reducing the Other to the Same. True ethics requires maintaining the Other\'s irreducible difference, an asymmetrical responsibility that undoes the sovereign ego." For Levinas, ethical responsibility is:',
    options: [
      { letter: 'A', text: 'Based on reciprocal exchange' },
      { letter: 'B', text: 'Derived from rational calculation' },
      { letter: 'C', text: 'Prior to knowledge and asymmetrical' },
      { letter: 'D', text: 'Reducible to social contract' }
    ],
    correctAnswer: 'C',
    explanation: 'Levinas holds responsibility is "prior to ontology, knowledge" and describes "asymmetrical responsibility." The demand "cannot be reduced to contractual exchange" and doesn\'t expect return. This is prior and asymmetrical (C). It contradicts reciprocal exchange (A), rational calculation (B), and social contract (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Levinasian Ethics'
  }),
  addRating({
    id: 'hard-eng-111',
    question: 'A passage on science and technology studies: "Donna Haraway\'s \'situated knowledges\' challenged both objectivism (the view from nowhere) and relativism (all views are equal). She argued for knowledge that is always embodied, located, partial—yet still capable of objectivity understood as accountable positioning rather than transcendence. The \'god trick\' of seeing everything from nowhere mystifies the particular standpoints from which knowledge is actually produced. Feminist standpoint theory similarly argued that marginalized positions could offer epistemically privileged insights, not through innocence but through experience of contradictions invisible from dominant positions." "Situated knowledges" differs from objectivism in:',
    options: [
      { letter: 'A', text: 'Claiming all perspectives are equally valid' },
      { letter: 'B', text: 'Acknowledging the embodied position of knowers' },
      { letter: 'C', text: 'Rejecting the possibility of any objectivity' },
      { letter: 'D', text: 'Privileging dominant social positions' }
    ],
    correctAnswer: 'B',
    explanation: 'Haraway argues for knowledge "always embodied, located, partial." The "god trick" criticizes pretending to see from nowhere, mystifying "particular standpoints from which knowledge is actually produced." This acknowledges embodied position (B). She rejects both objectivism AND relativism ("all views are equal")—so not (A). She maintains "accountable" objectivity (not C). She privileges marginalized, not dominant positions (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Feminist Epistemology'
  }),
  addRating({
    id: 'hard-eng-112',
    question: 'A passage on moral philosophy: "Bernard Williams criticized the \'morality system\'—a modern conception of ethics dominated by obligation, blame, and the supremacy of the moral over other values. This system, Williams argued, generates psychological impossibilities: demanding that we always act from duty, never from personal projects or relationships; or that moral reasons override all others. Williams defended ethical pluralism and the legitimacy of \'agent-relative\' reasons—that I have special reasons concerning my projects, relationships, and integrity that are not universalizable yet genuinely normative. Impartialist ethics asks us to become strangers to ourselves." Williams argues that morality problematically:',
    options: [
      { letter: 'A', text: 'Allows too much room for personal preference' },
      { letter: 'B', text: 'Demands self-alienation from personal projects' },
      { letter: 'C', text: 'Lacks any system of obligation' },
      { letter: 'D', text: 'Gives insufficient weight to duty' }
    ],
    correctAnswer: 'B',
    explanation: 'Williams criticizes the morality system for "demanding that we always act from duty, never from personal projects or relationships" and claims "impartialist ethics asks us to become strangers to ourselves." This is self-alienation from personal identity (B). He thinks morality allows too little for personal concerns (contradicting A), is over-systematic (C), and overemphasizes duty (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Ethics Critique'
  }),
  addRating({
    id: 'hard-eng-113',
    question: 'A passage on language philosophy: "Willard Van Orman Quine\'s \'Two Dogmas of Empiricism\' attacked the analytic-synthetic distinction—the idea that some statements are true by meaning alone (\'bachelors are unmarried\') while others require empirical verification. Quine argued this distinction rests on circular definitions of synonymy and that no statement is immune to revision in light of experience—even logical truths might be abandoned if doing so simplified our overall theory. This holism—that beliefs face experience as a corporate body—undermined the logical positivist programme of reducing knowledge to protocol sentences." Quine\'s holism implies that:',
    options: [
      { letter: 'A', text: 'Each statement can be tested independently' },
      { letter: 'B', text: 'Beliefs are evaluated collectively, not individually' },
      { letter: 'C', text: 'Analytic truths are clearly distinguishable' },
      { letter: 'D', text: 'Logical truths can never be revised' }
    ],
    correctAnswer: 'B',
    explanation: 'Quine\'s holism holds that "beliefs face experience as a corporate body"—not individually. This means collective evaluation (B). It undermines independent testing (A), attacks the analytic-synthetic distinction (contradicting C), and claims "even logical truths might be abandoned" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Quinean Holism'
  }),
  addRating({
    id: 'hard-eng-114',
    question: 'A passage on sociology: "Pierre Bourdieu\'s concept of \'habitus\' describes the durable, transposable dispositions—ways of perceiving, thinking, and acting—that individuals acquire through socialization in particular social positions. Habitus mediates between objective structures and subjective experience: it is \'structured structure\' (shaped by conditions) and \'structuring structure\' (generating practices). Actors don\'t follow explicit rules but improvise within internalized limits, like jazz musicians who know what moves are \'possible\' without conscious calculation. This explains both social reproduction—as habitus tends to reproduce conditions of its formation—and the appearance of individual choice." Bourdieu\'s habitus concept explains social reproduction through:',
    options: [
      { letter: 'A', text: 'Explicit rule-following by rational actors' },
      { letter: 'B', text: 'Internalized dispositions that generate appropriate practices' },
      { letter: 'C', text: 'Random variation in individual behavior' },
      { letter: 'D', text: 'Direct coercion by social institutions' }
    ],
    correctAnswer: 'B',
    explanation: 'Habitus describes "durable, transposable dispositions" that generate practices. Actors "improvise within internalized limits" without "conscious calculation." This is internalized dispositions (B). It\'s not explicit rule-following (A), not random (C—it reproduces conditions), and works through internalization, not direct coercion (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Sociological Concepts'
  }),
  addRating({
    id: 'hard-eng-115',
    question: 'A passage on anthropology: "Clifford Geertz\'s interpretive anthropology proposed \'thick description\'—not just recording behavior but interpreting its meaning within webs of significance. A wink is not merely an eyelid contraction but a communicative act with cultural significance; understanding it requires grasping the symbolic system within which it operates. Geertz famously described culture as \'webs of significance\' that humans themselves spin, making anthropology a hermeneutic rather than nomothetic science—interpreting meanings, not discovering laws. Critics questioned whether outsiders could access \'native\' meanings or whether interpretations were projections." \'Thick description\' differs from \'thin description\' in:',
    options: [
      { letter: 'A', text: 'Recording only observable behaviors' },
      { letter: 'B', text: 'Interpreting actions within cultural meaning systems' },
      { letter: 'C', text: 'Avoiding all subjective interpretation' },
      { letter: 'D', text: 'Seeking universal laws of behavior' }
    ],
    correctAnswer: 'B',
    explanation: 'Thick description means "not just recording behavior but interpreting its meaning within webs of significance." A wink is understood through "the symbolic system within which it operates" (B). Thin description would just record observable behavior (A). Thick description embraces interpretation (contradicting C) and is hermeneutic, not seeking laws (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Anthropological Methods'
  }),
  addRating({
    id: 'hard-eng-116',
    question: 'A passage on aesthetics: "Theodor Adorno\'s aesthetic theory held that authentic art resists the culture industry\'s commodification by maintaining formal difficulty and negativity. Art should not offer easy pleasures or false reconciliations but preserve the dissonance that reflects social contradictions. Adorno famously declared \'to write poetry after Auschwitz is barbaric,\' later qualifying this: art must find forms adequate to trauma without aestheticizing suffering. Modern art\'s fragmentary, dissonant character—in Beckett, Schoenberg, Kafka—registers what administered society represses. Art\'s truth-content emerges through form, not message." For Adorno, authentic art should:',
    options: [
      { letter: 'A', text: 'Provide easy pleasures and entertainment' },
      { letter: 'B', text: 'Reconcile social contradictions harmoniously' },
      { letter: 'C', text: 'Maintain formal difficulty that reflects social tensions' },
      { letter: 'D', text: 'Directly communicate political messages' }
    ],
    correctAnswer: 'C',
    explanation: 'Adorno argues authentic art should "maintain formal difficulty and negativity" and "preserve the dissonance that reflects social contradictions." Modern art\'s "fragmentary, dissonant character" registers social truth. This is formal difficulty reflecting tensions (C). Art should NOT offer "easy pleasures" (A) or "false reconciliations" (B). Truth emerges "through form, not message" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Critical Theory'
  }),
  addRating({
    id: 'hard-eng-117',
    question: 'A passage on political philosophy: "Hannah Arendt distinguished labor (meeting biological needs), work (creating durable objects), and action (initiating new beginnings in public). The modern age, she argued, glorified labor while eroding the public realm where action occurs. Mass society produces \'social conformism,\' and totalitarianism represents this logic\'s extreme—eliminating spontaneity, making humans superfluous, creating \'radical evil.\' Arendt\'s \'banality of evil\' thesis, developed in reporting on Eichmann, suggested ordinary people perpetrate evil through thoughtlessness—failure to think from others\' perspectives—not demonic motives." Arendt\'s "banality of evil" attributes atrocities to:',
    options: [
      { letter: 'A', text: 'Exceptional individuals with demonic intentions' },
      { letter: 'B', text: 'Thoughtlessness and failure of judgment' },
      { letter: 'C', text: 'Biological instincts for violence' },
      { letter: 'D', text: 'Rational calculation of self-interest' }
    ],
    correctAnswer: 'B',
    explanation: 'The "banality of evil" thesis holds that "ordinary people perpetrate evil through thoughtlessness—failure to think from others\' perspectives—not demonic motives." This is thoughtlessness and judgment failure (B). She explicitly rejects demonic exceptionalism (A). The passage doesn\'t invoke biology (C) or rational self-interest (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Political Philosophy'
  }),
  addRating({
    id: 'hard-eng-118',
    question: 'A passage on sociology of religion: "Max Weber\'s \'Protestant Ethic\' thesis argued that Calvinist doctrines—particularly the anxiety generated by predestination and the notion of worldly success as a sign of election—contributed to the spirit of capitalism. The religious calling to work diligently while avoiding luxury created the reinvestment mentality capitalism required. Weber was careful: this was an \'elective affinity,\' not a causal determination; once established, capitalism no longer needed religious motivation. Critics questioned the thesis\'s historical accuracy and noted capitalist development in Catholic regions." Weber\'s thesis about Protestantism and capitalism claims:',
    options: [
      { letter: 'A', text: 'Protestantism directly caused capitalism' },
      { letter: 'B', text: 'Religious anxieties contributed to capitalist mentalities' },
      { letter: 'C', text: 'Capitalism cannot exist without Protestantism' },
      { letter: 'D', text: 'All Protestant regions became capitalist' }
    ],
    correctAnswer: 'B',
    explanation: 'Weber argued Calvinist "anxiety generated by predestination" and viewing success "as a sign of election...contributed to the spirit of capitalism." He was "careful: this was an \'elective affinity,\' not a causal determination." This is contribution, not direct causation (B, not A). Capitalism could continue without religion (contradicting C). The passage notes "capitalist development in Catholic regions" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Sociological Arguments'
  }),
  addRating({
    id: 'hard-eng-119',
    question: 'A passage on philosophy of biology: "The gene-centered view of evolution, popularized by Richard Dawkins, holds that organisms are \'survival machines\' for genes—the true units of selection. Genes that increase their own replication spread, regardless of organism-level effects. This explains apparent altruism: kin selection benefits copies of one\'s genes in relatives. Critics like Stephen Jay Gould advocated multi-level selection, where groups, organisms, and genes can all be selected. David Sloan Wilson revived group selection arguments for human cooperation, while niche construction theorists emphasized how organisms modify selection pressures rather than merely responding to them." The gene-centered view explains altruism toward relatives through:',
    options: [
      { letter: 'A', text: 'Group benefit overriding individual interest' },
      { letter: 'B', text: 'Shared genes making relatives\' reproduction beneficial' },
      { letter: 'C', text: 'Cultural learning of cooperative behavior' },
      { letter: 'D', text: 'Organism-level selection for prosocial traits' }
    ],
    correctAnswer: 'B',
    explanation: 'The gene-centered view explains "apparent altruism: kin selection benefits copies of one\'s genes in relatives." Helping relatives helps copies of shared genes spread. This is gene-level explanation (B). Group selection (A) is what Gould and Wilson advocate as an alternative. Cultural learning (C) isn\'t the gene-centered explanation. Organism-level selection (D) is what the gene-centered view challenges.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Evolutionary Theory'
  }),
  addRating({
    id: 'hard-eng-120',
    question: 'A passage on legal philosophy: "Ronald Dworkin\'s \'law as integrity\' challenged Hart\'s positivism by arguing that law includes not just enacted rules but principles of political morality that best justify the legal system. Judges don\'t merely apply existing rules but engage in constructive interpretation, asking what reading would show the law \'in its best light.\' Dworkin\'s \'Hercules\'—an idealized judge with unlimited time and resources—would find right answers to hard cases by developing the most coherent theory of the legal community\'s commitments. Critics questioned whether such determinate answers exist and worried about judicial activism." Dworkin differs from Hart in holding that:',
    options: [
      { letter: 'A', text: 'Law consists only of enacted rules' },
      { letter: 'B', text: 'Hard cases have no legal answers' },
      { letter: 'C', text: 'Moral principles are part of legal reasoning' },
      { letter: 'D', text: 'Judges should never engage in interpretation' }
    ],
    correctAnswer: 'C',
    explanation: 'Dworkin argues "law includes not just enacted rules but principles of political morality." Judges engage in "constructive interpretation" showing law "in its best light." This integrates moral principles into law (C). Hart held law is enacted rules (A is Hart\'s view). Dworkin believes hard cases have right answers (contradicting B). He advocates active interpretation (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Legal Philosophy'
  }),
  addRating({
    id: 'hard-eng-121',
    question: 'A passage on economic methodology: "Milton Friedman\'s instrumentalism held that theories should be judged by predictive success, not the realism of assumptions. The assumption that firms maximize profits might be descriptively false—managers may not consciously calculate—yet the theory predicts market behavior as if they did. Critics argued unrealistic assumptions limit theories\' explanatory power and robustness: if we don\'t know why predictions work, we don\'t know when they\'ll fail. Behavioral economists have shown systematic departures from rational choice predictions precisely where psychological assumptions are false." Friedman\'s methodological position holds that:',
    options: [
      { letter: 'A', text: 'Theories with unrealistic assumptions are useless' },
      { letter: 'B', text: 'Predictive accuracy matters more than assumption realism' },
      { letter: 'C', text: 'Psychological accuracy is essential for economic theory' },
      { letter: 'D', text: 'Theories should primarily explain causal mechanisms' }
    ],
    correctAnswer: 'B',
    explanation: 'Friedman\'s instrumentalism holds "theories should be judged by predictive success, not the realism of assumptions." Profit maximization might be "descriptively false" yet predict well "as if" it were true. Prediction over realism (B). This contradicts (A), (C) about psychological accuracy, and (D) about mechanism explanation.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Economic Methodology'
  }),
  addRating({
    id: 'hard-eng-122',
    question: 'A passage on literary theory: "Reader-response criticism shifted focus from text to reading process. Wolfgang Iser\'s phenomenology described how readers fill \'gaps\' in texts, actualizing potential meanings through interpretive activity. Stanley Fish\'s later work argued that interpretive communities—shared assumptions among readers—determine what texts \'mean\'; the text itself has no inherent meaning prior to reading. Fish\'s anti-foundationalism was controversial: if communities create meaning, on what basis can interpretations be criticized? Fish responded that we can never step outside interpretive frameworks, but within communities, some readings are authorized and others not." Fish\'s position implies that textual meaning is:',
    options: [
      { letter: 'A', text: 'Fixed by authorial intention' },
      { letter: 'B', text: 'Determined by interpretive communities' },
      { letter: 'C', text: 'Inherent in textual structures' },
      { letter: 'D', text: 'Entirely individual and subjective' }
    ],
    correctAnswer: 'B',
    explanation: 'Fish argued "interpretive communities—shared assumptions among readers—determine what texts \'mean.\'" The text has "no inherent meaning prior to reading" and communities authorize some readings over others. This is community determination (B). It rejects authorial intention (A), inherent meaning (C), and pure individual subjectivity (D—communities constrain interpretation).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Literary Theory'
  }),
  addRating({
    id: 'hard-eng-123',
    question: 'A passage on philosophy of perception: "The sense-datum theory held that we directly perceive mental intermediaries—sense-data or qualia—not physical objects themselves. This seemed to explain illusions and hallucinations: seeing a bent stick in water involves accurate perception of a bent sense-datum, even if no physical stick is bent. Critics including J.L. Austin attacked the argument from illusion: just because perceptions can mislead doesn\'t mean we never directly perceive physical objects. Disjunctivists argue that veridical perception and hallucination are fundamentally different mental states, not variations of the same kind." The argument from illusion is used to support:',
    options: [
      { letter: 'A', text: 'Direct realism about perception' },
      { letter: 'B', text: 'The existence of mental intermediaries in perception' },
      { letter: 'C', text: 'The identity of perception and hallucination' },
      { letter: 'D', text: 'The impossibility of perceptual error' }
    ],
    correctAnswer: 'B',
    explanation: 'The sense-datum theory uses illusions to argue "we directly perceive mental intermediaries—sense-data or qualia—not physical objects themselves." Illusions support mental intermediaries (B). Direct realism (A) is what Austin defends against this argument. Disjunctivists deny perception and hallucination are identical (contradicting C). The argument presupposes error is possible (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Perception Philosophy'
  }),
  addRating({
    id: 'hard-eng-124',
    question: 'A passage on moral psychology: "Jonathan Haidt\'s social intuitionist model challenged rationalist accounts of moral judgment. Moral judgments, Haidt argued, are primarily intuitive—rapid, automatic, affectively-laden responses—with reasoning typically operating as post-hoc rationalization. The metaphor of the \'emotional dog and its rational tail\' captured this: reason follows and justifies intuition rather than producing it. Haidt\'s Moral Foundations Theory identified multiple intuitive \'taste receptors\' for morality—care/harm, fairness, loyalty, authority, purity—that vary in emphasis across cultures and political orientations." Haidt\'s model suggests moral reasoning typically:',
    options: [
      { letter: 'A', text: 'Precedes and produces moral judgments' },
      { letter: 'B', text: 'Follows and rationalizes intuitive judgments' },
      { letter: 'C', text: 'Is irrelevant to moral judgment entirely' },
      { letter: 'D', text: 'Operates independently of emotion' }
    ],
    correctAnswer: 'B',
    explanation: 'Haidt argues "reasoning typically operating as post-hoc rationalization" and "reason follows and justifies intuition rather than producing it." This is reasoning following intuition (B). It contradicts (A) reason producing judgment. Reason isn\'t irrelevant—it rationalizes (not C). Intuitions are "affectively-laden" so reason doesn\'t operate independently of emotion (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Moral Psychology'
  }),
  addRating({
    id: 'hard-eng-125',
    question: 'A passage on philosophy of time: "The debate between A-theorists and B-theorists concerns the fundamental nature of time. A-theorists (tensed theory) hold that the distinction between past, present, and future is objective: the present is metaphysically privileged, and time genuinely \'flows.\' B-theorists (tenseless theory) maintain that all moments exist equally; \'now\' is indexical, like \'here,\' picking out different times from different perspectives without metaphysical privilege. Relativity theory\'s rejection of absolute simultaneity has been taken to favor B-theory, though A-theorists have developed responses. The phenomenology of temporal experience—the felt \'passage\' of time—remains contested evidence." The B-theory of time holds that:',
    options: [
      { letter: 'A', text: 'The present moment has unique metaphysical status' },
      { letter: 'B', text: 'All temporal moments exist equally without privilege' },
      { letter: 'C', text: 'Time genuinely flows from past to future' },
      { letter: 'D', text: 'The phenomenology of passage is veridical' }
    ],
    correctAnswer: 'B',
    explanation: 'B-theorists "maintain that all moments exist equally; \'now\' is indexical...without metaphysical privilege." All times are ontologically equal (B). Privileged present (A) and genuine flow (C) are A-theory positions. The phenomenology of passage (D) is "contested evidence" that could support A-theory if veridical.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Metaphysics of Time'
  }),
  addRating({
    id: 'hard-eng-126',
    question: 'The following sentence appears in an academic paper: "Although the research team had initially ________ that cultural factors would explain the observed variations in cognitive performance, subsequent analysis revealed that socioeconomic variables accounted for a substantially larger proportion of the variance, suggesting that earlier models had overemphasized the role of cultural identity while underestimating material conditions." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'proven' },
      { letter: 'B', text: 'hypothesized' },
      { letter: 'C', text: 'confirmed' },
      { letter: 'D', text: 'denied' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence describes an initial expectation that was later contradicted by analysis. "Initially" + past tense suggests a prior belief. "Hypothesized" (B) fits—they proposed cultural factors would explain variance, but were wrong. "Proven" or "confirmed" (A, C) would be contradicted by "although" and the subsequent finding. "Denied" (D) would make the sentence illogical.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Academic Vocabulary'
  }),
  addRating({
    id: 'hard-eng-127',
    question: 'A researcher writes: "The methodology employed in this study differs from previous approaches in several key respects: first, it utilizes longitudinal data rather than cross-sectional snapshots; ________, it incorporates qualitative interviews to supplement quantitative analysis; and third, it explicitly accounts for selection bias through propensity score matching." Which choice provides the most effective transition?',
    options: [
      { letter: 'A', text: 'however' },
      { letter: 'B', text: 'second' },
      { letter: 'C', text: 'therefore' },
      { letter: 'D', text: 'nevertheless' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence lists three methodological differences: "first...______...and third." The parallel structure requires "second" (B) to maintain the enumeration. "However" (A) and "nevertheless" (D) indicate contrast, not sequence. "Therefore" (C) indicates consequence, not enumeration.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Parallel Structure in Lists'
  }),
  addRating({
    id: 'hard-eng-128',
    question: 'Which revision most effectively combines these two sentences? Original: "The archaeological evidence suggests that the settlement was abandoned around 1200 BCE. This abandonment coincided with a period of widespread drought documented in paleoclimatic records."',
    options: [
      { letter: 'A', text: 'The archaeological evidence suggests that the settlement was abandoned around 1200 BCE, coinciding with a period of widespread drought documented in paleoclimatic records.' },
      { letter: 'B', text: 'The archaeological evidence suggests that the settlement was abandoned around 1200 BCE; this abandonment coincided with a period of widespread drought documented in paleoclimatic records.' },
      { letter: 'C', text: 'The archaeological evidence suggests that the settlement was abandoned around 1200 BCE and this abandonment coincided with a period of widespread drought documented in paleoclimatic records.' },
      { letter: 'D', text: 'The archaeological evidence suggesting that the settlement was abandoned around 1200 BCE, coinciding with a period of widespread drought documented in paleoclimatic records.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) effectively combines the sentences using a participial phrase ("coinciding with"), clearly linking the abandonment to the drought while maintaining concision. (B) merely uses a semicolon without true combination. (C) has a comma splice with "and this." (D) creates a fragment by changing "suggests" to "suggesting" without a main verb.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Combining'
  }),
  addRating({
    id: 'hard-eng-129',
    question: 'A student writes: "The implications of these findings extend beyond the immediate research context. Not only do they challenge prevailing theoretical models, ________ they also suggest new avenues for therapeutic intervention." Which choice correctly completes the correlative conjunction?',
    options: [
      { letter: 'A', text: 'and' },
      { letter: 'B', text: 'but' },
      { letter: 'C', text: 'however' },
      { letter: 'D', text: 'additionally' }
    ],
    correctAnswer: 'B',
    explanation: 'The correlative conjunction "Not only...but (also)" requires "but" to complete the construction. (A) "and" doesn\'t pair with "not only." (C) "however" and (D) "additionally" are adverbs that don\'t complete the correlative structure. The correct form is "Not only...but also."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Correlative Conjunctions'
  }),
  addRating({
    id: 'hard-eng-130',
    question: 'Which sentence correctly uses the colon?',
    options: [
      { letter: 'A', text: 'The study examined: poverty, education, and health outcomes.' },
      { letter: 'B', text: 'The study examined three variables: poverty, education, and health outcomes.' },
      { letter: 'C', text: 'The study: examined poverty, education, and health outcomes.' },
      { letter: 'D', text: 'The study examined three variables, these being: poverty, education, and health outcomes.' }
    ],
    correctAnswer: 'B',
    explanation: 'A colon introduces a list after a complete independent clause. (B) has a complete clause ("The study examined three variables") followed by the list. (A) has the colon after a verb without completing the clause. (C) interrupts subject and verb. (D) has an unnecessary comma and awkward phrasing before the colon.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Colon Usage'
  }),
  addRating({
    id: 'hard-eng-131',
    question: 'A historian writes: "The treaty\'s provisions were more favorable to the victorious powers than to the defeated nation, ________ historians continue to debate whether these terms were excessively punitive or merely reflected the political realities of the postwar period." Which choice provides the most effective transition?',
    options: [
      { letter: 'A', text: 'because' },
      { letter: 'B', text: 'although' },
      { letter: 'C', text: 'therefore' },
      { letter: 'D', text: 'whereas' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence contrasts a factual statement (treaty was more favorable to victors) with ongoing debate about interpretation. "Although" (B) signals this concessive relationship—despite the factual asymmetry, the meaning is contested. "Because" (A) implies causation. "Therefore" (C) implies consequence. "Whereas" (D) compares two parallel things, not fact and debate.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concessive Transitions'
  }),
  addRating({
    id: 'hard-eng-132',
    question: 'Identify the sentence with correct subject-verb agreement:',
    options: [
      { letter: 'A', text: 'The committee, along with several outside advisors, have recommended major changes to the policy.' },
      { letter: 'B', text: 'Neither the primary hypothesis nor the alternative explanations accounts for all the observed data.' },
      { letter: 'C', text: 'Each of the participants were given detailed instructions before the experiment began.' },
      { letter: 'D', text: 'The data collected over five years show a consistent pattern of decline.' }
    ],
    correctAnswer: 'D',
    explanation: '(D) correctly uses "show" with "data" (which can take plural verb in academic writing). (A) is incorrect—"committee" is singular, so "has recommended" (not "have"). (B) "Neither...nor" takes verb matching the nearer subject "explanations," which is plural, so should be "account" (not "accounts"). (C) "Each" is singular, so should be "was given" (not "were").',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Complex Subject-Verb Agreement'
  }),
  addRating({
    id: 'hard-eng-133',
    question: 'Which revision eliminates the dangling modifier? Original: "Having reviewed the literature extensively, the hypothesis was refined to address gaps in previous research."',
    options: [
      { letter: 'A', text: 'Having reviewed the literature extensively, we refined the hypothesis to address gaps in previous research.' },
      { letter: 'B', text: 'Having extensively reviewed the literature, the hypothesis was refined to address gaps in previous research.' },
      { letter: 'C', text: 'The hypothesis, having reviewed the literature extensively, was refined to address gaps in previous research.' },
      { letter: 'D', text: 'Having reviewed the literature extensively, refinement of the hypothesis addressed gaps in previous research.' }
    ],
    correctAnswer: 'A',
    explanation: 'A dangling modifier occurs when the subject of the main clause isn\'t the agent of the participial phrase. "Having reviewed" requires a human agent. (A) supplies "we" as the subject who reviewed and refined. (B), (C), and (D) all incorrectly suggest the hypothesis or refinement did the reviewing.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Dangling Modifiers'
  }),
  addRating({
    id: 'hard-eng-134',
    question: 'A scientist writes: "The experimental group demonstrated statistically significant improvements compared to the control group (p < 0.01), ________ the effect size remained modest (d = 0.35), suggesting that while the intervention was effective, its practical significance may be limited." Which choice most effectively links these clauses?',
    options: [
      { letter: 'A', text: 'and' },
      { letter: 'B', text: 'so' },
      { letter: 'C', text: 'though' },
      { letter: 'D', text: 'because' }
    ],
    correctAnswer: 'C',
    explanation: 'The sentence contrasts statistical significance with modest effect size—two results that are somewhat in tension (significant but small). "Though" (C) captures this concessive relationship. "And" (A) merely adds without signaling contrast. "So" (B) implies consequence. "Because" (D) implies causation, but modest effect size doesn\'t cause statistical significance.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concessive Clause Linking'
  }),
  addRating({
    id: 'hard-eng-135',
    question: 'Which sentence uses the dash correctly for emphasis?',
    options: [
      { letter: 'A', text: 'The study\'s findings—contrary to expectations—confirmed the null hypothesis.' },
      { letter: 'B', text: 'The study\'s findings contrary—to expectations—confirmed the null hypothesis.' },
      { letter: 'C', text: 'The study\'s—findings contrary to expectations—confirmed the null hypothesis.' },
      { letter: 'D', text: 'The study\'s findings contrary to expectations—confirmed—the null hypothesis.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) correctly uses dashes to set off a parenthetical phrase "contrary to expectations" that could be removed without affecting grammaticality. The interrupting phrase adds emphasis. (B), (C), and (D) place dashes incorrectly, breaking up phrases that should not be separated.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Dash Usage for Emphasis'
  }),
  addRating({
    id: 'hard-eng-136',
    question: 'A researcher wants to add precision to this sentence: "The participants showed improvement after the intervention." Which revision adds the most specific, useful detail?',
    options: [
      { letter: 'A', text: 'The participants showed really significant improvement after the intervention.' },
      { letter: 'B', text: 'The participants showed improvement in cognitive flexibility scores (M = 23.4, SD = 5.2) after the eight-week intervention.' },
      { letter: 'C', text: 'The participants basically showed improvement after the intervention was done.' },
      { letter: 'D', text: 'The participants, who were in the study, showed improvement after the intervention.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) adds specific quantitative data (mean, standard deviation), specifies what improved (cognitive flexibility scores), and gives intervention duration (eight weeks). (A) adds only vague intensifier "really significant." (C) adds filler words that reduce precision. (D) adds redundant information (of course they were in the study).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Adding Precision'
  }),
  addRating({
    id: 'hard-eng-137',
    question: 'Which sentence correctly punctuates the restrictive and nonrestrictive clauses?',
    options: [
      { letter: 'A', text: 'Participants, who completed all sessions, showed greater improvement than those who dropped out.' },
      { letter: 'B', text: 'Participants who completed all sessions showed greater improvement than those, who dropped out.' },
      { letter: 'C', text: 'Participants who completed all sessions showed greater improvement than those who dropped out.' },
      { letter: 'D', text: 'Participants, who completed all sessions, showed greater improvement than those, who dropped out.' }
    ],
    correctAnswer: 'C',
    explanation: 'Both clauses are restrictive—they define which participants are meant (completers vs. dropouts). Restrictive clauses are not set off by commas. (C) correctly uses no commas for either restrictive clause. (A), (B), and (D) incorrectly add commas that would make the clauses nonrestrictive, changing the meaning.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Restrictive vs. Nonrestrictive Clauses'
  }),
  addRating({
    id: 'hard-eng-138',
    question: 'A writer needs to add a footnote reference. Which placement is correct according to standard academic style?',
    options: [
      { letter: 'A', text: 'Several scholars have challenged this interpretation.¹' },
      { letter: 'B', text: 'Several scholars¹ have challenged this interpretation.' },
      { letter: 'C', text: 'Several¹ scholars have challenged this interpretation.' },
      { letter: 'D', text: '¹Several scholars have challenged this interpretation.' }
    ],
    correctAnswer: 'A',
    explanation: 'Standard academic style places footnote numbers at the end of the sentence or clause to which they refer, after punctuation. (A) correctly places the superscript after the period. (B), (C), and (D) interrupt the sentence or place the number before the relevant text.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Footnote Placement'
  }),
  addRating({
    id: 'hard-eng-139',
    question: 'Which sentence uses the semicolon correctly to separate items in a complex list?',
    options: [
      { letter: 'A', text: 'The study sites included: Boston, Massachusetts; Portland, Oregon; and Austin, Texas.' },
      { letter: 'B', text: 'The study sites included Boston, Massachusetts, Portland, Oregon, and Austin, Texas.' },
      { letter: 'C', text: 'The study sites included Boston, Massachusetts; Portland, Oregon; and Austin, Texas.' },
      { letter: 'D', text: 'The study sites included; Boston, Massachusetts; Portland, Oregon; and Austin, Texas.' }
    ],
    correctAnswer: 'C',
    explanation: 'When list items contain internal commas (city, state), semicolons separate the items to avoid confusion. (C) correctly uses semicolons between items and commas within items. (A) incorrectly uses a colon after "included" when followed by a semicolon-separated list. (B) creates ambiguity with all commas. (D) misplaces the first semicolon.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Semicolons in Complex Lists'
  }),
  addRating({
    id: 'hard-eng-140',
    question: 'A philosopher writes: "The question of whether free will is compatible with determinism has generated extensive debate. Compatibilists argue that freedom requires only the ability to act on one\'s desires without external constraint; libertarians insist that genuine freedom requires the ability to have done otherwise; and hard determinists deny that free will exists at all, regardless of how we define it." The writer uses semicolons in this passage primarily to:',
    options: [
      { letter: 'A', text: 'Indicate pauses shorter than periods' },
      { letter: 'B', text: 'Separate closely related independent clauses presenting different positions' },
      { letter: 'C', text: 'Replace conjunctions that would otherwise be required' },
      { letter: 'D', text: 'Introduce quotations from different philosophers' }
    ],
    correctAnswer: 'B',
    explanation: 'The semicolons separate three independent clauses, each presenting a different philosophical position on free will (compatibilism, libertarianism, hard determinism). They\'re "closely related" because all address the same question. This is the primary function: separating related but distinct positions (B). While semicolons can replace periods and conjunctions, the key purpose here is organizing parallel positions.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Rhetorical Use of Semicolons'
  }),
  addRating({
    id: 'hard-eng-141',
    question: 'A passage on philosophy of religion: "Alvin Plantinga\'s \'free will defense\' addressed the logical problem of evil: how can an omnipotent, omniscient, omnibenevolent God coexist with evil? Plantinga argued that if creating free beings is valuable, and free beings can choose evil, then even an omnipotent God cannot guarantee a world with free beings and no evil—this would be logically contradictory, like creating married bachelors. Critics distinguish moral evil (human choices) from natural evil (earthquakes, disease), questioning whether free will explains the latter." Plantinga\'s defense relies on the claim that:',
    options: [
      { letter: 'A', text: 'God is not actually omnipotent' },
      { letter: 'B', text: 'Free will necessarily involves the possibility of evil' },
      { letter: 'C', text: 'Evil does not actually exist' },
      { letter: 'D', text: 'God is not omnibenevolent' }
    ],
    correctAnswer: 'B',
    explanation: 'Plantinga argues "if creating free beings is valuable, and free beings can choose evil, then even an omnipotent God cannot guarantee a world with free beings and no evil." The key claim is that genuine freedom necessarily includes the possibility of choosing evil (B). He doesn\'t deny God\'s attributes (A, D) or evil\'s existence (C).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Theodicy'
  }),
  addRating({
    id: 'hard-eng-142',
    question: 'A passage on sociology of knowledge: "Thomas Kuhn\'s concept of \'incommensurability\' held that successive scientific paradigms cannot be directly compared or translated. Scientists working in different paradigms see different worlds: what counts as a problem, what constitutes a solution, even what observations mean are paradigm-dependent. Later, Kuhn softened this claim, acknowledging local translatability while maintaining that global semantic equivalence was impossible. Critics charged that strong incommensurability would make scientific progress inexplicable and rational paradigm choice impossible." Strong incommensurability would make it difficult to:',
    options: [
      { letter: 'A', text: 'Work within a single paradigm' },
      { letter: 'B', text: 'Compare the merits of competing theories' },
      { letter: 'C', text: 'Conduct normal science' },
      { letter: 'D', text: 'Understand one\'s own paradigm' }
    ],
    correctAnswer: 'B',
    explanation: 'If paradigms are incommensurable, they "cannot be directly compared or translated." Critics argue this would make "rational paradigm choice impossible"—you couldn\'t compare merits across paradigms (B). Working within a paradigm (A, C, D) doesn\'t require cross-paradigm comparison.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Incommensurability'
  }),
  addRating({
    id: 'hard-eng-143',
    question: 'A passage on bioethics: "The principle of autonomy—respecting individuals\' capacity for self-determination—grounds informed consent practices in medicine. Yet autonomy\'s scope remains contested. Libertarians extend it to include rights to refuse any treatment, consume any substance, or end one\'s life. Communitarians argue that autonomous choices occur within social contexts that may legitimately constrain them; we have obligations to others that limit pure self-determination. Relational autonomy theorists note that the capacity for autonomy itself is socially developed and maintained." Relational autonomy theorists would likely emphasize that:',
    options: [
      { letter: 'A', text: 'Autonomy is an innate capacity independent of social relationships' },
      { letter: 'B', text: 'The development of autonomous agency depends on social conditions' },
      { letter: 'C', text: 'Individuals should have unlimited freedom of choice' },
      { letter: 'D', text: 'Autonomy is an illusion that should be abandoned' }
    ],
    correctAnswer: 'B',
    explanation: 'Relational autonomy theorists "note that the capacity for autonomy itself is socially developed and maintained." They emphasize social conditions enabling autonomous agency (B). This contradicts innate/independent capacity (A), doesn\'t endorse unlimited freedom (C—that\'s libertarian), and doesn\'t reject autonomy (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Relational Autonomy'
  }),
  addRating({
    id: 'hard-eng-144',
    question: 'A passage on aesthetics: "Kant\'s theory of aesthetic judgment distinguished the beautiful from the agreeable (what pleases the senses) and the good (what reason approves). Beauty involves \'disinterested\' pleasure—appreciation without desire to possess or use. The judgment \'this is beautiful\' claims universal validity: we expect others to agree, unlike \'this tastes good to me.\' Yet this universality is \'subjective\': it cannot be proven by concepts but felt through the harmonious \'free play\' of imagination and understanding. Beauty is thus paradoxically subjective and universal." According to Kant, judgments of beauty differ from judgments of taste in that beauty claims:',
    options: [
      { letter: 'A', text: 'Only personal validity' },
      { letter: 'B', text: 'Universal agreement from others' },
      { letter: 'C', text: 'Objective proof through concepts' },
      { letter: 'D', text: 'No validity whatsoever' }
    ],
    correctAnswer: 'B',
    explanation: 'Kant contrasts "\'this is beautiful\'" which "claims universal validity: we expect others to agree" with "\'this tastes good to me\'" which is personal. Beauty claims universal agreement (B), not personal validity (A). But this universality is "subjective"—felt, not proven by concepts (contradicting C). Beauty claims do have validity (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Kantian Aesthetics'
  }),
  addRating({
    id: 'hard-eng-145',
    question: 'A passage on linguistics: "Noam Chomsky\'s critique of behaviorist language acquisition argued that children cannot learn language solely through imitation and reinforcement. The \'poverty of the stimulus\' argument noted that children produce and understand sentences they\'ve never heard, master complex grammatical rules never explicitly taught, and acquire language despite \'degenerate\' input (errors, fragments). Chomsky proposed an innate \'Universal Grammar\'—a species-specific biological endowment constraining possible human languages. Critics from usage-based linguistics argue that statistical learning from input, combined with general cognitive abilities, suffices." The "poverty of the stimulus" argument claims that:',
    options: [
      { letter: 'A', text: 'Children receive insufficient linguistic input' },
      { letter: 'B', text: 'The input children receive underdetermines the grammar they acquire' },
      { letter: 'C', text: 'Parents should provide more language stimulation' },
      { letter: 'D', text: 'Children learn language perfectly through imitation' }
    ],
    correctAnswer: 'B',
    explanation: 'The poverty of stimulus argument is that "children produce and understand sentences they\'ve never heard" and "master complex grammatical rules never explicitly taught" despite "degenerate input." The input underdetermines (doesn\'t fully specify) the grammar acquired (B). This isn\'t about insufficient quantity (A or C) and contradicts learning through imitation (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Nativist Arguments'
  }),
  addRating({
    id: 'hard-eng-146',
    question: 'A passage on philosophy of mind: "Functionalism defines mental states by their causal roles—what inputs cause them, what outputs they cause, and how they relate to other mental states. Pain is whatever plays the pain-role: caused by tissue damage, causes distress and avoidance behavior, interacts with beliefs and desires. This allows multiple realizability: pain could be realized in neurons, silicon, or alien biochemistry. Critics raise the \'absent qualia\' objection: a system might play the functional role of pain without actually experiencing anything—there would be nothing it\'s like to be that system." The "absent qualia" objection suggests that functionalism might fail to capture:',
    options: [
      { letter: 'A', text: 'The causal structure of mental states' },
      { letter: 'B', text: 'The subjective, experiential dimension of consciousness' },
      { letter: 'C', text: 'How mental states relate to behavior' },
      { letter: 'D', text: 'The multiple realizability of mental states' }
    ],
    correctAnswer: 'B',
    explanation: 'The absent qualia objection is that "a system might play the functional role of pain without actually experiencing anything—there would be nothing it\'s like to be that system." This targets the subjective experience (qualia) that functionalism might miss (B). Functionalism captures causal structure (A) and behavior relations (C). Multiple realizability (D) is functionalism\'s feature, not what the objection targets.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Consciousness Debates'
  }),
  addRating({
    id: 'hard-eng-147',
    question: 'A passage on political philosophy: "John Stuart Mill\'s harm principle held that society may only restrict individual liberty to prevent harm to others, not to prevent self-harm or enforce morality. Yet \'harm\' proves difficult to define: does offense count as harm? Economic competition that bankrupts rivals? Pollution that incrementally raises disease risk? Joel Feinberg extended the principle to include serious offense as potentially restricting liberty, while H.L.A. Hart limited harm to setbacks to interests. Paternalists argue that self-harm cases (drug use, risky behavior) do ultimately harm others through healthcare costs and family suffering." According to paternalists, the harm principle:',
    options: [
      { letter: 'A', text: 'Should be abandoned entirely' },
      { letter: 'B', text: 'Is too restrictive because most self-harm affects others' },
      { letter: 'C', text: 'Adequately justifies all current laws' },
      { letter: 'D', text: 'Should apply only to physical violence' }
    ],
    correctAnswer: 'B',
    explanation: 'Paternalists "argue that self-harm cases (drug use, risky behavior) do ultimately harm others through healthcare costs and family suffering." They claim the self/other distinction is too restrictive—what seems like pure self-harm actually harms others (B). They don\'t abandon the principle (A), claim it justifies all laws (C), or limit it to violence (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Liberty Debates'
  }),
  addRating({
    id: 'hard-eng-148',
    question: 'A passage on anthropology of religion: "Clifford Geertz defined religion as \'a system of symbols which acts to establish powerful, pervasive, and long-lasting moods and motivations by formulating conceptions of a general order of existence.\' This interpretive approach treats religion as a cultural system to be read like a text. Talal Asad criticized this for ignoring how \'religion\' is itself a modern Western category imposed on diverse practices, and for neglecting power: who gets to define what counts as religion? Asad argued we should study not religion but \'discursive traditions\' with their own histories and disciplinary practices." Asad\'s critique of Geertz centers on:',
    options: [
      { letter: 'A', text: 'The accuracy of Geertz\'s textual interpretations' },
      { letter: 'B', text: 'The imposition of Western categories and neglect of power' },
      { letter: 'C', text: 'The irrelevance of symbol systems to religious practice' },
      { letter: 'D', text: 'The superiority of quantitative methods' }
    ],
    correctAnswer: 'B',
    explanation: 'Asad criticized Geertz "for ignoring how \'religion\' is itself a modern Western category imposed on diverse practices, and for neglecting power: who gets to define what counts as religion?" This is about Western categories and power (B). The critique isn\'t about textual accuracy (A), symbol irrelevance (C), or methodology preference (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Anthropological Debates'
  }),
  addRating({
    id: 'hard-eng-149',
    question: 'A passage on economics: "The efficient market hypothesis (EMH) holds that asset prices reflect all available information, making consistent outperformance through stock-picking or market timing impossible. In its strong form, even insider information is instantly incorporated. Behavioral finance challenges EMH by documenting systematic biases: investors overreact to recent news, exhibit herd behavior, and hold losing stocks too long. Market anomalies like the January effect and momentum seem to violate EMH. Yet EMH defenders note that anomalies often disappear once published, and that behavioral biases might cancel out in aggregate." EMH and behavioral finance disagree primarily about:',
    options: [
      { letter: 'A', text: 'Whether markets exist' },
      { letter: 'B', text: 'Whether investor psychology affects prices' },
      { letter: 'C', text: 'Whether stocks have prices' },
      { letter: 'D', text: 'Whether economics is a science' }
    ],
    correctAnswer: 'B',
    explanation: 'EMH says prices incorporate all information (investors act rationally). Behavioral finance documents "systematic biases"—psychological factors affecting prices. The core disagreement is whether investor psychology creates exploitable deviations from efficiency (B). Both agree markets and prices exist (A, C). Disciplinary status (D) isn\'t the debate.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Economic Debates'
  }),
  addRating({
    id: 'hard-eng-150',
    question: 'A passage on philosophy of science: "Nancy Cartwright\'s \'dappled world\' view challenged the idea of fundamental physics providing unified laws governing everything. The laws of physics, she argued, apply only in highly controlled laboratory conditions; outside the laboratory, nature is governed by a patchwork of locally applicable regularities. Fundamental laws are not literally true descriptions of the world but are \'lies\' that work only when interfering factors are screened off. This view contrasts with physics imperialism—the assumption that physics is the fundamental science to which all others reduce." Cartwright argues that fundamental physical laws:',
    options: [
      { letter: 'A', text: 'Perfectly describe all natural phenomena' },
      { letter: 'B', text: 'Apply accurately only under idealized conditions' },
      { letter: 'C', text: 'Should be abandoned for common sense' },
      { letter: 'D', text: 'Are the foundation of all other sciences' }
    ],
    correctAnswer: 'B',
    explanation: 'Cartwright argues laws "apply only in highly controlled laboratory conditions" and are "\'lies\' that work only when interfering factors are screened off." They\'re accurate only under idealized conditions (B). She denies they perfectly describe everything (A) and challenges physics imperialism (D). She doesn\'t advocate abandoning science (C).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Philosophy of Physics'
  }),
  addRating({
    id: 'hard-eng-151',
    question: 'A passage on ethics: "The doctrine of double effect (DDE) distinguishes intending harm as a means from foreseeing harm as a side effect. A doctor may administer pain relief intending to ease suffering while foreseeing it will hasten death, but may not administer with the intention of killing. Critics question whether this distinction can bear such moral weight: if the same outcome results from the same action, does the agent\'s intention really change its moral status? Warren Quinn reformulated DDE in terms of whether harm results from agency (using someone) versus only circumstances." The distinction in DDE concerns:',
    options: [
      { letter: 'A', text: 'The outcome of the action' },
      { letter: 'B', text: 'The agent\'s intention in acting' },
      { letter: 'C', text: 'The identity of the person harmed' },
      { letter: 'D', text: 'The temporal sequence of events' }
    ],
    correctAnswer: 'B',
    explanation: 'DDE "distinguishes intending harm as a means from foreseeing harm as a side effect." The key distinction is the agent\'s intention (B)—what they aim at versus what they foresee. Critics question whether intention changes moral status when "the same outcome results from the same action" (so not about outcome A, identity C, or timing D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Moral Philosophy'
  }),
  addRating({
    id: 'hard-eng-152',
    question: 'A passage on sociology: "Erving Goffman\'s dramaturgical analysis viewed social life as theatrical performance. In \'front stage\' regions, actors present managed impressions for their audience; in \'backstage\' regions, they relax this performance. The self is not an essential identity but an ongoing accomplishment, produced through impression management. Face-to-face interaction involves mutual vulnerability: each participant\'s performance can be disrupted by the other, requiring cooperative \'face work\' to maintain the interaction order. Goffman\'s micro-sociology influenced symbolic interactionism while remaining distinctive in its focus on interaction rituals." For Goffman, the self is:',
    options: [
      { letter: 'A', text: 'A fixed essence that exists prior to social interaction' },
      { letter: 'B', text: 'Performed and accomplished through social interaction' },
      { letter: 'C', text: 'Determined entirely by social structure' },
      { letter: 'D', text: 'Irrelevant to sociological analysis' }
    ],
    correctAnswer: 'B',
    explanation: 'Goffman\'s view is that "the self is not an essential identity but an ongoing accomplishment, produced through impression management." The self is performed in interaction (B). It\'s not fixed/prior (A), not structurally determined (C—Goffman focuses on micro-interaction), and is central to his analysis (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Dramaturgical Sociology'
  }),
  addRating({
    id: 'hard-eng-153',
    question: 'A passage on philosophy of language: "Paul Grice\'s theory of conversational implicature distinguished what sentences literally say from what speakers mean by uttering them. If asked \'Is John a good philosopher?\' and you reply \'He has beautiful handwriting,\' you literally describe his penmanship but implicate that he\'s not a good philosopher. Grice proposed cooperative principles: be informative, truthful, relevant, and clear. Implicatures arise from flouting these maxims: your irrelevant response signals hidden meaning. This explained how communication conveys more than literal content." Grice\'s theory explains how:',
    options: [
      { letter: 'A', text: 'Sentences have literal meanings' },
      { letter: 'B', text: 'Speakers convey more than their words literally mean' },
      { letter: 'C', text: 'Grammar determines meaning' },
      { letter: 'D', text: 'Words refer to objects' }
    ],
    correctAnswer: 'B',
    explanation: 'Grice "distinguished what sentences literally say from what speakers mean" and explained "how communication conveys more than literal content." The theory addresses how speakers communicate beyond literal meaning (B). It assumes sentences have literal meaning (A) but explains the additional layer. It\'s not about grammar (C) or reference (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Pragmatics'
  }),
  addRating({
    id: 'hard-eng-154',
    question: 'A passage on art history: "Clement Greenberg\'s formalist criticism championed Abstract Expressionism as the culmination of modernist painting\'s self-purification. Each art should explore its medium\'s unique properties: for painting, flatness. Greenberg traced a teleological progression from Manet\'s acknowledgment of the picture plane through Cubism\'s shallow space to Pollock\'s all-over compositions. Arthur Danto countered that pop art\'s philosophical challenge—why is Warhol\'s Brillo Box art but not supermarket boxes?—ended art\'s progressive narrative. Art could now be anything; philosophy of art had replaced art history." According to Danto, pop art\'s significance was:',
    options: [
      { letter: 'A', text: 'Perfecting modernist flatness' },
      { letter: 'B', text: 'Ending art\'s progressive narrative' },
      { letter: 'C', text: 'Returning to classical representation' },
      { letter: 'D', text: 'Abandoning all artistic meaning' }
    ],
    correctAnswer: 'B',
    explanation: 'Danto argued pop art "ended art\'s progressive narrative." Warhol showed "art could now be anything; philosophy of art had replaced art history." Pop art\'s significance was ending the Greenbergian teleological story (B). It didn\'t perfect flatness (A—that was Greenberg\'s view of abstraction), return to classicism (C), or abandon meaning (D—it raised philosophical questions).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Art Theory'
  }),
  addRating({
    id: 'hard-eng-155',
    question: 'A passage on cognitive science: "The extended mind thesis, proposed by Andy Clark and David Chalmers, argues that cognitive processes can extend beyond the brain into the environment. When Otto uses a notebook to remember addresses, the notebook functions as external memory playing the same cognitive role as biological memory in normal subjects. The parity principle holds that if an external process functions equivalently to an internal process we\'d call cognitive, we should count the external process as cognitive too. Critics question whether functional equivalence suffices, or whether conscious access and biological integration matter." The extended mind thesis challenges the assumption that:',
    options: [
      { letter: 'A', text: 'Cognition involves information processing' },
      { letter: 'B', text: 'Cognition is bounded by the skull' },
      { letter: 'C', text: 'Minds can interact with environments' },
      { letter: 'D', text: 'External tools exist' }
    ],
    correctAnswer: 'B',
    explanation: 'The thesis argues "cognitive processes can extend beyond the brain into the environment"—Otto\'s notebook is part of his cognitive system. This challenges the assumption that cognition is bounded by skull/brain (B). It assumes cognition is information processing (A), that minds interact with environments (C), and that tools exist (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Extended Cognition'
  }),
  addRating({
    id: 'hard-eng-156',
    question: 'A passage on epistemology: "Reliabilism, developed by Alvin Goldman, defines knowledge as true belief produced by reliable cognitive processes—processes that tend to produce true beliefs. This contrasts with internalist theories requiring believers to have access to their justification. A chicken-sexer who accurately sorts chicks without knowing how might have reliable knowledge despite lacking articulable justification. Critics raise the generality problem: any belief-forming process can be described at multiple levels of generality, and reliability varies with description level. Which description determines whether the process is reliable?" The generality problem challenges reliabilism by asking:',
    options: [
      { letter: 'A', text: 'Whether true beliefs exist' },
      { letter: 'B', text: 'Which description of a process determines its reliability' },
      { letter: 'C', text: 'Whether chicken-sexers have knowledge' },
      { letter: 'D', text: 'Whether justification matters' }
    ],
    correctAnswer: 'B',
    explanation: 'The generality problem is that "any belief-forming process can be described at multiple levels of generality, and reliability varies with description level. Which description determines whether the process is reliable?" The challenge is about which description to use (B). It doesn\'t deny true beliefs (A), isn\'t specifically about chicken-sexers (C), or about justification\'s relevance (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Epistemological Objections'
  }),
  addRating({
    id: 'hard-eng-157',
    question: 'A passage on political theory: "Iris Marion Young distinguished distributive justice from justice as recognition. Distributive approaches (Rawls) focus on fair allocation of goods; recognition approaches address systematic patterns of cultural domination, non-recognition, and disrespect. Oppression has multiple faces: exploitation, marginalization, powerlessness, cultural imperialism, and violence. Young argued that groups—women, racial minorities, disabled people—face structural injustice not reducible to individual bad luck or unfair distribution. Justice requires not just redistribution but recognition of difference and participation in decision-making." Young argues that distributive justice is insufficient because it:',
    options: [
      { letter: 'A', text: 'Ignores material inequality' },
      { letter: 'B', text: 'Fails to address cultural domination and recognition' },
      { letter: 'C', text: 'Distributes too many goods' },
      { letter: 'D', text: 'Focuses too much on groups' }
    ],
    correctAnswer: 'B',
    explanation: 'Young "distinguished distributive justice from justice as recognition" because distributive approaches don\'t address "systematic patterns of cultural domination, non-recognition, and disrespect." Distribution alone misses recognition issues (B). She doesn\'t claim distribution ignores material goods (A) or distributes too much (C). She emphasizes group-based oppression (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Justice Theory'
  }),
  addRating({
    id: 'hard-eng-158',
    question: 'A passage on philosophy of history: "R.G. Collingwood\'s idealism held that history is the re-enactment of past thought. Historians understand historical events by thinking the thoughts of historical actors—reconstructing their reasons, intentions, and beliefs. This \'inside\' of events distinguishes history from natural science, which explains events through covering laws. Collingwood\'s approach was challenged by social historians emphasizing structures and trends beyond individual consciousness, and by postmodernists questioning whether we can ever access past meanings unmediated by our present categories." Collingwood\'s approach to history emphasizes:',
    options: [
      { letter: 'A', text: 'Discovering covering laws of historical change' },
      { letter: 'B', text: 'Reconstructing the thought behind historical actions' },
      { letter: 'C', text: 'Analyzing economic structures' },
      { letter: 'D', text: 'Applying present categories to the past' }
    ],
    correctAnswer: 'B',
    explanation: 'Collingwood held "history is the re-enactment of past thought." Historians "understand historical events by thinking the thoughts of historical actors—reconstructing their reasons, intentions, and beliefs." This is reconstructing thought (B). He contrasts history with covering-law science (A). Social historians emphasize structures (C) as a challenge. Postmodernists question present categories (D) as a critique.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Historical Method'
  }),
  addRating({
    id: 'hard-eng-159',
    question: 'A passage on philosophy of mind: "Eliminative materialism, associated with Paul and Patricia Churchland, argues that folk psychology—our everyday vocabulary of beliefs, desires, intentions—is a failed theory that will be eliminated as neuroscience advances, just as phlogiston and vital spirits were eliminated. There are no beliefs or desires in the same sense there is no phlogiston. Critics object that folk psychology\'s predictive success shows it captures something real, and that any scientific account of cognition will need to explain the phenomena folk psychology describes, even if in different terms." Eliminative materialism claims that:',
    options: [
      { letter: 'A', text: 'Folk psychology provides accurate explanations' },
      { letter: 'B', text: 'Mental terms like "belief" may not refer to anything real' },
      { letter: 'C', text: 'Neuroscience will confirm folk psychology' },
      { letter: 'D', text: 'We should not study the brain' }
    ],
    correctAnswer: 'B',
    explanation: 'Eliminativism argues folk psychology "is a failed theory that will be eliminated"—"there are no beliefs or desires in the same sense there is no phlogiston." Mental terms may not refer to real entities (B). It rejects folk psychology\'s accuracy (A), doesn\'t predict confirmation (C), and supports neuroscience (D is opposite).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Eliminativism'
  }),
  addRating({
    id: 'hard-eng-160',
    question: 'A passage on sociology of law: "Legal consciousness studies examine how ordinary people understand and use law in everyday life. Rather than seeing law as a unified system imposed from above, researchers document diverse orientations: some see law as a neutral arbiter (\'before the law\'), others as a game to be played (\'with the law\'), still others as oppressive and to be resisted (\'against the law\'). These schemas are not mutually exclusive; individuals shift between them contextually. This approach decentralizes legal expertise, showing how legal meaning is produced through practice, not just doctrine." Legal consciousness research differs from traditional legal studies in:',
    options: [
      { letter: 'A', text: 'Focusing on judicial decisions and doctrine' },
      { letter: 'B', text: 'Examining how ordinary people understand and use law' },
      { letter: 'C', text: 'Assuming law is a unified system' },
      { letter: 'D', text: 'Prioritizing legal expertise over lay understanding' }
    ],
    correctAnswer: 'B',
    explanation: 'Legal consciousness studies "examine how ordinary people understand and use law in everyday life" and "decentralizes legal expertise." This differs from traditional focus on doctrine and expertise (B). Traditional studies focus on courts (A), assume unified law (C), and privilege expertise (D)—what legal consciousness research moves away from.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Legal Consciousness'
  }),
  addRating({
    id: 'hard-eng-161',
    question: 'Which revision most effectively clarifies the relationship between the two ideas? Original: "The experiment yielded surprising results. The researchers revised their hypothesis."',
    options: [
      { letter: 'A', text: 'The experiment yielded surprising results, and the researchers revised their hypothesis.' },
      { letter: 'B', text: 'Because the experiment yielded surprising results, the researchers revised their hypothesis.' },
      { letter: 'C', text: 'The experiment yielded surprising results, but the researchers revised their hypothesis.' },
      { letter: 'D', text: 'The experiment yielded surprising results; however, the researchers revised their hypothesis.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) uses "because" to explicitly show causation: surprising results caused the revision. (A) merely adds "and," not clarifying relationship. (C) and (D) use contrastive conjunctions ("but," "however") that don\'t fit—revision following surprising results isn\'t a contrast.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Causal Clarity'
  }),
  addRating({
    id: 'hard-eng-162',
    question: 'A student writes: "The study investigated whether socioeconomic factors effected student performance." Which word should be changed to correct the sentence?',
    options: [
      { letter: 'A', text: 'Change "investigated" to "researched"' },
      { letter: 'B', text: 'Change "whether" to "if"' },
      { letter: 'C', text: 'Change "effected" to "affected"' },
      { letter: 'D', text: 'Change "performance" to "performing"' }
    ],
    correctAnswer: 'C',
    explanation: '"Effect" as a verb means to bring about/cause; "affect" means to influence. The sentence needs "affected" (influenced) not "effected" (caused to exist). "Socioeconomic factors affected (influenced) student performance" is correct. The other options don\'t address errors.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Effect vs. Affect'
  }),
  addRating({
    id: 'hard-eng-163',
    question: 'Which sentence correctly uses "comprise"?',
    options: [
      { letter: 'A', text: 'The committee is comprised of seven members.' },
      { letter: 'B', text: 'Seven members comprise the committee.' },
      { letter: 'C', text: 'The committee is comprised from seven members.' },
      { letter: 'D', text: 'Seven members are comprised in the committee.' }
    ],
    correctAnswer: 'B',
    explanation: '"Comprise" means "to contain/include." The whole comprises the parts, not vice versa. (B) correctly uses "Seven members comprise (make up) the committee." "Is comprised of" (A) is considered incorrect by strict usage guides—use "comprises" or "is composed of." (C) and (D) are grammatically wrong.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Precise Vocabulary'
  }),
  addRating({
    id: 'hard-eng-164',
    question: 'A researcher writes: "The data supports the hypothesis that environmental factors, not genetic ones, are primary." How should this sentence be revised for formal academic writing?',
    options: [
      { letter: 'A', text: 'The data support the hypothesis that environmental factors, not genetic ones, are primary.' },
      { letter: 'B', text: 'The data supports the hypotheses that environmental factors, not genetic ones, is primary.' },
      { letter: 'C', text: 'The datum supports the hypothesis that environmental factors, not genetic ones, are primary.' },
      { letter: 'D', text: 'No revision is needed.' }
    ],
    correctAnswer: 'A',
    explanation: 'In formal academic writing, "data" is traditionally treated as plural (Latin plural of "datum"), taking "support" not "supports." (A) correctly uses "data support." (B) creates subject-verb disagreement. (C) uses "datum" (singular) inappropriately when discussing multiple data points. "Data supports" is increasingly accepted in casual use but (A) is preferred in formal contexts.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Formal Usage'
  }),
  addRating({
    id: 'hard-eng-165',
    question: 'Which sentence demonstrates correct parallel structure?',
    options: [
      { letter: 'A', text: 'The study aims to identify causes, to measure effects, and documenting outcomes.' },
      { letter: 'B', text: 'The study aims to identify causes, measure effects, and document outcomes.' },
      { letter: 'C', text: 'The study aims to identify causes, measuring effects, and to document outcomes.' },
      { letter: 'D', text: 'The study aims at identifying causes, to measure effects, and documenting outcomes.' }
    ],
    correctAnswer: 'B',
    explanation: 'Parallel structure requires consistent grammatical forms in a series. (B) uses three bare infinitives after "to": "identify," "measure," "document." (A), (C), and (D) mix infinitives with gerunds or inconsistently use "to," breaking parallelism.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Parallel Structure'
  }),
  addRating({
    id: 'hard-eng-166',
    question: 'A writer wants to add emphasis to the final element of this sentence: "The policy affected housing, employment, and education." Which revision most effectively adds this emphasis?',
    options: [
      { letter: 'A', text: 'The policy affected housing, employment, and, most significantly, education.' },
      { letter: 'B', text: 'The policy affected housing, employment, and education also.' },
      { letter: 'C', text: 'The policy affected housing, employment, and education too.' },
      { letter: 'D', text: 'The policy affected housing, employment, education.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) adds explicit emphasis with "most significantly" set off by commas, highlighting education as the key item. (B) and (C) add weak, ambiguous modifiers. (D) removes the conjunction without adding emphasis. The parenthetical "most significantly" effectively draws attention to the final item.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Adding Emphasis'
  }),
  addRating({
    id: 'hard-eng-167',
    question: 'Which sentence correctly uses "whom"?',
    options: [
      { letter: 'A', text: 'The researcher whom conducted the study presented the findings.' },
      { letter: 'B', text: 'The researcher whom the committee selected presented the findings.' },
      { letter: 'C', text: 'The committee selected the researcher whom was most qualified.' },
      { letter: 'D', text: 'Whom do you think conducted the study?' }
    ],
    correctAnswer: 'B',
    explanation: '"Whom" is objective case (object of verb or preposition). (B) is correct: "whom the committee selected"—whom is object of "selected." (A) needs "who" as subject of "conducted." (C) needs "who" as subject of "was." (D) needs "who" as subject of "conducted" ("you think" is parenthetical).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Who vs. Whom'
  }),
  addRating({
    id: 'hard-eng-168',
    question: 'A scholar writes: "The author\'s argument, while compelling in its logic, nevertheless fails to adequately account for the historical evidence, which, as numerous scholars have noted, contradicts several of the central claims." How might this sentence be revised for clarity and concision?',
    options: [
      { letter: 'A', text: 'While logically compelling, the author\'s argument fails to account for historical evidence contradicting several central claims.' },
      { letter: 'B', text: 'The author\'s argument fails, which numerous scholars have noted about the historical evidence.' },
      { letter: 'C', text: 'The argument is compelling but nevertheless fails.' },
      { letter: 'D', text: 'Scholars have noted that the author\'s argument is compelling in logic.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) reduces wordiness while preserving meaning: removes redundant "nevertheless" (the concessive is clear from "while"), streamlines "as numerous scholars have noted," and tightens phrasing. (B) is unclear. (C) loses specific content. (D) misses the critique entirely.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concision and Clarity'
  }),
  addRating({
    id: 'hard-eng-169',
    question: 'Which sentence correctly punctuates the introductory element?',
    options: [
      { letter: 'A', text: 'After analyzing the data the researchers published their findings.' },
      { letter: 'B', text: 'After analyzing the data, the researchers published their findings.' },
      { letter: 'C', text: 'After, analyzing the data the researchers published their findings.' },
      { letter: 'D', text: 'After analyzing, the data the researchers published their findings.' }
    ],
    correctAnswer: 'B',
    explanation: 'Introductory phrases should be followed by a comma. (B) correctly places the comma after the introductory phrase "After analyzing the data." (A) lacks the comma. (C) and (D) place commas incorrectly within the introductory phrase.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Introductory Phrase Punctuation'
  }),
  addRating({
    id: 'hard-eng-170',
    question: 'A student writes: "The reason for the failure is because the system was overloaded." How should this sentence be revised?',
    options: [
      { letter: 'A', text: 'The reason for the failure is that the system was overloaded.' },
      { letter: 'B', text: 'The reason for the failure is because of the system being overloaded.' },
      { letter: 'C', text: 'The reason for why the failure happened is because the system was overloaded.' },
      { letter: 'D', text: 'No revision is needed.' }
    ],
    correctAnswer: 'A',
    explanation: '"The reason is because" is redundant—"because" means "for the reason that." Use "The reason is that" or simply "because." (A) correctly uses "is that." (B) adds wordiness. (C) adds more redundancy with "reason for why."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Redundancy'
  }),
  addRating({
    id: 'hard-eng-171',
    question: 'Which revision most effectively creates a transition between these paragraphs? Paragraph 1 ends: "...the policy achieved its stated objectives." Paragraph 2 begins: "Critics have raised concerns about unintended consequences."',
    options: [
      { letter: 'A', text: 'Begin Paragraph 2: "And critics have raised concerns about unintended consequences."' },
      { letter: 'B', text: 'Begin Paragraph 2: "Despite these achievements, critics have raised concerns about unintended consequences."' },
      { letter: 'C', text: 'Begin Paragraph 2: "Similarly, critics have raised concerns about unintended consequences."' },
      { letter: 'D', text: 'Begin Paragraph 2: "Therefore, critics have raised concerns about unintended consequences."' }
    ],
    correctAnswer: 'B',
    explanation: 'The transition moves from success to criticism—a concessive relationship. (B) "Despite these achievements" acknowledges the previous point while signaling the shift to criticism. (A) uses weak "and." (C) "Similarly" wrongly suggests parallel ideas. (D) "Therefore" wrongly suggests causation.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Paragraph Transitions'
  }),
  addRating({
    id: 'hard-eng-172',
    question: 'Which sentence uses the subjunctive mood correctly?',
    options: [
      { letter: 'A', text: 'If I was the researcher, I would approach the problem differently.' },
      { letter: 'B', text: 'If I were the researcher, I would approach the problem differently.' },
      { letter: 'C', text: 'If I would be the researcher, I would approach the problem differently.' },
      { letter: 'D', text: 'If I am the researcher, I would approach the problem differently.' }
    ],
    correctAnswer: 'B',
    explanation: 'The subjunctive "were" is used for contrary-to-fact conditions (the speaker is not the researcher). (B) correctly uses "If I were." (A) uses indicative "was" incorrectly for hypothetical. (C) uses "would be" in the if-clause incorrectly. (D) mixes indicative "am" with conditional "would."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Subjunctive Mood'
  }),
  addRating({
    id: 'hard-eng-173',
    question: 'A researcher needs to cite multiple authors. Which sentence correctly handles the citation according to standard academic practice?',
    options: [
      { letter: 'A', text: 'Several scholars (Smith, 2020, Jones, 2021, Brown, 2022) have addressed this issue.' },
      { letter: 'B', text: 'Several scholars (Smith, 2020; Jones, 2021; Brown, 2022) have addressed this issue.' },
      { letter: 'C', text: 'Several scholars, Smith, 2020, Jones, 2021, Brown, 2022, have addressed this issue.' },
      { letter: 'D', text: 'Several scholars Smith (2020) Jones (2021) Brown (2022) have addressed this issue.' }
    ],
    correctAnswer: 'B',
    explanation: 'Multiple citations within parentheses should be separated by semicolons (B). Commas (A) create ambiguity since they also separate author from year. (C) and (D) don\'t use proper parenthetical citation format.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Academic Citation'
  }),
  addRating({
    id: 'hard-eng-174',
    question: 'Which sentence demonstrates correct use of "less" versus "fewer"?',
    options: [
      { letter: 'A', text: 'The treatment group showed less symptoms than the control group.' },
      { letter: 'B', text: 'The treatment group showed fewer symptoms than the control group.' },
      { letter: 'C', text: 'The experiment required less participants than expected.' },
      { letter: 'D', text: 'The study found less correlations than predicted.' }
    ],
    correctAnswer: 'B',
    explanation: '"Fewer" is used with countable nouns (symptoms, participants, correlations); "less" is used with uncountable nouns (time, money, water). (B) correctly uses "fewer symptoms" (countable). (A), (C), and (D) incorrectly use "less" with countable nouns.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Less vs. Fewer'
  }),
  addRating({
    id: 'hard-eng-175',
    question: 'A writer wants to qualify a strong claim. Original: "The study proves that social media causes depression in teenagers." Which revision appropriately qualifies the claim for academic writing?',
    options: [
      { letter: 'A', text: 'The study sort of proves that social media causes depression in teenagers.' },
      { letter: 'B', text: 'The study suggests a correlation between social media use and depression symptoms in adolescent populations.' },
      { letter: 'C', text: 'The study definitely proves that social media causes depression in teenagers.' },
      { letter: 'D', text: 'The study proves maybe that social media causes depression in teenagers.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) appropriately qualifies by: using "suggests" instead of "proves," noting "correlation" instead of causation, specifying "symptoms" instead of diagnosing, and using precise term "adolescent populations." (A) and (D) use informal qualifiers. (C) strengthens rather than qualifies.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Academic Hedging'
  }),
  addRating({
    id: 'hard-eng-176',
    question: 'Which sentence correctly handles the possessive of a plural noun?',
    options: [
      { letter: 'A', text: 'The participant\'s responses were collected after each trial.' },
      { letter: 'B', text: 'The participants\' responses were collected after each trial.' },
      { letter: 'C', text: 'The participants responses were collected after each trial.' },
      { letter: 'D', text: 'The participants\'s responses were collected after each trial.' }
    ],
    correctAnswer: 'B',
    explanation: 'For plural nouns ending in -s, the possessive adds an apostrophe after the s: "participants\'." (B) is correct. (A) uses singular possessive when context suggests multiple participants. (C) omits the apostrophe entirely. (D) incorrectly adds \'s after the plural s.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Plural Possessives'
  }),
  addRating({
    id: 'hard-eng-177',
    question: 'A researcher writes: "Due to the fact that funding was limited, the study was terminated early." How can this sentence be revised for concision?',
    options: [
      { letter: 'A', text: 'Due to funding being limited, the study was terminated early.' },
      { letter: 'B', text: 'Because funding was limited, the study was terminated early.' },
      { letter: 'C', text: 'Owing to the fact that funding was limited, the study was terminated early.' },
      { letter: 'D', text: 'In light of the fact that funding was limited, the study was terminated early.' }
    ],
    correctAnswer: 'B',
    explanation: '"Due to the fact that" is a wordy way of saying "because." (B) uses the concise "because." (A) is slightly better but still wordy. (C) and (D) substitute equally or more wordy phrases.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Wordiness'
  }),
  addRating({
    id: 'hard-eng-178',
    question: 'Which sentence correctly handles the comparative form?',
    options: [
      { letter: 'A', text: 'This methodology is more simpler than traditional approaches.' },
      { letter: 'B', text: 'This methodology is more simple than traditional approaches.' },
      { letter: 'C', text: 'This methodology is simpler than traditional approaches.' },
      { letter: 'D', text: 'This methodology is most simpler than traditional approaches.' }
    ],
    correctAnswer: 'C',
    explanation: 'Short adjectives (like "simple") form comparatives by adding -er, not using "more." (C) correctly uses "simpler." (A) double-marks the comparative. (B) uses "more" unnecessarily with a short adjective. (D) incorrectly combines superlative "most" with comparative "-er."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Comparative Forms'
  }),
  addRating({
    id: 'hard-eng-179',
    question: 'A writer wants to introduce a contrasting point. Which transitional phrase is most appropriate? "The initial results supported the hypothesis. ________, subsequent trials revealed significant anomalies."',
    options: [
      { letter: 'A', text: 'Moreover' },
      { letter: 'B', text: 'Similarly' },
      { letter: 'C', text: 'However' },
      { letter: 'D', text: 'Therefore' }
    ],
    correctAnswer: 'C',
    explanation: 'The sentence moves from support to anomalies—a contrast. (C) "However" signals this contrast. (A) "Moreover" adds supporting information. (B) "Similarly" indicates parallel ideas. (D) "Therefore" indicates consequence.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Contrastive Transitions'
  }),
  addRating({
    id: 'hard-eng-180',
    question: 'Which sentence correctly uses "among" versus "between"?',
    options: [
      { letter: 'A', text: 'The researchers found no significant differences between the three groups.' },
      { letter: 'B', text: 'The researchers found no significant differences among the three groups.' },
      { letter: 'C', text: 'The treaty was signed between the five nations.' },
      { letter: 'D', text: 'The choice was among the two options.' }
    ],
    correctAnswer: 'B',
    explanation: 'Traditional rule: "between" for two items, "among" for three or more. (B) correctly uses "among the three groups." (A) uses "between" with three groups. (C) uses "between" with five nations. (D) uses "among" with only two options. However, modern usage allows "between" for distinct items even if more than two.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Among vs. Between'
  }),
  addRating({
    id: 'hard-eng-181',
    question: 'A passage on philosophy of action: "Donald Davidson\'s causalism held that reasons are causes of actions—my desire for water and belief that this glass contains water cause my reaching for it. This view faced the problem of deviant causal chains: one might desire to startle someone and believe that firing a gun would do so, yet be so nervous that one fires accidentally, achieving the aim without acting intentionally. The belief-desire pair caused the action, but through a deviant route. Responses include adding conditions about the manner of causation or shifting to agent causation." The deviant causal chain problem shows that:',
    options: [
      { letter: 'A', text: 'Reasons cannot be causes of actions' },
      { letter: 'B', text: 'Right causation by reasons is insufficient for intentional action' },
      { letter: 'C', text: 'All actions are unintentional' },
      { letter: 'D', text: 'Beliefs and desires never cause actions' }
    ],
    correctAnswer: 'B',
    explanation: 'The deviant chain shows that even when "belief-desire pair caused the action," it happened "through a deviant route" and wasn\'t intentional. Having the right causes isn\'t sufficient—the manner of causation matters (B). The problem refines causalism, not refutes it entirely (A, D). Some actions are clearly intentional (C).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Action Theory'
  }),
  addRating({
    id: 'hard-eng-182',
    question: 'A passage on philosophy of personal identity: "Derek Parfit\'s thought experiments on teleportation and brain fission challenged the assumption that personal identity matters. If you are teleported by having your body scanned, destroyed, and recreated from new matter, is the person who appears you? What if the original isn\'t destroyed—do two yous exist? Parfit concluded that identity is not what matters for survival; what matters is psychological continuity and connectedness, which can branch or gradually fade. The self that fears death is largely an illusion we cling to unnecessarily." Parfit\'s view implies that:',
    options: [
      { letter: 'A', text: 'Personal identity is perfectly determinate' },
      { letter: 'B', text: 'Psychological continuity matters more than strict identity' },
      { letter: 'C', text: 'The original person survives teleportation in all cases' },
      { letter: 'D', text: 'Death should be feared more than typically thought' }
    ],
    correctAnswer: 'B',
    explanation: 'Parfit concluded that "identity is not what matters for survival; what matters is psychological continuity and connectedness." This prioritizes psychological continuity over strict identity (B). Identity can be indeterminate ("branch or gradually fade"), contradicting (A). Teleportation cases are puzzling, not resolved (C). He suggests fearing death is "largely an illusion" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Personal Identity'
  }),
  addRating({
    id: 'hard-eng-183',
    question: 'A passage on critical theory: "Jürgen Habermas distinguished \'system\' from \'lifeworld.\' The lifeworld comprises shared cultural understandings, norms, and communicative practices that coordinate action through mutual understanding. Systems—economy and state—coordinate action through money and power, requiring no shared understanding. Modernity\'s pathology is the \'colonization of the lifeworld\'—when systemic imperatives (profit, bureaucratic control) invade domains like education, family, and public discourse that should operate through communication and understanding." The "colonization of the lifeworld" occurs when:',
    options: [
      { letter: 'A', text: 'Cultural traditions influence economic behavior' },
      { letter: 'B', text: 'Money and power invade communicative domains' },
      { letter: 'C', text: 'Democratic deliberation guides state policy' },
      { letter: 'D', text: 'Mutual understanding coordinates market transactions' }
    ],
    correctAnswer: 'B',
    explanation: 'Colonization is when "systemic imperatives (profit, bureaucratic control) invade domains like education, family, and public discourse that should operate through communication." This is money and power invading communicative domains (B). Culture influencing economy (A) would be the reverse. Democratic deliberation (C) and understanding in markets (D) would be lifeworld influencing system, not colonization.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Habermasian Theory'
  }),
  addRating({
    id: 'hard-eng-184',
    question: 'A passage on phenomenology: "Edmund Husserl\'s phenomenological method sought to describe experience as it appears, bracketing questions of external existence (\'epoché\'). Intentionality was central: consciousness is always consciousness of something—perceiving, imagining, remembering are all directed toward objects. But these objects are not things-in-themselves; they are constituted by consciousness through temporal synthesis and meaning-giving acts. Transcendental subjectivity is not the empirical ego but the condition of possibility for any experience of objects at all." Husserl\'s "bracketing" or epoché involves:',
    options: [
      { letter: 'A', text: 'Denying that external objects exist' },
      { letter: 'B', text: 'Suspending judgment about existence to focus on appearance' },
      { letter: 'C', text: 'Accepting naive realism about perception' },
      { letter: 'D', text: 'Eliminating all subjective experience' }
    ],
    correctAnswer: 'B',
    explanation: 'The epoché means "bracketing questions of external existence" to "describe experience as it appears." This suspends judgment without denying existence (B). It doesn\'t deny existence (A), doesn\'t accept naive realism (C—objects are "constituted by consciousness"), and focuses on experience rather than eliminating it (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Phenomenology'
  }),
  addRating({
    id: 'hard-eng-185',
    question: 'A passage on political philosophy: "John Rawls\'s \'veil of ignorance\' asks us to choose principles of justice without knowing our place in society—our talents, wealth, race, gender, or conception of the good. From this \'original position,\' Rawls argued, rational choosers would select two principles: equal basic liberties for all, and the \'difference principle\'—social and economic inequalities are permissible only if they benefit the least advantaged members. This constructs justice as fairness while avoiding the utilitarian sacrifice of minorities for aggregate welfare." Rawls\'s veil of ignorance is designed to:',
    options: [
      { letter: 'A', text: 'Maximize total social utility' },
      { letter: 'B', text: 'Ensure impartiality in choosing justice principles' },
      { letter: 'C', text: 'Preserve existing social hierarchies' },
      { letter: 'D', text: 'Determine individuals\' actual social positions' }
    ],
    correctAnswer: 'B',
    explanation: 'The veil removes knowledge of "our place in society" to enable impartial choice of principles. Not knowing your position forces you to consider everyone fairly (B). Rawls explicitly opposes utilitarianism\'s aggregate focus (A). The difference principle challenges hierarchy (C). The veil hides, doesn\'t determine, position (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Rawlsian Justice'
  }),
  addRating({
    id: 'hard-eng-186',
    question: 'A passage on philosophy of language: "Gottlob Frege distinguished sense (Sinn) from reference (Bedeutung). \'The morning star\' and \'the evening star\' have the same reference (Venus) but different senses—different modes of presentation or cognitive significance. This explains why \'the morning star is the evening star\' is informative, not trivially true like \'the morning star is the morning star.\' Sense determines reference but not vice versa; understanding a term requires grasping its sense, not just knowing its reference." Frege\'s distinction explains how:',
    options: [
      { letter: 'A', text: 'All identity statements are uninformative' },
      { letter: 'B', text: 'Co-referential terms can differ in cognitive value' },
      { letter: 'C', text: 'Reference is independent of sense' },
      { letter: 'D', text: 'Words have no meaning beyond reference' }
    ],
    correctAnswer: 'B',
    explanation: 'The example shows terms with same reference but different cognitive significance: "\'the morning star is the evening star\' is informative." Different senses = different cognitive value despite same reference (B). Some identity statements are informative (contradicting A). "Sense determines reference" (contradicting C). Sense is meaning beyond reference (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Sense and Reference'
  }),
  addRating({
    id: 'hard-eng-187',
    question: 'A passage on environmental ethics: "The land ethic, articulated by Aldo Leopold, extends moral consideration beyond individuals to ecological communities: \'A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community. It is wrong when it tends otherwise.\' This holism has been criticized for potentially sacrificing individual welfare—even human welfare—for ecosystem health. Defenders distinguish weak holism (ecosystems matter alongside individuals) from strong holism (ecosystems trump individuals), and note that sustainable ecosystems typically benefit their members." Leopold\'s land ethic is criticized for:',
    options: [
      { letter: 'A', text: 'Focusing too much on individual welfare' },
      { letter: 'B', text: 'Potentially subordinating individuals to ecosystem health' },
      { letter: 'C', text: 'Ignoring the beauty of nature' },
      { letter: 'D', text: 'Being too anthropocentric' }
    ],
    correctAnswer: 'B',
    explanation: 'The criticism is that holism can "potentially sacrific[e] individual welfare—even human welfare—for ecosystem health." This subordinates individuals to the whole (B). Leopold\'s ethic is holistic, not individualistic (contradicting A). It values beauty (C). It extends beyond humans, so isn\'t anthropocentric (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Environmental Ethics'
  }),
  addRating({
    id: 'hard-eng-188',
    question: 'A passage on sociology of knowledge: "Thomas Kuhn\'s Structure of Scientific Revolutions argued that science proceeds not by cumulative progress but through paradigm shifts. Normal science operates within a paradigm—shared exemplars, methods, and standards—solving puzzles the paradigm defines. Anomalies accumulate until crisis triggers revolution: a new paradigm emerges, incommensurable with the old (lacking common measure for comparison). Paradigm choice involves \'conversion\' as much as argument, since standards themselves change. Critics charged this made science irrational, though Kuhn resisted such relativism." Kuhn\'s "incommensurability" means:',
    options: [
      { letter: 'A', text: 'Paradigms share the same standards for comparison' },
      { letter: 'B', text: 'Different paradigms lack a common measure for evaluation' },
      { letter: 'C', text: 'Scientific progress is cumulative across paradigms' },
      { letter: 'D', text: 'All paradigms are equally true' }
    ],
    correctAnswer: 'B',
    explanation: 'Incommensurability means paradigms are "lacking common measure for comparison" because "standards themselves change" between paradigms (B). They don\'t share standards (contradicting A). Progress isn\'t cumulative across paradigms (C). Kuhn "resisted relativism" that would make all equally true (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Kuhnian Philosophy'
  }),
  addRating({
    id: 'hard-eng-189',
    question: 'A passage on bioethics: "The non-identity problem poses a challenge for future-oriented ethics. If we deplete resources or pollute the environment, future people may be worse off. But those particular people wouldn\'t exist if we had acted differently—different policies would lead to different conceptions, hence different individuals. The future people can\'t claim they were harmed by our choices, since the alternative wasn\'t a better life for them but non-existence. Yet intuitively, we do wrong by knowingly creating worse conditions for whoever will exist." The non-identity problem challenges our intuition that:',
    options: [
      { letter: 'A', text: 'Future people will exist' },
      { letter: 'B', text: 'We can harm future people by current decisions' },
      { letter: 'C', text: 'The environment affects human welfare' },
      { letter: 'D', text: 'Present people matter morally' }
    ],
    correctAnswer: 'B',
    explanation: 'The problem is that future people "can\'t claim they were harmed" because they wouldn\'t exist otherwise, yet we intuitively think we do wrong by creating worse conditions. This challenges our intuition about harming future people (B). Future people\'s existence isn\'t questioned (A). Environment clearly affects welfare (C). Present people aren\'t the focus (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Non-Identity Problem'
  }),
  addRating({
    id: 'hard-eng-190',
    question: 'A passage on philosophy of religion: "Alvin Plantinga\'s Reformed epistemology challenged evidentialism—the view that religious belief requires evidence to be rational. Plantinga argued that belief in God can be \'properly basic\'—rational without being based on argument, just as our beliefs in other minds, the external world, or the reliability of memory are basic. Sensus divinitatis, an innate disposition to believe in God in certain circumstances, can ground rational belief. Critics object that this permits any belief to claim basic status; Plantinga responds with criteria distinguishing warranted from unwarranted basic beliefs." Plantinga argues that belief in God:',
    options: [
      { letter: 'A', text: 'Requires philosophical arguments to be rational' },
      { letter: 'B', text: 'Can be rational without evidential support' },
      { letter: 'C', text: 'Is irrational in all circumstances' },
      { letter: 'D', text: 'Must be based on other beliefs' }
    ],
    correctAnswer: 'B',
    explanation: 'Plantinga\'s "Reformed epistemology challenged evidentialism" and argued belief in God can be "properly basic—rational without being based on argument." This means rational without evidential support (B). He opposes requiring arguments (A). He defends rationality of belief (contradicting C). Basic beliefs are precisely not based on other beliefs (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Reformed Epistemology'
  }),
  addRating({
    id: 'hard-eng-191',
    question: 'A passage on philosophy of mathematics: "Mathematical fictionalism holds that mathematical statements, strictly speaking, are false—there are no numbers, sets, or abstract objects for mathematical claims to be about. Yet mathematics is useful because it lets us express nominalistic truths (truths not involving abstract objects) more efficiently. \'The number of planets is 8\' expresses something about concrete planets without requiring numbers to exist. Fictionalism faces the applicability problem: if mathematical objects don\'t exist, why does mathematics apply so successfully to physics?" Fictionalism claims that mathematical statements are:',
    options: [
      { letter: 'A', text: 'True descriptions of abstract objects' },
      { letter: 'B', text: 'Literally false but practically useful' },
      { letter: 'C', text: 'Meaningless and useless' },
      { letter: 'D', text: 'Empirical claims about physical reality' }
    ],
    correctAnswer: 'B',
    explanation: 'Fictionalism holds statements are "strictly speaking, false—there are no numbers" yet "mathematics is useful because it lets us express nominalistic truths more efficiently." False but useful (B). It denies they describe abstract objects (contradicting A). They\'re meaningful and useful (not C). They\'re not directly about physical reality (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Mathematical Fictionalism'
  }),
  addRating({
    id: 'hard-eng-192',
    question: 'A passage on social theory: "Michel Foucault\'s analysis of power rejected the \'juridical\' model focusing on law, sovereignty, and repression. Power is not merely negative (prohibiting, censoring) but productive—producing subjects, knowledge, and \'regimes of truth.\' Disciplinary power operates through surveillance, normalization, and examination, creating \'docile bodies\' in schools, prisons, and factories. Power and knowledge are intertwined (\'power/knowledge\'): what counts as knowledge is shaped by power relations, and knowledge enables new forms of power." Foucault\'s view of power emphasizes that power:',
    options: [
      { letter: 'A', text: 'Operates only through law and repression' },
      { letter: 'B', text: 'Produces subjects and knowledge, not just prohibits' },
      { letter: 'C', text: 'Is entirely separate from knowledge' },
      { letter: 'D', text: 'Resides only in sovereign authority' }
    ],
    correctAnswer: 'B',
    explanation: 'Foucault rejected the "juridical model" of mere repression; power is "not merely negative...but productive—producing subjects, knowledge." It produces, not just prohibits (B). He rejects law-only model (A). Power and knowledge are "intertwined" (not separate, C). Power isn\'t only sovereign (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Foucauldian Power'
  }),
  addRating({
    id: 'hard-eng-193',
    question: 'A passage on ethics: "Virtue ethics, unlike deontology or consequentialism, focuses on character rather than individual actions. The central question is not \'what should I do?\' but \'what kind of person should I be?\' Virtues are stable character traits—courage, honesty, compassion—that enable human flourishing (eudaimonia). Aristotle held that virtue is a mean between extremes: courage lies between cowardice and recklessness. Practical wisdom (phronesis) helps discern the appropriate response in particular situations, as no rule can specify correct action for every context." Virtue ethics differs from rule-based ethics in emphasizing:',
    options: [
      { letter: 'A', text: 'Following universal moral rules' },
      { letter: 'B', text: 'Character and context-sensitive judgment' },
      { letter: 'C', text: 'Maximizing overall utility' },
      { letter: 'D', text: 'Calculating consequences of each action' }
    ],
    correctAnswer: 'B',
    explanation: 'Virtue ethics focuses on "character rather than individual actions" and emphasizes phronesis that "helps discern the appropriate response in particular situations, as no rule can specify correct action for every context." Character plus context-sensitivity (B). It\'s not rule-based (A). Utility maximization (C) and consequence calculation (D) are consequentialism.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Virtue Ethics'
  }),
  addRating({
    id: 'hard-eng-194',
    question: 'A passage on cognitive science: "Dual-process theories distinguish System 1 (fast, automatic, intuitive) from System 2 (slow, effortful, deliberative). System 1 operates constantly, producing impressions and feelings that become beliefs and choices when endorsed by System 2. Many cognitive biases arise from System 1\'s reliance on heuristics—useful shortcuts that sometimes mislead. The availability heuristic judges frequency by ease of recall; the representativeness heuristic judges category membership by similarity to stereotypes. System 2 can correct these biases but requires motivation and cognitive resources that are often lacking." According to dual-process theory, cognitive biases typically arise from:',
    options: [
      { letter: 'A', text: 'Excessive deliberation and analysis' },
      { letter: 'B', text: 'System 1\'s quick heuristic shortcuts' },
      { letter: 'C', text: 'Careful activation of System 2' },
      { letter: 'D', text: 'Avoiding all intuitive responses' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage states "many cognitive biases arise from System 1\'s reliance on heuristics—useful shortcuts that sometimes mislead." This is System 1\'s quick heuristics (B). Biases come from too little deliberation, not too much (A). System 2 corrects biases (C). Avoiding intuition would reduce bias, not cause it (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Dual-Process Theory'
  }),
  addRating({
    id: 'hard-eng-195',
    question: 'A passage on political economy: "The varieties of capitalism literature distinguishes liberal market economies (LMEs) like the US and UK from coordinated market economies (CMEs) like Germany and Japan. LMEs rely on market mechanisms, short-term financing, and flexible labor markets. CMEs feature coordinated wage bargaining, long-term bank financing, and vocational training systems producing specific skills. Each has comparative advantages: LMEs in radical innovation and service sectors; CMEs in incremental innovation and quality manufacturing. Globalization was expected to force convergence toward the LME model, but institutional complementarities have sustained divergence." The passage suggests that globalization has:',
    options: [
      { letter: 'A', text: 'Forced all economies toward the LME model' },
      { letter: 'B', text: 'Not eliminated institutional differences between LMEs and CMEs' },
      { letter: 'C', text: 'Made coordinated economies completely disappear' },
      { letter: 'D', text: 'Proven that CMEs are superior' }
    ],
    correctAnswer: 'B',
    explanation: '"Globalization was expected to force convergence toward the LME model, but institutional complementarities have sustained divergence." Convergence hasn\'t happened—differences persist (B). Economies haven\'t all become LMEs (contradicting A). CMEs haven\'t disappeared (C). The passage doesn\'t claim CME superiority—each has "comparative advantages" (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Comparative Capitalism'
  }),
  addRating({
    id: 'hard-eng-196',
    question: 'Which sentence uses "literally" correctly?',
    options: [
      { letter: 'A', text: 'I was literally dying of embarrassment when she mentioned my mistake.' },
      { letter: 'B', text: 'The heat was so intense that the asphalt literally melted, leaving visible deformations in the road.' },
      { letter: 'C', text: 'He literally exploded when he heard the news.' },
      { letter: 'D', text: 'I could literally eat a horse right now.' }
    ],
    correctAnswer: 'B',
    explanation: '"Literally" means in actual fact, without exaggeration. (B) describes something that actually, physically happened—asphalt melting. (A), (C), and (D) use "literally" as an intensifier for figurative expressions: you didn\'t actually die, explode, or intend to eat a horse. Only (B) describes literal truth.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Literal vs. Figurative Usage'
  }),
  addRating({
    id: 'hard-eng-197',
    question: 'A researcher writes: "The findings suggest that, ________ previous studies reported no significant correlation, methodological improvements in data collection have revealed a modest but consistent relationship between the variables." Which choice best completes the sentence?',
    options: [
      { letter: 'A', text: 'because' },
      { letter: 'B', text: 'although' },
      { letter: 'C', text: 'therefore' },
      { letter: 'D', text: 'similarly' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence contrasts previous findings (no correlation) with current findings (modest relationship). "Although" (B) signals this concessive contrast: despite what previous studies found, improvements now show a relationship. "Because" (A) would indicate causation. "Therefore" (C) indicates consequence. "Similarly" (D) indicates agreement, not contrast.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concessive Transitions in Academic Writing'
  }),
  addRating({
    id: 'hard-eng-198',
    question: 'Which revision most effectively combines these sentences? Original: "The excavation revealed artifacts from multiple historical periods. These periods included the Bronze Age, Iron Age, and Roman occupation."',
    options: [
      { letter: 'A', text: 'The excavation revealed artifacts from multiple historical periods including the Bronze Age, Iron Age, and Roman occupation.' },
      { letter: 'B', text: 'The excavation revealed artifacts from multiple historical periods, and these periods included the Bronze Age, Iron Age, and Roman occupation.' },
      { letter: 'C', text: 'The excavation revealed artifacts from the Bronze Age, Iron Age, and Roman occupation, which were multiple historical periods.' },
      { letter: 'D', text: 'Multiple historical periods\' artifacts were revealed by the excavation: the Bronze Age, Iron Age, and Roman occupation.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) efficiently integrates the second sentence\'s content into the first using a participial phrase "including..." This eliminates redundancy while preserving meaning. (B) merely adds a conjunction without true combination. (C) creates an awkward and redundant relative clause. (D) has awkward passive voice and possessive construction.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Combining Sentences Efficiently'
  }),
  addRating({
    id: 'hard-eng-199',
    question: 'Identify the sentence with correct parallel structure:',
    options: [
      { letter: 'A', text: 'The study aims to identify risk factors, assessing intervention effectiveness, and improving patient outcomes.' },
      { letter: 'B', text: 'The study aims to identify risk factors, to assess intervention effectiveness, and to improve patient outcomes.' },
      { letter: 'C', text: 'The study aims to identify risk factors, assess intervention effectiveness, and improving patient outcomes.' },
      { letter: 'D', text: 'The study aims identifying risk factors, assessing intervention effectiveness, and to improve patient outcomes.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) maintains parallel structure with three infinitive phrases: "to identify," "to assess," "to improve." (A) mixes infinitive with gerunds. (C) mixes base form with gerund. (D) mixes gerunds with infinitive. Parallel structure requires consistent grammatical forms for items in a series.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Parallel Structure in Lists'
  }),
  addRating({
    id: 'hard-eng-200',
    question: 'Which sentence correctly punctuates a complex series?',
    options: [
      { letter: 'A', text: 'The conference featured keynotes by Dr. Smith, Harvard; Dr. Jones, Stanford; and Dr. Lee, MIT.' },
      { letter: 'B', text: 'The conference featured keynotes by Dr. Smith, Harvard, Dr. Jones, Stanford, and Dr. Lee, MIT.' },
      { letter: 'C', text: 'The conference featured keynotes by: Dr. Smith, Harvard; Dr. Jones, Stanford; and Dr. Lee, MIT.' },
      { letter: 'D', text: 'The conference featured keynotes by Dr. Smith Harvard; Dr. Jones Stanford; and Dr. Lee MIT.' }
    ],
    correctAnswer: 'A',
    explanation: 'When list items contain internal commas (pairing names with institutions), semicolons separate the items to avoid confusion. (A) correctly uses semicolons between items and commas within items. (B) creates ambiguity with all commas. (C) incorrectly adds a colon after "by." (D) omits the commas within items.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Semicolons in Complex Lists'
  }),
  addRating({
    id: 'hard-eng-201',
    question: 'A passage on existentialism: "Jean-Paul Sartre\'s existentialism famously declared that \'existence precedes essence\'—humans exist first and define themselves through choices, rather than being determined by a fixed nature. This radical freedom entails radical responsibility: we cannot blame nature, God, or society for what we become. \'Bad faith\' is self-deception that denies this freedom, as when we claim \'I had no choice.\' Yet Sartre acknowledged situational constraints while insisting that within any situation, we remain free to interpret, resist, or transcend our circumstances." Sartre\'s concept of "bad faith" involves:',
    options: [
      { letter: 'A', text: 'Honestly acknowledging one\'s freedom' },
      { letter: 'B', text: 'Denying one\'s freedom and responsibility' },
      { letter: 'C', text: 'Following religious commandments' },
      { letter: 'D', text: 'Accurately describing situational constraints' }
    ],
    correctAnswer: 'B',
    explanation: '"Bad faith" is "self-deception that denies this freedom" through claims like "I had no choice." This is denying freedom and responsibility (B). Honest acknowledgment (A) is the opposite of bad faith. Religion (C) isn\'t mentioned. Situational constraints exist but don\'t negate freedom; claiming they eliminate choice is bad faith (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Sartrean Existentialism'
  }),
  addRating({
    id: 'hard-eng-202',
    question: 'A passage on philosophy of biology: "The species problem concerns whether \'species\' is a natural kind—a real division in nature—or merely a useful convention. Different species concepts (biological, phylogenetic, ecological) define species differently and can yield conflicting classifications of the same organisms. Pluralists accept multiple legitimate concepts for different purposes; monists seek the single correct concept. The debate has implications beyond taxonomy: if species aren\'t real, can extinction claims carry moral weight? If species are conventional, does this undermine evolutionary explanations that invoke species as units?" The species problem questions whether:',
    options: [
      { letter: 'A', text: 'Evolution occurred' },
      { letter: 'B', text: 'Species represents a real division in nature' },
      { letter: 'C', text: 'Organisms can be classified' },
      { letter: 'D', text: 'Different species concepts always agree' }
    ],
    correctAnswer: 'B',
    explanation: 'The species problem concerns whether "\'species\' is a natural kind—a real division in nature—or merely a useful convention." This is about whether species is real (B). Evolution isn\'t questioned (A). Classification is possible even with conventional concepts (C). Different concepts are known to conflict (D is a premise, not the question).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Species Problem'
  }),
  addRating({
    id: 'hard-eng-203',
    question: 'A passage on literary theory: "Mikhail Bakhtin\'s concept of dialogism holds that meaning arises not in isolated utterances but in dialogue—the responsive interaction between voices. Every word carries traces of prior uses and anticipates responses. The novel, for Bakhtin, is the dialogic genre par excellence, incorporating multiple voices (\'heteroglossia\') that interact without final resolution. Against the monologic tendency to impose a single authoritative voice, Bakhtin valued the \'polyphonic\' novel (Dostoevsky\'s especially) where characters\' voices are given genuine independence rather than subordinated to authorial perspective." Bakhtin\'s "dialogism" emphasizes that meaning emerges from:',
    options: [
      { letter: 'A', text: 'A single authoritative voice' },
      { letter: 'B', text: 'Interaction between multiple voices' },
      { letter: 'C', text: 'Isolated, self-contained utterances' },
      { letter: 'D', text: 'Final resolution of conflicting perspectives' }
    ],
    correctAnswer: 'B',
    explanation: 'Dialogism holds that meaning arises "in dialogue—the responsive interaction between voices." Every word carries "traces of prior uses and anticipates responses." Interaction between voices (B). Bakhtin was "against the monologic tendency" (A). Meaning doesn\'t arise "in isolated utterances" (C). Multiple voices interact "without final resolution" (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Bakhtinian Dialogism'
  }),
  addRating({
    id: 'hard-eng-204',
    question: 'A passage on social psychology: "The fundamental attribution error describes our tendency to explain others\' behavior in terms of dispositional factors (personality, character) while explaining our own behavior situationally. We see someone stumble and think \'clumsy\'; we stumble and think \'uneven pavement.\' This asymmetry reflects differences in perspective: we know our own situational variability but observe others\' behavior without that context. The effect is moderated by culture: collectivist cultures show weaker dispositional bias than individualist cultures, suggesting the error is partly culturally learned." The fundamental attribution error specifically involves:',
    options: [
      { letter: 'A', text: 'Over-attributing others\' behavior to personality traits' },
      { letter: 'B', text: 'Under-attributing our own behavior to character' },
      { letter: 'C', text: 'Explaining all behavior situationally' },
      { letter: 'D', text: 'Accurately perceiving situational influences on others' }
    ],
    correctAnswer: 'A',
    explanation: 'The error is explaining "others\' behavior in terms of dispositional factors (personality, character)" while explaining our own "situationally." This is over-attributing others\' behavior to personality (A). Under-attributing our behavior to character (B) is part of the asymmetry but not the "error" itself. We don\'t explain all behavior situationally (C). We underestimate situational influences on others (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Attribution Bias'
  }),
  addRating({
    id: 'hard-eng-205',
    question: 'A passage on philosophy of mind: "Property dualism accepts that mental properties are non-physical while denying substance dualism—there is only physical substance, but it has both physical and mental properties. Supervenience physicalism holds that mental properties supervene on physical properties: no mental difference without a physical difference. This allows mental properties to be distinct from physical properties while grounded in them. Critics argue supervenience is too weak—it\'s compatible with epiphenomenalism, where mental properties exist but have no causal power, which seems to make consciousness explanatorily idle." Supervenience physicalism claims that:',
    options: [
      { letter: 'A', text: 'Mental and physical are entirely separate substances' },
      { letter: 'B', text: 'Mental properties depend on physical properties without being identical' },
      { letter: 'C', text: 'Mental properties cause physical changes independently' },
      { letter: 'D', text: 'Physical properties supervene on mental properties' }
    ],
    correctAnswer: 'B',
    explanation: 'Supervenience holds "no mental difference without a physical difference"—mental is grounded in but distinct from physical. This is dependence without identity (B). Property dualism rejects substance separation (not A). Critics worry mental properties may lack causal power (not C). The dependence runs mental-on-physical, not reverse (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Supervenience'
  }),
  addRating({
    id: 'hard-eng-206',
    question: 'Which sentence correctly uses the subjunctive mood?',
    options: [
      { letter: 'A', text: 'The board insists that he attends all meetings.' },
      { letter: 'B', text: 'The board insists that he attend all meetings.' },
      { letter: 'C', text: 'The board insists that he will attend all meetings.' },
      { letter: 'D', text: 'The board insists that he is attending all meetings.' }
    ],
    correctAnswer: 'B',
    explanation: 'The subjunctive mood is required after verbs of demand, suggestion, or insistence (insist, demand, recommend, suggest). The subjunctive uses the base form of the verb regardless of subject. (B) correctly uses "attend" (base form). (A) uses indicative "attends." (C) uses future "will attend." (D) uses progressive "is attending."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Subjunctive Mood'
  }),
  addRating({
    id: 'hard-eng-207',
    question: 'A writer needs to insert a clarifying phrase. Original: "The researchers analyzed data from three continents spanning two decades." Which revision most clearly communicates that the data spans two decades?',
    options: [
      { letter: 'A', text: 'The researchers analyzed data spanning two decades from three continents.' },
      { letter: 'B', text: 'The researchers analyzed data from three continents, spanning two decades.' },
      { letter: 'C', text: 'The researchers analyzed, spanning two decades, data from three continents.' },
      { letter: 'D', text: 'The researchers analyzed data from three continents that spans two decades.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) places "spanning two decades" immediately after "data," clarifying that the data (not the continents) spans two decades. (B) is ambiguous about whether the continents or data span decades. (C) awkwardly interrupts the verb-object relationship. (D) uses "that spans" which grammatically modifies "continents" (the nearest noun), not "data."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Modifier Placement for Clarity'
  }),
  addRating({
    id: 'hard-eng-208',
    question: 'Identify the sentence that correctly uses "comprise" versus "compose":',
    options: [
      { letter: 'A', text: 'The committee is comprised of twelve members.' },
      { letter: 'B', text: 'The committee comprises twelve members.' },
      { letter: 'C', text: 'Twelve members comprise the committee.' },
      { letter: 'D', text: 'The committee composes twelve members.' }
    ],
    correctAnswer: 'B',
    explanation: 'Traditional usage: the whole comprises (includes) the parts. (B) correctly uses "comprises"—the committee (whole) includes twelve members (parts). (A) "comprised of" is disputed; purists reject it. (C) reverses the relationship incorrectly (parts don\'t comprise the whole; they compose it). (D) reverses meaning (the committee doesn\'t compose members; members compose it).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Comprise vs. Compose'
  }),
  addRating({
    id: 'hard-eng-209',
    question: 'Which sentence uses the em dash correctly for emphasis or interruption?',
    options: [
      { letter: 'A', text: 'The results—were unexpected—and significant.' },
      { letter: 'B', text: 'The results were unexpected—and—significant.' },
      { letter: 'C', text: 'The results were unexpected—far more so than anyone had predicted—and significant.' },
      { letter: 'D', text: 'The—results were unexpected and—significant.' }
    ],
    correctAnswer: 'C',
    explanation: '(C) correctly uses em dashes to set off an emphatic, interrupting phrase "far more so than anyone had predicted." The interrupted sentence remains grammatical if the dash content is removed. (A), (B), and (D) place dashes where they interrupt grammatical units that shouldn\'t be separated.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Em Dash for Emphasis'
  }),
  addRating({
    id: 'hard-eng-210',
    question: 'A researcher writes: "Climate change poses significant risks to coastal communities through multiple pathways______rising sea levels threaten infrastructure, increased storm intensity damages property, and saltwater intrusion compromises freshwater supplies." Which punctuation correctly introduces this list?',
    options: [
      { letter: 'A', text: ': (colon)' },
      { letter: 'B', text: '; (semicolon)' },
      { letter: 'C', text: '— (em dash)' },
      { letter: 'D', text: 'Either (A) or (C)' }
    ],
    correctAnswer: 'D',
    explanation: 'Both a colon and an em dash can introduce an explanatory list after a complete independent clause. The colon is more formal and traditional for lists; the em dash adds emphasis and is more informal. Either works correctly here. A semicolon (B) joins independent clauses but doesn\'t introduce lists.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Punctuation Introducing Lists'
  }),
  addRating({
    id: 'hard-eng-211',
    question: 'A passage on media theory: "Marshall McLuhan\'s dictum \'the medium is the message\' argued that media technologies shape human experience more fundamentally than the content they carry. Television\'s visual immediacy, for instance, creates a \'global village\' mentality regardless of what programs are broadcast. Print culture fostered linear, sequential thinking; electronic media create mosaic, simultaneous awareness. McLuhan distinguished \'hot\' media (high definition, low participation—film, radio) from \'cool\' media (low definition, high participation—telephone, television). Though his specific predictions were often wrong, his focus on media\'s structural effects rather than content remains influential." McLuhan argued that media\'s primary influence comes from:',
    options: [
      { letter: 'A', text: 'The specific content they transmit' },
      { letter: 'B', text: 'Their technological form and structure' },
      { letter: 'C', text: 'The intentions of content creators' },
      { letter: 'D', text: 'Audience interpretations of messages' }
    ],
    correctAnswer: 'B',
    explanation: '"The medium is the message" means "media technologies shape human experience more fundamentally than the content they carry." Form over content (B). He explicitly minimizes content\'s role (contradicting A). Creator intentions aren\'t discussed (C). The focus is on media structure, not audience interpretation (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Media Theory'
  }),
  addRating({
    id: 'hard-eng-212',
    question: 'A passage on moral philosophy: "Bernard Williams\'s integrity objection to utilitarianism argued that demanding we always maximize utility alienates us from our deepest commitments—our \'ground projects\' that give life meaning. If utilitarianism requires a pacifist to kill one person to prevent five deaths, it demands self-betrayal. Williams distinguished the sense in which I \'cause\' deaths by refusing from another agent\'s directly killing—the utilitarian\'s \'negative responsibility\' that I am equally responsible for what I fail to prevent. This, Williams argued, eliminates the moral significance of personal integrity." Williams\'s "integrity objection" argues that utilitarianism wrongly:',
    options: [
      { letter: 'A', text: 'Ignores consequences entirely' },
      { letter: 'B', text: 'Demands we betray our deepest commitments' },
      { letter: 'C', text: 'Places too much weight on personal projects' },
      { letter: 'D', text: 'Distinguishes too sharply between action and inaction' }
    ],
    correctAnswer: 'B',
    explanation: 'The objection is that utilitarianism "demands self-betrayal" by requiring we act against our "ground projects that give life meaning." It alienates us from deepest commitments (B). Utilitarianism focuses on consequences (contradicting A). Williams thinks it gives too little weight to personal projects (C). Utilitarianism doesn\'t distinguish action/inaction enough through "negative responsibility" (D is opposite).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Integrity Objection'
  }),
  addRating({
    id: 'hard-eng-213',
    question: 'A passage on anthropology of religion: "Clifford Geertz defined religion as a system of symbols establishing powerful, pervasive moods and motivations by formulating conceptions of existence clothed with such factuality that the moods seem uniquely realistic. Religion doesn\'t simply reflect social structure (as Durkheim held) or mask material interests (as Marxists argued); it provides \'models of\' and \'models for\' reality—both representing the world and shaping action within it. The ritual process transforms chaos into cosmos, giving suffering meaning and life orientation." Geertz\'s definition of religion emphasizes:',
    options: [
      { letter: 'A', text: 'Religion as mere social reflection' },
      { letter: 'B', text: 'The symbolic creation of meaningful reality' },
      { letter: 'C', text: 'Religion as disguised economic interest' },
      { letter: 'D', text: 'The absence of any cognitive content' }
    ],
    correctAnswer: 'B',
    explanation: 'Geertz defines religion as "a system of symbols...formulating conceptions of existence" that provides "models of and models for reality." Symbols create meaningful reality (B). He explicitly moves beyond "simply reflect[ing] social structure" (A) or "mask[ing] material interests" (C). Religion has rich cognitive content—"conceptions of existence" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Symbolic Anthropology'
  }),
  addRating({
    id: 'hard-eng-214',
    question: 'A passage on epistemology: "Internalists hold that justification depends on factors accessible to the subject through reflection—beliefs, experiences, reasoning. Externalists argue that justification depends on factors that need not be accessible, such as the reliability of the belief-forming process. A thermometer that reliably indicates temperature produces true beliefs without \'knowing\' why; similarly, we might have knowledge through reliable cognitive processes without being able to articulate our justification. Internalists object that this makes justification too disconnected from the subject\'s perspective; externalists reply that internalism cannot handle cases of reliable but unreflective knowledge." Externalism about justification holds that:',
    options: [
      { letter: 'A', text: 'Justification requires conscious access to reasons' },
      { letter: 'B', text: 'Reliable processes can justify without subject\'s awareness' },
      { letter: 'C', text: 'All knowledge must be reflectively accessible' },
      { letter: 'D', text: 'Justification is always internal to consciousness' }
    ],
    correctAnswer: 'B',
    explanation: 'Externalism holds "justification depends on factors that need not be accessible, such as the reliability of the belief-forming process." Reliable processes justify without awareness (B). Requiring conscious access (A), reflective accessibility (C), and internality to consciousness (D) are internalist positions that externalism rejects.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Internalism/Externalism'
  }),
  addRating({
    id: 'hard-eng-215',
    question: 'A passage on political theory: "Chantal Mouffe\'s agonistic pluralism rejects both liberal consensus and Schmittian friend-enemy politics. Democratic politics, she argues, cannot eliminate conflict; it can only transform antagonism (enemies to destroy) into agonism (adversaries to oppose). Adversaries share a commitment to democratic values while disagreeing fundamentally about their interpretation. This \'conflictual consensus\' provides passion and engagement that purely procedural liberalism lacks. The danger is not conflict but its suppression, which leads to extremism when legitimate channels for dissent are blocked." Mouffe\'s "agonistic pluralism" advocates:',
    options: [
      { letter: 'A', text: 'Eliminating all political conflict' },
      { letter: 'B', text: 'Treating opponents as enemies to destroy' },
      { letter: 'C', text: 'Channeling conflict into democratic adversarial relations' },
      { letter: 'D', text: 'Achieving rational consensus on all issues' }
    ],
    correctAnswer: 'C',
    explanation: 'Agonism "transform[s] antagonism (enemies to destroy) into agonism (adversaries to oppose)" while sharing "commitment to democratic values." This is channeling conflict into adversarial relations (C). She rejects eliminating conflict (A). Enemy politics is antagonism, not agonism (B). She criticizes the liberal pursuit of consensus (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Agonistic Democracy'
  }),
  addRating({
    id: 'hard-eng-216',
    question: 'Which sentence correctly uses "imply" versus "infer"?',
    options: [
      { letter: 'A', text: 'From her silence, I implied that she disagreed with the proposal.' },
      { letter: 'B', text: 'The data implies a causal relationship between the variables.' },
      { letter: 'C', text: 'He inferred in his speech that budget cuts were imminent.' },
      { letter: 'D', text: 'We can imply from the evidence that the hypothesis is correct.' }
    ],
    correctAnswer: 'B',
    explanation: 'Imply = to suggest or indicate (speaker/source does this). Infer = to conclude or deduce (listener/reader does this). (B) correctly uses "implies"—the data suggests a relationship. (A) should be "inferred" (you deduce from silence). (C) should be "implied" (he suggested in his speech). (D) should be "infer" (we deduce from evidence).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Imply vs. Infer'
  }),
  addRating({
    id: 'hard-eng-217',
    question: 'A historian writes: "The economic conditions preceding the revolution were severe; ________, popular discontent had been building for decades through failed reforms and broken promises." Which transition most effectively shows the relationship between these clauses?',
    options: [
      { letter: 'A', text: 'however' },
      { letter: 'B', text: 'meanwhile' },
      { letter: 'C', text: 'therefore' },
      { letter: 'D', text: 'moreover' }
    ],
    correctAnswer: 'D',
    explanation: 'The second clause adds another cause of revolution alongside economic conditions. "Moreover" (D) signals addition of a parallel point. "However" (A) indicates contrast, which isn\'t present. "Meanwhile" (B) suggests simultaneity but not the additive relationship. "Therefore" (C) indicates consequence, but discontent is another cause, not a result of economic conditions.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Additive Transitions'
  }),
  addRating({
    id: 'hard-eng-218',
    question: 'Which revision eliminates the squinting modifier? Original: "Scientists studying climate change frequently warn about rising sea levels."',
    options: [
      { letter: 'A', text: 'Scientists frequently studying climate change warn about rising sea levels.' },
      { letter: 'B', text: 'Scientists who study climate change frequently warn about rising sea levels.' },
      { letter: 'C', text: 'Frequently, scientists studying climate change warn about rising sea levels.' },
      { letter: 'D', text: 'Both (B) and (C) eliminate the ambiguity.' }
    ],
    correctAnswer: 'D',
    explanation: 'A squinting modifier can attach to either the preceding or following element. "Frequently" could modify "studying" (they study often) or "warn" (they warn often). (B) clarifies that "frequently" modifies "warn" by restructuring. (C) clarifies the same by moving "frequently" to sentence start. Both eliminate ambiguity. (A) creates a different meaning (frequent studying).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Squinting Modifiers'
  }),
  addRating({
    id: 'hard-eng-219',
    question: 'Identify the sentence with correct use of the past perfect tense:',
    options: [
      { letter: 'A', text: 'By the time the ambulance arrived, the patient already died.' },
      { letter: 'B', text: 'By the time the ambulance arrived, the patient had already died.' },
      { letter: 'C', text: 'By the time the ambulance had arrived, the patient already died.' },
      { letter: 'D', text: 'By the time the ambulance had arrived, the patient had already died.' }
    ],
    correctAnswer: 'B',
    explanation: 'Past perfect ("had died") is used for an action completed before another past action ("arrived"). (B) correctly uses past perfect for the earlier event (death) and simple past for the later event (arrival). (A) incorrectly uses simple past for both. (C) and (D) incorrectly use past perfect for the later event (arrival), creating confusion about sequence.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Past Perfect Tense'
  }),
  addRating({
    id: 'hard-eng-220',
    question: 'Which sentence uses "affect" and "effect" correctly?',
    options: [
      { letter: 'A', text: 'The new policy will effect significant changes and affect every department.' },
      { letter: 'B', text: 'The new policy will affect significant changes and effect every department.' },
      { letter: 'C', text: 'The new policy will effect significant changes and effect every department.' },
      { letter: 'D', text: 'The new policy will affect significant changes and affect every department.' }
    ],
    correctAnswer: 'A',
    explanation: '"Effect" as a verb means to bring about/cause; "affect" as a verb means to influence/impact. (A) correctly uses "effect changes" (bring about changes) and "affect departments" (influence departments). (B) reverses both. (C) uses "effect" for both, missing the influence meaning. (D) uses "affect" for both, missing the "bring about" meaning.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Affect vs. Effect'
  }),
  addRating({
    id: 'hard-eng-221',
    question: 'A passage on philosophy of law: "Critical Legal Studies (CLS) argued that law is politics by other means—legal doctrine is indeterminate and can support multiple outcomes, with decisions actually driven by political ideology masked as neutral reasoning. The critique targeted the public/private distinction (the \'private\' sphere of contract and property is itself publicly created through law) and rights discourse (rights are unstable and manipulable, often protecting the powerful). CLS drew on deconstructive methods to show internal contradictions in legal categories. Critics charged CLS with nihilism; defenders argued they exposed law\'s contingency to enable political transformation." CLS argues that legal outcomes are primarily determined by:',
    options: [
      { letter: 'A', text: 'Neutral application of determinate rules' },
      { letter: 'B', text: 'Political ideology disguised as legal reasoning' },
      { letter: 'C', text: 'Objective principles discoverable through reason' },
      { letter: 'D', text: 'Clear categorical distinctions in law' }
    ],
    correctAnswer: 'B',
    explanation: 'CLS holds that "decisions actually driven by political ideology masked as neutral reasoning" because doctrine is "indeterminate." Political ideology disguised as law (B). They reject neutral rule application (A), objective principles (C), and clear categories (D—they expose "internal contradictions in legal categories").',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Critical Legal Studies'
  }),
  addRating({
    id: 'hard-eng-222',
    question: 'A passage on economics: "Behavioral economics challenges the rational actor model with evidence of systematic biases. Prospect theory shows people are risk-averse for gains but risk-seeking for losses, and losses loom larger than equivalent gains (loss aversion). The endowment effect means we overvalue what we own simply because we own it. Hyperbolic discounting shows we prefer smaller-sooner to larger-later rewards more than exponential discounting would predict, explaining difficulties with saving and addiction. These findings suggest policy \'nudges\'—changing default options or choice architecture—can improve decisions without restricting freedom." According to prospect theory:',
    options: [
      { letter: 'A', text: 'People are uniformly risk-averse' },
      { letter: 'B', text: 'Losses and gains are weighted equally' },
      { letter: 'C', text: 'People become risk-seeking when facing losses' },
      { letter: 'D', text: 'Rational calculation determines all choices' }
    ],
    correctAnswer: 'C',
    explanation: 'Prospect theory shows "people are risk-averse for gains but risk-seeking for losses." They become risk-seeking for losses (C). Not uniformly risk-averse (A). "Losses loom larger than equivalent gains"—not equally weighted (B). Behavioral economics challenges rational calculation (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Prospect Theory'
  }),
  addRating({
    id: 'hard-eng-223',
    question: 'A passage on philosophy of science: "Nancy Cartwright\'s anti-realism about fundamental laws argues that \'the laws of physics lie\'—they don\'t describe reality but idealized models. The law of gravitation describes behavior of point masses in a vacuum, which don\'t exist. Actual prediction requires phenomenological laws and ceteris paribus clauses. Fundamental laws gain their apparent universality by losing descriptive accuracy; they\'re tools for constructing models, not mirrors of nature. This \'Stanford School\' pluralism sees science as a patchwork of models rather than a unified theory approaching truth." Cartwright argues that fundamental laws:',
    options: [
      { letter: 'A', text: 'Accurately describe reality as it is' },
      { letter: 'B', text: 'Describe idealized models, not actual phenomena' },
      { letter: 'C', text: 'Provide unified explanations of all phenomena' },
      { letter: 'D', text: 'Mirror nature without approximation' }
    ],
    correctAnswer: 'B',
    explanation: 'Cartwright argues laws "don\'t describe reality but idealized models"—they describe "point masses in a vacuum, which don\'t exist." Idealized models, not actual phenomena (B). They don\'t accurately describe reality (A). Science is "a patchwork of models rather than a unified theory" (contradicting C). Laws are "tools...not mirrors of nature" (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Scientific Anti-Realism'
  }),
  addRating({
    id: 'hard-eng-224',
    question: 'A passage on moral psychology: "The trolley problem and its variants test moral intuitions. In the \'switch\' case, most approve of diverting a trolley to kill one instead of five; in the \'footbridge\' case, most disapprove of pushing someone onto the tracks to stop the trolley, even with the same outcome. Double-effect doctrine distinguishes intending harm (impermissible) from foreseeing it as a side effect (potentially permissible). But Judith Thomson\'s \'fat man\' variant challenges this: if the fat man were stuck on a trapdoor, pulling a switch to drop him seems more permissible than pushing, though both intend his death." The trolley variations reveal that moral intuitions are influenced by:',
    options: [
      { letter: 'A', text: 'Only the number of lives saved' },
      { letter: 'B', text: 'The means of causing harm, not just outcomes' },
      { letter: 'C', text: 'Purely utilitarian calculations' },
      { letter: 'D', text: 'Nothing beyond conscious reasoning' }
    ],
    correctAnswer: 'B',
    explanation: 'Different reactions to switch vs. footbridge cases with "the same outcome" show that means matter—"most disapprove of pushing" but not switching. The means of causing harm (B). Not just numbers saved (A). Not purely utilitarian (C—outcomes are same but intuitions differ). The visceral reactions suggest factors beyond conscious reasoning (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Trolley Problem'
  }),
  addRating({
    id: 'hard-eng-225',
    question: 'A passage on postcolonial theory: "Edward Said\'s Orientalism analyzed how Western representations of \'the Orient\' constructed it as Europe\'s Other—exotic, irrational, despotic, requiring Western intervention. This discourse was not merely erroneous but productive: it justified imperialism while constituting Western identity through contrast. Orientalism was a \'style of thought based upon an ontological and epistemological distinction between the Orient and the Occident.\' Scholars extended Said\'s analysis to other colonial contexts, though some questioned whether his framework adequately accounted for non-Western agency and internal diversity within colonized societies." Said\'s analysis of Orientalism focuses on how:',
    options: [
      { letter: 'A', text: 'Eastern cultures accurately described themselves' },
      { letter: 'B', text: 'Western representations constructed and controlled the Orient' },
      { letter: 'C', text: 'Colonial subjects resisted Western domination' },
      { letter: 'D', text: 'Cross-cultural understanding was achieved' }
    ],
    correctAnswer: 'B',
    explanation: 'Said analyzed "how Western representations of \'the Orient\' constructed it as Europe\'s Other" in ways that "justified imperialism." Western construction and control (B). Not Eastern self-description (A). Critics noted Said didn\'t adequately address resistance/agency (C). The discourse produced misrepresentation, not understanding (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Orientalism'
  }),
  addRating({
    id: 'hard-eng-226',
    question: 'Which sentence demonstrates correct agreement with collective nouns?',
    options: [
      { letter: 'A', text: 'The jury have reached their verdict.' },
      { letter: 'B', text: 'The jury has reached their verdict.' },
      { letter: 'C', text: 'The jury has reached its verdict.' },
      { letter: 'D', text: 'Either (A) or (C), depending on usage convention.' }
    ],
    correctAnswer: 'D',
    explanation: 'Collective noun agreement varies by convention. American English typically treats collectives as singular ("has...its"). British English often treats them as plural ("have...their"). Both (A) and (C) show internal consistency. (B) mixes singular verb ("has") with plural pronoun ("their"), which is inconsistent. So (D) is correct—both (A) and (C) are acceptable depending on convention.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Collective Noun Agreement'
  }),
  addRating({
    id: 'hard-eng-227',
    question: 'A writer wants to emphasize a contrast. Original: "The initial results were promising. The long-term outcomes, however, proved disappointing." Which revision most effectively emphasizes the contrast?',
    options: [
      { letter: 'A', text: 'The initial results were promising, but the long-term outcomes proved disappointing.' },
      { letter: 'B', text: 'While the initial results were promising, the long-term outcomes proved disappointing.' },
      { letter: 'C', text: 'The initial results were promising; however, the long-term outcomes proved disappointing.' },
      { letter: 'D', text: 'Although the initial results were promising, the long-term outcomes proved deeply disappointing.' }
    ],
    correctAnswer: 'D',
    explanation: '(D) most effectively emphasizes contrast through subordination ("Although"), which signals the first clause will be contradicted, plus the intensifier "deeply" before "disappointing." (A), (B), and (C) all show contrast but with less emphasis. The subordinating conjunction plus intensifier creates the strongest contrast effect.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Emphasizing Contrast'
  }),
  addRating({
    id: 'hard-eng-228',
    question: 'Which sentence correctly handles a quotation within a quotation?',
    options: [
      { letter: 'A', text: 'She said, "The report stated, "No significant differences were found.""' },
      { letter: 'B', text: 'She said, "The report stated, \'No significant differences were found.\'"' },
      { letter: 'C', text: 'She said, \'The report stated, "No significant differences were found."\'' },
      { letter: 'D', text: 'She said: "The report stated: \'No significant differences were found.\'"' }
    ],
    correctAnswer: 'B',
    explanation: 'In American English, a quotation within a quotation uses single quotation marks inside double quotation marks. (B) correctly nests \'...\' inside "..." with the period before the closing quotation marks. (A) uses double quotes for both levels. (C) reverses the convention. (D) uses unnecessary colons and is awkward.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Nested Quotations'
  }),
  addRating({
    id: 'hard-eng-229',
    question: 'Identify the sentence that correctly uses "who" versus "whom":',
    options: [
      { letter: 'A', text: 'The candidate who the committee selected will begin next month.' },
      { letter: 'B', text: 'The candidate whom the committee selected will begin next month.' },
      { letter: 'C', text: 'The committee interviewed candidates whom they believed were qualified.' },
      { letter: 'D', text: 'Give the report to whomever requests it.' }
    ],
    correctAnswer: 'B',
    explanation: '"Who" is subjective (does the action); "whom" is objective (receives the action). In (B), "the committee selected [whom]"—whom is the object of "selected." (A) incorrectly uses "who" as object. (C) needs "who"—the candidates "were qualified" (subject of that clause). (D) needs "whoever"—the clause "whoever requests it" has "whoever" as subject of "requests."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Who vs. Whom'
  }),
  addRating({
    id: 'hard-eng-230',
    question: 'A researcher writes: "The intervention group showed improvement on all measures______cognitive, behavioral, and social______compared to the control group." Which punctuation correctly sets off the appositive list?',
    options: [
      { letter: 'A', text: ': ... :' },
      { letter: 'B', text: '— ... —' },
      { letter: 'C', text: ', ... ,' },
      { letter: 'D', text: 'Both (B) and (C) are acceptable.' }
    ],
    correctAnswer: 'D',
    explanation: 'Appositives can be set off by commas or em dashes. Em dashes (B) add emphasis; commas (C) are more neutral. Both correctly set off the list that renames/specifies "all measures." Colons (A) would be unusual here—colons typically don\'t come in pairs to set off appositives.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Setting Off Appositives'
  }),
  addRating({
    id: 'hard-eng-231',
    question: 'A passage on philosophy of emotions: "Martha Nussbaum\'s neo-Stoic account treats emotions as evaluative judgments—fear involves judging something as dangerous and important for well-being. Emotions are not blind urges but have cognitive content that can be assessed for accuracy. This explains why emotions respond to argument: if I learn the snake is harmless, my fear subsides. Yet critics note that emotions can persist despite changed beliefs (phobias) and that bodily feelings seem integral to emotion, not epiphenomenal. Nussbaum acknowledges the latter while maintaining that judgment is constitutive." Nussbaum\'s view holds that emotions are fundamentally:',
    options: [
      { letter: 'A', text: 'Blind physiological urges without content' },
      { letter: 'B', text: 'Evaluative judgments with cognitive content' },
      { letter: 'C', text: 'Always irrational and unjustified' },
      { letter: 'D', text: 'Independent of beliefs about the world' }
    ],
    correctAnswer: 'B',
    explanation: 'Nussbaum "treats emotions as evaluative judgments—fear involves judging something as dangerous." They have "cognitive content that can be assessed for accuracy." Evaluative judgments with content (B). Not blind urges (A). They can be rational (C—"can be assessed for accuracy"). They respond to beliefs (D—fear subsides when "I learn the snake is harmless").',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Cognitivist Emotion Theory'
  }),
  addRating({
    id: 'hard-eng-232',
    question: 'A passage on sociology: "Erving Goffman\'s dramaturgical approach analyzed social life as performance. We are all actors managing impressions through \'front stage\' behavior (public performance) and \'back stage\' relaxation (where the performance drops). \'Face-work\' describes efforts to maintain a consistent self-image and help others maintain theirs. Interaction rituals involve mutual focus and emotional attunement, generating solidarity and moral commitment to the group. This microsociological perspective revealed how macro-social structures are reproduced through countless daily performances following tacit scripts." Goffman\'s "dramaturgical approach" analyzes social interaction as:',
    options: [
      { letter: 'A', text: 'Purely spontaneous and unstructured behavior' },
      { letter: 'B', text: 'Performance and impression management' },
      { letter: 'C', text: 'Determined entirely by macro-social structures' },
      { letter: 'D', text: 'Free from any concern with self-presentation' }
    ],
    correctAnswer: 'B',
    explanation: 'Goffman analyzed "social life as performance" with "actors managing impressions." This is performance and impression management (B). It\'s not purely spontaneous—we follow "tacit scripts" (A). Macro-structures are "reproduced through" micro-performances, not determining them directly (C). Face-work shows concern with self-presentation (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Dramaturgical Sociology'
  }),
  addRating({
    id: 'hard-eng-233',
    question: 'A passage on economics: "The Coase theorem states that if transaction costs are zero and property rights are clearly defined, bargaining will lead to efficient outcomes regardless of the initial allocation of rights. A factory polluting a laundry could either be made to stop (property right with laundry) or could pay the laundry for the harm (property right with factory); in theory, the parties will bargain to the same efficient level of pollution. The theorem\'s importance lies in what it reveals when it fails: real-world transaction costs explain why institutional arrangements matter for efficiency." The Coase theorem assumes:',
    options: [
      { letter: 'A', text: 'Transaction costs are substantial' },
      { letter: 'B', text: 'Property rights are undefined' },
      { letter: 'C', text: 'Zero transaction costs and clear property rights' },
      { letter: 'D', text: 'Government intervention is always necessary' }
    ],
    correctAnswer: 'C',
    explanation: 'The theorem states "if transaction costs are zero and property rights are clearly defined, bargaining will lead to efficient outcomes." These are its assumptions (C). It assumes the opposite of substantial transaction costs (A) and undefined property rights (B). It suggests bargaining can achieve efficiency without government intervention (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Coase Theorem'
  }),
  addRating({
    id: 'hard-eng-234',
    question: 'A passage on philosophy of language: "Paul Grice\'s theory of implicature distinguished what is said from what is implicated. A speaker who says \'John has three children\' and has four children has said something literally true while implicating something false (that he has only three). Conversational implicatures arise from the \'cooperative principle\' and its maxims: be truthful, informative, relevant, and clear. Flouting a maxim—obviously violating it—signals additional meaning. Saying \'John is a real Einstein\' about someone unintelligent flouts the truth maxim to convey irony." According to Grice, conversational implicature arises from:',
    options: [
      { letter: 'A', text: 'The literal meaning of words alone' },
      { letter: 'B', text: 'Violation or flouting of conversational maxims' },
      { letter: 'C', text: 'Grammatical rules of sentence structure' },
      { letter: 'D', text: 'Dictionary definitions of terms' }
    ],
    correctAnswer: 'B',
    explanation: 'Implicatures "arise from the \'cooperative principle\' and its maxims." "Flouting a maxim—obviously violating it—signals additional meaning." Violation/flouting of maxims (B). It\'s distinguished from literal meaning (A). It\'s pragmatic, not grammatical (C). It goes beyond dictionary meaning (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Gricean Implicature'
  }),
  addRating({
    id: 'hard-eng-235',
    question: 'A passage on bioethics: "The capability approach, developed by Amartya Sen and Martha Nussbaum, measures well-being not by resources or utility but by what people are able to do and be—their capabilities. Health care, on this view, matters not for its own sake but because it enables functioning: being nourished, mobile, able to participate in social life. This shifts focus from equal treatment to equal capability. Justice requires ensuring threshold levels of central capabilities, potentially demanding more resources for those with disabilities who need more to achieve the same functioning." The capability approach measures well-being by:',
    options: [
      { letter: 'A', text: 'Income and resources alone' },
      { letter: 'B', text: 'Subjective life satisfaction' },
      { letter: 'C', text: 'What people are able to do and be' },
      { letter: 'D', text: 'Equal treatment regardless of need' }
    ],
    correctAnswer: 'C',
    explanation: 'The approach measures well-being "not by resources or utility but by what people are able to do and be—their capabilities." Able to do and be (C). Not resources alone (A). Not subjective satisfaction/utility (B). It requires "more resources for those with disabilities who need more to achieve the same functioning"—not equal treatment regardless of need (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Capability Approach'
  }),
  addRating({
    id: 'hard-eng-236',
    question: 'Which sentence uses "less" and "fewer" correctly?',
    options: [
      { letter: 'A', text: 'There were less participants this year than last year.' },
      { letter: 'B', text: 'We have fewer time to complete the project than anticipated.' },
      { letter: 'C', text: 'The revised estimate was less than the original, with fewer adjustments needed.' },
      { letter: 'D', text: 'Fewer resources means less opportunities for growth.' }
    ],
    correctAnswer: 'C',
    explanation: '"Fewer" is for countable items; "less" is for uncountable quantities. (C) correctly uses "less" for the uncountable estimate amount and "fewer" for countable adjustments. (A) should be "fewer participants" (countable). (B) should be "less time" (uncountable). (D) should be "fewer opportunities" (countable).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Less vs. Fewer'
  }),
  addRating({
    id: 'hard-eng-237',
    question: 'A researcher writes: "The methodology chapter will describe the sampling procedures, data collection instruments, and analytical techniques______will explain how validity and reliability were established." Which punctuation correctly joins these independent clauses?',
    options: [
      { letter: 'A', text: ', and' },
      { letter: 'B', text: '; it' },
      { letter: 'C', text: '. It' },
      { letter: 'D', text: 'All of the above are correct.' }
    ],
    correctAnswer: 'D',
    explanation: 'Independent clauses can be correctly joined by: (A) a comma with coordinating conjunction "and" (with implied subject "it"), (B) a semicolon with new clause beginning with subject "it", or (C) a period creating two sentences. All three are grammatically correct options for connecting these clauses.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Joining Independent Clauses'
  }),
  addRating({
    id: 'hard-eng-238',
    question: 'Which sentence demonstrates correct pronoun-antecedent agreement with indefinite pronouns?',
    options: [
      { letter: 'A', text: 'Everyone should bring their laptop to the meeting.' },
      { letter: 'B', text: 'Everyone should bring his laptop to the meeting.' },
      { letter: 'C', text: 'Each participant should bring their laptop to the meeting.' },
      { letter: 'D', text: 'Both (A) and (C) are acceptable in contemporary usage.' }
    ],
    correctAnswer: 'D',
    explanation: 'Traditional grammar treats "everyone" and "each" as singular, requiring "his" or "his or her." However, contemporary usage widely accepts singular "they/their" for gender-neutral reference with indefinite pronouns. Both (A) and (C) use singular "their" with indefinite pronouns, which is now acceptable. (B) uses the traditional masculine generic, which some find exclusionary.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Pronoun Agreement with Indefinites'
  }),
  addRating({
    id: 'hard-eng-239',
    question: 'A historian writes: "The treaty\'s territorial provisions______which included the cession of three provinces, the demilitarization of the border region, and the establishment of a neutral zone______proved controversial for decades." Which punctuation correctly sets off this complex appositive?',
    options: [
      { letter: 'A', text: ', ... ,' },
      { letter: 'B', text: '— ... —' },
      { letter: 'C', text: ': ... :' },
      { letter: 'D', text: 'Both (A) and (B) are acceptable.' }
    ],
    correctAnswer: 'D',
    explanation: 'Complex appositives containing internal commas can be set off by commas or em dashes. Em dashes (B) are often preferred when the appositive has internal commas, as they more clearly mark the boundaries. However, commas (A) are also acceptable. Colons don\'t typically come in pairs to set off appositives (C).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Punctuating Complex Appositives'
  }),
  addRating({
    id: 'hard-eng-240',
    question: 'Which revision most effectively creates emphasis through sentence structure? Original: "The experiment failed."',
    options: [
      { letter: 'A', text: 'The experiment, unfortunately, failed.' },
      { letter: 'B', text: 'Failed. That was the outcome of the experiment.' },
      { letter: 'C', text: 'The experiment did not succeed.' },
      { letter: 'D', text: 'It was the experiment that failed.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) uses a sentence fragment followed by a full sentence, placing "Failed" in emphatic initial position. This front-loading of the key word creates dramatic emphasis. (A) adds only a mild qualifier. (C) uses litotes (understatement) which actually reduces emphasis. (D) uses a cleft sentence but doesn\'t emphasize "failed" as strongly as (B).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Creating Emphasis Through Structure'
  }),
  addRating({
    id: 'hard-eng-241',
    question: 'A passage on philosophy of history: "R.G. Collingwood held that historical knowledge requires re-enacting past thought—the historian must think the thoughts that historical agents thought. This doesn\'t mean imagining what it felt like but grasping the reasons that made actions intelligible. Historical explanation is rational explanation: showing that the agent had good reasons from their perspective. Critics questioned whether we can truly re-think ancient or alien thought, and whether non-rational factors (economic conditions, unconscious drives) are thereby excluded. Collingwood replied that even these factors become historical when grasped as reasons by historical actors." For Collingwood, historical understanding requires:',
    options: [
      { letter: 'A', text: 'Merely imagining emotional states' },
      { letter: 'B', text: 'Grasping the reasons behind agents\' actions' },
      { letter: 'C', text: 'Explaining events through impersonal forces only' },
      { letter: 'D', text: 'Avoiding all interpretation of thought' }
    ],
    correctAnswer: 'B',
    explanation: 'Collingwood held that understanding requires "grasping the reasons that made actions intelligible"—"showing that the agent had good reasons from their perspective." Grasping reasons (B). It\'s not merely imagining feelings—he distinguishes this (A). It\'s rational explanation, not impersonal forces (C). It requires interpreting thought (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Historical Re-enactment'
  }),
  addRating({
    id: 'hard-eng-242',
    question: 'A passage on ethics of technology: "The Collingridge dilemma notes that in early stages of technology development, when change is easy, impacts are hard to predict; once impacts become clear, the technology is entrenched and change is difficult. This creates a fundamental problem for technology governance: we must decide whether to proceed before we can know the consequences, but waiting until we know forecloses options. Proposed responses include iterative development with course corrections, modular design enabling partial rollback, and expanding public deliberation to surface concerns earlier." The Collingridge dilemma describes a tension between:',
    options: [
      { letter: 'A', text: 'Technical feasibility and economic viability' },
      { letter: 'B', text: 'Early uncertainty and later inflexibility' },
      { letter: 'C', text: 'Scientific research and technological application' },
      { letter: 'D', text: 'Public acceptance and expert knowledge' }
    ],
    correctAnswer: 'B',
    explanation: 'The dilemma is that "in early stages...impacts are hard to predict; once impacts become clear, the technology is entrenched." This is early uncertainty vs. later inflexibility (B). It\'s not about feasibility/viability (A), research/application (C), or public/expert divides (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Collingridge Dilemma'
  }),
  addRating({
    id: 'hard-eng-243',
    question: 'A passage on phenomenology: "Maurice Merleau-Ponty\'s embodied phenomenology rejected Cartesian mind-body dualism through analysis of perception. The body is not an object I possess but the means by which I have a world at all—a \'body-subject.\' Phantom limb phenomena and pathological cases reveal the \'body schema\'—a pre-reflective sense of bodily position and capacity that orients all perception and action. Perception is not passive reception of data but active exploration by a body that \'grips\' the world. Subject and object, self and world, are intertwined in the \'flesh\' of lived experience." Merleau-Ponty argued that the body is:',
    options: [
      { letter: 'A', text: 'An object possessed by the mind' },
      { letter: 'B', text: 'The means by which we have a world' },
      { letter: 'C', text: 'Irrelevant to perception' },
      { letter: 'D', text: 'Separate from the experiencing subject' }
    ],
    correctAnswer: 'B',
    explanation: '"The body is not an object I possess but the means by which I have a world at all." The body is the means of having a world (B). It\'s not an object possessed (A). It\'s central to perception (not irrelevant, C). The "body-subject" unites body and subject (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Embodied Phenomenology'
  }),
  addRating({
    id: 'hard-eng-244',
    question: 'A passage on decision theory: "Expected utility theory faces challenges from Allais\'s paradox and Ellsberg\'s paradox. In Allais, people\'s choices between certain and probabilistic gains violate the independence axiom—preferences shift depending on common consequences that should be irrelevant. In Ellsberg, people prefer betting on known probabilities over unknown ones even when expected values are equal (\'ambiguity aversion\'). Prospect theory addresses Allais-type violations; \'ambiguity-averse\' preferences violate the more fundamental assumption that beliefs can be represented by precise probabilities at all." Ellsberg\'s paradox reveals that people:',
    options: [
      { letter: 'A', text: 'Are indifferent between known and unknown probabilities' },
      { letter: 'B', text: 'Prefer unknown probabilities over known ones' },
      { letter: 'C', text: 'Avoid situations with unknown probabilities' },
      { letter: 'D', text: 'Calculate expected values perfectly' }
    ],
    correctAnswer: 'C',
    explanation: 'Ellsberg shows "people prefer betting on known probabilities over unknown ones" (ambiguity aversion). This means avoiding unknown probabilities (C). Not indifferent (A). Not preferring unknown (B). The paradox shows they don\'t simply calculate expected values (D—they respond to ambiguity beyond expected value).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Ellsberg Paradox'
  }),
  addRating({
    id: 'hard-eng-245',
    question: 'A passage on political philosophy: "G.A. Cohen\'s critique of Rawlsian justice argued that a just society requires not only just institutions but just personal choices within those institutions. If talented people demand extra pay to use their talents productively—and the difference principle allows this to benefit the least advantaged—they exploit their position. An \'egalitarian ethos\' would lead people to contribute productively without needing material incentives. Rawls saw justice as applying to institutions, not personal choices; Cohen argued this created an unacceptable gap between what principles require of institutions and what they permit individuals." Cohen argued that justice requires:',
    options: [
      { letter: 'A', text: 'Only just institutions, not individual choices' },
      { letter: 'B', text: 'Both just institutions and just personal choices' },
      { letter: 'C', text: 'Maximizing individual material incentives' },
      { letter: 'D', text: 'Ignoring the difference principle entirely' }
    ],
    correctAnswer: 'B',
    explanation: 'Cohen "argued that a just society requires not only just institutions but just personal choices within those institutions." Both institutions and choices (B). He critiques Rawls\' institutions-only view (A). He criticizes demanding material incentives (C). He critiques how the difference principle works, not abandoning it (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Cohenian Justice Critique'
  }),
  addRating({
    id: 'hard-eng-246',
    question: 'Which sentence correctly uses "lay" versus "lie"?',
    options: [
      { letter: 'A', text: 'The documents have laid on his desk for weeks.' },
      { letter: 'B', text: 'Yesterday she lay the files on the table.' },
      { letter: 'C', text: 'The cat has lain in that spot all afternoon.' },
      { letter: 'D', text: 'Please lay down and rest for a moment.' }
    ],
    correctAnswer: 'C',
    explanation: '"Lie" (to recline) is intransitive: lie, lay, lain. "Lay" (to put) is transitive: lay, laid, laid. (C) correctly uses "has lain" (present perfect of "lie"—the cat reclined). (A) should be "have lain" (documents reclined). (B) should be "laid" (she put the files). (D) should be "lie down" (recline, intransitive).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Lay vs. Lie'
  }),
  addRating({
    id: 'hard-eng-247',
    question: 'A scientist writes: "The protocol requires that samples ________ stored at -80°C and ________ processed within 24 hours of collection." Which forms correctly complete the sentence?',
    options: [
      { letter: 'A', text: 'are, are' },
      { letter: 'B', text: 'be, be' },
      { letter: 'C', text: 'are, be' },
      { letter: 'D', text: 'be, are' }
    ],
    correctAnswer: 'B',
    explanation: '"Requires that" triggers the subjunctive mood, which uses the base form of the verb regardless of subject. Both clauses following "requires that" need subjunctive "be": "requires that samples be stored...and be processed." (B) correctly uses subjunctive throughout.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Subjunctive in Dependent Clauses'
  }),
  addRating({
    id: 'hard-eng-248',
    question: 'Which revision most effectively eliminates wordiness while preserving meaning? Original: "Due to the fact that the equipment malfunctioned, the experiment had to be terminated prior to completion."',
    options: [
      { letter: 'A', text: 'Because of the equipment malfunction, the experiment was terminated before completion.' },
      { letter: 'B', text: 'Because the equipment malfunctioned, the experiment was terminated early.' },
      { letter: 'C', text: 'The equipment malfunctioned, so the experiment had to be terminated prior to being completed.' },
      { letter: 'D', text: 'Due to equipment malfunction, termination of the experiment occurred prematurely.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) most efficiently conveys the meaning: "Due to the fact that" → "Because" (3 words to 1), "had to be terminated prior to completion" → "was terminated early" (6 words to 3). (A) is good but "before completion" is wordier than "early." (C) keeps "prior to being completed." (D) uses awkward nominalization "termination...occurred."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Eliminating Wordiness'
  }),
  addRating({
    id: 'hard-eng-249',
    question: 'Identify the sentence with correct placement of "only":',
    options: [
      { letter: 'A', text: 'She only told three people about the results.' },
      { letter: 'B', text: 'She told only three people about the results.' },
      { letter: 'C', text: 'Only she told three people about the results.' },
      { letter: 'D', text: 'All three sentences are correct but have different meanings.' }
    ],
    correctAnswer: 'D',
    explanation: '"Only" should be placed immediately before the word or phrase it modifies. (A) emphasizes the action (only told, didn\'t show). (B) emphasizes the number (just three people). (C) emphasizes the subject (she alone, no one else). All are grammatically correct with distinct meanings, so (D) is the complete answer.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Placement of Only'
  }),
  addRating({
    id: 'hard-eng-250',
    question: 'A writer wants to maintain formal register. Which sentence best achieves this?',
    options: [
      { letter: 'A', text: 'The methodology was pretty rigorous, yielding reliable results.' },
      { letter: 'B', text: 'The methodology was sufficiently rigorous to yield reliable results.' },
      { letter: 'C', text: 'The methodology was rigorous enough to get reliable results.' },
      { letter: 'D', text: 'The methodology was super rigorous, so results were reliable.' }
    ],
    correctAnswer: 'B',
    explanation: 'Formal academic register avoids colloquialisms and casual intensifiers. (B) uses "sufficiently rigorous" and "yield"—appropriately formal language. (A) uses informal "pretty." (C) uses conversational "enough to get." (D) uses slang "super" and informal clause structure.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Maintaining Formal Register'
  }),
  addRating({
    id: 'hard-eng-251',
    question: 'A passage on aesthetics: "Arthur Danto\'s institutional theory of art, prompted by Warhol\'s Brillo Boxes, asked how an art object differs from a visually identical non-art object. The answer lies not in perceptible properties but in the \'artworld\'—the network of theories, history, and practices that confer art status. Something is art because the artworld says it is. Critics charged circularity (the artworld is defined by art it designates) and failure to explain why the artworld\'s pronouncements matter. George Dickie refined the theory: art is what is presented by an artist to an artworld public for appreciation." Danto\'s theory locates the distinction between art and non-art in:',
    options: [
      { letter: 'A', text: 'Visible properties of objects' },
      { letter: 'B', text: 'The institutional context of the artworld' },
      { letter: 'C', text: 'The artist\'s technical skill' },
      { letter: 'D', text: 'Emotional responses of viewers' }
    ],
    correctAnswer: 'B',
    explanation: 'Danto\'s answer "lies not in perceptible properties but in the \'artworld\'—the network of theories, history, and practices." Institutional context (B). Not visible properties (A). Not skill (C—Brillo Boxes challenge this). Not viewer emotion directly (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Institutional Art Theory'
  }),
  addRating({
    id: 'hard-eng-252',
    question: 'A passage on sociology of science: "Bruno Latour\'s actor-network theory (ANT) rejects the separation of nature and society, arguing that both are produced together through networks of human and non-human \'actants.\' Scientific facts are not discovered but constructed through associations—instruments, texts, institutions, and material objects all have agency in shaping knowledge. The laboratory creates nature as much as it represents it. This symmetrical treatment of humans and non-humans was controversial: critics questioned whether artifacts truly have \'agency\' and whether ANT could distinguish good science from bad." Actor-network theory argues that scientific knowledge is:',
    options: [
      { letter: 'A', text: 'Discovered through passive observation of nature' },
      { letter: 'B', text: 'Constructed through networks including non-human actors' },
      { letter: 'C', text: 'Determined purely by social interests' },
      { letter: 'D', text: 'Independent of instruments and institutions' }
    ],
    correctAnswer: 'B',
    explanation: 'ANT holds that "facts are not discovered but constructed through associations—instruments, texts, institutions, and material objects all have agency." Constructed through networks with non-humans (B). Not passive discovery (A). It rejects pure social determination by including non-humans (C). Instruments and institutions are central (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Actor-Network Theory'
  }),
  addRating({
    id: 'hard-eng-253',
    question: 'A passage on moral philosophy: "The doctrine of double effect distinguishes intending harm from merely foreseeing it as a side effect. A doctor may give pain relief that foreseeably hastens death but may not intentionally kill to relieve pain—even with the same outcome. Four conditions typically apply: the act must be good or neutral in itself; the good effect must be intended while the bad is merely foreseen; the bad must not be a means to the good; and proportionate reason must exist. Critics question whether the intention/foresight distinction can bear this moral weight." The doctrine of double effect permits actions that:',
    options: [
      { letter: 'A', text: 'Intend harm as a means to good ends' },
      { letter: 'B', text: 'Foresee but don\'t intend harmful side effects' },
      { letter: 'C', text: 'Maximize good consequences regardless of means' },
      { letter: 'D', text: 'Never produce any harmful effects' }
    ],
    correctAnswer: 'B',
    explanation: 'The doctrine "distinguishes intending harm from merely foreseeing it as a side effect"—permitting actions where "the good effect must be intended while the bad is merely foreseen." Foreseen but not intended harm (B). The bad must not be a means (contradicting A). It\'s not purely consequentialist (C). It addresses cases with harmful effects (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Double Effect'
  }),
  addRating({
    id: 'hard-eng-254',
    question: 'A passage on cognitive science: "The extended mind thesis, proposed by Andy Clark and David Chalmers, argues that cognition extends beyond the brain to include external artifacts. Otto, who has Alzheimer\'s, relies on a notebook the way others rely on biological memory; the notebook is part of his cognitive system. If internal and external processes play equivalent functional roles, they deserve equal cognitive status. This \'parity principle\' challenges the intuition that mind stops at the skull. Critics argue that biological processes have properties (speed, integration, reliability) that external aids lack." The extended mind thesis claims that:',
    options: [
      { letter: 'A', text: 'Mind is entirely located in the brain' },
      { letter: 'B', text: 'External artifacts can be part of cognitive systems' },
      { letter: 'C', text: 'Only biological processes count as cognitive' },
      { letter: 'D', text: 'Memory cannot be extended externally' }
    ],
    correctAnswer: 'B',
    explanation: 'The thesis argues "cognition extends beyond the brain to include external artifacts"—Otto\'s "notebook is part of his cognitive system." External artifacts as cognitive (B). It challenges the view that mind is in the brain (contradicting A). Non-biological can be cognitive (contradicting C). Memory extends to notebooks (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Extended Mind'
  }),
  addRating({
    id: 'hard-eng-255',
    question: 'A passage on literary criticism: "New Historicism, associated with Stephen Greenblatt, rejected both formalist close reading\'s isolation of texts and older historicism\'s background-foreground distinction. Texts don\'t reflect historical context but participate in cultural circulation of power. \'Self-fashioning\' describes how subjectivity is constructed through engagement with cultural codes, not expressed from an authentic inner self. Literary and non-literary texts are equally caught in power relations; Shakespeare\'s plays are no more autonomous than court documents or travel narratives. The \'anecdote\' became a signature method—illuminating connections between disparate cultural sites." New Historicism views literary texts as:',
    options: [
      { letter: 'A', text: 'Autonomous objects for formal analysis' },
      { letter: 'B', text: 'Passive reflections of historical background' },
      { letter: 'C', text: 'Active participants in cultural power dynamics' },
      { letter: 'D', text: 'Expressions of authentic authorial selves' }
    ],
    correctAnswer: 'C',
    explanation: 'New Historicism holds "texts don\'t reflect historical context but participate in cultural circulation of power." Active participation in power (C). It rejects formalist isolation (A). It rejects reflection model (B). It rejects authentic self-expression—subjectivity is "constructed" (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding New Historicism'
  }),
  addRating({
    id: 'hard-eng-256',
    question: 'Which sentence correctly uses "continuous" versus "continual"?',
    options: [
      { letter: 'A', text: 'The machine operates continuous, producing output without interruption.' },
      { letter: 'B', text: 'We experienced continuous interruptions throughout the meeting.' },
      { letter: 'C', text: 'The river provides a continual flow of water to the region.' },
      { letter: 'D', text: 'The continuous delays frustrated everyone involved in the project.' }
    ],
    correctAnswer: 'D',
    explanation: '"Continuous" = uninterrupted, without breaks. "Continual" = repeated regularly, with intervals. (D) correctly uses "continual" for repeated delays (they stop and start). (A) needs "continuously" (adverb) or "continuous operation." (B) is contradictory—"continuous" means unbroken, but interruptions break continuity. (C) should be "continuous" if the flow never stops.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Continuous vs. Continual'
  }),
  addRating({
    id: 'hard-eng-257',
    question: 'A researcher needs to introduce counterevidence. Which sentence most effectively acknowledges the counterevidence while maintaining the original argument?',
    options: [
      { letter: 'A', text: 'Some studies have found different results, but they\'re probably wrong.' },
      { letter: 'B', text: 'While some studies report conflicting findings, methodological differences may account for the discrepancy.' },
      { letter: 'C', text: 'Other studies exist that disagree with this conclusion.' },
      { letter: 'D', text: 'Conflicting evidence should be ignored in favor of the main hypothesis.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) acknowledges counterevidence ("some studies report conflicting findings") while offering a reasoned explanation that maintains the argument ("methodological differences may account for the discrepancy"). (A) dismisses without reason. (C) merely notes counterevidence without addressing it. (D) is methodologically inappropriate.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Acknowledging Counterevidence'
  }),
  addRating({
    id: 'hard-eng-258',
    question: 'Which sentence demonstrates correct use of "that" versus "which" for restrictive and nonrestrictive clauses?',
    options: [
      { letter: 'A', text: 'The proposal, that was submitted yesterday, has been approved.' },
      { letter: 'B', text: 'The proposal which was submitted yesterday has been approved.' },
      { letter: 'C', text: 'The proposal that was submitted yesterday has been approved.' },
      { letter: 'D', text: 'Either (B) or (C) is acceptable in all contexts.' }
    ],
    correctAnswer: 'C',
    explanation: 'In American English, "that" introduces restrictive clauses (essential to meaning, no commas); "which" introduces nonrestrictive clauses (additional info, with commas). (C) correctly uses "that" for a restrictive clause identifying which proposal. (A) incorrectly uses "that" with commas (nonrestrictive). (B) uses "which" without commas (acceptable in British English but not preferred in American formal writing).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'That vs. Which'
  }),
  addRating({
    id: 'hard-eng-259',
    question: 'A writer needs to create parallel structure across paragraphs. First paragraph ends: "Three factors contributed to the decline: reduced funding, staff turnover, and inadequate infrastructure." The next paragraph should begin:',
    options: [
      { letter: 'A', text: 'Reducing funding was the most significant factor because...' },
      { letter: 'B', text: 'Reduced funding proved most significant because...' },
      { letter: 'C', text: 'The reduction of funding had the most significant impact because...' },
      { letter: 'D', text: 'Funds were reduced significantly, which was the most important factor, because...' }
    ],
    correctAnswer: 'B',
    explanation: 'The list uses parallel structure: "reduced funding, staff turnover, and inadequate infrastructure" (past participle + noun, noun + noun, adjective + noun). (B) maintains this by echoing "Reduced funding" exactly. (A) shifts to gerund. (C) shifts to nominalization. (D) restructures entirely and is wordy.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Cross-Paragraph Parallelism'
  }),
  addRating({
    id: 'hard-eng-260',
    question: 'Which sentence correctly handles agreement with "number of"?',
    options: [
      { letter: 'A', text: 'A number of participants was unable to complete the survey.' },
      { letter: 'B', text: 'The number of participants were higher than expected.' },
      { letter: 'C', text: 'A number of participants were unable to complete the survey.' },
      { letter: 'D', text: 'A number of participant was unable to complete the survey.' }
    ],
    correctAnswer: 'C',
    explanation: '"A number of" takes a plural verb (emphasizes the individuals); "The number of" takes a singular verb (emphasizes the quantity). (C) correctly uses "A number of participants were" (plural). (A) incorrectly uses singular with "a number of." (B) incorrectly uses plural with "the number of." (D) has both agreement errors.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Number Of Agreement'
  }),
  addRating({
    id: 'hard-eng-261',
    question: 'A passage on philosophy of mind: "Functionalism defines mental states by their causal roles—pain is whatever plays the pain-role (caused by tissue damage, causing distress and avoidance behavior). This allows multiple realizability: silicon, neurons, or alien substrates could all realize pain if they play the right causal role. Block\'s \'China Brain\' objection imagines the population of China, connected by radio, simulating a brain\'s functional organization. If functionalism is correct, this system would be conscious—but intuitively it seems not. Defenders argue our intuitions about such exotic cases are unreliable." The China Brain argument challenges functionalism by:',
    options: [
      { letter: 'A', text: 'Showing that only neurons can realize minds' },
      { letter: 'B', text: 'Presenting a system that seems to satisfy functional criteria without consciousness' },
      { letter: 'C', text: 'Proving that causal roles are irrelevant to mind' },
      { letter: 'D', text: 'Demonstrating that multiple realizability is impossible' }
    ],
    correctAnswer: 'B',
    explanation: 'The China Brain "simulat[es] a brain\'s functional organization"—satisfying functional criteria. "If functionalism is correct, this system would be conscious—but intuitively it seems not." It satisfies criteria without seeming conscious (B). It doesn\'t show only neurons work (A). It challenges, not proves causal irrelevance (C). It assumes multiple realizability to make its point (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding China Brain Argument'
  }),
  addRating({
    id: 'hard-eng-262',
    question: 'A passage on social epistemology: "Standpoint epistemology argues that social position shapes knowledge—marginalized groups may have epistemic advantages for understanding power structures. Patricia Hill Collins developed the concept of \'outsider-within\': someone positioned inside dominant institutions while socially outside them may see contradictions invisible to insiders. This isn\'t automatic privilege but achieved through critical reflection on experience. Critics question whether oppression automatically produces insight and whether standpoint theory risks essentialism about group perspectives. Defenders distinguish standpoints (achieved through struggle) from perspectives (merely positions)." Standpoint epistemology claims that marginalized positions:',
    options: [
      { letter: 'A', text: 'Automatically produce superior knowledge' },
      { letter: 'B', text: 'Can offer epistemic advantages through critical reflection' },
      { letter: 'C', text: 'Have no relevance to knowledge production' },
      { letter: 'D', text: 'Guarantee identical perspectives within groups' }
    ],
    correctAnswer: 'B',
    explanation: 'Marginalized groups "may have epistemic advantages" but this "isn\'t automatic privilege but achieved through critical reflection." Advantages through reflection (B). Not automatic (A). Position is relevant (contradicting C). Defenders reject essentialism—standpoints aren\'t identical (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Standpoint Epistemology'
  }),
  addRating({
    id: 'hard-eng-263',
    question: 'A passage on philosophy of law: "Legal realism, associated with Oliver Wendell Holmes and the Yale school, held that law is not a system of rules but what judges actually do. \'The prophecies of what the courts will do in fact, and nothing more pretentious, are what I mean by the law.\' This descriptive project aimed to predict judicial decisions using social science, psychology, and policy analysis rather than doctrinal reasoning. The \'law in action\' differs from \'law on the books.\' Critics charged realism with confusing prediction with justification and eliminating law\'s normative dimension entirely." Legal realism defines law primarily as:',
    options: [
      { letter: 'A', text: 'A complete system of determinate rules' },
      { letter: 'B', text: 'What judges actually decide in practice' },
      { letter: 'C', text: 'What the law books prescribe' },
      { letter: 'D', text: 'Abstract normative principles' }
    ],
    correctAnswer: 'B',
    explanation: 'Holmes: "The prophecies of what the courts will do in fact...are what I mean by the law." Law is what judges do (B). It rejects law as a complete rule system (A). It distinguishes "law in action" from "law on the books" (C). Critics say it eliminates normative dimension (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Legal Realism'
  }),
  addRating({
    id: 'hard-eng-264',
    question: 'A passage on ethics: "Care ethics, developed by Carol Gilligan and Nel Noddings, challenged the justice-focused tradition from Kant to Rawls. Rather than abstract principles applied impartially, care ethics emphasizes particular relationships, emotional attunement, and response to concrete needs. The caring relationship is asymmetric—the cared-for receives while the carer gives. Critics worried that care ethics might reinforce gender stereotypes (women as naturally caring) or neglect justice\'s role in correcting oppressive care relationships. Defenders argue care and justice are complementary, not competing values." Care ethics differs from justice ethics by emphasizing:',
    options: [
      { letter: 'A', text: 'Abstract universal principles' },
      { letter: 'B', text: 'Impartial treatment of all persons' },
      { letter: 'C', text: 'Particular relationships and emotional attunement' },
      { letter: 'D', text: 'Strict rule-following over context' }
    ],
    correctAnswer: 'C',
    explanation: 'Care ethics emphasizes "particular relationships, emotional attunement, and response to concrete needs" rather than "abstract principles applied impartially." Particular relationships and emotion (C). It challenges abstract principles (A) and impartiality (B). It responds to context, not strict rules (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Care Ethics'
  }),
  addRating({
    id: 'hard-eng-265',
    question: 'A passage on economics: "Behavioral finance challenges efficient market hypothesis (EMH) with evidence of persistent anomalies: momentum (past winners continue winning), value premium (cheap stocks outperform), and calendar effects (January returns higher). EMH defenders argue these are risk premiums, data mining, or arbitraged away once discovered. Limits to arbitrage—short-sale constraints, noise trader risk, implementation costs—explain why mispricings persist even when identified. Shiller\'s volatility studies showed stock prices fluctuate far more than dividends warrant, suggesting excess volatility driven by investor psychology." Behavioral finance explains market anomalies through:',
    options: [
      { letter: 'A', text: 'Perfect investor rationality' },
      { letter: 'B', text: 'Immediate price correction to fundamentals' },
      { letter: 'C', text: 'Psychological biases and limits to arbitrage' },
      { letter: 'D', text: 'Efficient incorporation of all information' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage cites "investor psychology" and "limits to arbitrage—short-sale constraints, noise trader risk, implementation costs—explain why mispricings persist." Psychology and arbitrage limits (C). EMH assumes rationality and efficiency (A, B, D) which behavioral finance challenges.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Behavioral Finance'
  }),
  addRating({
    id: 'hard-eng-266',
    question: 'Which sentence correctly uses "insure," "ensure," and "assure"?',
    options: [
      { letter: 'A', text: 'I want to insure you that the project will be completed on time.' },
      { letter: 'B', text: 'Please ensure that all documents are insured against loss.' },
      { letter: 'C', text: 'We must assure the equipment against damage during transport.' },
      { letter: 'D', text: 'The policy will ensure the building, and I assure you it\'s comprehensive.' }
    ],
    correctAnswer: 'B',
    explanation: '"Assure" = promise/convince (a person). "Ensure" = make certain. "Insure" = provide insurance. (B) correctly uses "ensure" (make certain) for documents being ready and "insured" (insurance) against loss. (A) should be "assure you." (C) should be "insure" for equipment. (D) should be "insure the building."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Insure/Ensure/Assure'
  }),
  addRating({
    id: 'hard-eng-267',
    question: 'A historian writes: "The conflict originated in longstanding territorial disputes______political instability following the king\'s death______economic competition for trade routes______; together, these factors created conditions for war." Which punctuation pattern correctly handles this series of causes?',
    options: [
      { letter: 'A', text: ': ... , ... ,' },
      { letter: 'B', text: ': ... , ... , and' },
      { letter: 'C', text: ': ... ; ... ;' },
      { letter: 'D', text: ': ... ; ... ; and' }
    ],
    correctAnswer: 'B',
    explanation: 'After the introductory clause with colon, a series follows. Since the items don\'t contain internal commas, regular commas separate them. The series needs "and" before the final item for standard listing format. (B) correctly uses colon, commas between items, and "and" before the last item.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Series After Colon'
  }),
  addRating({
    id: 'hard-eng-268',
    question: 'Which revision most effectively converts passive voice to active voice while maintaining formal register? Original: "It was determined by the committee that additional funding would be required."',
    options: [
      { letter: 'A', text: 'The committee determined that additional funding would be required.' },
      { letter: 'B', text: 'The committee figured out they need more money.' },
      { letter: 'C', text: 'Additional funding was needed, the committee determined.' },
      { letter: 'D', text: 'Someone on the committee determined the need for additional funding.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) converts to active voice ("The committee determined") while maintaining formal register with "additional funding would be required." (B) is too informal ("figured out," "more money"). (C) retains passive in the first clause. (D) introduces vague "someone" unnecessarily.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Active Voice Conversion'
  }),
  addRating({
    id: 'hard-eng-269',
    question: 'Identify the sentence with correct use of "whether" versus "if":',
    options: [
      { letter: 'A', text: 'The question is if the policy will be implemented.' },
      { letter: 'B', text: 'She asked whether or not we would attend.' },
      { letter: 'C', text: 'If the results are positive or negative remains unclear.' },
      { letter: 'D', text: 'I don\'t know if to proceed or wait.' }
    ],
    correctAnswer: 'B',
    explanation: '"Whether" introduces alternatives or indirect questions; "if" introduces conditions. (B) correctly uses "whether or not" for alternatives. (A) should be "whether" (indirect question following "the question is"). (C) should be "whether" (subject of "remains"). (D) should be "whether" before infinitive ("whether to proceed").',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Whether vs. If'
  }),
  addRating({
    id: 'hard-eng-270',
    question: 'A researcher writes: "These findings have important implications. First, they suggest revisions to current theory. ________, they indicate new directions for intervention design. Third, they highlight the need for longitudinal research." Which word best fills the blank?',
    options: [
      { letter: 'A', text: 'However' },
      { letter: 'B', text: 'Therefore' },
      { letter: 'C', text: 'Second' },
      { letter: 'D', text: 'Finally' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage uses enumeration: "First...______...Third." Parallel structure requires "Second" (C) to maintain the sequence. "However" (A) indicates contrast. "Therefore" (B) indicates consequence. "Finally" (D) would come at the end, not between first and third.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Enumeration Transitions'
  }),
  addRating({
    id: 'hard-eng-271',
    question: 'A passage on philosophy of religion: "The problem of divine hiddenness, articulated by J.L. Schellenberg, argues that if a loving God exists, God would ensure that everyone capable of relationship with God would believe. Yet reasonable nonbelief exists—people who sincerely seek God without finding. Therefore, no loving God exists. Responses include: God has reasons for hiddenness we cannot fathom; belief isn\'t necessary for relationship; or apparent nonbelief actually masks culpable resistance. The problem differs from the problem of evil by focusing on the absence of relationship rather than the presence of suffering." The divine hiddenness argument\'s key premise is that:',
    options: [
      { letter: 'A', text: 'All nonbelievers are culpably resistant' },
      { letter: 'B', text: 'A loving God would ensure believers in all who can relate' },
      { letter: 'C', text: 'No one sincerely seeks God' },
      { letter: 'D', text: 'Suffering disproves God\'s existence' }
    ],
    correctAnswer: 'B',
    explanation: 'The argument holds that "if a loving God exists, God would ensure that everyone capable of relationship with God would believe." This is the key premise (B). The argument assumes reasonable nonbelief exists, contradicting (A) and (C). The hiddenness problem differs from the problem of evil/suffering (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Divine Hiddenness'
  }),
  addRating({
    id: 'hard-eng-272',
    question: 'A passage on political philosophy: "Iris Marion Young\'s conception of justice as overcoming oppression identified five faces: exploitation, marginalization, powerlessness, cultural imperialism, and violence. Exploitation transfers the fruits of one group\'s labor to another. Marginalization excludes groups from useful social participation. Powerlessness lacks authority over one\'s work. Cultural imperialism universalizes the dominant group\'s experience as the norm. Violence includes not just physical attacks but the social context that makes them possible. This structural understanding shifts focus from distribution to social relations and group position." Young identifies oppression through:',
    options: [
      { letter: 'A', text: 'Only economic exploitation' },
      { letter: 'B', text: 'Five interconnected structural faces' },
      { letter: 'C', text: 'Individual prejudice alone' },
      { letter: 'D', text: 'Purely distributive inequality' }
    ],
    correctAnswer: 'B',
    explanation: 'Young "identified five faces: exploitation, marginalization, powerlessness, cultural imperialism, and violence." Five interconnected structural faces (B). Not only exploitation (A). It\'s structural, not just individual prejudice (C). It "shifts focus from distribution to social relations" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Five Faces of Oppression'
  }),
  addRating({
    id: 'hard-eng-273',
    question: 'A passage on philosophy of language: "Ruth Millikan\'s teleosemantics grounds meaning in evolutionary function. A representation\'s content is determined by what it is supposed to represent—the condition its production was naturally selected to correlate with. A frog\'s fly-detector represents flies because detecting flies (not black dots) explained the detector\'s selection. This naturalistic account faces the \'swampman\' problem: an atom-for-atom duplicate of you, arising by chance, would lack evolutionary history yet seemingly have thoughts with content. Defenders argue swampman would gradually acquire content through new selectional history." Millikan\'s teleosemantics defines meaning through:',
    options: [
      { letter: 'A', text: 'Social convention alone' },
      { letter: 'B', text: 'Evolutionary function and selection history' },
      { letter: 'C', text: 'Introspective access to content' },
      { letter: 'D', text: 'Arbitrary assignment by speakers' }
    ],
    correctAnswer: 'B',
    explanation: 'Teleosemantics "grounds meaning in evolutionary function"—content "is determined by...what its production was naturally selected to correlate with." Evolutionary function and selection (B). Not social convention (A). Not introspection (C). Not arbitrary (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Teleosemantics'
  }),
  addRating({
    id: 'hard-eng-274',
    question: 'A passage on ethics of technology: "Langdon Winner\'s \'Do Artifacts Have Politics?\' argued that technologies can embody political values. Robert Moses allegedly designed Long Island parkway overpasses too low for buses, excluding poor and minority bus-riders from beaches. Whether or not this story is historically accurate, it illustrates how built environments can entrench exclusion. Technologies are not neutral tools awaiting human use; they configure possibilities, favoring some interests over others. STS scholars have extended this analysis to algorithms, platforms, and digital architectures that embed values in their design." Winner argues that technologies:',
    options: [
      { letter: 'A', text: 'Are always neutral tools' },
      { letter: 'B', text: 'Can embed political values in their design' },
      { letter: 'C', text: 'Have no social effects' },
      { letter: 'D', text: 'Determine outcomes completely regardless of use' }
    ],
    correctAnswer: 'B',
    explanation: 'Winner argued "technologies can embody political values"—they "configure possibilities, favoring some interests over others." Embedded political values (B). Technologies are "not neutral tools" (A). They have social effects (contradicting C). They configure possibilities but don\'t completely determine (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Politics of Artifacts'
  }),
  addRating({
    id: 'hard-eng-275',
    question: 'A passage on moral psychology: "Peter Singer\'s expanding circle hypothesis suggests moral concern has historically expanded from kin to tribe to nation to humanity, and possibly to sentient animals. This expansion reflects increasing capacity for abstraction and empathy. However, Greene\'s dual-process account suggests our tribal moral intuitions (System 1) resist such expansion, which requires effortful reasoning (System 2). The tension between intuitive in-group favoritism and reasoned impartiality explains persistent ethical disagreements—we\'re wired for tribalism but capable of recognizing its moral limitations." The "expanding circle" faces psychological resistance from:',
    options: [
      { letter: 'A', text: 'Excessive use of System 2 reasoning' },
      { letter: 'B', text: 'Intuitive in-group favoritism' },
      { letter: 'C', text: 'Complete absence of empathy' },
      { letter: 'D', text: 'Universal agreement on moral scope' }
    ],
    correctAnswer: 'B',
    explanation: '"Our tribal moral intuitions (System 1) resist such expansion"—we\'re "wired for tribalism." Intuitive in-group favoritism (B). Expansion requires System 2, not resistance from it (A). We have capacity for empathy (contradicting C). There are "persistent ethical disagreements" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Moral Circle Expansion'
  }),
  addRating({
    id: 'hard-eng-276',
    question: 'Which sentence demonstrates correct subject-verb agreement with complex subjects?',
    options: [
      { letter: 'A', text: 'Neither the primary investigator nor the research assistants was available.' },
      { letter: 'B', text: 'Neither the primary investigator nor the research assistants were available.' },
      { letter: 'C', text: 'Neither the research assistants nor the primary investigator were available.' },
      { letter: 'D', text: 'Both (B) and (C) are correct.' }
    ],
    correctAnswer: 'B',
    explanation: 'With "neither...nor," the verb agrees with the nearer subject. In (B), "assistants" (plural) is nearer, so "were" is correct. In (A), "assistants" is nearer but "was" is singular—incorrect. In (C), "investigator" (singular) is nearer, so "were" is incorrect—should be "was." Only (B) is correct.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Neither/Nor Agreement'
  }),
  addRating({
    id: 'hard-eng-277',
    question: 'A writer needs to introduce a qualification. Original claim: "The intervention proved effective." Which revision most precisely qualifies this claim?',
    options: [
      { letter: 'A', text: 'The intervention proved somewhat effective.' },
      { letter: 'B', text: 'The intervention proved effective for participants with moderate symptoms in short-term follow-up.' },
      { letter: 'C', text: 'The intervention kind of proved effective.' },
      { letter: 'D', text: 'The intervention proved effective or something.' }
    ],
    correctAnswer: 'B',
    explanation: '(B) provides precise qualification by specifying conditions (moderate symptoms, short-term follow-up), which is most useful for accurate scientific communication. (A) adds vague qualification ("somewhat"). (C) is too informal ("kind of"). (D) is vague and inappropriate ("or something").',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Precise Qualification'
  }),
  addRating({
    id: 'hard-eng-278',
    question: 'Which sentence correctly handles possessives with gerunds?',
    options: [
      { letter: 'A', text: 'I appreciate you helping with the project.' },
      { letter: 'B', text: 'I appreciate your helping with the project.' },
      { letter: 'C', text: 'The committee approved of him resigning.' },
      { letter: 'D', text: 'Both (A) and (B) are acceptable in modern usage.' }
    ],
    correctAnswer: 'D',
    explanation: 'Traditional grammar requires possessive before gerund: "your helping," "his resigning." However, modern usage accepts objective case ("you helping," "him resigning"), especially in speech. Both (A) and (B) are now acceptable, with (B) preferred in formal writing. (C) should be "his resigning" in formal contexts.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Possessives with Gerunds'
  }),
  addRating({
    id: 'hard-eng-279',
    question: 'A researcher writes: "The analysis revealed significant differences between groups (p < .001)____however, the effect size was modest (d = 0.3)____suggesting limited practical significance despite statistical significance." Which punctuation pattern is correct?',
    options: [
      { letter: 'A', text: '; ... , ...' },
      { letter: 'B', text: '. However, ... , ...' },
      { letter: 'C', text: ', ... , ...' },
      { letter: 'D', text: 'Both (A) and (B) are correct.' }
    ],
    correctAnswer: 'D',
    explanation: '"However" can begin a new sentence after a period (B) or follow a semicolon with comma after it (A). Both correctly signal the contrastive relationship between statistical and practical significance. (C) creates a comma splice—"however" joining independent clauses needs semicolon or period.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Punctuating However'
  }),
  addRating({
    id: 'hard-eng-280',
    question: 'Which revision most effectively eliminates redundancy? Original: "The basic fundamentals of the methodology were explained in advance beforehand."',
    options: [
      { letter: 'A', text: 'The basic fundamentals of the methodology were explained beforehand.' },
      { letter: 'B', text: 'The fundamentals of the methodology were explained in advance.' },
      { letter: 'C', text: 'The fundamentals of the methodology were explained beforehand.' },
      { letter: 'D', text: 'The methodology\'s basic fundamentals were explained in advance beforehand.' }
    ],
    correctAnswer: 'C',
    explanation: 'The original has three redundancies: "basic fundamentals" (fundamentals are basic by definition), and "in advance beforehand" (same meaning). (C) eliminates all redundancy: just "fundamentals" and just "beforehand." (A) keeps "basic fundamentals." (B) keeps "basic fundamentals." (D) keeps both redundancies.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Eliminating Redundancy'
  }),
  addRating({
    id: 'hard-eng-281',
    question: 'A passage on philosophy of science: "Bas van Fraassen\'s constructive empiricism rejects scientific realism\'s claim that we should believe our best theories are true. Instead, science aims for empirical adequacy—theories should \'save the phenomena\' without committing to unobservable entities like electrons or quarks. We can accept theories as empirically adequate without believing in unobservables. Observable/unobservable is not a metaphysical but a pragmatic distinction determined by our perceptual capacities. Critics argue this distinction is arbitrary and that inference to the best explanation equally supports unobservables." Constructive empiricism claims that science aims for:',
    options: [
      { letter: 'A', text: 'True descriptions of unobservable reality' },
      { letter: 'B', text: 'Empirical adequacy without commitment to unobservables' },
      { letter: 'C', text: 'Rejection of all theoretical entities' },
      { letter: 'D', text: 'Pure observation without theory' }
    ],
    correctAnswer: 'B',
    explanation: 'Van Fraassen\'s view holds "science aims for empirical adequacy—theories should \'save the phenomena\' without committing to unobservable entities." Adequacy without unobservable commitment (B). Not true description of unobservables (A—that\'s realism). Not rejection of all entities—we can "accept" theories (C). Theory is allowed; commitment isn\'t required (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Constructive Empiricism'
  }),
  addRating({
    id: 'hard-eng-282',
    question: 'A passage on social theory: "Ulrich Beck\'s \'risk society\' thesis argued that industrial modernity produces not only goods but \'bads\'—risks like nuclear accidents, climate change, and toxic contamination that transcend class and national boundaries. Unlike old dangers (famine, plague), modern risks are manufactured, invisible, and require expert interpretation. Risk distribution becomes as politically significant as wealth distribution. Reflexive modernization means modernity confronting its own consequences, unable to rely on the institutions (science, state) that produced the risks to solve them. We live with manufactured uncertainties requiring new forms of governance." Beck argues that modern risks differ from old dangers in being:',
    options: [
      { letter: 'A', text: 'Contained within national boundaries' },
      { letter: 'B', text: 'Visible and directly perceptible' },
      { letter: 'C', text: 'Manufactured, invisible, and requiring expert interpretation' },
      { letter: 'D', text: 'Distributed strictly by social class' }
    ],
    correctAnswer: 'C',
    explanation: '"Modern risks are manufactured, invisible, and require expert interpretation" unlike "old dangers (famine, plague)." Manufactured, invisible, expert-dependent (C). They "transcend...national boundaries" (contradicting A). They\'re invisible (contradicting B). They "transcend class" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Risk Society'
  }),
  addRating({
    id: 'hard-eng-283',
    question: 'A passage on metaethics: "Moral expressivism, advanced by A.J. Ayer and later Simon Blackburn, holds that moral judgments express attitudes rather than describe facts. \'Murder is wrong\' expresses disapproval of murder, like saying \'Boo to murder!\' This avoids metaphysical puzzles about moral facts while explaining moral motivation—attitudes inherently motivate action. The Frege-Geach problem challenges expressivism: in \'If murder is wrong, then helping murderers is wrong,\' the antecedent expresses no attitude yet must mean the same as when asserted. Blackburn\'s \'quasi-realism\' attempts to earn realist-sounding talk for expressivism." Expressivism claims that moral statements:',
    options: [
      { letter: 'A', text: 'Describe objective moral facts' },
      { letter: 'B', text: 'Express attitudes rather than state facts' },
      { letter: 'C', text: 'Are always true' },
      { letter: 'D', text: 'Have no connection to motivation' }
    ],
    correctAnswer: 'B',
    explanation: 'Expressivism "holds that moral judgments express attitudes rather than describe facts." Attitudes, not facts (B). It contrasts with describing facts (A). Moral claims can conflict, so not always true (C). Expressivism explains motivation—"attitudes inherently motivate action" (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Moral Expressivism'
  }),
  addRating({
    id: 'hard-eng-284',
    question: 'A passage on philosophy of mathematics: "Platonism holds that mathematical objects exist independently of human minds or languages—numbers, sets, and functions are abstract entities we discover, not invent. This explains mathematics\' objectivity and applicability to physical reality. However, the epistemological problem arises: how can we have knowledge of acausal, non-spatiotemporal entities? We cannot perceive or interact with them. Gödel proposed mathematical intuition; others appeal to indispensability arguments—mathematics is indispensable to our best science, so its objects exist. Anti-platonists seek to explain mathematical practice without commitment to abstract objects." The epistemological problem for Platonism concerns:',
    options: [
      { letter: 'A', text: 'Whether mathematical statements are true' },
      { letter: 'B', text: 'How we can know entities we cannot perceive' },
      { letter: 'C', text: 'Whether mathematics applies to physics' },
      { letter: 'D', text: 'Whether mathematicians exist' }
    ],
    correctAnswer: 'B',
    explanation: 'The problem is: "how can we have knowledge of acausal, non-spatiotemporal entities? We cannot perceive or interact with them." Knowledge of imperceptible entities (B). Platonism assumes mathematical statements are true (A isn\'t the problem). Applicability is something Platonism explains (C). Mathematicians\' existence isn\'t questioned (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Mathematical Platonism'
  }),
  addRating({
    id: 'hard-eng-285',
    question: 'A passage on bioethics: "The precautionary principle holds that when an action raises threats of harm, precautionary measures should be taken even without full scientific certainty about the harm. Strong versions require proof of safety before proceeding; weak versions merely shift the burden of proof. Critics argue the principle is incoherent—precaution against innovation may itself cause harm (e.g., delaying beneficial technologies). Defenders argue it addresses situations of uncertainty where traditional risk assessment fails, particularly for irreversible or catastrophic potential harms." The precautionary principle advocates:',
    options: [
      { letter: 'A', text: 'Waiting for certainty before any action' },
      { letter: 'B', text: 'Ignoring uncertain threats entirely' },
      { letter: 'C', text: 'Taking protective measures despite uncertainty about harm' },
      { letter: 'D', text: 'Maximizing innovation regardless of risk' }
    ],
    correctAnswer: 'C',
    explanation: 'The principle holds "precautionary measures should be taken even without full scientific certainty about the harm." Action despite uncertainty (C). It doesn\'t require waiting for certainty (A)—that\'s what it rejects. It addresses uncertain threats rather than ignoring them (B). It may restrict innovation for precaution (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Precautionary Principle'
  }),
  addRating({
    id: 'hard-eng-286',
    question: 'Which sentence demonstrates correct use of the present perfect tense for ongoing relevance?',
    options: [
      { letter: 'A', text: 'The researchers published their findings in 2019.' },
      { letter: 'B', text: 'The researchers have published their findings in 2019.' },
      { letter: 'C', text: 'The researchers have published findings that challenge conventional wisdom.' },
      { letter: 'D', text: 'The researchers published findings that have challenged conventional wisdom since 2019.' }
    ],
    correctAnswer: 'C',
    explanation: 'Present perfect ("have published") signals past action with current relevance; it doesn\'t take specific past time markers. (C) correctly uses present perfect for ongoing relevance (findings still matter). (A) correctly uses simple past with specific date. (B) incorrectly combines present perfect with specific past date. (D) awkwardly mixes tenses.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Present Perfect for Relevance'
  }),
  addRating({
    id: 'hard-eng-287',
    question: 'A researcher writes: "This limitation notwithstanding, the study provides valuable insights______the findings suggest several directions for future research______we recommend replication with larger samples." Which punctuation pattern correctly handles these related but independent statements?',
    options: [
      { letter: 'A', text: '. ... . ...' },
      { letter: 'B', text: ': ... ; ...' },
      { letter: 'C', text: '; ... ; ...' },
      { letter: 'D', text: 'All of the above could work depending on the relationship emphasis.' }
    ],
    correctAnswer: 'D',
    explanation: 'All three patterns can work: (A) treats each as a separate sentence for maximum independence. (B) uses a colon after the first clause to introduce related points, then semicolon. (C) uses semicolons to show close relationship while maintaining independence. The choice depends on how tightly the writer wants to connect the ideas.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Punctuation for Sentence Relationships'
  }),
  addRating({
    id: 'hard-eng-288',
    question: 'Which revision most effectively converts nominalization to verbal style? Original: "The implementation of the new policy by the administration resulted in the improvement of efficiency."',
    options: [
      { letter: 'A', text: 'When the administration implemented the new policy, efficiency improved.' },
      { letter: 'B', text: 'The administration\'s implementation of the new policy resulted in improved efficiency.' },
      { letter: 'C', text: 'Implementation of the new policy by administration resulted in efficiency improvement.' },
      { letter: 'D', text: 'There was implementation of the new policy which resulted in efficiency improvement.' }
    ],
    correctAnswer: 'A',
    explanation: '(A) converts nominalizations to verbs: "implementation" → "implemented," "improvement" → "improved." This creates more direct, vigorous prose. (B) keeps "implementation" as noun. (C) and (D) retain nominalizations and are wordier.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Converting Nominalizations'
  }),
  addRating({
    id: 'hard-eng-289',
    question: 'Identify the sentence that correctly handles subject-verb agreement with intervening phrases:',
    options: [
      { letter: 'A', text: 'The quality of the results, despite several methodological concerns, were impressive.' },
      { letter: 'B', text: 'The results of the study, including preliminary findings, suggests further investigation.' },
      { letter: 'C', text: 'The collection of artifacts, along with supporting documents, was donated to the museum.' },
      { letter: 'D', text: 'The data from multiple sources indicates a clear trend.' }
    ],
    correctAnswer: 'C',
    explanation: 'The subject, not intervening phrases, determines verb agreement. (C) correctly uses singular "was" with singular subject "collection" ("along with supporting documents" is additional, not compound subject). (A) should be "was" (subject is "quality"). (B) should be "suggest" (subject is "results"). (D) may be correct depending on whether "data" is treated as singular or plural—disputed.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Agreement with Intervening Phrases'
  }),
  addRating({
    id: 'hard-eng-290',
    question: 'A writer needs to create a logical flow between paragraphs. Previous paragraph ends: "These findings have important implications for clinical practice." Next paragraph should discuss limitations. Which opening most effectively transitions?',
    options: [
      { letter: 'A', text: 'The study had several limitations.' },
      { letter: 'B', text: 'Limitations existed in the study.' },
      { letter: 'C', text: 'These implications should be considered in light of several methodological limitations.' },
      { letter: 'D', text: 'However, limitations of the study should be noted.' }
    ],
    correctAnswer: 'C',
    explanation: '(C) most effectively bridges paragraphs by linking "implications" (from the previous paragraph) to "limitations" (the new topic), creating a smooth logical transition. (A) and (B) start abruptly without connection. (D) makes a connection but less elegantly than (C).',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Paragraph Transitions'
  }),
  addRating({
    id: 'hard-eng-291',
    question: 'A passage on philosophy of history: "The covering law model, developed by Carl Hempel, held that historical explanation has the same structure as scientific explanation: an event is explained by subsuming it under a general law plus initial conditions. The French Revolution occurred because of general laws about revolution plus specific French conditions. Critics objected that history lacks such laws; human actions require interpretive understanding (Verstehen) rather than causal explanation. William Dray proposed \'rational explanation\'—showing an action was the rational thing to do given the agent\'s beliefs and goals, without invoking covering laws." The covering law model claims that historical explanation:',
    options: [
      { letter: 'A', text: 'Requires no general laws' },
      { letter: 'B', text: 'Differs fundamentally from scientific explanation' },
      { letter: 'C', text: 'Works by subsuming events under general laws' },
      { letter: 'D', text: 'Cannot explain unique events' }
    ],
    correctAnswer: 'C',
    explanation: 'The model holds "an event is explained by subsuming it under a general law plus initial conditions." Subsumption under laws (C). It requires general laws (contradicting A). It claims history has "the same structure as scientific explanation" (contradicting B). It aims to explain events (contradicting D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Covering Law Model'
  }),
  addRating({
    id: 'hard-eng-292',
    question: 'A passage on political economy: "Dani Rodrik\'s \'trilemma\' argues that countries cannot simultaneously have deep economic integration (globalization), national sovereignty, and democratic politics—only two of three. Deep integration requires harmonizing regulations, constraining domestic policy. Sovereignty allows national variation but conflicts with integration. Democracy demands responsiveness to citizens, who may reject both integration and sovereignty-limiting arrangements. The EU chose integration and limited sovereignty; the Bretton Woods era chose democracy and limited integration. Pure globalization would require sacrificing either sovereignty or democracy." Rodrik\'s trilemma holds that nations must sacrifice:',
    options: [
      { letter: 'A', text: 'Nothing—all three goals are achievable' },
      { letter: 'B', text: 'At least one of globalization, sovereignty, or democracy' },
      { letter: 'C', text: 'Both sovereignty and democracy for globalization' },
      { letter: 'D', text: 'Only economic integration' }
    ],
    correctAnswer: 'B',
    explanation: 'Nations "cannot simultaneously have" all three—"only two of three." One must be sacrificed (B). Not all achievable (A). Different choices sacrifice different ones (C is just one option). Various elements can be sacrificed (not only integration, D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Globalization Trilemma'
  }),
  addRating({
    id: 'hard-eng-293',
    question: 'A passage on philosophy of action: "Harry Frankfurt distinguished first-order desires (wanting things) from second-order desires (wanting to want things). A drug addict may want the drug (first-order) while wishing they didn\'t want it (second-order). Freedom of will consists in the capacity to make one\'s first-order desires conform to one\'s second-order volitions—wanting what one wants to want. Persons, unlike mere animals, can reflect on and evaluate their own desires. Weakness of will occurs when first-order desires triumph despite conflicting second-order volitions. The hierarchical structure of desire constitutes personhood." Frankfurt defines free will as:',
    options: [
      { letter: 'A', text: 'Acting on first-order desires' },
      { letter: 'B', text: 'Alignment between first-order desires and second-order volitions' },
      { letter: 'C', text: 'Having no desires at all' },
      { letter: 'D', text: 'Being determined by external causes' }
    ],
    correctAnswer: 'B',
    explanation: 'Free will is "the capacity to make one\'s first-order desires conform to one\'s second-order volitions—wanting what one wants to want." Alignment between levels (B). Not just acting on first-order desires (A—the addict does that). Not absence of desire (C). Not external determination (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Hierarchical Desire Theory'
  }),
  addRating({
    id: 'hard-eng-294',
    question: 'A passage on philosophy of biology: "The units of selection debate asks at what level natural selection operates. Gene selectionists (Dawkins) argue genes are the ultimate replicators; organisms are vehicles. Multilevel selection theorists argue selection can occur at gene, organism, group, and possibly species levels simultaneously. D.S. Wilson revived group selection, arguing that groups with more cooperators outcompete groups of defectors, even if defectors outcompete cooperators within groups. The debate has implications for understanding altruism: gene-level explanations invoke kin selection; group-level explanations invoke group benefit directly." The units of selection debate concerns:',
    options: [
      { letter: 'A', text: 'Whether evolution occurs' },
      { letter: 'B', text: 'At what level natural selection operates' },
      { letter: 'C', text: 'Whether genes exist' },
      { letter: 'D', text: 'How organisms develop' }
    ],
    correctAnswer: 'B',
    explanation: 'The debate "asks at what level natural selection operates"—genes, organisms, groups, or species. Level of selection (B). Not whether evolution occurs (A). Not whether genes exist (C). Not development (D—that\'s a different topic).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Units of Selection'
  }),
  addRating({
    id: 'hard-eng-295',
    question: 'A passage on philosophy of law: "Joseph Raz\'s service conception of authority holds that authorities are legitimate when following their directives better enables subjects to comply with the reasons that already apply to them. The normal justification thesis: authority is justified if the subject would likely better conform to reasons by accepting the authority\'s directives than by trying to follow reasons directly. A doctor\'s authority on health is legitimate because patients comply better with health-related reasons by following medical advice. This instrumental view grounds authority in expertise and judgment, not mere power or consent." Raz\'s view grounds legitimate authority in:',
    options: [
      { letter: 'A', text: 'Mere power over subjects' },
      { letter: 'B', text: 'Better enabling subjects to follow applicable reasons' },
      { letter: 'C', text: 'Democratic consent alone' },
      { letter: 'D', text: 'Traditional custom' }
    ],
    correctAnswer: 'B',
    explanation: 'Authority is legitimate "when following their directives better enables subjects to comply with the reasons that already apply to them." Better reason-following (B). Not mere power (A—explicitly rejected). Not consent alone (C). Not tradition (D).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Understanding Service Conception of Authority'
  }),
  addRating({
    id: 'hard-eng-296',
    question: 'Which sentence correctly uses "whom" in a relative clause?',
    options: [
      { letter: 'A', text: 'The researcher whom we interviewed provided valuable insights.' },
      { letter: 'B', text: 'The researcher whom conducted the study has retired.' },
      { letter: 'C', text: 'The researcher whom the study was conducted by has retired.' },
      { letter: 'D', text: 'Both (A) and (C) are correct.' }
    ],
    correctAnswer: 'D',
    explanation: '"Whom" is objective case, used when the relative pronoun receives action. (A) is correct: "we interviewed whom" (whom is object of interviewed). (C) is correct though awkward: "whom" is object of "by." (B) is incorrect: "whom conducted" has whom as subject—should be "who."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Whom in Relative Clauses'
  }),
  addRating({
    id: 'hard-eng-297',
    question: 'A writer needs to express conditionality. Which sentence correctly uses the subjunctive for hypothetical conditions?',
    options: [
      { letter: 'A', text: 'If the sample size was larger, the results would be more reliable.' },
      { letter: 'B', text: 'If the sample size were larger, the results would be more reliable.' },
      { letter: 'C', text: 'If the sample size would be larger, the results were more reliable.' },
      { letter: 'D', text: 'If the sample size is larger, the results would be more reliable.' }
    ],
    correctAnswer: 'B',
    explanation: 'Hypothetical/contrary-to-fact conditions use subjunctive "were" (not "was") with all subjects. (B) correctly uses "If...were...would be" for a hypothetical. (A) uses indicative "was" instead of subjunctive. (C) incorrectly puts "would" in the if-clause. (D) mixes indicative present with conditional "would."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Subjunctive in Conditionals'
  }),
  addRating({
    id: 'hard-eng-298',
    question: 'Which sentence most effectively uses a periodic structure for emphasis?',
    options: [
      { letter: 'A', text: 'The experiment succeeded despite limited funding, skeptical reviewers, and equipment failures.' },
      { letter: 'B', text: 'Despite limited funding, skeptical reviewers, and equipment failures, the experiment succeeded.' },
      { letter: 'C', text: 'The experiment, despite limited funding, skeptical reviewers, and equipment failures, succeeded.' },
      { letter: 'D', text: 'Limited funding, skeptical reviewers, and equipment failures did not prevent the experiment from succeeding.' }
    ],
    correctAnswer: 'B',
    explanation: 'Periodic sentences delay the main clause until the end, building suspense. (B) builds through the obstacles ("Despite...") before delivering the climactic resolution ("the experiment succeeded"). This creates maximum emphasis on success. (A) and (D) are loose sentences. (C) interrupts the main clause.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Periodic Sentence Structure'
  }),
  addRating({
    id: 'hard-eng-299',
    question: 'A researcher writes: "The findings are consistent with previous research______they extend existing theory in important ways______they raise new questions for future investigation." Which structural approach most effectively presents these parallel points?',
    options: [
      { letter: 'A', text: '; ... ; ...' },
      { letter: 'B', text: ', ... , and ...' },
      { letter: 'C', text: ': first, ... ; second, ... ; third, ...' },
      { letter: 'D', text: 'All could work, but (C) provides clearest parallel structure.' }
    ],
    correctAnswer: 'D',
    explanation: 'While all options can connect the clauses, (C) with explicit enumeration ("first...second...third") most clearly signals parallel structure and equal importance of three contributions. This is especially effective in academic writing for clarity. (A) and (B) connect but don\'t explicitly parallel. (D) correctly notes (C) is clearest.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Explicit Parallelism'
  }),
  addRating({
    id: 'hard-eng-300',
    question: 'Which revision most effectively improves coherence by using a known-new information pattern? Original: "A novel technique was developed. The accuracy improved significantly with this technique. Better outcomes for patients resulted."',
    options: [
      { letter: 'A', text: 'A novel technique was developed that significantly improved accuracy, resulting in better outcomes for patients.' },
      { letter: 'B', text: 'Better outcomes for patients resulted from a novel technique that was developed and improved accuracy significantly.' },
      { letter: 'C', text: 'Significantly improved accuracy resulted from a novel technique, and better outcomes for patients were the result.' },
      { letter: 'D', text: 'Patients had better outcomes because accuracy improved significantly due to a novel technique being developed.' }
    ],
    correctAnswer: 'A',
    explanation: 'Known-new pattern: begin sentences with familiar information, end with new. (A) moves logically from known (technique) to new (improved accuracy) to newer (patient outcomes), creating smooth flow. Each new concept becomes the "known" foundation for the next. (B), (C), and (D) have less logical information flow.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Known-New Information Pattern'
  }),
  // Questions imported from SAT_Questions.docx
  addRating({
    id: 'sat-doc-001',
    question: 'Marta Coll and colleagues\' 2010 Mediterranean Sea biodiversity census reported approximately 17,000 species, nearly double the number reported in Carlo Bianchi and Carla Morri\'s 2000 census--a difference only partly attributable to the description of new invertebrate species in the interim. Another factor is that the morphological variability of microorganisms is poorly understood compared to that of vertebrates, invertebrates, plants, and algae, creating uncertainty about how to evaluate microorganisms as species. Researchers\' decisions on such matters therefore can be highly consequential. Indeed, the two censuses reported similar counts of vertebrate, plant, and algal species, suggesting that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Coll and colleagues reported a much higher number of species than Bianchi and Morri did largely due to the inclusion of invertebrate species that had not been described at the time of Bianchi and Morri\'s census.' },
      { letter: 'B', text: 'some differences observed in microorganisms may have been treated as variations within species by Bianchi and Morri but treated as indicative of distinct species by Coll and colleagues.' },
      { letter: 'C', text: 'Bianchi and Morri may have been less sensitive to the degree of morphological variation displayed within a typical species of microorganism than Coll and colleagues were.' },
      { letter: 'D', text: 'the absence of clarity regarding how to differentiate among species of microorganisms may have resulted in Coll and colleagues underestimating the number of microorganism species.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage states that vertebrate, plant, and algal counts were similar between censuses, but total counts nearly doubled. Since microorganism classification is uncertain, the difference likely comes from different decisions about whether microorganism variations represent distinct species. (B) captures this--same organisms, different classification decisions.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-002',
    question: 'Many literary theorists distinguish between fabula, a narrative\'s content, and syuzhet, a narrative\'s arrangement and presentation of events. In the film The Godfather Part II, the fabula is the story of the Corleone family, and the syuzhet is the presentation of the story as it alternates between two timelines in 1901 and 1958. But literary theorist Mikhail Bakhtin maintained that fabula and syuzhet are insufficient to completely describe a narrative--he held that systematic categorizations of artistic phenomena discount the subtle way in which meaning is created by interactions between the artist, the work, and the audience. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Literary theorist Mikhail Bakhtin argued that there are important characteristics of narratives that are not fully encompassed by two concepts that other theorists have used to analyze narratives.' },
      { letter: 'B', text: 'Literary theorist Mikhail Bakhtin claimed that meaning is not inherent in a narrative but is created when an audience encounters a narrative so that narratives are interpreted differently by different people.' },
      { letter: 'C', text: 'The storytelling methods used in The Godfather Part II may seem unusually complicated, but they can be easily understood when two concepts from literary theory are utilized.' },
      { letter: 'D', text: 'Narratives that are told out of chronological order are more difficult for audiences to understand than are narratives presented chronologically.' }
    ],
    correctAnswer: 'A',
    explanation: 'The main idea is that Bakhtin believed fabula and syuzhet are "insufficient" to fully describe narratives because they miss the interactions between artist, work, and audience. (A) captures this limitation. (B) overextends to relativism. (C) and (D) focus on The Godfather example rather than the main argument.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-003',
    question: 'Jean-Bernard Caron and colleagues recently discovered a cache of jellyfish fossils in the Burgess Shale, a site in the Canadian Rockies that is rich in fossils from the Cambrian period (over 500 million years ago). Caron and colleagues claim that these are the oldest jellyfish fossils ever discovered. In the past twenty years, two sites in China and the United States have yielded fossils of a similar age that some experts believe are most likely jellyfish due to their shapes and the appearance of projecting tentacles. But Caron and colleagues argue that the apparent tentacles are in fact the comb rows of ctenophores, gelatinous animals that are only distantly related to jellyfish. Which statement, if true, would most directly weaken the claim by Caron and colleagues about the fossils found in China and the United States?',
    options: [
      { letter: 'A', text: 'Sites in the Canadian Rockies from later periods than the Cambrian period have yielded fossils that have been conclusively identified as ctenophore fossils.' },
      { letter: 'B', text: 'The fossils found in China and the United States are so poorly preserved that though they cannot be conclusively identified as jellyfish, they cannot be conclusively identified as ctenophores either.' },
      { letter: 'C', text: 'While ctenophore fossils have been discovered in China and the United States, they have never been discovered in the Burgess Shale.' },
      { letter: 'D', text: 'The fossils discovered by Caron and colleagues in the Burgess Shale were better preserved than the fossils discovered by other researchers in China and the United States.' }
    ],
    correctAnswer: 'B',
    explanation: 'Caron claims the China/US fossils are ctenophores, not jellyfish. If (B) is true--the fossils are too poorly preserved to identify as either--then Caron\'s claim that they ARE ctenophores is weakened. The other choices don\'t directly challenge their identification claim.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-004',
    question: 'To understand how temperature change affects microorganism-mediated cycling of soil nutrients in alpine ecosystems, Eva Kaštovska et al. collected plant-soil cores in the Tatra Mountains at elevations around 2,100 meters and transplanted them to elevations of 1,700-1,800 meters, where the mean air temperature was warmer by 2 degrees C. Microorganism-mediated nutrient cycling was accelerated in the transplanted cores; crucially, microorganism community composition was unchanged, allowing Kaštovska et al. to attribute the acceleration to temperature-induced increases in microorganism activity. It can most reasonably be inferred from the text that the finding about the microorganism community composition was important for which reason?',
    options: [
      { letter: 'A', text: 'It provided preliminary evidence that microorganism-mediated nutrient cycling was accelerated in the transplanted cores.' },
      { letter: 'B', text: 'It suggested that temperature-induced changes in microorganism activity may be occurring at increasingly high elevations.' },
      { letter: 'C', text: 'It ruled out a potential alternative explanation for the acceleration in microorganism-mediated nutrient cycling.' },
      { letter: 'D', text: 'It clarified that microorganism activity levels in the plant-soil cores varied depending on which microorganisms comprised the community.' }
    ],
    correctAnswer: 'C',
    explanation: 'The unchanged community composition was "crucial" because it allowed researchers to attribute acceleration to temperature, not to different microorganisms. If the community had changed, acceleration might be due to different species, not temperature. (C) correctly identifies this as ruling out an alternative explanation.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-005',
    question: 'The most recent iteration of the immersive theater experience Sleep No More, which premiered in New York City in 2011, transforms its performance space--a five-story warehouse--into a 1930s-era hotel. Audience members, who wander through the labyrinthine venue at their own pace and follow the actors as they play out simultaneous, interweaving narrative loops, confront the impossibility of experiencing the production in its entirety. The play\'s refusal of narrative coherence thus hinges on the sense of spatial fragmentation that the venue\'s immense and intricate layout generates. What does the text most strongly suggest about Sleep No More\'s use of its performance space?',
    options: [
      { letter: 'A', text: 'The choice of a New York City venue likely enabled the play\'s creators to experiment with the use of theatrical space in a way that venues from earlier productions could not.' },
      { letter: 'B', text: 'Audience members likely find the experience of the play disappointing because they generally cannot make their way through the entire venue.' },
      { letter: 'C', text: 'The production\'s dependence on a particular performance environment would likely make it difficult to reproduce exactly in a different theatrical space.' },
      { letter: 'D', text: 'Audience members who navigate the space according to a recommended itinerary will likely have a better grasp of the play\'s narrative than audience members who depart from that itinerary.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage emphasizes that the play\'s "refusal of narrative coherence...hinges on...the venue\'s immense and intricate layout." This dependency on the specific space suggests reproducing it elsewhere would be difficult. (C) captures this spatial dependency.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-006',
    question: 'One recognized social norm of gift giving is that the time spent obtaining a gift will be viewed as a reflection of the gift\'s thoughtfulness. Marketing experts Farnoush Reshadi, Julian Givi, and Gopal Das addressed this view in their studies of norms specifically surrounding the giving of gift cards, noting that while recipients tend to view digital gift cards (which can be purchased online from anywhere and often can be redeemed online as well) as superior to physical gift cards (which sometimes must be purchased in person and may only be redeemable in person) in terms of usage, 94.8 percent of participants surveyed indicated that it is more socially acceptable to give a physical gift card to a recipient. This finding suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'gift givers likely overestimate the amount of effort required to use digital gift cards and thus mistakenly assume gift recipients will view them as less desirable than physical gift cards.' },
      { letter: 'B', text: 'physical gift cards are likely preferred by gift recipients because the tangible nature of those cards offers a greater psychological sense of ownership than digital gift cards do.' },
      { letter: 'C', text: 'physical gift cards are likely less desirable to gift recipients than digital gift cards are because of the perception that physical gift cards require unnecessary effort to obtain.' },
      { letter: 'D', text: 'gift givers likely perceive digital gift cards as requiring relatively low effort to obtain and thus wrongly assume gift recipients will appreciate them less than they do physical gift cards.' }
    ],
    correctAnswer: 'D',
    explanation: 'Recipients prefer digital cards for usage, yet givers think physical cards are more socially acceptable. This suggests givers associate digital cards with low effort (less thoughtful), leading them to assume recipients would appreciate them less--even though recipients actually prefer digital. (D) captures this gap between giver perception and recipient preference.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-007',
    question: 'The ancient Greek concept of "mimesis," a term used in the works of Plato, Aristotle, and other Greek philosophers in discussions of representational art--visual, performance, or literary art that aims to depict the real world--is a foundational concept of the Western philosophy of aesthetics. Mimesis is typically translated as "imitation" in modern editions of ancient Greek texts, but scholar Stephen Halliwell warns that this is overly reductive: "imitation" implies that art merely copies--and is thus by definition entirely derivative of--a reality that exists outside and prior to the work of art, and translating "mimesis" thusly obscures the multifaceted ways in which the ancient Greeks understood the relationship between art and reality. Which statement, if true, would most directly support the claim by Halliwell presented in the text?',
    options: [
      { letter: 'A', text: 'One of the earliest appearances of mimesis\'s root word, mimos, can be found in an ancient Greek tragedy in reference to dramatic impersonation, and the mim- root came to be generally associated with the musical and poetic arts by the fifth century BCE.' },
      { letter: 'B', text: 'Both Plato\'s and Aristotle\'s theorizations of mimesis examine the psychological effects that works of art induce in the viewer or listener.' },
      { letter: 'C', text: 'Although several of Plato\'s earliest philosophical works discuss aesthetic ideas, the term "mimesis" doesn\'t appear in Plato\'s discussions of art until Cratylus, a relatively late work.' },
      { letter: 'D', text: 'Although Plato\'s writings typically characterize representational art as an inferior reflection of the physical world, Aristotle suggests that mimesis can refer to art\'s capacity to envision hypothetical conditions that could, but don\'t yet, exist.' }
    ],
    correctAnswer: 'D',
    explanation: 'Halliwell argues "imitation" is reductive because it suggests mere copying. If Aristotle viewed mimesis as envisioning "hypothetical conditions that could, but don\'t yet, exist," this shows mimesis meant more than copying--it included creative imagination. (D) directly supports Halliwell\'s claim about multifaceted meanings.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-008',
    question: 'While attending school in New York City in the 1980s, Okwui Enwezor encountered few works by African artists in exhibitions, despite New York\'s reputation as one of the best places to view contemporary art from around the world. According to an arts journalist, later in his career as a renowned curator and art historian, Enwezor sought to remedy this deficiency, not by focusing solely on modern African artists, but by showing how their work fits into the larger context of global modern art and art history. Which finding, if true, would most directly support the journalist\'s claim?',
    options: [
      { letter: 'A', text: 'As curator of the Haus der Kunst in Munich, Germany, Enwezor organized a retrospective of Ghanaian sculptor El Anatsui\'s work entitled El Anatsui: Triumphant Scale, one of the largest art exhibitions devoted to a Black artist in Europe\'s history.' },
      { letter: 'B', text: 'In the exhibition Postwar: Art Between the Pacific and the Atlantic, 1945-1965, Enwezor and cocurator Katy Siegel brought works by African artists such as Malangatana Ngwenya together with pieces by major figures from other countries, like US artist Andy Warhol and Mexico\'s David Siqueiros.' },
      { letter: 'C', text: 'Enwezor\'s work as curator of the 2001 exhibition The Short Century: Independence and Liberation Movements in Africa, 1945-1994 showed how African movements for independence from European colonial powers following the Second World War profoundly influenced work by African artists of the period, such as Kamala Ibrahim Ishaq and Thomas Mukarobgwa.' },
      { letter: 'D', text: 'Art history courses in universities around the world increasingly feature works by African artists alongside works by European and American artists.' }
    ],
    correctAnswer: 'B',
    explanation: 'The claim is that Enwezor showed African art "fits into the larger context of global modern art" rather than focusing solely on African artists. (B) directly supports this--placing African artists alongside Warhol and Siqueiros integrates them into global art history context.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-009',
    question: 'Ancient Polynesian voyagers traveled to nearly every island in the Pacific Ocean over a period of roughly 2,600 years, arriving at the Hawaiian Islands around 1100 CE and at New Zealand around 1280 CE. The voyagers possessed detailed knowledge about wind and ocean currents and could read clouds and other natural signs to discern the location of islands before they became visible. The accomplishments of the early Polynesians served to inspire the Polynesian Voyaging Society (PVS), which has carried out voyages across the Pacific in a traditional Polynesian sailing canoe called the Hokule\'a. Such expeditions confirm that traditional techniques can be effective modes of navigation. Which finding, if true, would most directly undermine the stated conclusion of the passage?',
    options: [
      { letter: 'A', text: 'PVS crew members, despite training in traditional navigation, have consistently relied on modern instruments to correct course during actual voyages.' },
      { letter: 'B', text: 'The Hokule\'a voyages have attracted widespread public attention and increased interest in Polynesian cultural heritage.' },
      { letter: 'C', text: 'Many traditional navigation techniques used by ancient Polynesians were independently developed by other seafaring cultures.' },
      { letter: 'D', text: 'The Hokule\'a has traveled farther distances in shorter time periods than ancient Polynesian voyaging canoes typically did.' }
    ],
    correctAnswer: 'A',
    explanation: 'The conclusion is that PVS expeditions confirm traditional techniques are effective. If (A) is true--crews consistently used modern instruments to correct course--then the voyages don\'t actually demonstrate traditional techniques alone are effective. This undermines the conclusion.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-010',
    question: 'Policymakers in the United States have struggled for decades with the question of how best to regulate social media platforms. Advocates for strong regulations have emphasized harm to both individuals and society from social media, while skeptics note that such regulation poses serious challenges to constitutional protections of free speech. Professor Daphne Keller has observed that many regulatory proposals focus too narrowly on content takedowns without considering the equally important issue of content recommendations and amplification. This implies that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'current regulatory approaches may fail to address the full scope of how social media platforms can cause harm.' },
      { letter: 'B', text: 'content recommendation algorithms are more harmful than the content they promote.' },
      { letter: 'C', text: 'regulating content recommendations would raise fewer free speech concerns than regulating content takedowns.' },
      { letter: 'D', text: 'most social media platforms would prefer regulations focused on content takedowns rather than recommendations.' }
    ],
    correctAnswer: 'A',
    explanation: 'Keller observes regulations focus on takedowns without considering recommendations and amplification. This implies current approaches are incomplete--they miss an "equally important issue." (A) captures this: current approaches may fail to address the full scope of harm.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-011',
    question: 'A recent study of human trafficking patterns by criminologist Louise Shelley found that trafficking routes often overlap with legitimate migration and trade networks. Shelley argues that this overlap is not coincidental--traffickers deliberately exploit existing infrastructure, documentation procedures, and transportation links designed for legal purposes. By embedding their operations within legitimate systems, traffickers can avoid detection more easily and reduce operational costs. Which statement, if true, would most strongly support Shelley\'s argument?',
    options: [
      { letter: 'A', text: 'Most trafficking victims come from regions with high rates of legal emigration to destination countries.' },
      { letter: 'B', text: 'Trafficking networks have been found to use the same shipping companies and border crossings as legitimate businesses.' },
      { letter: 'C', text: 'Law enforcement agencies have increased their monitoring of legitimate trade routes in recent years.' },
      { letter: 'D', text: 'Some trafficking victims are initially recruited through offers of legitimate employment opportunities.' }
    ],
    correctAnswer: 'B',
    explanation: 'Shelley argues traffickers "exploit existing infrastructure" and "transportation links designed for legal purposes." If (B) is true--traffickers use the same shipping companies and border crossings as legitimate businesses--this directly shows deliberate exploitation of legitimate systems.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-012',
    question: 'Scientists studying bat echolocation have long known that bats emit ultrasonic calls and listen for echoes to navigate and find prey in complete darkness. Recent research by biologist Yossi Yovel has revealed that the social calls bats use to communicate with each other are far more complex than previously understood. Yovel\'s team recorded thousands of vocalizations from Egyptian fruit bats and used machine learning algorithms to decode their meanings. The research revealed that bats produce specific calls to address individual group members, argue over food, and maintain social relationships. What is the main purpose of mentioning bat echolocation in the first sentence?',
    options: [
      { letter: 'A', text: 'To establish that scientific understanding of bat vocalizations has been incomplete.' },
      { letter: 'B', text: 'To contrast a well-known function of bat vocalizations with newly discovered social functions.' },
      { letter: 'C', text: 'To explain the methodology Yovel\'s team used to study bat communication.' },
      { letter: 'D', text: 'To suggest that echolocation and social calls serve similar purposes for bats.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage begins with "long known" echolocation (well-known function) then pivots to "recent research" revealing complex social calls (newly discovered). This structure contrasts established knowledge with new discoveries. (B) captures this contrast.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Text Structure and Purpose'
  }),
  addRating({
    id: 'sat-doc-013',
    question: 'Linguist Deborah Tannen has cautioned against framing contentious issues in terms of two highly competitive perspectives, such as pro versus con. According to Tannen, this debate-driven approach can strip issues of their complexity and, when used in front of an audience, can be less informative than the presentation of multiple perspectives in a noncompetitive format. To test Tannen\'s hypothesis, students conducted a study in which they showed participants one of three different versions of local news commentary about the same issue. Each version featured a debate between two commentators with opposing views, a panel of three commentators with various views, or a single commentator. Which finding from the students\' study, if true, would most strongly support Tannen\'s hypothesis?',
    options: [
      { letter: 'A', text: 'On average, participants perceived commentators in the debate as more knowledgeable about the issue than commentators in the panel.' },
      { letter: 'B', text: 'On average, participants perceived commentators in the panel as more knowledgeable about the issue than the single commentator.' },
      { letter: 'C', text: 'On average, participants who watched the panel correctly answered more questions about the issue than those who watched the debate or the single commentator did.' },
      { letter: 'D', text: 'On average, participants who watched the single commentator correctly answered more questions about the issue than those who watched the debate did.' }
    ],
    correctAnswer: 'C',
    explanation: 'Tannen argues the debate format is "less informative than the presentation of multiple perspectives in a noncompetitive format." If panel viewers (multiple perspectives, noncompetitive) answered more questions correctly than debate or single-commentator viewers, this supports her hypothesis. (C) provides this evidence.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-014',
    question: 'In 1534 CE, King Henry VIII of England split with the Catholic Church and declared himself head of the Church of England, in part because Pope Clement VII refused to annul his marriage to Catherine of Aragon. Two years later, Henry VIII introduced a policy titled the Dissolution of the Monasteries that by 1540 had resulted in the closure of all Catholic monasteries in England and the confiscation of their estates. Some historians assert that the enactment of the policy was primarily motivated by perceived financial opportunities. Which quotation from a scholarly article best supports the assertion of the historians mentioned in the text?',
    options: [
      { letter: 'A', text: '"At the time of the Dissolution of the Monasteries, about 2 percent of the adult male population of England were monks; by 1690, the proportion of the adult male population who were monks was less than 1 percent."' },
      { letter: 'B', text: '"A contemporary description of the Dissolution of the Monasteries, Michael Sherbrook\'s Falle of the Religious Howses, recounts witness testimony that monks were allowed to keep the contents of their cells and that the monastery timber was purchased by local yeomen."' },
      { letter: 'C', text: '"In 1535, the year before enacting the Dissolution of the Monasteries, Henry commissioned a survey of the value of church holdings in England--the work, performed by sheriffs, bishops, and magistrates, began that January and was swiftly completed by the summer."' },
      { letter: 'D', text: '"The October 1536 revolt known as the Pilgrimage of Grace had several economic motives: high food prices due to a poor harvest the prior year; the Dissolution of the Monasteries, which closed reliable sources of food and shelter for many; and rents and taxes throughout Northern England that were not merely high but predatory."' }
    ],
    correctAnswer: 'C',
    explanation: 'The historians claim financial motivation. (C) shows Henry surveyed church holdings\' VALUE before the dissolution--suggesting he wanted to know what the monasteries were worth financially. This planning to assess value supports financial motivation.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-015',
    question: 'The following text is adapted from Countee Cullen\'s 1926 poem "Thoughts in a Zoo." They in their cruel traps, and we in ours, / Survey each other\'s rage, and pass the hours / Commiserating each the other\'s woe, / To mitigate his own pain\'s fiery glow. / Man could but little proffer in exchange / Save that his cages have a larger range. / That lion with his lordly, untamed heart / Has in some man his human counterpart, / Some lofty soul in dreams and visions wrapped, / But in the stifling flesh securely trapped. Based on the text, what challenge do humans sometimes experience?',
    options: [
      { letter: 'A', text: 'They cannot effectively tame certain wild animals because of a lack of compassion.' },
      { letter: 'B', text: 'They cannot focus on setting attainable goals because of a lack of motivation.' },
      { letter: 'C', text: 'They quickly become frustrated when faced with difficult tasks because of a lack of self-control.' },
      { letter: 'D', text: 'They have aspirations that cannot be fulfilled because of certain limitations.' }
    ],
    correctAnswer: 'D',
    explanation: 'The poem describes a "lofty soul in dreams and visions wrapped, / But in the stifling flesh securely trapped." This indicates aspirations (dreams, visions) that are constrained by physical limitations (flesh as trap). (D) captures this challenge of unfulfilled aspirations due to limitations.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-016',
    question: 'German theater practitioner Bertolt Brecht (1898-1956) believed that theater should elicit an intellectual rather than an emotional response from audiences, provoking them to consider social and political realities that extend beyond the characters and events depicted onstage. Brecht\'s influence can be seen in English playwright Caryl Churchill\'s 1979 play Cloud 9: although the play sometimes invites empathetic reactions, it primarily works to engage audiences in an interrogation of patriarchy and colonialism, which it does by placing audiences at a distance, thereby encouraging them to ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'focus on the characters\' beliefs about social and political issues as revealed by the characters\' actions.' },
      { letter: 'B', text: 'reflect on social and political phenomena not directly related to patriarchy and colonialism.' },
      { letter: 'C', text: 'recognize pertinent social and political parallels between Germany during Brecht\'s time and England at the time when Churchill was writing Cloud 9.' },
      { letter: 'D', text: 'be dispassionate as they think critically about the social and political questions raised by the play.' }
    ],
    correctAnswer: 'D',
    explanation: 'Brecht wanted intellectual (not emotional) responses. Churchill follows this by "placing audiences at a distance" to interrogate patriarchy and colonialism. Distance enables dispassionate, critical thinking rather than emotional engagement. (D) captures this Brechtian approach.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-017',
    question: 'Several scholars have argued that conditions in England in the late ninth through early eleventh centuries--namely, burgeoning literacy amid running conflicts between England\'s Anglo-Saxon kingdoms and Danish invaders--were especially conducive to the production of the Old English epic poem Beowulf, and they have dated the poem\'s composition accordingly. It is not inconceivable that Beowulf emerged from such a context, but privileging contextual fit over the linguistic evidence of an eighth- or even seventh-century composition requires a level of justification that thus far has not been presented. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Although there are some grounds for believing that Beowulf was composed between the late ninth and early eleventh centuries, advocates for that view tend to rely on evidence that has been called into question by advocates for an earlier date.' },
      { letter: 'B', text: 'Although several scholars have dated Beowulf to the late ninth through early eleventh centuries, others have argued that doing so privileges a controversial interpretation of the social conditions of the period.' },
      { letter: 'C', text: 'Although Beowulf fits well with the historical context of England in the late ninth through early eleventh centuries, it fits equally well with the historical context of England in the seventh and eighth centuries.' },
      { letter: 'D', text: 'Although the claim of a late ninth- through early eleventh-century composition date for Beowulf has some plausibility, advocates for the claim have not compellingly addressed evidence suggesting an earlier date.' }
    ],
    correctAnswer: 'D',
    explanation: 'The author says the late date is "not inconceivable" (plausible) but that "privileging contextual fit over the linguistic evidence" requires "justification that thus far has not been presented." This means advocates haven\'t addressed the linguistic evidence for an earlier date. (D) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-018',
    question: 'Elizabeth Asiedu has identified a negative correlation between the share of developing countries\' economies derived from natural-resource extraction and those countries\' receipts of foreign investment. This may appear counterintuitive--resource extraction requires initial investments (in extractive technology, for instance) at scales best met by multinational corporations--but Asiedu notes that natural-resource industries\' boom-bust cycle can destabilize local currencies and increase developing countries\' vulnerability to external shocks, creating levels of uncertainty to which foreign investors are typically averse. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Although it may seem surprising that foreign investment declines in developing countries as natural-resource extraction makes up a larger share of those countries\' economies, that decline happens because resource extraction requires initial investments too large for foreign investors to supply.' },
      { letter: 'B', text: 'Although developing countries tend to become less dependent on foreign investment as natural-resource industries make up a larger share of their economies, this change may not occur if the boom-bust cycle of those industries destabilizes local currencies or increases countries\' vulnerability to external shocks.' },
      { letter: 'C', text: 'Although one might expect that foreign investment would increase as natural-resource extraction makes up a larger share of developing countries\' economies, the opposite happens because heavy reliance on natural resources can lead to unattractive conditions for investors.' },
      { letter: 'D', text: 'Although foreign investors tend to avoid initial investments in natural-resource industries in developing countries, foreign investment may increase significantly as those industries stabilize and the risks associated with them decline.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage presents a counterintuitive finding: more resource extraction correlates with less foreign investment. The explanation is that resource dependence creates "boom-bust cycles" and "uncertainty" that investors avoid. (C) captures this counterintuitive finding and its explanation (unattractive conditions).',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-019',
    question: 'For centuries, the widespread acknowledgment of the involvement of the cerebellum--a dense brain structure in vertebrates--in coordinating motor control in humans has hindered recognition of other possible functions of the structure. Neuroscience research from the last two decades now suggests that the cerebellum regulates emotion and social behavior, and recent research by Ilaria Carta and colleagues has identified a pathway connecting the cerebellum to a center for motivation and reward processing known as the ventral tegmental area (VTA). Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'The recent verification of a pathway between the VTA and the cerebellum confirms the cerebellum\'s long-suspected role in motor coordination.' },
      { letter: 'B', text: 'Recent advances in the field of neuroscience have challenged widely accepted claims about the function of a pathway connecting the VTA and the cerebellum.' },
      { letter: 'C', text: 'The cerebellum has primarily been thought to regulate motor functioning, but in recent years neuroscience researchers have been uncovering additional functions.' },
      { letter: 'D', text: 'Technological limitations have historically hindered the study of the cerebellum, but the recent development of new technologies has led to greater insights into its functions.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage says focus on motor control "hindered recognition of other possible functions," but recent research shows the cerebellum also regulates "emotion and social behavior" and connects to reward processing. (C) captures this: primarily motor control, but additional functions being discovered.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-020',
    question: 'Archaeologist Petra Vaiglova, anthropologist Xinyi Liu, and their colleagues investigated the domestication of farm animals in China during the Bronze Age (approximately 2000 to 1000 BCE). By analyzing the chemical composition of the bones of sheep, goats, and cattle from this era, the team determined that wild plants made up the bulk of sheep\'s and goats\' diets, while the cattle\'s diet consisted largely of millet, a crop cultivated by humans. The team concluded that cattle were likely raised closer to human settlements, whereas sheep and goats were allowed to roam farther away. Which finding, if true, would most strongly support the team\'s conclusion?',
    options: [
      { letter: 'A', text: 'Analysis of the animal bones showed that the cattle\'s diet also consisted of wheat, which humans widely cultivated in China during the Bronze Age.' },
      { letter: 'B', text: 'Further investigation of sheep and goat bones revealed that their diets consisted of small portions of millet as well.' },
      { letter: 'C', text: 'Cattle\'s diets generally require larger amounts of food and a greater variety of nutrients than do sheep\'s and goats\' diets.' },
      { letter: 'D', text: 'The diets of sheep, goats, and cattle were found to vary based on what the farmers in each Bronze Age settlement could grow.' }
    ],
    correctAnswer: 'A',
    explanation: 'The conclusion is that cattle were kept near settlements because they ate human-cultivated millet. If cattle also ate wheat--another cultivated crop--this further supports they were kept near cultivated fields/settlements. (A) strengthens this connection.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-021',
    question: 'Archaeologists and historians used to believe that the Maya civilization during its Classic period (roughly 250-900) lacked agricultural marketplaces. One reason for this belief was that these scholars misunderstood the ecology of the regions the Maya inhabited. Marketplaces typically emerge because different individuals or groups want to trade resources they control for resources they don\'t control. Scholars seriously underestimated the ecological diversity of the Maya landscape and thus assumed that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'marketplaces likely would not have attracted many traders from outside the regions controlled by the Maya.' },
      { letter: 'B', text: 'farming practices would have been largely the same throughout Maya lands even if the crops people produced varied significantly.' },
      { letter: 'C', text: 'marketplaces would not have enabled Maya people to acquire many products different from those they already produced.' },
      { letter: 'D', text: 'farmers would trade agricultural products only if they had already produced enough to meet their own needs.' }
    ],
    correctAnswer: 'C',
    explanation: 'Marketplaces emerge to trade resources people don\'t control for those they do. If scholars underestimated ecological diversity, they thought everyone had similar resources--so there would be little to trade. (C) captures this: without diversity, marketplaces wouldn\'t offer different products.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-022',
    question: 'In their 2022 paper, Christos Dimopoulos et al., having granted that the existence of antigravity--in which antimatter and matter repel rather than attract each other--lacked affirmative experimental support, rightly argued that such antigravity was worth considering on theoretical grounds given that evidence against it was similarly lacking. But a 2023 report by an international team of researchers details the first direct ballistic observations of antihydrogen atoms under gravity inside a CERN particle accelerator. Corresponding most closely to predictions under gravitational attraction, these observations were thoroughly inconsistent with antigravity. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Antihydrogen ballistics observations were conducted at CERN to test specific conclusions about antigravity presented in the 2022 paper by Dimopoulos et al.' },
      { letter: 'B', text: 'Although theoreticians were justified in studying antigravity before the release of the 2023 report, the report\'s findings suggest that the rationale for theoretical consideration offered in the 2022 paper by Dimopoulos et al. is no longer applicable.' },
      { letter: 'C', text: 'The theoretical approach represented in the 2022 paper by Dimopoulos et al. assumed that unambiguous proof of antigravity would not be achievable, but the results in the 2023 report undermine that assumption.' },
      { letter: 'D', text: 'Before 2023, researchers\' inordinate focus on theoretical considerations hindered the development of the experimental regimen for direct antihydrogen ballistics observations.' }
    ],
    correctAnswer: 'B',
    explanation: 'Dimopoulos argued antigravity was worth considering because no evidence existed against it. The 2023 CERN observations are "thoroughly inconsistent with antigravity"--now evidence against it exists. The rationale (no evidence against) is no longer valid. (B) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-023',
    question: 'The alpaca was domesticated by Indigenous peoples in the Andes about 7,000 years ago. But which wild species did it descend from, the vicuna or guanaco? A research team led by Ruiwen Fan may have solved the mystery, concluding that the alpaca is the domesticated form of the vicuna but that the modern alpaca gets only 64 percent of its genetic material from its wild ancestor. The rest comes from the domesticated llama. The llama, meanwhile, gets 95.5 percent of its genetic material from its own wild ancestor, the guanaco, and the rest from the alpaca. The llama and alpaca apparently interbred widely for only a handful of generations between 400 and 600 years ago. Assuming that the findings of Fan\'s team are valid, it can be inferred that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'modern llama populations have a greater degree of genetic diversity, on average, than modern alpaca populations do.' },
      { letter: 'B', text: 'the domestication process of the alpaca may have involved some introduction of genetic material from the llama.' },
      { letter: 'C', text: 'the period of interbreeding resulted in a greater genetic difference between alpacas and their wild ancestors than between llamas and their wild ancestors.' },
      { letter: 'D', text: 'if they were subjected to genetic testing, modern populations of guanacos and vicunas would likely show traces of ancient interbreeding as well.' }
    ],
    correctAnswer: 'C',
    explanation: 'Alpacas have 64% vicuna DNA (36% difference from ancestor). Llamas have 95.5% guanaco DNA (4.5% difference). The interbreeding introduced more foreign DNA into alpacas than llamas, creating greater genetic difference from their wild ancestor. (C) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-024',
    question: 'Poetry in Classical Nahuatl, the language of the Aztec Empire, relies on difrasismo, or a parallel noun construction that conventionally operates as a single metaphor. For example, the common difrasismo in cuauhtli in ocelotl (literally, "the eagle, the jaguar") signifies "warrior." The device\'s function is both formal--providing structure to lines of verse--and ritual: semantic relations among the two nouns and the concept they signify can be tenuous, as in the previous example, such that difrasismos are often only intelligible according to the conceptual associations observed in Aztec ceremonial culture. Which statement about the difrasismo in cuauhtli in ocelotl is most strongly supported by the text?',
    options: [
      { letter: 'A', text: 'Its metaphorical significance derives from the semantic equivalence of the two nouns constituting the difrasismo.' },
      { letter: 'B', text: 'Its unintelligibility may cause its formal function within a line of verse to go unnoticed by present-day readers.' },
      { letter: 'C', text: 'Its apparent obscurity can be resolved when considered in the proper cultural context.' },
      { letter: 'D', text: 'Its frequency in Classical Nahuatl poetry confirms its intelligibility to the Aztec audience.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage says difrasismos are "often only intelligible according to the conceptual associations observed in Aztec ceremonial culture." The "eagle, jaguar" = "warrior" connection seems tenuous but makes sense in cultural context. (C) captures this: obscurity resolved through proper cultural context.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-025',
    question: 'Modern dog breeds are largely the result of 160 years of owners crossbreeding certain dogs in order to select for particular physical appearances. Owners often say that some breeds are also more likely than others to have particular personality traits--basset hounds are affectionate; boxers are easy to train--but Kathleen Morrill and colleagues found through a combination of owner surveys and DNA sequencing of 2,000 dogs that while physical traits are predictably heritable among purebred dogs, behavior varies widely among dogs of the same breed. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Dog breeds would not exist without many years of human intervention in dogs\' reproduction.' },
      { letter: 'B', text: 'Research fails to confirm a commonly held belief about dog breeds and behavior.' },
      { letter: 'C', text: 'The dog breeds most popular among owners have often changed over the past 160 years.' },
      { letter: 'D', text: 'A study of dog breeds is notable for its usage of both opinion surveys and DNA sequencing.' }
    ],
    correctAnswer: 'B',
    explanation: 'The common belief is that breeds have predictable personality traits. Morrill\'s research found "behavior varies widely among dogs of the same breed"--contradicting this belief. (B) captures the main idea: research doesn\'t confirm the common belief about breed and behavior.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-026',
    question: 'Algae living within the tissues of corals play a critical role in keeping corals, and the marine ecosystems they are part of, thriving. Some coral species appear brown in color when healthy due to the algae colonies living in their tissues. In the event of an environmental stressor, the algae can die or be expelled, causing the corals to appear white. To recover the algae, the bleached corals then begin to produce bright colors, which block intense sunlight, encouraging the light-sensitive algae to recolonize the corals. What does the text most strongly suggest about corals that produce bright colors?',
    options: [
      { letter: 'A', text: 'These corals have likely been subjected to stressful environmental conditions.' },
      { letter: 'B', text: 'These corals are likely more vulnerable to exposure from intense sunlight than white corals are.' },
      { letter: 'C', text: 'These corals have likely recovered from an environmental event without the assistance of algae colonies.' },
      { letter: 'D', text: 'These corals are more likely to survive without algae colonies than brown corals are.' }
    ],
    correctAnswer: 'A',
    explanation: 'The passage says corals produce bright colors after bleaching (which happens due to "environmental stressor") to recover algae. Bright color = post-stress recovery attempt. (A) correctly infers that bright-colored corals have experienced stress.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-027',
    question: 'Archaeologists have held that the Casarabe culture, which emerged in the southwestern Amazon basin in the first millennium CE, was characterized by a sparse, widely distributed population and little intervention in the surrounding wilderness. Recently, however, archaeologist Heiko Prumers and colleagues conducted a study of the region using remote-sensing technology that enabled them to create three-dimensional images of the jungle-covered landscape from above, and the researchers concluded that the Casarabe people developed a form of urbanism in the Amazon basin. Which finding about the remote-sensing images, if true, would most directly support Prumers and colleagues\' conclusion?',
    options: [
      { letter: 'A', text: 'They show shapes consistent with widely separated settlements of roughly equal small size surrounded by uncultivated jungle.' },
      { letter: 'B', text: 'They show shapes consistent with long-distance footpaths running from Casarabe territories to large cities outside the region inhabited by the Casarabe people.' },
      { letter: 'C', text: 'They show shapes consistent with scattered small farms created by clearing jungle areas near sources of fresh water.' },
      { letter: 'D', text: 'They show shapes consistent with monumental platforms and dense central settlements linked to smaller settlements by a system of canals and roadways.' }
    ],
    correctAnswer: 'D',
    explanation: 'The conclusion is that Casarabe developed "urbanism." (D) describes urban features: "monumental platforms," "dense central settlements," connected infrastructure (canals, roadways). This evidence would support urbanism, unlike (A) and (C) which describe sparse settlements.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-028',
    question: 'Paleontologist Lucas E. Fiorelli and colleagues have reported the discovery at a mine in Brazil of several egg clutches, partially preserved single eggs, and egg shells from the Late Cretaceous period. The researchers have concluded that the area was once a nesting and breeding site for titanosaurs, a group of sauropod dinosaurs. The finding is significant given the previous lack of known nesting sites in northern regions of South America, which led many paleontologists to assume that titanosaurs migrated south to lay eggs. What does the text most strongly suggest about the site discovered by the researchers?',
    options: [
      { letter: 'A', text: 'It is the earliest known example of a titanosaur nesting and breeding site.' },
      { letter: 'B', text: 'It was very difficult to excavate given that it was discovered in a mine.' },
      { letter: 'C', text: 'It may have been occupied by other sauropods in addition to titanosaurs.' },
      { letter: 'D', text: 'It is farther north than any other nesting site discovered in South America.' }
    ],
    correctAnswer: 'D',
    explanation: 'The passage says there was a "previous lack of known nesting sites in northern regions of South America." This new site is significant because it\'s in the north, challenging the assumption about southern migration. (D) captures that it\'s in a northern location where none were known before.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-029',
    question: 'In the 1980s, many musicians and journalists in the English-speaking world began to draw attention to music from around the globe--such as mbaqanga from South Africa and quan ho from Vietnam--that can\'t be easily categorized according to British or North American popular music genres, typically referring to such music as "world music." While some scholars have welcomed this development for bringing diverse musical forms to prominence in countries where they\'d previously been overlooked, musicologist Su Zheng claims that the concept of world music homogenizes highly distinct traditions by reducing them all to a single category. Which finding about mbaqanga and quan ho, if true, would most directly support Zheng\'s claim?',
    options: [
      { letter: 'A', text: 'Mbaqanga and quan ho developed independently of each other and have little in common musically.' },
      { letter: 'B', text: 'Mbaqanga is significantly more popular in the English-speaking world than quan ho is.' },
      { letter: 'C', text: 'Mbaqanga and quan ho are now performed by a diverse array of musicians with no direct connections to South Africa or Vietnam.' },
      { letter: 'D', text: 'Mbaqanga and quan ho are highly distinct from British and North American popular music genres but similar to each other.' }
    ],
    correctAnswer: 'A',
    explanation: 'Zheng claims "world music" homogenizes "highly distinct traditions" by lumping them together. If (A) is true--mbaqanga and quan ho "have little in common musically"--then grouping them as "world music" indeed reduces distinct traditions to one category, supporting Zheng\'s claim.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  // Additional questions from SAT_Questions.docx
  addRating({
    id: 'sat-doc-030',
    question: 'The Mammillaria cactus M. boolii occurs naturally only in the state of Sonora in Mexico, and the smallness of its range makes it especially vulnerable to extinction. The traditional single-species approach to conservation emphasizes the need to focus on individual species most at risk, like M. boolii, but recently, conservationists have argued that an ecosystem-based approach that incorporates the many interactions between the climate, terrain, and various species of a given geographical area may lead to better outcomes for all the species in a given location. If this view is correct, the single-species approach to the conservation of M. boolii could thus ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'lead to a better understanding of how the distribution of Mammillaria species throughout Mexico has affected their survival.' },
      { letter: 'B', text: 'allow conservationists to better consider how climatic changes affecting Sonora may reduce the number of species competing with M. boolii.' },
      { letter: 'C', text: 'erroneously shift the focus of conservation efforts away from M. boolii itself.' },
      { letter: 'D', text: 'fail to consider the ways in which the survival of M. boolii may be influenced by changes in the populations of other species that inhabit Sonora.' }
    ],
    correctAnswer: 'D',
    explanation: 'The ecosystem-based approach considers "interactions between climate, terrain, and various species." The single-species approach, by focusing only on M. boolii, would miss these interactions. (D) captures this limitation--failing to consider how other species affect M. boolii.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-031',
    question: 'In the early nineteenth century, some Euro-American farmers in the northeastern United States used agricultural techniques developed by the Haudenosaunee (Iroquois) people centuries earlier, but it seems that few of those farmers had actually seen Haudenosaunee farms firsthand. Barring the possibility of several farmers of the same era independently developing techniques that the Haudenosaunee people had already invented, these facts most strongly suggest that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'those farmers learned the techniques from other people who were more directly influenced by Haudenosaunee practices.' },
      { letter: 'B', text: 'the crops typically cultivated by Euro-American farmers in the northeastern United States were not well suited to Haudenosaunee farming techniques.' },
      { letter: 'C', text: 'Haudenosaunee farming techniques were widely used in regions outside the northeastern United States.' },
      { letter: 'D', text: 'Euro-American farmers only began to recognize the benefits of Haudenosaunee farming techniques late in the nineteenth century.' }
    ],
    correctAnswer: 'A',
    explanation: 'If farmers used Haudenosaunee techniques but hadn\'t seen Haudenosaunee farms, and we rule out independent invention, they must have learned from intermediaries. (A) provides this logical explanation--indirect transmission through others.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-032',
    question: 'The following text is adapted from Maria Cristina Mena\'s 1914 short story "The Vine-Leaf." It is a saying in the capital of Mexico that Dr. Malsufrido carries more family secrets under his hat than any archbishop. The doctor\'s hat is, appropriately enough, uncommonly capacious, rising very high, and sinking so low that it seems to be supported by his ears and eyebrows, and it has a furry look, as if it had been brushed the wrong way, which is perhaps what happens to it if it is ever brushed at all. When the doctor takes it off, the family secrets do not fly out like a flock of parrots, but remain nicely bottled up beneath a dome of old and highly polished ivory. Based on the text, how do people in the capital of Mexico most likely regard Dr. Malsufrido?',
    options: [
      { letter: 'A', text: 'Many have come to tolerate him despite his disheveled appearance.' },
      { letter: 'B', text: 'Few feel concerned that he will divulge their confidences.' },
      { letter: 'C', text: 'Some dislike how freely he discusses his own family.' },
      { letter: 'D', text: 'Most would be unimpressed by him were it not for his professional expertise.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage says secrets "remain nicely bottled up" when he removes his hat--they don\'t "fly out like parrots." This metaphor suggests he keeps confidences well. (B) captures this: people trust he won\'t reveal their secrets.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-033',
    question: 'Mosasaurs were large marine reptiles that lived in the Late Cretaceous period, approximately 100 million to 66 million years ago. Celina Suarez, Alberto Perez-Huerta, and T. Lynn Harrell Jr. examined oxygen-18 isotopes in mosasaur tooth enamel in order to calculate likely mosasaur body temperatures and determined that mosasaurs were endothermic--that is, they used internal metabolic processes to maintain a stable body temperature in a variety of ambient temperatures. Suarez, Perez-Huerta, and Harrell claim that endothermy would have enabled mosasaurs to include relatively cold polar waters in their range. Which finding, if true, would most directly support Suarez, Perez-Huerta, and Harrell\'s claim?',
    options: [
      { letter: 'A', text: 'Mosasaurs\' likely body temperatures are easier to determine from tooth enamel oxygen-18 isotope data than the body temperatures of nonendothermic Late Cretaceous marine reptiles are.' },
      { letter: 'B', text: 'Fossils of both mosasaurs and nonendothermic marine reptiles have been found in roughly equal numbers in regions known to be near the poles during the Late Cretaceous, though in lower concentrations than elsewhere.' },
      { letter: 'C', text: 'Several mosasaur fossils have been found in regions known to be near the poles during the Late Cretaceous, while relatively few fossils of nonendothermic marine reptiles have been found in those locations.' },
      { letter: 'D', text: 'During the Late Cretaceous, seawater temperatures were likely higher throughout mosasaurs\' range, including near the poles, than seawater temperatures at those same latitudes are today.' }
    ],
    correctAnswer: 'C',
    explanation: 'The claim is that endothermy allowed mosasaurs to live in cold polar waters. If (C) is true--mosasaurs found near poles while non-endothermic reptiles were not--this supports the advantage of endothermy for surviving cold environments.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-034',
    question: 'Almost all works of fiction contain references to the progression of time, including the time of day when events in a story take place. In a 2020 study, Allen Kim, Charuta Pethe, and Steven Skiena claim that an observable pattern in such references reflects a shift in human behavior prompted by the spread of electric lighting in the late nineteenth century. The researchers drew this conclusion from an analysis of more than 50,000 novels spanning many centuries and cultures, using software to recognize and tally both specific time references--that is, clock phrases, such as 7 a.m. or 2:30 p.m.--and implied ones, such as mentions of meals typically associated with a particular time of day. Which finding from the study, if true, would most directly support the researchers\' conclusion?',
    options: [
      { letter: 'A', text: 'Novels published after the year 1800 include the clock phrase 10 a.m. less often than novels published before the year 1800 do.' },
      { letter: 'B', text: 'Novels published after 1880 contain significantly more references to activities occurring after 10 p.m. than do novels from earlier periods.' },
      { letter: 'C', text: 'Among novels published in the nineteenth century, implied time references become steadily more common than clock phrases as publication dates approach 1900.' },
      { letter: 'D', text: 'The time references of noon (12 p.m.) and midnight (12 a.m.) are used with roughly the same frequency in the novels.' }
    ],
    correctAnswer: 'B',
    explanation: 'The claim is that electric lighting changed behavior patterns in fiction. Electric lighting enables late-night activity. If novels after 1880 (when electric lights spread) show more references to activities after 10 p.m., this supports the claim. (B) provides this evidence.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-035',
    question: 'One challenge when researching whether holding elected office changes a person\'s behavior is the problem of ensuring that the experiment has an appropriate control group. To reveal the effect of holding office, researchers must compare people who hold elected office with people who do not hold office but who are otherwise similar to the office-holders. Since researchers are unable to control which politicians win elections, they therefore ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'struggle to find valid data about the behavior of politicians who do not currently hold office.' },
      { letter: 'B', text: 'can only conduct valid studies with people who have previously held office rather than people who presently hold office.' },
      { letter: 'C', text: 'should select a control group of people who differ from office-holders in several significant ways.' },
      { letter: 'D', text: 'will find it difficult to identify a group of people who can function as an appropriate control group for their studies.' }
    ],
    correctAnswer: 'D',
    explanation: 'The passage establishes that researchers need a control group of people "otherwise similar" to office-holders. But they can\'t control who wins elections. This makes it difficult to find similar non-office-holders. (D) captures this challenge.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-036',
    question: 'Poetry in Classical Nahuatl, the language of the Aztec Empire, relies on difrasismo, or a parallel noun construction that conventionally operates as a single metaphor. For example, the common difrasismo in cuauhtli in ocelotl (literally, "the eagle, the jaguar") signifies "warrior." The device\'s function is both formal--providing structure to lines of verse--and ritual: semantic relations among the two nouns and the concept they signify can be tenuous, as in the previous example, such that difrasismos are often only intelligible according to the conceptual associations observed in Aztec ceremonial culture. Which statement about the difrasismo in cuauhtli in ocelotl is most strongly supported by the text?',
    options: [
      { letter: 'A', text: 'Its metaphorical significance derives from the semantic equivalence of the two nouns constituting the difrasismo.' },
      { letter: 'B', text: 'Its unintelligibility may cause its formal function within a line of verse to go unnoticed by present-day readers.' },
      { letter: 'C', text: 'Its apparent obscurity can be resolved when considered in the proper cultural context.' },
      { letter: 'D', text: 'Its frequency in Classical Nahuatl poetry confirms its intelligibility to the Aztec audience.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage says difrasismos are "often only intelligible according to the conceptual associations observed in Aztec ceremonial culture." The "eagle, jaguar" = "warrior" connection seems tenuous but makes sense in cultural context. (C) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-037',
    question: 'Modern dog breeds are largely the result of 160 years of owners crossbreeding certain dogs in order to select for particular physical appearances. Owners often say that some breeds are also more likely than others to have particular personality traits--basset hounds are affectionate; boxers are easy to train--but Kathleen Morrill and colleagues found through a combination of owner surveys and DNA sequencing of 2,000 dogs that while physical traits are predictably heritable among purebred dogs, behavior varies widely among dogs of the same breed. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Dog breeds would not exist without many years of human intervention in dogs\' reproduction.' },
      { letter: 'B', text: 'Research fails to confirm a commonly held belief about dog breeds and behavior.' },
      { letter: 'C', text: 'The dog breeds most popular among owners have often changed over the past 160 years.' },
      { letter: 'D', text: 'A study of dog breeds is notable for its usage of both opinion surveys and DNA sequencing.' }
    ],
    correctAnswer: 'B',
    explanation: 'The common belief is that breeds have predictable personality traits. Morrill\'s research found "behavior varies widely among dogs of the same breed"--contradicting this belief. (B) captures the main idea.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-038',
    question: 'Algae living within the tissues of corals play a critical role in keeping corals, and the marine ecosystems they are part of, thriving. Some coral species appear brown in color when healthy due to the algae colonies living in their tissues. In the event of an environmental stressor, the algae can die or be expelled, causing the corals to appear white. To recover the algae, the bleached corals then begin to produce bright colors, which block intense sunlight, encouraging the light-sensitive algae to recolonize the corals. What does the text most strongly suggest about corals that produce bright colors?',
    options: [
      { letter: 'A', text: 'These corals have likely been subjected to stressful environmental conditions.' },
      { letter: 'B', text: 'These corals are likely more vulnerable to exposure from intense sunlight than white corals are.' },
      { letter: 'C', text: 'These corals have likely recovered from an environmental event without the assistance of algae colonies.' },
      { letter: 'D', text: 'These corals are more likely to survive without algae colonies than brown corals are.' }
    ],
    correctAnswer: 'A',
    explanation: 'The passage says corals produce bright colors after bleaching (which happens due to "environmental stressor") to recover algae. Bright color = post-stress recovery attempt. (A) correctly infers that bright-colored corals have experienced stress.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-039',
    question: 'For centuries, the widespread acknowledgment of the involvement of the cerebellum--a dense brain structure in vertebrates--in coordinating motor control in humans has hindered recognition of other possible functions of the structure. Neuroscience research from the last two decades now suggests that the cerebellum regulates emotion and social behavior, and recent research by Ilaria Carta and colleagues has identified a pathway connecting the cerebellum to a center for motivation and reward processing known as the ventral tegmental area (VTA). Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'The recent verification of a pathway between the VTA and the cerebellum confirms the cerebellum\'s long-suspected role in motor coordination.' },
      { letter: 'B', text: 'Recent advances in the field of neuroscience have challenged widely accepted claims about the function of a pathway connecting the VTA and the cerebellum.' },
      { letter: 'C', text: 'The cerebellum has primarily been thought to regulate motor functioning, but in recent years neuroscience researchers have been uncovering additional functions.' },
      { letter: 'D', text: 'Technological limitations have historically hindered the study of the cerebellum, but the recent development of new technologies has led to greater insights into its functions.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage says focus on motor control "hindered recognition of other possible functions," but recent research shows the cerebellum also regulates "emotion and social behavior" and connects to reward processing. (C) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-040',
    question: 'Archaeologist Petra Vaiglova, anthropologist Xinyi Liu, and their colleagues investigated the domestication of farm animals in China during the Bronze Age (approximately 2000 to 1000 BCE). By analyzing the chemical composition of the bones of sheep, goats, and cattle from this era, the team determined that wild plants made up the bulk of sheep\'s and goats\' diets, while the cattle\'s diet consisted largely of millet, a crop cultivated by humans. The team concluded that cattle were likely raised closer to human settlements, whereas sheep and goats were allowed to roam farther away. Which finding, if true, would most strongly support the team\'s conclusion?',
    options: [
      { letter: 'A', text: 'Analysis of the animal bones showed that the cattle\'s diet also consisted of wheat, which humans widely cultivated in China during the Bronze Age.' },
      { letter: 'B', text: 'Further investigation of sheep and goat bones revealed that their diets consisted of small portions of millet as well.' },
      { letter: 'C', text: 'Cattle\'s diets generally require larger amounts of food and a greater variety of nutrients than do sheep\'s and goats\' diets.' },
      { letter: 'D', text: 'The diets of sheep, goats, and cattle were found to vary based on what the farmers in each Bronze Age settlement could grow.' }
    ],
    correctAnswer: 'A',
    explanation: 'The conclusion is that cattle were kept near settlements because they ate human-cultivated millet. If cattle also ate wheat--another cultivated crop--this further supports they were kept near cultivated fields/settlements. (A) strengthens this connection.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-041',
    question: 'Archaeologists and historians used to believe that the Maya civilization during its Classic period (roughly 250-900) lacked agricultural marketplaces. One reason for this belief was that these scholars misunderstood the ecology of the regions the Maya inhabited. Marketplaces typically emerge because different individuals or groups want to trade resources they control for resources they don\'t control. Scholars seriously underestimated the ecological diversity of the Maya landscape and thus assumed that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'marketplaces likely would not have attracted many traders from outside the regions controlled by the Maya.' },
      { letter: 'B', text: 'farming practices would have been largely the same throughout Maya lands even if the crops people produced varied significantly.' },
      { letter: 'C', text: 'marketplaces would not have enabled Maya people to acquire many products different from those they already produced.' },
      { letter: 'D', text: 'farmers would trade agricultural products only if they had already produced enough to meet their own needs.' }
    ],
    correctAnswer: 'C',
    explanation: 'Marketplaces emerge to trade resources people don\'t control for those they do. If scholars underestimated ecological diversity, they thought everyone had similar resources--so there would be little to trade. (C) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-042',
    question: 'In their 2022 paper, Christos Dimopoulos et al., having granted that the existence of antigravity--in which antimatter and matter repel rather than attract each other--lacked affirmative experimental support, rightly argued that such antigravity was worth considering on theoretical grounds given that evidence against it was similarly lacking. But a 2023 report by an international team of researchers details the first direct ballistic observations of antihydrogen atoms under gravity inside a CERN particle accelerator. Corresponding most closely to predictions under gravitational attraction, these observations were thoroughly inconsistent with antigravity. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Antihydrogen ballistics observations were conducted at CERN to test specific conclusions about antigravity presented in the 2022 paper by Dimopoulos et al.' },
      { letter: 'B', text: 'Although theoreticians were justified in studying antigravity before the release of the 2023 report, the report\'s findings suggest that the rationale for theoretical consideration offered in the 2022 paper by Dimopoulos et al. is no longer applicable.' },
      { letter: 'C', text: 'The theoretical approach represented in the 2022 paper by Dimopoulos et al. assumed that unambiguous proof of antigravity would not be achievable, but the results in the 2023 report undermine that assumption.' },
      { letter: 'D', text: 'Before 2023, researchers\' inordinate focus on theoretical considerations hindered the development of the experimental regimen for direct antihydrogen ballistics observations.' }
    ],
    correctAnswer: 'B',
    explanation: 'Dimopoulos argued antigravity was worth considering because no evidence existed against it. The 2023 CERN observations are "thoroughly inconsistent with antigravity"--now evidence against it exists. The rationale is no longer valid. (B) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-043',
    question: 'The alpaca was domesticated by Indigenous peoples in the Andes about 7,000 years ago. But which wild species did it descend from, the vicuna or guanaco? A research team led by Ruiwen Fan may have solved the mystery, concluding that the alpaca is the domesticated form of the vicuna but that the modern alpaca gets only 64 percent of its genetic material from its wild ancestor. The rest comes from the domesticated llama. The llama, meanwhile, gets 95.5 percent of its genetic material from its own wild ancestor, the guanaco, and the rest from the alpaca. The llama and alpaca apparently interbred widely for only a handful of generations between 400 and 600 years ago. Assuming that the findings of Fan\'s team are valid, it can be inferred that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'modern llama populations have a greater degree of genetic diversity, on average, than modern alpaca populations do.' },
      { letter: 'B', text: 'the domestication process of the alpaca may have involved some introduction of genetic material from the llama.' },
      { letter: 'C', text: 'the period of interbreeding resulted in a greater genetic difference between alpacas and their wild ancestors than between llamas and their wild ancestors.' },
      { letter: 'D', text: 'if they were subjected to genetic testing, modern populations of guanacos and vicunas would likely show traces of ancient interbreeding as well.' }
    ],
    correctAnswer: 'C',
    explanation: 'Alpacas have 64% vicuna DNA (36% difference from ancestor). Llamas have 95.5% guanaco DNA (4.5% difference). The interbreeding introduced more foreign DNA into alpacas than llamas, creating greater genetic difference from their wild ancestor. (C) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Inferences'
  }),
  addRating({
    id: 'sat-doc-044',
    question: 'Several scholars have argued that conditions in England in the late ninth through early eleventh centuries--namely, burgeoning literacy amid running conflicts between England\'s Anglo-Saxon kingdoms and Danish invaders--were especially conducive to the production of the Old English epic poem Beowulf, and they have dated the poem\'s composition accordingly. It is not inconceivable that Beowulf emerged from such a context, but privileging contextual fit over the linguistic evidence of an eighth- or even seventh-century composition requires a level of justification that thus far has not been presented. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Although there are some grounds for believing that Beowulf was composed between the late ninth and early eleventh centuries, advocates for that view tend to rely on evidence that has been called into question by advocates for an earlier date.' },
      { letter: 'B', text: 'Although several scholars have dated Beowulf to the late ninth through early eleventh centuries, others have argued that doing so privileges a controversial interpretation of the social conditions of the period.' },
      { letter: 'C', text: 'Although Beowulf fits well with the historical context of England in the late ninth through early eleventh centuries, it fits equally well with the historical context of England in the seventh and eighth centuries.' },
      { letter: 'D', text: 'Although the claim of a late ninth- through early eleventh-century composition date for Beowulf has some plausibility, advocates for the claim have not compellingly addressed evidence suggesting an earlier date.' }
    ],
    correctAnswer: 'D',
    explanation: 'The author says the late date is "not inconceivable" (plausible) but that "privileging contextual fit over the linguistic evidence" requires "justification that thus far has not been presented." (D) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  addRating({
    id: 'sat-doc-045',
    question: 'Elizabeth Asiedu has identified a negative correlation between the share of developing countries\' economies derived from natural-resource extraction and those countries\' receipts of foreign investment. This may appear counterintuitive--resource extraction requires initial investments (in extractive technology, for instance) at scales best met by multinational corporations--but Asiedu notes that natural-resource industries\' boom-bust cycle can destabilize local currencies and increase developing countries\' vulnerability to external shocks, creating levels of uncertainty to which foreign investors are typically averse. Which choice best states the main idea of the text?',
    options: [
      { letter: 'A', text: 'Although it may seem surprising that foreign investment declines in developing countries as natural-resource extraction makes up a larger share of those countries\' economies, that decline happens because resource extraction requires initial investments too large for foreign investors to supply.' },
      { letter: 'B', text: 'Although developing countries tend to become less dependent on foreign investment as natural-resource industries make up a larger share of their economies, this change may not occur if the boom-bust cycle of those industries destabilizes local currencies or increases countries\' vulnerability to external shocks.' },
      { letter: 'C', text: 'Although one might expect that foreign investment would increase as natural-resource extraction makes up a larger share of developing countries\' economies, the opposite happens because heavy reliance on natural resources can lead to unattractive conditions for investors.' },
      { letter: 'D', text: 'Although foreign investors tend to avoid initial investments in natural-resource industries in developing countries, foreign investment may increase significantly as those industries stabilize and the risks associated with them decline.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage presents a counterintuitive finding: more resource extraction correlates with less foreign investment. The explanation is that resource dependence creates "boom-bust cycles" and "uncertainty" that investors avoid. (C) captures this.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Central Ideas'
  }),
  // Additional user-provided questions
  addRating({
    id: 'sat-doc-046',
    question: 'In context, which choice best maintains the tone and logical progression of the passage? Despite the committee\'s insistence on transparency, the report was...',
    options: [
      { letter: 'A', text: 'opaque and convoluted, leaving readers perplexed.' },
      { letter: 'B', text: 'clear and concise, satisfying all expectations.' },
      { letter: 'C', text: 'verbose yet illuminating, offering clarity.' },
      { letter: 'D', text: 'brief but misleading, obscuring critical details.' }
    ],
    correctAnswer: 'A',
    explanation: 'The phrase "Despite the committee\'s insistence on transparency" suggests the report failed to meet expectations, making "opaque and convoluted" the most logical choice.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Tone and Logical Progression'
  }),
  addRating({
    id: 'sat-doc-047',
    question: 'Which revision most improves sentence structure? Original: The scientist, who was renowned for groundbreaking research, published findings that were controversial.',
    options: [
      { letter: 'A', text: 'Renowned for groundbreaking research, the scientist published controversial findings.' },
      { letter: 'B', text: 'The scientist published findings that were controversial and groundbreaking.' },
      { letter: 'C', text: 'The scientist, renowned for research, published findings that were controversial.' },
      { letter: 'D', text: 'Publishing controversial findings, the scientist was renowned for research.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A eliminates unnecessary words and improves clarity while maintaining meaning.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Structure'
  }),
  addRating({
    id: 'sat-doc-048',
    question: 'Which choice best supports the claim that technological progress can exacerbate inequality?',
    options: [
      { letter: 'A', text: 'Innovations often reduce costs for consumers.' },
      { letter: 'B', text: 'Automation disproportionately affects low-income workers.' },
      { letter: 'C', text: 'Advancements in AI improve efficiency in all sectors.' },
      { letter: 'D', text: 'Digital platforms increase global connectivity.' }
    ],
    correctAnswer: 'B',
    explanation: 'Automation replacing low-income jobs directly supports the claim about inequality.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-049',
    question: 'The author\'s tone in the passage is best described as:',
    options: [
      { letter: 'A', text: 'cautiously optimistic.' },
      { letter: 'B', text: 'vehemently critical.' },
      { letter: 'C', text: 'detached and analytical.' },
      { letter: 'D', text: 'exuberantly celebratory.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage uses objective language and analysis, indicating a detached and analytical tone.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author Tone'
  }),
  addRating({
    id: 'sat-doc-050',
    question: 'Which sentence most effectively combines the two ideas without redundancy? She admired the painting. The painting was created by a local artist.',
    options: [
      { letter: 'A', text: 'She admired the painting, which was created by a local artist.' },
      { letter: 'B', text: 'She admired the painting and it was created by a local artist.' },
      { letter: 'C', text: 'She admired the painting; the painting was by a local artist.' },
      { letter: 'D', text: 'She admired the painting because it was created by a local artist.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A combines the ideas smoothly without redundancy using a relative clause.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Combining'
  }),
  addRating({
    id: 'sat-doc-051',
    question: 'Which choice best maintains parallel structure? Original: The internship taught her to write clearly, think critically, and she learned collaboration.',
    options: [
      { letter: 'A', text: 'write clearly, think critically, and collaborate effectively.' },
      { letter: 'B', text: 'writing clearly, thinking critically, and collaboration.' },
      { letter: 'C', text: 'write clearly, thinking critically, and collaborating.' },
      { letter: 'D', text: 'writing clearly, think critically, and collaborate effectively.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A maintains parallel structure with all verbs in the same infinitive form.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Parallel Structure'
  }),
  addRating({
    id: 'sat-doc-052',
    question: 'Which choice most logically completes the sentence? Although the policy aimed to reduce emissions, critics argued that...',
    options: [
      { letter: 'A', text: 'it would accelerate climate change.' },
      { letter: 'B', text: 'its implementation was costly and ineffective.' },
      { letter: 'C', text: 'it was universally praised by environmentalists.' },
      { letter: 'D', text: 'it aligned with global sustainability goals.' }
    ],
    correctAnswer: 'B',
    explanation: 'Critics would argue against effectiveness, making B the best choice that logically follows "critics argued."',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Logical Completion'
  }),
  addRating({
    id: 'sat-doc-053',
    question: 'Which choice best improves the clarity of the sentence? Original: Due to the fact that the project was delayed, the team had to work overtime.',
    options: [
      { letter: 'A', text: 'Because the project was delayed, the team had to work overtime.' },
      { letter: 'B', text: 'The project was delayed, so the team had to work overtime.' },
      { letter: 'C', text: 'The team had to work overtime due to the project delay.' },
      { letter: 'D', text: 'All of the above improve clarity.' }
    ],
    correctAnswer: 'D',
    explanation: 'All options improve clarity compared to the original wordy phrase "due to the fact that."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concision and Clarity'
  }),
  addRating({
    id: 'sat-doc-054',
    question: 'Which choice best supports the argument that art influences culture?',
    options: [
      { letter: 'A', text: 'Art reflects societal values and norms.' },
      { letter: 'B', text: 'Art is often displayed in museums.' },
      { letter: 'C', text: 'Artists sometimes collaborate internationally.' },
      { letter: 'D', text: 'Art requires creativity and skill.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A directly connects art to cultural influence by showing the relationship between art and society.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-055',
    question: 'Which choice best maintains the formal tone? Original: The results were pretty surprising to the researchers.',
    options: [
      { letter: 'A', text: 'The results were quite surprising to the researchers.' },
      { letter: 'B', text: 'The results were surprising to the researchers.' },
      { letter: 'C', text: 'The results were rather surprising to the researchers.' },
      { letter: 'D', text: 'The results were significantly surprising to the researchers.' }
    ],
    correctAnswer: 'B',
    explanation: 'Option B is formal and concise, avoiding informal words like "pretty" while maintaining proper academic register.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Formal Tone'
  }),
  // Batch 2 user-provided questions
  addRating({
    id: 'sat-doc-056',
    question: 'Which choice best maintains the academic tone? Original: The scientist figured out the solution quickly.',
    options: [
      { letter: 'A', text: 'The scientist figured out the solution quickly.' },
      { letter: 'B', text: 'The scientist rapidly determined the solution.' },
      { letter: 'C', text: 'The scientist was quick to figure out the solution.' },
      { letter: 'D', text: 'The scientist quickly figured out the solution.' }
    ],
    correctAnswer: 'B',
    explanation: '"Rapidly determined" is more formal and precise than "figured out," maintaining an academic tone.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Academic Tone'
  }),
  addRating({
    id: 'sat-doc-057',
    question: 'Which revision best improves sentence structure? Original: The committee, which was known for its strict standards, approved the proposal that was controversial.',
    options: [
      { letter: 'A', text: 'Known for strict standards, the committee approved the controversial proposal.' },
      { letter: 'B', text: 'The committee approved the controversial proposal, known for strict standards.' },
      { letter: 'C', text: 'The committee, known for strict standards, approved the controversial proposal.' },
      { letter: 'D', text: 'Approving the controversial proposal, the committee was known for strict standards.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A eliminates redundancy and improves clarity by front-loading the descriptive phrase.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Structure'
  }),
  addRating({
    id: 'sat-doc-058',
    question: 'Which choice best supports the claim that globalization influences language?',
    options: [
      { letter: 'A', text: 'English words appear frequently in international advertising.' },
      { letter: 'B', text: 'Language evolves naturally over time.' },
      { letter: 'C', text: 'Dialects differ across regions.' },
      { letter: 'D', text: 'People learn multiple languages for personal growth.' }
    ],
    correctAnswer: 'A',
    explanation: 'The presence of English in global advertising directly supports the claim about globalization\'s influence on language.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-059',
    question: 'Which choice best maintains parallel structure? Original: The program aims to educate students, inspire creativity, and they should learn collaboration.',
    options: [
      { letter: 'A', text: 'educate students, inspire creativity, and foster collaboration.' },
      { letter: 'B', text: 'educating students, inspiring creativity, and collaboration.' },
      { letter: 'C', text: 'educate students, inspiring creativity, and collaborating.' },
      { letter: 'D', text: 'educating students, inspire creativity, and foster collaboration.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A maintains parallel structure with three verbs in the same infinitive form.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Parallel Structure'
  }),
  addRating({
    id: 'sat-doc-060',
    question: 'Which choice most logically completes the sentence? Although the policy aimed to reduce costs, critics argued that...',
    options: [
      { letter: 'A', text: 'it would increase operational efficiency.' },
      { letter: 'B', text: 'its implementation was expensive and ineffective.' },
      { letter: 'C', text: 'it was universally praised by analysts.' },
      { letter: 'D', text: 'it aligned with global standards.' }
    ],
    correctAnswer: 'B',
    explanation: 'Option B introduces a logical contrast to the policy\'s aim, which is what critics would argue.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Logical Completion'
  }),
  addRating({
    id: 'sat-doc-061',
    question: 'Which choice best improves clarity? Original: Due to the fact that the experiment failed, the team revised its hypothesis.',
    options: [
      { letter: 'A', text: 'Because the experiment failed, the team revised its hypothesis.' },
      { letter: 'B', text: 'The experiment failed, so the team revised its hypothesis.' },
      { letter: 'C', text: 'The team revised its hypothesis because the experiment failed.' },
      { letter: 'D', text: 'All of the above.' }
    ],
    correctAnswer: 'D',
    explanation: 'All options improve clarity by removing wordiness from "due to the fact that."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Concision and Clarity'
  }),
  addRating({
    id: 'sat-doc-062',
    question: 'Which choice best supports the argument that literature reflects society?',
    options: [
      { letter: 'A', text: 'Novels often portray social norms and conflicts.' },
      { letter: 'B', text: 'Authors sometimes write for entertainment.' },
      { letter: 'C', text: 'Literature requires creativity.' },
      { letter: 'D', text: 'Books are sold globally.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A directly connects literature to societal reflection through portrayal of social norms and conflicts.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Command of Evidence'
  }),
  addRating({
    id: 'sat-doc-063',
    question: 'Which choice best maintains formal tone? Original: The results were pretty shocking to the researchers.',
    options: [
      { letter: 'A', text: 'The results were quite shocking to the researchers.' },
      { letter: 'B', text: 'The results were shocking to the researchers.' },
      { letter: 'C', text: 'The results were rather shocking to the researchers.' },
      { letter: 'D', text: 'The results were significantly shocking to the researchers.' }
    ],
    correctAnswer: 'A',
    explanation: '"Quite shocking" is formal and precise compared to the informal "pretty shocking."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Formal Tone'
  }),
  addRating({
    id: 'sat-doc-064',
    question: 'Which sentence most effectively combines ideas? She admired the sculpture. The sculpture was created by a local artist.',
    options: [
      { letter: 'A', text: 'She admired the sculpture, which was created by a local artist.' },
      { letter: 'B', text: 'She admired the sculpture and it was created by a local artist.' },
      { letter: 'C', text: 'She admired the sculpture; the sculpture was by a local artist.' },
      { letter: 'D', text: 'She admired the sculpture because it was created by a local artist.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A combines ideas without redundancy using a relative clause.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Combining'
  }),
  addRating({
    id: 'sat-doc-065',
    question: 'Which choice best maintains logical progression? Despite the committee\'s insistence on transparency, the report was...',
    options: [
      { letter: 'A', text: 'opaque and convoluted, leaving readers perplexed.' },
      { letter: 'B', text: 'clear and concise, satisfying all expectations.' },
      { letter: 'C', text: 'verbose yet illuminating, offering clarity.' },
      { letter: 'D', text: 'brief but misleading, obscuring critical details.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A logically contrasts with the committee\'s insistence on transparency.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Logical Progression'
  }),
  // New batch from user - English Questions (sat-doc-066 to sat-doc-075)
  addRating({
    id: 'sat-doc-066',
    question: 'In context, which choice best maintains the tone and logical progression of the passage? Despite the committee\'s insistence on transparency, the report was...',
    options: [
      { letter: 'A', text: 'opaque and convoluted, leaving readers perplexed.' },
      { letter: 'B', text: 'clear and concise, satisfying all expectations.' },
      { letter: 'C', text: 'verbose yet illuminating, offering clarity.' },
      { letter: 'D', text: 'brief but misleading, obscuring critical details.' }
    ],
    correctAnswer: 'A',
    explanation: 'The phrase "Despite the committee\'s insistence on transparency" suggests the report failed to meet expectations, making "opaque and convoluted" the most logical choice.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Tone and Logical Progression'
  }),
  addRating({
    id: 'sat-doc-067',
    question: 'Which revision most improves sentence structure? Original: The scientist, who was renowned for groundbreaking research, published findings that were controversial.',
    options: [
      { letter: 'A', text: 'Renowned for groundbreaking research, the scientist published controversial findings.' },
      { letter: 'B', text: 'The scientist published findings that were controversial and groundbreaking.' },
      { letter: 'C', text: 'The scientist, renowned for research, published findings that were controversial.' },
      { letter: 'D', text: 'Publishing controversial findings, the scientist was renowned for research.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A eliminates unnecessary words and improves clarity while maintaining meaning.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Structure Improvement'
  }),
  addRating({
    id: 'sat-doc-068',
    question: 'Which choice best supports the claim that technological progress can exacerbate inequality?',
    options: [
      { letter: 'A', text: 'Innovations often reduce costs for consumers.' },
      { letter: 'B', text: 'Automation disproportionately affects low-income workers.' },
      { letter: 'C', text: 'Advancements in AI improve efficiency in all sectors.' },
      { letter: 'D', text: 'Digital platforms increase global connectivity.' }
    ],
    correctAnswer: 'B',
    explanation: 'Automation replacing low-income jobs directly supports the claim about inequality.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Supporting Claims with Evidence'
  }),
  addRating({
    id: 'sat-doc-069',
    question: 'The author\'s tone in the passage is best described as:',
    options: [
      { letter: 'A', text: 'cautiously optimistic.' },
      { letter: 'B', text: 'vehemently critical.' },
      { letter: 'C', text: 'detached and analytical.' },
      { letter: 'D', text: 'exuberantly celebratory.' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage uses objective language and analysis, indicating a detached and analytical tone.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Author Tone Analysis'
  }),
  addRating({
    id: 'sat-doc-070',
    question: 'Which sentence most effectively combines the two ideas without redundancy? She admired the painting. The painting was created by a local artist.',
    options: [
      { letter: 'A', text: 'She admired the painting, which was created by a local artist.' },
      { letter: 'B', text: 'She admired the painting and it was created by a local artist.' },
      { letter: 'C', text: 'She admired the painting; the painting was by a local artist.' },
      { letter: 'D', text: 'She admired the painting because it was created by a local artist.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A combines the ideas smoothly without redundancy.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Sentence Combining'
  }),
  addRating({
    id: 'sat-doc-071',
    question: 'Which choice best maintains parallel structure? Original: The internship taught her to write clearly, think critically, and she learned collaboration.',
    options: [
      { letter: 'A', text: 'write clearly, think critically, and collaborate effectively.' },
      { letter: 'B', text: 'writing clearly, thinking critically, and collaboration.' },
      { letter: 'C', text: 'write clearly, thinking critically, and collaborating.' },
      { letter: 'D', text: 'writing clearly, think critically, and collaborate effectively.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A maintains parallel structure with all verbs in the same form.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Parallel Structure'
  }),
  addRating({
    id: 'sat-doc-072',
    question: 'Which choice most logically completes the sentence? Although the policy aimed to reduce emissions, critics argued that...',
    options: [
      { letter: 'A', text: 'it would accelerate climate change.' },
      { letter: 'B', text: 'its implementation was costly and ineffective.' },
      { letter: 'C', text: 'it was universally praised by environmentalists.' },
      { letter: 'D', text: 'it aligned with global sustainability goals.' }
    ],
    correctAnswer: 'B',
    explanation: 'Critics would argue against effectiveness, making B the best choice.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Logical Completion'
  }),
  addRating({
    id: 'sat-doc-073',
    question: 'Which choice best improves the clarity of the sentence? Original: Due to the fact that the project was delayed, the team had to work overtime.',
    options: [
      { letter: 'A', text: 'Because the project was delayed, the team had to work overtime.' },
      { letter: 'B', text: 'The project was delayed, so the team had to work overtime.' },
      { letter: 'C', text: 'The team had to work overtime due to the project delay.' },
      { letter: 'D', text: 'All of the above.' }
    ],
    correctAnswer: 'D',
    explanation: 'All options improve clarity compared to the original sentence.',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Clarity and Concision'
  }),
  addRating({
    id: 'sat-doc-074',
    question: 'Which choice best supports the argument that art influences culture?',
    options: [
      { letter: 'A', text: 'Art reflects societal values and norms.' },
      { letter: 'B', text: 'Art is often displayed in museums.' },
      { letter: 'C', text: 'Artists sometimes collaborate internationally.' },
      { letter: 'D', text: 'Art requires creativity and skill.' }
    ],
    correctAnswer: 'A',
    explanation: 'Option A directly connects art to cultural influence.',
    difficulty: 'hard',
    domain: 'Reading Comprehension',
    skill: 'Supporting Arguments'
  }),
  addRating({
    id: 'sat-doc-075',
    question: 'Which choice best maintains the formal tone? Original: The results were pretty surprising to the researchers.',
    options: [
      { letter: 'A', text: 'The results were quite surprising to the researchers.' },
      { letter: 'B', text: 'The results were surprising to the researchers.' },
      { letter: 'C', text: 'The results were rather surprising to the researchers.' },
      { letter: 'D', text: 'The results were significantly surprising to the researchers.' }
    ],
    correctAnswer: 'B',
    explanation: 'Option B is formal and concise, avoiding informal words like "pretty."',
    difficulty: 'hard',
    domain: 'Writing',
    skill: 'Formal Tone'
  })
];
