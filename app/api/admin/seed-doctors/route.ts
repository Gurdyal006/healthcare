import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();

  const password = await bcrypt.hash("123456", 10);

  const doctors = [
    {
      name: "Dr. Amit Sharma",
      email: "amit1@health.com",
      specialization: "General Physician",
      experience: 5,
      gender: "male",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Neha Mehta",
      email: "neha1@health.com",
      specialization: "Dermatologist",
      experience: 7,
      gender: "female",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Raj Gupta",
      email: "raj1@health.com",
      specialization: "Orthopedic",
      experience: 10,
      gender: "male",
      profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "Dr. Priya Singh",
      email: "priya1@health.com",
      specialization: "Gynecologist",
      experience: 8,
      gender: "female",
      profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Dr. Arjun Verma",
      email: "arjun1@health.com",
      specialization: "Neurologist",
      experience: 12,
      gender: "male",
      profileImage: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    {
      name: "Dr. Kavita Reddy",
      email: "kavita@health.com",
      specialization: "Pediatrician",
      experience: 6,
      gender: "female",
      profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Dr. Rohit Malhotra",
      email: "rohit@health.com",
      specialization: "Cardiologist",
      experience: 15,
      gender: "male",
      profileImage: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      name: "Dr. Sneha Kapoor",
      email: "sneha@health.com",
      specialization: "Psychiatrist",
      experience: 9,
      gender: "female",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  for (let doc of doctors) {
    const exists = await User.findOne({ email: doc.email });

    if (!exists) {
      await User.create({
        ...doc,
        password,
        role: "doctor",
      });
    }
  }

  return Response.json({
    message: "Dummy doctors added successfully ✅",
  });
}