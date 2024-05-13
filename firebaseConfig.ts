import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoJ1diQwgeEgeLSKT34VZ4EeJd_SqRLT8",
  authDomain: "abcdefg-99512.firebaseapp.com",
  projectId: "abcdefg-99512",
  storageBucket: "abcdefg-99512.appspot.com",
  messagingSenderId: "875985629372",
  appId: "1:875985629372:web:7eff6fd206762eafac60b9",
  measurementId: "G-WF61D4BM98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;