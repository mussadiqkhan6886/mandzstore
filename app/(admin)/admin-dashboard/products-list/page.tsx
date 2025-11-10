import ProductTable from "@/components/adminComp/ProductTable";

export default async function AdminProductsPage() {
  try {
    // Call your API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      next:{revalidate: 10}, // ensures fresh data every time
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    const products = data.data; // your GET route returns { message, data }

    return (
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-4">Product List</h1>
        <ProductTable products={products} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center py-10">
        Failed to load products.
      </div>
    );
  }
}
