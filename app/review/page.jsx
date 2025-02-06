"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/bookings?userId=${session.user.id}`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status }),
      });

      if (res.ok) {
        fetchBookings();
        alert(`Booking ${status} successfully!`);
      } else {
        alert("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("An error occurred while updating the booking.");
    }
  };

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (!session) return <p>Please log in to view your bookings.</p>;

  return (
    <div className='p-4 min-h-screen bg-black text-white'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Review Your Bookings
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className='border p-4 my-4 rounded shadow'>
              <p>
                <strong>Carpenter:</strong> {booking.slot.carpenter.name}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(booking.slot.startTime).toLocaleTimeString()} -{" "}
                {new Date(booking.slot.endTime).toLocaleTimeString()}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>

              {booking.status === "pending" && (
                <div className='mt-3 flex space-x-2'>
                  <button
                    onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className='flex justify-center mt-6'>
        <button
          onClick={() => router.push("/bookings")}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300'
        >
          Back to Bookings
        </button>
      </div>
    </div>
  );
}
