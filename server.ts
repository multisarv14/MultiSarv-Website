import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.warn("WARNING: GEMINI_API_KEY is not configured or is a placeholder. Using intelligent fallbacks.");
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // High-quality simulated response when local API key is missing
      const fallbackReplies: { [key: string]: string } = {
        realtysarv: "RealtySarv is our premier real-estate CRM and lead listing pipeline manager. It is designed to empower real estate developers, brokers, and consultants with instant lead updates, custom followups, commission trackers, and customer portal integration.",
        societysarv: "SocietySarv provides automated workflows for residential and office society management. Its features coverGatekeeper security logs, resident directory coordination, digital Maintenance bill generation, online clubhouse bookings, and instant broadcast notifications.",
        hrsarv: "HRSarv handles all human-resource operations. It supports geo-tagged attendance check-ins, fully-automated salary slips generation, leaves balance tracking, target management, and structured performance reviews.",
        finsarv: "FinSarv is our enterprise secure financial auditing suite. It streamlines compliance checks, generates secure invoices, maintains ledgers, and integrates dynamic GST/tax dashboards directly with Firestore databases.",
        edusarv: "EduSarv is a modern educational ERP system suitable for schools, institutes, and colleges. It manages student data profiles, schedules exams, tracks school buses with GPS, and serves virtual learning content.",
        healthsarv: "HealthSarv is built for healthcare setups and multi-facility hospitals. Includes EHR records tracker, digital pharmacy bills, clinic OPD queue management, and doctors appointment schedules.",
        realtyconnect: "RealtyConnect is an exclusive real estate broker aggregation pool that matches buyers with properties instantly in real-time.",
        demo: "Absolutely! You can trigger a live interactive demo request for any of our services directly via our Products page. Simply fill in your contact coordinates or submit a request and our AI sales qualification engine will qualify the lead instantly.",
        pricing: "MultiSarv provides highly flexible SaaS pricing plans across all products. Standard plans typically start at ₹4,999/month for small startups, Enterprise customizable grids, and Custom Cloud setups built on private Firebase endpoints."
      };

      const lcMsg = message.toLowerCase();
      let responseText = `Thank you for contacting MultiSarv India. I am SarvAI, your expert Corporate Assistant. Currently running in local simulation model.\n\n`;
      let matched = false;

      for (const key of Object.keys(fallbackReplies)) {
        if (lcMsg.includes(key)) {
          responseText += fallbackReplies[key];
          matched = true;
          break;
        }
      }

      if (!matched) {
        responseText += `MultiSarv India stands at the vanguard of modern AI-driven solutions (with Tagline: 'Innovate. Integrate. Inspire.'). We build outstanding cloud integrations, custom CRM layouts, business process automations, and full-stack solutions. \n\nHow can I help you regarding our products (RealtySarv, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, RealtyConnect), pricing tiers, or customized deployments?`;
      }

      return res.json({ text: responseText });
    }

    const systemInstruction = `You are SarvAI, the official AI-driven Solution Architect and technical corporate assistant at MultiSarv India.
Company tagline: "Innovate. Integrate. Inspire."
You are trained in MultiSarv's services and comprehensive suite of specialized SaaS products:
- RealtySarv: Premium real-estate CRM, pipeline tracker, client portal, broker network, customizable property lists.
- SocietySarv: Housing Society Management, guard checkpoint alerts, digital billing & accounts, resident complaint desks, facilities booking, broadcast emails.
- HRSarv: Human Resource management, geo-tracker check-ins, payroll calculator, targets, appraisals.
- FinSarv: Financial ledger software, automated digital billing/invoices with GST, tax visualizers, secure auditing.
- EduSarv: Education & school ERP, student tracking systems, exam planners, virtual class schedules, GPS bus tracker.
- HealthSarv: Complete health workspace, patient file tracker, clinical OPD appointment lists, pharmaceutical records, invoices.
- RealtyConnect: Real-time buyer-property matching pool for independent real estate consultants.

We also offer customized system builds, API integrations, Cloud solutions, and automation engines.

Always write in a highly skilled, polite, professional, and technical corporate tone. Use clear structured Markdown with headers and short bullets inside your replies. Limit your responses to 200 words. Always invite them to submit their details or test the AI Proposal and Qualification tool inside the portal for a personalized blueprint.`;

    const chatHistory = (history || []).map((h: any) => ({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...chatHistory.map((ch: any) => ({ role: ch.role, parts: ch.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: error.message || "An error occurred with SarvAI service" });
  }
});

// 2. Lead Qualification Endpoint
app.post("/api/qualify-lead", async (req, res) => {
  try {
    const { name, email, company, requirements, budget, timeline } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Mock lead validation and score calculation
      let score = 35;
      const parsedNeeds: string[] = ["Custom Software Development"];
      const products: string[] = ["HRSarv"];

      const reqLc = (requirements || "").toLowerCase();
      if (reqLc.includes("flat") || reqLc.includes("house") || reqLc.includes("broker") || reqLc.includes("agent") || reqLc.includes("property")) {
        products.push("RealtySarv");
        products.push("RealtyConnect");
        parsedNeeds.push("Real Estate CRM Solutions");
        score += 25;
      }
      if (reqLc.includes("billing") || reqLc.includes("maintenance") || reqLc.includes("society") || reqLc.includes("apartment")) {
        products.push("SocietySarv");
        parsedNeeds.push("Society Gate & Maintenance ERP");
        score += 20;
      }
      if (reqLc.includes("salary") || reqLc.includes("payroll") || reqLc.includes("attendance") || reqLc.includes("hr")) {
        products.push("HRSarv");
        parsedNeeds.push("HR automation and geo-attendance system");
        score += 20;
      }
      if (reqLc.includes("tax") || reqLc.includes("invoice") || reqLc.includes("finance") || reqLc.includes("gst")) {
        products.push("FinSarv");
        parsedNeeds.push("Secure Financial Accounting ledgers");
        score += 20;
      }
      if (budget === "Enterprise Premium Scale" || budget === "High Level Custom Tier") {
        score += 20;
      }
      if (timeline === "Urgent (under 15 days)") {
        score += 15;
      }

      const scoreFinal = Math.min(100, score);
      return res.json({
        identifiedNeeds: parsedNeeds,
        suggestedProducts: Array.from(new Set(products)),
        leadScore: scoreFinal,
        rationale: `Simulated qualification evaluation completed. Customer demands show strong requirements matching ${products.join(", ")}. Timeline urgency and budget estimates indicate a high quality prospective deal.`
      });
    }

    const leadDump = `Lead Submission Details:
- Name: ${name}
- Email: ${email}
- Company: ${company}
- Requirements Scope: ${requirements}
- Budget Bracket: ${budget}
- Expected Onboarding Timeline: ${timeline}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: leadDump,
      config: {
        systemInstruction: `You are an automated corporate AI Lead Scoring executive at MultiSarv India. Analyze submissions and return suggestions and a score (0 to 100) indicating pipeline fit.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identifiedNeeds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Technical business needs diagnosed from the prompt."
            },
            suggestedProducts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Which MultiSarv SaaS catalog products (RealtySarv, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, RealtyConnect) best suit them."
            },
            leadScore: {
              type: Type.INTEGER,
              description: "Score from 0 (poor fit) to 100 (premium hot lead with budget & defined scope)."
            },
            rationale: {
              type: Type.STRING,
              description: "Concrete business reason explaining how you assessed the score."
            }
          },
          required: ["identifiedNeeds", "suggestedProducts", "leadScore", "rationale"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Lead qualification error:", error);
    res.status(500).json({ error: error.message || "Could not qualify details at this moment" });
  }
});

