import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const file = formData.get("profilePic") as File;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    let imageUrl = "";

    // 🔥 File handling
    if (file && typeof file !== "string") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 👉 yahan tu local ya cloud (Cloudinary) me upload karega
      // demo ke liye fake path:
      const fileName = `${Date.now()}-${file.name}`;

      const fs = require("fs");
      const path = require("path");

      const uploadDir = path.join(process.cwd(), "public/uploads");

      // 🔥 create folder if not exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, fileName);

      fs.writeFileSync(uploadPath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        ...(imageUrl && { profileImage: imageUrl }), // only update if exists
      },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
