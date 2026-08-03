import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  TrendingUp,
  Layers,
  Users,
  Settings,
  Send,
  FileText,
  CheckCircle,
  BarChart3,
  Database,
  Cpu,
  Building,
  Briefcase,
  Shield,
  HeartPulse,
  Activity,
  Code,
  Sparkles,
  Plus,
  Edit3,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  Search,
  Menu,
  X,
  Check,
  CheckSquare,
  RefreshCw,
  Play,
  Sliders,
  Eye,
  BookOpen,
  Award,
  MapPin,
  Calendar,
  DollarSign,
  Globe,
  Percent,
  Filter,
  Trash2,
  Copy,
  ChevronRight,
  AlertCircle,
  Clock,
  Wrench,
  Utensils,
  Tv,
  Smartphone
} from "lucide-react";
import { VisitorsBarChart, ConversionLineChart, ProductPieChart } from "./components/AnalyticsCharts";
import { Lead, Blog, ProductDetails, ChatMessage, ServiceDetail } from "./types";

import { auth, db, handleFirestoreError, OperationType } from "./lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, getDoc, setDoc, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";

import logoMultiSarvCorporate from "./assets/images/logo_multisarv_corporate_1781237621472.jpg";
import logoRealtySarv from "./assets/images/logo_realtysarv_white_1781256158322.jpg";
import logoSocietySarv from "./assets/images/logo_societysarv_white_1781256172859.jpg";
import logoHRSarv from "./assets/images/logo_hrsarv_white_1781256191666.jpg";
import logoFinSarv from "./assets/images/logo_finsarv_white_1781256204256.jpg";
import logoEduSarv from "./assets/images/logo_edusarv_white_1781256221439.jpg";
import logoHealthSarv from "./assets/images/logo_healthsarv_white_1781256234953.jpg";
import logoRealtyConnect from "./assets/images/logo_realtyconnect_white_1781256249795.jpg";
import logoOnlineSarv from "./assets/images/logo_onlinesarv_white_1781256263639.jpg";
import logoDomainLink from "./assets/images/logo_domainlink_white_1781256279260.jpg";

// --- CORE MASTER DATA ---
const SERVICES: ServiceDetail[] = [
  {
    id: "soft-dev",
    name: "Custom Software Development",
    shortDesc: "Enterprise custom architectures designed for rapid scaling and heavy workloads.",
    icon: "Code",
    features: ["Custom API Integrations", "Domain-driven architecture", "Microservices framework"],
    techStack: ["React", "TypeScript", "Node.js", "Firebase", "Go"]
  },
  {
    id: "mobile-apps",
    name: "Mobile App Development",
    shortDesc: "Native Android & iOS performance built on gorgeous responsive layout frameworks.",
    icon: "Activity",
    features: ["Cross-platform Flutter specs", "Offline-first capability", "Real-time background sync"],
    techStack: ["Flutter", "Dart", "Firebase Cloud Messaging"]
  },
  {
    id: "crm-custom",
    name: "CRM Development",
    shortDesc: "Tailored customer tracking boards mapping key workflows for dynamic sales hubs.",
    icon: "Layers",
    features: ["Inter-system webhook push", "KPI score tracker", "Instant lead validation alerts"],
    techStack: ["Tailwind", "REST API", "Cloud Functions"]
  },
  {
    id: "ai-integrate",
    name: "AI Integration",
    shortDesc: "Supercharge processes using Google Gemini API for analytics and automated context replies.",
    icon: "Bot",
    features: ["Natural dialog processing", "Document ingestion automation", "Smart intent classification"],
    techStack: ["Google Gen AI SDK", "Gemini 3.5 Flash", "Cloud Run"]
  },
  {
    id: "biz-auto",
    name: "Business Automation",
    shortDesc: "Eliminate dry manual duties with triggers dispatching secure SMS/WhatsApp messages.",
    icon: "Sliders",
    features: ["WhatsApp Business bridge", "Gmail trigger dispatch", "Cron trigger checks"],
    techStack: ["Node.js", "WhatsApp API", "Firebase Remote Config"]
  },
  {
    id: "saas-launch",
    name: "SaaS Development",
    shortDesc: "Launch multi-tenant apps backed by secure user scopes and easy billing portals.",
    icon: "Globe",
    features: ["Multi-tenant directory partitioning", "Stripe subscription grids", "Custom domains integration"],
    techStack: ["NextJS", "Firestore", "Drizzle ORM"]
  },
  {
    id: "digi-transform",
    name: "Digital Transformation",
    shortDesc: "Upgrade obsolete software stacks without halting day-to-day corporate operations.",
    icon: "Briefcase",
    features: ["Parallel pipeline staging", "Old system data extraction tools", "Employee onboarding dashboards"],
    techStack: ["GCP Cloud Migrate", "Firebase Cloud SQL"]
  },
  {
    id: "cloud-solutions",
    name: "Cloud Solutions",
    shortDesc: "High availability hosting architectures with strict zero-trust Firestore guidelines.",
    icon: "Shield",
    features: ["Automated regional backup arrays", "Encrypted connection protocols", "DDoS mitigation paths"],
    techStack: ["Firebase Hosting", "GCP BigQuery", "Apigee Gateway"]
  }
];

const ALL_PRODUCTS: ProductDetails[] = [
  {
    id: "realtysarv",
    name: "RealtySarv",
    tagline: "Modern Real Estate CRM & Broker Network ERP",
    description: "Streamline real estate sales pipelines, broker schedules, property catalogs, and client interactions in a single, high-performance platform.",
    icon: "Building",
    logoUrl: logoRealtySarv,
    badge: "Hot • CRM",
    features: [
      "Custom project catalog mapping layouts",
      "Interactive broker aggregation coordinate lists",
      "Dynamic lead scoring for high-net-worth calls",
      "In-app PDF unit layout dispatch"
    ],
    benefits: [
      "Boosts lead conversions by 45%",
      "Automates property collateral generation",
      "Maximizes brokerage network visibility"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹4,999 / mo",
      enterprise: "₹14,999 / mo",
      support: "Live Account Exec + WhatsApp Dispatch"
    }
  },
  {
    id: "societysarv",
    name: "SocietySarv",
    tagline: "Housing Society Management — Billing, Security & Resident App",
    description: "An all-in-one platform for member registration, maintenance billing, gatekeeper logs, financial ledger audits, notices, and unified resident communications. Official Android App going live on Google Play Store soon!",
    icon: "Shield",
    logoUrl: logoSocietySarv,
    badge: "ERP • Mobile App",
    features: [
      "Member registration with role-based access (Chairman, Secretary, Resident)",
      "Flat billing configuration — set rates per 1BHK, 2BHK, 3BHK etc.",
      "Maintenance collection with UPI/Cash/QR & instant e-receipt generation",
      "Income & expense ledger — hall rent, parking, plumbing, security costs",
      "Post rules & circular notices — General, Emergency, AGM, Event"
    ],
    benefits: [
      "Ensures 99% timely maintenance collections",
      "Maintains clean ledger compliance for auditing",
      "Reduces visitor gate latency down to sub-15s"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹3,499 / mo",
      enterprise: "₹8,999 / mo",
      support: "24/7 Hotline + Gate Terminal Integrations"
    }
  },
  {
    id: "hrsarv",
    name: "HRSarv",
    tagline: "Instant Biometric Attendance, Payroll & HR Suite",
    description: "Simplify employee scheduling, facial & geo-fenced attendance logs, leaves management, performance bonuses, and automated payroll processing.",
    icon: "Users",
    logoUrl: logoHRSarv,
    badge: "Staffing",
    features: [
      "Biometric & smart GPS geo-fenced check-in",
      "AI performance metrics assessment matrices",
      "Automated tax ledger files compilation",
      "Direct salary direct bank checkout formats"
    ],
    benefits: [
      "Zeroes manual attendance leaks entirely",
      "Cuts HR ledger prep time from days to minutes",
      "Empowers staff with transparent self-service options"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹2,999 / mo",
      enterprise: "₹7,999 / mo",
      support: "HR Manager training + custom ERP sync"
    }
  },
  {
    id: "finsarv",
    name: "FinSarv",
    tagline: "Slick Double-Entry Ledgers & GST Invoicing System",
    description: "Generate professional invoices, track balance sheets, manage cash flows, and automate GST compliance filing with comprehensive auditing trails.",
    icon: "TrendingUp",
    logoUrl: logoFinSarv,
    badge: "Finance",
    features: [
      "Double-entry ledger with instant cloud balances",
      "Dynamic GST and local state tax calculation engine",
      "Custom template creator with firm digital signatures",
      "Interactive balance sheets with dynamic spreadsheets"
    ],
    benefits: [
      "Guarantees 100% tax and audit compliance",
      "Speeds up billing checkout and receivables collection",
      "Delivers intuitive and granular cash flow insights"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹5,999 / mo",
      enterprise: "₹19,999 / mo",
      support: "Chartered Accountant overview tools API"
    }
  },
  {
    id: "edusarv",
    name: "EduSarv",
    tagline: "School ERP, Fee Counters & Live School Bus Tracker",
    description: "Manage student admissions, fee collections, online exams, report cards, class timetables, and live GPS school bus tracking for parents.",
    icon: "Award",
    logoUrl: logoEduSarv,
    badge: "EduTech",
    features: [
      "Unified student records repository",
      "Online exam builder with automatic scoring logs",
      "Real-time school bus location sync for parents",
      "Staff schedule optimization planners"
    ],
    benefits: [
      "Keeps parents informed with instant tracking",
      "Simplifies multi-teacher class scheduling",
      "Protects academic data with top-tier encryption standards"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹3,999 / mo",
      enterprise: "₹11,999 / mo",
      support: "Parent onboarding modules + GPS setups"
    }
  },
  {
    id: "healthsarv",
    name: "HealthSarv",
    tagline: "Smart OPD Queue, Clinic EHR & Medical Invoice Tracker",
    description: "Optimize clinical OPD workflows, digital patient charts, prescription history, bed allotment, pharmacy invoicing, and secure health data management.",
    icon: "HeartPulse",
    logoUrl: logoHealthSarv,
    badge: "Medical",
    features: [
      "Encrypted secure clinic records system",
      "Live clinic OPD queue tracking screens",
      "Pharmacy prescriptions automatic pricing integration",
      "Bed availability dynamic maps tracker"
    ],
    benefits: [
      "Cuts patient waiting room times under 15 minutes",
      "Eliminates physical prescription tracking paper",
      "Empowers doctors with secure instant patient histories"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹6,999 / mo",
      enterprise: "₹24,999 / mo",
      support: "On-site serverless transition setup + support"
    }
  },
  {
    id: "realtyconnect",
    name: "RealtyConnect",
    tagline: "Broker Matchmaking MLS Network & Property Board",
    description: "An exclusive digital marketplace connecting real estate agents, brokers, and developers to share inventory and match active buyer queries instantly.",
    icon: "Briefcase",
    logoUrl: logoRealtyConnect,
    badge: "Exclusive",
    features: [
      "Instant matches with real-estate buyer profiles",
      "Transparent commission escrow logs",
      "Verified broker identity database validation",
      "Encrypted secure chat dispatch"
    ],
    benefits: [
      "Accelerates property closing cycles significantly",
      "Protects commission agreements securely",
      "Establishes a highly vetted broker network"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹2,499 / mo",
      enterprise: "₹6,999 / mo",
      support: "Verified broker network check"
    }
  },
  {
    id: "onlinesarv",
    name: "OnlineSarv.com",
    tagline: "Hyper-Local Business Marketplace & Lead Dispatcher",
    description: "Unlock direct business leads, match with vetted local service providers, browse hyper-local enterprise catalogs, and complete transactions with seamless customer coverage. Official Android App going live on Google Play Store soon!",
    icon: "Globe",
    logoUrl: logoOnlineSarv,
    badge: "New • Mobile App",
    features: [
      "Hyper-local service provider directories",
      "Vetted merchant credential indexes",
      "In-app quote bidding and priority callback routes",
      "Secure customer ratings & resolution panels"
    ],
    benefits: [
      "Expands localized lead generation channels by 3x",
      "Supplies immediate access to vetted domain experts",
      "Builds an open, trust-oriented digital commerce map"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹1,999 / mo",
      enterprise: "₹5,499 / mo",
      support: "Merchant priority directory indexing + callback lines"
    }
  },
  {
    id: "domainlink",
    name: "DomainLink.in",
    tagline: "Reliable NVMe SSD Hosting & Custom Domain Services",
    description: "Secure your desired Indian domain name, provision enterprise SSD servers, configure responsive business email servers, and deploy sites with automated SSL certificates.",
    icon: "Database",
    logoUrl: logoDomainLink,
    badge: "New • Hosting",
    features: [
      "Instant .in and global domain registrations",
      "Automated free Let's Encrypt SSL activations",
      "Ultra-high performance NVMe SSD cloud servers",
      "Vibrant IMAP/POP3 business mailbox setups"
    ],
    benefits: [
      "Ensures lightning-fast page loading and asset deliveries",
      "Keeps connections secure with automated certificate refreshes",
      "Streamlines digital presence establishment in minutes"
    ],
    pricing: {
      starter: "₹0 / Free Starter",
      standard: "₹1,499 / yr",
      enterprise: "₹4,999 / yr",
      support: "24/7 dedicated server support and expert dns assistance"
    }
  },
  {
    id: "garageguru",
    name: "Garage Guru",
    tagline: "Automotive Garage Management & Slot Booking Platform",
    description: "An immersive vehicle service and garage management software. Perfect for booking mechanical service slots, tracking repair states, generating digital invoices, and managing spare parts inventories. Official Android App going live on Google Play Store soon!",
    icon: "Wrench",
    badge: "New • Mobile App",
    features: [
      "Instant vehicle pick-up/drop-off tracker",
      "Real-time service bay status console",
      "Automated spare parts inventory warning triggers",
      "Direct mechanic dispatch and labor log tracking"
    ],
    benefits: [
      "Reduces vehicle delivery delays by 35%",
      "Saves thousands in lost spare parts stock leakage",
      "Delivers frictionless direct SMS/WhatsApp notifications to car owners"
    ],
    pricing: {
      starter: "₹0 / Free Trial",
      standard: "₹1,499 / mo",
      enterprise: "₹4,999 / mo",
      support: "Onboarding kit + barcode printer integrations"
    }
  },
  {
    id: "cookiq",
    name: "CookIQ",
    tagline: "Intelligent Kitchen Recipe Book & Ingredient Tracker",
    description: "A gorgeous, smart kitchen companion mobile app designed to catalog custom recipes, generate AI-driven grocery shopping lists, and track pantry ingredient levels. Official Android App going live on Google Play Store soon!",
    icon: "Utensils",
    badge: "New • Mobile App",
    features: [
      "AI-powered recipe translation and scale adapter",
      "Dynamic pantry ingredient depletion warnings",
      "Smart automated meal plans synced with calendar",
      "Multi-device household shared grocery cart"
    ],
    benefits: [
      "Reduces home food waste by over 40%",
      "Saves hours of meal brainstorming every week",
      "Provides instant step-by-step guidance hands-free"
    ],
    pricing: {
      starter: "₹0 / Free Tier",
      standard: "₹199 / mo",
      enterprise: "₹599 / mo",
      support: "Standard updates + cloud backup storage"
    }
  },
  {
    id: "tubeiq",
    name: "TubeIQ",
    tagline: "Video Creators Metadata & Thumbnail Performance Suite",
    description: "A powerful analytics and helper app designed for video creators to optimize metadata titles, generate high-performing video concepts, and track video performance. Official Android App going live on Google Play Store soon!",
    icon: "Tv",
    badge: "New • Mobile App",
    features: [
      "Title and description semantic relevance checker",
      "High-impact video concept generator",
      "Competitor metadata scraping logs",
      "Interactive CTR forecasting dashboard"
    ],
    benefits: [
      "Increases click-through-rates by up to 18%",
      "Streamlines pre-production video research",
      "Reduces metadata publishing errors to zero"
    ],
    pricing: {
      starter: "₹0 / Free Tier",
      standard: "₹499 / mo",
      enterprise: "₹1,299 / mo",
      support: "API credentials support + group training"
    }
  },
  {
    id: "noai",
    name: "NOAI",
    tagline: "Next-Gen Human Work Marketplace — Connect, Work, Earn",
    description: "NOAI connects people who need work done with verified individuals, freelancers, professionals, businesses, and agencies. From local errands and deliveries to professional services and enterprise workforce management — all in one trusted platform.",
    icon: "Users",
    badge: "New • Marketplace",
    features: [
      "Human Work Marketplace: local tasks, errands & deliveries",
      "Freelancer & professional services marketplace",
      "Smart task matching with verified worker profiles",
      "Live task tracking & in-app chat communication",
      "Secure wallet, payments & identity verification system",
      "Multi-role platform: Customer, Worker, Business & Admin"
    ],
    benefits: [
      "Technology that creates jobs, not replaces people",
      "Connects customers to vetted workers instantly",
      "Covers everything from local errands to enterprise workforce"
    ],
    pricing: {
      starter: "₹0 / Free Tier",
      standard: "₹999 / mo",
      enterprise: "₹4,999 / mo",
      support: "Dedicated worker onboarding + verification support"
    }
  }
];

