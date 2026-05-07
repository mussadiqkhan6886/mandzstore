"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Order {
  _id: string;
  items: {
    images: string;
    name: string;
    quantity: number;
    selectedColor: string;
  }[];
  orderId: string;
  userDetails: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    city: string;
    postalCode: string;
    address: string;
  };
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentProof?: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#facc15",
  processing: "#60a5fa",
  shipped: "#34d399",
  delivered: "#22c55e",
  cancelled: "#f87171",
};

const STATUS_TEXT_COLORS: Record<string, string> = {
  pending: "#713f12",
  processing: "#1e3a5f",
  shipped: "#064e3b",
  delivered: "#14532d",
  cancelled: "#7f1d1d",
};

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

function StatusSelect({
  value,
  rowId,
  onUpdate,
  disabled,
}: {
  value: string;
  rowId: string;
  onUpdate: (id: string, status: string) => Promise<void>;
  disabled: boolean;
}) {
  const bg = STATUS_COLORS[value] ?? "#9ca3af";
  const color = STATUS_TEXT_COLORS[value] ?? "#fff";
  return (
    <select
      disabled={disabled}
      value={value}
      onChange={(e) => onUpdate(rowId, e.target.value)}
      className="border-0 rounded-full px-3 py-1 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black cursor-pointer capitalize"
      style={{ backgroundColor: bg, color }}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s} style={{ backgroundColor: "#fff", color: "#111" }}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default function OrderTable({ orders }: { orders: Order[] }) {
  const [rows, setRows] = React.useState(() =>
    orders.map((order) => ({
      id: order._id,
      orderId: order.orderId.slice(0, 7),
      userName: order.userDetails.fullName,
      email: order.userDetails.email,
      phone: order.userDetails.phone,
      totalPrice: order.totalPrice,
      status: order.status,
      paymentMethod: order.paymentMethod,
      paymentProof: order.paymentProof || "",
      date: new Date(order.createdAt).toLocaleDateString(),
      address: order.shippingAddress.address,
      items: order.items,
    }))
  );

  const [updating, setUpdating] = React.useState(false);

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await axios.delete(`/api/order/${id}`);
      if (res.data.success) {
        setRows((prev) => prev.filter((o) => o.id !== id));
      } else {
        alert("Failed to delete order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const res = await axios.patch(`/api/order/${id}`, { status: newStatus });
      if (res.data.success) {
        setRows((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  // ─── Desktop columns ───────────────────────────────────────────────────────
  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    {
      field: "items",
      headerName: "Items",
      width: 520,
      renderCell: (params) => (
        <div className="flex flex-wrap gap-2 py-1">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {params.value.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <Image
                src={item.images}
                alt={item.name}
                width={36}
                height={36}
                className="rounded-md object-cover border"
              />
              <span className="text-xs leading-tight">
                {item.name} × {item.quantity}
                {item.selectedColor && (
                  <span className="ml-1 text-gray-400">({item.selectedColor})</span>
                )}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    { field: "userName", headerName: "Customer", width: 130 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "totalPrice", headerName: "Total (Rs)", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => (
        <StatusSelect
          value={params.value}
          rowId={params.row.id}
          onUpdate={updateStatus}
          disabled={updating}
        />
      ),
    },
    { field: "paymentMethod", headerName: "Payment", width: 120 },
    {
      field: "paymentProof",
      headerName: "Proof",
      width: 90,
      renderCell: (params) =>
        params.value ? (
          <Link href={params.value} target="_blank" rel="noopener noreferrer">
            <Image
              src={params.value}
              alt="Payment Proof"
              width={44}
              height={44}
              className="rounded border object-cover"
            />
          </Link>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    { field: "date", headerName: "Date", width: 110 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "address", headerName: "Address", width: 240 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <Box>
          <IconButton color="error" size="small" onClick={() => deleteOrder(params.row.id)}>
            <FaTrash size={14} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // ─── Mobile card ────────────────────────────────────────────────────────────
  const MobileCard = ({ row }: { row: (typeof rows)[0] }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
            #{row.orderId}
          </p>
          <p className="font-semibold text-gray-900 text-sm mt-0.5">{row.userName}</p>
          <p className="text-xs text-gray-500">{row.date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusSelect
            value={row.status}
            rowId={row.id}
            onUpdate={updateStatus}
            disabled={updating}
          />
          <button
            onClick={() => deleteOrder(row.id)}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition"
            aria-label="Delete order"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-2">
        {row.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1.5">
            <Image
              src={item.images}
              alt={item.name}
              width={32}
              height={32}
              className="rounded-lg object-cover border border-gray-200"
            />
            <div className="text-xs leading-tight">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-400">
                × {item.quantity}
                {item.selectedColor && ` · ${item.selectedColor}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600">
        <div>
          <span className="text-gray-400 block">Total</span>
          <span className="font-semibold text-gray-900">Rs {row.totalPrice}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Payment</span>
          <span className="capitalize">{row.paymentMethod}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Phone</span>
          <span>{row.phone}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Email</span>
          <span className="truncate block">{row.email}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400 block">Address</span>
          <span>{row.address}</span>
        </div>
      </div>

      {/* Payment proof */}
      {row.paymentProof && (
        <Link href={row.paymentProof} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center gap-2 text-xs text-blue-600 hover:underline mt-1">
            <Image
              src={row.paymentProof}
              alt="Payment Proof"
              width={36}
              height={36}
              className="rounded-lg border object-cover"
            />
            View payment proof
          </div>
        </Link>
      )}
    </div>
  );

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
        Orders{" "}
        <span className="text-sm font-normal text-gray-400">({rows.length})</span>
      </h2>

      {/* ── Mobile: card list (hidden md+) ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No orders yet.</p>
        ) : (
          rows.map((row) => <MobileCard key={row.id} row={row} />)
        )}
      </div>

      {/* ── Desktop: MUI DataGrid (hidden below md) ── */}
      <div className="hidden md:block">
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          
          getRowHeight={() => "auto"}
          sx={{
            borderRadius: "12px",
            border: "1px solid #f0f0f0",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#6b7280",
            },
            "& .MuiDataGrid-cell": {
              alignItems: "center",
              borderBottom: "1px solid #f3f4f6",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fafafa",
            },
          }}
        />
      </div>
    </div>
  );
}