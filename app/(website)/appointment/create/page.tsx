"use client";

import Image from "next/image";
import {
  FaCalendarCheck,
  FaClock,
  FaCreditCard,
  FaUserMd,
} from "react-icons/fa";

export default function CreateAppointmentPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1">

          {/* Doctor Card */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">

            <div className="relative h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">

              <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm mb-3">
                <FaUserMd />
                Specialist Doctor
              </div>

              <h2 className="text-3xl font-black">
                Dr. Sarah Johnson
              </h2>

              <p className="text-blue-600 font-semibold text-lg mt-2">
                Cardiologist Specialist
              </p>

              <div className="space-y-5 mt-8 text-slate-600">

                <div className="flex items-center justify-between">
                  <span>Experience</span>
                  <span className="font-bold text-slate-900">
                    12 Years
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Patients</span>
                  <span className="font-bold text-slate-900">
                    10k+
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Consultation Fee</span>
                  <span className="font-bold text-slate-900">
                    $120
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10">

            {/* Heading */}
            <div className="mb-10">
              <p className="text-blue-600 font-semibold uppercase tracking-[4px] text-sm">
                Appointment
              </p>

              <h1 className="text-5xl font-black mt-3">
                Book Consultation
              </h1>

              <p className="text-slate-500 mt-5 text-lg">
                Schedule your healthcare consultation with experienced specialists.
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-8">

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold mb-4">
                  <FaCalendarCheck className="text-blue-600" />
                  Select Date
                </label>

                <input
                  type="date"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold mb-4">
                  <FaClock className="text-cyan-500" />
                  Select Time
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  {[
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                    "05:00 PM",
                    "06:00 PM",
                  ].map((time, index) => (
                    <button
                      key={index}
                      type="button"
                      className="h-14 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition font-semibold"
                    >
                      {time}
                    </button>
                  ))}

                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="text-lg font-bold block mb-4">
                  Describe Symptoms
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe your symptoms or healthcare concerns..."
                  className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Consultation Type */}
              <div>
                <label className="text-lg font-bold block mb-4">
                  Consultation Type
                </label>

                <div className="grid md:grid-cols-2 gap-5">

                  <button
                    type="button"
                    className="h-20 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition text-left px-6"
                  >
                    <h3 className="font-bold text-lg">
                      In-Person Visit
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      Visit hospital or clinic
                    </p>
                  </button>

                  <button
                    type="button"
                    className="h-20 rounded-2xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition text-left px-6"
                  >
                    <h3 className="font-bold text-lg">
                      Video Consultation
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      Online healthcare consultation
                    </p>
                  </button>

                </div>
              </div>

              {/* Payment */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold mb-4">
                  <FaCreditCard className="text-blue-600" />
                  Payment Method
                </label>

                <select className="w-full h-14 px-5 rounded-2xl border border-slate-200 outline-none focus:border-blue-500">
                  <option>Credit / Debit Card</option>
                  <option>UPI Payment</option>
                  <option>Cash At Clinic</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                Confirm Appointment
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}