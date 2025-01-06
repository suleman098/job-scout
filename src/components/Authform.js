"use client";

import { useState } from "react";

function AuthForm({ mode, onSubmit }) {
  const isSignup = mode === "signup";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Ensure this triggers the parent handler
  };

  return (
    <div className="w-96 border-2 border-gray-300 shadow-lg rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        {isSignup ? "Signup" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-bordered input-accent w-full bg-white text-black"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-bordered input-accent w-full bg-white text-black"
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered input-accent w-full bg-white text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input input-bordered input-accent w-full bg-white text-black"
        />
        <button type="submit" className="btn btn-active btn-primary w-full">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-black">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </a>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Signup
            </a>
          </>
        )}
      </p>
    </div>
  );
}

export default AuthForm;
