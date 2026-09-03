// ===============================
// Firebase Configuration
// ===============================

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// ===============================
// Replace with YOUR Firebase Config
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyA7L53qasIzhfeCnbXokeoN_TUm0WB7TK4",
  authDomain: "dailyplanner-4d612.firebaseapp.com",
  projectId: "dailyplanner-4d612",
  storageBucket: "dailyplanner-4d612.firebasestorage.app",
  messagingSenderId: "658045234463",
  appId: "1:658045234463:web:bf4b74b7b7977d9661142a",
  measurementId: "G-NK187TLFK9"
};


// ===============================
// Initialize Firebase
// ===============================

const app = initializeApp(firebaseConfig);


// ===============================
// Services
// ===============================

const auth = getAuth(app);

const db = getFirestore(app);


// ===============================
// Export
// ===============================

export { auth, db };