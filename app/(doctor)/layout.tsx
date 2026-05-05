"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

export default function DoctorLayout({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");

        if (res.data.user.role !== "doctor") {
          router.push("/profile"); // ❌ block patient
        } else {
          setUser(res.data.user);
        }
      } catch {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  if (!user) return <Loader />;

  return (
    <div className="flex">
      <Sidebar role="doctor" />

      <div className="flex-1">
        {/* <Navbar user={user} /> */}
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}