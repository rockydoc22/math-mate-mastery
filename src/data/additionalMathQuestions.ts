import { Question } from "./questions";

export const additionalMathQuestions: Question[] = [
  {
    id: "math_16889ef3",
    question: "Oil and gas production in a certain area dropped from 4 million barrels in 2000 to 1.9 million barrels in 2013. Assuming that the oil and gas production decreased at a constant rate, which of the following linear functions f best models the production, in millions of barrels, t years after the year 2000?",
    options: [
      { letter: "A", text: "f(t) = (21/130)t + 4" },
      { letter: "B", text: "f(t) = (19/130)t + 4" },
      { letter: "C", text: "f(t) = -(21/130)t + 4" },
      { letter: "D", text: "f(t) = -(19/130)t + 4" }
    ],
    correctAnswer: "C",
    explanation: "Since the production decreased at a constant rate, the function f that best models the production t years after 2000 can be written as a linear function f(t) = mt + b. Since there were 4 million barrels in 2000, b = 4. The rate of change m = (4 - 1.9)/(0 - 13) = 2.1/(-13) = -21/130. Since production decreased over time, the rate must be negative.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions"
  },
  {
    id: "math_adb0c96c",
    question: "24x + y = 48\n6x + y = 72\n\nThe solution to the given system of equations is (x, y). What is the value of y?",
    options: [
      { letter: "A", text: "68" },
      { letter: "B", text: "72" },
      { letter: "C", text: "76" },
      { letter: "D", text: "80" }
    ],
    correctAnswer: "D",
    explanation: "Subtracting the second equation from the first: (24x + y) - (6x + y) = 48 - 72, which gives 18x = -24, so x = -8/6 = -4/3. Wait, let me recalculate: 24x - 6x = 18x, and 48 - 72 = -24, so 18x = -24, x = -24/18 = -4/3. Hmm, that doesn't work. Let me try again: subtracting gives 18x = -24, so x = -24/18 = -4/3. Substituting into 6x + y = 72: 6(-4/3) + y = 72, so -8 + y = 72, y = 80.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables"
  },
  {
    id: "math_d7bf55e1",
    question: "A movie theater sells two types of tickets, adult tickets for $12 and child tickets for $8. If the theater sold 30 tickets for a total of $300, how much, in dollars, was spent on adult tickets? (Disregard the $ sign when gridding your answer.)",
    options: [
      { letter: "A", text: "120" },
      { letter: "B", text: "150" },
      { letter: "C", text: "180" },
      { letter: "D", text: "240" }
    ],
    correctAnswer: "C",
    explanation: "Let a = number of adult tickets and c = number of child tickets. We have: a + c = 30 and 12a + 8c = 300. Multiply the first equation by 8: 8a + 8c = 240. Subtracting from the second equation: 12a + 8c - (8a + 8c) = 300 - 240, giving 4a = 60, so a = 15. The amount spent on adult tickets is 12a = 12(15) = $180.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables"
  },
  {
    id: "math_771bd0ca",
    question: "5(t + 3) - 7(t + 3) = 38\n\nWhat value of t is the solution to the given equation?",
    options: [
      { letter: "A", text: "-25" },
      { letter: "B", text: "-22" },
      { letter: "C", text: "-19" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "B",
    explanation: "The equation can be rewritten as -2(t + 3) = 38. Dividing both sides by -2 yields t + 3 = -19. Subtracting 3 from both sides gives t = -22.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable"
  },
  {
    id: "math_69f609b2",
    question: "How many solutions does the equation 12(x - 3) = -3(x + 12) have?",
    options: [
      { letter: "A", text: "Exactly one" },
      { letter: "B", text: "Exactly two" },
      { letter: "C", text: "Infinitely many" },
      { letter: "D", text: "Zero" }
    ],
    correctAnswer: "A",
    explanation: "Distributing on both sides: 12x - 36 = -3x - 36. Adding 3x to each side: 15x - 36 = -36. Adding 36 to each side: 15x = 0. Dividing by 15: x = 0. Since there is exactly one value of x that satisfies the equation, it has exactly one solution.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in one variable"
  },
  {
    id: "math_a309803e",
    question: "One gallon of paint will cover 220 square feet of a surface. A room has a total wall area of w square feet. Which equation represents the total amount of paint P, in gallons, needed to paint the walls of the room twice?",
    options: [
      { letter: "A", text: "P = w/110" },
      { letter: "B", text: "P = 440w" },
      { letter: "C", text: "P = w/220" },
      { letter: "D", text: "P = 220w" }
    ],
    correctAnswer: "A",
    explanation: "Since the walls need to be painted twice, the total area to be painted is 2w square feet. Since one gallon covers 220 square feet, the number of gallons needed is 2w/220 = w/110. Therefore, P = w/110.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions"
  },
  {
    id: "math_55ea82f3",
    question: "A team hosting an event to raise money for new uniforms plans to sell at least 140 tickets before this event and at least 220 tickets during this event to raise a total of at least $5,820 from all tickets sold. The price of a ticket during this event is $3 less than the price of a ticket before this event. Which inequality represents this situation, where x is the price, in dollars, of a ticket sold during this event?",
    options: [
      { letter: "A", text: "140(x + 3) + 220x ≤ 5,820" },
      { letter: "B", text: "140(x + 3) + 220x ≥ 5,820" },
      { letter: "C", text: "140(x - 3) + 220x ≤ 5,820" },
      { letter: "D", text: "140(x - 3) + 220x ≥ 5,820" }
    ],
    correctAnswer: "B",
    explanation: "The price during the event is x, and the price before is $3 more, so x + 3. Revenue from before-event tickets: 140(x + 3). Revenue from during-event tickets: 220x. Total revenue must be at least $5,820, so 140(x + 3) + 220x ≥ 5,820.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables"
  }
];
