import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  // 👇 guard + debug
  console.log("params:", params);

  const { id } = params;
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = new Date();

  const duration = appointment.callStartedAt
    ? (now.getTime() -
        new Date(appointment.callStartedAt).getTime()) /
      60000
    : 0;

  await Appointment.findByIdAndUpdate(id, {
    callEnded: true,
    callEndedAt: now,
    callDuration: Math.round(duration),
    status: "completed",
  });

  return Response.json({ success: true });
}