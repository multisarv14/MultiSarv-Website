import logoRealtySarv from "../assets/images/logo-realtysarv.webp";
import logoSocietySarv from "../assets/images/logo-societysarv.webp";
import logoHRSarv from "../assets/images/logo-hrsarv.webp";
import logoFinSarv from "../assets/images/logo-finsarv.webp";
import logoEduSarv from "../assets/images/logo-edusarv.webp";
import logoHealthSarv from "../assets/images/logo-healthsarv.webp";
import logoRealtyConnect from "../assets/images/logo-realtyconnect.webp";
import logoOnlineSarv from "../assets/images/logo-onlinesarv.webp";
import logoDomainLink from "../assets/images/logo-domainlink.webp";

import { ProductDetails, ServiceDetail } from "../types";

export const ALL_PRODUCTS: ProductDetails[] = [
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

// Active products shown in main catalog (subset of ALL_PRODUCTS)
export const PRODUCTS: ProductDetails[] = ALL_PRODUCTS.filter(p =>
  ["realtyconnect", "noai", "onlinesarv", "garageguru", "cookiq", "tubeiq", "domainlink", "societysarv"].includes(p.id)
);

// Product categories
export const PRODUCT_CATEGORIES = [
  {
    slug: "real-estate",
    name: "Real Estate",
    description: "Property management, broker networks, and housing society platforms",
    productIds: ["realtysarv", "societysarv", "realtyconnect"]
  },
  {
    slug: "business-saas",
    name: "Business SaaS",
    description: "HR, Finance, and operations tools for growing enterprises",
    productIds: ["hrsarv", "finsarv", "onlinesarv"]
  },
  {
    slug: "consumer-apps",
    name: "Consumer Apps",
    description: "Mobile-first apps for everyday consumers",
    productIds: ["cookiq", "tubeiq", "garageguru"]
  },
  {
    slug: "education-health",
    name: "Education & Health",
    description: "Smart solutions for schools, institutes, and healthcare providers",
    productIds: ["edusarv", "healthsarv"]
  },
  {
    slug: "tech-tools",
    name: "Tech Tools",
    description: "Developer and business infrastructure tools",
    productIds: ["domainlink", "noai"]
  }
];

export const SERVICES: ServiceDetail[] = [
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
    shortDesc: "Embed intelligent LLM classifiers directly inside your operational flows.",
    icon: "Bot",
    features: ["Gemini model embed", "Custom prompt engineering", "RAG-based knowledge feed"],
    techStack: ["Google Gemini", "Vertex AI", "LangChain"]
  },
  {
    id: "biz-auto",
    name: "Business Automation",
    shortDesc: "Map your business rules into automated workflows that trigger on key data events.",
    icon: "Sliders",
    features: ["Rule-based event triggers", "Cloud Functions pipelines", "Cron-based task schedulers"],
    techStack: ["Firebase Cloud Functions", "Pub/Sub", "Scheduler"]
  },
  {
    id: "saas-launch",
    name: "SaaS Development",
    shortDesc: "Full-stack product engineering services from concept to commercial deployment.",
    icon: "Globe",
    features: ["SaaS billing integrations", "Multi-tenant architecture", "Role-based user seats"],
    techStack: ["React", "Firebase", "Stripe API"]
  },
  {
    id: "digi-transform",
    name: "Digital Transformation",
    shortDesc: "Migrate legacy data stacks to serverless cloud paradigms safely and efficiently.",
    icon: "Briefcase",
    features: ["Legacy system audit", "Incremental migration design", "Data validation checklists"],
    techStack: ["Cloud Migration", "ETL Pipelines", "Firebase"]
  },
  {
    id: "cloud-solutions",
    name: "Cloud Solutions",
    shortDesc: "Configure multi-zone Google Cloud environments with automated backups and uptime guarantees.",
    icon: "Shield",
    features: ["Multi-zone auto-scaling", "Automated backup jobs", "Live SLA monitoring"],
    techStack: ["GCP", "Cloud Run", "Firebase Hosting"]
  }
];

// Per-product privacy policy content
export interface ProductPrivacyInfo {
  dataCollected: string[];
  permissions?: string[];
  dataSharingPolicy: string;
  dataRetention: string;
  specificNote?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  policySections?: {
    heading: string;
    paragraphs?: string[];
    items?: string[];
  }[];
}

