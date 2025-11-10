'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  isSale: boolean;
  inStock: boolean;
  size: string;
  isNewArrival: boolean;
  mainImage: string;
  ingredients: string[];
  benefits: string[];
  createdAt: string;
}

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
      if (res.status === 200) {
        alert("Product deleted successfully!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };


  const columns: GridColDef<Product>[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 150 },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 100 },
    {
      field: 'discountPrice',
      headerName: 'Discount Price',
      type: 'number',
      width: 130,
      renderCell: (params) => params.row.discountPrice || '-',
    },
    {
      field: 'isSale',
      headerName: 'Sale',
      width: 80,
      type: 'boolean',
    },
    {
      field: 'inStock',
      headerName: 'Stock',
      width: 100,
      type: 'boolean'
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary">
            <Link href={`/admin-dashboard/update-product/${params.row._id}`}><FaEdit /></Link>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', p: 2, borderRadius: 2 }}>
      <DataGrid
        rows={products.map((p) => ({ id: p._id, ...p }))}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        showToolbar
        disableRowSelectionOnClick
      />
    </Box>
  );
}
