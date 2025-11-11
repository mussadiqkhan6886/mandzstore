import { connectDB } from "@/lib/config/database";
import Product from "@/lib/model/ProductSchema";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary"


export const runtime = "nodejs"; // Required for Cloudinary uploads


export const GET = async () => {
  await connectDB();
  try {
    const res = await Product.find({});
    return NextResponse.json({ message: "Fetched Data", data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 400 });
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const size = formData.get("size") as string;
    const ingredients = formData.getAll("ingredients") as string[];
    const benefits = formData.getAll("benefits") as string[];

    // Extract image files
    const files = formData.getAll("images") as File[];

    const uploadedImages: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "hairoil",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      uploadedImages.push(uploadResult.secure_url);
    }

    // Create product in MongoDB
    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      ingredients,
      benefits,
      size,
      slug,
      images: uploadedImages,
    });

    return NextResponse.json(
      { success: true, message: "Product uploaded successfully!", data: newProduct },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
