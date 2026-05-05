"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import ProfileImage from "@/components/ProfileImage";
import StatCard from "@/components/StatCard";
import BasicStat from "@/components/BasicStat";
import Modal from "@/components/Modals";
import { useSession } from "next-auth/react";

export default function PatientProfile() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const filteredAppointments = appointments
    .filter((a) => a.problem.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => (filter === "all" ? true : a.status === filter));

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments");
      setAppointments(res.data || []);
    } catch {
      toast.error("Appointments failed");
    }
  };

  useEffect(() => {
    // fetchUser();
    if (session?.user) {
      setUser(session.user);
    }
    fetchAppointments();
  }, [session]);

  // const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Not logged in</p>;

  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get("/api/auth/me");
  //     setUser(res.data.user);
  //   } catch {
  //     toast.error("User load failed");
  //   }
  // };

  // if (!user) return <p className="p-6">Loading...</p>;

  // ✅ PATIENT APPOINTMENTS
  // const myAppointments = appointments.filter(
  //   (a) => a.patientId === user.userId
  // );

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files) {
      // file input
      setUser({
        ...user,
        [name]: files[0],
      });
    } else {
      // text input
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("name", user.name);
    // formData.append("email", user.email);""

    if (user.profilePic) {
      formData.append("profilePic", user.profilePic);
    }

    await fetch("/api/update", {
      method: "PUT",
      body: formData,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-6">
      {/* 🔷 HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ProfileImage
            src={user?.profileImage}
            name={user?.name}
            className="w-20 h-20 border-4 border-white"
          />

          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-blue-100">{user?.email}</p>
            <span className="mt-2 inline-block bg-white/20 px-3 py-1 text-sm rounded-full">
              👤 Patient
            </span>
            <span
              onClick={() => setIsOpen(true)}
              className="mt-2 ml-2 inline-block bg-white/20 px-3 py-1 text-sm rounded-full cursor-pointer hover:bg-white/30"
            >
              Edit
            </span>
            {isOpen && (
              <Modal onClose={() => setIsOpen(false)} title="Edit Patient">
                <div className="flex flex-col gap-3">
                  {/* Upload */}
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name="profilePic"
                  />

                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user?.name || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />

                  <button
                    onClick={updateUser}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="hidden md:flex gap-5 text-center">
          <BasicStat title="Appointments" value={appointments.length} />
          <BasicStat
            title="Confirmed"
            value={appointments.filter((a) => a.status === "confirmed").length}
          />
          <BasicStat
            title="Pending"
            value={appointments.filter((a) => a.status === "pending").length}
          />
          <BasicStat
            title="Cancelled"
            value={appointments.filter((a) => a.status === "cancelled").length}
          />
        </div>
      </div>

      {/* 🔍 SEARCH + ACTION */}
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <input
          type="text"
          placeholder="Search appointments..."
          className="border px-4 py-2 rounded-lg w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧭 FILTER TABS */}
      <div className="flex gap-2">
        {["all", "pending", "confirmed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 rounded-full text-sm ${
              filter === tab ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 📅 LIST */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center shadow text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredAppointments.map((a) => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition space-y-3"
            >
              {/* DOCTOR */}
              <div className="flex items-center gap-3">
                <ProfileImage src={a.doctorImage} name={a.doctor} />

                <div>
                  <p className="font-semibold text-gray-800">{a.doctor}</p>
                  <p className="text-xs text-gray-500">
                    {a.specialization || "Specialist"}
                  </p>
                </div>
              </div>

              {/* PROBLEM */}
              <p className="text-gray-700 font-medium">🩺 {a.problem}</p>

              {/* TIME */}
              <p className="text-xs text-gray-400">
                📅 {a.date} • ⏰ {a.time}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                ${a.status === "confirmed" && "bg-green-100 text-green-600"}
                ${a.status === "cancelled" && "bg-red-100 text-red-600"}
                ${a.status === "rescheduled" && "bg-blue-100 text-blue-600"}
                ${a.status === "pending" && "bg-yellow-100 text-yellow-600"}
              `}
                >
                  {a.status}
                </span>

                <span className="text-xs text-gray-400">
                  #{a._id?.slice(-4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
