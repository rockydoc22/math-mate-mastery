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

export const MathText = ({ text, className = '' }: MathTextProps) => {
  // Check if text contains explicit LaTeX delimiters
  const hasLatexDelimiters = text.includes('$');
  
  if (hasLatexDelimiters) {
    // Parse and render LaTeX expressions
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    
    const regex = new RegExp(latexPattern);
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
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
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return <span className={className}>{parts}</span>;
  }
  
  // Check if text looks like it contains math
  const hasMathSymbols = /[+\-*/=<>≤≥≠^√πθ]|\d+\/\d+|x\^|y\^/.test(text);
  
  if (!hasMathSymbols) {
    return <span className={className}>{text}</span>;
  }
  
  // Try to render as inline math if it looks like a formula
  const isLikelyFormula = /^[^.!?]*[=<>≤≥≠][^.!?]*$/.test(text) || 
                          /^\s*\d+[+\-*/]\d+/.test(text) ||
                          /[xy]\s*[=<>+\-*/^]/.test(text);
  
  if (isLikelyFormula && text.length < 100) {
    try {
      const latex = convertToLatex(text);
      return <InlineMath math={latex} />;
    } catch {
      return <span className={className}>{text}</span>;
    }
  }
  
  return <span className={className}>{text}</span>;
};

export default MathText;
