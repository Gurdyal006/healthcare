
"use client";

import Image from "next/image";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaUser,
  FaHeartbeat,
} from "react-icons/fa";

export default function PatientProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-10 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* IMAGE */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
              alt="Patient"
              fill
              className="object-cover"
            />
          </div>

          {/* INFO */}
          <div className="flex-1">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl mb-5">
              <FaHeartbeat className="text-red-300" />
              Patient Profile
            </div>

            <h1 className="text-5xl font-black">
              John Smith
            </h1>

            <p className="text-cyan-100 text-xl mt-4">
              Healthcare Dashboard & Medical Information
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">
                  12
                </h3>

                <p className="text-blue-100 mt-2 text-sm">
                  Appointments
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">
                  5
                </h3>

                <p className="text-blue-100 mt-2 text-sm">
                  Reports
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">
                  3
                </h3>

                <p className="text-blue-100 mt-2 text-sm">
                  Prescriptions
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">
                  4.9
                </h3>

                <p className="text-blue-100 mt-2 text-sm">
                  Health Score
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          {/* PERSONAL INFO */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10">

            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-blue-600 font-semibold uppercase tracking-[4px] text-sm">
                  Information
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Personal Details
                </h2>
              </div>

              <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold">
                Edit Profile
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <label className="text-slate-500 font-medium">
                  Full Name
                </label>

                <div className="mt-3 h-14 rounded-2xl border border-slate-200 px-5 flex items-center font-semibold">
                  John Smith
                </div>
              </div>

              <div>
                <label className="text-slate-500 font-medium">
                  Gender
                </label>

                <div className="mt-3 h-14 rounded-2xl border border-slate-200 px-5 flex items-center font-semibold">
                  Male
                </div>
              </div>

              <div>
                <label className="text-slate-500 font-medium">
                  Date of Birth
                </label>

                <div className="mt-3 h-14 rounded-2xl border border-slate-200 px-5 flex items-center font-semibold">
                  12 March 1995
                </div>
              </div>

              <div>
                <label className="text-slate-500 font-medium">
                  Blood Group
                </label>

                <div className="mt-3 h-14 rounded-2xl border border-slate-200 px-5 flex items-center font-semibold">
                  O+
                </div>
              </div>

            </div>
          </div>

          {/* MEDICAL HISTORY */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10">

            <div className="mb-10">
              <p className="text-blue-600 font-semibold uppercase tracking-[4px] text-sm">
                Healthcare
              </p>

              <h2 className="text-4xl font-black mt-2">
                Medical History
              </h2>
            </div>

            <div className="space-y-6">

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold">
                  Heart Checkup
                </h3>

                <p className="text-slate-500 mt-2">
                  Consultation with Cardiologist • Jan 2026
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-2xl font-bold">
                  Blood Test
                </h3>

                <p className="text-slate-500 mt-2">
                  Complete health screening • Feb 2026
                </p>
              </div>

            </div>
          </div>

      
        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* CONTACT */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

            <h3 className="text-3xl font-black mb-8">
              Contact Information
            </h3>

            <div className="space-y-6 text-slate-600">

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600 text-xl" />
                johnsmith@gmail.com
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-cyan-500 text-xl" />
                +91 9876543210
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                Gurgaon, India
              </div>

              <div className="flex items-center gap-4">
                <FaCalendarCheck className="text-cyan-500 text-xl" />
                Joined Jan 2026
              </div>

            </div>
          </div>

          {/* HEALTH CARD */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[32px] p-8 text-white shadow-xl">

            <h3 className="text-3xl font-black leading-tight">
              Need Healthcare Support?
            </h3>

            <p className="mt-5 text-blue-100 leading-relaxed">
              Connect with doctors and manage your healthcare digitally.
            </p>

            <button className="w-full mt-8 py-4 rounded-2xl bg-white text-slate-900 font-bold hover:scale-105 transition-all duration-300">
              Book Appointment
            </button>
          </div>

          

        </div>

        

      </div>

            {/* APPOINTMENT CARDS */}
            {/* APPOINTMENTS */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10 mt-5">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">

            <div>
              <p className="text-blue-600 font-semibold uppercase tracking-[4px] text-sm">
                Healthcare
              </p>

              <h2 className="text-4xl font-black mt-2 text-slate-900">
                Recent Appointments
              </h2>
            </div>

            <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300">
              View All
            </button>
        </div>
          <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              {
                id: "A1024",
                doctor: "Dr. Sarah Johnson",
                specialization: "Cardiologist",
                problem: "Chest pain and heart health consultation",
                date: "12 May 2026",
                time: "10:30 AM",
                status: "confirmed",
                duration: 30,
                image:
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
              },

              {
                id: "A2048",
                doctor: "Dr. Michael Lee",
                specialization: "Orthopedic",
                problem: "Knee pain and movement issue",
                date: "15 May 2026",
                time: "2:00 PM",
                status: "pending",
                duration: 20,
                image:
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
              },

              {
                id: "A3091",
                doctor: "Dr. Emily Watson",
                specialization: "Dermatologist",
                problem: "Skin allergy and irritation treatment",
                date: "18 May 2026",
                time: "11:15 AM",
                status: "completed",
                duration: 25,
                image:
                  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop",
              },
            ].map((a, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-slate-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={a.image}
                      alt={a.doctor}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {a.doctor}
                      </h3>

                      <p className="text-slate-500 mt-1">
                        {a.specialization}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold w-fit
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
                    `}
                  >
                    {a.status}
                  </span>
                </div>

                {/* PROBLEM */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                  <p className="text-sm text-slate-500 font-medium">
                    Problem
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    🩺 {a.problem}
                  </p>
                </div>

                {/* INFO */}
                <div className="flex flex-wrap items-center gap-5 mt-6 text-slate-500">

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
                    <span>{a.id}</span>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8">

                  <p className="text-sm text-slate-400">
                    Duration: {a.duration} min
                  </p>

                  {a.status === "confirmed" ? (
                    <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                      🎥 Join Consultation
                    </button>
                  ) : a.status === "completed" ? (
                    <span className="text-slate-400 text-sm font-medium">
                      Consultation completed
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-500 text-sm font-medium">
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                      Waiting for confirmation...
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
          </div>
            </div>
    </div>
  );
}