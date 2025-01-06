"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [displayjobs, setdisplayjobs] = useState();
  const [displayerror, setdisplayerror] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Set the persistence to 'local' to ensure the session persists across reloads
    const setupAuthPersistence = async () => {
      await setPersistence(auth, browserLocalPersistence);
    };

    // Listen for auth state changes
    const checkUserAuthState = () => {
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // If the user is logged in, fetch additional data (e.g., from Firestore)
          const userDocRef = doc(db, "users", firebaseUser.uid);
          getDoc(userDocRef).then((userDoc) => {
            if (userDoc.exists()) {
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                firstName: userDoc.data().firstName,
                lastName: userDoc.data().lastName,
              });
              setIsLoggedIn(true);
            }
          });
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      });
    };

    setupAuthPersistence();
    checkUserAuthState();
  }, []);

  return (
    <AppContext.Provider
      value={{
        displayjobs,
        setdisplayjobs,
        loading,
        setLoading,
        displayerror,
        setdisplayerror,
        selectedJob,
        setSelectedJob,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
