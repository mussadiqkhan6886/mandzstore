import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/database/db";
import Navbar from "@/lib/models/NavbarSchema";

// ✅ UPDATE NAV ITEM
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
    const {id} = await params
  try {
    const body = await req.json();
    const { title, link, children } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    const updated = await Navbar.findByIdAndUpdate(
      id,
      {
        title,
        link,
        children: children || [],
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
    const {id} = await params
  try {
    const deleted = await Navbar.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};