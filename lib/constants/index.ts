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
      { title: "Chiffon Dupatta", link: "/dupatta/chiffon" },
      { title: "Lawn Cutwork Dupatta", link: "/dupatta/lawn-cutwork" },
      { title: "Jackard Dupatta", link: "/dupatta/jackard" },
      { title: "Organza Dupatta", link: "/dupatta/organza" },
      { title: "Silk Dupatta", link: "/dupatta/silk" },
      { title: "Four Sided Border Dupatta", link: "/dupatta/four-sided-border" },
      { title: "Fancy Dupatta", link: "/dupatta/fancy" },
    ],
  },

  {
    title: "Hijab",
    delay: 0.3,
    children: [
      { title: "Silk Hijab", link: "/hijab/silk" },
      { title: "Lawn Hijab", link: "/hijab/lawn" },
      { title: "Georgette Hijab", link: "/hijab/georgette" },
    ],
  },

  { title: "Chaddar", link: "/chaddar", delay: 0.4 },

  { title: "Blog", link: "/blog", delay: 0.5 },
];


export const collectionsPage = [
  // Dupatta Collections
  { title: "Chiffon Dupatta", link: "/collections/dupatta/chiffon", image: "/collectiondemo.jpg", delay: 0.1 },
  { title: "Lawn Cutwork Dupatta", link: "/collections/dupatta/lawn-cutwork", image: "/collectiondemo.jpg", delay: 0.2 },
  { title: "Jackard Dupatta", link: "/collections/dupatta/jackard", image: "/collectiondemo.jpg", delay: 0.3 },
  { title: "Organza Dupatta", link: "/collections/dupatta/organza", image: "/collectiondemo.jpg", delay: 0.4 },
  { title: "Silk Dupatta", link: "/collections/dupatta/silk", image: "/collectiondemo.jpg", delay: 0.5 },
  { title: "Four Sided Border Dupatta", link: "/collections/dupatta/four-sided-border", image: "/collectiondemo.jpg", delay: 0.6 },
  { title: "Fancy Dupatta", link: "/collections/dupatta/fancy", image: "/collectiondemo.jpg", delay: 0.7 },

  // Hijab Collections
  { title: "Silk Hijab", link: "/collections/hijab/silk", image: "/collectiondemo.jpg", delay: 0.8 },
  { title: "Lawn Hijab", link: "/collections/hijab/lawn", image: "/collectiondemo.jpg", delay: 0.9 },
  { title: "Georgette Hijab", link: "/collections/hijab/georgette", image: "/collectiondemo.jpg", delay: 1.0 },

  // Chaddar Collection
  { title: "Chaddar", link: "/collections/chaddar", image: "/collectiondemo.jpg", delay: 1.1 },
];


