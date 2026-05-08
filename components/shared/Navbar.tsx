"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHeartbeat } from "react-icons/fa";



export default function Navbar() {
    const router = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FaHeartbeat className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">
              MediCare+
            </h1>
            <p className="text-xs text-slate-500">
              Advanced Healthcare Platform
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/doctors" className="hover:text-blue-600 transition">
            Doctors
          </Link>

          <Link href="/services" className="hover:text-blue-600 transition">
            Services
          </Link>

          <Link href="/ai-doctors" className="hover:text-blue-600 transition">
            AI Doctors
          </Link>

          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="hidden md:block px-5 py-2 rounded-xl border border-slate-300 hover:border-blue-500 hover:text-blue-600 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}