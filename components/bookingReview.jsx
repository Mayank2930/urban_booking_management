"use client";
import React, { useState } from "react";

const BookingReview = ({ booking }) => {
  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);

  const updateBooking = async (newStatus) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(data.status);
        alert(`✅ Booking ${newStatus} successfully!`);
      } else {
        alert(data.error || "❌ Update failed");
      }
    } catch (error) {
      console.error("❌ Error updating booking:", error);
      alert("Error updating booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2>Review Your Booking</h2>
      <p>
        <strong>Carpenter:</strong> {booking.slot.carpenter.name}
      </p>
      <p>
        <strong>Time:</strong>{" "}
        {new Date(booking.slot.startTime).toLocaleTimeString()} -{" "}
        {new Date(booking.slot.endTime).toLocaleTimeString()}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {status === "pending" && (
        <div className="mt-3">
          <button
            onClick={() => updateBooking("confirmed")}
            disabled={loading}
            className="mr-2 bg-green-500 text-white px-3 py-1 rounded"
          >
            Confirm Booking
          </button>
          <button
            onClick={() => updateBooking("cancelled")}
            disabled={loading}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingReview;
