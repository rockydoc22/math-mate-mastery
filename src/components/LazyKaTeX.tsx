import { Suspense, useEffect, useState } from "react";
import { InlineMath } from 'react-katex';

// Lazy-load KaTeX CSS only when this component mounts
const useKaTeXStyles = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/katex.min.css';
    link.onload = () => setLoaded(true);
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  return loaded;
};

interface LazyInlineMathProps {
  math: string;
}

export const LazyInlineMath = ({ math }: LazyInlineMathProps) => {
  const loaded = useKaTeXStyles();
  if (!loaded) return <span className="font-mono text-sm opacity-70">{math}</span>;
  return <InlineMath math={math} />;
};
