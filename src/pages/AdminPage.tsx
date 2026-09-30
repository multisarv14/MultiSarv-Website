import React, { useMemo, useState } from "react";
import { AlertCircle, Lock, Mail, RefreshCw, Search, Shield, Sliders, Trash2 } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";
import { PRODUCTS } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import { PAGE_META } from "../seo";
import type { Lead } from "../types";

const STATUS_COLORS: Record<Lead["status"], string> = {
  new: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  qualified: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
  demo_done: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
  closed: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
};

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "New",
  qualified: "Qualified",
  demo_done: "Demo Done",
  closed: "Closed",
};

export default function AdminPage() {
  useSEO(PAGE_META["/admin"]);

  const {
    user, authLoading, isAdmin, adminChecked, handleLogin, handleLogout,
    leads, contactForms, deleteContactForm, deleteLead, updateLeadStatus,
  } = useAdmin();

  const [tab, setTab] = useState<"contacts" | "leads">("contacts");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");

  const filteredLeads = useMemo(() => {
    const term = search.toLowerCase();
    return leads.filter((lead) => {
      const matchesSearch = [lead.name, lead.company, lead.phone, lead.email, lead.requirements, lead.id]
        .some((v) => String(v ?? "").toLowerCase().includes(term));
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesProduct = productFilter === "all" || lead.product === productFilter;
      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [leads, search, statusFilter, productFilter]);

  if (authLoading || (user && !adminChecked)) {
    return (
      <div className="max-w-sm mx-auto py-24 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin" /> Checking access…
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <div className="text-center py-16 px-6 max-w-sm mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-xl space-y-5">
          <div className="w-16 h-16 bg-cyan-50/10 dark:bg-cyan-950/20 text-cyan-500 rounded-full flex items-center justify-center mx-auto border border-cyan-100/20">
            <Shield className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="font-display font-semibold text-slate-950 dark:text-white text-lg">
              {user ? "Access denied" : "Admin sign-in"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              {user
                ? `${user.email} does not have administrator access.`
                : "This area is restricted to MultiSarv administrators."}
            </p>
          </div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl cursor-pointer"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Lock className="w-4 h-4" />
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">MultiSarv Admin</span>
          <h1 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Signed in as {user.email} ·{" "}
            <button onClick={handleLogout} className="text-rose-500 hover:underline font-semibold cursor-pointer">Sign out</button>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3">
            <div className="text-2xl font-bold font-mono text-cyan-500">{contactForms.length}</div>
            <div className="text-[10px] uppercase font-mono text-slate-500">Inquiries</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3">
            <div className="text-2xl font-bold font-mono text-blue-500">{leads.length}</div>
            <div className="text-[10px] uppercase font-mono text-slate-500">Leads</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pb-2 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="font-display font-medium text-lg text-slate-950 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-500" />
            <span>Submissions</span>
          </h2>
          <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800 flex items-center gap-1.5">
            {(["contacts", "leads"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === t
                    ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                }`}
              >
                {t === "contacts" ? `Contact Inquiries (${contactForms.length})` : `Leads (${leads.length})`}
              </button>
            ))}
          </div>
        </div>

        {tab === "contacts" && (
          <div className="space-y-4">
            {contactForms.length === 0 ? (
              <div className="text-center py-12 space-y-2 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                <Mail className="w-10 h-10 text-cyan-500 mx-auto opacity-60" />
                <h3 className="font-display font-medium text-slate-950 dark:text-slate-200">No contact inquiries yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">Messages sent from the Contact Us page will appear here.</p>
              </div>
            ) : (
              contactForms.map((msg) => (
                <div key={msg.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-display font-bold text-sm text-slate-950 dark:text-white">{msg.name}</h3>
                      <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium font-mono break-all">{msg.email}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`mailto:${msg.email}`}
                        className="p-1.5 text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Reply by email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteContactForm(msg.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  <div className="text-[10px] font-mono pt-2 border-t border-slate-200/40 dark:border-slate-800 text-slate-500">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Unknown time"}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "leads" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl pl-9 pr-4 py-1.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <option value="all">All statuses</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <option value="all">All products</option>
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-10 space-y-2 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                  <AlertCircle className="w-10 h-10 text-orange-400 mx-auto" />
                  <h3 className="font-display font-medium text-slate-950 dark:text-slate-200">No matching leads</h3>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div key={lead.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1 min-w-0">
                        <span className={`inline-block text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[lead.status] ?? STATUS_COLORS.new}`}>
                          {STATUS_LABELS[lead.status] ?? lead.status}
                        </span>
                        <h3 className="text-base font-display font-bold text-slate-950 dark:text-white">{lead.name}</h3>
                        <div className="text-xs text-slate-500 break-words">{lead.company} • {lead.email} • {lead.phone}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead["status"])}
                          className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 px-2 py-1 rounded"
                        >
                          {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                          title="Delete lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100/50 dark:border-slate-800/40 text-xs">
                      {[["Product", lead.product], ["Budget", lead.budget], ["Timeline", lead.timeline], ["Date", lead.date]].map(([label, value]) => (
                        <div key={label}>
                          <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">{label}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{value || "—"}</span>
                        </div>
                      ))}
                    </div>
                    {lead.requirements && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{lead.requirements}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
