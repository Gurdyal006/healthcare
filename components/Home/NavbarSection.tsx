"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage";

export default function NavbarSection() {
  const [user, setUser] = useState<any>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  console.log(session, "session navbar section");
  console.log(status, "status navbar section");

  console.log("Current user in NavbarSection:", user, user?.name, user?.role);

  // if (status === "loading") {
  //   return null;
  // }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50   backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-2xl font-bold">+</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">MediCare+</h1>
              <p className="text-xs text-slate-400">Advanced Healthcare Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="/" className="hover:text-cyan-400 transition">Home</a>
            <a href="/doctors" className="hover:text-cyan-400 transition">Doctors</a>
            <a href="/ai-doctors" className="hover:text-cyan-400 transition">AI Doctors</a>
            <a href="/services" className="hover:text-cyan-400 transition">Services</a>
            <a href="/contact" className="hover:text-cyan-400 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4 text-slate-300">

            {status !== "authenticated" ? (
              <>
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
              </>
            ) : (

              <div className="flex items-center gap-3">

                {/* PROFILE */}
                <Link
                  href={
                    session?.user?.role === "doctor"
                      ? "/doctor-profile"
                      : "/profile"
                  }
                  className="flex items-center gap-3"
                >

                  {/* AVATAR */}
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">

                    {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}

                  </div>

                  {/* USERNAME */}
                  <div className="text-left">

                    <p className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20">
                      {session?.user?.name}
                    </p>

                  </div>
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
