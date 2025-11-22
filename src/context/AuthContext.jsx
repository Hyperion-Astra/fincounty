import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";


// ------------------------
// CONTEXT SETUP
// ------------------------
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}


// ------------------------
// PROVIDER
// ------------------------
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);       // firebase auth user
  const [userProfile, setUserProfile] = useState(null);       // firestore user doc
  const [loading, setLoading] = useState(true);               // gate for routes
  const [profileLoading, setProfileLoading] = useState(true); // firestore listener


  // --------------------------------------
  // AUTH LISTENER (checks Firebase Auth)
  // --------------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userRef = doc(db, "users", user.uid);

        const unsubscribeProfile = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUserProfile(snap.data());
          } else {
            setUserProfile(null);
          }

          setProfileLoading(false);
          setLoading(false); // <-- IMPORTANT FIX
        });

        return () => unsubscribeProfile();
      } else {
        setUserProfile(null);
        setProfileLoading(false);
        setLoading(false); // <-- ALSO IMPORTANT
      }
    });

    return unsub;
  }, []);



  // --------------------------------------
  // REGISTER (email + password + user doc)
  // --------------------------------------
  async function register(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

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
  }



  // --------------------------------------
  // CONTEXT EXPORT
  // --------------------------------------
  const value = {
    currentUser,
    userProfile,
    loading: loading || profileLoading,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
