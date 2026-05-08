"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import ProfileImage from "@/components/ProfileImage";
import StatCard from "@/components/StatCard";
import BasicStat from "@/components/BasicStat";
import Loader from "@/components/Loader";
import Link from "next/link";
// import Pagination from "@/components/Pagination";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";


export default function PatientProfile() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
   const [filter, setFilter] = useState("all");
  //  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
   const { data: session, status } = useSession();

console.log(session, "8888888888888888888888888888888888");


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
  console.log("Fetching appointments..12122121212121.");
  try {
    const res = await axiosInstance.get(
      `/api/appointments`
    );
    console.log(res.data, "appointments response7777777777777");

    setAppointments(res.data || []);

    // const res = await axiosInstance.get(
    //   `/api/appointments`
    // );

    // console.log(res.data, "appointments response7777777777777"); 

    // setAppointments(res.data || []);

  } catch {
    toast.error("Appointments failed");
  }
};

console.log(appointments, "appointments in profile page88888888888888888");

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

// return (
//   <div className="bg-gray-100 min-h-screen p-6 space-y-6">

//     {/* 🔷 HEADER */}
//     <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow flex justify-between items-center">

//       <div className="flex items-center gap-4">
//         <ProfileImage
//           src={user?.profileImage}
//           name={user?.name}
//           className="w-20 h-20 border-4 border-white"
//         />

//         <div>
//           <h2 className="text-2xl font-bold">{user.name}</h2>
//           <p className="text-blue-100">{user.email}</p>
//           <span className="mt-2 inline-block bg-white/20 px-3 py-1 text-sm rounded-full">
//             👤 Patient
//           </span>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="hidden md:flex gap-5 text-center">
//         <BasicStat title="Appointments" value={appointments.length} />
//         <BasicStat
//           title="Confirmed"
//           value={appointments.filter(a => a.status === "confirmed").length}
//         />
//         {/* <BasicStat title="Confirmed" 
//         value={appointments.filter(a => a.status === "confirmed").length} 
//         color="green" icon="✅" /> */}
//         <BasicStat
//           title="Pending"
//           value={appointments.filter(a => a.status === "pending").length}
//         />
//          <BasicStat
//           title="Completed"
//           value={appointments.filter(a => a.status === "completed").length}
//         />
//       </div>
//     </div>

//     {/* 🔍 SEARCH + ACTION */}
//     <div className="flex flex-col md:flex-row gap-3 justify-between">

//       <input
//         type="text"
//         placeholder="Search appointments..."
//         className="border px-4 py-2 rounded-lg w-full md:w-1/3"
//         onChange={(e) => setSearch(e.target.value)}
//       />
      
//     </div>

//     {/* 🧭 FILTER TABS */}
//     <div className="flex items-center justify-between mb-4">

//   {/* LEFT → FILTERS */}
//   <div className="flex gap-2">
//     {["all", "pending", "confirmed"].map((tab) => (
//       <button
//         key={tab}
//         onClick={() => setFilter(tab)}
//         className={`px-4 py-1 rounded-full text-sm transition
//           ${
//             filter === tab
//               ? "bg-blue-600 text-white shadow"
//               : "bg-white border hover:bg-gray-100"
//           }
//         `}
//       >
//        {tab.charAt(0).toUpperCase() + tab.slice(1)}
//       </button>
//     ))}
//   </div>

//   {/* RIGHT → BUTTON */}
//   <Link href="/appointments/create">
//     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
//       + New Appointment
//     </button>
//   </Link>

// </div>
//     {/* <div className="flex gap-2">
//       {["all", "pending", "confirmed"].map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setFilter(tab)}
//           className={`px-4 py-1 rounded-full text-sm ${
//             filter === tab
//               ? "bg-blue-600 text-white"
//               : "bg-white border"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}

//           <Link href="/appointments/create">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               + New Appointment
//             </button>
//           </Link>
//     </div>

//     {/* 📅 LIST */}
//     {filteredAppointments.length === 0 ? (
//       <div className="bg-white p-8 rounded-xl text-center shadow text-gray-500">
//         No appointments found
//       </div>
//     ) : (
//       <div className="grid md:grid-cols-2 gap-4">

//         {filteredAppointments.map((a) => (
//           <div
//             key={a._id}
//             className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition space-y-3"
//           >

//             {/* DOCTOR */}
//             <div className="flex items-center gap-3">
//               <ProfileImage
//                 src={a.doctorImage}
//                 name={a.doctor}
//               />

//               <div>
//                 <p className="font-semibold text-gray-800">
//                   {a.doctor}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {a.specialization || "Specialist"}
//                 </p>
//               </div>
//             </div>

//             {/* PROBLEM */}
//             <p className="text-gray-700 font-medium">
//               🩺 {a.problem}
//             </p>

//             {/* TIME */}
//             <p className="text-xs text-gray-400">
//               📅 {a.date} • ⏰ {a.time}
//             </p>

//             {/* FOOTER */}
//             <div className="flex justify-between items-center">

//               <span
//                 className={`px-3 py-1 text-xs rounded-full font-medium
//                 ${a.status === "confirmed" && "bg-green-100 text-green-600"}
//                 ${a.status === "cancelled" && "bg-red-100 text-red-600"}
//                 ${a.status === "rescheduled" && "bg-blue-100 text-blue-600"}
//                 ${a.status === "pending" && "bg-yellow-100 text-yellow-600"}
//                 ${a.status === "completed" && "bg-green-100 text-green-600"}
//               `}
//               >
//                 {a.status}
//               </span>

//               <span className="text-xs text-gray-400">
//                 #{a._id?.slice(-4)}
//               </span>

