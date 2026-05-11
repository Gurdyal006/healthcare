"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";

import {
  FaHeartbeat,
  FaRobot,
  FaSearch,
  FaStar,
  FaUserMd,
} from "react-icons/fa";
import { SYMPTOM_MAP } from "@/lib/constants";


export default function AIDoctorPage() {

  const [problem, setProblem] = useState("");

  const [doctors, setDoctors] =
    useState<any[]>([]);

  const [recommendedDoctors,
    setRecommendedDoctors] =
    useState<any[]>([]);

  const [specialization,
    setSpecialization] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // FETCH DOCTORS
  useEffect(() => {

    const fetchDoctors = async () => {

      try {

        setLoading(true);

        const res =
          await axios.get("/api/doctors");

        setDoctors(res.data || []);

      } catch {

        toast.error(
          "Failed to load doctors"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchDoctors();

  }, []);

  // AI DETECTION
// AI DETECTION
useEffect(() => {

  if (!problem) {

    setRecommendedDoctors([]);
    setSpecialization("");

    return;
  }

  const lowerProblem =
    problem.toLowerCase();

  let detectedSpecs: string[] = [];

  // LOOP THROUGH ALL SYMPTOMS
Object.entries(SYMPTOM_MAP).forEach(
  ([symptom, specs]: [string, string[]]) => {

      if (
        lowerProblem.includes(
          symptom.toLowerCase()
        )
      ) {

        detectedSpecs.push(...specs);
      }
    }
  );

  // REMOVE DUPLICATES
  detectedSpecs = [
    ...new Set(detectedSpecs),
  ];

  // DEFAULT
  if (detectedSpecs.length === 0) {

    detectedSpecs = [
      "General Physician",
    ];
  }

  // FIRST SPECIALIZATION
  setSpecialization(
    detectedSpecs[0]
  );

  // FILTER DOCTORS
  const filtered =
    doctors.filter((doc: any) =>
      detectedSpecs.includes(
        doc.specialization
      )
    );

  setRecommendedDoctors(filtered);

}, [problem, doctors]);

  return (
    <div className="min-h-screen bg-[#f5f9ff] text-slate-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 py-24">

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-xl mb-6">

            <FaRobot />

            AI Healthcare Assistant

          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">

            AI Doctor Recommendation

          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">

            Describe your symptoms and instantly get specialist doctor recommendations powered by AI.

          </p>

          {/* INPUT */}
          <div className="max-w-3xl mx-auto mt-12 bg-white rounded-[32px] p-5 shadow-2xl">

            <div className="flex items-start gap-4">

              <div className="mt-2 text-slate-400 text-2xl">

                <FaSearch />

              </div>

              <textarea
                value={problem}
                onChange={(e) =>
                  setProblem(
                    e.target.value
                  )
                }
                placeholder="Example: I have knee pain and swelling..."
                className="w-full resize-none outline-none text-slate-700 text-lg"
              />

            </div>

            {/* {specialization && (

              <div className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg">

                <FaHeartbeat />

                Recommended Specialist:
                {" "}
                {specialization}

              </div>
            )} */}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="flex items-center justify-between mb-14 flex-wrap gap-4">

          <div>

            <p className="text-cyan-500 font-semibold uppercase tracking-[4px] text-sm">

              AI Results

            </p>

            <h2 className="text-4xl lg:text-5xl font-black mt-3">

              Recommended Doctors

            </h2>

          </div>

          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">

            <span className="text-slate-500">
              Found
            </span>

            <span className="font-bold text-slate-900 ml-2">

              {recommendedDoctors.length}

            </span>

            <span className="text-slate-500 ml-2">
              doctors
            </span>

          </div>
        </div>

        {/* LOADING */}
        {loading ? (

          <div className="text-center py-20 text-2xl font-bold text-slate-500">

            Loading doctors...

          </div>

        ) : recommendedDoctors.length === 0 ? (

          <div className="bg-white rounded-[32px] p-16 text-center shadow-sm border border-slate-200">

            <h3 className="text-3xl font-bold text-slate-700">

              No Recommendations Yet

            </h3>

            <p className="text-slate-500 mt-3">

              Describe your symptoms to get AI-powered doctor recommendations.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {recommendedDoctors.map((doc: any) => (

              <div
                key={doc._id}
                className="group bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >

                {/* IMAGE */}
                <div className="relative h-[320px] overflow-hidden">

                  <img
                    src={
                      doc.profileImage ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl flex items-center gap-2 shadow-lg">

                    <FaStar className="text-yellow-400" />

                    <span className="font-semibold text-sm">
                      4.9
                    </span>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">

                  <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm mb-3">

                    <FaUserMd />

                    AI Recommended

                  </div>

                  <h3 className="text-2xl font-black">

                    {doc.name}

                  </h3>

                  <p className="text-blue-600 font-semibold mt-2 text-lg">

                    {doc.specialization}

                  </p>

                  <div className="mt-6 space-y-4 text-slate-600">

                    <div className="flex items-center justify-between">

                      <span>Experience</span>

                      <span className="font-bold text-slate-900">

                        {doc.experience || 0}
                        {" "}
                        Years

                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span>Patients</span>

                      <span className="font-bold text-slate-900">

                        10k+

                      </span>

                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-2 gap-4 mt-8">

                    <Link
                      href={`/appointments/create/${doc._id}`}
                      className="py-3 rounded-2xl border border-slate-200 font-semibold hover:border-blue-500 hover:text-blue-600 transition text-center"
                    >
                      Book Now
                    </Link>

                    <Link
                      href={`/doctors/${doc._id}`}
                      className="py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-center hover:opacity-90 transition"
                    >
                      View Profile
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}