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
  _id?: string; // MongoDB document ID
}