export const PRODUCT_PRIVACY_DATA: Record<string, ProductPrivacyInfo> = {
  realtysarv: {
    dataCollected: ["Client names and corporate contact details", "Property inquiry and broker assignment records", "Sales pipeline stages and lead scoring metadata", "In-app PDF interaction logs"],
    dataSharingPolicy: "No data is shared with external marketing agencies. Broker records are visible only within the subscribed organization's workspace.",
    dataRetention: "Client and broker records are retained as long as the subscription is active, plus 12 months after termination for audit purposes.",
    specificNote: "All financial and contact data is stored under SSL-encrypted Firestore collections with role-based access rules."
  },
  societysarv: {
    dataCollected: [
      "Flat/unit number, resident name, contact number, email address, ownership status (Owner/Tenant), and vehicle registration details",
      "Maintenance bills, bill periods, dues amounts, payment status, payment receipts, payment mode (UPI/Cash/Bank Transfer), and society expense records",
      "Visitor names, vehicle numbers, entry/exit timestamps, destination flat numbers, visitor categories, and visitor passcodes",
      "Helpdesk issue descriptions, maintenance ticket categories, and ticket resolution statuses",
      "App crash logs, device model, operating system version, and general telemetry used for performance monitoring and bug fixes"
    ],
    permissions: [
      "INTERNET – to sync society records, notices, and payment statuses",
      "STORAGE / MEDIA – to save and download PDF receipts, financial balance sheet reports, and maintenance statements",
      "CAMERA (Optional) – to scan visitor passes or attach photos to maintenance complaints"
    ],
    dataSharingPolicy: "We do not sell, rent, or trade personal information to third parties or advertisers. Authorized Society Management Committee members may view unit ledgers, payment statuses, and visitor logs for administrative audits. Information may also be disclosed when required by applicable Indian laws, cooperative housing society regulations, or law enforcement requests.",
    dataRetention: "Society administrators may request account closure and deletion of a resident profile when the resident moves out. Other society records are retained as needed for society administration, accounting, security, and legal compliance.",
    specificNote: "Society data, accounting ledgers, and visitor logs are stored using local on-device databases (Room SQLite) and protected cloud backends with encryption in transit and at rest.",
    effectiveDate: "August 18, 2026",
    lastUpdated: "August 18, 2026",
    policySections: [
      {
        heading: "Policy Overview",
        paragraphs: ["SocietySarv (\"we\", \"our\", or \"us\") is dedicated to protecting the privacy and personal data of housing society residents, management committee members, accounting staff, and security personnel using the SocietySarv Android application."]
      },
      {
        heading: "How We Use Your Information",
        paragraphs: ["We use the collected information exclusively for housing society administrative purposes."],
        items: [
          "Generating and maintaining society maintenance bills, ledgers, and payment receipts.",
          "Facilitating secure UPI payment QR generation and payment tracking.",
          "Authorizing and logging visitor entries at the security gate.",
          "Routing and resolving resident helpdesk complaints.",
          "Publishing society circulars, notices, and financial balance sheets.",
          "Providing English, Hindi, and Marathi localization according to user preference."
        ]
      },
      {
        heading: "Data Storage & Local Persistence",
        paragraphs: ["Society data, accounting ledgers, and visitor logs are securely stored using local on-device databases (Room SQLite) and protected cloud backends with industry-standard encryption in transit and at rest."]
      },
      {
        heading: "Data Security",
        paragraphs: ["We implement strict administrative, technical, and physical security measures to safeguard personal data against unauthorized access, loss, alteration, or misuse."]
      },
      {
        heading: "User Rights & Data Deletion",
        paragraphs: ["Residents and society administrators may access, update, or correct personal and flat details. Residents may request account closure and deletion of their resident profile upon moving out of the society. Data deletion requests can be submitted using the contact details below."]
      },
      {
        heading: "Children's Privacy",
        paragraphs: ["SocietySarv is intended for adult residents, property owners, and housing society personnel. We do not knowingly collect personal information from children under 13."]
      },
      {
        heading: "Changes to This Privacy Policy",
        paragraphs: ["We may periodically update this Privacy Policy. Any modifications will be posted on this page with an updated Last Updated date."]
      },
      {
        heading: "Contact Us",
        paragraphs: ["For questions, concerns, or requests regarding this Privacy Policy or data handling in SocietySarv, contact the SocietySarv Team at support@multisarv.com."]
      }
    ]
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
    dataCollected: ["Customer name, mobile number, and address", "Vehicle registration number, make, model, fuel type, odometer reading, service history, and inspection reports", "Service estimates, labor charges, spare parts pricing, payment modes, discounts, and cashbook expenses", "Team member profiles, assigned roles, and access credentials"],
    permissions: ["android.permission.CAMERA – to scan vehicle QR codes and barcodes and capture vehicle intake inspection photos", "READ_EXTERNAL_STORAGE / WRITE_EXTERNAL_STORAGE – to save, export, and download PDF invoices, estimates, and local backup files", "INTERNET / ACCESS_NETWORK_STATE – to process AI vehicle diagnostic queries and verify connectivity"],
    dataSharingPolicy: "Garage Guru does not sell, rent, leak, or share garage customer records, vehicle databases, or financial revenue figures with third parties or competitors. Invoices shared through WhatsApp or SMS are transmitted directly using the device's native sharing capabilities.",
    dataRetention: "Information remains stored locally in the app for as long as the garage user maintains the application on their device. Garage owners can edit or delete individual job cards, customers, or invoices at any time. Clearing app data or uninstalling the app permanently removes all locally stored records.",
    specificNote: "Customer profiles, job cards, and billing logs are stored in an encrypted local Room database. Vehicle symptom inputs sent to the AI Diagnostic Assistant are processed without personal customer details such as names or phone numbers.",
    effectiveDate: "August 12, 2026",
    lastUpdated: "August 12, 2026",
    policySections: [
      {
        heading: "Policy Overview",
        paragraphs: ["Powered by MultiSarv, Garage Guru is an all-in-one garage and auto repair management platform designed for garages, auto service centers, workshops, and independent mechanics.", "This Privacy Policy explains how the Garage Guru mobile application collects, uses, stores, and safeguards information entered by garage owners and users. By using Garage Guru, you agree to the collection and use of information in accordance with this Privacy Policy."]
      },
      {
        heading: "How Information Is Used",
        paragraphs: ["Data entered into Garage Guru is used exclusively to facilitate day-to-day garage operations."],
        items: ["Creating job cards, digital repair estimates, and GST/Non-GST invoices for vehicle owners.", "Assisting mechanics with AI-powered diagnostic recommendations.", "Assigning repair tasks and tracking service status within workshops.", "Generating business analytics, daily income/expense summaries, and service reports."]
      },
      {
        heading: "Data Ownership & Security",
        paragraphs: ["All customer profiles, job cards, and billing logs are saved securely in an encrypted local database (Room) on the device.", "We do not sell, rent, leak, or share any garage's customer records, vehicle database, or financial revenue figures with third parties or competitors. Each garage's data remains private to them.", "Vehicle symptom inputs sent to the AI Diagnostic Assistant are processed without personal customer details such as names or phone numbers."]
      },
      {
        heading: "Data Sharing & External Links",
        paragraphs: ["Garage Guru does not host third-party advertisements or sell user tracking profiles. Information is shared only when explicitly initiated by the garage user.", "Invoices and estimates shared via WhatsApp or SMS are transmitted directly using the device's native sharing capabilities."]
      },
      {
        heading: "Children's Privacy",
        paragraphs: ["Garage Guru is a professional enterprise application for automotive businesses and adults. It is not intended for or directed toward children under 13 years of age."]
      },
      {
        heading: "Policy Updates",
        paragraphs: ["We may update this Privacy Policy from time to time to reflect new app capabilities or compliance requirements. Updates will be effective immediately upon publication of the updated policy."]
      }
    ]
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

// Case studies data
export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  product: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "singhal-builders",
    client: "Singhal Builders Ltd.",
    industry: "Real Estate",
    product: "RealtyConnect",
    challenge: "Managing 50+ independent brokers across Mumbai with no unified dashboard, leading to missed leads and commission disputes.",
    solution: "Deployed RealtyConnect with verified broker identity validation, commission escrow logs, and real-time property matching.",
    results: ["45% increase in lead conversions", "Zero commission disputes in 6 months", "50+ brokers onboarded in 2 weeks"],
    testimonial: "Deploying RealtyConnect for our broker pipelines across Mumbai completely transformed client operations. Real-time notifications keep brokers aligned instantly.",
    testimonialAuthor: "Akash Singhal",
    testimonialRole: "Director of CRM, Singhal Builders Ltd."
  },
  {
    id: "orchid-hills",
    client: "Orchid Hills Heights",
    industry: "Housing Society",
    product: "SocietySarv",
    challenge: "Manual maintenance billing, paper-based visitor logs, and no way to send community notices quickly.",
    solution: "Implemented SocietySarv with digital billing, gate entry logs, UPI-based maintenance collection, and circular notice broadcasting.",
    results: ["99% timely maintenance collections", "Visitor gate processing under 15 seconds", "100% digital billing with UPI integration"],
    testimonial: "The zero-trust Firebase rules security layer on SocietySarv gave our housing society residents complete confidence in payment pathways.",
    testimonialAuthor: "Commander V. K. Rao (Retd)",
    testimonialRole: "President, Orchid Hills Heights"
  },
  {
    id: "nair-diagnostic",
    client: "Nair Diagnostic Center",
    industry: "Healthcare",
    product: "HealthSarv",
    challenge: "Overcrowded OPD queues, paper-based prescription records, and no real-time pharmacy billing system.",
    solution: "Deployed HealthSarv with digital OPD queue management, encrypted EHR records, and integrated pharmacy invoicing.",
    results: ["Patient wait times reduced below 15 minutes", "100% digital prescription records", "Zero paper prescription tracking"],
    testimonialAuthor: "Dr. Priyesha Nair",
    testimonialRole: "Director, Nair Diagnostic Center"
  },
  {
    id: "raut-enterprises",
    client: "Raut Enterprises",
    industry: "Business",
    product: "HRSarv",
    challenge: "Tracking attendance of 200+ field employees spread across multiple locations with frequent payroll errors.",
    solution: "Integrated HRSarv with GPS geo-fenced check-ins, automated payroll processing, and self-service employee portal.",
    results: ["Zero attendance leakage", "Payroll processing time cut from 3 days to 2 hours", "200+ employees onboarded seamlessly"],
    testimonialAuthor: "Sanjay Raut",
    testimonialRole: "Managing Director, Raut Enterprises"
  }
];
