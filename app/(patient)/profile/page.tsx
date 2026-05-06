"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import ProfileImage from "@/components/ProfileImage";
import StatCard from "@/components/StatCard";
import BasicStat from "@/components/BasicStat";
import Loader from "@/components/Loader";
import Link from "next/link";
import { a } from "framer-motion/client";
// import Pagination from "@/components/Pagination";
import { useSession } from "next-auth/react";


export default function PatientProfile() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
   const [filter, setFilter] = useState("all");
  //  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
   const { data: session, status } = useSession();

const filteredAppointments = appointments
  .filter(a =>
    a.problem.toLowerCase().includes(search.toLowerCase())
  )
  .filter(a =>
    filter === "all" ? true : a.status === filter
  );

  useEffect(() => {
    // fetchUser();
      if (session?.user) {
      setUser(session.user);
    }
    fetchAppointments();
  }, [session]);

  
 const fetchAppointments = async () => {
  try {
    const res = await axios.get(
      `/api/appointments`
    );

    setAppointments(res.data || []);

  } catch {
    toast.error("Appointments failed");
  }
};

//  const fetchAppointments = async (pageNumber = 1) => {
//   try {
//     const res = await axios.get(
//       `/api/appointments?page=${pageNumber}&limit=10`
//     );

//     setAppointments(res.data.data || []);
//     setTotalPages(res.data.totalPages);
//     setPage(res.data.page);

//   } catch {
//     toast.error("Appointments failed");
//   }
// };

  if (!user) return <Loader />;

  // ✅ PATIENT APPOINTMENTS
  // const myAppointments = appointments.filter(
  //   (a) => a.patientId === user.userId
  // );

  const canStartMeeting = (appointmentDateTime: string) => {
  const now = new Date();
  const appt = new Date(appointmentDateTime);

  const diff = (now.getTime() - appt.getTime()) / 60000;

  return diff >= 0 && diff <= 30;
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
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-blue-100">{user.email}</p>
          <span className="mt-2 inline-block bg-white/20 px-3 py-1 text-sm rounded-full">
            👤 Patient
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="hidden md:flex gap-5 text-center">
        <BasicStat title="Appointments" value={appointments.length} />
        <BasicStat
          title="Confirmed"
          value={appointments.filter(a => a.status === "confirmed").length}
        />
        <BasicStat
          title="Pending"
          value={appointments.filter(a => a.status === "pending").length}
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
            filter === tab
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          {tab}
        </button>
      ))}

          <Link href="/appointments/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              + New Appointment
            </button>
          </Link>
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
              <ProfileImage
                src={a.doctorImage}
                name={a.doctor}
              />

              <div>
                <p className="font-semibold text-gray-800">
                  {a.doctor}
                </p>
                <p className="text-xs text-gray-500">
                  {a.specialization || "Specialist"}
                </p>
              </div>
            </div>

            {/* PROBLEM */}
            <p className="text-gray-700 font-medium">
              🩺 {a.problem}
            </p>

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
                ${a.status === "completed" && "bg-green-100 text-green-600"}
              `}
              >
                {a.status}
              </span>

              <span className="text-xs text-gray-400">
                #{a._id?.slice(-4)}
              </span>

            </div>
              {/* {a.status === "confirmed" &&
                (a.meetingStarted || canStartMeeting(a.appointmentDateTime)) ? (
                  <button
                    onClick={() => window.location.href = `/call/${a._id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    🎥 Join Video Consultation
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    Meeting starts at {a.time}
                  </div>
                )} */}

                {a.callEnded ? (
                  <span className="text-gray-400 text-sm">
                    Consultation completed
                  </span>
                ) : a.meetingStarted ? (
                  <button
                    onClick={() => window.location.href = `/call/${a._id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    🎥 Join Video Consultation
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">
                    Waiting for doctor...
                  </span>
                )}
                <p className="text-xs text-gray-400">
                  Duration: {a.callDuration} min
                </p>

          </div>
          

          
        ))}
        

      </div>
    )}

    {/* <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => fetchAppointments(p)}
      /> */}
  </div>
);
}