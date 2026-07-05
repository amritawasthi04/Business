import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "./admin";

const app = getFirebaseAdminApp();

/**
 * Shared singleton instance of the Firestore Database.
 */
export const db: Firestore = getFirestore(app);
export type { Firestore };
