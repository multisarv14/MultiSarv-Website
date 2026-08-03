import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Building, Shield, Users, TrendingUp, Award, HeartPulse,
  Briefcase, Globe, Database, Wrench, Utensils, Tv,
  CheckSquare, ArrowRight, ArrowLeft, Sparkles, ChevronRight, Lock
} from "lucide-react";
import { ALL_PRODUCTS } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";

function ProductIcon({ id }: { id: string }) {
  const map: Record<string, React.ReactNode> = {
    realtysarv: <Building className="w-6 h-6" />,
    societysarv: <Shield className="w-6 h-6" />,
    hrsarv: <Users className="w-6 h-6" />,
    finsarv: <TrendingUp className="w-6 h-6" />,
    edusarv: <Award className="w-6 h-6" />,
    healthsarv: <HeartPulse className="w-6 h-6" />,
    realtyconnect: <Briefcase className="w-6 h-6" />,
    onlinesarv: <Globe className="w-6 h-6" />,
    domainlink: <Database className="w-6 h-6" />,
    garageguru: <Wrench className="w-6 h-6" />,
    cookiq: <Utensils className="w-6 h-6" />,
    tubeiq: <Tv className="w-6 h-6" />,
    noai: <Users className="w-6 h-6" />,
  };
  return <>{map[id] || <Building className="w-6 h-6" />}</>;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  useSEO({
    title: product ? `${product.name} — ${product.tagline}` : "Product Not Found",
    description: product?.description
  });

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Product Not Found</h1>
        <p className="text-slate-500">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  // Related products (same category or adjacent)
  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-cyan-400 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            {product.logoUrl ? (
              <img src={product.logoUrl} alt={`${product.name} Logo`} className="w-24 h-24 rounded-3xl object-cover bg-white border border-slate-200 shadow-md select-none" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                <ProductIcon id={product.id} />
              </div>
            )}
            <div className="space-y-1">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-[10px] sm:text-xs tracking-wider uppercase">Product Specification</span>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">{product.name}</h1>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{product.tagline}</p>
              <span className="inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400">{product.badge}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/sandbox"
              state={{ product: product.name }}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Draft Custom Proposal</span>
            </Link>
            <Link
              to={`/privacy/${product.id}`}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Link>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{product.description}</p>

        {/* Features & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
            <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              <span>Core Platform Features</span>
            </h4>
            <ul className="space-y-2 mt-2">
              {product.features.map((feat, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
            <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Key Business Values</span>
            </h4>
            <ul className="space-y-2 mt-2">
              {product.benefits.map((ben, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wide">Interactive SaaS Pricing Plans</h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="border border-emerald-200 dark:border-emerald-900/60 p-4 rounded-xl space-y-1 bg-emerald-50/10 dark:bg-emerald-950/10 shadow-sm relative border-dashed">
              <div className="absolute top-2 right-2 bg-emerald-500 text-white font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">Evaluation</div>
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">STARTER PLAN</div>
              <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-mono">{product.pricing.starter || "₹0 / Free"}</div>
              <div className="text-[10px] text-slate-500 mt-1">Evaluation sandbox. Basic read/write and evaluation logs.</div>
            </div>
            <div className="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-1 bg-white dark:bg-slate-950 shadow-sm">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Standard Platform</div>
              <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-mono">{product.pricing.standard}</div>
              <div className="text-[10px] text-slate-500 mt-1">Billed monthly. Standard Firebase rules mapping.</div>
            </div>
            <div className="border border-blue-500 dark:border-cyan-500 p-4 rounded-xl space-y-1 bg-blue-50/20 dark:bg-sky-950/25 shadow-sm relative">
              <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">Popular</div>
              <div className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 font-semibold uppercase">Enterprise Scale</div>
              <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-mono">{product.pricing.enterprise}</div>
              <div className="text-[10px] text-slate-500 mt-1">Priority queue checkouts, live analytics.</div>
            </div>
            <div className="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-1 bg-white dark:bg-slate-950 shadow-sm">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-medium">Account Support</div>
              <div className="text-[11px] font-bold text-slate-950 dark:text-slate-100 leading-normal mt-1">{product.pricing.support}</div>
              <div className="text-[10px] text-slate-500">Dedicated manager with Slack/WhatsApp bridge.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h4 className="font-display font-semibold text-lg text-white">Interested in onboarding MultiSarv {product.name}?</h4>
          <p className="text-xs text-slate-400 mt-1">Submit your workspace constraints in the AI Lead Qualifications form for direct account assessment.</p>
        </div>
        <Link
          to="/sandbox"
          state={{ product: product.name }}
          className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-1 shrink-0 transition-transform hover:scale-103"
        >
          <span>Request Demo & Score</span>
          <ArrowRight className="w-4 h-4 text-orange-500" />
        </Link>
      </div>

      {/* Related Products */}
      <div className="space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white">Explore More Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedProducts.map((prod) => (
            <Link key={prod.id} to={`/products/${prod.id}`} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                {prod.logoUrl ? (
                  <img src={prod.logoUrl} alt={prod.name} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                    <ProductIcon id={prod.id} />
                  </div>
                )}
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{prod.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{prod.badge}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{prod.tagline}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 mt-3">
                <span>View Details</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