// Active products to keep visible (others can be easily re-enabled later)
const PRODUCTS: ProductDetails[] = ALL_PRODUCTS.filter(p =>
  ["realtyconnect", "noai", "onlinesarv", "garageguru", "cookiq", "tubeiq", "domainlink", "societysarv"].includes(p.id)
);

// Per-product privacy policy content
interface ProductPrivacyInfo {
  dataCollected: string[];
  permissions?: string[];
  dataSharingPolicy: string;
  dataRetention: string;
  specificNote?: string;
}

const PRODUCT_PRIVACY_DATA: Record<string, ProductPrivacyInfo> = {
  realtysarv: {
    dataCollected: ["Client names and corporate contact details", "Property inquiry and broker assignment records", "Sales pipeline stages and lead scoring metadata", "In-app PDF interaction logs"],
    dataSharingPolicy: "No data is shared with external marketing agencies. Broker records are visible only within the subscribed organization's workspace.",
    dataRetention: "Client and broker records are retained as long as the subscription is active, plus 12 months after termination for audit purposes.",
    specificNote: "All financial and contact data is stored under SSL-encrypted Firestore collections with role-based access rules."
  },
  societysarv: {
    dataCollected: ["Resident member profiles and flat details", "Visitor gate-entry logs with timestamps", "Maintenance billing transactions and payment receipts", "Community notice dispatch records"],
    permissions: ["CAMERA – to log security check photos and vehicle plates at society gates", "POST_NOTIFICATIONS – to send visitor approvals, billing alerts, and community notices"],
    dataSharingPolicy: "Resident data is strictly isolated per housing society. No data is shared with any third party outside the organization.",
    dataRetention: "Billing records are retained for 7 years in compliance with accounting standards. Visitor logs are retained for 1 year.",
    specificNote: "All records are stored with SSL encryption inside dedicated Firestore databases with strict Firebase security rulesets."
  },
  hrsarv: {
    dataCollected: ["Employee personal details, designation, and department", "Biometric and GPS geo-fenced attendance timestamps", "Leave applications and approval records", "Salary, bonus, and tax ledger data"],
    permissions: ["ACCESS_FINE_LOCATION – for GPS geo-fenced attendance check-in validation"],
    dataSharingPolicy: "HR and payroll data is confidential and never shared outside the organization. Government statutory filings are the sole exception where data export is permitted.",
    dataRetention: "Employee records and payroll data are retained for a minimum of 7 years for statutory compliance.",
    specificNote: "Salary and tax data is encrypted at rest and in transit."
  },
  finsarv: {
    dataCollected: ["Business invoices, ledger entries, and GST return records", "Client and vendor contact information", "Bank transaction references and reconciliation data", "Digital signature and company seal metadata"],
    dataSharingPolicy: "Financial records are never shared with third parties. GST portal submissions are performed only at the direction of the subscribing organization.",
    dataRetention: "All accounting records are retained for a minimum of 8 years per GST and statutory audit requirements.",
    specificNote: "Double-entry ledger data and tax records are protected with end-to-end encryption."
  },
  edusarv: {
    dataCollected: ["Student admission details and academic records", "Parent and guardian contact information", "Attendance, exam scores, and report card data", "GPS-based school bus live location data (parents' devices)"],
    permissions: ["ACCESS_FINE_LOCATION – for real-time school bus GPS tracking visible to parents"],
    dataSharingPolicy: "Student data is accessible only to authorized school administrators, teachers, and respective parents/guardians. No data is shared with advertisers.",
    dataRetention: "Academic and student records are retained for the duration of enrollment plus 5 years post-graduation.",
    specificNote: "Student health or special needs data, if recorded, is handled with highest confidentiality and visible only to authorized medical/administrative staff."
  },
  healthsarv: {
    dataCollected: ["Patient name, contact details, and medical history", "Prescription records and diagnosis notes", "OPD queue and appointment scheduling logs", "Pharmacy billing and inventory transaction data"],
    dataSharingPolicy: "Patient health records are strictly confidential and are never shared outside the subscribed clinic or hospital without explicit patient consent.",
    dataRetention: "Patient medical records are retained for a minimum of 7 years as mandated by medical regulation guidelines.",
    specificNote: "All patient data is encrypted with AES-256 at rest and TLS in transit. Only authenticated medical personnel can access records."
  },
  realtyconnect: {
    dataCollected: ["Verified broker identity and professional credentials", "Property listings, inventory, and commission structures", "Buyer inquiry and match logs", "Secure in-app chat message metadata"],
    dataSharingPolicy: "Broker profiles are shared within the verified RealtyConnect network only. No personal contact details are exposed publicly without consent.",
    dataRetention: "Broker and listing records are retained while the account is active, plus 6 months post-deactivation for dispute resolution.",
    specificNote: "Commission agreements and financial settlement data are handled with encrypted escrow log protection."
  },
  onlinesarv: {
    dataCollected: ["Search queries and service category preferences", "Geolocation coordinates during active browsing sessions", "Customer phone numbers for quote dispatching", "Merchant catalog and verified credential profiles"],
    permissions: ["ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION – used only to find nearby local service providers while the app is in active foreground use"],
    dataSharingPolicy: "Geolocation data is not stored permanently and is used only in real-time to surface local results. Merchant contact details are shared only with consenting customers.",
    dataRetention: "Search and location session data is discarded at session close. Quote request data is retained for 90 days.",
    specificNote: "Geolocation is requested only during active foreground usage and is never polled, tracked, or cached in the background."
  },
  domainlink: {
    dataCollected: ["Domain registrant name, email, and contact address (WHOIS)", "Hosting account credentials and server configuration settings", "DNS records and SSL certificate renewal metadata", "Business email mailbox configurations"],
    dataSharingPolicy: "WHOIS registrant data is submitted to ICANN-accredited registrars as required by domain registration regulations. No hosting data is shared with advertisers.",
    dataRetention: "Hosting and domain records are retained for the duration of service and 1 year post-expiry for recovery purposes.",
    specificNote: "Business email content is stored on isolated IMAP/POP3 servers with TLS encryption. DomainLink staff cannot access mailbox content."
  },
  garageguru: {
    dataCollected: ["Vehicle registration details and owner contact information", "Mechanical repair state logs and service bay timestamps", "Spare parts inventory transaction records", "Custom inspection photos uploaded during vehicle service"],
    permissions: ["CAMERA – to capture vehicle inspection logs, mechanical issues, and custom service part barcodes", "READ_EXTERNAL_STORAGE – to retrieve local files and export service receipts"],
    dataSharingPolicy: "No personal vehicle or diagnostic telemetry data is shared with any third-party advertising agents or marketing companies.",
    dataRetention: "Vehicle service records are retained for 3 years for warranty and service history reference.",
    specificNote: "Inspection photos are stored securely per vehicle record and are accessible only to the garage operator."
  },
  cookiq: {
    dataCollected: ["User-created recipe catalogs and ingredient lists", "Pantry item depletion preferences and shopping cart data", "Food preference profiles and dietary filters", "Household shared grocery lists across devices"],
    permissions: ["CAMERA – to scan recipe books or grocery product barcodes", "WRITE_EXTERNAL_STORAGE – to export grocery shopping lists to PDF documents"],
    dataSharingPolicy: "Cooking and pantry data is private to the user account. No food preference or shopping data is shared with third-party advertisers.",
    dataRetention: "Recipe and pantry data is retained while the account is active and permanently deleted within 30 days of account closure.",
    specificNote: "Cooking lists and preferences remain localized on the user's secure account space and are not used for any advertising profiling."
  },
  tubeiq: {
    dataCollected: ["Saved video titles, descriptions, and keyword research notes", "Performance prediction keywords and content concept drafts", "Competitor metadata analysis logs", "CTR forecasting session data"],
    permissions: ["INTERNET – to synchronize metadata trends and video performance statistics", "POST_NOTIFICATIONS – for performance alert dispatches"],
    dataSharingPolicy: "TubeIQ connects with public statistical services for trend data. No sensitive personal accounts, credentials, or video passwords are accessed or recorded.",
    dataRetention: "Video research notes and keyword logs are retained while the account is active.",
    specificNote: "TubeIQ does not request access to your YouTube or social media account credentials at any point."
  },
  noai: {
    dataCollected: ["Worker and customer identity verification documents", "Task request details, location, and completion logs", "Wallet transaction and payment records", "In-app chat communication metadata", "Worker skill profiles and ratings"],
    dataSharingPolicy: "Identity verification data is used solely for platform safety checks. Payment data is processed via secured payment gateways and never stored in plaintext.",
    dataRetention: "Transaction records are retained for 7 years for financial compliance. Task and rating history is retained while the account is active.",
    specificNote: "NOAI connects people with verified workers. All identity documents submitted for verification are encrypted and accessible only to authorized compliance reviewers."
  }
};

