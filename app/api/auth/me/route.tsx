import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "No token" }, { status: 401 });
    }

    const user: any = jwt.verify(token, process.env.JWT_SECRET!);

    return Response.json({ user: {
      userId: user.userId,
      role: user.role,
      name: user.name,

    } });
 
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}