"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

export default function AdminLayout({ children }: any) {
  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       const res = await axios.get("/api/auth/me");
  //       setUser(res.data.user);
  //     } catch {
  //       // ❌ no redirect here (middleware handles it)
  //       console.log("User not found");
  //     }
  //   };

  //   loadUser();
  // }, []);

  // console.log("logged adminn--", user);

  // if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="flex-1">
        {/* <Navbar user={user} /> ✅ pass user */}
        <Navbar />
        
        <main className="p-4 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}