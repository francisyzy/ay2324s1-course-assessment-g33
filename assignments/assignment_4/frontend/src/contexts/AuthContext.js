import React, { useContext, useState } from "react";
import { auth, fs } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setDoc(doc(fs, "users", user.uid), { role: false });
      }
    );
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        checkIfAdmin(user);
      }
    );
  };

  const checkIfAdmin = async (user) => {
    if (user) {
      const docRef = doc(fs, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsAdmin(docSnap.data().role);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  onAuthStateChanged(
    auth,
    async (user) => {
      setCurrentUser(user);
      await checkIfAdmin(user).then(setLoading(false));
    },
    []
  );

  const value = {
    currentUser,
    isAdmin,
    signup,
    login,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
