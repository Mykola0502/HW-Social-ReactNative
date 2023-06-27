import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1ZpyfgBWKyFhLikT1jMvCoD40iWi-FtY",
  authDomain: "reactnative-social-cb733.firebaseapp.com",
  projectId: "reactnative-social-cb733",
  storageBucket: "reactnative-social-cb733.appspot.com",
  messagingSenderId: "820346841579",
  appId: "1:820346841579:web:3630f375bd599d9c33d1ae",
  measurementId: "G-BRHBH7G9P9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
