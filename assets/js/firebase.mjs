// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCIlGrErQh4CBhXc2P3m0XPTeMJkTUVpI",
    authDomain: "library-project-58686.firebaseapp.com",
    projectId: "library-project-58686",
    storageBucket: "library-project-58686.appspot.com",
    messagingSenderId: "546427144893",
    appId: "1:546427144893:web:8d675ead5ec59f87a745d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;