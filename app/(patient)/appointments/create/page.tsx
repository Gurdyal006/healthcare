"use client";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

type Doctor = {
  name: string;
  specialization: string;
};

export default function CreateAppointmentPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [problem, setProblem] = useState("");
  const [user, setUser] = useState<any>(null);


  const router = useRouter();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/me");

      console.log("USER:", res.data);

      setUser(res.data.user);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  fetchUser();
}, []);
console.log("Current user:", user);

  // Symptom map
  const symptomMap: Record<string, string[]> = {
    Fever: ["General Physician"],
    Headache: ["Neurologist"],
    Vomiting: ["General Physician", "Gastroenterologist"],
    "Knee Pain": ["Orthopedic"],
    "Back Pain": ["Orthopedic"],
  };

  const doctors: Doctor[] = [
    { name: "Dr. Sharma", specialization: "General Physician" },
    { name: "Dr. Mehta", specialization: "Orthopedic" },
    { name: "Dr. Gupta", specialization: "Neurologist" },
    {name: "Doctor 1",  specialization: "Orthopedic"}
  ];

  const symptomsList = Object.keys(symptomMap);

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
      symptomMap[s]?.forEach((sp) => set.add(sp));
    });
    return Array.from(set);
  }, [selectedSymptoms]);

  // Filter doctors
  const filteredDoctors = doctors.filter((d) =>
    specializations.includes(d.specialization)
  );

  const timeSlots = ["10:00", "11:00", "12:00", "14:00"];

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
    const res = await axiosInstance.post("/api/appointments", {
      patientName: user.name,      // ✅ auto fill
      patientId: user.userId,      // ✅ correct

      problem,

      doctor: selectedDoctor.name,
      doctorId: selectedDoctor.name,

      date,
      time,
      symptoms: selectedSymptoms,
      status: "pending",
    });

    console.log("Saved:", res.data);

    toast.success("Appointment booked!");
    router.push("/appointments"); // redirect to appointments list

    // reset
    setSelectedDoctor(null);
    setPatientName("");
    setProblem("");
    setDate("");
    setTime("");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Error");
  }
};

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Create Appointment</h1>

      {/* Symptoms */}
      <div className="flex flex-wrap gap-2">
        {symptomsList.map((symptom) => (
          <button
            key={symptom}
            onClick={() => toggleSymptom(symptom)}
            className={`px-3 py-1 rounded-full ${
              selectedSymptoms.includes(symptom)
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      {/* Doctors */}
      <div className="space-y-3">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.name}
            className="flex justify-between border p-3 rounded"
          >
            <span>{doc.name}</span>
            <button
              onClick={() => setSelectedDoctor(doc)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96 space-y-4">
            <h2 className="font-semibold">
              Book with {selectedDoctor.name}
            </h2>

              {/* Patient Name */}
            <input
                type="text"
                placeholder="Patient Name"
                className="w-full border p-2 rounded"
                value={user?.name || ""}
                //onChange={(e) => setPatientName(e.target.value)}
                disabled
            />

            {/* Problem */}
            <textarea
                placeholder="Describe problem..."
                className="w-full border p-2 rounded"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
            />

            <input
              type="date"
              className="w-full border p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div className="flex gap-2 flex-wrap">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`px-3 py-1 border ${
                    time === t ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedDoctor(null)}>
                Cancel
              </button>
            <button
                onClick={handleBook}
                disabled={!user?.userId}
                className={`px-3 py-1 text-white rounded ${
                    !user?.userId
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                >
                {user?.userId ? "Confirm" : "Loading..."}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}