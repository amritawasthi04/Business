/**
 * Strong TypeScript types for verified environment variables.
 */
export interface IEnvConfig {
  NODE_ENV: "development" | "production" | "test";
  APP_NAME: string;
  APP_VERSION: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_STORAGE_BUCKET: string;
}

/**
 * Validates and retrieves required environment variables, failing fast on missing or malformed items.
 */
function validateAndLoadEnv(): IEnvConfig {
  const errors: string[] = [];

  const getRequired = (name: string): string => {
    const value = process.env[name];
    if (!value || value.trim() === "") {
      errors.push(`Environment variable '${name}' is required but was not provided or is empty.`);
      return "";
    }
    return value;
  };

  const nodeEnv = (process.env.NODE_ENV || "development") as IEnvConfig["NODE_ENV"];
  if (!["development", "production", "test"].includes(nodeEnv)) {
    errors.push(`Environment variable 'NODE_ENV' must be 'development', 'production', or 'test'. Got: '${nodeEnv}'`);
  }

  const appName = getRequired("APP_NAME");
  const appVersion = getRequired("APP_VERSION");
  const firebaseProjectId = getRequired("FIREBASE_PROJECT_ID");
  const firebaseClientEmail = getRequired("FIREBASE_CLIENT_EMAIL");
  
  // Private key needs to handle escaped newlines in env variables
  let firebasePrivateKeyRaw = getRequired("FIREBASE_PRIVATE_KEY");
  let firebasePrivateKey = firebasePrivateKeyRaw;
  if (firebasePrivateKeyRaw && firebasePrivateKeyRaw.includes("\\n")) {
    firebasePrivateKey = firebasePrivateKeyRaw.replace(/\\n/g, "\n");
  }

  const firebaseStorageBucket = getRequired("FIREBASE_STORAGE_BUCKET");

  if (errors.length > 0) {
    throw new Error(
      `Environment Validation Failed:\n${errors.map((err) => `  - ${err}`).join("\n")}`
    );
  }

  return {
    NODE_ENV: nodeEnv,
    APP_NAME: appName,
    APP_VERSION: appVersion,
    FIREBASE_PROJECT_ID: firebaseProjectId,
    FIREBASE_CLIENT_EMAIL: firebaseClientEmail,
    FIREBASE_PRIVATE_KEY: firebasePrivateKey,
    FIREBASE_STORAGE_BUCKET: firebaseStorageBucket,
  };
}

/**
 * Verified global application environment variables.
 */
export const ENV: IEnvConfig = validateAndLoadEnv();
