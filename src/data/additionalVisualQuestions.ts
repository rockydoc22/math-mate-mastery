// Additional visual questions with charts, tables, scatter plots to reach ~1/3 visual questions
// SAT typically has about 1/3 of questions with associated visuals

import type { Question } from './questions';

interface VisualQuestion extends Question {
  visual?: {
    type: "lineGraph" | "table" | "barChart" | "scatterPlot";
    data: any;
    title?: string;
    xLabel?: string;
    yLabel?: string;
  };
}

// Generate scatter plot correlation questions
const generateScatterPlotQuestions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];
  
  const correlationContexts = [
    { x: "Hours studied", y: "Test score", positive: true },
    { x: "Age (years)", y: "Height (cm)", positive: true },
    { x: "Price ($)", y: "Quantity demanded", positive: false },
    { x: "Exercise (hours/week)", y: "Resting heart rate", positive: false },
    { x: "Temperature (°F)", y: "Ice cream sales ($)", positive: true },
    { x: "Study time (hours)", y: "Exam percentage", positive: true },
    { x: "Distance (miles)", y: "Travel cost ($)", positive: true },
    { x: "Speed (mph)", y: "Fuel efficiency (mpg)", positive: false },
    { x: "Advertising spend ($)", y: "Sales ($)", positive: true },
    { x: "Years of experience", y: "Salary ($1000s)", positive: true },
  ];

  correlationContexts.forEach((ctx, i) => {
    // Generate realistic data points
    const basePoints = [];
    for (let j = 0; j < 10; j++) {
      const x = (j + 1) * 5 + Math.random() * 3 - 1.5;
      const y = ctx.positive 
        ? (j + 1) * 4 + 10 + Math.random() * 8 - 4
        : 60 - (j + 1) * 3 + Math.random() * 8 - 4;
      basePoints.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    }

    // Correlation type question
    questions.push({
      id: `vis-scatter-corr-${i + 1}`,
      question: `The scatter plot shows the relationship between ${ctx.x.toLowerCase()} and ${ctx.y.toLowerCase()}. Which best describes this relationship?`,
      visual: {
        type: "scatterPlot",
        data: { points: basePoints },
        xLabel: ctx.x,
        yLabel: ctx.y,
        title: `${ctx.y} vs ${ctx.x}`
      },
      options: [
        { letter: "A", text: "Strong positive correlation" },
        { letter: "B", text: "Strong negative correlation" },
        { letter: "C", text: "No correlation" },
        { letter: "D", text: "Weak correlation" }
      ],
      correctAnswer: ctx.positive ? "A" : "B",
      explanation: `The scatter plot shows a ${ctx.positive ? 'positive' : 'negative'} correlation because as ${ctx.x.toLowerCase()} increases, ${ctx.y.toLowerCase()} ${ctx.positive ? 'also increases' : 'decreases'}. The points form a clear ${ctx.positive ? 'upward' : 'downward'} trend.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 6
    });

    // Prediction question
    const predictX = 45;
    const predictY = ctx.positive ? 85 : 25;
    questions.push({
      id: `vis-scatter-pred-${i + 1}`,
      question: `Based on the scatter plot, if ${ctx.x.toLowerCase()} is 45, what would be the best prediction for ${ctx.y.toLowerCase()}?`,
      visual: {
        type: "scatterPlot",
        data: { points: basePoints },
        xLabel: ctx.x,
        yLabel: ctx.y,
        title: `${ctx.y} vs ${ctx.x}`
      },
      options: [
        { letter: "A", text: String(predictY - 15) },
        { letter: "B", text: String(predictY - 5) },
        { letter: "C", text: String(predictY) },
        { letter: "D", text: String(predictY + 10) }
      ],
      correctAnswer: "C",
      explanation: `Looking at the trend line through the data points, when ${ctx.x.toLowerCase()} is about 45, ${ctx.y.toLowerCase()} is approximately ${predictY}. This follows the ${ctx.positive ? 'positive' : 'negative'} linear trend shown in the data.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 7
    });
  });

  return questions;
};

