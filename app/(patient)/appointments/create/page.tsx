"use client";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { SYMPTOM_MAP } from "@/lib/constants";
import ProfileImage from "@/components/ProfileImage";
import BookingModal from "@/components/BookingModal";
import generateTimeSlots from "@/lib/GenerateTimeSlot";

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  email: string;
  profileImage?: string;
  experience?: number;
};

export default function CreateAppointmentPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [problem, setProblem] = useState("");
  const [user, setUser] = useState<any>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
 const [appointments, setAppointments] = useState<Appointment[]>([]);


  const router = useRouter();

  type Appointment = {
  doctorId: string;
  date: string;
  time: string;
  status: string;
};

useEffect(() => {
  const loadData = async () => {
    try {
      const [userRes, apptRes, doctorRes] = await Promise.all([
        axiosInstance.get("/api/auth/me"),
        axiosInstance.get("/api/appointments"),
        axiosInstance.get("/api/doctors"),
      ]);

      setUser(userRes.data.user);
      setAppointments(apptRes.data || []);
      setDoctors(doctorRes.data || []);

    } catch (err) {
      console.error("Load error:", err);
      toast.error("Failed to load data");
    }
  };

  loadData();
}, []);

const symptomsList = Object.keys(SYMPTOM_MAP);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Get specializations
  const specializations = useMemo(() => {
    const set = new Set<string>();
    selectedSymptoms.forEach((s) => {
      SYMPTOM_MAP[s]?.forEach((sp) => set.add(sp));
    });
    return Array.from(set);
  }, [selectedSymptoms]);



  const filteredDoctors = doctors.filter((d) => {
  if (selectedSymptoms.length === 0) return true;

  return selectedSymptoms.some((symptom) =>
    SYMPTOM_MAP[symptom]?.includes(d.specialization)
  );
});

  //const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00", "15:30", "16:00"];

const timeSlots = generateTimeSlots(9, 18);

const bookedSlots = appointments
  .filter((a) => {
    return (
      a.doctorId === selectedDoctor?._id &&
      a.date === date &&
      a.status !== "cancelled"
    );
  })
  .map((a) => a.time);

  // Booking API call
  const handleBook = async () => {
  if (!problem || !date || !time || !selectedDoctor) {
    toast.error("Fill all fields");
    return;
  }

  if (!user?.userId ) {
    toast.error("User not loaded properly");
    return;
  }

  try {

  setBookingLoading(true);

    const res = await axiosInstance.post("/api/appointments", {
      patientName: user.name,      //  auto fill
      patientId: user.userId,      //  correct
      patientEmail: user.email,    //  auto fill

      problem,

      doctorId: selectedDoctor._id,
      doctorEmail: selectedDoctor.email,
      doctor: selectedDoctor.name,


      date,
      time,
      appointmentDateTime: new Date(`${date}T${time}:00`),
      symptoms: selectedSymptoms,
      status: "pending",
    });

    console.log("Saved:", res.data);

    toast.success("Email sent to doctor successfully! he will approve your appointment soon.");
    router.push("/appointments"); // redirect to appointments list

    // reset
    setSelectedDoctor(null);
    setPatientName("");
    setProblem("");
    setDate("");
    setTime("");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Error");
  }finally {
    setBookingLoading(false);
  }
};

 return (
  <div className=" mx-auto space-y-4 p-4">

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Book Appointment 🩺
      </h1>
      <p className="text-gray-500 text-sm">
        Select symptoms and choose the best doctor
      </p>
    </div>

    {/* 🏷️ SYMPTOMS */}
    <div>
      <h2 className="font-semibold mb-2 text-gray-700">
        Select Symptoms
      </h2>

      <div className="flex flex-wrap gap-2">
        {symptomsList.map((symptom) => (
          <button
            key={symptom}
            onClick={() => toggleSymptom(symptom)}
            className={`px-4 py-1.5 rounded-full text-sm transition border ${
              selectedSymptoms.includes(symptom)
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>
    </div>

    {/* 👨‍⚕️ DOCTORS */}
    <div>
      <h2 className="font-semibold mb-2 text-gray-700">
        Available Doctors
      </h2>

      {filteredDoctors.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No doctors found for selected symptoms
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className={`p-4 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition flex justify-between items-center ${
                        selectedDoctor?._id === doc._id
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : ""
                      }`}
            >
              <div className="flex items-center gap-3">

                <ProfileImage
                  src={doc.profileImage}
                  name={doc.name}
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {doc.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {doc.specialization}
                  </p>

                  <p className="text-xs text-gray-400">
                    {doc.experience || 0} yrs experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoctor(doc)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                {selectedDoctor?._id === doc._id
                  ? "Selected"
                  : "Book"}
              </button>
            </div>
          ))}

        </div>
      )}
    </div>

    {/* 👨‍⚕️ SELECTED */}
    {selectedDoctor && (
      <div className="p-3 bg-green-100 text-green-700 rounded-lg">
        Selected Doctor: <b>{selectedDoctor.name}</b>
      </div>
    )}

    {/* MODAL */}
  <BookingModal
      open={!!selectedDoctor}
      onClose={() => setSelectedDoctor(null)}
      doctor={selectedDoctor}
      user={user}
      problem={problem}
      setProblem={setProblem}
      date={date}
      setDate={setDate}
      time={time}
      setTime={setTime}
      timeSlots={timeSlots}
      onConfirm={handleBook}
      loading={bookingLoading}
       bookedSlots={bookedSlots}
    />
  </div>
);
}