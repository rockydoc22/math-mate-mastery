import { Question } from './questions';

// SAT Math questions imported from College Board retired questions PDF (to question 409)
export const importedSATMathQuestions9: Question[] = [
  {
    id: "sat-math-d3b9c8d8",
    question: "The box plots summarize the masses, in kilograms, of two groups of gazelles. Based on the box plots, which of the following statements must be true?",
    options: [
      { letter: "A", text: "The mean mass of group 1 is greater than the mean mass of group 2." },
      { letter: "B", text: "The mean mass of group 1 is less than the mean mass of group 2." },
      { letter: "C", text: "The median mass of group 1 is greater than the median mass of group 2." },
      { letter: "D", text: "The median mass of group 1 is less than the median mass of group 2." }
    ],
    correctAnswer: "C",
    explanation: "The median of a data set represented in a box plot is represented by the vertical line within the box. The median mass of the gazelles in group 1 is 25 kilograms, and the median mass of the gazelles in group 2 is 24 kilograms. Since 25 kilograms is greater than 24 kilograms, the median mass of group 1 is greater than the median mass of group 2. The mean mass cannot be determined from box plots.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 11
  },
  {
    id: "sat-math-65c49824",
    question: "A school district is forming a committee to discuss plans for the construction of a new high school. Of those invited to join the committee, 15% are parents of students, 45% are teachers from the current high school, 25% are school and district administrators, and the remaining 6 individuals are students. How many more teachers were invited to join the committee than school and district administrators?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "8" },
      { letter: "C", text: "10" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "B",
    explanation: "The 6 students represent (100 - 15 - 45 - 25)% = 15% of those invited. If x people were invited, then 0.15x = 6, so x = 40 people. There were 0.45(40) = 18 teachers and 0.25(40) = 10 administrators. Therefore, there were 18 - 10 = 8 more teachers than administrators.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 10
  },
  {
    id: "sat-math-1ea09200",
    question: "A sample of 40 fourth-grade students was selected at random from a certain school. The 40 students completed a survey about the morning announcements, and 32 thought the announcements were helpful. Which of the following is the largest population to which the results of the survey can be applied?",
    options: [
      { letter: "A", text: "The 40 students who were surveyed" },
      { letter: "B", text: "All fourth-grade students at the school" },
      { letter: "C", text: "All students at the school" },
      { letter: "D", text: "All fourth-grade students in the county in which the school is located" }
    ],
    correctAnswer: "B",
    explanation: "Selecting a sample of a reasonable size at random allows the results to be applied to the population from which the sample was selected, but not beyond. Since the sample was selected from fourth-grade students at a certain school, the results can be applied to all fourth-grade students at the school, but not to other students or fourth-grade students elsewhere.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Evaluating statistical claims: Observational studies and experiments",
    difficultyRating: 9
  },
  {
    id: "sat-math-4aaa9c42",
    question: "The positive number a is 2,241% of the sum of the positive numbers b and c, and b is 83% of c. What is the value of b/a expressed as a percentage?",
    options: [
      { letter: "A", text: "2.02%" },
      { letter: "B", text: "3.70%" },
      { letter: "C", text: "4.53%" },
      { letter: "D", text: "5.41%" }
    ],
    correctAnswer: "A",
    explanation: "Since a = 22.41(b + c) and b = 0.83c, we can substitute to find a = 22.41(0.83c + c) = 22.41(1.83c) = 41.01c. So b/a = 0.83c/41.01c = 0.83/41.01 ≈ 0.0202 = 2.02%.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 12
  },
  {
    id: "sat-math-fb866265",
    question: "The scatterplot shows the relationship between two variables, x and y. An equation for the exponential model shown can be written as y = a(b)^x, where a and b are positive constants. Which of the following is closest to the value of b?",
    options: [
      { letter: "A", text: "0.83" },
      { letter: "B", text: "1.20" },
      { letter: "C", text: "1.83" },
      { letter: "D", text: "2.00" }
    ],
    correctAnswer: "A",
    explanation: "For an exponential model y = a(b)^x, if b is greater than 0 but less than 1, the model is decreasing. If b is greater than 1, the model is increasing. The exponential model shown is decreasing, so b must be between 0 and 1. Of the choices, only 0.83 is a value greater than 0 but less than 1.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficultyRating: 10
  },
  {
    id: "sat-math-0ea56bb2",
    question: "The manager of an online news service received a report showing 5,600 subscriptions sold in 2012 and 5,880 in 2013. The manager estimated that the percent increase from 2012 to 2013 would be double the percent increase from 2013 to 2014. How many subscriptions did the manager expect would be sold in 2014?",
    options: [
      { letter: "A", text: "6,020" },
      { letter: "B", text: "6,027" },
      { letter: "C", text: "6,440" },
      { letter: "D", text: "6,468" }
    ],
    correctAnswer: "B",
    explanation: "The increase from 2012 to 2013 was 5,880 - 5,600 = 280. The percent increase is 280/5,600 = 0.05, or 5%. Since this is double the expected increase from 2013 to 2014, the 2013-2014 increase is 2.5%. Therefore, 2014 subscriptions = 5,880 × 1.025 = 6,027.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 10
  },
  {
    id: "sat-math-0231050d",
    question: "The line graph shows the total amount of snow, in inches, recorded each year in Washington, DC, from 2003 to 2015. The annual snowfall in 2003 was 40 inches and in 2007 was 10 inches. If p is the percent decrease in the annual snowfall from 2003 to 2007, what is the value of p?",
    options: [
      { letter: "A", text: "25" },
      { letter: "B", text: "50" },
      { letter: "C", text: "75" },
      { letter: "D", text: "80" }
    ],
    correctAnswer: "C",
    explanation: "The percent decrease between two values is found by dividing the difference by the original value and multiplying by 100. The decrease is (40 - 10)/40 × 100 = 30/40 × 100 = 75%.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 9
  },
  {
    id: "sat-math-d4413871",
    question: "A table shows the distribution of blood type and rhesus factor for a group of people. If one of these people who is rhesus negative is chosen at random, the probability that the person has blood type B is 1/9. There are 2 people with blood type B who are rhesus negative, and x people with blood type O who are rhesus negative. What is the value of x?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "8" },
      { letter: "C", text: "10" },
      { letter: "D", text: "12" }
    ],
    correctAnswer: "B",
    explanation: "The total rhesus negative people is 7 + 2 + 1 + x = 10 + x. The probability of blood type B among rhesus negative is 2/(10 + x) = 1/9. Cross-multiplying: 18 = 10 + x, so x = 8.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficultyRating: 11
  },
  {
    id: "sat-math-993000da",
    question: "The positive number a is 230% of the number b, and a is 60% of the number c. If c is p% of b, which of the following is closest to the value of p?",
    options: [
      { letter: "A", text: "26" },
      { letter: "B", text: "138" },
      { letter: "C", text: "280" },
      { letter: "D", text: "383" }
    ],
    correctAnswer: "D",
    explanation: "Since a = 2.30b and a = 0.60c, we have 2.30b = 0.60c. Solving for c: c = 2.30b/0.60 = 3.833b. So c is 383.3% of b, meaning p ≈ 383.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 11
  },
  {
    id: "sat-math-190be2fc",
    question: "Data set A consists of 10 positive integers less than 60. Nine of the integers are: 43, 45, 44, 43, 38, 39, 40, 46, 40. The mean of these nine integers is 42. If the mean of data set A is an integer that is greater than 42, what is the value of the largest integer from data set A?",
    options: [
      { letter: "A", text: "46" },
      { letter: "B", text: "48" },
      { letter: "C", text: "52" },
      { letter: "D", text: "56" }
    ],
    correctAnswer: "C",
    explanation: "The sum of the 9 values is 378. Let x be the 10th value. For the mean of all 10 to be an integer greater than 42, (378 + x)/10 must be an integer > 42. So 378 + x must be divisible by 10, meaning x ends in 2. Since x must be > 42 (to raise the mean) and < 60, and end in 2, x = 52. This is larger than all shown values, so the largest integer is 52.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 12
  },
  {
    id: "sat-math-2e8027b0",
    question: "The scatterplot shows the relationship between two variables, x and y, for data set E. A line of best fit passes through (0, 12) and (12, 30). Data set F is created by multiplying the y-coordinate of each data point from data set E by 3.9. Which of the following could be an equation of a line of best fit for data set F?",
    options: [
      { letter: "A", text: "y = 46.8 + 5.9x" },
      { letter: "B", text: "y = 12 + 1.5x" },
      { letter: "C", text: "y = 30 + 3.9x" },
      { letter: "D", text: "y = 12 + 1.5x" }
    ],
    correctAnswer: "A",
    explanation: "The line for data set E passes through (0, 12) and (12, 30). For data set F, y-coordinates are multiplied by 3.9. The new y-intercept is 12 × 3.9 = 46.8. The new point at x = 12 is (12, 30 × 3.9) = (12, 117). The slope is (117 - 46.8)/(12 - 0) = 70.2/12 = 5.85 ≈ 5.9. So the equation is y = 46.8 + 5.9x.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficultyRating: 11
  },
  {
    id: "sat-math-c178d4da",
    question: "Data set A and data set B each consist of 10 values. Data set A has more values clustered near the mean than data set B. Which of the following statements best compares the means and standard deviations of the two data sets?",
    options: [
      { letter: "A", text: "The mean of A equals the mean of B, and the standard deviation of A is less than that of B." },
      { letter: "B", text: "The mean of A equals the mean of B, and the standard deviation of A is greater than that of B." },
      { letter: "C", text: "The mean of A is greater than the mean of B, and the standard deviations are equal." },
      { letter: "D", text: "The mean of A is less than the mean of B, and the standard deviations are equal." }
    ],
    correctAnswer: "A",
    explanation: "Standard deviation measures the spread of data. If data set A has more values clustered near the mean compared to data set B, then data set A has less spread and therefore a smaller standard deviation.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 10
  },
  {
    id: "sat-math-d6af3572",
    question: "The scatterplot shows the federal-mandated minimum wage every 10 years between 1940 and 2010. A line of best fit is shown with equation y = 0.096x - 0.49. What does the line of best fit predict about the increase in the minimum wage over the 70-year period?",
    options: [
      { letter: "A", text: "Each year between 1940 and 2010, the average increase in minimum wage was 0.096 dollars." },
      { letter: "B", text: "Each year between 1940 and 2010, the average increase in minimum wage was 0.49 dollars." },
      { letter: "C", text: "Every 10 years between 1940 and 2010, the average increase in minimum wage was 0.096 dollars." },
      { letter: "D", text: "Every 10 years between 1940 and 2010, the average increase in minimum wage was 0.488 dollars." }
    ],
    correctAnswer: "A",
    explanation: "The slope of the line of best fit is 0.096. From the definition of slope, an increase of 1 in x corresponds to an increase of 0.096 in y. Since x represents years, the minimum wage increases by 0.096 dollars per year.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficultyRating: 10
  },
  {
    id: "sat-math-c0ef9aa1",
    question: "A sample of oak has a density of 807 kilograms per cubic meter. The sample is in the shape of a cube, where each edge has a length of 0.9 meters. To the nearest whole number, what is the mass, in kilograms, of this sample?",
    options: [
      { letter: "A", text: "588" },
      { letter: "B", text: "726" },
      { letter: "C", text: "807" },
      { letter: "D", text: "897" }
    ],
    correctAnswer: "A",
    explanation: "The volume of the cube is 0.9³ = 0.729 cubic meters. Mass = density × volume = 807 × 0.729 = 588.303 kilograms, which rounds to 588 kilograms.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficultyRating: 9
  },
  {
    id: "sat-math-6c9444cd",
    question: "Two box plots show the distribution of number of books read over the summer by students in two different English classes. Class A has range 5 (min 0, max 5) and Class B has range 9 (min 1, max 10). What is the positive difference between the ranges of number of books read for the two classes?",
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3" },
      { letter: "C", text: "4" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "C",
    explanation: "The range of Class A is 5 - 0 = 5. The range of Class B is 10 - 1 = 9. The positive difference between the ranges is 9 - 5 = 4.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 9
  },
  {
    id: "sat-math-d65b9a87",
    question: "The dot plots represent the distributions of values in data sets A and B. Both have median 13 and are symmetric. Data set B has more values at 10 and 16 than data set A. Which of the following statements must be true? I. The median of data set A is equal to the median of data set B. II. The standard deviation of data set A is equal to the standard deviation of data set B.",
    options: [
      { letter: "A", text: "I only" },
      { letter: "B", text: "II only" },
      { letter: "C", text: "I and II" },
      { letter: "D", text: "Neither I nor II" }
    ],
    correctAnswer: "A",
    explanation: "Both data sets have median 13, so statement I is true. However, since data set B has more values further from the mean (at 10 and 16) compared to data set A, data set B has a larger standard deviation. Statement II is false. Only statement I is true.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 10
  },
  {
    id: "sat-math-e7133228",
    question: "The speed of a vehicle is increasing at a rate of 7.3 meters per second squared. Using 1 mile = 1,609 meters, what is this rate, in miles per minute squared, rounded to the nearest tenth?",
    options: [
      { letter: "A", text: "0.3" },
      { letter: "B", text: "16.3" },
      { letter: "C", text: "29.4" },
      { letter: "D", text: "438.8" }
    ],
    correctAnswer: "B",
    explanation: "Convert 7.3 m/s² to miles/min². There are 60 seconds in 1 minute, so 60² = 3,600 s² in 1 min². Rate = (7.3 meters/s²) × (1 mile/1609 meters) × (3600 s²/1 min²) = 7.3 × 3600/1609 ≈ 16.33 miles/min².",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficultyRating: 11
  },
  {
    id: "sat-math-241f1db7",
    question: "A frequency table summarizes weights of 71 tortoises. A weight of 39 pounds is added, creating a new data set of 72 tortoises. The median of the original data set is 17 (the 36th value). Which statement best compares the mean and median of the new data set to the original?",
    options: [
      { letter: "A", text: "The mean of the new data set is greater than the original, and the median is greater." },
      { letter: "B", text: "The mean of the new data set is greater than the original, and the medians are equal." },
      { letter: "C", text: "The mean of the new data set is less than the original, and the median is less." },
      { letter: "D", text: "The mean of the new data set is less than the original, and the medians are equal." }
    ],
    correctAnswer: "B",
    explanation: "Adding 39 (greater than any existing value) increases the mean. For the new data set with 72 values, the median is between the 36th and 37th values. Since 39 is added at the end, both the 36th and 37th values remain 17, so the median stays 17.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 11
  },
  {
    id: "sat-math-1fbd3b67",
    question: "The number b is 80% less than 24. The number a is 190% greater than b. What is the value of a?",
    options: [
      { letter: "A", text: "9.12" },
      { letter: "B", text: "13.92" },
      { letter: "C", text: "26.40" },
      { letter: "D", text: "45.60" }
    ],
    correctAnswer: "B",
    explanation: "If b is 80% less than 24, then b = 24 - 0.80(24) = 24 - 19.2 = 4.8. If a is 190% greater than b, then a = b + 1.90b = 2.90b = 2.90(4.8) = 13.92.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 10
  },
  {
    id: "sat-math-ecbdbe84",
    question: "A table summarizes the number of employees at restaurants in a town, grouped into ranges. The total number of restaurants is 30, with 2 in the 0-9 range, 5 in 10-19, 8 in 20-29, 10 in 30-39, and 5 in 40-49. Which of the following could be the median number of employees?",
    options: [
      { letter: "A", text: "17" },
      { letter: "B", text: "22" },
      { letter: "C", text: "28" },
      { letter: "D", text: "32" }
    ],
    correctAnswer: "D",
    explanation: "With 30 restaurants, the median is between the 15th and 16th values. Cumulative frequencies: 0-9 (2), 10-19 (7), 20-29 (15), 30-39 (25). The 15th value is in the 20-29 range and the 16th is in the 30-39 range, so the median could be in the 30-39 range. 32 is the only choice in that range.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 10
  },
  {
    id: "sat-math-5267c3c7",
    question: "The result of increasing the quantity x by 400% is 60. What is the value of x?",
    options: [
      { letter: "A", text: "12" },
      { letter: "B", text: "15" },
      { letter: "C", text: "240" },
      { letter: "D", text: "340" }
    ],
    correctAnswer: "A",
    explanation: "Increasing x by 400% means x + 4x = 5x = 60. Dividing by 5: x = 12.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 9
  },
  {
    id: "sat-math-61f61789",
    question: "To study the moisture content in a group of trees, samples from the trunk were cut in the shape of a cube. The length of the edge of one of these cubes is 2.00 centimeters. If this cube has a mass of 2.56 grams, what is the density of this cube, in grams per cubic centimeter?",
    options: [
      { letter: "A", text: "0.32" },
      { letter: "B", text: "0.64" },
      { letter: "C", text: "1.28" },
      { letter: "D", text: "5.12" }
    ],
    correctAnswer: "A",
    explanation: "Volume = (2.00)³ = 8.00 cubic centimeters. Density = mass/volume = 2.56/8.00 = 0.32 grams per cubic centimeter.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficultyRating: 9
  },
  {
    id: "sat-math-d0430601",
    question: "A scatterplot shows the number of beach visitors versus average temperature in Lagos, Nigeria, for eleven days. The line of best fit has a slope of approximately 57. According to this estimate, how many additional people per day are predicted to visit the beach for each 5°C increase in average temperature?",
    options: [
      { letter: "A", text: "57" },
      { letter: "B", text: "114" },
      { letter: "C", text: "285" },
      { letter: "D", text: "570" }
    ],
    correctAnswer: "C",
    explanation: "The slope of 57 means 57 additional visitors per 1°C increase. For a 5°C increase: 57 × 5 = 285 additional people per day.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficultyRating: 9
  },
  {
    id: "sat-math-947a3cde",
    question: "In the figure, lines M and R intersect at point P. Angle MPR is supplementary to an angle of 60°, and another angle in triangle MPR is 70°. If the triangle is isosceles with two equal angles, what is the measure, in degrees, of the smallest angle?",
    options: [
      { letter: "A", text: "25" },
      { letter: "B", text: "30" },
      { letter: "C", text: "35" },
      { letter: "D", text: "40" }
    ],
    correctAnswer: "B",
    explanation: "If angle MPR's supplement is 60°, then angle MPR = 120°. The exterior angle of 60° equals the sum of the two non-adjacent interior angles. If the triangle is isosceles with these two angles equal, each is 60°/2 = 30°.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficultyRating: 10
  },
  {
    id: "sat-math-a4c0547f",
    question: "In triangle XYZ, angle Z is a right angle and the length of YZ is 24 units. If tan(X) = 12/35, what is the perimeter, in units, of triangle XYZ?",
    options: [
      { letter: "A", text: "84" },
      { letter: "B", text: "168" },
      { letter: "C", text: "112" },
      { letter: "D", text: "196" }
    ],
    correctAnswer: "B",
    explanation: "tan(X) = opposite/adjacent = YZ/XZ = 24/XZ = 12/35. Cross-multiply: 24 × 35 = 12 × XZ, so XZ = 840/12 = 70. Using Pythagorean theorem: XY² = 70² + 24² = 4900 + 576 = 5476, so XY = 74. Perimeter = 24 + 70 + 74 = 168.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficultyRating: 11
  },
  {
    id: "sat-math-983412ea",
    question: "A right square prism has a height of 14 units. The volume of the prism is 2,016 cubic units. What is the length, in units, of an edge of the base?",
    options: [
      { letter: "A", text: "10" },
      { letter: "B", text: "12" },
      { letter: "C", text: "14" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "B",
    explanation: "Volume = s²h, where s is the edge length of the square base. 2016 = s² × 14. Solving: s² = 2016/14 = 144, so s = 12 units.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficultyRating: 9
  },
  {
    id: "sat-math-e5c57163",
    question: "Square A has side lengths that are 166 times the side lengths of square B. The area of square A is k times the area of square B. What is the value of k?",
    options: [
      { letter: "A", text: "166" },
      { letter: "B", text: "332" },
      { letter: "C", text: "13,778" },
      { letter: "D", text: "27,556" }
    ],
    correctAnswer: "D",
    explanation: "If the side of square B is x, then the side of square A is 166x. Area of B = x², Area of A = (166x)² = 27,556x². So A's area is 27,556 times B's area, meaning k = 27,556.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficultyRating: 9
  },
  {
    id: "sat-math-f88f27e5",
    question: "Intersecting lines r, s, and t form a triangle. One angle is 106°, another is 23°. An exterior angle x is formed. If the exterior angle equals the sum of the two non-adjacent interior angles (one being 23° and the other being supplementary to 106°), what is the value of x?",
    options: [
      { letter: "A", text: "83" },
      { letter: "B", text: "97" },
      { letter: "C", text: "106" },
      { letter: "D", text: "129" }
    ],
    correctAnswer: "B",
    explanation: "The angle supplementary to 106° is 180° - 106° = 74°. The exterior angle x equals the sum of the two non-adjacent interior angles: x = 23° + 74° = 97°.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficultyRating: 9
  },
  {
    id: "sat-math-e10d8313",
    question: "In a figure, points A, B, C, and D lie on a line segment, and line segment EF intersects at point B. Given angle measures of certain angles in the resulting triangles sum to 123°, what is the measure, in degrees, of the exterior angle?",
    options: [
      { letter: "A", text: "57" },
      { letter: "B", text: "87" },
      { letter: "C", text: "123" },
      { letter: "D", text: "147" }
    ],
    correctAnswer: "C",
    explanation: "The exterior angle of a triangle equals the sum of the two non-adjacent interior angles. Given that this sum is 123°, the exterior angle is 123°.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficultyRating: 10
  },
  {
    id: "sat-math-d6456c7a",
    question: "A park has an area of 11,863,808 square yards. If 1 mile equals 1,760 yards, what is the area of the park, in square miles, rounded to the nearest hundredth?",
    options: [
      { letter: "A", text: "2.15" },
      { letter: "B", text: "3.83" },
      { letter: "C", text: "3,443.93" },
      { letter: "D", text: "6,741.14" }
    ],
    correctAnswer: "B",
    explanation: "1 square mile = 1,760² = 3,097,600 square yards. Area in square miles = 11,863,808/3,097,600 ≈ 3.83 square miles.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficultyRating: 10
  },
  {
    id: "sat-math-11b06e35",
    question: "The density of a certain solid substance is 813 kilograms per cubic meter. A sample of this substance is in the shape of a cube, where each edge has a length of 0.60 meters. To the nearest whole number, what is the mass, in kilograms, of this sample?",
    options: [
      { letter: "A", text: "176" },
      { letter: "B", text: "488" },
      { letter: "C", text: "588" },
      { letter: "D", text: "1,355" }
    ],
    correctAnswer: "A",
    explanation: "Volume = 0.60³ = 0.216 cubic meters. Mass = density × volume = 813 × 0.216 = 175.608 kg, which rounds to 176 kg.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficultyRating: 9
  },
  {
    id: "sat-math-9d95e7ad",
    question: "A scatterplot shows the numbers of grams of both total protein and total fat for eight sandwiches on a restaurant menu. The line of best fit passes through approximately (20, 30) and (27, 40.5). According to the line of best fit, which is closest to the predicted increase in total fat, in grams, for every increase of 1 gram in total protein?",
    options: [
      { letter: "A", text: "2.5" },
      { letter: "B", text: "2.0" },
      { letter: "C", text: "1.5" },
      { letter: "D", text: "1.0" }
    ],
    correctAnswer: "C",
    explanation: "Slope = (40.5 - 30)/(27 - 20) = 10.5/7 = 1.5. So for every 1 gram increase in protein, fat increases by about 1.5 grams.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficultyRating: 9
  },
  {
    id: "sat-math-4626102e",
    question: "A dot plot represents data set A with 15 values, median 23, range 4 (min 22, max 26). Data set B is created by adding 56 to each value. Which correctly compares the medians and ranges of data sets A and B?",
    options: [
      { letter: "A", text: "The median of B equals the median of A, and the range of B equals the range of A." },
      { letter: "B", text: "The median of B equals the median of A, and the range of B is greater than the range of A." },
      { letter: "C", text: "The median of B is greater than the median of A, and the range of B equals the range of A." },
      { letter: "D", text: "The median of B is greater than the median of A, and the range of B is greater than the range of A." }
    ],
    correctAnswer: "C",
    explanation: "Adding 56 to each value increases the median by 56 (from 23 to 79). However, the range stays the same because both the max and min increase by 56: new range = (26 + 56) - (22 + 56) = 82 - 78 = 4.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 9
  },
  {
    id: "sat-math-5154615f",
    question: "To study fluctuations in composition, samples of pumice were cut in the shape of a cube. The length of the edge of one cube is 3.000 centimeters. This cube has a density of 0.230 grams per cubic centimeter. What is the mass of this cube, in grams?",
    options: [
      { letter: "A", text: "0.69" },
      { letter: "B", text: "2.07" },
      { letter: "C", text: "6.21" },
      { letter: "D", text: "27.00" }
    ],
    correctAnswer: "C",
    explanation: "Volume = 3.000³ = 27 cubic centimeters. Mass = density × volume = 0.230 × 27 = 6.21 grams.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficultyRating: 9
  },
  {
    id: "sat-math-20845d36",
    question: "The number a is 70% less than the positive number b. The number c is 60% greater than a. The number c is how many times b?",
    options: [
      { letter: "A", text: "0.18" },
      { letter: "B", text: "0.48" },
      { letter: "C", text: "0.90" },
      { letter: "D", text: "1.30" }
    ],
    correctAnswer: "B",
    explanation: "a = b - 0.70b = 0.30b. c = a + 0.60a = 1.60a = 1.60(0.30b) = 0.48b. So c is 0.48 times b.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 10
  },
  {
    id: "sat-math-aa43b41f",
    question: "Near the end of a US cable news show, the host invited viewers to respond to a poll on the show's website. At the end of the show, the host reported that 28% responded 'Yes' and 70% responded 'No.' Which of the following best explains why the results are unlikely to represent the sentiments of the population of the United States?",
    options: [
      { letter: "A", text: "The percentages do not add up to 100%, so any possible conclusions from the poll are invalid." },
      { letter: "B", text: "Those who responded to the poll were not a random sample of the population of the United States." },
      { letter: "C", text: "There were not 50% 'Yes' responses and 50% 'No' responses." },
      { letter: "D", text: "The show did not allow viewers enough time to respond to the poll." }
    ],
    correctAnswer: "B",
    explanation: "For poll results to represent a population, the sample must be representative. The respondents were self-selected viewers with internet access who chose to watch and respond—not a random sample of the US population.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Evaluating statistical claims: Observational studies and experiments",
    difficultyRating: 9
  },
  {
    id: "sat-math-cb9d7a12",
    question: "A biologist recorded the masses of 50 birds. The mean mass was 42 grams with a standard deviation of 5 grams. If a bird has a mass of 52 grams, how many standard deviations above the mean is this bird's mass?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "5" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "B",
    explanation: "The difference from the mean is 52 - 42 = 10 grams. Number of standard deviations = 10/5 = 2 standard deviations above the mean.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 9
  },
  {
    id: "sat-math-f3e8b5a9",
    question: "In a survey, 240 people were asked about their preferred beverage. If 35% preferred coffee, 40% preferred tea, and the rest preferred water, how many people preferred water?",
    options: [
      { letter: "A", text: "48" },
      { letter: "B", text: "60" },
      { letter: "C", text: "84" },
      { letter: "D", text: "96" }
    ],
    correctAnswer: "B",
    explanation: "Those preferring water = 100% - 35% - 40% = 25%. Number preferring water = 0.25 × 240 = 60 people.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 8
  },
  {
    id: "sat-math-a7c2d4e1",
    question: "A company's revenue increased by 15% from Year 1 to Year 2, then decreased by 10% from Year 2 to Year 3. If the revenue in Year 3 was $103,500, what was the revenue in Year 1?",
    options: [
      { letter: "A", text: "$100,000" },
      { letter: "B", text: "$105,000" },
      { letter: "C", text: "$110,000" },
      { letter: "D", text: "$115,000" }
    ],
    correctAnswer: "A",
    explanation: "Let Year 1 revenue = x. Year 2 = 1.15x. Year 3 = 0.90(1.15x) = 1.035x = $103,500. So x = $103,500/1.035 = $100,000.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 10
  },
  {
    id: "sat-math-b9d1e6f3",
    question: "In a right triangle, one leg has length 8 and the hypotenuse has length 17. What is the area of the triangle?",
    options: [
      { letter: "A", text: "60" },
      { letter: "B", text: "68" },
      { letter: "C", text: "120" },
      { letter: "D", text: "136" }
    ],
    correctAnswer: "A",
    explanation: "Using the Pythagorean theorem: other leg² = 17² - 8² = 289 - 64 = 225, so other leg = 15. Area = (1/2)(8)(15) = 60.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficultyRating: 9
  },
  {
    id: "sat-math-c5a8f2b7",
    question: "A cylinder has a radius of 4 inches and a height of 10 inches. What is the volume of the cylinder, in cubic inches?",
    options: [
      { letter: "A", text: "40π" },
      { letter: "B", text: "80π" },
      { letter: "C", text: "160π" },
      { letter: "D", text: "320π" }
    ],
    correctAnswer: "C",
    explanation: "Volume = πr²h = π(4²)(10) = π(16)(10) = 160π cubic inches.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficultyRating: 8
  },
  {
    id: "sat-math-d4b7c9e2",
    question: "The table shows that a sample of 200 students was surveyed about their extracurricular activities. 80 students participate in sports, 60 in music, and 30 in both. How many students participate in neither sports nor music?",
    options: [
      { letter: "A", text: "30" },
      { letter: "B", text: "60" },
      { letter: "C", text: "90" },
      { letter: "D", text: "110" }
    ],
    correctAnswer: "C",
    explanation: "Using inclusion-exclusion: students in sports OR music = 80 + 60 - 30 = 110. Students in neither = 200 - 110 = 90.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficultyRating: 9
  },
  {
    id: "sat-math-e8f3a6c1",
    question: "A store is offering a 25% discount on all items. If an item's original price was $80, and an additional 10% tax is applied after the discount, what is the final price?",
    options: [
      { letter: "A", text: "$54.00" },
      { letter: "B", text: "$60.00" },
      { letter: "C", text: "$66.00" },
      { letter: "D", text: "$72.00" }
    ],
    correctAnswer: "C",
    explanation: "Discounted price = $80 × 0.75 = $60. With 10% tax: $60 × 1.10 = $66.00.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficultyRating: 8
  },
  {
    id: "sat-math-f2a9b7d4",
    question: "In a dataset, the five-number summary is: minimum = 12, Q1 = 18, median = 25, Q3 = 32, maximum = 45. What is the interquartile range?",
    options: [
      { letter: "A", text: "7" },
      { letter: "B", text: "14" },
      { letter: "C", text: "20" },
      { letter: "D", text: "33" }
    ],
    correctAnswer: "B",
    explanation: "Interquartile range (IQR) = Q3 - Q1 = 32 - 18 = 14.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 8
  },
  {
    id: "sat-math-g7c4d5e8",
    question: "A cone has a height of 12 cm and a base radius of 5 cm. What is the volume of the cone, in cubic centimeters?",
    options: [
      { letter: "A", text: "60π" },
      { letter: "B", text: "100π" },
      { letter: "C", text: "300π" },
      { letter: "D", text: "900π" }
    ],
    correctAnswer: "B",
    explanation: "Volume of a cone = (1/3)πr²h = (1/3)π(5²)(12) = (1/3)π(25)(12) = (1/3)(300π) = 100π cubic centimeters.",
    difficulty: "Hard",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficultyRating: 9
  },
  {
    id: "sat-math-h3e6f9a2",
    question: "In a normal distribution with mean 500 and standard deviation 100, approximately what percentage of data falls between 400 and 600?",
    options: [
      { letter: "A", text: "34%" },
      { letter: "B", text: "50%" },
      { letter: "C", text: "68%" },
      { letter: "D", text: "95%" }
    ],
    correctAnswer: "C",
    explanation: "400 and 600 are both 1 standard deviation from the mean (500 ± 100). In a normal distribution, approximately 68% of data falls within 1 standard deviation of the mean.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "One-variable data: Distributions and measures of center and spread",
    difficultyRating: 9
  }
];

export const importedSATMathCount9 = importedSATMathQuestions9.length;
