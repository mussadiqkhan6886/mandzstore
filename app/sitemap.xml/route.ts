import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";
import { NextResponse } from "next/server";

type SitemapUrl = {
  loc: string;           // Full URL string
  changefreq: string;    // e.g., "daily", "weekly", "monthly"
  priority: number;      // e.g., 1.0, 0.9
};

interface Variant {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image: string[];
  sku?: string;
  onSale: boolean;
  newPrice: number | null;
}

interface ProductType {
  _id: string;
  collection: string;
  name: string;
  description: string;
  slug: string;
  variants: Variant[];
}

interface reviewType {
  _id: string;
  designation: string;
  name: string;
  message: string;
}

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    const menuRes = await Product.find({}).lean();
    const menuItems: ProductType[] = JSON.parse(JSON.stringify(menuRes));

    // Static pages
    const staticPages = [
      '/',
      '/add-testimonials',
      '/collections',
      '/color-disclaimer',
      '/faq',
      '/terms',
      '/privacy-policy',
      '/refund-policy',
      '/shipping-policy',
      '/terms-service'
    ];

    // Generate sitemap URLs as typed objects
    const urls: SitemapUrl[] = [];

    // Add static pages
    staticPages.forEach(page => {
      urls.push({
        loc: `https://www.mzstorepk.com${page}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    });
    
    menuItems.forEach(item => {
      urls.push({
        loc: `https://www.mzstorepk.com/collections/${item.collection}/${item.slug}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // 1. Get an array of unique category names
    const uniqueCategories = [...new Set(menuItems.map(item => item.collection))];

    // 2. Map those unique categories to your URL objects
    uniqueCategories.forEach(category => {
      urls.push({
        loc: `https://www.mzstorepk.com/collections/${category}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // Generate final XML from typed objects
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new NextResponse("Sitemap generation failed", { status: 500 });
  }
}
