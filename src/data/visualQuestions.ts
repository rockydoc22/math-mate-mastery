export interface VisualQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  domain: string;
  skill: string;
  visual?: {
    type: 'lineGraph' | 'table' | 'barChart' | 'scatterPlot';
    data: any;
    title?: string;
    xLabel?: string;
    yLabel?: string;
  };
}

// Sample visual math questions
export const visualMathQuestions: VisualQuestion[] = [
  // Table-based linear function questions
  {
    id: "vmath007",
    question: "For the linear function f, the table shows three values of x and their corresponding values of f(x). Function f is defined by f(x) = ax + b, where a and b are constants. What is the value of a - b?",
    options: [
      { letter: "A", text: "-64" },
      { letter: "B", text: "62" },
      { letter: "C", text: "128" },
      { letter: "D", text: "192" },
    ],
    correctAnswer: "D",
    explanation: "From the table, f(2) = 0, so 2a + b = 0, meaning b = -2a. Also f(1) = -64, so a + b = -64. Substituting b = -2a: a + (-2a) = -64, giving -a = -64, so a = 64. Then b = -2(64) = -128. Therefore a - b = 64 - (-128) = 192.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    visual: {
      type: "table",
      data: {
        headers: ["x", "f(x)"],
        rows: [
          [1, -64],
          [2, 0],
          [3, 64],
        ],
      },
    },
  },
  {
    id: "vmath008",
    question: "The table shows values for a linear function g. If g(x) = mx + c, what is the value of m + c?",
    options: [
      { letter: "A", text: "6" },
      { letter: "B", text: "8" },
      { letter: "C", text: "10" },
      { letter: "D", text: "12" },
    ],
    correctAnswer: "B",
    explanation: "From the table, slope m = (11-5)/(2-0) = 6/2 = 3. The y-intercept c = 5 (when x=0). Therefore m + c = 3 + 5 = 8.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    visual: {
      type: "table",
      data: {
        headers: ["x", "g(x)"],
        rows: [
          [0, 5],
          [2, 11],
          [4, 17],
          [6, 23],
        ],
      },
    },
  },
  {
    id: "vmath009",
    question: "The function f is defined by f(x) = (-8)(2)^x + 22. What is the y-intercept of the graph of y = f(x) in the xy-plane?",
    options: [
      { letter: "A", text: "(0, 14)" },
      { letter: "B", text: "(0, 2)" },
      { letter: "C", text: "(0, 22)" },
      { letter: "D", text: "(0, -8)" },
    ],
    correctAnswer: "A",
    explanation: "The y-intercept occurs at x = 0. Substituting: f(0) = (-8)(2)^0 + 22 = (-8)(1) + 22 = -8 + 22 = 14. Therefore, the y-intercept is (0, 14).",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    visual: {
      type: "lineGraph",
      data: [
        { x: -2, y: 20 },
        { x: -1, y: 18 },
        { x: 0, y: 14 },
        { x: 1, y: 6 },
        { x: 2, y: -10 },
      ],
      title: "f(x) = (-8)(2)^x + 22",
      xLabel: "x",
      yLabel: "y",
    },
  },
  {
    id: "vmath010",
    question: "The function f(t) = 8,000(0.65)^t models the number of coupons a company sent to customers at the end of each year, where t represents years since 1998 (0 ≤ t ≤ 5). Which is the best interpretation of the y-intercept of this graph?",
    options: [
      { letter: "A", text: "The minimum estimated coupons during the 5 years was 1,428." },
      { letter: "B", text: "The minimum estimated coupons during the 5 years was 8,000." },
      { letter: "C", text: "The estimated coupons at the end of 1998 was 1,428." },
      { letter: "D", text: "The estimated coupons at the end of 1998 was 8,000." },
    ],
    correctAnswer: "D",
    explanation: "The y-intercept is at t = 0. f(0) = 8,000(0.65)^0 = 8,000(1) = 8,000. Since t represents years since 1998, t = 0 is the end of 1998. Therefore, the y-intercept means 8,000 coupons were sent at the end of 1998.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    visual: {
      type: "lineGraph",
      data: [
        { x: 0, y: 8000 },
        { x: 1, y: 5200 },
        { x: 2, y: 3380 },
        { x: 3, y: 2197 },
        { x: 4, y: 1428 },
        { x: 5, y: 928 },
      ],
      title: "f(t) = 8,000(0.65)^t",
      xLabel: "Years since 1998",
      yLabel: "Coupons",
    },
  },
  {
    id: "vmath011",
    question: "The table shows ordered pairs for function h. If h is a linear function, what is h(6)?",
    options: [
      { letter: "A", text: "19" },
      { letter: "B", text: "21" },
      { letter: "C", text: "23" },
      { letter: "D", text: "25" },
    ],
    correctAnswer: "C",
    explanation: "From the table, slope = (11-5)/(2-0) = 6/2 = 3. The y-intercept is 5 (when x=0). So h(x) = 3x + 5. Therefore h(6) = 3(6) + 5 = 18 + 5 = 23.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    visual: {
      type: "table",
      data: {
        headers: ["x", "h(x)"],
        rows: [
          [0, 5],
          [2, 11],
          [4, 17],
        ],
      },
    },
  },
  {
    id: "vmath012",
    question: "The graph shows exponential function g(x) = a·b^x. Based on the graph, what is the value of b?",
    options: [
      { letter: "A", text: "0.5" },
      { letter: "B", text: "2" },
      { letter: "C", text: "3" },
      { letter: "D", text: "4" },
    ],
    correctAnswer: "B",
    explanation: "From the graph, g(0) = 3 and g(1) = 6. Since g(x) = a·b^x, we have a = 3 (y-intercept). Then g(1) = 3·b = 6, so b = 2.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Exponential functions",
    visual: {
      type: "lineGraph",
      data: [
        { x: -1, y: 1.5 },
        { x: 0, y: 3 },
        { x: 1, y: 6 },
        { x: 2, y: 12 },
        { x: 3, y: 24 },
      ],
      title: "g(x) = a·b^x",
      xLabel: "x",
      yLabel: "y",
    },
  },
  {
    id: "vmath013",
    question: "A biologist recorded bacteria population over time. Based on the table, which function best models the population P after t hours?",
    options: [
      { letter: "A", text: "P(t) = 100 + 100t" },
      { letter: "B", text: "P(t) = 100(2)^t" },
      { letter: "C", text: "P(t) = 100t²" },
      { letter: "D", text: "P(t) = 200t" },
    ],
    correctAnswer: "B",
    explanation: "Testing P(t) = 100(2)^t: P(0) = 100(1) = 100 ✓, P(1) = 100(2) = 200 ✓, P(2) = 100(4) = 400 ✓, P(3) = 100(8) = 800 ✓. The population doubles each hour, confirming exponential growth.",
    difficulty: "Hard",
    domain: "Advanced Math",
    skill: "Exponential models",
    visual: {
      type: "table",
      data: {
        headers: ["Hours (t)", "Population"],
        rows: [
          [0, 100],
          [1, 200],
          [2, 400],
          [3, 800],
        ],
      },
    },
  },
  {
    id: "vmath014",
    question: "The scatterplot shows the relationship between advertising spending and sales revenue. If the line of best fit passes through (20, 50) and (60, 130), what revenue would be predicted for $80,000 in advertising?",
    options: [
      { letter: "A", text: "$150,000" },
      { letter: "B", text: "$170,000" },
      { letter: "C", text: "$190,000" },
      { letter: "D", text: "$210,000" },
    ],
    correctAnswer: "B",
    explanation: "Slope = (130-50)/(60-20) = 80/40 = 2. Using point-slope: y - 50 = 2(x - 20), so y = 2x + 10. At x = 80: y = 2(80) + 10 = 170.",
    difficulty: "Hard",
    domain: "Statistics",
    skill: "Line of best fit",
    visual: {
      type: "scatterPlot",
      data: [
        { x: 10, y: 35 },
        { x: 20, y: 50 },
        { x: 30, y: 75 },
        { x: 40, y: 85 },
        { x: 50, y: 110 },
        { x: 60, y: 130 },
        { x: 70, y: 145 },
      ],
      title: "Advertising vs Revenue ($thousands)",
      xLabel: "Advertising ($K)",
      yLabel: "Revenue ($K)",
    },
  },
  {
    id: "vmath001",
    question: "The graph of y = f(x) + 14 is shown. Which equation defines function f?",
    options: [
      { letter: "A", text: "f(x) = -¼x - 12" },
      { letter: "B", text: "f(x) = -¼x + 16" },
      { letter: "C", text: "f(x) = -¼x + 2" },
      { letter: "D", text: "f(x) = -¼x - 14" },
    ],
    correctAnswer: "A",
    explanation: "The graph shows y = f(x) + 14 with y-intercept at (0, 2) and slope of -1/4. Since f(x) + 14 = -¼x + 2, we get f(x) = -¼x + 2 - 14 = -¼x - 12.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    visual: {
      type: "lineGraph",
      data: [
        { x: -8, y: 4 },
        { x: -4, y: 3 },
        { x: 0, y: 2 },
        { x: 4, y: 1 },
        { x: 8, y: 0 },
      ],
      title: "y = f(x) + 14",
      xLabel: "x",
      yLabel: "y",
    },
  },
  {
    id: "vmath002",
    question: "The table shows the relationship between x and y. Which equation best represents this relationship?",
    options: [
      { letter: "A", text: "y = 2x + 3" },
      { letter: "B", text: "y = 3x + 2" },
      { letter: "C", text: "y = 2x - 1" },
      { letter: "D", text: "y = x + 5" },
    ],
    correctAnswer: "A",
    explanation: "Testing the equation y = 2x + 3: When x = 1, y = 2(1) + 3 = 5 ✓. When x = 2, y = 2(2) + 3 = 7 ✓. When x = 3, y = 2(3) + 3 = 9 ✓. The pattern holds for all values.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear functions",
    visual: {
      type: "table",
      data: {
        headers: ["x", "y"],
        rows: [
          [1, 5],
          [2, 7],
          [3, 9],
          [4, 11],
          [5, 13],
        ],
      },
    },
  },
  {
    id: "vmath003",
    question: "The bar chart shows quarterly sales for a company. What was the percent increase from Q1 to Q4?",
    options: [
      { letter: "A", text: "25%" },
      { letter: "B", text: "50%" },
      { letter: "C", text: "75%" },
      { letter: "D", text: "100%" },
    ],
    correctAnswer: "B",
    explanation: "Q1 sales were $200,000 and Q4 sales were $300,000. Percent increase = ((300,000 - 200,000) / 200,000) × 100 = 50%.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Percentages and data analysis",
    visual: {
      type: "barChart",
      data: [
        { name: "Q1", value: 200 },
        { name: "Q2", value: 220 },
        { name: "Q3", value: 260 },
        { name: "Q4", value: 300 },
      ],
      title: "Quarterly Sales (thousands $)",
      yLabel: "Sales ($K)",
    },
  },
  {
    id: "vmath004",
    question: "The scatterplot shows the relationship between hours studied and test scores. Based on the line of best fit, what score would be expected for a student who studies 7 hours?",
    options: [
      { letter: "A", text: "78" },
      { letter: "B", text: "82" },
      { letter: "C", text: "86" },
      { letter: "D", text: "90" },
    ],
    correctAnswer: "C",
    explanation: "The line of best fit has approximately slope 4 and y-intercept 58. Using y = 4x + 58: y = 4(7) + 58 = 28 + 58 = 86.",
    difficulty: "Hard",
    domain: "Statistics",
    skill: "Scatterplots and line of best fit",
    visual: {
      type: "scatterPlot",
      data: [
        { x: 1, y: 62 },
        { x: 2, y: 65 },
        { x: 3, y: 70 },
        { x: 4, y: 74 },
        { x: 5, y: 78 },
        { x: 6, y: 82 },
        { x: 8, y: 90 },
        { x: 9, y: 94 },
      ],
      title: "Study Hours vs Test Score",
      xLabel: "Hours Studied",
      yLabel: "Test Score",
    },
  },
  {
    id: "vmath005",
    question: "The graph shows a parabola. What is the vertex of this quadratic function?",
    options: [
      { letter: "A", text: "(2, -4)" },
      { letter: "B", text: "(-2, -4)" },
      { letter: "C", text: "(2, 4)" },
      { letter: "D", text: "(-2, 4)" },
    ],
    correctAnswer: "A",
    explanation: "The vertex is the lowest point on an upward-opening parabola. From the graph, the minimum occurs at x = 2, y = -4.",
    difficulty: "Hard",
    domain: "Advanced Algebra",
    skill: "Quadratic functions",
    visual: {
      type: "lineGraph",
      data: [
        { x: -1, y: 5 },
        { x: 0, y: 0 },
        { x: 1, y: -3 },
        { x: 2, y: -4 },
        { x: 3, y: -3 },
        { x: 4, y: 0 },
        { x: 5, y: 5 },
      ],
      title: "f(x) = x² - 4x",
      xLabel: "x",
      yLabel: "y",
    },
  },
  {
    id: "vmath006",
    question: "The table shows data from a science experiment. What is the rate of change of y with respect to x?",
    options: [
      { letter: "A", text: "1.5" },
      { letter: "B", text: "2.0" },
      { letter: "C", text: "2.5" },
      { letter: "D", text: "3.0" },
    ],
    correctAnswer: "C",
    explanation: "Rate of change = Δy/Δx = (10 - 5)/(4 - 2) = 5/2 = 2.5. This can be verified with other pairs: (15-10)/(6-4) = 5/2 = 2.5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Rate of change",
    visual: {
      type: "table",
      data: {
        headers: ["x", "y"],
        rows: [
          [0, 0],
          [2, 5],
          [4, 10],
          [6, 15],
          [8, 20],
        ],
      },
    },
  },
];

