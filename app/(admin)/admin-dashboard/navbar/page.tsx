'use client';

import axios from 'axios';
import { Preahvihear } from 'next/font/google';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi';

interface Child {
  title: string;
  link: string;
}

export interface NavItem {
  _id: string;
  title: string;
  link: string;
  children?: Child[];
}

const Page = () => {
  const [mainData, setMainData] = useState({ mainTitle: "", mainLink: "" });
  const [childrenData, setChildrenData] = useState([{ title: "", link: "" }]);
  const [haveChildren, setHaveChildren] = useState(false);

  const [navbar, setNavbar] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  // ───── FETCH ─────
  const fetchNavbar = async () => {
    const res = await axios.get("/api/navbar");
    setNavbar(res.data.data);
  };

  useEffect(() => {
    fetchNavbar();
  }, []);

  // ───── FORM HANDLERS ─────
  const handleMainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMainData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChildrenChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
    ) => {
    const { name, value } = e.target;

    const updated = [...childrenData];

    if (name === "title") {
        // update title
        updated[index].title = value;

        // auto slug → update link
        updated[index].link = autoSlug(value);
    } else {
        // manually editing link
        updated[index].link = value;
    }

    setChildrenData(updated);
    };

  const addChild = () => {
    setChildrenData(prev => [...prev, { title: "", link: "" }]);
  };

  // ───── SUBMIT (CREATE / UPDATE) ─────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      title: mainData.mainTitle.toLowerCase(),
      link: mainData.mainLink,
      children: haveChildren
        ? childrenData.filter(c => c.title.trim() !== "")
        : [],
    };

    try {
      if (editingId) {
        await axios.patch(`/api/navbar/${editingId}`, finalData);
        setStatus("✅ Updated");
      } else {
        await axios.post("/api/navbar", finalData);
        setStatus("✅ Added");
      }

      resetForm();
      fetchNavbar();
    } catch {
      setStatus("❌ Error");
    } finally {
      setLoading(false);
    }
  };

  // ───── DELETE MAIN ─────
  const deleteItem = async (id: string) => {
    await axios.delete(`/api/navbar/${id}`);
    fetchNavbar();
  };

  // ───── DELETE CHILD ─────
  const deleteChild = async (parent: NavItem, index: number) => {
    const updatedChildren = parent.children?.filter((_, i) => i !== index);

    await axios.patch(`/api/navbar/${parent._id}`, {
      ...parent,
      children: updatedChildren,
    });

    fetchNavbar();
  };

  // ───── EDIT MAIN ─────
  const editItem = (item: NavItem) => {
    setEditingId(item._id);
    setMainData({ mainTitle: item.title, mainLink: item.link || "" });

    if (item.children?.length) {
      setHaveChildren(true);
      setChildrenData(item.children);
    } else {
      setHaveChildren(false);
      setChildrenData([{ title: "", link: "" }]);
    }
  };

  // ───── EDIT CHILD ─────
  const editChild = (parent: NavItem, index: number) => {
    setEditingId(parent._id);
    setMainData({ mainTitle: parent.title, mainLink: parent.link });

    setHaveChildren(true);
    setChildrenData(parent.children || []);
  };

  // ───── RESET ─────
  const resetForm = () => {
    setEditingId(null);
    setMainData({ mainTitle: "", mainLink: "" });
    setChildrenData([{ title: "", link: "" }]);
    setHaveChildren(false);
  };

 const autoSlug = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")   // better than replaceAll(" ")
    .replace(/[^\w-]/g, ""); // remove special chars
};

  return (
    <main className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ───────── DISPLAY NAVBAR ───────── */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Navbar Items</h2>

        <div className="space-y-4">
          {navbar.map(item => (
            <div key={item._id} className="border rounded-lg p-4">

              {/* MAIN ITEM */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.link}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editItem(item)}
                    className="text-blue-500 cursor-pointer text-sm"
                  >
                    <FiEdit />
                  </button>

                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 cursor-pointer text-sm"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>

              {/* CHILDREN */}
              {(item.children && item?.children?.length > 0) && (
                <div className="mt-3 pl-4 border-l space-y-2">
                  {item?.children.map((child, index) => (
                    <div key={index} className="flex justify-between text-sm">

                      <div>
                        <p>{child.title}</p>
                        <p className="text-gray-400">{child.link}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => editChild(item, index)}
                          className="text-blue-500 cursor-pointer"
                        >
                          <FiEdit />
                        </button>

                        <button
                          onClick={() => deleteChild(item, index)}
                          className="text-red-500 cursor-pointer"
                        >
                          <FiTrash />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── FORM ───────── */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Item" : "Add Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex gap-2">
            <input
              name="mainTitle"
              value={mainData.mainTitle}
              onChange={(e) => {
                const value = e.target.value;

                setMainData(prev => ({
                    ...prev,
                    mainTitle: value,
                    mainLink: autoSlug(value),
                }));
                }}
              placeholder="Title"
              className="w-full border p-2 rounded"
            />
            <input
              name="mainLink"
              value={mainData.mainLink}
              readOnly
              placeholder="Link"
              className="w-full border p-2 rounded"
            />
          </div>

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={haveChildren}
              onChange={(e) => setHaveChildren(e.target.checked)}
            />
            Have Children
          </label>

          {haveChildren && (
            <div className="space-y-2">
              {childrenData.map((child, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    name="title"
                    value={child.title}
                    onChange={(e) => handleChildrenChange(index, e)}
                    placeholder="Child title"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="link"
                    value={child.link}
                    onChange={(e) => handleChildrenChange(index, e)}
                    placeholder="Child link"
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addChild}
                className="text-blue-500 text-sm"
              >
                + Add child
              </button>
            </div>
          )}

          <button className="w-full bg-black text-white py-2 rounded">
            {loading ? "Loading..." : editingId ? "Update" : "Add"}
          </button>
        </form>

        <p className="mt-3 text-center">{status}</p>
      </div>
    </main>
  );
};

export default Page;