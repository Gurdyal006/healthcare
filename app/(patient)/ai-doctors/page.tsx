"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const symptomMap: any = {
  knee: "Orthopedic",
  joint: "Orthopedic",
  bone: "Orthopedic",
  backpain: "Orthopedic",

  stomach: "Gastroenterologist",
  acidity: "Gastroenterologist",
  gas: "Gastroenterologist",
  digestion: "Gastroenterologist",

  skin: "Dermatologist",
  rash: "Dermatologist",
  itching: "Dermatologist",

  anxiety: "Psychiatrist",
  depression: "Psychiatrist",
  stress: "Psychiatrist",

  fever: "General Physician",
  headache: "General Physician",
};

export default function AIDoctorPage() {
  const [problem, setProblem] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [recommendedDoctors, setRecommendedDoctors] = useState<any[]>([]);
  const [specialization, setSpecialization] = useState("");

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/api/doctors");
        setDoctors(res.data || []);
      } catch {
        toast.error("Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Detect specialization
  useEffect(() => {
    if (!problem) {
      setRecommendedDoctors([]);
      setSpecialization("");
      return;
    }

    const lower = problem.toLowerCase();

    let detected = "General Physician";

    for (const keyword in symptomMap) {
      if (lower.includes(keyword)) {
        detected = symptomMap[keyword];
        break;
      }
    }

    setSpecialization(detected);

    const filtered = doctors.filter(
      (d: any) => d.specialization === detected
    );

    setRecommendedDoctors(filtered);
  }, [problem, doctors]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          AI Doctor Recommendation 🤖
        </h1>

        <p className="text-gray-500 mt-1">
          Describe your symptoms and get recommended doctors instantly.
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your symptoms
        </label>

        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Example: I have knee pain and swelling"
          className="w-full border rounded-xl p-4 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {specialization && (
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            Recommended Specialist: {specialization}
          </div>
        )}
      </div>

      {/* DOCTORS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recommended Doctors
        </h2>

        {recommendedDoctors.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">
            No doctor recommendations yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {recommendedDoctors.map((doc: any) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5"
              >
                <div className="flex items-center gap-4">

                  {/* IMAGE */}
                  <img
                    src={doc.profileImage || "/default-doctor.png"}
                    alt={doc.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                  {/* INFO */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {doc.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {doc.specialization}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {doc.experience || 0} years experience
                    </p>
                  </div>
                </div>

                {/* ACTION */}
                <button
                  className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}