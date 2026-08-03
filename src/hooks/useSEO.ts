import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title ? `${title} | MultiSarv India` : "MultiSarv India | Innovate. Integrate. Inspire.";

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    if (description) {
      metaDesc.setAttribute("content", description);
    }

    return () => {
      document.title = "MultiSarv India | Innovate. Integrate. Inspire.";
    };
  }, [title, description]);
}
