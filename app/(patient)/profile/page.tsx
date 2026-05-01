"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function PatientProfile() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    fetchUser();
    fetchAppointments();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch {
      toast.error("User load failed");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments");
      setAppointments(res.data || []);
    } catch {
      toast.error("Appointments failed");
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  // ✅ PATIENT APPOINTMENTS
  const myAppointments = appointments.filter(
    (a) => a.patientId === user.userId
  );

  return (
    <div className="space-y-6">

      {/* 👤 PROFILE CARD */}
      <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-6">

        <img
          src={`https://i.pravatar.cc/100?u=${user.email}`}
          className="w-24 h-24 rounded-full border"
        />

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>

          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>👤 Patient</span>
          </div>
        </div>
      </div>

      {/* 📅 APPOINTMENTS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          My Appointments
        </h2>

        {myAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments</p>
        ) : (
          <div className="space-y-4">

            {myAppointments.map((a) => (
              <div
                key={a._id}
                className="bg-white p-5 rounded-xl shadow flex justify-between hover:shadow-md transition"
              >

                {/* LEFT */}
                <div>
                  <p className="font-semibold text-gray-800">
                    🩺 {a.problem}
                  </p>

                  <p className="text-sm text-gray-600">
                    Doctor: {a.doctor}
                  </p>

                  <p className="text-xs text-gray-400">
                    📅 {a.date} • ⏰ {a.time}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-2">

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

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import axios from "@/lib/axios";
// import toast from "react-hot-toast";

// export default function ProfilePage() {
//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [rescheduleData, setRescheduleData] = useState<any>(null);
//   const [newDate, setNewDate] = useState("");
//   const [newTime, setNewTime] = useState("");
//   const [user, setUser] = useState<any>(null);

//   const doctorName = user?.name;

// useEffect(() => {
//   fetchUser();
//   fetchData();
// }, []);

// const fetchUser = async () => {
//   try {
//     const res = await axios.get("/api/auth/me");
//     setUser(res.data.user);
//   } catch {
//     toast.error("User not found");
//   }
// };

// console.log("Current user:", user);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("/api/appointments");
//       console.log("Fetched appointments:", res.data);
//       setAppointments(res.data || []);
//     } catch {
//       toast.error("Failed to load appointments");
//     }
//   };

// // const myAppointments = appointments.filter(
// //   (a) => a.doctor?.trim().toLowerCase() === user?.name?.trim().toLowerCase()
// // );

// if (!user) {
//   return <p className="p-6">Loading user...</p>;
// }

// console.log("appoinment--", appointments);
// // ✅ NOW SAFE (user exists)
// const myAppointments = appointments.filter(
//   (a) => a.doctorId === user.userId
// );
// // const myAppointments =
// //   user.role === "doctor"
// //     ? appointments.filter((a) => a.doctorId === user.userId)
// //     : appointments.filter((a) => a.patientId === user.userId);

// appointments.forEach((a) => {
//   console.log("DB:", a.doctor, "USER:", user.name);
// });
//   // ✅ Update Status
//  const updateStatus = async (id: string, status: string) => {
//   try {
//     await axios.patch(`/api/appointments/${id}`, { status });

//     toast.success(`Appointment ${status}`);

//     setAppointments((prev) =>
//       prev.map((a) =>
//         a._id === id ? { ...a, status } : a
//       )
//     );
//   } catch {
//     toast.error("Update failed");
//   }
// };

//   // ✅ Open Reschedule
//   const openReschedule = (appointment: any) => {
//     setRescheduleData(appointment);
//   };

//   // ✅ Save Reschedule
//   const handleReschedule = async () => {
//     if (!newDate || !newTime) {
//       toast.error("Select date & time");
//       return;
//     }

//     try {
//       await axios.patch(`/api/appointments/${rescheduleData._id}`, {
//         date: newDate,
//         time: newTime,
//         status: "rescheduled",
//       });

//       toast.success("Rescheduled successfully");

//       fetchData();
//       setRescheduleData(null);
//     } catch {
//       toast.error("Failed to reschedule");
//     }
//   };

//   return (
//     <div className="space-y-6">

//       <h1 className="text-2xl font-bold">My Appointments</h1>

//       {myAppointments.length === 0 ? (
//         <p>No appointments</p>
//       ) : (
//   <div className="space-y-4">
//   {myAppointments.map((a) => (
//     <div
//       key={a._id}
//       className="p-4 border rounded-xl flex justify-between hover:shadow-md transition"
//     >
//       {/* LEFT */}
//       <div>
//         <p className="font-semibold text-gray-800">
//           👤 {a.patientName}
//         </p>

//         <p className="text-sm text-gray-600">
//           🩺 {a.problem}
//         </p>

//         <p className="text-xs text-gray-400">
//           📅 {a.date} • ⏰ {a.time}
//         </p>
//       </div>

//       {/* RIGHT */}
//       <div className="flex flex-col items-end gap-2">

//         {/* STATUS */}
//         <span
//           className={`text-xs px-3 py-1 rounded-full font-medium ${
//             a.status === "confirmed"
//               ? "bg-green-100 text-green-600"
//               : a.status === "cancelled"
//               ? "bg-red-100 text-red-600"
//               : a.status === "rescheduled"
//               ? "bg-blue-100 text-blue-600"
//               : "bg-yellow-100 text-yellow-600"
//           }`}
//         >
//           {a.status || "pending"}
//         </span>

//         {/* ACTIONS ONLY IF PENDING */}
//         {a.status === "pending" && (
//           <div className="flex gap-2">

//             <button
//               onClick={() =>
//                 updateStatus(a._id, "confirmed")
//               }
//               className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded"
//             >
//               Accept
//             </button>

//             <button
//               onClick={() =>
//                 updateStatus(a._id, "cancelled")
//               }
//               className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded"
//             >
//               Reject
//             </button>

//             <button
//               onClick={() => openReschedule(a)}
//               className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded"
//             >
//               Reschedule
//             </button>

//           </div>
//         )}

//       </div>
//     </div>
//   ))}
// </div>
//       )}

//       {/* 🔁 RESCHEDULE MODAL */}
//       {rescheduleData && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-xl w-96 space-y-4">

//             <h2 className="font-semibold text-lg">
//               Reschedule Appointment
//             </h2>

//             <input
//               type="date"
//               className="w-full border p-2 rounded"
//               onChange={(e) => setNewDate(e.target.value)}
//             />

//             <input
//               type="time"
//               className="w-full border p-2 rounded"
//               onChange={(e) => setNewTime(e.target.value)}
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setRescheduleData(null)}
//                 className="px-3 py-1 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleReschedule}
//                 className="px-3 py-1 bg-blue-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }