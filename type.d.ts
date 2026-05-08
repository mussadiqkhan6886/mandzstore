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

interface Product {
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