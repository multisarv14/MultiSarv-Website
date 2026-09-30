import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building, Shield, HeartPulse, Users, CheckCircle } from "lucide-react";
import { CASE_STUDIES } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import { PAGE_META } from "../seo";

const industryIconMap: Record<string, React.ReactNode> = {
  "Real Estate": <Building className="w-5 h-5" />,
  "Housing Society": <Shield className="w-5 h-5" />,
  "Healthcare": <HeartPulse className="w-5 h-5" />,
  "Business": <Users className="w-5 h-5" />,
};

export default function CaseStudiesPage() {
  useSEO(PAGE_META["/case-studies"]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Client Success Stories</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Real Results. Real Businesses.</h1>
        <p className="max-w-xl mx-auto text-sm text-slate-500 leading-relaxed">
          See how MultiSarv's products have transformed operations for real estate firms, housing societies, hospitals, and enterprises across India.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-950 rounded-3xl p-8 border border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "220+", label: "Businesses Served" },
            { val: "45%", label: "Avg. Lead Conversion Increase" },
            { val: "99%", label: "Maintenance Collection Rate" },
            { val: "15 min", label: "Reduced Patient Wait Times" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-400">{stat.val}</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="space-y-12">
        {CASE_STUDIES.map((cs, idx) => (
          <div
            key={cs.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-xl">
                  {industryIconMap[cs.industry] || <Building className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{cs.industry}</div>
                  <h2 className="font-display font-bold text-xl text-slate-950 dark:text-white">{cs.client}</h2>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-500 tracking-wider">The Challenge</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{cs.challenge}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-500 tracking-wider">The Solution</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{cs.solution}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-500 tracking-wider">Results Achieved</span>
                <ul className="space-y-1.5">
                  {cs.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/products/${cs.product.toLowerCase().replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
              >
                <span>View {cs.product} Product Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Testimonial Card */}
            <div className={`${idx % 2 === 1 ? "lg:order-first" : ""}`}>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                {/* Product Badge */}
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl font-mono">
                    {cs.product}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{cs.industry}</span>
                </div>

                {/* Testimonial */}
                {cs.testimonial && (
                  <blockquote className="space-y-4">
                    <div className="text-3xl text-slate-200 dark:text-slate-700 font-display leading-none">"</div>
                    <p className="text-sm sm:text-base italic text-slate-600 dark:text-slate-300 leading-relaxed -mt-4">
                      {cs.testimonial}
                    </p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-sm text-slate-950 dark:text-white">{cs.testimonialAuthor}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{cs.testimonialRole}</div>
                    </div>
                  </blockquote>
                )}
                {!cs.testimonial && cs.testimonialAuthor && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-sm text-slate-950 dark:text-white">{cs.testimonialAuthor}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{cs.testimonialRole}</div>
                  </div>
                )}

                {/* Results summary */}
                <div className="grid grid-cols-1 gap-2">
                  {cs.results.slice(0, 2).map((r, i) => (
                    <div key={i} className="flex items-center gap-2 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 text-center space-y-4">
        <h2 className="text-2xl font-display font-bold">Ready to write your own success story?</h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">Join 220+ businesses across India who have transformed their operations with MultiSarv's enterprise SaaS solutions.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-transform hover:scale-103">
            <span>Talk to Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
