import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppContext } from "../contexts/AppContext";
import { useSEO } from "../hooks/useSEO";

export default function ContactPage() {
  useSEO({
    title: "Contact Us — MultiSarv India",
    description: "Contact MultiSarv India's team of architects. Submit your enterprise inquiry and get a response within 2 hours."
  });

  const { user } = useAppContext();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ loading: boolean; success: boolean; error: string | null }>({
    loading: false, success: false, error: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ loading: false, success: false, error: "Please fill out all required fields." });
      return;
    }
    if (form.name.length > 100) { setStatus({ loading: false, success: false, error: "Name must be 100 characters or less." }); return; }
    if (form.email.length > 100) { setStatus({ loading: false, success: false, error: "Email must be 100 characters or less." }); return; }
    if (form.message.length > 2000) { setStatus({ loading: false, success: false, error: "Message must be 2000 characters or less." }); return; }

    setStatus({ loading: true, success: false, error: null });
    const docId = `CF-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await setDoc(doc(db, "contactForms", docId), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: new Date().toISOString()
      });
      if (user) {
        const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
        await setDoc(doc(db, "auditLogs", logId), {
          logId, userId: user.uid, userName: user.displayName || "Member",
          userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
          action: "CREATE", module: "ContactForm", documentId: `CONTACT_${docId}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
        });
      }
      setForm({ name: "", email: "", message: "" });
      setStatus({ loading: false, success: true, error: null });
    } catch (err: any) {
      try {
        handleFirestoreError(err, OperationType.WRITE, `contactForms/${docId}`);
      } catch (formatted: any) {
        setStatus({ loading: false, success: false, error: formatted.message });
      }
    }
  };

  return (
    <div id="contact-tab-pane" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">DIRECT SECURE INTEGRATION</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Connect with our Architect Directors</h1>
        <p className="max-w-lg mx-auto text-sm text-slate-500 dark:text-slate-400">Have a customized enterprise project or platform query? Submit an inquiry directly to our Firestore pipeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-50 dark:border-slate-800/80 pb-4">
            <h3 className="font-display font-semibold text-lg text-slate-950 dark:text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-500" />
              <span>Inquiry Transmission Deck</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Secure, validation-guarded direct cloud writes.</p>
          </div>

          {status.success ? (
            <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50/10 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100/20">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-slate-950 dark:text-white text-base">Inquiry Synthesized Successfully</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Your message was saved to our Firestore pipeline. Our directors will reply within 120 minutes.
                </p>
              </div>
              <button
                onClick={() => setStatus({ loading: false, success: false, error: null })}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Transmit Another Message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status.error && (
                <div className="bg-red-50/20 border border-red-500/20 text-red-500 text-xs p-3.5 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold uppercase">Your Full Name <span className="text-red-500">*</span></label>
                  <input type="text" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Anand Sharma" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 placeholder:text-slate-400 text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold uppercase">Corporate Email <span className="text-red-500">*</span></label>
                  <input type="email" required maxLength={100} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="e.g. anand@company.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 placeholder:text-slate-400 text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold uppercase">Detail Requirements <span className="text-red-500">*</span></label>
                  <span className="text-[9px] font-mono text-slate-400">{form.message.length} / 2000</span>
                </div>
                <textarea required maxLength={2000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Detail which solutions architecture or enterprise products you require context on..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 placeholder:text-slate-400 text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white transition-all resize-none" />
              </div>
              <button
                type="submit"
                disabled={status.loading}
                className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 hover:scale-101"
              >
                {status.loading ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /><span>Streaming to database...</span></>
                ) : (
                  <><Send className="w-4 h-4" /><span>Transmit Secure Inquiry</span></>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="border-b border-slate-800 pb-3 flex items-center gap-2 text-cyan-400 font-semibold font-display">
              <Mail className="w-5 h-5 text-orange-400" />
              <span>Instant Channels</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">HELPLINE TELEPHONY</span>
                <a href="tel:+919545870970" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" /><span>+91 9545 870 970</span>
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">DIGITAL EMAIL</span>
                <a href="mailto:contact@multisarv.com" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" /><span>contact@multisarv.com</span>
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">CENTRAL HQ</span>
                <div className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5 font-sans">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>Jagatguru Heights, Dehu, Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl space-y-4 font-sans">
            <h4 className="font-display font-semibold text-sm text-slate-950 dark:text-white">Communication SLAs</h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              <div className="space-y-1">
                <h5 className="font-medium text-slate-800 dark:text-slate-200">How quickly will you reply?</h5>
                <p>Inquiries received before 8 PM IST are reviewed within 2 hours.</p>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-50 dark:border-slate-800/60">
                <h5 className="font-medium text-slate-800 dark:text-slate-200">Is my data secure?</h5>
                <p>All submissions are written to isolated Firestore clusters guarded by Zero-Trust security rules.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
