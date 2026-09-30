import React from "react";
import { Link } from "react-router-dom";
import { Eye, Award, Cpu, ArrowRight } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { PAGE_META } from "../seo";

export default function AboutPage() {
  useSEO(PAGE_META["/about"]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">MultiSarv Corporate Identity</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Our Mission, Vision, and Strategy</h1>
        <p className="max-w-lg mx-auto text-sm text-slate-500 font-sans">Learn about the team pushing architectural bounds to construct safe serverless paradigms in India.</p>
      </div>

      {/* Company Story */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
        <div className="max-w-3xl">
          <span className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mt-2 mb-4">Built in India. Engineered for Scale.</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            MultiSarv was founded with a singular vision: to bring enterprise-grade SaaS solutions to Indian businesses at every scale. We recognized that while global SaaS platforms exist, they rarely cater to India's unique regulatory, linguistic, and operational requirements.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mt-4">
            Today, MultiSarv powers 220+ businesses across Real Estate, Healthcare, Education, Housing Societies, and Retail — all built on Google's Firebase platform with zero-trust security and AI-powered automation.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[
          {
            title: "Company Vision",
            desc: "To democratize high-security multi-tenant CRM and ERP systems for startups & established groups alike with absolute serverless operational transparency.",
            icon: "Eye",
            color: "border-blue-100 hover:border-blue-400 text-blue-600 dark:text-cyan-400"
          },
          {
            title: "Company Mission",
            desc: "To replace fragile, hard-to-maintain systems with secure, low-maintenance cloud software that Indian businesses of every size can afford.",
            icon: "Award",
            color: "border-cyan-100 hover:border-cyan-400 text-cyan-600 dark:text-cyan-400"
          },
          {
            title: "Innovation Strategy",
            desc: "We ship focused products fast, listen closely to customer feedback, and give every client clear pricing and a practical technical plan.",
            icon: "Cpu",
            color: "border-orange-100 hover:border-orange-400 text-orange-500"
          }
        ].map((val, idx) => (
          <div key={idx} className={`bg-white dark:bg-slate-900 border dark:border-slate-800 ${val.color} px-6 py-8 rounded-3xl space-y-4 transition-all shadow-sm`}>
            <div className={`p-3 bg-slate-50 dark:bg-slate-800 w-fit rounded-2xl ${val.color}`}>
              {val.icon === "Eye" && <Eye className="w-6 h-6" />}
              {val.icon === "Award" && <Award className="w-6 h-6" />}
              {val.icon === "Cpu" && <Cpu className="w-6 h-6" />}
            </div>
            <h4 className="font-display font-bold text-lg text-slate-950 dark:text-white">{val.title}</h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{val.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Businesses Served", val: "220+", sub: "Across India" },
            { label: "Products Built", val: "13", sub: "Enterprise SaaS" },
            { label: "Uptime Guarantee", val: "99.9%", sub: "Firebase SLA" },
            { label: "Active Users", val: "15,000+", sub: "Monthly Active" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-display font-extrabold text-blue-600 dark:text-cyan-400">{stat.val}</div>
              <div className="text-sm font-semibold text-slate-950 dark:text-white mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 font-mono">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="text-center md:text-left space-y-1">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">LEADERSHIP COORDINATORS</span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950 dark:text-white">Engineering the Future of SaaS</h3>
        </div>
        <div id="leadership-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Shyam Kumar", role: "Chief Executive Architect", desc: "Coordinates product release loops across medical and estate ERP channels." },
            { name: "Pooja Kshirsagar", role: "VP Cloud & DevSecOps", desc: "Architect of zero-trust Firestore custom access policies." },
            { name: "Manojkumar Mane", role: "Head of AI Framework Integration", desc: "Leads AI integration projects for client platforms." },
            { name: "Santosh Kashid", role: "Lead UI Developer", desc: "Crafts delightful premium Material 3 responsive layouts." }
          ].map((member, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 font-mono text-lg mb-4">
                {member.name.charAt(0)}
              </div>
              <div className="font-bold text-sm text-slate-950 dark:text-white font-display">{member.name}</div>
              <div className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono mt-0.5">{member.role}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white">Our Technology Foundation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Google Firebase", desc: "Real-time Firestore, Auth, Hosting" },
            { name: "Google Cloud", desc: "Cloud Run, backups & monitoring" },
            { name: "React & TypeScript", desc: "Modern frontend architecture" },
            { name: "Flutter", desc: "Cross-platform mobile apps" },
          ].map((tech, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="font-bold text-sm text-slate-900 dark:text-white">{tech.name}</div>
              <div className="text-xs text-slate-400">{tech.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-display font-bold text-slate-950 dark:text-white">Ready to partner with MultiSarv?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-transform hover:scale-103">
            <span>Contact Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/case-studies" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all hover:border-blue-400">
            <span>View Case Studies</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
