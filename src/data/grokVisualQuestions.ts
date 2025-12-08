import { rateDifficulty } from '@/utils/difficultyRating';
import type { Question } from './questions';

interface VisualQuestion extends Question {
  visual?: {
    type: string;
    data: Record<string, unknown>;
    title?: string;
    xLabel?: string;
    yLabel?: string;
  };
}

const levelToDifficulty = (level: number): string => {
  if (level <= 3) return 'Easy';
  if (level <= 6) return 'Medium';
  if (level <= 9) return 'Hard';
  return 'Expert';
};

// Remap Grok levels to our 1-13 scale (matching difficultyRating.ts remapping)
const remapLevel = (level: number): number => {
  const mapping: Record<number, number> = {
    1: 1, 2: 2, 3: 3, 4: 4,
    5: 7,   // Medium-high → Hard
    6: 9,   // Medium-hard → Very Hard
    7: 10,  // Hard → Very Hard
    8: 11,  // Hard+ → Titan
    9: 12,  // Very Hard → Savant
    10: 13  // Expert → Insane
  };
  return mapping[level] || level;
};

const addRating = (q: Omit<VisualQuestion, 'difficultyRating'> & { level: number }): VisualQuestion => {
  const { level, ...rest } = q;
  return {
    ...rest,
    difficultyRating: remapLevel(level)
  };
};

