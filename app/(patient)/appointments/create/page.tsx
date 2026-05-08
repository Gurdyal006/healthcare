// "use client";

// import axiosInstance from "@/lib/axios";
// import { useRouter } from "next/navigation";
// import { useState, useMemo, useEffect } from "react";
// import toast from "react-hot-toast";
// import { SYMPTOM_MAP } from "@/lib/constants";
// import ProfileImage from "@/components/ProfileImage";
// import BookingModal from "@/components/BookingModal";
// import generateTimeSlots from "@/lib/GenerateTimeSlot";
//  import { useSession } from "next-auth/react";

// type Doctor = {
//   _id: string;
//   name: string;
//   specialization: string;
//   email: string;
//   profileImage?: string;
//   experience?: number;
// };

// export default function CreateAppointmentPage() {
//   const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [problem, setProblem] = useState("");
//   const [user, setUser] = useState<any>(null);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const { data: session, status } = useSession();

// console.log(session, "session in create appointment page");

//   const router = useRouter();

//   type Appointment = {
//   doctorId: string;
//   date: string;
//   time: string;
//   status: string;
// };

// useEffect(() => {
//         if (session?.user) {
//       setUser(session.user);
//     }
//   const loadData = async () => {
//     try {
//       const [ apptRes, doctorRes] = await Promise.all([
//         //axiosInstance.get("/api/auth/me"),
//         axiosInstance.get("/api/appointments"),
//         axiosInstance.get("/api/doctors"),
//       ]);

//       //setUser(userRes.data.user);
//       setAppointments(apptRes.data || []);
//       setDoctors(doctorRes.data || []);

//     } catch (err) {
//       console.error("Load error:", err);
//       toast.error("Failed to load data");
//     }
//   };

//   loadData();
// }, [session]);

// const symptomsList = Object.keys(SYMPTOM_MAP);

//   const toggleSymptom = (symptom: string) => {
//     setSelectedSymptoms((prev) =>
//       prev.includes(symptom)
//         ? prev.filter((s) => s !== symptom)
//         : [...prev, symptom]
//     );
//   };

//   // Get specializations
//   const specializations = useMemo(() => {
//     const set = new Set<string>();
//     selectedSymptoms.forEach((s) => {
//       SYMPTOM_MAP[s]?.forEach((sp) => set.add(sp));
//     });
//     return Array.from(set);
//   }, [selectedSymptoms]);



//   const filteredDoctors = doctors.filter((d) => {
//   if (selectedSymptoms.length === 0) return true;

//   return selectedSymptoms.some((symptom) =>
//     SYMPTOM_MAP[symptom]?.includes(d.specialization)
//   );
// });

//   //const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00", "15:30", "16:00"];

// const timeSlots = generateTimeSlots(9, 20);

// const bookedSlots = appointments
//   .filter((a) => {
//     return (
//       a.doctorId === selectedDoctor?._id &&
//       a.date === date &&
//       a.status !== "cancelled" && a.status !== "rejected" && a.status !== "completed"
//     );
//   })
//   .map((a) => a.time);

//   // Booking API call
//   const handleBook = async () => {
//   if (!problem || !date || !time || !selectedDoctor) {
//     toast.error("Fill all fields");
//     return;
//   }

//   console.log("Booking with:", {
//     patientName: user.name,
//     patientId: user.userId,
//   });

//   if (!user?.id ) {
//     toast.error("User not loaded properly");
//     return;
//   }

//   try {

//   setBookingLoading(true);

//     const res = await axiosInstance.post("/api/appointments", {
//       patientName: user.name,      //  auto fill
//       patientId: user.userId,      //  correct
//       patientEmail: user.email,    //  auto fill

//       problem,

//       doctorId: selectedDoctor._id,
//       doctorEmail: selectedDoctor.email,
//       doctor: selectedDoctor.name,


//       date,
//       time,
//       appointmentDateTime: new Date(`${date}T${time}:00`),
//       symptoms: selectedSymptoms,
//       status: "pending",
//     });

