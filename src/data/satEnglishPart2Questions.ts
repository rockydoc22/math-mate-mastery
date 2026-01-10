import { EnglishQuestion } from './englishQuestions';

// SAT English Part 2 Questions - Hard difficulty (8-10) with balanced answer distribution
// 60 questions: 15 A, 15 B, 15 C, 15 D
export const satEnglishPart2Questions: EnglishQuestion[] = [
  // ===== A ANSWERS (15 questions) =====
  {
    id: "satp2001",
    question: "One theory behind human bipedalism speculates that it originated in a mostly ground-based ancestor that practiced four-legged 'knuckle-walking,' like chimpanzees and gorillas do today, and eventually evolved into moving upright on two legs. But recently, researchers observed orangutans, another relative of humans, standing on two legs on tree branches and using their arms for balance while they reached for fruits. These observations may suggest that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "bipedalism evolved because it was advantageous to a tree-dwelling ancestor of humans." },
      { letter: "B", text: "bipedalism must have evolved simultaneously with knuckle-walking and tree-climbing." },
      { letter: "C", text: "moving between the ground and the trees would have been difficult without bipedalism." },
      { letter: "D", text: "a knuckle-walking human ancestor could have easily moved bipedally in trees." }
    ],
    correctAnswer: "A",
    explanation: "The finding that orangutans sometimes stand on two legs in trees while using their arms to balance and reach for fruits suggests another possible explanation: perhaps a tree-dwelling ancestor of humans began moving on two legs because it offered an advantage, such as access to certain foods.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2002",
    question: "Neural networks are computer models intended to reflect the organization of human brains and are often used in studies of brain function. According to an analysis of 11,000 such networks, Rylan Schaeffer and colleagues advise caution when drawing conclusions about brains from observations of neural networks. They found that when attempting to mimic grid cells, while 90% of the networks could accomplish navigation-related tasks, only about 10% of those exhibited any behaviors similar to those of grid cells. But even this approximation of grid-cell activity has less to do with similarity between the neural networks and biological brains than it does with the rules programmed into the networks.\n\nWhich finding, if true, would most directly support the underlined claim?",
    options: [
      { letter: "A", text: "The rules that allow for networks to exhibit behaviors like those of grid cells have no equivalent in the function of biological brains." },
      { letter: "B", text: "The networks that do not exhibit behaviors like those of grid cells were nonetheless programmed with rules that had proven useful in earlier neural-network studies." },
      { letter: "C", text: "Neural networks can often accomplish tasks that biological brains do, but they are typically programmed with rules to model multiple types of brain cells simultaneously." },
      { letter: "D", text: "Once a neural network is programmed, it is trained on certain tasks to see if it can independently arrive at processes that are similar to those performed by biological brains." }
    ],
    correctAnswer: "A",
    explanation: "While many networks can perform navigation tasks, or even mimic grid cells, it doesn't mean they're actually behaving like biological brains—this finding suggests that the rules that govern neural network behavior are completely unlike the way real brains work.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 10
  },
  {
    id: "satp2003",
    question: "Algae living within the tissues of corals play a critical role in keeping corals, and the marine ecosystems they are part of, thriving. Some coral species appear brown in color when healthy due to the algae colonies living in their tissues. In the event of an environmental stressor, the algae can die or be expelled, causing the corals to appear white. To recover the algae, the bleached corals then begin to produce bright colors, which block intense sunlight, encouraging the light-sensitive algae to recolonize the corals.\n\nWhat does the text most strongly suggest about corals that produce bright colors?",
    options: [
      { letter: "A", text: "These corals have likely been subjected to stressful environmental conditions." },
      { letter: "B", text: "These corals are likely more vulnerable to exposure from intense sunlight than white corals are." },
      { letter: "C", text: "These corals have likely recovered from an environmental event without the assistance of algae colonies." },
      { letter: "D", text: "These corals are more likely to survive without algae colonies than brown corals are." }
    ],
    correctAnswer: "A",
    explanation: "The text says that corals produce bright colors to block sunlight and encourage algae to recolonize after 'an environmental stressor.' From this, we can infer that corals that produce bright colors have probably been subjected to an environmental stressor.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 8
  },
  {
    id: "satp2004",
    question: "The Hubble Space Telescope (HST) is projected to maintain operation until at least 2030, but it has already revolutionized high-resolution imaging of solar-system bodies in visible and ultraviolet (UV) light wavelengths, notwithstanding that only about 6% of the bodies imaged by the HST are within the solar system. NASA researcher Cindy L. Young and colleagues assert that a new space telescope dedicated exclusively to solar-system observations would permit an extensive survey of minor solar-system bodies and long-term UV observation to discern how solar-system bodies change over time. Young and colleagues' recommendation therefore implies that the HST ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "will likely continue to be used primarily to observe objects outside the solar system." },
      { letter: "B", text: "will no longer be used to observe solar system objects if the telescope recommended by Young and colleagues is deployed." },
      { letter: "C", text: "can be modified to observe the features of solar system objects that are of interest to Young and colleagues." },
      { letter: "D", text: "lacks the sensors to observe the wavelengths of light needed to discern how solar system bodies change over time." }
    ],
    correctAnswer: "A",
    explanation: "The HST will operate until at least 2030, but it's only observing stuff inside our solar system 6% of the time. If we could get a different telescope to observe stuff inside our solar system 100% of the time and take more extensive images of certain things, then the HST could continue to be used mainly for observing stuff outside the solar system.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2005",
    question: "Geoglyphs are large-scale designs of lines or shapes created in a natural landscape. The Nazca Lines were created in the Nazca Desert in Peru by several Indigenous civilizations over a period of many centuries. Peruvian archaeologist Johny Isla specializes in these geoglyphs. At a German exhibit about the Nazca Lines, he saw an old photograph of a large geoglyph of a whalelike figure and was surprised that he didn't recognize it. Isla returned to Peru and used a drone to search a wide area, looking for the figure from the air. This approach suggests that Isla thought that if he hadn't already seen it, the whalelike geoglyph ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "must represent a species of whale that went extinct before there were any people in Peru." },
      { letter: "B", text: "is actually located in Germany, not Peru, and isn't part of the Nazca Lines at all." },
      { letter: "C", text: "is probably in a location Isla hadn't ever come across while on the ground." },
      { letter: "D", text: "was almost certainly created a long time after the other Nazca Lines geoglyphs were created." }
    ],
    correctAnswer: "C",
    explanation: "Given his expertise, and his surprise at being unfamiliar with the whale glyph, the text strongly suggests that Isla believed he would have noticed the glyph if he had been to its location. Thus, the text implies that the whalelike geoglyph is likely in a location Isla had not previously been to.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2006",
    question: "In 2022, Elizabeth Reeck and colleagues studied whether the decision-making modes that guide consumers influence their choice between nonenvironmentally friendly standard electricity plans and environmentally friendly green plans that cap electricity usage. Study participants who self-reported using either an Affect Mode or Role Mode—which prioritize choices that have a stronger positive emotional or social impact, respectively—were more likely to select a green plan. Conversely, participants using a Calculation Mode—which aims to minimize both financial cost and personal inconvenience—were more likely to select a standard plan, even when the green option was cheaper. This finding suggests that participants using a Calculation Mode ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "were equally unlikely to factor the financial savings of the green plan into their decision-making as were participants using either the Affect or Role Modes." },
      { letter: "B", text: "may have been less strongly motivated to appear socially responsible with their choice of plan than they realized." },
      { letter: "C", text: "may have determined that the green plan imposed additional burdens on them that were not sufficiently offset by the potential financial savings." },
      { letter: "D", text: "were less likely to believe that the green plan was truly cost-effective than were participants using either the Affect or Role Modes." }
    ],
    correctAnswer: "C",
    explanation: "If those using a Calculation Mode disfavor the green plan, it would be due to some financial or convenience burden the green plan imposes that the other doesn't. The text indicates that the green plan had a lower financial cost but was nonetheless rejected by participants using the Calculation Mode. It therefore follows that the green plan likely imposed a convenience burden that outweighed potential financial savings for these participants.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2007",
    question: "Physicist Marcela Carena and her team developed a model proposing that the early universe was defined by several distinct periods of inflation—rapid, exponential expansion—rather than just one period. These periods led to the formation of primordial black holes: small, dense black holes that were created from matter being drawn together through the interaction of gravitational forces. If confirmed, this model would provide important evidence for the existence of primordial black holes, which are hypothesized to account for some dark matter in the current universe. Unlike some competing models, Carena's model predicts the production of gravitational waves, so it may be possible to ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "determine whether Carena's model accurately describes the early universe by searching for gravitational waves." },
      { letter: "B", text: "confirm the existence of dark matter only if the presence of gravitational waves is also confirmed." },
      { letter: "C", text: "rule out models that feature multiple periods of inflation in favor of models that feature only a single period." },
      { letter: "D", text: "learn more about the nature of dark matter than was previously possible by studying gravitational waves." }
    ],
    correctAnswer: "A",
    explanation: "Unlike some competing models, Carena's model predicts the production of gravitational waves, suggesting that scientists could verify her model by searching for gravitational waves. If gravitational waves are found, it would support Carena's model over competing ones.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2008",
    question: "A number of species of small passerine birds, including many species of warblers, are known to engage in 'mobbing' behavior toward predators: when one bird spots a predator, other nearby birds of multiple species arrive and vocalize loudly while diving at the predator. It's been suggested that this behavior developed because it's mutually beneficial to all the species involved, but a 2017 study by Nora V. Carlson and colleagues found that when recordings of mobbing calls were broadcast without any predator being present, the playback always attracted birds of multiple species regardless of which species had made the call being broadcast. This finding supports the mutual benefit hypothesis because ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "it indicates that multiple species respond to mob calls even when those calls aren't given in response to a predator." },
      { letter: "B", text: "it shows that some species of bird have mob calls that are perceived as especially loud or threatening." },
      { letter: "C", text: "it suggests that the vocalizations used in mobbing by one species could be understood by individuals of other species." },
      { letter: "D", text: "it implies that only passerine birds participate in mobbing behavior against predators." }
    ],
    correctAnswer: "A",
    explanation: "The finding that birds of multiple species respond to mobbing calls even without a predator present indicates that multiple species are mutually invested in responding to these calls, supporting the hypothesis that mobbing behavior is mutually beneficial.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 8
  },
  {
    id: "satp2009",
    question: "In studies of working memory, participants are briefly shown a display of several items and are later asked to recall information about one of the items. In many such studies, the item that a participant must recall information about is indicated after the display is over. In a 2008 study, however, psychologist Yuhong V. Jiang and colleagues presented participants with displays of colored shapes and indicated which item would need to be recalled by a verbal cue at various times either before, during, or after the display. The results showed that accurate recall was most common when the verbal cue was given before the display. This finding suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "participants could use the advance cue to focus their attention on the relevant item during the display." },
      { letter: "B", text: "participants had been familiar with the shapes used in the displays prior to the study." },
      { letter: "C", text: "verbal cues are more effective than visual cues for directing attention to items in a display." },
      { letter: "D", text: "participants could easily remember all items in the display regardless of when the cue was given." }
    ],
    correctAnswer: "A",
    explanation: "When participants received the verbal cue before the display, they could focus their attention on the relevant item during the display, leading to more accurate recall. This is more effective than trying to remember the item after the display when memory has already begun to fade.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2010",
    question: "Political scientist Mara Ostfeld has hypothesized that coverage of elections in which racial or ethnic minorities are running for office may inadvertently increase the tendency of majority-group members to vote for same-race candidates. Her hypothesis rests on the assumption that when coverage of these elections mentions candidates' races or ethnicities, majority-group members' awareness of their own racial or ethnic identity may be heightened—an awareness that has been linked in prior research to same-race voting preference. Ostfeld's hypothesis implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "media coverage of elections that does not mention the race or ethnicity of minority candidates may result in more votes for those candidates from majority-group voters." },
      { letter: "B", text: "majority-group voters are more likely than minority voters to be influenced by media coverage of elections." },
      { letter: "C", text: "minority candidates would receive more votes if the media refrained from covering elections altogether." },
      { letter: "D", text: "same-race voting preferences are more pronounced in local elections than in national elections." }
    ],
    correctAnswer: "A",
    explanation: "Ostfeld's hypothesis suggests that mentioning race/ethnicity in election coverage heightens majority-group awareness of their own identity, leading to same-race voting. Therefore, media coverage that doesn't mention candidates' race might result in less identity-awareness and potentially more votes for minority candidates from majority-group voters.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2011",
    question: "In superfluorescence, electrical charges known as dipoles emit light in synchronized bursts so intense that they are visible to the eye. Until recently, this phenomenon has only been observed at extremely cold temperatures because dipoles cannot synchronize at higher temperatures. But in a study, Melike Biliroglu and colleagues observed superfluorescence at room temperature in thin films made of perovskite and other similarly crystalline materials; the researchers propose that the formation of shock-absorbing quasiparticles called polarons in the material protects dipoles from thermal interference. Based on the text, how are polarons believed to be involved in the superfluorescence observed in Biliroglu and colleagues' study?",
    options: [
      { letter: "A", text: "Polarons enable superfluorescent bursts to cross from one crystalline material to another." },
      { letter: "B", text: "Polarons allow for the dipoles to synchronize despite higher temperatures." },
      { letter: "C", text: "Polarons accelerate the dipoles' release of superfluorescent bursts." },
      { letter: "D", text: "Polarons decrease the intensity of the superfluorescent burst." }
    ],
    correctAnswer: "B",
    explanation: "Biliroglu and colleagues believe that polarons help dipoles synchronize at temperatures well above those at which superfluorescence had previously been observed. The polarons might absorb the thermal shocks that typically disrupt dipole synchronization at warmer temperatures.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 9
  },
  {
    id: "satp2012",
    question: "Economists have long assumed that humans behave rationally when making economic decisions. But behavioral economists such as Daniel Kahneman have shown that people's decision-making is often influenced by cognitive biases—mental shortcuts that can lead to systematic errors in judgment. For example, the availability heuristic leads people to overestimate the probability of events that are easier to recall, such as dramatic news stories. Kahneman's work suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "economic models that assume purely rational behavior may fail to accurately predict how people actually make decisions." },
      { letter: "B", text: "cognitive biases are beneficial because they allow people to make faster decisions." },
      { letter: "C", text: "the availability heuristic is the most common cognitive bias affecting economic decisions." },
      { letter: "D", text: "economists should abandon quantitative methods in favor of psychological analysis." }
    ],
    correctAnswer: "A",
    explanation: "Since Kahneman's work shows that people's decision-making is influenced by cognitive biases that lead to systematic errors, this suggests that economic models assuming purely rational behavior may not accurately predict real-world decisions.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2013",
    question: "The Harlem Renaissance of the 1920s and 1930s is often characterized as primarily a literary movement, but recent scholarship has emphasized the crucial role of visual artists. Painter Aaron Douglas, for example, developed a distinctive style that synthesized African aesthetic traditions with modernist techniques. His murals for public spaces helped define the visual identity of the era. Douglas's work demonstrates that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "the Harlem Renaissance encompassed significant achievements in visual arts as well as literature." },
      { letter: "B", text: "African aesthetic traditions were incompatible with European modernism until Douglas's innovations." },
      { letter: "C", text: "murals were considered more prestigious than easel paintings during the Harlem Renaissance." },
      { letter: "D", text: "the literary achievements of the Harlem Renaissance have been overrated by historians." }
    ],
    correctAnswer: "A",
    explanation: "The text argues against characterizing the Harlem Renaissance as primarily literary, pointing to Douglas's significant visual art achievements as evidence that the movement encompassed important work in visual arts as well.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 8
  },
  {
    id: "satp2014",
    question: "Marine biologists studying whale communication have found that humpback whale songs can travel across entire ocean basins. In a recent study, researchers recorded songs from humpback whales in the South Pacific and compared them to songs recorded from whales in the North Atlantic. They found that certain melodic patterns appeared in both populations despite the vast distance between them. This finding suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "humpback whale songs may be transmitted across populations that rarely or never directly encounter each other." },
      { letter: "B", text: "whales in the South Pacific originated from the North Atlantic population." },
      { letter: "C", text: "all humpback whale songs are fundamentally identical regardless of geographic location." },
      { letter: "D", text: "melodic patterns in whale songs are determined entirely by genetics rather than learned behavior." }
    ],
    correctAnswer: "A",
    explanation: "The presence of similar melodic patterns in geographically distant whale populations suggests that songs may be transmitted between populations that don't directly encounter each other, possibly through intermediate populations or long-distance acoustic transmission.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2015",
    question: "Archaeologists studying ancient trade routes have traditionally relied on the distribution of distinctive pottery styles to trace commercial networks. However, chemical analysis of clay sources has revealed that vessels of similar style were often produced in multiple locations. This discovery implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "pottery styles alone may be insufficient evidence for reconstructing ancient trade networks." },
      { letter: "B", text: "ancient potters had more advanced technical skills than previously believed." },
      { letter: "C", text: "chemical analysis is less reliable than stylistic analysis for dating pottery." },
      { letter: "D", text: "trade networks were less extensive than the distribution of pottery styles suggests." }
    ],
    correctAnswer: "A",
    explanation: "If vessels of similar style were produced in multiple locations rather than being traded from a single source, then the distribution of pottery styles alone cannot be used as reliable evidence for tracing trade routes—the pottery may have been locally produced rather than imported.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },

  // ===== B ANSWERS (15 questions) =====
  {
    id: "satp2016",
    question: "In superfluorescence, electrical charges known as dipoles emit light in synchronized bursts so intense that they are visible to the eye. Until recently, this phenomenon has only been observed at extremely cold temperatures because dipoles cannot synchronize at higher temperatures. But in a study, Melike Biliroglu and colleagues observed superfluorescence at room temperature in thin films made of perovskite and other crystalline materials.\n\nBased on the text, how are polarons believed to be involved in the superfluorescence observed?",
    options: [
      { letter: "A", text: "Polarons enable superfluorescent bursts to cross from one crystalline material to another." },
      { letter: "B", text: "Polarons allow for the dipoles to synchronize despite higher temperatures." },
      { letter: "C", text: "Polarons accelerate the dipoles' release of superfluorescent bursts." },
      { letter: "D", text: "Polarons decrease the intensity of the superfluorescent burst." }
    ],
    correctAnswer: "B",
    explanation: "The researchers propose that polarons might absorb the thermal shocks that typically disrupt dipole synchronization at warmer temperatures, thus allowing dipoles to synchronize at room temperature.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 9
  },
  {
    id: "satp2017",
    question: "One challenge when researching whether holding elected office changes a person's behavior is the problem of ensuring that the experiment has an appropriate control group. To reveal the effect of holding office, researchers must compare people who hold elected office with people who do not hold office but who are otherwise similar to the office-holders. Since researchers are unable to control which politicians win elections, they therefore ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "struggle to find valid data about the behavior of politicians who do not currently hold office." },
      { letter: "B", text: "can only conduct valid studies with people who have previously held office rather than people who presently hold office." },
      { letter: "C", text: "should select a control group of people who differ from office-holders in several significant ways." },
      { letter: "D", text: "will find it difficult to identify a group of people who can function as an appropriate control group for their studies." }
    ],
    correctAnswer: "D",
    explanation: "Because researchers aren't able to influence who wins elections, they're also unable to determine who would serve as an appropriately similar member of a control group. Thus, it logically follows that researchers will find it difficult to identify an appropriate control group.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2018",
    question: "Modern dog breeds are largely the result of 160 years of owners crossbreeding certain dogs in order to select for particular physical appearances. Owners often say that some breeds are also more likely than others to have particular personality traits—basset hounds are affectionate; boxers are easy to train—but Kathleen Morrill and colleagues found through a combination of owner surveys and DNA sequencing of 2,000 dogs that while physical traits are predictably heritable among purebred dogs, behavior varies widely among dogs of the same breed.\n\nWhich choice best states the main idea of the text?",
    options: [
      { letter: "A", text: "Dog breeds would not exist without many years of human intervention in dogs' reproduction." },
      { letter: "B", text: "Research fails to confirm a commonly held belief about dog breeds and behavior." },
      { letter: "C", text: "The dog breeds most popular among owners have often changed over the past 160 years." },
      { letter: "D", text: "A study of dog breeds is notable for its usage of both opinion surveys and DNA sequencing." }
    ],
    correctAnswer: "B",
    explanation: "The text indicates that dog owners typically claim that some dog breeds are more likely than others to have particular personality traits. However, research found that behavior varies widely among dogs of the same breed, failing to confirm this commonly held belief.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 8
  },
  {
    id: "satp2019",
    question: "Some Astyanax mexicanus, a river-dwelling fish found in northeast Mexico, have colonized caves in the region. Although there is little genetic difference between river and cave A. mexicanus and all members of the species can emit the same sounds, biologist Carole Hyacinthe and colleagues found that the context and significance of those sounds vary by location—e.g., the click that river-dwelling A. mexicanus use to signal aggression is used by cave dwellers when foraging. Hyacinthe and colleagues note that differences in sonic communication could accumulate to the point of inhibiting interbreeding among fish from different locations, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "although A. mexicanus living in rivers are genetically similar to those living in caves, river fish rely on sonic communication less than cave fish do." },
      { letter: "B", text: "although A. mexicanus is a single species at present, it could be in the process of splitting into distinct populations with different characteristics." },
      { letter: "C", text: "although all A. mexicanus emit sounds, the fish living in rivers produce some sounds that the fish living in caves do not, and vice versa." },
      { letter: "D", text: "although A. mexicanus from different locations can interbreed currently, river fish and cave fish are sufficiently genetically distinct that they can be considered separate species." }
    ],
    correctAnswer: "B",
    explanation: "If differences in sonic communication could eventually prevent fish from different locations from interbreeding, this suggests that even though the fish are a single species right now, they could be in the process of splitting into distinct populations with different characteristics.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2020",
    question: "Elizabeth Asiedu has identified a negative correlation between the share of developing countries' economies derived from natural-resource extraction and those countries' receipts of foreign investment. This may appear counterintuitive—resource extraction requires initial investments at scales best met by multinational corporations—but Asiedu notes that natural-resource industries' boom-bust cycle can destabilize local currencies and increase developing countries' vulnerability to external shocks, creating levels of uncertainty to which foreign investors are typically averse.\n\nWhich choice best states the main idea of the text?",
    options: [
      { letter: "A", text: "Although it may seem surprising that foreign investment declines in developing countries as natural-resource extraction makes up a larger share of those countries' economies, that decline happens because resource extraction requires initial investments too large for foreign investors to supply." },
      { letter: "B", text: "Although developing countries tend to become less dependent on foreign investment as natural-resource industries make up a larger share of their economies, this change may not occur if the boom-bust cycle of those industries destabilizes local currencies." },
      { letter: "C", text: "Although one might expect that foreign investment would increase as natural-resource extraction makes up a larger share of developing countries' economies, the opposite happens because heavy reliance on natural resources can lead to unattractive conditions for investors." },
      { letter: "D", text: "Although foreign investors tend to avoid initial investments in natural-resource industries in developing countries, foreign investment may increase significantly as those industries stabilize and the risks associated with them decline." }
    ],
    correctAnswer: "C",
    explanation: "The text explains that contrary to expectations, foreign investment is typically lower in developing countries whose economies are more dependent on natural-resource extraction because the boom-bust cycle creates economic instability that investors want to avoid.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 9
  },
  {
    id: "satp2021",
    question: "For many years, the only existing fossil evidence of mixopterid eurypterids—an extinct family of large aquatic arthropods known as sea scorpions—came from four species living on the paleocontinent of Laurussia. In a discovery that expands our understanding of the geographical distribution of mixopterids, paleontologist Bo Wang and others have identified fossilized remains of a new mixopterid species, Terropterus xiushanensis, that lived over 400 million years ago on the paleocontinent of Gondwana.\n\nAccording to the text, why was Wang and his team's discovery of the Terropterus xiushanensis fossil significant?",
    options: [
      { letter: "A", text: "The fossil constitutes the first evidence found by scientists that mixopterids lived more than 400 million years ago." },
      { letter: "B", text: "The fossil helps establish that mixopterids are more closely related to modern arachnids and horseshoe crabs than previously thought." },
      { letter: "C", text: "The fossil helps establish a more accurate timeline of the evolution of mixopterids on the paleocontinents of Laurussia and Gondwana." },
      { letter: "D", text: "The fossil constitutes the first evidence found by scientists that mixopterids existed outside the paleocontinent of Laurussia." }
    ],
    correctAnswer: "D",
    explanation: "The text explains that up until Wang and his team's discovery, the only fossil evidence of mixopterids came from the paleocontinent of Laurussia. Their discovery of a mixopterid from Gondwana was significant because it was the first evidence of mixopterids outside of Laurussia.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 8
  },
  {
    id: "satp2022",
    question: "German theater practitioner Bertolt Brecht (1898–1956) believed that theater should elicit an intellectual rather than an emotional response from audiences, provoking them to consider social and political realities that extend beyond the characters and events depicted onstage. Brecht's influence can be seen in English playwright Caryl Churchill's 1979 play Cloud 9: although the play sometimes invites empathetic reactions, it primarily works to engage audiences in an interrogation of patriarchy and colonialism, which it does by placing audiences at a distance, thereby encouraging them to ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "focus on the characters' beliefs about social and political issues as revealed by the characters' actions." },
      { letter: "B", text: "reflect on social and political phenomena not directly related to patriarchy and colonialism." },
      { letter: "C", text: "recognize pertinent social and political parallels between Germany during Brecht's time and England at the time when Churchill was writing Cloud 9." },
      { letter: "D", text: "be dispassionate as they think critically about the social and political questions raised by the play." }
    ],
    correctAnswer: "D",
    explanation: "Churchill's play was influenced by Brecht's belief that theater should elicit an intellectual rather than an emotional response. Therefore, it makes sense that Churchill would strive to have audiences think dispassionately (without emotion) and critically about the social and political questions raised by the play.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2023",
    question: "Scientists studying Mars long thought the history of its crust was relatively simple. Research showed that the crust was largely composed of basalt, likely as a result of intense volcanic activity that brought about a magma ocean, which then cooled to form the planet's surface. A study led by Valerie Payré focused on additional information that revealed the presence of surprisingly high concentrations of silica in certain regions on Mars. Since a planetary surface that formed in a mostly basaltic environment would be unlikely to contain large amounts of silica, Payré concluded that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "the information about silica concentrations collected by the spacecraft is likely more reliable than the silica information gleaned from infrared wavelengths detected from Mars's surface." },
      { letter: "B", text: "high silica concentrations on Mars likely formed from a different process than that which formed the crusts of other planets." },
      { letter: "C", text: "having a clearer understanding of the composition of Mars's crust and the processes by which it formed will provide more insight into how Earth's crust formed." },
      { letter: "D", text: "Mars's crust likely formed as a result of other major geological events in addition to the cooling of a magma ocean." }
    ],
    correctAnswer: "D",
    explanation: "Cooling magma would create basalt, but a surface formed in a mostly basaltic environment would be unlikely to contain large amounts of silica. Since Mars's crust does contain large amounts of silica, it is unlikely that Mars's crust was formed exclusively by cooling magma, suggesting other major geological events occurred.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2024",
    question: "Having written the impassioned call to arms 'Letter to the Spanish Americans' in 1791, Peruvian intellectual Juan Pablo Viscardo y Guzmán is often considered a forerunner for the independence movements in Latin America. But Viscardo's role in history would have remained insignificant were it not for Venezuelan revolutionary Francisco de Miranda, who was handed the unpublished letter after Viscardo's death. Miranda not only helped circulate the letter, but his edits and footnotes to the text position Miranda as a central figure in the text's creation.\n\nWhich choice best states the main idea of the text?",
    options: [
      { letter: "A", text: "The original authorship of 'Letter to the Spanish Americans' is disputed by contemporary historians." },
      { letter: "B", text: "The majority of the most eloquently stated arguments in 'Letter to the Spanish Americans' were written by Miranda." },
      { letter: "C", text: "Miranda played a crucial role in influencing the content and distribution of 'Letter to the Spanish Americans.'" },
      { letter: "D", text: "'Letter to the Spanish Americans' persuaded many people in Latin America to pursue national independence." }
    ],
    correctAnswer: "C",
    explanation: "The text describes how Miranda circulated, edited, and added footnotes to 'Letter to the Spanish Americans,' and claims that the letter and its author would have 'remained insignificant' if it weren't for Miranda's efforts.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 8
  },
  {
    id: "satp2025",
    question: "Archaeologists have held that the Casarabe culture, which emerged in the southwestern Amazon basin in the first millennium CE, was characterized by a sparse, widely distributed population and little intervention in the surrounding wilderness. Recently, however, archaeologist Heiko Prümers and colleagues conducted a study of the region using remote-sensing technology that enabled them to create three-dimensional images of the jungle-covered landscape from above, and the researchers concluded that the Casarabe people developed a form of urbanism in the Amazon basin.\n\nWhich finding about the remote-sensing images, if true, would most directly support Prümers and colleagues' conclusion?",
    options: [
      { letter: "A", text: "They show shapes consistent with widely separated settlements of roughly equal small size surrounded by uncultivated jungle." },
      { letter: "B", text: "They show shapes consistent with long-distance footpaths running from Casarabe territories to large cities outside the region inhabited by the Casarabe people." },
      { letter: "C", text: "They show shapes consistent with scattered small farms created by clearing jungle areas near sources of fresh water." },
      { letter: "D", text: "They show shapes consistent with monumental platforms and dense central settlements linked to smaller settlements by a system of canals and roadways." }
    ],
    correctAnswer: "D",
    explanation: "Dense central settlements linked to smaller ones would provide evidence of cities and suburbs—in other words, 'a form of urbanism.' This finding would support the archaeologists' conclusion.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 8
  },
  {
    id: "satp2026",
    question: "The concept of 'embodied cognition' suggests that our physical experiences shape how we think and understand abstract concepts. For example, studies have shown that people who are holding warm beverages tend to rate strangers as having 'warmer' personalities. Similarly, people asked to lean backward tend to recall past events more easily, while those leaning forward recall future plans more readily. These findings suggest that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "abstract thinking is impossible without physical sensations." },
      { letter: "B", text: "our understanding of abstract concepts may be grounded in physical metaphors." },
      { letter: "C", text: "warm beverages are essential for accurate personality assessments." },
      { letter: "D", text: "body posture has no effect on cognitive processes." }
    ],
    correctAnswer: "B",
    explanation: "The examples show that physical experiences (holding warm beverages, leaning backward or forward) influence how we think about abstract concepts (personality warmth, time). This suggests our understanding of abstract concepts may be grounded in physical metaphors.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2027",
    question: "Linguist Noam Chomsky proposed that humans possess an innate 'language acquisition device' that enables children to learn language with minimal input. Critics of this theory point to the case of Nicaraguan Sign Language, which emerged spontaneously in the 1980s when deaf children were brought together for the first time. The children developed a complex grammatical system without any adult input, but the system evolved over generations of learners rather than appearing fully formed. This evidence ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "completely refutes Chomsky's theory of innate language capacity." },
      { letter: "B", text: "suggests that while some aspects of language may be innate, others develop through social interaction." },
      { letter: "C", text: "proves that all languages develop through the same evolutionary process." },
      { letter: "D", text: "demonstrates that sign languages are fundamentally different from spoken languages." }
    ],
    correctAnswer: "B",
    explanation: "The Nicaraguan Sign Language case shows children could create grammatical structure (supporting some innate capacity) but the system evolved over generations (suggesting social factors also matter). This supports a view where both innate and social elements contribute to language.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2028",
    question: "Renaissance artist Leonardo da Vinci kept extensive notebooks filled with sketches and observations about anatomy, engineering, and natural phenomena. Many of these ideas, such as designs for flying machines and tanks, were centuries ahead of their time. However, Leonardo rarely published his findings or shared them with the broader scientific community. Historians argue that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "Leonardo's secretive nature prevented his ideas from influencing the development of science during his lifetime." },
      { letter: "B", text: "Leonardo's scientific achievements were more significant than his artistic accomplishments." },
      { letter: "C", text: "publishing scientific findings was uncommon during the Renaissance period." },
      { letter: "D", text: "Leonardo's notebooks contained no practically applicable designs." }
    ],
    correctAnswer: "A",
    explanation: "Since Leonardo rarely published or shared his findings, his advanced ideas would not have been available to influence other scientists during his lifetime. His secretive nature limited the broader impact of his scientific work.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2029",
    question: "Psychologist Carol Dweck distinguishes between 'fixed mindset' (believing abilities are innate and unchangeable) and 'growth mindset' (believing abilities can be developed through effort). Research in educational settings has shown that students with growth mindsets tend to perform better academically, particularly when facing challenges. However, some researchers have questioned whether simply teaching students about growth mindset produces lasting changes in achievement. This skepticism suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "growth mindset theory has been completely disproven by recent research." },
      { letter: "B", text: "changing deeply held beliefs about ability may require more than informational interventions." },
      { letter: "C", text: "fixed mindset is ultimately more beneficial for student achievement." },
      { letter: "D", text: "all students naturally possess growth mindsets." }
    ],
    correctAnswer: "B",
    explanation: "The skepticism about whether teaching students about growth mindset produces lasting changes suggests that simply providing information may not be enough—changing deeply held beliefs about ability may require more sustained or different types of interventions.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2030",
    question: "Coral reefs are among the most biodiverse ecosystems on Earth, yet they cover less than 1% of the ocean floor. Marine biologist Camilo Mora and colleagues attempted to estimate the total number of species inhabiting coral reefs by analyzing species accumulation rates across reef surveys worldwide. Their analysis suggested that the true number of reef species may be several times higher than current estimates. This finding implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "coral reefs are expanding their geographic range." },
      { letter: "B", text: "many reef species remain undiscovered and undescribed by scientists." },
      { letter: "C", text: "species diversity is uniform across all reef ecosystems." },
      { letter: "D", text: "current biodiversity estimates are inflated by counting the same species multiple times." }
    ],
    correctAnswer: "B",
    explanation: "If the true number of reef species is several times higher than current estimates, this implies that many reef species remain undiscovered and undescribed. Current surveys have only documented a fraction of actual reef biodiversity.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },

  // ===== C ANSWERS (15 questions) =====
  {
    id: "satp2031",
    question: "The domestic sweet potato (Ipomoea batatas) descends from a wild plant native to South America. It also populates the Polynesian Islands, where evidence confirms that Native Hawaiians and other Indigenous peoples were cultivating the plant centuries before seafaring first occurred between them and South America. To explain how the sweet potato was first introduced in Polynesia, botanist Pablo Muñoz-Rodríguez and colleagues analyzed the DNA of numerous varieties of the plant, concluding that Polynesian varieties diverged from South American ones over 100,000 years ago. Given that Polynesia was peopled only in the last three thousand years, the team concluded that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "the cultivation of the sweet potato in Polynesia likely predates its cultivation in South America." },
      { letter: "B", text: "Polynesian peoples likely acquired the sweet potato from South American peoples only within the last three thousand years." },
      { letter: "C", text: "human activity likely played no role in the introduction of the sweet potato in Polynesia." },
      { letter: "D", text: "Polynesian sweet potato varieties likely descend from a single South American variety that was domesticated, not wild." }
    ],
    correctAnswer: "C",
    explanation: "If Polynesian varieties of sweet potato diverged from South American varieties thousands of years before people were in Polynesia, it can reasonably be concluded that humans didn't play a role in bringing the sweet potato to Polynesia.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2032",
    question: "Poetry in Classical Nahuatl, the language of the Aztec Empire, relies on difrasismo, or a parallel noun construction that conventionally operates as a single metaphor. For example, the common difrasismo in cuauhtli in ocelotl (literally, 'the eagle, the jaguar') signifies 'warrior.' The device's function is both formal—providing structure to lines of verse—and ritual: semantic relations among the two nouns and the concept they signify can be tenuous, such that difrasismos are often only intelligible according to the conceptual associations observed in Aztec ceremonial culture.\n\nWhich statement about the difrasismo in cuauhtli in ocelotl is most strongly supported by the text?",
    options: [
      { letter: "A", text: "Its metaphorical significance derives from the semantic equivalence of the two nouns constituting the difrasismo." },
      { letter: "B", text: "Its unintelligibility may cause its formal function within a line of verse to go unnoticed by present-day readers." },
      { letter: "C", text: "Its apparent obscurity can be resolved when considered in the proper cultural context." },
      { letter: "D", text: "Its frequency in Classical Nahuatl poetry confirms its intelligibility to the Aztec audience." }
    ],
    correctAnswer: "C",
    explanation: "The text indicates that the meaning of difrasismos becomes intelligible in the context of Aztec ceremonial culture. Therefore, the difrasismo's apparent obscurity can be resolved when considered in the proper cultural context.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 9
  },
  {
    id: "satp2033",
    question: "Several scholars have argued that conditions in England in the late ninth through early eleventh centuries—namely, burgeoning literacy amid running conflicts between England's Anglo-Saxon kingdoms and Danish invaders—were especially conducive to the production of the Old English epic poem Beowulf, and they have dated the poem's composition accordingly. It is not inconceivable that Beowulf emerged from such a context, but privileging contextual fit over the linguistic evidence of an eighth- or even seventh-century composition requires a level of justification that thus far has not been presented.\n\nWhich choice best states the main idea of the text?",
    options: [
      { letter: "A", text: "Although there are some grounds for believing that Beowulf was composed between the late ninth and early eleventh centuries, advocates for that view tend to rely on evidence that has been called into question by advocates for an earlier date." },
      { letter: "B", text: "Although several scholars have dated Beowulf to the late ninth through early eleventh centuries, others have argued that doing so privileges a controversial interpretation of the social conditions of the period." },
      { letter: "C", text: "Although Beowulf fits well with the historical context of England in the late ninth through early eleventh centuries, it fits equally well with the historical context of England in the seventh and eighth centuries." },
      { letter: "D", text: "Although the claim of a late ninth- through early eleventh-century composition date for Beowulf has some plausibility, advocates for the claim have not compellingly addressed evidence suggesting an earlier date." }
    ],
    correctAnswer: "D",
    explanation: "The text suggests that while there is some plausibility to the later composition date, scholars who favor that date have not explained why the poem's fit with historical context should take precedence over the linguistic evidence suggesting an earlier composition.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 9
  },
  {
    id: "satp2034",
    question: "In a research paper, a student criticizes some historians of modern African politics, claiming that they have evaluated Patrice Lumumba, the first prime minister of what is now the Democratic Republic of the Congo, primarily as a symbol rather than in terms of his actions.\n\nWhich quotation from a work by a historian would best illustrate the student's claim?",
    options: [
      { letter: "A", text: "'Lumumba is a difficult figure to evaluate due to the starkly conflicting opinions he inspired during his life and continues to inspire today.'" },
      { letter: "B", text: "'The available information makes it clear that Lumumba's political beliefs and values were largely consistent throughout his career.'" },
      { letter: "C", text: "'Lumumba's practical accomplishments can be passed over quickly; it is mainly as the personification of Congolese independence that he warrants scholarly attention.'" },
      { letter: "D", text: "'Many questions remain about Lumumba's ultimate vision for an independent Congo; without new evidence coming to light, these questions are likely to remain unanswered.'" }
    ],
    correctAnswer: "C",
    explanation: "This quotation argues that Lumumba deserves scholarly attention as a symbol ('personification of Congolese independence') and not for his 'practical accomplishments' (his actions), which 'can be passed over quickly.' This expresses exactly the view that the student criticizes.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 8
  },
  {
    id: "satp2035",
    question: "The morphological novelty of echinoderms—marine invertebrates with radial symmetry—impedes comparisons with most other animals, in which bilateral symmetry is typical. Particularly puzzling are sea stars, thought to have evolved a headless layout from a known bilateral origin. Applying genomic knowledge of acorn worms (close relatives of sea stars) to sea stars, Laurent Formery et al. observed activity only in anterior genes across the sea star's entire body and some posterior genes limited to the edges, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "despite the greater prevalence of anterior genes in sea stars' genetic makeup, posterior genes active at the body's perimeter are primarily responsible for the starlike layout." },
      { letter: "B", text: "contrary to the belief that they evolved from early ancestors with the bilateral form, sea stars instead originated with an atypical body layout." },
      { letter: "C", text: "although the two species are closely related, there is only minimal correspondence in the genetic markers for head, tail, and trunk region development." },
      { letter: "D", text: "rather than undergoing changes resulting in the eventual elimination of a head region, as previously assumed, sea stars' morphology evolved to completely lack a trunk and consist primarily of a head region." }
    ],
    correctAnswer: "D",
    explanation: "The researchers found that anterior (head) genes are active across the sea star's entire body while no trunk-related genes are active. This suggests that rather than becoming 'headless' as they evolved, sea stars developed a body plan consisting almost entirely of a head region with no trunk region present.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 10
  },
  {
    id: "satp2036",
    question: "O Pioneers! is a 1913 novel by Willa Cather. In the novel, Cather depicts Alexandra Bergson as a person who takes comfort in understanding the world around her: ______\n\nWhich quotation from O Pioneers! most effectively illustrates the claim?",
    options: [
      { letter: "A", text: "'She looked fixedly up the bleak street as if she were gathering her strength to face something, as if she were trying with all her might to grasp a situation which, no matter how painful, must be met and dealt with somehow.'" },
      { letter: "B", text: "'She had never known before how much the country meant to her. The chirping of the insects down in the long grass had been like the sweetest music.'" },
      { letter: "C", text: "'Alexandra drew her shawl closer about her and stood leaning against the frame of the mill, looking at the stars which glittered so keenly through the frosty autumn air. She always loved to watch them, to think of their vastness and distance, and of their ordered march. It fortified her to reflect upon the great operations of nature, and when she thought of the law that lay behind them, she felt a sense of personal security.'" },
      { letter: "D", text: "'Alexandra drove off alone. The rattle of her wagon was lost in the howling of the wind, but her lantern, held firmly between her feet, made a moving point of light along the highway.'" }
    ],
    correctAnswer: "C",
    explanation: "In this quotation, Alexandra is described as enjoying looking at the stars and feeling a 'sense of personal security' when she contemplates nature's order and its governing laws. This shows that Alexandra takes comfort in understanding the world around her.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Command of Evidence",
    difficultyRating: 8
  },
  {
    id: "satp2037",
    question: "Economist Richard Thaler developed the concept of 'mental accounting,' which describes how people compartmentalize money into different mental categories. For example, people may treat a tax refund differently from regular income, even though the money has the same purchasing power. Research has shown that people are more likely to spend 'found money' like lottery winnings on luxury items, while they save money from regular paychecks. This behavior indicates that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "tax refunds should be eliminated to encourage saving." },
      { letter: "B", text: "lottery winnings always lead to financial irresponsibility." },
      { letter: "C", text: "financial decisions are influenced by the perceived source of money, not just its objective value." },
      { letter: "D", text: "saving is always preferable to spending on luxury items." }
    ],
    correctAnswer: "C",
    explanation: "The examples show that people treat money differently based on its perceived source (tax refund, lottery winnings, regular income) even though the money has the same objective value. This indicates that financial decisions are influenced by perceived source, not just objective value.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2038",
    question: "Geographers studying urban heat islands have found that cities are typically several degrees warmer than surrounding rural areas due to the absorption and retention of heat by buildings and pavement. However, recent research by Sarah Loughner and colleagues found that in some coastal cities, the urban heat island effect is reversed during sea breeze events, with rural areas actually becoming warmer than urban areas. This reversal occurs because ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "coastal cities have fewer buildings than inland cities." },
      { letter: "B", text: "sea breezes carry moisture that increases urban humidity." },
      { letter: "C", text: "the increased surface roughness of cities slows sea breezes, allowing more cool air to accumulate in urban areas." },
      { letter: "D", text: "rural areas lack the vegetation that provides natural cooling." }
    ],
    correctAnswer: "C",
    explanation: "The reversal of the urban heat island effect during sea breeze events suggests that cities are receiving more cooling benefit from sea breezes than rural areas. The surface roughness of cities (buildings) slows sea breezes, allowing cool air to accumulate in urban areas.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2039",
    question: "Art historian Linda Nochlin's influential 1971 essay 'Why Have There Been No Great Women Artists?' argued that the absence of women from the traditional art historical canon resulted not from inherent differences in ability but from institutional barriers that prevented women from receiving artistic training. Nochlin's analysis suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "women artists throughout history were equally talented as their male counterparts." },
      { letter: "B", text: "institutional barriers to women's artistic training have been completely eliminated." },
      { letter: "C", text: "changing institutional structures could lead to greater representation of women in the art historical canon." },
      { letter: "D", text: "art history should focus exclusively on previously excluded women artists." }
    ],
    correctAnswer: "C",
    explanation: "If the absence of women from the art historical canon resulted from institutional barriers to training rather than ability differences, then removing those barriers (changing institutional structures) could lead to greater representation of women in the canon.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2040",
    question: "Ecologists studying invasive species have found that some invasions fail not because the invasive species cannot survive in the new environment, but because they cannot establish self-sustaining populations. Researcher Carla D'Antonio has proposed that 'propagule pressure'—the number of individuals introduced and the frequency of introduction events—is often the key determinant of invasion success. D'Antonio's hypothesis implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all invasive species introductions are intentional." },
      { letter: "B", text: "environmental suitability is irrelevant to invasion success." },
      { letter: "C", text: "limiting the number and frequency of species introductions could reduce invasion success." },
      { letter: "D", text: "invasive species are always harmful to native ecosystems." }
    ],
    correctAnswer: "C",
    explanation: "If propagule pressure (the number and frequency of introductions) is often the key determinant of invasion success, then limiting the number and frequency of species introductions could reduce the likelihood of successful invasions.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2041",
    question: "Cognitive scientist George Lakoff argues that much of our abstract thinking is structured by conceptual metaphors—systematic mappings between concrete and abstract domains. For example, we speak of 'wasting time,' 'spending time,' and 'investing time,' treating time as though it were money. Lakoff suggests that these metaphors are not merely linguistic conventions but ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "are unique to English and not found in other languages." },
      { letter: "B", text: "can be easily changed through conscious effort." },
      { letter: "C", text: "fundamentally shape how we conceptualize and reason about abstract concepts." },
      { letter: "D", text: "are recent developments in human language evolution." }
    ],
    correctAnswer: "C",
    explanation: "Lakoff argues that conceptual metaphors are 'not merely linguistic conventions,' suggesting they are something more fundamental. The systematic mapping between concrete and abstract domains indicates that these metaphors fundamentally shape how we conceptualize and reason about abstract concepts.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2042",
    question: "Neuroscientist António Damásio's research on patients with damage to the ventromedial prefrontal cortex revealed that these patients had difficulty making decisions despite having intact reasoning abilities. Damásio proposed the 'somatic marker hypothesis,' suggesting that emotions play a crucial role in decision-making by providing rapid, intuitive evaluations of options. His research implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "pure rationality, without emotional input, may be insufficient for effective decision-making." },
      { letter: "B", text: "all decisions should be made based entirely on emotional responses." },
      { letter: "C", text: "people cannot reason effectively about abstract problems without emotional input." },
      { letter: "D", text: "the ventromedial prefrontal cortex is the only brain region involved in decision-making." }
    ],
    correctAnswer: "C",
    explanation: "If patients with intact reasoning abilities had difficulty making decisions due to impaired emotional processing, this suggests that pure rationality without emotional input may be insufficient for effective decision-making. Emotions provide crucial evaluative input.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2043",
    question: "Anthropologist David Graeber challenged conventional economic theories about the origin of money. While economists typically claim that money emerged from barter systems, Graeber's historical analysis found no evidence of societies where barter was the primary means of exchange. Instead, Graeber found that credit systems and gift economies preceded the invention of coins. This evidence suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "barter systems are more efficient than monetary economies." },
      { letter: "B", text: "credit systems are a recent innovation in economic history." },
      { letter: "C", text: "standard economic accounts of money's origins may be based on theoretical assumptions rather than historical evidence." },
      { letter: "D", text: "coins were invented before any form of credit or gift exchange." }
    ],
    correctAnswer: "C",
    explanation: "If economists claim money emerged from barter but historical analysis found no evidence of primary barter systems, this suggests that standard economic accounts of money's origins may be based on theoretical assumptions rather than actual historical evidence.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2044",
    question: "The placebo effect—improvement in symptoms when patients believe they are receiving treatment—has long been documented in medical research. However, researcher Ted Kaptchuk and colleagues conducted a study in which patients were explicitly told they were receiving placebos ('open-label placebos') and still experienced symptom improvement. This finding challenges the assumption that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all medical treatments work through physiological mechanisms." },
      { letter: "B", text: "patients must be unaware they are receiving placebos for placebo effects to occur." },
      { letter: "C", text: "deception is essential for the placebo effect to function." },
      { letter: "D", text: "placebo effects are always weaker than the effects of active treatments." }
    ],
    correctAnswer: "C",
    explanation: "The traditional understanding of placebos assumed that patients needed to believe they were receiving real treatment (i.e., deception was necessary). The finding that patients who knew they were receiving placebos still improved challenges this assumption that deception is essential.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2045",
    question: "Philosopher Thomas Kuhn's concept of 'paradigm shifts' describes how scientific revolutions occur not through gradual accumulation of knowledge but through sudden changes in the fundamental assumptions and methods of a scientific field. According to Kuhn, scientists working within a paradigm tend to ignore evidence that contradicts their paradigm's core assumptions. Kuhn's theory suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "scientific progress is always linear and cumulative." },
      { letter: "B", text: "individual scientists are always objective observers of evidence." },
      { letter: "C", text: "the theoretical framework scientists use can influence which evidence they consider significant." },
      { letter: "D", text: "paradigm shifts occur frequently in all scientific fields." }
    ],
    correctAnswer: "C",
    explanation: "If scientists working within a paradigm tend to ignore evidence that contradicts their core assumptions, this suggests that the theoretical framework scientists use can influence which evidence they consider significant or worthy of attention.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },

  // ===== D ANSWERS (15 questions) =====
  {
    id: "satp2046",
    question: "One challenge when researching whether holding elected office changes a person's behavior is the problem of ensuring that the experiment has an appropriate control group. To reveal the effect of holding office, researchers must compare people who hold elected office with people who do not hold office but who are otherwise similar to the office-holders. Since researchers are unable to control which politicians win elections, they therefore ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "struggle to find valid data about the behavior of politicians who do not currently hold office." },
      { letter: "B", text: "can only conduct valid studies with people who have previously held office rather than people who presently hold office." },
      { letter: "C", text: "should select a control group of people who differ from office-holders in several significant ways." },
      { letter: "D", text: "will find it difficult to identify a group of people who can function as an appropriate control group for their studies." }
    ],
    correctAnswer: "D",
    explanation: "Because researchers aren't able to influence who wins elections, they're also unable to determine who would serve as an appropriately similar member of a control group. Thus, researchers will find it difficult to identify an appropriate control group.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2047",
    question: "The morphological novelty of echinoderms—marine invertebrates with radial symmetry—impedes comparisons with most other animals, in which bilateral symmetry is typical. Particularly puzzling are sea stars, thought to have evolved a headless layout from a known bilateral origin. Research by Laurent Formery et al. observed activity only in anterior genes across the sea star's entire body and some posterior genes limited to the edges, suggesting that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "despite the greater prevalence of anterior genes, posterior genes are primarily responsible for the starlike layout." },
      { letter: "B", text: "contrary to prior belief, sea stars originated with an atypical body layout that was neither bilaterally nor radially symmetrical." },
      { letter: "C", text: "there is only minimal correspondence in genetic markers between sea stars and their close relatives." },
      { letter: "D", text: "rather than becoming headless as previously assumed, sea stars' morphology evolved to completely lack a trunk and consist primarily of a head region." }
    ],
    correctAnswer: "D",
    explanation: "The finding that anterior (head) genes are active across the sea star's entire body while no trunk-related genes are active suggests that sea stars developed a body plan consisting almost entirely of a head region with no trunk, rather than becoming headless.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 10
  },
  {
    id: "satp2048",
    question: "For many years, the only existing fossil evidence of mixopterid eurypterids—an extinct family of large aquatic arthropods—came from four species living on the paleocontinent of Laurussia. Paleontologist Bo Wang and others have identified fossilized remains of a new mixopterid species, Terropterus xiushanensis, that lived over 400 million years ago on the paleocontinent of Gondwana.\n\nAccording to the text, why was this discovery significant?",
    options: [
      { letter: "A", text: "The fossil constitutes the first evidence that mixopterids lived more than 400 million years ago." },
      { letter: "B", text: "The fossil helps establish that mixopterids are more closely related to modern arachnids than previously thought." },
      { letter: "C", text: "The fossil helps establish a more accurate timeline of mixopterid evolution." },
      { letter: "D", text: "The fossil constitutes the first evidence that mixopterids existed outside the paleocontinent of Laurussia." }
    ],
    correctAnswer: "D",
    explanation: "The text explains that up until this discovery, the only fossil evidence of mixopterids came from Laurussia. The discovery of a mixopterid from Gondwana was significant because it was the first evidence of mixopterids outside of Laurussia.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficultyRating: 8
  },
  {
    id: "satp2049",
    question: "German theater practitioner Bertolt Brecht believed that theater should elicit an intellectual rather than an emotional response from audiences. Brecht's influence can be seen in English playwright Caryl Churchill's 1979 play Cloud 9: the play primarily works to engage audiences in an interrogation of patriarchy and colonialism by placing audiences at a distance, thereby encouraging them to ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "focus on the characters' beliefs about social and political issues as revealed by their actions." },
      { letter: "B", text: "reflect on social and political phenomena not directly related to patriarchy and colonialism." },
      { letter: "C", text: "recognize social and political parallels between Germany during Brecht's time and England when Churchill was writing." },
      { letter: "D", text: "be dispassionate as they think critically about the social and political questions raised by the play." }
    ],
    correctAnswer: "D",
    explanation: "Churchill's play was influenced by Brecht's belief that theater should elicit an intellectual rather than emotional response. Therefore, Churchill would strive to have audiences think dispassionately (without emotion) and critically about the social and political questions raised.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2050",
    question: "Scientists studying Mars long thought the history of its crust was relatively simple. Data showed that the crust was largely composed of basalt from volcanic activity that created a magma ocean, which then cooled to form the planet's surface. A study led by Valerie Payré revealed surprisingly high concentrations of silica in certain regions. Since a planetary surface that formed in a mostly basaltic environment would be unlikely to contain large amounts of silica, Payré concluded that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "the information about silica concentrations is likely more reliable than data from infrared wavelengths." },
      { letter: "B", text: "high silica concentrations on Mars likely formed from a different process than on other planets." },
      { letter: "C", text: "understanding Mars's crust composition will provide insight into Earth's crust formation." },
      { letter: "D", text: "Mars's crust likely formed as a result of other major geological events in addition to the cooling of a magma ocean." }
    ],
    correctAnswer: "D",
    explanation: "Since a basaltic surface would unlikely contain large amounts of silica, and Mars does have high silica concentrations, this suggests that Mars's crust was not formed exclusively by cooling magma—other major geological events must have occurred.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2051",
    question: "Sociologist Erving Goffman's concept of 'impression management' describes how individuals in social interactions present idealized versions of themselves, concealing aspects that might undermine the impression they wish to convey. Goffman compared social life to theatrical performance, with 'front stage' behavior (what we show to others) differing from 'backstage' behavior (our private selves). Social media has complicated this dynamic because ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "social media users are always completely honest about their lives." },
      { letter: "B", text: "social media platforms prevent users from managing their impressions." },
      { letter: "C", text: "the distinction between public and private becomes less clear when people constantly document their lives." },
      { letter: "D", text: "the boundary between 'front stage' and 'backstage' behavior becomes increasingly blurred as people curate and broadcast their daily activities." }
    ],
    correctAnswer: "D",
    explanation: "Social media allows constant documentation and curation of daily activities, making it harder to maintain the traditional separation between 'front stage' (public) and 'backstage' (private) behavior that Goffman described.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2052",
    question: "Physicist Freeman Dyson proposed that an advanced civilization might eventually construct a massive shell around its star to capture most of the star's energy output. Astronomers searching for extraterrestrial intelligence have looked for such 'Dyson spheres' by searching for stars with unusual infrared signatures. However, critics argue that the engineering challenges of constructing and maintaining a solid shell around a star would be insurmountable. This criticism suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "Dyson spheres have definitely been constructed by alien civilizations." },
      { letter: "B", text: "astronomers should stop searching for unusual infrared signatures." },
      { letter: "C", text: "infrared signatures are not useful for detecting advanced civilizations." },
      { letter: "D", text: "even if advanced civilizations exist, they may not construct megastructures that are detectable from Earth." }
    ],
    correctAnswer: "D",
    explanation: "If the engineering challenges of constructing Dyson spheres are insurmountable, then advanced civilizations may not actually build such megastructures, meaning astronomers' search method might not detect advanced civilizations even if they exist.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2053",
    question: "Historian Fernand Braudel developed the concept of the 'longue durée,' which emphasizes studying history over long time spans rather than focusing on individual events or short periods. Braudel argued that deep structures—geographical, economic, and social conditions that change slowly over centuries—are more important for understanding historical change than political events. This approach implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "political events have no influence on historical development." },
      { letter: "B", text: "geography determines all aspects of human society." },
      { letter: "C", text: "historians should focus exclusively on ancient history." },
      { letter: "D", text: "understanding major historical transformations may require examining conditions that developed over many generations." }
    ],
    correctAnswer: "D",
    explanation: "If deep structures that change slowly over centuries are more important for understanding historical change, then understanding major transformations requires examining conditions that developed over long periods—many generations rather than immediate causes.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2054",
    question: "Linguist John McWhorter argues that text messaging and social media have not degraded language skills, as critics often claim. McWhorter points out that informal writing has always coexisted with formal writing, and that the ability to code-switch between different registers (formal and informal language) actually demonstrates sophisticated linguistic competence. McWhorter's argument suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all writing should follow formal grammatical rules." },
      { letter: "B", text: "text messaging is the most effective form of communication." },
      { letter: "C", text: "concerns about digital communication harming language skills may be overstated." },
      { letter: "D", text: "young people who use text messaging are more linguistically skilled than they appear." }
    ],
    correctAnswer: "D",
    explanation: "McWhorter's argument that code-switching between formal and informal language demonstrates sophisticated linguistic competence suggests that young people who use informal text messaging may actually be more linguistically skilled than critics assume.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2055",
    question: "Philosopher John Rawls proposed a thought experiment called the 'veil of ignorance' to determine principles of justice. Behind this veil, individuals must choose the principles that will govern society without knowing their own position in that society—their talents, wealth, or social status. Rawls argued that rational individuals behind the veil would choose principles that protect the least advantaged members of society. This argument assumes that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all members of society are equally talented and hardworking." },
      { letter: "B", text: "economic inequality is always unjust." },
      { letter: "C", text: "social position is determined entirely by chance." },
      { letter: "D", text: "rational individuals would be risk-averse when uncertain about their future position in society." }
    ],
    correctAnswer: "D",
    explanation: "Rawls's argument that individuals would choose to protect the least advantaged assumes that rational individuals would be risk-averse—they would want to ensure a decent outcome in case they end up in the worst position, rather than gambling on ending up well-off.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2056",
    question: "Economist Daron Acemoglu and political scientist James Robinson argue that differences in prosperity between nations are primarily explained by differences in political and economic institutions rather than by geography or culture. Countries with 'inclusive' institutions that protect property rights and allow broad participation prosper, while those with 'extractive' institutions that concentrate power and wealth stagnate. This theory implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "geography has no influence on economic development." },
      { letter: "B", text: "cultural factors are more important than institutions for prosperity." },
      { letter: "C", text: "all countries with similar geographies should have similar levels of prosperity." },
      { letter: "D", text: "institutional reform could enable currently poor countries to become prosperous." }
    ],
    correctAnswer: "D",
    explanation: "If differences in prosperity are primarily explained by differences in institutions rather than geography or culture, then changing institutions (through reform) could enable currently poor countries with extractive institutions to become prosperous.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2057",
    question: "Biologist Lynn Margulis proposed the endosymbiotic theory, which holds that mitochondria and chloroplasts in eukaryotic cells originated as free-living bacteria that were engulfed by ancestral cells. Initially controversial, this theory gained acceptance when researchers discovered that these organelles have their own DNA, which more closely resembles bacterial DNA than the DNA in the cell's nucleus. The success of the endosymbiotic theory demonstrates that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all scientific theories are eventually proven correct." },
      { letter: "B", text: "genetic evidence is irrelevant to evolutionary biology." },
      { letter: "C", text: "bacteria cannot survive inside other cells." },
      { letter: "D", text: "initially controversial scientific ideas can gain acceptance through accumulation of supporting evidence." }
    ],
    correctAnswer: "D",
    explanation: "The endosymbiotic theory was initially controversial but gained acceptance when supporting evidence (the discovery that organelles have bacterial-like DNA) accumulated. This demonstrates that controversial ideas can gain acceptance through evidence.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2058",
    question: "Psychologist Stanley Milgram's famous obedience experiments showed that ordinary people could be induced to administer what they believed were dangerous electric shocks to others when instructed by an authority figure. Critics have argued that participants may have suspected the shocks were not real, potentially invalidating Milgram's conclusions about obedience. However, post-experiment interviews and physiological measures indicated genuine distress in participants. This evidence suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all participants in the study believed the shocks were real." },
      { letter: "B", text: "Milgram's ethical standards were appropriate for psychological research." },
      { letter: "C", text: "obedience to authority is never justified." },
      { letter: "D", text: "the criticism that participants were merely playing along may not fully account for their behavior in the experiments." }
    ],
    correctAnswer: "D",
    explanation: "The evidence of genuine distress in participants (from interviews and physiological measures) suggests that at least many participants believed the situation was real. This undermines the criticism that participants were merely playing along or suspected the shocks weren't real.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  },
  {
    id: "satp2059",
    question: "Literary scholar Edward Said's concept of 'Orientalism' describes how Western scholarship and literature have historically represented Middle Eastern and Asian cultures as exotic, backward, and fundamentally different from the West. Said argued that these representations served to justify colonial domination by portraying colonized peoples as incapable of self-governance. Said's analysis suggests that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "all academic scholarship about non-Western cultures is biased." },
      { letter: "B", text: "Western and Eastern cultures have no meaningful differences." },
      { letter: "C", text: "colonialism had no impact on academic scholarship." },
      { letter: "D", text: "cultural representations can have political implications beyond their immediate content." }
    ],
    correctAnswer: "D",
    explanation: "Said's analysis shows that seemingly neutral academic and literary representations of Eastern cultures actually served to justify colonial power. This demonstrates that cultural representations can have significant political implications beyond their surface content.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 9
  },
  {
    id: "satp2060",
    question: "Archaeologist Ian Hodder's approach to excavation, sometimes called 'post-processual' archaeology, emphasizes that archaeological interpretation is always influenced by the interpreter's own cultural context and assumptions. Unlike earlier archaeologists who believed they could objectively reconstruct past societies, Hodder argues that multiple valid interpretations of the same evidence are possible. This approach implies that ______\n\nWhich choice most logically completes the text?",
    options: [
      { letter: "A", text: "archaeological evidence is meaningless and cannot tell us anything about the past." },
      { letter: "B", text: "all archaeological interpretations are equally valid regardless of evidence." },
      { letter: "C", text: "earlier archaeological methods produced no useful knowledge." },
      { letter: "D", text: "archaeologists should be transparent about the assumptions and perspectives that inform their interpretations." }
    ],
    correctAnswer: "D",
    explanation: "If interpretation is always influenced by the interpreter's cultural context and assumptions, and multiple valid interpretations are possible, then archaeologists should be transparent about their own assumptions and perspectives, allowing readers to evaluate how these might have shaped their interpretations.",
    difficulty: "Hard",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficultyRating: 8
  }
];
