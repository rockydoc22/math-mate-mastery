import { EnglishQuestion } from './englishQuestions';
import { rateDifficulty } from '@/utils/difficultyRating';

// Helper function to add difficulty rating
const addRating = (q: Omit<EnglishQuestion, 'difficultyRating'>, forceLevel?: number): EnglishQuestion => {
  const baseRating = rateDifficulty(q.question, q.options, q.domain, q.skill);
  return { ...q, difficultyRating: forceLevel ?? baseRating };
};

// SAT English Part 1 Questions - Hard difficulty (8-10)
// Balanced distribution: 15 A, 15 B, 15 C, 15 D answers
export const satEnglishPart1Questions: EnglishQuestion[] = [
  // === Answer A (15 questions) ===
  addRating({
    id: 'sat-p1-001',
    question: 'In the early nineteenth century, some Euro-American farmers in the northeastern United States used agricultural techniques developed by the Haudenosaunee (Iroquois) people centuries earlier, but it seems that few of those farmers had actually seen Haudenosaunee farms firsthand. Barring the possibility of several farmers of the same era independently developing techniques that the Haudenosaunee people had already invented, these facts most strongly suggest that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'those farmers learned the techniques from other people who were more directly influenced by Haudenosaunee practices.' },
      { letter: 'B', text: 'the crops typically cultivated by Euro-American farmers in the northeastern United States were not well suited to Haudenosaunee farming techniques.' },
      { letter: 'C', text: 'Haudenosaunee farming techniques were widely used in regions outside the northeastern United States.' },
      { letter: 'D', text: 'Euro-American farmers only began to recognize the benefits of Haudenosaunee farming techniques late in the nineteenth century.' }
    ],
    correctAnswer: 'A',
    explanation: 'Since farmers used Haudenosaunee techniques without seeing Haudenosaunee farms firsthand, and independent invention is ruled out, they must have learned from intermediaries who were more directly exposed to Haudenosaunee practices.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-002',
    question: 'Studying tools unearthed at a cave site on the western coast of Italy, archaeologist Paola Villa and colleagues have determined that prehistoric Neanderthal groups fashioned them from shells of clams that they harvested from the seafloor while wading or diving or that washed up on the beach. Clamshells become thin and eroded as they wash up on the beach, while those on the seafloor are smooth and sturdy, so the research team suspects that Neanderthals prized the tools made with seafloor shells. However, the team also concluded that those tools were likely more challenging to obtain. Which choice most effectively uses data to support the research team\'s conclusion?',
    options: [
      { letter: 'A', text: 'At each depth below the surface in the cave, the difference in the numbers of tools of each type suggests that shells were easier to collect from the beach than to harvest from the seafloor.' },
      { letter: 'B', text: 'The highest number of tools were at a depth of 3–4 meters below the surface, which suggests that the Neanderthal population at the site was highest during the related period of time.' },
      { letter: 'C', text: 'At each depth below the surface in the cave, the difference in the numbers of tools of each type suggests that Neanderthals preferred to use clamshells from the beach because of their durability.' },
      { letter: 'D', text: 'The higher number of tools at depths of 5–6 meters below the surface in the cave than at depths of 4–5 meters below the surface suggests that the size of clam populations changed over time.' }
    ],
    correctAnswer: 'A',
    explanation: 'The fact that beach shells (less desirable) outnumber seafloor shells (more desirable) in the archaeological record suggests that seafloor shells were harder to obtain, supporting the researchers\' conclusion.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-003',
    question: 'Many of William Shakespeare\'s tragedies address broad themes that still appeal to today\'s audiences. For instance, Romeo and Juliet, which is set in the Italy of Shakespeare\'s time, tackles the themes of parents versus children and love versus hate, and the play continues to be read and produced widely around the world. But understanding Shakespeare\'s so-called history plays can require a knowledge of several centuries of English history. Consequently, ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'many theatergoers and readers today are likely to find Shakespeare\'s history plays less engaging than the tragedies.' },
      { letter: 'B', text: 'some of Shakespeare\'s tragedies are more relevant to today\'s audiences than twentieth-century plays.' },
      { letter: 'C', text: 'Romeo and Juliet is the most thematically accessible of all Shakespeare\'s tragedies.' },
      { letter: 'D', text: 'experts in English history tend to prefer Shakespeare\'s history plays to his other works.' }
    ],
    correctAnswer: 'A',
    explanation: 'The text contrasts tragedies (universal themes, accessible) with history plays (require historical knowledge). Since most readers lack extensive knowledge of English history, they would find history plays less engaging.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 8),

  addRating({
    id: 'sat-p1-004',
    question: 'Three studies estimated the average velocity of the Large Magellanic Cloud (LMC): Murai and Fujimoto (1980) at 344 km/s, Gardiner and colleagues (1994) at 297 km/s, and Kallivayalil and colleagues (2006) at 378 km/s. Before the 2006 study, estimates were low enough for the LMC to maintain an orbit around the Milky Way, but according to Gurtina Besla and colleagues, the 2006 estimate is too high for the LMC to maintain such an orbit. Therefore, if Besla and colleagues are correct, the maximum average velocity for the LMC that would allow it to maintain orbit around the Milky Way is likely ______. Which choice most effectively completes the statement?',
    options: [
      { letter: 'A', text: 'above 344 km/s but below 378 km/s.' },
      { letter: 'B', text: 'above 297 km/s but below 344 km/s.' },
      { letter: 'C', text: 'above 378 km/s.' },
      { letter: 'D', text: 'below 297 km/s.' }
    ],
    correctAnswer: 'A',
    explanation: 'The 1980 estimate (344 km/s) was within orbital range, but the 2006 estimate (378 km/s) exceeded it. Therefore, the maximum orbital velocity must be between these two values.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-005',
    question: 'While attending school in New York City in the 1980s, Okwui Enwezor encountered few works by African artists in exhibitions, despite New York\'s reputation as one of the best places to view contemporary art from around the world. According to an arts journalist, later in his career as a renowned curator and art historian, Enwezor sought to remedy this deficiency, not by focusing solely on modern African artists, but by showing how their work fits into the larger context of global modern art and art history. Which finding, if true, would most directly support the journalist\'s claim?',
    options: [
      { letter: 'A', text: 'As curator of the Haus der Kunst in Munich, Germany, Enwezor organized a retrospective of Ghanaian sculptor El Anatsui\'s work entitled El Anatsui: Triumphant Scale, one of the largest art exhibitions devoted to a Black artist in Europe\'s history.' },
      { letter: 'B', text: 'In the exhibition Postwar: Art Between the Pacific and the Atlantic, 1945–1965, Enwezor and cocurator Katy Siegel brought works by African artists such as Malangatana Ngwenya together with pieces by major figures from other countries, like US artist Andy Warhol and Mexico\'s David Siqueiros.' },
      { letter: 'C', text: 'Enwezor\'s work as curator of the 2001 exhibition The Short Century: Independence and Liberation Movements in Africa, 1945–1994 showed how African movements for independence from European colonial powers following the Second World War profoundly influenced work by African artists of the period.' },
      { letter: 'D', text: 'Enwezor organized the exhibition In/sight: African Photographers, 1940 to the Present not to emphasize a particular aesthetic trend but to demonstrate the broad range of ways in which African artists have approached the medium of photography.' }
    ],
    correctAnswer: 'B',
    explanation: 'The journalist claims Enwezor showed African art in the context of global art history. (B) supports this by describing an exhibition that placed African artists alongside major international figures like Warhol and Siqueiros.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-006',
    question: 'Anthropologist Judith Becker studied Pentecostal church services and Sufi dhikr ceremonies, both of which use repeated rhythms, music, and movement. She argues that these practices induce altered states of consciousness by disrupting normal patterns of sensory processing. A neuroscientist critiquing this view might point out that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'similar neurological changes can occur in contexts that lack the specific rhythmic and musical elements Becker identifies as crucial.' },
      { letter: 'B', text: 'the specific patterns of brain activity associated with religious experiences have been well documented across multiple cultures.' },
      { letter: 'C', text: 'participants in these ceremonies often report that the experience feels profoundly meaningful to them.' },
      { letter: 'D', text: 'repeated rhythms and music are found in religious practices across many different cultures and historical periods.' }
    ],
    correctAnswer: 'A',
    explanation: 'A critique would challenge whether the specific mechanisms Becker identifies are necessary. (A) does this by suggesting altered states can occur without those specific elements.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-007',
    question: 'Geographer Adebayo Oluwole Eludoyin and colleagues surveyed small-scale farmers in three locations in Ondo State, Nigeria—which has mountainous terrain in the north, an urbanized center, and coastal terrain in the south—to learn about their practices. In some regions, female farmers were found to be especially prominent in the cultivation of specific types of crops and even constituted the majority of farmers who cultivated those crops. Which choice most effectively uses data to complete the example?',
    options: [
      { letter: 'A', text: 'Most of the farmers who mainly cultivated cereals and most of the farmers who mainly cultivated non-root vegetables in south Ondo were women.' },
      { letter: 'B', text: 'More women in central Ondo mainly cultivated root crops than mainly cultivated cereals.' },
      { letter: 'C', text: 'Most of the farmers who mainly cultivated non-root vegetables in north and south Ondo were women.' },
      { letter: 'D', text: 'A relatively equal proportion of women across the three regions of Ondo mainly cultivated cereals.' }
    ],
    correctAnswer: 'C',
    explanation: 'The text needs an example where women constitute the majority of farmers for specific crops. (C) states that most non-root vegetable farmers in north and south Ondo were women, supporting this claim.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 8),

  addRating({
    id: 'sat-p1-008',
    question: 'Literary scholar Sarah Rivett has analyzed how Puritan captivity narratives—accounts written by colonists about their capture by Indigenous peoples—often portrayed Indigenous cultures as fundamentally different from and inferior to European Christian culture. Yet Rivett notes that the narratives also frequently depicted moments of genuine human connection between captives and their captors. This complexity suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'the authors\' lived experiences sometimes conflicted with the ideological frameworks through which they interpreted those experiences.' },
      { letter: 'B', text: 'Indigenous peoples made deliberate efforts to show kindness to captives as a political strategy.' },
      { letter: 'C', text: 'later scholars have unfairly characterized these narratives as simply expressions of prejudice.' },
      { letter: 'D', text: 'the colonists who wrote these narratives were generally more tolerant than other Europeans of their era.' }
    ],
    correctAnswer: 'A',
    explanation: 'The tension between the narratives\' ideological stance (Indigenous cultures as inferior) and their depictions of human connection suggests that real experiences didn\'t always fit the dominant interpretive framework.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-009',
    question: 'Economist Claudia Goldin has studied the evolution of women\'s participation in the US labor force across the twentieth century. She notes that married women\'s employment rates remained low through the 1920s despite growing opportunities, then rose dramatically after World War II. A sociologist examining Goldin\'s findings might emphasize that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'changes in social norms and expectations, rather than purely economic factors, likely influenced women\'s decisions about employment.' },
      { letter: 'B', text: 'the economic contributions of married women who worked in the home have been consistently undervalued in official statistics.' },
      { letter: 'C', text: 'employers in the early twentieth century were more willing to hire single women than married women.' },
      { letter: 'D', text: 'the increase in women\'s employment after World War II was temporary and declined in subsequent decades.' }
    ],
    correctAnswer: 'A',
    explanation: 'The puzzle is why employment remained low despite opportunities, then rose after WWII. A sociological perspective would emphasize that social norms (which changed during WWII) influenced these patterns beyond pure economics.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-010',
    question: 'In analyzing medieval tapestries, art historian Laura Weigert argues that their production involved complex negotiations between weavers, designers, and patrons. She contends that the resulting works should be understood as collaborative products rather than expressions of a single artistic vision. This view challenges the traditional approach in art history that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'attributes artistic works primarily to individual creators whose genius is reflected in the finished product.' },
      { letter: 'B', text: 'considers tapestries to be less significant than paintings as objects of scholarly study.' },
      { letter: 'C', text: 'emphasizes the technical skills required for tapestry production over aesthetic considerations.' },
      { letter: 'D', text: 'focuses on the symbolic meanings of imagery in medieval art rather than on production processes.' }
    ],
    correctAnswer: 'A',
    explanation: 'Weigert\'s emphasis on collaboration challenges the traditional focus on individual genius. (A) captures this traditional approach that she challenges.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-011',
    question: 'Botanist Robin Wall Kimmerer, a member of the Citizen Potawatomi Nation, argues that Indigenous ecological knowledge offers insights that Western science has often overlooked. She notes that traditional practices like controlled burns maintained ecosystem health in ways that colonial land management disrupted. A skeptic might counter that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'the specific environmental conditions that made such practices effective in the past may not exist today.' },
      { letter: 'B', text: 'Western scientists have increasingly incorporated traditional knowledge into their research methodologies.' },
      { letter: 'C', text: 'the ecological benefits of controlled burns have been well documented in scientific literature.' },
      { letter: 'D', text: 'many Indigenous communities maintained detailed records of their land management practices.' }
    ],
    correctAnswer: 'A',
    explanation: 'A skeptic would challenge the applicability of traditional practices today. (A) does this by noting that changed conditions might limit their effectiveness.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-012',
    question: 'Philosopher Kwame Anthony Appiah has argued that cosmopolitanism—the idea that all human beings belong to a single community—need not conflict with valuing particular local identities and traditions. He suggests that engaging with global perspectives can actually deepen one\'s appreciation for local culture by ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'providing a broader context in which to understand what makes one\'s own traditions distinctive and meaningful.' },
      { letter: 'B', text: 'encouraging people to adopt practices from other cultures that prove more effective than their own.' },
      { letter: 'C', text: 'demonstrating that all cultures share the same fundamental values despite surface differences.' },
      { letter: 'D', text: 'requiring people to choose between loyalty to local communities and participation in global networks.' }
    ],
    correctAnswer: 'A',
    explanation: 'Appiah argues cosmopolitanism and local identity are compatible. (A) explains how: global perspective provides context to appreciate what\'s distinctive about one\'s own traditions.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-013',
    question: 'Neuroscientist Antonio Damasio has proposed that emotions play an essential role in rational decision-making, contrary to the traditional view that emotions interfere with reason. He points to patients with damage to emotion-processing brain regions who, despite intact logical abilities, struggle to make even simple decisions. This evidence suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'emotional processing provides crucial information that guides the reasoning process toward viable choices.' },
      { letter: 'B', text: 'logical reasoning alone is sufficient for making complex decisions but not for simple ones.' },
      { letter: 'C', text: 'the brain regions responsible for emotion are located in close proximity to those responsible for logic.' },
      { letter: 'D', text: 'patients with emotional deficits are unable to form logical arguments about their preferences.' }
    ],
    correctAnswer: 'A',
    explanation: 'If patients with intact logic but impaired emotions can\'t make decisions, emotions must contribute something essential. (A) captures this: emotions provide information necessary for reasoning.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-014',
    question: 'The average number of department leaders and managers reporting directly to CEOs was studied across three periods: 1991–1995, 1996–2001, and 2001–2008. Researchers Maria Guadalupe, Julie Wulf, and Raghuram Rajan found that across the years analyzed, there was a growing interest among CEOs in connecting with more departments in their companies. Which choice best describes data that support the researchers\' conclusion?',
    options: [
      { letter: 'A', text: 'The average number of department leaders reporting directly to their CEO rose over the three periods studied.' },
      { letter: 'B', text: 'The average number of managers reporting directly to their CEO was highest in the 1996–2001 period.' },
      { letter: 'C', text: 'The average number of department leaders reporting directly to their CEO was greater than the average number of managers in each period.' },
      { letter: 'D', text: 'The average numbers of managers and department leaders reporting directly to their CEO didn\'t fluctuate across the periods.' }
    ],
    correctAnswer: 'A',
    explanation: 'Growing interest in connecting with more departments would be shown by an increasing number of department leaders reporting to CEOs over time, which (A) describes.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 8),

  addRating({
    id: 'sat-p1-015',
    question: 'Historian Judith Walkowitz has examined how newspapers in Victorian London sensationalized stories about crime and moral danger. She argues that these narratives both reflected and shaped public anxieties about urban life. A media scholar extending this analysis to contemporary contexts might note that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'modern social media platforms similarly amplify and construct public fears through selective emphasis and dramatic framing.' },
      { letter: 'B', text: 'Victorian newspapers had far smaller circulations than contemporary news outlets.' },
      { letter: 'C', text: 'crime rates in Victorian London were higher than in most modern cities.' },
      { letter: 'D', text: 'contemporary journalists receive more formal training than their Victorian counterparts did.' }
    ],
    correctAnswer: 'A',
    explanation: 'Extending Walkowitz\'s analysis to today would examine how modern media similarly shapes public anxieties. (A) does this by noting parallels between Victorian newspapers and social media.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  // === Answer B (15 questions) ===
  addRating({
    id: 'sat-p1-016',
    question: 'Jean-Bernard Caron and colleagues recently discovered a cache of jellyfish fossils in the Burgess Shale, a site in the Canadian Rockies that is rich in fossils from the Cambrian period. Caron and colleagues claim that these are the oldest jellyfish fossils ever discovered. In the past twenty years, two sites in China and the United States have yielded fossils of a similar age that some experts believe are most likely jellyfish due to their shapes and the appearance of projecting tentacles. But Caron and colleagues argue that the apparent tentacles are in fact the comb rows of ctenophores, gelatinous animals that are only distantly related to jellyfish. Which statement, if true, would most directly weaken the claim by Caron and colleagues about the fossils found in China and the United States?',
    options: [
      { letter: 'A', text: 'Sites in the Canadian Rockies from later periods than the Cambrian period have yielded fossils that have been conclusively identified as ctenophore fossils.' },
      { letter: 'B', text: 'The fossils found in China and the United States are so poorly preserved that though they cannot be conclusively identified as jellyfish, they cannot be conclusively identified as ctenophores either.' },
      { letter: 'C', text: 'While ctenophore fossils have been discovered in China and the United States, they have never been discovered in the Burgess Shale.' },
      { letter: 'D', text: 'The fossils discovered by Caron and colleagues in the Burgess Shale were better preserved than the fossils discovered by other researchers in China and the United States.' }
    ],
    correctAnswer: 'B',
    explanation: 'If the fossils cannot be conclusively identified as ctenophores, Caron\'s claim that they are ctenophores (not jellyfish) would be weakened since the identification is uncertain.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-017',
    question: 'Almost all works of fiction contain references to the progression of time, including the time of day when events take place. In a 2020 study, Allen Kim, Charuta Pethe, and Steven Skiena claim that an observable pattern in such references reflects a shift in human behavior prompted by the spread of electric lighting in the late nineteenth century. The researchers analyzed more than 50,000 novels spanning many centuries and cultures. Which finding from the study, if true, would most directly support the researchers\' conclusion?',
    options: [
      { letter: 'A', text: 'Novels published after the year 1800 include the clock phrase 10 a.m. less often than novels published before the year 1800 do.' },
      { letter: 'B', text: 'Novels published after 1880 contain significantly more references to activities occurring after 10 p.m. than do novels from earlier periods.' },
      { letter: 'C', text: 'Among novels published in the nineteenth century, implied time references become steadily more common than clock phrases as publication dates approach 1900.' },
      { letter: 'D', text: 'The time references of noon (12 p.m.) and midnight (12 a.m.) are used with roughly the same frequency in the novels.' }
    ],
    correctAnswer: 'B',
    explanation: 'Electric lighting enabled activities after dark. If novels after 1880 (when electric lighting spread) show more late-night activity references, this supports the claim that lighting changed behavior.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-018',
    question: 'Political scientists hypothesized that municipalities are much more likely to respond to firms and offer incentives if expansions can be announced in time to benefit local elected officials than if they can\'t. The team contacted officials in thousands of municipalities, inquiring about incentives for a firm looking to expand and indicating that the firm would announce its expansion on a date either just before or just after the next election. Which choice best describes data that would weaken the team\'s hypothesis?',
    options: [
      { letter: 'A', text: 'A large majority of the municipalities that received an inquiry mentioning plans for an announcement before the next election didn\'t respond to the inquiry.' },
      { letter: 'B', text: 'The proportion of municipalities that responded to the inquiry or offered incentives didn\'t substantially differ across the announcement timing conditions.' },
      { letter: 'C', text: 'Only around half the municipalities that responded to inquiries mentioning plans for an announcement before the next election offered incentives.' },
      { letter: 'D', text: 'Of the municipalities that received an inquiry mentioning plans for an announcement date after the next election, more than 1,200 didn\'t respond and only around 100 offered incentives.' }
    ],
    correctAnswer: 'B',
    explanation: 'If the hypothesis were correct, municipalities should respond more to pre-election announcements. If there\'s no difference between timing conditions, the hypothesis is weakened.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-019',
    question: 'It may seem that the optimal strategy for an animal pursuing prey or escaping predators is to move at maximal speed, but the energy expense of exploiting full speed capacity can disfavor such a strategy even in escape contexts, as evidenced by the fact that ______. Which choice most effectively uses data about lizard species to complete the text?',
    options: [
      { letter: 'A', text: 'Most lizard species use about the same percentage of their maximal speed when escaping predation as they do when pursuing prey.' },
      { letter: 'B', text: 'Multiple lizard species move at an average of less than 90% of their maximal speed while escaping predation.' },
      { letter: 'C', text: 'More lizard species use, on average, 90%–100% of their maximal speed while escaping predation than use any other percentage of their maximal speed.' },
      { letter: 'D', text: 'At least 4 lizard species use, on average, less than 100% of their maximal speed while pursuing prey.' }
    ],
    correctAnswer: 'B',
    explanation: 'The text argues that even when escaping predators, animals don\'t use maximal speed due to energy costs. (B) supports this by showing multiple lizard species use less than 90% of max speed when escaping.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-020',
    question: 'High levels of public uncertainty about which economic policies a country will adopt can make planning difficult for businesses. Economist Sandile Hlatshwayo analyzed trends in news reports to derive measures for general economic policy uncertainty and for uncertainty related to specific areas like tax or trade policy. Her work reveals that a general measure may not fully reflect uncertainty about specific areas of policy. Which choice most effectively uses data to illustrate the claim?',
    options: [
      { letter: 'A', text: 'General economic policy uncertainty aligned closely with uncertainty about tax and public spending policy in 2005 but differed from it by a large amount in 2009.' },
      { letter: 'B', text: 'General economic policy uncertainty was substantially lower than uncertainty about trade policy in 2005 and substantially higher than uncertainty about trade policy in 2010.' },
      { letter: 'C', text: 'General economic policy uncertainty reached its highest level in the same year that uncertainty about trade policy and tax and public spending policy reached their lowest levels.' },
      { letter: 'D', text: 'Uncertainty about trade policy was substantially lower than uncertainty about tax and public spending policy each year from 2005 to 2010.' }
    ],
    correctAnswer: 'B',
    explanation: 'To show that general measures don\'t fully reflect specific areas, you need data showing they diverge. (B) shows general uncertainty being lower than trade uncertainty in 2005 but higher in 2010—a reversal demonstrating the divergence.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-021',
    question: 'Musicologist Susan McClary has argued that classical music compositions often encode cultural narratives about gender, with musical structures reflecting and reinforcing social hierarchies. A critic might respond that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Many composers intentionally incorporated elements that challenged conventional gender expectations.' },
      { letter: 'B', text: 'The relationship between musical structure and cultural meaning is too variable and context-dependent to support such systematic claims.' },
      { letter: 'C', text: 'Listeners from different historical periods have interpreted the same compositions in remarkably similar ways.' },
      { letter: 'D', text: 'The technical vocabulary used to describe musical structures was developed primarily by male theorists.' }
    ],
    correctAnswer: 'B',
    explanation: 'A critic would challenge the systematic nature of McClary\'s claims. (B) does this by arguing that the relationship between structure and meaning is too variable to support broad generalizations.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-022',
    question: 'Sociologist Arlie Hochschild coined the term "emotional labor" to describe the work of managing feelings that many service jobs require—for example, flight attendants maintaining a cheerful demeanor. Recent research has extended this concept to explore emotional labor in personal relationships. This extension is controversial because ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Flight attendants receive training in how to manage their emotions that people in personal relationships typically do not receive.' },
      { letter: 'B', text: 'What constitutes "work" in personal contexts may differ fundamentally from labor performed for an employer.' },
      { letter: 'C', text: 'Emotional labor in service jobs has been linked to increased rates of burnout and job dissatisfaction.' },
      { letter: 'D', text: 'Personal relationships have existed across all human societies while service industries are a modern development.' }
    ],
    correctAnswer: 'B',
    explanation: 'The controversy arises from extending a concept about paid work to personal relationships. (B) identifies the key issue: whether "work" means the same thing in these different contexts.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-023',
    question: 'Archaeologist Ian Hodder has argued that the relationship between humans and material objects is more complex than traditional theories suggest. He proposes that objects are not simply tools humans use but become entangled with human lives in ways that create both dependencies and new possibilities. This framework suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Archaeological evidence is unreliable for understanding past human behavior.' },
      { letter: 'B', text: 'Technological innovation often creates constraints as well as opportunities for human societies.' },
      { letter: 'C', text: 'Prehistoric humans placed less value on material possessions than modern people do.' },
      { letter: 'D', text: 'The development of new technologies has accelerated throughout human history.' }
    ],
    correctAnswer: 'B',
    explanation: 'Hodder\'s concept of "entanglement" emphasizes that objects create both dependencies and possibilities. (B) captures this dual nature: technology creates both constraints and opportunities.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-024',
    question: 'Political theorist Wendy Brown has analyzed how neoliberal economic thinking has reshaped democratic citizenship. She argues that when market logic is applied to all domains of life, citizens come to see themselves primarily as entrepreneurs of the self, maximizing their own human capital. A proponent of market-based approaches might respond that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Democratic institutions have become more transparent and accountable in recent decades.' },
      { letter: 'B', text: 'Encouraging individuals to develop their capacities actually enhances their ability to participate meaningfully in democratic life.' },
      { letter: 'C', text: 'Most citizens are unaware of how economic frameworks shape their self-understanding.' },
      { letter: 'D', text: 'Neoliberal policies have been adopted across the political spectrum in many democracies.' }
    ],
    correctAnswer: 'B',
    explanation: 'A proponent would defend market approaches against Brown\'s critique. (B) does this by arguing that developing human capital (which Brown critiques) actually supports rather than undermines democratic participation.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-025',
    question: 'Literary critic Gayatri Spivak has argued that postcolonial studies must attend to the voices of subaltern groups—those marginalized by colonial and neocolonial power structures. However, she also warns that well-meaning scholars risk speaking "for" rather than "with" these groups, inadvertently reproducing the silencing they aim to challenge. This tension suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Subaltern groups should be solely responsible for representing their own perspectives in academic contexts.' },
      { letter: 'B', text: 'The methodological and ethical challenges of this research require ongoing critical reflection.' },
      { letter: 'C', text: 'Postcolonial scholars have generally failed to include subaltern perspectives in their work.' },
      { letter: 'D', text: 'The term "subaltern" is too vague to be analytically useful in contemporary scholarship.' }
    ],
    correctAnswer: 'B',
    explanation: 'The tension between wanting to amplify marginalized voices and risking speaking for them means scholars must constantly reflect on their methods and ethics. (B) captures this need for ongoing critical reflection.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-026',
    question: 'Cognitive scientist Lera Boroditsky has conducted experiments suggesting that the language people speak affects how they think about abstract concepts like time. Speakers of Mandarin, which often uses vertical metaphors for time, showed different performance on time-related tasks than speakers of English, which typically uses horizontal metaphors. Critics of this research might argue that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Many languages use both vertical and horizontal metaphors for time in different contexts.' },
      { letter: 'B', text: 'The observed differences could stem from cultural factors rather than language itself.' },
      { letter: 'C', text: 'Abstract concepts are processed in different brain regions than concrete concepts.' },
      { letter: 'D', text: 'Bilingual speakers often think about time differently depending on which language they are using.' }
    ],
    correctAnswer: 'B',
    explanation: 'A critique would question whether language itself causes the effect. (B) offers an alternative explanation: cultural factors (which correlate with language) might be responsible.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-027',
    question: 'Urban planner Jane Jacobs famously criticized modernist urban renewal projects that demolished existing neighborhoods to build isolated superblocks. She argued that vibrant cities require diverse, fine-grained street networks where varied uses mix together. A contemporary urbanist might note that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Many cities have since adopted zoning codes that promote mixed-use development.' },
      { letter: 'B', text: 'Jacobs\'s principles, while influential, are difficult to implement in cities with vastly different economic conditions than 1960s New York.' },
      { letter: 'C', text: 'Modernist architects were primarily concerned with aesthetic considerations rather than social outcomes.' },
      { letter: 'D', text: 'Public housing projects built during the urban renewal era have been extensively documented by historians.' }
    ],
    correctAnswer: 'B',
    explanation: 'A contemporary urbanist would engage with both Jacobs\'s influence and its limitations. (B) does this by noting that her principles face implementation challenges in different contexts.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-028',
    question: 'Psychologist Carol Dweck has popularized the distinction between "fixed mindset" (believing abilities are static) and "growth mindset" (believing abilities can be developed). While her research has been highly influential in education, recent replication studies have produced mixed results. These findings suggest that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Teachers have misunderstood the practical implications of Dweck\'s research.' },
      { letter: 'B', text: 'The effects of mindset interventions may depend on contextual factors that vary across settings.' },
      { letter: 'C', text: 'Believing one\'s abilities are fixed is psychologically harmful for most students.' },
      { letter: 'D', text: 'Psychological research on motivation has become more methodologically rigorous over time.' }
    ],
    correctAnswer: 'B',
    explanation: 'Mixed replication results don\'t mean the effect is false, but suggest it may depend on conditions. (B) captures this: contextual factors may determine when mindset interventions work.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-029',
    question: 'Environmental historian William Cronon has analyzed how the concept of "wilderness" emerged in American culture. He argues that the idea of wilderness as pristine and separate from human influence is itself a cultural construction that obscures the long history of Indigenous peoples\' presence in these landscapes. This analysis implies that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Indigenous land management practices had minimal effects on American ecosystems.' },
      { letter: 'B', text: 'Conservation policies based on preserving "untouched" nature may rest on historically inaccurate assumptions.' },
      { letter: 'C', text: 'Americans today are generally more concerned about environmental issues than previous generations were.' },
      { letter: 'D', text: 'The national park system has successfully protected significant areas of wilderness.' }
    ],
    correctAnswer: 'B',
    explanation: 'If "wilderness" as pristine is a cultural construction that ignores Indigenous presence, then policies based on this concept rest on faulty historical assumptions. (B) captures this implication.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-030',
    question: 'Anthropologist David Graeber challenged conventional accounts of money\'s origins, which typically posit that money arose to replace inefficient barter systems. Drawing on historical and ethnographic evidence, Graeber argued that complex credit and debt relationships often preceded the use of money and that barter tends to emerge only between strangers or in the breakdown of existing social systems. This view suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Archaeological evidence for early monetary systems is unreliable.' },
      { letter: 'B', text: 'Economic relationships in early societies were embedded in broader social and moral frameworks.' },
      { letter: 'C', text: 'Modern monetary systems function more efficiently than those of earlier periods.' },
      { letter: 'D', text: 'Most economists agree that standard accounts of money\'s origins are incorrect.' }
    ],
    correctAnswer: 'B',
    explanation: 'If credit/debt relationships preceded money and existed within social systems, early economic relationships were part of broader social frameworks rather than separate "economic" transactions. (B) captures this.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  // === Answer C (15 questions) ===
  addRating({
    id: 'sat-p1-031',
    question: 'To understand how temperature change affects microorganism-mediated cycling of soil nutrients in alpine ecosystems, Eva Kaštovská et al. collected plant-soil cores in the Tatra Mountains at elevations around 2,100 meters and transplanted them to elevations of 1,700–1,800 meters, where the mean air temperature was warmer by 2°C. Microorganism-mediated nutrient cycling was accelerated in the transplanted cores; crucially, microorganism community composition was unchanged, allowing Kaštovská et al. to attribute the acceleration to temperature-induced increases in microorganism activity. The finding about the microorganism community composition was important for which reason?',
    options: [
      { letter: 'A', text: 'It provided preliminary evidence that microorganism-mediated nutrient cycling was accelerated in the transplanted cores.' },
      { letter: 'B', text: 'It suggested that temperature-induced changes in microorganism activity may be occurring at increasingly high elevations.' },
      { letter: 'C', text: 'It ruled out a potential alternative explanation for the acceleration in microorganism-mediated nutrient cycling.' },
      { letter: 'D', text: 'It clarified that microorganism activity levels in the plant-soil cores varied depending on which microorganisms comprised the community.' }
    ],
    correctAnswer: 'C',
    explanation: 'If the community composition had changed, accelerated nutrient cycling could be due to different microorganisms rather than temperature effects. Unchanged composition rules out this alternative.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-032',
    question: 'The most recent iteration of the immersive theater experience Sleep No More, which premiered in New York City in 2011, transforms its performance space—a five-story warehouse—into a 1930s-era hotel. Audience members, who wander through the labyrinthine venue at their own pace and follow the actors as they play out simultaneous, interweaving narrative loops, confront the impossibility of experiencing the production in its entirety. The play\'s refusal of narrative coherence thus hinges on the sense of spatial fragmentation that the venue\'s immense and intricate layout generates. What does the text most strongly suggest about Sleep No More\'s use of its performance space?',
    options: [
      { letter: 'A', text: 'The choice of a New York City venue likely enabled the play\'s creators to experiment with the use of theatrical space in a way that venues from earlier productions could not.' },
      { letter: 'B', text: 'Audience members likely find the experience of the play disappointing because they generally cannot make their way through the entire venue.' },
      { letter: 'C', text: 'The production\'s dependence on a particular performance environment would likely make it difficult to reproduce exactly in a different theatrical space.' },
      { letter: 'D', text: 'Audience members who navigate the space according to a recommended itinerary will likely have a better grasp of the play\'s narrative than audience members who depart from that itinerary.' }
    ],
    correctAnswer: 'C',
    explanation: 'The text emphasizes that the production\'s effects depend on the specific venue—its size, layout, and design. This suggests the production would be hard to reproduce elsewhere.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details'
  }, 9),

  addRating({
    id: 'sat-p1-033',
    question: 'Mosasaurs were large marine reptiles that lived in the Late Cretaceous period. Celina Suarez, Alberto Pérez-Huerta, and T. Lynn Harrell Jr. examined oxygen-18 isotopes in mosasaur tooth enamel to calculate likely body temperatures and determined that mosasaurs were endothermic—they used internal metabolic processes to maintain a stable body temperature. The researchers claim that endothermy would have enabled mosasaurs to include relatively cold polar waters in their range. Which finding, if true, would most directly support this claim?',
    options: [
      { letter: 'A', text: 'Mosasaurs\' likely body temperatures are easier to determine from tooth enamel oxygen-18 isotope data than the body temperatures of nonendothermic Late Cretaceous marine reptiles are.' },
      { letter: 'B', text: 'Fossils of both mosasaurs and nonendothermic marine reptiles have been found in roughly equal numbers in regions known to be near the poles during the Late Cretaceous.' },
      { letter: 'C', text: 'Several mosasaur fossils have been found in regions known to be near the poles during the Late Cretaceous, while relatively few fossils of nonendothermic marine reptiles have been found in those locations.' },
      { letter: 'D', text: 'During the Late Cretaceous, seawater temperatures were likely higher throughout mosasaurs\' range, including near the poles, than seawater temperatures at those same latitudes are today.' }
    ],
    correctAnswer: 'C',
    explanation: 'If endothermy enabled mosasaurs to live in cold polar waters, we would expect mosasaur fossils in polar regions but fewer fossils of nonendothermic reptiles there. (C) describes exactly this pattern.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-034',
    question: 'Research suggests that REM sleep in animals is homeostatically regulated: animals compensate for periods of REM sleep deprivation by increasing subsequent REM sleep. When on land, fur seals get enough REM sleep, but during the weeks they\'re in the water, they get almost none. Researchers studied fur seals\' sleep habits after they returned to land and concluded that REM sleep may not be homeostatically regulated in fur seals. Which choice most effectively uses data to support this conclusion?',
    options: [
      { letter: 'A', text: 'The seals didn\'t show significantly less REM sleep during the second day after returning to land than they did during the first day.' },
      { letter: 'B', text: 'The seals showed no significant differences from one another in baseline levels of REM sleep.' },
      { letter: 'C', text: 'The seals didn\'t consistently demonstrate a significant increase in REM sleep after their period of deprivation in the water.' },
      { letter: 'D', text: 'There was no significant difference between REM sleep after returning to land and REM sleep while in the water.' }
    ],
    correctAnswer: 'C',
    explanation: 'If REM sleep were homeostatically regulated, seals would compensate for weeks of deprivation with significantly increased REM. If they didn\'t consistently show this increase, homeostatic regulation is unlikely.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 9),

  addRating({
    id: 'sat-p1-035',
    question: 'Philosopher Alva Noë has argued that perception is not something that happens in the brain but rather an activity involving the whole body interacting with the environment. He suggests that visual experience, for example, depends on our understanding of how appearances change as we move. A traditional cognitive scientist might object that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Many visual phenomena can be explained entirely in terms of neural activity without reference to bodily movement.' },
      { letter: 'B', text: 'The brain processes visual information in distinct regions that have been mapped through neuroimaging.' },
      { letter: 'C', text: 'Patients with paralysis who cannot move their bodies still report having visual experiences.' },
      { letter: 'D', text: 'Different species have evolved different visual systems adapted to their particular environments.' }
    ],
    correctAnswer: 'C',
    explanation: 'The strongest objection would provide a counterexample. (C) does this: if paralyzed patients have visual experiences without bodily movement, this challenges Noë\'s claim that perception requires bodily interaction.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-036',
    question: 'Geologist Marie Tharp\'s detailed mapping of the ocean floor in the 1950s revealed the Mid-Atlantic Ridge and the rift valley running along it. Her work provided crucial evidence for the theory of plate tectonics, yet she faced significant resistance from the male-dominated scientific establishment of her era. Historian of science Naomi Oreskes notes that Tharp\'s experience illustrates a broader pattern in which ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Geological discoveries have frequently been made by scientists working outside major research institutions.' },
      { letter: 'B', text: 'The development of new technologies often precedes major advances in scientific theory.' },
      { letter: 'C', text: 'The reception of scientific work has sometimes been influenced by the social position of the scientist rather than just the quality of the evidence.' },
      { letter: 'D', text: 'Oceanographic research has historically received less funding than other scientific fields.' }
    ],
    correctAnswer: 'C',
    explanation: 'Tharp\'s work provided strong evidence but faced resistance due to her gender. This exemplifies how scientists\' social position can affect how their work is received.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-037',
    question: 'Linguist George Lakoff has argued that human thought is fundamentally metaphorical—we understand abstract concepts through their relationships to concrete, embodied experiences. For example, we conceptualize time in terms of spatial movement ("the future is ahead of us"). This framework suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Languages that use different spatial metaphors for time may produce different intuitions about temporal relationships.' },
      { letter: 'B', text: 'Abstract reasoning developed later in human evolution than spatial cognition.' },
      { letter: 'C', text: 'The relationship between language and thought is one of the oldest questions in philosophy.' },
      { letter: 'D', text: 'Children learn concrete vocabulary before they learn words for abstract concepts.' }
    ],
    correctAnswer: 'A',
    explanation: 'If abstract concepts are understood through spatial metaphors, and different languages use different metaphors, speakers might have different intuitions. (A) follows from Lakoff\'s framework.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-038',
    question: 'Art historian Linda Nochlin famously asked "Why have there been no great women artists?" In answering her own question, she argued that the relative absence of women from the art historical canon was not due to lack of talent but to institutional barriers—women were long excluded from the training, networks, and patronage that enabled artistic careers. A critic might respond that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Many women artists did receive training and produce significant work that was simply overlooked by male art historians.' },
      { letter: 'B', text: 'The definition of "greatness" in art has itself been shaped by values and perspectives that excluded women.' },
      { letter: 'C', text: 'Both (A) and (B) address limitations in Nochlin\'s argument that could deepen the analysis.' },
      { letter: 'D', text: 'Artistic genius is an innate quality that institutional training cannot produce or inhibit.' }
    ],
    correctAnswer: 'C',
    explanation: 'Both responses address gaps: (A) suggests more women artists existed than recognized, (B) questions the criteria for "greatness." A critic might combine both points to deepen the analysis.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-039',
    question: 'Economist Thomas Piketty has analyzed centuries of data on income and wealth distribution. He argues that when the rate of return on capital exceeds economic growth, wealth becomes increasingly concentrated among those who already own capital. Some economists have challenged his methodology, but the broader implication of his analysis is that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Progressive taxation is the only effective tool for reducing wealth inequality.' },
      { letter: 'B', text: 'Wealth concentration was more extreme in the nineteenth century than it is today.' },
      { letter: 'C', text: 'Left unchecked, market economies may tend toward increasing rather than decreasing inequality.' },
      { letter: 'D', text: 'Most economists agree that some level of inequality is necessary for economic growth.' }
    ],
    correctAnswer: 'C',
    explanation: 'Piketty\'s central claim is that capital returns exceeding growth leads to increasing concentration. The implication is that market economies naturally tend toward greater inequality without intervention.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-040',
    question: 'Biologist Lynn Margulis proposed that mitochondria and chloroplasts in eukaryotic cells originated as free-living bacteria that were engulfed by ancestral cells and eventually became permanent residents. This theory of endosymbiosis was initially met with skepticism but is now widely accepted. The acceptance of this theory illustrates that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Scientific theories are eventually accepted if their proponents are sufficiently persistent in advocating for them.' },
      { letter: 'B', text: 'The accumulation of genetic and structural evidence can ultimately overcome initial resistance to unconventional ideas.' },
      { letter: 'C', text: 'Biological discoveries are more likely to be made by researchers working outside mainstream institutions.' },
      { letter: 'D', text: 'Evolutionary biology has undergone more paradigm shifts than other scientific disciplines.' }
    ],
    correctAnswer: 'B',
    explanation: 'The key is that the theory went from skepticism to acceptance. This happened through accumulating evidence (genetic similarities between mitochondria and bacteria, etc.), illustrating how evidence can overcome resistance.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-041',
    question: 'Literary scholar Stephen Greenblatt pioneered "New Historicism," an approach that reads literary texts alongside nonliterary documents from the same period to understand how literature participates in broader cultural conversations. For example, he analyzed Shakespeare\'s plays in relation to contemporary travel narratives and legal documents. A formalist critic might object that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Historical documents are often incomplete and may not accurately represent the beliefs of their era.' },
      { letter: 'B', text: 'Shakespeare\'s plays were written for entertainment rather than as social commentary.' },
      { letter: 'C', text: 'This approach risks subordinating the literary qualities that distinguish great works from ordinary documents to historical context.' },
      { letter: 'D', text: 'New Historicism has been applied primarily to Renaissance literature rather than to other periods.' }
    ],
    correctAnswer: 'C',
    explanation: 'Formalists emphasize the intrinsic literary qualities of texts. They would object that New Historicism, by emphasizing historical context, might neglect what makes literary works distinctive as literature.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-042',
    question: 'Political scientist Robert Putnam has documented declining civic engagement in the United States, noting that Americans are increasingly less likely to join organizations, attend public meetings, or participate in collective activities. He argues that this trend has negative consequences for democratic governance. A critic of Putnam\'s analysis might note that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'New forms of civic engagement, including online activism and informal networks, may not be captured by traditional measures.' },
      { letter: 'B', text: 'Some of the organizations Putnam studied were exclusionary and perpetuated social inequalities.' },
      { letter: 'C', text: 'Both (A) and (B) suggest that Putnam\'s analysis may be incomplete in ways that affect his conclusions.' },
      { letter: 'D', text: 'Civic engagement levels vary significantly across different regions of the United States.' }
    ],
    correctAnswer: 'C',
    explanation: 'Both critiques challenge Putnam: (A) suggests he may be measuring the wrong things, (B) suggests the decline might not be entirely negative. Together, they indicate his analysis may be incomplete.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-043',
    question: 'Susanne A. Benz and colleagues analyzed thousands of sites on three continents, examining whether subsurface thermal pollution (excess heat) could contribute to home heating needs. Under the current surface temperature scenario, more than 80% of sites cannot use thermal pollution for any portion of local home heating needs, but at the maximum plausible surface temperature, that percentage drops below 20%. Which choice best describes data that support Benz and colleagues\' conclusion that thermal pollution could increasingly contribute to meeting home heating needs?',
    options: [
      { letter: 'A', text: 'Under both temperature conditions, less than 10% of sites were in the up-to-25% group, but at the maximum plausible surface temperature, almost 80% of sites could have all their local heating needs met by thermal pollution.' },
      { letter: 'B', text: 'At current surface temperatures, more than 80% of the sites have no need for supplemental local home heating from subsurface thermal pollution.' },
      { letter: 'C', text: 'At current surface temperatures, more than 80% of sites cannot use thermal pollution to meet any portion of local home heating needs, but at maximum plausible surface temperature, that percentage drops below 20%.' },
      { letter: 'D', text: 'At current surface temperatures, more than 80% of sites can meet, at most, 25% of local home heating needs with subsurface thermal pollution.' }
    ],
    correctAnswer: 'C',
    explanation: 'The conclusion is that as temperatures approach maximum plausible levels, more sites can use thermal pollution. (C) directly supports this by showing the percentage of sites that can\'t use it drops from 80%+ to under 20%.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence'
  }, 8),

  addRating({
    id: 'sat-p1-044',
    question: 'Historian Howard Zinn\'s "A People\'s History of the United States" deliberately told American history from the perspective of marginalized groups rather than political and economic elites. While influential, this approach has been criticized by some historians who argue that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Zinn\'s work made history more accessible to general readers than traditional academic histories.' },
      { letter: 'B', text: 'The experiences of ordinary people are inherently more interesting than those of political leaders.' },
      { letter: 'C', text: 'Privileging any single perspective, even that of the marginalized, risks producing a similarly distorted picture of the past.' },
      { letter: 'D', text: 'Historical research has increasingly incorporated the perspectives of women and minorities.' }
    ],
    correctAnswer: 'C',
    explanation: 'A historian\'s critique would address methodology. Zinn deliberately chose one perspective over others; the concern is that any one-sided approach—even one correcting previous biases—produces distortion.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-045',
    question: 'Psychologist Jonathan Haidt has proposed that moral reasoning often serves to justify intuitive moral judgments rather than to produce them. He suggests that we first have gut reactions to moral situations and then construct rational explanations for those reactions. This model predicts that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'People from different cultures will have different moral intuitions based on their upbringing.' },
      { letter: 'B', text: 'Philosophers who study ethics are less likely to behave morally than non-philosophers.' },
      { letter: 'C', text: 'People will sometimes struggle to articulate reasons for moral judgments they feel strongly about.' },
      { letter: 'D', text: 'Moral education should focus on developing reasoning skills rather than emotional responses.' }
    ],
    correctAnswer: 'C',
    explanation: 'If moral judgments are intuitive and reasoning comes after to justify them, we would expect cases where intuition is strong but reasons are hard to articulate. (C) captures this prediction.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 8),

  // === Answer D (15 questions) ===
  addRating({
    id: 'sat-p1-046',
    question: 'The following text is from a 1913 poem. A zoo is described: "There, the lion, not to be restrained, still paces in his cage, / A symbol of the wild, majestic rage / He might have shown if free in his domain— / But now he paces endless lengths in vain. / That lion with his lordly, untamed heart / Has in some man his human counterpart, / Some lofty soul in dreams and visions wrapped, / But in the stifling flesh securely trapped." Based on the text, what challenge do humans sometimes experience?',
    options: [
      { letter: 'A', text: 'They cannot effectively tame certain wild animals because of a lack of compassion.' },
      { letter: 'B', text: 'They cannot focus on setting attainable goals because of a lack of motivation.' },
      { letter: 'C', text: 'They quickly become frustrated when faced with difficult tasks because of a lack of self-control.' },
      { letter: 'D', text: 'They have aspirations that cannot be fulfilled because of certain limitations.' }
    ],
    correctAnswer: 'D',
    explanation: 'The poem draws a parallel between a caged lion and a "lofty soul...trapped." The lion has untamed potential but is confined; likewise, humans have dreams but are "trapped" by limitations.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context'
  }, 9),

  addRating({
    id: 'sat-p1-047',
    question: 'Economist Daron Acemoglu has argued that political and economic institutions are the primary determinants of long-term prosperity, more important than factors like geography or culture. He points to natural experiments like the division of Korea, where the same culture and geography produced vastly different outcomes under different institutional systems. A geographer might respond that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Institutions are themselves shaped by geographic factors, making geography an indirect cause of prosperity.' },
      { letter: 'B', text: 'Cultural factors can influence which institutions societies adopt and how those institutions function.' },
      { letter: 'C', text: 'The division of Korea was the result of geopolitical forces rather than internal institutional choices.' },
      { letter: 'D', text: 'Acemoglu\'s natural experiments, while suggestive, may not adequately control for all relevant differences between comparison cases.' }
    ],
    correctAnswer: 'D',
    explanation: 'A skeptical response would challenge the methodology. (D) questions whether cases like the Korea comparison truly control for all relevant variables, a standard methodological concern.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-048',
    question: 'Sociologist Pierre Bourdieu developed the concept of "cultural capital" to describe how cultural knowledge, skills, and tastes can function like economic capital, providing advantages to those who possess them. He argued that educational systems tend to reward students who already possess cultural capital from their family backgrounds, thereby reproducing social inequalities. This analysis implies that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Schools in lower-income communities receive less funding than schools in wealthy areas.' },
      { letter: 'B', text: 'Students from disadvantaged backgrounds are inherently less capable than their more privileged peers.' },
      { letter: 'C', text: 'Educational success depends partly on factors that precede and extend beyond formal schooling.' },
      { letter: 'D', text: 'Truly meritocratic education would require addressing cultural factors that schools currently take for granted.' }
    ],
    correctAnswer: 'D',
    explanation: 'If schools reward pre-existing cultural capital and thereby reproduce inequality, then a truly meritocratic system would need to account for these cultural advantages rather than assuming a level playing field.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-049',
    question: 'Legal scholar Kimberlé Crenshaw coined the term "intersectionality" to describe how different forms of discrimination (based on race, gender, class, etc.) can interact and compound each other. She argued that analyzing these dimensions separately often fails to capture the experiences of those who face multiple, overlapping forms of disadvantage. This framework suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Antidiscrimination law should address only the most severe forms of discrimination.' },
      { letter: 'B', text: 'Women of color face challenges that are distinct from those faced by white women or men of color separately.' },
      { letter: 'C', text: 'Most individuals experience only one form of discrimination at a time.' },
      { letter: 'D', text: 'Policies designed to address only one form of discrimination may be insufficient for those at the intersection of multiple categories.' }
    ],
    correctAnswer: 'D',
    explanation: 'Crenshaw\'s point is that single-axis analysis (just race OR just gender) misses the experience of those facing multiple disadvantages. Policies addressing only one dimension may therefore be inadequate.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-050',
    question: 'Physicist Thomas Kuhn argued that science does not progress through steady accumulation of knowledge but through "paradigm shifts"—revolutionary changes in basic assumptions that reframe entire fields. Between revolutions, scientists work within established paradigms, often resisting anomalies that don\'t fit. Kuhn\'s analysis suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Scientific education should expose students to multiple competing paradigms simultaneously.' },
      { letter: 'B', text: 'The history of science shows a pattern of continuous, incremental progress toward truth.' },
      { letter: 'C', text: 'Most scientific work involves solving problems within accepted frameworks rather than questioning fundamental assumptions.' },
      { letter: 'D', text: 'Scientists who challenge prevailing assumptions may face resistance from the scientific community before their ideas are accepted.' }
    ],
    correctAnswer: 'D',
    explanation: 'Kuhn emphasized that scientists within paradigms resist anomalies and challenges. This means scientists proposing paradigm shifts face resistance until sufficient crisis forces reconsideration.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-051',
    question: 'Philosopher Martha Nussbaum has defended the humanities as essential to democratic citizenship. She argues that literature and history cultivate the capacity for sympathetic imagination—the ability to understand life from perspectives different from one\'s own. This capacity is crucial for democracy because ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Elected representatives must be able to understand complex policy issues.' },
      { letter: 'B', text: 'Democratic institutions require citizens trained in quantitative reasoning.' },
      { letter: 'C', text: 'Technology companies increasingly dominate democratic political processes.' },
      { letter: 'D', text: 'Democratic deliberation requires citizens who can consider the interests and experiences of others.' }
    ],
    correctAnswer: 'D',
    explanation: 'Nussbaum links sympathetic imagination (understanding other perspectives) to democracy. The connection is that democratic deliberation requires citizens who can consider others\' interests.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-052',
    question: 'Anthropologist Clifford Geertz advocated for "thick description"—detailed accounts of cultural practices that include not just observable behavior but also the meanings that behavior has for participants. He contrasted this with "thin description," which simply records what happened without interpretive context. This methodological approach assumes that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Anthropologists can never fully understand cultures different from their own.' },
      { letter: 'B', text: 'Quantitative data is more reliable than qualitative observation.' },
      { letter: 'C', text: 'The same observable action can have different meanings in different cultural contexts.' },
      { letter: 'D', text: 'Human behavior is governed by universal laws that apply across all cultures.' }
    ],
    correctAnswer: 'C',
    explanation: 'Thick description\'s rationale is that behavior without interpretive context is inadequate. This assumes the same action (thin description) can mean different things—hence the need for thick description.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-053',
    question: 'Literary theorist Mikhail Bakhtin developed the concept of "dialogism"—the idea that meaning in language emerges from dialogue and that all utterances respond to previous utterances and anticipate future responses. He contrasted this with "monologism," where meaning is treated as fixed and authoritative. Applied to literature, this framework suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Authors should avoid using dialogue in their fiction.' },
      { letter: 'B', text: 'Literary texts contain multiple voices and perspectives in tension with each other.' },
      { letter: 'C', text: 'Readers\' interpretations of a text are irrelevant to its meaning.' },
      { letter: 'D', text: 'Novels with first-person narration are more authentic than those with third-person narration.' }
    ],
    correctAnswer: 'B',
    explanation: 'Dialogism emphasizes that meaning emerges through interaction of multiple voices. Applied to literature, this suggests texts contain multiple perspectives in dialogue, not a single authoritative voice.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-054',
    question: 'Cognitive scientist Douglas Hofstadter has explored the role of analogy in human thought, arguing that analogy-making is not just one cognitive process among many but is central to all thinking, including what seems like logical or mathematical reasoning. If this view is correct, then ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Computers that can make analogies may be closer to human-like intelligence than those focused on logical operations.' },
      { letter: 'B', text: 'Mathematical ability depends primarily on exposure to mathematical concepts in early childhood.' },
      { letter: 'C', text: 'Humans evolved the capacity for analogy-making before the capacity for language.' },
      { letter: 'D', text: 'Artificial intelligence systems should prioritize analogy-making over rule-following to achieve more human-like cognition.' }
    ],
    correctAnswer: 'D',
    explanation: 'If analogy is central to all thinking including logic, then AI pursuing human-like intelligence should focus on analogy rather than just formal rule-following. (D) captures this implication.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-055',
    question: 'Economist Albert Hirschman analyzed how dissatisfied members of organizations (or citizens of states) can respond through "exit" (leaving) or "voice" (expressing concerns to push for change). He noted that the availability of exit can reduce the likelihood of voice, potentially allowing organizational problems to persist. This dynamic helps explain why ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Organizations with captive constituencies may be more responsive to member concerns than those whose members can easily leave.' },
      { letter: 'B', text: 'Employee turnover rates are higher in industries with many competing firms.' },
      { letter: 'C', text: 'Political systems that restrict emigration tend to experience less internal dissent.' },
      { letter: 'D', text: 'Some organizations may actually deteriorate as their most committed members leave rather than fight for reform.' }
    ],
    correctAnswer: 'D',
    explanation: 'Hirschman\'s insight is that when exit is easy, those who would advocate for change leave instead. This can harm organizations as committed members exit rather than use voice.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 9),

  addRating({
    id: 'sat-p1-056',
    question: 'Feminist philosopher Sandra Harding has argued that starting research from the experiences of marginalized groups can reveal aspects of social reality that are obscured from more privileged standpoints. This "standpoint epistemology" doesn\'t claim that marginalized perspectives are automatically correct, but rather that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Scientific objectivity is impossible to achieve because all knowledge is shaped by social position.' },
      { letter: 'B', text: 'Marginalized groups have unique access to empirical data unavailable to researchers from dominant groups.' },
      { letter: 'C', text: 'The experiences of dominant groups are irrelevant to understanding social reality.' },
      { letter: 'D', text: 'Starting from marginalized standpoints can generate questions and insights that might not emerge from dominant perspectives.' }
    ],
    correctAnswer: 'D',
    explanation: 'Standpoint epistemology claims marginalized perspectives are methodologically valuable—they can reveal what dominant perspectives miss—not that they are automatically correct. (D) captures this nuanced claim.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-057',
    question: 'Historian Jill Lepore has examined how nations construct their histories, noting that the stories countries tell about their pasts shape their political present. She observes that struggles over historical narratives often intensify during periods of political conflict. This pattern suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Professional historians should avoid participating in public debates about historical interpretation.' },
      { letter: 'B', text: 'Historical research methods have become more rigorous over the past century.' },
      { letter: 'C', text: 'Popular understandings of history are generally more accurate than academic accounts.' },
      { letter: 'D', text: 'Historical narratives function as political resources that different groups compete to control.' }
    ],
    correctAnswer: 'D',
    explanation: 'If struggles over historical narratives intensify during political conflict, it suggests these narratives are politically valuable. (D) captures this: historical narratives are resources groups compete to control.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 9),

  addRating({
    id: 'sat-p1-058',
    question: 'Behavioral economist Richard Thaler has studied how "mental accounting"—the tendency to treat money differently depending on its source or intended use—leads people to make economically irrational decisions. For example, people might refuse to spend "windfall" money on necessities but readily spend regular income on luxuries. This phenomenon suggests that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'People who receive large inheritances tend to invest more conservatively than those who earn their money.' },
      { letter: 'B', text: 'Economic policies that assume people treat all money fungibly may fail to predict actual behavior.' },
      { letter: 'C', text: 'Financial literacy education should focus primarily on mathematical concepts.' },
      { letter: 'D', text: 'Financial decision-making is influenced by psychological factors that standard economic models often ignore.' }
    ],
    correctAnswer: 'D',
    explanation: 'Mental accounting shows people don\'t treat money as fungible (interchangeable), contrary to standard economic assumptions. This reveals psychological factors that standard models miss.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 8),

  addRating({
    id: 'sat-p1-059',
    question: 'Philosopher Charles Taylor has argued against "atomistic" views of the self that treat individuals as fundamentally separate from their social context. He contends that human identity is dialogically constituted—we become who we are through interactions with significant others and the broader culture. This view implies that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'Individuals cannot be held responsible for their actions since those actions are shaped by social forces.' },
      { letter: 'B', text: 'Psychology should focus exclusively on studying social groups rather than individuals.' },
      { letter: 'C', text: 'The boundaries between individual and society are more permeable than atomistic views suggest.' },
      { letter: 'D', text: 'Authentic self-expression requires rejecting the values and norms of one\'s culture.' }
    ],
    correctAnswer: 'C',
    explanation: 'If identity is dialogically constituted through social interaction, the self isn\'t separate from society but formed through it. This means the individual/society boundary is more permeable than atomism suggests.',
    difficulty: 'Hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose'
  }, 8),

  addRating({
    id: 'sat-p1-060',
    question: 'Media theorist Marshall McLuhan famously declared that "the medium is the message," arguing that communication technologies shape society more through their form than through the content they carry. Television\'s influence, for example, stems not just from what programs say but from how the medium structures attention and experience. Extending this analysis to digital media would suggest that ______. Which choice most logically completes the text?',
    options: [
      { letter: 'A', text: 'The internet has made access to information more equitable than ever before.' },
      { letter: 'B', text: 'Social media platforms are harmful primarily because of the misinformation they spread.' },
      { letter: 'C', text: 'Digital books are fundamentally identical to print books in their effects on readers.' },
      { letter: 'D', text: 'Smartphones\' effects on cognition and social relationships extend beyond the content people access on them.' }
    ],
    correctAnswer: 'D',
    explanation: 'McLuhan emphasized that media\'s form, not just content, shapes society. Applied to smartphones, this means their effects extend beyond what content people consume to how the technology structures experience.',
    difficulty: 'Hard',
    domain: 'Information and Ideas',
    skill: 'Inferences'
  }, 8)
];
