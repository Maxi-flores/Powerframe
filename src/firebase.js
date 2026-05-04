import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeYhc94-Q-gfesDE5mmQr0n8aLxMXYvlg",
  authDomain: "powerframe-web.firebaseapp.com",
  projectId: "powerframe-web",
  storageBucket: "powerframe-web.firebasestorage.app",
  messagingSenderId: "896174477601",
  appId: "1:896174477601:web:708fa453c63988c1c76e60",
  measurementId: "G-JH84Z2RM1V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
