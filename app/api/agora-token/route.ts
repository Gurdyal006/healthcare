import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel");
  const uid = searchParams.get("uid");

  if (!channel || !uid) {
    return Response.json({ error: "Missing params" }, { status: 400 });
  }

  // ✅ NextAuth token (already decoded)
  const token: any = await getToken({ req });

  console.log("NextAuth token:", token);

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 👉 get appointment
  const appointmentId = channel.replace("appointment_", "");
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return Response.json({ error: "Appointment not found" }, { status: 404 });
  }

  // 🔐 SECURITY CHECK (use token.id instead of user.userId)
  if (
    token.id !== appointment.patientId.toString() &&
    token.id !== appointment.doctorId.toString()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  // 🎥 GENERATE AGORA TOKEN
  const tokenAgora = RtcTokenBuilder.buildTokenWithAccount(
    process.env.AGORA_APP_ID!,
    process.env.AGORA_APP_CERTIFICATE!,
    channel,
    uid, // string UID
    RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + 3600
  );

  return Response.json({ token: tokenAgora });
}