//     console.log("Saved:", res.data);

//     toast.success("Email sent to doctor successfully! he will approve your appointment soon.");
//     router.push("/profile");

//     // reset
//     setSelectedDoctor(null);
//     setPatientName("");
//     setProblem("");
//     setDate("");
//     setTime("");
//   } catch (err: any) {
//     toast.error(err.response?.data?.message || "Error");
//   }finally {
//     setBookingLoading(false);
//   }
// };

// const isPastTime = (slot: string) => {
//   if (!date) return false;

//   const today = new Date().toISOString().split("T")[0];

//   if (date !== today) return false;

//   const now = new Date();
//   const [h, m] = slot.split(":").map(Number);

//   const slotTime = new Date();
//   slotTime.setHours(h, m, 0);

//   return slotTime < now; // ❌ past time
// };

//  return (
//   <div className=" mx-auto space-y-4 p-4">

//     {/* Header */}
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800">
//         Book Appointment 🩺
//       </h1>
//       <p className="text-gray-500 text-sm">
//         Select symptoms and choose the best doctor
//       </p>
//     </div>

//     {/* 🏷️ SYMPTOMS */}
//     <div>
//       <h2 className="font-semibold mb-2 text-gray-700">
//         Select Symptoms
//       </h2>

//       <div className="flex flex-wrap gap-2">
//         {symptomsList.map((symptom) => (
//           <button
//             key={symptom}
//             onClick={() => toggleSymptom(symptom)}
//             className={`px-4 py-1.5 rounded-full text-sm transition border ${
//               selectedSymptoms.includes(symptom)
//                 ? "bg-blue-600 text-white border-blue-600 shadow"
//                 : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {symptom}
//           </button>
//         ))}
//       </div>
//     </div>

//     {/* 👨‍⚕️ DOCTORS */}
//     <div>
//       <h2 className="font-semibold mb-2 text-gray-700">
//         Available Doctors
//       </h2>

//       {filteredDoctors.length === 0 ? (
//         <p className="text-gray-500 text-sm">
//           No doctors found for selected symptoms
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-4">

//           {filteredDoctors.map((doc) => (
//             <div
//               key={doc._id}
//               className={`p-4 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition flex justify-between items-center ${
//                         selectedDoctor?._id === doc._id
//                           ? "border-blue-500 ring-2 ring-blue-200"
//                           : ""
//                       }`}
//             >
//               <div className="flex items-center gap-3">

//                 <ProfileImage
//                   src={doc.profileImage}
//                   name={doc.name}
//                 />

//                 <div>
//                   <p className="font-semibold text-gray-800">
//                     {doc.name}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     {doc.specialization}
//                   </p>

//                   <p className="text-xs text-gray-400">
//                     {doc.experience || 0} yrs experience
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setSelectedDoctor(doc)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
//               >
//                 {selectedDoctor?._id === doc._id
//                   ? "Selected"
//                   : "Book"}
//               </button>
//             </div>
//           ))}

//         </div>
//       )}
//     </div>

//     {/* 👨‍⚕️ SELECTED */}
//     {selectedDoctor && (
//       <div className="p-3 bg-green-100 text-green-700 rounded-lg">
//         Selected Doctor: <b>{selectedDoctor.name}</b>
//       </div>
//     )}

//     {/* MODAL */}
//   <BookingModal
//       open={!!selectedDoctor}
//       onClose={() => setSelectedDoctor(null)}
//       doctor={selectedDoctor}
//       user={user}
//       problem={problem}
//       setProblem={setProblem}
//       date={date}
//       setDate={setDate}
//       time={time}
//       setTime={setTime}
//       timeSlots={timeSlots}
//       onConfirm={handleBook}
//       loading={bookingLoading}
//        bookedSlots={bookedSlots}
//        isPastime={isPastTime}
//     />
//   </div>
// );
// }

