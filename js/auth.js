// ===============================
// Firebase Imports
// ===============================

import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// =====================================
// Register Page
// =====================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });

            await sendEmailVerification(user);

            await setDoc(doc(db, "users", user.uid), {

                name: name,
                email: email,
                createdAt: new Date().toISOString()

            });

            alert(
                "Account created successfully.\nPlease verify your email before logging in."
            );

            window.location.href = "index.html";

        }

        catch (error) {

            alert(error.message);

        }

    });

}



// =====================================
// Login Page
// =====================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            if (!user.emailVerified) {

                alert("Please verify your email first.");

                return;

            }

            window.location.href = "dashboard.html";

        }

        catch (error) {

            alert(error.message);

        }

    });

}



// =====================================
// Forgot Password
// =====================================

const forgotLink = document.querySelector(".options a");

if (forgotLink) {

    forgotLink.addEventListener("click", async (e) => {

        e.preventDefault();

        const email = prompt("Enter your registered email:");

        if (!email) return;

        try {

            await sendPasswordResetEmail(auth, email);

            alert("Password reset email sent.");

        }

        catch (error) {

            alert(error.message);

        }

    });

}



// =====================================
// Logout Function
// =====================================

window.logout = async function () {

    try {

        await signOut(auth);

        window.location.href = "index.html";

    }

    catch (error) {

        alert(error.message);

    }

};



// =====================================
// Authentication State
// =====================================

onAuthStateChanged(auth, (user) => {

    const path = window.location.pathname;

    const isDashboard =
        path.includes("dashboard.html") ||
        path.includes("profile.html");

    if (isDashboard && !user) {

        window.location.href = "index.html";

    }

});