import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { app, db } from "../lib/firebase";
import type { Lead } from "../types";

const auth = getAuth(app);

// Auth, admin check and admin data for the /admin page.
// Firestore rules are the source of truth for who is an admin: only admins can
// read contactForms, so a successful read means the signed-in user is an admin.
export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contactForms, setContactForms] = useState<any[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) { setIsAdmin(false); setAdminChecked(true); return; }
    let cancelled = false;
    setAdminChecked(false);
    getDocs(query(collection(db, "contactForms"), limit(1)))
      .then(() => { if (!cancelled) setIsAdmin(true); })
      .catch(() => { if (!cancelled) setIsAdmin(false); })
      .finally(() => { if (!cancelled) setAdminChecked(true); });
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    if (!isAdmin) { setLeads([]); return; }
    return onSnapshot(
      collection(db, "leads"),
      (snapshot) => {
        const list: Lead[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as Lead));
        list.sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
        setLeads(list);
      },
      (error) => console.error("Leads sync failed:", error)
    );
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) { setContactForms([]); return; }
    return onSnapshot(
      collection(db, "contactForms"),
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
        list.sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));
        setContactForms(list);
      },
      (error) => console.error("Contact forms sync failed:", error)
    );
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      const { user: u } = await signInWithPopup(auth, new GoogleAuthProvider());
      const userRef = doc(db, "users", u.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        // Roles are granted server-side; new profiles always start as "user".
        await setDoc(userRef, {
          uid: u.uid,
          name: u.displayName || "MultiSarv Member",
          email: u.email || "",
          role: "user",
        });
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error("Sign out failed:", error); }
  };

  const writeAuditLog = async (action: string, module: string, documentId: string) => {
    if (!user) return;
    const logId = `LOG-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await setDoc(doc(db, "auditLogs", logId), {
        logId, userId: user.uid, userName: user.displayName || "Admin",
        userRole: "Admin", action, module, documentId,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      });
    } catch (error) {
      console.error("Audit log write failed:", error);
    }
  };

  const runAdminAction = async (label: string, action: () => Promise<void>, audit: [string, string, string]) => {
    if (!isAdmin) return;
    try {
      await action();
      await writeAuditLog(...audit);
    } catch (error) {
      console.error(`${label} failed:`, error);
      alert(`${label} failed. Please try again.`);
    }
  };

  const deleteContactForm = async (id: string) => {
    if (!confirm("Remove this contact submission?")) return;
    await runAdminAction("Delete inquiry", () => deleteDoc(doc(db, "contactForms", id)), ["DELETE", "ContactForm", `CONTACT_${id}`]);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Remove this lead?")) return;
    await runAdminAction("Delete lead", () => deleteDoc(doc(db, "leads", id)), ["DELETE", "Leads", `LEAD_${id}`]);
  };

  const updateLeadStatus = (id: string, next: Lead["status"]) =>
    runAdminAction("Update lead", () => updateDoc(doc(db, "leads", id), { status: next }), ["UPDATE", "Leads", `LEAD_${id}`]);

  return {
    user, authLoading, isAdmin, adminChecked, handleLogin, handleLogout,
    leads, contactForms, deleteContactForm, deleteLead, updateLeadStatus,
  };
}
