import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  patientTemplate,
  doctorTemplate,
  adminTemplate,
} from "@/lib/emailTemplates";

import { sendMail } from "@/lib/email";

// CREATE
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const exists = await Appointment.findOne({
      doctorId: body.doctorId,
      doctor: body.doctor,
      date: body.date,
      time: body.time,
      appointmentDateTime: new Date(`${body.date}T${body.time}:00`),
      status: { $ne: "cancelled" },
    });

    if (exists) {
      return Response.json(
        { message: "Slot already booked" },
        { status: 400 }
      );
    }

    console.log("Creating appointment with data:", body);
    const saved = await Appointment.create(body);
    console.log("Appointment created successfully:", saved);

// SEND EMAILS -- doctor, patient, admin

    console.log("Sending emails to:", {
      //patient: body.patientEmail,
      doctor: body.doctorEmail,
      admin: process.env.HOSPITAL_EMAIL,
    });
        try {
      await Promise.all([
        // sendMail({
        //   to: body.patientEmail,
        //   subject: "Appointment Confirmed ✅",
        //   html: patientTemplate(body),
        // }),
        sendMail({
          to: body.doctorEmail,
          subject: "New Appointment Request 📅",
          html: doctorTemplate(body),
        }),
        sendMail({
          to: process.env.HOSPITAL_EMAIL,
          subject: "New Appointment Booked 🏥",
          html: adminTemplate(body),
        }),
      ]);
    } catch (e) {
      console.log("Email failed:");
    }

    return Response.json(saved);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

// GET (ROLE BASED)

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  let data;

  if (user.role === "admin") {
    data = await Appointment.find().sort({ createdAt: -1 });
  } else if (user.role === "doctor") {
    data = await Appointment.find({ doctorId: user.id });
  } else {
    data = await Appointment.find({ patientId: user.id });
  }

  return Response.json(data);
}
