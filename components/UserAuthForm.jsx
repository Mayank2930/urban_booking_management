"use client";
import { useState, useEffect } from "react";

export default function UserAuthForm({ onUserIdentified }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      onUserIdentified(storedEmail);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("userEmail", email); 
      onUserIdentified(email);
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl font-bold">Identify Yourself</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