//             </div>
//               {/* {a.status === "confirmed" &&
//                 (a.meetingStarted || canStartMeeting(a.appointmentDateTime)) ? (
//                   <button
//                     onClick={() => window.location.href = `/call/${a._id}`}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     🎥 Join Video Consultation
//                   </button>
//                 ) : (
//                   <div className="flex items-center gap-2 text-gray-500 text-sm">
//                     <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//                     Meeting starts at {a.time}
//                   </div>
//                 )} */}

//                 {a.callEnded ? (
//                   <span className="text-gray-400 text-sm">
//                     Consultation completed
//                   </span>
//                 ) : a.meetingStarted ? (
//                   <button
//                     onClick={() => window.location.href = `/call/${a._id}`}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     🎥 Join Video Consultation
//                   </button>
//                 ) : (
//                   <span className="text-sm text-gray-500">
//                     Waiting for doctor...
//                   </span>
//                 )}
//                 <p className="text-xs text-gray-400">
//                   Duration: {a.callDuration} min
//                 </p>

//           </div>
          

          
//         ))}
        

//       </div>
//     )}

//     {/* <Pagination
//         page={page}
//         totalPages={totalPages}
//         onPageChange={(p) => fetchAppointments(p)}
//       /> */}
//   </div>
// );
return (
  <div className="min-h-screen bg-[#f5f9ff] p-20 mt-10">

    {/* HERO HEADER */}
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-8 lg:p-10 text-white shadow-xl">

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">

        {/* LEFT */}
        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="relative">
            <img
              src={
                user?.image ||
                user?.profileImage ||
                "https://randomuser.me/api/portraits/lego/5.jpg"
              }
              alt="patient"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
            />

            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
          </div>

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl mb-5">
               Our Dashboard
            </div>

            <h1 className="text-4xl lg:text-5xl font-black">
              {user?.name}
            </h1>

            <p className="text-cyan-100 text-lg mt-3">
              {user?.email}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">

              <span className="px-4 py-2 rounded-full bg-white/20 text-sm">
                👤 Patient
              </span>

              <span className="px-4 py-2 rounded-full bg-white/20 text-sm">
                🩺 Healthcare Member
              </span>

            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 min-w-[130px]">
            <h3 className="text-3xl font-black">
              {appointments.length}
            </h3>

            <p className="text-blue-100 mt-2 text-sm">
              Appointments
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 min-w-[130px]">
            <h3 className="text-3xl font-black">
              {
                appointments.filter(
                  (a) => a.status === "confirmed"
                ).length
              }
            </h3>

            <p className="text-blue-100 mt-2 text-sm">
              Confirmed
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 min-w-[130px]">
            <h3 className="text-3xl font-black">
              {
                appointments.filter(
                  (a) => a.status === "pending"
                ).length
              }
            </h3>

            <p className="text-blue-100 mt-2 text-sm">
              Pending
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 min-w-[130px]">
            <h3 className="text-3xl font-black">
              {
                appointments.filter(
                  (a) => a.status === "completed"
                ).length
              }
            </h3>

            <p className="text-blue-100 mt-2 text-sm">
              Completed
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* SEARCH + FILTER */}
    <div className="mt-10 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">

      {/* SEARCH */}
      <div className="relative w-full lg:w-[400px]">

        <input
          type="text"
          placeholder="Search appointments..."
          className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-3">

        {["all", "pending", "confirmed", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
              
              ${
                filter === tab
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400"
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}

        <Link href="/appointments/create">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300">
            + New Appointment
          </button>
        </Link>

      </div>
    </div>

    {/* APPOINTMENTS */}
    <div className="mt-10">

      {filteredAppointments.length === 0 ? (

        <div className="bg-white rounded-[32px] p-16 text-center shadow-sm border border-slate-200">

          <h3 className="text-3xl font-bold text-slate-700">
            No Appointments Found
          </h3>

          <p className="text-slate-500 mt-3">
            Try adjusting your search or filters.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {filteredAppointments.map((a) => (

            <div
              key={a._id}
              className="bg-white rounded-[32px] border border-slate-200 p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div className="flex items-center gap-5">

                  <img
                    src={
                      a.doctorImage ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt={a.doctor}
                    className="w-20 h-20 rounded-3xl object-cover border border-slate-200"
                  />

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {a.doctor}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      {a.specialization || "Specialist"}
                    </p>

                  </div>
                </div>

                {/* STATUS */}
                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold w-fit

                    ${
                      a.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : ""
                    }

                    ${
                      a.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""
                    }

                    ${
                      a.status === "completed"
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }

                    ${
                      a.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : ""
                    }
                  `}
                >
                  {a.status}
                </span>
              </div>

              {/* PROBLEM */}
              <div className="mt-7 bg-slate-50 rounded-3xl p-5 border border-slate-100">

                <p className="text-sm font-medium text-slate-500">
                  Health Problem
                </p>

                <p className="text-lg font-semibold text-slate-800 mt-3">
                  🩺 {a.problem}
                </p>
              </div>

              {/* INFO */}
              <div className="flex flex-wrap gap-5 mt-7 text-slate-500">

                <div className="flex items-center gap-2">
                  📅
                  <span>{a.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  ⏰
                  <span>{a.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  🆔
                  <span>#{a._id?.slice(-4)}</span>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-8">

                <p className="text-sm text-slate-400">
                  Duration: {a.callDuration || 0} min
                </p>

                {a.callEnded ? (
                  <span className="text-slate-400 text-sm font-medium">
                    Consultation completed
                  </span>
                ) : a.meetingStarted ? (
                  <button
                    onClick={() =>
                      (window.location.href = `/call/${a._id}`)
                    }
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎥 Join Consultation
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-amber-500 text-sm font-medium">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    Waiting for doctor...
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}