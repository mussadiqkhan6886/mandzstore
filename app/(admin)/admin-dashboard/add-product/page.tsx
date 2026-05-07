"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { NavItem } from "../navbar/page";

interface Variant {
  title: string;
  price: string;
  stock: string;
  sku: string;
  onSale: boolean;
  newPrice: string;
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
  imageFile: null,
  imagePreview: "",
});

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [collections, setCollections] = useState<NavItem[]>([]);

  const [data, setData] = useState({
    collection: "",
    name: "",
    slug: "",
    description: "",
  });

  const [variants, setVariants] = useState<Variant[]>([emptyVariant()]);

  // Auto-generate slug from name
  useEffect(() => {
    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setData((prev) => ({ ...prev, slug }));
  }, [data.name]);

 useEffect(() => {
  setVariants((prev) =>
    prev.map((v, i) => ({
      ...v,
      sku: `${data.name.slice(0, 3).toUpperCase().replace(/\s+/g, "")}-${v.title.slice(0, 3).toUpperCase().replace(/\s+/g, "") || `V${i + 1}`}-${String(i + 1).padStart(2, "0")}`,
    }))
  );
}, [data.name, variants.map((v) => v.title).join(",")]);

  // Fetch collections
  useEffect(() => {
    const fetchNav = async () => {
      const res = await axios.get("/api/navbar");
      const navData = res.data.data;
      const flat = navData.flatMap((item: NavItem) => {
        if (item.title.toLowerCase() === "home") return [];
        if (item.children?.length) {
          return item.children
            .filter((c) => c.title && c.title.toLowerCase() !== "view all")
            .map((child) => ({ title: child.title, link: child.link || "" }));
        }
        if (!item.title) return [];
        return [{ title: item.title, link: item.link || "" }];
      });
      setCollections(flat);
    };
    fetchNav();
  }, []);

  const handleDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ── Variant helpers ──────────────────────────────────────────────────────

  const updateVariant = (index: number, field: keyof Variant, value: string | boolean | File | null) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

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

    if (variants.some((v) => !v.imageFile)) {
      setResult("❌ Each variant needs an image.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("collection", data.collection);
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("description", data.description);

      // Send variant metadata as JSON string, images separately keyed by index
      const variantMeta = variants.map((v) => ({
        title: v.title,
        price: Number(v.price),
        stock: Number(v.stock),
        sku: v.sku,
        onSale: v.onSale,
        newPrice: v.onSale && v.newPrice ? Number(v.newPrice) : null,
      }));
      formData.append("variantMeta", JSON.stringify(variantMeta));

      for (let i = 0; i < variants.length; i++) {
        const compressed = await imageCompression(variants[i].imageFile!, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append(`variantImage_${i}`, compressed);
      }

      const res = await axios.post("/api/products", formData);

      if (res.status === 201) {
        setResult("✅ Product added successfully!");
        setData({ collection: "", name: "", slug: "", description: "" });
        setVariants([emptyVariant()]);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form className="grid gap-5 w-full md:w-[60%]" onSubmit={handleSubmit}>
        {/* ── Base Info ── */}
        <section className="grid gap-4 p-5 border rounded-xl bg-gray-50">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Product Info
          </h2>

          {/* Collection */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Collection</label>
            <select
              name="collection"
              value={data.collection}
              onChange={handleDataChange}
              className="w-full border rounded-lg p-2 bg-white"
              required
            >
              <option value="">Select Collection</option>
              {collections.map((col) => (
                <option key={col.link} value={col.title}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
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

          {/* Slug */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Slug</label>
            <input
              name="slug"
              value={data.slug}
              readOnly
              className="w-full border rounded-lg p-2 bg-gray-100 text-gray-500 text-sm"
            />
          </div>

          {/* Description */}
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
              key={i}
              className="border rounded-xl p-4 bg-white shadow-sm grid gap-3 relative"
            >
              {/* Variant header */}
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
                  <label className="block text-sm font-semibold mb-1">
                    SKU <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={variant.sku}
                    onChange={(e) => updateVariant(i, "sku", e.target.value)}
                    placeholder="e.g. MZ-001"
                    className="w-full border rounded-lg p-2 text-sm"
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
                <label className="block text-sm font-semibold mb-1">Variant Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleVariantImage(i, e)}
                  className="w-full border rounded-lg p-2 text-sm"
                  required={!variant.imageFile}
                />
                {variant.imagePreview && (
                  <div className="mt-2">
                    <Image
                      src={variant.imagePreview}
                      width={80}
                      height={80}
                      alt={`Variant ${i + 1} preview`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}
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
          {loading ? "Uploading..." : "Add Product"}
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

export default AddProduct;