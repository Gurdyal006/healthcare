import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaUserMd,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

export default function DoctorProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] text-slate-900">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-xl mb-6">
              <FaStar className="text-yellow-300" />
              Top Rated Specialist
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">
              Dr. Sarah Johnson
            </h1>

            <p className="mt-5 text-2xl text-cyan-100 font-semibold">
              Cardiologist Specialist
            </p>

            <p className="mt-8 text-lg text-blue-100 leading-relaxed max-w-2xl">
              Trusted healthcare specialist providing advanced cardiac care,
              AI-assisted consultation, and patient-centered treatment.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-5 mt-10">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">12+</h3>
                <p className="text-blue-100 mt-1 text-sm">
                  Years Experience
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">10k+</h3>
                <p className="text-blue-100 mt-1 text-sm">
                  Patients
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                <h3 className="text-3xl font-black">4.9</h3>
                <p className="text-blue-100 mt-1 text-sm">
                  Rating
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold hover:scale-105 transition-all duration-300">
                Book Appointment
              </button>

              <button className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Video Consultation
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl">
              <div className="relative h-[500px] rounded-[30px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
                  alt="Doctor"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* ABOUT */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm">
            <h2 className="text-4xl font-black mb-6">
              About Doctor
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Dr. Sarah Johnson is a highly experienced cardiologist with over
              12 years of expertise in diagnosing and treating cardiovascular
              diseases. She focuses on modern healthcare technology,
              AI-assisted diagnostics, and patient-first treatment methods.
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm">
            <h2 className="text-4xl font-black mb-8">
              Education & Experience
            </h2>

            <div className="space-y-8">

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold">
                  MBBS - Oxford Medical University
                </h3>

                <p className="text-slate-500 mt-2">
                  2008 - 2013
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-2xl font-bold">
                  Senior Cardiologist - Royal Hospital
                </h3>

                <p className="text-slate-500 mt-2">
                  2014 - Present
                </p>
              </div>

            </div>
          </div>

          {/* REVIEWS */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-blue-600 font-semibold uppercase tracking-[4px] text-sm">
                  Reviews
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Patient Feedback
                </h2>
              </div>

              <div className="flex items-center gap-2 text-2xl font-black">
                <FaStar className="text-yellow-400" />
                4.9
              </div>
            </div>

            <div className="space-y-6">

              <div className="bg-[#f5f9ff] rounded-[24px] p-6 border border-slate-200">
                <div className="text-yellow-400 text-xl mb-3">
                  ★★★★★
                </div>

                <p className="text-slate-600 leading-relaxed">
                  Amazing doctor with professional consultation and caring
                  treatment process.
                </p>

                <div className="mt-5">
                  <h4 className="font-bold">John Smith</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Heart Patient
                  </p>
                </div>
              </div>

              <div className="bg-[#f5f9ff] rounded-[24px] p-6 border border-slate-200">
                <div className="text-yellow-400 text-xl mb-3">
                  ★★★★★
                </div>

                <p className="text-slate-600 leading-relaxed">
                  Very experienced doctor with modern healthcare knowledge.
                </p>

                <div className="mt-5">
                  <h4 className="font-bold">Emma Wilson</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Cardiology Patient
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">

          {/* INFO CARD */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-3xl font-black mb-8">
              Clinic Information
            </h3>

            <div className="space-y-6 text-slate-600">

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                London Medical Center
              </div>

              <div className="flex items-center gap-4">
                <FaCalendarCheck className="text-cyan-500 text-xl" />
                Monday - Saturday
              </div>

              <div className="flex items-center gap-4">
                <FaClock className="text-blue-600 text-xl" />
                10:00 AM - 7:00 PM
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-cyan-500 text-xl" />
                +44 123 456 789
              </div>

            </div>
          </div>

          {/* APPOINTMENT CARD */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[32px] p-8 text-white shadow-xl">

            <h3 className="text-3xl font-black leading-tight">
                Need Medical Consultation?
            </h3>

            <p className="mt-5 text-blue-100 leading-relaxed">
                Book your appointment and consult with experienced specialists.
            </p>

            <Link
                href={`/appointment/create?doctor=123`}
                className="block w-full mt-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-center hover:scale-105 transition-all duration-300"
            >
                Book Appointment
            </Link>

            </div>

        </div>
      </section>
    </div>
  );
}