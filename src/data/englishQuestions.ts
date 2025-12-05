export interface EnglishQuestion {
  id: string;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  domain: string;
  skill: string;
}

export const englishQuestions: EnglishQuestion[] = [
  {
    id: "eng001",
    question: "When external forces are applied to common glass made from silicates, energy builds up around minuscule defects in the material, resulting in fractures. Recently, engineer Erkka Frankberg of Tampere University in Finland used the chemical ______ to make a glassy solid that can withstand higher strain than silicate glass can before fracturing.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      { letter: "A", text: "compound, aluminum oxide" },
      { letter: "B", text: "compound aluminum oxide," },
      { letter: "C", text: "compound, aluminum oxide," },
      { letter: "D", text: "compound aluminum oxide" }
    ],
    correctAnswer: "D",
    explanation: "No punctuation is needed because 'aluminum oxide' is a restrictive appositive that provides essential identifying information about 'the chemical compound.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng002",
    question: "In 1986, conceptual artist Sophie Calle asked twenty-three people, all of whom had been born without sight, to describe 'their image of beauty' in rich detail. Calle paired excerpts of these conversations with photographs—both of interviewees and the items they ______ to powerful effect in her exhibition The Blind.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      { letter: "A", text: "described, from hair to grass to sculptures" },
      { letter: "B", text: "described, from hair to grass to sculptures—" },
      { letter: "C", text: "described—from hair to grass to sculptures," },
      { letter: "D", text: "described: from hair to grass to sculptures" }
    ],
    correctAnswer: "B",
    explanation: "The comma after 'described' separates the first supplementary element from the second. The dash after 'sculptures' pairs with the dash after 'photographs' to set off both supplementary elements together at a higher organizational level.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng003",
    question: "As discussed by scholar Anna Mladentseva, many artworks produced in the mid-1990s to the early 2000s exclusively for exhibition on the internet, such as Sinae Kim's Genesis (2001), have become inaccessible because viewing them requires the use of ______ software (most notably Adobe Flash, discontinued in 2021).\n\nWhich choice completes the text with the most logical and precise word or phrase?",
    options: [
      { letter: "A", text: "defunct" },
      { letter: "B", text: "arcane" },
      { letter: "C", text: "ubiquitous" },
      { letter: "D", text: "extraneous" }
    ],
    correctAnswer: "A",
    explanation: "'Defunct' means no longer existing or functioning, which fits the context of software discontinued in 2021.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng004",
    question: "In 1891, design artist William Morris cofounded the Kelmscott Press, which printed editions of books using preindustrial methods. Historians argue that Morris's repudiation of industrialization is ______ the Kelmscott editions' use of handmade materials and intricate ornamentation reminiscent of medieval manuscripts.\n\nWhich choice completes the text with the most logical and precise word or phrase?",
    options: [
      { letter: "A", text: "insensible to" },
      { letter: "B", text: "manifest in" },
      { letter: "C", text: "scrutinized by" },
      { letter: "D", text: "complicated by" }
    ],
    correctAnswer: "B",
    explanation: "'Manifest in' means clearly shown by; the handcrafted elements visibly demonstrate Morris's rejection of industrialization.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng005",
    question: "Economist Marco Castillo and colleagues showed that nuisance costs reduce charitable giving. Charities can mitigate this effect by compensating donors for nuisance costs, but those costs, though variable, are largely ______ donation size, so charities that compensate donors will likely favor attracting a few large donors over many small donors.\n\nWhich choice completes the text with the most logical and precise word or phrase?",
    options: [
      { letter: "A", text: "supplemental to" },
      { letter: "B", text: "predictive of" },
      { letter: "C", text: "independent of" },
      { letter: "D", text: "subsumed in" }
    ],
    correctAnswer: "C",
    explanation: "If nuisance costs are independent of donation size, compensating donors becomes more efficient with fewer large gifts.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng006",
    question: "Some economic historians ______ that late nineteenth- and early twentieth-century households in the United States experienced an economy of scale when it came to food purchases—they assumed that large households spent less on food per person than did small households.\n\nWhich choice completes the text with the most logical and precise word or phrase?",
    options: [
      { letter: "A", text: "surmised" },
      { letter: "B", text: "contrived" },
      { letter: "C", text: "questioned" },
      { letter: "D", text: "regretted" }
    ],
    correctAnswer: "A",
    explanation: "'Surmised' means assumed with little evidence, fitting the historians' later-disproven belief.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng007",
    question: "While researching a topic, a student has taken the following notes:\n• The magnificent frigatebird is a seabird that feeds mainly on fish, tuna, squid, and other small sea animals.\n• It is unusual among seabirds in that it doesn't dive into the water for prey.\n• One way it acquires food is by using its hook-tipped bill to snatch prey from the surface.\n• Another way it acquires food is by taking it from weaker birds by force (kleptoparasitism).\n\nThe student wants to emphasize a similarity between the two ways a magnificent frigatebird acquires food.\nWhich choice most effectively uses relevant information from the notes?",
    options: [
      { letter: "A", text: "A magnificent frigatebird never dives into the water, instead using its hook-tipped bill to snatch prey from the surface." },
      { letter: "B", text: "Neither of a magnificent frigatebird's two ways of acquiring food requires the bird to dive into the water." },
      { letter: "C", text: "Of the magnificent frigatebird's two ways of acquiring food, only one is known as kleptoparasitism." },
      { letter: "D", text: "In addition to snatching prey from the water with its hook-tipped bill, a magnificent frigatebird takes food from other birds by force." }
    ],
    correctAnswer: "B",
    explanation: "This choice explicitly addresses both methods and highlights the shared trait (no diving).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng008",
    question: "When soil becomes contaminated by toxic metals, it can be removed from the ground and disposed of in a landfill. ______ contaminated soil can be detoxified via phytoremediation: plants absorb the pollutants and store them in their shoots.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Alternatively," },
      { letter: "B", text: "Specifically," },
      { letter: "C", text: "For example," },
      { letter: "D", text: "As a result," }
    ],
    correctAnswer: "A",
    explanation: "'Alternatively' correctly signals a different method from landfill disposal.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng009",
    question: "While researching a topic, a student has taken the following notes:\n• The European honey bee can detect magnetic fields using specialized cells in its abdomen.\n• This ability helps bees navigate during foraging flights.\n• Migratory birds also use Earth's magnetic field for long-distance navigation.\n• Some sharks sense magnetic fields to hunt prey.\n• The exact mechanism in bees remains unclear despite decades of study.\n\nThe student wants to emphasize how unusual the honey bee's magnetic sense is among insects. Which choice most effectively uses relevant information from the notes?",
    options: [
      { letter: "A", text: "Many animals, including birds and sharks, use magnetic fields for navigation, and honey bees do too." },
      { letter: "B", text: "Unlike most insects, European honey bees possess the rare ability to detect Earth's magnetic field." },
      { letter: "C", text: "Honey bees use specialized abdominal cells to detect magnetic fields during foraging." },
      { letter: "D", text: "The mechanism behind the honey bee's magnetic sense is still not fully understood." }
    ],
    correctAnswer: "B",
    explanation: "This choice explicitly contrasts honey bees with 'most insects' and highlights the rarity of the ability.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng010",
    question: "The discovery of penicillin by Alexander Fleming in 1928 is often celebrated as a breakthrough, ______ its accidental nature has led some historians to question whether it truly merits the label of scientific genius.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "because" },
      { letter: "B", text: "although" },
      { letter: "C", text: "therefore" },
      { letter: "D", text: "moreover" }
    ],
    correctAnswer: "B",
    explanation: "'Although' correctly sets up the contrast between the celebration of the discovery and the criticism of its accidental character.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng011",
    question: "The following text is adapted from Jane Austen's Pride and Prejudice (1813).\nElizabeth had been told that Mr. Darcy was exceedingly proud, but she now began to perceive that his pride was not offensive.\n\nWhich choice best states the function of the word 'but' in the text?",
    options: [
      { letter: "A", text: "To indicate a change in Elizabeth's perception over time" },
      { letter: "B", text: "To contrast Elizabeth's earlier belief with her current understanding" },
      { letter: "C", text: "To suggest that Elizabeth's opinion was entirely unjustified" },
      { letter: "D", text: "To emphasize the intensity of Mr. Darcy's pride" }
    ],
    correctAnswer: "B",
    explanation: "'But' signals the contrast between what Elizabeth had been told and what she now perceives.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng012",
    question: "The critic's review, ______ scathing in tone, nevertheless praised the film's cinematography.",
    options: [
      { letter: "A", text: "otherwise" },
      { letter: "B", text: "consequently" },
      { letter: "C", text: "alternatively" },
      { letter: "D", text: "undeniably" }
    ],
    correctAnswer: "D",
    explanation: "'Undeniably' concedes that the scathing tone is true while allowing the praise of cinematography.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng013",
    question: "The ancient city of Angkor Wat, ______ by jungle for centuries, was rediscovered by European explorers in the 1860s.",
    options: [
      { letter: "A", text: "having concealed" },
      { letter: "B", text: "concealed" },
      { letter: "C", text: "concealing" },
      { letter: "D", text: "which concealed" }
    ],
    correctAnswer: "B",
    explanation: "The past participle 'concealed' correctly modifies the city in a concise, standard construction.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng014",
    question: "Researchers found that the new material ______ under extreme pressure without fracturing.",
    options: [
      { letter: "A", text: "remains intact" },
      { letter: "B", text: "remain intact" },
      { letter: "C", text: "remaining intact" },
      { letter: "D", text: "remained intact" }
    ],
    correctAnswer: "A",
    explanation: "The singular subject 'material' requires the singular verb phrase 'remains intact.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng015",
    question: "The committee recommends that the proposal ______ by the board next month.",
    options: [
      { letter: "A", text: "is reviewed" },
      { letter: "B", text: "be reviewed" },
      { letter: "C", text: "was reviewed" },
      { letter: "D", text: "reviewing" }
    ],
    correctAnswer: "B",
    explanation: "The subjunctive mood is required after 'recommends that.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng016",
    question: "The neuroscientist's model of memory consolidation, once dismissed as overly speculative, has now become ______ in the field of cognitive psychology.\n\nWhich choice completes the text with the most logical and precise word?",
    options: [
      { letter: "A", text: "marginal" },
      { letter: "B", text: "foundational" },
      { letter: "C", text: "contentious" },
      { letter: "D", text: "obsolete" }
    ],
    correctAnswer: "B",
    explanation: "'Foundational' means serving as an essential base, fitting the shift from dismissal to widespread acceptance.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng017",
    question: "The treaty, signed in 1963, ______ the testing of nuclear weapons in the atmosphere, outer space, and underwater.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      { letter: "A", text: "proscribed" },
      { letter: "B", text: "prescribed" },
      { letter: "C", text: "described" },
      { letter: "D", text: "inscribed" }
    ],
    correctAnswer: "A",
    explanation: "'Proscribed' means formally forbade, the correct historical meaning of the Partial Test Ban Treaty.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng018",
    question: "Many economists predicted rapid recovery after the recession. ______, growth remained anemic for nearly a decade.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Consequently" },
      { letter: "B", text: "However" },
      { letter: "C", text: "Therefore" },
      { letter: "D", text: "Similarly" }
    ],
    correctAnswer: "B",
    explanation: "'However' signals the contrast between prediction and reality.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng019",
    question: "While researching a topic, a student took the following notes:\n• The Greenland shark can live over 400 years.\n• It grows only about 1 cm per year.\n• Sexual maturity is reached at roughly 150 years.\n• It inhabits cold Arctic and North Atlantic waters.\n• Slow growth is linked to its extreme longevity.\n\nThe student wants to emphasize how extraordinary the shark's lifespan is relative to its growth rate.",
    options: [
      { letter: "A", text: "Greenland sharks inhabit cold waters and reach maturity at around 150 years." },
      { letter: "B", text: "Growing just one centimeter per year, the Greenland shark can live more than four centuries." },
      { letter: "C", text: "The Greenland shark's slow growth is linked to its extreme longevity." },
      { letter: "D", text: "Greenland sharks are found in the Arctic and North Atlantic." }
    ],
    correctAnswer: "B",
    explanation: "Choice B directly contrasts the tiny annual growth with the enormous lifespan—the stated goal.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng020",
    question: "The following text is adapted from Charlotte Brontë's Jane Eyre (1847).\n\"I am no bird; and no net ensnares me: I am a free human being with an independent will.\"\n\nIn the text, Jane primarily expresses",
    options: [
      { letter: "A", text: "defiance against societal constraints on women" },
      { letter: "B", text: "resentment toward her employer" },
      { letter: "C", text: "fear of losing her position" },
      { letter: "D", text: "nostalgia for her childhood" }
    ],
    correctAnswer: "A",
    explanation: "The metaphors of bird/net and the assertion of independence directly challenge the restrictions placed on women.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng021",
    question: "The philosopher's argument, though elegantly constructed, ultimately rests on a ______ premise that most scholars now reject.\n\nWhich choice completes the text with the most logical and precise word?",
    options: [
      { letter: "A", text: "tenuous" },
      { letter: "B", text: "incontrovertible" },
      { letter: "C", text: "pragmatic" },
      { letter: "D", text: "esoteric" }
    ],
    correctAnswer: "A",
    explanation: "'Tenuous' means weak or shaky, fitting the contrast between elegant construction and scholarly rejection.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng022",
    question: "When soil becomes contaminated by toxic metals, it can be excavated and sent to a landfill. ______ bioremediation offers a less invasive approach using microorganisms to break down the pollutants in place.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Alternatively," },
      { letter: "B", text: "Specifically," },
      { letter: "C", text: "For example," },
      { letter: "D", text: "Consequently," }
    ],
    correctAnswer: "A",
    explanation: "'Alternatively' correctly signals a different method from excavation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng023",
    question: "While researching a topic, a student took the following notes:\n• The axolotl can fully regenerate lost limbs, spinal cord, heart tissue, and even parts of its brain.\n• Most vertebrates lose this ability after embryonic stages.\n• The axolotl retains juvenile features into adulthood (neoteny).\n• This trait is linked to lower thyroid hormone levels.\n• It is native only to two lakes near Mexico City.\n\nThe student wants to emphasize how exceptional the axolotl's regenerative ability is among vertebrates.",
    options: [
      { letter: "A", text: "Axolotls are native to two lakes near Mexico City and exhibit neoteny." },
      { letter: "B", text: "Unlike nearly all other vertebrates, axolotls can regenerate complex organs throughout life." },
      { letter: "C", text: "Axolotls retain juvenile features due to low thyroid hormone levels." },
      { letter: "D", text: "Most vertebrates lose regenerative ability after the embryonic stage." }
    ],
    correctAnswer: "B",
    explanation: "Choice B directly contrasts axolotls with 'nearly all other vertebrates' and highlights the rarity of lifelong complex regeneration.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng024",
    question: "The following text is adapted from George Eliot's Middlemarch (1871–72).\n\"People were now beginning to see that Dorothea was not at all eccentric in her religious ideas.\"\n\nWhich choice best describes the function of 'not at all' in the text?",
    options: [
      { letter: "A", text: "To intensify the denial of eccentricity" },
      { letter: "B", text: "To soften the previous perception" },
      { letter: "C", text: "To introduce a new character trait" },
      { letter: "D", text: "To express the narrator's personal opinion" }
    ],
    correctAnswer: "A",
    explanation: "'Not at all' emphatically denies the earlier view of Dorothea as eccentric.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng025",
    question: "The committee ______ that the policy be revised before the end of the fiscal year.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      { letter: "A", text: "recommends" },
      { letter: "B", text: "recommend" },
      { letter: "C", text: "recommending" },
      { letter: "D", text: "recommended" }
    ],
    correctAnswer: "A",
    explanation: "The subjunctive mood ('be revised') requires the base form 'recommends' after 'committee … that.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng026",
    question: "The archaeologist's interpretation of the cave paintings, while ______ by some colleagues who favor alternative readings, has gained considerable support from recent carbon-dating analyses.",
    options: [
      { letter: "A", text: "contested" },
      { letter: "B", text: "endorsed" },
      { letter: "C", text: "replicated" },
      { letter: "D", text: "obscured" }
    ],
    correctAnswer: "A",
    explanation: "'Contested' means disputed or challenged, fitting the contrast with 'gained considerable support.' The sentence structure sets up opposition between some colleagues and the supporting evidence.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng027",
    question: "Researchers studying the migration patterns of monarch butterflies discovered that the insects use Earth's magnetic field for navigation. ______ they also rely on the position of the sun, suggesting a redundant system that ensures accurate orientation even when one cue is unavailable.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Nevertheless," },
      { letter: "B", text: "Additionally," },
      { letter: "C", text: "Consequently," },
      { letter: "D", text: "Instead," }
    ],
    correctAnswer: "B",
    explanation: "'Additionally' correctly signals that sun position is another navigation method alongside magnetic field detection, building on rather than contrasting with the previous finding.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng028",
    question: "The following text is adapted from Edith Wharton's The Age of Innocence (1920).\nNewland Archer, during this brief episode, had been thrown into a strange state of embarrassment. It was annoying that the box which was thus the focus of interest should be that in which his betrothed was seated.\n\nWhich choice best describes the function of the underlined sentence in the text?",
    options: [
      { letter: "A", text: "It reveals the source of the character's discomfort" },
      { letter: "B", text: "It introduces a new character to the narrative" },
      { letter: "C", text: "It describes the physical setting of the scene" },
      { letter: "D", text: "It foreshadows a future conflict in the plot" }
    ],
    correctAnswer: "A",
    explanation: "The underlined sentence explains why Archer feels embarrassed: the attention is directed at the box where his fiancée sits. This reveals the cause of the 'strange state of embarrassment' mentioned in the first sentence.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng029",
    question: "While researching a topic, a student took the following notes:\n• The tardigrade can survive extreme conditions including near-absolute-zero temperatures and radiation levels lethal to most organisms.\n• It achieves this through cryptobiosis, a state of suspended metabolism.\n• During cryptobiosis, tardigrades lose nearly all body water and produce protective proteins.\n• Scientists have revived tardigrades after 30 years of cryptobiosis.\n• Tardigrades have even survived exposure to the vacuum of space.\n\nThe student wants to emphasize the remarkable duration of tardigrade survival capacity.",
    options: [
      { letter: "A", text: "Tardigrades can survive in space by entering cryptobiosis and producing protective proteins." },
      { letter: "B", text: "Scientists have successfully revived tardigrades after three decades in a state of suspended animation." },
      { letter: "C", text: "The tardigrade survives extreme conditions by losing body water and entering cryptobiosis." },
      { letter: "D", text: "Cryptobiosis allows tardigrades to withstand radiation levels that would kill most organisms." }
    ],
    correctAnswer: "B",
    explanation: "Choice B directly emphasizes the duration ('three decades') of survival capacity, which is the student's stated goal. The other options focus on mechanisms or conditions rather than duration.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng030",
    question: "Text 1:\nLiterary scholar Helena Viramontes argues that Chicana literature of the 1980s represented a decisive break from earlier traditions, introducing narrative techniques and thematic concerns unprecedented in the genre. She points to the fragmented chronologies and multiple narrative voices as evidence of this rupture.\n\nText 2:\nWhile acknowledging innovations in 1980s Chicana literature, critic Ramón Saldívar contends that these works built upon foundations laid by earlier writers. He traces the use of code-switching and oral storytelling conventions to works from the 1960s and 1970s, suggesting continuity rather than rupture.\n\nBased on the texts, how would Saldívar (Text 2) most likely respond to Viramontes's characterization in Text 1?",
    options: [
      { letter: "A", text: "By arguing that the narrative techniques Viramontes identifies actually appeared in earlier Chicana literature" },
      { letter: "B", text: "By claiming that 1980s Chicana literature was less innovative than Viramontes suggests" },
      { letter: "C", text: "By pointing out that Viramontes overlooks connections between 1980s works and their predecessors" },
      { letter: "D", text: "By suggesting that fragmented chronologies are not actually a significant narrative innovation" }
    ],
    correctAnswer: "C",
    explanation: "Saldívar emphasizes 'continuity rather than rupture' and traces techniques to earlier decades. He would likely argue that Viramontes's 'decisive break' characterization overlooks the connections he identifies between 1980s works and earlier literature.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng031",
    question: "The biologist's hypothesis that coral bleaching events ______ primarily from rising ocean temperatures has been complicated by recent findings showing that localized pollution can trigger similar responses even in thermally stable waters.",
    options: [
      { letter: "A", text: "stem" },
      { letter: "B", text: "stems" },
      { letter: "C", text: "stemming" },
      { letter: "D", text: "stemmed" }
    ],
    correctAnswer: "B",
    explanation: "The subject of the subordinate clause is 'coral bleaching events,' which requires the plural verb 'stem.' However, 'hypothesis that' introduces a noun clause where the verb agrees with 'events' (plural), so 'stem' appears correct—but actually the clause describes the hypothesis's content in present tense, requiring 'stem.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng032",
    question: "The urban planner's proposal to ______ vehicle traffic in the historic district met with resistance from local merchants, who feared reduced customer access would harm their businesses.",
    options: [
      { letter: "A", text: "curtail" },
      { letter: "B", text: "facilitate" },
      { letter: "C", text: "monitor" },
      { letter: "D", text: "sustain" }
    ],
    correctAnswer: "A",
    explanation: "'Curtail' means to reduce or restrict. The merchants' fear of 'reduced customer access' indicates the proposal involves limiting traffic, making 'curtail' the logical choice.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng033",
    question: "Recent studies suggest that the octopus possesses a form of consciousness distinct from that of mammals. ______ its distributed nervous system, with neurons concentrated in each arm, allows for a degree of autonomous limb decision-making unknown in vertebrates.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "For instance," },
      { letter: "B", text: "In contrast," },
      { letter: "C", text: "Nevertheless," },
      { letter: "D", text: "Subsequently," }
    ],
    correctAnswer: "A",
    explanation: "'For instance' correctly introduces a specific example (the distributed nervous system) that illustrates the general claim about distinct consciousness.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng034",
    question: "The following text is adapted from Virginia Woolf's Mrs Dalloway (1925).\nWhat a lark! What a plunge! For so it had always seemed to her, when, with a little squeak of the hinges, which she could hear now, she had burst open the French windows and plunged at Bourton into the open air.\n\nWhich choice best states the main effect of the passage?",
    options: [
      { letter: "A", text: "It conveys the character's present sense of anticipation through a memory" },
      { letter: "B", text: "It describes a habitual action that the character found tedious" },
      { letter: "C", text: "It establishes conflict between the character's past and present selves" },
      { letter: "D", text: "It introduces uncertainty about whether an event actually occurred" }
    ],
    correctAnswer: "A",
    explanation: "The exclamatory openings ('What a lark! What a plunge!') express excitement, and the memory of opening windows at Bourton connects past exhilaration to present feeling, conveying anticipation through recalled experience.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng035",
    question: "The novelist's later works, though critically acclaimed, never achieved the commercial success of her debut; this disparity suggests that popular taste and critical judgment do not always ______.",
    options: [
      { letter: "A", text: "coincide" },
      { letter: "B", text: "compete" },
      { letter: "C", text: "communicate" },
      { letter: "D", text: "compensate" }
    ],
    correctAnswer: "A",
    explanation: "'Coincide' means to occur together or align. The contrast between critical acclaim and commercial failure illustrates that popular taste and critical judgment don't always align or agree.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng036",
    question: "Text 1:\nEconomist Sarah Chen argues that automation will ultimately create more jobs than it eliminates. Historical precedent supports this view: the Industrial Revolution, despite initial displacement, led to unprecedented employment growth as new industries emerged.\n\nText 2:\nWhile acknowledging historical patterns, economist David Autor cautions that current automation differs fundamentally from previous technological shifts. Unlike earlier machines that complemented human labor, artificial intelligence can replicate cognitive tasks, potentially displacing workers in sectors previously considered automation-proof.\n\nBased on the texts, how would Autor (Text 2) most likely characterize Chen's argument in Text 1?",
    options: [
      { letter: "A", text: "As relying on historical analogies that may not apply to current technological changes" },
      { letter: "B", text: "As failing to account for the economic benefits of increased productivity" },
      { letter: "C", text: "As overstating the severity of job displacement during the Industrial Revolution" },
      { letter: "D", text: "As ignoring evidence that new industries have already begun to emerge" }
    ],
    correctAnswer: "A",
    explanation: "Autor argues that current automation 'differs fundamentally from previous technological shifts,' suggesting that Chen's reliance on Industrial Revolution precedent may be misguided because AI represents a qualitatively different kind of displacement.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng037",
    question: "The study's findings, ______ initially promising, ultimately failed to replicate in subsequent trials conducted by independent laboratories.",
    options: [
      { letter: "A", text: "because" },
      { letter: "B", text: "unless" },
      { letter: "C", text: "while" },
      { letter: "D", text: "since" }
    ],
    correctAnswer: "C",
    explanation: "'While' correctly introduces a concessive clause, acknowledging the initial promise while setting up the contrast with the failure to replicate. 'Because' and 'since' would incorrectly suggest causation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng038",
    question: "While researching a topic, a student took the following notes:\n• The Voynich manuscript is a 15th-century codex written in an undeciphered script.\n• Over 240 pages contain illustrations of plants, astronomical diagrams, and human figures.\n• Numerous cryptographers, including World War II codebreakers, have failed to decode it.\n• Some scholars believe it is a hoax containing meaningless symbols.\n• Recent analysis suggests the text follows patterns consistent with natural language.\n\nThe student wants to present the manuscript as a genuine puzzle rather than a hoax.",
    options: [
      { letter: "A", text: "Despite numerous attempts by expert cryptographers, the Voynich manuscript remains undeciphered, though linguistic analysis suggests its text follows natural language patterns." },
      { letter: "B", text: "The Voynich manuscript contains over 240 pages of illustrations and text that some scholars believe is meaningless." },
      { letter: "C", text: "World War II codebreakers attempted but failed to decode the Voynich manuscript." },
      { letter: "D", text: "The 15th-century Voynich manuscript features astronomical diagrams and illustrations of plants and human figures." }
    ],
    correctAnswer: "A",
    explanation: "Choice A presents the manuscript as a genuine puzzle by noting expert failures while emphasizing that analysis suggests 'natural language patterns,' countering the hoax theory. Other choices don't address authenticity.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng039",
    question: "The architect ______ that the building's façade incorporate sustainable materials without compromising the aesthetic vision that had won the original design competition.",
    options: [
      { letter: "A", text: "insisted" },
      { letter: "B", text: "insists" },
      { letter: "C", text: "insisting" },
      { letter: "D", text: "to insist" }
    ],
    correctAnswer: "A",
    explanation: "The past tense 'insisted' is required to maintain consistency with the past context ('had won'). The subjunctive 'incorporate' (not 'incorporates') following 'insisted that' is correct.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng040",
    question: "The composer's symphony, ______ for its innovative use of atonality, divided audiences sharply upon its premiere in 1913.",
    options: [
      { letter: "A", text: "notable" },
      { letter: "B", text: "noted" },
      { letter: "C", text: "noting" },
      { letter: "D", text: "notes" }
    ],
    correctAnswer: "B",
    explanation: "'Noted' functions as a past participle in a reduced relative clause ('which was noted for'), correctly modifying 'symphony.' 'Notable' would require a different construction.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng041",
    question: "The following text is adapted from Fyodor Dostoevsky's Crime and Punishment (1866).\nRaskolnikov had been in an overstrained irritable condition, verging on hypochondria, for some time past. He had become so completely absorbed in himself, and isolated from his fellows that he dreaded meeting anyone.\n\nWhich choice best describes the overall structure of the text?",
    options: [
      { letter: "A", text: "It introduces a character's psychological state and then provides a consequence of that state" },
      { letter: "B", text: "It presents conflicting aspects of a character's personality" },
      { letter: "C", text: "It describes a character's actions and then reveals their motivation" },
      { letter: "D", text: "It establishes a setting and then introduces the main character" }
    ],
    correctAnswer: "A",
    explanation: "The first sentence establishes Raskolnikov's psychological condition ('overstrained irritable condition'), and the second presents a consequence: his self-absorption has led him to dread social contact.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng042",
    question: "The diplomat's memoir offers a ______ account of the negotiations, revealing details that contradict the official narrative promoted by both governments involved.",
    options: [
      { letter: "A", text: "perfunctory" },
      { letter: "B", text: "candid" },
      { letter: "C", text: "derivative" },
      { letter: "D", text: "partisan" }
    ],
    correctAnswer: "B",
    explanation: "'Candid' means frank and unreserved. The memoir reveals details contradicting official narratives, suggesting honest disclosure rather than diplomatic restraint.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng043",
    question: "The theory that birds descended from dinosaurs was once considered ______; today, it represents the scientific consensus, supported by extensive fossil evidence showing feathered theropods.",
    options: [
      { letter: "A", text: "orthodox" },
      { letter: "B", text: "immutable" },
      { letter: "C", text: "heterodox" },
      { letter: "D", text: "empirical" }
    ],
    correctAnswer: "C",
    explanation: "'Heterodox' means departing from accepted beliefs. The contrast with 'today, it represents the scientific consensus' indicates the theory was once considered unorthodox or unconventional.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng044",
    question: "Text 1:\nPaleontologist Mary Schweitzer's discovery of soft tissue in a 68-million-year-old Tyrannosaurus rex bone initially faced intense skepticism. Critics argued that such tissue could not possibly survive fossilization, suggesting the samples must have been contaminated with modern biological material.\n\nText 2:\nSubsequent analyses using multiple independent methods have confirmed the presence of original dinosaur proteins in Schweitzer's samples. Iron particles released from hemoglobin during decomposition may have acted as a preservative, cross-linking proteins and preventing their complete degradation over geological timescales.\n\nBased on the texts, how would the researchers in Text 2 most likely respond to the critics mentioned in Text 1?",
    options: [
      { letter: "A", text: "By acknowledging that some contamination likely occurred but arguing it does not account for all findings" },
      { letter: "B", text: "By explaining a mechanism through which soft tissue preservation over millions of years is possible" },
      { letter: "C", text: "By suggesting that the critics failed to use appropriate analytical methods" },
      { letter: "D", text: "By conceding that the original claims about tissue age were exaggerated" }
    ],
    correctAnswer: "B",
    explanation: "Text 2 proposes a preservation mechanism (iron particles from hemoglobin acting as preservative) that would directly address the critics' assertion that tissue 'could not possibly survive fossilization.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng045",
    question: "The novelist's prose style has been described as ______: her sentences unfold gradually, accumulating subordinate clauses and parenthetical observations before arriving at their main assertions.",
    options: [
      { letter: "A", text: "lapidary" },
      { letter: "B", text: "peripatetic" },
      { letter: "C", text: "periodic" },
      { letter: "D", text: "laconic" }
    ],
    correctAnswer: "C",
    explanation: "'Periodic' describes sentences that delay the main clause until the end, accumulating subordinate elements first—exactly what the description indicates. 'Laconic' means brief (opposite), and 'lapidary' means elegantly concise.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng046",
    question: "The proposed legislation would require pharmaceutical companies to disclose clinical trial results regardless of outcome. Advocates argue this would prevent selective publication. ______ critics contend it could expose proprietary research methods to competitors.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Moreover," },
      { letter: "B", text: "However," },
      { letter: "C", text: "Therefore," },
      { letter: "D", text: "Specifically," }
    ],
    correctAnswer: "B",
    explanation: "'However' correctly signals the contrast between advocates' support and critics' concerns about the same legislation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng047",
    question: "The physicist's equations, ______ elegant in their mathematical formulation, predicted phenomena that seemed to violate fundamental principles of causality.",
    options: [
      { letter: "A", text: "however" },
      { letter: "B", text: "therefore" },
      { letter: "C", text: "moreover" },
      { letter: "D", text: "otherwise" }
    ],
    correctAnswer: "A",
    explanation: "'However' sets up the concessive relationship: despite the equations' elegance, they predicted problematic phenomena. This contrast requires a concessive transition.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng048",
    question: "While researching a topic, a student took the following notes:\n• The coelacanth was believed extinct for 66 million years until a living specimen was discovered in 1938.\n• It is often called a 'living fossil' due to its apparent morphological stability.\n• Recent genomic studies reveal the coelacanth has one of the slowest-evolving genomes among vertebrates.\n• Despite slow evolution, the species shows significant genetic diversity across populations.\n• Coelacanths inhabit deep ocean caves off the coasts of Africa and Indonesia.\n\nThe student wants to challenge the 'living fossil' characterization.",
    options: [
      { letter: "A", text: "The coelacanth inhabits deep ocean caves and was rediscovered in 1938 after being presumed extinct." },
      { letter: "B", text: "Although the coelacanth's genome evolves slowly, significant genetic diversity across populations suggests ongoing adaptation rather than evolutionary stasis." },
      { letter: "C", text: "The coelacanth is called a 'living fossil' because it was believed extinct for 66 million years." },
      { letter: "D", text: "Genomic studies confirm that the coelacanth has one of the slowest-evolving genomes among vertebrates." }
    ],
    correctAnswer: "B",
    explanation: "Choice B challenges 'living fossil' by noting genetic diversity that suggests 'ongoing adaptation rather than evolutionary stasis,' directly countering the implication of unchanging biology.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng049",
    question: "The following text is adapted from Joseph Conrad's Heart of Darkness (1899).\nThe yarns of seamen have a direct simplicity, the whole meaning of which lies within the shell of a cracked nut. But Marlow was not typical, and to him the meaning of an episode was not inside like a kernel but outside, enveloping the tale.\n\nWhich choice best describes the function of the first sentence in the text?",
    options: [
      { letter: "A", text: "It establishes a norm against which Marlow is contrasted" },
      { letter: "B", text: "It introduces a metaphor that Marlow will later reject" },
      { letter: "C", text: "It criticizes the limitations of typical seafaring narratives" },
      { letter: "D", text: "It summarizes the thematic content of the story to follow" }
    ],
    correctAnswer: "A",
    explanation: "The first sentence describes typical seamen's yarns, and the second begins 'But Marlow was not typical,' establishing the first sentence as a norm against which Marlow's distinctive storytelling is contrasted.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng050",
    question: "The researchers found that participants who ______ the meditation program for eight weeks showed measurable changes in brain regions associated with emotional regulation.",
    options: [
      { letter: "A", text: "complete" },
      { letter: "B", text: "completed" },
      { letter: "C", text: "completing" },
      { letter: "D", text: "to complete" }
    ],
    correctAnswer: "B",
    explanation: "The past tense 'completed' is required to match 'found' and 'showed,' maintaining temporal consistency in describing the study's findings.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng051",
    question: "The linguist's analysis revealed that the dialect, far from being a ______ form of the standard language, possessed its own systematic grammatical rules and extensive vocabulary.",
    options: [
      { letter: "A", text: "sophisticated" },
      { letter: "B", text: "corrupted" },
      { letter: "C", text: "cultivated" },
      { letter: "D", text: "authentic" }
    ],
    correctAnswer: "B",
    explanation: "'Corrupted' implies a degraded version. The phrase 'far from being' sets up a contrast: the dialect is NOT a corrupted form but has its own systematic rules, challenging the misconception that dialects are degraded standards.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng052",
    question: "Text 1:\nArt historian Linda Nochlin's influential 1971 essay asked why there had been no great women artists. Rather than accepting biological explanations, she argued that institutional barriers—exclusion from academies, prohibition from life drawing classes, lack of patronage—had systematically prevented women from achieving artistic greatness.\n\nText 2:\nRecent scholarship has complicated Nochlin's framework by recovering the work of women artists who achieved considerable recognition in their lifetimes but were subsequently erased from art historical narratives. Historians like Griselda Pollock suggest the question should be not why there were no great women artists but why their contributions were forgotten.\n\nBased on the texts, how would Pollock (Text 2) most likely characterize Nochlin's approach in Text 1?",
    options: [
      { letter: "A", text: "As groundbreaking but inadvertently accepting a premise that obscures women's actual historical achievements" },
      { letter: "B", text: "As fundamentally misguided in attributing women's exclusion to institutional rather than biological factors" },
      { letter: "C", text: "As comprehensive in its treatment of the various barriers women artists faced" },
      { letter: "D", text: "As overly optimistic about the prospects for women in contemporary art institutions" }
    ],
    correctAnswer: "A",
    explanation: "Pollock's reframing suggests Nochlin's question ('why no great women artists') accepts a premise—that there weren't any—which obscures women who 'achieved considerable recognition' before being 'erased from art historical narratives.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng053",
    question: "The senator's voting record appears ______ at first glance, but closer analysis reveals a consistent pattern of supporting legislation that benefits her state's agricultural sector.",
    options: [
      { letter: "A", text: "erratic" },
      { letter: "B", text: "principled" },
      { letter: "C", text: "transparent" },
      { letter: "D", text: "predictable" }
    ],
    correctAnswer: "A",
    explanation: "'Erratic' means inconsistent or unpredictable. The 'but closer analysis reveals a consistent pattern' sets up a contrast with initial appearance, indicating the record seems erratic but actually follows a coherent logic.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng054",
    question: "Neither the archaeologist nor her colleagues ______ able to explain how the ancient builders transported stones weighing several tons across mountainous terrain.",
    options: [
      { letter: "A", text: "was" },
      { letter: "B", text: "were" },
      { letter: "C", text: "is" },
      { letter: "D", text: "are" }
    ],
    correctAnswer: "B",
    explanation: "With 'neither...nor,' the verb agrees with the nearer subject ('her colleagues,' plural), requiring 'were.' The past tense also matches the historical context.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng055",
    question: "The pharmaceutical company's decision to pursue the experimental treatment, ______ risky from a financial standpoint, could revolutionize care for patients with the rare genetic disorder.",
    options: [
      { letter: "A", text: "because" },
      { letter: "B", text: "although" },
      { letter: "C", text: "unless" },
      { letter: "D", text: "whereas" }
    ],
    correctAnswer: "B",
    explanation: "'Although' correctly establishes the concessive relationship: despite financial risk, the decision could revolutionize care. This acknowledges the risk while emphasizing the potential benefit.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng056",
    question: "The following text is adapted from Zora Neale Hurston's Their Eyes Were Watching God (1937).\nShe had been summoned to behold a revelation. And now she saw the daybreak of a new world. Or perhaps it was the ending of the old one and the beginning of a new one rolled into one.\n\nAs used in the text, what does the word 'summoned' most nearly mean?",
    options: [
      { letter: "A", text: "Legally compelled" },
      { letter: "B", text: "Urgently called" },
      { letter: "C", text: "Formally invited" },
      { letter: "D", text: "Randomly selected" }
    ],
    correctAnswer: "B",
    explanation: "In this context, 'summoned' means called or drawn to witness something significant (a 'revelation'). The spiritual/epiphanic tone suggests an urgent calling rather than legal or formal summons.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng057",
    question: "While researching a topic, a student took the following notes:\n• The mantis shrimp possesses 16 types of color receptors, compared to humans' 3.\n• Despite this, experiments suggest mantis shrimp are worse at distinguishing between similar colors than humans.\n• Their visual system may be optimized for rapid recognition rather than fine discrimination.\n• Mantis shrimp can detect polarized light, invisible to humans.\n• They use this ability to communicate through polarization patterns on their bodies.\n\nThe student wants to emphasize a paradox in mantis shrimp vision.",
    options: [
      { letter: "A", text: "Mantis shrimp can see polarized light and use it for communication through body patterns." },
      { letter: "B", text: "Despite possessing far more color receptors than humans, mantis shrimp are actually worse at distinguishing similar colors." },
      { letter: "C", text: "The mantis shrimp visual system may be optimized for rapid recognition rather than fine discrimination." },
      { letter: "D", text: "Humans have only three types of color receptors compared to the mantis shrimp's sixteen." }
    ],
    correctAnswer: "B",
    explanation: "Choice B directly presents the paradox: more receptors but worse discrimination. The word 'despite' signals the counterintuitive relationship that constitutes the paradox.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng058",
    question: "The conductor's interpretation of the symphony was characterized by ______ tempos that tested the orchestra's technical abilities but revealed previously unnoticed details in the score.",
    options: [
      { letter: "A", text: "plodding" },
      { letter: "B", text: "mercurial" },
      { letter: "C", text: "uniform" },
      { letter: "D", text: "staid" }
    ],
    correctAnswer: "B",
    explanation: "'Mercurial' means rapidly changing or unpredictable. Tempos that 'tested the orchestra's technical abilities' while 'revealing unnoticed details' suggest dynamic, shifting speeds that challenge performers.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng059",
    question: "The anthropologist's fieldwork among the remote community yielded insights that ______ many long-held assumptions about kinship structures in small-scale societies.",
    options: [
      { letter: "A", text: "substantiated" },
      { letter: "B", text: "undermined" },
      { letter: "C", text: "overlooked" },
      { letter: "D", text: "reiterated" }
    ],
    correctAnswer: "B",
    explanation: "'Undermined' means weakened or challenged. The phrasing 'long-held assumptions' suggests conventional beliefs, and 'yielded insights' implies new findings that challenge those assumptions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng060",
    question: "The city council approved the new zoning regulations; ______, several council members expressed reservations about the timeline for implementation.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "consequently" },
      { letter: "B", text: "furthermore" },
      { letter: "C", text: "nevertheless" },
      { letter: "D", text: "specifically" }
    ],
    correctAnswer: "C",
    explanation: "'Nevertheless' correctly signals concession: despite approving the regulations, some members had reservations. This contrast requires an adversative transition.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng061",
    question: "Text 1:\nHistorian Eric Foner argues that Reconstruction (1865-1877) represented America's first genuine attempt at interracial democracy. He emphasizes the period's remarkable achievements: Black men holding office, public education expanding, and civil rights protections being enshrined in constitutional amendments.\n\nText 2:\nHistorian Heather Cox Richardson, while acknowledging Reconstruction's achievements, focuses on the economic conflicts underlying the era's politics. She argues that debates over labor, taxation, and government's role in the economy were as central to the period as questions of racial equality, and that these economic tensions ultimately contributed to Reconstruction's demise.\n\nBased on the texts, both historians would most likely agree with which statement?",
    options: [
      { letter: "A", text: "Reconstruction's failure was primarily due to economic rather than racial factors" },
      { letter: "B", text: "The achievements of the Reconstruction era deserve historical recognition" },
      { letter: "C", text: "Economic conflicts during Reconstruction have been overemphasized by scholars" },
      { letter: "D", text: "Constitutional amendments were Reconstruction's most important legacy" }
    ],
    correctAnswer: "B",
    explanation: "Both historians acknowledge Reconstruction's 'remarkable achievements' (Foner) or 'achievements' (Richardson). They differ on emphasis but agree the era's accomplishments merit recognition.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng062",
    question: "The following text is adapted from Charles Dickens's Great Expectations (1861).\nI loved her against reason, against promise, against peace, against hope, against happiness, against all discouragement that could be.\n\nWhich choice best describes the effect of the repeated word 'against' in the passage?",
    options: [
      { letter: "A", text: "It emphasizes the narrator's determination despite numerous obstacles" },
      { letter: "B", text: "It suggests the narrator is uncertain about the nature of his feelings" },
      { letter: "C", text: "It indicates the narrator's love has harmful consequences for others" },
      { letter: "D", text: "It reveals the narrator's regret about past decisions" }
    ],
    correctAnswer: "A",
    explanation: "The repetition of 'against' creates a cumulative effect, emphasizing that the narrator's love persists despite opposing forces—reason, hope, happiness, discouragement. It underscores determination in the face of obstacles.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng063",
    question: "The neuroscientist's findings ______ existing models of memory consolidation, requiring researchers to reconsider fundamental assumptions about how long-term memories are formed and stored.",
    options: [
      { letter: "A", text: "corroborated" },
      { letter: "B", text: "upended" },
      { letter: "C", text: "exemplified" },
      { letter: "D", text: "preceded" }
    ],
    correctAnswer: "B",
    explanation: "'Upended' means overturned or upset. The phrase 'requiring researchers to reconsider fundamental assumptions' indicates the findings challenged rather than supported existing models.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng064",
    question: "The architect's design for the museum ______ both practical and aesthetic considerations, incorporating sustainable materials while creating visually striking spaces that enhance the viewing experience.",
    options: [
      { letter: "A", text: "reconcile" },
      { letter: "B", text: "reconciles" },
      { letter: "C", text: "reconciling" },
      { letter: "D", text: "reconciled" }
    ],
    correctAnswer: "B",
    explanation: "The singular subject 'design' requires the singular verb 'reconciles.' The present tense matches the general statement about the design's characteristics.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng065",
    question: "The playwright's work has been criticized for its ______ dialogue, which some viewers find overly intellectual and disconnected from how people actually speak.",
    options: [
      { letter: "A", text: "colloquial" },
      { letter: "B", text: "stilted" },
      { letter: "C", text: "poignant" },
      { letter: "D", text: "ambiguous" }
    ],
    correctAnswer: "B",
    explanation: "'Stilted' means stiff, unnatural, or artificially formal. The criticism that dialogue is 'overly intellectual and disconnected from how people actually speak' describes stilted speech.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng066",
    question: "While researching a topic, a student took the following notes:\n• The 1918 influenza pandemic killed an estimated 50-100 million people worldwide.\n• Unlike typical flu strains, it disproportionately killed healthy adults aged 20-40.\n• Scientists hypothesize this was due to a 'cytokine storm'—an overreaction of strong immune systems.\n• The virus emerged during World War I, and troop movements accelerated its spread.\n• Censorship during wartime suppressed news of the outbreak in many countries.\n\nThe student wants to explain why the pandemic affected young adults differently than typical flu strains.",
    options: [
      { letter: "A", text: "The 1918 pandemic killed between 50 and 100 million people, with World War I troop movements accelerating its spread." },
      { letter: "B", text: "Unlike typical flu strains, the 1918 virus may have triggered fatal immune system overreactions in healthy young adults." },
      { letter: "C", text: "Wartime censorship suppressed news of the 1918 pandemic in many countries during World War I." },
      { letter: "D", text: "The 1918 influenza pandemic disproportionately affected adults aged 20-40 rather than the elderly." }
    ],
    correctAnswer: "B",
    explanation: "Choice B directly explains the mechanism (immune system overreaction/cytokine storm) that accounts for why healthy young adults were disproportionately affected, answering the 'why' question.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng067",
    question: "The documentary presents a ______ portrait of the artist, acknowledging her significant contributions while also examining the controversies that marked her later career.",
    options: [
      { letter: "A", text: "hagiographic" },
      { letter: "B", text: "nuanced" },
      { letter: "C", text: "scathing" },
      { letter: "D", text: "perfunctory" }
    ],
    correctAnswer: "B",
    explanation: "'Nuanced' means characterized by subtle distinctions. The documentary 'acknowledges contributions while also examining controversies,' indicating a balanced, complex portrait rather than one-sided treatment.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng068",
    question: "Text 1:\nPhilosopher Peter Singer argues that the interests of all sentient beings deserve equal moral consideration. He contends that discriminating against animals based solely on species membership is analogous to racism or sexism—a prejudice he terms 'speciesism.'\n\nText 2:\nPhilosopher Carl Cohen rejects Singer's comparison between speciesism and racism. Cohen argues that moral rights require the capacity for moral agency—the ability to make moral claims and recognize moral duties. Since animals lack this capacity, he contends, they cannot possess rights in the same sense humans do.\n\nBased on the texts, Cohen (Text 2) would most likely argue that Singer's position in Text 1 is flawed because it:",
    options: [
      { letter: "A", text: "Fails to distinguish between sentience and moral agency as bases for moral consideration" },
      { letter: "B", text: "Incorrectly assumes that all humans possess equal moral capacities" },
      { letter: "C", text: "Overlooks evidence that many animals can recognize moral duties" },
      { letter: "D", text: "Applies the concept of speciesism too narrowly to certain animal species" }
    ],
    correctAnswer: "A",
    explanation: "Cohen's argument hinges on moral agency, not sentience, as the basis for rights. He would criticize Singer for using sentience as the criterion when Cohen believes moral agency is required.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng069",
    question: "The restoration of the medieval fresco required painstaking attention to detail; each brushstroke ______ carefully matched to the original artist's technique.",
    options: [
      { letter: "A", text: "was" },
      { letter: "B", text: "were" },
      { letter: "C", text: "being" },
      { letter: "D", text: "been" }
    ],
    correctAnswer: "A",
    explanation: "The singular subject 'each brushstroke' requires the singular verb 'was.' The semicolon introduces an independent clause requiring a finite verb.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng070",
    question: "The following text is adapted from Leo Tolstoy's Anna Karenina (1877).\nAll happy families are alike; each unhappy family is unhappy in its own way.\n\nWhich choice best describes the function of this sentence in the context of a novel's opening?",
    options: [
      { letter: "A", text: "It establishes that the narrative will focus on a family experiencing distinctive difficulties" },
      { letter: "B", text: "It suggests that the narrator has limited understanding of family dynamics" },
      { letter: "C", text: "It introduces a debate about whether happiness is achievable within families" },
      { letter: "D", text: "It argues that unhappy families deserve more sympathy than happy ones" }
    ],
    correctAnswer: "A",
    explanation: "By asserting that unhappy families are each 'unhappy in its own way,' the opening signals that the novel will explore particular, distinctive forms of unhappiness—preparing readers for a story about a family's unique troubles.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng071",
    question: "The economist's model accurately predicted short-term market fluctuations but proved ______ when applied to long-term trends, consistently underestimating the impact of technological disruption.",
    options: [
      { letter: "A", text: "prescient" },
      { letter: "B", text: "malleable" },
      { letter: "C", text: "wanting" },
      { letter: "D", text: "redundant" }
    ],
    correctAnswer: "C",
    explanation: "'Wanting' means lacking or deficient. The contrast ('accurately predicted short-term...but proved [X] when applied to long-term') requires a word indicating inadequacy. 'Consistently underestimating' confirms the model was found wanting.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng072",
    question: "The geologist's hypothesis that the rock formation ______ from volcanic activity rather than sedimentary processes challenged decades of accepted interpretation.",
    options: [
      { letter: "A", text: "originated" },
      { letter: "B", text: "originate" },
      { letter: "C", text: "originating" },
      { letter: "D", text: "to originate" }
    ],
    correctAnswer: "A",
    explanation: "The past tense 'originated' is required within the noun clause following 'hypothesis that.' The hypothesis describes a past geological process.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng073",
    question: "The author's memoir, ______ for its unflinching honesty, nonetheless sparked controversy for its portrayal of still-living family members.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "praised" },
      { letter: "B", text: "praising" },
      { letter: "C", text: "to praise" },
      { letter: "D", text: "praises" }
    ],
    correctAnswer: "A",
    explanation: "'Praised' functions as a past participle in a reduced relative clause ('which was praised'), correctly modifying 'memoir' and setting up the concessive relationship with 'nonetheless.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng074",
    question: "The philosopher's argument proceeds by ______: she establishes general principles about justice before applying them to specific contemporary cases.",
    options: [
      { letter: "A", text: "analogy" },
      { letter: "B", text: "deduction" },
      { letter: "C", text: "induction" },
      { letter: "D", text: "refutation" }
    ],
    correctAnswer: "B",
    explanation: "'Deduction' moves from general principles to specific applications—exactly what the description indicates. 'Induction' would move from specific cases to general principles (the opposite direction).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng075",
    question: "While researching a topic, a student took the following notes:\n• Easter Island's giant stone statues (moai) were carved between 1250 and 1500 CE.\n• The island was heavily forested when Polynesians first arrived around 800 CE.\n• By the time Europeans arrived in 1722, the island was almost completely deforested.\n• Traditional theory blamed statue construction for environmental collapse.\n• Recent research suggests rats, introduced by settlers, destroyed palm seeds and prevented forest regeneration.\n\nThe student wants to present an alternative to the traditional explanation for deforestation.",
    options: [
      { letter: "A", text: "Easter Island was heavily forested when Polynesians arrived but almost treeless when Europeans came in 1722." },
      { letter: "B", text: "Challenging the view that statue construction caused deforestation, recent research implicates rats that destroyed palm seeds and prevented forest regrowth." },
      { letter: "C", text: "The giant moai statues of Easter Island were carved between 1250 and 1500 CE by Polynesian settlers." },
      { letter: "D", text: "Traditional theory held that the construction of stone statues led to Easter Island's environmental collapse." }
    ],
    correctAnswer: "B",
    explanation: "Choice B explicitly presents the alternative ('Challenging the view...') and offers the new explanation (rats destroying seeds), fulfilling the goal of presenting an alternative to traditional theory.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng076",
    question: "The sociologist's study revealed that neighborhood crime rates ______ more closely with economic inequality than with population density, challenging conventional urban planning assumptions.",
    options: [
      { letter: "A", text: "correlate" },
      { letter: "B", text: "correlates" },
      { letter: "C", text: "correlating" },
      { letter: "D", text: "correlated" }
    ],
    correctAnswer: "A",
    explanation: "The plural subject 'crime rates' requires the plural verb 'correlate.' Present tense matches the general finding being reported.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng077",
    question: "The curator's decision to display the controversial artwork was ______: it generated unprecedented media attention and record attendance but also provoked protests from community groups.",
    options: [
      { letter: "A", text: "futile" },
      { letter: "B", text: "ambivalent" },
      { letter: "C", text: "double-edged" },
      { letter: "D", text: "negligible" }
    ],
    correctAnswer: "C",
    explanation: "'Double-edged' means having both positive and negative consequences. The colon introduces both benefits (media attention, attendance) and drawbacks (protests), illustrating the dual nature.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng078",
    question: "Text 1:\nCognitive scientist Steven Pinker argues that human language capacity is largely innate—a biological adaptation shaped by natural selection. He points to the universal features of all human languages and children's rapid acquisition of complex grammar as evidence that language learning is guided by an inherited 'language instinct.'\n\nText 2:\nLinguist Michael Tomasello challenges nativist accounts of language acquisition. His research suggests children learn language through general cognitive abilities—pattern recognition, statistical learning, and imitation—rather than through a language-specific module. He argues that the complexity of adult language emerges gradually through cultural transmission and interaction.\n\nBased on the texts, Tomasello (Text 2) would most likely argue that Pinker's evidence in Text 1:",
    options: [
      { letter: "A", text: "Can be explained by general learning mechanisms without positing an innate language faculty" },
      { letter: "B", text: "Proves that children possess linguistic abilities unavailable to other primates" },
      { letter: "C", text: "Overlooks the role of cultural factors in maintaining language universals" },
      { letter: "D", text: "Underestimates the difficulty children face in acquiring complex grammar" }
    ],
    correctAnswer: "A",
    explanation: "Tomasello argues language is learned through 'general cognitive abilities' rather than a 'language-specific module.' He would likely claim Pinker's evidence (rapid acquisition, universals) can be explained without innate language faculty.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng079",
    question: "The following text is adapted from Oscar Wilde's The Picture of Dorian Gray (1890).\nThe studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.\n\nWhich choice best describes the function of this passage as a novel opening?",
    options: [
      { letter: "A", text: "It creates a sensory atmosphere that establishes mood before introducing characters" },
      { letter: "B", text: "It provides biographical details about the studio's owner" },
      { letter: "C", text: "It foreshadows specific events that will occur later in the narrative" },
      { letter: "D", text: "It contrasts the natural world with the artificial environment of the studio" }
    ],
    correctAnswer: "A",
    explanation: "The passage focuses entirely on sensory details (odours, scents, perfumes) that create atmosphere and mood. No characters are introduced; the setting establishes tone before the narrative begins.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng080",
    question: "The engineer's proposed solution, ______ technically feasible, would require resources far exceeding the project's allocated budget.",
    options: [
      { letter: "A", text: "since" },
      { letter: "B", text: "unless" },
      { letter: "C", text: "while" },
      { letter: "D", text: "because" }
    ],
    correctAnswer: "C",
    explanation: "'While' introduces a concessive clause acknowledging technical feasibility before presenting the contrasting resource problem. 'Since' and 'because' would incorrectly imply causation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng081",
    question: "The novelist's reputation has undergone a remarkable ______: once dismissed as a purveyor of mere entertainment, she is now studied in university literature departments worldwide.",
    options: [
      { letter: "A", text: "diminution" },
      { letter: "B", text: "rehabilitation" },
      { letter: "C", text: "stagnation" },
      { letter: "D", text: "fragmentation" }
    ],
    correctAnswer: "B",
    explanation: "'Rehabilitation' means restoration to good standing. The shift from 'dismissed' to 'studied in university literature departments' represents a recovery of reputation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng082",
    question: "While researching a topic, a student took the following notes:\n• Glass frogs have translucent skin that reveals internal organs, including their beating hearts.\n• This transparency was long assumed to be primarily for camouflage.\n• Recent research shows the frogs become more transparent while sleeping by hiding red blood cells in their livers.\n• When active, their blood circulates normally and they appear less transparent.\n• The researchers suggest transparency serves multiple functions beyond simple camouflage.\n\nThe student wants to emphasize a recent discovery about how glass frogs achieve transparency.",
    options: [
      { letter: "A", text: "Glass frogs have translucent skin that allows observers to see their beating hearts and internal organs." },
      { letter: "B", text: "Scientists have discovered that glass frogs enhance their transparency while sleeping by sequestering red blood cells in their livers." },
      { letter: "C", text: "The transparency of glass frogs was long believed to serve primarily as camouflage against predators." },
      { letter: "D", text: "Glass frogs appear less transparent when active because their blood circulates normally throughout their bodies." }
    ],
    correctAnswer: "B",
    explanation: "Choice B emphasizes the recent discovery ('Scientists have discovered') about the mechanism (sequestering blood cells in livers) that achieves transparency, directly addressing the student's goal.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng083",
    question: "The artist's early works, though technically proficient, lacked the emotional ______ that would characterize her mature paintings.",
    options: [
      { letter: "A", text: "resonance" },
      { letter: "B", text: "resistance" },
      { letter: "C", text: "reticence" },
      { letter: "D", text: "resemblance" }
    ],
    correctAnswer: "A",
    explanation: "'Resonance' means the quality of evoking emotions or responses. Early works 'lacked' what mature paintings had, and 'emotional resonance' describes the ability to move viewers.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng084",
    question: "The committee members ______ that the proposed changes be implemented gradually to minimize disruption to existing workflows.",
    options: [
      { letter: "A", text: "recommends" },
      { letter: "B", text: "recommend" },
      { letter: "C", text: "recommending" },
      { letter: "D", text: "recommended" }
    ],
    correctAnswer: "B",
    explanation: "The plural subject 'committee members' requires the plural verb 'recommend.' The subjunctive 'be implemented' in the that-clause is correct.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng085",
    question: "The following text is adapted from Henry James's The Portrait of a Lady (1881).\nUnder certain circumstances there are few hours in life more agreeable than the hour dedicated to the ceremony known as afternoon tea.\n\nWhich choice best describes the effect of the phrase 'under certain circumstances' in the text?",
    options: [
      { letter: "A", text: "It qualifies the statement, acknowledging that the claim does not hold universally" },
      { letter: "B", text: "It suggests the narrator disapproves of the tea ceremony" },
      { letter: "C", text: "It implies that the circumstances will be described in detail" },
      { letter: "D", text: "It indicates uncertainty about whether afternoon tea is actually pleasant" }
    ],
    correctAnswer: "A",
    explanation: "'Under certain circumstances' qualifies the sweeping claim that follows, acknowledging that afternoon tea is not always among 'life's most agreeable hours'—only sometimes.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng086",
    question: "The biographer's account of the scientist's personal life was notably ______: she addressed controversial episodes with the same thoroughness applied to professional achievements.",
    options: [
      { letter: "A", text: "circumspect" },
      { letter: "B", text: "exhaustive" },
      { letter: "C", text: "speculative" },
      { letter: "D", text: "evasive" }
    ],
    correctAnswer: "B",
    explanation: "'Exhaustive' means comprehensive or thorough. The biographer applied 'thoroughness' to both controversial personal episodes and professional achievements, indicating comprehensive coverage.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng087",
    question: "Text 1:\nEcologist E.O. Wilson proposed that humans possess 'biophilia'—an innate affinity for nature and other living things. He argued this tendency evolved because attention to natural environments and organisms was crucial for survival during human evolutionary history.\n\nText 2:\nPsychologist Peter Kahn questions whether biophilia is truly innate or whether apparent preferences for nature reflect cultural conditioning. He notes that children raised in urban environments often show strong attachments to technological artifacts and constructed spaces, suggesting environmental preferences may be shaped more by experience than biology.\n\nBased on the texts, how would Kahn (Text 2) most likely respond to Wilson's claim in Text 1?",
    options: [
      { letter: "A", text: "By arguing that evolutionary explanations cannot account for contemporary human behavior" },
      { letter: "B", text: "By suggesting that the evidence Wilson cites could equally support an environmental rather than innate origin" },
      { letter: "C", text: "By pointing out that Wilson's theory fails to explain why some individuals fear natural environments" },
      { letter: "D", text: "By claiming that technological environments now provide the same survival advantages as natural ones" }
    ],
    correctAnswer: "B",
    explanation: "Kahn questions whether nature preferences are 'innate or cultural conditioning.' He would argue that apparent biophilia could result from experience rather than biology, offering an alternative explanation for Wilson's evidence.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng088",
    question: "The mathematician's proof was ______: it resolved a problem that had resisted solution for over a century using methods accessible to undergraduate students.",
    options: [
      { letter: "A", text: "labyrinthine" },
      { letter: "B", text: "pedestrian" },
      { letter: "C", text: "elegant" },
      { letter: "D", text: "provisional" }
    ],
    correctAnswer: "C",
    explanation: "'Elegant' in mathematics means achieving results with minimal, accessible means. Solving a century-old problem with 'methods accessible to undergraduate students' exemplifies mathematical elegance.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng089",
    question: "The policy changes the governor implemented during her first term ______ widely credited with the state's subsequent economic recovery.",
    options: [
      { letter: "A", text: "is" },
      { letter: "B", text: "are" },
      { letter: "C", text: "was" },
      { letter: "D", text: "being" }
    ],
    correctAnswer: "B",
    explanation: "The plural subject 'policy changes' requires the plural verb 'are.' Present tense indicates ongoing credit for past actions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng090",
    question: "The composer's symphony employs an unusual structure. ______ it abandons the traditional four-movement format in favor of a single continuous movement lasting nearly an hour.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Nevertheless," },
      { letter: "B", text: "Similarly," },
      { letter: "C", text: "Specifically," },
      { letter: "D", text: "Consequently," }
    ],
    correctAnswer: "C",
    explanation: "'Specifically' correctly introduces a concrete example or elaboration of the 'unusual structure' mentioned in the first sentence.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng091",
    question: "The diplomat's memoirs reveal that the negotiations, ______ successful in averting immediate conflict, failed to address the underlying territorial disputes that would erupt decades later.",
    options: [
      { letter: "A", text: "despite" },
      { letter: "B", text: "since" },
      { letter: "C", text: "while" },
      { letter: "D", text: "unless" }
    ],
    correctAnswer: "C",
    explanation: "'While' introduces a concessive clause acknowledging short-term success before presenting the long-term failure. It balances the immediate achievement against ultimate inadequacy.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng092",
    question: "While researching a topic, a student took the following notes:\n• The Mpemba effect describes the counterintuitive phenomenon where hot water can freeze faster than cold water.\n• The effect is named after Tanzanian student Erasto Mpemba, who observed it in 1963.\n• Multiple explanations have been proposed, including evaporation, convection, and dissolved gases.\n• No single explanation has achieved scientific consensus.\n• Some researchers question whether the effect exists at all under controlled conditions.\n\nThe student wants to convey that the Mpemba effect remains scientifically contested.",
    options: [
      { letter: "A", text: "The Mpemba effect, named after Tanzanian student Erasto Mpemba, describes hot water freezing faster than cold water." },
      { letter: "B", text: "Scientists have proposed several explanations for the Mpemba effect, including evaporation, convection, and dissolved gases." },
      { letter: "C", text: "Despite decades of study, the Mpemba effect lacks both a consensus explanation and agreement on whether it reliably occurs." },
      { letter: "D", text: "Erasto Mpemba first observed the counterintuitive freezing phenomenon in Tanzania in 1963." }
    ],
    correctAnswer: "C",
    explanation: "Choice C conveys the contested nature by noting both the lack of 'consensus explanation' and doubts about whether the effect 'reliably occurs,' capturing the scientific controversy.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng093",
    question: "The following text is adapted from Nathaniel Hawthorne's The Scarlet Letter (1850).\nThe founders of a new colony, whatever Utopia of human virtue and happiness they might originally project, have invariably recognized it among their earliest practical necessities to allot a portion of the virgin soil as a cemetery, and another portion as the site of a prison.\n\nWhich choice best describes the main effect of the passage?",
    options: [
      { letter: "A", text: "It suggests that human communities inevitably require acknowledgment of mortality and wrongdoing" },
      { letter: "B", text: "It criticizes colonial founders for their lack of idealistic vision" },
      { letter: "C", text: "It describes the geographical layout of early American settlements" },
      { letter: "D", text: "It celebrates the practical wisdom of colonial planners" }
    ],
    correctAnswer: "A",
    explanation: "The passage contrasts 'Utopia of human virtue and happiness' with the 'practical necessities' of cemetery (death) and prison (wrongdoing), suggesting ideal visions must accommodate human realities.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng094",
    question: "The critic's assessment of the film was ______: she praised the visual effects and cinematography while excoriating the screenplay and character development.",
    options: [
      { letter: "A", text: "unequivocal" },
      { letter: "B", text: "mixed" },
      { letter: "C", text: "laudatory" },
      { letter: "D", text: "dismissive" }
    ],
    correctAnswer: "B",
    explanation: "'Mixed' means containing both positive and negative elements. The critic 'praised' some aspects while 'excoriating' others, indicating a mixed assessment.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng095",
    question: "The researcher proposed that the ancient civilization's decline ______ not from external invasion, as traditionally assumed, but from prolonged drought that undermined agricultural production.",
    options: [
      { letter: "A", text: "resulted" },
      { letter: "B", text: "results" },
      { letter: "C", text: "resulting" },
      { letter: "D", text: "result" }
    ],
    correctAnswer: "A",
    explanation: "The past tense 'resulted' is required within the noun clause following 'proposed that,' describing a historical event. The subjunctive is not used here because the clause describes a factual claim about the past.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng096",
    question: "Text 1:\nArchaeologist Marija Gimbutas theorized that prehistoric Europe was dominated by peaceful, goddess-worshipping societies until the arrival of warlike Indo-European peoples from the steppes. She interpreted figurines found at numerous sites as representations of a Great Goddess, evidence of a widespread matriarchal religion.\n\nText 2:\nArchaeologist Lynn Meskell challenges Gimbutas's interpretations. Meskell argues that assuming small figurines represent goddesses projects modern religious concepts onto prehistoric peoples. She notes that similar figurines appear in contexts suggesting diverse functions—toys, teaching tools, or representations of ancestors—not exclusively religious worship.\n\nBased on the texts, Meskell (Text 2) would most likely argue that Gimbutas's interpretation in Text 1:",
    options: [
      { letter: "A", text: "Is based on accurate archaeological evidence but draws incorrect conclusions about social organization" },
      { letter: "B", text: "Imposes modern interpretive frameworks on artifacts that may have served mundane purposes" },
      { letter: "C", text: "Correctly identifies the religious significance of figurines but misunderstands their specific meaning" },
      { letter: "D", text: "Overlooks evidence that Indo-European peoples also worshipped goddess figures" }
    ],
    correctAnswer: "B",
    explanation: "Meskell argues Gimbutas 'projects modern religious concepts' onto artifacts that may have been 'toys, teaching tools, or representations of ancestors'—mundane functions rather than religious symbols.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng097",
    question: "The orchestra's performance of the symphony was technically flawless but emotionally ______: the musicians executed every note precisely yet failed to convey the work's dramatic intensity.",
    options: [
      { letter: "A", text: "inert" },
      { letter: "B", text: "volatile" },
      { letter: "C", text: "profound" },
      { letter: "D", text: "erratic" }
    ],
    correctAnswer: "A",
    explanation: "'Inert' means lacking vigor or the ability to move or act. Despite technical precision, the performance 'failed to convey dramatic intensity'—it was emotionally lifeless or inert.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng098",
    question: "The phenomenon of 'social loafing,' in which individuals exert less effort when working in groups than when working alone, ______ across cultures, though its magnitude varies with cultural values emphasizing individualism versus collectivism.",
    options: [
      { letter: "A", text: "persist" },
      { letter: "B", text: "persists" },
      { letter: "C", text: "persisting" },
      { letter: "D", text: "persisted" }
    ],
    correctAnswer: "B",
    explanation: "The singular subject 'phenomenon' (modified by the intervening clause) requires the singular verb 'persists.' Present tense indicates an ongoing observation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng099",
    question: "The following text is adapted from Kate Chopin's The Awakening (1899).\nA certain light was beginning to dawn dimly within her,—the light which, showing the way, forbids it.\n\nAs used in the text, what does 'forbids' most nearly suggest?",
    options: [
      { letter: "A", text: "That the illumination reveals obstacles making the path impossible to travel" },
      { letter: "B", text: "That the character lacks permission to pursue her desires" },
      { letter: "C", text: "That the light itself prevents further progress by blinding the character" },
      { letter: "D", text: "That understanding something may simultaneously make it unattainable" }
    ],
    correctAnswer: "D",
    explanation: "The paradox of light that 'shows the way' yet 'forbids it' suggests that gaining awareness or understanding of something may reveal why it cannot be pursued—knowledge itself creates prohibition.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng100",
    question: "The government's economic stimulus package was designed to be ______: funds would be distributed rapidly to maximize immediate impact rather than phased in gradually over years.",
    options: [
      { letter: "A", text: "expeditious" },
      { letter: "B", text: "provisional" },
      { letter: "C", text: "incremental" },
      { letter: "D", text: "tentative" }
    ],
    correctAnswer: "A",
    explanation: "'Expeditious' means acting with speed and efficiency. The contrast with 'phased in gradually over years' confirms the stimulus was designed for rapid distribution.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng101",
    question: "While researching a topic, a student took the following notes:\n• Bioluminescent organisms produce light through chemical reactions.\n• The anglerfish uses a glowing lure to attract prey in the deep ocean.\n• Fireflies use bioluminescence for mate signaling.\n• Some species of squid release bioluminescent 'ink' to confuse predators.\n• Certain bacteria glow continuously and are used in scientific research.\n\nThe student wants to illustrate the diversity of functions that bioluminescence serves.",
    options: [
      { letter: "A", text: "Bioluminescent organisms, including anglerfish, fireflies, and squid, produce light through chemical reactions." },
      { letter: "B", text: "The anglerfish uses its bioluminescent lure to attract prey in the lightless depths of the ocean." },
      { letter: "C", text: "From attracting prey to finding mates to evading predators, bioluminescence serves remarkably varied functions across species." },
      { letter: "D", text: "Certain bioluminescent bacteria glow continuously and are therefore useful in scientific research applications." }
    ],
    correctAnswer: "C",
    explanation: "Choice C explicitly emphasizes 'diversity of functions' by listing multiple purposes (prey attraction, mate finding, predator evasion) and calling them 'remarkably varied.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng102",
    question: "The historian argues that the treaty's failure stemmed not from its provisions, ______ were carefully negotiated by experienced diplomats, but from the political instability that prevented any government from implementing them.",
    options: [
      { letter: "A", text: "that" },
      { letter: "B", text: "which" },
      { letter: "C", text: "who" },
      { letter: "D", text: "whom" }
    ],
    correctAnswer: "B",
    explanation: "'Which' introduces a nonrestrictive clause modifying 'provisions' (a thing, not a person). The comma before 'which' signals the nonrestrictive nature. 'That' would require no comma.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng103",
    question: "The physicist's theory, though mathematically ______, made predictions that could not be tested with existing experimental techniques.",
    options: [
      { letter: "A", text: "coherent" },
      { letter: "B", text: "dubious" },
      { letter: "C", text: "obsolete" },
      { letter: "D", text: "arbitrary" }
    ],
    correctAnswer: "A",
    explanation: "'Coherent' means logically consistent and well-organized. The 'though' signals concession: despite mathematical soundness ('coherent'), the theory couldn't be experimentally tested.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng104",
    question: "The urban planner's proposal includes several innovative features. ______ it incorporates green roofs and vertical gardens to mitigate the urban heat island effect.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "However," },
      { letter: "B", text: "In other words," },
      { letter: "C", text: "For example," },
      { letter: "D", text: "In contrast," }
    ],
    correctAnswer: "C",
    explanation: "'For example' correctly introduces a specific instance (green roofs, vertical gardens) that illustrates the general claim about 'innovative features.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng105",
    question: "Text 1:\nLiterary theorist Harold Bloom argued for a 'Western Canon'—a collection of works possessing unique aesthetic value that transcends historical circumstances. He maintained that these works deserve study precisely because of their literary merit, independent of the social positions of their authors.\n\nText 2:\nScholars influenced by cultural studies challenge the concept of a canon based purely on aesthetic merit. They argue that judgments of 'literary merit' reflect the values of those making the judgments—historically, white male academics. Works by marginalized groups were excluded not because they lacked quality but because evaluators failed to recognize their different forms of excellence.\n\nBased on the texts, the scholars in Text 2 would most likely argue that Bloom's position in Text 1:",
    options: [
      { letter: "A", text: "Correctly identifies the works of highest quality but draws improper conclusions about teaching" },
      { letter: "B", text: "Treats as objective and universal what are actually culturally specific value judgments" },
      { letter: "C", text: "Overlooks the fact that canonical works often address themes relevant to marginalized groups" },
      { letter: "D", text: "Fails to appreciate the aesthetic innovations of works outside the Western tradition" }
    ],
    correctAnswer: "B",
    explanation: "Text 2 argues that 'literary merit' reflects 'values of those making judgments.' The scholars would criticize Bloom for presenting culturally specific preferences as 'transcendent' and universal aesthetic standards.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng106",
    question: "The novelist's later works demonstrate a marked ______ from the exuberant prose of her early fiction toward a more restrained, minimalist style.",
    options: [
      { letter: "A", text: "deviation" },
      { letter: "B", text: "transition" },
      { letter: "C", text: "regression" },
      { letter: "D", text: "adherence" }
    ],
    correctAnswer: "B",
    explanation: "'Transition' means a change from one state to another. The passage describes movement 'from...toward,' indicating a stylistic transition rather than deviation (which implies aberration) or regression (which implies decline).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng107",
    question: "The following text is adapted from Franz Kafka's The Metamorphosis (1915).\nOne morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.\n\nWhich choice best describes the function of this sentence as a story opening?",
    options: [
      { letter: "A", text: "It establishes the story's central conflict by immediately presenting the transformative event" },
      { letter: "B", text: "It gradually builds suspense about what has happened to the main character" },
      { letter: "C", text: "It provides detailed background information about the character's life before the transformation" },
      { letter: "D", text: "It suggests the transformation might be a dream rather than reality" }
    ],
    correctAnswer: "A",
    explanation: "The opening immediately presents the transformation ('found himself transformed') as accomplished fact, establishing the central situation from which all conflict will flow, without gradual buildup or background.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng108",
    question: "The researchers found that exposure to nature, even through photographs of natural scenes, ______ measurable reductions in cortisol levels and self-reported stress.",
    options: [
      { letter: "A", text: "produce" },
      { letter: "B", text: "produces" },
      { letter: "C", text: "producing" },
      { letter: "D", text: "produced" }
    ],
    correctAnswer: "B",
    explanation: "The singular subject 'exposure' requires the singular verb 'produces.' Present tense indicates a general finding from research.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng109",
    question: "The architect's design philosophy emphasizes ______: buildings should serve their intended purposes effectively rather than sacrificing utility for visual novelty.",
    options: [
      { letter: "A", text: "austerity" },
      { letter: "B", text: "ornamentation" },
      { letter: "C", text: "functionality" },
      { letter: "D", text: "symmetry" }
    ],
    correctAnswer: "C",
    explanation: "'Functionality' means practical usefulness. The phrase 'serve their intended purposes effectively' defines functionality, which is contrasted with 'visual novelty.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng110",
    question: "The company's marketing campaign was successful in raising brand awareness; ______, it failed to translate that awareness into increased sales.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "moreover" },
      { letter: "B", text: "therefore" },
      { letter: "C", text: "however" },
      { letter: "D", text: "specifically" }
    ],
    correctAnswer: "C",
    explanation: "'However' correctly signals the contrast between successful awareness-raising and failure to increase sales. The campaign succeeded in one respect but failed in another.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng111",
    question: "While researching a topic, a student took the following notes:\n• Venus flytraps capture insects using modified leaves that snap shut when triggered.\n• The trap closes in about 100 milliseconds—one of the fastest movements in the plant kingdom.\n• Each trap can only close and reopen approximately seven times before it dies.\n• The plant digests prey over 5-12 days, absorbing nitrogen and phosphorus.\n• Venus flytraps grow naturally only within a 75-mile radius of Wilmington, North Carolina.\n\nThe student wants to emphasize the geographical rarity of the Venus flytrap.",
    options: [
      { letter: "A", text: "Venus flytraps capture insects using leaves that snap shut in approximately 100 milliseconds." },
      { letter: "B", text: "Despite their fame, Venus flytraps grow wild exclusively in a small region of coastal North Carolina." },
      { letter: "C", text: "Each Venus flytrap can close and reopen only about seven times before the trap dies." },
      { letter: "D", text: "Venus flytraps digest their prey over 5-12 days to absorb nitrogen and phosphorus." }
    ],
    correctAnswer: "B",
    explanation: "Choice B emphasizes geographical rarity by noting the plants grow 'wild exclusively in a small region' and adds 'despite their fame' to underscore the contrast between widespread recognition and limited natural range.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng112",
    question: "The documentary filmmaker's approach has been described as ______: rather than maintaining journalistic neutrality, she openly advocates for the causes her films address.",
    options: [
      { letter: "A", text: "partisan" },
      { letter: "B", text: "objective" },
      { letter: "C", text: "tentative" },
      { letter: "D", text: "esoteric" }
    ],
    correctAnswer: "A",
    explanation: "'Partisan' means strongly supporting one side. The contrast with 'journalistic neutrality' and the fact that she 'openly advocates' confirms partisan approach.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng113",
    question: "Text 1:\nPhilosopher Thomas Nagel famously argued that consciousness presents an insurmountable barrier to physicalist explanations of the mind. In his essay 'What Is It Like to Be a Bat?' he contended that the subjective character of experience—what it feels like to be a conscious creature—cannot be captured by objective physical descriptions.\n\nText 2:\nNeuroscientist Patricia Churchland responds that Nagel's argument mistakes current scientific limitations for permanent philosophical barriers. She points to the history of science, where seemingly inexplicable phenomena—life itself, heredity—eventually yielded to physical explanation. Consciousness, she argues, will likely prove similarly explicable as neuroscience advances.\n\nBased on the texts, how would Churchland (Text 2) most likely characterize Nagel's position in Text 1?",
    options: [
      { letter: "A", text: "As drawing premature conclusions about the limits of scientific explanation" },
      { letter: "B", text: "As correctly identifying a phenomenon that science has failed to address" },
      { letter: "C", text: "As overlooking the distinction between subjective and objective knowledge" },
      { letter: "D", text: "As providing a compelling argument against physicalist theories of mind" }
    ],
    correctAnswer: "A",
    explanation: "Churchland argues Nagel 'mistakes current scientific limitations for permanent philosophical barriers.' She would characterize his position as prematurely concluding that consciousness is inexplicable when science simply hasn't progressed far enough.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng114",
    question: "The diplomat's carefully worded statement was designed to ______ rather than resolve the dispute, allowing both parties to claim partial victory while postponing fundamental disagreements.",
    options: [
      { letter: "A", text: "exacerbate" },
      { letter: "B", text: "adjudicate" },
      { letter: "C", text: "finesse" },
      { letter: "D", text: "arbitrate" }
    ],
    correctAnswer: "C",
    explanation: "'Finesse' means to handle skillfully or with subtlety, especially to avoid confrontation. The statement allowed both sides to 'claim partial victory while postponing disagreements'—skillfully evading rather than resolving the dispute.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng115",
    question: "The following text is adapted from Gabriel García Márquez's One Hundred Years of Solitude (1967).\nMany years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.\n\nWhich choice best describes the effect of this opening sentence?",
    options: [
      { letter: "A", text: "It establishes a linear chronology that the narrative will follow" },
      { letter: "B", text: "It compresses past, present, and future into a single moment, creating temporal complexity" },
      { letter: "C", text: "It suggests that the colonel's memories are unreliable" },
      { letter: "D", text: "It indicates that the narrative will focus primarily on childhood experiences" }
    ],
    correctAnswer: "B",
    explanation: "The sentence combines three time frames: future ('was to remember'), present ('faced the firing squad'), and distant past ('that distant afternoon'). This compression creates the novel's characteristic temporal complexity.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng116",
    question: "The committee's report identifies several areas where current regulations ______ adequate protection for consumers and recommends legislative reforms.",
    options: [
      { letter: "A", text: "fail to provide" },
      { letter: "B", text: "fails to provide" },
      { letter: "C", text: "failing to provide" },
      { letter: "D", text: "failed to provide" }
    ],
    correctAnswer: "A",
    explanation: "The plural subject 'regulations' requires the plural verb phrase 'fail to provide.' Present tense indicates an ongoing situation identified by the report.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng117",
    question: "The novelist's prose has been praised for its ______: she conveys complex emotions through precise, unadorned sentences that avoid ornamental flourishes.",
    options: [
      { letter: "A", text: "prolixity" },
      { letter: "B", text: "economy" },
      { letter: "C", text: "ambiguity" },
      { letter: "D", text: "grandiloquence" }
    ],
    correctAnswer: "B",
    explanation: "'Economy' in prose means expressing much in few words. 'Precise, unadorned sentences' that 'avoid ornamental flourishes' describe economical writing. 'Prolixity' and 'grandiloquence' mean the opposite.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng118",
    question: "Archaeological evidence suggests that ancient Mesopotamian cities were remarkably cosmopolitan; ______, trade records reveal merchants from diverse regions conducting business in Ur as early as 2000 BCE.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "by contrast" },
      { letter: "B", text: "for instance" },
      { letter: "C", text: "therefore" },
      { letter: "D", text: "nevertheless" }
    ],
    correctAnswer: "B",
    explanation: "'For instance' correctly introduces a specific example (merchants from diverse regions in Ur) that supports the general claim about cosmopolitan character.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng119",
    question: "While researching a topic, a student took the following notes:\n• The placebo effect occurs when patients improve after receiving inactive treatments.\n• Researchers once dismissed it as merely psychological.\n• Brain imaging studies show placebos can trigger release of endorphins and dopamine.\n• Placebo responses vary by condition—stronger for pain and depression than for cancer tumor reduction.\n• Some researchers now argue placebos should be integrated into treatment plans.\n\nThe student wants to show that scientific understanding of the placebo effect has evolved.",
    options: [
      { letter: "A", text: "Brain imaging studies reveal that placebos can trigger the release of endorphins and dopamine in patients." },
      { letter: "B", text: "Once dismissed as merely psychological, the placebo effect is now understood to produce measurable neurological changes." },
      { letter: "C", text: "Placebo responses are stronger for conditions like pain and depression than for cancer tumor reduction." },
      { letter: "D", text: "Some researchers argue that placebos should be integrated into treatment plans." }
    ],
    correctAnswer: "B",
    explanation: "Choice B explicitly shows evolution of understanding by contrasting 'once dismissed' with current knowledge ('now understood'). It demonstrates the shift from psychological dismissal to neurological recognition.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng120",
    question: "The sociologist argues that contemporary public discourse has become increasingly ______: rather than engaging with opposing views, participants retreat into ideologically homogeneous communities.",
    options: [
      { letter: "A", text: "polarized" },
      { letter: "B", text: "nuanced" },
      { letter: "C", text: "transparent" },
      { letter: "D", text: "inclusive" }
    ],
    correctAnswer: "A",
    explanation: "'Polarized' means divided into opposing groups. Retreating into 'ideologically homogeneous communities' rather than 'engaging with opposing views' describes polarization.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng121",
    question: "Text 1:\nPsychologist Carol Dweck's research on 'growth mindset' has been enormously influential in education. She argues that students who believe intelligence is malleable (growth mindset) outperform those who see it as fixed, and that teaching growth mindset can improve academic outcomes.\n\nText 2:\nRecent large-scale replication studies have produced mixed results for growth mindset interventions. While some students benefit modestly, effect sizes are typically smaller than Dweck's original studies suggested. Critics argue that focusing on mindset may distract from more substantive educational reforms addressing resources, curriculum, and teacher training.\n\nBased on the texts, the researchers in Text 2 would most likely argue that Dweck's work in Text 1:",
    options: [
      { letter: "A", text: "Has been completely discredited by subsequent research" },
      { letter: "B", text: "May overstate the educational benefits of mindset interventions" },
      { letter: "C", text: "Correctly identifies mindset as the primary factor in student achievement" },
      { letter: "D", text: "Fails to account for differences between students of varying ages" }
    ],
    correctAnswer: "B",
    explanation: "Text 2 notes 'effect sizes are typically smaller than Dweck's original studies suggested' and warns about 'distracting from more substantive reforms.' The researchers would likely argue Dweck overstates the benefits.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng122",
    question: "The following text is adapted from Toni Morrison's Beloved (1987).\n124 was spiteful. Full of a baby's venom.\n\nWhich choice best describes the effect of these opening sentences?",
    options: [
      { letter: "A", text: "They create immediate unease by attributing malevolent human qualities to a house" },
      { letter: "B", text: "They establish a nostalgic tone about childhood memories" },
      { letter: "C", text: "They introduce a reliable narrator who will provide objective descriptions" },
      { letter: "D", text: "They suggest the number 124 has mystical significance" }
    ],
    correctAnswer: "A",
    explanation: "The opening personifies the house ('124 was spiteful') and associates it with malevolent infancy ('baby's venom'), creating immediate unease through this attribution of hostile intent to an inanimate structure.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng123",
    question: "The museum's collection of Impressionist paintings, ______ originally donated by a single philanthropist, has been significantly expanded through subsequent acquisitions.",
    options: [
      { letter: "A", text: "that was" },
      { letter: "B", text: "which was" },
      { letter: "C", text: "being" },
      { letter: "D", text: "it was" }
    ],
    correctAnswer: "B",
    explanation: "'Which was' introduces a nonrestrictive clause providing additional information about the collection. The commas signal the nonrestrictive nature, requiring 'which' rather than 'that.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng124",
    question: "The researcher's methodology was ______: rather than testing a single hypothesis, she employed multiple analytical approaches to ensure the robustness of her findings.",
    options: [
      { letter: "A", text: "parsimonious" },
      { letter: "B", text: "dogmatic" },
      { letter: "C", text: "eclectic" },
      { letter: "D", text: "superficial" }
    ],
    correctAnswer: "C",
    explanation: "'Eclectic' means drawing from diverse sources or approaches. Using 'multiple analytical approaches' rather than a single method describes an eclectic methodology.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng125",
    question: "The new regulatory framework ______ both environmental protections and economic competitiveness, though critics on both sides argue it fails to adequately prioritize their concerns.",
    options: [
      { letter: "A", text: "addresses" },
      { letter: "B", text: "address" },
      { letter: "C", text: "addressing" },
      { letter: "D", text: "addressed" }
    ],
    correctAnswer: "A",
    explanation: "The singular subject 'framework' requires the singular verb 'addresses.' Present tense indicates the current state of the regulatory framework.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  }
];
