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

    console.log("Received appointment booking request with data:", body);

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

    const appointmentTime = new Date(`${body.date}T${body.time}:00`);

      if (appointmentTime < new Date()) {
        return Response.json(
          { message: "Cannot book past time" },
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
        // sendMail({
        //   to: process.env.HOSPITAL_EMAIL,
        //   subject: "New Appointment Booked 🏥",
        //   html: adminTemplate(body),
        // }),
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
// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const page = Number(searchParams.get("page")) || 1;
//     const limit = Number(searchParams.get("limit")) || 10;

//     const skip = (page - 1) * limit;

//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return Response.json({ message: "No token" }, { status: 401 });
//     }

//     const user: any = jwt.verify(token, process.env.JWT_SECRET!);

//     let query: any = {};

//     if (user.role === "admin") {
//       query = {};
//     } else if (user.role === "doctor") {
//       query = { doctorId: user.userId };
//     } else {
//       query = { patientId: user.userId };
//     }

//     // ✅ total count
//     const total = await Appointment.countDocuments(query);

//     // ✅ paginated data
//     const data = await Appointment.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     return Response.json({
//       data,
//       total,
//       page,
//       totalPages: Math.ceil(total / limit),
//     });

//   } catch (err: any) {
//     return Response.json({ message: err.message }, { status: 500 });
//   }
// }

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;
  console.log("Authenticated user in GET /api/appointments:", user);

  let data;

  if (user.role === "admin") {
    data = await Appointment.find().sort({ createdAt: -1 });
  } else if (user.role === "doctor") {
    data = await Appointment.find({ doctorId: user.id });
  } else {
    console.log("Fetching appointments for patient with ID:", user.id);
    data = await Appointment.find({ patientId: user.id });
  }

  console.log("Fetched appointments:123", data);

  return Response.json(data);
}
