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
  }
];
