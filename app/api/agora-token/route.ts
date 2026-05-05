import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel");
  const uid = searchParams.get("uid"); 

  if (!channel || !uid) {
    return Response.json({ error: "Missing params" }, { status: 400 });
  }

  // 🔐 AUTH FROM COOKIE
const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

console.log("cookies:", cookieStore, "extracted token:", token);

console.log("Received request for Agora token with channel:", channel, "and uid:", uid);
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user: any;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  // 👉 get appointment
  const appointmentId = channel.replace("appointment_", "");
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return Response.json({ error: "Appointment not found" }, { status: 404 });
  }

  // 🔐 SECURITY CHECK
  if (
    user.userId !== appointment.patientId.toString() &&
    user.userId !== appointment.doctorId.toString()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  // 🎥 GENERATE TOKEN
  const appId = process.env.AGORA_APP_ID!;
  const appCert = process.env.AGORA_APP_CERTIFICATE!;

  const expire = Math.floor(Date.now() / 1000) + 3600;

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