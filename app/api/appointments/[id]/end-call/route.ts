import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ params is Promise
) {
  await connectDB();

  // ✅ FIX: unwrap params
  const { id } = await context.params;

  console.log("Resolved ID:", id);

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // ✅ prevent double end call
  if (appointment.callEnded) {
    return Response.json({ message: "Already ended" });
  }

  if (!appointment.callStartedAt) {
  return Response.json({ message: "Call not started yet" });
  }

  const now = new Date();

  const duration =
    appointment.callStartedAt
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