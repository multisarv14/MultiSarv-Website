import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Lock, Shield, X } from "lucide-react";
import { ALL_PRODUCTS, PRODUCTS, SERVICES } from "../../data/master-data";
import logoMultiSarvCorporate from "../../assets/images/logo_multisarv_corporate_1781237621472.jpg";

// Terms modal embedded in footer
function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center sm:px-6 px-4 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-950 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
              <span>Secure Terms of Use – MultiSarv India</span>
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Effective Date: June 2026</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-grow p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed font-sans">
          <p className="font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
            Welcome to MultiSarv India. By accessing or using our website, applications, products, and services, you agree to comply with these Terms of Use.
          </p>
          {[
            { title: "1. Acceptance of Terms", body: "By accessing our services, you acknowledge that you have read, understood, and agreed to these Terms of Use." },
            { title: "2. Services", body: "MultiSarv India provides software products, SaaS platforms, mobile applications, websites, AI-powered solutions, CRM systems, and related technology services." },
            { title: "3. User Responsibilities", body: "Users agree to provide accurate information, maintain confidentiality of account credentials, use services lawfully, not attempt unauthorized access, not distribute malware, and not misuse AI-generated outputs." },
            { title: "4. Intellectual Property", body: "All content, software, logos, trademarks, designs, source code, and materials belong to MultiSarv India unless otherwise stated." },
            { title: "5. AI Services Disclaimer", body: "AI-generated content may contain inaccuracies. Users should independently verify critical information before making decisions." },
            { title: "6. Security", body: "Users shall not attempt hacking or reverse engineering, circumvent security controls, access unauthorized data, or interfere with system operations." },
            { title: "7. Data Protection", body: "We implement industry-standard security measures to protect user information." },
            { title: "8. Third-Party Services", body: "Our services may integrate with Google Firebase, Google Gemini, Google Analytics, WhatsApp, and Payment Gateways. We are not responsible for third-party service interruptions." },
            { title: "9. Limitation of Liability", body: "MultiSarv India shall not be liable for indirect, incidental, or consequential damages arising from service usage." },
            { title: "10. Termination", body: "We reserve the right to suspend or terminate accounts violating these terms." },
            { title: "11. Governing Law", body: "These terms shall be governed by the laws of India." },
            { title: "12. Contact", body: "Email: support@multisarv.com" },
          ].map((s, i) => (
            <div key={i} className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white">{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/40 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button onClick={onClose} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl cursor-pointer shadow-md transition-transform active:scale-95">
            I Accept & Understand
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer id="corporate-footer" className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={logoMultiSarvCorporate} alt="MultiSarv India" className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                <span className="font-display font-bold text-white text-base">MultiSarv India</span>
              </div>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans">
                Engineers of state-of-the-art secure real-time ERP databases. Powering Indian corporate hubs with serverless speed and high-level artificial intelligence integrations.
              </p>
              <div className="text-xs text-slate-600">Tagline: "Innovate. Integrate. Inspire."</div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Enterprise SaaS Catalog</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 max-w-sm">
                {ALL_PRODUCTS.map((prod) => (
                  <li key={prod.id}>
                    <Link to={`/products/${prod.id}`} className="hover:text-cyan-400 hover:underline text-left truncate max-w-[140px] block">
                      {prod.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Privacy Policies</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 max-w-sm">
                {ALL_PRODUCTS.map((prod) => (
                  <li key={prod.id}>
                    <Link to={`/privacy/${prod.id}`} className="hover:text-cyan-400 hover:underline text-left truncate max-w-[140px] flex items-center gap-1 block">
                      <Lock className="w-2.5 h-2.5 shrink-0 text-slate-600" />
                      {prod.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Quick Links</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><Link to="/services" className="hover:text-cyan-400 hover:underline">Our Services</Link></li>
                <li><Link to="/pricing" className="hover:text-cyan-400 hover:underline">Pricing Plans</Link></li>
                <li><Link to="/case-studies" className="hover:text-cyan-400 hover:underline">Case Studies</Link></li>
                <li><Link to="/about" className="hover:text-cyan-400 hover:underline">About Us</Link></li>
                <li><Link to="/blogs" className="hover:text-cyan-400 hover:underline">Knowledge Base</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-400 hover:underline">Contact Us</Link></li>
                <li><Link to="/sarvai" className="hover:text-cyan-400 hover:underline">SarvAI Assistant</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-white tracking-widest mb-3">Corporate Contacts</h4>
              <ul className="space-y-1 text-xs text-slate-500 font-mono mb-4">
                <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-600" /><span>contact@multisarv.com</span></li>
                <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-600" /><span>+91 9545 870 970</span></li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-600" /><span>Jagatguru Heights, Dehu, Pune, MH</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900/80 text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span>© {new Date().getFullYear()} MultiSarv India, All technical rights secured.</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowTerms(true)}
                className="hover:underline cursor-pointer focus:outline-none"
              >
                Secure Terms of Use
              </button>
              <Link to="/privacy" className="hover:underline cursor-pointer">
                Privacy & Cookies Policies
              </Link>
              <Link to="/case-studies" className="hover:underline cursor-pointer">
                Case Studies
              </Link>
            </div>
          </div>

        </div>
      </footer>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
}
