import cloudinary from "@/lib/config/cloudinary"
import { connectDB } from "@/lib/config/database/db"
import { BannerImg } from "@/lib/models/BannerImage"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    await connectDB()

    try{
        const res = await BannerImg.find({})
        return NextResponse.json({success: true, image: res}, {status: 200})
    }catch(err: any){
        console.log(err)
        return NextResponse.json({success: false, message: err.message}, {status: 404})
    }

}

const uploadToCloudinary = (buffer: Buffer): Promise<any> =>
    new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                { folder: "mzstore", resource_type: "image" },
                (error, result) => (error ? reject(error) : resolve(result))
            )
            .end(buffer)
    })

export const POST = async (req: NextRequest) => {
    await connectDB()

    try {
        const formData = await req.formData()
        const image = formData.get("image") as File
        const title = formData.get("title") as string
        const link = formData.get("link") as string

        if (!image) {
            return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 })
        }
        if (!link && !title) {
            return NextResponse.json({ success: false, message: "No data provided" }, { status: 400 })
        }

        const arrayBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await uploadToCloudinary(buffer)

        const banner = await BannerImg.create({
            image: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            title: title,
            link: link
        })

        return NextResponse.json({ success: true, image: banner }, { status: 201 })
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}

export const DELETE = async (req: NextRequest) => {
    await connectDB()
    try {
        const { publicId } = await req.json()
        await cloudinary.uploader.destroy(publicId)
        await BannerImg.findOneAndDelete({ publicId })
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}