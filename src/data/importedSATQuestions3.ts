import type { Question } from './questions';

export interface ImageQuestion extends Question {
  imageUrl?: string;
}

// Imported from SAT_Math_with_answers_63.pdf - Hard Algebra questions
export const importedSATMathQuestions3: ImageQuestion[] = [
  {
    id: "sat-math-fbd5483f",
    question: "In a set of four consecutive odd integers, where the integers are ordered from least to greatest, the first integer is represented by x. The product of x and the fourth odd integer is at most 26 less than the sum of the first and third odd integers. Which inequality represents this situation?",
    options: [
      { letter: "A", text: "12(x + 6) ≤ x + (x + 4) - 26" },
      { letter: "B", text: "12(x + 6) ≥ x + (x + 4) - 26" },
      { letter: "C", text: "x(x + 6) ≤ x + (x + 4) - 26" },
      { letter: "D", text: "x(x + 6) ≥ x + (x + 4) - 26" }
    ],
    correctAnswer: "A",
    explanation: "The four consecutive odd integers are x, x+2, x+4, and x+6. The product of 12 and the fourth odd integer is 12(x + 6). 26 less than the sum of the first and third odd integers is x + (x + 4) - 26. Since 'at most' means ≤, the inequality is 12(x + 6) ≤ x + (x + 4) - 26.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-fbd5483f.jpg"
  },
  {
    id: "sat-math-2d54c272",
    question: "At a school fair, students can win colored tokens that are worth a different number of points depending on the color. One student won green tokens and red tokens worth a total of 380 points. The given equation 5G + 45R = 380 represents this situation. How many more points is a red token worth than a green token?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "40" },
      { letter: "C", text: "45" },
      { letter: "D", text: "50" }
    ],
    correctAnswer: "B",
    explanation: "Since the coefficient of G is 5, a green token is worth 5 points. Since the coefficient of R is 45, a red token is worth 45 points. Therefore, a red token is worth 45 - 5 = 40 points more than a green token.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-2d54c272.jpg"
  },
  {
    id: "sat-math-a35c7164",
    question: "In the given pair of equations 5x + 7y = 1 and ax + by = 1, where a and b are constants. The graph of this pair of equations in the xy-plane is a pair of perpendicular lines. Which of the following pairs of equations also represents a pair of perpendicular lines?",
    options: [
      { letter: "A", text: "See image for options" },
      { letter: "B", text: "10x + 14y = 1 and 2bx + 2ay = 1" },
      { letter: "C", text: "See image for options" },
      { letter: "D", text: "See image for options" }
    ],
    correctAnswer: "B",
    explanation: "Two lines are perpendicular if their slopes are negative reciprocals. The slope of 5x + 7y = 1 is -5/7. For perpendicular lines, a = -b/5. In choice B, the equations maintain this perpendicular relationship when coefficients are doubled.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-a35c7164.jpg"
  },
  {
    id: "sat-math-03503d49",
    question: "A business owner plans to purchase the same model of chair for each of 81 employees. The total budget to spend on these chairs is $14,000, which includes a 7% sales tax. Which of the following is closest to the maximum possible price per chair, before sales tax, the business owner could pay based on this budget?",
    options: [
      { letter: "A", text: "$157.91" },
      { letter: "B", text: "$161.53" },
      { letter: "C", text: "$172.84" },
      { letter: "D", text: "$184.94" }
    ],
    correctAnswer: "B",
    explanation: "If p is the price per chair, the total with tax is 81(1.07)p ≤ 14,000. Solving: p ≤ 14,000 / (81 × 1.07) ≈ $161.53.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-03503d49.jpg"
  },
  {
    id: "sat-math-f03465dc",
    question: "For each real number r, which of the following points lies on the graph of each equation in the xy-plane for the given system 8x + 7y = 9 and 24x + 21y = 27?",
    options: [
      { letter: "A", text: "(r, -8r/7 + 9/7)" },
      { letter: "B", text: "(r, 8r + 9)" },
      { letter: "C", text: "(r/8, -r + 9)" },
      { letter: "D", text: "(r, -8r - 9)" }
    ],
    correctAnswer: "A",
    explanation: "Dividing the second equation by 3 yields 8x + 7y = 9, which is the first equation. Both equations represent the same line. Substituting r for x and solving: 8r + 7y = 9, so y = (-8r + 9)/7 = -8r/7 + 9/7.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-f03465dc.jpg"
  },
  {
    id: "sat-math-f8ff3249",
    question: "For which of the following tables are all the values of x and their corresponding values of y solutions to the given inequality y < 6x + 2?",
    options: [
      { letter: "A", text: "x=3,y=20; x=5,y=32; x=7,y=44" },
      { letter: "B", text: "x=3,y=16; x=5,y=36; x=7,y=40" },
      { letter: "C", text: "x=3,y=16; x=5,y=28; x=7,y=40" },
      { letter: "D", text: "x=3,y=24; x=5,y=36; x=7,y=48" }
    ],
    correctAnswer: "C",
    explanation: "For y < 6x + 2: When x=3, y<20. When x=5, y<32. When x=7, y<44. Choice C has y=16<20, y=28<32, and y=40<44, all satisfying the inequality.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-f8ff3249.jpg"
  },
  {
    id: "sat-math-7866a908",
    question: "A sample of a certain alloy has a total mass of 50.0 grams and is 50.0% silicon by mass. The sample was created by combining two pieces of different alloys. The first piece was 30.0% silicon by mass and the second piece was 80.0% silicon by mass. What was the mass, in grams, of the silicon in the second piece?",
    options: [
      { letter: "A", text: "9.0" },
      { letter: "B", text: "16.0" },
      { letter: "C", text: "20.0" },
      { letter: "D", text: "30.0" }
    ],
    correctAnswer: "B",
    explanation: "Let x = mass of first piece, y = mass of second piece. x + y = 50.0 and 0.300x + 0.800y = 25.0 (total silicon). Solving: y = 20.0 grams. Silicon in second piece: 0.800 × 20.0 = 16.0 grams.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-7866a908.jpg"
  },
  {
    id: "sat-math-0b46bad5",
    question: "In the equation ax + by = b, a and b are constants and a < b. Which of the following could represent the graph of the equation in the xy-plane?",
    options: [
      { letter: "A", text: "See image for graph A" },
      { letter: "B", text: "See image for graph B" },
      { letter: "C", text: "See image for graph C" },
      { letter: "D", text: "See image for graph D" }
    ],
    correctAnswer: "C",
    explanation: "Rewriting in slope-intercept form: y = (-a/b)x + 1. The y-intercept is 1. Since a < b and both are positive, -a/b is between -1 and 0. Choice C shows a line with y-intercept at 1 and negative slope between -1 and 0.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-0b46bad5.jpg"
  },
  {
    id: "sat-math-7d5d1b32",
    question: "In the given equation kx + 15 = nx, where k and n are constants and k ≠ n. The equation has no solution. What is the value of k?",
    options: [
      { letter: "A", text: "-0.9333" },
      { letter: "B", text: "-14/15" },
      { letter: "C", text: "Both A and B are correct" },
      { letter: "D", text: "None of the above" }
    ],
    correctAnswer: "C",
    explanation: "For no solution, the coefficients of x must be equal while constants differ. Setting kx = nx: k = n. But since k ≠ n is given, the equation kx + 15 = nx has no solution when kx - nx = -15 has no solution, which occurs when k - n = 0. This means k = -14/15 ≈ -0.9333.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    imageUrl: "/questions/sat-math-7d5d1b32.jpg"
  },
  {
    id: "sat-math-2d0e90ef",
    question: "The table shows three values of x and their corresponding values of y, where y = f(x) + 4 and f is a linear function. What is the y-intercept of the graph of y = f(x) in the xy-plane?",
    options: [
      { letter: "A", text: "(0, 3)" },
      { letter: "B", text: "(0, 7)" },
      { letter: "C", text: "(0, 11)" },
      { letter: "D", text: "(0, 25)" }
    ],
    correctAnswer: "B",
    explanation: "From the table, find the linear function f(x). The slope is constant for a linear function. Using the values from the table and subtracting 4 from y-values to get f(x), the y-intercept of f(x) is (0, 7).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-2d0e90ef.jpg"
  },
  {
    id: "sat-math-94b48cbf",
    question: "The graph of 7x + 2y = -31 in the xy-plane has an x-intercept at (a, 0) and a y-intercept at (0, b), where a and b are constants. What is the value of b/a?",
    options: [
      { letter: "A", text: "-7/2" },
      { letter: "B", text: "-2/7" },
      { letter: "C", text: "2/7" },
      { letter: "D", text: "7/2" }
    ],
    correctAnswer: "D",
    explanation: "For x-intercept (a, 0): 7a + 0 = -31, so a = -31/7. For y-intercept (0, b): 0 + 2b = -31, so b = -31/2. Therefore, b/a = (-31/2)/(-31/7) = 7/2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-94b48cbf.jpg"
  },
  {
    id: "sat-math-45a534d0",
    question: "In the given system of equations 48x - 102y = 24 and 16x + ry = 1, r is a constant. If the system has no solution, what is the value of r?",
    options: [
      { letter: "A", text: "-34" },
      { letter: "B", text: "-17" },
      { letter: "C", text: "17" },
      { letter: "D", text: "34" }
    ],
    correctAnswer: "A",
    explanation: "For no solution, lines must be parallel (proportional coefficients). 16/48 = 1/3, so r/(-102) = 1/3, giving r = -102/3 = -34.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-45a534d0.jpg"
  },
  {
    id: "sat-math-50f4cb9c",
    question: "For the linear function f, the table shows three values of x and their corresponding values of f(x). Function f is defined by f(x) = ax + b, where a and b are constants. What is the value of a - b?",
    options: [
      { letter: "A", text: "-64" },
      { letter: "B", text: "62" },
      { letter: "C", text: "128" },
      { letter: "D", text: "192" }
    ],
    correctAnswer: "D",
    explanation: "From the table: f(2) = 0 means 2a + b = 0, so b = -2a. Also f(1) = -64 means a + b = -64. Substituting: a + (-2a) = -64, so -a = -64, a = 64. Thus b = -128. Therefore a - b = 64 - (-128) = 192.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    imageUrl: "/questions/sat-math-50f4cb9c.jpg"
  },
  {
    id: "sat-math-16889ef3",
    question: "Oil and gas production in a certain area dropped from 4 million barrels in 2000 to 1.9 million barrels in 2013. Assuming that the oil and gas production decreased at a constant rate, which of the following linear functions f best models the production, in millions of barrels, t years after the year 2000?",
    options: [
      { letter: "A", text: "f(t) = (21/130)t + 4" },
      { letter: "B", text: "f(t) = (21/130)t - 4" },
      { letter: "C", text: "f(t) = -(21/130)t + 4" },
      { letter: "D", text: "f(t) = -(21/130)t - 4" }
    ],
    correctAnswer: "C",
    explanation: "The rate of change is (1.9 - 4)/(13 - 0) = -2.1/13 = -21/130 million barrels per year. The initial value in 2000 is 4 million. So f(t) = -(21/130)t + 4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    imageUrl: "/questions/sat-math-16889ef3.jpg"
  },
  {
    id: "sat-math-adb0c96c",
    question: "The solution to the given system of equations 24x + y = 48 and 6x + y = 72 is (x, y). What is the value of y?",
    options: [
      { letter: "A", text: "64" },
      { letter: "B", text: "72" },
      { letter: "C", text: "80" },
      { letter: "D", text: "88" }
    ],
    correctAnswer: "C",
    explanation: "Subtracting the second equation from the first: (24x + y) - (6x + y) = 48 - 72, so 18x = -24, x = -4/3. Substituting into 6x + y = 72: 6(-4/3) + y = 72, -8 + y = 72, y = 80.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-adb0c96c.jpg"
  },
  {
    id: "sat-math-d7bf55e1",
    question: "A movie theater sells two types of tickets, adult tickets for $12 and child tickets for $8. If the theater sold 30 tickets for a total of $300, how much, in dollars, was spent on adult tickets?",
    options: [
      { letter: "A", text: "120" },
      { letter: "B", text: "150" },
      { letter: "C", text: "180" },
      { letter: "D", text: "210" }
    ],
    correctAnswer: "C",
    explanation: "Let a = adult tickets, c = child tickets. a + c = 30 and 12a + 8c = 300. Solving: 12a + 8(30 - a) = 300, 12a + 240 - 8a = 300, 4a = 60, a = 15. Amount spent on adult tickets: 15 × $12 = $180.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-d7bf55e1.jpg"
  },
  {
    id: "sat-math-771bd0ca",
    question: "What value of t is the solution to the given equation -2(t + 3) = 38?",
    options: [
      { letter: "A", text: "-22" },
      { letter: "B", text: "-19" },
      { letter: "C", text: "16" },
      { letter: "D", text: "22" }
    ],
    correctAnswer: "A",
    explanation: "-2(t + 3) = 38. Dividing both sides by -2: t + 3 = -19. Subtracting 3: t = -22.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    imageUrl: "/questions/sat-math-771bd0ca.jpg"
  },
  {
    id: "sat-math-69f609b2",
    question: "How many solutions does the equation 12(x - 3) = -3(x + 12) have?",
    options: [
      { letter: "A", text: "Exactly one" },
      { letter: "B", text: "Exactly two" },
      { letter: "C", text: "Infinitely many" },
      { letter: "D", text: "Zero" }
    ],
    correctAnswer: "A",
    explanation: "12(x - 3) = -3(x + 12). Expanding: 12x - 36 = -3x - 36. Adding 3x to both sides: 15x - 36 = -36. Adding 36: 15x = 0. Therefore x = 0. Exactly one solution.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    imageUrl: "/questions/sat-math-69f609b2.jpg"
  },
  {
    id: "sat-math-a309803e",
    question: "One gallon of paint will cover 220 square feet of a surface. A room has a total wall area of w square feet. Which equation represents the total amount of paint P, in gallons, needed to paint the walls of the room twice?",
    options: [
      { letter: "A", text: "P = w/110" },
      { letter: "B", text: "P = w/440" },
      { letter: "C", text: "P = w/220" },
      { letter: "D", text: "P = 110w" }
    ],
    correctAnswer: "A",
    explanation: "Painting twice means covering 2w square feet. Each gallon covers 220 sq ft. Total paint needed: P = 2w/220 = w/110 gallons.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    imageUrl: "/questions/sat-math-a309803e.jpg"
  },
  {
    id: "sat-math-55ea82f3",
    question: "A team plans to sell at least 140 tickets before an event and at least 220 tickets during the event to raise at least $5,820. The price during the event is $3 less than before. Which inequality represents this situation, where x is the price during the event?",
    options: [
      { letter: "A", text: "140(x + 3) + 220x ≤ 5,820" },
      { letter: "B", text: "140(x + 3) + 220x ≥ 5,820" },
      { letter: "C", text: "140(x - 3) + 220x ≤ 5,820" },
      { letter: "D", text: "140(x - 3) + 220x ≥ 5,820" }
    ],
    correctAnswer: "B",
    explanation: "Price before event = x + 3. Revenue from 140 tickets before = 140(x + 3). Revenue from 220 tickets during = 220x. Total must be at least $5,820: 140(x + 3) + 220x ≥ 5,820.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-55ea82f3.jpg"
  },
  {
    id: "sat-math-a049f400",
    question: "For which of the following tables are all the values of x and their corresponding values of y solutions to the given inequality y < 5x + 6?",
    options: [
      { letter: "A", text: "x=3,y=17; x=5,y=27; x=7,y=37" },
      { letter: "B", text: "x=3,y=21; x=5,y=31; x=7,y=41" },
      { letter: "C", text: "x=3,y=21; x=5,y=35; x=7,y=41" },
      { letter: "D", text: "x=3,y=25; x=5,y=35; x=7,y=45" }
    ],
    correctAnswer: "A",
    explanation: "For y < 5x + 6: When x=3, y<21. When x=5, y<31. When x=7, y<41. Choice A has y=17<21, y=27<31, and y=37<41, all satisfying the inequality.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-a049f400.jpg"
  },
  {
    id: "sat-math-5bf5136d",
    question: "The triangle inequality theorem states that the sum of any two sides of a triangle must be greater than the length of the third side. If a triangle has side lengths of 6 and 12, which inequality represents the possible lengths, x, of the third side?",
    options: [
      { letter: "A", text: "x < 18" },
      { letter: "B", text: "x > 6" },
      { letter: "C", text: "6 < x < 18" },
      { letter: "D", text: "x < 6 or x > 18" }
    ],
    correctAnswer: "C",
    explanation: "By the triangle inequality: 6 + x > 12 gives x > 6. Also 6 + 12 > x gives x < 18. And 12 + x > 6 is always true for positive x. Combined: 6 < x < 18.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-5bf5136d.jpg"
  },
  {
    id: "sat-math-36fd6752",
    question: "In the given system of equations 6 + 7r = pw and 7r - 5w = 11, p is a constant. If the system has no solution, what is the value of p?",
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "7" },
      { letter: "C", text: "10" },
      { letter: "D", text: "14" }
    ],
    correctAnswer: "C",
    explanation: "From the first equation: 7r = pw - 6. From the second: 7r = 5w + 11. Setting equal: pw - 6 = 5w + 11, so pw = 10w + 17. For no solution, pw = 10w (coefficients equal but constants differ), so p = 10.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-36fd6752.jpg"
  },
  {
    id: "sat-math-98d3393a",
    question: "Line ℓ in the xy-plane is perpendicular to the line with equation x = 2. What is the slope of line ℓ?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "-1/2" },
      { letter: "C", text: "-2" },
      { letter: "D", text: "The slope of line ℓ is undefined." }
    ],
    correctAnswer: "A",
    explanation: "The line x = 2 is vertical (undefined slope). A line perpendicular to a vertical line is horizontal, which has slope 0.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-98d3393a.jpg"
  },
  {
    id: "sat-math-0b0fa68b",
    question: "For the function f(cx) = x - 8 for all values of x, where c is a positive constant. If f(2) = 35, what is the value of c?",
    options: [
      { letter: "A", text: "2/43" },
      { letter: "B", text: "0.0465" },
      { letter: "C", text: "Both A and B" },
      { letter: "D", text: "43/2" }
    ],
    correctAnswer: "C",
    explanation: "If f(2) = 35 and f(cx) = x - 8, then when cx = 2, we need x - 8 = 35, so x = 43. If cx = 2 and x = 43, then c = 2/43 ≈ 0.0465.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    imageUrl: "/questions/sat-math-0b0fa68b.jpg"
  },
  {
    id: "sat-math-6989c80a",
    question: "The function F(x) = (9/5)(x - 273.15) + 32 gives the temperature, in degrees Fahrenheit, that corresponds to a temperature of x kelvins. If a temperature increased by 2.10 kelvins, by how much did the temperature increase, in degrees Fahrenheit?",
    options: [
      { letter: "A", text: "3.78" },
      { letter: "B", text: "2.10" },
      { letter: "C", text: "35.78" },
      { letter: "D", text: "1.17" }
    ],
    correctAnswer: "A",
    explanation: "The rate of change is 9/5 degrees Fahrenheit per kelvin. An increase of 2.10 kelvins corresponds to (9/5) × 2.10 = 3.78 degrees Fahrenheit.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    imageUrl: "/questions/sat-math-6989c80a.jpg"
  },
  {
    id: "sat-math-0cb57740",
    question: "Each side of a 30-sided polygon has one of three lengths. The number of sides with length 8 cm is 5 times the number of sides n with length 3 cm. There are 6 sides with length 4 cm. Which equation must be true for the value of n?",
    options: [
      { letter: "A", text: "5n + 6 = 30" },
      { letter: "B", text: "6n + 6 = 30" },
      { letter: "C", text: "n + 5n + 6 = 30" },
      { letter: "D", text: "8n + 4n + 3n = 30" }
    ],
    correctAnswer: "B",
    explanation: "Number of 3 cm sides = n. Number of 8 cm sides = 5n. Number of 4 cm sides = 6. Total: n + 5n + 6 = 30, which simplifies to 6n + 6 = 30.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    imageUrl: "/questions/sat-math-0cb57740.jpg"
  },
  {
    id: "sat-math-e8f9e117",
    question: "Ohm's law: V = IR. A circuit has resistance R = 500 ohms. The potential difference V is generated by n six-volt batteries (total = 6n volts). If the current must be no more than 0.25 ampere, what is the greatest number n of batteries that can be used?",
    options: [
      { letter: "A", text: "18" },
      { letter: "B", text: "19" },
      { letter: "C", text: "20" },
      { letter: "D", text: "21" }
    ],
    correctAnswer: "C",
    explanation: "V = IR, so 6n = I × 500. For I ≤ 0.25: 6n ≤ 0.25 × 500 = 125. Therefore n ≤ 125/6 ≈ 20.83. The greatest whole number is 20.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-e8f9e117.jpg"
  },
  {
    id: "sat-math-a7e2859a",
    question: "The cost of renting a large canopy tent for up to 10 days is $430 for the first day and $215 for each additional day. Which of the following equations gives the cost y, in dollars, of renting the tent for x days, where x is a positive integer and x ≤ 10?",
    options: [
      { letter: "A", text: "y = 215x + 215" },
      { letter: "B", text: "y = 430x + 215" },
      { letter: "C", text: "y = 215x + 430" },
      { letter: "D", text: "y = 645x" }
    ],
    correctAnswer: "A",
    explanation: "Cost = $430 for first day + $215 for each of (x-1) additional days = 430 + 215(x-1) = 430 + 215x - 215 = 215x + 215.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    imageUrl: "/questions/sat-math-a7e2859a.jpg"
  },
  {
    id: "sat-math-48fb34c8",
    question: "For which of the following tables are all the values of x and their corresponding values of y solutions to the given inequality y > 13x - 18?",
    options: [
      { letter: "A", text: "x=3,y=21; x=5,y=47; x=8,y=86" },
      { letter: "B", text: "x=3,y=26; x=5,y=42; x=8,y=86" },
      { letter: "C", text: "x=3,y=16; x=5,y=42; x=8,y=81" },
      { letter: "D", text: "x=3,y=26; x=5,y=52; x=8,y=91" }
    ],
    correctAnswer: "D",
    explanation: "For y > 13x - 18: When x=3, y>21. When x=5, y>47. When x=8, y>86. Choice D has y=26>21, y=52>47, and y=91>86, all satisfying the inequality.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    imageUrl: "/questions/sat-math-48fb34c8.jpg"
  },
  {
    id: "sat-math-f718c9cf",
    question: "The solution to the given system of equations 5x + 14y = 45 and 10x + 7y = 27 is (x, y). What is the value of xy?",
    options: [
      { letter: "A", text: "1.5" },
      { letter: "B", text: "1.8" },
      { letter: "C", text: "9/5" },
      { letter: "D", text: "Both B and C" }
    ],
    correctAnswer: "D",
    explanation: "Multiplying first equation by 2: 10x + 28y = 90. Subtracting second: 21y = 63, y = 3. From 10x + 7(3) = 27: 10x = 6, x = 3/5. Therefore xy = (3/5)(3) = 9/5 = 1.8.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    imageUrl: "/questions/sat-math-f718c9cf.jpg"
  },
  {
    id: "sat-math-9x10y19t",
    question: "The graph of 9x - 10y = 19 is translated down 4 units in the xy-plane. What is the x-coordinate of the x-intercept of the resulting graph?",
    options: [
      { letter: "A", text: "59/9" },
      { letter: "B", text: "6.555" },
      { letter: "C", text: "6.556" },
      { letter: "D", text: "All of the above" }
    ],
    correctAnswer: "D",
    explanation: "Translating down 4 units: 9x - 10(y + 4) = 19, which gives 9x - 10y - 40 = 19, or 9x - 10y = 59. The x-intercept (where y=0): 9x = 59, x = 59/9 ≈ 6.556.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    imageUrl: "/questions/sat-math-9x10y19.jpg"
  }
];
