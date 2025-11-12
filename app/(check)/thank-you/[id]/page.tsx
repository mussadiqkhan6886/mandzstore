import { connectDB } from "@/lib/config/database";
import order from "@/lib/model/OrderSchema";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

interface ItemType {
  _id: number
  image: string
  name: string
  quantity: number
  price: number

}

const ThankYouPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;


  await connectDB()
    const res = await order.findOne({ _id: id });
    const data = JSON.parse(JSON.stringify(res))
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-5">
      <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-2xl w-full">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully. We’ll contact you shortly to
          confirm your details.
        </p>

        {/* ✅ Order Summary */}
        <div className="text-left border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Order Summary
          </h2>

          <p className="text-gray-700 mb-1">
            <strong>Order ID:</strong> {data._id}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Name:</strong> {data.userDetails.fullName}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {data.userDetails.email}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Address:</strong> {data.shippingAddress.address}
          </p>

          {/* ✅ Items List */}
          <div className="space-y-3">
            {data.items?.map((item: ItemType) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    width={120}
                    height={120}
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × Rs.{item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  Rs.{item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Shipping Cost</p>
            <p className="font-semibold">250</p>
            </div>
          <div className="mt-4 border-t pt-3 text-right">
            <p className="text-lg font-bold text-gray-800">
              Total: Rs.{data.totalPrice}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/"
            className="block w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