// Generate bar chart interpretation questions
const generateBarChartQuestions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];

  const surveyTopics = [
    { title: "Favorite Sports", categories: ["Basketball", "Soccer", "Football", "Tennis", "Baseball"], values: [35, 28, 22, 10, 5] },
    { title: "Transportation Methods", categories: ["Car", "Bus", "Train", "Bike", "Walk"], values: [45, 25, 15, 10, 5] },
    { title: "Music Preferences", categories: ["Pop", "Hip-hop", "Rock", "Country", "Classical"], values: [32, 28, 20, 12, 8] },
    { title: "Study Locations", categories: ["Library", "Home", "Café", "Classroom", "Park"], values: [30, 40, 15, 10, 5] },
    { title: "Lunch Choices", categories: ["Pizza", "Salad", "Sandwich", "Pasta", "Soup"], values: [28, 22, 25, 15, 10] },
    { title: "Weekend Activities", categories: ["Gaming", "Sports", "Reading", "Movies", "Shopping"], values: [25, 30, 15, 20, 10] },
    { title: "Social Media Usage", categories: ["Instagram", "TikTok", "YouTube", "Twitter", "Facebook"], values: [30, 35, 20, 10, 5] },
    { title: "College Majors", categories: ["Business", "Engineering", "Science", "Arts", "Medicine"], values: [25, 30, 20, 15, 10] },
  ];

  surveyTopics.forEach((topic, i) => {
    const chartData = topic.categories.map((cat, j) => ({
      name: cat,
      value: topic.values[j]
    }));

    const totalValue = topic.values.reduce((a, b) => a + b, 0);
    const maxIdx = topic.values.indexOf(Math.max(...topic.values));
    const minIdx = topic.values.indexOf(Math.min(...topic.values));

    // Most popular question
    questions.push({
      id: `vis-bar-most-${i + 1}`,
      question: `According to the bar chart showing ${topic.title.toLowerCase()}, which category is most popular?`,
      visual: {
        type: "barChart",
        data: chartData,
        title: `${topic.title} Survey Results (%)`,
        yLabel: "Percentage"
      },
      options: topic.categories.slice(0, 4).map((cat, j) => ({
        letter: String.fromCharCode(65 + j),
        text: cat
      })),
      correctAnswer: String.fromCharCode(65 + Math.min(maxIdx, 3)),
      explanation: `Looking at the bar chart, ${topic.categories[maxIdx]} has the highest bar at ${topic.values[maxIdx]}%, making it the most popular choice.`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Data interpretation",
      difficultyRating: 4
    });

    // Percentage calculation
    const targetIdx = Math.floor(Math.random() * topic.categories.length);
    const targetPct = topic.values[targetIdx];
    const sampleSize = 200;
    const expectedCount = Math.round(sampleSize * targetPct / 100);

    questions.push({
      id: `vis-bar-calc-${i + 1}`,
      question: `The bar chart shows survey results for ${topic.title.toLowerCase()}. If 200 students were surveyed, approximately how many chose ${topic.categories[targetIdx]}?`,
      visual: {
        type: "barChart",
        data: chartData,
        title: `${topic.title} Survey Results (%)`,
        yLabel: "Percentage"
      },
      options: [
        { letter: "A", text: String(expectedCount - 20) },
        { letter: "B", text: String(expectedCount - 10) },
        { letter: "C", text: String(expectedCount) },
        { letter: "D", text: String(expectedCount + 10) }
      ],
      correctAnswer: "C",
      explanation: `${topic.categories[targetIdx]} represents ${targetPct}% of responses. ${targetPct}% of 200 = 0.${targetPct.toString().padStart(2, '0')} × 200 = ${expectedCount} students.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Percentages",
      difficultyRating: 5
    });

    // Compare categories
    if (i < 6) {
      const cat1Idx = 0;
      const cat2Idx = 2;
      const diff = topic.values[cat1Idx] - topic.values[cat2Idx];

      questions.push({
        id: `vis-bar-diff-${i + 1}`,
        question: `Based on the bar chart, how many percentage points more did ${topic.categories[cat1Idx]} receive than ${topic.categories[cat2Idx]}?`,
        visual: {
          type: "barChart",
          data: chartData,
          title: `${topic.title} Survey Results (%)`,
          yLabel: "Percentage"
        },
        options: [
          { letter: "A", text: String(Math.abs(diff) - 5) },
          { letter: "B", text: String(Math.abs(diff)) },
          { letter: "C", text: String(Math.abs(diff) + 3) },
          { letter: "D", text: String(Math.abs(diff) + 8) }
        ],
        correctAnswer: diff > 0 ? "B" : "B",
        explanation: `${topic.categories[cat1Idx]} received ${topic.values[cat1Idx]}% and ${topic.categories[cat2Idx]} received ${topic.values[cat2Idx]}%. The difference is ${topic.values[cat1Idx]} - ${topic.values[cat2Idx]} = ${Math.abs(diff)} percentage points.`,
        difficulty: "Medium",
        domain: "Problem Solving",
        skill: "Data interpretation",
        difficultyRating: 5
      });
    }
  });

  return questions;
};

// Generate table interpretation questions
const generateTableQuestions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];

  // Two-way frequency tables
  const frequencyTables = [
    {
      title: "Student Survey: Exercise and Sleep",
      headers: ["", "≤6 hours sleep", "7-8 hours sleep", ">8 hours sleep", "Total"],
      rows: [
        ["Exercise daily", "15", "45", "20", "80"],
        ["Exercise sometimes", "25", "35", "10", "70"],
        ["No exercise", "30", "15", "5", "50"],
        ["Total", "70", "95", "35", "200"]
      ]
    },
    {
      title: "Coffee Preferences by Age",
      headers: ["", "Under 25", "25-45", "Over 45", "Total"],
      rows: [
        ["Black coffee", "10", "35", "45", "90"],
        ["With cream", "25", "30", "25", "80"],
        ["Specialty drinks", "50", "20", "10", "80"],
        ["Total", "85", "85", "80", "250"]
      ]
    },
    {
      title: "Travel Preference by Income",
      headers: ["", "Low income", "Middle income", "High income", "Total"],
      rows: [
        ["Budget travel", "45", "30", "10", "85"],
        ["Moderate travel", "25", "40", "25", "90"],
        ["Luxury travel", "5", "15", "55", "75"],
        ["Total", "75", "85", "90", "250"]
      ]
    },
  ];

  frequencyTables.forEach((table, i) => {
    // Basic reading question
    questions.push({
      id: `vis-table-read-${i + 1}`,
      question: `Based on the table, how many people are in the "${table.rows[0][0]}" category and "${table.headers[1]}" group?`,
      visual: {
        type: "table",
        data: { headers: table.headers, rows: table.rows },
        title: table.title
      },
      options: [
        { letter: "A", text: table.rows[0][1] },
        { letter: "B", text: table.rows[1][1] },
        { letter: "C", text: table.rows[0][2] },
        { letter: "D", text: table.rows[1][2] }
      ],
      correctAnswer: "A",
      explanation: `Look at the intersection of row "${table.rows[0][0]}" and column "${table.headers[1]}". The value is ${table.rows[0][1]}.`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Data interpretation",
      difficultyRating: 4
    });

    // Percentage/proportion question
    const rowTotal = parseInt(table.rows[0][4]);
    const cellValue = parseInt(table.rows[0][2]);
    const percentage = Math.round(cellValue / rowTotal * 100);

    questions.push({
      id: `vis-table-pct-${i + 1}`,
      question: `What percentage of people who "${table.rows[0][0].toLowerCase()}" are in the "${table.headers[2]}" category?`,
      visual: {
        type: "table",
        data: { headers: table.headers, rows: table.rows },
        title: table.title
      },
      options: [
        { letter: "A", text: `${percentage - 15}%` },
        { letter: "B", text: `${percentage - 8}%` },
        { letter: "C", text: `${percentage}%` },
        { letter: "D", text: `${percentage + 10}%` }
      ],
      correctAnswer: "C",
      explanation: `Of the ${rowTotal} people who "${table.rows[0][0].toLowerCase()}", ${cellValue} are in the "${table.headers[2]}" category. ${cellValue}/${rowTotal} = ${(cellValue / rowTotal).toFixed(2)} = ${percentage}%.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Percentages",
      difficultyRating: 6
    });

    // Conditional probability
    const colTotal = parseInt(table.rows[3][2]);
    const targetValue = parseInt(table.rows[0][2]);
    const condProb = Math.round(targetValue / colTotal * 100);

    questions.push({
      id: `vis-table-cond-${i + 1}`,
      question: `Given that a randomly selected person is in the "${table.headers[2]}" group, what is the probability they "${table.rows[0][0].toLowerCase()}"?`,
      visual: {
        type: "table",
        data: { headers: table.headers, rows: table.rows },
        title: table.title
      },
      options: [
        { letter: "A", text: `${condProb - 15}%` },
        { letter: "B", text: `${condProb}%` },
        { letter: "C", text: `${condProb + 10}%` },
        { letter: "D", text: `${condProb + 20}%` }
      ],
      correctAnswer: "B",
      explanation: `Look at the "${table.headers[2]}" column. Total in this column is ${colTotal}. Of these, ${targetValue} "${table.rows[0][0].toLowerCase()}". Probability = ${targetValue}/${colTotal} = ${condProb}%.`,
      difficulty: "Hard",
      domain: "Problem Solving",
      skill: "Probability",
      difficultyRating: 7
    });
  });

  // Data summary tables
  const summaryTables = [
    {
      title: "Test Score Statistics by Class",
      headers: ["Class", "Mean", "Median", "Range", "Std Dev"],
      rows: [
        ["Period 1", "78", "80", "35", "8"],
        ["Period 2", "82", "83", "28", "6"],
        ["Period 3", "75", "74", "42", "10"],
        ["Period 4", "80", "82", "30", "7"]
      ]
    },
    {
      title: "Monthly Sales Data",
      headers: ["Month", "Units", "Revenue ($)", "Profit ($)", "Growth %"],
      rows: [
        ["January", "120", "6000", "1200", "5"],
        ["February", "145", "7250", "1500", "10"],
        ["March", "160", "8000", "1700", "12"],
        ["April", "140", "7000", "1400", "-5"]
      ]
    }
  ];

  summaryTables.forEach((table, i) => {
    // Compare statistics question
    questions.push({
      id: `vis-table-stats-${i + 1}`,
      question: `According to the table, which ${table.rows[0][0].includes("Period") ? "class" : "month"} has the highest ${table.headers[1].toLowerCase()}?`,
      visual: {
        type: "table",
        data: { headers: table.headers, rows: table.rows },
        title: table.title
      },
      options: table.rows.map((row, j) => ({
        letter: String.fromCharCode(65 + j),
        text: row[0]
      })),
      correctAnswer: (() => {
        const values = table.rows.map(r => parseFloat(r[1]));
        const maxIdx = values.indexOf(Math.max(...values));
        return String.fromCharCode(65 + maxIdx);
      })(),
      explanation: `Looking at the ${table.headers[1]} column: ${table.rows.map(r => `${r[0]}=${r[1]}`).join(", ")}. The highest value is ${table.rows.find(r => r[1] === String(Math.max(...table.rows.map(row => parseFloat(row[1])))))![0]}.`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Statistics",
      difficultyRating: 4
    });

    // Difference calculation
    const row1 = 0, row2 = 2;
    const val1 = parseFloat(table.rows[row1][1]);
    const val2 = parseFloat(table.rows[row2][1]);
    const diff = Math.abs(val1 - val2);

    questions.push({
      id: `vis-table-diff-${i + 1}`,
      question: `What is the difference in ${table.headers[1].toLowerCase()} between ${table.rows[row1][0]} and ${table.rows[row2][0]}?`,
      visual: {
        type: "table",
        data: { headers: table.headers, rows: table.rows },
        title: table.title
      },
      options: [
        { letter: "A", text: String(diff - 5) },
        { letter: "B", text: String(diff) },
        { letter: "C", text: String(diff + 3) },
        { letter: "D", text: String(diff + 8) }
      ],
      correctAnswer: "B",
      explanation: `${table.rows[row1][0]} has ${table.headers[1].toLowerCase()} of ${val1} and ${table.rows[row2][0]} has ${val2}. Difference = |${val1} - ${val2}| = ${diff}.`,
      difficulty: "Medium",
      domain: "Problem Solving",
      skill: "Data interpretation",
      difficultyRating: 5
    });
  });

  return questions;
};

