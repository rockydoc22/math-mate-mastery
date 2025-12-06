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
  })
];
