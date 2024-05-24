import { BarChart, PackageOpen, Percent, User } from "lucide-react";

export const sidebarNavigations = [
  {
    id: 'sidebar-1',
    path: '/dashboard',
    label: 'Overview',
    Icon: BarChart
  },
  {
    id: 'sidebar-2',
    path: '/dashboard/top-buyer',
    label: 'Top Buyer',
    Icon: User
  },
  {
    id: 'sidebar-3',
    path: '/dashboard/stock-prediction',
    label: 'Stock Prediction',
    Icon: Percent
  },
  {
    id: 'sidebar-4',
    path: '/dashboard/create-product',
    label: 'Create Product',
    Icon: PackageOpen
  },
]