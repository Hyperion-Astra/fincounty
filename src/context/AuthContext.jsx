import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (!user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);

      // Only subscribe once
      if (unsubscribeProfile) unsubscribeProfile();

      unsubscribeProfile = onSnapshot(userRef, (snap) => {
        const data = snap.exists() ? snap.data() : null;

        // Only update state if data actually changed (prevents infinite re-render)
        setUserProfile((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(data)) {
            return data;
          }
          return prev;
        });

        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);

    const userDoc = {
      email,
      displayName: displayName || "",
      role: "client",
      kycStatus: "incomplete",
      onboardingStep: 1,
      emailVerified: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", cred.user.uid), userDoc, { merge: true });
    return cred;
  };

  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      loading,
      register,
    }),
    [currentUser, userProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
