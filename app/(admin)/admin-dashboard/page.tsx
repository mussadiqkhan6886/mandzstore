import BannerUpload from "@/components/adminComp/BannerImage"
import DeleteBanner from "@/components/adminComp/DeleteBanner"
import { connectDB } from "@/lib/config/database/db"
import { BannerImg } from "@/lib/models/BannerImage"
import Image from "next/image"

// export const revalidate = 60;

const AdminPage = async () => {

  // await connectDB()

  // const res = await BannerImg.find().lean()

  // return (
  //   <main className="min-h-screen bg-gray-50">
  //     <section className="p-5 md:p-8 text-gray-700">
  //       <h2 className="text-lg font-semibold">Welcome to your Admin Dashboard</h2>
  //       <p className="mt-2 text-gray-500">Use the menu above to manage your products, testimonials, orders and etc.</p>
  //     </section>
  //     <section className="px-3 sm:px-4 border-t border-black pt-2">
  //        <h1 className="font-semibold text-3xl md:text-4xl mb-3">Banner Image</h1>
  //        {res.map(item => (
  //           <div key={item.publicId} className="relative text-white">
  //             <Image  src={item.image} alt="image banner" width={500} height={300} className="w-full h-full object-cover" />
  //             <DeleteBanner publicId={item.publicId} />
  //             <h3 className="absolute top-20 md:left-10 font-bold text-xl sm:text-2xl"><span className="font-semibold text-lg">Title: </span> {item.title}</h3>
  //             <p className="absolute md:left-10 top-30 text-xl"><span className="font-semibold text-lg">Link: </span>{item.link}</p>
  //           </div>
  //        ))}
  //        {res.length <= 0 && (<>
  //         <h2 className="font-semibold text-2xl mb-3">Upload Banner</h2>
  //         <BannerUpload />
  //        </>)}
  //     </section>
  //   </main>
  // )
}

export default AdminPage
