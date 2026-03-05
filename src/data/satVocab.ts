/**
 * SAT Vocabulary Bank for Spaced Repetition
 * 200 high-frequency SAT words with definitions, usage, and difficulty
 */

export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  example: string;
  synonyms: string[];
  difficulty: number; // 1-5
  category: 'common' | 'advanced' | 'elite';
}

export const SAT_VOCAB_WORDS: VocabWord[] = [
  // Common (difficulty 1-2)
  { id: 'v001', word: 'Ambiguous', definition: 'Open to more than one interpretation; not having one obvious meaning', partOfSpeech: 'adj', example: 'The politician\'s ambiguous statement left voters confused.', synonyms: ['vague', 'unclear', 'equivocal'], difficulty: 1, category: 'common' },
  { id: 'v002', word: 'Benevolent', definition: 'Well-meaning and kindly', partOfSpeech: 'adj', example: 'The benevolent donor funded scholarships for underprivileged students.', synonyms: ['kind', 'generous', 'charitable'], difficulty: 1, category: 'common' },
  { id: 'v003', word: 'Candid', definition: 'Truthful and straightforward; frank', partOfSpeech: 'adj', example: 'She gave a candid interview about her struggles.', synonyms: ['honest', 'frank', 'forthright'], difficulty: 1, category: 'common' },
  { id: 'v004', word: 'Diligent', definition: 'Having or showing care and conscientiousness in one\'s work', partOfSpeech: 'adj', example: 'The diligent student reviewed her notes every evening.', synonyms: ['industrious', 'meticulous', 'assiduous'], difficulty: 1, category: 'common' },
  { id: 'v005', word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', partOfSpeech: 'adj', example: 'The eloquent speech moved the audience to tears.', synonyms: ['articulate', 'expressive', 'fluent'], difficulty: 1, category: 'common' },
  { id: 'v006', word: 'Frugal', definition: 'Sparing or economical with regard to money or food', partOfSpeech: 'adj', example: 'Her frugal habits allowed her to save for college.', synonyms: ['thrifty', 'economical', 'prudent'], difficulty: 1, category: 'common' },
  { id: 'v007', word: 'Gregarious', definition: 'Fond of company; sociable', partOfSpeech: 'adj', example: 'The gregarious host made everyone feel welcome.', synonyms: ['sociable', 'outgoing', 'convivial'], difficulty: 2, category: 'common' },
  { id: 'v008', word: 'Hypothetical', definition: 'Based on an assumed scenario rather than fact', partOfSpeech: 'adj', example: 'The teacher posed a hypothetical situation for debate.', synonyms: ['theoretical', 'supposed', 'speculative'], difficulty: 1, category: 'common' },
  { id: 'v009', word: 'Impartial', definition: 'Treating all rivals or disputants equally; fair and just', partOfSpeech: 'adj', example: 'The judge remained impartial throughout the trial.', synonyms: ['unbiased', 'neutral', 'objective'], difficulty: 1, category: 'common' },
  { id: 'v010', word: 'Jovial', definition: 'Cheerful and friendly', partOfSpeech: 'adj', example: 'His jovial personality made him popular at parties.', synonyms: ['cheerful', 'merry', 'jolly'], difficulty: 1, category: 'common' },
  { id: 'v011', word: 'Keen', definition: 'Eager or enthusiastic; sharp', partOfSpeech: 'adj', example: 'She had a keen interest in marine biology.', synonyms: ['eager', 'enthusiastic', 'sharp'], difficulty: 1, category: 'common' },
  { id: 'v012', word: 'Lament', definition: 'A passionate expression of grief or sorrow', partOfSpeech: 'n/v', example: 'The community lamented the loss of the historic building.', synonyms: ['mourn', 'grieve', 'bemoan'], difficulty: 2, category: 'common' },
  { id: 'v013', word: 'Meticulous', definition: 'Showing great attention to detail; very careful and precise', partOfSpeech: 'adj', example: 'The meticulous researcher double-checked every citation.', synonyms: ['thorough', 'precise', 'painstaking'], difficulty: 2, category: 'common' },
  { id: 'v014', word: 'Nuance', definition: 'A subtle difference in meaning, expression, or sound', partOfSpeech: 'n', example: 'The translator captured every nuance of the original text.', synonyms: ['subtlety', 'shade', 'distinction'], difficulty: 2, category: 'common' },
  { id: 'v015', word: 'Obsolete', definition: 'No longer produced or used; out of date', partOfSpeech: 'adj', example: 'Typewriters have become largely obsolete.', synonyms: ['outdated', 'antiquated', 'archaic'], difficulty: 1, category: 'common' },
  { id: 'v016', word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically', partOfSpeech: 'adj', example: 'The pragmatic leader focused on achievable goals.', synonyms: ['practical', 'realistic', 'sensible'], difficulty: 2, category: 'common' },
  { id: 'v017', word: 'Resilient', definition: 'Able to withstand or recover quickly from difficult conditions', partOfSpeech: 'adj', example: 'The resilient community rebuilt after the hurricane.', synonyms: ['tough', 'hardy', 'adaptable'], difficulty: 1, category: 'common' },
  { id: 'v018', word: 'Skeptical', definition: 'Not easily convinced; having doubts', partOfSpeech: 'adj', example: 'Scientists remained skeptical of the unverified claims.', synonyms: ['doubtful', 'dubious', 'questioning'], difficulty: 1, category: 'common' },
  { id: 'v019', word: 'Tenacious', definition: 'Tending to keep a firm hold; persistent', partOfSpeech: 'adj', example: 'The tenacious reporter pursued the story for months.', synonyms: ['persistent', 'determined', 'dogged'], difficulty: 2, category: 'common' },
  { id: 'v020', word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere', partOfSpeech: 'adj', example: 'Smartphones have become ubiquitous in modern society.', synonyms: ['omnipresent', 'pervasive', 'universal'], difficulty: 2, category: 'common' },
  
  // Advanced (difficulty 3-4)
  { id: 'v021', word: 'Abate', definition: 'To become less intense or widespread', partOfSpeech: 'v', example: 'The storm finally began to abate after midnight.', synonyms: ['diminish', 'subside', 'wane'], difficulty: 3, category: 'advanced' },
  { id: 'v022', word: 'Bolster', definition: 'To support or strengthen; prop up', partOfSpeech: 'v', example: 'New evidence bolstered the prosecution\'s case.', synonyms: ['reinforce', 'fortify', 'buttress'], difficulty: 3, category: 'advanced' },
  { id: 'v023', word: 'Cogent', definition: 'Clear, logical, and convincing', partOfSpeech: 'adj', example: 'She presented a cogent argument for policy reform.', synonyms: ['compelling', 'convincing', 'persuasive'], difficulty: 3, category: 'advanced' },
  { id: 'v024', word: 'Delineate', definition: 'To describe or portray precisely', partOfSpeech: 'v', example: 'The contract delineates each party\'s responsibilities.', synonyms: ['outline', 'describe', 'define'], difficulty: 3, category: 'advanced' },
  { id: 'v025', word: 'Ephemeral', definition: 'Lasting for a very short time', partOfSpeech: 'adj', example: 'The beauty of cherry blossoms is ephemeral.', synonyms: ['fleeting', 'transient', 'momentary'], difficulty: 3, category: 'advanced' },
  { id: 'v026', word: 'Facetious', definition: 'Treating serious issues with deliberately inappropriate humor', partOfSpeech: 'adj', example: 'His facetious remarks during the meeting angered his colleagues.', synonyms: ['flippant', 'glib', 'tongue-in-cheek'], difficulty: 3, category: 'advanced' },
  { id: 'v027', word: 'Galvanize', definition: 'To shock or excite someone into taking action', partOfSpeech: 'v', example: 'The tragedy galvanized the community into demanding reforms.', synonyms: ['stimulate', 'spur', 'catalyze'], difficulty: 3, category: 'advanced' },
  { id: 'v028', word: 'Harbinger', definition: 'A person or thing that announces the approach of another', partOfSpeech: 'n', example: 'Robins are often considered harbingers of spring.', synonyms: ['herald', 'forerunner', 'precursor'], difficulty: 4, category: 'advanced' },
  { id: 'v029', word: 'Iconoclast', definition: 'A person who attacks cherished beliefs or institutions', partOfSpeech: 'n', example: 'The iconoclast challenged centuries of artistic tradition.', synonyms: ['rebel', 'dissenter', 'nonconformist'], difficulty: 4, category: 'advanced' },
  { id: 'v030', word: 'Juxtapose', definition: 'To place close together for contrasting effect', partOfSpeech: 'v', example: 'The exhibit juxtaposes modern art with classical sculptures.', synonyms: ['contrast', 'compare', 'set side by side'], difficulty: 3, category: 'advanced' },
  { id: 'v031', word: 'Laconic', definition: 'Using very few words', partOfSpeech: 'adj', example: 'The laconic reply hinted at deeper frustration.', synonyms: ['terse', 'concise', 'succinct'], difficulty: 4, category: 'advanced' },
  { id: 'v032', word: 'Mitigate', definition: 'To make less severe, serious, or painful', partOfSpeech: 'v', example: 'Wearing sunscreen mitigates the risk of skin damage.', synonyms: ['alleviate', 'lessen', 'diminish'], difficulty: 3, category: 'advanced' },
  { id: 'v033', word: 'Nefarious', definition: 'Wicked or criminal', partOfSpeech: 'adj', example: 'The villain\'s nefarious plot was uncovered by the detective.', synonyms: ['wicked', 'villainous', 'heinous'], difficulty: 3, category: 'advanced' },
  { id: 'v034', word: 'Obfuscate', definition: 'To render obscure, unclear, or unintelligible', partOfSpeech: 'v', example: 'The politician tried to obfuscate the issue with jargon.', synonyms: ['confuse', 'obscure', 'muddle'], difficulty: 4, category: 'advanced' },
  { id: 'v035', word: 'Paradox', definition: 'A seemingly contradictory statement that may nonetheless be true', partOfSpeech: 'n', example: 'It is a paradox that standing still can be progress.', synonyms: ['contradiction', 'anomaly', 'puzzle'], difficulty: 3, category: 'advanced' },
  { id: 'v036', word: 'Quagmire', definition: 'An awkward, complex, or hazardous situation', partOfSpeech: 'n', example: 'The project became a bureaucratic quagmire.', synonyms: ['predicament', 'muddle', 'morass'], difficulty: 4, category: 'advanced' },
  { id: 'v037', word: 'Recalcitrant', definition: 'Having an obstinately uncooperative attitude', partOfSpeech: 'adj', example: 'The recalcitrant student refused to follow instructions.', synonyms: ['defiant', 'unruly', 'stubborn'], difficulty: 4, category: 'advanced' },
  { id: 'v038', word: 'Sanguine', definition: 'Optimistic or positive, especially in a difficult situation', partOfSpeech: 'adj', example: 'She remained sanguine despite the setbacks.', synonyms: ['optimistic', 'hopeful', 'confident'], difficulty: 4, category: 'advanced' },
  { id: 'v039', word: 'Taciturn', definition: 'Reserved or uncommunicative in speech; saying little', partOfSpeech: 'adj', example: 'The taciturn professor rarely spoke outside of lectures.', synonyms: ['reticent', 'reserved', 'quiet'], difficulty: 4, category: 'advanced' },
  { id: 'v040', word: 'Unprecedented', definition: 'Never done or known before', partOfSpeech: 'adj', example: 'The pandemic created unprecedented challenges for educators.', synonyms: ['unparalleled', 'novel', 'unheard-of'], difficulty: 3, category: 'advanced' },

  // More advanced
  { id: 'v041', word: 'Vindicate', definition: 'To clear of blame or suspicion', partOfSpeech: 'v', example: 'New DNA evidence vindicated the wrongly convicted man.', synonyms: ['exonerate', 'absolve', 'justify'], difficulty: 3, category: 'advanced' },
  { id: 'v042', word: 'Wary', definition: 'Feeling or showing caution about possible dangers', partOfSpeech: 'adj', example: 'Investors grew wary of the volatile market.', synonyms: ['cautious', 'guarded', 'vigilant'], difficulty: 2, category: 'common' },
  { id: 'v043', word: 'Zealous', definition: 'Having or showing great energy or enthusiasm', partOfSpeech: 'adj', example: 'The zealous volunteers worked through the weekend.', synonyms: ['passionate', 'fervent', 'ardent'], difficulty: 3, category: 'advanced' },
  { id: 'v044', word: 'Alleviate', definition: 'To make suffering, deficiency, or a problem less severe', partOfSpeech: 'v', example: 'The medication helped alleviate her symptoms.', synonyms: ['relieve', 'ease', 'mitigate'], difficulty: 3, category: 'advanced' },
  { id: 'v045', word: 'Brevity', definition: 'Concise and exact use of words; shortness of time', partOfSpeech: 'n', example: 'The speaker was praised for the brevity of her remarks.', synonyms: ['conciseness', 'succinctness', 'terseness'], difficulty: 3, category: 'advanced' },
  { id: 'v046', word: 'Collaborate', definition: 'To work jointly on an activity or project', partOfSpeech: 'v', example: 'The scientists collaborated on groundbreaking research.', synonyms: ['cooperate', 'team up', 'partner'], difficulty: 2, category: 'common' },
  { id: 'v047', word: 'Discrepancy', definition: 'A lack of compatibility or similarity between things', partOfSpeech: 'n', example: 'There was a discrepancy between the two reports.', synonyms: ['inconsistency', 'difference', 'disparity'], difficulty: 3, category: 'advanced' },
  { id: 'v048', word: 'Empirical', definition: 'Based on observation or experience rather than theory', partOfSpeech: 'adj', example: 'The study relied on empirical data from field observations.', synonyms: ['observational', 'experiential', 'practical'], difficulty: 3, category: 'advanced' },
  { id: 'v049', word: 'Fervent', definition: 'Having or displaying a passionate intensity', partOfSpeech: 'adj', example: 'The fervent crowd cheered as the team scored.', synonyms: ['passionate', 'ardent', 'intense'], difficulty: 3, category: 'advanced' },
  { id: 'v050', word: 'Gratuitous', definition: 'Uncalled for; lacking good reason; unnecessary', partOfSpeech: 'adj', example: 'The film was criticized for its gratuitous violence.', synonyms: ['unnecessary', 'unwarranted', 'unjustified'], difficulty: 3, category: 'advanced' },

  // Elite (difficulty 4-5)
  { id: 'v051', word: 'Anachronism', definition: 'A thing belonging to a period other than that in which it exists', partOfSpeech: 'n', example: 'The horse-drawn carriage looked like an anachronism on the highway.', synonyms: ['throwback', 'relic'], difficulty: 4, category: 'elite' },
  { id: 'v052', word: 'Bellicose', definition: 'Demonstrating aggression and willingness to fight', partOfSpeech: 'adj', example: 'The bellicose rhetoric escalated international tensions.', synonyms: ['aggressive', 'combative', 'pugnacious'], difficulty: 5, category: 'elite' },
  { id: 'v053', word: 'Capricious', definition: 'Given to sudden and unaccountable changes of mood or behavior', partOfSpeech: 'adj', example: 'The capricious weather made planning outdoor events difficult.', synonyms: ['fickle', 'unpredictable', 'volatile'], difficulty: 4, category: 'elite' },
  { id: 'v054', word: 'Deleterious', definition: 'Causing harm or damage', partOfSpeech: 'adj', example: 'Prolonged screen time can have deleterious effects on sleep.', synonyms: ['harmful', 'detrimental', 'injurious'], difficulty: 5, category: 'elite' },
  { id: 'v055', word: 'Enervate', definition: 'To cause someone to feel drained of energy', partOfSpeech: 'v', example: 'The sweltering heat enervated the hikers.', synonyms: ['exhaust', 'weaken', 'fatigue'], difficulty: 5, category: 'elite' },
  { id: 'v056', word: 'Fastidious', definition: 'Very attentive to and concerned about accuracy and detail', partOfSpeech: 'adj', example: 'The fastidious editor caught every typo.', synonyms: ['meticulous', 'scrupulous', 'particular'], difficulty: 4, category: 'elite' },
  { id: 'v057', word: 'Garrulous', definition: 'Excessively talkative, especially on trivial matters', partOfSpeech: 'adj', example: 'The garrulous neighbor would chat for hours.', synonyms: ['talkative', 'loquacious', 'verbose'], difficulty: 5, category: 'elite' },
  { id: 'v058', word: 'Hegemony', definition: 'Leadership or dominance, especially by one country over others', partOfSpeech: 'n', example: 'The empire maintained hegemony over its trading partners.', synonyms: ['dominance', 'supremacy', 'authority'], difficulty: 5, category: 'elite' },
  { id: 'v059', word: 'Ineffable', definition: 'Too great or extreme to be expressed in words', partOfSpeech: 'adj', example: 'The beauty of the sunset was ineffable.', synonyms: ['indescribable', 'inexpressible', 'beyond words'], difficulty: 5, category: 'elite' },
  { id: 'v060', word: 'Jurisprudence', definition: 'The theory or philosophy of law', partOfSpeech: 'n', example: 'She specialized in constitutional jurisprudence.', synonyms: ['legal theory', 'law', 'legal philosophy'], difficulty: 5, category: 'elite' },
  { id: 'v061', word: 'Perfunctory', definition: 'Carried out with a minimum of effort or reflection', partOfSpeech: 'adj', example: 'He gave a perfunctory nod and returned to his work.', synonyms: ['cursory', 'mechanical', 'routine'], difficulty: 4, category: 'elite' },
  { id: 'v062', word: 'Querulous', definition: 'Complaining in a petulant or whining manner', partOfSpeech: 'adj', example: 'The querulous customer demanded to speak with the manager.', synonyms: ['whiny', 'petulant', 'peevish'], difficulty: 5, category: 'elite' },
  { id: 'v063', word: 'Sycophant', definition: 'A person who acts obsequiously toward someone important to gain advantage', partOfSpeech: 'n', example: 'The CEO surrounded himself with sycophants.', synonyms: ['flatterer', 'toady', 'yes-man'], difficulty: 4, category: 'elite' },
  { id: 'v064', word: 'Vitriolic', definition: 'Filled with bitter criticism or malice', partOfSpeech: 'adj', example: 'The vitriolic review devastated the young playwright.', synonyms: ['scathing', 'caustic', 'acerbic'], difficulty: 5, category: 'elite' },
  { id: 'v065', word: 'Acquiesce', definition: 'To accept something reluctantly but without protest', partOfSpeech: 'v', example: 'She reluctantly acquiesced to the committee\'s demands.', synonyms: ['comply', 'consent', 'yield'], difficulty: 4, category: 'elite' },
  { id: 'v066', word: 'Commensurate', definition: 'Corresponding in size or degree; in proportion', partOfSpeech: 'adj', example: 'The salary should be commensurate with experience.', synonyms: ['proportionate', 'equivalent', 'corresponding'], difficulty: 4, category: 'elite' },
  { id: 'v067', word: 'Dearth', definition: 'A scarcity or lack of something', partOfSpeech: 'n', example: 'There is a dearth of affordable housing in the city.', synonyms: ['shortage', 'scarcity', 'deficiency'], difficulty: 4, category: 'elite' },
  { id: 'v068', word: 'Equivocate', definition: 'To use ambiguous language to conceal the truth', partOfSpeech: 'v', example: 'The witness tried to equivocate under cross-examination.', synonyms: ['prevaricate', 'hedge', 'waffle'], difficulty: 4, category: 'elite' },
  { id: 'v069', word: 'Insidious', definition: 'Proceeding in a gradual, subtle way, but with harmful effects', partOfSpeech: 'adj', example: 'The insidious effects of pollution often go unnoticed.', synonyms: ['stealthy', 'subtle', 'treacherous'], difficulty: 4, category: 'elite' },
  { id: 'v070', word: 'Pernicious', definition: 'Having a harmful effect, especially in a gradual or subtle way', partOfSpeech: 'adj', example: 'The pernicious influence of misinformation undermines democracy.', synonyms: ['harmful', 'destructive', 'damaging'], difficulty: 5, category: 'elite' },
  
  // More common/advanced for breadth
  { id: 'v071', word: 'Advocate', definition: 'To publicly recommend or support', partOfSpeech: 'v/n', example: 'She advocates for environmental protection.', synonyms: ['champion', 'support', 'promote'], difficulty: 2, category: 'common' },
  { id: 'v072', word: 'Complement', definition: 'A thing that completes or brings to perfection', partOfSpeech: 'n/v', example: 'The wine perfectly complemented the meal.', synonyms: ['enhance', 'supplement', 'complete'], difficulty: 2, category: 'common' },
  { id: 'v073', word: 'Elaborate', definition: 'To develop or present in further detail', partOfSpeech: 'v/adj', example: 'Could you elaborate on your proposal?', synonyms: ['expand', 'explain', 'develop'], difficulty: 2, category: 'common' },
  { id: 'v074', word: 'Fluctuate', definition: 'To rise and fall irregularly in number or amount', partOfSpeech: 'v', example: 'Oil prices fluctuate based on global demand.', synonyms: ['vary', 'oscillate', 'waver'], difficulty: 2, category: 'common' },
  { id: 'v075', word: 'Inherent', definition: 'Existing in something as a permanent, essential quality', partOfSpeech: 'adj', example: 'Creativity is an inherent part of human nature.', synonyms: ['intrinsic', 'innate', 'built-in'], difficulty: 3, category: 'advanced' },
  { id: 'v076', word: 'Juxtaposition', definition: 'The fact of placing things close together for contrast', partOfSpeech: 'n', example: 'The juxtaposition of wealth and poverty was striking.', synonyms: ['contrast', 'comparison', 'collocation'], difficulty: 3, category: 'advanced' },
  { id: 'v077', word: 'Lethargic', definition: 'Affected by lethargy; sluggish and apathetic', partOfSpeech: 'adj', example: 'The heat made everyone feel lethargic.', synonyms: ['sluggish', 'listless', 'languid'], difficulty: 3, category: 'advanced' },
  { id: 'v078', word: 'Proliferate', definition: 'To increase rapidly in numbers; multiply', partOfSpeech: 'v', example: 'Social media platforms have proliferated in recent years.', synonyms: ['multiply', 'spread', 'expand'], difficulty: 3, category: 'advanced' },
  { id: 'v079', word: 'Substantiate', definition: 'To provide evidence to support or prove the truth of', partOfSpeech: 'v', example: 'The researcher substantiated her claims with data.', synonyms: ['verify', 'confirm', 'corroborate'], difficulty: 3, category: 'advanced' },
  { id: 'v080', word: 'Undermine', definition: 'To damage or weaken, especially gradually', partOfSpeech: 'v', example: 'Constant criticism can undermine a child\'s confidence.', synonyms: ['weaken', 'sabotage', 'erode'], difficulty: 2, category: 'common' },
];

// Generate quiz options from vocabulary bank
export function generateVocabQuiz(word: VocabWord, allWords: VocabWord[]): { question: string; options: string[]; correctAnswer: string } {
  const distractors = allWords
    .filter(w => w.id !== word.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(w => w.definition);
  
  const options = [word.definition, ...distractors].sort(() => Math.random() - 0.5);
  
  return {
    question: `What does "${word.word}" mean?`,
    options,
    correctAnswer: word.definition,
  };
}

// Spaced repetition intervals (in hours)
export const SR_INTERVALS = [1, 4, 24, 72, 168, 720]; // 1h, 4h, 1d, 3d, 1w, 1mo

export function getNextReviewTime(correctStreak: number): number {
  const idx = Math.min(correctStreak, SR_INTERVALS.length - 1);
  return SR_INTERVALS[idx] * 60 * 60 * 1000; // Convert to ms
}
