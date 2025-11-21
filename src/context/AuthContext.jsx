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
  getDoc,
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
        // Load Firestore profile
        const userRef = doc(db, "users", user.uid);

        const unsubscribeProfile = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUserProfile(snap.data());
          } else {
            setUserProfile(null);
          }
          setProfileLoading(false);
        });

        // Cleanup Firestore listener when logging out
        return () => unsubscribeProfile();
      } else {
        setUserProfile(null);
        setProfileLoading(false);
      }

      setLoading(false);
    });

    return unsub;
  }, []);



  // --------------------------------------
  // REGISTER (email + password + user doc)
  // --------------------------------------
  async function register(email, password, displayName) {
    // Create account
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send verification email
    await sendEmailVerification(cred.user);

    // Prepare user doc for Firestore
    const userDoc = {
      email,
      displayName: displayName || "",
      role: "client",
      kycStatus: "incomplete",     // until they  SSN + ID + selfie
      onboardingStep: 1,           // step-by-step flow
      emailVerified: false,
      createdAt: serverTimestamp(),
    };

    // Save to Firestore
    await setDoc(doc(db, "users", cred.user.uid), userDoc, { merge: true });

    return cred;
  }



  // --------------------------------------
  // CONTEXT EXPORT
  // --------------------------------------
  const value = {
    currentUser,
    userProfile,
    loading: loading || profileLoading, // route guards wait for both
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
