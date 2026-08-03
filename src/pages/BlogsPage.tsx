import React, { useState } from "react";
import { Bot, Copy, Calendar, Clock, Tag } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { useSEO } from "../hooks/useSEO";
import { Blog } from "../types";

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500 transition-all">
      <span className="absolute top-6 right-6 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded flex items-center gap-1">
        <Calendar className="w-2.5 h-2.5" />{blog.date}
      </span>
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full font-mono">
            {blog.category}
          </span>
          {blog.isAiGenerated && (
            <span className="bg-cyan-50 dark:bg-sky-950/40 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Bot className="w-3 h-3" />
              <span>AI Written</span>
            </span>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-display font-bold text-slate-950 dark:text-white leading-snug pr-16">
          {blog.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
          {blog.snippet}
        </p>
        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800/40 text-xs text-slate-600 dark:text-slate-300 max-h-[140px] overflow-y-auto font-sans scrollbar-thin">
          <p className="whitespace-pre-wrap">{blog.content}</p>
        </div>
      </div>
      <div className="pt-4 mt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />{blog.readTime}
          </span>
          {blog.keywords && blog.keywords.length > 0 && (
            <span className="text-[10px] text-slate-400 font-mono hidden sm:flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" />{blog.keywords.join(", ")}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${blog.title} — MultiSarv India`);
            alert("Blog title copied to clipboard!");
          }}
          className="text-blue-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:underline cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Link</span>
        </button>
      </div>
    </article>
  );
}

export default function BlogsPage() {
  useSEO({
    title: "Blogs — MultiSarv Knowledge Base",
    description: "Read MultiSarv India's expert articles on Firebase architecture, AI integration, business automation, cloud security, and enterprise SaaS strategies."
  });

  const { blogs } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(blogs.map((b) => b.category)))];
  const filtered = selectedCategory === "all" ? blogs : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Industry Knowledge</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">MultiSarv Knowledge Base</h1>
        <p className="max-w-lg mx-auto text-sm text-slate-500">Read tech-driven analysis about Firebase setups, custom templates security, and GPS integrations.</p>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === cat ? "bg-blue-600 text-white shadow-md" : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-blue-400"}`}
            >
              {cat === "all" ? `All Articles (${blogs.length})` : cat}
            </button>
          ))}
        </div>
      )}

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <Bot className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white">No articles yet</h3>
          <p className="text-sm text-slate-500">Our AI blog writer is warming up. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((blog) => (
            <div key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
