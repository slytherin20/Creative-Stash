import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig: Config = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECTID!,
  messagingSenderId: process.env.FIREBASE_MESSAGINGID!,
  appId: process.env.FIREBASE_APPID!,
};

interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  messagingSenderId: string;
  appId: string;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;
export { auth };
