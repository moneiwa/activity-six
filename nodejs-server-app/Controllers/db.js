// db.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Firebase configuration (replace with your actual config values)
const firebaseConfig = {
    apiKey: "AIzaSyBo6cT2jQKjDsCAbRRmozrl1-QddESMTds",
    authDomain: "employee-ef0bf.firebaseapp.com",
    projectId: "employee-ef0bf",
    storageBucket: "employee-ef0bf.firebasestorage.app",
    messagingSenderId: "242323521719",
    appId: "1:242323521719:web:10b686b935e56473454d32",
    measurementId: "G-HDJMRPC9NG"
}
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Export the Firestore instance for use in other files
module.exports = { db };
