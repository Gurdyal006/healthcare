import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function GET() {
  try {
    await connectDB();

    const data = await User.find({ role: "patient" })
                //.select("name specialization email _id profileImage experience gender");

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}