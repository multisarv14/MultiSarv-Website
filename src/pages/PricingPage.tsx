import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronRight } from "lucide-react";
import { ALL_PRODUCTS } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import { PAGE_META } from "../seo";

export default function PricingPage() {
  useSEO(PAGE_META["/pricing"]);

  const [selectedProduct, setSelectedProduct] = useState(ALL_PRODUCTS[0].id);
  const product = ALL_PRODUCTS.find(p => p.id === selectedProduct) || ALL_PRODUCTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Transparent Pricing</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Simple, Scalable Pricing</h1>
        <p className="max-w-xl mx-auto text-sm text-slate-500">Start free, scale as you grow. Every MultiSarv product offers a free evaluation tier so you can test before committing.</p>
      </div>

      {/* Product selector */}
      <div className="space-y-6">
        <h2 className="text-center text-lg font-display font-bold text-slate-950 dark:text-white">Select a Product to View Pricing</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {ALL_PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedProduct === p.id ? "bg-blue-600 text-white shadow-md" : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-blue-400"}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Pricing cards for selected product */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Starter */}
          <div className="border-2 border-dashed border-emerald-300 dark:border-emerald-800 rounded-3xl p-6 space-y-4 bg-emerald-50/20 dark:bg-emerald-950/10 relative">
            <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">Free Forever</div>
            <div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Starter</div>
              <div className="text-2xl font-display font-extrabold text-slate-950 dark:text-white mt-1">{product.pricing.starter || "₹0 / Free"}</div>
              <div className="text-xs text-slate-400 mt-1">Free evaluation access</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Basic feature access</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Up to 5 users</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Community support</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Free trial workspace</li>
            </ul>
            <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="block w-full text-center border border-emerald-400 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all">
              Get Started Free
            </Link>
          </div>

          {/* Standard */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 bg-white dark:bg-slate-900">
            <div>
              <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Standard</div>
              <div className="text-2xl font-display font-extrabold text-slate-950 dark:text-white mt-1">{product.pricing.standard}</div>
              <div className="text-xs text-slate-400 mt-1">Full production access</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />All core features</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Up to 25 users</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Email & chat support</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Standard Firebase rules</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Monthly analytics reports</li>
            </ul>
            <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="block w-full text-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all">
              Start Standard
            </Link>
          </div>

          {/* Enterprise */}
          <div className="border-2 border-blue-500 dark:border-cyan-500 rounded-3xl p-6 space-y-4 bg-blue-50/20 dark:bg-sky-950/20 relative">
            <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">Most Popular</div>
            <div>
              <div className="text-xs font-mono text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-wider">Enterprise</div>
              <div className="text-2xl font-display font-extrabold text-slate-950 dark:text-white mt-1">{product.pricing.enterprise}</div>
              <div className="text-xs text-slate-400 mt-1">Priority features & analytics</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />All standard features</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Unlimited users</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Priority live support</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Custom Firebase rules</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Real-time analytics dashboards</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Custom reports</li>
            </ul>
            <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md">
              Get Enterprise
            </Link>
          </div>

          {/* Custom / Support */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 bg-slate-900 dark:bg-slate-950 text-white">
            <div>
              <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Custom / Support</div>
              <div className="text-base font-display font-bold text-white mt-1 leading-snug">{product.pricing.support}</div>
              <div className="text-xs text-slate-400 mt-1">Dedicated account manager</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />Custom integrations</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />On-site deployment support</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />SLA guarantees</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />WhatsApp + Slack bridge</li>
            </ul>
            <Link to="/contact" className="block w-full text-center border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* All Products Pricing Table */}
      <div className="space-y-6">
        <h2 className="text-xl font-display font-bold text-slate-950 dark:text-white">All Products Pricing Overview</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-4 py-3 font-mono font-bold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 font-mono font-bold text-emerald-500 uppercase tracking-wider">Starter</th>
                <th className="text-left px-4 py-3 font-mono font-bold text-slate-400 uppercase tracking-wider">Standard</th>
                <th className="text-left px-4 py-3 font-mono font-bold text-blue-500 uppercase tracking-wider">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {ALL_PRODUCTS.map((p, i) => (
                <tr key={p.id} className={`border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors ${i % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/30 dark:bg-slate-900/20"}`}>
                  <td className="px-4 py-3">
                    <Link to={`/products/${p.id}`} className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                      {p.logoUrl && <img src={p.logoUrl} alt={p.name} className="w-6 h-6 rounded object-cover" referrerPolicy="no-referrer" />}
                      {p.name}
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">{p.pricing.starter || "₹0 / Free"}</td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">{p.pricing.standard}</td>
                  <td className="px-4 py-3 font-mono text-blue-600 dark:text-cyan-400 font-semibold">{p.pricing.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-xl font-display font-bold text-slate-950 dark:text-white">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: "Can I start with a free plan?", a: "Yes! Every MultiSarv product includes a free Starter plan so you can evaluate before committing to a paid tier." },
            { q: "Is there a long-term contract?", a: "No. All plans are billed monthly or annually with no lock-in. You can cancel or upgrade anytime." },
            { q: "What payment methods are accepted?", a: "We accept UPI, Net Banking, Credit/Debit Cards, and corporate invoice payments for enterprise clients." },
            { q: "Can I switch plans?", a: "Absolutely. Upgrade or downgrade any time from your account dashboard. Changes take effect immediately." },
            { q: "Do you offer custom pricing?", a: "Yes, for large enterprises with specific needs. Contact our sales team for a tailored quote." },
            { q: "Is there a trial period?", a: "The free Starter plan serves as your trial. No credit card required to get started." },
          ].map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-slate-950 dark:text-white">{faq.q}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-tr from-blue-700 via-cyan-600 to-orange-500 text-white rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-display font-bold">Not sure which plan is right for you?</h2>
        <p className="text-cyan-100 text-sm max-w-lg mx-auto">Talk to our team and we will recommend the best plan for your business.</p>
        <Link to="/contact" className="bg-white hover:bg-slate-50 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-transform hover:scale-105">
          <span>Contact Sales</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
