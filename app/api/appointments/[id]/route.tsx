import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


import {
  patientTemplate,
  doctorTemplate,
  adminTemplate,
} from "@/lib/emailTemplates";

import { sendMail } from "@/lib/email";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updated = await Appointment.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });


    if (!updated) {
      return Response.json({ error: "Appointment not found" }, { status: 404 });
    }

    console.log("Updated appointment:", updated);    


    if(body.status === "confirmed") {
    // send email safely
    sendMail({
      to: updated?.patientEmail,
      subject: "Appointment Confirmed ✅",
      html: patientTemplate(updated),
    }).catch((err) => console.error("Email failed:", err));
     }




    // return Response.json(updated);
    return Response.json({ message: "success" });
    
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}



// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     if (!id) {
//       return Response.json({ message: "Missing id" }, { status: 400 });
//     }

//     // 🔐 auth (same as your list API)
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return Response.json({ message: "No token" }, { status: 401 });
//     }

//     const user: any = jwt.verify(token, process.env.JWT_SECRET!);

//     const appointment = await Appointment.findById(id).lean();

//     if (!appointment) {
//       return Response.json({ message: "Not found" }, { status: 404 });
//     }

//     // 🔐 SECURITY (VERY IMPORTANT)
//     if (
//       user.userId !== appointment.patientId?.toString() &&
//       user.userId !== appointment.doctorId?.toString() &&
//       user.role !== "admin"
//     ) {
//       return Response.json({ message: "Unauthorized" }, { status: 403 });
//     }

//     return Response.json(appointment);

//   } catch (err: any) {
//     return Response.json({ message: err.message }, { status: 500 });
//   }
// }