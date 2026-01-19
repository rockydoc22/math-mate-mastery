import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathTextProps {
  text: string;
  className?: string;
}

// Regex to find LaTeX expressions: $...$ for inline, $$...$$ for block
const latexPattern = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$/g;

// Convert common math notation to LaTeX
const convertToLatex = (text: string): string => {
  return text
    // Fix "+ -" pattern to "- " (common data issue)
    .replace(/\+ -/g, '- ')
    // Fractions like 1/2 or (x+1)/(x-1)
    .replace(/\(([^)]+)\)\/\(([^)]+)\)/g, '\\frac{$1}{$2}')
    // Square roots
    .replace(/sqrt\(([^)]+)\)/gi, '\\sqrt{$1}')
    .replace(/√\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/√(\d+)/g, '\\sqrt{$1}')
    // Exponents like x^2 or x^(n+1)
    .replace(/\^(\d+)/g, '^{$1}')
    .replace(/\^\(([^)]+)\)/g, '^{$1}')
    // Subscripts like x_1 or x_(n+1)
    .replace(/_(\d+)/g, '_{$1}')
    .replace(/_\(([^)]+)\)/g, '_{$1}')
    // Greek letters
    .replace(/\bpi\b/gi, '\\pi')
    .replace(/\btheta\b/gi, '\\theta')
    .replace(/\balpha\b/gi, '\\alpha')
    .replace(/\bbeta\b/gi, '\\beta')
    // Inequalities
    .replace(/≤/g, '\\leq')
    .replace(/≥/g, '\\geq')
    .replace(/<=/g, '\\leq')
    .replace(/>=/g, '\\geq')
    .replace(/≠/g, '\\neq')
    // Plus/minus
    .replace(/±/g, '\\pm')
    // Infinity
    .replace(/∞/g, '\\infty')
    // Multiplication dot
    .replace(/⋅/g, '\\cdot')
    .replace(/×/g, '\\times');
};

// Fix "+ -" pattern in regular text too
const fixSpacingIssues = (text: string): string => {
  return text.replace(/\+ -/g, '- ');
};

export const MathText = ({ text, className = '' }: MathTextProps) => {
  // First fix common spacing issues
  const fixedText = fixSpacingIssues(text);
  
  // Check if text contains explicit LaTeX delimiters
  const hasLatexDelimiters = fixedText.includes('$');
  
  if (hasLatexDelimiters) {
    // Parse and render LaTeX expressions
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    
    const regex = new RegExp(latexPattern);
    while ((match = regex.exec(fixedText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(fixedText.slice(lastIndex, match.index));
      }
      
      // Add the LaTeX element
      const isBlock = match[0].startsWith('$$');
      const latex = match[1] || match[2]; // Block or inline content
      
      try {
        if (isBlock) {
          parts.push(<BlockMath key={key++} math={latex} />);
        } else {
          parts.push(<InlineMath key={key++} math={latex} />);
        }
      } catch {
        // If LaTeX parsing fails, show original text
        parts.push(match[0]);
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < fixedText.length) {
      parts.push(fixedText.slice(lastIndex));
    }
    
    return <span className={className}>{parts}</span>;
  }
  
  // Check if text looks like it contains math
  const hasMathSymbols = /[+\-*/=<>≤≥≠^√πθ]|\d+\/\d+|x\^|y\^/.test(fixedText);
  
  if (!hasMathSymbols) {
    return <span className={className}>{fixedText}</span>;
  }
  
  // For question text that contains words, DON'T render as LaTeX - just show as-is
  // Only render as LaTeX if it's a pure formula (no English words)
  // Extended list to catch more natural language patterns
  const hasEnglishWords = /\b(what|is|the|of|line|find|solve|which|if|when|how|determine|all|real|numbers|except|domain|range|function|value|answer|equal|greater|less|than|between|and|or|for|with|that|are|this|each|from|into|where|given|following|true|false|statement|equation|expression|simplify|evaluate|calculate|percent|total|sum|difference|product|quotient|result|population|increase|decrease|yearly|annual|monthly|daily|town|city)\b/i.test(fixedText);
  
  if (hasEnglishWords) {
    // Return plain text - don't try to parse as math formula
    return <span className={className}>{fixedText}</span>;
  }
  
  // Also check if text is too long to be a formula (sentences are not formulas)
  if (fixedText.length > 50) {
    return <span className={className}>{fixedText}</span>;
  }
  
  // Try to render as inline math ONLY if it looks like a pure formula (no words)
  // Must be a short expression with math operators
  const isLikelyFormula = /^[^a-zA-Z]*[=<>≤≥≠][^a-zA-Z]*$/.test(fixedText) || 
                          /^\s*-?\d+[+\-*/]\d+/.test(fixedText) ||
                          /^[xy]\s*[=<>+\-*/^]/.test(fixedText);
  
  if (isLikelyFormula && fixedText.length < 50) {
    try {
      const latex = convertToLatex(fixedText);
      return <InlineMath math={latex} />;
    } catch {
      return <span className={className}>{fixedText}</span>;
    }
  }
  
  return <span className={className}>{fixedText}</span>;
};

export default MathText;
