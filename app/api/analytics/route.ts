import { connectDB } from "@/lib/config/database/db";
import Order from "@/lib/models/OrderSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().lean();

    // Total Sales
    const totalSales = orders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );

    // Orders This Week
    const now = new Date();
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(now.getDate() - 7);

    const ordersThisWeek = orders.filter((order) => {
      return new Date(order.createdAt) >= sevenDaysAgo;
    }).length;

    // Best Selling Product
    const orderMap: Record<string, number> = {};

    orders.forEach((order) => {
      order.items.forEach((item: any) => {
        orderMap[item.name] =
          (orderMap[item.name] || 0) + item.quantity;
      });
    });

    const bestSellingProduct =
      Object.entries(orderMap).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "N/A";

    // Revenue By Date
    const revenueByDate: Record<string, number> = {};

    orders.forEach((order) => {
      const dateKey = new Date(order.createdAt)
        .toISOString()
        .split("T")[0];

      revenueByDate[dateKey] =
        (revenueByDate[dateKey] || 0) +
        order.totalPrice;
    });

    return NextResponse.json({
      totalSales,
      ordersThisWeek,
      bestSellingProduct,
      revenueByDate,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}