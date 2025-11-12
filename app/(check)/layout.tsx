import { CartContextProvider } from "@/context/CartContext";
import Link from "next/link";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
    <CartContextProvider>
        <header>
            <Link href={"/"} className={`text-center text-main text-4xl md:text-5xl`}> MandZStore</Link>
        </header>
        {children}
    </CartContextProvider>
    </body>
    </html>
  );
}
