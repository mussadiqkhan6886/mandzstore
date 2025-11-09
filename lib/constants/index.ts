import { delay } from "framer-motion";
import { FiCreditCard, FiHeart, FiStar, FiTruck } from "react-icons/fi";

export const upperHeaderData = [
    "Free Shipping above RS 4500",
    "Hassle-Free Returns",
    "15000+ Orders, 1000+ 5⭐ Reviews"
]


export const trustData = [
  {
    icon: FiHeart,
    heading: "150,000+ Orders Delivered",
    desc: "Trusted by modest wear lovers worldwide.",
  },
  {
    icon: FiTruck,
    heading: "Fast Nationwide Delivery",
    desc: "Swift Delivery. Seamless Support. Tailored for You.",
  },
  {
    icon: FiCreditCard,
    heading: "COD Available",
    desc: "Secure your order now and pay when it arrives.",
  },
  {
    icon: FiStar,
    heading: "Premium Quality",
    desc: "From fit to fabric, your voice shapes everything we create.",
  },
];

export const byCollection = [
    {image: "/collectiondemo.jpg", link: "#" , title: "Georgette"},
    {image: "/collectiondemo.jpg", link: "#" , title: "Lawn"},
    {image: "/collectiondemo.jpg", link: "#" , title: "Silk"},
    {image: "/collectiondemo.jpg", link: "#" , title: "Jersey"},
    {image: "/collectiondemo.jpg", link: "#" , title: "Chiffon"},
]

export const essentials = [
    {image: "/essentials.jpg", link: "#", title: "Magnets and Pins"},
    {image: "/essentials.jpg", link: "#", title: "Underscarves"},
    {image: "/essentials.jpg", link: "#", title: "Scrunchies"},
    {image: "/essentials.jpg", link: "#", title: "Niqab"},
]

export const reviews = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "Customer",
    review: "Absolutely love the quality! Delivery was fast and the product exceeded my expectations.",
  },
  {
    id: 2,
    name: "Omar Malik",
    role: "Verified Buyer",
    review: "Great experience. The website is easy to use and support was very responsive.",
  },
  {
    id: 3,
    name: "Sana Ali",
    role: "Customer",
    review: "Beautiful packaging and excellent fabric. Will definitely order again.",
  },
  {
    id: 4,
    name: "Ahmed Raza",
    role: "Customer",
    review: "Customer service was amazing. They helped me choose the right size perfectly.",
  },
  {
    id: 5,
    name: "Fatima Noor",
    role: "Verified Buyer",
    review: "The quality feels premium and fits really well. Highly recommended!",
  },
  {
    id: 6,
    name: "Bilal Hussain",
    role: "Customer",
    review: "Loved it! True to description and delivery was right on time.",
  },
  {
    id: 7,
    name: "Zara Imtiaz",
    role: "Customer",
    review: "Simple, elegant and exactly what I wanted. Great job!",
  },
  {
    id: 8,
    name: "Hassan Qureshi",
    role: "Verified Buyer",
    review: "Good experience overall. Great prices and fast delivery.",
  },
  {
    id: 9,
    name: "Maryam Javed",
    role: "Customer",
    review: "Amazing service, quality and support. I’ll definitely recommend to friends.",
  },
];

export const sidebarData = [
  { title: "Home", link: "/", delay: 0.1 },

  {
    title: "Dupatta",
    delay: 0.2,
    children: [
      { title: "Chiffon Dupatta", link: "/collections/dupatta-chiffon" },
      { title: "Lawn Cutwork Dupatta", link: "/collections/dupatta-lawn-cutwork" },
      { title: "Jackard Dupatta", link: "/collections/dupatta-jackard" },
      { title: "Organza Dupatta", link: "/collections/dupatta-organza" },
      { title: "Silk Dupatta", link: "/collections/dupatta-silk" },
      { title: "Four Sided Border Dupatta", link: "/collections/dupatta-four-sided-border" },
      { title: "Fancy Dupatta", link: "/collections/dupatta-fancy" },
    ],
  },

  {
    title: "Hijab",
    delay: 0.3,
    children: [
      { title: "Silk Hijab", link: "/collections/hijab-silk" },
      { title: "Lawn Hijab", link: "/collections/hijab-lawn" },
      { title: "Georgette Hijab", link: "/collections/hijab-georgette" },
    ],
  },

  { title: "Chaddar", link: "/collections/chaddar", delay: 0.4 },

  { title: "Blog", link: "/blog", delay: 0.5 },
];


export const collectionsPage = [
  // Dupatta Collections
  { title: "Chiffon Dupatta", link: "/collections/dupatta-chiffon", image: "/collectiondemo.jpg", delay: 0.1 },
  { title: "Lawn Cutwork Dupatta", link: "/collections/dupatta-lawn-cutwork", image: "/collectiondemo.jpg", delay: 0.2 },
  { title: "Jackard Dupatta", link: "/collections/dupatta-jackard", image: "/collectiondemo.jpg", delay: 0.3 },
  { title: "Organza Dupatta", link: "/collections/dupatta-organza", image: "/collectiondemo.jpg", delay: 0.4 },
  { title: "Silk Dupatta", link: "/collections/dupatta-silk", image: "/collectiondemo.jpg", delay: 0.5 },
  { title: "Four Sided Border Dupatta", link: "/collections/dupatta-four-sided-border", image: "/collectiondemo.jpg", delay: 0.6 },
  { title: "Fancy Dupatta", link: "/collections/dupatta-fancy", image: "/collectiondemo.jpg", delay: 0.7 },

  // Hijab Collections
  { title: "Silk Hijab", link: "/collections/hijab-silk", image: "/collectiondemo.jpg", delay: 0.8 },
  { title: "Lawn Hijab", link: "/collections/hijab-lawn", image: "/collectiondemo.jpg", delay: 0.9 },
  { title: "Georgette Hijab", link: "/collections/hijab-georgette", image: "/collectiondemo.jpg", delay: 1.0 },

  // Chaddar Collection
  { title: "Chaddar", link: "/collections/chaddar", image: "/collectiondemo.jpg", delay: 1.1 },
];


