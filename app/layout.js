"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css"; 

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Urban Booking Management</title> 
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider> 
      </body>
    </html>
  );
}
