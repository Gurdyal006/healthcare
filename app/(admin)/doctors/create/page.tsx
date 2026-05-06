
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { SPECIALIZATIONS } from "@/lib/constants";
import ProfileImage from "@/components/ProfileImage";

export default function CreateDoctorPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    //password: "",
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

    if (!form.name || !form.email || !form.specialization || !form.experience || !form.gender) {
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
        //password: "",
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

     

      {/* 🔷 TOP → FORM */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
  <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>

  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
    <Input label="Email" name="email" value={form.email} onChange={handleChange} />
   {/* <Input label="Password" name="password" value={form.password} onChange={handleChange} /> */}

    {/* Specialization */}
    <div>
              <label className="text-sm text-gray-600">
                Specialization
              </label>

              <select
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Specialization</option>

                {SPECIALIZATIONS.map((sp) => (
                  <option key={sp} value={sp}>
                    {sp}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <label className="text-sm text-gray-600">Experience</label>

            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full mt-1 border p-3 rounded-lg"
            >
              <option value="">Select Experience</option>

              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="5">5 Years</option>
              <option value="10">10 Years</option>

            </select>
          </div>

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

   <div className="col-span-full flex justify-end">
  <button
    type="submit"
    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
  >
    {loading ? "Creating..." : "Create Doctor"}
  </button>
</div>
  </form>
</div>

{/* 🔷 BOTTOM → DOCTOR CARDS */}
 <h2 className="text-xl font-semibold mb-4">Doctors</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 
  {doctors.map((doc) => (
    <div
      key={doc._id}
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
    >
      <div className="flex items-center gap-3 mb-3">
        {/* <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
          {doc.name?.charAt(0)}
        </div> */}
                <ProfileImage
                  src={doc?.profileImage}
                  name={doc?.name}
                  className="w-20 h-20 border-4 border-white"
                />

        <div>
          <p className="font-semibold">{doc.name}</p>
          <p className="text-sm text-gray-500">{doc.specialization}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500">{doc.email}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {doc.experience || 0} yrs
        </span>

        <button className="text-sm text-indigo-600 hover:underline">
          View
        </button>
      </div>
    </div>
  ))}
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