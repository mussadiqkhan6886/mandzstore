"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    images: [] as string[],
    size: "",
    ingredients: [] as string[],
    benefits: [] as string[],
  });

  const router = useRouter()

  // Handle normal text fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle ingredients and benefits
  const handleArrayChange = (index: number, field: "ingredients" | "benefits", value: string) => {
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

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...previews]);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Add text fields
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (value) {
          formData.append(key, value as string);
        }
      });

      // ✅ Compress and append images
      for (const file of files) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("images", compressedFile);
      }


      const res = await axios.post("/api/products", formData);

      if (res.status === 201) {
        setResult("Product added successfully!");
        setData({
          name: "",
          slug: "",
          description: "",
          price: "",
          category: "",
          images: [],
          size: "",
          ingredients: [],
          benefits: [],
        });
        setFiles([]);
        setPreviews([]);
        setTimeout(() => {
          router.push("/admin-dashboard/products-list")
        }, 1500)
      }
    } catch (err) {
      console.error(" Upload failed:", err);
      setResult("❌ Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col justify-center items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form className="grid gap-4 w-full md:w-[50%]" onSubmit={handleSubmit}>
        {/* Product name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Herbal oil"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold mb-1">Slug</label>
          <input
            name="slug"
            value={data.slug}
            onChange={handleChange}
            type="text"
            placeholder="e.g. herbal-oil"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Write product details..."
            className="w-full border rounded-lg p-2"
            rows={4}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            onChange={handleChange}
            value={data.category}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select category</option>
            <option value="hair treatment">Hair Treatment</option>
            <option value="hair oil">Hair Oil</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            name="price"
            value={data.price}
            onChange={handleChange}
            type="number"
            placeholder="e.g. 1200"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Size */}
        <div>
          <label className="block font-semibold mb-1">Size</label>
          <input
            name="size"
            value={data.size}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 200ml"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-semibold mb-2">Ingredients</label>
          {data.ingredients.map((ingredient, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleArrayChange(i, "ingredients", e.target.value)
                }
                className="w-full border rounded-lg p-2"
                placeholder={`Ingredient ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem("ingredients", i)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("ingredients")}
            className="text-sm text-blue-600 mt-1"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Benefits */}
        <div>
          <label className="block font-semibold mb-2">Benefits</label>
          {data.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) =>
                  handleArrayChange(i, "benefits", e.target.value)
                }
                className="w-full border rounded-lg p-2"
                placeholder={`Benefit ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem("benefits", i)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("benefits")}
            className="text-sm text-blue-600 mt-1"
          >
            + Add Benefit
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            required
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {previews.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  width={80}
                  height={80}
                  alt={`Preview ${idx}`}
                  className="w-28 h-28 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 mt-4 rounded"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
        <p>{result}</p>
      </form>
    </main>
  );
};

export default AddProduct;
