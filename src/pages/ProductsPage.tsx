import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Building, Shield, Users, TrendingUp, Award, HeartPulse,
  Briefcase, Globe, Database, Wrench, Utensils, Tv, ChevronRight, Filter
} from "lucide-react";
import { ALL_PRODUCTS, PRODUCTS, PRODUCT_CATEGORIES } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import type { ProductDetails } from "../types";

function ProductIcon({ id }: { id: string }) {
  const map: Record<string, React.ReactNode> = {
    realtysarv: <Building className="w-5 h-5" />,
    societysarv: <Shield className="w-5 h-5" />,
    hrsarv: <Users className="w-5 h-5" />,
    finsarv: <TrendingUp className="w-5 h-5" />,
    edusarv: <Award className="w-5 h-5" />,
    healthsarv: <HeartPulse className="w-5 h-5" />,
    realtyconnect: <Briefcase className="w-5 h-5" />,
    onlinesarv: <Globe className="w-5 h-5" />,
    domainlink: <Database className="w-5 h-5" />,
    garageguru: <Wrench className="w-5 h-5" />,
    cookiq: <Utensils className="w-5 h-5" />,
    tubeiq: <Tv className="w-5 h-5" />,
    noai: <Users className="w-5 h-5" />,
  };
  return <>{map[id] || <Building className="w-5 h-5" />}</>;
}

function ProductCard({ prod }: { prod: ProductDetails }) {
  return (
    <Link
      to={`/products/${prod.id}`}
      className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between group"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          {prod.logoUrl ? (
            <img src={prod.logoUrl} alt={`${prod.name} Logo`} className="w-16 h-16 rounded-2xl object-cover bg-white border border-slate-200/80 shadow-sm group-hover:scale-110 transition-transform select-none" referrerPolicy="no-referrer" />
          ) : (
            <div className="p-3 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
              <ProductIcon id={prod.id} />
            </div>
          )}
          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400">
            {prod.badge.split(" • ")[1] || prod.badge}
          </span>
        </div>
        <div>
          <h4 className="font-display font-semibold text-base text-slate-900 dark:text-slate-200">{prod.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{prod.tagline}</p>
        </div>
        <div className="space-y-1">
          {prod.features.slice(0, 2).map((f, i) => (
            <div key={i} className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1 shrink-0" />
              <span className="line-clamp-1">{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="text-[10px] font-mono text-slate-400">Starting from <span className="text-emerald-500 font-bold">{prod.pricing.starter || prod.pricing.standard}</span></div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400">
          <span>View Full Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  useSEO({
    title: "Products — 13 Enterprise SaaS Solutions",
    description: "Explore MultiSarv India's complete product catalog: RealtySarv, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, RealtyConnect, NOAI and more."
  });

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayProducts = activeCategory === "all"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => {
        const cat = PRODUCT_CATEGORIES.find((c) => c.slug === activeCategory);
        return cat ? cat.productIds.includes(p.id) : true;
      });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Complete Product Catalog</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">MultiSarv Enterprise Product Suite</h1>
        <p className="max-w-xl mx-auto text-sm text-slate-500">13 powerful SaaS products covering Real Estate, HR, Finance, Healthcare, Education, and Consumer Apps.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === "all" ? "bg-blue-600 text-white shadow-md" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400"}`}
        >
          <Filter className="w-3.5 h-3.5" />
          All Products ({ALL_PRODUCTS.length})
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat.slug ? "bg-blue-600 text-white shadow-md" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400"}`}
          >
            {cat.name} ({cat.productIds.length})
          </button>
        ))}
      </div>

      {/* Category Description */}
      {activeCategory !== "all" && (
        <div className="bg-blue-50/50 dark:bg-sky-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 mb-8 text-sm text-slate-600 dark:text-slate-300 text-center">
          {PRODUCT_CATEGORIES.find((c) => c.slug === activeCategory)?.description}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((prod) => (
          <React.Fragment key={prod.id}>
            <ProductCard prod={prod} />
          </React.Fragment>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 text-center space-y-4">
        <h3 className="font-display font-bold text-2xl">Can't decide which product fits your needs?</h3>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">Let our SarvAI assistant analyze your requirements and suggest the perfect MultiSarv product for your business.</p>
        <Link
          to="/sarvai"
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-transform hover:scale-103 mt-2"
        >
          <span>Ask SarvAI for Recommendations</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
