"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { CartContext } from "./_context/CartContext";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CartContext.Provider value={{ cart, setCart }}> {/* If using cart context */}
            <Header />
            {children}
            <Footer />
          </CartContext.Provider>
        </body>
      </html>
      </ClerkProvider>
  );
}
