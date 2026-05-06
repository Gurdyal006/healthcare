"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import ProfileImage from "@/components/ProfileImage";
import BasicStat from "@/components/BasicStat";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";

export default function DoctorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const [rescheduleData, setRescheduleData] = useState<any>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showReject, setShowReject] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

 

 useEffect(() => {
  fetchAppointments();
}, [session]);

console.log(session?.user?.id, "session user id in doctor profile");

const currentUserId = session?.user?.id || null;

useEffect(() => {
  if (currentUserId) {
    fetchUser();
  }
}, [currentUserId]);

const fetchUser = async () => {
  try {
    const res = await axios.get(`/api/user/${currentUserId}`);
    setUser(res.data);

    toast.success("User loaded");
  } catch (error) {
    console.log(error);

    toast.error("User load failed");
  }
};

console.log(user, "fetched user in doctor profile");

  // const fetchUser = async () => {
  //   try {
  //     console.log(user,'32users');
      
  //     const baseUser = user;

  //     // if doctor → fetch full details
  //     if (baseUser.role === "doctor") {
  //       const docRes = await axios.get("/api/doctors");

  //       const fullDoctor = docRes.data.find(
  //         (d: any) => d._id === baseUser.userId,
  //       );

  //       setUser(fullDoctor || baseUser);
  //     } else {
  //       setUser(baseUser);
  //     }
  //   } catch {
  //     toast.error("User load failed");
  //   }
  // };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments");
      setAppointments(res.data || []);
    } catch {
      toast.error("Appointments failed");
    }
  };

  if (!user) return <Loader />;

  // ✅ doctor only appointments
  const myAppointments = appointments.filter(
    (a) => a.doctorId === (user._id || user.id),
  );

  // ✅ update status
  const updateStatus = async (id: string, status: string) => {
  if (updatingId === id) return;

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a)),
      );
  // 🔥 optimistic update
  const prevState = appointments;
  setAppointments((prev) =>
    prev.map((a) => (a._id === id ? { ...a, status } : a))
  );

  try {
    setUpdatingId(id);

    await axios.patch(`/api/appointments/${id}`, { status });

    toast.success(`Appointment ${status}`);
  } catch {
    // ❗ rollback if failed
    setAppointments(prevState);
    toast.error("Update failed");
  } finally {
    setUpdatingId(null);
  }
};
  // const updateStatus = async (id: string, status: string) => {
  //   try {
  //     await axios.patch(`/api/appointments/${id}`, { status });

  //     setAppointments((prev) =>
  //       prev.map((a) =>
  //         a._id === id ? { ...a, status } : a
  //       )
  //     );

  //     toast.success(`Appointment ${status}`);
  //   } catch {
  //     toast.error("Update failed");
  //   }
  // };

  const handleReschedule = async () => {
    if (!newDate || !newTime) {
      toast.error("Select date & time");
      return;
    }

    // ❗ prevent past date
    const selectedDateTime = new Date(`${newDate}T${newTime}`);
    if (selectedDateTime < new Date()) {
      toast.error("Cannot select past time");
      return;
    }

    try {
      await axios.patch(`/api/appointments/${rescheduleData._id}`, {
        date: newDate,
        time: newTime,
        status: "rescheduled",
      });

      toast.success("Appointment rescheduled ✅");

      fetchAppointments();

      // reset state
      setRescheduleData(null);
      setNewDate("");
      setNewTime("");
    } catch (err) {
      console.error(err);
      toast.error("Reschedule failed");
    }
  };
  // const handleReschedule = async () => {
  //   if (!newDate || !newTime) {
  //     toast.error("Select date & time");
  //     return;
  //   }

  //   try {
  //     await axios.patch(`/api/appointments/${rescheduleData._id}`, {
  //       date: newDate,
  //       time: newTime,
  //       status: "rescheduled",
  //     });

  //     toast.success("Rescheduled");
  //     fetchAppointments();
  //     setRescheduleData(null);
  //   } catch {
  //     toast.error("Failed");
  //   }
  // };

  // const canStartMeeting = (appointmentDateTime: string) => {
  //   const now = new Date();
  //   const appt = new Date(appointmentDateTime);

  //   const diff = (appt.getTime() - now.getTime()) / 60000;

  //   return diff <= 10 && diff >= -30;
  // };

  const canStartMeeting = (appointmentDateTime: string) => {
    const now = new Date();
    const appt = new Date(appointmentDateTime);

    const diff = (now.getTime() - appt.getTime()) / 60000;

    return diff >= 0 && diff <= 30;
  };

  // const startMeeting = async (a: any) => {
  //   try {
  //     await axios.patch(`/api/appointments/${a._id}`, {
  //       meetingStarted: true,
  //     });

  //     window.location.href = `/call/${a._id}`;
  //   } catch {
  //     toast.error("Failed to start meeting");
  //   }
  // };
  const startMeeting = async (a: any) => {
    try {
      await axios.patch(`/api/appointments/${a._id}`, {
        meetingStarted: true,
        callStartedAt: new Date(), // ✅ ADD
      });

    window.location.href = `/call/${a._id}`;
    //  window.open(`/call/${a._id}`, "_blank");
  } catch {
    toast.error("Failed to start meeting");
  }
};

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-6">
      {/* 🔷 DOCTOR HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div className="flex items-center gap-5">
          <ProfileImage
            src={user?.profileImage}
            name={user?.name}
            className="w-20 h-20 border-4 border-white"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-purple-100">{user.specialization || "Doctor"}</p>
            <p className="text-xs text-purple-200">{user.email}</p>

            <div className="flex gap-3 mt-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🎯 {user.experience || 0} yrs
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                👤 {user.gender || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="hidden md:flex gap-6 text-center">
          <BasicStat title="Appointments" value={myAppointments.length} />
          <BasicStat
            title="Pending"
            value={myAppointments.filter((a) => a.status === "pending").length}
          />
          <BasicStat
            title="Confirmed"
            value={
              myAppointments.filter((a) => a.status === "confirmed").length
            }
          />
        </div>
      </div>

      {/* 📅 APPOINTMENTS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Patient Requests
        </h2>

        {myAppointments.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center text-gray-500 shadow">
            No appointments yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {myAppointments.map((a) => (
              <div
                key={a._id}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition space-y-3"
              >
                {/* PATIENT */}
                <div className="flex items-center gap-3">
                  <ProfileImage name={a.patientName} />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {a.patientName}
                    </p>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                </div>

                {/* PROBLEM */}
                <p className="text-gray-700 font-medium">🩺 {a.problem}</p>

                {/* TIME */}
                <p className="text-xs text-gray-400">
                  📅 {a.date} • ⏰ {a.time}
                </p>

                {/* ACTION + STATUS */}
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

                <div className="flex gap-2">

                      {a.status === "pending" && (
                        <>
                           {/* ✅ ACCEPT */}
                              <button
                                  disabled={updatingId === a._id}
                                  onClick={() => updateStatus(a._id, "confirmed")}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow
                                    ${
                                      updatingId === a._id
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }
                                  `}
                                >
                                  {updatingId === a._id ? "Processing..." : "Accept"}
                                </button>

                        {/* ❌ REJECT */}
                        <button
                          onClick={() => setShowReject(a._id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg 
                                          bg-red-600 hover:bg-red-700 text-white 
                                          text-sm font-medium transition duration-200 shadow"
                        >
                          Reject
                        </button>
                        {/* <button
                                onClick={() => {
                                  if (confirm("Are you sure you want to reject this appointment?")) {
                                    updateStatus(a._id, "cancelled");
                                  }
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg 
                                          bg-red-600 hover:bg-red-700 text-white 
                                          text-sm font-medium transition duration-200 shadow"
                              >
                                 Reject
                              </button> */}
                      </>
                    )}

                    {a.status === "confirmed" &&
                      canStartMeeting(a.appointmentDateTime) && (
                        <button
                          onClick={() => startMeeting(a)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                          🎥 Start Meeting
                        </button>
                      )}
                    {a.status === "confirmed" &&
                      !canStartMeeting(a.appointmentDateTime) && (
                        <p className="text-xs text-gray-400">
                          Meeting starts at {a.time}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {rescheduleData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold">Reschedule Appointment</h2>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full border p-2 rounded"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRescheduleData(null)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleReschedule}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showReject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[320px] p-6 text-center animate-[fadeIn_0.2s_ease]">
            {/* Icon */}
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">
              ⚠️
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Reject Appointment
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to reject this appointment? This action
              cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              {/* Cancel */}
              <button
                onClick={() => setShowReject(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 
                     hover:bg-gray-100 transition text-sm font-medium"
              >
                Cancel
              </button>

              {/* Reject */}
              <button
                onClick={async () => {
                  await updateStatus(showReject, "cancelled");
                  setShowReject(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white 
                     hover:bg-red-700 transition text-sm font-medium shadow"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
