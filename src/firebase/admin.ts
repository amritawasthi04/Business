import { App, initializeApp, getApps, cert } from "firebase-admin/app";
import { FIREBASE_CONFIG } from "@/configs/firebase.config";

/**
 * Initializes and returns the Firebase Admin App instance.
 * Ensures single instance initialization.
 */
export function getFirebaseAdminApp(): App {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]!;
  }

  // Set up service account cert credential
  const credential = cert({
    projectId: FIREBASE_CONFIG.projectId,
    clientEmail: FIREBASE_CONFIG.clientEmail,
    privateKey: FIREBASE_CONFIG.privateKey,
  });

  return initializeApp({
    credential,
    storageBucket: FIREBASE_CONFIG.storageBucket,
  });
}
export type { App };