const rawQuestions: (Omit<VisualQuestion, 'difficultyRating'> & { level: number })[] = [
  // Level 5 Questions
  {
    level: 5,
    id: "grok-v5.1",
    question: "A function f is defined on integers x shown below. Which expression equals f(x)?",
    visual: {
      type: "table",
      data: {
        headers: ["x", "-2", "-1", "0", "1", "2"],
        rows: [["f(x)", "7", "5", "3", "1", "-1"]]
      }
    },
    options: [
      { letter: "A", text: "f(x) = -2x + 3" },
      { letter: "B", text: "f(x) = -x + 3" },
      { letter: "C", text: "f(x) = 2x + 3" },
      { letter: "D", text: "f(x) = -3x + 1" }
    ],
    correctAnswer: "A",
    explanation: "Slope −2 from the table and f(0)=3.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 5,
    id: "grok-v5.2",
    question: "The bar chart shows the number of books read by four students. What is the total number of books?",
    visual: {
      type: "barChart",
      data: {
        labels: ["Ana", "Ben", "Cara", "Dan"],
        values: [10, 12, 6, 8]
      },
      xLabel: "Student",
      yLabel: "Books"
    },
    options: [
      { letter: "A", text: "30" },
      { letter: "B", text: "34" },
      { letter: "C", text: "36" },
      { letter: "D", text: "38" }
    ],
    correctAnswer: "C",
    explanation: "10 + 12 + 6 + 8 = 36.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Data Analysis"
  },
  {
    level: 5,
    id: "grok-v5.3",
    question: "The graph of a line is shown with points. What is its slope?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 1, y: 1 }, { x: 3, y: 3 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "-1" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "C",
    explanation: "Slope = (3−1)/(3−1) = 1.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 5,
    id: "grok-v5.4",
    question: "The table shows x and y values. Which equation represents y in terms of x?",
    visual: {
      type: "table",
      data: {
        headers: ["x", "2", "5", "8"],
        rows: [["y", "6", "15", "24"]]
      }
    },
    options: [
      { letter: "A", text: "y = 2x" },
      { letter: "B", text: "y = 3x" },
      { letter: "C", text: "y = x + 4" },
      { letter: "D", text: "y = 3x + 2" }
    ],
    correctAnswer: "B",
    explanation: "y/x = 3 for every pair.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 5,
    id: "grok-v5.5",
    question: "The histogram shows counts per score bin. If there are 40 students total, in which bin is the median likely to fall?",
    visual: {
      type: "barChart",
      data: {
        labels: ["50–59", "60–69", "70–79", "80–89", "90–99"],
        values: [8, 10, 12, 7, 3]
      },
      xLabel: "Score Range",
      yLabel: "Frequency"
    },
    options: [
      { letter: "A", text: "50–59" },
      { letter: "B", text: "60–69" },
      { letter: "C", text: "70–79" },
      { letter: "D", text: "90–99" }
    ],
    correctAnswer: "C",
    explanation: "Cumulative counts place the 20th/21st near the peak at 70–79.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 5,
    id: "grok-v5.6",
    question: "The pie chart shows club members by grade. About how many are juniors if there are 200 members?",
    visual: {
      type: "barChart",
      data: {
        labels: ["Freshmen", "Sophomores", "Juniors", "Seniors"],
        values: [25, 25, 30, 20]
      },
      title: "Club Members by Grade (%)"
    },
    options: [
      { letter: "A", text: "40" },
      { letter: "B", text: "50" },
      { letter: "C", text: "60" },
      { letter: "D", text: "80" }
    ],
    correctAnswer: "C",
    explanation: "30% of 200 equals 60.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percentages"
  },
  {
    level: 5,
    id: "grok-v5.7",
    question: "The dot plot shows quiz scores. What is the mean score?",
    visual: {
      type: "table",
      data: {
        headers: ["Score", "5", "6", "7", "8", "9"],
        rows: [["Frequency", "1", "2", "3", "2", "1"]]
      }
    },
    options: [
      { letter: "A", text: "7.0" },
      { letter: "B", text: "7.2" },
      { letter: "C", text: "7.4" },
      { letter: "D", text: "7.6" }
    ],
    correctAnswer: "A",
    explanation: "Weighted mean: (5×1 + 6×2 + 7×3 + 8×2 + 9×1)/9 = 63/9 = 7.0.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 5,
    id: "grok-v5.8",
    question: "The table shows coordinates of A and B. What is the distance AB?",
    visual: {
      type: "table",
      data: {
        headers: ["Point", "A", "B"],
        rows: [["(x, y)", "(-1, 2)", "(3, 2)"]]
      }
    },
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3" },
      { letter: "C", text: "4" },
      { letter: "D", text: "5" }
    ],
    correctAnswer: "C",
    explanation: "Horizontal distance |3 − (−1)| = 4.",
    difficulty: "Medium",
    domain: "Geometry",
    skill: "Coordinate Geometry"
  },
  {
    level: 5,
    id: "grok-v5.9",
    question: "Identify the y-intercept of the line shown.",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 0, y: 1 }, { x: 4, y: 3 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "-1" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "C",
    explanation: "It crosses the y-axis at y = 1.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 5,
    id: "grok-v5.10",
    question: "The table shows apples and oranges sold. What is the ratio of apples to oranges?",
    visual: {
      type: "table",
      data: {
        headers: ["Fruit", "Apples", "Oranges"],
        rows: [["Count", "45", "60"]]
      }
    },
    options: [
      { letter: "A", text: "3:4" },
      { letter: "B", text: "4:3" },
      { letter: "C", text: "5:6" },
      { letter: "D", text: "3:5" }
    ],
    correctAnswer: "A",
    explanation: "45:60 simplifies to 3:4.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Ratios"
  },

  // Level 6 Questions
  {
    level: 6,
    id: "grok-v6.1",
    question: "Two lines are shown: y = x + 1 and y = −x + 5. At what x-value do they intersect?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 0, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 5 }, { x: 0, y: 5 }, { x: 2, y: 3 }, { x: 4, y: 1 }]
      },
      title: "y = x + 1 and y = −x + 5"
    },
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "2" },
      { letter: "C", text: "3" },
      { letter: "D", text: "4" }
    ],
    correctAnswer: "B",
    explanation: "Solve x + 1 = −x + 5 → 2x = 4 → x = 2.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 6,
    id: "grok-v6.2",
    question: "The table shows values of g(x). Which expression matches g(x)?",
    visual: {
      type: "table",
      data: {
        headers: ["x", "-2", "-1", "0", "1", "2"],
        rows: [["g(x)", "8", "3", "0", "3", "8"]]
      }
    },
    options: [
      { letter: "A", text: "g(x) = x² - 1" },
      { letter: "B", text: "g(x) = x² + |x|" },
      { letter: "C", text: "g(x) = x² - 2x" },
      { letter: "D", text: "g(x) = x² + 2|x|" }
    ],
    correctAnswer: "D",
    explanation: "Symmetric and g(0)=0; values equal x² + 2|x|.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Quadratic Functions"
  },
  {
    level: 6,
    id: "grok-v6.3",
    question: "Sales in January and February are shown. What is the percent increase from January to February?",
    visual: {
      type: "barChart",
      data: {
        labels: ["January", "February"],
        values: [20, 30]
      },
      yLabel: "Sales ($1000s)"
    },
    options: [
      { letter: "A", text: "25%" },
      { letter: "B", text: "33%" },
      { letter: "C", text: "50%" },
      { letter: "D", text: "66%" }
    ],
    correctAnswer: "C",
    explanation: "Increase of 10 on a base of 20 → 10/20 = 50%.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Percent Change"
  },
  {
    level: 6,
    id: "grok-v6.4",
    question: "Find the slope of the line through A(2,1) and B(6,3).",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 2, y: 1 }, { x: 6, y: 3 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "1/2" },
      { letter: "B", text: "1" },
      { letter: "C", text: "3/2" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "A",
    explanation: "Slope = (3−1)/(6−2) = 2/4 = 1/2.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 6,
    id: "grok-v6.5",
    question: "A car's distance is recorded. What is the average speed from 1 to 3 hours?",
    visual: {
      type: "table",
      data: {
        headers: ["Time (h)", "0", "1", "3"],
        rows: [["Distance (mi)", "0", "50", "150"]]
      }
    },
    options: [
      { letter: "A", text: "50 mph" },
      { letter: "B", text: "75 mph" },
      { letter: "C", text: "100 mph" },
      { letter: "D", text: "150 mph" }
    ],
    correctAnswer: "A",
    explanation: "(150−50)/(3−1) = 100/2 = 50 mph.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Rates"
  },
  {
    level: 6,
    id: "grok-v6.6",
    question: "The scatterplot shows study hours vs. score. Which best describes the relationship?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 1, y: 70 }, { x: 2, y: 74 }, { x: 3, y: 78 }, { x: 4, y: 83 }, { x: 5, y: 87 }, { x: 6, y: 90 }]
      },
      xLabel: "Study Hours",
      yLabel: "Score"
    },
    options: [
      { letter: "A", text: "Strong negative linear" },
      { letter: "B", text: "Strong positive linear" },
      { letter: "C", text: "No relationship" },
      { letter: "D", text: "Quadratic" }
    ],
    correctAnswer: "B",
    explanation: "Scores increase with hours in a roughly linear trend.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Data Analysis"
  },
  {
    level: 6,
    id: "grok-v6.7",
    question: "The graph shows h(x) that rises with slope 1 to x=0, then is constant at y=2. Which piecewise function matches?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: -2, y: 0 }, { x: 0, y: 2 }, { x: 4, y: 2 }]
      },
      title: "Piecewise function h(x)"
    },
    options: [
      { letter: "A", text: "h(x) = x for x ≤ 0; h(x) = 1 for x > 0" },
      { letter: "B", text: "h(x) = x + 1 for x ≤ 0; h(x) = 1 for x > 0" },
      { letter: "C", text: "h(x) = x + 2 for x ≤ 0; h(x) = 2 for x > 0" },
      { letter: "D", text: "h(x) = x − 1 for x ≤ 0; h(x) = 2 for x > 0" }
    ],
    correctAnswer: "C",
    explanation: "Matches the slope-1 segment ending at (0,2) and constant y=2 after.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Piecewise Functions"
  },
  {
    level: 6,
    id: "grok-v6.8",
    question: "Data shows x and y. Which linear model best fits?",
    visual: {
      type: "table",
      data: {
        headers: ["x", "1", "2", "3", "4"],
        rows: [["y", "2", "4", "6", "8"]]
      }
    },
    options: [
      { letter: "A", text: "y = 2x" },
      { letter: "B", text: "y = x + 1" },
      { letter: "C", text: "y = x²" },
      { letter: "D", text: "y = 3x" }
    ],
    correctAnswer: "A",
    explanation: "y doubles x; slope 2 through origin.",
    difficulty: "Medium",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 6,
    id: "grok-v6.9",
    question: "A box plot shows Q1 = 20, median = 30, Q3 = 45. What is the interquartile range (IQR)?",
    visual: {
      type: "table",
      data: {
        headers: ["Statistic", "Min", "Q1", "Median", "Q3", "Max"],
        rows: [["Value", "10", "20", "30", "45", "55"]]
      },
      title: "Box Plot Summary"
    },
    options: [
      { letter: "A", text: "10" },
      { letter: "B", text: "15" },
      { letter: "C", text: "20" },
      { letter: "D", text: "25" }
    ],
    correctAnswer: "D",
    explanation: "IQR = Q3 − Q1 = 45 − 20 = 25.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 6,
    id: "grok-v6.10",
    question: "Which histogram bin is most frequent?",
    visual: {
      type: "barChart",
      data: {
        labels: ["0–10", "10–20", "20–30", "30–40"],
        values: [8, 10, 18, 12]
      },
      xLabel: "Range",
      yLabel: "Frequency"
    },
    options: [
      { letter: "A", text: "0–10" },
      { letter: "B", text: "10–20" },
      { letter: "C", text: "20–30" },
      { letter: "D", text: "30–40" }
    ],
    correctAnswer: "C",
    explanation: "Tallest bar is 20–30.",
    difficulty: "Medium",
    domain: "Problem Solving",
    skill: "Data Analysis"
  },

  // Level 7 Questions
  {
    level: 7,
    id: "grok-v7.1",
    question: "Lines y = 2x − 1 and y = −x + 5 intersect. What is the y-coordinate of their intersection?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 0, y: -1 }, { x: 2, y: 3 }, { x: 0, y: 5 }, { x: 2, y: 3 }]
      },
      title: "y = 2x − 1 and y = −x + 5"
    },
    options: [
      { letter: "A", text: "3" },
      { letter: "B", text: "4" },
      { letter: "C", text: "5" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "Set 2x−1 = −x+5 → 3x=6 → x=2; y=2(2)−1=3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 7,
    id: "grok-v7.2",
    question: "Values of q(x) are shown. Which function matches q(x)?",
    visual: {
      type: "table",
      data: {
        headers: ["x", "-1", "0", "1", "2", "3"],
        rows: [["q(x)", "6", "3", "2", "3", "6"]]
      }
    },
    options: [
      { letter: "A", text: "q(x) = (x − 1)² + 2" },
      { letter: "B", text: "q(x) = (x − 1)² + 1" },
      { letter: "C", text: "q(x) = x² + 2" },
      { letter: "D", text: "q(x) = (x + 1)² + 2" }
    ],
    correctAnswer: "A",
    explanation: "Vertex at (1,2) → (x−1)²+2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions"
  },
  {
    level: 7,
    id: "grok-v7.3",
    question: "The piecewise graph has a constant segment y=2 from x=0 to x=3. What is f(2)?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: -2, y: 0 }, { x: 0, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 4 }]
      },
      title: "Piecewise function"
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "C",
    explanation: "From the constant segment, f(2)=2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Piecewise Functions"
  },
  {
    level: 7,
    id: "grok-v7.4",
    question: "A quantity doubles each hour starting at 5. Which model fits?",
    visual: {
      type: "table",
      data: {
        headers: ["Hour", "0", "1", "2", "3"],
        rows: [["Amount", "5", "10", "20", "40"]]
      }
    },
    options: [
      { letter: "A", text: "y = 5(2^t)" },
      { letter: "B", text: "y = 5t" },
      { letter: "C", text: "y = 2t" },
      { letter: "D", text: "y = 5(3^t)" }
    ],
    correctAnswer: "A",
    explanation: "Doubling growth: y = 5·2^t.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Functions"
  },
  {
    level: 7,
    id: "grok-v7.5",
    question: "Use the trend line to estimate y when x = 6.",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 2, y: 8 }, { x: 3, y: 10 }, { x: 4, y: 12 }, { x: 5, y: 14 }]
      },
      xLabel: "x",
      yLabel: "y",
      title: "Trend line: y ≈ 2x + 4"
    },
    options: [
      { letter: "A", text: "8" },
      { letter: "B", text: "10" },
      { letter: "C", text: "12" },
      { letter: "D", text: "16" }
    ],
    correctAnswer: "D",
    explanation: "y ≈ 2(6) + 4 = 16.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Data Analysis"
  },
  {
    level: 7,
    id: "grok-v7.6",
    question: "Class A and B histograms are shown; B is shifted right. Which class likely has the higher mean?",
    visual: {
      type: "table",
      data: {
        headers: ["Range", "60–69", "70–79", "80–89", "90–99"],
        rows: [["Class A", "10", "14", "6", "2"], ["Class B", "4", "10", "16", "6"]]
      },
      title: "Score Distribution Comparison"
    },
    options: [
      { letter: "A", text: "Class A" },
      { letter: "B", text: "Class B" },
      { letter: "C", text: "Same" },
      { letter: "D", text: "Cannot determine" }
    ],
    correctAnswer: "B",
    explanation: "Rightward shift indicates higher mean for B.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 7,
    id: "grok-v7.7",
    question: "Given f(x) = 2x and g(x) = x + 3, find (f∘g)(2).",
    visual: {
      type: "table",
      data: {
        headers: ["x", "g(x)", "f(g(x))"],
        rows: [["2", "5", "10"]]
      }
    },
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "7" },
      { letter: "C", text: "10" },
      { letter: "D", text: "13" }
    ],
    correctAnswer: "C",
    explanation: "g(2)=5; f(5)=10.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Function Composition"
  },
  {
    level: 7,
    id: "grok-v7.8",
    question: "A line passes through (0,2) and (3,8). What is the slope of any line parallel to it?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 0, y: 2 }, { x: 3, y: 8 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "3/2" },
      { letter: "C", text: "4/3" },
      { letter: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "Slope = (8−2)/(3−0) = 6/3 = 2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 7,
    id: "grok-v7.9",
    question: "A box plot shows whiskers from 10 to 50 with a point at 70 beyond the whisker. Which statement is true?",
    visual: {
      type: "table",
      data: {
        headers: ["Statistic", "Min", "Q1", "Median", "Q3", "Max", "Outlier"],
        rows: [["Value", "10", "20", "30", "45", "50", "70"]]
      },
      title: "Box Plot with Outlier"
    },
    options: [
      { letter: "A", text: "70 is within Q3" },
      { letter: "B", text: "70 is an outlier" },
      { letter: "C", text: "70 is the median" },
      { letter: "D", text: "70 is Q1" }
    ],
    correctAnswer: "B",
    explanation: "A marked point beyond the whisker indicates an outlier.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 7,
    id: "grok-v7.10",
    question: "Solve 3x + 4 = 22.",
    visual: {
      type: "table",
      data: {
        headers: ["Step", "Expression"],
        rows: [["Subtract 4", "3x = 18"], ["Divide by 3", "x = 6"]]
      }
    },
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "6" },
      { letter: "C", text: "7" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "B",
    explanation: "x = 6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Equations"
  },

  // Level 8 Questions
  {
    level: 8,
    id: "grok-v8.1",
    question: "A line with slope −3 passes through (2, 5). Which equation is correct?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 2, y: 5 }]
      },
      title: "Line with slope −3"
    },
    options: [
      { letter: "A", text: "y = -3x + 11" },
      { letter: "B", text: "y = -3x + 1" },
      { letter: "C", text: "y = -3x - 1" },
      { letter: "D", text: "y = 3x - 11" }
    ],
    correctAnswer: "A",
    explanation: "y = −3x + b; 5 = −3(2) + b → b = 11.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 8,
    id: "grok-v8.2",
    question: "Given the table of values, determine whether f(x) is linear or quadratic.",
    visual: {
      type: "table",
      data: {
        headers: ["x", "0", "1", "2", "3", "4"],
        rows: [["f(x)", "1", "4", "9", "16", "25"]]
      }
    },
    options: [
      { letter: "A", text: "Linear" },
      { letter: "B", text: "Quadratic" },
      { letter: "C", text: "Exponential" },
      { letter: "D", text: "Constant" }
    ],
    correctAnswer: "B",
    explanation: "Perfect squares → f(x) = (x+1)²; second differences constant.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Function Types"
  },
  {
    level: 8,
    id: "grok-v8.3",
    question: "A system is shown on the graph: y = 2x + 1 and y = x² − 3. How many solutions?",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Type"],
        rows: [["y = 2x + 1", "Line"], ["y = x² − 3", "Parabola (vertex at (0,-3))"]]
      },
      title: "Line and Parabola System"
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "C",
    explanation: "Upward parabola with vertex below line; typical intersection at two points.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 8,
    id: "grok-v8.4",
    question: "Box plot summaries: Q1=22, median=30, Q3=37. What percent of data is between 22 and 37?",
    visual: {
      type: "table",
      data: {
        headers: ["Statistic", "Q1", "Median", "Q3"],
        rows: [["Value", "22", "30", "37"]]
      }
    },
    options: [
      { letter: "A", text: "25%" },
      { letter: "B", text: "50%" },
      { letter: "C", text: "75%" },
      { letter: "D", text: "100%" }
    ],
    correctAnswer: "B",
    explanation: "Between Q1 and Q3 is the middle 50%.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 8,
    id: "grok-v8.5",
    question: "An exponential model fits the data. What is the base?",
    visual: {
      type: "table",
      data: {
        headers: ["t", "0", "1", "2", "3"],
        rows: [["y", "6", "9", "13.5", "20.25"]]
      }
    },
    options: [
      { letter: "A", text: "1.25" },
      { letter: "B", text: "1.5" },
      { letter: "C", text: "1.75" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "B",
    explanation: "Successive ratio 9/6=1.5, 13.5/9=1.5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Functions"
  },
  {
    level: 8,
    id: "grok-v8.6",
    question: "Line l has slope 1/3 and passes through (−6, 4). What is its y-intercept?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: -6, y: 4 }]
      },
      title: "Line with slope 1/3"
    },
    options: [
      { letter: "A", text: "2" },
      { letter: "B", text: "4" },
      { letter: "C", text: "6" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "C",
    explanation: "y = (1/3)x + b; 4 = (1/3)(−6) + b → b = 6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 8,
    id: "grok-v8.7",
    question: "The histogram shows time (minutes) spent studying per day for a class of 40 students. Estimate the mean.",
    visual: {
      type: "barChart",
      data: {
        labels: ["0–20", "20–40", "40–60", "60–80"],
        values: [5, 12, 15, 8]
      },
      xLabel: "Minutes",
      yLabel: "Students"
    },
    options: [
      { letter: "A", text: "35" },
      { letter: "B", text: "45" },
      { letter: "C", text: "50" },
      { letter: "D", text: "55" }
    ],
    correctAnswer: "B",
    explanation: "Weighted midpoints: (10×5 + 30×12 + 50×15 + 70×8)/40 ≈ 45.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 8,
    id: "grok-v8.8",
    question: "A scatterplot of (x,y) shows a weak positive linear trend with noticeable outliers. Which statistic is most affected by outliers?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 12, y: 50 }, { x: 4, y: 5 }, { x: 5, y: 6 }]
      },
      title: "Data with outlier"
    },
    options: [
      { letter: "A", text: "Median" },
      { letter: "B", text: "Mean" },
      { letter: "C", text: "IQR" },
      { letter: "D", text: "Mode" }
    ],
    correctAnswer: "B",
    explanation: "The mean is sensitive to extreme values.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 8,
    id: "grok-v8.9",
    question: "Given the graph of y = |x − 2| + 1, what is the minimum value of y?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 0, y: 3 }, { x: 2, y: 1 }, { x: 4, y: 3 }]
      },
      title: "y = |x − 2| + 1"
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "B",
    explanation: "Vertex at (2,1) is the minimum y.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Absolute Value Functions"
  },
  {
    level: 8,
    id: "grok-v8.10",
    question: "Line m is perpendicular to y = −2x + 3 and passes through (1, 1). What is the equation of line m?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 1, y: 1 }]
      },
      title: "Perpendicular to y = −2x + 3"
    },
    options: [
      { letter: "A", text: "y = (1/2)x + 1/2" },
      { letter: "B", text: "y = (1/2)x + 1" },
      { letter: "C", text: "y = 2x - 1" },
      { letter: "D", text: "y = 2x + 1" }
    ],
    correctAnswer: "A",
    explanation: "Perpendicular slope is 1/2. Plug in (1,1): 1 = (1/2)(1) + b → b = 1/2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 8,
    id: "grok-v8.11",
    question: "Solve for x: 2x + 5 = 19.",
    visual: {
      type: "table",
      data: {
        headers: ["Step", "Expression"],
        rows: [["Equation", "2x + 5 = 19"]]
      }
    },
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "6" },
      { letter: "C", text: "7" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "C",
    explanation: "Subtract 5 → 2x=14 → x=7.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Equations"
  },
  {
    level: 8,
    id: "grok-v8.12",
    question: "The parabola y = x² − 4x + 3 is shown. What are its roots?",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Form"],
        rows: [["y = x² − 4x + 3", "Standard form"]]
      }
    },
    options: [
      { letter: "A", text: "x = 1, 3" },
      { letter: "B", text: "x = −1, −3" },
      { letter: "C", text: "x = 0, 4" },
      { letter: "D", text: "x = 2, 2" }
    ],
    correctAnswer: "A",
    explanation: "Factor: (x−1)(x−3). Roots at 1 and 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions"
  },
  {
    level: 8,
    id: "grok-v8.13",
    question: "A scatterplot shows points (1,2),(2,4),(3,6),(4,8). What is the correlation?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "0.5" },
      { letter: "C", text: "0.9" },
      { letter: "D", text: "1" }
    ],
    correctAnswer: "D",
    explanation: "Perfect linear relationship → correlation = 1.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 8,
    id: "grok-v8.14",
    question: "Box plot shows Q1=10, median=15, Q3=20. What is the IQR?",
    visual: {
      type: "table",
      data: {
        headers: ["Statistic", "Q1", "Median", "Q3"],
        rows: [["Value", "10", "15", "20"]]
      },
      title: "Box Plot Summary"
    },
    options: [
      { letter: "A", text: "5" },
      { letter: "B", text: "10" },
      { letter: "C", text: "15" },
      { letter: "D", text: "20" }
    ],
    correctAnswer: "B",
    explanation: "IQR = Q3 − Q1 = 20 − 10 = 10.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 8,
    id: "grok-v8.15",
    question: "Solve inequality: 3x − 7 > 5.",
    visual: {
      type: "table",
      data: {
        headers: ["Step", "Expression"],
        rows: [["Inequality", "3x − 7 > 5"]]
      }
    },
    options: [
      { letter: "A", text: "x > 2" },
      { letter: "B", text: "x > 3" },
      { letter: "C", text: "x > 4" },
      { letter: "D", text: "x > 5" }
    ],
    correctAnswer: "C",
    explanation: "Add 7 → 3x > 12 → x > 4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Inequalities"
  },
  {
    level: 8,
    id: "grok-v8.16",
    question: "Line graph shows y = −x + 2. What is the y-intercept?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 0, y: 2 }, { x: 2, y: 0 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "−2" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1" },
      { letter: "D", text: "2" }
    ],
    correctAnswer: "D",
    explanation: "Intercept at y = 2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions"
  },
  {
    level: 8,
    id: "grok-v8.17",
    question: "Histogram shows bins [0–10, 10–20, 20–30] with frequencies [5, 8, 7]. What is the mode bin?",
    visual: {
      type: "barChart",
      data: {
        labels: ["0–10", "10–20", "20–30"],
        values: [5, 8, 7]
      },
      xLabel: "Range",
      yLabel: "Frequency"
    },
    options: [
      { letter: "A", text: "0–10" },
      { letter: "B", text: "10–20" },
      { letter: "C", text: "20–30" },
      { letter: "D", text: "None" }
    ],
    correctAnswer: "B",
    explanation: "Highest frequency = 8 at 10–20.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 8,
    id: "grok-v8.18",
    question: "Solve system: y = x + 1 and y = 2x − 3.",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 0, y: 1 }, { x: 4, y: 5 }, { x: 0, y: -3 }, { x: 4, y: 5 }]
      },
      title: "y = x + 1 and y = 2x − 3"
    },
    options: [
      { letter: "A", text: "(2, 3)" },
      { letter: "B", text: "(4, 5)" },
      { letter: "C", text: "(−1, 0)" },
      { letter: "D", text: "(3, 4)" }
    ],
    correctAnswer: "B",
    explanation: "Set x + 1 = 2x − 3 → x = 4 → y = 5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 8,
    id: "grok-v8.19",
    question: "Pie chart shows distribution: A=25%, B=35%, C=40%. If 200 students, how many in C?",
    visual: {
      type: "barChart",
      data: {
        labels: ["A", "B", "C"],
        values: [25, 35, 40]
      },
      title: "Distribution (%)"
    },
    options: [
      { letter: "A", text: "50" },
      { letter: "B", text: "70" },
      { letter: "C", text: "80" },
      { letter: "D", text: "90" }
    ],
    correctAnswer: "C",
    explanation: "40% of 200 = 80.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Percentages"
  },
  {
    level: 8,
    id: "grok-v8.20",
    question: "Solve quadratic: x² − 5x + 6 = 0.",
    visual: {
      type: "table",
      data: {
        headers: ["Equation", "Form"],
        rows: [["x² − 5x + 6 = 0", "Standard"]]
      }
    },
    options: [
      { letter: "A", text: "x = 2, 3" },
      { letter: "B", text: "x = −2, −3" },
      { letter: "C", text: "x = 1, 6" },
      { letter: "D", text: "x = 0, 5" }
    ],
    correctAnswer: "A",
    explanation: "Factor (x−2)(x−3). Roots 2 and 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Equations"
  },

  // Level 9 Questions
  {
    level: 9,
    id: "grok-v9.1",
    question: "Solve for x where the line y = 4x − 7 intersects the parabola y = x² − x − 1.",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Type"],
        rows: [["y = 4x − 7", "Line"], ["y = x² − x − 1", "Parabola"]]
      }
    },
    options: [
      { letter: "A", text: "x = 1" },
      { letter: "B", text: "x = 2" },
      { letter: "C", text: "x = 3" },
      { letter: "D", text: "x = 4" }
    ],
    correctAnswer: "B",
    explanation: "Set 4x−7 = x²−x−1 → x²−5x+6=0 → (x−2)(x−3)=0 → x=2 or 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 9,
    id: "grok-v9.2",
    question: "A quadratic passes through points shown. Which is the vertex y-value?",
    visual: {
      type: "table",
      data: {
        headers: ["x", "-1", "0", "1", "2", "3"],
        rows: [["y", "10", "5", "4", "5", "10"]]
      }
    },
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "A",
    explanation: "Symmetry around x=1; minimum at y=4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions"
  },
  {
    level: 9,
    id: "grok-v9.3",
    question: "An exponential decay model fits data y = A(0.8)^t. If A = 50, what is y at t = 5?",
    visual: {
      type: "table",
      data: {
        headers: ["t", "0", "1", "2", "3", "4", "5"],
        rows: [["y", "50", "40", "32", "25.6", "20.48", "?"]]
      }
    },
    options: [
      { letter: "A", text: "16.384" },
      { letter: "B", text: "18" },
      { letter: "C", text: "20.48" },
      { letter: "D", text: "25.6" }
    ],
    correctAnswer: "A",
    explanation: "50×(0.8)⁵ = 50×0.32768 = 16.384.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Functions"
  },
  {
    level: 9,
    id: "grok-v9.4",
    question: "A system y = 3x − 4 and y = (x − 2)² − 1 intersects how many times?",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Type", "Key Feature"],
        rows: [["y = 3x − 4", "Line", "slope = 3"], ["y = (x − 2)² − 1", "Parabola", "vertex (2, −1)"]]
      }
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "Depends" }
    ],
    correctAnswer: "C",
    explanation: "Upward parabola and line typically intersect in two points here.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 9,
    id: "grok-v9.5",
    question: "Box plot: min=12, Q1=25, median=31, Q3=43, max=60. Approximately what percent of data is ≤ 43?",
    visual: {
      type: "table",
      data: {
        headers: ["Statistic", "Min", "Q1", "Median", "Q3", "Max"],
        rows: [["Value", "12", "25", "31", "43", "60"]]
      }
    },
    options: [
      { letter: "A", text: "25%" },
      { letter: "B", text: "50%" },
      { letter: "C", text: "75%" },
      { letter: "D", text: "100%" }
    ],
    correctAnswer: "C",
    explanation: "Up to Q3 includes 75%.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 9,
    id: "grok-v9.6",
    question: "A linear regression for points yields y ≈ 1.5x + 2. Estimate y at x = 10.",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 2, y: 5 }, { x: 4, y: 8 }, { x: 6, y: 11 }, { x: 8, y: 14 }]
      },
      title: "Trend line: y ≈ 1.5x + 2"
    },
    options: [
      { letter: "A", text: "15" },
      { letter: "B", text: "16" },
      { letter: "C", text: "17" },
      { letter: "D", text: "18" }
    ],
    correctAnswer: "C",
    explanation: "1.5×10 + 2 = 17.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Data Analysis"
  },
  {
    level: 9,
    id: "grok-v9.7",
    question: "Given the graph of y = (x − 3)² − 5, what is the axis of symmetry?",
    visual: {
      type: "lineGraph",
      data: {
        points: [{ x: 1, y: -1 }, { x: 3, y: -5 }, { x: 5, y: -1 }]
      },
      title: "y = (x − 3)² − 5"
    },
    options: [
      { letter: "A", text: "x = -3" },
      { letter: "B", text: "x = 0" },
      { letter: "C", text: "x = 3" },
      { letter: "D", text: "y = -5" }
    ],
    correctAnswer: "C",
    explanation: "Axis is x = h with vertex (h,k); here h=3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Quadratic Functions"
  },
  {
    level: 9,
    id: "grok-v9.8",
    question: "A histogram of test scores is right-skewed. Which measure of center is more appropriate to report?",
    visual: {
      type: "barChart",
      data: {
        labels: ["50–59", "60–69", "70–79", "80–89", "90–99"],
        values: [2, 6, 14, 10, 8]
      },
      title: "Right-skewed distribution"
    },
    options: [
      { letter: "A", text: "Mean" },
      { letter: "B", text: "Median" },
      { letter: "C", text: "Mode" },
      { letter: "D", text: "Range" }
    ],
    correctAnswer: "B",
    explanation: "Median is robust to skew.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 9,
    id: "grok-v9.9",
    question: "Solve for x: 2^(x+1) = 32.",
    visual: {
      type: "table",
      data: {
        headers: ["Power of 2", "2¹", "2²", "2³", "2⁴", "2⁵"],
        rows: [["Value", "2", "4", "8", "16", "32"]]
      }
    },
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "7" }
    ],
    correctAnswer: "A",
    explanation: "32 = 2⁵ → x+1=5 → x=4.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Equations"
  },
  {
    level: 9,
    id: "grok-v9.10",
    question: "The line through points (−4, 3) and (2, −3) is shown. What is its slope?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: -4, y: 3 }, { x: 2, y: -3 }]
      },
      xLabel: "x",
      yLabel: "y"
    },
    options: [
      { letter: "A", text: "-1" },
      { letter: "B", text: "-3/2" },
      { letter: "C", text: "-4/3" },
      { letter: "D", text: "-2" }
    ],
    correctAnswer: "A",
    explanation: "Slope = (−3−3)/(2−(−4)) = −6/6 = −1.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Linear Functions"
  },

  // Level 10 Questions
  {
    level: 10,
    id: "grok-v10.1",
    question: "Solve the system: y = x² − 4x + 6 and y = 2x − 3. How many real solutions?",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Type"],
        rows: [["y = x² − 4x + 6", "Parabola"], ["y = 2x − 3", "Line"]]
      }
    },
    options: [
      { letter: "A", text: "No real solutions" },
      { letter: "B", text: "One solution" },
      { letter: "C", text: "Two solutions" },
      { letter: "D", text: "Three solutions" }
    ],
    correctAnswer: "B",
    explanation: "Set x² − 4x + 6 = 2x − 3 → x² − 6x + 9 = 0 → (x−3)²=0 → one solution at x=3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 10,
    id: "grok-v10.2",
    question: "Given f(x) = |2x − 5| and g(x) = x − 1, solve f(g(x)) = 4.",
    visual: {
      type: "table",
      data: {
        headers: ["Step", "Expression"],
        rows: [["Substitute", "|2(x−1) − 5| = 4"], ["Simplify", "|2x − 7| = 4"]]
      }
    },
    options: [
      { letter: "A", text: "x = 1.5 or x = 5.5" },
      { letter: "B", text: "x = 3 or x = −1" },
      { letter: "C", text: "x = 4 or x = −2" },
      { letter: "D", text: "x = 6 or x = −4" }
    ],
    correctAnswer: "A",
    explanation: "|2x − 7| = 4 → 2x − 7 = ±4 → 2x = 11 or 3 → x = 5.5 or 1.5.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Absolute Value Equations"
  },
  {
    level: 10,
    id: "grok-v10.3",
    question: "The function y = a(1.2)^x + b fits points (0, 7) and (3, 10.456). Find a.",
    visual: {
      type: "table",
      data: {
        headers: ["x", "0", "3"],
        rows: [["y", "7", "10.456"]]
      }
    },
    options: [
      { letter: "A", text: "a = 2" },
      { letter: "B", text: "a = 3" },
      { letter: "C", text: "a = 4" },
      { letter: "D", text: "a = 5" }
    ],
    correctAnswer: "C",
    explanation: "7 = a + b; 10.456 = a(1.728) + b. Solving: a ≈ 4, b ≈ 3.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Functions"
  },
  {
    level: 10,
    id: "grok-v10.4",
    question: "A rational function r(x) = (x² − 9)/(x − 3) has a hole. What is the y-value of the hole?",
    visual: {
      type: "table",
      data: {
        headers: ["Expression", "Simplified"],
        rows: [["(x² − 9)/(x − 3)", "(x+3)(x−3)/(x−3) = x + 3"]]
      }
    },
    options: [
      { letter: "A", text: "y = 3" },
      { letter: "B", text: "y = 6" },
      { letter: "C", text: "y = 0" },
      { letter: "D", text: "No hole" }
    ],
    correctAnswer: "B",
    explanation: "Simplifies to y = x + 3 with a hole at x=3 → y=6.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Rational Functions"
  },
  {
    level: 10,
    id: "grok-v10.5",
    question: "A geometric sequence has terms shown. What is the common ratio r?",
    visual: {
      type: "table",
      data: {
        headers: ["n", "1", "2", "3", "4"],
        rows: [["aₙ", "3", "6", "12", "24"]]
      }
    },
    options: [
      { letter: "A", text: "r = 2" },
      { letter: "B", text: "r = 3" },
      { letter: "C", text: "r = 4" },
      { letter: "D", text: "r = 6" }
    ],
    correctAnswer: "A",
    explanation: "Each term doubles → r = 2.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Sequences"
  },
  {
    level: 10,
    id: "grok-v10.6",
    question: "Given the scatterplot, correlation is approximately 0.9. What does this imply?",
    visual: {
      type: "scatterPlot",
      data: {
        points: [{ x: 1, y: 2 }, { x: 2, y: 3.8 }, { x: 3, y: 6 }, { x: 4, y: 8 }, { x: 5, y: 9.7 }, { x: 6, y: 12 }]
      },
      title: "r ≈ 0.9"
    },
    options: [
      { letter: "A", text: "Strong negative linear" },
      { letter: "B", text: "Moderate positive linear" },
      { letter: "C", text: "Strong positive linear" },
      { letter: "D", text: "No linear relationship" }
    ],
    correctAnswer: "C",
    explanation: "Correlation near 1 indicates strong positive linear association.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 10,
    id: "grok-v10.7",
    question: "For y = (x − 4)² − 9 and y = 3x − 5, find the number of intersections.",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Key Feature"],
        rows: [["y = (x − 4)² − 9", "Vertex (4, −9)"], ["y = 3x − 5", "Slope = 3"]]
      }
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "3" }
    ],
    correctAnswer: "C",
    explanation: "Upward parabola; line crosses twice for typical positions here.",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Systems of Equations"
  },
  {
    level: 10,
    id: "grok-v10.8",
    question: "A histogram has two distinct peaks (bimodal). Which description best fits the distribution?",
    visual: {
      type: "barChart",
      data: {
        labels: ["0–10", "10–20", "20–30", "30–40", "40–50"],
        values: [2, 12, 4, 10, 3]
      },
      title: "Bimodal distribution"
    },
    options: [
      { letter: "A", text: "Unimodal and symmetric" },
      { letter: "B", text: "Bimodal" },
      { letter: "C", text: "Uniform" },
      { letter: "D", text: "Left-skewed" }
    ],
    correctAnswer: "B",
    explanation: "Two peaks indicate bimodality.",
    difficulty: "Hard",
    domain: "Problem Solving",
    skill: "Statistics"
  },
  {
    level: 10,
    id: "grok-v10.9",
    question: "Solve for x: log₂(x) + log₂(x−2) = 3, x > 2.",
    visual: {
      type: "table",
      data: {
        headers: ["Step", "Expression"],
        rows: [["Combine logs", "log₂(x(x−2)) = 3"], ["Exponentiate", "x(x−2) = 8"]]
      }
    },
    options: [
      { letter: "A", text: "4" },
      { letter: "B", text: "5" },
      { letter: "C", text: "6" },
      { letter: "D", text: "8" }
    ],
    correctAnswer: "A",
    explanation: "x² − 2x − 8 = 0 → (x−4)(x+2) = 0 → x = 4 (since x > 2).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Logarithmic Equations"
  },
  {
    level: 10,
    id: "grok-v10.10",
    question: "Given the graph of y = 2^x and the line y = x + 1, how many intersections do they have?",
    visual: {
      type: "table",
      data: {
        headers: ["Function", "Type"],
        rows: [["y = 2^x", "Exponential"], ["y = x + 1", "Line"]]
      }
    },
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "2" },
      { letter: "D", text: "Infinitely many" }
    ],
    correctAnswer: "C",
    explanation: "2^x and x + 1 intersect at x = 0 (both equal 1) and x = 1 (both equal 2).",
    difficulty: "Hard",
    domain: "Algebra",
    skill: "Exponential Functions"
  }
];

export const grokVisualQuestions: VisualQuestion[] = rawQuestions.map(addRating);
