// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBkYeEX1JmwdPn3OPhwnGK_R_wAMBJnDoo",
  authDomain: "jobsearch-34ebe.firebaseapp.com",
  projectId: "jobsearch-34ebe",
  storageBucket: "jobsearch-34ebe.appspot.com",
  messagingSenderId: "426913957504",
  appId: "1:426913957504:web:3ca24aebc8dff9525b8865",
  measurementId: "G-W1KYTNWW7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export the initialized services
export { app, auth, db };