// 3. AI Proposal Generation
app.post("/api/generate-proposal", async (req, res) => {
  try {
    const { clientName, companyName, selectedProduct, requirements, budget } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        proposalText: `# CORPORATE SYSTEMS INTEGRATION PROPOSAL
**MultiSarv India — Enterprise Solutions**
*Innovate. Integrate. Inspire.*

---

**Prepared For:** ${clientName}
**Organization:** ${companyName || "Independent Enterprise Client"}
**Target Product / System:** MultiSarv ${selectedProduct} Implementation
**Date of Document:** June 2026

## 1. Executive Summary
MultiSarv India welcomes the opportunity to partner with **${companyName || clientName}** in streamlining your software systems. Based on initial inputs, we suggest implementing the **MultiSarv ${selectedProduct}** platform configured with high-performance real-time servers, robust user hierarchies and integrated cloud databases.

## 2. Requirements & Diagnosed Solution Strategy
- **Client Requirements Statement:** *"${requirements || "Integrate advanced dashboard services with instant notifications"}"*
- **Technical Response:** MultiSarv will deploy unified APIs running on server-side modules with high-grade multi-tenant firewalls.
- **Data Architecture:** Fully backed by low-latency Cloud Firestore collections supporting auto-backup schedules, responsive layouts, and cross-platform syncing.

## 3. Recommended Implementation Modules
1. **Module A — Custom Core System Build & Theme Integration:** Clean multi-tenant user portals corresponding to core operations.
2. **Module B — Integrations & Notifications Dispatch:** WhatsApp notification bridges and automated mail schedules.
3. **Module C — AI-Driven Intelligence Grid:** Integrated predictive alerts for active analytics tracking.

## 4. Cost Estimates & Financial Proposal
- **Estimated Service Budget Bracket:** *${budget || "Premium Enterprise Subscription"}*
- **SaaS Base MultiSarv License fee:** Includes unlimited security patches, continuous upgrades, and Firebase deployment logs.

## 5. Timeline Framework
- **Days 1–7:** Database Blueprints, custom logo assets, field configuration.
- **Days 8–18:** Core portal deployment, user testing, onboarding training.
- **Days 19–25:** Production live launch with Firebase Hosting and continuous backup setup.

*Note: This output is prepared in simulation. Please sign the deal inside MultiSarv client management portal to authorize development.*`
      });
    }

    const promptText = `Produce an outstanding, detailed corporate multi-page styled business proposal in Markdown format based on:
- Contact person: ${clientName}
- Company: ${companyName}
- Target MultiSarv solution: ${selectedProduct}
- Customer problem statements: ${requirements}
- Stated budget: ${budget}

Write with absolute corporate authority, including clean titles, executive summaries, target schedules, system architecture components, detailed modules description, custom cost outline, security specs (using Google Cloud, Firebase rules), and realistic timelines. Format nicely with markdown tables, header sections and quotes.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    res.json({ proposalText: response.text });
  } catch (error: any) {
    console.error("Proposal Generator error:", error);
    res.status(500).json({ error: error.message || "Proposal generation failed" });
  }
});

// 4. AI Blog Writer Endpoint
app.post("/api/generate-blog", async (req, res) => {
  try {
    const { topic, category } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: `Transforming Modern ${category || "Industry"} with MultiSarv Cloud-Native ERPs`,
        snippet: `Discover how our suite of applications, including RealtySarv and HRSarv, is redefining performance benchmarks in India.`,
        content: `## Transforming Modern ${category || "Industry"} with MultiSarv Cloud-Native ERPs

