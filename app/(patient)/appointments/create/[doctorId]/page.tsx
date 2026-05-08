"use client";

import axiosInstance from "@/lib/axios";
import generateTimeSlots from "@/lib/GenerateTimeSlot";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

export default function AppointmentBookingPage() {
  const router = useRouter();
  const params = useParams();

  const doctorId = params.doctorId as string;

  const { data: session } = useSession();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [problem, setProblem] = useState("");

  const timeSlots = generateTimeSlots(9, 20);

  useEffect(() => {
    if (doctorId) {
      loadDoctor();
    }
  }, [doctorId]);

  const loadDoctor = async () => {
    try {
      setLoading(true);

      const [doctorRes, apptRes] = await Promise.all([
        axiosInstance.get(`/api/doctors/${doctorId}`),
        axiosInstance.get("/api/appointments"),
      ]);

      console.log(doctorRes.data, "hyhyhyhyhyhyh", apptRes.data);

      setDoctor(doctorRes.data);
      setAppointments(apptRes.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load doctor");
    } finally {
      setLoading(false);
    }
  };

const bookedSlots = appointments
  .filter((a) => {
    return (
      a.doctorId === doctorId &&
      a.date === date &&
      a.status !== "cancelled" &&
      a.status !== "rejected" &&
      a.status !== "completed"
    );
  })
  .map((a) => a.time);

  const isPastTime = (slot: string) => {
    if (!date) return false;

    const today = new Date().toISOString().split("T")[0];

    if (date !== today) return false;

    const now = new Date();

    const [h, m] = slot.split(":").map(Number);

    const slotTime = new Date();

    slotTime.setHours(h, m, 0);

    return slotTime < now;
  };

  const handleBook = async () => {
    if (!problem || !date || !time) {
      toast.error("Please fill all fields");
      return;
    }

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    try {
      setBookingLoading(true);

      await axiosInstance.post("/api/appointments", {
        patientName: session.user.name,
        patientEmail: session.user.email,
        patientId: session?.user.id,

        doctorId: doctor?._id,
        doctor: doctor?.name,
        doctorEmail: doctor?.email,

        problem,
        date,
        time,

        appointmentDateTime: new Date(`${date}T${time}:00`),

        status: "pending",
      });

      toast.success(
        "Appointment booked successfully!"
      );

      router.push("/profile");
    } catch (err: any) {
      console.log(err);

      toast.error(
        err?.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff]">
        <div className="text-xl font-semibold text-slate-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff] py-16 px-6 mt-20">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1">

          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">

            <div className="relative h-[320px]">

              <img
                src={
                  doctor.profileImage ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                }
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">

              <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm mb-3">
                🩺 Specialist Doctor
              </div>

              <h2 className="text-3xl font-black">
                {doctor.name}
              </h2>

              <p className="text-blue-600 font-semibold text-lg mt-2">
                {doctor.specialization}
              </p>

              <div className="space-y-5 mt-8 text-slate-600">

                <div className="flex items-center justify-between">
                  <span>Experience</span>

                  <span className="font-bold text-slate-900">
                    {doctor.experience || 0} Years
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Rating</span>

                  <span className="font-bold text-slate-900">
                    ⭐ 4.9
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Consultation Fee</span>

                  <span className="font-bold text-slate-900">
                    ₹799
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

            {/* DATE */}
            <div className="mb-8">

              <label className="block text-lg font-bold mb-4">
                📅 Select Date
              </label>

              <input
                type="date"
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            {/* TIME SLOTS */}
            <div className="mb-8">

              <label className="block text-lg font-bold mb-4">
                ⏰ Select Time
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {timeSlots.map((slot) => {
                  const isBooked =
                    bookedSlots.includes(slot);

                  const isPast =
                    isPastTime(slot);

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked || isPast}
                      onClick={() =>
                        setTime(slot)
                      }
                      className={`h-14 rounded-2xl border font-semibold transition-all duration-300

                      ${
                        isBooked || isPast
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : time === slot
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent"
                          : "border-slate-200 hover:border-blue-500 hover:bg-blue-50"
                      }`}
                    >
                      {slot}

                          {isBooked && " ❌ Booked"}

                        {isPast && "❌"}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* PROBLEM */}
            <div className="mb-8">

              <label className="block text-lg font-bold mb-4">
                🩺 Describe Problem
              </label>

              <textarea
                rows={5}
                value={problem}
                onChange={(e) =>
                  setProblem(e.target.value)
                }
                placeholder="Describe your symptoms or healthcare concerns..."
                className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* SELECTED INFO */}
            {date && time && (

              <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 mb-8">

                <h3 className="font-bold text-blue-900 text-lg">
                  Appointment Summary
                </h3>

                <div className="mt-4 space-y-2 text-slate-700">

                  <p>
                    👨‍⚕️ Doctor:
                    {" "}
                    <b>{doctor.name}</b>
                  </p>

                  <p>
                    📅 Date:
                    {" "}
                    <b>{date}</b>
                  </p>

                  <p>
                    ⏰ Time:
                    {" "}
                    <b>{time}</b>
                  </p>

                </div>
              </div>
            )}

            {/* BOOK BUTTON */}
            <button
              onClick={handleBook}
              disabled={bookingLoading}
              className={`w-full h-16 rounded-2xl text-white text-lg font-bold transition-all duration-300 shadow-lg

              ${
                bookingLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.01]"
              }`}
            >
              {bookingLoading
                ? "Booking Appointment..."
                : "Confirm Appointment"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}