import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["doctor", "patient", "admin"],
      default: "patient",
    },
    specialization: String,
    age: Number,
    gender: String,
    experience: Number,
    certifications: [String],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);