export const collectionsData = [
  {
    title: "Dupatta",
    children: [
      {
        title: "Chiffon Dupatta",
        link: "/dupatta/chiffon",
        products: [
          {
            id: 1,
            name: "Sheer Elegance Chiffon Dupatta",
            price: 1799,
            images: [
              "/images/dupatta/chiffon1-1.jpg",
              "/images/dupatta/chiffon1-2.jpg",
            ],
          },
          {
            id: 2,
            name: "Classic Plain Chiffon Dupatta",
            price: 1699,
            images: [
              "/images/dupatta/chiffon2-1.jpg",
              "/images/dupatta/chiffon2-2.jpg",
            ],
          },
          {
            id: 3,
            name: "Luxury Embroidered Chiffon Dupatta",
            price: 1999,
            images: [
              "/images/dupatta/chiffon3-1.jpg",
              "/images/dupatta/chiffon3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Lawn Cutwork Dupatta",
        link: "/dupatta/lawn-cutwork",
        products: [
          {
            id: 4,
            name: "Pastel Cutwork Lawn Dupatta",
            price: 1599,
            images: [
              "/images/dupatta/lawn1-1.jpg",
              "/images/dupatta/lawn1-2.jpg",
            ],
          },
          {
            id: 5,
            name: "Embroidered Edge Lawn Dupatta",
            price: 1499,
            images: [
              "/images/dupatta/lawn2-1.jpg",
              "/images/dupatta/lawn2-2.jpg",
            ],
          },
          {
            id: 6,
            name: "Soft Breeze Lawn Dupatta",
            price: 1399,
            images: [
              "/images/dupatta/lawn3-1.jpg",
              "/images/dupatta/lawn3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Jackard Dupatta",
        link: "/dupatta/jackard",
        products: [
          {
            id: 7,
            name: "Classic Jackard Dupatta",
            price: 1899,
            images: [
              "/images/dupatta/jackard1-1.jpg",
              "/images/dupatta/jackard1-2.jpg",
            ],
          },
          {
            id: 8,
            name: "Golden Weave Jackard Dupatta",
            price: 1999,
            images: [
              "/images/dupatta/jackard2-1.jpg",
              "/images/dupatta/jackard2-2.jpg",
            ],
          },
          {
            id: 9,
            name: "Textured Jackard Dupatta",
            price: 1799,
            images: [
              "/images/dupatta/jackard3-1.jpg",
              "/images/dupatta/jackard3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Organza Dupatta",
        link: "/dupatta/organza",
        products: [
          {
            id: 10,
            name: "Elegant Sheer Organza Dupatta",
            price: 2099,
            images: [
              "/images/dupatta/organza1-1.jpg",
              "/images/dupatta/organza1-2.jpg",
            ],
          },
          {
            id: 11,
            name: "Crystal Touch Organza Dupatta",
            price: 2299,
            images: [
              "/images/dupatta/organza2-1.jpg",
              "/images/dupatta/organza2-2.jpg",
            ],
          },
          {
            id: 12,
            name: "Luxe Embroidered Organza Dupatta",
            price: 2499,
            images: [
              "/images/dupatta/organza3-1.jpg",
              "/images/dupatta/organza3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Silk Dupatta",
        link: "/dupatta/silk",
        products: [
          {
            id: 13,
            name: "Pure Soft Silk Dupatta",
            price: 1999,
            images: [
              "/images/dupatta/silk1-1.jpg",
              "/images/dupatta/silk1-2.jpg",
            ],
          },
          {
            id: 14,
            name: "Luxury Printed Silk Dupatta",
            price: 2199,
            images: [
              "/images/dupatta/silk2-1.jpg",
              "/images/dupatta/silk2-2.jpg",
            ],
          },
          {
            id: 15,
            name: "Everyday Smooth Silk Dupatta",
            price: 1799,
            images: [
              "/images/dupatta/silk3-1.jpg",
              "/images/dupatta/silk3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Four Sided Border Dupatta",
        link: "/dupatta/four-sided-border",
        products: [
          {
            id: 16,
            name: "Classic Border Dupatta",
            price: 1599,
            images: [
              "/images/dupatta/border1-1.jpg",
              "/images/dupatta/border1-2.jpg",
            ],
          },
          {
            id: 17,
            name: "Elegant Four-Side Border Dupatta",
            price: 1799,
            images: [
              "/images/dupatta/border2-1.jpg",
              "/images/dupatta/border2-2.jpg",
            ],
          },
          {
            id: 18,
            name: "Premium Lace Border Dupatta",
            price: 1899,
            images: [
              "/images/dupatta/border3-1.jpg",
              "/images/dupatta/border3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Fancy Dupatta",
        link: "/dupatta/fancy",
        products: [
          {
            id: 19,
            name: "Festive Fancy Dupatta",
            price: 2499,
            images: [
              "/images/dupatta/fancy1-1.jpg",
              "/images/dupatta/fancy1-2.jpg",
            ],
          },
          {
            id: 20,
            name: "Shimmery Net Fancy Dupatta",
            price: 2299,
            images: [
              "/images/dupatta/fancy2-1.jpg",
              "/images/dupatta/fancy2-2.jpg",
            ],
          },
          {
            id: 21,
            name: "Party Wear Fancy Dupatta",
            price: 2599,
            images: [
              "/images/dupatta/fancy3-1.jpg",
              "/images/dupatta/fancy3-2.jpg",
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Hijab",
    delay: 0.3,
    children: [
      {
        title: "Silk Hijab",
        link: "/hijab/silk",
        products: [
          {
            id: 22,
            name: "Pure Soft Silk Hijab",
            price: 1999,
            images: [
              "/images/hijab/silk1-1.jpg",
              "/images/hijab/silk1-2.jpg",
            ],
          },
          {
            id: 23,
            name: "Luxury Printed Silk Hijab",
            price: 2199,
            images: [
              "/images/hijab/silk2-1.jpg",
              "/images/hijab/silk2-2.jpg",
            ],
          },
          {
            id: 24,
            name: "Everyday Smooth Silk Hijab",
            price: 1799,
            images: [
              "/images/hijab/silk3-1.jpg",
              "/images/hijab/silk3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Lawn Hijab",
        link: "/hijab/lawn",
        products: [
          {
            id: 25,
            name: "Floral Breeze Lawn Hijab",
            price: 1499,
            images: [
              "/images/hijab/lawn1-1.jpg",
              "/images/hijab/lawn1-2.jpg",
            ],
          },
          {
            id: 26,
            name: "Summer Lawn Hijab",
            price: 1399,
            images: [
              "/images/hijab/lawn2-1.jpg",
              "/images/hijab/lawn2-2.jpg",
            ],
          },
          {
            id: 27,
            name: "Cutwork Design Lawn Hijab",
            price: 1599,
            images: [
              "/images/hijab/lawn3-1.jpg",
              "/images/hijab/lawn3-2.jpg",
            ],
          },
        ],
      },
      {
        title: "Georgette Hijab",
        link: "/hijab/georgette",
        products: [
          {
            id: 28,
            name: "Lightweight Georgette Hijab",
            price: 1599,
            images: [
              "/images/hijab/georgette1-1.jpg",
              "/images/hijab/georgette1-2.jpg",
            ],
          },
          {
            id: 29,
            name: "Textured Plain Georgette Hijab",
            price: 1499,
            images: [
              "/images/hijab/georgette2-1.jpg",
              "/images/hijab/georgette2-2.jpg",
            ],
          },
          {
            id: 30,
            name: "Elegant Fall Georgette Hijab",
            price: 1699,
            images: [
              "/images/hijab/georgette3-1.jpg",
              "/images/hijab/georgette3-2.jpg",
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Chaddar",
    link: "/chaddar",
    delay: 0.4,
  },
];
;
