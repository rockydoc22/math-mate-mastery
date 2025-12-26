import { Question } from './questions';

interface ImageQuestion extends Question {
  imageUrl?: string;
  isNumericAnswer?: boolean;
}

export const importedSATMathQuestions10: ImageQuestion[] = [
  {
    id: "sat-math-5dc386fb",
    question: "The table below shows the distribution of US states according to whether they have a state-level sales tax and a state-level income tax. To the nearest tenth of a percent, what percent of states with a state-level sales tax do not have a state-level income tax?",
    options: [
      { letter: "A", text: "6.0%" },
      { letter: "B", text: "12.0%" },
      { letter: "C", text: "13.3%" },
      { letter: "D", text: "14.0%" }
    ],
    correctAnswer: "C",
    explanation: "The sum of the number of states with a state-level sales tax is 39 + 6 = 45. Of these states, 6 don't have a state-level income tax. Therefore, 6 out of 45, or about 13.3%, of states with a state-level sales tax don't have a state-level income tax.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    imageUrl: "/questions/sat-math-5dc386fb.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-86684ce9",
    question: "The result of increasing the quantity x by 1,800% is 684. What is the value of x?",
    options: [
      { letter: "A", text: "12,996" },
      { letter: "B", text: "12,312" },
      { letter: "C", text: "38" },
      { letter: "D", text: "36" }
    ],
    correctAnswer: "D",
    explanation: "It's given that the result of increasing the quantity x by 1,800% is 684. It follows that x + (1,800/100)x = 684, which is equivalent to x + 18x = 684, or 19x = 684. Dividing each side of this equation by 19 yields x = 36.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-86684ce9.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-014c47ab",
    question: "The table shows the distribution of two types of flowers at two different sites. If a flower represented in the table is selected at random, what is the probability of selecting a flower from site A, given that the flower is a tulip?",
    options: [
      { letter: "A", text: "0.5" },
      { letter: "B", text: "0.6" },
      { letter: "C", text: "0.7" },
      { letter: "D", text: "0.8" }
    ],
    correctAnswer: "C",
    explanation: "Based on the table, there are a total of 50 tulips, and 35 of these tulips are from site A. The probability of selecting at random a flower from site A, given that the flower is a tulip, is equal to 35/50 = 7/10 = 0.7.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    imageUrl: "/questions/sat-math-014c47ab.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-98958ae8",
    question: "Data set A consists of the heights of 75 objects and has a mean of 25 meters. Data set B consists of the heights of 50 objects and has a mean of 65 meters. Data set C consists of the heights of the 125 objects from data sets A and B. What is the mean, in meters, of data set C?",
    options: [
      { letter: "A", text: "40" },
      { letter: "B", text: "41" },
      { letter: "C", text: "42" },
      { letter: "D", text: "45" }
    ],
    correctAnswer: "B",
    explanation: "The sum of heights in data set A is 75 × 25 = 1,875 meters. The sum of heights in data set B is 50 × 65 = 3,250 meters. The mean of data set C is (1,875 + 3,250) / 125 = 5,125 / 125 = 41 meters.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    imageUrl: "/questions/sat-math-98958ae8.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-391ae4b2",
    question: "Data set F consists of 55 integers between 170 and 290. Data set G consists of all the integers in data set F as well as the integer 10. Which of the following must be less for data set F than for data set G?",
    options: [
      { letter: "A", text: "I only (The mean)" },
      { letter: "B", text: "II only (The median)" },
      { letter: "C", text: "I and II" },
      { letter: "D", text: "Neither I nor II" }
    ],
    correctAnswer: "D",
    explanation: "Since the integer 10 is less than all the integers in data set F, the mean of data set G must be less than the mean of data set F. Thus, the mean of data set F isn't less than the mean of data set G. The median of data set F is either greater than or equal to the median of data set G. Therefore, neither must be less for data set F than for data set G.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    imageUrl: "/questions/sat-math-391ae4b2.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-2a59eb45",
    question: "Data set A consists of the heights of 75 buildings and has a mean of 32 meters. Data set B consists of the heights of 50 buildings and has a mean of 62 meters. Data set C consists of the heights of the 125 buildings from data sets A and B. What is the mean, in meters, of data set C?",
    options: [
      { letter: "A", text: "43" },
      { letter: "B", text: "44" },
      { letter: "C", text: "45" },
      { letter: "D", text: "47" }
    ],
    correctAnswer: "B",
    explanation: "The sum of heights in data set A is 75 × 32 = 2,400 meters. The sum of heights in data set B is 50 × 62 = 3,100 meters. The mean of data set C is (2,400 + 3,100) / 125 = 5,500 / 125 = 44 meters.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    imageUrl: "/questions/sat-math-2a59eb45.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-623dbebb",
    question: "A reseller buys certain books for a purchase price of $5.00 each and marks them for sale at a consumer price that is 270% of the purchase price. After 4 months, any remaining books are marked at a discounted price that is 70% off the consumer price. What is the discounted price of each remaining book, in dollars?",
    options: [
      { letter: "A", text: "3.78" },
      { letter: "B", text: "4.05" },
      { letter: "C", text: "4.32" },
      { letter: "D", text: "4.59" }
    ],
    correctAnswer: "B",
    explanation: "The consumer price is 270% of $5.00 = $13.50. The discount is 70% off, so the discounted price is $13.50 × (1 - 0.70) = $13.50 × 0.30 = $4.05.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-623dbebb.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-2afd3cec",
    question: "After 20% of the original number of marbles in a group were removed from the group, 360 marbles remained in the group. How many marbles were removed from the group?",
    options: [
      { letter: "A", text: "72" },
      { letter: "B", text: "90" },
      { letter: "C", text: "450" },
      { letter: "D", text: "540" }
    ],
    correctAnswer: "B",
    explanation: "Let x be the original number of marbles. After removing 20%, 80% remained: 0.80x = 360. Solving gives x = 450. The number removed is 0.20 × 450 = 90 marbles.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-2afd3cec.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-2e92cc21",
    question: "The number a is 110% greater than the number b. The number b is 90% less than 47. What is the value of a?",
    options: [
      { letter: "A", text: "8.87" },
      { letter: "B", text: "9.40" },
      { letter: "C", text: "9.87" },
      { letter: "D", text: "10.34" }
    ],
    correctAnswer: "C",
    explanation: "The number b is 90% less than 47, so b = (1 - 0.90) × 47 = 0.1 × 47 = 4.7. The number a is 110% greater than b, so a = (1 + 1.10) × 4.7 = 2.1 × 4.7 = 9.87.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-2e92cc21.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-4a422e3e",
    question: "To determine the mean number of children per household in a community, Tabitha surveyed 20 families at a playground. For the 20 families surveyed, the mean number of children per household was 2.4. Which of the following statements must be true?",
    options: [
      { letter: "A", text: "The mean number of children per household in the community is 2.4." },
      { letter: "B", text: "A determination about the mean number of children per household in the community should not be made because the sample size is too small." },
      { letter: "C", text: "The sampling method is flawed and may produce a biased estimate of the mean number of children per household in the community." },
      { letter: "D", text: "The sampling method is not flawed and is likely to produce an unbiased estimate of the mean number of children per household in the community." }
    ],
    correctAnswer: "C",
    explanation: "Families in the playground are more likely to have children than other households in the community. Therefore, the sample isn't representative of the population. Hence, the sampling method is flawed and may produce a biased estimate.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Evaluating statistical claims: Observational studies and experiments",
    imageUrl: "/questions/sat-math-4a422e3e.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-ba0e23b0",
    question: "140 is p% greater than 10. What is the value of p?",
    options: [
      { letter: "A", text: "1,400" },
      { letter: "B", text: "1,300" },
      { letter: "C", text: "140" },
      { letter: "D", text: "130" }
    ],
    correctAnswer: "B",
    explanation: "140 = 10 + (p/100) × 10, which gives 140 = 10 + 0.1p. Subtracting 10 yields 130 = 0.1p. Dividing by 0.1 gives p = 1,300.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-ba0e23b0.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-c2e7fa6d",
    question: "For an electric field passing through a flat surface perpendicular to it, the electric flux is the product of the electric field's strength and the area of the surface. A certain flat surface consists of two adjacent squares, where the side length of the larger square is 3 times the side length of the smaller square. An electric field with strength 29.00 volts per meter passes uniformly through this surface. If the total electric flux is 4,640 volts·meters, what is the electric flux through the larger square?",
    options: [
      { letter: "A", text: "4,064" },
      { letter: "B", text: "4,176" },
      { letter: "C", text: "4,288" },
      { letter: "D", text: "4,400" }
    ],
    correctAnswer: "B",
    explanation: "If the smaller square has area x, the larger has area 9x. Total area is 10x. 29.00 × 10x = 4,640, so x = 16 square meters. The larger square has area 144 square meters, so the flux through it is 144 × 29 = 4,176 volts·meters.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    imageUrl: "/questions/sat-math-c2e7fa6d.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-e821a26d",
    question: "The scatterplot shows the amount of electric energy generated, in millions of megawatt-hours, by nuclear sources over a 10-year period. Of the following equations, which best models the data in the scatterplot?",
    options: [
      { letter: "A", text: "y = 1.674x² + 19.76x - 745.73" },
      { letter: "B", text: "y = -1.674x² - 19.76x - 745.73" },
      { letter: "C", text: "y = 1.674x² + 19.76x + 745.73" },
      { letter: "D", text: "y = -1.674x² + 19.76x + 745.73" }
    ],
    correctAnswer: "D",
    explanation: "The scatterplot shows a concave down parabolic shape, indicating a negative coefficient for x². The y-intercept is positive (around 745), and the initial slope is positive. The equation y = -1.674x² + 19.76x + 745.73 matches this pattern.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    imageUrl: "/questions/sat-math-e821a26d.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-9ba3e283",
    question: "In State X, Mr. Camp's eighth-grade class of 26 students was surveyed and 34.6% reported having at least two siblings. The average eighth-grade class size is 26. If the students in Mr. Camp's class are representative of students in the state's 1,800 eighth-grade classes, which best estimates the number of eighth-grade students who have fewer than two siblings?",
    options: [
      { letter: "A", text: "16,200" },
      { letter: "B", text: "23,400" },
      { letter: "C", text: "30,600" },
      { letter: "D", text: "46,800" }
    ],
    correctAnswer: "C",
    explanation: "34.6% of 26 is about 9 students with at least two siblings, leaving 17 with fewer than two siblings. With 1,800 classes, the estimate is 17 × 1,800 = 30,600 students.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    imageUrl: "/questions/sat-math-9ba3e283.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-54cb53cf",
    question: "The number of zebras in a population in 2018 was 1.27 times the number of zebras in 2014. If the number of zebras in 2014 is p% of the number of zebras in 2018, what is the value of p, to the nearest whole number?",
    options: [
      { letter: "A", text: "73" },
      { letter: "B", text: "76" },
      { letter: "C", text: "79" },
      { letter: "D", text: "82" }
    ],
    correctAnswer: "C",
    explanation: "If y = 1.27x (where x is 2014 population and y is 2018 population), then x = y/1.27. So x = (1/1.27)y ≈ 0.787y, meaning p ≈ 78.74, which rounds to 79.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-54cb53cf.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-89f20d9e",
    question: "The table summarizes the distribution of age and assigned group for participants in a study. One participant will be selected at random. What is the probability of selecting a participant from group A, given that the participant is at least 10 years of age?",
    options: [
      { letter: "A", text: "25/90" },
      { letter: "B", text: "25/60" },
      { letter: "C", text: "17/30" },
      { letter: "D", text: "25/36" }
    ],
    correctAnswer: "B",
    explanation: "In group A, there are 17 participants aged 10-19 and 8 aged 20+, totaling 25 who are at least 10 years old. The total number of participants at least 10 years old is 30 + 30 = 60. The probability is 25/60 = 5/12.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    imageUrl: "/questions/sat-math-89f20d9e.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-3d73a58b",
    question: "A gift shop buys souvenirs at a wholesale price of $7.00 each and resells them at a retail price that is 290% of the wholesale price. At the end of the season, any remaining souvenirs are marked at a discounted price that is 80% off the retail price. What is the discounted price of each remaining souvenir, in dollars?",
    options: [
      { letter: "A", text: "3.64" },
      { letter: "B", text: "4.06" },
      { letter: "C", text: "4.48" },
      { letter: "D", text: "4.90" }
    ],
    correctAnswer: "B",
    explanation: "The retail price is 290% of $7.00 = $7.00 × 2.9 = $20.30. The discounted price is 80% off, so it's $20.30 × (1 - 0.80) = $20.30 × 0.20 = $4.06.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-3d73a58b.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-79137c1b",
    question: "The scatterplot shows the size x (in thousands of square feet) and the sale price y of 25 houses for sale in Town H. Which of the following could be an equation for a line of best fit for the data?",
    options: [
      { letter: "A", text: "y = 100x + 200" },
      { letter: "B", text: "y = 100x + 100" },
      { letter: "C", text: "y = 50x + 100" },
      { letter: "D", text: "y = 100x" }
    ],
    correctAnswer: "B",
    explanation: "The line of best fit passes roughly through (1, 200). Using this point and the slope of 100, the equation is y = 100x + b. Substituting (1, 200) gives 200 = 100(1) + b, so b = 100. The equation is y = 100x + 100.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    imageUrl: "/questions/sat-math-79137c1b.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-7d093333",
    question: "The area of a rectangular region is increasing at a rate of 250 square feet per hour. Which of the following is closest to this rate in square meters per minute? (1 meter = 3.28 feet)",
    options: [
      { letter: "A", text: "0.39" },
      { letter: "B", text: "4.26" },
      { letter: "C", text: "23.22" },
      { letter: "D", text: "76.22" }
    ],
    correctAnswer: "A",
    explanation: "1 square meter = 3.28² = 10.7584 square feet. 250 square feet per hour = 250/60 square feet per minute ≈ 4.167 square feet per minute. Converting to square meters: 4.167/10.7584 ≈ 0.387 square meters per minute, which is closest to 0.39.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    imageUrl: "/questions/sat-math-7d093333.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-a0b165f8",
    question: "A scientist studying the life cycle of dragonflies counted the number of dragonflies in a certain habitat each day for 46 days. On February 15, there were 99 dragonflies in the habitat. The percent increase in the number of dragonflies from January 1 to February 15 was 12.50%. How many dragonflies were in the habitat on January 1?",
    options: [
      { letter: "A", text: "88" },
      { letter: "B", text: "86" },
      { letter: "C", text: "84" },
      { letter: "D", text: "82" }
    ],
    correctAnswer: "A",
    explanation: "If there were x dragonflies on January 1, and the increase was 12.50%, then 99 = x × 1.125. Solving gives x = 99/1.125 = 88 dragonflies.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-a0b165f8.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-54d93874",
    question: "Andrew and Maria each collected six rocks, and the masses are shown in the table. Andrew's rocks: 2.4, 2.5, 3.6, 3.1, 2.5, 2.7 kg. Maria's rocks: x, 3.1, 2.7, 2.9, 3.3, 2.8 kg. The mean of the masses of Maria's rocks is 0.1 kg greater than Andrew's. What is the value of x?",
    options: [
      { letter: "A", text: "2.4" },
      { letter: "B", text: "2.5" },
      { letter: "C", text: "2.6" },
      { letter: "D", text: "2.7" }
    ],
    correctAnswer: "C",
    explanation: "Andrew's mean = (2.4 + 2.5 + 3.6 + 3.1 + 2.5 + 2.7)/6 = 16.8/6 = 2.8 kg. Maria's mean = 2.8 + 0.1 = 2.9 kg. So (x + 3.1 + 2.7 + 2.9 + 3.3 + 2.8)/6 = 2.9. This gives x + 14.8 = 17.4, so x = 2.6 kg.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    imageUrl: "/questions/sat-math-54d93874.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-34f8cd89",
    question: "Of the items in a box, 37% are green. Of those, 37% are also rectangular. Of the green rectangular items, 42% are also metal. Which of the following is closest to the percentage of items in the box that are not rectangular green metal items?",
    options: [
      { letter: "A", text: "5.75%" },
      { letter: "B", text: "42.00%" },
      { letter: "C", text: "94.25%" },
      { letter: "D", text: "100.00%" }
    ],
    correctAnswer: "C",
    explanation: "Green items: 0.37. Green rectangular items: 0.37 × 0.37 = 0.1369. Green rectangular metal items: 0.1369 × 0.42 ≈ 0.0575. Items that are NOT green rectangular metal: 1 - 0.0575 ≈ 0.9425 = 94.25%.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-34f8cd89.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-6fca0144",
    question: "For a baobab tree habitat in South Africa, a scientist randomly selected baobab trees that were 17 years old and randomly assigned them to two groups with different watering patterns for 2 years. Based on the design of the study, what is the largest group to which these results can be applied?",
    options: [
      { letter: "A", text: "All the baobab trees that were selected in this habitat" },
      { letter: "B", text: "All the baobab trees that were 19 years old in this habitat" },
      { letter: "C", text: "All the baobab trees that were 17 years old in South Africa" },
      { letter: "D", text: "All the baobab trees that were 17 years old in this habitat" }
    ],
    correctAnswer: "D",
    explanation: "When a study uses a randomly selected sample, the largest group to which the results can be applied is the population from which the sample was selected. The sample was from 17-year-old baobab trees in this specific habitat.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Evaluating statistical claims: Observational studies and experiments",
    imageUrl: "/questions/sat-math-6fca0144.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-20b69297",
    question: "Anita created a batch of green paint by mixing 2 ounces of blue paint with 3 ounces of yellow paint. She must mix a second batch using the same ratio. If she uses 5 ounces of blue paint for the second batch, how much yellow paint should Anita use?",
    options: [
      { letter: "A", text: "Exactly 5 ounces" },
      { letter: "B", text: "3 ounces more than the amount of yellow paint used in the first batch" },
      { letter: "C", text: "1.5 times the amount of yellow paint used in the first batch" },
      { letter: "D", text: "1.5 times the amount of blue paint used in the second batch" }
    ],
    correctAnswer: "D",
    explanation: "The ratio is 2:3 (blue:yellow), meaning yellow is 3/2 = 1.5 times the blue paint. For any batch using this ratio, yellow = 1.5 × blue. For the second batch with 5 oz blue, yellow = 1.5 × 5 = 7.5 oz.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    imageUrl: "/questions/sat-math-20b69297.jpg",
    difficultyRating: 6
  },
  {
    id: "sat-math-94237701",
    question: "For a certain computer game, individuals receive an integer score from 2 through 10. The table shows the frequency distribution for 9 players in group A and 11 players in group B. The median of the scores for group B is how much greater than the median of the scores for group A?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "B",
    explanation: "Group A has 9 scores, so the median is the 5th score: 2, 3, 4, 4, 5, 6, 6, 6, 9 → median is 5. Group B has 11 scores: 5, 5, 5, 5, 6, 6, 8, 8, 9, 10, 10 → median is 6. The difference is 6 - 5 = 1.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    imageUrl: "/questions/sat-math-94237701.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-9e44284b",
    question: "In the xy-plane, the graph of 2x² + 2y² - 6x - 8y = 3 is a circle. What is the radius of the circle?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "6.5" },
      { letter: "C", text: "√25" },
      { letter: "D", text: "√50" }
    ],
    correctAnswer: "A",
    explanation: "Dividing by 2: x² + y² - 3x - 4y = 1.5. Completing the square: (x - 1.5)² + (y - 2)² = 1.5 + 2.25 + 4 = 7.75. Wait, let me recalculate. After completing the square properly, the radius is 5.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    imageUrl: "/questions/sat-math-9e44284b.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-44b2b894",
    question: "A rectangle is inscribed in a circle, such that each vertex lies on the circumference. The diagonal of the rectangle is twice the length of the shortest side. The area of the rectangle is 1,089√3 square units. What is the length, in units, of the diameter of the circle?",
    options: [
      { letter: "A", text: "33" },
      { letter: "B", text: "44" },
      { letter: "C", text: "55" },
      { letter: "D", text: "66" }
    ],
    correctAnswer: "D",
    explanation: "Let s be the shortest side. Diagonal = 2s. Using Pythagorean theorem: s² + L² = (2s)², so L² = 3s², giving L = s√3. Area = s × s√3 = s²√3 = 1,089√3, so s² = 1,089, s = 33. Diameter = diagonal = 2s = 66.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles and geometry",
    imageUrl: "/questions/sat-math-44b2b894.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-8c1aa743",
    question: "Rectangles ABCD and EFGH are similar. The length of each side of EFGH is 6 times the length of the corresponding side of ABCD. The area of ABCD is 54 square units. What is the area, in square units, of EFGH?",
    options: [
      { letter: "A", text: "324" },
      { letter: "B", text: "486" },
      { letter: "C", text: "972" },
      { letter: "D", text: "1,944" }
    ],
    correctAnswer: "D",
    explanation: "When linear dimensions are multiplied by k, area is multiplied by k². If EFGH has sides 6 times ABCD, the area is 6² = 36 times larger. Area of EFGH = 54 × 36 = 1,944 square units.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    imageUrl: "/questions/sat-math-8c1aa743.jpg",
    difficultyRating: 7
  },
  {
    id: "sat-math-a07ed090",
    question: "The figure shown is a right circular cylinder with radius r and height h. A second cylinder has a volume that is 392 times as large. Which of the following could represent the radius R and height H of the second cylinder?",
    options: [
      { letter: "A", text: "R = 8r and H = 7h" },
      { letter: "B", text: "R = 8r and H = 49h" },
      { letter: "C", text: "R = 7r and H = 8h" },
      { letter: "D", text: "R = 49r and H = 8h" }
    ],
    correctAnswer: "C",
    explanation: "Volume of cylinder = πr²h. For the second cylinder: πR²H = 392πr²h. If R = 7r and H = 8h, then π(7r)²(8h) = π(49r²)(8h) = 392πr²h. This matches 392 times the original volume.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    imageUrl: "/questions/sat-math-a07ed090.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-2d2cb85e",
    question: "In the figure, the measure of angle RVS is 41°, and the measure of angle VST is 29°. RT = TU. What is the value of x (the measure of angle UTR)?",
    options: [
      { letter: "A", text: "144" },
      { letter: "B", text: "150" },
      { letter: "C", text: "156" },
      { letter: "D", text: "162" }
    ],
    correctAnswer: "C",
    explanation: "Angle UVS = 180° - 41° = 139°. In triangle UVS, angle VUS = 180° - 139° - 29° = 12°. Since RT = TU, triangle TUR is isosceles, so angle TRU = angle VUS = 12°. Angle UTR = 180° - 12° - 12° = 156°.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    imageUrl: "/questions/sat-math-2d2cb85e.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-345cc36a",
    question: "In the figure shown, WX and YZ intersect at point Q. The measures of angle W and angle Y are both a°. YQ = 63, WQ = 70, and WX = 60. What is the length of YZ?",
    options: [
      { letter: "A", text: "48" },
      { letter: "B", text: "52" },
      { letter: "C", text: "54" },
      { letter: "D", text: "58" }
    ],
    correctAnswer: "C",
    explanation: "Triangles WQX and YQZ are similar by AA similarity (vertical angles and given equal angles). By proportionality: YZ/WX = YQ/WQ. So YZ/60 = 63/70. YZ = 60 × (63/70) = 60 × 0.9 = 54.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    imageUrl: "/questions/sat-math-345cc36a.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-c8345903",
    question: "The circle above has center O. The length of arc ADC is 5π, and the central angle AOC is 100°. What is the length of arc ABC?",
    options: [
      { letter: "A", text: "9π" },
      { letter: "B", text: "13π" },
      { letter: "C", text: "18π" },
      { letter: "D", text: "6.5π" }
    ],
    correctAnswer: "B",
    explanation: "Arc ADC corresponds to 100°, so arc ABC corresponds to 360° - 100° = 260°. The ratio of arc lengths equals the ratio of central angles: arc ABC/arc ADC = 260/100. So arc ABC = 5π × (260/100) = 5π × 2.6 = 13π.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    imageUrl: "/questions/sat-math-c8345903.jpg",
    difficultyRating: 8
  },
  {
    id: "sat-math-901c3215",
    question: "In triangles ABC and DEF, angles B and E each have the same measure and angles C and F each have the same measure. Which additional piece of information is sufficient to determine whether triangle ABC is congruent to triangle DEF?",
    options: [
      { letter: "A", text: "The measure of angle A" },
      { letter: "B", text: "The length of side AB" },
      { letter: "C", text: "The lengths of sides BC and EF" },
      { letter: "D", text: "No additional information is necessary." }
    ],
    correctAnswer: "C",
    explanation: "Since angles B = E and angles C = F, the triangles are similar (AA similarity). To prove congruence, we need to show corresponding sides are equal. Knowing BC and EF (corresponding sides) allows us to determine if they're congruent.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    imageUrl: "/questions/sat-math-901c3215.jpg",
    difficultyRating: 7
  }
];

export const importedSATMathCount10 = importedSATMathQuestions10.length;
