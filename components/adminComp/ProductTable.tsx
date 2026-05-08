'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';

interface Variant {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image: string;
  sku?: string;
  onSale: boolean;
  newPrice: number | null;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  collection: string;
  variants: Variant[];
}

export default function ProductTable({ products }: { products: Product[] }) {

  const [rows, setRows] = React.useState(products);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
      if (res.status === 200) {
        setRows((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      width: 80,
      sortable: false,
      renderCell: (params) => {
        const first: Variant = params.row.variants?.[0];
        return first?.image ? (
          <img src={first.image[0]} alt={params.row.name} style={{ width: 55, height: 55, objectFit: 'cover', borderRadius: 6 }} />
        ) : <span className="text-xs text-gray-400">No image</span>;
      },
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'collection',
      headerName: 'Collection',
      width: 160,
    },
    {
      field: 'variants',
      headerName: 'Variants',
      width: 90,
      renderCell: (params) => params.row.variants?.length ?? 0,
    },
    {
      field: 'totalStock',
      headerName: 'Total Stock',
      width: 110,
      renderCell: (params) =>
        (params.row.variants as Variant[])?.reduce((sum, v) => sum + v.stock, 0) ?? 0,
    },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 80,
      renderCell: (params) => {
        const hasStock = (params.row.variants as Variant[])?.some((v) => v.stock > 0);
        return (
          <span className={`text-xs font-semibold ${hasStock ? 'text-green-600' : 'text-red-500'}`}>
            {hasStock ? 'Yes' : 'No'}
          </span>
        );
      },
    },
    {
      field: 'priceRange',
      headerName: 'Price Range',
      width: 140,
      renderCell: (params) => {
        const prices = (params.row.variants as Variant[])?.map((v) =>
          v.onSale && v.newPrice ? v.newPrice : v.price
        );
        if (!prices?.length) return '—';
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max ? `Rs. ${min}` : `Rs. ${min} – ${max}`;
      },
    },
    {
      field: 'onSale',
      headerName: 'On Sale',
      width: 80,
      renderCell: (params) => {
        const hasSale = (params.row.variants as Variant[])?.some((v) => v.onSale);
        return (
          <span className={`text-xs font-semibold ${hasSale ? 'text-orange-500' : 'text-gray-400'}`}>
            {hasSale ? 'Yes' : 'No'}
          </span>
        );
      },
    },
    {
      field: 'variantDetails',
      headerName: 'Variant Details',
      width: 280,
      sortable: false,
      renderCell: (params) => (
        <div className="flex flex-col gap-0.5 py-1 text-xs text-gray-600">
          {(params.row.variants as Variant[])?.map((v) => (
            <span key={v._id}>
              <span className="font-medium">{v.title}</span>
              {' · '}Rs. {v.onSale && v.newPrice ? v.newPrice : v.price}
              {' · '}Stock: {v.stock}
              {/* {v.sku ? ` · ${v.sku}` : ''} */}
            </span>
          ))}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" size="small">
            <Link href={`/admin-dashboard/update-product/${params.row._id}`}>
              <FaEdit size={14} />
            </Link>
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDelete(params.row._id)}>
            <FaTrash size={14} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        autoHeight
        getRowHeight={() => 'auto'}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        showToolbar
        disableRowSelectionOnClick
        sx={{
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9fafb',
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#6b7280',
          },
          '& .MuiDataGrid-cell': {
            alignItems: 'center',
            borderBottom: '1px solid #f3f4f6',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#fafafa',
          },
        }}
      />
    </Box>
  );
}