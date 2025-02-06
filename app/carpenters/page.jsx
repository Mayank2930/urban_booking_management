"use client";
import { useState } from "react";

export default function AddCarpenterPage() {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    rating: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/carpenters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data = {};
      try {
        data = await res.json(); // ✅ Parse JSON if possible
      } catch (jsonError) {
        console.warn("No JSON response received:", jsonError); // Handle empty responses
      }

      if (res.ok) {
        setMessage("✅ Carpenter added successfully!");
        setFormData({ name: "", experience: "", rating: "" });
      } else {
        setMessage(`❌ Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ An unexpected error occurred.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Carpenter</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Rating (0-5):</label>
          <input
            type="number"
            step="0.1"
            max="5"
            min="0"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Carpenter
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
