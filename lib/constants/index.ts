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
  { title: "Home", link: "/" },

  {
    title: "Dupatta",
    link: "/dupatta",
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
    children: [
      { title: "Silk Hijab", link: "/hijab/silk" },
      { title: "Lawn Hijab", link: "/hijab/lawn" },
      { title: "Georgette Hijab", link: "/hijab/georgette" },
    ],
  },

  { title: "Chaddar", link: "/chaddar" },

  { title: "Blog", link: "/blog" },
];
