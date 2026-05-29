import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

/**
 * Renders a string that contains inline LaTeX delimited by single `$...$`.
 * Everything outside `$...$` is plain text; segments inside render with KaTeX.
 */
export function MathText({
  text,
  children,
  className,
}: {
  text?: string;
  children?: string;
  className?: string;
}) {
  const parts: React.ReactNode[] = [];
  const source = text ?? children ?? "";
  let i = 0;
  let key = 0;
  while (i < source.length) {
    const start = source.indexOf("$", i);
    if (start === -1) {
      parts.push(source.slice(i));
      break;
    }
    if (start > i) parts.push(source.slice(i, start));
    const end = source.indexOf("$", start + 1);
    if (end === -1) {
      parts.push(source.slice(start));
      break;
    }
    const math = source.slice(start + 1, end);
    try {
      parts.push(<InlineMath key={key++} math={math} />);
    } catch {
      parts.push(source.slice(start, end + 1));
    }
    i = end + 1;
  }
  return <span className={className}>{parts}</span>;
}