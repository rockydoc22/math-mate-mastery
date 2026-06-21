import { Helmet } from "react-helmet-async";

const SITE_URL = "https://40squared.club";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SEOProps {
  title: string;
  description: string;
  /** Path beginning with '/'. Defaults to current location pathname at render time. */
  path?: string;
  image?: string;
  /** og:type — 'website' (default) or 'article'. */
  type?: "website" | "article";
  /** Optional JSON-LD structured data object. */
  jsonLd?: Record<string, unknown>;
  /** If true, sets noindex (use for auth, admin, internal pages). */
  noindex?: boolean;
}

/**
 * Per-route head tags. Wrap once with <HelmetProvider> at the app root.
 * Title is rendered with a brand suffix and capped to keep <title> < 60 chars.
 */
export const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
  noindex,
}: SEOProps) => {
  const resolvedPath =
    path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const url = `${SITE_URL}${resolvedPath}`;
  // Keep final <title> under 60 chars: only append brand suffix if it fits.
  const BRAND_SUFFIX = " | AlphaOmega";
  const withSuffix = `${title}${BRAND_SUFFIX}`;
  const fullTitle =
    withSuffix.length <= 60
      ? withSuffix
      : title.length <= 60
        ? title
        : `${title.slice(0, 57)}…`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
