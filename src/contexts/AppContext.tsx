import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { auth, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { Lead, Blog, ChatMessage } from "../types";
import { PRODUCTS } from "../data/master-data";

interface AppContextType {
  // Auth
  user: any;
  authLoading: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;

  // Data
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  contactForms: any[];

  // Chat
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  chatLoading: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  handleChatSubmit: (e: React.FormEvent) => Promise<void>;

  // Admin utilities
  deleteContactForm: (id: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  updateLeadStatus: (id: string, next: any) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contactForms, setContactForms] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getDefaultBlogs = (): Blog[] => [
    {
      id: "B-101",
      title: "Transforming Indian Retail Pipelines with Real-time ERPs",
      snippet: "How businesses use Firebase architecture and secure Firestore rules to double sales throughput.",
      content: `## Transforming Indian Retail Pipelines with Real-time ERPs\n\nModern businesses are rapidly shifting from paper spreadsheets toward live, auto-syncing Cloud databases. Incorporating a robust real-time database improves operational clarity by 120%.\n\n### Key pillars of multi-tenant serverless models\n1. **Low Memory Overhead:** Load assets dynamically.\n2. **Deterministic Rules Engine:** Restrict database modifications via secure rules without continuous server checks.\n3. **Responsive Client Layouts:** Use CSS with robust screen media blocks.\n\nUsing MultiSarv's specialized services, standard organizations are successfully upgrading legacy billing schedules within days.`,
      category: "Business Automation",
      keywords: ["SaaS", "Automation", "Firebase Security"],
      metaDescription: "Learn how modern Indian startups use cloud data structures to automate manual accounting procedures.",
      date: "2026-06-08",
      readTime: "4 min read",
      published: true,
      isAiGenerated: false
    }
  ];

  const getDefaultLeads = (): Lead[] => [
    {
      id: "L-101",
      name: "Sanjay Sharma",
      email: "sanjay@sharmagroups.in",
      company: "Sharma Realty & Structures",
      phone: "+91 98765 00121",
      product: "RealtyConnect",
      requirements: "Looking for an ERP with GPS route checking for our independent brokers.",
      budget: "High Level Custom Tier",
      timeline: "Urgent (under 15 days)",
      score: 92,
      rationale: "Strong alignment with RealtyConnect. High budget and urgent timeline detected.",
      status: "qualified",
      assignedTo: "SarvAI Agent-1",
      date: "2026-06-10"
    },
    {
      id: "L-102",
      name: "Dr. Priyesha Nair",
      email: "priyesha@nairhealth.org",
      company: "Nair Diagnostic Center",
      phone: "+91 70122 33445",
      product: "HealthSarv",
      requirements: "Need automated Prescription layout printouts for our OPD ward clinic.",
      budget: "Standard SaaS Tier",
      timeline: "Standard (30-60 days)",
      score: 75,
      rationale: "Good fit for HealthSarv SaaS framework setup. Solid diagnostic match.",
      status: "new",
      assignedTo: "SarvAI Agent-2",
      date: "2026-06-11"
    }
  ];

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Blog sync
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        const list: Blog[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as unknown as Blog));
        if (list.length > 0) {
          setBlogs(list);
          localStorage.setItem("multisarv_blogs", JSON.stringify(list));
        } else {
          const defaults = getDefaultBlogs();
          setBlogs(defaults);
          defaults.forEach(async (b) => {
            try { await setDoc(doc(db, "blogs", b.id), b); } catch {}
          });
        }
      },
      () => {
        const cached = localStorage.getItem("multisarv_blogs");
        if (cached) setBlogs(JSON.parse(cached));
      }
    );
    return () => unsub();
  }, []);

  // Leads sync (only when logged in)
  useEffect(() => {
    if (!user) { setLeads([]); return; }
    const unsub = onSnapshot(
      collection(db, "leads"),
      (snapshot) => {
        const list: Lead[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as unknown as Lead));
        if (list.length > 0) {
          setLeads(list);
          localStorage.setItem("multisarv_leads", JSON.stringify(list));
        } else {
          const defaults = getDefaultLeads();
          setLeads(defaults);
          defaults.forEach(async (l) => {
            try { await setDoc(doc(db, "leads", l.id), l); } catch {}
          });
        }
      },
      () => {
        const cached = localStorage.getItem("multisarv_leads");
        if (cached) setLeads(JSON.parse(cached));
      }
    );
    return () => unsub();
  }, [user]);

  // Contact forms sync (only when logged in)
  useEffect(() => {
    if (!user) { setContactForms([]); return; }
    const unsub = onSnapshot(
      collection(db, "contactForms"),
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
          const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tB - tA;
        });
        setContactForms(list);
      },
      () => {}
    );
    return () => unsub();
  }, [user]);

  // Initial chat message
  useEffect(() => {
    setChatMessages([{
      id: "msg-init",
      sender: "sarvai",
      text: "Namaste! I am **SarvAI**, your expert Solutions Architect at **MultiSarv India**. Ask me anything about our platforms (RealtyConnect, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, NOAI), custom software services, or test our AI tools! **How can I help you today?**",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, []);

  // Auto-scroll chat
  const chatScrollInitialized = useRef(false);
  useEffect(() => {
    if (!chatScrollInitialized.current) { chatScrollInitialized.current = true; return; }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const u = result.user;
        const { getDoc } = await import("firebase/firestore");
        const userRef = doc(db, "users", u.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, {
            uid: u.uid,
            name: u.displayName || "MultiSarv Member",
            email: u.email || "",
            role: u.email === "ramdasraut9@gmail.com" ? "admin" : "user"
          });
        }
      }
    } catch (error) {
      console.error("Google Auth failed:", error);
    }
  };

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error("Sign out failed:", error); }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, history: chatMessages.slice(-6) })
      });
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setChatMessages(prev => [...prev, {
        id: `msg-ai-${Date.now()}`,
        sender: "sarvai",
        text: data.text || "Apologies, I encountered an error.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      setChatMessages(prev => [...prev, {
        id: `msg-err-${Date.now()}`,
        sender: "sarvai",
        text: "I am having trouble connecting. MultiSarv India builds Gemini-powered systems for real estate, clinic records, and staffing. Fill out our AI Lead Qualifier for a customized price sheet!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const deleteContactForm = async (id: string) => {
    if (!confirm("Remove this contact submission?")) return;
    if (!user) { alert("Please login first."); return; }
    try {
      await deleteDoc(doc(db, "contactForms", id));
      const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
      await setDoc(doc(db, "auditLogs", logId), {
        logId, userId: user.uid, userName: user.displayName || "Member",
        userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
        action: "DELETE", module: "ContactForm", documentId: `CONTACT_${id}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
      });
    } catch (error) { handleFirestoreError(error, OperationType.DELETE, `contactForms/${id}`); }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Remove this lead?")) return;
    if (!user) { alert("Please login first."); return; }
    try {
      await deleteDoc(doc(db, "leads", id));
      const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
      await setDoc(doc(db, "auditLogs", logId), {
        logId, userId: user.uid, userName: user.displayName || "Member",
        userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
        action: "DELETE", module: "Leads", documentId: `LEAD_${id}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
      });
    } catch (error) { handleFirestoreError(error, OperationType.DELETE, `leads/${id}`); }
  };

  const updateLeadStatus = async (id: string, next: any) => {
    if (!user) { alert("Please login first."); return; }
    try {
      await updateDoc(doc(db, "leads", id), { status: next });
      const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
      await setDoc(doc(db, "auditLogs", logId), {
        logId, userId: user.uid, userName: user.displayName || "Member",
        userRole: user.email === "ramdasraut9@gmail.com" ? "Admin" : "User",
        action: "UPDATE", module: "Leads", documentId: `LEAD_${id}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
      });
    } catch (error) { handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`); }
  };

  return (
    <AppContext.Provider value={{
      user, authLoading, handleLogin, handleLogout,
      leads, setLeads, blogs, setBlogs, contactForms,
      chatMessages, setChatMessages, chatInput, setChatInput,
      chatLoading, chatEndRef, handleChatSubmit,
      deleteContactForm, deleteLead, updateLeadStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}
