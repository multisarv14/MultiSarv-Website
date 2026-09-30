import React from "react";
import { Link } from "react-router-dom";
import {
  Code, Activity, Layers, Bot, Sliders, Globe, Briefcase, Shield, Check, ChevronRight, ArrowRight
} from "lucide-react";
import { SERVICES } from "../data/master-data";
import { useSEO } from "../hooks/useSEO";
import { PAGE_META } from "../seo";

function ServiceIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    Code: <Code className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Bot: <Bot className="w-5 h-5" />,
    Sliders: <Sliders className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Briefcase: <Briefcase className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
  };
  return <>{map[icon] || <Code className="w-5 h-5" />}</>;
}

export default function ServicesPage() {
  useSEO(PAGE_META["/services"]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Solutions Engineering</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Expert Custom Enterprise Workloads</h1>
        <p className="max-w-xl mx-auto text-sm text-slate-500 leading-relaxed font-sans">
          We craft serverless pipelines that synchronize smoothly with your on-site networks under strict deterministic zero-trust Firebase credentials.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((serv) => (
          <Link
            key={serv.id}
            to={`/services/${serv.id}`}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
          >
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-cyan-400 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <ServiceIcon icon={serv.icon} />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-slate-950 dark:text-white">{serv.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{serv.shortDesc}</p>
              </div>
              <div className="space-y-1.5 pt-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Deliverables Included</span>
                <ul className="space-y-1">
                  {serv.features.map((feat, idx) => (
                    <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex flex-wrap gap-1">
                {serv.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-[9px] font-mono px-2 py-0.5 rounded leading-none">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400">
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Process Section */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-orange-600 dark:text-orange-400 font-mono font-bold text-xs uppercase tracking-widest">Our Development Process</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 dark:text-white">How We Deliver Excellence</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Discovery & Audit", desc: "We analyze your existing systems, workflows, and technical constraints to create a precise solution blueprint." },
            { step: "02", title: "Architecture Design", desc: "Our architects design serverless Firebase schemas, API layers, and security rule configurations." },
            { step: "03", title: "Agile Development", desc: "Iterative sprints with weekly demos, Firebase CI/CD deployments, and continuous feedback loops." },
            { step: "04", title: "Launch & Support", desc: "Production deployment on Firebase Hosting with 24/7 monitoring, uptime SLAs, and dedicated account management." },
          ].map((step, i) => (
            <div key={i} className="space-y-3">
              <div className="text-4xl font-display font-extrabold text-blue-100 dark:text-blue-950/60">{step.step}</div>
              <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white">{step.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
