"use client";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useAppContext } from "@/context/AppContext";

function Navbar() {
  const { user, isLoggedIn, setIsLoggedIn, setUser } = useAppContext();
  const router = useRouter();

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      setIsLoggedIn(false); // Update state
      setUser(null); // Clear user details
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="w-1/2 mx-auto border-2 rounded-lg py-4 mt-3 bg-white text-black flex items-center px-4">
      {/* Title or Logo */}
      <div className="text-lg font-bold">Navbar</div>

      {/* Right-aligned buttons */}
      <div className="ml-auto flex items-center space-x-4">
        {/* Welcome Message */}
        {isLoggedIn && user && (
          <span className="text-black font-medium">Hi, {user.firstName}!</span>
        )}

        {/* Home Button */}
        <button
          onClick={() => router.push("/home")}
          className="flex items-center text-blue-600"
        >
          <FaHome className="mr-2" size={24} />
          Home
        </button>

        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600"
          >
            <FaSignOutAlt className="mr-2" size={24} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="flex items-center text-green-600"
          >
            <FaSignInAlt className="mr-2" size={24} />
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
