/**
 * Motivational quotes for session encouragement
 * Shown after wrong answers, at session start/end, and in daily challenges
 */

export interface MotivationalQuote {
  text: string;
  author: string;
  category: 'perseverance' | 'growth' | 'success' | 'learning' | 'courage';
}

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  // Perseverance
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: 'perseverance' },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: 'perseverance' },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: 'perseverance' },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: 'perseverance' },
  { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot", category: 'perseverance' },
  
  // Growth
  { text: "The mind is not a vessel to be filled but a fire to be kindled.", author: "Plutarch", category: 'growth' },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela", category: 'growth' },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi", category: 'growth' },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", category: 'growth' },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King", category: 'growth' },
  
  // Success
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: 'success' },
  { text: "Don't wish it were easier. Wish you were better.", author: "Jim Rohn", category: 'success' },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: 'success' },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: 'success' },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: 'success' },
  
  // Learning
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: 'learning' },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: 'learning' },
  { text: "Mistakes are proof that you are trying.", author: "Jennifer Lim", category: 'learning' },
  { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy", category: 'learning' },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss", category: 'learning' },
  
  // Courage
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: 'courage' },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: 'courage' },
  { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela", category: 'courage' },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", category: 'courage' },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt", category: 'courage' },
];

// Deterministic daily quote
export function getDailyQuote(): MotivationalQuote {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return MOTIVATIONAL_QUOTES[seed % MOTIVATIONAL_QUOTES.length];
}

// Random quote for wrong answers (specific category)
export function getEncouragementQuote(): MotivationalQuote {
  const categories: MotivationalQuote['category'][] = ['perseverance', 'learning', 'courage'];
  const filtered = MOTIVATIONAL_QUOTES.filter(q => categories.includes(q.category));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Random success quote
export function getSuccessQuote(): MotivationalQuote {
  const filtered = MOTIVATIONAL_QUOTES.filter(q => q.category === 'success' || q.category === 'growth');
  return filtered[Math.floor(Math.random() * filtered.length)];
}
