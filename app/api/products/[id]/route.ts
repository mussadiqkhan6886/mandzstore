  import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/config/cloudinary"
import { Category } from "@/lib/models/ProductSchema"
import { connectDB } from "@/lib/config/database/db"
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding"

export const GET = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()
    const {id} = await params
    const category = await Category.findOne({ "products._id": id });
    if (!category) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const product = category.products.id(id); // Mongoose helper to find subdocument by _id

    if(!product){
        return NextResponse.json({message: "Product not found"}, {status: 400})
    }

    return NextResponse.json({message: "Product Found", product}, {status: 200})
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
  const id = (await params).id;

  try {
    const contentType = req.headers.get("content-type");

    // 1️⃣ Handle image deletion
    if (contentType?.includes("application/json")) {
      const body = await req.json();
      if (body.action === "deleteImage") {
        const { imageUrl } = body;
        if (!imageUrl) throw new Error("No imageUrl provided");

        // Find category containing product
        const category = await Category.findOne({ "products._id": id });
        if (!category) throw new Error("Product not found");

        const product = category.products.id(id);
        if (!product) throw new Error("Product not found in category");

        product.images = product.images.filter(img => img !== imageUrl);
        await category.save();

        return NextResponse.json({ success: true, message: "Image deleted successfully" });
      }
    }

    // 2️⃣ Handle form data update
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const newPrice = formData.get("newPrice") ? Number(formData.get("newPrice")) : null;
    const onSale = formData.get("onSale") === "true";
    const colors = formData.getAll("colors") as string[];

    const files = formData.getAll("images") as File[];
    const uploadedImages: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "mzstore" }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }).end(buffer);
      });
      uploadedImages.push((uploadRes as any).secure_url);
    }

    // Find category containing the product
    const category = await Category.findOne({ "products._id": id });
    if (!category) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });

    const product = category.products.id(id);
    if (!product) return NextResponse.json({ success: false, message: "Product not found in category" }, { status: 404 });

    // Update product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.newPrice = newPrice;
    product.onSale = onSale;
    product.colors = colors;
    product.images = [...product.images, ...uploadedImages]; // merge new images

    await category.save();

    return NextResponse.json({ success: true, message: "Product updated successfully", product });
  } catch (err: any) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update product", error: err.message },
      { status: 500 }
    );
  }
};







export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const id = (await params).id;

  try {
    // Find the category containing the product
    const category = await Category.findOne({ "products._id": id });

    if (!category) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Remove the product from the products array
    category.products = category.products.filter((prod) => prod._id.toString() !== id);

    // Save the updated category
    await category.save();

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
};
