import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const firebaseEnabled = Boolean(projectId && clientEmail && privateKey);

export const firestore = (() => {
  if (!firebaseEnabled) {
    return null;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId!,
        clientEmail: clientEmail!,
        privateKey: privateKey!,
      }),
    });
  }

  return admin.firestore();
})();

// 导出 firestore 模块用于访问 Timestamp 等类型
export const firestoreModule = firebaseEnabled ? admin.firestore : null;
