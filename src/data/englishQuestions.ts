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
  }
];
