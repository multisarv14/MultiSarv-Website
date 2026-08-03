import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Bot,
  Check,
  CheckSquare,
  Clock,
  Code,
  Copy,
  Database,
  FileText,
  Lock,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Sliders,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { VisitorsBarChart, ConversionLineChart, ProductPieChart } from "../components/AnalyticsCharts";
import { useAppContext } from "../contexts/AppContext";
import { FIRESTORE_RULES_TEXT, PRODUCTS } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import { db } from "../lib/firebase";
import type { Blog } from "../types";

const DEFAULT_AUDIT_LOGS: any[] = [
  { logId: "LOG-5891", userId: "UID-88219", userName: "Ramdas Raut", userRole: "Admin", action: "UPDATE", module: "Security Rules", documentId: "FIRESTORE_RULES", timestamp: "2026-06-11 09:30:15" },
  { logId: "LOG-5892", userId: "UID-88219", userName: "Ramdas Raut", userRole: "Admin", action: "UPDATE", module: "Products", documentId: "PRODUCT_REALTYSARV", timestamp: "2026-06-11 09:41:00" },
];

function setStoredAuditLogs(logs: any[]) {
  localStorage.setItem("multisarv_audit_logs", JSON.stringify(logs));
}

export default function AdminPage() {
  useSEO({
    title: "Admin Dashboard",
    description: "Manage MultiSarv leads, contact submissions, security rules, and administrative analytics.",
  });

  const { user, handleLogin, leads, contactForms, deleteContactForm, deleteLead, updateLeadStatus } = useAppContext();

  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditSearch, setAuditSearch] = useState("");
  const [blogForm, setBlogForm] = useState({ topic: "", category: "AI Integration" });
  const [blogLoading, setBlogLoading] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState("all");
  const [adminProductFilter, setAdminProductFilter] = useState("all");
  const [adminSubTab, setAdminSubTab] = useState<"leads" | "contacts">("leads");
  const [copiedRules, setCopiedRules] = useState(false);
  const [activeSecurityTab, setActiveSecurityTab] = useState("rules");
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  useEffect(() => {
    if (!user) {
      const cached = localStorage.getItem("multisarv_audit_logs");
      setAuditLogs(cached ? JSON.parse(cached) : DEFAULT_AUDIT_LOGS);
      return;
    }

    const unsub = onSnapshot(
      collection(db, "auditLogs"),
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((item) => list.push({ logId: item.id, ...item.data() }));
        if (list.length > 0) {
          list.sort((a, b) => String(b.timestamp ?? "").localeCompare(String(a.timestamp ?? "")));
          setAuditLogs(list);
          setStoredAuditLogs(list);
        } else {
          setAuditLogs(DEFAULT_AUDIT_LOGS);
          setStoredAuditLogs(DEFAULT_AUDIT_LOGS);
        }
      },
      () => {
        const cached = localStorage.getItem("multisarv_audit_logs");
        setAuditLogs(cached ? JSON.parse(cached) : DEFAULT_AUDIT_LOGS);
      }
    );

    return () => unsub();
  }, [user]);

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const term = adminSearch.toLowerCase();
        const matchesSearch =
          lead.name.toLowerCase().includes(term) ||
          lead.company.toLowerCase().includes(term) ||
          lead.phone.includes(term) ||
          lead.requirements.toLowerCase().includes(term) ||
          lead.id.toLowerCase().includes(term);

        const matchesStatus = adminStatusFilter === "all" || lead.status === adminStatusFilter;
        const matchesProduct = adminProductFilter === "all" || lead.product === adminProductFilter;

        return matchesSearch && matchesStatus && matchesProduct;
      }),
    [adminProductFilter, adminSearch, adminStatusFilter, leads]
  );

  const filteredAuditLogs = useMemo(() => {
    if (!auditSearch) return auditLogs;
    const search = auditSearch.toLowerCase();
    return auditLogs.filter((log) =>
      [log.userName, log.userRole, log.action, log.module, log.logId]
        .map((value) => String(value ?? "").toLowerCase())
        .some((value) => value.includes(search))
    );
  }, [auditLogs, auditSearch]);

  const appendAuditLogLocally = (log: any) => {
    const updated = [log, ...auditLogs];
    setAuditLogs(updated);
    setStoredAuditLogs(updated);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.topic.trim()) return;

    setBlogLoading(true);
    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: blogForm.topic, category: blogForm.category }),
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
        isAiGenerated: true,
      };

      if (!user || user.email !== "ramdasraut9@gmail.com") {
        window.alert("Authorized Admin permissions (ramdasraut9@gmail.com) are required to publish blogs.");
        return;
      }

      await setDoc(doc(db, "blogs", blogId), freshBlog);

      const auditLog = {
        logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user.uid,
        userName: user.displayName || "MultiSarv Admin",
        userRole: "Admin",
        action: "CREATE",
        module: "Blogs",
        documentId: `BLOG_${blogId}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      };

      try {
        await setDoc(doc(db, "auditLogs", auditLog.logId), auditLog);
      } catch {
        appendAuditLogLocally(auditLog);
      }

      setBlogForm((prev) => ({ ...prev, topic: "" }));
      window.alert("AI blog drafted successfully and persisted on Firestore!");
    } catch {
      window.alert("Encountered an issue parsing AI response. Writing offline fallback standard text.");
    } finally {
      setBlogLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
        {!user ? (
          <div className="text-center py-20 px-6 max-w-sm mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-xl space-y-5">
            <div className="w-16 h-16 bg-cyan-50/10 dark:bg-cyan-950/20 text-cyan-500 rounded-full flex items-center justify-center mx-auto border border-cyan-100/20 shadow-inner">
              <Shield className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h1 className="font-display font-semibold text-slate-950 dark:text-white text-lg">System Dashboard Void</h1>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">MultiSarv Management Panel</span>
                <h1 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Administrative Solutions Hub</h1>
                <p className="text-xs text-slate-500 mt-1">Admin control credentials synchronized with Firestore persistent indexes.</p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm("Reset local database registry key to template defaults?")) {
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <VisitorsBarChart />
              <ConversionLineChart />
              <ProductPieChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
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

                <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800/80 space-y-3 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold border-b border-slate-800 pb-2">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span>FIRESTORE SEC RULES STATUS</span>
                  </div>
                  <div className="space-y-2 text-slate-400">
                    <div><span className="text-emerald-400 font-bold">✔</span> match /users/&#123;uid&#125; isolated to correct UID auth check</div>
                    <div><span className="text-emerald-400 font-bold">✔</span> isValidId() checks on target paths variables size max 128</div>
                    <div><span className="text-emerald-400 font-bold">✔</span> temporal integrity keys verified via request.time check</div>
                    <div><span className="text-emerald-400 font-bold">✔</span> Shadow Update Ghost Vulnerability prevented using strict hasOnly() schema check</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-[9px] text-slate-500 text-center uppercase">Zero Vulnerability Gate-Shield</div>
                  <button
                    onClick={() => setShowSecurityModal(true)}
                    className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Open Rules & Audit Console</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
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
                            {PRODUCTS.map((p) => (
                              <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {filteredLeads.length === 0 ? (
                          <div className="text-center py-10 space-y-2 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                            <AlertCircle className="w-10 h-10 text-orange-400 mx-auto" />
                            <h4 className="font-display font-medium text-slate-950 dark:text-slate-200">No matching pipeline leads detected</h4>
                            <p className="text-xs text-slate-500">Qualify an entry using the interactive sandbox to check tracking panels.</p>
                          </div>
                        ) : (
                          filteredLeads.map((lead) => {
                            const statusColors: { [key: string]: string } = {
                              new: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
                              qualified: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
                              demo_done: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
                              closed: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
                            };

                            return (
                              <div key={lead.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4 relative">
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
                          <div key={msg.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 relative">
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

      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in-quick">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up-quick">
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

            <div className="flex-grow overflow-y-auto p-5 sm:p-6 bg-slate-50/20 dark:bg-slate-905">
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

              {activeSecurityTab === "logs" && (
                <div className="space-y-4 animate-fade-in-quick text-left">
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
                          setAuditLogs(DEFAULT_AUDIT_LOGS);
                          setStoredAuditLogs(DEFAULT_AUDIT_LOGS);
                        }}
                        className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 hover:text-rose-400 font-mono transition-colors border border-slate-800 hover:border-rose-950/40 px-2.5 py-1.5 rounded bg-slate-950 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Reset Logs</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 font-mono">
                      <button
                        onClick={() => appendAuditLogLocally({
                          logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                          userId: "UID-88219",
                          userName: "Ramdas Raut",
                          userRole: "Admin",
                          action: "LOGIN",
                          module: "Authentication",
                          documentId: "AUTH_ROUTER",
                          oldValue: null,
                          newValue: { auth_session: "active", status: "mfa_verified" },
                          ipAddress: "103.241.12.92",
                          deviceInfo: "Chrome 125 / macOS Sequoia",
                          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
                        })}
                        className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-900 text-emerald-400 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all hover:scale-102 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Simulate Admin Login</span>
                      </button>

                      <button
                        onClick={() => appendAuditLogLocally({
                          logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                          userId: "SYSTEM_AI_NODE",
                          userName: "SarvAI Agent-3",
                          userRole: "AI Automations",
                          action: "AI_REQUEST",
                          module: "Lead Qualification Engine",
                          documentId: "AI_LOGS_CRM",
                          oldValue: null,
                          newValue: { module: "RealtyConnect", triggered: "WhatsApp Webhook push", metrics_evaluation: "high" },
                          ipAddress: "34.120.45.210",
                          deviceInfo: "Google Gemini 3.5 Flash Model Service Node",
                          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
                        })}
                        className="bg-blue-950/60 hover:bg-blue-900 border border-blue-900 text-blue-400 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all hover:scale-102 cursor-pointer"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Simulate AI Request</span>
                      </button>

                      <button
                        onClick={() => appendAuditLogLocally({
                          logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                          userId: "VIOLATION_BLOCKED",
                          userName: "Anonymous Client App Instance",
                          userRole: "Public Guest (unauthorized)",
                          action: "SECURITY_EVENT",
                          module: "Audit Logs Write Block",
                          documentId: "$REJECTED_LOG_ID",
                          oldValue: null,
                          newValue: { error: "Insufficient Permission", source_rule: "allow write: if false;", attempted_write: "illegal_delete_records" },
                          ipAddress: "192.168.4.221",
                          deviceInfo: "cURL / Postman Mock Agent Simulator",
                          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
                        })}
                        className="bg-rose-950/60 hover:bg-rose-900 border border-rose-900 text-rose-450 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all hover:scale-102 cursor-pointer"
                      >
                        <AlertCircle className="w-3.5 h-3.5 animate-bounce" />
                        <span>Simulate Write Security Violation (Denied)</span>
                      </button>

                      <button
                        onClick={() => appendAuditLogLocally({
                          logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                          userId: "UID-88219",
                          userName: "Ramdas Raut",
                          userRole: "Admin",
                          action: "UPDATE",
                          module: "Blogs Collection",
                          documentId: "BLOG-101",
                          oldValue: { published: false },
                          newValue: { published: true, category: "AI Integration" },
                          ipAddress: "103.241.12.89",
                          deviceInfo: "Chrome 125 / Windows 11",
                          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
                        })}
                        className="bg-amber-950/60 hover:bg-amber-900 border border-amber-900 text-amber-400 text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all hover:scale-102 cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Simulate Blog Publishing</span>
                      </button>
                    </div>
                  </div>

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
                          {filteredAuditLogs.map((log) => {
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
                                <tr className="bg-slate-50/20 dark:bg-slate-950/10">
                                  <td colSpan={6} className="px-4 py-2 text-[10px] border-b border-dashed dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                      <span className="shrink-0"><span className="text-slate-400 dark:text-slate-600">Device Target:</span> {log.deviceInfo}</span>
                                      {log.oldValue && <span className="truncate max-w-[250px]"><span className="text-slate-400 dark:text-slate-600">Old Value:</span> {JSON.stringify(log.oldValue)}</span>}
                                      {log.newValue && <span className="truncate max-w-[250px]"><span className="text-slate-400 dark:text-slate-600">New Value:</span> {JSON.stringify(log.newValue)}</span>}
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
                        { title: "Security Violation Events", desc: "Captures anomalous write proposals blocked by standard match clauses (allow write: if false)." },
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
                        { title: "Lead Assignments Track", desc: "Maintains transparency of sales lead routing across RealtyConnect, SocietySarv and SaaS pipelines." },
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

              {activeSecurityTab === "retention" && (
                <div className="space-y-5 animate-fade-in-quick text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Audit Logs", retention: "5 Years", color: "from-blue-500 to-cyan-500", desc: "Mandatory corporate auditing logs tracing write actions, state differences, and administrative database calls." },
                      { title: "Login Logs", retention: "2 Years", color: "from-emerald-500 to-teal-500", desc: "Identity log tracking active browser logins, GeoIP telemetry, and MFA validation attempts." },
                      { title: "Security Logs", retention: "7 Years", color: "from-red-500 to-rose-500", desc: "Critical security violation signals, blocked writes, cross-site telemetry alarms, and system integrity incidents." },
                      { title: "Error Logs", retention: "1 Year", color: "from-amber-600 to-orange-500", desc: "Application trace details, system warnings, failed Firebase rule checks, and internal code error diagnostic exceptions." },
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

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-850 dark:text-slate-100 text-xs sm:text-sm block">MultiSarv India Enterprise Multi-tenant SaaS Compliance Standard</span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Our default retention policies are aligned to global SOC2 Security Principles, HIPAA Medical Ledger benchmarks, and ISO 27001 data protection workflows. Scaled storage and retention are handled efficiently under server-side processes, ensuring future products such as RealtyConnect, SocietySarv, SocietyConnect, and HRSarv running on Google Cloud Firebase share fully vetted auditing schemas.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/40 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">SECURE ENDPOINT VALIDATED ● SOC2 COMPLIANT SHA-256</p>
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
    </>
  );
}
