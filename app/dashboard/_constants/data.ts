import { BarChart, Package, PackageOpen, Percent, Store, User } from "lucide-react";

export const sidebarNavigations = [
  {
    id: 'sidebar-1',
    path: '/dashboard',
    label: 'Ringkasan',
    Icon: BarChart
  },
  {
    id: 'sidebar-2',
    path: '/dashboard/top-buyer',
    label: 'Peringkat Pembeli',
    Icon: User
  },
  {
    id: 'sidebar-3',
    path: '/dashboard/stock-prediction',
    label: 'Prediksi Stok',
    Icon: Percent
  },
  {
    id: 'sidebar-4',
    path: '/dashboard/products',
    label: 'Daftar Product',
    Icon: Package
  },
  {
    id: 'sidebar-5',
    path: '/dashboard/create-product',
    label: 'Unggah Produk',
    Icon: PackageOpen
  },
  {
    id: 'sidebar-6',
    path: '/',
    label: 'Pergi Ke Toko',
    Icon: Store,
    isTargetBlank: true
  },
]