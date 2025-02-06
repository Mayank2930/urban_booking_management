"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SlotList = () => {
  const { data: session, status } = useSession();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const res = await fetch("/api/slots");
      const data = await res.json();
      setSlots(data);
    } catch (error) {
      console.error("❌ Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots(); 

    const intervalId = setInterval(() => {
      fetchSlots();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleBook = async (slotId) => {
    if (!session || !session.user) {
      alert("Please log in to book a slot.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          slotId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Booking created successfully!");
        fetchSlots(); 
      } else {
        alert(`Booking failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("An unexpected error occurred while booking.");
    }
  };

  if (status === "loading" || loading) return <p>Loading slots...</p>;
  if (!session) return <p>Please log in to view available slots.</p>;

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Available Slots</h2>
      {slots.length === 0 ? (
        <p>No slots available</p>
      ) : (
        <ul>
          {slots.map((slot) => (
            <li key={slot.id} className='border p-4 my-4 rounded shadow'>
              <p>
                <strong>Carpenter:</strong> {slot.carpenter.name}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                {new Date(slot.endTime).toLocaleTimeString()}
              </p>
              <button
                onClick={() => handleBook(slot.id)}
                className='bg-green-500 text-white px-4 py-2 rounded'
              >
                Book Slot
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SlotList;
