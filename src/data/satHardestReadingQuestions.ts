// SAT Hardest Reading Questions (Difficulty 8-10)
// Complete passages with elite-level questions for 750+ scorers

import type { EnglishQuestion } from './englishQuestions';

// Faulkner passage - embedded for all 5 questions
const faulknerPassage = `Read the following passage from "The Sound and the Fury" by William Faulkner (1929). The narrator, Benjy Compson, is 33 years old with severe cognitive disabilities.

Through the fence, between the curling flower spaces, I could see them hitting. They were coming toward where the flag was and I went along the fence. Limpsey was hunting in the grass by the flower tree. They took the flag out, and they were hitting. Then they put the flag back and they went to the table, and he hit and the other hit. Then they went on, and I went along the fence. Limpsey came away from the flower tree and we went along the fence and they stopped and we stopped and I looked through the fence while Limpsey was hunting in the grass.

'Here, caddie.' He hit. They went away across the pasture. I held to the fence and watched them going away.

'Listen at you, now.' Luster said. 'Aint you something, thirty three years old, going on that way. After I done went all the way to town to buy you that cake. Hush up that moaning. Aint you going to help me find that quarter so I can go to the show tonight.'

A snake crawled out from under the house. Jason said he wasn't afraid of snakes and Caddy said he was but she wasn't and Versh said they both were and Caddy said to be quiet, like father said.

You couldn't smell a snake, but you could feel him. He came out from under the house where the shadows were. You were not afraid of snakes until you were. Caddy said that. The snake came out in the sunshine and I could see his curling belly and the markings like Caddy's dress. Jason said he wasn't afraid but Caddy said that was a lie. Versh said Caddy was going to get whipped but he didn't. Mother said 'If I'm told it was to be expected. That Father would let them take Benjamin like this. The last thing I have. You might let me have him just one day.'

Caddy held me and I could hear us all, and the darkness, and something I could smell. And then I could see the windows, where the trees were buzzing. Then the dark began to go in smooth, bright shapes, like it always does, even when Caddy says that I'm not crying. Then I was crying.

I wasn't crying, but I couldn't stop. I wasn't crying, but the ground wasn't still, and then I was crying. The ground kept sloping up and the cows ran up the hill. T.P. tried to get up. He fell down again and the cows ran down the hill. Quentin held my arm and we went toward the barn. Then the barn wasn't there and we had to wait until it came back. I didn't see it come back. It came behind us and Quentin set me down in the trough where the cows ate. I held on to it. It was going away too, and I held to it. The cows ran down the hill again, across the door. I couldn't stop crying. Quentin and T.P. came up the hill, fighting. T.P. fell down and Quentin hit T.P. again.`;

// Quantum entanglement passage - embedded for all 5 questions
const quantumPassage = `Read the following passage about quantum entanglement and non-locality:

The phenomenon of quantum entanglement presents a profound challenge to classical intuitions about physical reality. When two particles become entangled, measurements performed on one particle instantaneously affect the state of the other, regardless of the spatial separation between them. This 'spooky action at a distance,' as Einstein dismissively called it, seems to violate the principle of locality - the idea that objects are only directly influenced by their immediate surroundings.

Einstein, Podolsky, and Rosen (EPR) argued in their famous 1935 paper that quantum mechanics must be incomplete. If measurements on particle A instantaneously determine properties of distant particle B, they reasoned, those properties must have existed prior to measurement. Quantum mechanics' inability to specify these pre-existing properties thus revealed its incompleteness. They proposed that 'hidden variables' - properties unknown to quantum theory but determining measurement outcomes - must exist.

John Bell's 1964 theorem, however, proved that no theory based on local hidden variables could reproduce all predictions of quantum mechanics. Bell derived mathematical inequalities that any local hidden variable theory must satisfy. Subsequent experiments have consistently violated these inequalities, confirming quantum mechanics and ruling out local hidden variables.

Yet this resolution deepens rather than resolves the conceptual puzzle. Bell's theorem presents us with a trilemma: we must abandon either locality, realism (the idea that properties exist independent of measurement), or the assumption that measurement outcomes are unique. Orthodox quantum mechanics abandons realism, asserting that properties do not exist until measured. 'Collapse' interpretations maintain that measurement causes reality to suddenly assume definite values from a prior state of possibility.

Some physicists, however, resist this conclusion. The many-worlds interpretation preserves realism by abandoning uniqueness: all possible measurement outcomes occur, but in different branches of a splitting universe. Bohmian mechanics preserves both realism and uniqueness by abandoning locality: particles have definite positions at all times, but they are guided by a non-local 'pilot wave.'

Crucially, quantum non-locality cannot be exploited for faster-than-light communication. While particle B's state instantly reflects measurements on A, this correlation only becomes apparent through classical communication of measurement results. The instantaneous influence is real but cannot be detected or controlled by observers at either location. This limitation preserves the causal structure of special relativity while maintaining the irreducibly non-local character of quantum correlations.

The philosophical implications remain contentious. Some argue that entanglement reveals the fundamentally holistic nature of reality - that the universe cannot be fully understood by analyzing separate parts. Others maintain that our intuitions about separability and individuation, forged by macroscopic experience, simply fail at quantum scales. The mathematical formalism works perfectly; the interpretive controversy concerns what this formalism tells us about the nature of reality itself.`;

