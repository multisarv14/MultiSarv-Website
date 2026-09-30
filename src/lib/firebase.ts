import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Only imported by lazily-loaded pages (Blogs, Contact submit, Admin), so the
// Firebase SDK stays out of the main bundle.
export const app = initializeApp(firebaseConfig);

// Initialize Firestore on the custom database ID provided in config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