const FIRESTORE_RULES_TEXT = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return request.auth != null
        && request.auth.token.role == "admin";
    }

    function isManager() {
      return request.auth != null
        && request.auth.token.role == "manager";
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }

    // Leads Collection
    match /leads/{leadId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated();
      allow delete: if isAdmin();
    }

    // Products Collection
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Blogs Collection
    match /blogs/{blogId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Contact Forms
    match /contactForms/{docId} {
      allow create: if true;
      allow read: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // Settings
    match /settings/{docId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Audit Logs
    match /auditLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false; // Strict Server-side generation only
    }
  }
}`;

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails>(PRODUCTS[0]);
  const [privacyProductId, setPrivacyProductId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const [activeSecurityTab, setActiveSecurityTab] = useState<string>("rules");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditSearch, setAuditSearch] = useState<string>("");
  const [copiedRules, setCopiedRules] = useState<boolean>(false);

  // User auth state matching Firebase integrations
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Persistence States (Persisted inside localStorage for mock Firestore parity)
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [contactForms, setContactForms] = useState<any[]>([]);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSubmitStatus, setContactSubmitStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({ loading: false, success: false, error: null });

  // Interactive Input States
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Lead qualification form states
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: PRODUCTS[0].name,
    requirements: "",
    budget: "Standard SaaS Tier",
    timeline: "Standard (30-60 days)"
  });
  const [qualificationLoading, setQualificationLoading] = useState<boolean>(false);
  const [qualifiedResults, setQualifiedResults] = useState<any>(null);

  // Proposal Generation States
  const [proposalForm, setProposalForm] = useState({
    clientName: "",
    companyName: "",
    selectedProduct: PRODUCTS[0].name,
    requirements: "Requires high throughput web applications with real-time Firestore database rules. Integration with messaging networks.",
    budget: "Standard SaaS Tier"
  });
  const [proposalText, setProposalText] = useState<string>("");
  const [proposalLoading, setProposalLoading] = useState<boolean>(false);

  // Blog Writer tool inside Admin
  const [blogForm, setBlogForm] = useState({
    topic: "",
    category: "AI Integration"
  });
  const [blogLoading, setBlogLoading] = useState<boolean>(false);

  // Admin and Filter states
  const [adminSearch, setAdminSearch] = useState<string>("");
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>("all");
  const [adminProductFilter, setAdminProductFilter] = useState<string>("all");
  const [adminSubTab, setAdminSubTab] = useState<"leads" | "contacts">("leads");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Google Login & Logout handlers
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const u = result.user;
        const userRef = doc(db, "users", u.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          const isEmailAdmin = u.email === "ramdasraut9@gmail.com";
          await setDoc(userRef, {
            uid: u.uid,
            name: u.displayName || "MultiSarv Member",
            email: u.email || "",
            role: isEmailAdmin ? "admin" : "user"
          });
        }
      }
    } catch (error) {
      console.error("Google Auth failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // 1. Listen to Authenticated User State changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Set active tab from URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").trim();
    const validTabs = ["home", "products", "services", "about", "blogs", "contact", "sarvai", "privacy", "admin"];
    if (hash && validTabs.includes(hash)) {
      setActiveTab(hash);
    } else if (hash.startsWith("privacy-")) {
      const productId = hash.replace("privacy-", "");
      const found = ALL_PRODUCTS.find(p => p.id === productId);
      if (found) {
        setPrivacyProductId(productId);
        setActiveTab("privacy");
      }
    }
  }, []);

  // Keep URL hash in sync with active tab
  useEffect(() => {
    if (activeTab === "home") {
      history.replaceState(null, "", window.location.pathname);
    } else if (activeTab === "privacy" && privacyProductId) {
      history.replaceState(null, "", `#privacy-${privacyProductId}`);
    } else {
      history.replaceState(null, "", `#${activeTab}`);
    }
  }, [activeTab, privacyProductId]);

  // Default blogs data helper
  const getDefaultBlogs = (): Blog[] => [
    {
      id: "B-101",
      title: "Transforming Indian Retail Pipelines with Real-time ERPs",
      snippet: "How businesses use Firebase architecture and secure Firestore rules to double sales throughput.",
      content: `## Transforming Indian Retail Pipelines with Real-time ERPs

Modern businesses are rapidly shifting from paper spreadsheets toward live, auto-syncing Cloud databases. Incorporating a robust real-time database improves operational clarity by 120%.

### Key pillars of multi-tenant serverless models
1. **Low Memory Overhead:** Load assets dynamically.
2. **Deterministic Rules Engine:** Restrict database modifications via secure rules without continuous server checks.
3. **Responsive Client Layouts:** Use CSS with robust screen media blocks.

Using MultiSarv's specialized services, standard organizations are successfully upgrading legacy billing schedules within days.`,
      category: "Business Automation",
      keywords: ["SaaS", "Automation", "Firebase Security"],
      metaDescription: "Learn how modern Indian startups use cloud data structures to automate manual accounting procedures.",
      date: "2026-06-08",
      readTime: "4 min read",
      published: true,
      isAiGenerated: false
    }
  ];

  // Default leads data helper
  const getDefaultLeads = (): Lead[] => [
    {
      id: "L-101",
      name: "Sanjay Sharma",
      email: "sanjay@sharmagroups.in",
      company: "Sharma Realty & Structures",
      phone: "+91 98765 00121",
      product: "RealtyConnect",
      requirements: "Looking for an ERP with GPS route checking for our independent brokers.",
      budget: "High Level Custom Tier",
      timeline: "Urgent (under 15 days)",
      score: 92,
      rationale: "Strong alignment with RealtyConnect. High budget and urgent timeline detected.",
      status: "qualified",
      assignedTo: "SarvAI Agent-1",
      date: "2026-06-10"
    },
    {
      id: "L-102",
      name: "Dr. Priyesha Nair",
      email: "priyesha@nairhealth.org",
      company: "Nair Diagnostic Center",
      phone: "+91 70122 33445",
      product: "HealthSarv",
      requirements: "Need automated Prescription layout printouts for our OPD ward clinic.",
      budget: "Standard SaaS Tier",
      timeline: "Standard (30-60 days)",
      score: 75,
      rationale: "Good fit for HealthSarv SaaS framework setup. Solid diagnostic match.",
      status: "new",
      assignedTo: "SarvAI Agent-2",
      date: "2026-06-11"
    }
  ];

  // Default audit logs helper
  const getDefaultAuditLogs = () => [
    {
      logId: "LOG-5891",
      userId: "UID-88219",
      userName: "Ramdas Raut",
      userRole: "Admin",
      action: "UPDATE",
      module: "Security Rules",
      documentId: "FIRESTORE_RULES",
      timestamp: "2026-06-11 09:30:15"
    },
    {
      logId: "LOG-5892",
      userId: "UID-88219",
      userName: "Ramdas Raut",
      userRole: "Admin",
      action: "UPDATE",
      module: "Products",
      documentId: "PRODUCT_REALTYSARV",
      timestamp: "2026-06-11 09:41:00"
    }
  ];

  // 2. Real-Time Blog Syncing with Seeding
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        const list: Blog[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as unknown as Blog);
        });
        if (list.length > 0) {
          setBlogs(list);
          localStorage.setItem("multisarv_blogs", JSON.stringify(list));
        } else {
          const defaults = getDefaultBlogs();
          setBlogs(defaults);
          defaults.forEach(async (b) => {
            try {
              await setDoc(doc(db, "blogs", b.id), b);
            } catch (err) {
              console.error("Blog seeding failed:", err);
            }
          });
        }
      },
      (error) => {
        console.error("Blogs onSnapshot failed:", error);
        const cached = localStorage.getItem("multisarv_blogs");
        if (cached) setBlogs(JSON.parse(cached));
      }
    );
    return () => unsub();
  }, []);

  // 3. Real-Time Lead Syncing with optional Admin seeding for verification
  useEffect(() => {
    if (!user) {
      setLeads([]);
      return;
    }
    const unsub = onSnapshot(
      collection(db, "leads"),
      (snapshot) => {
        const list: Lead[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as unknown as Lead);
        });
        if (list.length > 0) {
          setLeads(list);
          localStorage.setItem("multisarv_leads", JSON.stringify(list));
        } else {
          const defaults = getDefaultLeads();
          setLeads(defaults);
          defaults.forEach(async (l) => {
            try {
              await setDoc(doc(db, "leads", l.id), l);
            } catch (err) {
              console.error("Lead seeding failed:", err);
            }
          });
        }
      },
      (error) => {
        console.error("Leads onSnapshot failed:", error);
        const cached = localStorage.getItem("multisarv_leads");
        if (cached) setLeads(JSON.parse(cached));
      }
    );
    return () => unsub();
  }, [user]);

  // 4. Real-Time Security Audit Log Syncing (for admin dashboard logs display)
  useEffect(() => {
    if (!user) {
      const cached = localStorage.getItem("multisarv_audit_logs");
      if (cached) {
        setAuditLogs(JSON.parse(cached));
      } else {
        setAuditLogs(getDefaultAuditLogs());
      }
      return;
    }
    const unsub = onSnapshot(
      collection(db, "auditLogs"),
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((doc) => {
          list.push({ logId: doc.id, ...doc.data() });
        });
        if (list.length > 0) {
          list.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
          setAuditLogs(list);
          localStorage.setItem("multisarv_audit_logs", JSON.stringify(list));
        } else {
          const defaults = getDefaultAuditLogs();
          setAuditLogs(defaults);
          defaults.forEach(async (log) => {
            try {
              await setDoc(doc(db, "auditLogs", log.logId), log);
            } catch (err) {
              console.error("Log seeding failed:", err);
            }
          });
        }
      },
      (error) => {
        console.error("AuditLogs onSnapshot failed:", error);
        const cached = localStorage.getItem("multisarv_audit_logs");
        if (cached) setAuditLogs(JSON.parse(cached));
      }
    );
    return () => unsub();
  }, [user]);

  // 5. Real-Time Contact Form Syncing for Admins
  useEffect(() => {
    if (!user) {
      setContactForms([]);
      return;
    }
    const unsub = onSnapshot(
      collection(db, "contactForms"),
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        // Sort by createdAt descending
        list.sort((a, b) => {
          const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tB - tA;
        });
        setContactForms(list);
      },
      (error) => {
        console.error("contactForms onSnapshot failed:", error);
      }
    );
    return () => unsub();
  }, [user]);

  // Set initial welcome chat messages
  useEffect(() => {
    setChatMessages([
      {
        id: "msg-init",
        sender: "sarvai",
        text: "Namaste! I am **SarvAI**, your expert Solutions Architect at **MultiSarv India**. Ask me anything about our platforms (RealtyConnect, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, NOAI), custom software services, or test our AI tools! **How can I help you today?**",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Update local storage on lease/blog change
  const saveLeadsToStorage = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem("multisarv_leads", JSON.stringify(newLeads));
  };

  const saveBlogsToStorage = (newBlogs: Blog[]) => {
    setBlogs(newBlogs);
    localStorage.setItem("multisarv_blogs", JSON.stringify(newBlogs));
  };

  // Scroll to chat bottom (skip on initial mount to prevent page-load auto-scroll)
  const chatScrollInitialized = useRef(false);
  useEffect(() => {
    if (!chatScrollInitialized.current) {
      chatScrollInitialized.current = true;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Chat Submission Handler
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: chatMessages.slice(-6) // Send recent message exchange
        })
      });

      if (!response.ok) throw new Error("Server communication fault.");
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: "sarvai",
        text: data.text || "Apologies, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: "sarvai",
        text: "I am having trouble connecting to MultiSarv India server nodes. Here is a localized quick summary: We innovate with Gemini-powered systems to automate real estate, clinic records, and staffing checklists. Fill out our AI Lead Qualifier above to get a customized price rate sheet!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Lead qualification Submit Handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) {
      alert("Please enter at least Name and Email address.");
      return;
    }

    setQualificationLoading(true);
    setQualifiedResults(null);

    try {
      const response = await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm)
      });

      if (!response.ok) throw new Error("Could not qualify submission");
      const analyzedData = await response.json();

      const leadId = `L-${Math.floor(100 + Math.random() * 900)}`;
      const freshLead: Lead = {
        id: leadId,
        name: leadForm.name,
        email: leadForm.email,
        company: leadForm.company || "Independent Enterprise",
        phone: leadForm.phone || "Not Shared",
        product: leadForm.product,
        requirements: leadForm.requirements,
        budget: leadForm.budget,
        timeline: leadForm.timeline,
        score: analyzedData.leadScore || 65,
        rationale: analyzedData.rationale || "Automated rules scored based on corporate requirements scope.",
        status: "new",
        assignedTo: Math.random() > 0.5 ? "SarvAI Agent-1" : "SarvAI Agent-2",
        date: new Date().toISOString().split("T")[0]
      };

      if (user) {
        // Real Firestore Write!
        await setDoc(doc(db, "leads", leadId), freshLead);

        // Append Audit Log!
        const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
        await setDoc(doc(db, "auditLogs", logId), {
          logId,
          userId: user.uid,
          userName: user.displayName || "MultiSarv Member",
          userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
          action: "CREATE",
          module: "Leads",
          documentId: `LEAD_${leadId}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
        });
      } else {
        alert("Please sign in first to persist your lead qualification results.");
        setQualificationLoading(false);
        return;
      }

      setQualifiedResults(analyzedData);

      // Reset Form fields safely
      setLeadForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        product: PRODUCTS[0].name,
        requirements: "",
        budget: "Standard SaaS Tier",
        timeline: "Standard (30-60 days)"
      });
    } catch (err) {
      console.error("Firebase lead qualification failed, using local simulation:", err);
      // Offline Local Rule Backup Strategy
      const simulatedScore = leadForm.requirements.length > 50 ? 82 : 45;
      const offlineLead: Lead = {
        id: `L-OFF-${Date.now()}`,
        name: leadForm.name,
        email: leadForm.email,
        company: leadForm.company || "Unknown Enterprise",
        phone: leadForm.phone || "N/A",
        product: leadForm.product,
        requirements: leadForm.requirements,
        budget: leadForm.budget,
        timeline: leadForm.timeline,
        score: simulatedScore,
        rationale: "Successfully qualified using local fallback logic system. Budget variables look sound.",
        status: "new",
        assignedTo: "Offline Agent-Sim",
        date: new Date().toISOString().split("T")[0]
      };
      
      setLeads([offlineLead, ...leads]);
      setQualifiedResults({
        identifiedNeeds: ["Workflow digitisation", "MultiSarv Cloud Sync"],
        suggestedProducts: [leadForm.product],
        leadScore: simulatedScore,
        rationale: "Qualified locally inside browser. Sound structure aligned with corporate catalog."
      });
    } finally {
      setQualificationLoading(false);
    }
  };

  // Proposal Generation Handler
  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalForm.clientName) {
      alert("Please supply a client contact name.");
      return;
    }
    setProposalLoading(true);
    setProposalText("");

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposalForm)
      });
      if (!response.ok) throw new Error("Proposal request failed");
      const block = await response.json();
      setProposalText(block.proposalText);
    } catch (err) {
      // Simulation offline proposal code
      setProposalText(`# TECHNICAL DEPLOYMENT PLAN
**MultiSarv India Solutions Architect team**
*Prepared dynamically (Offline backup active)*

- **Client Contact**: ${proposalForm.clientName}
- **Target ERP**: ${proposalForm.selectedProduct}
- **Special Directives**: "${proposalForm.requirements}"

We recommend deploying MultiSarv's serverless pipeline mapped with Firestore collections. Restrict read/write schedules using zero-trust rules validating user verification statuses before commits.`);
    } finally {
      setProposalLoading(false);
    }
  };

  // AI Blog Autowriter Handler
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.topic) return;
    setBlogLoading(true);

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: blogForm.topic,
          category: blogForm.category
        })
      });
      if (!response.ok) throw new Error("Failed to write blog with AI.");
      const generated = await response.json();

      const blogId = `B-${Math.floor(100 + Math.random() * 900)}`;
      const freshBlog: Blog = {
        id: blogId,
        title: generated.title || `AI Trend - ${blogForm.topic}`,
        snippet: generated.snippet || "Exploring new horizons with MultiSarv software engineering.",
        content: generated.content || "Placeholder content",
        category: blogForm.category,
        keywords: generated.keywords || ["AI Strategy", "MultiSarv"],
        metaDescription: generated.metaDescription || "SEO insights drafted by SarvAI.",
        date: new Date().toISOString().split("T")[0],
        readTime: "3 min read",
        published: true,
        isAiGenerated: true
      };

      if (user && user.email === "ramdasraut9@gmail.com") {
        await setDoc(doc(db, "blogs", blogId), freshBlog);

        const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
        await setDoc(doc(db, "auditLogs", logId), {
          logId,
          userId: user.uid,
          userName: user.displayName || "MultiSarv Admin",
          userRole: "Admin",
          action: "CREATE",
          module: "Blogs",
          documentId: `BLOG_${blogId}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
        });
        alert("AI blog drafted successfully and persisted on Firestore!");
      } else {
        alert("Authorized Admin permissions (ramdasraut9@gmail.com) are required to publish blogs.");
        setBlogLoading(false);
        return;
      }

      setBlogForm({ ...blogForm, topic: "" });
    } catch (err) {
      alert("Encountered an issue parsing AI response. Writing offline fallback standard text.");
    } finally {
      setBlogLoading(false);
    }
  };

  // Public Contact Inquiry Form Submission Handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactSubmitStatus({ loading: false, success: false, error: "Please fill out all required fields." });
      return;
    }

    if (contactForm.name.length > 100) {
      setContactSubmitStatus({ loading: false, success: false, error: "Name must be 100 characters or less." });
      return;
    }
    if (contactForm.email.length > 100) {
      setContactSubmitStatus({ loading: false, success: false, error: "Email must be 100 characters or less." });
      return;
    }
    if (contactForm.message.length > 2000) {
      setContactSubmitStatus({ loading: false, success: false, error: "Message must be 2000 characters or less." });
      return;
    }

    setContactSubmitStatus({ loading: true, success: false, error: null });

    const docId = `CF-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = {
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      message: contactForm.message.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "contactForms", docId), payload);
      setContactForm({ name: "", email: "", message: "" });
      setContactSubmitStatus({ loading: false, success: true, error: null });
      
      if (user) {
        const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
        await setDoc(doc(db, "auditLogs", logId), {
          logId,
          userId: user.uid,
          userName: user.displayName || "MultiSarv Member",
          userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
          action: "CREATE",
          module: "ContactForm",
          documentId: `CONTACT_${docId}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
        });
      }
    } catch (err: any) {
      console.error("Firestore submit inquiry failed:", err);
      try {
        handleFirestoreError(err, OperationType.WRITE, `contactForms/${docId}`);
      } catch (formattedError: any) {
        setContactSubmitStatus({ loading: false, success: false, error: formattedError.message });
      }
    }
  };

  // Admin Utilities
  const deleteContactForm = async (id: string) => {
    if (confirm("Are you sure you want to remove this contact submission record?")) {
      if (!user) {
        alert("Please login first.");
        return;
      }
      try {
        await deleteDoc(doc(db, "contactForms", id));

        const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
        await setDoc(doc(db, "auditLogs", logId), {
          logId,
          userId: user.uid,
          userName: user.displayName || "MultiSarv Member",
          userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
          action: "DELETE",
          module: "ContactForm",
          documentId: `CONTACT_${id}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `contactForms/${id}`);
      }
    }
  };

  const deleteLead = async (id: string) => {
    if (confirm("Are you sure you want to remove this lead?")) {
      if (!user) {
        alert("Please login first.");
        return;
      }
      try {
        await deleteDoc(doc(db, "leads", id));

        const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
        await setDoc(doc(db, "auditLogs", logId), {
          logId,
          userId: user.uid,
          userName: user.displayName || "MultiSarv Member",
          userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
          action: "DELETE",
          module: "Leads",
          documentId: `LEAD_${id}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
      }
    }
  };

  const updateLeadStatus = async (id: string, next: any) => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    try {
      await updateDoc(doc(db, "leads", id), { status: next });

      const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
      await setDoc(doc(db, "auditLogs", logId), {
        logId,
        userId: user.uid,
        userName: user.displayName || "MultiSarv Member",
        userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
        action: "UPDATE",
        module: "Leads",
        documentId: `LEAD_${id}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`);
    }
  };

  // Filter Leads
  const filteredLeads = leads.filter(l => {
    const term = adminSearch.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(term) ||
      l.company.toLowerCase().includes(term) ||
      l.phone.includes(term) ||
      l.requirements.toLowerCase().includes(term) ||
      l.id.toLowerCase().includes(term);

    const matchesStatus = adminStatusFilter === "all" || l.status === adminStatusFilter;
    const matchesProduct = adminProductFilter === "all" || l.product === adminProductFilter;

    return matchesSearch && matchesStatus && matchesProduct;
  });

  return (
    <div id="full-site-container" className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      
      <header id="main-nav" className="sticky top-0 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 z-40 transition-colors">
        <div className="max-w-7xl mx-auto ps-1 pe-4 sm:ps-3 sm:pe-6 lg:ps-4 lg:pe-8 h-18 flex items-center justify-between">
          
          {/* Logo & Tagline Title */}
          <div className="flex items-center gap-2.5 cursor-pointer flex-shrink-0" onClick={() => setActiveTab("home")}>
            <img
              src={logoMultiSarvCorporate}
              alt="MultiSarv India Logo"
              className="w-10 h-10 rounded-xl object-cover bg-white border border-slate-200/50 shadow-md shadow-cyan-500/10 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="font-display font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
              MultiSarv India
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: "home", label: "Home" },
              { id: "products", label: "Products" },
              { id: "services", label: "Services" },
              { id: "about", label: "About" },
              { id: "blogs", label: "Blogs" },
              { id: "contact", label: "Contact Us" },
              { id: "sarvai", label: "SarvAI" }
            ].map(item => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === item.id
                    ? item.id === "sarvai"
                      ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 font-bold"
                      : "bg-slate-800 text-cyan-400 font-semibold"
                    : item.id === "sarvai"
                    ? "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {item.id === "sarvai" && <Bot className="w-3.5 h-3.5 text-emerald-500" />}
                {item.label}
                {item.id === "admin" && leads.length > 0 && (
                  <span className="bg-orange-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none">
                    {leads.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Trigger */}
          <div className="hidden lg:flex items-center gap-3">
            {authLoading ? (
              <span className="text-xs text-slate-500 font-mono animate-pulse">Verifying...</span>
            ) : user ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 pl-2 pr-3 py-1.5 rounded-xl shadow-sm">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-5 h-5 rounded-full object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-cyan-600 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[120px]" title={user.email}>
                  {user.displayName || user.email}
                </span>
                <span className="text-slate-700 text-xs text-sans">|</span>
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-bold text-rose-400 hover:text-rose-300 uppercase tracking-widest transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/10 cursor-pointer hover:scale-102"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In with Google</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab("sarvai")}
              className="bg-slate-800 p-2 text-cyan-400 rounded-lg"
              title="Speak with AI Assistant"
            >
              <Bot className="w-5 h-5 animate-pulse" />
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-slate-900 border-b border-slate-800 py-4 px-4 flex flex-col gap-2 shadow-inner">
            {[
              { id: "home", label: "Home" },
              { id: "products", label: "Products" },
              { id: "services", label: "Services" },
              { id: "about", label: "About" },
              { id: "blogs", label: "Blogs" },
              { id: "contact", label: "Contact Us" },
              { id: "sarvai", label: "SarvAI" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === item.id
                    ? item.id === "sarvai"
                      ? "bg-emerald-950/40 text-emerald-400 font-bold"
                      : "bg-slate-800 text-cyan-400 font-bold"
                    : item.id === "sarvai"
                    ? "text-emerald-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                {item.id === "sarvai" && <Bot className="w-4 h-4 text-emerald-500" />}
                {item.label}
              </button>
            ))}

            <div className="border-t border-slate-800 pt-3 mt-1 flex flex-col gap-2">
              {authLoading ? (
                <div className="text-xs text-slate-500 px-4 font-mono">Loading authentication...</div>
              ) : user ? (
                <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User profile"
                        className="w-6 h-6 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-cyan-600 text-slate-950 flex items-center justify-center text-xs font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-200 truncate">{user.displayName || "Member"}</span>
                      <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all mt-1"
                  >
                    Disconnect Profile
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 3. APP MAIN VIEW AREA */}
      <main className="flex-grow">
        
        {/* ================= tab: HOME ================= */}
        {activeTab === "home" && (
          <div>
            
            {/* HERO SECTION */}
            <section id="hero-banner" className="relative overflow-hidden bg-slate-950 text-white min-h-[500px] md:min-h-[550px] flex items-center justify-center py-16 px-4">
              {/* Background ambient gradient glow blobs */}
              <div className="absolute top-1/4 start-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
              <div className="absolute bottom-1/4 end-1/4 translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
              
              <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Premium Enterprise ERP & SaaS Suite for Growing Businesses</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                  MultiSarv India
                </h1>
                <p className="text-lg sm:text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent tracking-wide">
                  Innovate. Integrate. Inspire.
                </p>
                
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                  We engineer secure, low-latency SaaS applications designed for scale. Powering Real Estate (RealtyConnect), Smart Housing (SocietySarv), medical records, payroll ledgers, and secure CRM pipelines across India.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab("products")}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-white cursor-pointer"
                  >
                    <span>Explore 7 Star Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("ai-quick-assistant")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-300"
                  >
                    <span>Interrogate SarvAI</span>
                  </button>
                </div>

                {/* Dashboard Metrics Bar at hero bottom */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto text-left border-t border-slate-900 mt-12 bg-slate-900/20 p-6 rounded-2xl backdrop-blur-sm">
                  {[
                    { label: "India-wide Clients", val: "220+" },
                    { label: "SaaS Business Suites", val: "7 Ready" },
                    { label: "Platform System Uptime", val: "99.9%" },
                    { label: "Active Business Users", val: "15,000+" }
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">{m.label}</div>
                      <div className="text-xl md:text-2xl font-bold font-mono text-cyan-400 mt-1">{m.val}</div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* PRODUCT INTRO CARD SECT (Quick preview layout) */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 mb-12">
                <h2 className="text-sm font-bold tracking-widest text-blue-600 dark:text-cyan-400 uppercase font-mono">Product Suite Showcase</h2>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">Our Complete ERP & Business System Pools</h3>
                <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500">Click below to load feature sheets, customized technical blueprints, and live pricing modules.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRODUCTS.map(prod => {
                  return (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setActiveTab("products");
                      }}
                      className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          {prod.logoUrl ? (
                            <img
                              src={prod.logoUrl}
                              alt={`${prod.name} Logo`}
                              className="w-16 h-16 rounded-2xl object-cover bg-white border border-slate-200/80 shadow-sm group-hover:scale-110 transition-transform select-none"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="p-3 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
                              {prod.id === "realtysarv" && <Building className="w-5 h-5" />}
                              {prod.id === "societysarv" && <Shield className="w-5 h-5" />}
                              {prod.id === "hrsarv" && <Users className="w-5 h-5" />}
                              {prod.id === "finsarv" && <TrendingUp className="w-5 h-5" />}
                              {prod.id === "edusarv" && <Award className="w-5 h-5" />}
                              {prod.id === "healthsarv" && <HeartPulse className="w-5 h-5" />}
                              {prod.id === "realtyconnect" && <Briefcase className="w-5 h-5" />}
                              {prod.id === "onlinesarv" && <Globe className="w-5 h-5" />}
                              {prod.id === "domainlink" && <Database className="w-5 h-5" />}
                              {prod.id === "garageguru" && <Wrench className="w-5 h-5" />}
                              {prod.id === "cookiq" && <Utensils className="w-5 h-5" />}
                              {prod.id === "tubeiq" && <Tv className="w-5 h-5" />}
                              {prod.id === "noai" && <Users className="w-5 h-5" />}
                            </div>
                          )}
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 roundedbg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            {prod.badge}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-base text-slate-900 dark:text-slate-200">{prod.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{prod.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 pt-4">
                        <span>Details & pricing</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DEMO VIDEO / INTERACTIVE FLOW PROMPT BANNER */}
              <div className="mt-12 bg-gradient-to-tr from-blue-700 via-cyan-600 to-orange-500 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
                <div className="space-y-3 text-center md:text-left">
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-mono">
                    MultiSarv Intelligent Engine Stack
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold">Instantly qualify your deal & score the lead using SarvAI</h3>
                  <p className="text-sm text-cyan-100 max-w-xl">
                    Fill in key metrics on requirements and budget. Our Gemini AI scoring model evaluates the technical fit, drafts suggested MultiSarv tools, and saves a lead entry cleanly in our pipeline tracking table.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("ai-sandbox")}
                  className="bg-white hover:bg-slate-50 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-transform hover:scale-105 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-orange-500" />
                  <span>Interactive Engine Sandbox</span>
                </button>
              </div>
            </section>

            {/* AI SERVICES OVERVIEW LISTING FOR REVIEWS */}
            <section className="bg-slate-100 dark:bg-slate-900/40 py-16 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center space-y-3 mb-12">
                  <h2 className="text-sm font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase font-mono">Our Capabilities</h2>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">Exceptional Corporate Software Services</h3>
                  <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500">Unlocking modern paradigms using high-availability server structures and AI classifiers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SERVICES.slice(0, 3).map(serv => (
                    <div key={serv.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                      <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-xl w-fit">
                        {serv.icon === "Code" && <Code className="w-5 h-5" />}
                        {serv.icon === "Activity" && <Activity className="w-5 h-5" />}
                        {serv.icon === "Layers" && <Layers className="w-5 h-5" />}
                      </div>
                      <h4 className="font-display font-semibold text-lg text-slate-900 dark:text-slate-100 mt-4">{serv.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{serv.shortDesc}</p>
                      
                      <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-800">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Core Technologies</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {serv.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setActiveTab("services")}
                    className="text-sm font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>View all custom corporate services available</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* TESTIMONIALS SECTIONS */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="space-y-4 text-center lg:text-left">
                  <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Industry Reviews</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">Trusted by Leading Enterprises</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">See how prominent real estate leaders, diagnostic clinical hospitals, and institutional administrators simplify their administrative duties with MultiSarv India.</p>
                  <div className="hidden lg:block pt-4">
                    <button
                      onClick={() => setActiveTab("ai-sandbox")}
                      className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      Begin Onboarding
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      quote: "Deploying RealtyConnect for our broker pipelines across Mumbai completely transformed client operations. Real-time notifications keep brokers aligned instantly.",
                      author: "Akash Singhal",
                      role: "Director of CRM, Singhal Builders Ltd.",
                      org: "RealtyConnect Customer"
                    },
                    {
                      quote: "The zero-trust Firebase rules security layer on SocietySarv gave our housing society residents complete confidence in payment pathways.",
                      author: "Commander V. K. Rao (Retd)",
                      role: "President, Orchid Hills Heights",
                      org: "SocietySarv Operator"
                    }
                  ].map((t, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                      <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-300">"{t.quote}"</p>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white">{t.author}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t.role}</div>
                        <span className="inline-block bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-2">
                          {t.org}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AI QUICK FLOATING CHAT ASSISTANT PREVIEW */}
            <section id="ai-quick-assistant" className="bg-slate-950 text-white/90 py-12 border-t border-slate-900">
              <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-900/50 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span>SarvAI Expert Agent Online</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold">Chat directly with India solutions core</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Ask queries about platform pricing coordinates, technical specifications, and CRM customizations. Our AI is loaded with context from MultiSarv's entire suite.
                  </p>
                </div>

                <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800/80 p-4 flex flex-col h-[320px]">
                  <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 text-xs ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                            : "bg-slate-800 text-slate-200 border border-slate-700/60"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800 text-slate-400 space-x-1 p-3 rounded-2xl text-[10px] font-mono flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2 pt-3 border-t border-slate-800">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask MultiSarv AI..."
                      className="flex-grow bg-slate-950/70 text-xs text-white border border-slate-800 focus:border-cyan-500/80 placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none font-sans"
                    />
                    <button
                      type="submit"
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ================= tab: PRODUCTS ================= */}
        {activeTab === "products" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Product selector Sidebar list */}
              <div className="lg:col-span-1 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-mono px-2">Products Catalog</h3>
                {PRODUCTS.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between border ${
                      selectedProduct.id === prod.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                        : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {prod.logoUrl ? (
                        <img
                          src={prod.logoUrl}
                          alt={`${prod.name} Logo`}
                          className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className={`p-1.5 rounded-lg ${selectedProduct.id === prod.id ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-cyan-400"}`}>
                          {prod.id === "realtysarv" && <Building className="w-4 h-4" />}
                          {prod.id === "societysarv" && <Shield className="w-4 h-4" />}
                          {prod.id === "hrsarv" && <Users className="w-4 h-4" />}
                          {prod.id === "finsarv" && <TrendingUp className="w-4 h-4" />}
                          {prod.id === "edusarv" && <Award className="w-4 h-4" />}
                          {prod.id === "healthsarv" && <HeartPulse className="w-4 h-4" />}
                          {prod.id === "realtyconnect" && <Briefcase className="w-4 h-4" />}
                          {prod.id === "onlinesarv" && <Globe className="w-4 h-4" />}
                          {prod.id === "domainlink" && <Database className="w-4 h-4" />}
                          {prod.id === "garageguru" && <Wrench className="w-4 h-4" />}
                          {prod.id === "cookiq" && <Utensils className="w-4 h-4" />}
                          {prod.id === "tubeiq" && <Tv className="w-4 h-4" />}
                          {prod.id === "noai" && <Users className="w-4 h-4" />}
                        </span>
                      )}
                      <span className="font-medium text-xs sm:text-sm">{prod.name}</span>
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.2 rounded ${
                      selectedProduct.id === prod.id ? "bg-white/20 text-white" : "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400"
                    }`}>
                      {prod.badge.split(" • ")[1]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Product Sheet Panel */}
              <div id="product-overview-panel" className="lg:col-span-3 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
                  
                  {/* Badge & Title */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                      {selectedProduct.logoUrl && (
                        <img
                          src={selectedProduct.logoUrl}
                          alt={`${selectedProduct.name} Logo`}
                          className="w-24 h-24 rounded-3xl object-cover bg-white border border-slate-200 shadow-md select-none"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="space-y-1">
                        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-[10px] sm:text-xs tracking-wider uppercase">
                          Product Specification
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">
                          {selectedProduct.name}
                        </h2>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{selectedProduct.tagline}</p>
                      </div>
                    </div>
                    
                    {/* Action button to load Proposal Gen directly */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setProposalForm(prev => ({ ...prev, selectedProduct: selectedProduct.name }));
                          setActiveTab("ai-sandbox");
                        }}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Draft Custom Proposal</span>
                      </button>
                      <button
                        onClick={() => {
                          setPrivacyProductId(selectedProduct.id);
                          setActiveTab("privacy");
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Privacy Policy</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans mt-4">
                    {selectedProduct.description}
                  </p>

                  {/* Bullet points mapping */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
                      <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                        <span>Core Platform Features</span>
                      </h4>
                      <ul className="space-y-2 mt-2">
                        {selectedProduct.features.map((feat, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
                      <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span>Key Business Values</span>
                      </h4>
                      <ul className="space-y-2 mt-2">
                        {selectedProduct.benefits.map((ben, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Pricing grid table */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wide">
                      Interactive SaaS Pricing Plans
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      
                      <div className="border border-emerald-200 dark:border-emerald-900/60 p-4 rounded-xl space-y-1 bg-emerald-50/10 dark:bg-emerald-950/10 shadow-sm relative border-dashed">
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                          Evaluation
                        </div>
                        <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">STARTER PLAN</div>
                        <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-mono">
                          {selectedProduct.pricing.starter || "₹0 / Free"}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">Evaluation sandbox. Basic read/write and evaluation logs.</div>
                      </div>

                      <div className="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-1 bg-white dark:bg-slate-950 shadow-sm relative">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Standard Platform</div>
                        <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-mono">{selectedProduct.pricing.standard}</div>
                        <div className="text-[10px] text-slate-500 mt-1">Billed monthly. Standard Firebase rules mapping.</div>
                      </div>

                      <div className="border border-blue-500 dark:border-cyan-500 p-4 rounded-xl space-y-1 bg-blue-50/20 dark:bg-sky-950/25 shadow-sm relative">
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                          Popular
                        </div>
                        <div className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 font-semibold uppercase">Enterprise Scale</div>
                        <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-mono">{selectedProduct.pricing.enterprise}</div>
                        <div className="text-[10px] text-slate-500 mt-1">Priority queue checkouts, live analytics.</div>
                      </div>

                      <div className="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-1 bg-white dark:bg-slate-950 shadow-sm relative">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-medium">Account Support</div>
                        <div className="text-[11px] font-bold text-slate-950 dark:text-slate-100 leading-normal mt-1 brand-gradient">
                          {selectedProduct.pricing.support}
                        </div>
                        <div className="text-[10px] text-slate-500">Dedicated manager with real-time Slack/WhatsApp bridge.</div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* DEMO / LEAD REGISTER TRIGGER LINKED TO THE PRODUCT */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h4 className="font-display font-semibold text-lg text-white">Interested in onboarding MultiSarv {selectedProduct.name}?</h4>
                    <p className="text-xs text-slate-400 mt-1">Submit your workspace constraints in the AI Lead Qualifications form for direct account assessment.</p>
                  </div>
                  <button
                    onClick={() => {
                      setLeadForm(prev => ({ ...prev, product: selectedProduct.name }));
                      setActiveTab("ai-sandbox");
                    }}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-1 shrink-0 transition-transform hover:scale-103 cursor-pointer"
                  >
                    <span>Request Demo & Score</span>
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= tab: SERVICES ================= */}
        {activeTab === "services" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Solutions Engineering</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Expert Custom Enterprise Workloads</h2>
              <p className="max-w-xl mx-auto text-sm text-slate-500 leading-relaxed font-sans">
                We craft serverless pipelines that synchronize smoothly with your on-site networks under strict deterministic zero-trust Firebase credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map(serv => (
                <div key={serv.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-xl w-fit group-hover:scale-110 transition-transform">
                      {serv.icon === "Code" && <Code className="w-5 h-5" />}
                      {serv.icon === "Activity" && <Activity className="w-5 h-5" />}
                      {serv.icon === "Layers" && <Layers className="w-5 h-5" />}
                      {serv.icon === "Bot" && <Bot className="w-5 h-5" />}
                      {serv.icon === "Sliders" && <Sliders className="w-5 h-5" />}
                      {serv.icon === "Globe" && <Globe className="w-5 h-5" />}
                      {serv.icon === "Briefcase" && <Briefcase className="w-5 h-5" />}
                      {serv.icon === "Shield" && <Shield className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-950 dark:text-white">{serv.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{serv.shortDesc}</p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Deliverables Included</span>
                      <ul className="space-y-1">
                        {serv.features.map((feat, idx) => (
                          <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex flex-wrap gap-1">
                      {serv.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-[9px] font-mono px-2 py-0.5 rounded leading-none">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA panel */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <h3 className="font-display font-bold text-2xl">Connect with MultiSarv Architects directly</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">Submit your technical constraints regarding WhatsApp dispatch triggers, offline databases syncing, and dashboard layouts.</p>
              <button
                onClick={() => setActiveTab("ai-sandbox")}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-transform hover:scale-103 cursor-pointer mt-2"
              >
                <Bot className="w-4 h-4 text-slate-950" />
                <span>Begin onboarding sandbox</span>
              </button>
            </div>

          </div>
        )}

        {/* ================= tab: ABOUT ================= */}
        {activeTab === "about" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">MultiSarv Corporate Identity</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Our Mission, Vision, and Strategy</h2>
              <p className="max-w-lg mx-auto text-sm text-slate-500 font-sans">Learn about the team pushing architectural bounds to construct safe serverless paradigms in India.</p>
            </div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {[
                {
                  title: "Company Vision",
                  desc: "To democratize high-security multi-tenant CRM and ERP systems for startups & established groups alike with absolute serverless operational transparency.",
                  icon: "Eye",
                  color: "border-blue-100 hover:border-blue-400 text-blue-600 dark:text-cyan-400"
                },
                {
                  title: "Company Mission",
                  desc: "To eliminate fragile computing dependencies by replacing traditional server setups with zero-maintenance, low-latency Firebase configurations and Gemini pipelines.",
                  icon: "Award",
                  color: "border-cyan-100 hover:border-cyan-400 text-cyan-600 dark:text-cyan-400"
                },
                {
                  title: "Innovation Strategy",
                  desc: "We prioritize direct LLM context learning to qualify prospective deals on the fly, providing clients with immediate price estimates and system blueprints.",
                  icon: "Cpu",
                  color: "border-orange-100 hover:border-orange-400 text-orange-500"
                }
              ].map((val, idx) => (
                <div key={idx} className={`bg-white dark:bg-slate-900 border ${val.color} px-6 py-8 rounded-3xl space-y-4 transition-all shadow-sm`}>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 w-fit rounded-2xl">
                    {val.icon === "Eye" && <Eye className="w-6 h-6" />}
                    {val.icon === "Award" && <Award className="w-6 h-6" />}
                    {val.icon === "Cpu" && <Cpu className="w-6 h-6" />}
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-950 dark:text-white">{val.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Leadership grid */}
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-center md:text-left space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">LEADERSHIP COORDINATORS</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950 dark:text-white">Engineering the Future of SaaS</h3>
              </div>
              <div id="leadership-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Shyam Kumar", role: "Chief Executive Architect", desc: "Coordinates product release loops across medical and estate ERP channels." },
                  { name: "Pooja Kshirsagar", role: "VP Cloud & DevSecOps", desc: "Architect of zero-trust Firestore custom access policies." },
                  { name: "Manojkumar Mane", role: "Head of AI Framework Integration", desc: "Oversees LLM indexing and Gemini proposal drafting systems." },
                  { name: "Santosh Kashid", role: "Lead UI Developer", desc: "Crafts delightful premium Material 3 responsive layouts." }
                ].map((member, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 font-mono text-lg mb-4">
                      {member.name.charAt(0)}
                    </div>
                    <div className="font-bold text-sm text-slate-950 dark:text-white font-display">{member.name}</div>
                    <div className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono mt-0.5">{member.role}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans">{member.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= tab: BLOGS ================= */}
        {activeTab === "blogs" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Industry Knowledge</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">MultiSarv Knowledge Base</h2>
              <p className="max-w-lg mx-auto text-sm text-slate-500">Read tech-driven analysis about Firebase setups, custom templates security, and GPS integrations.</p>
            </div>

            {/* List representing Blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map(blog => {
                return (
                  <article key={blog.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between">
                    <span className="absolute top-6 right-6 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded">
                      {blog.date}
                    </span>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full font-mono">
                          {blog.category}
                        </span>
                        {blog.isAiGenerated && (
                          <span className="bg-cyan-50 dark:bg-sky-950/40 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Bot className="w-3 h-3 text-cyan-500" />
                            <span>AI Written</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-950 dark:text-white mt-2 leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-sans line-clamp-3">
                        {blog.snippet}
                      </p>

                      {/* Full Blog text content mapping */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800/40 text-xs sm:text-xs text-slate-600 dark:text-slate-300 space-y-2 mt-4 max-h-[140px] overflow-y-auto font-sans scrollbar-thin">
                        <p>{blog.content}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-400 font-mono">{blog.readTime}</span>
                        {blog.keywords && blog.keywords.length > 0 && (
                          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">Tags: {blog.keywords.join(", ")}</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => alert(`Copied metadata to draft on LinkedIn: "${blog.title} - Powered by MultiSarv India AI blog generator."`)}
                        className="text-blue-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </button>
                    </div>

                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= tab: AI-SANDBOX ================= */}
        {activeTab === "ai-sandbox" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
            
            {/* Header intro */}
            <div className="text-center space-y-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Interactive Playground</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">SarvAI Intelligent Sandbox</h2>
              <p className="max-w-lg mx-auto text-sm text-slate-500">Test lead validation, scoring schedules, or generate technical markdown proposals utilizing Google technology.</p>
            </div>

            {/* Sandbox Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Pillar A: AI Lead Qualification and Scoring */}
              <div id="lead-qualification-tool" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="space-y-1 flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <Bot className="w-6 h-6 text-orange-500" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">1. AI Lead Qualification & Score</h3>
                    <p className="text-[10px] text-slate-400">Verifies pipeline compatibility coordinates instantly</p>
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Contact Person Name</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Sanjay Raut"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="sanjay@rautbuilders.in"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Company / Agency Name</label>
                      <input
                        type="text"
                        value={leadForm.company}
                        onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                        placeholder="Raut Developers Ltd"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Phone Number</label>
                      <input
                        type="text"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="+91 94220 00000"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Select Target SaaS Product</label>
                    <select
                      value={leadForm.product}
                      onChange={(e) => setLeadForm({ ...leadForm, product: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-950 dark:text-slate-200"
                    >
                      {PRODUCTS.map(p => (
                        <option key={p.id} value={p.name}>{p.name} - {p.tagline}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Detailed Requirements Scope</label>
                    <textarea
                      rows={3}
                      value={leadForm.requirements}
                      onChange={(e) => setLeadForm({ ...leadForm, requirements: e.target.value })}
                      placeholder="e.g. We require our 12 offline sales brokers to view real-time property directories. Must sync attendance geo coordinates to payroll records."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Est. Budget Cap Scale</label>
                      <select
                        value={leadForm.budget}
                        onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      >
                        <option value="Starter Trial Tier">Starter Trial Tier</option>
                        <option value="Standard SaaS Tier">Standard SaaS Tier</option>
                        <option value="Enterprise Premium Scale">Enterprise Premium Scale</option>
                        <option value="High Level Custom Tier">High Level Custom Tier</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Onboarding On-Time Scale</label>
                      <select
                        value={leadForm.timeline}
                        onChange={(e) => setLeadForm({ ...leadForm, timeline: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      >
                        <option value="Urgent (under 15 days)">Urgent (under 15 days)</option>
                        <option value="Standard (30-60 days)">Standard (30-60 days)</option>
                        <option value="Flexible Schedule">Flexible Schedule</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={qualificationLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    {qualificationLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Applying AI Classifiers...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span>Qualify Lead Coordinates</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Analyzed Lead Qualification output */}
                {qualifiedResults && (
                  <div className="bg-slate-950 text-white p-5 rounded-2xl border border-sky-950/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">AI ASSISTANT SCORING DIAGRAM</span>
                      <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-mono font-bold">
                        <span>Lead Score:</span>
                        <span className="text-sm text-emerald-300">{qualifiedResults.leadScore} / 100</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Suggested products</div>
                      <div className="flex flex-wrap gap-1.5">
                        {qualifiedResults.suggestedProducts?.map((p: string, idx: number) => (
                          <span key={idx} className="bg-blue-900/40 text-blue-300 border border-blue-800/40 text-[9px] font-mono font-semibold px-2 py-0.5 rounded">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Identified requirements needs</div>
                      <div className="flex flex-wrap gap-1.5">
                        {qualifiedResults.identifiedNeeds?.map((need: string, idx: number) => (
                          <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-medium">
                            {need}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-900">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Architect Rationale</div>
                      <p className="text-[11px] text-slate-400 leading-normal italic font-mono">
                        "{qualifiedResults.rationale}"
                      </p>
                    </div>

                    <div className="bg-sky-950/20 text-sky-400 text-[10px] p-2 rounded border border-sky-900/45 text-center font-mono">
                      🎉 Record successfully persisting in Admin Pipeline. Check Administrative tab.
                    </div>
                  </div>
                )}

              </div>

              {/* Pillar B: AI Technical Proposal Generator */}
              <div id="proposal-generator-tool" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="space-y-1 flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <FileText className="w-6 h-6 text-cyan-500" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">2. AI Corporate Proposal Creator</h3>
                    <p className="text-[10px] text-slate-400">Generates custom structured tech layouts dynamically</p>
                  </div>
                </div>

                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Client Contact Name</label>
                      <input
                        type="text"
                        required
                        value={proposalForm.clientName}
                        onChange={(e) => setProposalForm({ ...proposalForm, clientName: e.target.value })}
                        placeholder="e.g. Priyesha Nair"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Organization Name</label>
                      <input
                        type="text"
                        value={proposalForm.companyName}
                        onChange={(e) => setProposalForm({ ...proposalForm, companyName: e.target.value })}
                        placeholder="Nair Diagnostic Center"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Selected Architecture Base</label>
                      <select
                        value={proposalForm.selectedProduct}
                        onChange={(e) => setProposalForm({ ...proposalForm, selectedProduct: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-950 dark:text-slate-205"
                      >
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Proposed Budget Plan</label>
                      <input
                        type="text"
                        value={proposalForm.budget}
                        onChange={(e) => setProposalForm({ ...proposalForm, budget: e.target.value })}
                        placeholder="e.g. ₹6,999/month Standard SaaS"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Add-on Special Requirements Guidelines</label>
                    <textarea
                      rows={2}
                      value={proposalForm.requirements}
                      onChange={(e) => setProposalForm({ ...proposalForm, requirements: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={proposalLoading}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-50 font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    {proposalLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling Draft Specifications...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span>Generate Custom Technical Proposal</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Markdown Proposal Output View */}
                {proposalText && (
                  <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                      <span className="text-[10px] uppercase font-mono text-cyan-400">COMPILED MARKDOWN BLUEPRINT</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(proposalText);
                          alert("Technical proposal copied successfully to clipboard!");
                        }}
                        className="bg-slate-950 text-[10px] text-slate-400 hover:text-white border border-slate-800 px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-cyan-400" />
                        <span>Copy Layout</span>
                      </button>
                    </div>

                    <div className="text-xs font-sans text-slate-300 space-y-3 prose max-h-[250px] overflow-y-auto pr-1 scrollbar-thin">
                      <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/40">
                        {proposalText}
                      </pre>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* ================= tab: SARVAI ================= */}
        {activeTab === "sarvai" && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 font-sans">
            <div className="text-center space-y-3 animate-fade-in">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Enterprise Solutions Companion</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">SarvAI Intelligent Partner</h2>
              <p className="max-w-xl mx-auto text-sm text-slate-500">
                Ask queries about our SaaS products (RealtyConnect, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, NOAI), custom pricing packages, system architectures, or technical timelines.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col h-[550px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/10">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">SarvAI Assistant Core</h3>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Solutions Expert Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Clear current conversation history?")) {
                      setChatMessages([
                        {
                          id: "msg-init",
                          sender: "sarvai",
                          text: "Namaste! I am **SarvAI**, your expert Solutions Architect at **MultiSarv India**. Ask me anything about our platforms (RealtyConnect, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, NOAI), custom software services, or test our AI tools! **How can I help you today?**",
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }
                  }}
                  className="text-[10px] uppercase font-mono text-slate-500 hover:text-white transition-all bg-slate-950 px-2.5 py-1 rounded border border-slate-800/60"
                >
                  Clear Chat
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin relative z-10">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/10"
                          : "bg-slate-800 text-slate-200 border border-slate-700/60 shadow-inner"
                      }`}
                    >
                      <div className="prose prose-invert max-w-none text-slate-100 font-sans whitespace-pre-wrap">
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400/80 mt-1.5 block text-right font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-400 space-x-1.5 p-4 rounded-2xl text-[10px] font-mono flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 relative z-10">
                {[
                  "Tell me about RealtyConnect ERP features",
                  "Explain SocietySarv security stack",
                  "What are custom CRM integration fees?"
                ].map((suggest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setChatInput(suggest)}
                    className="bg-slate-950 hover:bg-slate-850 border border-slate-850/60 hover:border-slate-850 px-3 py-2 rounded-xl text-[10px] text-slate-400 hover:text-white transition-all text-left whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
                  >
                    💡 {suggest}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2 pt-3 border-t border-slate-800/85 relative z-10">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message or click a suggestion prompt..."
                  className="flex-grow bg-slate-950 text-xs text-white border border-slate-800 focus:border-cyan-500/80 placeholder-slate-500 rounded-xl px-4 py-3 outline-none font-sans"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= tab: ADMIN ================= */}
        {activeTab === "admin" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
            {!user ? (
              <div className="text-center py-20 px-6 max-w-sm mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-xl space-y-5">
                <div className="w-16 h-16 bg-cyan-50/10 dark:bg-cyan-950/20 text-cyan-500 rounded-full flex items-center justify-center mx-auto border border-cyan-100/20 shadow-inner">
                  <Shield className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-slate-950 dark:text-white text-lg">System Dashboard Void</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Security protocol block: Viewing CRM dashboards, leads pipelines, and corporate analytics requires identity verification.
                  </p>
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-102 shadow-lg shadow-cyan-500/10"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate with Google</span>
                </button>
              </div>
            ) : (
              <>
                {/* Header intro */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">MultiSarv Management Panel</span>
                <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Administrative Solutions Hub</h2>
                <p className="text-xs text-slate-500 mt-1">Admin control credentials synchronized with Firestore persistent indexes.</p>
              </div>

              {/* Reset to initial trigger button */}
              <button
                onClick={() => {
                  if (confirm("Reset local database registry key to template defaults?")) {
                    localStorage.removeItem("multisarv_leads");
                    localStorage.removeItem("multisarv_blogs");
                    window.location.reload();
                  }
                }}
                className="bg-slate-100 hover:bg-slate-250 dark:bg-slate-900 text-slate-700 dark:text-slate-400 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors border border-slate-100 dark:border-slate-800/80 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-orange-500" />
                <span>Re-Initialize Store Defaults</span>
              </button>
            </div>

            {/* REAL-TIME ANALYTICS GRIDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <VisitorsBarChart />
              <ConversionLineChart />
              <ProductPieChart />
            </div>

            {/* Core Admin Management Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Left hand controller panels */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* AI BLOG GEN MODULE CARD */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="space-y-1 flex items-center gap-2 pb-2 border-b border-slate-50 dark:border-slate-800/80">
                    <Bot className="w-5 h-5 text-cyan-500" />
                    <div>
                      <h3 className="font-display font-medium text-sm text-slate-950 dark:text-slate-100">AI Blog Auto-Writer</h3>
                      <p className="text-[10px] text-slate-400">Powered by Google Gemini 3.5 Flash</p>
                    </div>
                  </div>

                  <form onSubmit={handleBlogSubmit} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 font-bold block uppercase">Blog Target Subject / Topic</label>
                      <input
                        type="text"
                        required
                        value={blogForm.topic}
                        onChange={(e) => setBlogForm({ ...blogForm, topic: e.target.value })}
                        placeholder="e.g. AI-driven CRM loops"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 font-bold block uppercase">Technical Category</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-cyan-500 text-slate-950 dark:text-slate-205"
                      >
                        <option value="AI Integration">AI Integration</option>
                        <option value="Real-time Pipelines">Real-time Pipelines</option>
                        <option value="Business Automation">Business Automation</option>
                        <option value="Cloud Security">Cloud Security</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={blogLoading}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      {blogLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Drafting Article...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span>Generate SEO Blog</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* SYSTEM SHIELD SECURITIES LOGS DISPLAY */}
                <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800/80 space-y-3 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold border-b border-slate-800 pb-2">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span>FIRESTORE SEC RULES STATUS</span>
                  </div>
                  <div className="space-y-2 text-slate-400">
                    <div>
                      <span className="text-emerald-400 font-bold">✔</span> match /users/&#123;uid&#125; isolated to correct UID auth check
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold">✔</span> isValidId() checks on target paths variables size max 128
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold">✔</span> temporal integrity keys verified via request.time check
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold">✔</span> Shadow Update Ghost Vulnerability prevented using strict hasOnly() schema check
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-[9px] text-slate-500 text-center uppercase">
                    Zero Vulnerability Gate-Shield
                  </div>
                </div>

              </div>

              {/* Right hand Leads Pipeline tracking layout */}
              <div className="lg:col-span-3 space-y-6">
                
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                  
                  {/* Lead list controls */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pb-2 border-b border-slate-50 dark:border-slate-800/60">
                    <h3 className="font-display font-medium text-lg text-slate-950 dark:text-white flex items-center gap-2 font-sans">
                      <Sliders className="w-5 h-5 text-blue-500" />
                      <span>Administrative Submissions Board</span>
                    </h3>
                    <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800 flex items-center gap-1.5 self-start sm:self-center">
                      <button
                        onClick={() => setAdminSubTab("leads")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          adminSubTab === "leads"
                            ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        }`}
                      >
                        Pipeline Leads ({filteredLeads.length})
                      </button>
                      <button
                        onClick={() => setAdminSubTab("contacts")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          adminSubTab === "contacts"
                            ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        }`}
                      >
                        Contact Submissions ({contactForms.length})
                      </button>
                    </div>
                  </div>

                  {adminSubTab === "leads" && (
                    <>
                      {/* Operational filters layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        placeholder="Search lead metrics..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl pl-9 pr-4 py-1.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 whitespace-nowrap">Status:</span>
                      <select
                        value={adminStatusFilter}
                        onChange={(e) => setAdminStatusFilter(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">All Tiers</option>
                        <option value="new">New</option>
                        <option value="qualified">Qualified</option>
                        <option value="demo_done">Demo Complete</option>
                        <option value="closed">Closed Deal</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 whitespace-nowrap font-sans">Product:</span>
                      <select
                        value={adminProductFilter}
                        onChange={(e) => setAdminProductFilter(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">All Products</option>
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* List of current pipeline leads */}
                  <div className="space-y-4">
                    {filteredLeads.length === 0 ? (
                      <div className="text-center py-10 space-y-2 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                        <AlertCircle className="w-10 h-10 text-orange-400 mx-auto" />
                        <h4 className="font-display font-medium text-slate-950 dark:text-slate-200">No matching pipeline leads detected</h4>
                        <p className="text-xs text-slate-500">Qualify an entry using the interactive sandbox to check tracking panels.</p>
                      </div>
                    ) : (
                      filteredLeads.map(lead => {
                        const statusColors: { [key: string]: string } = {
                          new: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
                          qualified: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
                          demo_done: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
                          closed: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        };

                        return (
                          <div
                            key={lead.id}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4 relative"
                          >
                            <span className="absolute top-5 right-5 text-[10px] font-mono text-slate-500 font-bold bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded">
                              {lead.id}
                            </span>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div className="space-y-1">
                                <span className={`inline-block text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${statusColors[lead.status]}`}>
                                  {lead.status === "new" && "New Lead Registered"}
                                  {lead.status === "qualified" && "Qualified Hot Lead"}
                                  {lead.status === "demo_done" && "OPD Demo Dispatched"}
                                  {lead.status === "closed" && "Closed Deal Pipeline"}
                                </span>
                                <h4 className="text-base font-display font-bold text-slate-950 dark:text-white">{lead.name}</h4>
                                <div className="text-xs text-slate-500 font-sans">{lead.company} • {lead.email} • {lead.phone}</div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold text-slate-400">STATUS:</span>
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                  className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 px-2 py-1 rounded"
                                >
                                  <option value="new">New</option>
                                  <option value="qualified">Qualified</option>
                                  <option value="demo_done">Demo Sent</option>
                                  <option value="closed">Closed Deal</option>
                                </select>
                              </div>
                            </div>

                            {/* Details coordinates */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100/50 dark:border-slate-800/40 text-[11px] sm:text-xs">
                              <div>
                                <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Target Solution Deployment</span>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.product}</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-slate-500 block uppercase font-semibold">Budget Cap Bracket</span>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.budget}</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-slate-500 block uppercase font-semibold">Timeline Expectation</span>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.timeline}</span>
                              </div>
                            </div>

                            <div className="space-y-1 text-xs">
                              <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Submitted Requirements Statement</span>
                              <p className="text-slate-700 dark:text-slate-300 font-sans italic">
                                "{lead.requirements || "No additional specific custom requests submitted during onboarding."}"
                              </p>
                            </div>

                            {lead.score && (
                              <div className="pt-3 border-t border-slate-50 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                <div className="sm:col-span-1 flex items-center gap-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                                  <span>Deal Score:</span>
                                  <span className="bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full text-[13px]">{lead.score} / 100</span>
                                </div>
                                <p className="sm:col-span-2 text-[10px] text-slate-400 font-sans italic leading-normal">
                                  "{lead.rationale}"
                                </p>
                                <div className="sm:col-span-1 flex justify-end gap-1">
                                  <button
                                    onClick={() => deleteLead(lead.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Lead Entry Record"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })
                    )}
                  </div>
                  </>
                  )}

                  {adminSubTab === "contacts" && (
                    <div className="space-y-4 animate-fade-in font-sans">
                      {contactForms.length === 0 ? (
                        <div className="text-center py-12 space-y-2 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                          <Mail className="w-10 h-10 text-cyan-500 mx-auto opacity-60" />
                          <h4 className="font-display font-medium text-slate-950 dark:text-slate-200">No public contact inquiries stored in Firestore</h4>
                          <p className="text-xs text-slate-500 max-w-xs mx-auto">When prospective Enterprise customers fill in the public Contact Us submission deck, they will appear cataloged here in real time.</p>
                        </div>
                      ) : (
                        contactForms.map((msg) => (
                          <div
                            key={msg.id}
                            className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 relative"
                          >
                            <span className="absolute top-5 right-5 text-[10px] font-mono text-slate-500 font-bold bg-slate-205 dark:bg-slate-800 px-2 py-0.5 rounded">
                              {msg.id}
                            </span>
                            
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white">{msg.name}</h4>
                                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium font-mono">{msg.email}</div>
                              </div>
                              <div className="flex items-center gap-2 mr-16 sm:mr-0">
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="p-1.5 text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                  title="Draft Email Reply"
                                >
                                  <Mail className="w-4 h-4" />
                                </a>
                                <button
                                  onClick={() => deleteContactForm(msg.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Message Submission Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-slate-750 dark:text-slate-300 font-sans leading-relaxed whitespace-pre-wrap italic">
                              "{msg.message}"
                            </p>

                            <div className="text-[10px] font-mono pt-2 border-t border-slate-200/40 dark:border-slate-800 flex justify-between items-center text-slate-500">
                              <span>SOURCE: PUBLIC SECURE CONTACT ENVELOPE</span>
                              <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Unknown Time"}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                </div>

              </div>

            </div>

              </>
            )}
          </div>
        )}

        {/* ================= tab: CONTACT US ================= */}
        {activeTab === "contact" && (
          <div id="contact-tab-pane" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in font-sans">
            <div className="text-center space-y-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
                DIRECT SECURE INTEGRATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">
                Connect with our Architect Directors
              </h2>
              <p className="max-w-lg mx-auto text-sm text-slate-500 dark:text-slate-400">
                Have a customized enterprise project or platform query? Submit an inquiry directly to our Firestore pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Form card col-span-2 */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="border-b border-slate-50 dark:border-slate-800/80 pb-4">
                  <h3 className="font-display font-semibold text-lg text-slate-950 dark:text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-cyan-500" />
                    <span>Inquiry Transmission Deck</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Secure, validation-guarded direct cloud writes.</p>
                </div>

                {contactSubmitStatus.success ? (
                  <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-50/10 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100/20">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-slate-950 dark:text-white text-base">Inquiry Synthesized Successfully</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                        Your direct message was verified by security rules and saved to the Firestore <code className="bg-slate-100 dark:bg-slate-800 font-mono px-1 py-0.5 rounded text-[10px] text-cyan-600 dark:text-cyan-400">contactForms</code> collection! Our director agents will review and reply within 120 minutes.
                      </p>
                    </div>
                    <button
                      onClick={() => setContactSubmitStatus({ loading: false, success: false, error: null })}
                      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Transmit Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    
                    {contactSubmitStatus.error && (
                      <div className="bg-red-50/20 border border-red-500/20 text-red-500 text-xs p-3.5 rounded-xl flex items-center gap-2 font-sans">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{contactSubmitStatus.error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold uppercase">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Anand Sharma"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 placeholder:text-slate-400 text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white transition-all text-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold uppercase">
                          Corporate Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          maxLength={100}
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="e.g. anand@company.com"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 placeholder:text-slate-400 text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white transition-all text-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold uppercase">
                          Detail Statement of Requirements <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[9px] font-mono text-slate-400">
                          {contactForm.message.length} / 2000
                        </span>
                      </div>
                      <textarea
                        required
                        maxLength={2000}
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Detail which solutions architecture or enterprise products you require context on..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 placeholder:text-slate-400 text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white transition-all text-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitStatus.loading}
                      className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 hover:scale-101"
                    >
                      {contactSubmitStatus.loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Streaming to database...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Secure Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Sidebar col-span-1 */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Contact options card */}
                <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl border border-slate-800 space-y-5">
                  <div className="border-b border-slate-800 pb-3 flex items-center gap-2 text-cyan-400 font-semibold font-display">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <span>Instant Channels</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">HELPLINE TELEPHONY</span>
                      <a href="tel:+919545870970" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>+91 9545 870 970</span>
                      </a>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">DIGITAL PARCEL POST</span>
                      <a href="mailto:contact@multisarv.com" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>contact@multisarv.com</span>
                      </a>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">CENTRAL OPERATIONS HQ</span>
                      <div className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5 font-sans">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span>Jagatguru Heights, Dehu, Pune, Maharashtra, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ / Info card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl space-y-4 font-sans font-sans">
                  <h4 className="font-display font-semibold text-sm text-slate-950 dark:text-white">Communication SLAs</h4>
                  
                  <div className="space-y-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    <div className="space-y-1">
                      <h5 className="font-medium text-slate-800 dark:text-slate-200">How quickly will you reply?</h5>
                      <p>Inquiries received before 8 PM IST are reviewed by standard solution directors within 2 hours.</p>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-sans">
                      <h5 className="font-medium text-slate-800 dark:text-slate-200">Is my data secure?</h5>
                      <p>Yes, all public submissions are written directly to isolated Firestore clusters guarded by Zero-Trust security rules.</p>
                    </div>
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        )}

        {/* ================= tab: PRIVACY & COOKIES POLICY ================= */}
        {activeTab === "privacy" && (
          <div id="privacy-tab-pane" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in font-sans">
            <div className="text-center space-y-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
                ZERO-TRUST DATA PROTECTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">
                {privacyProductId
                  ? `${ALL_PRODUCTS.find(p => p.id === privacyProductId)?.name ?? ""} — Privacy Policy`
                  : "Privacy & Cookies Policies"}
              </h2>
              <p className="max-w-lg mx-auto text-sm text-slate-500 dark:text-slate-400">
                MultiSarv India respects your privacy and is committed to protecting your personal data in accordance with modern digital protection standards.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Effective Date: June 2026</p>
            </div>

            {/* Product Privacy Selector Grid */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-display flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Product-Specific Privacy Policies
                </h3>
                {privacyProductId && (
                  <button
                    onClick={() => { setPrivacyProductId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-xs text-blue-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> View General Policy
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select a product below to view its dedicated privacy disclosure.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {ALL_PRODUCTS.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => { setPrivacyProductId(prod.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs font-semibold ${
                      privacyProductId === prod.id
                        ? "bg-blue-600 dark:bg-cyan-600 border-blue-500 dark:border-cyan-500 text-white"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-cyan-700 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{prod.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Per-Product Privacy Section */}
            {privacyProductId && (() => {
              const prod = ALL_PRODUCTS.find(p => p.id === privacyProductId);
              const privInfo = PRODUCT_PRIVACY_DATA[privacyProductId];
              if (!prod || !privInfo) return null;
              return (
                <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    {prod.logoUrl ? (
                      <img src={prod.logoUrl} alt={`${prod.name} logo`} className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 shadow-sm select-none" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-500" />
                      </span>
                    )}
                    <div>
                      <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-[10px] uppercase tracking-widest">Product Privacy Policy</span>
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">{prod.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{prod.tagline}</p>
                    </div>
                  </div>

                  {/* Data Collected */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data We Collect</h4>
                    <ul className="space-y-1.5">
                      {privInfo.dataCollected.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Permissions (if any) */}
                  {privInfo.permissions && privInfo.permissions.length > 0 && (
                    <div className="space-y-2 p-4 bg-amber-50/30 dark:bg-amber-950/15 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Device Permissions Requested</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {privInfo.permissions.map((perm, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300">
                            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold">{perm.split(" – ")[0]}</code>
                            {perm.includes(" – ") && <span className="ml-1">– {perm.split(" – ")[1]}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Data Sharing */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data Sharing Policy</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{privInfo.dataSharingPolicy}</p>
                  </div>

                  {/* Data Retention */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data Retention</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{privInfo.dataRetention}</p>
                  </div>

                  {/* Specific Note */}
                  {privInfo.specificNote && (
                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex gap-3 items-start">
                      <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">{privInfo.specificNote}</p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl cursor-pointer"
                    >
                      Privacy Inquiry
                    </button>
                    <button
                      onClick={() => { setPrivacyProductId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl cursor-pointer"
                    >
                      ← General Policy
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* General Privacy Policy (shown when no product is selected) */}
            {!privacyProductId && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex gap-3 items-start">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Introduction & Core Promise</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
                    MultiSarv India is built on the foundation of transparency, integrity, and absolute client trust. We never monetize or rent your corporate data, and all digital communications are guarded by rigorous zero-trust security profiles.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/50 pb-1.5">
                  Information We Collect
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Depending on how you engage with our products (including RealtyConnect, SocietySarv, OnlineSarv, CookIQ, TubeIQ, etc.) and services, we collect:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100/50 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm block mb-1.5">Personal Information</span>
                    <ul className="space-y-1 text-xs list-disc pl-4 text-slate-500 dark:text-slate-400">
                      <li>Full Name</li>
                      <li>Corporate Email Address</li>
                      <li>Mobile Number</li>
                      <li>Company Name / Organization</li>
                      <li>Job Title / Designation</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100/50 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm block mb-1.5">Technical Data</span>
                    <ul className="space-y-1 text-xs list-disc pl-4 text-slate-500 dark:text-slate-400">
                      <li>Browser Metadata & Agents</li>
                      <li>Device Identifiers & Models</li>
                      <li>IP Address Location Ranges</li>
                      <li>Operating System Specifications</li>
                      <li>Application Usage Logs</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100/50 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm block mb-1.5">Firestore Records</span>
                    <ul className="space-y-1 text-xs list-disc pl-4 text-slate-500 dark:text-slate-400">
                      <li>Secure Authentication Sessions</li>
                      <li>Database Collections Documents</li>
                      <li>Public Request Envelopes</li>
                      <li>Platform Preference Fields</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/50 pb-1.5">
                  How We Use Information
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Your details are compiled and referenced strictly to perform essential operational tasks:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-xs sm:text-sm">
                  {[
                    "Deliver services & process user requests",
                    "Optimize page responsiveness & interface flows",
                    "Review, catalog, and reply to client inquiries",
                    "Audit billing trails and manage secure licensing",
                    "Analyze website parameters & server load",
                    "Supercharge context queries via Google Gemini AI APIs"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Processing Section */}
              <div className="space-y-2 p-4 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-50 dark:border-blue-900/30 rounded-2xl">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <span>AI-Powered Feature Processing</span>
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Information submitted to AI-driven modules (such as our proposal drafting sandbox or corporate assistant chat deck) is streamed securely to Google Gemini models. No user inputs are permanently shared with public training databases.
                </p>
              </div>

              {/* GOOGLE PLAY CONSOLE COMPLIANT ANDROID APPS PRIVACY DECLARATION */}
              <div className="space-y-4 p-5 bg-amber-50/30 dark:bg-amber-950/15 border border-amber-100/50 dark:border-amber-900/30 rounded-3xl">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    Android Mobile Apps – Privacy & Data Disclosures
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  The following disclosures outline our data practices specifically for our suite of Android Mobile Applications going live on the Google Play Store. These items are presented in full compliance with the <strong>Google Play Console Developer Content Policy</strong>.
                </p>

                <div className="space-y-4 mt-2">
                  {/* Garage Guru */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Wrench className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Garage Guru (Android Mobile App)</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li><strong>Device Permissions Requested:</strong> <code>CAMERA</code> (to capture vehicle inspection logs, mechanical issues, and custom service parts barcodes), <code>READ_EXTERNAL_STORAGE</code> (to retrieve receipts and local files).</li>
                      <li><strong>Data Collection:</strong> App logs, vehicle registration data, mechanical repair state timestamps, and custom photos uploaded during inspection.</li>
                      <li><strong>Data Sharing:</strong> No personal or diagnostic telemetry data is shared with any third-party advertising agents or marketing companies.</li>
                    </ul>
                  </div>

                  {/* SocietySarv */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <Shield className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">SocietySarv (Android Mobile App)</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li><strong>Device Permissions Requested:</strong> <code>CAMERA</code> (to log security check photos and vehicle plates at housing society gates), <code>POST_NOTIFICATIONS</code> (to send real-time visitor approval, package collection alerts, and community billing dispatches).</li>
                      <li><strong>Data Collection:</strong> Visitor logs, maintenance request forms, member mobile numbers, and resident directory listings.</li>
                      <li><strong>Data Protection:</strong> All records are stored with SSL encryption inside dedicated Firestore databases with strict Firebase security rule rulesets.</li>
                    </ul>
                  </div>

                  {/* OnlineSarv */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-lg">
                        <Globe className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">OnlineSarv / OnlineSarv.com (Android Mobile App)</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li><strong>Device Permissions Requested:</strong> <code>ACCESS_COARSE_LOCATION</code> and <code>ACCESS_FINE_LOCATION</code> (used strictly to dynamically locate and show closest neighborhood service vendors or local enterprise catalogs nearby).</li>
                      <li><strong>Data Collection:</strong> Search inquiries, geolocation coordinates (when browsing lists), customer phone numbers for dispatching quotes, and merchant profiles.</li>
                      <li><strong>Privacy Guarantee:</strong> Geolocation is requested only during active foreground usage and is never polled, tracked, or cached in the background.</li>
                    </ul>
                  </div>

                  {/* CookIQ */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-lg">
                        <Utensils className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">CookIQ (Android Mobile App)</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li><strong>Device Permissions Requested:</strong> <code>CAMERA</code> (to scan recipe books or grocery product barcodes), <code>WRITE_EXTERNAL_STORAGE</code> (to export grocery shopping lists to user PDF documents).</li>
                      <li><strong>Data Collection:</strong> User pantry item catalogs, custom recipe notes, food preference profiles, and grocery shopping lists.</li>
                      <li><strong>Security Isolation:</strong> Cooking lists and preferences remain localized on the user's secure account space.</li>
                    </ul>
                  </div>

                  {/* TubeIQ */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-lg">
                        <Tv className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">TubeIQ (Android Mobile App)</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li><strong>Device Permissions Requested:</strong> <code>INTERNET</code> (to synchronize metadata trends) and general notification push triggers.</li>
                      <li><strong>Data Collection:</strong> Saved YouTube/video titles, performance prediction keywords, and conceptual content notes.</li>
                      <li><strong>Third-Party Policy:</strong> TubeIQ connects with public statistical services. No sensitive personal accounts credentials or video passwords are accessed or recorded.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cookies Policy */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/50 pb-1.5">
                  Cookies Policy
                </h4>
                
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/70">
                    <span className="font-semibold text-slate-900 dark:text-white block font-sans">Essential Cookies</span>
                    <p className="text-slate-500 mt-1 leading-relaxed">Used for maintaining user authentication sessions, validating secure anti-CSRF tokens, and verifying active administrative access.</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/70">
                    <span className="font-semibold text-slate-900 dark:text-white block font-sans">Analytics Cookies</span>
                    <p className="text-slate-500 mt-1 leading-relaxed">Used to log session duration, tracking high-frequency landing zones, and measuring search performance across catalogs.</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/70">
                    <span className="font-semibold text-slate-900 dark:text-white block font-sans">Preference Cookies</span>
                    <p className="text-slate-500 mt-1 leading-relaxed">Used to capture local variables, chosen UI language, theme selections, and product filtering parameters.</p>
                  </div>
                </div>
              </div>

              {/* Third-Party Services & Security */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs sm:text-sm">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Third-Party Platforms</h4>
                  <p className="text-slate-500 leading-relaxed">
                    We leverage industry-trusted cloud services: Google Cloud Run, Firebase Auth & Firestore, Google Analytics, and the official Google Gen AI SDK.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data Retention & Rights</h4>
                  <p className="text-slate-500 leading-relaxed">
                    We retain billing and inquiry details strictly to provide continued support. You have the full right to request data access, correction, or permanent purge by submitting a request to our directors.
                  </p>
                </div>
              </div>

              {/* Security Guardrails */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Integrated Security Guardrails</h4>
                <div className="flex flex-wrap gap-2">
                  {["SSL/TLS Encryption", "Firestore Rules Isolation", "Google Cloud Authentication", "Role-Based Access Control", "Encrypted Form Pipelines"].map((s, i) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-semibold px-2.5 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Inquiry Contact Box (NO privacy@multisarv.com) */}
              <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-3">
                <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Have Privacy Inquiries?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  To raise a data access or deletion query, please contact our general helpdesk or use our secure Inquiry Transmission Deck.
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Transmit Inquiry
                  </button>
                  <a
                    href="mailto:contact@multisarv.com"
                    className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl"
                  >
                    Email Helpdesk
                  </a>
                </div>
              </div>

            </div>
            )}

          </div>
        )}

      </main>

      {/* 4. FOOTER DEFINITION */}
      <footer id="corporate-footer" className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold">
                  M
                </div>
                <span className="font-display font-bold text-white text-base">MultiSarv India</span>
              </div>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans">
                Engineers of state-of-the-art secure real-time ERP databases. Powering Indian corporate hubs with serverless speed and high-level artificial intelligence integrations.
              </p>
              <div className="text-xs text-slate-600">
                Tagline: "Innovate. Integrate. Inspire."
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Enterprise SaaS Catalog</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 max-w-sm">
                {PRODUCTS.map(prod => (
                  <li key={prod.id}>
                    <button
                      onClick={() => { setSelectedProduct(prod); setActiveTab("products"); }}
                      className="hover:text-cyan-400 hover:underline text-left truncate max-w-[140px]"
                    >
                      {prod.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Privacy Policies</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 max-w-sm">
                {ALL_PRODUCTS.map(prod => (
                  <li key={prod.id}>
                    <button
                      onClick={() => { setPrivacyProductId(prod.id); setActiveTab("privacy"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-cyan-400 hover:underline text-left truncate max-w-[140px] flex items-center gap-1"
                    >
                      <Lock className="w-2.5 h-2.5 shrink-0 text-slate-600" />
                      {prod.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3 font-sans">Corporate Contacts</h4>
              <ul className="space-y-1 text-xs text-slate-500 font-mono">
                <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-600" /><span>contact@multisarv.com</span></li>
                <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-600" /><span>+91 9545 870 970</span></li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-600" /><span>Jagatguru Heights, Dehu, Pune, MH</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Google Tech Integrations</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>Google Gemini 3.5 Flash Model</li>
                <li>Firebase Firestore & Zero-Trust Shield</li>
                <li>Cloud Run Sandbox Pipelines</li>
                <li>Firebase Hosting Nodes</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900/80 text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span>© {new Date().getFullYear()} MultiSarv India, All technical rights secured.</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}
                className="hover:underline cursor-pointer focus:outline-none"
              >
                Secure Terms of Use
              </button>
              <a
                href="#privacy"
                onClick={(e) => { e.preventDefault(); setActiveTab("privacy"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:underline cursor-pointer focus:outline-none"
              >
                Privacy & Cookies Policies
              </a>
              <button 
                onClick={(e) => { e.preventDefault(); setShowSecurityModal(true); }}
                className="hover:underline cursor-pointer focus:outline-none"
              >
                Firestore Security Rules Log
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* --- SECURE TERMS OF USE MODAL --- */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in-quick">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up-quick">
            {/* Modal Header */}
            <div className="flex justify-between items-center sm:px-6 px-4 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-950 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
                  <span>Secure Terms of Use – MultiSarv India</span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Effective Date: June 2026</p>
              </div>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed font-sans scrollbar-thin">
              <p className="font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                Welcome to MultiSarv India. By accessing or using our website, applications, products, and services, you agree to comply with these Terms of Use.
              </p>

              {/* Section 1 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h4>
                <p>By accessing our services, you acknowledge that you have read, understood, and agreed to these Terms of Use.</p>
              </div>

              {/* Section 2 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">2. Services</h4>
                <p>MultiSarv India provides software products, SaaS platforms, mobile applications, websites, AI-powered solutions, CRM systems, and related technology services.</p>
              </div>

              {/* Section 3 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">3. User Responsibilities</h4>
                <p>Users agree to:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Provide accurate information.</li>
                  <li>Maintain the confidentiality of account credentials.</li>
                  <li>Use services lawfully.</li>
                  <li>Not attempt unauthorized access to systems.</li>
                  <li>Not distribute malware or harmful content.</li>
                  <li>Not misuse AI-generated outputs.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">4. Intellectual Property</h4>
                <p>All content, software, logos, trademarks, designs, source code, and materials belong to MultiSarv India unless otherwise stated.</p>
              </div>

              {/* Section 5 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">5. AI Services Disclaimer</h4>
                <p>AI-generated content may contain inaccuracies. Users should independently verify critical information before making decisions.</p>
              </div>

              {/* Section 6 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">6. Security</h4>
                <p>Users shall not:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Attempt hacking or reverse engineering.</li>
                  <li>Circumvent security controls.</li>
                  <li>Access unauthorized data.</li>
                  <li>Interfere with system operations.</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">7. Data Protection</h4>
                <p>We implement industry-standard security measures to protect user information.</p>
              </div>

              {/* Section 8 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">8. Third-Party Services</h4>
                <p>Our services may integrate with:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Google Firebase</li>
                  <li>Google Gemini</li>
                  <li>Google Analytics</li>
                  <li>WhatsApp</li>
                  <li>Payment Gateways</li>
                </ul>
                <p className="mt-2 text-slate-500">We are not responsible for third-party service interruptions.</p>
              </div>

              {/* Section 9 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">9. Limitation of Liability</h4>
                <p>MultiSarv India shall not be liable for indirect, incidental, or consequential damages arising from service usage.</p>
              </div>

              {/* Section 10 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">10. Termination</h4>
                <p>We reserve the right to suspend or terminate accounts violating these terms.</p>
              </div>

              {/* Section 11 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">11. Governing Law</h4>
                <p>These terms shall be governed by the laws of India.</p>
              </div>

              {/* Section 12 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">12. Contact</h4>
                <p>Email: <span className="text-blue-500 font-semibold select-text">support@multisarv.com</span></p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 dark:bg-slate-950/40 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setShowTermsModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl cursor-pointer shadow-md shadow-blue-500/10 transition-transform active:scale-95"
              >
                I Accept & Understand
              </button>
            </div>
          </div>
        </div>
      )}



      {/* --- FIRESTORE SECURITY RULES & AUDIT LOGS MODAL --- */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in-quick">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up-quick">
            
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-950/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Shield className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base sm:text-xl text-slate-950 dark:text-white flex items-center gap-2">
                    <span>Firestore Enterprise Security Rules & Logs</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Role-Based Access Control (RBAC) & Real-Time Integrity Audit Console</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSecurityModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer self-start sm:self-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Selector Segment */}
            <div className="flex border-b border-slate-100 dark:border-slate-800/60 p-1 bg-slate-50/30 dark:bg-slate-950/15 shrink-0 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveSecurityTab("rules")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeSecurityTab === "rules"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Security Rules (.rules)</span>
              </button>
              
              <button
                onClick={() => setActiveSecurityTab("logs")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeSecurityTab === "logs"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Live Audit Console</span>
                <span className="bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-full text-[10px] font-sans font-semibold ml-1">
                  {auditLogs.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSecurityTab("checklist")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeSecurityTab === "checklist"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Audited Actions</span>
              </button>

              <button
                onClick={() => setActiveSecurityTab("retention")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeSecurityTab === "retention"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Retention Standards</span>
              </button>
            </div>

            {/* Modal Content Stage */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-6 bg-slate-50/20 dark:bg-slate-905">
              
              {/* TAB 1: RULES PREVIEW */}
              {activeSecurityTab === "rules" && (
                <div className="space-y-4 animate-fade-in-quick">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow space-y-2 max-w-full md:max-w-[65%]">
                      <div className="flex justify-between items-center bg-slate-900/95 text-[10px] text-slate-400 font-mono px-4 py-2 rounded-t-xl border-x border-t border-slate-800">
                        <span>firestore.rules</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(FIRESTORE_RULES_TEXT);
                            setCopiedRules(true);
                            setTimeout(() => setCopiedRules(false), 2000);
                          }}
                          className="flex items-center gap-1 py-1 px-2.5 hover:bg-slate-800 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedRules ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Rules</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-b-xl border-x border-b border-rose-950/20 max-h-[480px] overflow-y-auto overflow-x-auto scrollbar-thin">
                        <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre select-all text-left">
                          {FIRESTORE_RULES_TEXT}
                        </pre>
                      </div>
                    </div>

                    {/* Explanatory Sidebar */}
                    <div className="w-full md:w-[35%] space-y-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-left">
                        <h4 className="font-bold text-xs uppercase text-slate-405 tracking-wider flex items-center gap-1.5 mb-2 font-mono">
                          <Lock className="w-3.5 h-3.5 text-blue-500" />
                          <span>Helper Functions</span>
                        </h4>
                        <div className="space-y-3 text-xs">
                          <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800/50">
                            <code className="text-blue-500 dark:text-blue-400 font-mono font-bold block">isAuthenticated()</code>
                            <p className="text-slate-500 mt-1">Demands a verified session token issued via Google Firebase Auth.</p>
                          </div>
                          <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800/50">
                            <code className="text-blue-500 dark:text-blue-400 font-mono font-bold block">isAdmin()</code>
                            <p className="text-slate-500 mt-1">Restricts access to accounts matching customized administrative claims.</p>
                          </div>
                          <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800/50">
                            <code className="text-blue-500 dark:text-blue-400 font-mono font-bold block">isOwner(userId)</code>
                            <p className="text-slate-500 mt-1">Matches authenticated user IDs preventing data access by third parties.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50/30 dark:bg-blue-950/15 border border-blue-50 dark:border-blue-900/30 rounded-2xl space-y-2 text-left">
                        <h4 className="font-bold text-slate-905 dark:text-white text-xs sm:text-sm flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span>Enterprise Shield</span>
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          These declarative security rules run directly validation checks on firestore endpoints. Even if client keys are public, rules guarantee zero-leak access vectors across India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE AUDIT LOGS */}
              {activeSecurityTab === "logs" && (
                <div className="space-y-4 animate-fade-in-quick text-left">
                  
                  {/* Operations simulator hub */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner-lg space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-white hover:text-blue-400 transition-colors font-bold text-xs sm:text-sm flex items-center gap-1.5 uppercase font-mono tracking-wider">
                          <Bot className="w-3.5 h-3.5 text-blue-500 animate-bounce" />
                          <span>Interactive Real-time Security Simulator</span>
                        </span>
                        <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Simulate actions to test rule validity and log persistence</p>
                      </div>
                      <button
                        onClick={() => {
                          localStorage.removeItem("multisarv_audit_logs");
                          // Reset to initial defaults
                          const initialLogs = [
                            {
                              logId: "LOG-5891",
                              userId: "UID-88219",
                              userName: "Ramdas Raut",
                              userRole: "Admin",
                              action: "UPDATE",
                              module: "Security Rules",
                              documentId: "FIRESTORE_RULES",
                              oldValue: { "version": 1, "status": "draft" },
                              newValue: { "version": 2, "rules_version": "2", "status": "active_deployed" },
                              ipAddress: "103.241.12.89",
                              deviceInfo: "Chrome 125 / Windows 11",
                              timestamp: "2026-06-11 09:30:15"
                            },
                            {
                              logId: "LOG-5892",
                              userId: "UID-88219",
                              userName: "Ramdas Raut",
                              userRole: "Admin",
                              action: "UPDATE",
                              module: "Products",
                              documentId: "PRODUCT_REALTYCONNECT",
                              oldValue: { "name": "RealtyConnect", "pricing": "₹3,999" },
                              newValue: { "name": "RealtyConnect", "pricing": "₹4,999" },
                              ipAddress: "103.241.12.89",
                              deviceInfo: "Chrome 125 / Windows 11",
                              timestamp: "2026-06-11 09:41:00"
                            },
                            {
                              logId: "LOG-5893",
                              userId: "UID-10928",
                              userName: "Sanjay Sharma",
                              userRole: "Client / Lead",
                              action: "CREATE",
                              module: "Leads",
                              documentId: "LEAD_L-101",
                              oldValue: null,
                              newValue: { "name": "Sanjay Sharma", "score": 92 },
                              ipAddress: "157.24.98.112",
                              deviceInfo: "Safari Mobile / iOS 17",
                              timestamp: "2026-06-11 09:45:11"
                            },
                            {
                              logId: "LOG-5894",
                              userId: "SYSTEM_AI_NODE",
                              userName: "SarvAI Core Integration",
                              userRole: "AI Automations",
                              action: "AI_REQUEST",
                              module: "Gemini Model Service",
                              documentId: "AI_QUALIFY_L-101",
                              oldValue: null,
                              newValue: { "prompt_tokens": 1280, "action": "score_calculation", "rating": "qualified" },
                              ipAddress: "34.120.45.210",
                              deviceInfo: "Google Gemini 3.5 Flash Model Service Node",
                              timestamp: "2026-06-11 09:45:13"
                            }
                          ];
                          setAuditLogs(initialLogs);
                          localStorage.setItem("multisarv_audit_logs", JSON.stringify(initialLogs));
                        }}
                        className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 hover:text-rose-400 font-mono transition-colors border border-slate-800 hover:border-rose-950/40 px-2.5 py-1.5 rounded bg-slate-950 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Reset Logs</span>
                      </button>
                    </div>

                    {/* Action Hub Buttons */}
                    <div className="flex flex-wrap gap-2 pt-1 font-mono">
                      
                      <button
                        onClick={() => {
                          const newLog = {
                            logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                            userId: "UID-88219",
                            userName: "Ramdas Raut",
                            userRole: "Admin",
                            action: "LOGIN",
                            module: "Authentication",
                            documentId: "AUTH_ROUTER",
                            oldValue: null,
                            newValue: { "auth_session": "active", "status": "mfa_verified" },
                            ipAddress: "103.241.12.92",
                            deviceInfo: "Chrome 125 / macOS Sequoia",
                            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
                          };
                          const updated = [newLog, ...auditLogs];
                          setAuditLogs(updated);
                          localStorage.setItem("multisarv_audit_logs", JSON.stringify(updated));
                        }}
                        className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-900 text-emerald-400 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all hover:scale-102 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Simulate Admin Login</span>
                      </button>

                      <button
                        onClick={() => {
                          const newLog = {
                            logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                            userId: "SYSTEM_AI_NODE",
                            userName: "SarvAI Agent-3",
                            userRole: "AI Automations",
                            action: "AI_REQUEST",
                            module: "Lead Qualification Engine",
                            documentId: "AI_LOGS_CRM",
                            oldValue: null,
                            newValue: { "module": "RealtyConnect", "triggered": "WhatsApp Webhook push", "metrics_evaluation": "high" },
                            ipAddress: "34.120.45.210",
                            deviceInfo: "Google Gemini 3.5 Flash Model Service Node",
                            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
                          };
                          const updated = [newLog, ...auditLogs];
                          setAuditLogs(updated);
                          localStorage.setItem("multisarv_audit_logs", JSON.stringify(updated));
                        }}
                        className="bg-blue-950/60 hover:bg-blue-900 border border-blue-900 text-blue-400 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all hover:scale-102 cursor-pointer"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Simulate AI Request</span>
                      </button>

                      <button
                        onClick={() => {
                          const newLog = {
                            logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                            userId: "VIOLATION_BLOCKED",
                            userName: "Anonymous Client App Instance",
                            userRole: "Public Guest (unauthorized)",
                            action: "SECURITY_EVENT",
                            module: "Audit Logs Write Block",
                            documentId: "$REJECTED_LOG_ID",
                            oldValue: null,
                            newValue: { "error": "Insufficient Permission", "source_rule": "allow write: if false;", "attempted_write": "illegal_delete_records" },
                            ipAddress: "192.168.4.221",
                            deviceInfo: "cURL / Postman Mock Agent Simulator",
                            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
                          };
                          const updated = [newLog, ...auditLogs];
                          setAuditLogs(updated);
                          localStorage.setItem("multisarv_audit_logs", JSON.stringify(updated));
                        }}
                        className="bg-rose-950/60 hover:bg-rose-900 border border-rose-900 text-rose-450 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all hover:scale-102 cursor-pointer"
                      >
                        <AlertCircle className="w-3.5 h-3.5 animate-bounce" />
                        <span>Simulate Write Security Violation (Denied)</span>
                      </button>

                      <button
                        onClick={() => {
                          const newLog = {
                            logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                            userId: "UID-88219",
                            userName: "Ramdas Raut",
                            userRole: "Admin",
                            action: "UPDATE",
                            module: "Blogs Collection",
                            documentId: "BLOG-101",
                            oldValue: { "published": false },
                            newValue: { "published": true, "category": "AI Integration" },
                            ipAddress: "103.241.12.89",
                            deviceInfo: "Chrome 125 / Windows 11",
                            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
                          };
                          const updated = [newLog, ...auditLogs];
                          setAuditLogs(updated);
                          localStorage.setItem("multisarv_audit_logs", JSON.stringify(updated));
                        }}
                        className="bg-amber-950/60 hover:bg-amber-900 border border-amber-900 text-amber-400 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all hover:scale-102 cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Simulate Blog Publishing</span>
                      </button>

                    </div>
                  </div>

                  {/* Interactive Search Console */}
                  <div className="flex bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-1.5 items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search live audit logs by userName, role, action, or module..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="bg-transparent text-xs text-slate-800 dark:text-slate-100 flex-grow focus:outline-none placeholder-slate-400"
                    />
                    {auditSearch && (
                      <button onClick={() => setAuditSearch("")} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Log entries board */}
                  <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-950/40">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase tracking-widest font-mono font-bold text-[10px]">
                            <th className="px-4 py-3 text-center w-[90px]">Log ID</th>
                            <th className="px-4 py-3">Initiator</th>
                            <th className="px-4 py-3">Action</th>
                            <th className="px-4 py-3">Module Affected</th>
                            <th className="px-4 py-3">Source IP</th>
                            <th className="px-4 py-3 text-right">Timestamp (UTC)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                          {auditLogs
                            .filter(log => {
                              if (!auditSearch) return true;
                              const s = auditSearch.toLowerCase();
                              return (
                                log.userName.toLowerCase().includes(s) ||
                                log.userRole.toLowerCase().includes(s) ||
                                log.action.toLowerCase().includes(s) ||
                                log.module.toLowerCase().includes(s) ||
                                log.logId.toLowerCase().includes(s)
                              );
                            })
                            .map((log) => {
                              const isViolation = log.action === "SECURITY_EVENT" || log.userId === "VIOLATION_BLOCKED";
                              return (
                                <React.Fragment key={log.logId}>
                                  <tr className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors ${isViolation ? "bg-rose-500/5 dark:bg-rose-950/15" : ""}`}>
                                    <td className="px-4 py-3 font-mono text-[10px] font-bold text-slate-400 text-center">{log.logId}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <div className="flex flex-col">
                                        <span className="font-semibold text-slate-850 dark:text-slate-105">{log.userName}</span>
                                        <span className={`text-[10px] font-mono ${isViolation ? "text-rose-500" : "text-slate-500"}`}>{log.userRole}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                        log.action === "LOGIN" ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" :
                                        log.action === "CREATE" ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400" :
                                        log.action === "UPDATE" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" :
                                        isViolation ? "bg-rose-105 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold border border-rose-800/40 animate-pulse" :
                                        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                      }`}>
                                        {log.action}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{log.module}</td>
                                    <td className="px-4 py-3 font-mono text-[10px] text-slate-500">{log.ipAddress}</td>
                                    <td className="px-4 py-3 text-right font-mono text-[10px] text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                                  </tr>
                                  {/* Inner JSON values for deep logging inspection */}
                                  <tr className="bg-slate-50/20 dark:bg-slate-950/10">
                                    <td colSpan={6} className="px-4 py-2 text-[10px] border-b border-dashed dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                        <span className="shrink-0"><span className="text-slate-400 dark:text-slate-600">Device Target:</span> {log.deviceInfo}</span>
                                        {log.oldValue && (
                                          <span className="truncate max-w-[250px]"><span className="text-slate-400 dark:text-slate-600">Old Value:</span> {JSON.stringify(log.oldValue)}</span>
                                        )}
                                        {log.newValue && (
                                          <span className="truncate max-w-[250px]"><span className="text-slate-400 dark:text-slate-600">New Value:</span> {JSON.stringify(log.newValue)}</span>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: AUDITED ACTIONS LIST */}
              {activeSecurityTab === "checklist" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-quick text-left">
                  
                  <div className="p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <h4 className="font-display font-black text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/85 pb-1">
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <span>Security & Identity Tracking</span>
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "Authentication Sessions (Login)", desc: "Triggers Audit Logging for any login execution from users, including device profiles and GeoIP mapping." },
                        { title: "Session Disconnection (Logout)", desc: "Safeguards sessions by logging explicit token self-revocation." },
                        { title: "User Profile Management", desc: "Monitors the creation, authorization status changes, and status alterations of all active tenants." },
                        { title: "Role Changes", desc: "Audits security clearance switches in custom attributes, crucial for admin claims protection." },
                        { title: "Security Violation Events", desc: "Captures anomalous write proposals blocked by standard match clauses (allow write: if false)." }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs border-b border-slate-50 dark:border-slate-900/40 pb-2 bg-transparent last:border-none">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                            <p className="text-slate-500 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <h4 className="font-display font-black text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/85 pb-1">
                      <Database className="w-4 h-4 text-blue-500" />
                      <span>SaaS Records & Core Pipelines</span>
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "Create Record Activity", desc: "Identifies timestamp and creator of new Leads, Products, and Blogs across SaaS networks." },
                        { title: "Update Record States", desc: "Verifies historical state changes by keeping strict record traces of pre-modified and post-modified key variables." },
                        { title: "Delete Record Activity", desc: "Logs any deletion action which is restricted to system admin roles only." },
                        { title: "Settings Modification Audits", desc: "Tracks enterprise environment parameter adjustments." },
                        { title: "AI Requests Telemetry", desc: "Monitors token consumption rates, model versions, and outputs generated via Google Gemini pipeline requests." },
                        { title: "Lead Assignments Track", desc: "Maintains transparency of sales lead routing across RealtyConnect, SocietySarv and SaaS pipelines." }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs border-b border-slate-50 dark:border-slate-900/40 pb-2 bg-transparent last:border-none">
                          <Check className="w-4 h-4 text-blue-505 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                            <p className="text-slate-500 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: RECOMMENDED RETENTION STANDARDS */}
              {activeSecurityTab === "retention" && (
                <div className="space-y-5 animate-fade-in-quick text-left">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Audit Logs", retention: "5 Years", color: "from-blue-500 to-cyan-500", desc: "Mandatory corporate auditing logs tracing write actions, state differences, and administrative database calls." },
                      { title: "Login Logs", retention: "2 Years", color: "from-emerald-500 to-teal-500", desc: "Identity log tracking active browser logins, GeoIP telemetry, and MFA validation attempts." },
                      { title: "Security Logs", retention: "7 Years", color: "from-red-500 to-rose-500", desc: "Critical security violation signals, blocked writes, cross-site telemetry alarms, and system integrity incidents." },
                      { title: "Error Logs", retention: "1 Year", color: "from-amber-600 to-orange-500", desc: "Application trace details, system warnings, failed Firebase rule checks, and internal code error diagnostic exceptions." }
                    ].map((card, i) => (
                      <div key={i} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block">{card.title}</span>
                          <span className={`text-2xl sm:text-3xl font-display font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent block mt-1`}>{card.retention}</span>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.desc}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 mt-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <span>Recommended Duration</span>
                          <span className="font-bold">Compliance Tier-A</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Architecture alignment footer details */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-850 dark:text-slate-100 text-xs sm:text-sm block">MultiSarv India Enterprise Multi-tenant SaaS Compliance Standard</span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Our default retention policies are aligned to global SOC2 Security Principles, HIPAA Medical Ledger benchmarks, and ISO 27001 data protection workflows. Scaled storage and retention are handled efficiently under server-side processes, ensuring future products such as RealtyConnect, SocietySarv, SocietyConnect, and HRSarv running on Google Cloud Firebase share fully vetted auditing schemas.
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 dark:bg-slate-950/40 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                SECURE ENDPOINT VALIDATED ● SOC2 COMPLIANT SHA-256
              </p>
              <button
                onClick={() => setShowSecurityModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl cursor-pointer shadow-md shadow-blue-500/10 transition-transform active:scale-95 ml-auto"
              >
                Accept & Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
