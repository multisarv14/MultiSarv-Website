import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Code, Activity, Layers, Bot, Sliders, Globe, Briefcase, Shield,
  Check, ChevronRight, ArrowLeft, ArrowRight
} from "lucide-react";
import { SERVICES } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";

function ServiceIcon({ icon, size = "w-8 h-8" }: { icon: string; size?: string }) {
  const map: Record<string, React.ReactNode> = {
    Code: <Code className={size} />,
    Activity: <Activity className={size} />,
    Layers: <Layers className={size} />,
    Bot: <Bot className={size} />,
    Sliders: <Sliders className={size} />,
    Globe: <Globe className={size} />,
    Briefcase: <Briefcase className={size} />,
    Shield: <Shield className={size} />,
  };
  return <>{map[icon] || <Code className={size} />}</>;
}

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);

  useSEO({
    title: service ? `${service.name} — MultiSarv Services` : "Service Not Found",
    description: service?.shortDesc
  });

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Service Not Found</h1>
        <Link to="/services" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/services" className="hover:text-cyan-400">Services</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{service.name}</span>
      </nav>

      {/* Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 space-y-8">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-2xl shrink-0">
            <ServiceIcon icon={service.icon} />
          </div>
          <div className="space-y-2">
            <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">MultiSarv Service</span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">{service.name}</h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">{service.shortDesc}</p>
          </div>
        </div>

        {/* Features & Tech */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">What's Delivered</h3>
            <ul className="space-y-3">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold px-3 py-1.5 rounded-lg font-mono">
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">Typical Engagement</h3>
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span className="text-slate-400">Timeline</span><span className="font-semibold">2–8 weeks</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Team Size</span><span className="font-semibold">2–5 Engineers</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Delivery</span><span className="font-semibold">Firebase Hosting + CI/CD</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="font-display font-bold text-xl">Ready to get started with {service.name}?</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-md">Use our AI-powered proposal generator to get a custom technical blueprint and pricing estimate for your project.</p>
        </div>
        <Link to="/sandbox" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center gap-2 shrink-0 transition-transform hover:scale-103">
          <span>Generate Proposal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Other Services */}
      <div className="space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white">Other Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherServices.map((s) => (
            <Link key={s.id} to={`/services/${s.id}`} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 transition-all group">
              <div className="p-2.5 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <ServiceIcon icon={s.icon} size="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.shortDesc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 mt-3">
                <span>Learn More</span><ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
