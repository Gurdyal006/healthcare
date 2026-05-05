"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {


const res = await axios.post("/api/auth/login", form);
const userRes = await axios.get("/api/auth/me");

const user = userRes.data.user;

console.log("Logged in user:", user);

 if (user.role === "admin") {
   router.push("/admin-dashboard");     
 } else if (user.role === "doctor") {
  router.push("/dashboard");
} else {
  router.push("/profile");
}

// const res = await axios.post("/api/auth/login", form);

// const user = res.data.user;

// if (userRes.data.user.role === "doctor") {
//   router.push("/dashboard");
// } else {
//   router.push("/profile");
// }


// // if (user.role === "admin") {
// //   router.push("/admin-dashboard");        // 🔥 admin panel
// // } else if (user.role === "doctor") {
// //   router.push("/dashboard");    // doctor
// // } else {
// //   router.push("/profile");      // patient
// // }

    toast.success("Login successful 🎉");

  } catch (err: any) {
    console.log("Login error:", err);
    toast.error(err.response?.data?.message || "Login failed");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center flex-col p-10"
      >

   <motion.h1
      className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
    }}
    >
      HealthCare
    </motion.h1>

        {/* <h1 className="text-4xl font-bold mb-4">HealthCare</h1> */}
        {/* <p className="text-lg text-blue-100 text-center max-w-md">
          Manage patients, appointments, and reports in one powerful dashboard.
        </p> */}
        <motion.p
  className="text-lg text-blue-100 text-center max-w-md"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
>
  Manage patients, appointments, and reports in one powerful dashboard.
</motion.p>
      </motion.div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 text-sm text-center mt-1">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Animated Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}