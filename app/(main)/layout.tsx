import { connectDB } from '@/lib/config/database/db';
import Navbar from '@/lib/models/NavbarSchema';
import Header from '@/components/MainComp/Header';
import Footer from '@/components/MainComp/Footer';

export const revalidate = 3600; // this now actually works — it's a route segment

async function getNavbar() {
  await connectDB();
  const data = await Navbar.find({}).lean();
  return JSON.parse(JSON.stringify(data));
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menu = await getNavbar();

  return (
    <>
        <Header menu={menu} />
        {children}
        <Footer />
    </>
  );
}