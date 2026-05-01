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

    // 👨‍⚕️ Doctor Fields
    specialization: String,
    experience: Number,
    certifications: [String],

    // 👤 Common Profile
    age: Number,
    gender: String,

    // 🖼️ Profile Image (IMPORTANT)
    profileImage: {
      type: String,
      default: "",
    },

    // 🏥 Optional Professional Fields
    clinicName: String,
    consultationFee: Number,

    // ⭐ Future Ready
    rating: {
      type: Number,
      default: 0,
    },

    // 🔐 Security (optional but recommended)
    mustChangePassword: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);