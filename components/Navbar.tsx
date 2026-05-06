"use client";

import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

  useEffect(() => {
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const res = await axios.get("/api/auth/me");
    setUser(res.data.user);
  } catch {
    toast.error("User not found");
  }
};

console.log("Current user:", user);

const handleLogout = async () => {
  try {
    await axios.post("/api/auth/logout");

    toast.success("Logged out successfully");

    setOpen(false); // 👈 close dropdown

    router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};
const roleStyles: any = {
  admin: "bg-purple-100 text-purple-600",
  doctor: "bg-blue-100 text-blue-600",
  patient: "bg-green-100 text-green-600",
};

const roleMap: any = {
  admin: "Admin",
  doctor: "Doctor",
  patient: "Patient",
};

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow-sm border-b">

      {/* Left */}
      <h1 className="font-semibold text-lg text-gray-800">
        Appointment Management System
      </h1>

      {/* Right */}
      <div className="relative">

        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
            {/* {user?.role == "admin" ? "A" : "D"} */}
            {user?.name?.charAt(0)?.toUpperCase() || "U" }
          </div>
          <span className="text-sm text-gray-700 hidden sm:block">
            {user?.name || "Unknown"}
          </span>
          {/* <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              roleStyles[user?.role]
            }`}
          >
            {roleMap[user?.role]}
          </span> */}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg py-2 z-50">

            {/* Profile */}
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Profile
            </button>

            {/* Divider */}
            <div className="border-t my-1" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              {/* Logout Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V7"
                />
              </svg>

              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}