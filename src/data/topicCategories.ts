export interface TopicCategory {
  id: string;
  name: string;
  description: string;
  type: 'math' | 'english';
  keywords: string[]; // Keywords to match against domain/skill
}

export const mathTopics: TopicCategory[] = [
  {
    id: 'linear-systems',
    name: 'Solving Systems of Linear Equations',
    description: 'Solve systems using substitution, elimination, and graphing',
    type: 'math',
    keywords: ['linear', 'system', 'equation', 'substitution', 'elimination']
  },
  {
    id: 'linear-functions',
    name: 'Interpreting Linear Functions (y=mx+b)',
    description: 'Slope, intercepts, and linear relationships',
    type: 'math',
    keywords: ['slope', 'intercept', 'linear function', 'rate of change', 'y = mx']
  },
  {
    id: 'linear-inequalities',
    name: 'Graphing Linear Inequalities',
    description: 'Graph and solve linear inequalities',
    type: 'math',
    keywords: ['inequality', 'inequalities', 'graph']
  },
  {
    id: 'quadratic',
    name: 'Quadratic Equations and Functions',
    description: 'Factoring, completing the square, quadratic formula',
    type: 'math',
    keywords: ['quadratic', 'parabola', 'vertex', 'factor', 'completing the square']
  },
  {
    id: 'polynomials',
    name: 'Polynomials and Rational Expressions',
    description: 'Polynomial operations and rational functions',
    type: 'math',
    keywords: ['polynomial', 'rational', 'expression', 'factor', 'divide']
  },
  {
    id: 'exponential-radical',
    name: 'Exponential and Radical Functions',
    description: 'Exponential growth/decay and radical expressions',
    type: 'math',
    keywords: ['exponential', 'radical', 'exponent', 'growth', 'decay', 'root', 'sqrt']
  },
  {
    id: 'ratios-rates',
    name: 'Ratios, Rates, and Proportions',
    description: 'Proportional relationships and unit rates',
    type: 'math',
    keywords: ['ratio', 'rate', 'proportion', 'unit']
  },
  {
    id: 'percentages',
    name: 'Percentages and Unit Conversion',
    description: 'Percent calculations and converting units',
    type: 'math',
    keywords: ['percent', 'percentage', 'convert', 'unit']
  },
  {
    id: 'data-interpretation',
    name: 'Data Interpretation',
    description: 'Reading tables, charts, and graphs',
    type: 'math',
    keywords: ['data', 'table', 'chart', 'graph', 'interpret', 'analysis']
  },
  {
    id: 'probability-stats',
    name: 'Probability and Statistics',
    description: 'Probability, mean, median, standard deviation',
    type: 'math',
    keywords: ['probability', 'statistic', 'mean', 'median', 'mode', 'standard deviation', 'average']
  },
  {
    id: 'geometry-area',
    name: 'Perimeter, Area, and Volume',
    description: 'Calculate geometric measurements',
    type: 'math',
    keywords: ['perimeter', 'area', 'volume', 'surface']
  },
  {
    id: 'triangles-angles',
    name: 'Triangles, Angles, and Lines',
    description: 'Angle relationships and triangle properties',
    type: 'math',
    keywords: ['triangle', 'angle', 'line', 'parallel', 'perpendicular', 'congruent', 'similar']
  },
  {
    id: 'circles',
    name: 'Circle Theorems',
    description: 'Circle properties, arc length, and sectors',
    type: 'math',
    keywords: ['circle', 'radius', 'diameter', 'arc', 'sector', 'circumference']
  },
  {
    id: 'trigonometry',
    name: 'Basic Trigonometry (sin, cos, tan)',
    description: 'Trigonometric ratios and right triangles',
    type: 'math',
    keywords: ['sin', 'cos', 'tan', 'trig', 'trigonometry', 'sine', 'cosine', 'tangent']
  }
];

export const englishTopics: TopicCategory[] = [
  {
    id: 'context-structure',
    name: 'Context and Text Structure',
    description: 'Understanding how texts are organized and purpose',
    type: 'english',
    keywords: ['context', 'structure', 'purpose', 'organization']
  },
  {
    id: 'passage-connection',
    name: 'Connecting Related Passages',
    description: 'Analyzing relationships between paired passages',
    type: 'english',
    keywords: ['passage', 'connect', 'relate', 'compare', 'paired']
  },
  {
    id: 'central-ideas',
    name: 'Central Ideas and Comprehension',
    description: 'Identifying main ideas and themes',
    type: 'english',
    keywords: ['central', 'main idea', 'theme', 'comprehension', 'summary']
  },
  {
    id: 'inferences',
    name: 'Inferences and Analysis',
    description: 'Drawing conclusions from textual evidence',
    type: 'english',
    keywords: ['inference', 'infer', 'conclude', 'imply', 'suggest', 'analysis']
  },
  {
    id: 'evidence',
    name: 'Textual and Quantitative Evidence',
    description: 'Using evidence from text, tables, and graphs',
    type: 'english',
    keywords: ['evidence', 'support', 'table', 'graph', 'quantitative']
  },
  {
    id: 'punctuation',
    name: 'Punctuation (Colons, Semicolons, Dashes)',
    description: 'Correct use of advanced punctuation',
    type: 'english',
    keywords: ['punctuation', 'colon', 'semicolon', 'dash', 'comma']
  },
  {
    id: 'sentence-structure',
    name: 'Sentence Structure',
    description: 'Sentence formation and syntax',
    type: 'english',
    keywords: ['sentence', 'structure', 'syntax', 'fragment', 'run-on']
  },
  {
    id: 'revision',
    name: 'Revision and Writing Effectiveness',
    description: 'Improving clarity and effectiveness of writing',
    type: 'english',
    keywords: ['revision', 'improve', 'effective', 'clarity', 'concise']
  },
  {
    id: 'transitions',
    name: 'Transitions and Linking Words',
    description: 'Selecting appropriate transition words',
    type: 'english',
    keywords: ['transition', 'link', 'however', 'therefore', 'moreover', 'furthermore']
  },
  {
    id: 'rhetorical',
    name: 'Rhetorical Synthesis',
    description: 'Combining information for rhetorical effect',
    type: 'english',
    keywords: ['rhetorical', 'synthesis', 'argument', 'persuade']
  },
  {
    id: 'grammar',
    name: 'Pronoun Agreement and Verb Tense',
    description: 'Grammar rules for pronouns and verbs',
    type: 'english',
    keywords: ['pronoun', 'verb', 'tense', 'agreement', 'subject-verb']
  },
  {
    id: 'modifiers',
    name: 'Misplaced and Dangling Modifiers',
    description: 'Correct modifier placement',
    type: 'english',
    keywords: ['modifier', 'misplaced', 'dangling', 'placement']
  },
  {
    id: 'parallelism',
    name: 'Parallelism',
    description: 'Maintaining parallel structure in writing',
    type: 'english',
    keywords: ['parallel', 'parallelism', 'consistent', 'structure']
  }
];

export const allTopics = [...mathTopics, ...englishTopics];
