"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/firebase"; // Firebase auth instance
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/firebase"; // Firestore database instance
import AuthForm from "@/components/Authform";

export default function Login() {
  const { setUser, setIsLoggedIn } = useAppContext(); // Access AppContext methods
  const router = useRouter();

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user's details from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { firstName, lastName } = userDoc.data();

        // Update the user and login state in AppContext
        setUser({
          uid: user.uid,
          email: user.email,
          firstName,
          lastName,
        });
      } else {
        console.error("No user data found in Firestore.");
      }

      setIsLoggedIn(true);
      router.push("/home");
      console.log("User logged in successfully");
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
}
