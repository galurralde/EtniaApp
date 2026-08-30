import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Reemplaza con tus credenciales desde Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBgalMy9iyGnTYKEghmg285a8xWHkPvQ58",
  authDomain: "etniaapp-3d368.firebaseapp.com",
  projectId: "etniaapp-3d368",
  storageBucket: "etniaapp-3d368.firebasestorage.app",
  messagingSenderId: "199637913261",
  appId: "1:199637913261:web:feca913eba88e5d3000024",
  measurementId: "G-H1TQ0XSPBX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth configurado para solicitar permisos de Google Drive API
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    if (token) {
      localStorage.setItem('gdrive_access_token', token);
    }
    return result.user;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('gdrive_access_token');
  return signOut(auth);
};