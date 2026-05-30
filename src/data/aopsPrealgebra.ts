// Auto-generated. AoPS Pre-Algebra 90-question quiz bank.
export type AopsAnswer = 'A' | 'B' | 'C' | 'D';
export interface AopsQuestion {
  num: number;
  chapter: string;
  chapterId: string;
  prompt: string;
  options: Record<AopsAnswer, string>;
  answer: AopsAnswer;
  explanation: string;
}

export const AOPS_CHAPTERS: { id: string; name: string }[] = [
  { id: "ch1", name: "Properties of Arithmetic" },
  { id: "ch2", name: "Exponents" },
  { id: "ch3", name: "Number Theory" },
  { id: "ch4", name: "Fractions" },
  { id: "ch5", name: "Equations & Inequalities" },
  { id: "ch6", name: "Decimals" },
  { id: "ch7", name: "Ratios, Rates & Conversions" },
  { id: "ch9", name: "Percents & Square Roots" },
  { id: "ch14", name: "Statistics, Data & Probability" },
];

export const AOPS_QUESTIONS: AopsQuestion[] = [
  {
    "num": 1,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Simplify using order of operations: $8 - (3 - 7) + 2 \\times (-4)$.",
    "options": {
      "A": "4",
      "B": "$-9$",
      "C": "$-1$",
      "D": "13"
    },
    "answer": "A",
    "explanation": "Inside parens: $3-7=-4$. So $8-(-4)+2(-4)=8+4-8=4$."
  },
  {
    "num": 2,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Which property justifies $(a + b) + c = a + (b + c)$?",
    "options": {
      "A": "Commutative of addition",
      "B": "Associative of addition",
      "C": "Distributive",
      "D": "Additive identity"
    },
    "answer": "B",
    "explanation": "Associative property regroups terms without changing their order."
  },
  {
    "num": 3,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Use the distributive property to compute $15 \\cdot 7 - 15 \\cdot 3$.",
    "options": {
      "A": "45",
      "B": "75",
      "C": "60",
      "D": "105"
    },
    "answer": "C",
    "explanation": "$15(7-3)=15\\cdot 4=60$."
  },
  {
    "num": 4,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Evaluate $-(-(-6)) + 4 \\cdot (-2)$.",
    "options": {
      "A": "$-2$",
      "B": "2",
      "C": "10",
      "D": "$-14$"
    },
    "answer": "D",
    "explanation": "$-(-(-6))=-6$ and $4(-2)=-8$, so $-6+(-8)=-14$."
  },
  {
    "num": 5,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Use the distributive property: $12(3 + 5) - 4(3 + 5)$.",
    "options": {
      "A": "64",
      "B": "48",
      "C": "56",
      "D": "96"
    },
    "answer": "A",
    "explanation": "$(12-4)(3+5)=8\\cdot 8=64$."
  },
  {
    "num": 6,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Find $1 + 2 + 3 + \\dots + 25$.",
    "options": {
      "A": "300",
      "B": "325",
      "C": "350",
      "D": "375"
    },
    "answer": "B",
    "explanation": "Sum $=n(n+1)/2=25\\cdot 26/2=325$."
  },
  {
    "num": 7,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Compute mentally: $999 \\cdot 47 + 999 \\cdot 3$.",
    "options": {
      "A": "47,000",
      "B": "49,995",
      "C": "49,950",
      "D": "50,000"
    },
    "answer": "C",
    "explanation": "$999(47+3)=999\\cdot 50=49{,}950$."
  },
  {
    "num": 8,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Which equals 0 by the additive inverse property?",
    "options": {
      "A": "$7 \\cdot 0$",
      "B": "$7 - 0$",
      "C": "$0/7$",
      "D": "$7 + (-7)$"
    },
    "answer": "D",
    "explanation": "Additive inverse: $a+(-a)=0$."
  },
  {
    "num": 9,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Evaluate $18 \\div 3 \\cdot 4 - 2$ (left-to-right after parens/exponents).",
    "options": {
      "A": "22",
      "B": "14",
      "C": "18",
      "D": "26"
    },
    "answer": "A",
    "explanation": "$18/3=6$, then $6\\cdot 4=24$, then $24-2=22$."
  },
  {
    "num": 10,
    "chapter": "Properties of Arithmetic",
    "chapterId": "ch1",
    "prompt": "Use the distributive property: $9 \\cdot 13 - 9 \\cdot 4$.",
    "options": {
      "A": "63",
      "B": "81",
      "C": "72",
      "D": "117"
    },
    "answer": "B",
    "explanation": "$9(13-4)=9\\cdot 9=81$."
  },
  {
    "num": 11,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Simplify $2^3 \\cdot 2^5 \\div 2^2$.",
    "options": {
      "A": "$2^5$",
      "B": "$2^7$",
      "C": "$2^6$",
      "D": "$2^8$"
    },
    "answer": "C",
    "explanation": "Add exponents in product, subtract for quotient: $3+5-2=6$."
  },
  {
    "num": 12,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Evaluate $(-3)^4$.",
    "options": {
      "A": "$-81$",
      "B": "$-27$",
      "C": "27",
      "D": "81"
    },
    "answer": "D",
    "explanation": "Even exponent $\\Rightarrow$ positive: $3\\cdot 3\\cdot 3\\cdot 3=81$."
  },
  {
    "num": 13,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Compute $5^0 \\cdot 3^2 - 2^3$.",
    "options": {
      "A": "1",
      "B": "7",
      "C": "9",
      "D": "17"
    },
    "answer": "A",
    "explanation": "$5^0=1$, so $1\\cdot 9-8=1$."
  },
  {
    "num": 14,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Write 0.00081 using powers of 3 and 10.",
    "options": {
      "A": "$3^4 \\times 10^{-4}$",
      "B": "$3^4 \\times 10^{-5}$",
      "C": "$3^3 \\times 10^{-4}$",
      "D": "$3^5 \\times 10^{-5}$"
    },
    "answer": "B",
    "explanation": "$0.00081=81/100000=3^4/10^5=3^4\\times 10^{-5}$."
  },
  {
    "num": 15,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Simplify $(2^2)^3 \\cdot 3^0$.",
    "options": {
      "A": "8",
      "B": "16",
      "C": "64",
      "D": "32"
    },
    "answer": "C",
    "explanation": "$(2^2)^3=2^6=64$; $3^0=1$; product 64."
  },
  {
    "num": 16,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Evaluate the negative exponent $4^{-2}$.",
    "options": {
      "A": "$-16$",
      "B": "1/8",
      "C": "$-1/8$",
      "D": "1/16"
    },
    "answer": "D",
    "explanation": "$a^{-n}=1/a^n$, so $4^{-2}=1/16$."
  },
  {
    "num": 17,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Compute $2^5 + 2^4 + 2^3$.",
    "options": {
      "A": "56",
      "B": "40",
      "C": "48",
      "D": "64"
    },
    "answer": "A",
    "explanation": "$32+16+8=56$."
  },
  {
    "num": 18,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Which is largest: $3^3, 4^2, 5^2, 2^5$?",
    "options": {
      "A": "$3^3 = 27$",
      "B": "$2^5 = 32$",
      "C": "$4^2 = 16$",
      "D": "$5^2 = 25$"
    },
    "answer": "B",
    "explanation": "$27, 16, 25, 32 \\Rightarrow 2^5$ wins."
  },
  {
    "num": 19,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Evaluate $(10^2 - 10) \\div 10^1$.",
    "options": {
      "A": "8",
      "B": "10",
      "C": "9",
      "D": "11"
    },
    "answer": "C",
    "explanation": "$(100-10)/10=90/10=9$."
  },
  {
    "num": 20,
    "chapter": "Exponents",
    "chapterId": "ch2",
    "prompt": "Evaluate $(-2)^3 \\cdot (-2)^2$.",
    "options": {
      "A": "32",
      "B": "$-16$",
      "C": "16",
      "D": "$-32$"
    },
    "answer": "D",
    "explanation": "$(-2)^5=-32$ because the exponent is odd."
  },
  {
    "num": 21,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Find gcd(84, 56).",
    "options": {
      "A": "28",
      "B": "7",
      "C": "14",
      "D": "21"
    },
    "answer": "A",
    "explanation": "$84=2^2\\cdot 3\\cdot 7$, $56=2^3\\cdot 7 \\Rightarrow$ gcd $=2^2\\cdot 7=28$."
  },
  {
    "num": 22,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Find lcm(12, 18).",
    "options": {
      "A": "24",
      "B": "36",
      "C": "72",
      "D": "216"
    },
    "answer": "B",
    "explanation": "$12=2^2\\cdot 3$, $18=2\\cdot 3^2 \\Rightarrow$ lcm $=2^2\\cdot 3^2=36$."
  },
  {
    "num": 23,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Prime factorization of 180.",
    "options": {
      "A": "$2^3 \\cdot 3^2 \\cdot 5$",
      "B": "$2^2 \\cdot 3 \\cdot 5^2$",
      "C": "$2^2 \\cdot 3^2 \\cdot 5$",
      "D": "$2 \\cdot 3^2 \\cdot 5^2$"
    },
    "answer": "C",
    "explanation": "$180=4\\cdot 45=4\\cdot 9\\cdot 5=2^2\\cdot 3^2\\cdot 5$."
  },
  {
    "num": 24,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "How many positive divisors does 60 have?",
    "options": {
      "A": "8",
      "B": "10",
      "C": "16",
      "D": "12"
    },
    "answer": "D",
    "explanation": "$60=2^2\\cdot 3\\cdot 5$; divisor count $=3\\cdot 2\\cdot 2=12$."
  },
  {
    "num": 25,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Is 91 prime?",
    "options": {
      "A": "No, $91 = 7 \\cdot 13$",
      "B": "Yes",
      "C": "No, $91 = 11 \\cdot 9$",
      "D": "No, $91 = 3 \\cdot 31$"
    },
    "answer": "A",
    "explanation": "$91=7\\cdot 13$, so composite."
  },
  {
    "num": 26,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Find gcd(105, 165).",
    "options": {
      "A": "5",
      "B": "15",
      "C": "7",
      "D": "21"
    },
    "answer": "B",
    "explanation": "$105=3\\cdot 5\\cdot 7$, $165=3\\cdot 5\\cdot 11 \\Rightarrow$ gcd $=15$."
  },
  {
    "num": 27,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "How many primes are strictly between 20 and 40?",
    "options": {
      "A": "3",
      "B": "5",
      "C": "4",
      "D": "6"
    },
    "answer": "C",
    "explanation": "$23, 29, 31, 37 \\Rightarrow 4$ primes."
  },
  {
    "num": 28,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Find lcm(8, 20, 30).",
    "options": {
      "A": "60",
      "B": "180",
      "C": "240",
      "D": "120"
    },
    "answer": "D",
    "explanation": "$8=2^3$, $20=2^2\\cdot 5$, $30=2\\cdot 3\\cdot 5 \\Rightarrow$ lcm $=120$."
  },
  {
    "num": 29,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "Which prime divides $2^{10} - 1 = 1023$?",
    "options": {
      "A": "3",
      "B": "5",
      "C": "7",
      "D": "11"
    },
    "answer": "A",
    "explanation": "$1023=3\\cdot 11\\cdot 31$, so 3 divides it."
  },
  {
    "num": 30,
    "chapter": "Number Theory",
    "chapterId": "ch3",
    "prompt": "How many positive integers less than 15 are relatively prime to 15?",
    "options": {
      "A": "6",
      "B": "8",
      "C": "7",
      "D": "9"
    },
    "answer": "B",
    "explanation": "$\\phi(15)=8$ (namely 1,2,4,7,8,11,13,14)."
  },
  {
    "num": 31,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Add $3/4 + 5/6$.",
    "options": {
      "A": "8/5",
      "B": "19/24",
      "C": "19/12",
      "D": "$1\\,7/12$"
    },
    "answer": "C",
    "explanation": "LCD 12: $9/12+10/12=19/12$."
  },
  {
    "num": 32,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Multiply $2\\,1/3 \\times 3/7$.",
    "options": {
      "A": "10/7",
      "B": "7/3",
      "C": "$1\\,1/7$",
      "D": "1"
    },
    "answer": "D",
    "explanation": "$(7/3)(3/7)=21/21=1$."
  },
  {
    "num": 33,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Compute $5/8 \\div 3/4$.",
    "options": {
      "A": "5/6",
      "B": "15/32",
      "C": "2/3",
      "D": "3/5"
    },
    "answer": "A",
    "explanation": "$5/8\\cdot 4/3=20/24=5/6$."
  },
  {
    "num": 34,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Simplify $(1 + 1/2) \\div (1 - 1/3)$.",
    "options": {
      "A": "5/4",
      "B": "9/4",
      "C": "3/2",
      "D": "2"
    },
    "answer": "B",
    "explanation": "$(3/2)/(2/3)=(3/2)(3/2)=9/4$."
  },
  {
    "num": 35,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Subtract $7/9 - 4/15$.",
    "options": {
      "A": "11/45",
      "B": "19/45",
      "C": "23/45",
      "D": "31/45"
    },
    "answer": "C",
    "explanation": "LCD 45: $35/45-12/45=23/45$."
  },
  {
    "num": 36,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Compute $4\\frac{2}{5} - 1\\frac{7}{8}$.",
    "options": {
      "A": "$2\\frac{11}{40}$",
      "B": "$2\\frac{19}{40}$",
      "C": "$3\\frac{3}{40}$",
      "D": "$2\\frac{21}{40}$"
    },
    "answer": "D",
    "explanation": "$22/5-15/8=176/40-75/40=101/40=2\\,21/40$."
  },
  {
    "num": 37,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Reciprocal of $3\\frac{1}{4}$.",
    "options": {
      "A": "$4/13$",
      "B": "$13/4$",
      "C": "$3/13$",
      "D": "$13/3$"
    },
    "answer": "A",
    "explanation": "$3\\,1/4=13/4$, so reciprocal $=4/13$."
  },
  {
    "num": 38,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Which fraction is the smallest: $5/7,\\ 7/9,\\ 8/11,\\ 4/5$?",
    "options": {
      "A": "$7/9$",
      "B": "$5/7$",
      "C": "$8/11$",
      "D": "$4/5$"
    },
    "answer": "B",
    "explanation": "Decimals: $0.714, 0.778, 0.727, 0.800 \\Rightarrow 5/7$ smallest."
  },
  {
    "num": 39,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Compute $(2/3)$ of $(5/4)$ of 36.",
    "options": {
      "A": "20",
      "B": "45",
      "C": "30",
      "D": "60"
    },
    "answer": "C",
    "explanation": "$(2/3)(5/4)(36)=30$."
  },
  {
    "num": 40,
    "chapter": "Fractions",
    "chapterId": "ch4",
    "prompt": "Solve $x/5 + 1/2 = 7/10$.",
    "options": {
      "A": "$1/2$",
      "B": "$3/2$",
      "C": "2",
      "D": "1"
    },
    "answer": "D",
    "explanation": "$x/5=7/10-5/10=1/5$, so $x=1$."
  },
  {
    "num": 41,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve $3x - 7 = 14$.",
    "options": {
      "A": "$x = 7$",
      "B": "$x = 5$",
      "C": "$x = 6$",
      "D": "$x = 21/3$"
    },
    "answer": "A",
    "explanation": "$3x=21$, so $x=7$."
  },
  {
    "num": 42,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve $2(x + 4) = 5x - 3$.",
    "options": {
      "A": "$x = 5$",
      "B": "$x = 11/3$",
      "C": "$x = 7$",
      "D": "$x = 11$"
    },
    "answer": "B",
    "explanation": "$2x+8=5x-3 \\Rightarrow 3x=11 \\Rightarrow x=11/3$."
  },
  {
    "num": 43,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve the inequality $4x + 2 > 18$.",
    "options": {
      "A": "$x \\ge 4$",
      "B": "$x > 3$",
      "C": "$x > 4$",
      "D": "$x < 4$"
    },
    "answer": "C",
    "explanation": "$4x>16 \\Rightarrow x>4$ (strict)."
  },
  {
    "num": 44,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve $|2x - 1| = 7$.",
    "options": {
      "A": "$x=3$ or $x=-4$",
      "B": "$x=4$ only",
      "C": "$x=-3$ only",
      "D": "$x=4$ or $x=-3$"
    },
    "answer": "D",
    "explanation": "$2x-1=\\pm 7$ gives $x=4$ or $x=-3$."
  },
  {
    "num": 45,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Twice a number minus 5 equals 11. Find the number.",
    "options": {
      "A": "8",
      "B": "6",
      "C": "7",
      "D": "9"
    },
    "answer": "A",
    "explanation": "$2n-5=11 \\Rightarrow n=8$."
  },
  {
    "num": 46,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve $5 - 3(x + 1) \\le 2$.",
    "options": {
      "A": "$x \\le 0$",
      "B": "$x \\ge 0$",
      "C": "$x \\le 2/3$",
      "D": "$x \\ge 2/3$"
    },
    "answer": "B",
    "explanation": "$5-3x-3\\le 2 \\Rightarrow -3x\\le 0 \\Rightarrow x\\ge 0$."
  },
  {
    "num": 47,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve the system $x + y = 10,\\ x - y = 4$.",
    "options": {
      "A": "$(5, 5)$",
      "B": "$(6, 4)$",
      "C": "$(7, 3)$",
      "D": "$(8, 2)$"
    },
    "answer": "C",
    "explanation": "Add: $2x=14, x=7, y=3$."
  },
  {
    "num": 48,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve $(1/2)x + 3/4 = 5/4$.",
    "options": {
      "A": "$x = 1/2$",
      "B": "$x = 2$",
      "C": "$x = 3$",
      "D": "$x = 1$"
    },
    "answer": "D",
    "explanation": "$(1/2)x=1/2$, so $x=1$."
  },
  {
    "num": 49,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve $2 < 3x - 1 < 8$.",
    "options": {
      "A": "$1 < x < 3$",
      "B": "$0 < x < 3$",
      "C": "$1 < x \\le 3$",
      "D": "$1 \\le x \\le 3$"
    },
    "answer": "A",
    "explanation": "Add 1: $3<3x<9$, divide: $1<x<3$."
  },
  {
    "num": 50,
    "chapter": "Equations & Inequalities",
    "chapterId": "ch5",
    "prompt": "Solve for $y$: $2y = 8 - 3(y + 1)$.",
    "options": {
      "A": "$y = -1$",
      "B": "$y = 1$",
      "C": "$y = 2$",
      "D": "$y = 5/2$"
    },
    "answer": "B",
    "explanation": "$2y=5-3y \\Rightarrow 5y=5 \\Rightarrow y=1$."
  },
  {
    "num": 51,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Compute $0.75 + 1.2 - 0.375$.",
    "options": {
      "A": "1.2",
      "B": "1.95",
      "C": "1.575",
      "D": "2.325"
    },
    "answer": "C",
    "explanation": "$0.75+1.2=1.95$, then $1.95-0.375=1.575$."
  },
  {
    "num": 52,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Compute $0.8 \\times 0.25 \\times 4$.",
    "options": {
      "A": "0.2",
      "B": "0.5",
      "C": "1.0",
      "D": "0.8"
    },
    "answer": "D",
    "explanation": "$0.8\\times 0.25=0.2$, then $0.2\\times 4=0.8$."
  },
  {
    "num": 53,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Compute $4.8 \\div 0.6$.",
    "options": {
      "A": "8",
      "B": "0.8",
      "C": "80",
      "D": "0.08"
    },
    "answer": "A",
    "explanation": "Multiply both by 10: $48\\div 6=8$."
  },
  {
    "num": 54,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Express $0.\\overline{45}$ as a fraction.",
    "options": {
      "A": "9/20",
      "B": "5/11",
      "C": "45/100",
      "D": "5/9"
    },
    "answer": "B",
    "explanation": "$99x=45 \\Rightarrow x=5/11$."
  },
  {
    "num": 55,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Compute 12% of 250.",
    "options": {
      "A": "18",
      "B": "25",
      "C": "30",
      "D": "32"
    },
    "answer": "C",
    "explanation": "$0.12\\times 250=30$."
  },
  {
    "num": 56,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Round 3.14159 to the hundredths place.",
    "options": {
      "A": "3.142",
      "B": "3.15",
      "C": "3.141",
      "D": "3.14"
    },
    "answer": "D",
    "explanation": "Next digit is 1 (<5), so 3.14."
  },
  {
    "num": 57,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Compute $0.6 \\times (1.5 + 2.5)$.",
    "options": {
      "A": "2.4",
      "B": "1.8",
      "C": "3.0",
      "D": "4.2"
    },
    "answer": "A",
    "explanation": "$1.5+2.5=4$, then $0.6\\times 4=2.4$."
  },
  {
    "num": 58,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Which is largest: 0.099, 0.101, 0.1, 0.098?",
    "options": {
      "A": "0.098",
      "B": "0.101",
      "C": "0.099",
      "D": "0.1"
    },
    "answer": "B",
    "explanation": "$0.101>0.100>0.099>0.098$."
  },
  {
    "num": 59,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Compute $5.25 \\div 0.75$.",
    "options": {
      "A": "6",
      "B": "6.5",
      "C": "7",
      "D": "7.5"
    },
    "answer": "C",
    "explanation": "$525\\div 75=7$."
  },
  {
    "num": 60,
    "chapter": "Decimals",
    "chapterId": "ch6",
    "prompt": "Scientific notation: $4.5 \\times 10^3 + 2.5 \\times 10^2$.",
    "options": {
      "A": "$4.7 \\times 10^3$",
      "B": "$4.75 \\times 10^2$",
      "C": "$4.75 \\times 10^4$",
      "D": "$4.75 \\times 10^3$"
    },
    "answer": "D",
    "explanation": "$4500+250=4750=4.75\\times 10^3$."
  },
  {
    "num": 61,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Split 40 in the ratio 3 : 5.",
    "options": {
      "A": "15 : 25",
      "B": "12 : 28",
      "C": "12 : 20",
      "D": "18 : 22"
    },
    "answer": "A",
    "explanation": "Each share $=40/8=5$: parts $15$ and $25$."
  },
  {
    "num": 62,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "A car covers 240 km in 4 hours. Average speed?",
    "options": {
      "A": "40 km/h",
      "B": "60 km/h",
      "C": "50 km/h",
      "D": "80 km/h"
    },
    "answer": "B",
    "explanation": "$240/4=60$ km/h."
  },
  {
    "num": 63,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Convert 2.5 L to mL.",
    "options": {
      "A": "25",
      "B": "250",
      "C": "2,500",
      "D": "25,000"
    },
    "answer": "C",
    "explanation": "$1\\text{ L}=1000\\text{ mL}$, so 2{,}500 mL."
  },
  {
    "num": 64,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Map 1 cm : 5 km. Real distance for 12 cm?",
    "options": {
      "A": "40 km",
      "B": "55 km",
      "C": "65 km",
      "D": "60 km"
    },
    "answer": "D",
    "explanation": "$12\\times 5=60$ km."
  },
  {
    "num": 65,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Solve $3/8 = x/48$.",
    "options": {
      "A": "18",
      "B": "12",
      "C": "16",
      "D": "24"
    },
    "answer": "A",
    "explanation": "$x=48\\times 3/8=18$."
  },
  {
    "num": 66,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Box of 6 items costs \\$18. Unit price?",
    "options": {
      "A": "\\$2",
      "B": "\\$3",
      "C": "\\$2.50",
      "D": "\\$3.50"
    },
    "answer": "B",
    "explanation": "$18/6=\\$3$ each."
  },
  {
    "num": 67,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Increase 200 by 15%.",
    "options": {
      "A": "215",
      "B": "220",
      "C": "230",
      "D": "225"
    },
    "answer": "C",
    "explanation": "$200\\times 1.15=230$."
  },
  {
    "num": 68,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "If 5 apples cost \\$2, how many apples cost \\$10?",
    "options": {
      "A": "15",
      "B": "20",
      "C": "30",
      "D": "25"
    },
    "answer": "D",
    "explanation": "$\\$10/\\$2=5$ groups of 5 apples $=25$."
  },
  {
    "num": 69,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "Convert 45 mph to km/h (use 1 mi $\\approx$ 1.6 km).",
    "options": {
      "A": "72",
      "B": "64",
      "C": "70",
      "D": "80"
    },
    "answer": "A",
    "explanation": "$45\\times 1.6=72$ km/h."
  },
  {
    "num": 70,
    "chapter": "Ratios, Rates & Conversions",
    "chapterId": "ch7",
    "prompt": "$a:b:c=2:3:5$ and $a+b+c=50$. Largest part?",
    "options": {
      "A": "10",
      "B": "25",
      "C": "15",
      "D": "20"
    },
    "answer": "B",
    "explanation": "Each share $=5$, largest $=5\\times 5=25$."
  },
  {
    "num": 71,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Compute 35% of 420.",
    "options": {
      "A": "120",
      "B": "135",
      "C": "147",
      "D": "150"
    },
    "answer": "C",
    "explanation": "$0.35\\times 420=147$."
  },
  {
    "num": 72,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "24 is what percent of 80?",
    "options": {
      "A": "20%",
      "B": "25%",
      "C": "35%",
      "D": "30%"
    },
    "answer": "D",
    "explanation": "$24/80=0.30=30\\%$."
  },
  {
    "num": 73,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Compute $\\sqrt{64}+\\sqrt{81}$.",
    "options": {
      "A": "17",
      "B": "15",
      "C": "23",
      "D": "145"
    },
    "answer": "A",
    "explanation": "$8+9=17$."
  },
  {
    "num": 74,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Decrease 120 by 25%.",
    "options": {
      "A": "80",
      "B": "90",
      "C": "95",
      "D": "100"
    },
    "answer": "B",
    "explanation": "$120-30=90$."
  },
  {
    "num": 75,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Simplify $\\sqrt{36/49}$.",
    "options": {
      "A": "7/6",
      "B": "18/7",
      "C": "6/7",
      "D": "36/7"
    },
    "answer": "C",
    "explanation": "$\\sqrt{36}/\\sqrt{49}=6/7$."
  },
  {
    "num": 76,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Simple interest on \\$500 at 4% for 2 years.",
    "options": {
      "A": "\\$20",
      "B": "\\$42",
      "C": "\\$80",
      "D": "\\$40"
    },
    "answer": "D",
    "explanation": "$I=Prt=500\\cdot 0.04\\cdot 2=\\$40$."
  },
  {
    "num": 77,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Compute $\\sqrt{121}\\times\\sqrt{4}$.",
    "options": {
      "A": "22",
      "B": "11",
      "C": "44",
      "D": "242"
    },
    "answer": "A",
    "explanation": "$11\\times 2=22$."
  },
  {
    "num": 78,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "80 is what percent of 200?",
    "options": {
      "A": "25%",
      "B": "40%",
      "C": "30%",
      "D": "50%"
    },
    "answer": "B",
    "explanation": "$80/200=0.40=40\\%$."
  },
  {
    "num": 79,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Approximate $\\sqrt{50}$.",
    "options": {
      "A": "6.93",
      "B": "7.00",
      "C": "7.07",
      "D": "7.20"
    },
    "answer": "C",
    "explanation": "$\\sqrt{50}=5\\sqrt{2}\\approx 7.07$."
  },
  {
    "num": 80,
    "chapter": "Percents & Square Roots",
    "chapterId": "ch9",
    "prompt": "Percent change from 50 to 65.",
    "options": {
      "A": "15%",
      "B": "25%",
      "C": "35%",
      "D": "30%"
    },
    "answer": "D",
    "explanation": "$(65-50)/50=30\\%$."
  },
  {
    "num": 81,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Mean of 12, 15, 18, 9, 21.",
    "options": {
      "A": "15",
      "B": "14",
      "C": "16",
      "D": "17"
    },
    "answer": "A",
    "explanation": "Sum 75 / 5 = 15."
  },
  {
    "num": 82,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Median of 3, 7, 8, 12, 2, 10.",
    "options": {
      "A": "7",
      "B": "7.5",
      "C": "8",
      "D": "9"
    },
    "answer": "B",
    "explanation": "Sorted: 2,3,7,8,10,12. Middle pair (7,8) $\\Rightarrow$ 7.5."
  },
  {
    "num": 83,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Mode of 4, 4, 5, 6, 4, 7.",
    "options": {
      "A": "5",
      "B": "6",
      "C": "4",
      "D": "No mode"
    },
    "answer": "C",
    "explanation": "4 appears three times."
  },
  {
    "num": 84,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Range of 45, 52, 38, 61.",
    "options": {
      "A": "16",
      "B": "17",
      "C": "29",
      "D": "23"
    },
    "answer": "D",
    "explanation": "$61-38=23$."
  },
  {
    "num": 85,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Probability of an even number on a fair 6-sided die.",
    "options": {
      "A": "1/2",
      "B": "1/6",
      "C": "1/3",
      "D": "2/3"
    },
    "answer": "A",
    "explanation": "Evens {2,4,6}; $3/6=1/2$."
  },
  {
    "num": 86,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Five bars sum to 120. Mean height?",
    "options": {
      "A": "20",
      "B": "24",
      "C": "25",
      "D": "30"
    },
    "answer": "B",
    "explanation": "$120/5=24$."
  },
  {
    "num": 87,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Which fits a data set with low standard deviation?",
    "options": {
      "A": "Many modes",
      "B": "Large spread",
      "C": "Values close to the mean",
      "D": "High range"
    },
    "answer": "C",
    "explanation": "Low SD means small dispersion around the mean."
  },
  {
    "num": 88,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Where is Q1 (25%) in an ordered list of 20 values (rank $n\\cdot p/100$)?",
    "options": {
      "A": "4th value",
      "B": "10th value",
      "C": "15th value",
      "D": "5th-6th value"
    },
    "answer": "D",
    "explanation": "$20\\times 0.25=5$, so Q1 is between 5th and 6th."
  },
  {
    "num": 89,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Group A: 10 students, mean 80. Group B: 10 students, mean 90. Combined mean?",
    "options": {
      "A": "85",
      "B": "82",
      "C": "87",
      "D": "88"
    },
    "answer": "A",
    "explanation": "$(800+900)/20=85$."
  },
  {
    "num": 90,
    "chapter": "Statistics, Data & Probability",
    "chapterId": "ch14",
    "prompt": "Spinner red prob 1/4. Probability of red on all three independent spins?",
    "options": {
      "A": "1/12",
      "B": "1/64",
      "C": "1/16",
      "D": "3/4"
    },
    "answer": "B",
    "explanation": "$(1/4)^3=1/64$."
  }
];
