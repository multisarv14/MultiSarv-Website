export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  product: string;
  requirements: string;
  budget: string;
  timeline: string;
  score?: number;
  rationale?: string;
  status: "new" | "qualified" | "demo_done" | "closed";
  assignedTo: string;
  date: string;
  followUpNotes?: string;
}

export interface Blog {
  id: string;
  title: string;
  snippet: string;
  content: string;
  category: string;
  keywords: string[];
  metaDescription: string;
  date: string;
  readTime: string;
  published: boolean;
  isAiGenerated?: boolean;
}

export interface ProductDetails {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  logoUrl?: string;
  badge: string;
  features: string[];
  benefits: string[];
  pricing: {
    starter?: string;
    standard: string;
    enterprise: string;
    support: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "sarvai";
  text: string;
  timestamp: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  features: string[];
  techStack: string[];
}
