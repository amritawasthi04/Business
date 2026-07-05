import { getEnv } from "./env";

/**
 * Firebase Admin configuration settings mapped directly from the verified environment variables.
 */
export const FIREBASE_CONFIG = {
  get projectId() {
    return getEnv().FIREBASE_PROJECT_ID;
  },
  get clientEmail() {
    return getEnv().FIREBASE_CLIENT_EMAIL;
  },
  get privateKey() {
    return getEnv().FIREBASE_PRIVATE_KEY;
  },
  get storageBucket() {
    return getEnv().FIREBASE_STORAGE_BUCKET;
  },
  collections: {
    syncLogs: "sync_logs",
    businesses: "businesses",
  },
};

