import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "./admin";

let _db: Firestore | null = null;

/**
 * Returns the Firestore Database instance, initializing Firebase Admin on demand.
 */
export function getDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getFirebaseAdminApp());
  }
  return _db;
}

/**
 * Shared singleton instance of the Firestore Database, initialized lazily.
 */
export const db: Firestore = new Proxy<Firestore>({} as Firestore, {
  get(target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  }
});

export type { Firestore };

