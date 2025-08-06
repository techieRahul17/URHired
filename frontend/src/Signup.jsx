// src/pages/Signup.jsx
import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form className="w-full max-w-sm bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded-md"
        />
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
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
