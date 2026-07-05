import { getStorage } from "firebase-admin/storage";
import { getFirebaseAdminApp } from "./admin";

let _storage: any = null;

/**
 * Returns the Firebase Cloud Storage bucket instance, initializing Firebase Admin on demand.
 */
export function getStorageBucket() {
  if (!_storage) {
    _storage = getStorage(getFirebaseAdminApp()).bucket();
  }
  return _storage;
}

/**
 * Shared singleton instance of the Firebase Cloud Storage bucket, initialized lazily.
 */
export const storage = new Proxy<any>({} as any, {
  get(target, prop, receiver) {
    return Reflect.get(getStorageBucket(), prop, receiver);
  }
});

