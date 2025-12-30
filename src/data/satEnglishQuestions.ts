import { EnglishQuestion } from './englishQuestions';
import { rateDifficulty } from '@/utils/difficultyRating';

// Helper to add difficulty ratings
function addRating(q: Omit<EnglishQuestion, 'difficultyRating'>, forceLevel?: number): EnglishQuestion {
  const baseRating = rateDifficulty(q.question, q.options, q.domain, q.skill);
  return {
    ...q,
    difficultyRating: forceLevel ?? baseRating
  };
}

// SAT Reading & Writing Questions - Comprehensive Coverage
export const satEnglishQuestions: EnglishQuestion[] = [
  // ========== LEVEL 1-2: FOUNDATIONAL GRAMMAR ==========
  addRating({
    id: 'sat-eng-001',
    question: 'Choose the correct word to complete the sentence: The dog wagged ___ tail happily.',
    options: [
      { letter: 'A', text: 'its' },
      { letter: 'B', text: "it's" },
      { letter: 'C', text: 'their' },
      { letter: 'D', text: "they're" }
    ],
    correctAnswer: 'A',
    explanation: '"Its" is the possessive pronoun for "it." "It\'s" is a contraction of "it is."',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Possessive Pronouns'
  }, 1),
  addRating({
    id: 'sat-eng-002',
    question: 'Which sentence is punctuated correctly?',
    options: [
      { letter: 'A', text: 'I went to the store, and bought milk.' },
      { letter: 'B', text: 'I went to the store and bought milk.' },
      { letter: 'C', text: 'I went to the store: and bought milk.' },
      { letter: 'D', text: 'I went, to the store and bought milk.' }
    ],
    correctAnswer: 'B',
    explanation: 'No comma is needed before "and" when joining a compound predicate (two verbs sharing the same subject).',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Punctuation'
  }, 1),
  addRating({
    id: 'sat-eng-003',
    question: 'Select the correct verb form: She ___ to the library every day.',
    options: [
      { letter: 'A', text: 'go' },
      { letter: 'B', text: 'goes' },
      { letter: 'C', text: 'going' },
      { letter: 'D', text: 'gone' }
    ],
    correctAnswer: 'B',
    explanation: 'Third-person singular subjects (she, he, it) require the verb form "goes" in present tense.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Subject-Verb Agreement'
  }, 1),
  addRating({
    id: 'sat-eng-004',
    question: 'Which word correctly completes the sentence? The book is ___ than I expected.',
    options: [
      { letter: 'A', text: 'more longer' },
      { letter: 'B', text: 'longest' },
      { letter: 'C', text: 'longer' },
      { letter: 'D', text: 'long' }
    ],
    correctAnswer: 'C',
    explanation: 'When comparing two things, use the comparative form "longer." "More longer" is redundant.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Comparative Forms'
  }, 1),
  addRating({
    id: 'sat-eng-005',
    question: 'Choose the correct pronoun: Each of the students completed ___ assignment.',
    options: [
      { letter: 'A', text: 'their' },
      { letter: 'B', text: 'his or her' },
      { letter: 'C', text: 'its' },
      { letter: 'D', text: 'our' }
    ],
    correctAnswer: 'B',
    explanation: '"Each" is singular, so it traditionally requires a singular pronoun. "His or her" maintains agreement.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Pronoun Agreement'
  }, 2),
  addRating({
    id: 'sat-eng-006',
    question: 'Which sentence uses the correct homophone?',
    options: [
      { letter: 'A', text: 'Their going to the park tomorrow.' },
      { letter: 'B', text: "They're going to the park tomorrow." },
      { letter: 'C', text: 'There going to the park tomorrow.' },
      { letter: 'D', text: 'Theyre going to the park tomorrow.' }
    ],
    correctAnswer: 'B',
    explanation: '"They\'re" is the contraction of "they are." "Their" shows possession, and "there" indicates place.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Homophones'
  }, 1),
  addRating({
    id: 'sat-eng-007',
    question: 'Select the sentence with correct capitalization.',
    options: [
      { letter: 'A', text: 'We visited the grand canyon in Arizona.' },
      { letter: 'B', text: 'We visited the Grand canyon in Arizona.' },
      { letter: 'C', text: 'We visited the Grand Canyon in Arizona.' },
      { letter: 'D', text: 'We visited the grand Canyon in arizona.' }
    ],
    correctAnswer: 'C',
    explanation: 'Proper nouns like "Grand Canyon" and "Arizona" should be capitalized.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Capitalization'
  }, 1),
  addRating({
    id: 'sat-eng-008',
    question: 'Which sentence is written correctly?',
    options: [
      { letter: 'A', text: 'Me and him went to the store.' },
      { letter: 'B', text: 'Him and me went to the store.' },
      { letter: 'C', text: 'He and I went to the store.' },
      { letter: 'D', text: 'I and he went to the store.' }
    ],
    correctAnswer: 'C',
    explanation: 'Subject pronouns (I, he) should be used as the subject of a sentence. Conventionally, "I" comes last in pairs.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Pronoun Case'
  }, 2),
  addRating({
    id: 'sat-eng-009',
    question: 'Choose the correct plural form: The ___ were playing in the yard.',
    options: [
      { letter: 'A', text: 'childs' },
      { letter: 'B', text: 'childrens' },
      { letter: 'C', text: 'children' },
      { letter: 'D', text: 'child' }
    ],
    correctAnswer: 'C',
    explanation: '"Children" is the correct irregular plural of "child."',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Plural Forms'
  }, 1),
  addRating({
    id: 'sat-eng-010',
    question: 'Which sentence has the correct end punctuation?',
    options: [
      { letter: 'A', text: 'Where are you going.' },
      { letter: 'B', text: 'Where are you going?' },
      { letter: 'C', text: 'Where are you going!' },
      { letter: 'D', text: 'Where are you going,' }
    ],
    correctAnswer: 'B',
    explanation: 'Questions require a question mark at the end.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'End Punctuation'
  }, 1),
  addRating({
    id: 'sat-eng-011',
    question: 'Select the correct article: I saw ___ elephant at the zoo.',
    options: [
      { letter: 'A', text: 'a' },
      { letter: 'B', text: 'an' },
      { letter: 'C', text: 'the a' },
      { letter: 'D', text: 'a an' }
    ],
    correctAnswer: 'B',
    explanation: 'Use "an" before words that begin with a vowel sound. "Elephant" begins with an "e" sound.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Articles'
  }, 1),
  addRating({
    id: 'sat-eng-012',
    question: 'Which word is spelled correctly?',
    options: [
      { letter: 'A', text: 'recieve' },
      { letter: 'B', text: 'receive' },
      { letter: 'C', text: 'receeve' },
      { letter: 'D', text: 'receve' }
    ],
    correctAnswer: 'B',
    explanation: '"Receive" follows the "i before e except after c" rule.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Spelling'
  }, 1),
  addRating({
    id: 'sat-eng-013',
    question: 'Choose the correct verb tense: Yesterday, I ___ to the museum.',
    options: [
      { letter: 'A', text: 'go' },
      { letter: 'B', text: 'went' },
      { letter: 'C', text: 'goes' },
      { letter: 'D', text: 'going' }
    ],
    correctAnswer: 'B',
    explanation: '"Yesterday" indicates past tense, so "went" is correct.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Verb Tense'
  }, 1),
  addRating({
    id: 'sat-eng-014',
    question: 'Which sentence uses commas correctly?',
    options: [
      { letter: 'A', text: 'I bought apples oranges and bananas.' },
      { letter: 'B', text: 'I bought apples, oranges, and bananas.' },
      { letter: 'C', text: 'I bought, apples oranges and, bananas.' },
      { letter: 'D', text: 'I bought apples oranges, and bananas.' }
    ],
    correctAnswer: 'B',
    explanation: 'Commas should separate items in a list. The Oxford comma (before "and") is standard in formal writing.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Commas in Lists'
  }, 2),
  addRating({
    id: 'sat-eng-015',
    question: 'Select the sentence with correct subject-verb agreement: The group of students ___ ready.',
    options: [
      { letter: 'A', text: 'is' },
      { letter: 'B', text: 'are' },
      { letter: 'C', text: 'were' },
      { letter: 'D', text: 'be' }
    ],
    correctAnswer: 'A',
    explanation: 'The subject is "group" (singular), not "students." Singular subjects take singular verbs.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Subject-Verb Agreement'
  }, 2),

  // ========== LEVEL 3-4: BASIC READING & WRITING ==========
  addRating({
    id: 'sat-eng-016',
    question: 'Which transition word best connects these sentences? "The experiment failed. ___, the researchers learned valuable lessons."',
    options: [
      { letter: 'A', text: 'Therefore' },
      { letter: 'B', text: 'However' },
      { letter: 'C', text: 'Similarly' },
      { letter: 'D', text: 'Meanwhile' }
    ],
    correctAnswer: 'B',
    explanation: '"However" indicates contrast between the negative outcome (failure) and positive result (learning).',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions'
  }, 3),
  addRating({
    id: 'sat-eng-017',
    question: 'What is the main idea of this sentence: "Despite the heavy rain, the marathon continued as scheduled, and thousands of runners crossed the finish line."',
    options: [
      { letter: 'A', text: 'Heavy rain caused problems for runners.' },
      { letter: 'B', text: 'The marathon was successful despite bad weather.' },
      { letter: 'C', text: 'Thousands of people like to run marathons.' },
      { letter: 'D', text: 'Marathons should be canceled when it rains.' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence emphasizes that the marathon continued successfully despite rain, with many finishers.',
    difficulty: 'Easy',
    domain: 'Information and Ideas',
    skill: 'Main Idea'
  }, 3),
  addRating({
    id: 'sat-eng-018',
    question: 'Which word best replaces "happy" to add precision? "The team was happy after winning the championship."',
    options: [
      { letter: 'A', text: 'content' },
      { letter: 'B', text: 'ecstatic' },
      { letter: 'C', text: 'pleased' },
      { letter: 'D', text: 'satisfied' }
    ],
    correctAnswer: 'B',
    explanation: '"Ecstatic" conveys intense joy appropriate for winning a championship, stronger than the alternatives.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Word Choice'
  }, 3),
  addRating({
    id: 'sat-eng-019',
    question: 'Which sentence provides the best supporting detail for "Exercise has many benefits"?',
    options: [
      { letter: 'A', text: 'Many people enjoy exercising outdoors.' },
      { letter: 'B', text: 'Gyms are becoming more popular in cities.' },
      { letter: 'C', text: 'Regular exercise reduces the risk of heart disease.' },
      { letter: 'D', text: 'Some athletes exercise for several hours each day.' }
    ],
    correctAnswer: 'C',
    explanation: 'This directly supports the claim by providing a specific health benefit of exercise.',
    difficulty: 'Easy',
    domain: 'Information and Ideas',
    skill: 'Supporting Evidence'
  }, 3),
  addRating({
    id: 'sat-eng-020',
    question: 'Which revision makes this sentence more concise? "In my opinion, I think that recycling is important."',
    options: [
      { letter: 'A', text: 'In my opinion, recycling is important.' },
      { letter: 'B', text: 'I think that recycling is important.' },
      { letter: 'C', text: 'Recycling is important.' },
      { letter: 'D', text: 'I believe in my opinion that recycling is important.' }
    ],
    correctAnswer: 'C',
    explanation: '"In my opinion" and "I think" are redundant. The statement is strongest without these hedges.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Concision'
  }, 3),
  addRating({
    id: 'sat-eng-021',
    question: 'Based on context, what does "arduous" most likely mean? "The arduous climb left the hikers exhausted and out of breath."',
    options: [
      { letter: 'A', text: 'Easy' },
      { letter: 'B', text: 'Dangerous' },
      { letter: 'C', text: 'Difficult' },
      { letter: 'D', text: 'Long' }
    ],
    correctAnswer: 'C',
    explanation: 'The hikers being "exhausted and out of breath" suggests the climb was difficult or demanding.',
    difficulty: 'Easy',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 3),
  addRating({
    id: 'sat-eng-022',
    question: 'Which sentence is the best topic sentence for a paragraph about dolphins\' intelligence?',
    options: [
      { letter: 'A', text: 'Dolphins live in oceans around the world.' },
      { letter: 'B', text: 'Dolphins demonstrate remarkable problem-solving abilities.' },
      { letter: 'C', text: 'Many people enjoy watching dolphins perform.' },
      { letter: 'D', text: 'Dolphins eat fish and squid.' }
    ],
    correctAnswer: 'B',
    explanation: 'This directly addresses intelligence and sets up a paragraph about dolphins\' cognitive abilities.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Topic Sentences'
  }, 3),
  addRating({
    id: 'sat-eng-023',
    question: 'What is the author\'s purpose? "Warning: This product contains peanuts and may cause allergic reactions."',
    options: [
      { letter: 'A', text: 'To entertain readers with facts about peanuts' },
      { letter: 'B', text: 'To persuade readers to avoid peanuts' },
      { letter: 'C', text: 'To inform readers about a potential health risk' },
      { letter: 'D', text: 'To describe how peanut allergies develop' }
    ],
    correctAnswer: 'C',
    explanation: 'The warning label\'s purpose is to inform consumers about the presence of an allergen.',
    difficulty: 'Easy',
    domain: 'Craft and Structure',
    skill: 'Author\'s Purpose'
  }, 3),
  addRating({
    id: 'sat-eng-024',
    question: 'Which option correctly combines these sentences? "The storm was powerful. It knocked down many trees."',
    options: [
      { letter: 'A', text: 'The storm was powerful, it knocked down many trees.' },
      { letter: 'B', text: 'The storm was powerful; it knocked down many trees.' },
      { letter: 'C', text: 'The storm was powerful it knocked down many trees.' },
      { letter: 'D', text: 'The storm was, powerful and it knocked down many trees.' }
    ],
    correctAnswer: 'B',
    explanation: 'A semicolon correctly joins two related independent clauses. Option A is a comma splice.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Sentence Combining'
  }, 4),
  addRating({
    id: 'sat-eng-025',
    question: 'Which phrase should be removed to eliminate redundancy? "The unexpected surprise shocked everyone in the room."',
    options: [
      { letter: 'A', text: 'Remove "unexpected"' },
      { letter: 'B', text: 'Remove "surprised"' },
      { letter: 'C', text: 'Remove "shocked"' },
      { letter: 'D', text: 'Remove "in the room"' }
    ],
    correctAnswer: 'A',
    explanation: '"Surprise" already implies something unexpected, so "unexpected" is redundant.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Eliminating Redundancy'
  }, 4),
  addRating({
    id: 'sat-eng-026',
    question: 'What can you infer from this sentence? "Sarah arrived at the interview wearing a wrinkled shirt and had forgotten her resume."',
    options: [
      { letter: 'A', text: 'Sarah was well-prepared for the interview.' },
      { letter: 'B', text: 'Sarah was likely nervous or disorganized.' },
      { letter: 'C', text: 'The interview went very well.' },
      { letter: 'D', text: 'Sarah did not want the job.' }
    ],
    correctAnswer: 'B',
    explanation: 'The wrinkled shirt and forgotten resume suggest poor preparation, implying nervousness or disorganization.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Inference'
  }, 4),
  addRating({
    id: 'sat-eng-027',
    question: 'Which sentence correctly uses an apostrophe?',
    options: [
      { letter: 'A', text: "The dog's are playing in the yard." },
      { letter: 'B', text: "The dogs' owner arrived late." },
      { letter: 'C', text: "The dog's' leashes were tangled." },
      { letter: 'D', text: "The dogs's owner arrived late." }
    ],
    correctAnswer: 'B',
    explanation: '"Dogs\'" shows possession by multiple dogs (plural possessive).',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Apostrophes'
  }, 4),
  addRating({
    id: 'sat-eng-028',
    question: 'What tone does this passage convey? "The old house creaked in the wind, its broken windows staring like hollow eyes into the darkness."',
    options: [
      { letter: 'A', text: 'Cheerful and optimistic' },
      { letter: 'B', text: 'Eerie and unsettling' },
      { letter: 'C', text: 'Formal and academic' },
      { letter: 'D', text: 'Humorous and lighthearted' }
    ],
    correctAnswer: 'B',
    explanation: 'Words like "creaked," "broken," "hollow eyes," and "darkness" create an eerie, unsettling atmosphere.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Tone'
  }, 4),
  addRating({
    id: 'sat-eng-029',
    question: 'Which revision fixes the dangling modifier? "Walking through the forest, the birds were singing loudly."',
    options: [
      { letter: 'A', text: 'Walking through the forest, I heard the birds singing loudly.' },
      { letter: 'B', text: 'The birds were singing loudly, walking through the forest.' },
      { letter: 'C', text: 'Through the forest walking, the birds were singing loudly.' },
      { letter: 'D', text: 'The birds walking through the forest were singing loudly.' }
    ],
    correctAnswer: 'A',
    explanation: 'The modifier "Walking through the forest" must describe the person hearing, not the birds.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Modifiers'
  }, 4),
  addRating({
    id: 'sat-eng-030',
    question: 'Which sentence uses parallel structure correctly?',
    options: [
      { letter: 'A', text: 'The job requires writing, editing, and to proofread documents.' },
      { letter: 'B', text: 'The job requires to write, editing, and proofreading documents.' },
      { letter: 'C', text: 'The job requires writing, editing, and proofreading documents.' },
      { letter: 'D', text: 'The job requires write, edit, and proofread documents.' }
    ],
    correctAnswer: 'C',
    explanation: 'All items in a list should have the same grammatical form (gerunds: writing, editing, proofreading).',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Parallel Structure'
  }, 4),

  // ========== LEVEL 5-6: INTERMEDIATE READING & WRITING ==========
  addRating({
    id: 'sat-eng-031',
    question: 'Which sentence best concludes this paragraph? "Renewable energy sources like solar and wind power are becoming increasingly affordable. Installation costs have dropped by over 70% in the past decade. Many countries now generate significant portions of their electricity from renewables."',
    options: [
      { letter: 'A', text: 'Coal remains the cheapest energy source in some regions.' },
      { letter: 'B', text: 'These trends suggest a promising future for sustainable energy.' },
      { letter: 'C', text: 'Solar panels require regular maintenance.' },
      { letter: 'D', text: 'Energy consumption continues to increase globally.' }
    ],
    correctAnswer: 'B',
    explanation: 'The paragraph discusses positive trends in renewable energy, so a conclusion about a "promising future" logically follows.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Effective Conclusions'
  }, 5),
  addRating({
    id: 'sat-eng-032',
    question: 'In the context of this passage, what does "ubiquitous" mean? "Smartphones have become ubiquitous in modern society; nearly everyone owns one, and they are used for everything from communication to navigation."',
    options: [
      { letter: 'A', text: 'Expensive and exclusive' },
      { letter: 'B', text: 'Present everywhere' },
      { letter: 'C', text: 'Technologically advanced' },
      { letter: 'D', text: 'Difficult to use' }
    ],
    correctAnswer: 'B',
    explanation: 'The context ("nearly everyone owns one") clarifies that "ubiquitous" means present or found everywhere.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 5),
  addRating({
    id: 'sat-eng-033',
    question: 'Which evidence best supports the claim that sleep is essential for cognitive function?',
    options: [
      { letter: 'A', text: 'Most adults sleep between 6 and 8 hours per night.' },
      { letter: 'B', text: 'Sleep deprivation significantly impairs memory consolidation and decision-making.' },
      { letter: 'C', text: 'Many successful CEOs report sleeping only 4 hours.' },
      { letter: 'D', text: 'Sleep habits vary across different cultures.' }
    ],
    correctAnswer: 'B',
    explanation: 'This directly demonstrates the connection between sleep and cognitive functions like memory and decision-making.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Evaluating Evidence'
  }, 5),
  addRating({
    id: 'sat-eng-034',
    question: 'The author most likely uses the phrase "a double-edged sword" to suggest that:',
    options: [
      { letter: 'A', text: 'The topic involves medieval warfare.' },
      { letter: 'B', text: 'The subject has both positive and negative aspects.' },
      { letter: 'C', text: 'The issue requires sharp analysis.' },
      { letter: 'D', text: 'The problem can only be solved through conflict.' }
    ],
    correctAnswer: 'B',
    explanation: '"Double-edged sword" is an idiom meaning something has both beneficial and harmful consequences.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Figurative Language'
  }, 5),
  addRating({
    id: 'sat-eng-035',
    question: 'Which sentence most effectively introduces the paragraph about climate change\'s effect on wildlife?',
    options: [
      { letter: 'A', text: 'Climate change is a complex global issue.' },
      { letter: 'B', text: 'Many animals live in forests and oceans.' },
      { letter: 'C', text: 'Rising temperatures are forcing countless species to adapt, migrate, or face extinction.' },
      { letter: 'D', text: 'Scientists study animals in various habitats.' }
    ],
    correctAnswer: 'C',
    explanation: 'This sentence directly addresses climate change\'s effects on wildlife with specific consequences.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Introductory Sentences'
  }, 5),
  addRating({
    id: 'sat-eng-036',
    question: 'Which revision best improves the flow between these sentences? "The museum opened in 1920. It has welcomed over 50 million visitors."',
    options: [
      { letter: 'A', text: 'The museum opened in 1920, and so it has welcomed over 50 million visitors.' },
      { letter: 'B', text: 'Since opening in 1920, the museum has welcomed over 50 million visitors.' },
      { letter: 'C', text: 'The museum opened in 1920, visitors numbered over 50 million.' },
      { letter: 'D', text: 'Opening in 1920 the museum has welcomed over 50 million visitors.' }
    ],
    correctAnswer: 'B',
    explanation: '"Since opening in 1920" creates a smooth temporal connection between the opening and the visitor count.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Sentence Flow'
  }, 5),
  addRating({
    id: 'sat-eng-037',
    question: 'What is the author\'s implicit assumption in this argument? "Students who read for pleasure score higher on standardized tests; therefore, schools should require 30 minutes of daily recreational reading."',
    options: [
      { letter: 'A', text: 'All students enjoy reading.' },
      { letter: 'B', text: 'Reading for pleasure causes higher test scores.' },
      { letter: 'C', text: 'Standardized tests accurately measure intelligence.' },
      { letter: 'D', text: 'Schools currently have no reading programs.' }
    ],
    correctAnswer: 'B',
    explanation: 'The argument assumes causation (reading leads to higher scores), not just correlation.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Identifying Assumptions'
  }, 6),
  addRating({
    id: 'sat-eng-038',
    question: 'Which choice best maintains the formal tone of the passage? "The results of the study ___."',
    options: [
      { letter: 'A', text: 'were totally mind-blowing' },
      { letter: 'B', text: 'proved to be highly significant' },
      { letter: 'C', text: 'kind of surprised everyone' },
      { letter: 'D', text: 'were pretty interesting, I guess' }
    ],
    correctAnswer: 'B',
    explanation: '"Highly significant" maintains academic register, while other options are too informal.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Tone and Style'
  }, 5),
  addRating({
    id: 'sat-eng-039',
    question: 'The author includes statistical data primarily to:',
    options: [
      { letter: 'A', text: 'Impress readers with research skills' },
      { letter: 'B', text: 'Provide objective support for the argument' },
      { letter: 'C', text: 'Make the text longer and more detailed' },
      { letter: 'D', text: 'Confuse readers with complex information' }
    ],
    correctAnswer: 'B',
    explanation: 'Statistics provide concrete, objective evidence to strengthen arguments in academic writing.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Purpose'
  }, 5),
  addRating({
    id: 'sat-eng-040',
    question: 'Which transition best connects these ideas? "The company reduced its carbon footprint by 40%. ___, it saved $2 million in energy costs."',
    options: [
      { letter: 'A', text: 'Nevertheless' },
      { letter: 'B', text: 'In contrast' },
      { letter: 'C', text: 'Moreover' },
      { letter: 'D', text: 'Alternatively' }
    ],
    correctAnswer: 'C',
    explanation: '"Moreover" adds another positive outcome, showing both statements support a positive conclusion.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Transitions'
  }, 5),
  addRating({
    id: 'sat-eng-041',
    question: 'Based on the passage, the author would most likely agree that:',
    options: [
      { letter: 'A', text: 'Technology always improves society.' },
      { letter: 'B', text: 'Innovation requires careful ethical consideration.' },
      { letter: 'C', text: 'Progress should never be limited.' },
      { letter: 'D', text: 'Traditional methods are always superior.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage discusses both benefits and risks of innovation, suggesting balanced ethical consideration.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Author\'s Viewpoint'
  }, 6),
  addRating({
    id: 'sat-eng-042',
    question: 'Which revision eliminates the comma splice? "The concert was sold out, we couldn\'t get tickets."',
    options: [
      { letter: 'A', text: 'The concert was sold out we couldn\'t get tickets.' },
      { letter: 'B', text: 'The concert was sold out; we couldn\'t get tickets.' },
      { letter: 'C', text: 'The concert, was sold out, we couldn\'t get tickets.' },
      { letter: 'D', text: 'The concert was sold out and, we couldn\'t get tickets.' }
    ],
    correctAnswer: 'B',
    explanation: 'A semicolon correctly separates two independent clauses. A comma alone creates a comma splice.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Run-ons and Comma Splices'
  }, 6),
  addRating({
    id: 'sat-eng-043',
    question: 'The phrase "tip of the iceberg" in the passage most likely means:',
    options: [
      { letter: 'A', text: 'The topic is related to cold climates.' },
      { letter: 'B', text: 'Only a small part of a larger issue is visible.' },
      { letter: 'C', text: 'The problem is about to melt away.' },
      { letter: 'D', text: 'The situation is frozen and unchangeable.' }
    ],
    correctAnswer: 'B',
    explanation: 'This idiom means what\'s visible represents only a fraction of a larger hidden reality.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Figurative Language'
  }, 5),
  addRating({
    id: 'sat-eng-044',
    question: 'Which sentence should be removed to improve paragraph coherence? "(1) The Great Wall of China is a remarkable feat of engineering. (2) It stretches over 13,000 miles across northern China. (3) Pizza is a popular food around the world. (4) The wall was built over many centuries to protect against invasions."',
    options: [
      { letter: 'A', text: 'Sentence 1' },
      { letter: 'B', text: 'Sentence 2' },
      { letter: 'C', text: 'Sentence 3' },
      { letter: 'D', text: 'Sentence 4' }
    ],
    correctAnswer: 'C',
    explanation: 'Sentence 3 about pizza is completely unrelated to the topic of the Great Wall.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Coherence'
  }, 5),
  addRating({
    id: 'sat-eng-045',
    question: 'The passage\'s organization can best be described as:',
    options: [
      { letter: 'A', text: 'Chronological order' },
      { letter: 'B', text: 'Problem and solution' },
      { letter: 'C', text: 'Cause and effect' },
      { letter: 'D', text: 'Comparison and contrast' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage presents a phenomenon (cause) followed by its resulting impacts (effects).',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Text Structure'
  }, 6),

  // ========== LEVEL 7-8: ADVANCED READING & WRITING ==========
  addRating({
    id: 'sat-eng-046',
    question: 'The author\'s use of irony in the passage primarily serves to:',
    options: [
      { letter: 'A', text: 'Confuse readers about the author\'s true opinion' },
      { letter: 'B', text: 'Criticize the subject while appearing to praise it' },
      { letter: 'C', text: 'Demonstrate the author\'s superior intelligence' },
      { letter: 'D', text: 'Make the passage more humorous for entertainment' }
    ],
    correctAnswer: 'B',
    explanation: 'Irony often allows authors to criticize by saying the opposite of what they mean, creating implicit critique.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Devices'
  }, 7),
  addRating({
    id: 'sat-eng-047',
    question: 'Which statement accurately describes the relationship between the two passages? Passage 1 argues for increased regulation of social media, while Passage 2 advocates for industry self-governance.',
    options: [
      { letter: 'A', text: 'They agree on goals but differ on methods.' },
      { letter: 'B', text: 'They present completely unrelated arguments.' },
      { letter: 'C', text: 'Passage 2 provides evidence supporting Passage 1.' },
      { letter: 'D', text: 'They agree that no action is necessary.' }
    ],
    correctAnswer: 'A',
    explanation: 'Both passages address social media problems but propose different solutions (regulation vs. self-governance).',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Synthesizing Information'
  }, 7),
  addRating({
    id: 'sat-eng-048',
    question: 'The author introduces the counterargument in paragraph 3 primarily to:',
    options: [
      { letter: 'A', text: 'Abandon the original thesis' },
      { letter: 'B', text: 'Confuse the reader about the main argument' },
      { letter: 'C', text: 'Strengthen the argument by addressing potential objections' },
      { letter: 'D', text: 'Demonstrate neutrality on the issue' }
    ],
    correctAnswer: 'C',
    explanation: 'Addressing counterarguments shows awareness of opposing views and strengthens credibility when refuted.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Argument Development'
  }, 7),
  addRating({
    id: 'sat-eng-049',
    question: 'Which phrase from the passage reveals the author\'s skepticism toward the study\'s conclusions?',
    options: [
      { letter: 'A', text: '"The researchers collected data from..."' },
      { letter: 'B', text: '"The study allegedly demonstrates that..."' },
      { letter: 'C', text: '"Participants were selected from..."' },
      { letter: 'D', text: '"The methodology followed standard protocols..."' }
    ],
    correctAnswer: 'B',
    explanation: '"Allegedly" implies doubt or uncertainty, signaling the author\'s skepticism about the conclusions.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Author\'s Attitude'
  }, 7),
  addRating({
    id: 'sat-eng-050',
    question: 'The author\'s analogy comparing the economy to an ecosystem serves to:',
    options: [
      { letter: 'A', text: 'Suggest that economics should study plants and animals' },
      { letter: 'B', text: 'Illustrate the interconnected and complex nature of economic systems' },
      { letter: 'C', text: 'Argue that environmental policy should guide economic decisions' },
      { letter: 'D', text: 'Demonstrate that economies follow predictable cycles' }
    ],
    correctAnswer: 'B',
    explanation: 'The ecosystem analogy highlights complexity, interdependence, and the ripple effects of changes—qualities shared by economies.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Analogies'
  }, 7),
  addRating({
    id: 'sat-eng-051',
    question: 'Which revision best clarifies the logical relationship? "The medication was highly effective; nevertheless, it caused severe side effects."',
    options: [
      { letter: 'A', text: 'The medication was highly effective, so it caused severe side effects.' },
      { letter: 'B', text: 'The medication was highly effective; therefore, doctors hesitated to prescribe it due to severe side effects.' },
      { letter: 'C', text: 'Although the medication was highly effective, severe side effects limited its use.' },
      { letter: 'D', text: 'The medication was highly effective, and it caused severe side effects.' }
    ],
    correctAnswer: 'C',
    explanation: '"Although" establishes clear concession, and "limited its use" shows the consequence of the contrast.',
    difficulty: 'Hard',
    domain: 'Expression of Ideas',
    skill: 'Logical Connectors'
  }, 7),
  addRating({
    id: 'sat-eng-052',
    question: 'The term "unprecedented" in line 15 emphasizes which quality of the discovery?',
    options: [
      { letter: 'A', text: 'Its cost-effectiveness' },
      { letter: 'B', text: 'Its novelty and unique nature' },
      { letter: 'C', text: 'Its controversial reception' },
      { letter: 'D', text: 'Its gradual development' }
    ],
    correctAnswer: 'B',
    explanation: '"Unprecedented" means never done or known before, emphasizing novelty and uniqueness.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Word Function'
  }, 7),
  addRating({
    id: 'sat-eng-053',
    question: 'Based on the passage, the author would most likely criticize which practice?',
    options: [
      { letter: 'A', text: 'Careful analysis of multiple data sources' },
      { letter: 'B', text: 'Cherry-picking evidence to support predetermined conclusions' },
      { letter: 'C', text: 'Acknowledging limitations in research methodology' },
      { letter: 'D', text: 'Revising hypotheses based on new evidence' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage emphasizes honest, comprehensive analysis, implying criticism of selective evidence use.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Implicit Critique'
  }, 8),
  addRating({
    id: 'sat-eng-054',
    question: 'The shift in tone from paragraph 2 to paragraph 3 can best be characterized as a move from:',
    options: [
      { letter: 'A', text: 'Optimistic to cautionary' },
      { letter: 'B', text: 'Informal to technical' },
      { letter: 'C', text: 'Objective to personal' },
      { letter: 'D', text: 'Humorous to serious' }
    ],
    correctAnswer: 'A',
    explanation: 'Paragraph 2 discusses benefits enthusiastically; paragraph 3 introduces concerns and warnings.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Tonal Shifts'
  }, 8),
  addRating({
    id: 'sat-eng-055',
    question: 'Which inference about the researcher\'s methodology is best supported by the passage?',
    options: [
      { letter: 'A', text: 'The researcher relied exclusively on quantitative data.' },
      { letter: 'B', text: 'The study used a mixed-methods approach combining interviews and statistics.' },
      { letter: 'C', text: 'The methodology was fundamentally flawed.' },
      { letter: 'D', text: 'Only historical documents were consulted.' }
    ],
    correctAnswer: 'B',
    explanation: 'References to both "participant responses" and "statistical analysis" suggest mixed methods.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferring Methodology'
  }, 8),
  addRating({
    id: 'sat-eng-056',
    question: 'The author\'s use of the first-person plural ("we must consider") primarily functions to:',
    options: [
      { letter: 'A', text: 'Establish personal credibility' },
      { letter: 'B', text: 'Create a sense of shared responsibility with readers' },
      { letter: 'C', text: 'Indicate that multiple authors wrote the passage' },
      { letter: 'D', text: 'Distance the author from the claims being made' }
    ],
    correctAnswer: 'B',
    explanation: 'First-person plural ("we") includes readers, fostering shared investment and collective responsibility.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Point of View'
  }, 7),
  addRating({
    id: 'sat-eng-057',
    question: 'Which sentence best synthesizes the information from the graph and the passage?',
    options: [
      { letter: 'A', text: 'The data confirms the passage\'s claim that participation rates peaked in 2015.' },
      { letter: 'B', text: 'The graph contradicts the author\'s assertion about declining interest.' },
      { letter: 'C', text: 'No connection exists between the visual data and the written analysis.' },
      { letter: 'D', text: 'The graph provides context that the passage fails to mention.' }
    ],
    correctAnswer: 'A',
    explanation: 'Effective synthesis shows how visual evidence supports or confirms textual claims.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Data Synthesis'
  }, 8),
  addRating({
    id: 'sat-eng-058',
    question: 'The passage\'s concluding paragraph most likely aims to:',
    options: [
      { letter: 'A', text: 'Summarize all previously mentioned points' },
      { letter: 'B', text: 'Introduce a completely new topic for further research' },
      { letter: 'C', text: 'Issue a call to action based on the preceding analysis' },
      { letter: 'D', text: 'Undermine the credibility of opposing viewpoints' }
    ],
    correctAnswer: 'C',
    explanation: 'Persuasive passages often conclude with calls to action, urging readers to respond to the analysis.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Conclusion Function'
  }, 7),
  addRating({
    id: 'sat-eng-059',
    question: 'Which revision most effectively combines the underlined sentences while preserving their meaning? "The study was conducted over five years. The study involved participants from twelve countries. The study examined patterns in consumer behavior."',
    options: [
      { letter: 'A', text: 'The study was conducted over five years and involved participants from twelve countries and examined patterns in consumer behavior.' },
      { letter: 'B', text: 'Conducted over five years with participants from twelve countries, the study examined patterns in consumer behavior.' },
      { letter: 'C', text: 'The five-year study with twelve countries of participants examined consumer behavior patterns.' },
      { letter: 'D', text: 'Consumer behavior patterns were examined in a study of five years from twelve countries.' }
    ],
    correctAnswer: 'B',
    explanation: 'This option efficiently combines information using a participial phrase while maintaining clarity.',
    difficulty: 'Hard',
    domain: 'Expression of Ideas',
    skill: 'Sentence Combining'
  }, 8),
  addRating({
    id: 'sat-eng-060',
    question: 'The author qualifies the central claim in paragraph 4 most likely because:',
    options: [
      { letter: 'A', text: 'The author has changed position since the introduction' },
      { letter: 'B', text: 'New research has emerged contradicting the thesis' },
      { letter: 'C', text: 'Acknowledging complexity strengthens academic credibility' },
      { letter: 'D', text: 'The word limit required simplification' }
    ],
    correctAnswer: 'C',
    explanation: 'Academic writing gains credibility through nuanced claims that acknowledge complexity rather than oversimplifying.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Qualifying Claims'
  }, 8),

  // ========== LEVEL 9-10: EXPERT READING & WRITING ==========
  addRating({
    id: 'sat-eng-061',
    question: 'The author\'s assertion that "technology companies have become the de facto arbiters of public discourse" most directly implies criticism of:',
    options: [
      { letter: 'A', text: 'The profit motive in the technology sector' },
      { letter: 'B', text: 'The concentration of communicative power in unelected entities' },
      { letter: 'C', text: 'Users\' reliance on social media for news' },
      { letter: 'D', text: 'Government failure to develop competing platforms' }
    ],
    correctAnswer: 'B',
    explanation: '"De facto arbiters" suggests these companies have assumed decision-making power over speech without democratic mandate.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Implicit Arguments'
  }, 9),
  addRating({
    id: 'sat-eng-062',
    question: 'The parallel structure in the passage\'s final paragraph ("not merely... but also...") primarily serves to:',
    options: [
      { letter: 'A', text: 'Correct a previous misstatement' },
      { letter: 'B', text: 'Elevate the stakes of the argument beyond its initial framing' },
      { letter: 'C', text: 'Introduce an entirely unrelated consideration' },
      { letter: 'D', text: 'Summarize evidence presented earlier in the passage' }
    ],
    correctAnswer: 'B',
    explanation: '"Not merely X but also Y" structure typically intensifies the claim, suggesting Y is more significant than X.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Effect'
  }, 9),
  addRating({
    id: 'sat-eng-063',
    question: 'The phrase "epistemic humility" as used in the passage most nearly means:',
    options: [
      { letter: 'A', text: 'Reluctance to share knowledge with others' },
      { letter: 'B', text: 'Recognition of the limits and fallibility of one\'s knowledge' },
      { letter: 'C', text: 'Preference for traditional over empirical knowledge' },
      { letter: 'D', text: 'Deference to intellectual authorities' }
    ],
    correctAnswer: 'B',
    explanation: '"Epistemic" relates to knowledge; "humility" here means acknowledging limitations in what one knows.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Technical Vocabulary'
  }, 9),
  addRating({
    id: 'sat-eng-064',
    question: 'Which aspect of the study\'s design does the author identify as most problematic?',
    options: [
      { letter: 'A', text: 'The sample size was insufficient for statistical significance.' },
      { letter: 'B', text: 'The operationalization of key variables introduced systematic bias.' },
      { letter: 'C', text: 'The funding source may have influenced the conclusions.' },
      { letter: 'D', text: 'The peer review process was not properly completed.' }
    ],
    correctAnswer: 'B',
    explanation: 'The author criticizes how abstract concepts were measured, suggesting this distorted results.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Evaluating Methodology'
  }, 10),
  addRating({
    id: 'sat-eng-065',
    question: 'The author\'s reference to "Pyrrhic victory" in describing the legislation\'s passage suggests that:',
    options: [
      { letter: 'A', text: 'The victory was named after a Greek general' },
      { letter: 'B', text: 'The success came at a cost that may outweigh its benefits' },
      { letter: 'C', text: 'The legislation was passed by an overwhelming majority' },
      { letter: 'D', text: 'The political battle was particularly fierce' }
    ],
    correctAnswer: 'B',
    explanation: 'A Pyrrhic victory is one achieved at too great a cost, suggesting the legislation\'s success may be self-defeating.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Classical Allusions'
  }, 9),
  addRating({
    id: 'sat-eng-066',
    question: 'The passage suggests that the relationship between economic growth and environmental sustainability is best characterized as:',
    options: [
      { letter: 'A', text: 'Mutually exclusive under all circumstances' },
      { letter: 'B', text: 'Potentially compatible given appropriate policy interventions' },
      { letter: 'C', text: 'Irrelevant to contemporary policy debates' },
      { letter: 'D', text: 'Already fully reconciled in developed nations' }
    ],
    correctAnswer: 'B',
    explanation: 'The author discusses conditions under which growth and sustainability can coexist, implying potential compatibility.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Complex Relationships'
  }, 9),
  addRating({
    id: 'sat-eng-067',
    question: 'In context, the author\'s parenthetical remark "(a claim that itself merits scrutiny)" functions primarily as:',
    options: [
      { letter: 'A', text: 'An admission that the author lacks expertise on the topic' },
      { letter: 'B', text: 'A signal that the preceding claim should not be accepted uncritically' },
      { letter: 'C', text: 'A complete rejection of the argument just presented' },
      { letter: 'D', text: 'An invitation for the reader to conduct independent research' }
    ],
    correctAnswer: 'B',
    explanation: 'The parenthetical flags a need for critical evaluation without fully rejecting the claim.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Authorial Interjections'
  }, 9),
  addRating({
    id: 'sat-eng-068',
    question: 'The structural choice to present the counterargument before the thesis in paragraph 1 most likely serves to:',
    options: [
      { letter: 'A', text: 'Confuse readers about the author\'s actual position' },
      { letter: 'B', text: 'Acknowledge the strength of opposing views before refuting them' },
      { letter: 'C', text: 'Demonstrate that the author has not fully developed a thesis' },
      { letter: 'D', text: 'Indicate that the author agrees with the counterargument' }
    ],
    correctAnswer: 'B',
    explanation: 'Leading with the counterargument can demonstrate intellectual honesty and set up a more powerful refutation.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Structural Choices'
  }, 10),
  addRating({
    id: 'sat-eng-069',
    question: 'The author\'s choice to present conflicting expert opinions without resolving the disagreement suggests:',
    options: [
      { letter: 'A', text: 'The author lacks sufficient knowledge to take a position' },
      { letter: 'B', text: 'The purpose is informative rather than persuasive' },
      { letter: 'C', text: 'Expert opinion is unreliable' },
      { letter: 'D', text: 'The conflict is artificial and easily resolved' }
    ],
    correctAnswer: 'B',
    explanation: 'Presenting multiple views without advocacy suggests an informative purpose—helping readers understand the debate.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Authorial Neutrality'
  }, 9),
  addRating({
    id: 'sat-eng-070',
    question: 'Which statement best captures the author\'s nuanced position on historical interpretation?',
    options: [
      { letter: 'A', text: 'Historical facts are objective and immune to reinterpretation.' },
      { letter: 'B', text: 'All historical narratives are equally valid regardless of evidence.' },
      { letter: 'C', text: 'While evidence constrains interpretation, historians inevitably bring contemporary perspectives to their analysis.' },
      { letter: 'D', text: 'Only historians from the era in question can accurately interpret historical events.' }
    ],
    correctAnswer: 'C',
    explanation: 'The author acknowledges both evidential constraints and the influence of historians\' contexts—a balanced view.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Nuanced Arguments'
  }, 10),
  addRating({
    id: 'sat-eng-071',
    question: 'The author\'s characterization of the debate as "increasingly Manichaean" implies criticism of:',
    options: [
      { letter: 'A', text: 'Religious influence on political discourse' },
      { letter: 'B', text: 'The tendency to frame complex issues in binary, good-versus-evil terms' },
      { letter: 'C', text: 'Historical ignorance among contemporary commentators' },
      { letter: 'D', text: 'Excessive reliance on Persian philosophy' }
    ],
    correctAnswer: 'B',
    explanation: 'Manichaean thinking divides reality into absolute good and evil—the author criticizes this oversimplification.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Philosophical Allusions'
  }, 10),
  addRating({
    id: 'sat-eng-072',
    question: 'The passage\'s final sentence—"Whether we will heed these warnings remains an open question"—accomplishes which rhetorical purpose?',
    options: [
      { letter: 'A', text: 'It provides a definitive answer to the questions raised' },
      { letter: 'B', text: 'It transfers responsibility for action to the reader' },
      { letter: 'C', text: 'It summarizes the evidence presented in the passage' },
      { letter: 'D', text: 'It dismisses the significance of the preceding analysis' }
    ],
    correctAnswer: 'B',
    explanation: 'The open-ended question implies collective responsibility and invites readers to consider their own responses.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Conclusions'
  }, 9),
  addRating({
    id: 'sat-eng-073',
    question: 'The author\'s distinction between "legality" and "legitimacy" in paragraph 5 primarily serves to:',
    options: [
      { letter: 'A', text: 'Demonstrate expertise in legal terminology' },
      { letter: 'B', text: 'Suggest that laws are always morally suspect' },
      { letter: 'C', text: 'Argue that formal compliance with law is not equivalent to ethical justification' },
      { letter: 'D', text: 'Defend actions that violate existing laws' }
    ],
    correctAnswer: 'C',
    explanation: 'The distinction highlights that legal permissibility does not automatically confer moral approval.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Conceptual Distinctions'
  }, 10),
  addRating({
    id: 'sat-eng-074',
    question: 'Based on the passage, the author would most likely view the claim that "AI will replace all human workers" as:',
    options: [
      { letter: 'A', text: 'A reasonable prediction based on current trends' },
      { letter: 'B', text: 'An alarmist oversimplification that ignores historical patterns of technological adaptation' },
      { letter: 'C', text: 'A scientific certainty supported by all available evidence' },
      { letter: 'D', text: 'An understatement of AI\'s transformative potential' }
    ],
    correctAnswer: 'B',
    explanation: 'The author emphasizes historical patterns of adaptation and criticizes deterministic predictions about technology.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Applying Author\'s Framework'
  }, 9),
  addRating({
    id: 'sat-eng-075',
    question: 'The author\'s rhetorical question in paragraph 3—"But at what cost?"—functions primarily to:',
    options: [
      { letter: 'A', text: 'Request financial data from the reader' },
      { letter: 'B', text: 'Transition from describing benefits to examining drawbacks' },
      { letter: 'C', text: 'Indicate that the author does not know the answer' },
      { letter: 'D', text: 'Suggest that costs are impossible to calculate' }
    ],
    correctAnswer: 'B',
    explanation: 'Rhetorical questions often signal a pivot in argument; here, it shifts from positive to negative considerations.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Questions'
  }, 9),

  // ========== ADDITIONAL LEVEL 5-7 QUESTIONS ==========
  addRating({
    id: 'sat-eng-076',
    question: 'The phrase "throwing good money after bad" in the passage suggests:',
    options: [
      { letter: 'A', text: 'The investment strategy was highly profitable' },
      { letter: 'B', text: 'Additional resources are being wasted on a failing endeavor' },
      { letter: 'C', text: 'Money should be invested in both good and bad projects' },
      { letter: 'D', text: 'Financial decisions should be made quickly' }
    ],
    correctAnswer: 'B',
    explanation: 'This idiom means continuing to invest in something that has already proven unsuccessful.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Idioms'
  }, 6),
  addRating({
    id: 'sat-eng-077',
    question: 'Which sentence most effectively establishes the author\'s credibility?',
    options: [
      { letter: 'A', text: 'I personally believe this to be true.' },
      { letter: 'B', text: 'Everyone knows that this is the case.' },
      { letter: 'C', text: 'Research from Harvard Medical School confirms these findings.' },
      { letter: 'D', text: 'It just makes sense when you think about it.' }
    ],
    correctAnswer: 'C',
    explanation: 'Citing reputable research establishes credibility through external authority and evidence.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Establishing Credibility'
  }, 6),
  addRating({
    id: 'sat-eng-078',
    question: 'The author\'s decision to present information in chronological order most likely reflects an intention to:',
    options: [
      { letter: 'A', text: 'Confuse readers about the sequence of events' },
      { letter: 'B', text: 'Show how developments built upon one another over time' },
      { letter: 'C', text: 'Emphasize the importance of the earliest events' },
      { letter: 'D', text: 'Minimize the significance of recent changes' }
    ],
    correctAnswer: 'B',
    explanation: 'Chronological order is effective for showing cause-and-effect relationships and developmental progression.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Organizational Purpose'
  }, 6),
  addRating({
    id: 'sat-eng-079',
    question: 'Which revision eliminates wordiness while preserving meaning? "In light of the fact that the weather was bad, we decided to postpone the event."',
    options: [
      { letter: 'A', text: 'Because of the bad weather, we postponed the event.' },
      { letter: 'B', text: 'The weather being bad, we decided to postpone the event.' },
      { letter: 'C', text: 'In light of bad weather facts, we postponed.' },
      { letter: 'D', text: 'The event was postponed due to the fact of bad weather.' }
    ],
    correctAnswer: 'A',
    explanation: '"Because" replaces "In light of the fact that" concisely while maintaining clear causation.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Concision'
  }, 5),
  addRating({
    id: 'sat-eng-080',
    question: 'The author addresses potential counterarguments in the passage primarily to:',
    options: [
      { letter: 'A', text: 'Demonstrate uncertainty about the thesis' },
      { letter: 'B', text: 'Acknowledge complexity while reinforcing the main argument' },
      { letter: 'C', text: 'Shift to a neutral position' },
      { letter: 'D', text: 'Abandon the original claim' }
    ],
    correctAnswer: 'B',
    explanation: 'Addressing counterarguments shows intellectual honesty while ultimately strengthening the thesis.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Counterargument Function'
  }, 6),
  addRating({
    id: 'sat-eng-081',
    question: 'Which sentence best supports the claim that public transportation reduces environmental impact?',
    options: [
      { letter: 'A', text: 'Many cities have expanded their subway systems in recent years.' },
      { letter: 'B', text: 'A single bus can remove up to 40 cars from the road during peak hours.' },
      { letter: 'C', text: 'Public transportation is more affordable than owning a car.' },
      { letter: 'D', text: 'Train stations are often located in downtown areas.' }
    ],
    correctAnswer: 'B',
    explanation: 'Reducing the number of cars directly relates to environmental impact through decreased emissions.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Relevant Evidence'
  }, 5),
  addRating({
    id: 'sat-eng-082',
    question: 'The word "mitigate" in the passage most nearly means:',
    options: [
      { letter: 'A', text: 'To completely eliminate' },
      { letter: 'B', text: 'To lessen the severity of' },
      { letter: 'C', text: 'To investigate thoroughly' },
      { letter: 'D', text: 'To take advantage of' }
    ],
    correctAnswer: 'B',
    explanation: '"Mitigate" means to make less severe, serious, or painful—to alleviate.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 6),
  addRating({
    id: 'sat-eng-083',
    question: 'Which revision corrects the subject-verb agreement error? "The collection of rare books are on display at the library."',
    options: [
      { letter: 'A', text: 'The collection of rare books is on display at the library.' },
      { letter: 'B', text: 'The collections of rare books are on display at the library.' },
      { letter: 'C', text: 'The collection of rare book are on display at the library.' },
      { letter: 'D', text: 'The collection of rare books were on display at the library.' }
    ],
    correctAnswer: 'A',
    explanation: 'The subject is "collection" (singular), so the verb should be "is."',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Subject-Verb Agreement'
  }, 5),
  addRating({
    id: 'sat-eng-084',
    question: 'The author\'s tone in describing the failed experiment is best characterized as:',
    options: [
      { letter: 'A', text: 'Harshly critical' },
      { letter: 'B', text: 'Neutrally informative' },
      { letter: 'C', text: 'Enthusiastically supportive' },
      { letter: 'D', text: 'Sarcastically dismissive' }
    ],
    correctAnswer: 'B',
    explanation: 'The author presents facts without emotional language, maintaining objectivity.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Tone Analysis'
  }, 6),
  addRating({
    id: 'sat-eng-085',
    question: 'Which choice provides the most specific and relevant detail? "The new policy has had significant effects on _____."',
    options: [
      { letter: 'A', text: 'many things in the community' },
      { letter: 'B', text: 'various aspects of daily life' },
      { letter: 'C', text: 'employment rates among residents aged 18-25' },
      { letter: 'D', text: 'people and places' }
    ],
    correctAnswer: 'C',
    explanation: 'Specific details (employment rates, age group) are more informative than vague references.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Precision'
  }, 5),
  addRating({
    id: 'sat-eng-086',
    question: 'Based on the passage, the relationship between the two studies can best be described as:',
    options: [
      { letter: 'A', text: 'The second study replicates the first with identical results.' },
      { letter: 'B', text: 'The second study challenges the methodology of the first.' },
      { letter: 'C', text: 'The studies are completely unrelated.' },
      { letter: 'D', text: 'The first study invalidates the second.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage describes how the second study questions the experimental design of the first.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Comparing Studies'
  }, 7),
  addRating({
    id: 'sat-eng-087',
    question: 'The author includes the anecdote about the factory worker primarily to:',
    options: [
      { letter: 'A', text: 'Provide comic relief' },
      { letter: 'B', text: 'Illustrate the human impact of abstract economic forces' },
      { letter: 'C', text: 'Criticize individual workers' },
      { letter: 'D', text: 'Demonstrate expertise in manufacturing' }
    ],
    correctAnswer: 'B',
    explanation: 'Personal anecdotes in analytical writing typically humanize abstract issues.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Anecdote Function'
  }, 6),
  addRating({
    id: 'sat-eng-088',
    question: 'Which sentence uses a colon correctly?',
    options: [
      { letter: 'A', text: 'The recipe requires: flour, sugar, and eggs.' },
      { letter: 'B', text: 'She had one goal: to finish the marathon.' },
      { letter: 'C', text: 'I went to: the store and the bank.' },
      { letter: 'D', text: 'The team: won the championship.' }
    ],
    correctAnswer: 'B',
    explanation: 'Colons should follow a complete sentence and introduce an explanation, list, or elaboration.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Colon Usage'
  }, 5),
  addRating({
    id: 'sat-eng-089',
    question: 'The author most likely includes the quotation from the expert to:',
    options: [
      { letter: 'A', text: 'Fill space in the passage' },
      { letter: 'B', text: 'Lend authority to the argument being made' },
      { letter: 'C', text: 'Contradict the main thesis' },
      { letter: 'D', text: 'Demonstrate disagreement among experts' }
    ],
    correctAnswer: 'B',
    explanation: 'Expert quotations typically support the author\'s argument by providing authoritative backing.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Use of Sources'
  }, 6),
  addRating({
    id: 'sat-eng-090',
    question: 'Which transition word best indicates a conclusion? "___, the evidence suggests that early intervention is most effective."',
    options: [
      { letter: 'A', text: 'However' },
      { letter: 'B', text: 'Meanwhile' },
      { letter: 'C', text: 'Therefore' },
      { letter: 'D', text: 'Alternatively' }
    ],
    correctAnswer: 'C',
    explanation: '"Therefore" signals a logical conclusion drawn from preceding evidence.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Concluding Transitions'
  }, 5),

  // ========== MORE LEVEL 3-5 QUESTIONS ==========
  addRating({
    id: 'sat-eng-091',
    question: 'Which word best replaces "said" in the sentence? "I can\'t believe this!" she said excitedly.',
    options: [
      { letter: 'A', text: 'muttered' },
      { letter: 'B', text: 'exclaimed' },
      { letter: 'C', text: 'whispered' },
      { letter: 'D', text: 'stated' }
    ],
    correctAnswer: 'B',
    explanation: '"Exclaimed" conveys excitement and matches the exclamation point in the quoted speech.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Word Choice'
  }, 3),
  addRating({
    id: 'sat-eng-092',
    question: 'What is the effect of the short sentence "Then it happened" in the narrative?',
    options: [
      { letter: 'A', text: 'It provides detailed information.' },
      { letter: 'B', text: 'It creates suspense and emphasis.' },
      { letter: 'C', text: 'It summarizes the previous paragraph.' },
      { letter: 'D', text: 'It introduces a new character.' }
    ],
    correctAnswer: 'B',
    explanation: 'Short sentences create emphasis and, in narrative, often build suspense.',
    difficulty: 'Easy',
    domain: 'Craft and Structure',
    skill: 'Sentence Effect'
  }, 4),
  addRating({
    id: 'sat-eng-093',
    question: 'Which sentence contains a misplaced modifier? ',
    options: [
      { letter: 'A', text: 'The excited dog chased the ball across the yard.' },
      { letter: 'B', text: 'Running quickly, the finish line came into view.' },
      { letter: 'C', text: 'She carefully arranged the flowers in the vase.' },
      { letter: 'D', text: 'The old man sat peacefully on the bench.' }
    ],
    correctAnswer: 'B',
    explanation: '"Running quickly" should modify a person, not "the finish line."',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Modifier Placement'
  }, 4),
  addRating({
    id: 'sat-eng-094',
    question: 'Which concluding sentence best summarizes a paragraph about the benefits of reading?',
    options: [
      { letter: 'A', text: 'Books are sold in stores and online.' },
      { letter: 'B', text: 'Some people prefer audiobooks.' },
      { letter: 'C', text: 'In summary, reading enhances vocabulary, critical thinking, and empathy.' },
      { letter: 'D', text: 'The library has many books available.' }
    ],
    correctAnswer: 'C',
    explanation: 'A good concluding sentence summarizes the main points about benefits discussed.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Concluding Sentences'
  }, 3),
  addRating({
    id: 'sat-eng-095',
    question: 'Based on context, what does "apprehensive" most likely mean? "She felt apprehensive before her first day at the new school."',
    options: [
      { letter: 'A', text: 'Excited and eager' },
      { letter: 'B', text: 'Anxious or worried' },
      { letter: 'C', text: 'Confident and prepared' },
      { letter: 'D', text: 'Indifferent and bored' }
    ],
    correctAnswer: 'B',
    explanation: 'Starting something new often causes worry, and "apprehensive" means anxious about the future.',
    difficulty: 'Easy',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 3),
  addRating({
    id: 'sat-eng-096',
    question: 'Which revision makes the sentence more formal? "The experiment was like really successful."',
    options: [
      { letter: 'A', text: 'The experiment was super successful.' },
      { letter: 'B', text: 'The experiment was highly successful.' },
      { letter: 'C', text: 'The experiment was way successful.' },
      { letter: 'D', text: 'The experiment was so totally successful.' }
    ],
    correctAnswer: 'B',
    explanation: '"Highly" is a formal intensifier, while "really," "super," and "way" are informal.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Formal Register'
  }, 3),
  addRating({
    id: 'sat-eng-097',
    question: 'Which sentence correctly uses the past perfect tense?',
    options: [
      { letter: 'A', text: 'She had finished her homework before dinner.' },
      { letter: 'B', text: 'She has finished her homework before dinner.' },
      { letter: 'C', text: 'She finished her homework before dinner.' },
      { letter: 'D', text: 'She finishes her homework before dinner.' }
    ],
    correctAnswer: 'A',
    explanation: 'Past perfect ("had finished") indicates one past action completed before another.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Verb Tense'
  }, 4),
  addRating({
    id: 'sat-eng-098',
    question: 'What is the main purpose of a topic sentence?',
    options: [
      { letter: 'A', text: 'To conclude the paragraph' },
      { letter: 'B', text: 'To introduce the main idea of the paragraph' },
      { letter: 'C', text: 'To provide a transition from the previous paragraph' },
      { letter: 'D', text: 'To give an example supporting the thesis' }
    ],
    correctAnswer: 'B',
    explanation: 'Topic sentences introduce the main idea that the paragraph will develop.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Paragraph Structure'
  }, 3),
  addRating({
    id: 'sat-eng-099',
    question: 'Which sentence uses quotation marks correctly?',
    options: [
      { letter: 'A', text: 'She asked, "where are you going"?' },
      { letter: 'B', text: 'She asked, "Where are you going?"' },
      { letter: 'C', text: 'She asked "Where are you going?"' },
      { letter: 'D', text: '"She asked where are you going?"' }
    ],
    correctAnswer: 'B',
    explanation: 'The question mark goes inside the quotation marks, and a comma precedes the quote.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Quotation Marks'
  }, 3),
  addRating({
    id: 'sat-eng-100',
    question: 'Which detail would NOT belong in a paragraph about the benefits of exercise?',
    options: [
      { letter: 'A', text: 'Exercise improves cardiovascular health.' },
      { letter: 'B', text: 'Regular physical activity reduces stress.' },
      { letter: 'C', text: 'Gym memberships can be expensive.' },
      { letter: 'D', text: 'Exercise helps maintain a healthy weight.' }
    ],
    correctAnswer: 'C',
    explanation: 'Cost of gym memberships is about barriers to exercise, not benefits of exercise.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Relevance'
  }, 3),

  // ========== ADDITIONAL LEVEL 8-10 ADVANCED QUESTIONS ==========
  addRating({
    id: 'sat-eng-101',
    question: 'The author\'s juxtaposition of "theoretical elegance" with "practical chaos" most directly serves to:',
    options: [
      { letter: 'A', text: 'Celebrate the beauty of abstract thinking' },
      { letter: 'B', text: 'Highlight the gap between academic models and real-world implementation' },
      { letter: 'C', text: 'Argue that theory is more valuable than practice' },
      { letter: 'D', text: 'Suggest that chaos can be aesthetically pleasing' }
    ],
    correctAnswer: 'B',
    explanation: 'The contrast highlights how theoretical models often fail when applied to complex realities.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Juxtaposition'
  }, 8),
  addRating({
    id: 'sat-eng-102',
    question: 'The phrase "slippery slope" as used in the passage refers to:',
    options: [
      { letter: 'A', text: 'A logical argument that one action will inevitably lead to extreme consequences' },
      { letter: 'B', text: 'A physical hazard requiring caution' },
      { letter: 'C', text: 'An economic trend of gradual decline' },
      { letter: 'D', text: 'A negotiation technique involving gradual concessions' }
    ],
    correctAnswer: 'A',
    explanation: 'A slippery slope is a logical fallacy suggesting inevitable progression to extreme outcomes.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Logical Fallacies'
  }, 8),
  addRating({
    id: 'sat-eng-103',
    question: 'In context, the author\'s description of the policy as "well-intentioned but myopic" suggests:',
    options: [
      { letter: 'A', text: 'The policy was both visionary and practical' },
      { letter: 'B', text: 'The policy had good aims but failed to consider long-term or broader implications' },
      { letter: 'C', text: 'The policy was deliberately deceptive' },
      { letter: 'D', text: 'The policy was harshly criticized by experts' }
    ],
    correctAnswer: 'B',
    explanation: '"Well-intentioned" acknowledges good motives; "myopic" (short-sighted) criticizes limited scope.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Nuanced Critique'
  }, 8),
  addRating({
    id: 'sat-eng-104',
    question: 'The author\'s extended metaphor comparing bureaucracy to "a labyrinth with no center" suggests that:',
    options: [
      { letter: 'A', text: 'Bureaucratic systems are deliberately confusing' },
      { letter: 'B', text: 'Navigating bureaucracy is challenging and often lacks clear goals or endpoints' },
      { letter: 'C', text: 'The Minotaur myth is relevant to modern governance' },
      { letter: 'D', text: 'Administrative processes should be studied in literature classes' }
    ],
    correctAnswer: 'B',
    explanation: 'A labyrinth without a center suggests complexity without purpose or resolution.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Extended Metaphor'
  }, 9),
  addRating({
    id: 'sat-eng-105',
    question: 'The passage suggests that the tension between individual rights and collective welfare:',
    options: [
      { letter: 'A', text: 'Has been definitively resolved in favor of individual rights' },
      { letter: 'B', text: 'Is a false dichotomy created by political extremists' },
      { letter: 'C', text: 'Requires ongoing negotiation and case-by-case consideration' },
      { letter: 'D', text: 'Is irrelevant to contemporary policy debates' }
    ],
    correctAnswer: 'C',
    explanation: 'The author presents this as a persistent tension requiring contextual judgment rather than absolute rules.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Philosophical Tensions'
  }, 9),
  addRating({
    id: 'sat-eng-106',
    question: 'The author\'s acknowledgment that "reasonable people may disagree" primarily serves to:',
    options: [
      { letter: 'A', text: 'Weaken the author\'s argument' },
      { letter: 'B', text: 'Demonstrate intellectual humility while maintaining a clear position' },
      { letter: 'C', text: 'Suggest the author has no opinion on the matter' },
      { letter: 'D', text: 'Dismiss opposing viewpoints as unreasonable' }
    ],
    correctAnswer: 'B',
    explanation: 'This phrase shows respect for differing views while the author continues to argue a position.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Concession'
  }, 8),
  addRating({
    id: 'sat-eng-107',
    question: 'Based on the passage, the concept of "regulatory capture" refers to:',
    options: [
      { letter: 'A', text: 'Government agencies effectively enforcing regulations' },
      { letter: 'B', text: 'Regulated industries gaining undue influence over their regulators' },
      { letter: 'C', text: 'Citizens participating in the regulatory process' },
      { letter: 'D', text: 'International bodies superseding national regulations' }
    ],
    correctAnswer: 'B',
    explanation: 'Regulatory capture occurs when agencies meant to regulate an industry instead serve its interests.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Specialized Concepts'
  }, 9),
  addRating({
    id: 'sat-eng-108',
    question: 'The author\'s invocation of "the law of unintended consequences" suggests:',
    options: [
      { letter: 'A', text: 'Legal systems are fundamentally unpredictable' },
      { letter: 'B', text: 'Actions often produce unexpected results beyond their intended effects' },
      { letter: 'C', text: 'Consequences can never be anticipated' },
      { letter: 'D', text: 'Laws should not be passed without perfect foresight' }
    ],
    correctAnswer: 'B',
    explanation: 'This concept warns that interventions may have effects other than those intended.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Conceptual Frameworks'
  }, 8),
  addRating({
    id: 'sat-eng-109',
    question: 'Which statement best describes the passage\'s overall argumentative strategy?',
    options: [
      { letter: 'A', text: 'It presents a single perspective without considering alternatives.' },
      { letter: 'B', text: 'It builds a cumulative case through evidence while acknowledging complexity.' },
      { letter: 'C', text: 'It relies primarily on emotional appeals to persuade readers.' },
      { letter: 'D', text: 'It dismisses all opposing viewpoints as uninformed.' }
    ],
    correctAnswer: 'B',
    explanation: 'Effective academic arguments build cases through evidence while showing awareness of nuance.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Argumentative Strategy'
  }, 9),
  addRating({
    id: 'sat-eng-110',
    question: 'The phrase "the plural of anecdote is not data" in the passage serves to:',
    options: [
      { letter: 'A', text: 'Encourage the use of personal stories in research' },
      { letter: 'B', text: 'Caution against drawing broad conclusions from individual cases' },
      { letter: 'C', text: 'Suggest that qualitative research is superior to quantitative' },
      { letter: 'D', text: 'Define technical vocabulary for general readers' }
    ],
    correctAnswer: 'B',
    explanation: 'This aphorism warns that accumulating anecdotes does not constitute reliable evidence.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Methodological Critique'
  }, 10),
  addRating({
    id: 'sat-eng-111',
    question: 'The author\'s assertion that "correlation does not imply causation" is invoked to:',
    options: [
      { letter: 'A', text: 'Suggest that statistical analysis is meaningless' },
      { letter: 'B', text: 'Warn against inferring causal relationships from observed associations' },
      { letter: 'C', text: 'Argue that all scientific claims are unreliable' },
      { letter: 'D', text: 'Support the study\'s conclusions' }
    ],
    correctAnswer: 'B',
    explanation: 'This principle cautions that two things occurring together does not mean one causes the other.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Statistical Reasoning'
  }, 9),
  addRating({
    id: 'sat-eng-112',
    question: 'The passage\'s critique of "whataboutism" refers to a rhetorical tactic that:',
    options: [
      { letter: 'A', text: 'Responds to criticism by citing the opponent\'s flaws' },
      { letter: 'B', text: 'Asks clarifying questions to understand an argument' },
      { letter: 'C', text: 'Presents hypothetical scenarios to test principles' },
      { letter: 'D', text: 'Summarizes opposing views before refuting them' }
    ],
    correctAnswer: 'A',
    explanation: 'Whataboutism deflects criticism by pointing to others\' similar or worse behavior.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Fallacies'
  }, 10),
  addRating({
    id: 'sat-eng-113',
    question: 'The author\'s distinction between "procedural" and "substantive" justice primarily serves to:',
    options: [
      { letter: 'A', text: 'Demonstrate familiarity with legal terminology' },
      { letter: 'B', text: 'Argue that only one form of justice matters' },
      { letter: 'C', text: 'Show that following rules may not always lead to fair outcomes' },
      { letter: 'D', text: 'Suggest that justice is an outdated concept' }
    ],
    correctAnswer: 'C',
    explanation: 'Procedural justice (following rules) may differ from substantive justice (fair outcomes).',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Conceptual Distinctions'
  }, 10),
  addRating({
    id: 'sat-eng-114',
    question: 'The passage suggests that the author views technological determinism—the idea that technology shapes society rather than vice versa—as:',
    options: [
      { letter: 'A', text: 'The only valid framework for understanding innovation' },
      { letter: 'B', text: 'An oversimplification that ignores human agency and social context' },
      { letter: 'C', text: 'A theory supported by all available evidence' },
      { letter: 'D', text: 'A concept irrelevant to contemporary debates' }
    ],
    correctAnswer: 'B',
    explanation: 'The author emphasizes that technology and society mutually shape each other, not one-way causation.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Evaluating Frameworks'
  }, 10),
  addRating({
    id: 'sat-eng-115',
    question: 'The author\'s use of the phrase "false dichotomy" implies that:',
    options: [
      { letter: 'A', text: 'All dichotomies in academic discourse are invalid' },
      { letter: 'B', text: 'The presented either/or choice ignores viable middle positions or alternatives' },
      { letter: 'C', text: 'The two options are genuinely the only possibilities' },
      { letter: 'D', text: 'Logical analysis is impossible in this field' }
    ],
    correctAnswer: 'B',
    explanation: 'A false dichotomy presents only two options when more exist, oversimplifying complex issues.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Logical Fallacies'
  }, 9),

  // ========== ADDITIONAL READING COMPREHENSION ==========
  addRating({
    id: 'sat-eng-116',
    question: 'Based on the passage, the author\'s primary purpose is to:',
    options: [
      { letter: 'A', text: 'Entertain readers with an amusing story' },
      { letter: 'B', text: 'Analyze the causes and effects of a social phenomenon' },
      { letter: 'C', text: 'Provide step-by-step instructions for a process' },
      { letter: 'D', text: 'Compare two unrelated topics' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage systematically examines what causes the phenomenon and its resulting impacts.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Author\'s Purpose'
  }, 5),
  addRating({
    id: 'sat-eng-117',
    question: 'The author includes the historical anecdote in paragraph 2 primarily to:',
    options: [
      { letter: 'A', text: 'Show that history is more interesting than the present' },
      { letter: 'B', text: 'Provide context for understanding current trends' },
      { letter: 'C', text: 'Criticize historical figures' },
      { letter: 'D', text: 'Fill space in the passage' }
    ],
    correctAnswer: 'B',
    explanation: 'Historical background helps readers understand how current situations developed.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Function of Examples'
  }, 5),
  addRating({
    id: 'sat-eng-118',
    question: 'Which statement best describes how the author develops the argument?',
    options: [
      { letter: 'A', text: 'By presenting personal opinions without evidence' },
      { letter: 'B', text: 'By citing research findings and expert opinions' },
      { letter: 'C', text: 'By attacking opponents rather than addressing issues' },
      { letter: 'D', text: 'By repeating the same point multiple times' }
    ],
    correctAnswer: 'B',
    explanation: 'Effective arguments build on evidence from research and authoritative sources.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Argument Development'
  }, 5),
  addRating({
    id: 'sat-eng-119',
    question: 'What can be inferred about the author\'s intended audience?',
    options: [
      { letter: 'A', text: 'Young children with no background knowledge' },
      { letter: 'B', text: 'Experts with highly specialized knowledge' },
      { letter: 'C', text: 'General readers with some familiarity with the topic' },
      { letter: 'D', text: 'People who oppose the author\'s view' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage explains concepts but assumes some baseline understanding, suggesting general readers.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Audience Awareness'
  }, 6),
  addRating({
    id: 'sat-eng-120',
    question: 'According to the passage, which factor most significantly contributed to the outcome?',
    options: [
      { letter: 'A', text: 'Individual effort and determination' },
      { letter: 'B', text: 'Favorable economic conditions' },
      { letter: 'C', text: 'A combination of policy changes and social movements' },
      { letter: 'D', text: 'Pure chance and coincidence' }
    ],
    correctAnswer: 'C',
    explanation: 'The passage emphasizes multiple factors working together, particularly policy and social forces.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Identifying Causes'
  }, 6),
  addRating({
    id: 'sat-eng-121',
    question: 'The author\'s attitude toward the subject can best be described as:',
    options: [
      { letter: 'A', text: 'Dismissive and uninterested' },
      { letter: 'B', text: 'Engaged and analytical' },
      { letter: 'C', text: 'Hostile and combative' },
      { letter: 'D', text: 'Confused and uncertain' }
    ],
    correctAnswer: 'B',
    explanation: 'The author carefully examines evidence and draws conclusions, showing engaged analysis.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Author\'s Attitude'
  }, 5),
  addRating({
    id: 'sat-eng-122',
    question: 'Which phrase from the passage signals a shift in the argument?',
    options: [
      { letter: 'A', text: 'For example' },
      { letter: 'B', text: 'However' },
      { letter: 'C', text: 'In addition' },
      { letter: 'D', text: 'Similarly' }
    ],
    correctAnswer: 'B',
    explanation: '"However" signals contrast or a pivot to a different perspective in the argument.',
    difficulty: 'Easy',
    domain: 'Craft and Structure',
    skill: 'Transition Words'
  }, 4),
  addRating({
    id: 'sat-eng-123',
    question: 'The word "phenomenon" as used in the passage most nearly means:',
    options: [
      { letter: 'A', text: 'A magical occurrence' },
      { letter: 'B', text: 'An observable fact or event' },
      { letter: 'C', text: 'A scientific theory' },
      { letter: 'D', text: 'An optical illusion' }
    ],
    correctAnswer: 'B',
    explanation: 'In academic contexts, "phenomenon" refers to an observable occurrence or set of circumstances.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 4),
  addRating({
    id: 'sat-eng-124',
    question: 'Which sentence provides the strongest evidence for the author\'s main claim?',
    options: [
      { letter: 'A', text: '"Many people believe this to be true."' },
      { letter: 'B', text: '"A longitudinal study of 10,000 participants found significant correlations."' },
      { letter: 'C', text: '"This has always been the case throughout history."' },
      { letter: 'D', text: '"Experts agree that more research is needed."' }
    ],
    correctAnswer: 'B',
    explanation: 'Specific research with large sample sizes provides stronger evidence than vague claims.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Evidence Strength'
  }, 6),
  addRating({
    id: 'sat-eng-125',
    question: 'The author concludes the passage by:',
    options: [
      { letter: 'A', text: 'Introducing a completely new topic' },
      { letter: 'B', text: 'Contradicting everything stated earlier' },
      { letter: 'C', text: 'Synthesizing the main points and suggesting implications' },
      { letter: 'D', text: 'Asking an unanswerable question' }
    ],
    correctAnswer: 'C',
    explanation: 'Effective conclusions synthesize the argument and point toward significance or next steps.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Conclusion Analysis'
  }, 5),

  // ========== FINAL BATCH: MIXED LEVELS ==========
  addRating({
    id: 'sat-eng-126',
    question: 'Which sentence correctly uses the subjunctive mood?',
    options: [
      { letter: 'A', text: 'I wish I was taller.' },
      { letter: 'B', text: 'I wish I were taller.' },
      { letter: 'C', text: 'I wish I am taller.' },
      { letter: 'D', text: 'I wish I be taller.' }
    ],
    correctAnswer: 'B',
    explanation: 'The subjunctive "were" is used for hypothetical or contrary-to-fact conditions.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Subjunctive Mood'
  }, 6),
  addRating({
    id: 'sat-eng-127',
    question: 'Which sentence demonstrates correct use of the semicolon?',
    options: [
      { letter: 'A', text: 'I went to the store; to buy groceries.' },
      { letter: 'B', text: 'I went to the store; I bought groceries.' },
      { letter: 'C', text: 'I went; to the store to buy groceries.' },
      { letter: 'D', text: 'I; went to the store to buy groceries.' }
    ],
    correctAnswer: 'B',
    explanation: 'Semicolons join two independent clauses that are closely related.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Semicolon Usage'
  }, 4),
  addRating({
    id: 'sat-eng-128',
    question: 'The passage\'s organization follows which pattern?',
    options: [
      { letter: 'A', text: 'General to specific' },
      { letter: 'B', text: 'Specific to general' },
      { letter: 'C', text: 'Random order' },
      { letter: 'D', text: 'Reverse chronological' }
    ],
    correctAnswer: 'A',
    explanation: 'The passage begins with a broad overview and progressively provides more detailed examples.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Organization Pattern'
  }, 5),
  addRating({
    id: 'sat-eng-129',
    question: 'Which revision corrects the sentence fragment? "Because the weather was bad."',
    options: [
      { letter: 'A', text: 'Because the weather was bad, we stayed home.' },
      { letter: 'B', text: 'Because the weather was bad it.' },
      { letter: 'C', text: 'Because the weather. Was bad.' },
      { letter: 'D', text: 'The weather was bad. Because.' }
    ],
    correctAnswer: 'A',
    explanation: 'Adding an independent clause ("we stayed home") completes the sentence.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Sentence Fragments'
  }, 3),
  addRating({
    id: 'sat-eng-130',
    question: 'Based on the graph, which claim from the passage is best supported?',
    options: [
      { letter: 'A', text: 'Participation rates have remained constant.' },
      { letter: 'B', text: 'Participation rates increased steadily from 2010 to 2020.' },
      { letter: 'C', text: 'Participation rates declined sharply after 2015.' },
      { letter: 'D', text: 'No clear trend is visible in the data.' }
    ],
    correctAnswer: 'B',
    explanation: 'The graph shows a consistent upward trend during the specified time period.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Graph Interpretation'
  }, 5),
  addRating({
    id: 'sat-eng-131',
    question: 'Which word best completes the sentence to maintain formal tone? "The study\'s findings were ___ by subsequent research."',
    options: [
      { letter: 'A', text: 'trashed' },
      { letter: 'B', text: 'corroborated' },
      { letter: 'C', text: 'okay-ed' },
      { letter: 'D', text: 'totally backed up' }
    ],
    correctAnswer: 'B',
    explanation: '"Corroborated" is a formal term meaning confirmed or supported by additional evidence.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Academic Vocabulary'
  }, 6),
  addRating({
    id: 'sat-eng-132',
    question: 'The author uses the word "ostensibly" to suggest that:',
    options: [
      { letter: 'A', text: 'Something is exactly as it appears' },
      { letter: 'B', text: 'Something appears to be true but may not be' },
      { letter: 'C', text: 'Something is definitely false' },
      { letter: 'D', text: 'Something requires no further investigation' }
    ],
    correctAnswer: 'B',
    explanation: '"Ostensibly" means apparently or seemingly, implying possible discrepancy with reality.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 7),
  addRating({
    id: 'sat-eng-133',
    question: 'Which sentence correctly uses a dash?',
    options: [
      { letter: 'A', text: 'The result-was surprising.' },
      { letter: 'B', text: 'The result—surprisingly positive—exceeded expectations.' },
      { letter: 'C', text: 'The result was surprising-.' },
      { letter: 'D', text: '-The result was surprising.' }
    ],
    correctAnswer: 'B',
    explanation: 'Dashes set off parenthetical information for emphasis; they must be used in pairs.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Dash Usage'
  }, 5),
  addRating({
    id: 'sat-eng-134',
    question: 'The author\'s repeated use of rhetorical questions in the passage primarily serves to:',
    options: [
      { letter: 'A', text: 'Demonstrate ignorance about the topic' },
      { letter: 'B', text: 'Engage readers and encourage them to consider key issues' },
      { letter: 'C', text: 'Avoid taking a position on controversial matters' },
      { letter: 'D', text: 'Fill space when the author has nothing else to say' }
    ],
    correctAnswer: 'B',
    explanation: 'Rhetorical questions involve readers actively by prompting reflection on important points.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Questions'
  }, 6),
  addRating({
    id: 'sat-eng-135',
    question: 'According to the passage, the primary limitation of the study was:',
    options: [
      { letter: 'A', text: 'Researchers were biased toward certain outcomes.' },
      { letter: 'B', text: 'The sample size was too small to draw generalizable conclusions.' },
      { letter: 'C', text: 'The study took too long to complete.' },
      { letter: 'D', text: 'The research questions were poorly formulated.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explicitly notes that the limited sample restricts how widely findings can be applied.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Identifying Limitations'
  }, 6),
  addRating({
    id: 'sat-eng-136',
    question: 'Which revision eliminates the double negative? "I don\'t have no money."',
    options: [
      { letter: 'A', text: 'I don\'t have any money.' },
      { letter: 'B', text: 'I don\'t got no money.' },
      { letter: 'C', text: 'I haven\'t got no money.' },
      { letter: 'D', text: 'I ain\'t got no money.' }
    ],
    correctAnswer: 'A',
    explanation: '"Any" replaces "no" to eliminate the double negative while maintaining the intended meaning.',
    difficulty: 'Easy',
    domain: 'Standard English Conventions',
    skill: 'Double Negatives'
  }, 2),
  addRating({
    id: 'sat-eng-137',
    question: 'The author\'s use of understatement in describing the disaster as "somewhat inconvenient" serves to:',
    options: [
      { letter: 'A', text: 'Minimize the importance of the event' },
      { letter: 'B', text: 'Create ironic emphasis on the event\'s severity' },
      { letter: 'C', text: 'Show that the author was unaffected' },
      { letter: 'D', text: 'Demonstrate poor word choice' }
    ],
    correctAnswer: 'B',
    explanation: 'Understatement creates irony by describing something serious in deliberately mild terms.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Understatement'
  }, 8),
  addRating({
    id: 'sat-eng-138',
    question: 'Which choice best maintains the paragraph\'s focus on environmental benefits?',
    options: [
      { letter: 'A', text: 'Solar panels are manufactured in several countries.' },
      { letter: 'B', text: 'Solar energy reduces greenhouse gas emissions significantly.' },
      { letter: 'C', text: 'Solar companies employ many workers.' },
      { letter: 'D', text: 'Some people find solar panels unattractive.' }
    ],
    correctAnswer: 'B',
    explanation: 'Reducing emissions is an environmental benefit; other options address different topics.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Focus and Coherence'
  }, 4),
  addRating({
    id: 'sat-eng-139',
    question: 'The word "exacerbate" in the passage most nearly means:',
    options: [
      { letter: 'A', text: 'To improve or enhance' },
      { letter: 'B', text: 'To make worse or more severe' },
      { letter: 'C', text: 'To explain in detail' },
      { letter: 'D', text: 'To begin or initiate' }
    ],
    correctAnswer: 'B',
    explanation: '"Exacerbate" means to worsen or intensify a problem or negative situation.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Vocabulary in Context'
  }, 5),
  addRating({
    id: 'sat-eng-140',
    question: 'The author\'s claim that the policy "pays lip service to" reform suggests that:',
    options: [
      { letter: 'A', text: 'The policy strongly supports reform' },
      { letter: 'B', text: 'The policy verbally endorses reform without meaningful action' },
      { letter: 'C', text: 'The policy effectively implements reform' },
      { letter: 'D', text: 'The policy silently opposes reform' }
    ],
    correctAnswer: 'B',
    explanation: '"Pays lip service" means expressing support without taking corresponding action.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Idioms'
  }, 7),
  addRating({
    id: 'sat-eng-141',
    question: 'Which sentence demonstrates correct parallel structure?',
    options: [
      { letter: 'A', text: 'She enjoys reading, writing, and to paint.' },
      { letter: 'B', text: 'She enjoys reading, writing, and painting.' },
      { letter: 'C', text: 'She enjoys to read, writing, and painting.' },
      { letter: 'D', text: 'She enjoys reading, to write, and painting.' }
    ],
    correctAnswer: 'B',
    explanation: 'All items in a list should have the same grammatical form (gerunds).',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Parallel Structure'
  }, 4),
  addRating({
    id: 'sat-eng-142',
    question: 'The passage suggests that technological innovation often:',
    options: [
      { letter: 'A', text: 'Solves all problems without creating new ones' },
      { letter: 'B', text: 'Creates new challenges while addressing existing ones' },
      { letter: 'C', text: 'Has no significant impact on society' },
      { letter: 'D', text: 'Should be avoided whenever possible' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage emphasizes that innovation typically involves trade-offs and new challenges.',
    difficulty: 'Medium',
    domain: 'Information and Ideas',
    skill: 'Central Ideas'
  }, 6),
  addRating({
    id: 'sat-eng-143',
    question: 'Which choice provides the most logical conclusion for the paragraph?',
    options: [
      { letter: 'A', text: 'In conclusion, more research is clearly needed in unrelated fields.' },
      { letter: 'B', text: 'Therefore, addressing this issue requires coordinated action from multiple stakeholders.' },
      { letter: 'C', text: 'However, none of this really matters.' },
      { letter: 'D', text: 'Meanwhile, other topics deserve more attention.' }
    ],
    correctAnswer: 'B',
    explanation: 'The conclusion should follow logically from the paragraph\'s discussion of the issue.',
    difficulty: 'Medium',
    domain: 'Expression of Ideas',
    skill: 'Logical Conclusions'
  }, 5),
  addRating({
    id: 'sat-eng-144',
    question: 'The author refers to the "elephant in the room" to:',
    options: [
      { letter: 'A', text: 'Discuss zoo conservation efforts' },
      { letter: 'B', text: 'Address an obvious problem that others have avoided discussing' },
      { letter: 'C', text: 'Describe the room\'s physical layout' },
      { letter: 'D', text: 'Criticize excessive focus on wildlife' }
    ],
    correctAnswer: 'B',
    explanation: 'This idiom refers to a significant issue that is being ignored or avoided in discussion.',
    difficulty: 'Medium',
    domain: 'Craft and Structure',
    skill: 'Idioms'
  }, 5),
  addRating({
    id: 'sat-eng-145',
    question: 'Which word best replaces "bad" to increase precision? "The company made bad decisions last year."',
    options: [
      { letter: 'A', text: 'evil' },
      { letter: 'B', text: 'poor' },
      { letter: 'C', text: 'weird' },
      { letter: 'D', text: 'random' }
    ],
    correctAnswer: 'B',
    explanation: '"Poor" is more precise for describing business decisions of low quality or judgment.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Word Choice'
  }, 3),
  addRating({
    id: 'sat-eng-146',
    question: 'The author\'s acknowledgment of limitations in the argument primarily serves to:',
    options: [
      { letter: 'A', text: 'Undermine the entire thesis' },
      { letter: 'B', text: 'Demonstrate intellectual honesty and strengthen credibility' },
      { letter: 'C', text: 'Confuse readers about the main point' },
      { letter: 'D', text: 'Shift blame to other researchers' }
    ],
    correctAnswer: 'B',
    explanation: 'Acknowledging limitations shows awareness of complexity and builds trust with readers.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Rhetorical Choices'
  }, 7),
  addRating({
    id: 'sat-eng-147',
    question: 'Which sentence correctly uses an appositive?',
    options: [
      { letter: 'A', text: 'My brother, a talented musician plays piano.' },
      { letter: 'B', text: 'My brother, a talented musician, plays piano.' },
      { letter: 'C', text: 'My brother a talented musician, plays piano.' },
      { letter: 'D', text: 'My, brother a talented musician plays piano.' }
    ],
    correctAnswer: 'B',
    explanation: 'Appositives are set off by commas on both sides when they add non-essential information.',
    difficulty: 'Medium',
    domain: 'Standard English Conventions',
    skill: 'Appositives'
  }, 4),
  addRating({
    id: 'sat-eng-148',
    question: 'The author\'s use of passive voice in this paragraph is most likely intended to:',
    options: [
      { letter: 'A', text: 'Hide who performed the actions' },
      { letter: 'B', text: 'Emphasize the actions rather than the actors' },
      { letter: 'C', text: 'Demonstrate grammatical confusion' },
      { letter: 'D', text: 'Make the writing more casual' }
    ],
    correctAnswer: 'B',
    explanation: 'Passive voice can shift focus to actions or results when actors are less important.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Voice'
  }, 7),
  addRating({
    id: 'sat-eng-149',
    question: 'Which transition best introduces an example? "___, many species have adapted to urban environments."',
    options: [
      { letter: 'A', text: 'In contrast' },
      { letter: 'B', text: 'For instance' },
      { letter: 'C', text: 'Nevertheless' },
      { letter: 'D', text: 'Subsequently' }
    ],
    correctAnswer: 'B',
    explanation: '"For instance" signals that an example follows to illustrate a previous point.',
    difficulty: 'Easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions'
  }, 3),
  addRating({
    id: 'sat-eng-150',
    question: 'Based on the passage, the author would most likely support:',
    options: [
      { letter: 'A', text: 'Immediate and radical policy changes' },
      { letter: 'B', text: 'Carefully evaluated, evidence-based reforms' },
      { letter: 'C', text: 'Maintaining the current system without changes' },
      { letter: 'D', text: 'Eliminating all government intervention' }
    ],
    correctAnswer: 'B',
    explanation: 'The author emphasizes evidence-based approaches and caution about unintended consequences.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Author\'s Position'
  }, 8),
];