export const collectionsData = [
  {
    title: "Chiffon Dupatta",
    slug: "dupatta-chiffon",
    desc: "Lightweight, elegant, and perfect for both casual and festive wear — our chiffon dupattas add effortless grace to any outfit.",
    products: [
      {
        id: 1,
        name: "Sheer Elegance Chiffon Dupatta",
        price: 1799,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 2,
        name: "Classic Plain Chiffon Dupatta",
        price: 1699,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 3,
        name: "Luxury Embroidered Chiffon Dupatta",
        price: 1999,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Lawn Cutwork Dupatta",
    slug: "dupatta-lawn-cutwork",
    desc: "Soft lawn dupattas with delicate cutwork details, designed for comfort and breathable elegance.",
    products: [
      {
        id: 4,
        name: "Pastel Cutwork Lawn Dupatta",
        price: 1599,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 5,
        name: "Embroidered Edge Lawn Dupatta",
        price: 1499,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 6,
        name: "Soft Breeze Lawn Dupatta",
        price: 1399,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Jackard Dupatta",
    slug: "dupatta-jackard",
    desc: "Richly woven jacquard dupattas with subtle patterns — a timeless symbol of luxury and tradition.",
    products: [
      {
        id: 7,
        name: "Classic Jackard Dupatta",
        price: 1899,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 8,
        name: "Golden Weave Jackard Dupatta",
        price: 1999,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 9,
        name: "Textured Jackard Dupatta",
        price: 1799,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Organza Dupatta",
    slug: "dupatta-organza",
    desc: "Sheer, glossy organza dupattas that bring a touch of glamour to festive and formal looks.",
    products: [
      {
        id: 10,
        name: "Elegant Sheer Organza Dupatta",
        price: 2099,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 11,
        name: "Crystal Touch Organza Dupatta",
        price: 2299,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 12,
        name: "Luxe Embroidered Organza Dupatta",
        price: 2499,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Silk Dupatta",
    slug: "dupatta-silk",
    desc: "Smooth and lustrous silk dupattas — perfect for festive, wedding, or statement occasions.",
    products: [
      {
        id: 13,
        name: "Pure Soft Silk Dupatta",
        price: 1999,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 14,
        name: "Luxury Printed Silk Dupatta",
        price: 2199,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 15,
        name: "Everyday Smooth Silk Dupatta",
        price: 1799,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Four Sided Border Dupatta",
    slug: "dupatta-four-sided-border",
    desc: "Beautifully bordered dupattas with detailed lace or embroidery along all four sides.",
    products: [
      {
        id: 16,
        name: "Classic Border Dupatta",
        price: 1599,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 17,
        name: "Elegant Four-Side Border Dupatta",
        price: 1799,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 18,
        name: "Premium Lace Border Dupatta",
        price: 1899,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Fancy Dupatta",
    slug: "dupatta-fancy",
    desc: "Shimmery and festive dupattas crafted for parties, events, and celebrations.",
    products: [
      {
        id: 19,
        name: "Festive Fancy Dupatta",
        price: 2499,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 20,
        name: "Shimmery Net Fancy Dupatta",
        price: 2299,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 21,
        name: "Party Wear Fancy Dupatta",
        price: 2599,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Silk Hijab",
    slug: "hijab-silk",
    desc: "Luxurious silk hijabs offering shine, softness, and sophistication for every occasion.",
    products: [
      {
        id: 22,
        name: "Pure Soft Silk Hijab",
        price: 1999,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 23,
        name: "Luxury Printed Silk Hijab",
        price: 2199,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 24,
        name: "Everyday Smooth Silk Hijab",
        price: 1799,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Lawn Hijab",
    slug: "hijab-lawn",
    desc: "Soft, breathable lawn hijabs that are ideal for everyday wear in all seasons.",
    products: [
      {
        id: 25,
        name: "Floral Breeze Lawn Hijab",
        price: 1499,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 26,
        name: "Summer Lawn Hijab",
        price: 1399,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 27,
        name: "Cutwork Design Lawn Hijab",
        price: 1599,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Georgette Hijab",
    slug: "hijab-georgette",
    desc: "Lightweight and easy to style, georgette hijabs offer a graceful drape and elegant texture.",
    products: [
      {
        id: 28,
        name: "Lightweight Georgette Hijab",
        price: 1599,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 29,
        name: "Textured Plain Georgette Hijab",
        price: 1499,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 30,
        name: "Elegant Fall Georgette Hijab",
        price: 1699,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
  {
    title: "Chaddar",
    slug: "chaddar",
    desc: "Warm, soft, and elegant chaddars crafted for comfort and modest sophistication.",
    products: [
      {
        id: 31,
        name: "Warm Woolen Chaddar",
        price: 2499,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 32,
        name: "Classic Handwoven Chaddar",
        price: 2699,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
      {
        id: 33,
        name: "Soft Cashmere Chaddar",
        price: 2999,
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
      },
    ],
  },
];


