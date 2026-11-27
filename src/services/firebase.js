import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache } from 'firebase/firestore';

/**
 * Inicialización de Firebase / Cloud Firestore (firebase.js)
 * Corresponde a: User Story #5 (#per-s3-us5-pwa) — Sprint 3
 * Asignado a: Manuel / Jerónimo
 *
 * Las credenciales salen de variables VITE_* (.env en local, Environment
 * Variables en Vercel). persistentLocalCache({}) guarda la caché de Firestore
 * en IndexedDB: los gastos siguen disponibles offline y las escrituras
 * pendientes sobreviven a un cierre/recarga de la app (por eso la Prueba 3
 * da distinto que en React Native, donde la caché es solo en memoria).
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

function createFirestore() {
  try {
    return initializeFirestore(app, { localCache: persistentLocalCache({}) });
  } catch {
    // En desarrollo, el hot reload puede ejecutar este módulo dos veces:
    // Firestore ya fue inicializado y se reutiliza la instancia existente.
    return getFirestore(app);
  }
}

export const db = createFirestore();
export default app;
