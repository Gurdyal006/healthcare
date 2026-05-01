// "use client";

// import { useState } from "react";
// import axios from "@/lib/axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function CreateDoctorPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     specialization: "",
//     experience: "",
//     gender: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password) {
//       return toast.error("All fields required");
//     }

//     setLoading(true);

//     try {
//       await axios.post("/api/admin/create-doctor", {
//         ...form,
//         experience: Number(form.experience),
//       });

//       toast.success("Doctor created successfully 👨‍⚕️");

//       router.push("/admin-dashboard"); // redirect after create
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold">Add Doctor</h1>
//         <p className="text-gray-500 text-sm">
//           Create new doctor account
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Name */}
//         <input
//           name="name"
//           placeholder="Doctor Name"
//           className="w-full border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         {/* Email */}
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         {/* Password */}
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="w-full border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         {/* Specialization */}
//         <input
//           name="specialization"
//           placeholder="Specialization (e.g. Cardiologist)"
//           className="w-full border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         {/* Experience */}
//         <input
//           name="experience"
//           type="number"
//           placeholder="Experience (years)"
//           className="w-full border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         {/* Gender */}
//         <select
//           name="gender"
//           className="w-full border p-3 rounded-lg"
//           onChange={handleChange}
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
//         >
//           {loading ? "Creating..." : "Create Doctor"}
//         </button>

//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function CreateDoctorPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    gender: "",
  });

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/api/doctors");
      setDoctors(res.data || []);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields required");
    }

    setLoading(true);

    try {
      await axios.post("/api/admin/create-doctor", {
        ...form,
        experience: Number(form.experience),
      });

      toast.success("Doctor created 👨‍⚕️");

      fetchDoctors();

      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
        gender: "",
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Doctor Management 👨‍⚕️
        </h1>
        <p className="text-gray-500 text-sm">
          Add and manage all doctors in your system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT → FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">

          <h2 className="text-xl font-semibold">Add Doctor</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
            <Input label="Password" name="password" value={form.password} onChange={handleChange} type="password" />
            <Input label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} />
            <Input label="Experience (years)" name="experience" value={form.experience} onChange={handleChange} type="number" />

            {/* Gender */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? "Creating..." : "Create Doctor"}
            </button>
          </form>
        </div>

        {/* RIGHT → DOCTOR LIST */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">

          <h2 className="text-xl font-semibold">All Doctors</h2>

          {doctors.length === 0 ? (
            <p className="text-gray-500">No doctors found</p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">

              {doctors.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      {doc.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {doc.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {doc.specialization}
                      </p>
                      <p className="text-xs text-gray-400">
                        {doc.email}
                      </p>
                    </div>
                  </div>

                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    {doc.experience || 0} yrs
                  </span>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// 🔥 Reusable Input
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}