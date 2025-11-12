import { Metadata } from "next";
import "./globals.css";
import { CartContextProvider } from "@/context/CartContext";
import { montserrat } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "M&Z Store | Premium Hijabs, Chaddars & Dupattas Online in Pakistan",
  description:
    "Shop elegant hijabs, chaddars, and dupattas online at MZ Store. Explore premium quality fabrics, stunning designs, and modest fashion crafted for every occasion. Fast nationwide delivery and cash on delivery available!",
  keywords: [
    "hijab online Pakistan",
    "dupatta online Pakistan",
    "chaddar online store",
    "modest wear Pakistan",
    "women hijabs",
    "dupatta collection",
    "chaddar designs",
    "fashion accessories for women",
    "abaya hijab dupatta",
    "MZ Store hijab",
    "buy hijab online",
    "premium dupatta",
    "embroidered dupatta",
    "silk hijab Pakistan",
    "cotton dupatta Pakistan",
  ],
  authors: [{ name: "MZ Store" }],
  creator: "MZ Store",
  publisher: "MZ Store",
  openGraph: {
    title: "MZ Store | Elegant Hijabs, Chaddars & Dupattas Online",
    description:
      "Discover stylish and modest hijabs, chaddars, and dupattas for every occasion. High-quality fabrics, exclusive designs, and fast nationwide delivery from MZ Store.",
    url: "https://mzstore.com", // replace with your real domain
    siteName: "MZ Store",
    images: [
      {
        url: "/og-image.jpg", // path to your store banner
        width: 1200,
        height: 630,
        alt: "MZ Store Hijab & Dupatta Collection",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MZ Store | Hijabs, Chaddars & Dupattas Online in Pakistan",
    description:
      "Shop premium hijabs, chaddars, and dupattas designed for comfort and style. Fast nationwide delivery and cash on delivery available!",
    creator: "@mzstore", // replace with your Twitter handle if any
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CartContextProvider>
        <body className={`antialiased ${montserrat.className}`}>{children}</body>
      </CartContextProvider>
    </html>
  );
}