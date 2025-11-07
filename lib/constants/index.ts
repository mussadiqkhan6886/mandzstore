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
    link: "/dupatta",
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
    link: "/hijab",
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
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.3},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.4},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.5},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.3},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.3},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.4},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.3},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.4},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.5},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.3},
  {title: "Abaya", link: "/collections/", image: "/collectiondemo.jpg", delay: 0.4},
]

export const collectionsData = [
  {
    title: "Dupatta",
    slug: "dupatta",
    description:
      "Explore our elegant Dupatta collection featuring premium fabrics like chiffon, silk, organza, and more — designed to complete your modest fashion look.",
    products: [
      {
        id: "dupatta-1",
        name: "Chiffon Dupatta",
        slug: "chiffon-dupatta",
        price: "1200",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "dupatta-2",
        name: "Lawn Cutwork Dupatta",
        slug: "lawn-cutwork-dupatta",
        price: "1300",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "dupatta-3",
        name: "Jacquard Dupatta",
        slug: "jacquard-dupatta",
        price: "1400",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "dupatta-4",
        name: "Organza Dupatta",
        slug: "organza-dupatta",
        price: "1500",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "dupatta-5",
        name: "Silk Dupatta",
        slug: "silk-dupatta",
        price: "1600",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "dupatta-6",
        name: "Fancy Dupatta",
        slug: "fancy-dupatta",
        price: "1700",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
    ],
  },

  {
    title: "Hijab",
    slug: "hijab",
    description:
      "Discover our lightweight, breathable hijabs in luxurious silk, georgette, and lawn fabrics — perfect for every season and occasion.",
    products: [
      {
        id: "hijab-1",
        name: "Silk Hijab",
        slug: "silk-hijab",
        price: "900",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "hijab-2",
        name: "Lawn Hijab",
        slug: "lawn-hijab",
        price: "950",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "hijab-3",
        name: "Georgette Hijab",
        slug: "georgette-hijab",
        price: "1000",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "hijab-4",
        name: "Pleated Hijab",
        slug: "pleated-hijab",
        price: "1050",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "hijab-5",
        name: "Everyday Hijab",
        slug: "everyday-hijab",
        price: "1100",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "hijab-6",
        name: "Luxury Hijab",
        slug: "luxury-hijab",
        price: "1150",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
    ],
  },

  {
    title: "Chaddar",
    slug: "chaddar",
    description:
      "Our premium Chaddar range brings you comfort and modesty in soft, high-quality fabrics — a timeless piece for your wardrobe.",
    products: [
      {
        id: "chaddar-1",
        name: "Woolen Chaddar",
        slug: "woolen-chaddar",
        price: "1500",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "chaddar-2",
        name: "Cotton Chaddar",
        slug: "cotton-chaddar",
        price: "1600",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "chaddar-3",
        name: "Embroidered Chaddar",
        slug: "embroidered-chaddar",
        price: "1700",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "chaddar-4",
        name: "Kashmiri Chaddar",
        slug: "kashmiri-chaddar",
        price: "1800",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "chaddar-5",
        name: "Printed Chaddar",
        slug: "printed-chaddar",
        price: "1900",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "chaddar-6",
        name: "Luxury Chaddar",
        slug: "luxury-chaddar",
        price: "2000",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
    ],
  },

  {
    title: "Blog",
    slug: "blog",
    description:
      "Read our latest fashion stories, styling guides, and modest wear trends designed to inspire your everyday looks.",
    products: [
      {
        id: "blog-1",
        name: "Modest Wear Inspiration",
        slug: "modest-wear-inspiration",
        price: "800",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "blog-2",
        name: "Summer Fashion Picks",
        slug: "summer-fashion-picks",
        price: "850",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "blog-3",
        name: "Layering with Style",
        slug: "layering-with-style",
        price: "900",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "blog-4",
        name: "Minimalist Looks",
        slug: "minimalist-looks",
        price: "950",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "blog-5",
        name: "Fabric Care Tips",
        slug: "fabric-care-tips",
        price: "1000",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "blog-6",
        name: "Styling Trends 2025",
        slug: "styling-trends-2025",
        price: "1050",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
    ],
  },

  {
    title: "Home",
    slug: "home",
    description:
      "Welcome to our collection — explore a variety of categories featuring Dupattas, Hijabs, Chaddars, and more for every occasion.",
    products: [
      {
        id: "home-1",
        name: "New Arrival 1",
        slug: "new-arrival-1",
        price: "1000",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "home-2",
        name: "New Arrival 2",
        slug: "new-arrival-2",
        price: "1100",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "home-3",
        name: "New Arrival 3",
        slug: "new-arrival-3",
        price: "1200",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "home-4",
        name: "New Arrival 4",
        slug: "new-arrival-4",
        price: "1300",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "home-5",
        name: "New Arrival 5",
        slug: "new-arrival-5",
        price: "1400",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
      {
        id: "home-6",
        name: "New Arrival 6",
        slug: "new-arrival-6",
        price: "1500",
        images: ["/collectiondemo.jpg", "/collectiondemo.jpg"],
        link: "/",
      },
    ],
  },
];
