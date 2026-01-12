import admin from 'firebase-admin';

// --- Environment Variable Validation ---
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  // In a serverless environment, throwing an error is critical
  // as the application cannot function without these variables.
  throw new Error(
    `Firebase Admin SDK not initialized: Missing environment variables: ${missingEnvVars.join(
      ', '
    )}. Please set them in your environment (e.g., Vercel dashboard).`
  );
}

// --- Handle Vercel's formatting of the private key ---
// Vercel replaces newlines with \n in the environment variable editor.
// The Firebase Admin SDK needs actual newlines, so we replace them back.
const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n');

// --- Initialize Firebase Admin SDK ---
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
    console.log('✅ Firebase Admin SDK initialized successfully.');
  }
} catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('❌ Firebase Admin SDK initialization error:', errorMessage);
  // We throw the error to prevent the application from running with a misconfigured SDK.
  throw new Error(`Firebase Admin SDK initialization failed: ${errorMessage}`);
}

// --- Export the initialized admin instance ---
export default admin;