In the contemporary era of hyper-scale business challenges, relying on legacy architecture is a key blocker of enterprise productivity. Organizations across India are actively searching for software models that unify automation, AI diagnostics, and robust database storage.

### The Power of Integrated Ecosystems

Rather than running isolated point software systems that never communicate, modern business architectures rely on coordinated ecosystems:
- **Real Estate Pipelines**: Connecting RealtySarv directly with financial ledger models simplifies booking contracts.
- **Staff Optimization**: Integrating HRSarv geo-attendance tracking with automated tax calculations guarantees compliance.

### Leveraging Serverless Firebase Frameworks

MultiSarv India utilizes modern serverless architectures leveraging Firebase Firestore and Cloud Hosting. This provides substantial technological benefits:
1. **Low-Latency Database Reads**: Fast rendering for operational panels.
2. **Deterministic Rules Validation**: Custom database security policies written at the structural level.
3. **Advanced Zero-Trust Authentication**: Multi-layered authorization.

### Summary
Choosing MultiSarv's cloud blueprint allows startups and blue-chip enterprises alike to launch rapidly, scale globally, and automate workflows with zero-infra maintenance costs.`,
        keywords: [category, "MultiSarv India", "Cloud Computing", "Firebase Cloud", "Business Automation"],
        metaDescription: `Read our comprehensive guide on deploying advanced MultiSarv SaaS solutions inside your ${category} enterprise built on high-availability Google technology.`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write an SEO-optimized blog article about: "${topic}" under corporate business category: "${category}".

We are MultiSarv India (tagline: Innovate. Integrate. Inspire.), offering RealtySarv, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, RealtyConnect. Highlight real-time sync, Firebase, and AI integration in the article.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            snippet: { type: Type.STRING, description: "A catchy 1-2 sentence preview snippet" },
            content: { type: Type.STRING, description: "Full blog article in structured Markdown format with headers" },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "SEO keywords" },
            metaDescription: { type: Type.STRING, description: "SEO meta description under 150 characters" }
          },
          required: ["title", "snippet", "content", "keywords", "metaDescription"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Blog Generator API error:", error);
    res.status(500).json({ error: error.message || "Failed to generate blog content" });
  }
});

// Start express server configuration
async function startServer() {
  // Vite dev server integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MultiSarv India Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
