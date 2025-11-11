import { connectDB } from "@/lib/config/database"
import Product from "@/lib/model/ProductSchema"
import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/config/cloudinary"

export const GET = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()
    const {id} = await params

    const data = await Product.findById(id)

    if(!data){
        return NextResponse.json({message: "Product not found"}, {status: 400})
    }

    return NextResponse.json({message: "Product Found", data}, {status: 200})
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
  const id = (await params).id;

  try {
    const contentType = req.headers.get("content-type");

    // 🧹 Handle image delete separately
    if (contentType?.includes("application/json")) {
      const body = await req.json();
      if (body.action === "deleteImage") {
        await Product.findByIdAndUpdate(id, { $pull: { images: body.imageUrl } });
        return NextResponse.json({ success: true });
      }
    }

    // 🖋️ Handle form update
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const discountPrice = formData.get("discountPrice")
      ? Number(formData.get("discountPrice"))
      : null;
    const category = formData.get("category") as string;
    const size = formData.get("size") as string;
    const ingredients = formData.getAll("ingredients") as string[];
    const benefits = formData.getAll("benefits") as string[];
    const isSale = formData.get("isSale") === "true";
    const inStock = formData.get("inStock") === "true";
    const isNewArrival = formData.get("isNewArrival") === "true";

    // 🖼️ Handle image uploads
    const files = formData.getAll("images") as File[];
    const uploadedImages: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "hairoil" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uploadedImages.push((uploadRes as any).secure_url);
    }

    // 🔹 Fetch existing product to merge images
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Merge existing images with newly uploaded images
    const updatedImages = [...existingProduct.images, ...uploadedImages];

    // Build update object
    const updateQuery = {
      name,
      slug,
      description,
      price,
      discountPrice,
      category,
      size,
      ingredients,
      benefits,
      isSale,
      inStock,
      isNewArrival,
      images: updatedImages, // just overwrite with merged array
    };

    // Update in DB
    const updatedProduct = await Product.findByIdAndUpdate(id, updateQuery, { new: true });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update product", error: err.message },
      { status: 500 }
    );
  }
};





export const DELETE = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB();
    const  id  = (await params).id;
   try {

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
