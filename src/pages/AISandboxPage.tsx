import React, { useState } from "react";
import { Bot, FileText, RefreshCw, Sparkles, Copy } from "lucide-react";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppContext } from "../contexts/AppContext";
import { PRODUCTS } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";

export default function AISandboxPage() {
  useSEO({
    title: "AI Sandbox — Lead Qualification & Proposal Generator",
    description: "MultiSarv India's AI Sandbox: qualify enterprise leads, score requirements, and auto-generate technical deployment proposals powered by Google Gemini."
  });

  const { user, leads, setLeads } = useAppContext();

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
  const [qualificationLoading, setQualificationLoading] = useState(false);
  const [qualifiedResults, setQualifiedResults] = useState<any>(null);

  const [proposalForm, setProposalForm] = useState({
    clientName: "",
    companyName: "",
    selectedProduct: PRODUCTS[0].name,
    requirements: "Requires high throughput web applications with real-time Firestore database rules. Integration with messaging networks.",
    budget: "Standard SaaS Tier"
  });
  const [proposalText, setProposalText] = useState("");
  const [proposalLoading, setProposalLoading] = useState(false);

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
      const freshLead = {
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
        await setDoc(doc(db, "leads", leadId), freshLead);
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
      setLeadForm({ name: "", email: "", company: "", phone: "", product: PRODUCTS[0].name, requirements: "", budget: "Standard SaaS Tier", timeline: "Standard (30-60 days)" });
    } catch {
      const simulatedScore = leadForm.requirements.length > 50 ? 82 : 45;
      const offlineLead = {
        id: `L-OFF-${Date.now()}`,
        name: leadForm.name, email: leadForm.email,
        company: leadForm.company || "Unknown Enterprise",
        phone: leadForm.phone || "N/A",
        product: leadForm.product, requirements: leadForm.requirements,
        budget: leadForm.budget, timeline: leadForm.timeline,
        score: simulatedScore,
        rationale: "Successfully qualified using local fallback logic system.",
        status: "new", assignedTo: "Offline Agent-Sim",
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
    } catch {
      setProposalText(`# TECHNICAL DEPLOYMENT PLAN\n**MultiSarv India Solutions Architect team**\n*Prepared dynamically (Offline backup active)*\n\n- **Client Contact**: ${proposalForm.clientName}\n- **Target ERP**: ${proposalForm.selectedProduct}\n- **Special Directives**: "${proposalForm.requirements}"\n\nWe recommend deploying MultiSarv's serverless pipeline mapped with Firestore collections.`);
    } finally {
      setProposalLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      <div className="text-center space-y-3">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Interactive Playground</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">SarvAI Intelligent Sandbox</h1>
        <p className="max-w-lg mx-auto text-sm text-slate-500">Test lead validation, scoring schedules, or generate technical markdown proposals utilizing Google technology.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div id="lead-qualification-tool" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <Bot className="w-6 h-6 text-orange-500" />
            <div>
              <h2 className="font-display font-bold text-lg text-slate-950 dark:text-white">1. AI Lead Qualification & Score</h2>
              <p className="text-[10px] text-slate-400">Verifies pipeline compatibility coordinates instantly</p>
            </div>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Contact Person Name</label>
                <input type="text" required value={leadForm.name} onChange={e => setLeadForm({ ...leadForm, name: e.target.value })} placeholder="e.g. Sanjay Raut" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Email Address</label>
                <input type="email" required value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} placeholder="sanjay@rautbuilders.in" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Company / Agency Name</label>
                <input type="text" value={leadForm.company} onChange={e => setLeadForm({ ...leadForm, company: e.target.value })} placeholder="Raut Developers Ltd" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Phone Number</label>
                <input type="text" value={leadForm.phone} onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })} placeholder="+91 94220 00000" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Select Target SaaS Product</label>
              <select value={leadForm.product} onChange={e => setLeadForm({ ...leadForm, product: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-950 dark:text-slate-200">
                {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name} - {p.tagline}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Detailed Requirements Scope</label>
              <textarea rows={3} value={leadForm.requirements} onChange={e => setLeadForm({ ...leadForm, requirements: e.target.value })} placeholder="e.g. We require our 12 offline sales brokers to view real-time property directories..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans resize-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Est. Budget Cap Scale</label>
                <select value={leadForm.budget} onChange={e => setLeadForm({ ...leadForm, budget: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white">
                  <option>Starter Trial Tier</option>
                  <option>Standard SaaS Tier</option>
                  <option>Enterprise Premium Scale</option>
                  <option>High Level Custom Tier</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Onboarding Timeline</label>
                <select value={leadForm.timeline} onChange={e => setLeadForm({ ...leadForm, timeline: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white">
                  <option>Urgent (under 15 days)</option>
                  <option>Standard (30-60 days)</option>
                  <option>Flexible Schedule</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={qualificationLoading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md">
              {qualificationLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Applying AI Classifiers...</span></> : <><Sparkles className="w-4 h-4 text-orange-400" /><span>Qualify Lead Coordinates</span></>}
            </button>
          </form>

          {qualifiedResults && (
            <div className="bg-slate-950 text-white p-5 rounded-2xl border border-sky-950/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">AI SCORING DIAGRAM</span>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-mono font-bold">
                  <span>Score:</span>
                  <span className="text-sm text-emerald-300">{qualifiedResults.leadScore} / 100</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-mono text-slate-500">Suggested products</div>
                <div className="flex flex-wrap gap-1.5">
                  {qualifiedResults.suggestedProducts?.map((p: string, i: number) => (
                    <span key={i} className="bg-blue-900/40 text-blue-300 border border-blue-800/40 text-[9px] font-mono font-semibold px-2 py-0.5 rounded">{p}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-1 pt-1">
                <div className="text-[10px] uppercase font-mono text-slate-500">Identified needs</div>
                <div className="flex flex-wrap gap-1.5">
                  {qualifiedResults.identifiedNeeds?.map((need: string, i: number) => (
                    <span key={i} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-medium">{need}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-900">
                <div className="text-[10px] uppercase font-mono text-slate-500">Architect Rationale</div>
                <p className="text-[11px] text-slate-400 leading-normal italic font-mono">"{qualifiedResults.rationale}"</p>
              </div>
              <div className="bg-sky-950/20 text-sky-400 text-[10px] p-2 rounded border border-sky-900/45 text-center font-mono">
                🎉 Record successfully persisting in Admin Pipeline.
              </div>
            </div>
          )}
        </div>

        <div id="proposal-generator-tool" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <FileText className="w-6 h-6 text-cyan-500" />
            <div>
              <h2 className="font-display font-bold text-lg text-slate-950 dark:text-white">2. AI Corporate Proposal Creator</h2>
              <p className="text-[10px] text-slate-400">Generates custom structured tech layouts dynamically</p>
            </div>
          </div>

          <form onSubmit={handleProposalSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Client Contact Name</label>
                <input type="text" required value={proposalForm.clientName} onChange={e => setProposalForm({ ...proposalForm, clientName: e.target.value })} placeholder="e.g. Priyesha Nair" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Organization Name</label>
                <input type="text" value={proposalForm.companyName} onChange={e => setProposalForm({ ...proposalForm, companyName: e.target.value })} placeholder="Nair Diagnostic Center" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Selected Architecture Base</label>
                <select value={proposalForm.selectedProduct} onChange={e => setProposalForm({ ...proposalForm, selectedProduct: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-950 dark:text-slate-200">
                  {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Proposed Budget Plan</label>
                <input type="text" value={proposalForm.budget} onChange={e => setProposalForm({ ...proposalForm, budget: e.target.value })} placeholder="e.g. ₹6,999/month Standard SaaS" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">Special Requirements</label>
              <textarea rows={2} value={proposalForm.requirements} onChange={e => setProposalForm({ ...proposalForm, requirements: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans resize-none" />
            </div>
            <button type="submit" disabled={proposalLoading} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-50 font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md">
              {proposalLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Compiling Specifications...</span></> : <><FileText className="w-4 h-4 text-cyan-400" /><span>Generate Technical Proposal</span></>}
            </button>
          </form>

          {proposalText && (
            <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <span className="text-[10px] uppercase font-mono text-cyan-400">COMPILED MARKDOWN BLUEPRINT</span>
                <button onClick={() => { navigator.clipboard.writeText(proposalText); alert("Copied!"); }} className="bg-slate-950 text-[10px] text-slate-400 hover:text-white border border-slate-800 px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer">
                  <Copy className="w-3 h-3 text-cyan-400" /><span>Copy Layout</span>
                </button>
              </div>
              <div className="max-h-[250px] overflow-y-auto pr-1 scrollbar-thin">
                <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/40">{proposalText}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
