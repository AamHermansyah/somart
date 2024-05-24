import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(value: number): string {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '');
}

