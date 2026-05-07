import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

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

    const collection = formData.get("collection")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const slug = formData.get("slug")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const variantMetaRaw = formData.get("variantMeta")?.toString() || "[]";

    if (!collection || !name || !slug || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const variantMeta: {
      title: string;
      price: number;
      stock: number;
      sku?: string;
      onSale: boolean;
      newPrice: number | null;
    }[] = JSON.parse(variantMetaRaw);

    if (!variantMeta.length) {
      return NextResponse.json(
        { success: false, message: "At least one variant is required" },
        { status: 400 }
      );
    }

    // Upload one image per variant
    const variants = [];
    for (let i = 0; i < variantMeta.length; i++) {
      const file = formData.get(`variantImage_${i}`);
      if (!(file instanceof File)) {
        return NextResponse.json(
          { success: false, message: `Missing image for variant ${i + 1}` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "mzstore", resource_type: "image" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      variants.push({
        ...variantMeta[i],
        image: uploadResult.secure_url,
      });
    }

    const newProduct = new Product({
      collection,
      name,
      slug,
      description,
      variants,
    });

    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully!", data: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

