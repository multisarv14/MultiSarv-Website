import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages (lazy for code splitting)
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AboutPage from "./pages/AboutPage";
import BlogsPage from "./pages/BlogsPage";
import PricingPage from "./pages/PricingPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import ContactPage from "./pages/ContactPage";
import SarvAIPage from "./pages/SarvAIPage";
import AISandboxPage from "./pages/AISandboxPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminPage from "./pages/AdminPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sarvai" element={<SarvAIPage />} />
            <Route path="/sandbox" element={<AISandboxPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/privacy/:id" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Legacy hash redirects */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}
