"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [appointments, setAppointments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loader, setLoader] = useState(true);
  

useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    setLoader(true);

    const [userRes, apptRes] = await Promise.all([
      axios.get("/api/auth/me"),
      axios.get("/api/appointments"),
    ]);

    setUser(userRes.data.user);
    setAppointments(apptRes.data || []);
  } catch {
    toast.error("Failed to load data");
  } finally {
    setLoader(false);
  }
};
console.log("results:", appointments);

  if (!user) return <Loader />;

  // ✅ ONLY PATIENT APPOINTMENTS
  const myAppointments = appointments.filter(
    (a) => a.patientId === user.userId
  );

  console.log("my appoinments----", myAppointments);

  // ✅ FILTER
  const filtered = myAppointments.filter((a) => {
    const matchesSearch = a.problem
      ?.toLowerCase()
      .includes(search.toLowerCase());

      console.log("matchesSearch:", matchesSearch, "for problem:", a.problem, "with search:", search);

    const matchesStatus =
      statusFilter === "All" || a.status === statusFilter.toLowerCase();
      console.log("matchesStatus:", matchesStatus, "for status:", a.status, "with filter:", statusFilter);

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    if (status === "confirmed") return "bg-green-100 text-green-600";
    if (status === "pending") return "bg-yellow-100 text-yellow-600";
    if (status === "cancelled") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  // ✅ CANCEL
  const cancelAppointment = async (id: string) => {
    try {
      await axios.patch(`/api/appointments/${id}`, {
        status: "cancelled",
      });

      toast.success("Appointment cancelled");

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "cancelled" } : a
        )
      );
    } catch {
      toast.error("Cancel failed");
    }
  };

  return (
    <div className="bg-gray-100 p-6 space-y-6">

      {/* 👤 PROFILE CARD */}
      <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
        <img
          src={`https://i.pravatar.cc/100?u=${user.email}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            My Appointments
          </h1>
          <p className="text-sm text-gray-500">
            Manage your bookings
          </p>
        </div>

      <Link href="/appointments/create">
       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
         + New Appointment
       </button>
     </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow border flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="Search problem..."
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded-lg w-full md:w-1/4"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>confirmed</option>
          <option>pending</option>
          <option>cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-4">Problem</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{item.problem}</td>
                <td>{item.doctor}</td>
                <td>{item.date} • {item.time}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-right pr-4 space-x-2">

                  {item.status !== "cancelled" && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
