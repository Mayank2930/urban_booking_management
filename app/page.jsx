"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBookSlot = () => {
    if (session) {
      router.push("/bookings");
    } else {
      router.push("/login"); // ✅ Redirect to login if not authenticated
    }
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <h1 className='text-5xl font-extrabold text-center text-gray-800 mb-6'>
        Urban Booking Management
      </h1>
      <p className='text-xl text-center text-gray-600 mb-10 max-w-2xl'>
        Easily book your slots with top-rated carpenters, review your bookings,
        and manage your schedule seamlessly.
      </p>
      <div className='flex space-x-4'>
        <button
          onClick={handleBookSlot}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300'
        >
          Book a Slot
        </button>

        <Link
          href='/review'
          className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300'
        >
          Review Your Bookings
        </Link>
      </div>
    </main>
  );
}
