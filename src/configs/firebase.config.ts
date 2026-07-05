import { ENV } from "./env";

/**
 * Firebase Admin configuration settings mapped directly from the verified environment variables.
 */
export const FIREBASE_CONFIG = {
  projectId: ENV.FIREBASE_PROJECT_ID,
  clientEmail: ENV.FIREBASE_CLIENT_EMAIL,
  privateKey: ENV.FIREBASE_PRIVATE_KEY,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  collections: {
    syncLogs: "sync_logs",
    businesses: "businesses",
  },
};