// Sample visual English questions (data interpretation passages)
export const visualEnglishQuestions: VisualQuestion[] = [
  {
    id: "veng001",
    question: "A researcher collected data on average daily temperatures over five months. Based on the graph, which of the following statements is best supported by the data?",
    options: [
      { letter: "A", text: "Temperatures increased steadily each month." },
      { letter: "B", text: "The highest temperature occurred in July." },
      { letter: "C", text: "April had the lowest recorded temperature." },
      { letter: "D", text: "Temperature changes were inconsistent between months." },
    ],
    correctAnswer: "B",
    explanation: "The bar chart clearly shows July having the tallest bar at 85°F, making it the month with the highest average temperature.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Data interpretation",
    visual: {
      type: "barChart",
      data: [
        { name: "Apr", value: 58 },
        { name: "May", value: 68 },
        { name: "Jun", value: 78 },
        { name: "Jul", value: 85 },
        { name: "Aug", value: 82 },
      ],
      title: "Average Daily Temperature (°F)",
      yLabel: "Temperature (°F)",
    },
  },
  {
    id: "veng002",
    question: "The table presents survey results about preferred communication methods across age groups. Which conclusion is best supported by the data?",
    options: [
      { letter: "A", text: "Email preference increases with age." },
      { letter: "B", text: "Text messaging is equally preferred across all ages." },
      { letter: "C", text: "Younger respondents strongly prefer text messaging." },
      { letter: "D", text: "Phone calls are the least popular method overall." },
    ],
    correctAnswer: "C",
    explanation: "The 18-25 age group shows 65% preference for text messaging, the highest percentage in that category and significantly higher than other age groups.",
    difficulty: "Hard",
    domain: "Reading",
    skill: "Quantitative evidence",
    visual: {
      type: "table",
      data: {
        headers: ["Age Group", "Text %", "Email %", "Phone %"],
        rows: [
          ["18-25", 65, 20, 15],
          ["26-40", 45, 35, 20],
          ["41-55", 25, 45, 30],
          ["56+", 15, 40, 45],
        ],
      },
    },
  },
];
