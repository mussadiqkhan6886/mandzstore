"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    size: "",
    isSale: false,
    inStock: true,
    ingredients: [] as string[],
    benefits: [] as string[],
    isNewArrival: true
  });

  const router = useRouter();

  // 🔹 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = (await params).id;
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data.data;

        setData({
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          price: product.price || "",
          discountPrice: product.discountPrice || "",
          category: product.category || "",
          size: product.size || "",
          isSale: product.isSale || false,
          inStock: product.inStock || true,
          ingredients: product.ingredients || [],
          benefits: product.benefits || [],
          isNewArrival: product.isNewArrival
        });

        setExistingImages(product.images || []);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, []);

  // 🔹 Handle text inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Handle array fields
  const handleArrayChange = (
    index: number,
    field: "ingredients" | "benefits",
    value: string
  ) => {
    const updated = [...data[field]];
    updated[index] = value;
    setData({ ...data, [field]: updated });
  };

  const addArrayItem = (field: "ingredients" | "benefits") => {
    setData({ ...data, [field]: [...data[field], ""] });
  };

  const removeArrayItem = (field: "ingredients" | "benefits", index: number) => {
    const updated = data[field].filter((_, i) => i !== index);
    setData({ ...data, [field]: updated });
  };

  // 🔹 Handle new image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // 🔹 Delete existing image
  const handleDeleteExistingImage = async (imgUrl: string) => {
    try {
      const id = (await params).id;
      setExistingImages((prev) => prev.filter((url) => url !== imgUrl));
      await axios.patch(`/api/products/${id}`, {
        action: "deleteImage",
        imageUrl: imgUrl,
      });
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  // 🔹 Submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { id } = await params;
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (typeof value === "boolean") {
          formData.append(key, value.toString());
        } else if (value) {
          formData.append(key, value as string);
        }
      });

      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("images", compressed);
      }

      const res = await axios.patch(`/api/products/${id}`, formData);

      if (res.status === 200) {
        setResult("✅ Product updated successfully!");
        setTimeout(() => router.push("/admin-dashboard/products-list"), 1500);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setResult("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col justify-center items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>

      <form className="grid gap-4 w-full md:w-[50%]" onSubmit={handleSubmit}>
        {/* Basic Fields */}
        <input name="name" value={data.name} onChange={handleChange} placeholder="Product Name" className="border p-2 rounded" />
        <input name="slug" value={data.slug} onChange={handleChange} placeholder="Slug" className="border p-2 rounded" />
        <textarea name="description" value={data.description} onChange={handleChange} placeholder="Description" rows={3} className="border p-2 rounded" />
        <input name="price" type="number" value={data.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input name="discountPrice" type="number" value={data.discountPrice} onChange={handleChange} placeholder="Discount Price" className="border p-2 rounded" />

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isSale" checked={data.isSale} onChange={handleChange} />
            On Sale
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="inStock" checked={data.inStock} onChange={handleChange} />
            In Stock
          </label>
           <label className="flex items-center gap-2">
            <input type="checkbox" name="isNewArrival" checked={data.isNewArrival} onChange={handleChange} />
            New Arrival
          </label>
        </div>

        <input name="size" value={data.size} onChange={handleChange} placeholder="Size" className="border p-2 rounded" />

        <select name="category" value={data.category} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select category</option>
          <option value="hair oil">Hair Oil</option>
          <option value="hair treatment">Hair Treatment</option>
        </select>

        {/* Ingredients & Benefits sections (unchanged) */}
        <div>
          <label>Ingredients:</label>
          {data.ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 my-2">
              <input value={ing} onChange={(e) => handleArrayChange(i, "ingredients", e.target.value)} className="border p-2 flex-1 rounded" />
              <button type="button" onClick={() => removeArrayItem("ingredients", i)} className="text-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("ingredients")} className="text-blue-600 text-sm">+ Add Ingredient</button>
        </div>

        <div>
          <label>Benefits:</label>
          {data.benefits.map((b, i) => (
            <div key={i} className="flex gap-2 my-2">
              <input value={b} onChange={(e) => handleArrayChange(i, "benefits", e.target.value)} className="border p-2 flex-1 rounded" />
              <button type="button" onClick={() => removeArrayItem("benefits", i)} className="text-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("benefits")} className="text-blue-600 text-sm">+ Add Benefit</button>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Existing Images:</p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((url, i) => (
                <div key={i} className="relative">
                  <Image src={url} width={90} height={90} alt="Existing" className="rounded border object-cover w-24 h-24" />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(url)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-[2px] text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload New Images */}
        <div>
          <label>Upload New Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border rounded p-2" />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {previews.map((url, i) => (
                <Image key={i} src={url} width={80} height={80} alt="Preview" className="w-20 h-20 object-cover border rounded" />
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="bg-black text-white rounded px-4 py-2 mt-4">
          {loading ? "Updating..." : "Update Product"}
        </button>
        <p>{result}</p>
      </form>
    </main>
  );
};

export default UpdateProduct;
