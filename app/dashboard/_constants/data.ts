import { BarChart, HandCoins, Package, PackageOpen, Percent, Store, User, UserCircle } from "lucide-react";

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
];

export const dataOverview = [
  {
    Icon: Package,
    title: 'Total Produk',
    value: '21 Item',
  },
  {
    Icon: PackageOpen,
    title: 'Total Orderan',
    value: '52 Order',
  },
  {
    Icon: PackageOpen,
    title: 'Total Produk Terjual',
    value: '104 Item',
  },
  {
    Icon: HandCoins,
    title: 'Penghasilan',
    value: 'Rp 12.000.000',
  },
  {
    Icon: UserCircle,
    title: 'Total Pengguna',
    value: '1000 User',
  },
];