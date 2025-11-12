import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

export default async function sitemap() {
  const baseUrl = "https://mzstorepk.com/";

  await connectDB();

  // Fetch all unique collections from products
  const collections = await Product.distinct("collection");

  // Build sitemap URLs
  const urls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Add each collection dynamically
    ...collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ];

  return urls;
}
