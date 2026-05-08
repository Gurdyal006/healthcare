import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";




// ✅ GET SINGLE DOCTOR
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid doctor ID" },
        { status: 400 }
      );
    }

    // Find doctor
    const doctor = await User.findById(id);

    if (!doctor) {
      return Response.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return Response.json(doctor);

  } catch (err: any) {

    console.log(err);

    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid ID" }, { status: 400 });
    }

    await User.findByIdAndDelete(id);

    return Response.json({ message: "Doctor deleted" });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}