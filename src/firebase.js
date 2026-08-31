import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut
} from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBgalMy9iyGnTYKEghmg285a8xWHkPvQ58",
  authDomain: "etniaapp-3d368.firebaseapp.com",
  projectId: "etniaapp-3d368",
  storageBucket: "etniaapp-3d368.firebasestorage.app",
  messagingSenderId: "199637913261",
  appId: "1:199637913261:web:feca913eba88e5d3000024",
  measurementId: "G-H1TQ0XSPBX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configurar Proveedor de Google con Scopes para Drive y Sheets
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      localStorage.setItem('gdrive_access_token', credential.accessToken);
    }
    return result.user;
  } catch (error) {
    console.error("Error en login con Google:", error);
    throw error;
  }
};

export const logout = () => signOut(auth);