import { connectDB } from "@/lib/config/database/db";
import cloudinary from "@/lib/config/cloudinary";
import order from "@/lib/models/OrderSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const orders = await order.find({})

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders." },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();
    const orderData = JSON.parse(formData.get("orderData") as string);
    const paymentProofFile = formData.get("paymentProof") as File | null;

    const uploadedImages : string[] = []

    if (paymentProofFile && typeof paymentProofFile === "object") {
      const arrayBuffer = await paymentProofFile.arrayBuffer();
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


    // 🔹 Create new order in MongoDB
    const newOrder = await order.create({
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      userDetails: orderData.userDetails,
      notes: orderData.notes,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentProof: uploadedImages[0] || null,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order." },
      { status: 500 }
    );
  }
};

// export const POST = async (req: NextRequest) => {
//   try {
//     await connectDB();
//     const orderData = await req.json();

//     const newOrder = await order.create({
//       ...orderData,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({ success: true, order: newOrder });
//   } catch (error) {
//     console.error("Order creation failed:", error);
//     return NextResponse.json({ success: false, message: "Failed to place order." }, { status: 500 });
//   }
// };