export const satHardestReadingQuestions: EnglishQuestion[] = [
  // PASSAGE 1: Faulkner - The Sound and the Fury
  {
    id: "sat-hardest-001",
    question: `${faulknerPassage}

The passage's narrative technique primarily serves to`,
    options: [
      { letter: "A", text: "create sympathy for Benjy by emphasizing his victimization" },
      { letter: "B", text: "demonstrate the unreliability of memory in traumatic situations" },
      { letter: "C", text: "render subjective experience without imposing conventional interpretive frameworks" },
      { letter: "D", text: "contrast Benjy's perspective with that of neurotypical observers" }
    ],
    correctAnswer: "C",
    explanation: "The most sophisticated answer recognizes that Faulkner's stream-of-consciousness technique presents Benjy's experience directly without 'translating' it into conventional narrative logic. The prose doesn't ask us to pity Benjy (A), doesn't focus on trauma's effect on memory (B), and doesn't establish a neurotypical perspective for contrast (D). Instead, it radically validates Benjy's perceptual reality as it exists, forcing readers to inhabit a consciousness that doesn't organize experience through typical cognitive categories. This is the hardest answer because it requires recognizing what the passage does NOT do (impose interpretation) rather than what it does do.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Complex Inference - Narrative Perspective",
    difficultyRating: 10
  },
  {
    id: "sat-hardest-002",
    question: `${faulknerPassage}

The statement "You were not afraid of snakes until you were" most nearly suggests that for Benjy`,
    options: [
      { letter: "A", text: "fear is learned through social conditioning rather than innate" },
      { letter: "B", text: "emotional states exist only in the moment of their occurrence" },
      { letter: "C", text: "concepts like fear require language to become real" },
      { letter: "D", text: "past and present exist simultaneously without clear boundaries" }
    ],
    correctAnswer: "B",
    explanation: "This extremely difficult question requires understanding that Benjy lacks the cognitive structure to maintain emotional states across time - he doesn't 'become afraid' in a developmental sense (A), doesn't lack language for fear (C), and while time is fluid for him (D), that's not what this specific line addresses. The phrase captures that for Benjy, fear doesn't exist as a continuous state but only as immediate experience: you are not afraid, and then suddenly you are, with no bridge of anticipation or memory between. This reflects his inability to project forward or maintain emotional continuity. D is tempting for students who notice temporal confusion elsewhere, but it doesn't explain THIS specific paradox.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Subtle Textual Inference",
    difficultyRating: 9
  },
  {
    id: "sat-hardest-003",
    question: `${faulknerPassage}

The sudden shifts between present observation (the golf game) and memory (the snake, Caddy) primarily function to`,
    options: [
      { letter: "A", text: "illustrate the associative nature of Benjy's thought process" },
      { letter: "B", text: "suggest that past trauma has more reality for Benjy than present experience" },
      { letter: "C", text: "demonstrate that Benjy conflates distinct events into a single timeline" },
      { letter: "D", text: "reveal that linear time is a construct rather than objective reality" }
    ],
    correctAnswer: "A",
    explanation: "While all answers contain elements of truth, A is most precise. B is tempting but overreaches - past events aren't 'more real,' just equally real. C is close but slightly wrong: Benjy doesn't conflate events (he experiences them as distinct); rather, he lacks the conventional temporal framework that would keep them separated. D makes a philosophical claim beyond the passage's scope. A is correct because it describes the mechanism (association) without overinterpreting its implications. Present sensory input (golf, being called by Luster) triggers memories through association (the flag's movement, being called), and these exist simultaneously in Benjy's consciousness. This is hardest because A seems too simple compared to the more dramatic claims of B, C, and D.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Function of Structural Element",
    difficultyRating: 9
  },
  {
    id: "sat-hardest-004",
    question: `${faulknerPassage}

The phrase "the ground wasn't still" most directly refers to`,
    options: [
      { letter: "A", text: "an earthquake or ground movement occurring" },
      { letter: "B", text: "Benjy's physical instability while standing" },
      { letter: "C", text: "Benjy's disorientation manifesting as perceived environmental movement" },
      { letter: "D", text: "a metaphor for Benjy's emotional turbulence" }
    ],
    correctAnswer: "C",
    explanation: "This requires understanding subjective vs. objective reality in the passage. The ground isn't actually moving (A is wrong), and while Benjy may be physically unstable (B is partially true), that's not what the phrase describes. D treats it as metaphor, but Faulkner presents this as Benjy's literal perception, not symbolic language. C is correct: Benjy's distress causes him to perceive the environment as unstable. This is characteristic of his inability to distinguish internal states from external reality - he experiences his disorientation as the ground moving. The difficulty lies in recognizing that for Benjy, there's no distinction between 'actual' ground movement and perceived movement; both are equally real in his consciousness, yet C best captures the mechanism by acknowledging the perceptual source.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Word in Complex Context",
    difficultyRating: 8
  },
  {
    id: "sat-hardest-005",
    question: `${faulknerPassage}

The passage most strongly suggests that Benjy's relationship to Caddy differs from his relationships to other characters primarily because`,
    options: [
      { letter: "A", text: "she is the only family member who treats him with consistent kindness" },
      { letter: "B", text: "her presence provides him with a coherent framework for organizing experience" },
      { letter: "C", text: "she represents the time period before his condition worsened" },
      { letter: "D", text: "she validates his emotional responses rather than dismissing them" }
    ],
    correctAnswer: "B",
    explanation: "This is extremely difficult because all answers have textual support, requiring fine distinctions. A is partially supported ('Caddy held me') but too simplistic. D is true ('Caddy says that I'm not crying' - she acknowledges his state) but not the PRIMARY difference. C makes an unsupported assumption about condition progression. B is correct but subtle: when Benjy thinks of Caddy, his narrative becomes slightly more coherent - 'Caddy said' provides structure, her dress markings create connection to the snake, she interprets others' behavior. She functions as a cognitive anchor in his associative chaos. This is hardest to see because it requires comparing relative levels of narrative coherence across sections, noticing that Caddy-memories have slightly more logical connection than other passages.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Inference About Implicit Relationship",
    difficultyRating: 10
  },

  // PASSAGE 2: Quantum Entanglement
  {
    id: "sat-hardest-006",
    question: `${quantumPassage}

The author's presentation of the EPR argument suggests that Einstein's primary concern was`,
    options: [
      { letter: "A", text: "the apparent violation of special relativity's speed-of-light limit" },
      { letter: "B", text: "the implication that reality is fundamentally indeterminate" },
      { letter: "C", text: "the absence of a causal mechanism for distant correlations" },
      { letter: "D", text: "quantum mechanics' inability to provide complete descriptions of physical systems" }
    ],
    correctAnswer: "D",
    explanation: "This is extremely subtle. While Einstein famously objected to action at a distance (A, C), and disliked indeterminacy (B), the EPR argument as presented focuses specifically on completeness: IF properties of B are determined by measurements on A, THEN those properties must have existed beforehand, THEREFORE quantum mechanics is incomplete for not specifying them. The argument's logical structure is about informational completeness, not mechanism (C), speed limits (A), or determinacy per se (B). Notice the passage states EPR 'argued that quantum mechanics must be incomplete' - this is the conclusion they're driving toward. The difficulty is distinguishing Einstein's various objections and identifying which one THIS particular argument exemplifies.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Complex Inference - Scientific Reasoning",
    difficultyRating: 10
  },
  {
    id: "sat-hardest-007",
    question: `${quantumPassage}

The relationship between Bell's theorem and the "trilemma" presented is best described as`,
    options: [
      { letter: "A", text: "Bell's theorem proves one option in the trilemma, while experiments rule out the others" },
      { letter: "B", text: "the trilemma represents competing interpretations of what Bell's theorem demonstrates" },
      { letter: "C", text: "Bell's theorem eliminates one option, forcing choice among the remaining trilemma elements" },
      { letter: "D", text: "the trilemma arose before Bell's theorem and remains unresolved despite it" }
    ],
    correctAnswer: "C",
    explanation: "This requires precise logical reasoning across paragraphs. Bell's theorem doesn't prove anything about reality (A is wrong) - it rules OUT local hidden variables. This elimination forces the trilemma: we must abandon locality OR realism OR uniqueness, but Bell's theorem tells us we can't keep all three. The trilemma isn't about interpretation (B is wrong) - it's about which element of classical thinking to abandon. D is wrong because the trilemma is a consequence of Bell's theorem's implications, not prior to it. C correctly captures the logical flow: Bell eliminates the 'have it all' option (local realism with unique outcomes), forcing us to choose what to sacrifice.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Synthesis Across Sections",
    difficultyRating: 9
  },
  {
    id: "sat-hardest-008",
    question: `${quantumPassage}

The author's statement that quantum non-locality "cannot be exploited for faster-than-light communication" is significant primarily because it`,
    options: [
      { letter: "A", text: "resolves the apparent contradiction between quantum mechanics and special relativity" },
      { letter: "B", text: "demonstrates that the non-local influence is an illusion rather than physically real" },
      { letter: "C", text: "shows that non-locality, while real, doesn't violate causal ordering of events" },
      { letter: "D", text: "proves that local hidden variable theories remain viable despite Bell's theorem" }
    ],
    correctAnswer: "C",
    explanation: "This is extraordinarily difficult because it requires sophisticated understanding of what 'causality' means in relativity. A is tempting but imprecise - there's no 'contradiction' that needs resolving because quantum mechanics was never incompatible with relativity's equations, only with intuitions about locality. B is explicitly contradicted: 'The instantaneous influence is real.' D is backwards - this fact doesn't resurrect local hidden variables. C is correct but subtle: special relativity forbids faster-than-light SIGNALS (information transfer that could establish causal order), not instantaneous correlations per se. The non-locality is real, but because observers can't control or detect it without classical communication, they can't use it to send signals backward in time or establish causality. This preserves relativity's causal structure while allowing non-local correlations.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Subtle Distinction",
    difficultyRating: 10
  },
  {
    id: "sat-hardest-009",
    question: `${quantumPassage}

The author's discussion of many-worlds and Bohmian mechanics primarily serves to`,
    options: [
      { letter: "A", text: "advocate for alternative interpretations that preserve classical intuitions" },
      { letter: "B", text: "demonstrate that the trilemma offers genuine choices, each with costs" },
      { letter: "C", text: "show that realism can be maintained if other assumptions are abandoned" },
      { letter: "D", text: "illustrate the lack of consensus among physicists about quantum foundations" }
    ],
    correctAnswer: "B",
    explanation: "This requires understanding rhetorical structure. The author isn't advocating (A) - note the neutral tone and 'however' signaling contrast with orthodox view. C is true but too narrow - it describes WHAT the alternatives do, not WHY the author mentions them rhetorically. D is true but misses the rhetorical point. B is correct: by showing concrete interpretations that make different choices (many-worlds abandons uniqueness, Bohmian abandons locality), the author demonstrates that the trilemma offers real options, each with specific consequences. This structural understanding is harder than identifying content. The alternatives show that each 'horn' of the trilemma can be grasped - the choices are genuine, not illusory.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Inference About Rhetorical Purpose",
    difficultyRating: 9
  },
  {
    id: "sat-hardest-010",
    question: `${quantumPassage}

The passage's final paragraph suggests that the author views the continuing interpretive controversy as primarily`,
    options: [
      { letter: "A", text: "evidence that quantum mechanics itself remains fundamentally flawed" },
      { letter: "B", text: "a philosophical rather than scientific dispute about successful theories" },
      { letter: "C", text: "an indication that deeper physical principles remain to be discovered" },
      { letter: "D", text: "a temporary disagreement that future experiments will resolve" }
    ],
    correctAnswer: "B",
    explanation: "The key phrase is 'The mathematical formalism works perfectly; the interpretive controversy concerns what this formalism tells us about reality itself.' This explicitly frames the dispute as philosophical (about meaning/interpretation) not scientific (about empirical adequacy). A is contradicted - the author doesn't suggest QM is flawed. C might be true but isn't suggested here - the passage doesn't hint at undiscovered physics. D is unsupported - nothing suggests experiments will resolve interpretation (and the paragraph contrasts empirical success with interpretive dispute). B correctly captures that this is about what a successful scientific theory means, not whether it works.",
    difficulty: "Hard",
    domain: "Reading Comprehension",
    skill: "Tone and Implication",
    difficultyRating: 8
  }
];

export const satHardestReadingCount = satHardestReadingQuestions.length;
