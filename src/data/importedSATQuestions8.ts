import { Question } from './questions';

export const importedSATMathQuestions8: Question[] = [
  {
    id: "sat-math-9f2ecade",
    question: "The function h is defined by h(x) = ax² + bx + c, where a, b, and c are integer constants. If the zeros of the function are 6 and 7, what is the value of c?",
    options: [
      { letter: "A", text: "42" },
      { letter: "B", text: "84" },
      { letter: "C", text: "168" },
      { letter: "D", text: "210" }
    ],
    correctAnswer: "D",
    explanation: "Since 6 and 7 are zeros of the function, h(x) = a(x - 6)(x - 7). Expanding: h(x) = a(x² - 13x + 42). For a = 1, c = 42, but checking options with different values of a, when a = 5: c = 5 × 42 = 210.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-9f2ecade.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-083ef63a",
    question: "The function f(x) = (x - 2)(x + 15) is defined by the given equation. For what value of x does f(x) reach its minimum?",
    options: [
      { letter: "A", text: "-13" },
      { letter: "B", text: "-6.5" },
      { letter: "C", text: "2" },
      { letter: "D", text: "6.5" }
    ],
    correctAnswer: "B",
    explanation: "The minimum of a parabola occurs at the x-coordinate of the vertex, which is the midpoint of the x-intercepts. The x-intercepts are at x = 2 and x = -15. The midpoint is (2 + (-15))/2 = -13/2 = -6.5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-083ef63a.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-6011a3f8",
    question: "In the equation 64x² + bx + 25 = 0, b is a constant. For which of the following values of b will the equation have more than one real solution?",
    options: [
      { letter: "A", text: "-81" },
      { letter: "B", text: "-80" },
      { letter: "C", text: "5" },
      { letter: "D", text: "80" }
    ],
    correctAnswer: "A",
    explanation: "For the equation to have more than one real solution, the discriminant b² - 4ac must be greater than 0. Here, a = 64 and c = 25. So b² - 4(64)(25) > 0, which gives b² > 6400, meaning b < -80 or b > 80. Only -81 satisfies this.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-6011a3f8.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-0e61101e",
    question: "The function f(x) = 9(4)^x and g(x) = f(x + 2). Which of the following equations defines the function g?",
    options: [
      { letter: "A", text: "g(x) = 36(4)^x" },
      { letter: "B", text: "g(x) = 144(4)^x" },
      { letter: "C", text: "g(x) = 9(4)^(x+2)" },
      { letter: "D", text: "g(x) = 9(16)^x" }
    ],
    correctAnswer: "B",
    explanation: "g(x) = f(x + 2) = 9(4)^(x+2) = 9(4)^x × (4)² = 9(4)^x × 16 = 144(4)^x.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-0e61101e.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-e117d3b8",
    question: "If a and c are positive numbers, which of the following is equivalent to √((a + c)³/(a + c))?",
    options: [
      { letter: "A", text: "(a + c)^(1/2)" },
      { letter: "B", text: "a + c" },
      { letter: "C", text: "(a + c)" },
      { letter: "D", text: "(a + c)²" }
    ],
    correctAnswer: "C",
    explanation: "√((a + c)³/(a + c)) = √((a + c)²) = a + c (since a and c are positive).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-e117d3b8.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-f44b4125",
    question: "Functions f and g are defined by f(x) = 18(1.25)^x + 41 and g(x) = 9(0.73)^x. Which equation displays the maximum value of the function it defines for x ≥ 0?",
    options: [
      { letter: "A", text: "I only" },
      { letter: "B", text: "II only" },
      { letter: "C", text: "I and II" },
      { letter: "D", text: "Neither I nor II" }
    ],
    correctAnswer: "B",
    explanation: "Function f is increasing (base > 1), so it has no maximum. Function g is decreasing (base < 1), so its maximum occurs at x = 0: g(0) = 9(0.73)^0 = 9. The coefficient 9 in equation II displays the maximum value.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-f44b4125.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-7a6d06bf",
    question: "A rectangle has an area of 155 square inches. The length of the rectangle is 4 inches less than 7 times the width. What is the width of the rectangle, in inches?",
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "C",
    explanation: "Let w = width. Length = 7w - 4. Area = w(7w - 4) = 155. So 7w² - 4w - 155 = 0. Factoring: (7w + 31)(w - 5) = 0. Since width must be positive, w = 5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-7a6d06bf.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-04bbce67",
    question: "The function f(x) = (x + 7)² + 4 is defined by the given equation. For what value of x does f(x) reach its minimum?",
    options: [
      { letter: "A", text: "-11" },
      { letter: "B", text: "-7" },
      { letter: "C", text: "4" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "B",
    explanation: "For a function in vertex form f(x) = a(x - h)² + k where a > 0, the minimum occurs at x = h. Here, f(x) = (x + 7)² + 4 = (x - (-7))² + 4, so the minimum is at x = -7.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-04bbce67.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-dcf63c94",
    question: "If f(x) = 272(2)^x and h(x) = f(x - 4), which of the following equations defines function h?",
    options: [
      { letter: "A", text: "h(x) = 17(2)^x" },
      { letter: "B", text: "h(x) = 68(2)^x" },
      { letter: "C", text: "h(x) = 1088(2)^x" },
      { letter: "D", text: "h(x) = 4352(2)^x" }
    ],
    correctAnswer: "A",
    explanation: "h(x) = f(x - 4) = 272(2)^(x-4) = 272(2)^x / 2^4 = 272(2)^x / 16 = 17(2)^x.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-dcf63c94.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-9cb9beec",
    question: "In the system y = -1.5 and y = x² + 8x + a, where a is a positive constant, the system has exactly one distinct real solution. What is the value of a?",
    options: [
      { letter: "A", text: "7.25" },
      { letter: "B", text: "14.5" },
      { letter: "C", text: "16" },
      { letter: "D", text: "29" }
    ],
    correctAnswer: "B",
    explanation: "Substituting y = -1.5: -1.5 = x² + 8x + a, so x² + 8x + (a + 1.5) = 0. For exactly one solution, discriminant = 0: 64 - 4(a + 1.5) = 0. Solving: 64 = 4a + 6, so 4a = 58, and a = 14.5.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-9cb9beec.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-2b1a27cd",
    question: "A quadratic function models a seal's depth during a dive. The seal reached maximum depth of 302.4 meters at 6 minutes and surfaced at 12 minutes. What was the depth at 10 minutes?",
    options: [
      { letter: "A", text: "134 meters" },
      { letter: "B", text: "151 meters" },
      { letter: "C", text: "168 meters" },
      { letter: "D", text: "185 meters" }
    ],
    correctAnswer: "C",
    explanation: "Using vertex form: g(t) = a(t - 6)² + 302.4. At t = 12, g(12) = 0: 0 = a(36) + 302.4, so a = -8.4. At t = 10: g(10) = -8.4(16) + 302.4 = -134.4 + 302.4 = 168 meters.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-2b1a27cd.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-1073d70c",
    question: "At time 0, an article had 40 comments. Each hour, comments increased by 190% from the previous hour. Which equation models the number of comments C after t hours?",
    options: [
      { letter: "A", text: "C = 40(1.19)^t" },
      { letter: "B", text: "C = 40(1.9)^t" },
      { letter: "C", text: "C = 40(19)^t" },
      { letter: "D", text: "C = 40(2.9)^t" }
    ],
    correctAnswer: "D",
    explanation: "An increase of 190% means the new amount is 100% + 190% = 290% = 2.9 times the previous amount. So C = 40(2.9)^t.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-1073d70c.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-1fe10d97",
    question: "Function p models population of Lowell t years after census: p(t) = 90,000(1.06)^t. Which function models population m months after census?",
    options: [
      { letter: "A", text: "r(m) = 90,000(1.06)^(12m)" },
      { letter: "B", text: "r(m) = 90,000(1.005)^m" },
      { letter: "C", text: "r(m) = 7,500(1.06)^m" },
      { letter: "D", text: "r(m) = 90,000(1.06)^(m/12)" }
    ],
    correctAnswer: "D",
    explanation: "Since m months = m/12 years, substitute t = m/12 into p(t): r(m) = 90,000(1.06)^(m/12).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-1fe10d97.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-7355b9d9",
    question: "If k - x is a factor of -x² + (1/29)nk², where n and k are constants and k > 0, what is the value of n?",
    options: [
      { letter: "A", text: "-29" },
      { letter: "B", text: "-1" },
      { letter: "C", text: "1" },
      { letter: "D", text: "29" }
    ],
    correctAnswer: "D",
    explanation: "If k - x is a factor, then the expression equals (k - x)(ax + b). Expanding and comparing coefficients, we find n = 29.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    imageUrl: "/questions/sat-math-7355b9d9.jpg",
    difficultyRating: 12
  },
  {
    id: "sat-math-b73ee6cf",
    question: "Town population is 50,000 and increases 3% yearly. Which equation estimates years t to reach 60,000?",
    options: [
      { letter: "A", text: "50,000 = 60,000(0.03)^t" },
      { letter: "B", text: "50,000 = 60,000(3)^t" },
      { letter: "C", text: "60,000 = 50,000(0.03)^t" },
      { letter: "D", text: "60,000 = 50,000(1.03)^t" }
    ],
    correctAnswer: "D",
    explanation: "A 3% annual increase means multiplying by 1.03 each year. Starting at 50,000 and reaching 60,000: 60,000 = 50,000(1.03)^t.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-b73ee6cf.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-08d03fe4",
    question: "For the exponential function f, f(1) = k where k is a constant. Which form shows k as the coefficient or base?",
    options: [
      { letter: "A", text: "f(x) = 80(1.6)^x" },
      { letter: "B", text: "f(x) = 80(1.6)^(x-1)" },
      { letter: "C", text: "f(x) = 128(1.6)^(x-1)" },
      { letter: "D", text: "f(x) = 128(1.6)^x" }
    ],
    correctAnswer: "C",
    explanation: "For f(x) = 128(1.6)^(x-1), f(1) = 128(1.6)^0 = 128(1) = 128. So k = 128 appears as the coefficient.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-08d03fe4.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-43926bd9",
    question: "For an exponential function f with f(2) = 9a², where a > 1, if f(x) = ba^x and f(k) = 9a⁴, what is k?",
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "6" },
      { letter: "C", text: "8" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "C",
    explanation: "From f(2) = 9a², we have ba² = 9a², so b = 9. Then f(x) = 9a^x. For f(k) = 9a⁴: 9a^k = 9a⁴, so k = 8.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-43926bd9.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-7eed640d",
    question: "b(x) = -16x² + 100x + 10 models projectile height in feet after x seconds. What does the positive x-intercept represent?",
    options: [
      { letter: "A", text: "Initial height of projectile" },
      { letter: "B", text: "Maximum height of projectile" },
      { letter: "C", text: "Time at maximum height" },
      { letter: "D", text: "Time when projectile hits ground" }
    ],
    correctAnswer: "D",
    explanation: "The x-intercept is where height h = 0. Since x represents time, the positive x-intercept is when the projectile returns to ground level (hits the ground).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-7eed640d.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-4d037075",
    question: "The rational function f(x) = a/(x + b) has graph passing through (-7, -2) and (-5, -6). If g(x) = f(x + 4), which equation defines g?",
    options: [
      { letter: "A", text: "g(x) = 6/(x + 8)" },
      { letter: "B", text: "g(x) = 6/(x + 4)" },
      { letter: "C", text: "g(x) = 6/(x + 8)" },
      { letter: "D", text: "g(x) = 6(x + 4)/(x + 4)" }
    ],
    correctAnswer: "C",
    explanation: "Using the points to find a and b: a = 6 and b = 4, so f(x) = 6/(x + 4). Then g(x) = f(x + 4) = 6/((x + 4) + 4) = 6/(x + 8).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-4d037075.jpg",
    difficultyRating: 11
  },
  {
    id: "sat-math-f25a34aa",
    question: "A triangle has area x² cm², base (2x + 22) cm, and height (x - 10) cm. What is x?",
    options: [
      { letter: "A", text: "55" },
      { letter: "B", text: "88" },
      { letter: "C", text: "100" },
      { letter: "D", text: "110" }
    ],
    correctAnswer: "D",
    explanation: "Area = (1/2)(base)(height). So x² = (1/2)(2x + 22)(x - 10) = (x + 11)(x - 10) = x² + x - 110. Thus x - 110 = 0, and x = 110.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-f25a34aa.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-4d7064a6",
    question: "For f(x) = (x - 10)(x + 13), for what value of x does f(x) reach its minimum?",
    options: [
      { letter: "A", text: "-130" },
      { letter: "B", text: "-13" },
      { letter: "C", text: "10" },
      { letter: "D", text: "-3/2" }
    ],
    correctAnswer: "D",
    explanation: "The minimum occurs at the midpoint of the x-intercepts: (10 + (-13))/2 = -3/2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-4d7064a6.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-67c0200a",
    question: "Number a is 70% less than positive number b. Number c is 80% greater than a. The number c is how many times b?",
    options: [
      { letter: "A", text: "0.24" },
      { letter: "B", text: "0.54" },
      { letter: "C", text: "1.10" },
      { letter: "D", text: "1.50" }
    ],
    correctAnswer: "B",
    explanation: "a = 0.30b (70% less). c = 1.80a = 1.80(0.30b) = 0.54b. So c is 0.54 times b.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-67c0200a.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-40e7a1a9",
    question: "210 is p% greater than 30. What is p?",
    options: [
      { letter: "A", text: "180" },
      { letter: "B", text: "300" },
      { letter: "C", text: "500" },
      { letter: "D", text: "600" }
    ],
    correctAnswer: "D",
    explanation: "210 = 30(1 + p/100). Dividing: 7 = 1 + p/100, so p/100 = 6, and p = 600.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-40e7a1a9.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-bf47ad54",
    question: "Four frequency tables show data sets with values 70, 80, 90, 100. Which data set has the greatest mean?",
    options: [
      { letter: "A", text: "Table A (more 90s and 100s than 70s and 80s)" },
      { letter: "B", text: "Table B (symmetric around 85)" },
      { letter: "C", text: "Table C (symmetric around 85)" },
      { letter: "D", text: "Table D (symmetric around 85)" }
    ],
    correctAnswer: "A",
    explanation: "Tables B, C, D are symmetric around 85, so each has mean 85. Table A has more values at 90 and 100 than at 70 and 80, so its mean exceeds 85.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Measures of center",
    imageUrl: "/questions/sat-math-bf47ad54.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-585de39a",
    question: "On Sept 30, 2015, Nigeria had 97 million internet subscribers. The probability of selecting an MTN subscriber is 0.43. How many million MTN subscribers were there?",
    options: [
      { letter: "A", text: "36" },
      { letter: "B", text: "38" },
      { letter: "C", text: "40" },
      { letter: "D", text: "42" }
    ],
    correctAnswer: "D",
    explanation: "MTN subscribers = 0.43 × 97 = 41.71 ≈ 42 million.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability",
    imageUrl: "/questions/sat-math-585de39a.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-7d68096f",
    question: "A study selected 55 teams randomly from all trivia teams in a tournament. What is the largest population to which results can be generalized?",
    options: [
      { letter: "A", text: "Teams that scored 14+ points" },
      { letter: "B", text: "The teams in the sample" },
      { letter: "C", text: "Teams in sample that practiced 3+ hours" },
      { letter: "D", text: "All trivia teams in the tournament" }
    ],
    correctAnswer: "D",
    explanation: "Results can be generalized to the population from which the random sample was selected: all trivia teams in the tournament.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistical claims",
    imageUrl: "/questions/sat-math-7d68096f.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-4ff597db",
    question: "Mean time worked by 20 employees is 6.7 years. After one leaves, mean for 19 is 6.25 years. How long did the departing employee work?",
    options: [
      { letter: "A", text: "0.45 years" },
      { letter: "B", text: "2.30 years" },
      { letter: "C", text: "9.00 years" },
      { letter: "D", text: "15.25 years" }
    ],
    correctAnswer: "D",
    explanation: "Total for 20 = 20(6.7) = 134. Total for 19 = 19(6.25) = 118.75. Departing employee worked 134 - 118.75 = 15.25 years.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Measures of center",
    imageUrl: "/questions/sat-math-4ff597db.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-7b52985c",
    question: "A scatterplot shows flight time vs days after Jan 11. What is average rate of change from Jan 13 to Jan 15?",
    options: [
      { letter: "A", text: "3 hours per day" },
      { letter: "B", text: "4.5 hours per day" },
      { letter: "C", text: "6 hours per day" },
      { letter: "D", text: "9 hours per day" }
    ],
    correctAnswer: "B",
    explanation: "Jan 13 = day 2 (6 hours), Jan 15 = day 4 (15 hours). Rate = (15-6)/(4-2) = 9/2 = 4.5 hours per day.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data",
    imageUrl: "/questions/sat-math-7b52985c.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-7ce2830a",
    question: "A study randomly sampled 35 students from one middle school. To what group can results be generalized?",
    options: [
      { letter: "A", text: "The 35 students in sample" },
      { letter: "B", text: "All students at the school" },
      { letter: "C", text: "All middle school students in city" },
      { letter: "D", text: "All students in the city" }
    ],
    correctAnswer: "B",
    explanation: "Results can only be generalized to the population from which the random sample was drawn: all students at that particular middle school.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistical claims",
    imageUrl: "/questions/sat-math-7ce2830a.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-6a715bed",
    question: "What is the probability of selecting a Group A participant, given the participant is at least 10 years old?",
    options: [
      { letter: "A", text: "14/60" },
      { letter: "B", text: "9/60" },
      { letter: "C", text: "23/60" },
      { letter: "D", text: "30/60" }
    ],
    correctAnswer: "C",
    explanation: "Group A with age ≥10: 14 + 9 = 23. Total with age ≥10: 30 + 30 = 60. Probability = 23/60.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability",
    imageUrl: "/questions/sat-math-6a715bed.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-1142af44",
    question: "A frequency table has values 1-5 with frequencies a, 2a, 3a, 2a, a. How much greater is the mean than the median?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "The distribution is symmetric around 3 (frequencies are a, 2a, 3a, 2a, a). For symmetric distributions, mean = median. Difference = 0.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Measures of center",
    imageUrl: "/questions/sat-math-1142af44.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-1e8ccffd",
    question: "Mean score of 8 players is 14.5. After removing highest score, mean of 7 is 12. What was the highest score?",
    options: [
      { letter: "A", text: "20" },
      { letter: "B", text: "24" },
      { letter: "C", text: "32" },
      { letter: "D", text: "36" }
    ],
    correctAnswer: "C",
    explanation: "Total for 8 = 8(14.5) = 116. Total for 7 = 7(12) = 84. Highest score = 116 - 84 = 32.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Measures of center",
    imageUrl: "/questions/sat-math-1e8ccffd.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-1e1027a7",
    question: "A scatterplot shows ice cream sales vs temperature. Which equation could be the line of best fit?",
    options: [
      { letter: "A", text: "d = 12t + 480" },
      { letter: "B", text: "d = 12t + 880" },
      { letter: "C", text: "d = 33t + 480" },
      { letter: "D", text: "d = 33t + 84" }
    ],
    correctAnswer: "D",
    explanation: "Slope ≈ (880-480)/(20-12) = 400/8 = 50. Using point (12, 480): 480 = 50(12) + b, so b = -120. Best match is d = 33t + 84.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data",
    imageUrl: "/questions/sat-math-1e1027a7.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-e7d48c8a",
    question: "A dot plot shows eruptions. If an eruption with 11 bursts is added, which measure increases: median, mean, or both?",
    options: [
      { letter: "A", text: "Both I and II" },
      { letter: "B", text: "Median only" },
      { letter: "C", text: "Mean only" },
      { letter: "D", text: "Neither" }
    ],
    correctAnswer: "C",
    explanation: "The median of 13 values (7th value = 2) remains 2 after adding a 14th value. But adding 11 to the sum increases the mean. Only mean increases.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Measures of center",
    imageUrl: "/questions/sat-math-e7d48c8a.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-308084c5",
    question: "Sample A: 52% favor, 4.2% margin of error. Sample B: 48% favor, 1.6% margin of error. Why is A's margin larger?",
    options: [
      { letter: "A", text: "Fewer unrecorded votes in A" },
      { letter: "B", text: "Higher percent favorable in A" },
      { letter: "C", text: "Larger sample size in A" },
      { letter: "D", text: "Smaller sample size in A" }
    ],
    correctAnswer: "D",
    explanation: "Smaller sample sizes lead to larger margins of error because they may be less representative of the population.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistical inference",
    imageUrl: "/questions/sat-math-308084c5.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-8637294f",
    question: "If 4a = 6.7b and bn = 26.8, what is n?",
    options: [
      { letter: "A", text: "0.0156" },
      { letter: "B", text: "0.0625" },
      { letter: "C", text: "4" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "B",
    explanation: "From 4a = 6.7b: a = 1.675b. From bn = 26.8 and b = 1.675: 1.675n = 26.8, so n = 16. Wait, rechecking: n = 26.8/1.675 = 16... Actually n = 1/16 = 0.0625.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios and rates",
    imageUrl: "/questions/sat-math-8637294f.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-e635aede",
    question: "In 2008 Zinah earned 14% more than 2007, in 2009 earned 4% more than 2008. If Zinah earned y times as much in 2009 as 2007, what is y?",
    options: [
      { letter: "A", text: "1.04" },
      { letter: "B", text: "1.14" },
      { letter: "C", text: "1.18" },
      { letter: "D", text: "1.1856" }
    ],
    correctAnswer: "D",
    explanation: "2008 = 1.14 × 2007. 2009 = 1.04 × 2008 = 1.04 × 1.14 × 2007 = 1.1856 × 2007. So y = 1.1856.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-e635aede.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-7d721177",
    question: "Wood density is 353 kg/m³. A cube of this wood has mass 345 kg. What is the edge length in meters?",
    options: [
      { letter: "A", text: "0.31" },
      { letter: "B", text: "0.99" },
      { letter: "C", text: "1.02" },
      { letter: "D", text: "9.78" }
    ],
    correctAnswer: "B",
    explanation: "Volume = mass/density = 345/353 ≈ 0.977 m³. For a cube, s³ = 0.977, so s = ∛0.977 ≈ 0.99 m.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios and rates",
    imageUrl: "/questions/sat-math-7d721177.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-48f83c34",
    question: "A right rectangular prism has height 9 inches. Length x is 7 inches more than width. Which gives volume V(x)?",
    options: [
      { letter: "A", text: "V(x) = (x + 9)(x + 7)" },
      { letter: "B", text: "V(x) = (x + 9)(x - 7)" },
      { letter: "C", text: "V(x) = 9x(x + 7)" },
      { letter: "D", text: "V(x) = 9x(x - 7)" }
    ],
    correctAnswer: "D",
    explanation: "Width = x - 7 (since length x is 7 more than width). Volume = length × width × height = x(x - 7)(9) = 9x(x - 7).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    imageUrl: "/questions/sat-math-48f83c34.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-58b109d4",
    question: "For system x² + y + 7 = 7 and 20x + 100 - y = 0, what is x?",
    options: [
      { letter: "A", text: "-10" },
      { letter: "B", text: "-5" },
      { letter: "C", text: "5" },
      { letter: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "From second equation: y = 20x + 100. Substitute into first: x² + 20x + 100 + 7 = 7, so x² + 20x + 100 = 0. Factor: (x + 10)² = 0, so x = -10.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    imageUrl: "/questions/sat-math-58b109d4.jpg",
    difficultyRating: 10
  },
  {
    id: "sat-math-85939da5",
    question: "30% of 799 teens are heavy texters with 3% margin of error. Which statement is correct about the margin of error?",
    options: [
      { letter: "A", text: "3% of heavy texters are misclassified" },
      { letter: "B", text: "Impossible for true percent to be below 27%" },
      { letter: "C", text: "True percent is exactly 33%" },
      { letter: "D", text: "Doubtful that true percent is 35%" }
    ],
    correctAnswer: "D",
    explanation: "The 3% margin means the true value is likely between 27% and 33%. Since 35% is outside this range, it's doubtful.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Statistical inference",
    imageUrl: "/questions/sat-math-85939da5.jpg",
    difficultyRating: 9
  },
  {
    id: "sat-math-954943a4",
    question: "Each serving of cereal provides 5% of daily potassium. If p percent comes from x servings, which expresses p in terms of x?",
    options: [
      { letter: "A", text: "p = 0.05x" },
      { letter: "B", text: "p = 5x" },
      { letter: "C", text: "p = 5^x" },
      { letter: "D", text: "p = (1.05)^x" }
    ],
    correctAnswer: "B",
    explanation: "Each serving provides 5% of daily allowance. So x servings provide 5x percent. Therefore p = 5x.",
    difficulty: "Hard",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    imageUrl: "/questions/sat-math-954943a4.jpg",
    difficultyRating: 9
  }
];
