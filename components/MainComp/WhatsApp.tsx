import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "923154955421";
  const message = "Hi! I saw your website and want to know more about your products.";

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 p-1.5 z-50 text-white rounded-full shadow-md hover:bg-green-600 transition fixed bottom-10 right-10"
    >
      <FaWhatsapp aria-label="whatsapp button click to go to whatsapp message" size={40} />
    </Link>
  );
}
