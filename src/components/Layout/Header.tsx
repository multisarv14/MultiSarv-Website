import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bot, Lock, Menu, X } from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";
import logoMultiSarvCorporate from "../../assets/images/logo_multisarv_corporate_1781237621472.jpg";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/services", label: "Services" },
  { path: "/pricing", label: "Pricing" },
  { path: "/about", label: "About" },
  { path: "/blogs", label: "Blogs" },
  { path: "/contact", label: "Contact Us" },
  { path: "/sarvai", label: "SarvAI", isAI: true },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, authLoading, handleLogin, handleLogout, leads } = useAppContext();
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
            src={logoMultiSarvCorporate}
            alt="MultiSarv India Logo"
            className="w-10 h-10 rounded-xl object-cover bg-white border border-slate-200/50 shadow-md shadow-cyan-500/10 select-none"
            referrerPolicy="no-referrer"
          />
          <div className="font-display font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
            MultiSarv India
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
                  ? item.isAI
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 font-bold"
                    : "bg-slate-800 text-cyan-400 font-semibold"
                  : item.isAI
                  ? "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              {item.isAI && <Bot className="w-3.5 h-3.5 text-emerald-500" />}
              {item.label}
              {item.path === "/admin" && leads.length > 0 && (
                <span className="bg-orange-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none">
                  {leads.length}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {authLoading ? (
            <span className="text-xs text-slate-500 font-mono animate-pulse">Verifying...</span>
          ) : user ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 pl-2 pr-3 py-1.5 rounded-xl shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="w-5 h-5 rounded-full object-cover border border-slate-700" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-cyan-600 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-200 truncate max-w-[120px]" title={user.email}>
                {user.displayName || user.email}
              </span>
              <span className="text-slate-700 text-xs">|</span>
              <button onClick={handleLogout} className="text-[10px] font-bold text-rose-400 hover:text-rose-300 uppercase tracking-widest transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/10 cursor-pointer hover:scale-102"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In with Google</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button onClick={() => navigate("/sarvai")} className="bg-slate-800 p-2 text-cyan-400 rounded-lg" title="SarvAI">
            <Bot className="w-5 h-5 animate-pulse" />
          </button>
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                  ? item.isAI
                    ? "bg-emerald-950/40 text-emerald-400 font-bold"
                    : "bg-slate-800 text-cyan-400 font-bold"
                  : item.isAI
                  ? "text-emerald-400 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              {item.isAI && <Bot className="w-4 h-4 text-emerald-500" />}
              {item.label}
            </Link>
          ))}

          <div className="border-t border-slate-800 pt-3 mt-1">
            {authLoading ? (
              <div className="text-xs text-slate-500 px-4 font-mono">Loading authentication...</div>
            ) : user ? (
              <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User profile" className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-slate-950 flex items-center justify-center text-xs font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-slate-200 truncate">{user.displayName || "Member"}</span>
                    <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all mt-1"
                >
                  Disconnect Profile
                </button>
              </div>
            ) : (
              <button
                onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                className="w-full text-center bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
