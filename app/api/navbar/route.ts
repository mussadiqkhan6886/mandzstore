import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/database/db";
import Navbar from "@/lib/models/NavbarSchema";

export const GET = async () => {
  await connectDB();

  try {
    const data = await Navbar.find().lean();

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};


export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();

    const { title, link, children } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    const newNav = await Navbar.create({
      title,
      link,
      children: children || [],
    });

    return NextResponse.json({ success: true, data: newNav });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
