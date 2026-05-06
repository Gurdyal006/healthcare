"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import ProfileImage from "@/components/ProfileImage";
import { useSession } from "next-auth/react";

import Loader from "@/components/Loader";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get("/api/auth/me");
  //     setUser(res.data.user);
  //     setForm(res.data.user);
  //   } catch {
  //     toast.error("Failed to load user");
  //   }
  // };

  useEffect(() => {
    // fetchUser();
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleUpdate = async () => {
    try {
      //await axios.patch("/api/user/update", form);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (!user) return <Loader />;

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-6">
      {/* 🔷 HEADER */}
      <div className="bg-gradient-to-r from-gray-800 to-black text-white p-6 rounded-2xl shadow flex items-center gap-6">
        <ProfileImage
          src={user?.profileImage}
          name={user?.name}
          className="w-20 h-20 border-4 border-white"
        />

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-300">{user.email}</p>

          <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-sm">
            🛠️ Admin
          </span>
        </div>
      </div>

      {/* ✏️ EDIT PROFILE */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>

        {/* Name */}
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Email"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Profile Image */}
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Profile Image URL"
          value={form.profileImage || ""}
          onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
        />

        {/* Save */}
        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
