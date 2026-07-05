import { getStorage } from "firebase-admin/storage";
import { getFirebaseAdminApp } from "./admin";

const app = getFirebaseAdminApp();

/**
 * Shared singleton instance of the Firebase Cloud Storage bucket.
 */
export const storage = getStorage(app).bucket();
