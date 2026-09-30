// Shared SEO constants. Also imported by scripts/prerender.ts at build time,
// so keep this file free of browser-only code.
export const SITE_NAME = "MultiSarv";
export const SITE_URL = "https://multisarv.com";
export const TAGLINE = "Innovate. Integrate. Inspire.";
export const DEFAULT_TITLE = `${SITE_NAME} | ${TAGLINE}`;
export const DEFAULT_DESCRIPTION =
  "MultiSarv builds SaaS products and custom software for Indian businesses — real estate CRM, housing society management, marketplaces, mobile apps and cloud solutions.";

export function formatTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

// Static route metadata. The keys are route paths.
export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/products": {
    title: "Products — SaaS Platforms & Mobile Apps",
    description: "Explore MultiSarv's product catalog: RealtyConnect, SocietySarv, NOAI, OnlineSarv.com, Garage Guru, CookIQ, TubeIQ, DomainLink.in and more.",
  },
  "/services": {
    title: "Services — Custom Software, Mobile Apps & Cloud",
    description: "MultiSarv offers custom software development, mobile apps, CRM development, AI integration, business automation, SaaS development, digital transformation and cloud solutions.",
  },
  "/pricing": {
    title: "Pricing — Flexible SaaS Plans for Every Business",
    description: "Transparent MultiSarv pricing from a free starter tier to enterprise scale. Compare plans for every MultiSarv product.",
  },
  "/about": {
    title: "About MultiSarv — Mission, Vision & Team",
    description: "Learn about MultiSarv's mission to bring enterprise-grade software to Indian businesses of every size, and meet our team.",
  },
  "/blogs": {
    title: "Blogs — MultiSarv Knowledge Base",
    description: "Articles from MultiSarv on cloud architecture, business automation, security and SaaS strategy.",
  },
  "/case-studies": {
    title: "Case Studies — MultiSarv Client Success Stories",
    description: "See how businesses use MultiSarv products such as RealtyConnect, SocietySarv, HealthSarv and HRSarv to improve their operations.",
  },
  "/contact": {
    title: "Contact Us — MultiSarv",
    description: "Contact MultiSarv about our products or a custom software project. Call +91 9545 870 970 or email contact@multisarv.com.",
  },
  "/privacy": {
    title: "Privacy & Cookies Policies",
    description: "Review MultiSarv's privacy practices, cookies policy, and product-specific privacy disclosures.",
  },
  "/admin": {
    title: "Admin Dashboard",
    description: "MultiSarv administration.",
    noindex: true,
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  noindex: true,
};

export function productMeta(p: { name: string; tagline: string; description: string }): PageMeta {
  return { title: `${p.name} — ${p.tagline}`, description: p.description };
}

export function serviceMeta(s: { name: string; shortDesc: string }): PageMeta {
  return { title: `${s.name} — MultiSarv Services`, description: s.shortDesc };
}

export function privacyMeta(p: { name: string }): PageMeta {
  return { title: `${p.name} — Privacy Policy`, description: `Read the privacy policy for ${p.name} by MultiSarv.` };
}
