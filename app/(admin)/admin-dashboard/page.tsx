import BannerUpload from "@/components/adminComp/BannerImage"
import DeleteBanner from "@/components/adminComp/DeleteBanner"
import { connectDB } from "@/lib/config/database/db"
import { BannerImg } from "@/lib/models/BannerImage"
import Image from "next/image"

export const revalidate = 60;

const AdminPage = async () => {

  await connectDB()

  const res = await BannerImg.find().lean()

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="p-8 text-gray-700">
        <h2 className="text-lg font-medium">Welcome to your Admin Dashboard</h2>
        <p className="mt-2 text-gray-500">Use the menu above to manage your products, testimonials, and orders.</p>
      </section>
      <section className="px-4 border-t border-black pt-2">
         <h1 className="font-semibold text-4xl mb-3">Banner Image</h1>
         {res.map(item => (
          <div key={item.publicId} className="relative">
          <Image  src={item.image || "/main_hero_large.jpg"} alt="image banner" width={500} height={300} className="w-full h-full object-cover" />
          <DeleteBanner publicId={item.publicId} />
          </div>
         ))}
         {res.length <= 0 && (<>
          <h2>Upload Image</h2>
          <BannerUpload />
         </>)}
      </section>
    </main>
  )
}

export default AdminPage
