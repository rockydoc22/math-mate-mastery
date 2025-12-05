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
