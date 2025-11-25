"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../Firebase/firebase.config";

export default function PrivateRoute({ children }) {
  const router = useRouter();

  useEffect(()=>{
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login"); 
      }
    });
    return () => unsubcribe();
  }, [router]);

  return <>{children}</>; 
}
