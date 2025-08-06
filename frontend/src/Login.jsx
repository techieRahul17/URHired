// src/pages/Login.jsx
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form className="w-full max-w-sm bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
