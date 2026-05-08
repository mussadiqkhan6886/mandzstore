  import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/config/cloudinary"
import { Product } from "@/lib/models/ProductSchema"
import { connectDB } from "@/lib/config/database/db"

export const GET = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()
    const {id} = await params
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({message: "Product Found", product}, {status: 200})
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params

  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const slug = formData.get("slug")?.toString();
    const description = formData.get("description")?.toString();
    const collection = formData.get("collection")?.toString();
    const variantMetaRaw = formData.get("variantMeta")?.toString() || "[]";

   const variantMeta: {
  _id?: string;
  title: string;
  price: number;
  stock: number;
  sku?: string;
  onSale: boolean;
  newPrice: number | null;
  existingImages: string[];   // array now
}[] = JSON.parse(variantMetaRaw);

const variants = [];

for (let i = 0; i < variantMeta.length; i++) {
  const meta = variantMeta[i];
  let images: string[] = meta.existingImages ?? [];

  // Collect new uploads for this variant (variantImage_i_0, _1, _2 ...)
  if (images.length === 0) {
    let j = 0;
    const uploaded: string[] = [];
    while (true) {
      const file = formData.get(`variantImage_${i}_${j}`);
      if (!(file instanceof File)) break;
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "mzstore", resource_type: "image" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      uploaded.push(uploadResult.secure_url);
      j++;
    }
    if (uploaded.length > 0) images = uploaded;
  }

  variants.push({
    ...(meta._id && { _id: meta._id }),
    title: meta.title,
    price: meta.price,
    stock: meta.stock,
    sku: meta.sku,
    onSale: meta.onSale,
    newPrice: meta.newPrice,
    image: images,   // schema field is `image: [String]`
  });
}

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, slug, description, collection, variants },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const id = (await params).id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
};
