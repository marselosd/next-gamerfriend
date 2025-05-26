"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, logout } from "@/redux/slices/authSlice";

export function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
