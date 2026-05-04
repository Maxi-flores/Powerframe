// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeYhc94-Q-gfesDE5mmQr0n8aLxMXYvlg",
  authDomain: "powerframe-web.firebaseapp.com",
  projectId: "powerframe-web",
  storageBucket: "powerframe-web.firebasestorage.app",
  messagingSenderId: "896174477601",
  appId: "1:896174477601:web:708fa453c63988c1c76e60",
  measurementId: "G-JH84Z2RM1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);