import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoMultiSarv from "../../assets/images/logo-multisarv.webp";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/services", label: "Services" },
  { path: "/pricing", label: "Pricing" },
  { path: "/about", label: "About" },
  { path: "/blogs", label: "Blogs" },
  { path: "/contact", label: "Contact Us" },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header id="main-nav" className="sticky top-0 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 z-40 transition-colors">
      <div className="max-w-7xl mx-auto ps-1 pe-4 sm:ps-3 sm:pe-6 lg:ps-4 lg:pe-8 h-18 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img
            src={logoMultiSarv}
            alt="MultiSarv Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-cover bg-white border border-slate-200/50 shadow-md shadow-cyan-500/10 select-none"
            referrerPolicy="no-referrer"
          />
          <div className="font-display font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
            MultiSarv
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              id={`nav-link-${item.path.replace(/\//g, "-")}`}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isActive(item.path)
                  ? "bg-slate-800 text-cyan-400 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-slate-900 border-b border-slate-800 py-4 px-4 flex flex-col gap-2 shadow-inner">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                isActive(item.path)
                  ? "bg-slate-800 text-cyan-400 font-bold"
                  : "text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              {item.label}
            </Link>
          ))}

        </div>
      )}
    </header>
  );
}
