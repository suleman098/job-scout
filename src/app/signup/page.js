"use client";
import AuthForm from "@/components/Authform";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Updated import from next/navigation
import { useEffect, useState } from "react";

export default function Signup() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure the component is rendered on the client side
  }, []);

  const handleSignup = async (formData) => {
    const { email, password } = formData;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      // Redirect to login page after successful signup
      router.push("/login");
    } catch (err) {
      console.error("Error during signup:", err.message);
    }
  };

  // Render nothing until the component is mounted on the client side
  if (!isClient) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </div>
  );
}
