"use client";

import axios from "@/lib/axios"; // ✅ use your instance
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/appointments");
        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const today = new Date().toLocaleDateString("en-CA");

  const todayAppointments = appointments.filter((a) => a?.date === today);

  const recentAppointments = [...appointments].slice(0, 5);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your healthcare system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Appointments" value={appointments.length} />
        <StatCard title="Today" value={todayAppointments.length} />
        <StatCard
          title="Pending"
          value={appointments.filter((a) => a.status === "pending").length}
        />
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow border overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
          </div>

          {recentAppointments.length === 0 ? (
            <p className="p-5 text-gray-500">No data found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {/* HEADER */}
                <thead className="bg-gray-50 text-gray-600 sticky top-0">
                  <tr>
                    <th className="p-4 text-left">Patient</th>
                    <th className="text-left">Doctor</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody className="divide-y">
                  {recentAppointments.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      {/* PATIENT */}
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={`https://i.pravatar.cc/40?u=${a.patientName}`}
                          className="w-9 h-9 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {a.patientName || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400">{a.problem}</p>
                        </div>
                      </td>

                      {/* DOCTOR */}
                      <td className="text-gray-700">{a.doctor}</td>

                      {/* DATE */}
                      <td>
                        <p className="text-gray-700">{a.date}</p>
                        <p className="text-xs text-gray-400">{a.time}</p>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            a.status === "confirmed"
                              ? "bg-green-100 text-green-600"
                              : a.status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Today */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="text-lg font-semibold mb-4">Today’s Appointments</h3>

          {todayAppointments.length === 0 ? (
            <p className="text-gray-500 text-sm">No appointments today</p>
          ) : (
            <div className="space-y-3">
              {todayAppointments.map((a, i) => (
                <div
                  key={i}
                  className="border p-3 rounded-lg flex justify-between"
                >
                  <div>
                    <p className="font-medium">{a?.patientName}</p>
                    <p className="text-sm text-gray-500">{a?.problem}</p>
                    <p className="text-xs text-gray-400">{a?.time}</p>
                  </div>

                  <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-600">
                    {a?.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
