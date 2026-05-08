import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUserMd,
  FaHeartbeat,
  FaSearch,
} from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 Years",
    rating: 4.9,
    patients: "10k+",
    location: "London Medical Center",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Michael Smith",
    specialty: "Neurologist",
    experience: "10 Years",
    rating: 4.8,
    patients: "8k+",
    location: "Royal Healthcare",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    experience: "9 Years",
    rating: 4.7,
    patients: "7k+",
    location: "City Children Hospital",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic",
    experience: "15 Years",
    rating: 4.9,
    patients: "15k+",
    location: "Elite Bone Clinic",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Dr. Olivia Brown",
    specialty: "Dermatologist",
    experience: "8 Years",
    rating: 4.8,
    patients: "6k+",
    location: "SkinCare Hospital",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Dr. Daniel Lee",
    specialty: "General Physician",
    experience: "11 Years",
    rating: 4.9,
    patients: "11k+",
    location: "Prime Health Clinic",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop",
  },
];

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 py-24">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-xl mb-6">
            <FaHeartbeat />
            Trusted Medical Specialists
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            Doctor Discovery
            <span className="block">Find trusted specialists based on your symptoms.</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Connect with experienced healthcare professionals and book appointments easily.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl p-3 shadow-2xl flex items-center gap-3">
            <FaSearch className="text-slate-400 text-xl ml-3" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="w-full outline-none text-slate-700 text-lg"
            />
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="text-cyan-500 font-semibold uppercase tracking-[4px] text-sm">
              Our Specialists
            </p>
            <h2 className="text-4xl lg:text-5xl font-black mt-3">
              Professional Doctors
            </h2>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium">
              All
            </button>
            <button className="px-5 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition">
              Cardiology
            </button>
            <button className="px-5 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition">
              Neurology
            </button>
            <button className="px-5 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition">
              Pediatrics
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700"
                />

                <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl flex items-center gap-2 shadow-lg">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold text-sm">
                    {doctor.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm mb-3">
                  <FaUserMd />
                  Specialist Doctor
                </div>

                <h3 className="text-2xl font-black">
                  {doctor.name}
                </h3>

                <p className="text-blue-600 font-semibold mt-2 text-lg">
                  {doctor.specialty}
                </p>

                <div className="mt-6 space-y-4 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Experience</span>
                    <span className="font-bold text-slate-900">
                      {doctor.experience}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Patients</span>
                    <span className="font-bold text-slate-900">
                      {doctor.patients}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 pt-2">
                    <FaMapMarkerAlt />
                    {doctor.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">             
                  {/* <Link
                     // href={`/appointments/create?doctor=${doctor.id}`}
                     href={'/appointments/create'}
                      className="py-3 rounded-2xl border border-slate-200 font-semibold hover:border-blue-500 hover:text-blue-600 transition text-center"
                    >
                      Book Now
                    </Link> */}

                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-center hover:opacity-90 transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
