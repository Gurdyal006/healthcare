import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

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