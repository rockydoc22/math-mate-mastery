export interface Competition {
  id: string;
  name: string;
  abbr: string;
  icon: string;
  description: string;
  format: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  teamSize: string;
  website?: string;
  tips: string[];
  sampleQuestions: SampleQuestion[];
}

export interface SampleQuestion {
  id: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  topic: string;
}

export interface CompetitionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  competitions: Competition[];
}

export const STEM_COMPETITION_CATEGORIES: CompetitionCategory[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🔢',
    description: 'National & international math competitions',
    competitions: [
      {
        id: 'amc10',
        name: 'AMC 10',
        abbr: 'AMC 10',
        icon: '🏅',
        description: 'American Mathematics Competition for students in 10th grade and below. 25 multiple-choice questions in 75 minutes.',
        format: '25 MC questions, 75 min. Scoring: 6 pts correct, 1.5 pts blank, 0 pts wrong.',
        difficulty: 'Intermediate',
        teamSize: 'Individual',
        tips: ['Never guess randomly — blanks earn 1.5 pts', 'Master AMC-style counting and probability', 'Practice time management: 3 min per question avg'],
        sampleQuestions: [
          { id: 'amc10-1', difficulty: 'Easy', question: 'What is the sum of all integer values of x such that |2x - 3| < 5?', options: ['6', '8', '9', '10'], answer: '9', explanation: '-1 < 2x - 3 < 5 → 1 < x < 4, so x = 1, 2, 3. Sum = 6. Wait: |2x-3|<5 → -5<2x-3<5 → -2<2x<8 → -1<x<4. Integers: 0,1,2,3. Sum = 6.', topic: 'Algebra' },
          { id: 'amc10-2', difficulty: 'Medium', question: 'A bag contains 3 red, 4 blue, and 5 green marbles. Two marbles are drawn without replacement. What is the probability that they are different colors?', options: ['47/66', '49/66', '51/66', '53/66'], answer: '47/66', explanation: 'P(same) = C(3,2)+C(4,2)+C(5,2) / C(12,2) = (3+6+10)/66 = 19/66. P(diff) = 1 - 19/66 = 47/66.', topic: 'Counting & Probability' },
          { id: 'amc10-3', difficulty: 'Hard', question: 'How many 4-digit positive integers have the property that the sum of their digits equals 10?', options: ['165', '210', '219', '220'], answer: '219', explanation: 'Stars and bars with constraints: a+b+c+d=10, 1≤a≤9, 0≤b,c,d≤9. Substituting a\'=a-1: a\'+b+c+d=9 with 0≤a\'≤8, 0≤b,c,d≤9. Using inclusion-exclusion gives 219.', topic: 'Combinatorics' },
        ]
      },
      {
        id: 'amc12',
        name: 'AMC 12',
        abbr: 'AMC 12',
        icon: '🥇',
        description: 'AMC for students in 12th grade and below. Covers precalculus topics including logs, trig, and complex numbers.',
        format: '25 MC questions, 75 min. Same scoring as AMC 10. Qualifies for AIME.',
        difficulty: 'Advanced',
        teamSize: 'Individual',
        tips: ['Know trig identities and log properties cold', 'Complex number geometry is a frequent topic', 'Target 100+ to qualify for AIME'],
        sampleQuestions: [
          { id: 'amc12-1', difficulty: 'Medium', question: 'If log₂(log₃(log₅(x))) = 0, what is x?', options: ['125', '243', '625', '3125'], answer: '125', explanation: 'log₂(log₃(log₅(x))) = 0 → log₃(log₅(x)) = 1 → log₅(x) = 3 → x = 125.', topic: 'Logarithms' },
          { id: 'amc12-2', difficulty: 'Hard', question: 'The complex number z satisfies |z - 3| = |z - 5i|. What is the locus of z in the complex plane?', options: ['A circle', 'A line', 'A parabola', 'An ellipse'], answer: 'A line', explanation: 'The set of points equidistant from (3,0) and (0,5) is the perpendicular bisector of the segment connecting them — a line.', topic: 'Complex Numbers' },
        ]
      },
      {
        id: 'arml',
        name: 'ARML',
        abbr: 'ARML',
        icon: '🤝',
        description: 'American Regions Mathematics League — a major national team competition with individual, team, power, and relay rounds.',
        format: 'Individual (8 questions/20 min), Team (10 questions/20 min), Power (proof-based), Relay (3-person chains)',
        difficulty: 'Advanced',
        teamSize: 'Teams of 15',
        tips: ['Practice relay communication — speed + accuracy matter', 'Power round requires proof-writing skills', 'Individual round is pure speed; drill mental math'],
        sampleQuestions: [
          { id: 'arml-1', difficulty: 'Medium', question: 'In a relay round, person 1 passes T=7. Person 2 must compute T² - 3T + 2. What does person 2 pass?', options: ['28', '30', '32', '34'], answer: '30', explanation: '7² - 3(7) + 2 = 49 - 21 + 2 = 30.', topic: 'Relay' },
          { id: 'arml-2', difficulty: 'Hard', question: 'How many ordered pairs of positive integers (a, b) satisfy 1/a + 1/b = 1/6?', options: ['5', '7', '9', '11'], answer: '9', explanation: '1/a + 1/b = 1/6 → (a-6)(b-6) = 36. Count divisor pairs of 36: τ(36)=9.', topic: 'Number Theory' },
        ]
      },
      {
        id: 'hmmt',
        name: 'HMMT',
        abbr: 'HMMT',
        icon: '🎓',
        description: 'Harvard-MIT Mathematics Tournament — one of the most prestigious high school math competitions in the US.',
        format: 'Individual (Algebra, Combinatorics, Geometry, or General), Team, Guts round (live relay)',
        difficulty: 'Elite',
        teamSize: 'Teams of 6-8',
        tips: ['Guts round is fast-paced live scoring — stay calm under pressure', 'HMMT problems are harder than AMC/AIME; expect olympiad-level ideas', 'Practice with past HMMT problems extensively'],
        sampleQuestions: [
          { id: 'hmmt-1', difficulty: 'Hard', question: 'Find the number of subsets S of {1, 2, ..., 10} such that no two elements of S differ by 1.', options: ['89', '121', '144', '233'], answer: '144', explanation: 'This is equivalent to tiling a row of 10 with tiles of size 1 (skip) and 2 (take+skip). The answer is Fibonacci(12) = 144.', topic: 'Combinatorics' },
        ]
      },
      {
        id: 'mathleague',
        name: 'Mathleague.org',
        abbr: 'ML',
        icon: '⚡',
        description: 'High-speed, topic-specific tests with speed, accuracy, and team rounds for middle and high schoolers.',
        format: 'Speed Round (20 questions/10 min), Accuracy Round (8 questions/30 min), Team Round',
        difficulty: 'Intermediate',
        teamSize: 'Individual + Teams of 4',
        tips: ['Speed round requires instant recall — drill arithmetic and common formulas', 'Accuracy round rewards careful work; double-check answers', 'Know unit conversions and geometry formulas perfectly'],
        sampleQuestions: [
          { id: 'ml-1', difficulty: 'Easy', question: 'What is the greatest common divisor of 84 and 126?', options: ['14', '21', '28', '42'], answer: '42', explanation: '84 = 2²·3·7, 126 = 2·3²·7. GCD = 2·3·7 = 42.', topic: 'Number Theory' },
          { id: 'ml-2', difficulty: 'Medium', question: 'A speed question: What is 17² + 13²?', options: ['440', '458', '460', '478'], answer: '458', explanation: '289 + 169 = 458. Speed round tip: 17²=289, 13²=169.', topic: 'Speed Arithmetic' },
        ]
      },
      {
        id: 'purple-comet',
        name: 'Purple Comet! Math Meet',
        abbr: 'PCMM',
        icon: '☄️',
        description: 'Free, online, team-based math competition for middle and high school students.',
        format: '30 problems in 60 minutes, team of up to 5, all answers are positive integers',
        difficulty: 'Intermediate',
        teamSize: 'Teams of up to 5',
        tips: ['All answers are positive integers — use this to check work', 'Divide problems by strength: geometry expert, algebra expert, etc.', 'Free to enter — great low-stakes practice'],
        sampleQuestions: [
          { id: 'pc-1', difficulty: 'Easy', question: 'The average of five consecutive integers is 20. What is the largest of these integers?', options: ['20', '21', '22', '23'], answer: '22', explanation: 'If average is 20 and there are 5 consecutive integers, the middle one is 20. So they are 18,19,20,21,22.', topic: 'Algebra' },
        ]
      },
      {
        id: 'm3-challenge',
        name: 'MathWorks M3 Challenge',
        abbr: 'M3',
        icon: '📐',
        description: 'Mathematical modeling challenge using real-world data and problems. Teams submit a written solution paper.',
        format: '14-hour challenge, teams of 3-5, written solution paper',
        difficulty: 'Advanced',
        teamSize: 'Teams of 3-5',
        tips: ['Practice writing clear mathematical reports', 'Learn common modeling techniques: regression, optimization, simulation', 'Divide roles: modeler, coder, writer, data analyst'],
        sampleQuestions: [
          { id: 'm3-1', difficulty: 'Hard', question: 'A city wants to optimize bus routes to minimize average commute time. What type of mathematical model would be most appropriate?', options: ['Linear programming', 'Monte Carlo simulation', 'Graph theory / network optimization', 'All of the above could work'], answer: 'All of the above could work', explanation: 'Route optimization can be approached through graph theory (shortest paths), LP (resource allocation), or simulation (testing scenarios). Good modelers consider multiple approaches.', topic: 'Mathematical Modeling' },
        ]
      },
      {
        id: 'trigstar',
        name: 'Trig-Star',
        abbr: 'TS',
        icon: '📏',
        description: 'National competition focused on applied trigonometry — solving real-world surveying and measurement problems.',
        format: 'Written test with applied trig problems, timed',
        difficulty: 'Intermediate',
        teamSize: 'Individual',
        tips: ['Master law of sines and cosines', 'Practice angle of elevation/depression word problems', 'Know how to use trig in surveying contexts'],
        sampleQuestions: [
          { id: 'ts-1', difficulty: 'Medium', question: 'From a point 50m from the base of a tower, the angle of elevation to the top is 62°. How tall is the tower? (Round to nearest meter)', options: ['88m', '94m', '100m', '106m'], answer: '94m', explanation: 'tan(62°) = h/50. h = 50·tan(62°) ≈ 50·1.8807 ≈ 94m.', topic: 'Trigonometry' },
        ]
      },
      {
        id: 'caribou',
        name: 'Caribou Mathematics',
        abbr: 'Caribou',
        icon: '🦌',
        description: 'Worldwide online math competition featuring interactive puzzles and problems for various skill levels.',
        format: '6 contests per year, 60 min each, interactive online problems',
        difficulty: 'Beginner',
        teamSize: 'Individual',
        tips: ['Great for building competition confidence', 'Problems are interactive — practice with digital tools', 'Covers visual/spatial reasoning alongside traditional math'],
        sampleQuestions: [
          { id: 'car-1', difficulty: 'Easy', question: 'A square is divided into 4 equal smaller squares. If the perimeter of the large square is 24 cm, what is the perimeter of one small square?', options: ['6 cm', '8 cm', '12 cm', '16 cm'], answer: '12 cm', explanation: 'Large square side = 24/4 = 6cm. Small square side = 6/2 = 3cm. Small perimeter = 4·3 = 12cm.', topic: 'Geometry' },
        ]
      },
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    description: 'Physics competitions & olympiad prep',
    competitions: [
      {
        id: 'physics-bowl',
        name: 'Physics Bowl',
        abbr: 'PB',
        icon: '🎳',
        description: 'AAPT Physics Bowl — a 45-question, 45-minute multiple-choice exam covering all areas of introductory physics.',
        format: '45 MC questions in 45 min. Division 1 (first-year) and Division 2 (second-year).',
        difficulty: 'Intermediate',
        teamSize: 'Individual',
        tips: ['Speed is critical — 1 minute per question', 'Division 2 includes modern physics and calculus-based mechanics', 'Review dimensional analysis for quick elimination'],
        sampleQuestions: [
          { id: 'pb-1', difficulty: 'Easy', question: 'A 2 kg object accelerates at 3 m/s². What net force acts on it?', options: ['1.5 N', '5 N', '6 N', '8 N'], answer: '6 N', explanation: 'F = ma = 2 × 3 = 6 N.', topic: 'Mechanics' },
          { id: 'pb-2', difficulty: 'Medium', question: 'A photon has energy 3.0 eV. What is its wavelength? (h = 4.14×10⁻¹⁵ eV·s, c = 3×10⁸ m/s)', options: ['207 nm', '310 nm', '414 nm', '620 nm'], answer: '414 nm', explanation: 'λ = hc/E = (4.14×10⁻¹⁵)(3×10⁸)/3.0 = 4.14×10⁻⁷ m = 414 nm.', topic: 'Modern Physics' },
        ]
      },
      {
        id: 'fma-usapho',
        name: 'F=ma / USAPhO',
        abbr: 'USAPhO',
        icon: '🏆',
        description: 'The F=ma exam qualifies students for the USA Physics Olympiad (USAPhO). Top performers go to IPhO.',
        format: 'F=ma: 30 MC in 75 min. USAPhO: 2 parts of proof/calculation problems.',
        difficulty: 'Elite',
        teamSize: 'Individual',
        tips: ['F=ma is all mechanics — master projectiles, energy, rotation', 'USAPhO requires elegant written solutions', 'Practice with IPhO problems for the highest level'],
        sampleQuestions: [
          { id: 'fma-1', difficulty: 'Hard', question: 'A uniform rod of length L is pivoted at one end and released from horizontal. What is the speed of the free end when the rod is vertical?', options: ['√(gL)', '√(2gL)', '√(3gL)', '√(4gL)'], answer: '√(3gL)', explanation: 'Energy conservation: Mg(L/2) = ½Iω², I = ML²/3. Solving: ω = √(3g/L). Speed of end = ωL = √(3gL).', topic: 'Rotational Mechanics' },
        ]
      },
      {
        id: 'science-olympiad-physics',
        name: 'Science Olympiad (Physics Events)',
        abbr: 'SciOly',
        icon: '🔬',
        description: 'Science Olympiad physics events including Circuit Lab, Fermi Questions, Machines, and more.',
        format: 'Varies by event: written tests, builds, experimental design',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 2-3 per event',
        tips: ['Each event has specific rules — read them carefully', 'Build events require pre-testing', 'Fermi Questions require estimation skills'],
        sampleQuestions: [
          { id: 'so-1', difficulty: 'Medium', question: 'In a simple circuit, three resistors of 6Ω each are connected in parallel. What is the equivalent resistance?', options: ['2Ω', '3Ω', '6Ω', '18Ω'], answer: '2Ω', explanation: '1/R = 1/6 + 1/6 + 1/6 = 3/6 = 1/2. R = 2Ω.', topic: 'Circuit Lab' },
        ]
      },
      {
        id: 'science-bowl',
        name: 'Science Bowl',
        abbr: 'SB',
        icon: '🔔',
        description: 'DOE National Science Bowl — fast-paced buzzer-based Q&A covering all sciences including physics.',
        format: 'Buzzer-based, 8-minute halves, toss-up and bonus questions',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 4-5',
        tips: ['Buzzer speed matters — practice quick recall', 'Physics, chemistry, biology, earth science, math, and energy all appear', 'Bonus questions are collaborative — communicate with your team'],
        sampleQuestions: [
          { id: 'sb-1', difficulty: 'Easy', question: 'TOSS-UP: What is the SI unit of electrical capacitance?', options: ['Ohm', 'Farad', 'Henry', 'Weber'], answer: 'Farad', explanation: 'The farad (F) is the SI unit of capacitance, named after Michael Faraday.', topic: 'Electricity' },
        ]
      },
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '📊',
    description: 'Economics knowledge & financial literacy competitions',
    competitions: [
      {
        id: 'nec',
        name: 'National Economics Challenge',
        abbr: 'NEC',
        icon: '💰',
        description: 'CEE\'s premier economics competition testing micro, macro, and international economics knowledge.',
        format: 'Written rounds (micro, macro, international) + quiz bowl finals',
        difficulty: 'Advanced',
        teamSize: 'Teams of 4',
        tips: ['Study AP Micro and AP Macro content thoroughly', 'International economics round covers trade theory and exchange rates', 'Quiz bowl round tests speed — practice with buzzers'],
        sampleQuestions: [
          { id: 'nec-1', difficulty: 'Medium', question: 'If the marginal propensity to consume is 0.8, what is the spending multiplier?', options: ['1.25', '4', '5', '8'], answer: '5', explanation: 'Multiplier = 1/(1-MPC) = 1/(1-0.8) = 1/0.2 = 5.', topic: 'Macroeconomics' },
          { id: 'nec-2', difficulty: 'Hard', question: 'Under the Heckscher-Ohlin model, a capital-abundant country will export:', options: ['Labor-intensive goods', 'Capital-intensive goods', 'Both equally', 'Neither'], answer: 'Capital-intensive goods', explanation: 'H-O predicts countries export goods that intensively use their abundant factor.', topic: 'International Economics' },
        ]
      },
      {
        id: 'fed-challenge',
        name: 'Fed Challenge',
        abbr: 'Fed',
        icon: '🏦',
        description: 'Teams role-play as the FOMC, presenting monetary policy recommendations based on current economic data.',
        format: 'Team presentation + Q&A from judges (often actual Fed economists)',
        difficulty: 'Advanced',
        teamSize: 'Teams of 5',
        tips: ['Follow FRED data and Fed meeting minutes regularly', 'Practice presenting under pressure with Q&A', 'Understand dual mandate: maximum employment + price stability'],
        sampleQuestions: [
          { id: 'fed-1', difficulty: 'Hard', question: 'If inflation is above target and unemployment is below the natural rate, what policy would the FOMC likely recommend?', options: ['Lower the federal funds rate', 'Raise the federal funds rate', 'Increase quantitative easing', 'No change'], answer: 'Raise the federal funds rate', explanation: 'With inflation above target and an overheating labor market, contractionary monetary policy (raising rates) is appropriate.', topic: 'Monetary Policy' },
        ]
      },
      {
        id: 'euro-challenge',
        name: 'Euro Challenge',
        abbr: 'Euro',
        icon: '🇪🇺',
        description: 'Teams research and present on economic issues facing a European country, focusing on eurozone policy.',
        format: 'Research presentation + Q&A, focused on EU economics',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 3-5',
        tips: ['Pick a country with interesting policy challenges', 'Understand eurozone constraints (single currency, no independent monetary policy)', 'Compare with non-euro EU countries for context'],
        sampleQuestions: [
          { id: 'euro-1', difficulty: 'Medium', question: 'Why can\'t Greece devalue its currency to boost exports?', options: ['It uses the dollar', 'It uses the euro (shared currency)', 'Its central bank forbids it', 'It has a fixed exchange rate with the UK'], answer: 'It uses the euro (shared currency)', explanation: 'Eurozone members share the euro and cannot independently devalue. Monetary policy is set by the ECB.', topic: 'European Economics' },
        ]
      },
      {
        id: 'ieo',
        name: 'International Economics Olympiad',
        abbr: 'IEO',
        icon: '🌍',
        description: 'The premier international economics competition for high school students worldwide.',
        format: 'Three rounds: Economics, Finance, Business Case',
        difficulty: 'Elite',
        teamSize: 'National teams',
        tips: ['Study game theory and behavioral economics', 'Financial literacy round includes portfolio management', 'Business case requires creative problem-solving'],
        sampleQuestions: [
          { id: 'ieo-1', difficulty: 'Hard', question: 'In a prisoner\'s dilemma, what is the Nash equilibrium outcome?', options: ['Both cooperate', 'Both defect', 'One cooperates, one defects', 'No equilibrium exists'], answer: 'Both defect', explanation: 'In a prisoner\'s dilemma, both defecting is the Nash equilibrium — neither player can improve by unilaterally changing strategy, even though mutual cooperation would be better.', topic: 'Game Theory' },
        ]
      },
    ]
  },
  {
    id: 'cs',
    name: 'Computer Science',
    icon: '💻',
    description: 'Programming contests & cybersecurity challenges',
    competitions: [
      {
        id: 'usaco',
        name: 'USACO',
        abbr: 'USACO',
        icon: '🐄',
        description: 'USA Computing Olympiad — the premier competitive programming contest for US high schoolers. Four divisions: Bronze → Platinum.',
        format: '4 problems per contest, 4 hours, auto-graded with test cases',
        difficulty: 'Advanced',
        teamSize: 'Individual',
        tips: ['Start with Bronze: learn brute force, simulation, sorting', 'Silver requires binary search, DFS/BFS, greedy', 'Gold needs dynamic programming, shortest paths, number theory'],
        sampleQuestions: [
          { id: 'usaco-1', difficulty: 'Easy', question: 'Given an array of N integers, find the maximum difference between any two elements. What is the optimal time complexity?', options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(log N)'], answer: 'O(N)', explanation: 'Simply find min and max in one pass. Max difference = max - min. O(N) time.', topic: 'Bronze / Basics' },
          { id: 'usaco-2', difficulty: 'Hard', question: 'You have N cows in a line. Each cow has a height. For each cow, find the nearest taller cow to its right. What data structure is most efficient?', options: ['Priority queue', 'Monotonic stack', 'Segment tree', 'Hash map'], answer: 'Monotonic stack', explanation: 'A monotonic decreasing stack processes each cow once, giving O(N) total time for the "next greater element" pattern.', topic: 'Silver / Data Structures' },
        ]
      },
      {
        id: 'acsl',
        name: 'ACSL',
        abbr: 'ACSL',
        icon: '🖥️',
        description: 'American Computer Science League — tests CS theory, programming concepts, and hands-on coding.',
        format: '4 contests per year, written theory + programming problem',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 3-5',
        tips: ['Study Boolean algebra, number bases, and graph theory', 'Programming problems are short but tricky', 'ACSL uses specific pseudocode — learn it'],
        sampleQuestions: [
          { id: 'acsl-1', difficulty: 'Medium', question: 'Convert the hexadecimal number 2F to binary.', options: ['00101111', '00111110', '01011110', '00101011'], answer: '00101111', explanation: '2 = 0010, F = 1111. So 2F = 00101111.', topic: 'Number Bases' },
        ]
      },
      {
        id: 'cyberpatriot',
        name: 'CyberPatriot',
        abbr: 'CP',
        icon: '🛡️',
        description: 'National Youth Cyber Defense Competition — teams secure virtual operating systems against vulnerabilities.',
        format: 'Teams secure Windows, Linux, and networking VMs in 6-hour rounds',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 6',
        tips: ['Learn Windows Group Policy and Linux file permissions', 'Practice with CyberPatriot practice images', 'Network security (Cisco) is a tiebreaker — don\'t skip it'],
        sampleQuestions: [
          { id: 'cp-1', difficulty: 'Medium', question: 'On a Linux system, what command shows all users with login shells?', options: ['cat /etc/passwd | grep /bin/bash', 'who -a', 'ls /home', 'getent shadow'], answer: 'cat /etc/passwd | grep /bin/bash', explanation: '/etc/passwd contains user info. Filtering for /bin/bash shows users with login shells.', topic: 'Linux Security' },
        ]
      },
      {
        id: 'code-quest',
        name: 'Lockheed Martin Code Quest',
        abbr: 'CQ',
        icon: '✈️',
        description: 'Lockheed Martin\'s coding competition with problems ranging from easy string manipulation to complex algorithms.',
        format: '20+ problems in 2 hours, difficulty ranges from easy to very hard',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 2-3',
        tips: ['Easy problems are worth attempting first for quick points', 'Practice string parsing and file I/O', 'Later problems involve geometry, graph theory, or simulation'],
        sampleQuestions: [
          { id: 'cq-1', difficulty: 'Easy', question: 'Write a function that returns the number of vowels in a string "Hello World".', options: ['2', '3', '4', '5'], answer: '3', explanation: '"Hello World" has e, o, o = 3 vowels.', topic: 'String Processing' },
        ]
      },
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    description: 'Chemistry olympiad & lab competitions',
    competitions: [
      {
        id: 'usnco',
        name: 'USNCO',
        abbr: 'USNCO',
        icon: '⚗️',
        description: 'US National Chemistry Olympiad — a multi-round competition selecting the US team for IChO.',
        format: 'Local exam → National exam (60 MC + 8 free response) → Study Camp → IChO',
        difficulty: 'Elite',
        teamSize: 'Individual',
        tips: ['Master stoichiometry, equilibrium, and thermodynamics first', 'Free response requires showing all work clearly', 'Organic chemistry appears at national level'],
        sampleQuestions: [
          { id: 'usnco-1', difficulty: 'Medium', question: 'What is the pH of a 0.01 M solution of HCl?', options: ['1', '2', '3', '4'], answer: '2', explanation: 'HCl is a strong acid, fully dissociating. [H⁺] = 0.01 M. pH = -log(0.01) = 2.', topic: 'Acids & Bases' },
          { id: 'usnco-2', difficulty: 'Hard', question: 'For the reaction N₂ + 3H₂ → 2NH₃, if Kp = 6.0×10⁵ at 300K, what is Kc? (R = 0.0821 L·atm/mol·K)', options: ['3.6×10⁸', '6.0×10⁵', '1.0×10³', '3.6×10⁹'], answer: '3.6×10⁸', explanation: 'Kp = Kc(RT)^Δn. Δn = 2-4 = -2. Kc = Kp/(RT)^(-2) = Kp·(RT)² = 6×10⁵·(0.0821×300)² ≈ 3.6×10⁸.', topic: 'Equilibrium' },
        ]
      },
      {
        id: 'you-be-chemist',
        name: 'You Be The Chemist',
        abbr: 'YBC',
        icon: '🔭',
        description: 'CEF\'s challenge encouraging students to learn about chemistry and its real-world applications.',
        format: 'Quiz bowl format, local → state → national',
        difficulty: 'Beginner',
        teamSize: 'Individual',
        tips: ['Great entry point for younger students (grades 5-8)', 'Focus on safety, lab techniques, and everyday chemistry', 'Read the official study materials provided by CEF'],
        sampleQuestions: [
          { id: 'ybc-1', difficulty: 'Easy', question: 'What type of chemical reaction occurs when iron rusts?', options: ['Synthesis', 'Decomposition', 'Oxidation', 'Acid-base'], answer: 'Oxidation', explanation: 'Rusting is oxidation — iron reacts with oxygen and water to form iron oxide (rust).', topic: 'Chemical Reactions' },
        ]
      },
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    description: 'Biology olympiad & life sciences competitions',
    competitions: [
      {
        id: 'usabo',
        name: 'USABO',
        abbr: 'USABO',
        icon: '🦠',
        description: 'USA Biology Olympiad — selects the US team for the International Biology Olympiad (IBO).',
        format: 'Open Exam (50 MC) → Semifinal → National Finals (practical + theory)',
        difficulty: 'Elite',
        teamSize: 'Individual',
        tips: ['Campbell Biology is the gold standard textbook', 'Memorize key biochemical pathways (glycolysis, Krebs, Calvin cycle)', 'Practical round tests wet lab skills — practice pipetting and microscopy'],
        sampleQuestions: [
          { id: 'usabo-1', difficulty: 'Medium', question: 'Which enzyme catalyzes the first committed step of glycolysis?', options: ['Hexokinase', 'Phosphofructokinase-1', 'Pyruvate kinase', 'Aldolase'], answer: 'Phosphofructokinase-1', explanation: 'PFK-1 catalyzes the first committed (irreversible, regulated) step: fructose-6-P → fructose-1,6-bisP. Hexokinase is the first step but not committed.', topic: 'Biochemistry' },
          { id: 'usabo-2', difficulty: 'Hard', question: 'In C4 photosynthesis, what is the initial CO₂ acceptor?', options: ['RuBisCO', 'PEP carboxylase', 'Carbonic anhydrase', 'ATP synthase'], answer: 'PEP carboxylase', explanation: 'C4 plants use PEP carboxylase in mesophyll cells to fix CO₂ into oxaloacetate before shuttling it to bundle sheath cells for the Calvin cycle.', topic: 'Plant Biology' },
        ]
      },
      {
        id: 'science-olympiad-bio',
        name: 'Science Olympiad (Bio Events)',
        abbr: 'SciOly Bio',
        icon: '🔬',
        description: 'Science Olympiad biology events including Anatomy & Physiology, Disease Detectives, and Ecology.',
        format: 'Written tests, specimen identification, data analysis',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 2 per event',
        tips: ['Create detailed study guides for each body system (A&P)', 'Disease Detectives requires epidemiology knowledge', 'Ecology covers population dynamics and biome identification'],
        sampleQuestions: [
          { id: 'so-bio-1', difficulty: 'Medium', question: 'In epidemiology, what does "R₀" represent?', options: ['Recovery rate', 'Basic reproduction number', 'Relative risk', 'Resistance factor'], answer: 'Basic reproduction number', explanation: 'R₀ is the average number of people one infected person will transmit the disease to in a fully susceptible population.', topic: 'Disease Detectives' },
        ]
      },
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering & STEM',
    icon: '⚙️',
    description: 'Engineering design, robotics & general STEM challenges',
    competitions: [
      {
        id: 'science-olympiad-eng',
        name: 'Science Olympiad (Engineering)',
        abbr: 'SciOly Eng',
        icon: '🔧',
        description: 'Build events in Science Olympiad including bridges, vehicles, rockets, and experimental design.',
        format: 'Build + test on competition day, judged on performance and engineering notebook',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 2-3',
        tips: ['Test your builds extensively before competition', 'Keep a detailed engineering notebook', 'Understand the scoring rubric — optimize for it'],
        sampleQuestions: [
          { id: 'so-eng-1', difficulty: 'Medium', question: 'For a bridge-building event, which truss design typically has the best strength-to-weight ratio?', options: ['Warren truss', 'Pratt truss', 'Howe truss', 'It depends on loading conditions'], answer: 'It depends on loading conditions', explanation: 'The optimal truss depends on where loads are applied, span length, and material. Warren is good for uniform loads; Pratt for top-loaded bridges.', topic: 'Structural Engineering' },
        ]
      },
      {
        id: 'mathcounts',
        name: 'MATHCOUNTS',
        abbr: 'MC',
        icon: '🎯',
        description: 'National middle school math competition with Sprint, Target, Team, and Countdown rounds.',
        format: 'Sprint (30 Q/40 min), Target (8 Q/24 min), Team (10 Q/20 min), Countdown (oral)',
        difficulty: 'Beginner',
        teamSize: 'Individual + Teams of 4',
        tips: ['Sprint round: work quickly but accurately', 'Target round: 2 problems every 6 minutes — use all the time', 'Countdown round is buzzer-based — practice mental math speed'],
        sampleQuestions: [
          { id: 'mc-1', difficulty: 'Easy', question: 'What is the sum of the first 20 positive integers?', options: ['190', '200', '210', '220'], answer: '210', explanation: 'Sum = n(n+1)/2 = 20·21/2 = 210.', topic: 'Number Sense' },
        ]
      },
      {
        id: 'jets-teams',
        name: 'JETS TEAMS',
        abbr: 'JETS',
        icon: '🚀',
        description: 'Tests of Engineering Aptitude, Mathematics, and Science — team-based STEM competition.',
        format: '80 MC questions in 90 minutes, covering math, science, and engineering',
        difficulty: 'Intermediate',
        teamSize: 'Teams of 8',
        tips: ['Divide topics among team members by expertise', 'Questions span physics, chemistry, math, biology, CS, and engineering', 'Practice working quickly in a team setting'],
        sampleQuestions: [
          { id: 'jets-1', difficulty: 'Medium', question: 'A cantilever beam of length L carries a point load P at the free end. What is the maximum bending moment?', options: ['PL/2', 'PL', 'PL/4', '2PL'], answer: 'PL', explanation: 'For a cantilever with end load, max bending moment occurs at the fixed support and equals P × L.', topic: 'Engineering Mechanics' },
        ]
      },
      {
        id: 'regeneron-sts',
        name: 'Regeneron STS',
        abbr: 'STS',
        icon: '🏅',
        description: 'Science Talent Search — the nation\'s oldest and most prestigious STEM research competition for high schoolers.',
        format: 'Submit original research paper → 300 scholars → 40 finalists → presentation + judging',
        difficulty: 'Elite',
        teamSize: 'Individual',
        tips: ['Start research early — ideally junior year', 'Find a mentor (professor, industry scientist)', 'Write clearly — judges evaluate communication as well as science'],
        sampleQuestions: [
          { id: 'sts-1', difficulty: 'Hard', question: 'When designing a research project, what is the most important consideration?', options: ['Using expensive equipment', 'Having a testable hypothesis', 'Getting published first', 'Choosing a popular topic'], answer: 'Having a testable hypothesis', explanation: 'A strong research project starts with a clear, testable hypothesis that guides experimental design and data collection.', topic: 'Research Methodology' },
        ]
      },
    ]
  },
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    description: 'History knowledge competitions & academic bowls',
    competitions: [
      {
        id: 'national-history-bee',
        name: 'National History Bee',
        abbr: 'NHB',
        icon: '🐝',
        description: 'Individual buzzer-based history competition covering world and US history from ancient to modern times.',
        format: 'Buzzer rounds with tossup questions. Regional → National qualifiers.',
        difficulty: 'Intermediate',
        teamSize: 'Individual',
        tips: ['Study chronologically — build a mental timeline', 'Practice buzzing early on clues', 'Cover both US and world history equally'],
        sampleQuestions: [
          { id: 'nhb-1', difficulty: 'Easy', question: 'Which ancient civilization built the pyramids at Giza?', options: ['Roman Empire', 'Ancient Egypt', 'Mesopotamia', 'Ancient Greece'], answer: 'Ancient Egypt', explanation: 'The Great Pyramids at Giza were built by the ancient Egyptians during the Old Kingdom period, around 2580-2560 BCE.', topic: 'Ancient History' },
          { id: 'nhb-2', difficulty: 'Medium', question: 'The Treaty of Westphalia (1648) is significant because it:', options: ['Ended the American Revolution', 'Established the concept of state sovereignty', 'Created the United Nations', 'Ended World War I'], answer: 'Established the concept of state sovereignty', explanation: 'The Peace of Westphalia ended the Thirty Years\' War and established the modern concept of state sovereignty and the nation-state system in Europe.', topic: 'European History' },
          { id: 'nhb-3', difficulty: 'Hard', question: 'Which emperor issued the Edict of Milan in 313 CE?', options: ['Augustus', 'Nero', 'Constantine', 'Justinian'], answer: 'Constantine', explanation: 'Emperor Constantine issued the Edict of Milan in 313 CE, which proclaimed religious tolerance and effectively ended the persecution of Christians in the Roman Empire.', topic: 'Ancient History' },
        ]
      },
      {
        id: 'history-bowl',
        name: 'History Bowl',
        abbr: 'HB',
        icon: '🏆',
        description: 'Team-based history quiz bowl competition with buzzer rounds covering all eras and regions of history.',
        format: 'Teams of 4. Tossup + bonus questions. Preliminary rounds → playoffs → nationals.',
        difficulty: 'Advanced',
        teamSize: 'Team (4)',
        tips: ['Assign team members era/region specialties', 'Practice bonus question collaboration', 'Study primary source excerpts — they appear frequently'],
        sampleQuestions: [
          { id: 'hb-1', difficulty: 'Easy', question: 'The Magna Carta, signed in 1215, primarily limited the power of which English king?', options: ['Henry VIII', 'King John', 'Richard the Lionheart', 'Edward I'], answer: 'King John', explanation: 'The Magna Carta was signed by King John of England in 1215, forced by rebellious barons. It established the principle that the king was subject to law.', topic: 'Medieval History' },
          { id: 'hb-2', difficulty: 'Medium', question: 'The Scramble for Africa was primarily driven by European nations during which century?', options: ['17th century', '18th century', '19th century', '20th century'], answer: '19th century', explanation: 'The Scramble for Africa (1881-1914) was the rapid colonization of Africa by European powers during the late 19th century, formalized at the Berlin Conference of 1884-85.', topic: 'Imperialism' },
          { id: 'hb-3', difficulty: 'Hard', question: 'The Meiji Restoration of 1868 transformed Japan from a feudal society into a:', options: ['Communist state', 'Modern industrial nation', 'Theocracy', 'Direct democracy'], answer: 'Modern industrial nation', explanation: 'The Meiji Restoration ended the Tokugawa shogunate and rapidly modernized Japan, establishing a constitutional government, modern military, and industrial economy.', topic: 'Asian History' },
        ]
      },
      {
        id: 'we-the-people',
        name: 'We The People',
        abbr: 'WTP',
        icon: '🇺🇸',
        description: 'The premier civic education competition where students present and defend positions on constitutional principles.',
        format: 'Teams prepare 4-minute presentations on constitutional topics, then face 6-minute follow-up questioning from judges.',
        difficulty: 'Advanced',
        teamSize: 'Team (class-based)',
        tips: ['Master the Federalist Papers and key Supreme Court cases', 'Practice both prepared statements and impromptu responses', 'Connect historical principles to modern issues'],
        sampleQuestions: [
          { id: 'wtp-1', difficulty: 'Medium', question: 'The concept of "separation of powers" was most influenced by the writings of:', options: ['John Locke', 'Montesquieu', 'Thomas Hobbes', 'Jean-Jacques Rousseau'], answer: 'Montesquieu', explanation: 'Montesquieu\'s "The Spirit of the Laws" (1748) articulated the separation of powers into legislative, executive, and judicial branches, directly influencing the U.S. Constitution.', topic: 'Constitutional Principles' },
          { id: 'wtp-2', difficulty: 'Hard', question: 'In Marbury v. Madison (1803), Chief Justice Marshall established the principle of:', options: ['Executive privilege', 'Judicial review', 'Federalism', 'Habeas corpus'], answer: 'Judicial review', explanation: 'Marbury v. Madison established that the Supreme Court has the power of judicial review — the ability to declare laws unconstitutional — making it a co-equal branch of government.', topic: 'Constitutional Law' },
        ]
      },
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Geography knowledge & spatial reasoning competitions',
    competitions: [
      {
        id: 'geo-bee',
        name: 'National Geographic Bee',
        abbr: 'GeoBee',
        icon: '🗺️',
        description: 'National Geographic\'s premier geography competition testing knowledge of physical, cultural, and political geography worldwide.',
        format: 'School → State → National levels. Oral questions, map-based challenges, and final championship round.',
        difficulty: 'Intermediate',
        teamSize: 'Individual',
        tips: ['Study atlases and world maps regularly', 'Learn country capitals, rivers, and mountain ranges', 'Practice with National Geographic resources and past questions'],
        sampleQuestions: [
          { id: 'geo-1', difficulty: 'Easy', question: 'Which is the longest river in South America?', options: ['Orinoco', 'Paraná', 'Amazon', 'São Francisco'], answer: 'Amazon', explanation: 'The Amazon River, at approximately 6,400 km (3,976 miles), is the longest river in South America and the second longest in the world.', topic: 'Physical Geography' },
          { id: 'geo-2', difficulty: 'Medium', question: 'The Strait of Malacca connects the Indian Ocean to which body of water?', options: ['Pacific Ocean', 'South China Sea', 'Java Sea', 'Andaman Sea'], answer: 'South China Sea', explanation: 'The Strait of Malacca, between the Malay Peninsula and Sumatra, connects the Indian Ocean to the South China Sea and is one of the world\'s most important shipping lanes.', topic: 'Maritime Geography' },
          { id: 'geo-3', difficulty: 'Hard', question: 'Which African country is completely surrounded by South Africa?', options: ['Swaziland', 'Lesotho', 'Malawi', 'Botswana'], answer: 'Lesotho', explanation: 'Lesotho is a small, mountainous country that is entirely enclosed within the borders of South Africa, making it one of only three enclaved countries in the world.', topic: 'Political Geography' },
        ]
      },
      {
        id: 'igo',
        name: 'International Geography Olympiad',
        abbr: 'iGeo',
        icon: '🏅',
        description: 'The world\'s premier geography competition for secondary students, testing fieldwork, written analysis, and multimedia skills.',
        format: 'Three tests: Written (40%), Fieldwork (40%), Multimedia (20%). National teams of 4 students.',
        difficulty: 'Elite',
        teamSize: 'National Team (4)',
        tips: ['Master GIS and spatial analysis concepts', 'Practice fieldwork techniques — surveying, data collection', 'Study human geography patterns alongside physical geography'],
        sampleQuestions: [
          { id: 'igeo-1', difficulty: 'Medium', question: 'The demographic transition model suggests that as countries industrialize, what happens to birth and death rates?', options: ['Both increase', 'Both decrease', 'Birth rates increase, death rates decrease', 'Birth rates decrease, death rates increase'], answer: 'Both decrease', explanation: 'The demographic transition model shows that industrialization leads to declining death rates (better healthcare) followed by declining birth rates (urbanization, education), eventually stabilizing population growth.', topic: 'Human Geography' },
          { id: 'igeo-2', difficulty: 'Hard', question: 'Which type of plate boundary is responsible for the formation of the Himalayas?', options: ['Divergent', 'Convergent (continental-continental)', 'Transform', 'Convergent (oceanic-continental)'], answer: 'Convergent (continental-continental)', explanation: 'The Himalayas formed from the collision of the Indian and Eurasian tectonic plates — a continental-continental convergent boundary that has been pushing the mountains upward for about 50 million years.', topic: 'Physical Geography' },
          { id: 'igeo-3', difficulty: 'Hard', question: 'Christaller\'s Central Place Theory primarily explains the:', options: ['Distribution of natural resources', 'Spacing and hierarchy of urban settlements', 'Migration patterns of populations', 'Formation of political boundaries'], answer: 'Spacing and hierarchy of urban settlements', explanation: 'Central Place Theory explains why cities are distributed in a hierarchical pattern across a landscape, with larger cities spaced farther apart and providing more specialized services.', topic: 'Urban Geography' },
        ]
      },
    ]
  },
];
