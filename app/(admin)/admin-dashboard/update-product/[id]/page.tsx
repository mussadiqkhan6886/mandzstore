"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

interface Variant {
  _id?: string;
  title: string;
  price: string;
  stock: string;
  sku: string;
  onSale: boolean;
  newPrice: string;
  // existing image from DB
  existingImage: string;
  // new image chosen by user
  imageFile: File | null;
  imagePreview: string;
}

const emptyVariant = (): Variant => ({
  title: "",
  price: "",
  stock: "",
  sku: "",
  onSale: false,
  newPrice: "",
  existingImage: "",
  imageFile: null,
  imagePreview: "",
});

const UpdateProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [result, setResult] = useState("");

  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    collection: "",
  });

  const [variants, setVariants] = useState<Variant[]>([emptyVariant()]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!data.name) return setData((prev) => ({ ...prev, slug: "" }));
    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setData((prev) => ({ ...prev, slug }));
  }, [data.name]);

  // Auto-generate SKU for each variant
  useEffect(() => {
    setVariants((prev) =>
      prev.map((v, i) => ({
        ...v,
        sku: `${data.name.slice(0, 3).toUpperCase().replace(/\s+/g, "")}-${
          v.title.slice(0, 3).toUpperCase().replace(/\s+/g, "") || `V${i + 1}`
        }-${String(i + 1).padStart(2, "0")}`,
      }))
    );
  }, [data.name, variants.map((v) => v.title).join(",")]);

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = (await params).id;
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data.product;

        setData({
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          collection: product.collection || "",
        });

        // Map DB variants to local state shape
        setVariants(
          product.variants?.map((v: any) => ({
            _id: v._id,
            title: v.title || "",
            price: String(v.price || ""),
            stock: String(v.stock || ""),
            sku: v.sku || "",
            onSale: v.onSale || false,
            newPrice: v.newPrice ? String(v.newPrice) : "",
            existingImage: v.image || "",
            imageFile: null,
            imagePreview: "",
          })) || [emptyVariant()]
        );
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, []);

  const handleDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData({ ...data, [e.target.name]: e.target.value });

  // ── Variant helpers ──────────────────────────────────────────────────────

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string | boolean | File | null
  ) =>
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );

  const handleVariantImage = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateVariant(index, "imageFile", file);
    updateVariant(index, "imagePreview", URL.createObjectURL(file));
  };

  const addVariant = () => setVariants((prev) => [...prev, emptyVariant()]);

  const removeVariant = (index: number) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  // ── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Each variant needs either an existing image or a new file
    const missingImage = variants.some((v) => !v.existingImage && !v.imageFile);
    if (missingImage) {
      setResult("❌ Each variant needs an image.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const id = (await params).id;
      const formData = new FormData();

      formData.append("collection", data.collection);
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("description", data.description);

      // Variant metadata — include existingImage so backend knows to keep it
      const variantMeta = variants.map((v) => ({
        _id: v._id,
        title: v.title,
        price: Number(v.price),
        stock: Number(v.stock),
        sku: v.sku,
        onSale: v.onSale,
        newPrice: v.onSale && v.newPrice ? Number(v.newPrice) : null,
        existingImage: v.imageFile ? null : v.existingImage, // null = upload new
      }));
      formData.append("variantMeta", JSON.stringify(variantMeta));

      // Upload new images keyed by index (only for variants with a new file)
      for (let i = 0; i < variants.length; i++) {
        if (variants[i].imageFile) {
          const compressed = await imageCompression(variants[i].imageFile!, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
          });
          formData.append(`variantImage_${i}`, compressed);
        }
      }

      const res = await axios.patch(`/api/products/${id}`, formData);

      if (res.status === 200) {
        setResult("✅ Product updated successfully!");
        setTimeout(() => router.push("/admin-dashboard/products-list"), 1500);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setResult("❌ Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 animate-pulse">Loading product...</p>
      </main>
    );
  }

  return (
    <main className="p-6 flex flex-col items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>

      <form className="grid gap-5 w-full md:w-[60%]" onSubmit={handleSubmit}>
        {/* ── Base Info ── */}
        <section className="grid gap-4 p-5 border rounded-xl bg-gray-50">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Product Info
          </h2>

          <div>
            <label className="block font-semibold mb-1 text-sm">Product Name</label>
            <input
              name="name"
              value={data.name}
              onChange={handleDataChange}
              type="text"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Slug</label>
            <input
              name="slug"
              value={data.slug}
              readOnly
              className="w-full border rounded-lg p-2 bg-gray-100 text-gray-500 text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleDataChange}
              className="w-full border rounded-lg p-2"
              rows={4}
              required
            />
          </div>
        </section>

        {/* ── Variants ── */}
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Variants ({variants.length})
            </h2>
            <button
              type="button"
              onClick={addVariant}
              className="text-sm bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
            >
              + Add Variant
            </button>
          </div>

          {variants.map((variant, i) => (
            <div
              key={variant._id || i}
              className="border rounded-xl p-4 bg-white shadow-sm grid gap-3"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Variant {i + 1}
                </span>
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="text-xs text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Title + SKU */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    value={variant.title}
                    onChange={(e) => updateVariant(i, "title", e.target.value)}
                    placeholder="e.g. Design 1"
                    className="w-full border rounded-lg p-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    value={variant.sku}
                    onChange={(e) => updateVariant(i, "sku", e.target.value)}
                    placeholder="Auto-generated"
                    className="w-full border rounded-lg p-2 text-sm bg-gray-50"
                  />
                </div>
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Price (Rs)</label>
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => updateVariant(i, "price", e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                    required
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Stock</label>
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                    required
                    min={0}
                  />
                </div>
              </div>

              {/* On Sale */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`onSale-${i}`}
                  checked={variant.onSale}
                  onChange={(e) => updateVariant(i, "onSale", e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor={`onSale-${i}`} className="text-sm font-semibold">
                  On Sale
                </label>
              </div>

              {variant.onSale && (
                <div>
                  <label className="block text-sm font-semibold mb-1">Sale Price (Rs)</label>
                  <input
                    type="number"
                    value={variant.newPrice}
                    onChange={(e) => updateVariant(i, "newPrice", e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                    required
                    min={0}
                  />
                </div>
              )}

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold mb-2">Variant Image</label>

                {/* Show existing image with replace option */}
                {variant.existingImage && !variant.imagePreview && (
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={variant.existingImage}
                      width={72}
                      height={72}
                      alt={`Variant ${i + 1}`}
                      className="w-18 h-18 object-cover rounded-lg border"
                    />
                    <span className="text-xs text-gray-500">Current image — upload below to replace</span>
                  </div>
                )}

                {/* New preview */}
                {variant.imagePreview && (
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={variant.imagePreview}
                      width={72}
                      height={72}
                      alt="New preview"
                      className="w-18 h-18 object-cover rounded-lg border border-black"
                    />
                    <span className="text-xs text-green-600 font-medium">New image selected</span>
                    <button
                      type="button"
                      onClick={() => {
                        updateVariant(i, "imageFile", null);
                        updateVariant(i, "imagePreview", "");
                      }}
                      className="text-xs text-red-500 underline"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleVariantImage(i, e)}
                  className="w-full border rounded-lg p-2 text-sm"
                />
              </div>
            </div>
          ))}
        </section>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

        {result && (
          <p className={`text-center font-medium ${result.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
            {result}
          </p>
        )}
      </form>
    </main>
  );
};

export default UpdateProduct;