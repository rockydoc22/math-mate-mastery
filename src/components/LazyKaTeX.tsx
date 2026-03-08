import { lazy, Suspense, useEffect, useState } from "react";

// Lazy-load KaTeX CSS only when component mounts
const KaTeXStyles = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    import('katex/dist/katex.min.css').then(() => setLoaded(true));
  }, []);
  return null;
};

const InlineMathLazy = lazy(() =>
  import('react-katex').then((mod) => ({ default: mod.InlineMath }))
);

interface LazyInlineMathProps {
  math: string;
}

export const LazyInlineMath = ({ math }: LazyInlineMathProps) => {
  return (
    <Suspense fallback={<span className="font-mono text-sm">{math}</span>}>
      <KaTeXStyles />
      <InlineMathLazy math={math} />
    </Suspense>
  );
};
