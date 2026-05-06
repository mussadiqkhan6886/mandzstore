import mongoose, { Schema } from "mongoose";

const bannerImage = new Schema({
    image: {
        type: String,
        required: [true, "Please provide banner image"]
    },
    publicId: { type: String, required: true }, // For Cloudinary/Storage deletion
})

export const BannerImg = mongoose.models.Banner || mongoose.model("Banner", bannerImage)