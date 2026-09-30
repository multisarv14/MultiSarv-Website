import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { NOT_FOUND_META } from "../seo";

export default function NotFoundPage() {
  useSEO(NOT_FOUND_META);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="text-6xl font-display font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">404</div>
      <h1 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Page not found</h1>
      <p className="text-slate-500">The page you're looking for doesn't exist or has moved.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <Link to="/contact" className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
