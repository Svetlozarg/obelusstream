import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuqxIXjlFjdTz9x2lUrA_mcBC5VcMTub8",
  authDomain: "obelusstream.firebaseapp.com",
  projectId: "obelusstream",
  storageBucket: "obelusstream.appspot.com",
  messagingSenderId: "1044966897222",
  appId: "1:1044966897222:web:ccef2c74711953ba3a7c47",
  measurementId: "G-D2R5B7T686",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