"use client";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { SYMPTOM_MAP } from "@/lib/constants";
import generateTimeSlots from "@/lib/GenerateTimeSlot";
import { useSession } from "next-auth/react";

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  email: string;
  profileImage?: string;
  experience?: number;
};

type Appointment = {
  doctorId: string;
  date: string;
  time: string;
  status: string;
};

export default function CreateAppointmentPage() {
  const router = useRouter();

  const { data: session } = useSession();

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [session]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [doctorRes, apptRes] = await Promise.all([
        axiosInstance.get("/api/doctors"),
        axiosInstance.get("/api/appointments"),
      ]);

      setDoctors(doctorRes.data || []);
      setAppointments(apptRes.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const symptomsList = Object.keys(SYMPTOM_MAP);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const filteredDoctors = useMemo(() => {
    if (selectedSymptoms.length === 0) return doctors;

    return doctors.filter((doctor) =>
      selectedSymptoms.some((symptom) =>
        SYMPTOM_MAP[symptom]?.includes(doctor.specialization)
      )
    );
  }, [selectedSymptoms, doctors]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff]">
        <div className="text-xl font-semibold text-slate-600">
          Loading doctors...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff] px-6 py-10 mt-20">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-10 text-white shadow-xl">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[4px] text-sm font-semibold text-cyan-100">
              Healthcare Platform
            </p>

            <h1 className="text-5xl font-black mt-4 leading-tight">
              Find The Best Doctor For Your Health
            </h1>

            <p className="mt-5 text-lg text-blue-100">
              Search specialists, select symptoms, and book appointments instantly.
            </p>

          </div>
        </div>

        {/* SYMPTOMS */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Select Symptoms
            </h2>

            <span className="text-sm text-slate-400">
              Choose multiple symptoms
            </span>

          </div>

          <div className="flex flex-wrap gap-4">

            {symptomsList.map((symptom) => (

              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300

                ${
                  selectedSymptoms.includes(symptom)
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {symptom}
              </button>
            ))}

          </div>
        </div>

        {/* DOCTORS */}
        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-black text-slate-900">
              Available Doctors
            </h2>

            <p className="text-slate-500">
              {filteredDoctors.length} doctors found
            </p>

          </div>

          {filteredDoctors.length === 0 ? (

            <div className="bg-white rounded-[32px] p-16 text-center border border-slate-200">

              <h3 className="text-3xl font-bold text-slate-700">
                No Doctors Found
              </h3>

              <p className="text-slate-500 mt-3">
                Try selecting different symptoms.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {filteredDoctors.map((doc) => (

                <div
                  key={doc._id}
                  className="bg-white rounded-[32px] border border-slate-200 p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="flex flex-col md:flex-row gap-6 justify-between">

                    {/* LEFT */}
                    <div className="flex gap-5">

                      <img
                        src={
                          doc.profileImage ||
                          "https://randomuser.me/api/portraits/men/32.jpg"
                        }
                        alt={doc.name}
                        className="w-24 h-24 rounded-3xl object-cover border border-slate-200"
                      />

                      <div>

                        <div className="flex items-center gap-2 mb-2">

                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                          <span className="text-sm text-green-600 font-semibold">
                            Available Today
                          </span>

                        </div>

                        <h3 className="text-2xl font-black text-slate-900">
                          {doc.name}
                        </h3>

                        <p className="text-blue-600 font-semibold mt-1">
                          {doc.specialization}
                        </p>

                        <div className="flex gap-5 mt-5 text-sm text-slate-500">

                          <div>
                            ⭐ 4.9 Rating
                          </div>

                          <div>
                            🩺 {doc.experience || 0} Years
                          </div>

                        </div>

                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col justify-between items-end">

                      <div className="text-right">

                        <p className="text-slate-400 text-sm">
                          Consultation Fee
                        </p>

                        <h3 className="text-3xl font-black text-slate-900">
                          ₹799
                        </h3>

                      </div>

                      <button
                        onClick={() =>
                          router.push(
                            `/appointments/create/${doc._id}`
                          )
                        }
                        className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Book Appointment
                      </button>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}