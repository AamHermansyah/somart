import { MonthlyStock } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(value: number): string {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '');
}

export function formatDateToIndonesian(date: Date): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
}

export const calculateSMA = (data: number[], period: number): Promise<number[]> => {
  return new Promise((resolve) => {
    let sma: number[] = [];

    for (let i = 0; i < data.length - period + 1; i++) {
      const windowData = data.slice(i, i + period);
      const average = windowData.reduce((acc, val) => acc + val, 0) / period;
      sma.push(average);
    }

    resolve(sma);
  });
};

export function transformStockArray(stockArray: MonthlyStock[]) {
  const labels: string[] = [];
  const values: number[] = [];

  stockArray.forEach(stock => {
    labels.push(stock.label);
    values.push(stock.value);
  });

  return { labels, values };
}

function monthDiff(startDate: Date, endDate: Date) {
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
}

export function calculateCAGR(data: MonthlyStock[]) {
  // @ts-ignore
  data.sort((a, b) => new Date(a.label) - new Date(b.label));

  const startValue = data[0].value;
  const endValue = data[data.length - 1].value;
  const startDate = new Date(data[0].label);
  const endDate = new Date(data[data.length - 1].label);
  const n = monthDiff(startDate, endDate) / 12;

  const cagr = Math.pow(endValue / startValue, 1 / n) - 1;

  return cagr;
}

export function calculatePercentageGrowth(data1: MonthlyStock, data2: MonthlyStock) {
  const newValue = data2.value;
  const oldValue = data1.value;

  const growthPercentage = ((newValue - oldValue) / oldValue) * 100;

  return +Number(growthPercentage).toFixed(2);
}