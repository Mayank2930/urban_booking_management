"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SlotList from "../../components/slotList";

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please log in to view this page.</p>;

  return (
    <main className='relative p-4 min-h-screen bg-black text-white'>
      <button
        onClick={() => router.push("/review")}
        className='absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300'
      >
        Go to Review Page
      </button>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className='absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition duration-300'
      >
        Logout
      </button>

      <h1 className='text-2xl font-bold mb-4 text-center'>Book a Slot</h1>
      <p className='text-center mb-6'>Welcome, {session.user.name}</p>

      <SlotList userId={session.user.id} />
    </main>
  );
}
