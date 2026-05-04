import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import mongoose from "mongoose";
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

    // send email safely
    sendMail({
      to: updated?.patientEmail,
      subject: "Appointment Confirmed ✅",
      html: patientTemplate(updated),
    }).catch((err) => console.error("Email failed:", err));



    return Response.json(updated);
    
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}