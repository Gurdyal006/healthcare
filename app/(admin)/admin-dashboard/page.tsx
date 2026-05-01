"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import StatCard from "@/components/StatCard";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments");
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // 📅 Today
  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter(
    (a) => a.date === today
  );

  const pendingCount = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  const doctorsCount = [
    ...new Set(appointments.map((a) => a.doctor)),
  ].length;

  const patientsCount = [
    ...new Set(appointments.map((a) => a.patientName)),
  ].length;

  // 🔍 FILTER
  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || a.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // 🎨 STATUS COLOR
  const getStatusColor = (status: string) => {
    if (status === "confirmed") return "bg-green-100 text-green-600";
    if (status === "cancelled") return "bg-red-100 text-red-600";
    if (status === "pending") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-600";
  };

  // ❌ CANCEL
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/appointments/${id}`, { status });

      toast.success(`Updated to ${status}`);

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading admin dashboard...</p>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard 👨‍💼</h1>
        <p className="text-gray-500 text-sm">
          Full system overview
        </p>
      </div>

      {/* 📊 STATS */}
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <StatCard title="Appointments" value={appointments.length} />
        <StatCard title="Today" value={todayAppointments.length} />
        <StatCard title="Pending" value={pendingCount} />
        <StatCard title="Doctors" value={doctorsCount} />
        <StatCard title="Patients" value={patientsCount} />

      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

  <StatCard title="Appointments" value={appointments.length} />

  <StatCard title="Today" value={todayAppointments.length} />

  <StatCard
    title="Pending"
    value={appointments.filter(a => a.status === "pending").length}
  />

  <StatCard
    title="Doctors"
    value={[...new Set(appointments.map(a => a.doctor))].length}
  />

  <StatCard
    title="Patients"
    value={[...new Set(appointments.map(a => a.patientName))].length}
  />

</div>

      {/* 🔍 FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3 flex-wrap">

        <input
          type="text"
          placeholder="Search doctor or patient..."
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>pending</option>
          <option>confirmed</option>
          <option>cancelled</option>
        </select>

      </div>

      {/* 📋 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Patient</th>
              <th>Doctor</th>
              <th>Problem</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => (
              <tr key={a._id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{a.patientName}</td>
                <td>{a.doctor}</td>
                <td>{a.problem}</td>
                <td>{a.date} • {a.time}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(a.status)}`}>
                    {a.status}
                  </span>
                </td>

                <td className="text-right pr-4 space-x-2">

                  {a.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(a._id, "confirmed")}
                        className="text-green-600 text-sm"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => updateStatus(a._id, "cancelled")}
                        className="text-red-600 text-sm"
                      >
                        Cancel
                      </button>
                    </>
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

// 📦 SMALL COMPONENT
// function StatCard({ title, value }: any) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow border">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>
//     </div>
//   );
// }