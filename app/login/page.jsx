"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/bookings"); 
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto border rounded shadow mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className='border p-2 w-full'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          className='border p-2 w-full'
          required
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded w-full'
        >
          Login
        </button>
      </form>

      {error && <p className='text-red-500 mt-2'>{error}</p>}

      {/* ✅ Add Sign-Up Link Below the Form */}
      <p className='text-sm text-center mt-4'>
        Don't have an account?{" "}
        <Link href='/signup' className='text-blue-500 hover:underline'>
          Sign up here
        </Link>
      </p>
    </div>
  );
}
