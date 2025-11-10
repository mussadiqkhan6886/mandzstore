import Header from "@/components/adminComp/Header";
import { montserrat } from "@/lib/fonts";
import "@/app/globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <body
            className={`antialiased ${montserrat.className}`}
          >
            <Header />
            {children}
          </body>
        </html>
  );
}
