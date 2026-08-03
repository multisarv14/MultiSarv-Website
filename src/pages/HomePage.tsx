import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles, ArrowRight, Bot, Building, Shield, Users, TrendingUp,
  Award, HeartPulse, Briefcase, Globe, Database, Wrench, Utensils, Tv,
  Code, Activity, Layers, ChevronRight, Send
} from "lucide-react";
import { PRODUCTS, SERVICES } from "../data/master-data";
import { useAppContext } from "../contexts/AppContext";
import { useSEO } from "../hooks/useSEO";

function ProductIcon({ id }: { id: string }) {
  const iconMap: Record<string, React.ReactNode> = {
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
  return <>{iconMap[id] || <Building className="w-5 h-5" />}</>;
}

function ServiceIconComp({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    Code: <Code className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
  };
  return <>{map[icon] || <Code className="w-5 h-5" />}</>;
}

export default function HomePage() {
  useSEO({
    title: "MultiSarv India | Innovate. Integrate. Inspire.",
    description: "MultiSarv India — Premium Enterprise ERP & SaaS Suite. Real Estate CRM, HR, Finance, Healthcare, Education, and AI-powered solutions for Indian businesses."
  });

  const { chatMessages, chatInput, setChatInput, chatLoading, chatEndRef, handleChatSubmit } = useAppContext();
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section id="hero-banner" className="relative overflow-hidden bg-slate-950 text-white min-h-[500px] md:min-h-[550px] flex items-center justify-center py-16 px-4">
        <div className="absolute top-1/4 start-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 end-1/4 translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Premium Enterprise ERP & SaaS Suite for Growing Businesses</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
            MultiSarv India
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent tracking-wide">
            Innovate. Integrate. Inspire.
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            We engineer secure, low-latency SaaS applications designed for scale. Powering Real Estate (RealtyConnect), Smart Housing (SocietySarv), medical records, payroll ledgers, and secure CRM pipelines across India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to="/products"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-white"
            >
              <span>Explore {PRODUCTS.length} Star Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => document.getElementById("ai-quick-assistant")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all text-slate-300"
            >
              <span>Interrogate SarvAI</span>
            </button>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto text-left border-t border-slate-900 mt-12 bg-slate-900/20 p-6 rounded-2xl backdrop-blur-sm">
            {[
              { label: "India-wide Clients", val: "220+" },
              { label: "SaaS Business Suites", val: "13 Ready" },
              { label: "Platform System Uptime", val: "99.9%" },
              { label: "Active Business Users", val: "15,000+" }
            ].map((m, i) => (
              <div key={i}>
                <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">{m.label}</div>
                <div className="text-xl md:text-2xl font-bold font-mono text-cyan-400 mt-1">{m.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 dark:text-cyan-400 uppercase font-mono">Product Suite Showcase</h2>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">Our Complete ERP & Business System Pools</h3>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500">Click to load feature sheets, customized blueprints, and live pricing modules.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((prod) => (
            <Link
              key={prod.id}
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
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {prod.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-base text-slate-900 dark:text-slate-200">{prod.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{prod.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 pt-4">
                <span>Details & pricing</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-tr from-blue-700 via-cyan-600 to-orange-500 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-mono">MultiSarv Intelligent Engine Stack</div>
            <h3 className="text-xl sm:text-2xl font-display font-bold">Instantly qualify your deal & score the lead using SarvAI</h3>
            <p className="text-sm text-cyan-100 max-w-xl">
              Fill in key metrics on requirements and budget. Our Gemini AI scoring model evaluates the technical fit and saves a lead entry in our pipeline.
            </p>
          </div>
          <Link
            to="/sandbox"
            className="bg-white hover:bg-slate-50 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-transform hover:scale-105"
          >
            <Bot className="w-4 h-4 text-orange-500" />
            <span>Interactive Engine Sandbox</span>
          </Link>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-slate-100 dark:bg-slate-900/40 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-sm font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase font-mono">Our Capabilities</h2>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">Exceptional Corporate Software Services</h3>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500">Unlocking modern paradigms using high-availability server structures and AI classifiers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((serv) => (
              <Link key={serv.id} to={`/services/${serv.id}`} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow block">
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-xl w-fit">
                  <ServiceIconComp icon={serv.icon} />
                </div>
                <h4 className="font-display font-semibold text-lg text-slate-900 dark:text-slate-100 mt-4">{serv.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{serv.shortDesc}</p>
                <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-800">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Core Technologies</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {serv.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="text-sm font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1.5">
              <span>View all custom corporate services available</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Industry Reviews</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">Trusted by Leading Enterprises</h3>
            <p className="text-sm text-slate-500 leading-relaxed">See how prominent real estate leaders, diagnostic clinical hospitals, and institutional administrators simplify their administrative duties with MultiSarv India.</p>
            <div className="hidden lg:block pt-4">
              <Link to="/case-studies" className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all inline-block">
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { quote: "Deploying RealtyConnect for our broker pipelines across Mumbai completely transformed client operations. Real-time notifications keep brokers aligned instantly.", author: "Akash Singhal", role: "Director of CRM, Singhal Builders Ltd.", org: "RealtyConnect Customer" },
              { quote: "The zero-trust Firebase rules security layer on SocietySarv gave our housing society residents complete confidence in payment pathways.", author: "Commander V. K. Rao (Retd)", role: "President, Orchid Hills Heights", org: "SocietySarv Operator" }
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-300">"{t.quote}"</p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white">{t.author}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{t.role}</div>
                  <span className="inline-block bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-2">{t.org}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI QUICK CHAT */}
      <section id="ai-quick-assistant" className="bg-slate-950 text-white/90 py-12 border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-900/50 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span>SarvAI Expert Agent Online</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold">Chat directly with India solutions core</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">Ask queries about platform pricing, technical specifications, and CRM customizations. Our AI is loaded with context from MultiSarv's entire suite.</p>
          </div>
          <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800/80 p-4 flex flex-col h-[320px]">
            <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs ${msg.sender === "user" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "bg-slate-800 text-slate-200 border border-slate-700/60"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-400 space-x-1 p-3 rounded-2xl text-[10px] font-mono flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2 pt-3 border-t border-slate-800">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask MultiSarv AI..."
                className="flex-grow bg-slate-950/70 text-xs text-white border border-slate-800 focus:border-cyan-500/80 placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none font-sans"
              />
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
