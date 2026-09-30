import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ChevronRight,
  Globe,
  Lock,
  Shield,
  Smartphone,
  Tv,
  Utensils,
  Wrench,
  X,
} from "lucide-react";
import { ALL_PRODUCTS, PRODUCT_PRIVACY_DATA } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import { PAGE_META, privacyMeta } from "../seo";

export default function PrivacyPage() {
  const { id } = useParams();
  const selectedProduct = id ? ALL_PRODUCTS.find((p) => p.id === id) : null;
  const privacyInfo = id ? PRODUCT_PRIVACY_DATA[id] : null;

  useSEO(selectedProduct ? privacyMeta(selectedProduct) : PAGE_META["/privacy"]);

  return (
    <div id="privacy-tab-pane" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in font-sans">
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Privacy</span>
          {selectedProduct && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedProduct.name}</span>
            </>
          )}
        </nav>

        <div className="text-center space-y-4">
          <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
            ZERO-TRUST DATA PROTECTION
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">
            {selectedProduct ? `${selectedProduct.name} — Privacy Policy` : "Privacy & Cookies Policies"}
          </h1>
          <p className="max-w-lg mx-auto text-sm text-slate-500 dark:text-slate-400">
            MultiSarv respects your privacy and is committed to protecting your personal data in accordance with modern digital protection standards.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Effective Date: {privacyInfo?.effectiveDate || "June 2026"}
            {privacyInfo?.lastUpdated && ` · Last Updated: ${privacyInfo.lastUpdated}`}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-display flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            Product-Specific Privacy Policies
          </h3>
          {selectedProduct && (
            <Link
              to="/privacy"
              className="text-xs text-blue-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> View General Policy
            </Link>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Select a product below to view its dedicated privacy disclosure.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {ALL_PRODUCTS.map((prod) => (
            <Link
              key={prod.id}
              to={`/privacy/${prod.id}`}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs font-semibold ${
                selectedProduct?.id === prod.id
                  ? "bg-blue-600 dark:bg-cyan-600 border-blue-500 dark:border-cyan-500 text-white"
                  : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-cyan-700 hover:bg-blue-50 dark:hover:bg-blue-950/30"
              }`}
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{prod.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {id && !selectedProduct && (
        <div className="bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/40 rounded-3xl p-6 text-center space-y-4 shadow-sm">
          <h2 className="text-xl font-display font-bold text-slate-950 dark:text-white">Privacy Policy Not Found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">The requested product privacy policy does not exist.</p>
          <Link to="/privacy" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl">
            <Shield className="w-4 h-4" /> Back to Privacy Overview
          </Link>
        </div>
      )}

      {selectedProduct && privacyInfo && (
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            {selectedProduct.logoUrl ? (
              <img src={selectedProduct.logoUrl} alt={`${selectedProduct.name} logo`} className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 shadow-sm select-none" referrerPolicy="no-referrer" />
            ) : (
              <span className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-500" />
              </span>
            )}
            <div>
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-[10px] uppercase tracking-widest">Product Privacy Policy</span>
              <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">{selectedProduct.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedProduct.tagline}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data We Collect</h4>
            <ul className="space-y-1.5">
              {privacyInfo.dataCollected.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {privacyInfo.permissions && privacyInfo.permissions.length > 0 && (
            <div className="space-y-2 p-4 bg-amber-50/30 dark:bg-amber-950/15 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Device Permissions Requested</span>
              </h4>
              <ul className="space-y-1.5">
                {privacyInfo.permissions.map((perm, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-300">
                    <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold">{perm.split(" – ")[0]}</code>
                    {perm.includes(" – ") && <span className="ml-1">– {perm.split(" – ")[1]}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data Sharing Policy</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{privacyInfo.dataSharingPolicy}</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data Retention</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{privacyInfo.dataRetention}</p>
          </div>

          {privacyInfo.policySections?.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/50 pb-1.5">{section.heading}</h4>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{paragraph}</p>
              ))}
              {section.items && (
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {privacyInfo.specificNote && (
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex gap-3 items-start">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">{privacyInfo.specificNote}</p>
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl cursor-pointer">
              Privacy Inquiry
            </Link>
            <Link to="/privacy" className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl cursor-pointer">
              ← General Policy
            </Link>
          </div>
        </div>
      )}

      {!id && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex gap-3 items-start">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Introduction & Core Promise</h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
                MultiSarv is built on the foundation of transparency, integrity, and absolute client trust. We never monetize or rent your corporate data, and all digital communications are guarded by rigorous zero-trust security profiles.
              </p>
            </div>
          </div>

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
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs sm:text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Third-Party Platforms</h4>
              <p className="text-slate-500 leading-relaxed">
                We use industry-trusted cloud services: Google Firebase (Hosting, Authentication and Firestore) and Google Analytics.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/50 pb-1.5">Data Retention & Rights</h4>
              <p className="text-slate-500 leading-relaxed">
                We retain billing and inquiry details strictly to provide continued support. You have the full right to request data access, correction, or permanent purge by submitting a request to our directors.
              </p>
            </div>
          </div>

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

          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-3">
            <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Have Privacy Inquiries?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              To raise a data access or deletion query, please contact our general helpdesk or use our secure Inquiry Transmission Deck.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl cursor-pointer">
                Transmit Inquiry
              </Link>
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
  );
}
