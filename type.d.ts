interface Product {
  collection: string,
  name: string;
  description: string;
  price: number;
  newPrice: number | null;
  onSale: boolean;
  images: string[];
  colors: string[];
  slug: string;
  inStock: boolean;
  _id: string; // MongoDB document ID
}

interface reviewType {
  _id: string
  designation: string
  name: string
  message: string
}
