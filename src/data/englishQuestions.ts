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
  },
  {
    id: "eng126",
    question: "The anthropologist's fieldwork revealed that the community's oral traditions, far from being static relics of the past, are ______ narratives that adapt to address contemporary concerns.",
    options: [
      { letter: "A", text: "dynamic" },
      { letter: "B", text: "obsolete" },
      { letter: "C", text: "immutable" },
      { letter: "D", text: "spurious" }
    ],
    correctAnswer: "A",
    explanation: "'Dynamic' means constantly changing or developing. The phrase 'far from being static' and 'adapt to address contemporary concerns' indicates the narratives are dynamic, not fixed.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng127",
    question: "The physicist proposed that quantum entanglement ______ instantaneous communication across vast distances, but subsequent experiments have confirmed that no information can be transmitted faster than light.",
    options: [
      { letter: "A", text: "enables" },
      { letter: "B", text: "enabled" },
      { letter: "C", text: "might enable" },
      { letter: "D", text: "enabling" }
    ],
    correctAnswer: "C",
    explanation: "'Might enable' correctly expresses the physicist's tentative proposal about a possibility. The 'but' clause shows this possibility was not confirmed, making the modal 'might' appropriate.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng128",
    question: "Text 1:\nEconomist Milton Friedman argued that a corporation's sole social responsibility is to maximize profits for shareholders. He contended that when executives pursue social goals, they effectively tax shareholders and usurp governmental functions without democratic accountability.\n\nText 2:\nBusiness scholar R. Edward Freeman's 'stakeholder theory' challenges Friedman's shareholder primacy model. Freeman argues that corporations should balance the interests of all stakeholders—employees, customers, communities, and the environment—not just shareholders. He contends that this approach ultimately produces more sustainable business success.\n\nBased on the texts, Freeman (Text 2) would most likely argue that Friedman's position in Text 1:",
    options: [
      { letter: "A", text: "Correctly identifies profit maximization as one important corporate goal among several" },
      { letter: "B", text: "Adopts too narrow a view of corporate responsibility and long-term success" },
      { letter: "C", text: "Fails to account for the legal obligations corporations have to shareholders" },
      { letter: "D", text: "Overstates the ability of corporations to pursue social goals effectively" }
    ],
    correctAnswer: "B",
    explanation: "Freeman advocates balancing multiple stakeholder interests for 'sustainable business success.' He would likely criticize Friedman's exclusive focus on shareholders as too narrow, ignoring other stakeholders who contribute to long-term success.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng129",
    question: "The following text is adapted from James Joyce's A Portrait of the Artist as a Young Man (1916).\nOnce upon a time and a very good time it was there was a moocow coming down along the road and this moocow that was coming down along the road met a nicens little boy named baby tuckoo.\n\nWhich choice best describes the function of this opening passage?",
    options: [
      { letter: "A", text: "It mimics a child's language to establish the protagonist's earliest consciousness" },
      { letter: "B", text: "It introduces the novel's central metaphor of cattle and childhood" },
      { letter: "C", text: "It satirizes traditional fairy tale conventions" },
      { letter: "D", text: "It establishes an omniscient narrator who will guide the reader" }
    ],
    correctAnswer: "A",
    explanation: "The childlike language ('moocow,' 'nicens,' 'baby tuckoo') and fairy-tale structure ('Once upon a time') mimic how a young child experiences and remembers stories, establishing the narrative from the protagonist's earliest consciousness.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng130",
    question: "While researching a topic, a student took the following notes:\n• The James Webb Space Telescope launched in December 2021.\n• It observes infrared light, allowing it to see through cosmic dust clouds.\n• JWST has detected galaxies forming just 300 million years after the Big Bang.\n• These early galaxies are more massive and mature than models predicted.\n• The findings have prompted astronomers to reconsider theories of early universe structure.\n\nThe student wants to emphasize how JWST observations have challenged existing scientific models.",
    options: [
      { letter: "A", text: "The James Webb Space Telescope observes infrared light, enabling it to penetrate cosmic dust clouds." },
      { letter: "B", text: "JWST launched in December 2021 and has detected galaxies from just 300 million years after the Big Bang." },
      { letter: "C", text: "By revealing unexpectedly massive early galaxies, JWST has forced astronomers to reconsider theories of cosmic evolution." },
      { letter: "D", text: "The James Webb Space Telescope can observe light from the earliest period of galaxy formation." }
    ],
    correctAnswer: "C",
    explanation: "Choice C emphasizes the challenge to models by noting galaxies were 'unexpectedly massive' and this 'forced astronomers to reconsider theories'—directly showing how observations challenged existing science.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng131",
    question: "The composer's late quartets are characterized by their ______ complexity: what initially sounds like dissonant chaos reveals, upon repeated listening, intricate structural relationships.",
    options: [
      { letter: "A", text: "apparent" },
      { letter: "B", text: "superficial" },
      { letter: "C", text: "deceptive" },
      { letter: "D", text: "transparent" }
    ],
    correctAnswer: "C",
    explanation: "'Deceptive' complexity means the complexity misleads initial perception. What 'sounds like dissonant chaos' actually conceals 'intricate structural relationships'—the apparent disorder deceives listeners about the underlying order.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng132",
    question: "The treaty negotiations collapsed when neither party would ______ on the disputed territorial provisions, each insisting that concessions would set dangerous precedents.",
    options: [
      { letter: "A", text: "capitulate" },
      { letter: "B", text: "compromise" },
      { letter: "C", text: "elaborate" },
      { letter: "D", text: "speculate" }
    ],
    correctAnswer: "B",
    explanation: "'Compromise' means reaching agreement through mutual concession. The negotiations 'collapsed' because neither party would compromise, with each refusing concessions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng133",
    question: "The study's conclusions rest on the assumption that participants' self-reported behaviors accurately reflect their actual behaviors; ______, this assumption may not hold for socially sensitive topics where respondents might provide misleading answers.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "furthermore" },
      { letter: "B", text: "however" },
      { letter: "C", text: "therefore" },
      { letter: "D", text: "similarly" }
    ],
    correctAnswer: "B",
    explanation: "'However' correctly signals the contrast between the study's assumption and the acknowledgment that this assumption may be problematic for sensitive topics.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng134",
    question: "Text 1:\nHistorian Frederick Jackson Turner's 'frontier thesis' argued that American democracy and national character were shaped by the experience of westward expansion. The frontier, he claimed, fostered individualism, innovation, and egalitarianism as settlers adapted to challenging conditions.\n\nText 2:\nContemporary historians have challenged Turner's thesis on multiple grounds. They note his erasure of Native American presence and agency, his neglect of the role of federal government subsidies in western settlement, and his failure to account for how race, gender, and class structured frontier experiences differently for different groups.\n\nBased on the texts, the historians in Text 2 would most likely argue that Turner's thesis in Text 1:",
    options: [
      { letter: "A", text: "Accurately captures the democratic spirit of frontier settlement" },
      { letter: "B", text: "Presents an oversimplified and exclusionary account of western expansion" },
      { letter: "C", text: "Places too much emphasis on government involvement in western settlement" },
      { letter: "D", text: "Correctly identifies individualism as the defining frontier characteristic" }
    ],
    correctAnswer: "B",
    explanation: "Text 2 criticizes Turner's 'erasure of Native Americans,' 'neglect of federal government subsidies,' and 'failure to account for race, gender, and class.' These critiques suggest his thesis is oversimplified and exclusionary.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng135",
    question: "The following text is adapted from Marcel Proust's In Search of Lost Time (1913).\nFor a long time I used to go to bed early. Sometimes, when I had put out my candle, my eyes would close so quickly that I had not even time to say to myself: 'I'm falling asleep.'\n\nWhich choice best describes the function of these opening sentences?",
    options: [
      { letter: "A", text: "They establish the narrative's focus on the boundary between waking consciousness and sleep" },
      { letter: "B", text: "They introduce a conflict between the narrator's desires and obligations" },
      { letter: "C", text: "They present the narrator as someone who struggles with insomnia" },
      { letter: "D", text: "They create suspense about what prevents the narrator from sleeping" }
    ],
    correctAnswer: "A",
    explanation: "The opening describes the transition into sleep and the narrator's awareness (or lack thereof) of falling asleep. This establishes the novel's exploration of consciousness, memory, and the threshold between waking and sleeping states.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng136",
    question: "The geneticist's research has been ______ in establishing the hereditary basis of the disorder, providing evidence that has transformed diagnostic and treatment approaches.",
    options: [
      { letter: "A", text: "instrumental" },
      { letter: "B", text: "detrimental" },
      { letter: "C", text: "incidental" },
      { letter: "D", text: "supplemental" }
    ],
    correctAnswer: "A",
    explanation: "'Instrumental' means serving as a crucial means to an end. The research 'transformed diagnostic and treatment approaches,' indicating it was instrumental (crucially important) in establishing the hereditary basis.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng137",
    question: "The architect's design, ______ praised for its innovative use of sustainable materials, has also drawn criticism for its departure from the neighborhood's historic aesthetic.",
    options: [
      { letter: "A", text: "since" },
      { letter: "B", text: "while" },
      { letter: "C", text: "because" },
      { letter: "D", text: "unless" }
    ],
    correctAnswer: "B",
    explanation: "'While' introduces a concessive clause: the design receives praise for one aspect (sustainability) but criticism for another (departing from historic aesthetic). It balances the two reactions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng138",
    question: "While researching a topic, a student took the following notes:\n• Octopuses have the ability to edit their own RNA, altering genetic instructions after transcription.\n• Most animals rely solely on DNA mutations for genetic variation.\n• RNA editing allows octopuses to adapt rapidly to environmental changes.\n• This editing is especially active in neural tissue, affecting brain function.\n• The trade-off is slower DNA evolution, as RNA editing reduces selection pressure for beneficial mutations.\n\nThe student wants to present a trade-off associated with octopus RNA editing.",
    options: [
      { letter: "A", text: "Octopuses can edit their RNA to adapt rapidly to environmental changes, particularly in neural tissue." },
      { letter: "B", text: "While RNA editing gives octopuses remarkable adaptability, it comes at the cost of slower long-term DNA evolution." },
      { letter: "C", text: "Most animals rely on DNA mutations for genetic variation, but octopuses can also edit their RNA." },
      { letter: "D", text: "RNA editing is especially active in octopus neural tissue, affecting brain function significantly." }
    ],
    correctAnswer: "B",
    explanation: "Choice B explicitly presents the trade-off using 'while...it comes at the cost of,' showing both the benefit (adaptability) and the drawback (slower DNA evolution).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng139",
    question: "The novelist's reputation underwent a dramatic ______ in the decades following her death: once celebrated as a pioneer of modernist technique, she fell into obscurity until feminist scholars rediscovered her work in the 1970s.",
    options: [
      { letter: "A", text: "elevation" },
      { letter: "B", text: "eclipse" },
      { letter: "C", text: "consolidation" },
      { letter: "D", text: "trajectory" }
    ],
    correctAnswer: "B",
    explanation: "'Eclipse' means a decline or overshadowing. Moving from 'celebrated' to 'fell into obscurity' describes an eclipse of reputation—a dramatic decline until rediscovery.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng140",
    question: "Neither the proposed tax reforms nor the spending cuts ______ likely to address the structural deficit without significant political compromise.",
    options: [
      { letter: "A", text: "is" },
      { letter: "B", text: "are" },
      { letter: "C", text: "was" },
      { letter: "D", text: "being" }
    ],
    correctAnswer: "B",
    explanation: "With 'neither...nor,' the verb agrees with the nearer subject ('spending cuts,' plural), requiring 'are.' Present tense matches the current assessment of future likelihood.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng141",
    question: "The following text is adapted from Herman Melville's Moby-Dick (1851).\nCall me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.\n\nWhich choice best describes the effect of the phrase 'never mind how long precisely'?",
    options: [
      { letter: "A", text: "It suggests the narrator is concealing information that would undermine his credibility" },
      { letter: "B", text: "It establishes an informal, conversational relationship between narrator and reader" },
      { letter: "C", text: "It indicates the narrator cannot remember important details about his past" },
      { letter: "D", text: "It implies the events occurred so long ago they have lost their significance" }
    ],
    correctAnswer: "B",
    explanation: "The parenthetical aside ('never mind how long precisely') speaks directly to the reader in a casual, conversational tone, as if deflecting an unimportant question. This establishes intimacy and informality.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng142",
    question: "Text 1:\nSociologist Robert Putnam documented declining civic participation in America, arguing that activities like bowling leagues, which once built 'social capital,' have given way to solitary pursuits. This erosion of community bonds, he contends, weakens democracy and social trust.\n\nText 2:\nCritic Claude Fischer questions Putnam's narrative of civic decline. Fischer argues that Americans have always been selective in their social participation and that new forms of community—online networks, interest-based groups—have replaced older forms rather than disappearing. Social connection, he suggests, has transformed rather than diminished.\n\nBased on the texts, Fischer (Text 2) would most likely characterize Putnam's argument in Text 1 as:",
    options: [
      { letter: "A", text: "Mistaking changes in the form of social participation for overall decline" },
      { letter: "B", text: "Correctly identifying the political consequences of reduced civic engagement" },
      { letter: "C", text: "Overlooking the negative aspects of traditional community organizations" },
      { letter: "D", text: "Underestimating how rapidly online communities have grown" }
    ],
    correctAnswer: "A",
    explanation: "Fischer argues social connection has 'transformed rather than diminished' and that new forms have 'replaced older forms.' He would criticize Putnam for interpreting transformation as decline.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng143",
    question: "The documentary's ______ of the historical events has been criticized by scholars who argue that complex political dynamics have been reduced to a simplistic good-versus-evil narrative.",
    options: [
      { letter: "A", text: "portrayal" },
      { letter: "B", text: "endorsement" },
      { letter: "C", text: "investigation" },
      { letter: "D", text: "circumvention" }
    ],
    correctAnswer: "A",
    explanation: "'Portrayal' means a depiction or representation. The criticism is about how events are 'portrayed' (depicted)—specifically that complex dynamics are reduced to 'simplistic' narrative.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng144",
    question: "The research team's findings ______ the hypothesis that early childhood interventions can have lasting effects on educational attainment, though the magnitude of effects varied across demographic groups.",
    options: [
      { letter: "A", text: "support" },
      { letter: "B", text: "supports" },
      { letter: "C", text: "supporting" },
      { letter: "D", text: "supported" }
    ],
    correctAnswer: "A",
    explanation: "The plural subject 'findings' requires the plural verb 'support.' Present tense indicates the current state of evidence supporting the hypothesis.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng145",
    question: "The museum's new exhibition presents artifacts from the ancient civilization without interpretive labels. ______, visitors must draw their own conclusions about the objects' significance and cultural context.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Nevertheless," },
      { letter: "B", text: "Consequently," },
      { letter: "C", text: "Similarly," },
      { letter: "D", text: "Previously," }
    ],
    correctAnswer: "B",
    explanation: "'Consequently' correctly signals that visitors drawing their own conclusions is a result of the absence of interpretive labels. The effect follows from the cause.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng146",
    question: "While researching a topic, a student took the following notes:\n• The 'grandmother hypothesis' proposes that menopause evolved because older women could increase their genetic success by helping raise grandchildren.\n• Women who live past reproductive age help ensure grandchildren's survival.\n• Killer whales and short-finned pilot whales are the only other mammals known to experience menopause.\n• In these whale species, post-reproductive females lead pods and share knowledge of food sources.\n• The hypothesis suggests menopause is an adaptive trait rather than a dysfunction.\n\nThe student wants to emphasize that menopause may serve an evolutionary purpose.",
    options: [
      { letter: "A", text: "Killer whales and pilot whales are the only non-human mammals known to experience menopause." },
      { letter: "B", text: "The grandmother hypothesis suggests menopause evolved as an adaptive trait, allowing older females to enhance their genetic legacy through grandchild care." },
      { letter: "C", text: "Post-reproductive female whales lead their pods and share valuable knowledge about food sources." },
      { letter: "D", text: "Women who live past reproductive age can help ensure the survival of their grandchildren." }
    ],
    correctAnswer: "B",
    explanation: "Choice B emphasizes evolutionary purpose by framing menopause as 'an adaptive trait' that allows females to 'enhance their genetic legacy'—directly presenting menopause as serving a purpose rather than being dysfunction.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng147",
    question: "The philosopher's argument is ______: each premise follows logically from the preceding one, yet the conclusion remains deeply counterintuitive.",
    options: [
      { letter: "A", text: "fallacious" },
      { letter: "B", text: "cogent" },
      { letter: "C", text: "ambiguous" },
      { letter: "D", text: "derivative" }
    ],
    correctAnswer: "B",
    explanation: "'Cogent' means clear, logical, and convincing. The premises 'follow logically'—the argument is internally sound (cogent)—yet the conclusion is 'counterintuitive.' The 'yet' signals this tension.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng148",
    question: "The following text is adapted from Emily Brontë's Wuthering Heights (1847).\nI have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with. This is certainly a beautiful country!\n\nWhich choice best describes the function of the exclamation 'This is certainly a beautiful country!' in context?",
    options: [
      { letter: "A", text: "It expresses genuine enthusiasm that contrasts with the preceding complaint" },
      { letter: "B", text: "It introduces the primary setting where most events will occur" },
      { letter: "C", text: "It reveals the narrator's superficial appreciation of nature" },
      { letter: "D", text: "It suggests the narrator is attempting to convince himself of something he doubts" }
    ],
    correctAnswer: "A",
    explanation: "The exclamation about 'beautiful country' contrasts sharply with the preceding complaint about being 'troubled with' a difficult neighbor. The juxtaposition creates tension between annoyance and appreciation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng149",
    question: "The city's transit authority has proposed extending subway service to underserved neighborhoods. Advocates argue this would improve economic opportunities for residents. ______, opponents worry about construction costs and potential disruption to existing communities.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Therefore," },
      { letter: "B", text: "However," },
      { letter: "C", text: "Moreover," },
      { letter: "D", text: "Specifically," }
    ],
    correctAnswer: "B",
    explanation: "'However' correctly signals the contrast between advocates' support and opponents' concerns about the same proposal.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng150",
    question: "Text 1:\nLinguist Noam Chomsky argued that humans possess an innate 'Universal Grammar'—a set of structural principles common to all languages. He pointed to the rapidity with which children acquire language and the similarities across unrelated languages as evidence that grammatical knowledge is hardwired rather than entirely learned.\n\nText 2:\nLinguist Daniel Everett's research on Pirahã, an Amazonian language, challenges Chomsky's Universal Grammar hypothesis. Everett claims Pirahã lacks features Chomsky considered universal, including recursion (embedding clauses within clauses). He argues that cultural factors shape language more profoundly than innate grammatical structures.\n\nBased on the texts, how would Everett (Text 2) most likely respond to Chomsky's evidence in Text 1?",
    options: [
      { letter: "A", text: "By arguing that the similarities Chomsky identifies reflect cultural contact rather than innate structure" },
      { letter: "B", text: "By suggesting that Pirahã demonstrates languages can exist without supposedly universal features" },
      { letter: "C", text: "By claiming that children's rapid language acquisition proves nothing about innateness" },
      { letter: "D", text: "By asserting that recursion is present in all languages when properly analyzed" }
    ],
    correctAnswer: "B",
    explanation: "Everett's research specifically challenges universality by presenting Pirahã as a language lacking features 'Chomsky considered universal.' He would respond that his counterexample disproves the claim of universality.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng151",
    question: "The biographer's account of the scientist's life is notably ______: she devotes equal attention to professional achievements and personal struggles, neither celebrating nor condemning her subject.",
    options: [
      { letter: "A", text: "partisan" },
      { letter: "B", text: "evenhanded" },
      { letter: "C", text: "effusive" },
      { letter: "D", text: "cursory" }
    ],
    correctAnswer: "B",
    explanation: "'Evenhanded' means fair and impartial. Giving 'equal attention' to different aspects and 'neither celebrating nor condemning' describes an evenhanded (balanced, impartial) approach.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng152",
    question: "The committee recommended that the proposal ______ thoroughly reviewed by external experts before implementation.",
    options: [
      { letter: "A", text: "is" },
      { letter: "B", text: "be" },
      { letter: "C", text: "was" },
      { letter: "D", text: "being" }
    ],
    correctAnswer: "B",
    explanation: "The subjunctive mood is required after 'recommended that,' calling for the base form 'be' rather than indicative 'is' or 'was.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng153",
    question: "While researching a topic, a student took the following notes:\n• The Dunning-Kruger effect describes how people with limited knowledge overestimate their competence.\n• Conversely, highly skilled individuals often underestimate their abilities.\n• The effect was demonstrated in studies of logical reasoning, grammar, and humor.\n• Critics argue the effect may be partly a statistical artifact of regression to the mean.\n• Despite criticism, the phenomenon has been replicated across multiple domains.\n\nThe student wants to acknowledge both the effect's influence and the criticism it has faced.",
    options: [
      { letter: "A", text: "The Dunning-Kruger effect shows that people with limited knowledge often overestimate their competence." },
      { letter: "B", text: "Although some critics attribute the Dunning-Kruger effect partly to statistical artifacts, it has been widely replicated and remains influential." },
      { letter: "C", text: "Studies have demonstrated the Dunning-Kruger effect in domains including logical reasoning, grammar, and humor." },
      { letter: "D", text: "Highly skilled individuals often underestimate their abilities according to Dunning-Kruger research." }
    ],
    correctAnswer: "B",
    explanation: "Choice B acknowledges both influence ('widely replicated and remains influential') and criticism ('some critics attribute...to statistical artifacts'), fulfilling the dual goal.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng154",
    question: "The poet's use of enjambment—continuing a sentence across line breaks—creates a sense of ______ that mirrors the rushing water described in the verse.",
    options: [
      { letter: "A", text: "stagnation" },
      { letter: "B", text: "momentum" },
      { letter: "C", text: "fragmentation" },
      { letter: "D", text: "symmetry" }
    ],
    correctAnswer: "B",
    explanation: "'Momentum' means forward motion or impetus. Enjambment creates forward movement as sentences flow across line breaks, 'mirroring rushing water'—both convey continuous motion.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng155",
    question: "The following text is adapted from Virginia Woolf's To the Lighthouse (1927).\nYes, she thought, laying down her brush in extreme fatigue, I have had my vision.\n\nAs used in the text, what does 'vision' most nearly mean?",
    options: [
      { letter: "A", text: "A supernatural apparition witnessed by the character" },
      { letter: "B", text: "The physical ability to see that the character has retained" },
      { letter: "C", text: "An artistic or creative insight the character has achieved" },
      { letter: "D", text: "A plan for future action the character intends to pursue" }
    ],
    correctAnswer: "C",
    explanation: "In context, the character lays down her 'brush' (painting tool) after achieving something. 'Vision' here means artistic insight or creative realization—she has captured what she sought to express.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng156",
    question: "The orchestra's interpretation of the symphony was praised for its ______: the musicians brought fresh energy to a work that had become stale through overfamiliarity.",
    options: [
      { letter: "A", text: "fidelity" },
      { letter: "B", text: "vitality" },
      { letter: "C", text: "austerity" },
      { letter: "D", text: "uniformity" }
    ],
    correctAnswer: "B",
    explanation: "'Vitality' means liveliness and energy. 'Fresh energy' to a 'stale' work describes vitality—the performance brought new life to something that had become tired.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng157",
    question: "The data from the longitudinal study ______ that early childhood nutrition has lasting effects on cognitive development, though researchers caution against drawing causal conclusions from correlational findings.",
    options: [
      { letter: "A", text: "suggest" },
      { letter: "B", text: "suggests" },
      { letter: "C", text: "suggesting" },
      { letter: "D", text: "suggested" }
    ],
    correctAnswer: "B",
    explanation: "The singular collective noun 'data' (when treated as a unit, common in American English) takes singular verb 'suggests.' Present tense indicates current implications of the study.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng158",
    question: "Text 1:\nPhysicist Lee Smolin argues that string theory, despite decades of development, has failed to produce testable predictions and should no longer dominate theoretical physics. He contends the field has become insular, with researchers pursuing mathematical elegance over empirical falsifiability.\n\nText 2:\nPhysicist Brian Greene defends string theory, arguing that the absence of direct tests reflects current technological limitations rather than theoretical failure. He notes that many now-accepted theories, including general relativity, initially lacked experimental verification. String theory's mathematical consistency, he suggests, is itself a form of evidence.\n\nBased on the texts, Greene (Text 2) would most likely respond to Smolin's criticism in Text 1 by arguing that:",
    options: [
      { letter: "A", text: "String theory has actually produced several testable predictions that Smolin overlooks" },
      { letter: "B", text: "Judging theories solely by current testability imposes an unreasonably narrow standard" },
      { letter: "C", text: "Mathematical elegance is more important than empirical evidence in theoretical physics" },
      { letter: "D", text: "The physics community has not actually prioritized string theory over other approaches" }
    ],
    correctAnswer: "B",
    explanation: "Greene argues the 'absence of direct tests reflects current technological limitations' and cites general relativity as initially lacking verification. He would argue Smolin's testability standard is too narrow given historical precedent.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng159",
    question: "The novelist's prose style has evolved considerably over her career; her early works featured elaborate sentences and extensive description, ______ her recent novels employ spare, economical language.",
    options: [
      { letter: "A", text: "therefore" },
      { letter: "B", text: "moreover" },
      { letter: "C", text: "whereas" },
      { letter: "D", text: "consequently" }
    ],
    correctAnswer: "C",
    explanation: "'Whereas' correctly signals contrast between 'elaborate sentences and extensive description' in early works and 'spare, economical language' in recent novels.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng160",
    question: "While researching a topic, a student took the following notes:\n• Mycelium, the underground network of fungal threads, can span thousands of acres.\n• Trees use mycelial networks to share nutrients with neighboring trees, including different species.\n• Scientists call these networks 'wood wide webs.'\n• Older 'mother trees' send more resources to younger seedlings through these networks.\n• Some researchers argue this challenges purely competitive models of forest ecology.\n\nThe student wants to emphasize how mycelial networks complicate traditional ecological models.",
    options: [
      { letter: "A", text: "Mycelium networks, sometimes spanning thousands of acres, connect trees in forest ecosystems." },
      { letter: "B", text: "Scientists have nicknamed fungal networks in forests 'wood wide webs' because of their connectivity." },
      { letter: "C", text: "The discovery that trees share resources through fungal networks challenges the view of forests as purely competitive ecosystems." },
      { letter: "D", text: "Mother trees send more nutrients to younger seedlings through underground mycelial connections." }
    ],
    correctAnswer: "C",
    explanation: "Choice C directly addresses how the networks 'challenge' traditional models by showing forests aren't 'purely competitive'—emphasizing the complication of conventional ecological understanding.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng161",
    question: "The historian's analysis of the treaty reveals previously unexamined ______ between the official diplomatic record and private correspondence among the negotiators.",
    options: [
      { letter: "A", text: "continuities" },
      { letter: "B", text: "discrepancies" },
      { letter: "C", text: "redundancies" },
      { letter: "D", text: "parallels" }
    ],
    correctAnswer: "B",
    explanation: "'Discrepancies' means inconsistencies or differences. Comparing 'official diplomatic record' with 'private correspondence' and finding something 'previously unexamined' suggests discovering differences (discrepancies) between public and private accounts.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng162",
    question: "The following text is adapted from Ralph Ellison's Invisible Man (1952).\nI am an invisible man. No, I am not a spook like those who haunted Edgar Allan Poe; nor am I one of your Hollywood-movie ectoplasms. I am a man of substance, of flesh and bone, fiber and liquids—and I might even be said to possess a mind.\n\nWhich choice best describes the function of the second sentence in the passage?",
    options: [
      { letter: "A", text: "It clarifies that the narrator's invisibility is metaphorical rather than supernatural" },
      { letter: "B", text: "It establishes the narrator's interest in literature and film" },
      { letter: "C", text: "It suggests the narrator doubts his own physical existence" },
      { letter: "D", text: "It introduces humor to lighten the serious tone of the opening" }
    ],
    correctAnswer: "A",
    explanation: "By distinguishing himself from Poe's ghosts and 'Hollywood ectoplasms' and asserting he is 'of substance, of flesh and bone,' the narrator clarifies that his 'invisibility' is metaphorical (social), not literal/supernatural.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng163",
    question: "The pharmaceutical company's decision to abandon the promising drug candidate was ______: clinical trials had shown efficacy, but manufacturing costs made the treatment economically unviable.",
    options: [
      { letter: "A", text: "capricious" },
      { letter: "B", text: "pragmatic" },
      { letter: "C", text: "negligent" },
      { letter: "D", text: "fortuitous" }
    ],
    correctAnswer: "B",
    explanation: "'Pragmatic' means dealing with matters practically rather than theoretically. The drug worked ('shown efficacy') but was abandoned for practical economic reasons ('manufacturing costs')—a pragmatic decision based on real-world constraints.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng164",
    question: "Each of the proposed amendments to the constitution ______ significant implications for the balance of power between federal and state governments.",
    options: [
      { letter: "A", text: "have" },
      { letter: "B", text: "has" },
      { letter: "C", text: "having" },
      { letter: "D", text: "had" }
    ],
    correctAnswer: "B",
    explanation: "'Each' is singular and requires the singular verb 'has,' regardless of the intervening plural phrase 'of the proposed amendments.' Present tense indicates current implications.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng165",
    question: "The art critic's review was ______: she devoted three paragraphs to minor technical flaws while mentioning the painting's extraordinary emotional power in a single sentence.",
    options: [
      { letter: "A", text: "proportionate" },
      { letter: "B", text: "laudatory" },
      { letter: "C", text: "imbalanced" },
      { letter: "D", text: "prescient" }
    ],
    correctAnswer: "C",
    explanation: "'Imbalanced' means lacking proportion. Spending three paragraphs on 'minor flaws' while giving only one sentence to 'extraordinary emotional power' represents a disproportionate, imbalanced review.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng166",
    question: "The research demonstrates that mindfulness meditation reduces anxiety symptoms. ______, the mechanisms by which meditation produces these effects remain poorly understood.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Therefore," },
      { letter: "B", text: "However," },
      { letter: "C", text: "Similarly," },
      { letter: "D", text: "Specifically," }
    ],
    correctAnswer: "B",
    explanation: "'However' correctly signals contrast: we know meditation works (demonstrated effects) but don't understand how (mechanisms 'poorly understood').",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng167",
    question: "Text 1:\nLiterary critic Cleanth Brooks championed 'close reading'—careful attention to a text's formal elements like imagery, paradox, and structure. He argued that a poem's meaning emerges from these internal features, independent of the author's biography or historical context.\n\nText 2:\nNew Historicist critics challenge formalist approaches like Brooks's. They argue that literary texts are inextricably embedded in their historical moments and that understanding a work requires examining the cultural, political, and economic forces that shaped its production and reception.\n\nBased on the texts, New Historicist critics (Text 2) would most likely argue that Brooks's approach in Text 1:",
    options: [
      { letter: "A", text: "Correctly identifies the formal elements that deserve primary attention" },
      { letter: "B", text: "Artificially isolates texts from the contexts that give them meaning" },
      { letter: "C", text: "Places too much emphasis on an author's biographical details" },
      { letter: "D", text: "Fails to appreciate the aesthetic qualities of literary works" }
    ],
    correctAnswer: "B",
    explanation: "New Historicists argue texts are 'inextricably embedded in their historical moments.' They would criticize Brooks for treating meaning as 'independent of...historical context'—artificially isolating texts from their contexts.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng168",
    question: "While researching a topic, a student took the following notes:\n• The Fermi Paradox asks why we haven't detected signs of extraterrestrial civilizations despite the universe's vastness.\n• One explanation, the 'Great Filter,' suggests civilizations face extinction-level challenges.\n• If the filter is behind us (like the origin of life), humanity may be rare but safe.\n• If the filter is ahead (like nuclear war or AI), most civilizations may destroy themselves.\n• Finding simple life elsewhere would suggest the filter is ahead, which would be troubling.\n\nThe student wants to explain why discovering simple extraterrestrial life might be concerning.",
    options: [
      { letter: "A", text: "The Fermi Paradox asks why we haven't found evidence of extraterrestrial civilizations despite the universe's vastness." },
      { letter: "B", text: "The Great Filter hypothesis suggests that civilizations face challenges that prevent them from becoming detectable." },
      { letter: "C", text: "If the Great Filter lies behind us, humanity may be extremely rare but relatively safe from extinction threats." },
      { letter: "D", text: "Finding simple life elsewhere would suggest the Great Filter lies ahead, implying that advanced civilizations typically destroy themselves." }
    ],
    correctAnswer: "D",
    explanation: "Choice D explains why simple life discovery is 'concerning': it would suggest the filter is ahead (not behind us), implying most civilizations—including potentially ours—face future extinction.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng169",
    question: "The architect's design for the memorial was deliberately ______: rather than imposing a single interpretation, the abstract forms invited visitors to bring their own meanings to the space.",
    options: [
      { letter: "A", text: "didactic" },
      { letter: "B", text: "prescriptive" },
      { letter: "C", text: "evocative" },
      { letter: "D", text: "explicit" }
    ],
    correctAnswer: "C",
    explanation: "'Evocative' means bringing strong images, memories, or feelings to mind. The design 'invited visitors to bring their own meanings'—it evokes responses without dictating them. 'Didactic' and 'prescriptive' suggest imposing interpretation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng170",
    question: "The following text is adapted from Chinua Achebe's Things Fall Apart (1958).\nOkonkwo was well known throughout the nine villages and even beyond. His fame rested on solid personal achievements.\n\nWhich choice best describes the function of these opening sentences?",
    options: [
      { letter: "A", text: "They introduce the protagonist through his reputation, establishing his importance before revealing specific actions" },
      { letter: "B", text: "They suggest the narrative will focus on the protagonist's internal psychological struggles" },
      { letter: "C", text: "They establish an ironic distance between the narrator and the community being described" },
      { letter: "D", text: "They foreshadow the protagonist's eventual downfall and loss of reputation" }
    ],
    correctAnswer: "A",
    explanation: "The opening introduces Okonkwo through his widespread reputation ('well known throughout the nine villages and even beyond') and hints at achievements to come. It establishes importance before providing details.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng171",
    question: "The diplomat's carefully calibrated statement was designed to ______ tensions between the two nations without making concrete commitments that might later prove difficult to honor.",
    options: [
      { letter: "A", text: "exacerbate" },
      { letter: "B", text: "defuse" },
      { letter: "C", text: "acknowledge" },
      { letter: "D", text: "document" }
    ],
    correctAnswer: "B",
    explanation: "'Defuse' means reduce tension or potential danger. A 'carefully calibrated statement' designed to manage tensions while avoiding commitments aims to defuse (calm) the situation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng172",
    question: "The novelist, ______ works have been translated into forty languages, will receive an honorary degree at the university's commencement ceremony.",
    options: [
      { letter: "A", text: "who's" },
      { letter: "B", text: "whose" },
      { letter: "C", text: "which" },
      { letter: "D", text: "whom" }
    ],
    correctAnswer: "B",
    explanation: "'Whose' is the possessive form needed to show the works belong to the novelist. 'Who's' means 'who is.' 'Which' doesn't refer to people. 'Whom' is objective case, not possessive.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng173",
    question: "The study's findings were ______: instead of the predicted decline, researchers observed a modest increase in the target population.",
    options: [
      { letter: "A", text: "anticipated" },
      { letter: "B", text: "corroborated" },
      { letter: "C", text: "counterintuitive" },
      { letter: "D", text: "inconsequential" }
    ],
    correctAnswer: "C",
    explanation: "'Counterintuitive' means contrary to expectations. Finding 'increase' 'instead of the predicted decline' describes results opposite to what was expected—counterintuitive findings.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng174",
    question: "The committee's recommendations, ______ implemented fully, would fundamentally transform how the agency conducts its oversight responsibilities.",
    options: [
      { letter: "A", text: "if" },
      { letter: "B", text: "unless" },
      { letter: "C", text: "although" },
      { letter: "D", text: "because" }
    ],
    correctAnswer: "A",
    explanation: "'If implemented fully' creates a conditional clause: the transformation would occur on the condition of full implementation. 'Unless' would imply the opposite logic.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng175",
    question: "Text 1:\nPsychologist Jonathan Haidt argues that social media, particularly visual platforms, has contributed to rising rates of anxiety and depression among adolescents. He points to correlational data showing mental health declines coinciding with smartphone adoption and calls for age restrictions on social media use.\n\nText 2:\nPsychologist Candice Odgers critiques Haidt's conclusions, arguing that correlational data cannot establish causation and that effect sizes in studies linking social media to mental health are typically small. She suggests that focusing on social media distracts from more significant factors like poverty, trauma, and inadequate mental health services.\n\nBased on the texts, Odgers (Text 2) would most likely argue that Haidt's position in Text 1:",
    options: [
      { letter: "A", text: "Overstates the evidence for a causal relationship between social media and adolescent mental health" },
      { letter: "B", text: "Correctly identifies the timing of mental health declines but misattributes the cause" },
      { letter: "C", text: "Fails to acknowledge that any relationship exists between technology use and well-being" },
      { letter: "D", text: "Places too much emphasis on visual platforms relative to other forms of social media" }
    ],
    correctAnswer: "A",
    explanation: "Odgers argues correlational data 'cannot establish causation' and effect sizes are 'typically small.' She would argue Haidt overstates the evidence by drawing strong causal conclusions from limited data.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng176",
    question: "While researching a topic, a student took the following notes:\n• The 'overview effect' describes the cognitive shift astronauts experience when viewing Earth from space.\n• Astronauts report feeling awe, interconnectedness, and concern for the planet.\n• The effect was first described by author Frank White in 1987.\n• Some researchers are exploring virtual reality simulations to induce similar feelings.\n• Critics question whether simulations can replicate the profound impact of actual spaceflight.\n\nThe student wants to explain attempts to replicate the overview effect without spaceflight.",
    options: [
      { letter: "A", text: "The overview effect, first described by Frank White in 1987, refers to the cognitive shift astronauts experience viewing Earth from space." },
      { letter: "B", text: "Astronauts experiencing the overview effect report feeling awe, interconnectedness, and increased concern for Earth's well-being." },
      { letter: "C", text: "Researchers are developing virtual reality simulations to induce overview-effect-like feelings in people who cannot travel to space." },
      { letter: "D", text: "Critics question whether any simulation could replicate the profound psychological impact of viewing Earth from actual orbit." }
    ],
    correctAnswer: "C",
    explanation: "Choice C directly explains attempts to replicate the effect (VR simulations) for non-astronauts, addressing the goal of explaining replication efforts without spaceflight.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng177",
    question: "The novelist's prose achieves its effects through ______: she withholds key information, allowing readers to piece together the narrative from fragmentary hints.",
    options: [
      { letter: "A", text: "redundancy" },
      { letter: "B", text: "elision" },
      { letter: "C", text: "hyperbole" },
      { letter: "D", text: "exposition" }
    ],
    correctAnswer: "B",
    explanation: "'Elision' means omission or leaving out. 'Withholds key information' and 'fragmentary hints' describe a technique of deliberate omission—elision—that creates effects through what's left unsaid.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng178",
    question: "The following text is adapted from Sylvia Plath's The Bell Jar (1963).\nIt was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn't know what I was doing in New York.\n\nWhich choice best describes the effect of mentioning the Rosenbergs' execution in this opening?",
    options: [
      { letter: "A", text: "It establishes the narrator as politically engaged and socially conscious" },
      { letter: "B", text: "It dates the narrative while introducing themes of death and disorientation" },
      { letter: "C", text: "It suggests the narrator was personally connected to the executed individuals" },
      { letter: "D", text: "It criticizes the justice system of the era" }
    ],
    correctAnswer: "B",
    explanation: "The Rosenberg execution (1953) dates the narrative historically, while the juxtaposition of execution with 'I didn't know what I was doing' introduces death and personal disorientation as linked themes.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng179",
    question: "The economist argued that the proposed trade agreement would ______ domestic manufacturing jobs, but supporters countered that it would create more positions in the technology sector.",
    options: [
      { letter: "A", text: "jeopardize" },
      { letter: "B", text: "safeguard" },
      { letter: "C", text: "quantify" },
      { letter: "D", text: "subsidize" }
    ],
    correctAnswer: "A",
    explanation: "'Jeopardize' means put at risk. The 'but' signals contrast: the economist sees risk to manufacturing jobs while supporters see job creation elsewhere. 'Safeguard' would be the opposite.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng180",
    question: "The symphony orchestra, along with several guest soloists, ______ scheduled to perform at the new concert hall next month.",
    options: [
      { letter: "A", text: "are" },
      { letter: "B", text: "is" },
      { letter: "C", text: "were" },
      { letter: "D", text: "being" }
    ],
    correctAnswer: "B",
    explanation: "The subject 'symphony orchestra' is singular; 'along with several guest soloists' is a parenthetical phrase that doesn't change the number. Singular subject requires singular verb 'is.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng181",
    question: "Text 1:\nEconomist Daron Acemoglu argues that artificial intelligence poses a significant threat to employment. Unlike previous technological revolutions that created new jobs to replace those eliminated, AI may automate tasks across virtually all sectors simultaneously, leaving workers without viable alternatives.\n\nText 2:\nEconomist David Autor suggests that concerns about AI-driven unemployment may be overstated. He notes that automation typically transforms jobs rather than eliminating them entirely, and that new technologies historically create demands for human skills that complement machine capabilities.\n\nBased on the texts, how would Autor (Text 2) most likely respond to Acemoglu's concern in Text 1?",
    options: [
      { letter: "A", text: "By arguing that AI will primarily affect sectors with routine, easily automated tasks" },
      { letter: "B", text: "By suggesting that human-machine collaboration will generate new employment opportunities" },
      { letter: "C", text: "By claiming that government intervention can prevent most AI-related job losses" },
      { letter: "D", text: "By asserting that AI development will proceed more slowly than Acemoglu assumes" }
    ],
    correctAnswer: "B",
    explanation: "Autor argues automation 'transforms jobs' and creates 'demands for human skills that complement machine capabilities.' He would respond that AI will create complementary roles through human-machine collaboration.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng182",
    question: "The researcher's methodology was criticized as ______: critics argued that her conclusions were predetermined by her theoretical framework rather than emerging from unbiased observation.",
    options: [
      { letter: "A", text: "empirical" },
      { letter: "B", text: "innovative" },
      { letter: "C", text: "circular" },
      { letter: "D", text: "comprehensive" }
    ],
    correctAnswer: "C",
    explanation: "'Circular' reasoning assumes what it sets out to prove. If conclusions were 'predetermined by her theoretical framework' rather than emerging from observation, the methodology is circular—the theory dictates the findings.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng183",
    question: "The author's latest novel, ______ by critics for its experimental narrative structure, has nonetheless become a bestseller with general readers.",
    options: [
      { letter: "A", text: "praised" },
      { letter: "B", text: "praising" },
      { letter: "C", text: "to praise" },
      { letter: "D", text: "praises" }
    ],
    correctAnswer: "A",
    explanation: "'Praised' functions as a past participle in a reduced relative clause ('which was praised'), correctly modifying 'novel.' The 'nonetheless' signals that popular success came despite (or in addition to) critical praise.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng184",
    question: "The museum's renovation was designed to improve accessibility; ______, new ramps, elevators, and tactile exhibits were added throughout the building.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "however" },
      { letter: "B", text: "accordingly" },
      { letter: "C", text: "conversely" },
      { letter: "D", text: "nevertheless" }
    ],
    correctAnswer: "B",
    explanation: "'Accordingly' signals that what follows is consistent with or follows from what precedes. The accessibility improvements (ramps, elevators, tactile exhibits) logically follow from the goal of improving accessibility.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng185",
    question: "While researching a topic, a student took the following notes:\n• Synesthesia is a neurological condition where stimulating one sense triggers automatic experiences in another.\n• A synesthete might see colors when hearing music or taste shapes.\n• About 4% of the population has some form of synesthesia.\n• Brain imaging shows synesthetes have increased connectivity between sensory regions.\n• Some artists and musicians credit synesthesia for their creative abilities.\n\nThe student wants to define synesthesia for readers unfamiliar with the term.",
    options: [
      { letter: "A", text: "Synesthesia, a neurological condition affecting about 4% of the population, involves automatic sensory crossover—such as seeing colors when hearing music." },
      { letter: "B", text: "Brain imaging studies reveal that synesthetes have increased connectivity between different sensory processing regions." },
      { letter: "C", text: "Some artists and musicians attribute their creative abilities to their synesthetic experiences." },
      { letter: "D", text: "A person with synesthesia might experience tasting shapes or seeing colors in response to sounds." }
    ],
    correctAnswer: "A",
    explanation: "Choice A provides a clear definition ('neurological condition...automatic sensory crossover') with a concrete example ('seeing colors when hearing music'), making it ideal for unfamiliar readers.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng186",
    question: "The following text is adapted from George Orwell's 1984 (1949).\nIt was a bright cold day in April, and the clocks were striking thirteen.\n\nWhich choice best describes the effect of this opening sentence?",
    options: [
      { letter: "A", text: "It creates immediate unease by introducing an impossible detail into an otherwise ordinary setting" },
      { letter: "B", text: "It establishes that the narrative takes place in a technologically advanced future" },
      { letter: "C", text: "It suggests the narrator's perception of time is unreliable" },
      { letter: "D", text: "It indicates that the story will focus on the changing of seasons" }
    ],
    correctAnswer: "A",
    explanation: "The 'bright cold day in April' is ordinary, but 'clocks striking thirteen' is impossible in standard timekeeping. This single impossible detail creates unease, signaling something is fundamentally wrong with this world.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng187",
    question: "The composer's early works were ______ in style, adhering closely to classical conventions, but her later compositions broke radically with tradition.",
    options: [
      { letter: "A", text: "heterodox" },
      { letter: "B", text: "conventional" },
      { letter: "C", text: "innovative" },
      { letter: "D", text: "eclectic" }
    ],
    correctAnswer: "B",
    explanation: "'Conventional' means following accepted standards. 'Adhering closely to classical conventions' defines conventional style, contrasted with later works that 'broke radically with tradition.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng188",
    question: "Text 1:\nArchaeologist Lewis Binford argued that changes in prehistoric tool technology reflect adaptations to environmental conditions. He emphasized the functional purposes of tools and saw technological change as driven primarily by ecological pressures and subsistence needs.\n\nText 2:\nArchaeologist Ian Hodder challenges purely functionalist interpretations of material culture. He argues that objects carry symbolic meanings and that prehistoric peoples made choices based on cultural values, social relationships, and identity—not just practical utility. Technology, in his view, is as much about meaning as function.\n\nBased on the texts, Hodder (Text 2) would most likely argue that Binford's approach in Text 1:",
    options: [
      { letter: "A", text: "Correctly identifies environmental factors but overstates their importance relative to cultural ones" },
      { letter: "B", text: "Fails to account for how symbolic and social meanings shape technological choices" },
      { letter: "C", text: "Places too much emphasis on changes in technology rather than continuities" },
      { letter: "D", text: "Overlooks evidence that prehistoric peoples had limited ability to adapt to environments" }
    ],
    correctAnswer: "B",
    explanation: "Hodder emphasizes 'symbolic meanings,' 'cultural values,' and 'social relationships.' He would criticize Binford's focus on function and ecology for neglecting how non-utilitarian factors shape technology.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng189",
    question: "The journalist's investigation revealed that the company had systematically ______ environmental regulations for years while publicly proclaiming commitment to sustainability.",
    options: [
      { letter: "A", text: "flouted" },
      { letter: "B", text: "flaunted" },
      { letter: "C", text: "observed" },
      { letter: "D", text: "promoted" }
    ],
    correctAnswer: "A",
    explanation: "'Flouted' means openly disregarded. The contrast between secretly violating regulations 'while publicly proclaiming commitment to sustainability' indicates the company flouted (disregarded) the rules.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng190",
    question: "The research team hypothesized that the treatment ______ effective for patients with early-stage disease, but their clinical trial included only participants with advanced cases.",
    options: [
      { letter: "A", text: "would be" },
      { letter: "B", text: "will be" },
      { letter: "C", text: "is" },
      { letter: "D", text: "being" }
    ],
    correctAnswer: "A",
    explanation: "'Would be' expresses a past hypothesis about a conditional outcome. The team hypothesized (past) about what the treatment would do under certain conditions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Form, Structure, and Sense"
  },
  {
    id: "eng191",
    question: "While researching a topic, a student took the following notes:\n• The Library of Alexandria was one of the ancient world's largest repositories of knowledge.\n• Estimates suggest it held between 40,000 and 400,000 scrolls.\n• The library's destruction is often blamed on a single catastrophic fire.\n• Historians now believe the library declined gradually over centuries due to reduced funding and neglect.\n• No definitive evidence supports the dramatic fire narrative.\n\nThe student wants to correct a common misconception about the library's fate.",
    options: [
      { letter: "A", text: "The Library of Alexandria held between 40,000 and 400,000 scrolls, making it one of the ancient world's largest knowledge repositories." },
      { letter: "B", text: "Contrary to popular belief, the Library of Alexandria was not destroyed in a single catastrophic fire but declined gradually through centuries of neglect." },
      { letter: "C", text: "The Library of Alexandria was one of the most significant centers of learning in the ancient world." },
      { letter: "D", text: "Historians have found no definitive evidence about exactly how the Library of Alexandria was destroyed." }
    ],
    correctAnswer: "B",
    explanation: "Choice B directly corrects the misconception by stating 'contrary to popular belief' and contrasting the false narrative (single fire) with the historical reality (gradual decline).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng192",
    question: "The senator's voting record reveals a ______ between her campaign rhetoric and her legislative actions: she promised fiscal conservatism but consistently supported increased spending.",
    options: [
      { letter: "A", text: "correlation" },
      { letter: "B", text: "confluence" },
      { letter: "C", text: "discrepancy" },
      { letter: "D", text: "synthesis" }
    ],
    correctAnswer: "C",
    explanation: "'Discrepancy' means a difference or inconsistency. Promising 'fiscal conservatism' while 'consistently supporting increased spending' shows a discrepancy between words and actions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng193",
    question: "The following text is adapted from Albert Camus's The Stranger (1942).\nMaman died today. Or yesterday maybe, I don't know. I got a telegram from the home: 'Mother deceased. Funeral tomorrow. Faithfully yours.' That doesn't mean anything.\n\nWhich choice best describes the effect of the narrator's statement 'I don't know'?",
    options: [
      { letter: "A", text: "It reveals the narrator's grief is so overwhelming that he has lost track of time" },
      { letter: "B", text: "It establishes the narrator's emotional detachment through his indifference to the timing" },
      { letter: "C", text: "It suggests the narrator has a poor relationship with his mother" },
      { letter: "D", text: "It indicates the narrator received the news while traveling" }
    ],
    correctAnswer: "B",
    explanation: "The casual uncertainty about when his mother died ('today. Or yesterday maybe, I don't know') establishes emotional detachment—most people would know exactly when a parent died. This indifference signals the narrator's alienation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng194",
    question: "The architectural firm's design for the civic center was praised for its ______: the building's form clearly expressed its public functions while harmonizing with the surrounding historic district.",
    options: [
      { letter: "A", text: "opacity" },
      { letter: "B", text: "legibility" },
      { letter: "C", text: "austerity" },
      { letter: "D", text: "uniformity" }
    ],
    correctAnswer: "B",
    explanation: "'Legibility' in architecture means the building's purpose is clearly readable from its form. The design 'clearly expressed its public functions'—its purpose was legible (easily understood) from its appearance.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng195",
    question: "Neither the proposed regulatory changes nor the voluntary industry guidelines ______ adequate to address the systemic risks identified in the report.",
    options: [
      { letter: "A", text: "is" },
      { letter: "B", text: "are" },
      { letter: "C", text: "was" },
      { letter: "D", text: "being" }
    ],
    correctAnswer: "B",
    explanation: "With 'neither...nor,' the verb agrees with the nearer subject ('voluntary industry guidelines,' plural), requiring 'are.' Present tense indicates current assessment.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Subject-Verb Agreement"
  },
  {
    id: "eng196",
    question: "Text 1:\nPhilosopher John Rawls proposed that just institutions should be designed as if from behind a 'veil of ignorance'—not knowing one's place in society. He argued this thought experiment would lead rational people to choose principles ensuring fair treatment for the least advantaged members of society.\n\nText 2:\nPhilosopher Robert Nozick criticized Rawls's approach, arguing it ignores how goods are actually acquired. Nozick contended that redistributive policies violate individuals' rights to their justly acquired holdings. Justice, he argued, depends on the history of how things came to be owned, not on end-state patterns of distribution.\n\nBased on the texts, Nozick (Text 2) would most likely argue that Rawls's theory in Text 1:",
    options: [
      { letter: "A", text: "Incorrectly assumes people would agree on principles of justice behind a veil of ignorance" },
      { letter: "B", text: "Ignores individuals' entitlements by focusing on distribution patterns rather than how holdings were acquired" },
      { letter: "C", text: "Fails to provide guidance for designing actual political institutions" },
      { letter: "D", text: "Places too much emphasis on the needs of the most advantaged members of society" }
    ],
    correctAnswer: "B",
    explanation: "Nozick argues justice 'depends on the history of how things came to be owned, not on end-state patterns.' He would criticize Rawls for focusing on distribution (end-state) while ignoring how people acquired what they have.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Cross-Text Connections"
  },
  {
    id: "eng197",
    question: "The novelist's technique of ______ multiple narrative perspectives creates a portrait of events more comprehensive than any single viewpoint could provide.",
    options: [
      { letter: "A", text: "obscuring" },
      { letter: "B", text: "juxtaposing" },
      { letter: "C", text: "eliminating" },
      { letter: "D", text: "homogenizing" }
    ],
    correctAnswer: "B",
    explanation: "'Juxtaposing' means placing side by side for comparison. Using 'multiple narrative perspectives' to create a 'more comprehensive portrait' describes juxtaposition—placing different viewpoints together.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Words in Context"
  },
  {
    id: "eng198",
    question: "The discovery of water ice on the Moon has significant implications for future space exploration. ______, the ice could potentially be converted into drinking water, oxygen, and rocket fuel for lunar bases.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "Nevertheless," },
      { letter: "B", text: "For instance," },
      { letter: "C", text: "In contrast," },
      { letter: "D", text: "Subsequently," }
    ],
    correctAnswer: "B",
    explanation: "'For instance' correctly introduces specific examples (drinking water, oxygen, rocket fuel) that illustrate the general claim about 'significant implications.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Transitions"
  },
  {
    id: "eng199",
    question: "While researching a topic, a student took the following notes:\n• The Turing test, proposed by Alan Turing in 1950, evaluates whether a machine can exhibit intelligent behavior indistinguishable from a human.\n• Critics argue the test measures imitation rather than genuine intelligence.\n• Some AI systems have 'passed' the test by exploiting judges' expectations rather than demonstrating understanding.\n• Philosopher John Searle's 'Chinese Room' argument suggests passing the test doesn't indicate consciousness.\n• Despite criticism, the test remains influential in AI research and popular culture.\n\nThe student wants to present both the significance and limitations of the Turing test.",
    options: [
      { letter: "A", text: "The Turing test, proposed in 1950, remains influential despite criticisms that it measures imitation rather than genuine intelligence or consciousness." },
      { letter: "B", text: "Alan Turing proposed his famous test of machine intelligence in 1950." },
      { letter: "C", text: "Some AI systems have passed the Turing test by exploiting judges' expectations rather than demonstrating genuine understanding." },
      { letter: "D", text: "Philosopher John Searle's Chinese Room argument challenges the idea that passing the Turing test indicates consciousness." }
    ],
    correctAnswer: "A",
    explanation: "Choice A presents both significance ('remains influential') and limitations ('criticisms that it measures imitation rather than genuine intelligence or consciousness'), fulfilling the dual goal.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Rhetorical Synthesis"
  },
  {
    id: "eng200",
    question: "The following text is adapted from F. Scott Fitzgerald's The Great Gatsby (1925).\nIn my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'\n\nWhich choice best describes the function of the father's advice in this opening passage?",
    options: [
      { letter: "A", text: "It establishes the narrator's tendency to judge others harshly" },
      { letter: "B", text: "It introduces a principle of moral restraint that will frame the narrative" },
      { letter: "C", text: "It reveals the father as the novel's central moral authority" },
      { letter: "D", text: "It suggests the narrator comes from a disadvantaged background" }
    ],
    correctAnswer: "B",
    explanation: "The advice about withholding criticism establishes a moral framework for the narrative. The narrator has 'been turning it over' ever since, suggesting it frames how he will tell—and judge—the story that follows.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng201",
    question: "Marta Coll and colleagues' 2010 Mediterranean Sea biodiversity census reported approximately 17,000 species, nearly double the number reported in Carlo Bianchi and Carla Morri's 2000 census—a difference only partly attributable to the description of new invertebrate species in the interim. Another factor is that the morphological variability of microorganisms is poorly understood compared to that of vertebrates, invertebrates, plants, and algae, creating uncertainty about how to evaluate microorganisms as species. Researchers' decisions on such matters therefore can be highly consequential. Indeed, the two censuses reported similar counts of vertebrate, plant, and algal species, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "Coll and colleagues reported a much higher number of species than Bianchi and Morri did largely due to the inclusion of invertebrate species that had not been described at the time of Bianchi and Morri's census." },
      { letter: "B", text: "some differences observed in microorganisms may have been treated as variations within species by Bianchi and Morri but treated as indicative of distinct species by Coll and colleagues." },
      { letter: "C", text: "Bianchi and Morri may have been less sensitive to the degree of morphological variation displayed within a typical species of microorganism than Coll and colleagues were." },
      { letter: "D", text: "the absence of clarity regarding how to differentiate among species of microorganisms may have resulted in Coll and colleagues underestimating the number of microorganism species." }
    ],
    correctAnswer: "B",
    explanation: "The text explains that microorganism classification is uncertain and that researchers' decisions can significantly affect counts. Since vertebrate, plant, and algal counts were similar between censuses, the difference came from how microorganisms were classified.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng202",
    question: "Many literary theorists distinguish between fabula, a narrative's content, and syuzhet, a narrative's arrangement and presentation of events. In the film The Godfather Part II, the fabula is the story of the Corleone family, and the syuzhet is the presentation of the story as it alternates between two timelines in 1901 and 1958. But literary theorist Mikhail Bakhtin maintained that fabula and syuzhet are insufficient to completely describe a narrative—he held that systematic categorizations of artistic phenomena discount the subtle way in which meaning is created by interactions between the artist, the work, and the audience.\n\nWhich choice best states the main idea of the text?",
    options: [
      { letter: "A", text: "Literary theorist Mikhail Bakhtin argued that there are important characteristics of narratives that are not fully encompassed by two concepts that other theorists have used to analyze narratives." },
      { letter: "B", text: "Literary theorist Mikhail Bakhtin claimed that meaning is not inherent in a narrative but is created when an audience encounters a narrative so that narratives are interpreted differently by different people." },
      { letter: "C", text: "The storytelling methods used in The Godfather Part II may seem unusually complicated, but they can be easily understood when two concepts from literary theory are utilized." },
      { letter: "D", text: "Narratives that are told out of chronological order are more difficult for audiences to understand than are narratives presented chronologically." }
    ],
    correctAnswer: "A",
    explanation: "The text explains fabula and syuzhet, then presents Bakhtin's view that these concepts are insufficient because they fail to account for how meaning emerges from artist-work-audience interactions.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Text Structure and Purpose"
  },
  {
    id: "eng203",
    question: "The International Union for Conservation of Nature (IUCN) Red List of Threatened Species is widely regarded as the most comprehensive inventory of global conservation status. The Red List classifies species as \"vulnerable,\" \"endangered,\" or \"critically endangered\" based on criteria such as population size and rate of decline. However, critics argue that the Red List's criteria may not adequately capture threats to species that are geographically restricted, such as those found only on small islands. These species may be highly vulnerable to localized threats like invasive species or climate change but might not meet the Red List's population-based thresholds for classification.\n\nWhich finding, if true, would most directly challenge the critics' argument?",
    options: [
      { letter: "A", text: "Small-island species often have small populations, so they frequently meet the Red List's population size criteria for classification as threatened." },
      { letter: "B", text: "The Red List has successfully predicted the extinction of several small-island species in the past." },
      { letter: "C", text: "Many small-island species are classified as threatened based on their rate of decline rather than population size." },
      { letter: "D", text: "The IUCN has proposed revisions to the Red List criteria specifically for geographically restricted species." }
    ],
    correctAnswer: "A",
    explanation: "If small-island species often have small populations and therefore meet the Red List's population thresholds, this directly challenges the critics' claim that the criteria fail to capture these species.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng204",
    question: "In the early 20th century, the discovery of penicillin revolutionized medicine by providing an effective treatment for bacterial infections. However, the widespread use of antibiotics has led to the emergence of antibiotic-resistant bacteria, posing a significant public health threat. One strategy to combat this is the development of new antibiotics, but the process is slow and costly. Another approach is antibiotic stewardship, which involves judicious use of antibiotics to minimize resistance.\n\nWhich choice best describes the function of the underlined portion (\"the process is slow and costly\") in the text as a whole?",
    options: [
      { letter: "A", text: "It explains why antibiotic stewardship is a more promising strategy than the development of new antibiotics." },
      { letter: "B", text: "It provides evidence for the claim that antibiotic resistance is a significant public health threat." },
      { letter: "C", text: "It highlights a limitation of one strategy for combating antibiotic resistance." },
      { letter: "D", text: "It contrasts the historical impact of penicillin with modern challenges in antibiotic development." }
    ],
    correctAnswer: "C",
    explanation: "The underlined portion highlights a limitation of developing new antibiotics—that it is slow and costly—which is one of the two strategies mentioned for combating resistance.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng205",
    question: "The concept of \"dark matter\" in cosmology refers to a hypothetical form of matter that does not interact with light and is inferred from its gravitational effects on visible matter. Observations of galaxy rotation curves suggest that dark matter is distributed in halos surrounding galaxies. However, alternative theories, such as modified Newtonian dynamics (MOND), propose that the observed effects can be explained without dark matter by altering the laws of gravity at low accelerations.\n\nWhich choice most accurately describes the relationship between the underlined words (\"alternative theories\") and the rest of the text?",
    options: [
      { letter: "A", text: "They introduce ideas that challenge the main hypothesis presented in the text." },
      { letter: "B", text: "They provide examples of the gravitational effects attributed to dark matter." },
      { letter: "C", text: "They describe the observational methods used to detect dark matter halos." },
      { letter: "D", text: "They explain the hypothetical nature of dark matter as a form of matter." }
    ],
    correctAnswer: "A",
    explanation: "The 'alternative theories' like MOND challenge the dark matter hypothesis by proposing explanations that don't require dark matter to exist.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng206",
    question: "During the Renaissance, the invention of the printing press by Johannes Gutenberg facilitated the rapid dissemination of knowledge, contributing to cultural and scientific advancements. This technological innovation allowed for the mass production of books, making them more accessible to the general population. Prior to the printing press, books were laboriously copied by hand, limiting their availability to the wealthy and clergy.\n\nThe author includes the sentence \"Prior to the printing press, books were laboriously copied by hand, limiting their availability to the wealthy and clergy\" primarily to",
    options: [
      { letter: "A", text: "contrast the accessibility of knowledge before and after the invention of the printing press." },
      { letter: "B", text: "provide historical context for the cultural advancements of the Renaissance." },
      { letter: "C", text: "illustrate the technical challenges of book production in the pre-printing era." },
      { letter: "D", text: "emphasize the role of the clergy in preserving knowledge during the Renaissance." }
    ],
    correctAnswer: "A",
    explanation: "The sentence contrasts the limited availability of books before the printing press with the increased accessibility after its invention.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng207",
    question: "The study of epigenetics has revealed that environmental factors can influence gene expression without altering the DNA sequence itself. For example, exposure to certain chemicals can lead to changes in DNA methylation patterns, which may be heritable across generations. This finding has implications for understanding how lifestyle and environmental exposures contribute to disease risk.\n\nWhich choice provides the best evidence for the claim that epigenetic changes may be heritable?",
    options: [
      { letter: "A", text: "Exposure to certain chemicals can lead to changes in DNA methylation patterns." },
      { letter: "B", text: "The study of epigenetics has revealed that environmental factors can influence gene expression." },
      { letter: "C", text: "Changes in DNA methylation patterns may be heritable across generations." },
      { letter: "D", text: "Lifestyle and environmental exposures contribute to disease risk." }
    ],
    correctAnswer: "C",
    explanation: "Choice C directly states that changes in DNA methylation patterns may be heritable across generations, providing direct evidence for the claim.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng208",
    question: "In behavioral economics, the endowment effect refers to the tendency for people to value an object more highly once they have been given ownership of it. This phenomenon is often demonstrated in experiments where participants are randomly assigned ownership of a mug and then asked to trade it for a different item of equal market value. Despite the equal value, most participants refuse to trade, suggesting that ownership increases perceived value.\n\nThe main purpose of the underlined sentence (\"This phenomenon is often demonstrated...\") is to",
    options: [
      { letter: "A", text: "provide an example of the endowment effect in action." },
      { letter: "B", text: "describe the methodology used in behavioral economics experiments." },
      { letter: "C", text: "explain why the endowment effect occurs in real-world settings." },
      { letter: "D", text: "contrast the endowment effect with other behavioral biases." }
    ],
    correctAnswer: "A",
    explanation: "The sentence gives a specific experimental example (the mug experiment) to illustrate how the endowment effect manifests.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng209",
    question: "A researcher claims that the decline in bee populations is primarily due to the use of neonicotinoid pesticides. To test this claim, scientists conducted an experiment in which one group of bees was exposed to neonicotinoids while a control group was not. After several weeks, the exposed group showed significantly higher mortality rates. However, critics argue that the laboratory conditions did not accurately reflect real-world exposure levels.\n\nWhich choice best describes a limitation of the experiment as described?",
    options: [
      { letter: "A", text: "The study failed to include a control group of bees." },
      { letter: "B", text: "The exposure levels in the lab may not match those found in natural environments." },
      { letter: "C", text: "The experiment only measured mortality and not other effects on bee behavior." },
      { letter: "D", text: "The researchers did not account for genetic differences among the bees." }
    ],
    correctAnswer: "B",
    explanation: "The critics specifically point out that laboratory conditions did not accurately reflect real-world exposure levels, which is the limitation described.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng210",
    question: "The concept of \"keystone species\" refers to organisms that have a disproportionately large effect on their environment relative to their abundance. Removing a keystone species can cause dramatic shifts in ecosystem structure. For example, sea otters in kelp forests control sea urchin populations; without otters, urchins overgraze kelp and collapse the entire ecosystem.\n\nThe main purpose of the example about sea otters is to",
    options: [
      { letter: "A", text: "illustrate the definition of a keystone species." },
      { letter: "B", text: "compare sea otters with other marine predators." },
      { letter: "C", text: "explain how kelp forests depend on sea urchins." },
      { letter: "D", text: "argue that all predators are keystone species." }
    ],
    correctAnswer: "A",
    explanation: "The sea otter example directly illustrates how one species can have an outsized impact on its ecosystem, demonstrating the definition of keystone species.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng211",
    question: "In 2019, archaeologists discovered a 3,000-year-old wooden coffin in Egypt that still contained its original paint. The vivid colors surprised researchers because organic pigments usually fade over millennia. Analysis revealed that the paint contained Egyptian blue—one of the first synthetic pigments—mixed with a natural resin that protected it from degradation.\n\nWhich choice best states the function of the underlined portion in the text as a whole?",
    options: [
      { letter: "A", text: "It identifies the reason the paint remained vivid." },
      { letter: "B", text: "It describes the chemical composition of Egyptian blue." },
      { letter: "C", text: "It explains why archaeologists were surprised." },
      { letter: "D", text: "It provides evidence that the coffin was recently made." }
    ],
    correctAnswer: "A",
    explanation: "The underlined portion ('mixed with a natural resin that protected it from degradation') directly explains why the organic pigments did not fade.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng212",
    question: "While researching a paper, Mei came across the following two sentences in different sources: Source 1: \"The Industrial Revolution began in Britain in the late 18th century.\" Source 2: \"The Industrial Revolution, which transformed economies worldwide, is generally said to have started in Britain around 1760.\"\n\nWhich choice best describes how Source 2 relates to Source 1?",
    options: [
      { letter: "A", text: "Source 2 contradicts Source 1 by giving an earlier starting date." },
      { letter: "B", text: "Source 2 plagiarizes Source 1." },
      { letter: "C", text: "Source 2 provides additional detail about the same claim made in Source 1." },
      { letter: "D", text: "Source 2 challenges the importance of Britain in the Industrial Revolution." }
    ],
    correctAnswer: "C",
    explanation: "Both sources make essentially the same claim. Source 2 adds more descriptive detail and a slightly more precise date ('around 1760').",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng213",
    question: "The author of a history textbook writes: \"Many historians now argue that the fall of Rome was not a single catastrophic event but a gradual process that unfolded over centuries.\"\n\nThe author most likely uses quotation marks around \"fall of Rome\" to",
    options: [
      { letter: "A", text: "indicate that the phrase is being quoted from another source." },
      { letter: "B", text: "suggest that the phrase is controversial or oversimplified." },
      { letter: "C", text: "emphasize that Rome's military defeat." },
      { letter: "D", text: "show that the event never actually happened." }
    ],
    correctAnswer: "B",
    explanation: "The quotation marks signal that 'fall of Rome' is a traditional phrase that many historians now consider oversimplified, preferring to see it as a long, complex process.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng214",
    question: "Some economists believe that universal basic income (UBI) could reduce poverty and inequality. Others worry that it would discourage people from working.\n\nThe text is primarily concerned with",
    options: [
      { letter: "A", text: "explaining how universal basic income would be funded." },
      { letter: "B", text: "describing opposing views on the effects of universal basic income." },
      { letter: "C", text: "proving that universal basic income has already reduced poverty in some countries." },
      { letter: "D", text: "arguing that concerns about work disincentives are unfounded." }
    ],
    correctAnswer: "B",
    explanation: "The text presents two contrasting economic viewpoints on UBI without taking a side, simply describing the debate.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng215",
    question: "A study found that students who took notes by hand remembered conceptual information better than students who typed notes on laptops. The researchers suggest this is because handwriting forces deeper cognitive processing.\n\nWhich choice best describes the function of the second sentence in the text?",
    options: [
      { letter: "A", text: "It offers an explanation for the finding reported in the first sentence." },
      { letter: "B", text: "It provides an alternative interpretation of the study's results." },
      { letter: "C", text: "It contradicts the first sentence." },
      { letter: "D", text: "It gives an example of deeper cognitive processing." }
    ],
    correctAnswer: "A",
    explanation: "The second sentence ('The researchers suggest...') directly explains why hand-written notes led to better recall—it offers the researchers' causal interpretation.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng216",
    question: "The following text is adapted from Jane Austen's 1813 novel Pride and Prejudice.\n\n\"Elizabeth listened with increasing astonishment as Mr. Darcy continued his speech.\"\n\nWhich choice completes the text the meaning of the original Austen text?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "astonishment as Mr. Darcy" },
      { letter: "C", text: "astonishment; as Mr. Darcy" },
      { letter: "D", text: "astonishment: as Mr. Darcy" }
    ],
    correctAnswer: "B",
    explanation: "The phrase 'with increasing astonishment as Mr. Darcy continued his speech' is a prepositional phrase modifying how Elizabeth listened, so no punctuation is needed between 'astonishment' and 'as.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng217",
    question: "The author of a review writes: \"Although the film's special effects are impressive, its characters remain disappointingly one-dimensional.\"\n\nThe author's use of the word \"although\" signals that the author is",
    options: [
      { letter: "A", text: "conceding a strength while emphasizing a weakness." },
      { letter: "B", text: "comparing the film to other films with better characters." },
      { letter: "C", text: "admitting that the special effects are the only positive aspect." },
      { letter: "D", text: "suggesting the film would have been better without special effects." }
    ],
    correctAnswer: "A",
    explanation: "'Although' introduces a concession—the author acknowledges that the special effects are impressive but still argues that the characters are weak.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng218",
    question: "Researchers have found that people who regularly engage in aerobic exercise show improved cognitive function in old age. The same researchers note that aerobic exercise increases blood flow to the brain.\n\nWhich choice best explains how the second sentence functions in relation to the first?",
    options: [
      { letter: "A", text: "It provides a possible mechanism for the benefit described in the first sentence." },
      { letter: "B", text: "It offers an alternative explanation that contradicts the first sentence." },
      { letter: "C", text: "It gives an example of a type of aerobic exercise." },
      { letter: "D", text: "It weakens the claim made in the first sentence." }
    ],
    correctAnswer: "A",
    explanation: "Increased blood flow to the brain is presented as a potential biological reason why aerobic exercise improves cognitive function later in life.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng219",
    question: "The following text is from Charlotte Brontë's 1847 novel Jane Eyre.\n\n\"I am no bird; and no net ensnares me: I am a free human being with an independent will.\"\n\nWhich choice completes the text with the most logical and precise word or phrase?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "therefore" },
      { letter: "C", text: "however" },
      { letter: "D", text: "in fact" }
    ],
    correctAnswer: "A",
    explanation: "The semicolon correctly joins two independent clauses that reinforce each other: the first denies being trapped, and the second asserts freedom and independence.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng220",
    question: "A student is writing a research paper and wants to use the following information from a book:\n\nOriginal source: \"Climate change is the most urgent threat facing humanity today, and immediate action is required to prevent irreversible damage.\"\n\nThe student writes: Climate change is the most urgent threat facing humanity today.\n\nWhich choice shows the correct way to cite this information?",
    options: [
      { letter: "A", text: "(Climate change is the most urgent threat...)" },
      { letter: "B", text: "\"Climate change is the most urgent threat facing humanity today\" (Source)." },
      { letter: "C", text: "Climate change is the most urgent threat facing humanity today (Source)." },
      { letter: "D", text: "According to the source, climate change is the most urgent threat facing humanity today." }
    ],
    correctAnswer: "C",
    explanation: "When paraphrasing or directly quoting, the student must still cite the source. Choice C correctly paraphrases and gives credit without quotation marks.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng221",
    question: "Many people believe that creativity declines with age, but research shows that some of history's greatest artists, writers, and scientists produced their best work later in life.\n\nWhich choice completes the text so that it conforms to the conventions of standard English?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "research shows that," },
      { letter: "C", text: "research shows, that" },
      { letter: "D", text: "research shows --- that" }
    ],
    correctAnswer: "B",
    explanation: "A comma after 'shows' correctly sets off the clause that follows in this construction.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng222",
    question: "The city council voted to preserve the historic building rather than allow its demolition.\n\nThe writer wants to emphasize the contrast between the two options. Which choice best accomplishes this goal?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "instead of allowing" },
      { letter: "C", text: "as opposed to allowing" },
      { letter: "D", text: "in place of allowing" }
    ],
    correctAnswer: "A",
    explanation: "'Rather than' is the most concise and idiomatic way to show a strong contrast between preserving and demolishing.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng223",
    question: "Scientists have long debated whether Pluto should be classified as a planet. In 2006 the International Astronomical Union redefined the definition of a planet, excluding Pluto.\n\nWhich choice completes the text with the most logical transition?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "Consequently," },
      { letter: "C", text: "For example," },
      { letter: "D", text: "In" }
    ],
    correctAnswer: "D",
    explanation: "'In 2006' is the only logical transition that indicates when the redefinition occurred.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng224",
    question: "The new policy requires all employees to complete training; failure to do so will result in disciplinary action.\n\nThe writer wants to combine the sentences to emphasize cause and effect. Which choice best accomplishes this goal?",
    options: [
      { letter: "A", text: "The new policy requires all employees to complete training, failure to do so will result in disciplinary action." },
      { letter: "B", text: "The new policy requires all employees to complete training; otherwise, they will face disciplinary action." },
      { letter: "C", text: "Because the new policy requires all employees to complete training, failure to do so will result in disciplinary action." },
      { letter: "D", text: "The new policy requires all employees to complete training, or else disciplinary action will be taken." }
    ],
    correctAnswer: "B",
    explanation: "'Otherwise' clearly and concisely signals the cause-and-effect relationship between not completing the training and facing consequences.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng225",
    question: "A new study suggests that eating breakfast every day is associated with better academic performance in teenagers. However, the researchers caution that this is a correlation, not proof of causation.\n\nThe second sentence primarily serves to",
    options: [
      { letter: "A", text: "weaken the claim made in the first sentence." },
      { letter: "B", text: "clarify the limitations of the study's conclusions." },
      { letter: "C", text: "provide additional evidence for the first sentence." },
      { letter: "D", text: "explain how the study was conducted." }
    ],
    correctAnswer: "B",
    explanation: "The word 'however' signals that the second sentence limits how strongly readers should interpret the association as cause-and-effect.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng226",
    question: "The following text is from F. Scott Fitzgerald's 1925 novel The Great Gatsby.\n\n\"Gatsby believed in the green light, the orgastic future that year by year recedes before us.\"\n\nWhich choice completes the text with the most logical and precise word?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "joyous" },
      { letter: "C", text: "ecstatic" },
      { letter: "D", text: "frenzied" }
    ],
    correctAnswer: "A",
    explanation: "Fitzgerald deliberately used the unusual word 'orgastic' (meaning intensely sensual and climactic) rather than the more common 'orgiastic.' The original word is correct.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng227",
    question: "Some psychologists argue that birth order affects personality: firstborn children tend to be more responsible, while younger siblings are more rebellious.\n\nThe author is most likely assuming that",
    options: [
      { letter: "A", text: "parents treat children differently based on birth order." },
      { letter: "B", text: "personality is entirely determined at birth." },
      { letter: "C", text: "all families have the same number of children." },
      { letter: "D", text: "birth order has no real effect on personality." }
    ],
    correctAnswer: "A",
    explanation: "The argument only makes sense if parents (or the family environment) respond differently to children based on their birth order.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng228",
    question: "The city has seen a sharp increase in bicycle commuting over the past five years, a trend city officials attribute to new protected bike lanes and rising gas prices.\n\nWhich choice best supports the officials' explanation?",
    options: [
      { letter: "A", text: "Gas prices have fallen steadily over the past decade." },
      { letter: "B", text: "Many new bike lanes were completed between 2018 and 2022." },
      { letter: "C", text: "Most bicycle commuters are under 35 years old." },
      { letter: "D", text: "Public transit ridership has also increased." }
    ],
    correctAnswer: "B",
    explanation: "The completion of new bike lanes in the same period supports the claim that protected lanes contributed to the increase.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng229",
    question: "The author writes: \"Technology was supposed to give us more free time—instead, we are busier than ever.\"\n\nThe dash is primarily used to",
    options: [
      { letter: "A", text: "introduce an ironic or unexpected outcome." },
      { letter: "B", text: "indicate a change in speaker." },
      { letter: "C", text: "show a range of years." },
      { letter: "D", text: "separate items in a list." }
    ],
    correctAnswer: "A",
    explanation: "The dash sets up the ironic contrast between the promise of technology (more free time) and the reality (busier than ever).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng230",
    question: "The following text is adapted from Herman Melville's 1851 novel Moby-Dick.\n\n\"Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.\"\n\nWhich choice best describes the function of the dashes in this passage?",
    options: [
      { letter: "A", text: "They set off an aside that downplays the importance of the exact timeframe." },
      { letter: "B", text: "They indicate a gap in the narrator's memory." },
      { letter: "C", text: "They emphasize the precision of the narrator's recollection." },
      { letter: "D", text: "They separate two contrasting ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dashes enclose a casual dismissal ('never mind how long precisely'), suggesting the exact timing is unimportant to the story.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng231",
    question: "A recent study found that children who learn a second language before age 7 show enhanced problem-solving skills compared to monolingual peers.\n\nWhich choice would most directly strengthen the causal claim implied in this finding?",
    options: [
      { letter: "A", text: "The bilingual children came from wealthier families." },
      { letter: "B", text: "The two groups were matched for socioeconomic status and parental education level." },
      { letter: "C", text: "Problem-solving skills were measured using a standardized test." },
      { letter: "D", text: "Some bilingual children started learning their second language at age 5." }
    ],
    correctAnswer: "B",
    explanation: "Matching the groups on other variables (socioeconomic status, parental education) makes it more likely that bilingualism itself caused the difference.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng232",
    question: "The author writes: \"Sleep deprivation affects not only physical health but also cognitive performance.\"\n\nThe phrase \"not only...but also\" primarily serves to",
    options: [
      { letter: "A", text: "emphasize that sleep deprivation has multiple negative effects." },
      { letter: "B", text: "contrast physical health with cognitive performance." },
      { letter: "C", text: "suggest that cognitive effects are more important than physical ones." },
      { letter: "D", text: "indicate that the effects are unexpected." }
    ],
    correctAnswer: "A",
    explanation: "The correlative conjunction 'not only...but also' emphasizes that sleep deprivation affects both areas, highlighting the breadth of its impact.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng233",
    question: "The museum's new wing features interactive exhibits designed to engage younger visitors; traditional galleries remain available for those who prefer a more contemplative experience.\n\nThe semicolon is used correctly because",
    options: [
      { letter: "A", text: "both clauses are independent and closely related in content." },
      { letter: "B", text: "the second clause provides an example of the first." },
      { letter: "C", text: "a list of items follows the semicolon." },
      { letter: "D", text: "the two clauses express contradictory ideas." }
    ],
    correctAnswer: "A",
    explanation: "Both parts are complete sentences discussing the museum's offerings for different visitor preferences, making them closely related independent clauses.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng234",
    question: "The ancient city of Pompeii was buried under volcanic ash in 79 CE. Today, archaeologists continue to uncover remarkably preserved artifacts, including food, furniture, and even human remains.\n\nWhich choice best describes the relationship between the two sentences?",
    options: [
      { letter: "A", text: "The second sentence explains why the first event occurred." },
      { letter: "B", text: "The second sentence describes the ongoing consequences of the first event." },
      { letter: "C", text: "The second sentence contradicts the first." },
      { letter: "D", text: "The second sentence provides historical context for the first." }
    ],
    correctAnswer: "B",
    explanation: "The first sentence describes the burial; the second describes how archaeologists today are still finding preserved items as a result of that burial.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng235",
    question: "The company decided to relocate its headquarters to a smaller city, citing lower operating costs and better quality of life for employees.\n\nThe underlined portion (\"citing lower operating costs and better quality of life for employees\") primarily serves to",
    options: [
      { letter: "A", text: "provide the company's reasons for the decision." },
      { letter: "B", text: "contrast the old and new headquarters locations." },
      { letter: "C", text: "describe the employees' reactions to the move." },
      { letter: "D", text: "explain how the decision was made." }
    ],
    correctAnswer: "A",
    explanation: "The participial phrase 'citing...' introduces the reasons (lower costs, better quality of life) the company gave for its relocation decision.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng236",
    question: "The author writes: \"Education is not the filling of a pail, but the lighting of a fire.\"\n\nThis statement uses figurative language primarily to",
    options: [
      { letter: "A", text: "contrast passive reception of information with active intellectual engagement." },
      { letter: "B", text: "argue that traditional education methods are dangerous." },
      { letter: "C", text: "suggest that education requires physical materials." },
      { letter: "D", text: "emphasize the importance of water safety in schools." }
    ],
    correctAnswer: "A",
    explanation: "The metaphors contrast 'filling a pail' (passive, mechanical) with 'lighting a fire' (active, inspiring), suggesting education should inspire rather than just transmit information.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng237",
    question: "The new restaurant has received mixed reviews; critics praise the innovative menu but note that service can be inconsistent.\n\nWhich choice best describes the function of the semicolon in this sentence?",
    options: [
      { letter: "A", text: "It joins two independent clauses that elaborate on the same topic." },
      { letter: "B", text: "It introduces a list of items." },
      { letter: "C", text: "It separates two contradictory claims." },
      { letter: "D", text: "It indicates a pause for dramatic effect." }
    ],
    correctAnswer: "A",
    explanation: "The semicolon correctly joins two complete sentences: the first states that reviews are mixed, and the second provides specific details about the praise and criticism.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng238",
    question: "Researchers found that plants exposed to classical music grew taller than those in silence. However, when the experiment was repeated with rock music, no difference was observed.\n\nThe second sentence primarily serves to",
    options: [
      { letter: "A", text: "suggest that the type of music matters for plant growth." },
      { letter: "B", text: "prove that rock music is harmful to plants." },
      { letter: "C", text: "explain why classical music affects plant growth." },
      { letter: "D", text: "contradict the findings of the first experiment." }
    ],
    correctAnswer: "A",
    explanation: "The contrasting results between classical and rock music suggest that not all music has the same effect—the type of music matters.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng239",
    question: "The author writes: \"History doesn't repeat itself, but it often rhymes.\"\n\nThis statement most likely means that",
    options: [
      { letter: "A", text: "historical events don't recur exactly but follow similar patterns." },
      { letter: "B", text: "historians should write in verse rather than prose." },
      { letter: "C", text: "the past has no relevance to the present." },
      { letter: "D", text: "all historical accounts are fictional." }
    ],
    correctAnswer: "A",
    explanation: "The metaphor of 'rhyming' suggests that while history doesn't repeat exactly, similar patterns and themes recur.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng240",
    question: "The city council approved funding for a new park; opponents argued that the money should have been spent on road repairs.\n\nWhich choice best describes the relationship between the two clauses?",
    options: [
      { letter: "A", text: "The second clause presents an opposing viewpoint to the action described in the first." },
      { letter: "B", text: "The second clause explains the reasoning behind the first." },
      { letter: "C", text: "The second clause provides evidence supporting the first." },
      { letter: "D", text: "The second clause describes the outcome of the first." }
    ],
    correctAnswer: "A",
    explanation: "The first clause describes the approval of park funding; the second presents the opposing argument that the money should have gone elsewhere.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng241",
    question: "The author writes: \"The only thing we have to fear is fear itself.\"\n\nThis famous statement is an example of",
    options: [
      { letter: "A", text: "paradox—using apparent contradiction to convey a deeper truth." },
      { letter: "B", text: "hyperbole—exaggerating for effect." },
      { letter: "C", text: "understatement—downplaying the significance of something." },
      { letter: "D", text: "simile—comparing two things using 'like' or 'as.'" }
    ],
    correctAnswer: "A",
    explanation: "The statement is paradoxical: it suggests that fear itself is the greatest threat, implying that most fears are unfounded or that the emotion is more dangerous than what we fear.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng242",
    question: "Scientists have discovered that octopuses can solve puzzles, use tools, and recognize individual humans—abilities previously thought to be limited to mammals and birds.\n\nThe dash in this sentence is used to",
    options: [
      { letter: "A", text: "introduce additional information that clarifies the significance of the preceding list." },
      { letter: "B", text: "indicate a sudden break in thought." },
      { letter: "C", text: "separate items in a complex list." },
      { letter: "D", text: "show a range of abilities." }
    ],
    correctAnswer: "A",
    explanation: "The dash introduces an explanatory phrase that emphasizes why the octopus abilities are remarkable—they were thought to be limited to other animals.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng243",
    question: "The following text is adapted from George Orwell's 1945 novel Animal Farm.\n\n\"All animals are equal, but some animals are more equal than others.\"\n\nThis statement is an example of",
    options: [
      { letter: "A", text: "irony—the contradiction exposes hypocrisy." },
      { letter: "B", text: "metaphor—comparing animals to humans." },
      { letter: "C", text: "alliteration—repetition of consonant sounds." },
      { letter: "D", text: "personification—giving human qualities to animals." }
    ],
    correctAnswer: "A",
    explanation: "The statement is ironic because 'more equal' is a logical contradiction that exposes how the pigs have corrupted the principle of equality.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng244",
    question: "The study found that participants who meditated for 10 minutes daily reported lower stress levels. Importantly, the researchers also measured cortisol levels, which confirmed the self-reported data.\n\nThe second sentence primarily serves to",
    options: [
      { letter: "A", text: "provide objective biological evidence supporting the subjective reports." },
      { letter: "B", text: "explain how meditation reduces stress." },
      { letter: "C", text: "suggest that self-reports are unreliable." },
      { letter: "D", text: "describe the meditation techniques used in the study." }
    ],
    correctAnswer: "A",
    explanation: "By measuring cortisol (a biological stress marker), the researchers provided objective data that confirmed what participants reported subjectively.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng245",
    question: "The author writes: \"In the age of information, ignorance is a choice.\"\n\nThis statement most directly implies that",
    options: [
      { letter: "A", text: "people today have access to enough information that being uninformed is usually deliberate." },
      { letter: "B", text: "information technology has made people less intelligent." },
      { letter: "C", text: "ignorance was more excusable in the past." },
      { letter: "D", text: "choosing to be informed is always easy." }
    ],
    correctAnswer: "A",
    explanation: "The statement suggests that with so much information available today, remaining ignorant is typically a deliberate choice rather than an unavoidable circumstance.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng246",
    question: "The new highway reduced commute times for suburban residents; however, it also led to increased noise pollution in nearby neighborhoods.\n\nThe word \"however\" signals",
    options: [
      { letter: "A", text: "a contrast between a benefit and a drawback of the same project." },
      { letter: "B", text: "a cause-and-effect relationship." },
      { letter: "C", text: "a sequence of events." },
      { letter: "D", text: "an additional benefit of the highway." }
    ],
    correctAnswer: "A",
    explanation: "'However' introduces a contrasting negative consequence (noise pollution) to the positive effect (reduced commute times) mentioned in the first clause.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng247",
    question: "The author writes: \"Success is not final, failure is not fatal: it is the courage to continue that counts.\"\n\nThe colon in this sentence is used to",
    options: [
      { letter: "A", text: "introduce the main point that follows from the two preceding statements." },
      { letter: "B", text: "separate items in a list." },
      { letter: "C", text: "indicate a time." },
      { letter: "D", text: "introduce a direct quotation." }
    ],
    correctAnswer: "A",
    explanation: "The colon introduces the central message—that continuing despite success or failure is what matters—which follows logically from the first two statements.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng248",
    question: "Researchers studying sleep patterns found that teenagers who used electronic devices before bed took longer to fall asleep than those who read print books.\n\nWhich finding, if true, would most strengthen the implication that screen use itself caused the delay?",
    options: [
      { letter: "A", text: "The two groups had similar sleep schedules on weekends." },
      { letter: "B", text: "Teenagers who used devices with blue-light filters showed results similar to the print-book group." },
      { letter: "C", text: "All participants were between 14 and 17 years old." },
      { letter: "D", text: "The study was conducted over three months." }
    ],
    correctAnswer: "B",
    explanation: "If filtering out blue light (a known feature of screens) eliminated the difference, this supports the idea that screen-specific factors cause the sleep delay.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng249",
    question: "The author writes: \"The pen is mightier than the sword.\"\n\nThis statement uses figurative language to suggest that",
    options: [
      { letter: "A", text: "written words and ideas can be more powerful than physical force." },
      { letter: "B", text: "writing instruments are literally stronger than weapons." },
      { letter: "C", text: "swords are obsolete in modern warfare." },
      { letter: "D", text: "journalists are more important than soldiers." }
    ],
    correctAnswer: "A",
    explanation: "The metaphor compares the pen (representing writing, ideas, communication) with the sword (representing violence, military force), arguing that ideas are ultimately more powerful.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng250",
    question: "The archaeological dig uncovered pottery shards, bronze tools, and—most significantly—a collection of written tablets that could revolutionize our understanding of the ancient civilization.\n\nThe dashes in this sentence are used to",
    options: [
      { letter: "A", text: "set off an aside that emphasizes the most important item in the list." },
      { letter: "B", text: "indicate missing information." },
      { letter: "C", text: "show a range of dates." },
      { letter: "D", text: "separate independent clauses." }
    ],
    correctAnswer: "A",
    explanation: "The dashes enclose 'most significantly,' which emphasizes that the tablets are the most important discovery among those listed.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng251",
    question: "Many people claim that money can't buy happiness—but research shows that up to a certain income level, more money does correlate with greater life satisfaction.\n\nThe dash primarily serves to",
    options: [
      { letter: "A", text: "acknowledge a common belief before presenting evidence that partially challenges it." },
      { letter: "B", text: "indicate a sudden break in thought." },
      { letter: "C", text: "show that the research completely disproves the claim." },
      { letter: "D", text: "introduce examples of how money is spent." }
    ],
    correctAnswer: "A",
    explanation: "The dash concedes the popular saying while qualifying it with research that shows money does matter up to a point.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng252",
    question: "The headline read: \"Breakthrough in Cancer Research!\" The article itself was far more cautious, stating only that early trials showed \"promising signs.\"\n\nThe author most likely juxtaposes the headline and the article to",
    options: [
      { letter: "A", text: "highlight the difference between sensational reporting and scientific reality." },
      { letter: "B", text: "argue that headlines should always match the tone of the article." },
      { letter: "C", text: "prove that the research was not actually promising." },
      { letter: "D", text: "show that journalists are better at science than researchers." }
    ],
    correctAnswer: "A",
    explanation: "The extreme contrast between the dramatic headline and the careful wording of the article illustrates how media often overstates scientific findings.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng253",
    question: "The following text is adapted from Virginia Woolf's 1925 novel Mrs. Dalloway.\n\n\"She had a perpetual sense, as she watched the taxi cabs, of being out, out, far out to sea and alone.\"\n\nWhich choice completes the text with the most logical punctuation?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "cabs; of being" },
      { letter: "C", text: "cabs — of being" },
      { letter: "D", text: "cabs: of being" }
    ],
    correctAnswer: "A",
    explanation: "No punctuation is needed between 'cabs' and 'of being'; the prepositional phrase flows naturally.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng254",
    question: "Many experts predicted that streaming services would kill movie theaters. Instead, theaters have seen record attendance in several recent years.\n\nThe word \"instead\" signals",
    options: [
      { letter: "A", text: "a result that contradicts the prediction." },
      { letter: "B", text: "the passage of time." },
      { letter: "C", text: "an additional supporting example." },
      { letter: "D", text: "a cause-and-effect relationship." }
    ],
    correctAnswer: "A",
    explanation: "'Instead' introduces the opposite of what was expected—record attendance rather than decline.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng255",
    question: "A study found that people who walk at least 30 minutes a day have a lower risk of heart disease. The researchers controlled for age, diet, and smoking status.\n\nThe second sentence primarily serves to",
    options: [
      { letter: "A", text: "strengthen the claim that walking itself reduces risk." },
      { letter: "B", text: "explain how walking prevents heart disease." },
      { letter: "C", text: "list additional benefits of walking." },
      { letter: "D", text: "describe the participants in the study." }
    ],
    correctAnswer: "A",
    explanation: "Controlling for other major risk factors makes it more likely that walking is the real protective factor.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng256",
    question: "The author writes: \"We are drowning in information—but starving for knowledge.\"\n\nThe dash is used to",
    options: [
      { letter: "A", text: "set up a strong contrast between two related ideas." },
      { letter: "B", text: "indicate missing text." },
      { letter: "C", text: "show a range." },
      { letter: "D", text: "separate independent clauses." }
    ],
    correctAnswer: "A",
    explanation: "The dash dramatically contrasts quantity (information) with quality (knowledge).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng257",
    question: "Critics argue that social media algorithms create echo chambers. Supporters counter that users ultimately choose what content they see.\n\nThe text is primarily concerned with",
    options: [
      { letter: "A", text: "presenting two opposing views on the effects of social media algorithms." },
      { letter: "B", text: "proving that echo chambers do not exist." },
      { letter: "C", text: "explaining how social media algorithms work." },
      { letter: "D", text: "arguing that users should have less control over their feeds." }
    ],
    correctAnswer: "A",
    explanation: "The passage neutrally presents the debate without taking sides.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng258",
    question: "The new museum wing—designed by a famous architect—opened to rave reviews.\n\nThe dashes primarily function to",
    options: [
      { letter: "A", text: "set off additional, nonessential information about the wing." },
      { letter: "B", text: "indicate a sudden change in thought." },
      { letter: "C", text: "show that the reviews were mixed." },
      { letter: "D", text: "emphasize the cost of the project." }
    ],
    correctAnswer: "A",
    explanation: "The fact that it was designed by a famous architect is extra detail that can be removed without hurting the main sentence.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng259",
    question: "Some researchers claim that power posing increases confidence and testosterone levels. Later studies failed to replicate these effects.\n\nWhich choice best describes the role of the second sentence?",
    options: [
      { letter: "A", text: "It casts doubt on the original findings." },
      { letter: "B", text: "It provides a biological explanation for power posing." },
      { letter: "C", text: "It confirms the original findings with stronger evidence." },
      { letter: "D", text: "It describes a new version of the power-posing experiment." }
    ],
    correctAnswer: "A",
    explanation: "Failure to replicate is one of the strongest ways science shows an earlier result may be unreliable.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng260",
    question: "The author writes: \"Artificial intelligence is advancing rapidly—but ethical concerns are advancing even faster.\"\n\nThe dash primarily serves to",
    options: [
      { letter: "A", text: "set up a contrast between technological progress and growing worries." },
      { letter: "B", text: "indicate missing information." },
      { letter: "C", text: "show that AI development has stopped." },
      { letter: "D", text: "separate two unrelated ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dash highlights the irony: the faster AI improves, the faster ethical fears grow.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng261",
    question: "The following text is adapted from Charlotte Perkins Gilman's 1892 short story \"The Yellow Wallpaper.\"\n\n\"I don't like to look out of the windows even—there are so many of those creeping women, and they creep so fast.\"\n\nWhich choice completes the text with the most logical punctuation?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "even; there" },
      { letter: "C", text: "even: there" },
      { letter: "D", text: "even, there" }
    ],
    correctAnswer: "A",
    explanation: "The dash acts as an emphatic break, showing the narrator's sudden, disturbed realization.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng262",
    question: "Many people assume that money buys happiness, yet studies consistently show that after basic needs are met, additional wealth adds little to well-being.\n\nThe word \"yet\" signals",
    options: [
      { letter: "A", text: "a contrast between popular belief and research findings." },
      { letter: "B", text: "the passage of time." },
      { letter: "C", text: "a cause-and-effect relationship." },
      { letter: "D", text: "an additional example." }
    ],
    correctAnswer: "A",
    explanation: "'Yet' introduces evidence that contradicts the common assumption.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng263",
    question: "A recent study found that children who grow up bilingual show greater cognitive flexibility than monolingual children.\n\nWhich choice would most directly support the idea that bilingualism itself causes this benefit?",
    options: [
      { letter: "A", text: "The bilingual children came from higher-income families." },
      { letter: "B", text: "The two groups were matched for age, IQ, and socioeconomic status." },
      { letter: "C", text: "Some bilingual children learned their second language after age 10." },
      { letter: "D", text: "Cognitive flexibility was measured only once." }
    ],
    correctAnswer: "B",
    explanation: "Matching the groups on other variables makes it more likely that bilingualism is the real cause.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng264",
    question: "The new exhibition features photographs taken during the Civil Rights Movement—powerful images that still resonate today.\n\nThe dashes are used to",
    options: [
      { letter: "A", text: "set off an appositive that describes the photographs." },
      { letter: "B", text: "indicate a sudden change in topic." },
      { letter: "C", text: "show that the images are controversial." },
      { letter: "D", text: "separate two contrasting ideas." }
    ],
    correctAnswer: "A",
    explanation: "'Powerful images that still resonate today' is a non-essential description of the photographs.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng265",
    question: "Critics praised the novel's lyrical prose; readers loved its gripping plot.\n\nThe semicolon is most appropriate because",
    options: [
      { letter: "A", text: "both clauses are independent and closely related." },
      { letter: "B", text: "the second clause explains the first." },
      { letter: "C", text: "a list follows the semicolon." },
      { letter: "D", text: "the two clauses contradict each other." }
    ],
    correctAnswer: "A",
    explanation: "Two complete, related thoughts about the same novel are correctly joined by a semicolon.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng266",
    question: "The author writes: \"Climate change is the defining issue of our time—and we are running out of time to address it.\"\n\nThe dash and \"and\" together",
    options: [
      { letter: "A", text: "emphasize the urgency of the situation." },
      { letter: "B", text: "indicate that the second clause is less important." },
      { letter: "C", text: "show that climate change is not really urgent." },
      { letter: "D", text: "separate two unrelated claims." }
    ],
    correctAnswer: "A",
    explanation: "The dash + 'and' creates dramatic buildup to stress how little time remains.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng267",
    question: "Some psychologists believe that \"grit\"—perseverance and passion for long-term goals—predicts success better than IQ.\n\nThe dashes primarily function to",
    options: [
      { letter: "A", text: "define the term \"grit\" for the reader." },
      { letter: "B", text: "contrast grit with IQ." },
      { letter: "C", text: "indicate that grit is controversial." },
      { letter: "D", text: "show that the definition is incomplete." }
    ],
    correctAnswer: "A",
    explanation: "The dashes enclose a clear, concise definition of the psychological concept.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng268",
    question: "The alpaca was domesticated by Indigenous peoples in the Andes about 7,000 years ago. But which wild species did it descend from, the vicuña or guanaco? A research team led by Ruiwen Fan may have solved the mystery, concluding that the alpaca is the domesticated form of the vicuña but that the modern alpaca gets only 64 percent of its genetic material from its wild ancestor. The rest comes from the domesticated llama. The llama, meanwhile, gets 95.5 percent of its genetic material from its own wild ancestor, the guanaco, and the rest from the alpaca. The llama and alpaca apparently interbred widely for only a handful of generations between 400 and 600 years ago. Assuming that the findings of Fan's team are valid, it can be inferred that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "modern llama populations have a greater degree of genetic diversity, on average, than modern alpaca populations do." },
      { letter: "B", text: "the domestication process of the alpaca may have involved some introduction of genetic material from the llama." },
      { letter: "C", text: "the period of interbreeding resulted in a greater genetic difference between alpacas and their wild ancestors than between llamas and their wild ancestors." },
      { letter: "D", text: "if they were subjected to genetic testing, modern populations of guanacos and vicuñas would likely show traces of ancient interbreeding as well." }
    ],
    correctAnswer: "C",
    explanation: "The data shows alpacas get only 64% from wild ancestors while llamas get 95.5%, indicating interbreeding had greater impact on alpacas' genetic distance from wild ancestors.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng269",
    question: "Poetry in Classical Nahuatl, the language of the Aztec Empire, relies on difrasismo, or a parallel noun construction that conventionally operates as a single metaphor. For example, the common difrasismo in cuauhtli in ocelotl (literally, \"the eagle, the jaguar\") signifies \"warrior.\" The device's function is both formal—providing structure to lines of verse—and ritual: semantic relations among the two nouns and the concept they signify can be tenuous, such that difrasismos are often only intelligible according to the conceptual associations observed in Aztec ceremonial culture.\n\nWhich statement about the difrasismo in cuauhtli in ocelotl is most strongly supported by the text?",
    options: [
      { letter: "A", text: "Its metaphorical significance derives from the semantic equivalence of the two nouns constituting the difrasismo." },
      { letter: "B", text: "Its unintelligibility may cause its formal function within a line of verse to go unnoticed by present-day readers." },
      { letter: "C", text: "Its apparent obscurity can be resolved when considered in the proper cultural context." },
      { letter: "D", text: "Its frequency in Classical Nahuatl poetry confirms its intelligibility to the Aztec audience." }
    ],
    correctAnswer: "C",
    explanation: "The text indicates difrasismos become intelligible when understood through Aztec ceremonial culture, resolving their apparent obscurity.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng270",
    question: "In 2022, Crystal Reeck and colleagues studied whether the decision-making modes that guide consumers influence their choice between nonenvironmentally friendly standard electricity plans and environmentally friendly green plans that cap electricity usage. Study participants who self-reported using either an Affect Mode or Role Mode—which prioritize choices that have a stronger positive emotional or social impact, respectively—were more likely to select a green plan. Conversely, participants using a Calculation Mode—which aims to minimize both financial cost and personal inconvenience—were more likely to select a standard plan, even when the green option was cheaper. This finding suggests that participants using a Calculation Mode ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "were equally unlikely to factor the financial savings of the green plan into their decision-making as were participants using either the Affect or Role Modes." },
      { letter: "B", text: "may have been less strongly motivated to appear socially responsible with their choice of plan than they realized." },
      { letter: "C", text: "may have determined that the green plan imposed additional burdens on them that were not sufficiently offset by the potential financial savings." },
      { letter: "D", text: "were less likely to believe that the green plan was truly cost-effective than were participants using either the Affect or Role Modes." }
    ],
    correctAnswer: "C",
    explanation: "Calculation Mode minimizes cost AND inconvenience. Even when green was cheaper, they chose standard—suggesting the inconvenience (capped usage) outweighed savings.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng271",
    question: "The following text is from William Shakespeare's play The Tempest, first performed in 1611. Miranda has lived on an island with her father, Prospero, since she was three years old.\n\nMIRANDA: 'Tis far off, And rather like a dream than an assurance That my remembrance warrants. Had I not Four or five women once that tended me?\nPROSPERO: Thou hadst, and more, Miranda. But how is it That this lives in thy mind? What seest thou else In the dark backward and abysm of time? If thou remember'st ought ere thou camest here, How thou camest here thou mayst.\n\nWhich point does Prospero most directly make about Miranda and her memories?",
    options: [
      { letter: "A", text: "Miranda's reminiscences about her early childhood have a melancholy quality that betrays her discontented view of her current circumstances." },
      { letter: "B", text: "Miranda's doubts about the accuracy of one recollection are clouding her judgment and making her reluctant to explore her memory of traveling to the island." },
      { letter: "C", text: "Miranda's ability to summon details of an experience she had before arriving on the island suggests that she may also be able to summon details of her arrival." },
      { letter: "D", text: "Miranda's impression of a scene is vague because she is remembering a scenario she had daydreamed about rather than a scenario that had occurred in reality." }
    ],
    correctAnswer: "C",
    explanation: "Prospero confirms Miranda's memory and suggests that if she can recall events from before, she may also remember her arrival on the island.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Central Ideas"
  },
  {
    id: "eng272",
    question: "Gorgets, or necklaces with large pendants, have been part of the ceremonial attire of tribes from the US Southeast for centuries. One of the oldest examples, the Fairfield Gorget, was found in Fairfield, Missouri, in 1958. Its overall design resembles that of other art from the region during the Mississippian period (900–1600 CE). Yet the image on the gorget is of a jaguar—a species whose range doesn't extend to Missouri. Jaguar images are common in ancient Mexican art, and Mexico lies squarely in the species' range. Therefore, some scholars argue that long-distance trade in Mexican art objects brought the imagery to Missouri, where a local artist could have adopted it.\n\nWhich finding, if true, would most strongly support this explanation?",
    options: [
      { letter: "A", text: "The Fairfield Gorget is dated not to the Mississippian period but instead to the earlier Woodland period, which ended around 900 CE." },
      { letter: "B", text: "The range of the jaguar is shown to have expanded dramatically after the Mississippian period came to a close around 1600 CE." },
      { letter: "C", text: "An ancient Mexican art object is found at a site that dates to the Mississippian period and is close to where the Fairfield Gorget was found." },
      { letter: "D", text: "Certain works by present-day artists from Southeastern tribes reflect outside cultural influences, including contemporary Mexican art." }
    ],
    correctAnswer: "C",
    explanation: "Finding Mexican art from the same time period and location would directly support the theory that trade brought jaguar imagery to Missouri.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng273",
    question: "Art collectives are groups of artists who agree to work together. Based on a recent series of interviews with various art collectives, an arts journalist claims that collaboration can be difficult for artists who are often used to having sole control over their work.\n\nWhich quotation from the interviews best illustrates the journalist's claim?",
    options: [
      { letter: "A", text: "\"The first collective I joined included many amazingly talented artists, and we enjoyed each other's company, but because we had a hard time sharing credit and responsibility for our work, the collective didn't last.\"" },
      { letter: "B", text: "\"We work together, but that doesn't mean that individual projects are equally the work of all of us. Many of our projects are primarily the responsibility of whoever originally proposed the work to the group.\"" },
      { letter: "C", text: "\"Having worked as a member of a collective for several years, it's sometimes hard to recall what it was like to work alone. But that support encourages my individual expression rather than limits it.\"" },
      { letter: "D", text: "\"Sometimes an artist from outside the collective will choose to collaborate with us on a project, but all of those projects fit within the larger themes of the work the collective does on its own.\"" }
    ],
    correctAnswer: "A",
    explanation: "This quote directly illustrates the difficulty of sharing control—talented artists struggled with collaboration and the collective disbanded.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng274",
    question: "Aerogels are highly porous foams consisting mainly of tiny air pockets within a solidified gel. These lightweight materials are often applied to spacecraft and other equipment required to withstand extreme conditions, as they provide excellent insulation despite typically being brittle and eventually fracturing due to degradation from repeated exposure to high heat. Now, Xiangfeng Duan of UCLA and colleagues have developed an aerogel with uniquely flexible properties. Unlike earlier aerogels, Duan's team's material contracts rather than expands when heated and fully recovers after compressing to just 5% of its original volume, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "the aerogel's remarkable flexibility results from its higher proportion of air pockets to solidified gel as compared to other aerogels." },
      { letter: "B", text: "the aerogel's overall strength is greater than that of other insulators but its ability to withstand exposure to intense heat is lower." },
      { letter: "C", text: "the aerogel will be more effective as an insulator for uses that involve gradual temperature shifts than for those that involve rapid heat increases." },
      { letter: "D", text: "the aerogel will be less prone to the structural weakness that ultimately causes most other aerogels to break down with use." }
    ],
    correctAnswer: "D",
    explanation: "The new aerogel contracts and recovers instead of expanding and fracturing, suggesting it will be less prone to the breakdown that affects typical aerogels.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng275",
    question: "Among social animals that care for their young, such as chickens, macaque monkeys, and humans, newborns appear to show an innate attraction to faces and face-like stimuli. Elisabetta Versace and colleagues tested whether this trait also occurs in Testudo tortoises, which live alone and do not engage in parental care. They found that tortoise hatchlings showed a significant preference for a face-like image, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "face-like stimuli are likely perceived as harmless by newborns of social species but as threatening by newborns of solitary species." },
      { letter: "B", text: "researchers should not assume that an innate attraction to face-like stimuli is necessarily an adaptation related to social interaction or parental care." },
      { letter: "C", text: "researchers can assume that the attraction to face-like stimuli that is seen in social species is learned rather than innate." },
      { letter: "D", text: "newly hatched Testudo tortoises show a stronger preference for face-like stimuli than adult tortoises do." }
    ],
    correctAnswer: "B",
    explanation: "Since solitary tortoises without parental care also show attraction to face-like stimuli, this trait is not necessarily linked to social behavior or parenting.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng276",
    question: "Water flowing around an obstruction creates vortices of varying size; by detecting the vortices, fish can determine the size and position of the obstruction. Testing showed that for medium-sized vortices, fish with wide heads would be least able to distinguish between vortices and general turbulence. A second research team has hypothesized that in low-visibility conditions, wider-headed fish will be less likely than narrower-headed fish to detect obstructions.\n\nWhich finding, if true, would most directly support the second team's hypothesis?",
    options: [
      { letter: "A", text: "A study found that the bristlemouth, which has a relatively wide head, bumped into more than half of the obstructions in low-visibility conditions." },
      { letter: "B", text: "A study found that some specimens of dusky smooth-hound, which has a relatively narrow head, bumped into obstructions more often than other specimens of the same fish did." },
      { letter: "C", text: "A study found that the wider-headed bristlemouth bumped into obstructions more often than the narrower-headed dusky smooth-hound did in low-visibility conditions." },
      { letter: "D", text: "A study found that the narrower-headed dusky smooth-hound bumped into obstructions just as often as the wider-headed bristlemouth did." }
    ],
    correctAnswer: "C",
    explanation: "Direct comparison showing wider-headed fish bumped into obstructions more than narrower-headed fish supports the hypothesis about detection differences.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng277",
    question: "Birds of many species ingest foods containing carotenoids, pigmented molecules that are converted into feather coloration. Coloration tends to be especially saturated in male birds' feathers, and because carotenoids also confer health benefits, the deeply saturated colors generally serve as an honest signal of a bird's overall fitness. However, ornithologist Allison J. Shultz found that males in several tanager species use microstructures in their feathers to manipulate light, creating the appearance of deeper saturation without maintaining a carotenoid-rich diet. These findings suggest that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "individual male tanagers can engage in honest signaling without relying on carotenoid consumption." },
      { letter: "B", text: "feather microstructures may be less effective than deeply saturated feathers for signaling overall fitness." },
      { letter: "C", text: "scientists have yet to determine why tanagers have a preference for mates with colorful appearances." },
      { letter: "D", text: "a male tanager's appearance may function as a dishonest signal of the individual's overall fitness." }
    ],
    correctAnswer: "D",
    explanation: "If tanagers can appear highly saturated without eating carotenoids (which provide health benefits), their appearance may falsely signal fitness.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng278",
    question: "The following text is from Maggie Pogue Johnson's 1910 poem \"Poet of Our Race,\" addressing Paul Laurence Dunbar.\n\nThou, with stroke of mighty pen,\nHast told of joy and mirth,\nAnd read the hearts and souls of men\nAs cradled from their birth.\nThe language of the flowers,\nThou hast read them all,\nAnd e'en the little brook\nResponded to thy call.\n\nWhich choice best states the main purpose of the text?",
    options: [
      { letter: "A", text: "To praise a certain writer for being especially perceptive regarding people and nature" },
      { letter: "B", text: "To establish that a certain writer has read extensively about a variety of topics" },
      { letter: "C", text: "To call attention to a certain writer's careful and elaborately detailed writing process" },
      { letter: "D", text: "To recount fond memories of an afternoon spent in nature with a certain writer" }
    ],
    correctAnswer: "A",
    explanation: "The poem praises Dunbar for understanding people ('read the hearts and souls of men') and nature ('language of the flowers').",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Central Ideas"
  },
  {
    id: "eng279",
    question: "The city council passed the new zoning law unanimously—every member voted in favor.\n\nThe dash is primarily used to",
    options: [
      { letter: "A", text: "introduce an explanation or illustration of 'unanimously.'" },
      { letter: "B", text: "indicate a change in topic." },
      { letter: "C", text: "show that the vote was controversial." },
      { letter: "D", text: "separate two unrelated ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dash introduces the explanatory detail that defines what 'unanimously' means in this context.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng280",
    question: "The author writes: \"Climate change is not a future problem—it is happening now.\"\n\nThe dashes are used to",
    options: [
      { letter: "A", text: "set off an emphatic interruption." },
      { letter: "B", text: "indicate a change in tense." },
      { letter: "C", text: "show that the author is quoting someone else." },
      { letter: "D", text: "separate items in a list." }
    ],
    correctAnswer: "A",
    explanation: "The dashes dramatically emphasize the correction of the common misconception.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng281",
    question: "The discovery of a 3,200-year-old cheese in an Egyptian tomb made headlines in 2018. Chemical analysis confirmed it was made from a mixture of cow, sheep, and goat milk.\n\nWhich choice best describes the relationship between the two sentences?",
    options: [
      { letter: "A", text: "The second sentence provides evidence that supports a claim made in the first." },
      { letter: "B", text: "The second sentence explains how the cheese was preserved for 3,200 years." },
      { letter: "C", text: "The second sentence contradicts the idea that the cheese is the oldest ever found." },
      { letter: "D", text: "The second sentence describes the taste of the ancient cheese." }
    ],
    correctAnswer: "A",
    explanation: "The first sentence announces the discovery; the second provides scientific evidence (chemical analysis) backing up the age and authenticity.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng282",
    question: "Many people believe that electric cars are the future of transportation, yet sales still represent only a small fraction of the total auto market.\n\nThe word \"yet\" primarily signals",
    options: [
      { letter: "A", text: "a contrast between expectation and reality." },
      { letter: "B", text: "the passage of time." },
      { letter: "C", text: "a cause-and-effect relationship." },
      { letter: "D", text: "an additional supporting example." }
    ],
    correctAnswer: "A",
    explanation: "'Yet' introduces the surprising reality that contradicts the widespread belief stated in the first clause.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng283",
    question: "Archaeologists recently uncovered a Roman-era mosaic depicting sea creatures. The artwork's vivid colors remain largely intact despite being buried for nearly 2,000 years.\n\nThe second sentence primarily serves to",
    options: [
      { letter: "A", text: "emphasize the exceptional preservation of the mosaic." },
      { letter: "B", text: "explain how the mosaic was discovered." },
      { letter: "C", text: "describe the types of sea creatures shown." },
      { letter: "D", text: "argue that Roman artists were superior to modern ones." }
    ],
    correctAnswer: "A",
    explanation: "The mention of 'vivid colors...largely intact' after 2,000 years highlights how remarkably well-preserved the mosaic is.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng284",
    question: "Some historians argue that the printing press was the most important invention of the last millennium because it democratized knowledge.\n\nWhich choice, if true, would most directly support this claim?",
    options: [
      { letter: "A", text: "Literacy rates rose dramatically in Europe after 1500." },
      { letter: "B", text: "Johannes Gutenberg was a skilled goldsmith." },
      { letter: "C", text: "Books became more expensive after the printing press was invented." },
      { letter: "D", text: "The first printed Bible appeared in 1455." }
    ],
    correctAnswer: "A",
    explanation: "A sharp rise in literacy is strong evidence that knowledge became more widely accessible (democratized) after the printing press.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng285",
    question: "The author writes: \"Renewable energy sources—solar, wind, and hydroelectric—now account for over 20% of global electricity production.\"\n\nThe dashes are used to",
    options: [
      { letter: "A", text: "set off examples that clarify the term 'renewable energy sources.'" },
      { letter: "B", text: "indicate an abrupt change in thought." },
      { letter: "C", text: "show that the list is incomplete." },
      { letter: "D", text: "emphasize the surprising nature of the statistic." }
    ],
    correctAnswer: "A",
    explanation: "The dashes enclose specific examples of what the author means by 'renewable energy sources.'",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng286",
    question: "A new study claims that listening to music while studying improves concentration. However, other researchers have failed to replicate these results.\n\nThe second sentence primarily functions to",
    options: [
      { letter: "A", text: "cast doubt on the reliability of the new study's findings." },
      { letter: "B", text: "explain how the study was conducted." },
      { letter: "C", text: "provide additional evidence for the claim." },
      { letter: "D", text: "suggest that music type matters more than listening itself." }
    ],
    correctAnswer: "A",
    explanation: "Failure to replicate is a major red flag in science and directly challenges the original claim.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng287",
    question: "The city plans to convert an abandoned rail line into a park similar to the High Line in New York City.\n\nThe underlined portion could best be replaced with",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "in the same way as" },
      { letter: "C", text: "modeled after" },
      { letter: "D", text: "just as" }
    ],
    correctAnswer: "C",
    explanation: "'Modeled after' is the most precise and idiomatic phrase for indicating that one project is intentionally designed based on another.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng288",
    question: "Some birds migrate thousands of miles each year, yet they return to the exact same nesting site.\n\nThe word \"yet\" primarily serves to",
    options: [
      { letter: "A", text: "indicate surprise or contrast." },
      { letter: "B", text: "show the passage of time." },
      { letter: "C", text: "suggest a cause-and-effect relationship." },
      { letter: "D", text: "add an additional supporting detail." }
    ],
    correctAnswer: "A",
    explanation: "'Yet' highlights the impressive contrast between traveling huge distances and still finding the precise same spot.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng289",
    question: "The author writes: \"Social media promised to connect us—yet many users report feeling more isolated than ever.\"\n\nThe dash primarily serves to",
    options: [
      { letter: "A", text: "introduce an ironic or unexpected outcome." },
      { letter: "B", text: "indicate omitted text." },
      { letter: "C", text: "show a range of years." },
      { letter: "D", text: "separate two unrelated ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dash dramatically highlights the opposite of what was promised.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng290",
    question: "The following text is adapted from Edith Wharton's 1905 novel The House of Mirth.\n\n\"She was so evidently the victim of the civilization which had produced her, that the links of her bracelet seemed like manacles chaining her to her fate.\"\n\nWhich choice completes the text with the most logical and precise word or phrase?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "obviously" },
      { letter: "C", text: "clearly" },
      { letter: "D", text: "plainly" }
    ],
    correctAnswer: "A",
    explanation: "'Evidently' is the original and strongest word—it means the evidence is right there in front of you, fitting the strong metaphor of the bracelet as manacles.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng291",
    question: "The author writes: \"The internet was supposed to bring the world together—instead, it often drives us apart.\"\n\nThe dash is used to",
    options: [
      { letter: "A", text: "introduce a contrasting or ironic outcome." },
      { letter: "B", text: "indicate omitted text." },
      { letter: "C", text: "show a range of years." },
      { letter: "D", text: "separate two unrelated ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dash dramatically sets up the opposite of what was promised.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng292",
    question: "Researchers found that plants grown under red light grew taller than those grown under blue light.\n\nWhich choice would most directly strengthen the implication that red light causes increased height?",
    options: [
      { letter: "A", text: "The plants were all the same species and age." },
      { letter: "B", text: "The experiment lasted six weeks." },
      { letter: "C", text: "Plants under green light grew the shortest." },
      { letter: "D", text: "Temperature and water were kept identical in both groups." }
    ],
    correctAnswer: "D",
    explanation: "Controlling for other variables (temperature, water) makes it more likely that light color was the actual cause.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng293",
    question: "The new policy bans plastic straws in restaurants; paper or metal straws must be provided only upon request.\n\nThe semicolon is used correctly because",
    options: [
      { letter: "A", text: "both clauses are independent and closely related." },
      { letter: "B", text: "the second clause explains the first." },
      { letter: "C", text: "a list follows the semicolon." },
      { letter: "D", text: "the two clauses contradict each other." }
    ],
    correctAnswer: "A",
    explanation: "Both sides of the semicolon are complete sentences and closely related in topic.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng294",
    question: "Many cities have introduced congestion pricing—charging drivers to enter crowded downtown areas—in an effort to reduce traffic and pollution.\n\nThe dashes primarily function to",
    options: [
      { letter: "A", text: "set off a definition or clarification of 'congestion pricing.'" },
      { letter: "B", text: "indicate an abrupt break in thought." },
      { letter: "C", text: "show that the policy is controversial." },
      { letter: "D", text: "separate two contrasting ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dashes enclose an explanatory phrase that defines exactly what congestion pricing means.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng295",
    question: "A recent survey found that 70% of respondents believe artificial intelligence will create more jobs than it eliminates over the next decade.\n\nWhich finding, if true, would most directly weaken the optimism expressed in the survey?",
    options: [
      { letter: "A", text: "Most respondents work in technology-related fields." },
      { letter: "B", text: "Similar surveys in the past have overestimated job creation from new technologies." },
      { letter: "C", text: "Many respondents are unsure about the exact impact of AI." },
      { letter: "D", text: "30% of respondents believe AI will eliminate more jobs than it creates." }
    ],
    correctAnswer: "B",
    explanation: "Historical overestimation of job creation from new technology directly undermines confidence in the current optimistic prediction.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Evidence"
  },
  {
    id: "eng296",
    question: "The author writes: \"Remote work sounded like a dream—until millions of people tried doing it full-time during the pandemic.\"\n\nThe dash is used to",
    options: [
      { letter: "A", text: "introduce an ironic or unexpected outcome." },
      { letter: "B", text: "indicate a change in tense." },
      { letter: "C", text: "show that the author is quoting someone else." },
      { letter: "D", text: "separate items in a list." }
    ],
    correctAnswer: "A",
    explanation: "The dash sets up the punchline: what seemed ideal in theory turned out to have major downsides in practice.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng297",
    question: "Researchers studying ancient Roman concrete discovered that it contained lime clasts—small, bright chunks—that allow the material to self-heal when cracks form.\n\nWhich choice best explains the function of the appositive phrase \"small, bright chunks\"?",
    options: [
      { letter: "A", text: "It provides a visual description of lime clasts." },
      { letter: "B", text: "It defines a technical term for non-experts." },
      { letter: "C", text: "It contrasts lime clasts with modern concrete additives." },
      { letter: "D", text: "It explains why Roman concrete is stronger." }
    ],
    correctAnswer: "A",
    explanation: "The phrase gives a simple visual description so readers can picture what the researchers saw.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Inference"
  },
  {
    id: "eng298",
    question: "The following text is from Charlotte Bronte's 1847 novel Jane Eyre.\n\n\"I am no bird; and no net ensnares me: I am a free human being with an independent will.\"\n\nWhich choice completes the text with the most logical punctuation?",
    options: [
      { letter: "A", text: "NO CHANGE" },
      { letter: "B", text: "even; there" },
      { letter: "C", text: "even: there" },
      { letter: "D", text: "even, there" }
    ],
    correctAnswer: "A",
    explanation: "The semicolon correctly joins two independent clauses that reinforce each other.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng299",
    question: "The author writes: \"We are drowning in information—but starving for knowledge.\"\n\nThe dash is used to",
    options: [
      { letter: "A", text: "set up a strong contrast between two related ideas." },
      { letter: "B", text: "indicate missing text." },
      { letter: "C", text: "show a range." },
      { letter: "D", text: "separate independent clauses." }
    ],
    correctAnswer: "A",
    explanation: "The dash dramatically contrasts quantity (information) with quality (knowledge).",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  },
  {
    id: "eng300",
    question: "The author writes: \"The internet was supposed to bring the world together—instead, it often drives us apart.\"\n\nThe dash is primarily used to",
    options: [
      { letter: "A", text: "introduce a contrasting or ironic outcome." },
      { letter: "B", text: "indicate omitted text." },
      { letter: "C", text: "show a range of years." },
      { letter: "D", text: "separate two unrelated ideas." }
    ],
    correctAnswer: "A",
    explanation: "The dash dramatically sets up the opposite of what was promised.",
    difficulty: "Hard",
    domain: "Reading and Writing",
    skill: "Standard English Conventions"
  }
];
