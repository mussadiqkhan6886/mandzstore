interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  newPrice: number | null;
  onSale: boolean;
  images: string[];
  colors: string[];
  _id?: string; // MongoDB document ID
}

interface Category {
  _id?: string; // MongoDB document ID
  title: string;
  slug: string;
  mainDescription: string;
  products: Product[];
  __v?: number; // version key added by Mongoose
}
