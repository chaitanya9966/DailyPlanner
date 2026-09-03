// ==========================================
// Daily Planner
// Profile Page
// Part 1
// ==========================================

import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


// ==========================================
// DOM ELEMENTS
// ==========================================

const displayName = document.getElementById("displayName");
const email = document.getElementById("email");

const avatarLetter = document.getElementById("avatarLetter");

const verificationStatus =
    document.getElementById("verificationStatus");

const verifiedText =
    document.getElementById("verifiedText");

const uid =
    document.getElementById("uid");

const creationTime =
    document.getElementById("creationTime");

const lastLogin =
    document.getElementById("lastLogin");

const logoutBtn =
    document.getElementById("logoutBtn");

const logoutDanger =
    document.getElementById("logoutDanger");


// ==========================================
// LOAD USER
// ==========================================

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href="index.html";

        return;

    }

    loadUser(user);

});


// ==========================================
// LOAD USER DATA
// ==========================================

function loadUser(user){

    displayName.textContent =
        user.displayName || "User";

    email.textContent =
        user.email;

    uid.textContent =
        user.uid;

    creationTime.textContent =
        new Date(
            user.metadata.creationTime
        ).toLocaleString();

    lastLogin.textContent =
        new Date(
            user.metadata.lastSignInTime
        ).toLocaleString();

    verifiedText.textContent =
        user.emailVerified ? "Yes" : "No";



    if(user.emailVerified){

        verificationStatus.textContent =
            "✔ Email Verified";

        verificationStatus.style.background =
            "#dcfce7";

        verificationStatus.style.color =
            "#15803d";

    }

    else{

        verificationStatus.textContent =
            "✖ Email Not Verified";

        verificationStatus.style.background =
            "#fee2e2";

        verificationStatus.style.color =
            "#dc2626";

    }



    const firstLetter =

        (user.displayName || user.email)

        .charAt(0)

        .toUpperCase();

    avatarLetter.textContent =
        firstLetter;

}


// ==========================================
// LOGOUT
// ==========================================

async function logout(){

    try{

        await signOut(auth);

        window.location.href="index.html";

    }

    catch(error){

        alert(error.message);

    }

}


logoutBtn.addEventListener(

    "click",

    function(e){

        e.preventDefault();

        logout();

    }

);


logoutDanger.addEventListener(

    "click",

    logout

);


// ==========================================
// PAGE READY
// ==========================================

console.log("Profile Page Loaded");
// ==========================================
// Daily Planner
// Profile Page
// Part 2
// ==========================================

import {
    updateProfile,
    updatePassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


// ==========================================
// DOM ELEMENTS
// ==========================================

const newName =
    document.getElementById("newName");

const updateNameBtn =
    document.getElementById("updateNameBtn");

const newPassword =
    document.getElementById("newPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");


// ==========================================
// UPDATE DISPLAY NAME
// ==========================================

updateNameBtn.addEventListener(

    "click",

    async()=>{

        const user = auth.currentUser;

        if(!user){

            return;

        }

        const name =

            newName.value.trim();

        if(name===""){

            alert(

                "Please enter a display name."

            );

            return;

        }

        try{

            await updateProfile(

                user,

                {

                    displayName:name

                }

            );

            displayName.textContent =

                name;

            avatarLetter.textContent =

                name.charAt(0).toUpperCase();

            newName.value="";

            alert(

                "Display name updated successfully!"

            );

        }

        catch(error){

            alert(error.message);

        }

    }

);


// ==========================================
// CHANGE PASSWORD
// ==========================================

changePasswordBtn.addEventListener(

    "click",

    async()=>{

        const user = auth.currentUser;

        if(!user){

            return;

        }

        const pass =

            newPassword.value;

        const confirm =

            confirmPassword.value;

        if(pass.length < 6){

            alert(

                "Password must be at least 6 characters."

            );

            return;

        }

        if(pass !== confirm){

            alert(

                "Passwords do not match."

            );

            return;

        }

        try{

            await updatePassword(

                user,

                pass

            );

            newPassword.value="";

            confirmPassword.value="";

            alert(

                "Password updated successfully!"

            );

        }

        catch(error){

            if(

                error.code ===

                "auth/requires-recent-login"

            ){

                alert(

                    "For security reasons, please log in again before changing your password."

                );

            }

            else{

                alert(error.message);

            }

        }

    }

);


// ==========================================
// AUTO FILL CURRENT NAME
// ==========================================

onAuthStateChanged(

    auth,

    (user)=>{

        if(user){

            newName.value =

                user.displayName || "";

        }

    }

);


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

newName.addEventListener(

    "keypress",

    function(e){

        if(e.key==="Enter"){

            updateNameBtn.click();

        }

    }

);

confirmPassword.addEventListener(

    "keypress",

    function(e){

        if(e.key==="Enter"){

            changePasswordBtn.click();

        }

    }

);


// ==========================================
// PAGE INITIALIZED
// ==========================================

console.log("Profile functions initialized.");