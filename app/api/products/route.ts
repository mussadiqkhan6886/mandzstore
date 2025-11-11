import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database/db";
import { Category } from "@/lib/models/ProductSchema";

export const runtime = "nodejs"; // Required for Cloudinary uploads

export const GET = async () => {
  await connectDB();
  try {
    const res = await Category.find({});
    return NextResponse.json({ message: "Fetched Data", data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 400 });
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const mainDescription = formData.get("mainDescription") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const newPrice = Number(formData.get("newPrice")) || null;
    const onSale = formData.get("onSale") === "true"; // formData returns string
    const colors = formData.getAll("colors") as string[];

    const files = formData.getAll("images") as File[];

    const uploadedImages: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "mzstore",
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

    // Check if category exists
    let category = await Category.findOne({ title });

    // Generate product ID
    let newId = 1;
    if (category && category.products.length > 0) {
      const maxId = Math.max(...category.products.map((p) => p.id));
      newId = maxId + 1;
    }

    const newProduct = {
      id: newId,
      name,
      description,
      price,
      newPrice,
      onSale,
      colors,
      images: uploadedImages,
    };

    if (category) {
      // Add product to existing category
      category.products.push(newProduct);
      await category.save();
    } else {
      // Create new category
      category = new Category({
        title,
        slug,
        mainDescription,
        products: [newProduct],
      });
      await category.save();
    }

    return NextResponse.json(
      { success: true, message: "Product added successfully!", data: category },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
