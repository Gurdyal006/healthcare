"use client";

import Link from "next/link";
import { useState } from "react";

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");

  const appointments = [
    {
      patient: "John Doe",
      doctor: "Dr. Sharma",
      date: "10 May",
      status: "Confirmed",
    },
    {
      patient: "Aman Singh",
      doctor: "Dr. Mehta",
      date: "11 May",
      status: "Pending",
    },
  ];

  const filtered = appointments.filter((a) =>
    a.patient.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    if (status === "Confirmed") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Appointments
          </h1>
          <p className="text-sm text-gray-500">
            Manage all appointments
          </p>
        </div>

     {/* <Link href="/appointments/create">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        + New Appointment
      </button>
    </Link> */}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="Search patient..."
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="border px-3 py-2 rounded-lg w-full md:w-1/4">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-4">Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {filtered.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium">{item.patient}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>

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
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                  <button className="text-red-600 hover:underline text-sm">
                    Cancel
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}