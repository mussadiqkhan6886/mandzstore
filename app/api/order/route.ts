import { connectDB } from "@/lib/config/database/db";
import cloudinary from "@/lib/config/cloudinary";
import order from "@/lib/models/OrderSchema";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Product } from "@/lib/models/ProductSchema";

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


  for (const item of orderData.items) {
    const product = await Product.findById(item.id);
    if (!product) continue;

    // Find the variant by matching the title stored in selectedColor
    const variantIndex = product.variants.findIndex(
      (v: any) => v.title === item.selectedColor
    );

    if (variantIndex === -1) continue;

    const currentStock = product.variants[variantIndex].stock;
    const newStock = Math.max(0, currentStock - item.quantity);

    // Use positional $ or direct index update via arrayFilters
    await Product.findByIdAndUpdate(
      item.id,
      {
        $set: {
          [`variants.${variantIndex}.stock`]: newStock,
        },
      }
    );
  }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const html = `
  <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      
      <h2 style="color:#333;">New Order Received</h2>
      <p style="color:#555;">A new order has been placed on your store.</p>

      <hr />

      <h3>📦 Order Details</h3>
      <p><strong>Order ID:</strong> ${newOrder.orderId.slice(0,7)}</p>
      <p><strong>Total:</strong> Rs. ${newOrder.totalPrice}</p>
      <p><strong>Payment Method:</strong> ${newOrder.paymentMethod}</p>

      <hr />

      <h3>👤 Customer Info</h3>
      <p><strong>Name:</strong> ${newOrder.userDetails.fullName}</p>
      <p><strong>Phone:</strong> ${newOrder.userDetails.phone}</p>
      <p><strong>Email:</strong> ${newOrder.userDetails.email || "N/A"}</p>

      <hr />

      <h3>📍 Shipping Address</h3>
      <p>
        ${newOrder.shippingAddress.address},<br/>
        ${newOrder.shippingAddress.city} - ${newOrder.shippingAddress.postalCode}
      </p>

      <hr />

      <h3>🧾 Items</h3>
      <table width="100%" style="border-collapse: collapse;">
        <thead>
          <tr style="background:#f2f2f2;">
            <th align="left">Image</th>
            <th align="left">Product</th>
            <th align="center">Qty</th>
            <th align="right">Price</th>
          </tr>
        </thead>
        <tbody>
          ${newOrder.items.map((item: any) => `
            <tr>
              <td>
                <img 
                  src="${item.images}" 
                  alt="product image" 
                  width="50" 
                  height="50"
                  style="border-radius:6px; object-fit:cover;"
                />
              </td>
              <td>
                ${item.name} ${item.selectedColor ? `(${item.selectedColor})` : ""}
              </td>
              <td align="center">${item.quantity}</td>
              <td align="right">Rs. ${item.newPrice || item.price}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <hr />

      ${
        newOrder.notes
          ? `<p><strong>📝 Notes:</strong> ${newOrder.notes}</p>`
          : ""
      }

      <div style="text-align:center; margin-top:20px;">
        <a href="https://www.mzstorepk.com/admin-dashboard"
          style="background:#000; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px;">
          View Order in Dashboard
        </a>
      </div>

      <p style="margin-top:20px; font-size:12px; color:#888;">
        This is an automated message from MZ Store.
      </p>

    </div>
  </div>
`;

    // maaz52364@gmail.com
    // 3️⃣ Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "maaz52364@gmail.com", // admin email
      subject: `New Order`,
      html,
    };

    const customerHtml = `
  <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">

      <h2 style="color:#333;">🎉 Order Confirmed!</h2>
      <p style="color:#555;">
        Hi ${newOrder.userDetails.fullName},<br/><br/>
        Thank you for your order! Your order has been successfully placed.
      </p>

      <hr />

      <h3>📦 Order Summary</h3>
      <p><strong>Order ID:</strong> ${newOrder.orderId.slice(0,7)}</p>
      <p><strong>Total Amount:</strong> Rs. ${newOrder.totalPrice}</p>
      <p><strong>Payment Method:</strong> ${newOrder.paymentMethod.toUpperCase()}</p>

      <hr />

      <h3>🧾 Items</h3>
      <table width="100%" style="border-collapse: collapse;">
        <thead>
          <tr style="background:#f2f2f2;">
            <th align="left">Image</th>
            <th align="left">Product</th>
            <th align="center">Qty</th>
            <th align="right">Price</th>
          </tr>
        </thead>
        <tbody>
          ${newOrder.items.map((item: any) => `
            <tr>
              <td>
                <img 
                  src="${item.images}" 
                  width="50" 
                  height="50"
                  style="border-radius:6px; object-fit:cover;"
                />
              </td>
              <td>
                ${item.name} ${item.selectedColor ? `(${item.selectedColor})` : ""}
              </td>
              <td align="center">${item.quantity}</td>
              <td align="right">Rs. ${item.newPrice || item.price}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <hr />

      <h3>📍 Shipping Address</h3>
      <p>
        ${newOrder.shippingAddress.address},<br/>
        ${newOrder.shippingAddress.city} - ${newOrder.shippingAddress.postalCode}
      </p>

      ${
        newOrder.notes
          ? `<p><strong>📝 Notes:</strong> ${newOrder.notes}</p>`
          : ""
      }

      <hr />

      <p style="color:#555;">
        We’ll notify you when your order is shipped 🚚
      </p>

      <div style="text-align:center; margin-top:20px;">
        <a href="https://www.mzstorepk.com"
          style="background:#000; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px;">
          Continue Shopping
        </a>
      </div>

      <p style="margin-top:20px; font-size:12px; color:#888;">
        If you have any questions, contact us at 
        <a href="mailto:maaz52364@gmail.com">maaz52364@gmail.com</a>
      </p>

    </div>
  </div>
`;

await transporter.sendMail({
  from: `"MZ Store" <${process.env.EMAIL_USER}>`,
  to: newOrder.userDetails.email, // customer email
  subject: `🎉 Order Confirmed #${newOrder.orderId.slice(0,7)}`,
  html: customerHtml,
});

    // 4️⃣ Send email
    await transporter.sendMail(mailOptions);

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

