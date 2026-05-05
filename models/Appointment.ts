import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    patientName: String,
    patientId: String,
    patientEmail: String,

    problem: String,

    doctor: String,
    doctorId: String,
    doctorEmail: String,

    date: String,
    time: String,
    symptoms: [String],

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "rescheduled"],
      default: "pending",
    },
    meetingStarted: {
        type: Boolean,
        default: false,
      },
      appointmentDateTime: {
        type: Date,
        required: true,
      }
  },
  { timestamps: true }
);

AppointmentSchema.index({ doctorId: 1 });
AppointmentSchema.index({ patientId: 1 });
AppointmentSchema.index({ createdAt: -1 });

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