// Generate line graph questions
const generateLineGraphQuestions = (): VisualQuestion[] => {
  const questions: VisualQuestion[] = [];

  const trendContexts = [
    { title: "Population Growth", xLabel: "Year", yLabel: "Population (millions)", startY: 10, slope: 2, years: 5 },
    { title: "Temperature Change", xLabel: "Hour", yLabel: "Temperature (°F)", startY: 45, slope: 3, years: 8 },
    { title: "Sales Over Time", xLabel: "Month", yLabel: "Sales ($1000s)", startY: 20, slope: 4, years: 6 },
    { title: "Student Enrollment", xLabel: "Year", yLabel: "Students", startY: 500, slope: 50, years: 5 },
    { title: "Revenue Growth", xLabel: "Quarter", yLabel: "Revenue ($M)", startY: 5, slope: 1.5, years: 8 },
    { title: "Website Traffic", xLabel: "Month", yLabel: "Visitors (1000s)", startY: 10, slope: 5, years: 6 },
  ];

  trendContexts.forEach((ctx, i) => {
    const points = [];
    for (let j = 0; j < ctx.years; j++) {
      points.push({ x: j + 1, y: ctx.startY + j * ctx.slope + (Math.random() * ctx.slope * 0.3 - ctx.slope * 0.15) });
    }
    points.forEach(p => p.y = Math.round(p.y * 10) / 10);

    // Rate of change question
    const avgChange = ctx.slope;
    questions.push({
      id: `vis-line-rate-${i + 1}`,
      question: `Based on the line graph showing ${ctx.title.toLowerCase()}, what is the approximate average rate of change per ${ctx.xLabel.toLowerCase()}?`,
      visual: {
        type: "lineGraph",
        data: points,
        xLabel: ctx.xLabel,
        yLabel: ctx.yLabel,
        title: ctx.title
      },
      options: [
        { letter: "A", text: String(avgChange - 2) },
        { letter: "B", text: String(avgChange) },
        { letter: "C", text: String(avgChange + 1) },
        { letter: "D", text: String(avgChange + 3) }
      ],
      correctAnswer: "B",
      explanation: `The rate of change is found by dividing the total change by the number of ${ctx.xLabel.toLowerCase()}s. From the graph, ${ctx.yLabel.toLowerCase()} increases by approximately ${avgChange} per ${ctx.xLabel.toLowerCase()}.`,
      difficulty: "Medium",
      domain: "Algebra",
      skill: "Linear Functions",
      difficultyRating: 6
    });

    // Prediction/extrapolation question
    const predictX = ctx.years + 2;
    const predictY = Math.round(ctx.startY + (predictX - 1) * ctx.slope);

    questions.push({
      id: `vis-line-pred-${i + 1}`,
      question: `If the trend continues, what would ${ctx.yLabel.toLowerCase()} be at ${ctx.xLabel.toLowerCase()} ${predictX}?`,
      visual: {
        type: "lineGraph",
        data: points,
        xLabel: ctx.xLabel,
        yLabel: ctx.yLabel,
        title: ctx.title
      },
      options: [
        { letter: "A", text: String(predictY - 8) },
        { letter: "B", text: String(predictY - 3) },
        { letter: "C", text: String(predictY) },
        { letter: "D", text: String(predictY + 5) }
      ],
      correctAnswer: "C",
      explanation: `Extending the linear trend: starting at ${ctx.startY} and increasing by ${ctx.slope} per ${ctx.xLabel.toLowerCase()}, at ${ctx.xLabel.toLowerCase()} ${predictX}: ${ctx.startY} + ${predictX - 1} × ${ctx.slope} ≈ ${predictY}.`,
      difficulty: "Hard",
      domain: "Algebra",
      skill: "Linear Functions",
      difficultyRating: 7
    });

    // Interpretation question
    const midPoint = Math.floor(ctx.years / 2);
    const midValue = Math.round(ctx.startY + (midPoint) * ctx.slope);

    questions.push({
      id: `vis-line-read-${i + 1}`,
      question: `According to the graph, what was the ${ctx.yLabel.toLowerCase()} at ${ctx.xLabel.toLowerCase()} ${midPoint + 1}?`,
      visual: {
        type: "lineGraph",
        data: points,
        xLabel: ctx.xLabel,
        yLabel: ctx.yLabel,
        title: ctx.title
      },
      options: [
        { letter: "A", text: String(midValue - 5) },
        { letter: "B", text: String(midValue - 2) },
        { letter: "C", text: String(midValue) },
        { letter: "D", text: String(midValue + 4) }
      ],
      correctAnswer: "C",
      explanation: `Find ${ctx.xLabel.toLowerCase()} ${midPoint + 1} on the x-axis and read across to the line, then down to the y-axis. The value is approximately ${midValue}.`,
      difficulty: "Easy",
      domain: "Problem Solving",
      skill: "Data interpretation",
      difficultyRating: 4
    });
  });

  return questions;
};

// Combine all visual questions
export const additionalVisualQuestions: VisualQuestion[] = [
  ...generateScatterPlotQuestions(),
  ...generateBarChartQuestions(),
  ...generateTableQuestions(),
  ...generateLineGraphQuestions(),
];

// Export stats
export const visualQuestionStats = {
  scatterPlot: generateScatterPlotQuestions().length,
  barChart: generateBarChartQuestions().length,
  table: generateTableQuestions().length,
  lineGraph: generateLineGraphQuestions().length,
  total: additionalVisualQuestions.length
};
