import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

/**
 * Renders a string that contains inline LaTeX delimited by single `$...$`.
 * Everything outside `$...$` is plain text; segments inside render with KaTeX.
 */
export function MathText({ children, className }: { children: string; className?: string }) {
  const parts: React.ReactNode[] = [];
  const text = children ?? "";
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const start = text.indexOf("$", i);
    if (start === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (start > i) parts.push(text.slice(i, start));
    const end = text.indexOf("$", start + 1);
    if (end === -1) {
      parts.push(text.slice(start));
      break;
    }
    const math = text.slice(start + 1, end);
    try {
      parts.push(<InlineMath key={key++} math={math} />);
    } catch {
      parts.push(text.slice(start, end + 1));
    }
    i = end + 1;
  }
  return <span className={className}>{parts}</span>;
}