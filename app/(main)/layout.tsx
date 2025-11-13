import "../globals.css";
import Header from "@/components/MainComp/Header";
import Footer from "@/components/MainComp/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <Header />
          {children}
          <Footer />
      </>
  );
}
