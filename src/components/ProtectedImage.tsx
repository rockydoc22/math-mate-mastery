import { useEffect, useState } from "react";
import { fetchProtectedAsset } from "@/lib/protectedAsset";

/**
 * Renders an <img> whose `src` may be either:
 *  - an absolute/relative public URL (rendered as-is), or
 *  - a path inside the private `protected-content` bucket
 *    (e.g. "questions/sat-math-xxxx.jpg") — streamed through the
 *    JWT-gated `protected-asset` edge function as a blob URL.
 */
export function ProtectedImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [resolved, setResolved] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    let blobUrl: string | null = null;
    setErr(false);
    setResolved(null);

    const isProtected = /^(questions|ai|k12)\//.test(src);
    if (!isProtected) {
      setResolved(src);
      return;
    }

    fetchProtectedAsset(src)
      .then((res) => res.blob())
      .then((b) => {
        if (!alive) return;
        blobUrl = URL.createObjectURL(b);
        setResolved(blobUrl);
      })
      .catch(() => alive && setErr(true));

    return () => {
      alive = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  if (err) {
    return (
      <div className={`flex items-center justify-center bg-muted text-xs text-muted-foreground p-4 ${className ?? ""}`}>
        Sign in to view this image
      </div>
    );
  }
  if (!resolved) {
    return <div className={`bg-muted animate-pulse ${className ?? ""}`} style={{ minHeight: 120 }} />;
  }
  return <img src={resolved} alt={alt ?? ""} className={className} />;
}