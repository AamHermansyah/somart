'use server'

import { db } from "@/db";
import { MonthlyStock } from "@prisma/client";

export const getAllMonthlyStock = async () => {
  try {
    const monthlyStock = await db.monthlyStock.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    return monthlyStock
  } catch (error) {
    return null;
  }
}

type MonthlyStockType = Omit<MonthlyStock, 'id' | 'createdAt'>;

export const addMonthlyStock = async (values: MonthlyStockType) => {
  try {
    const data = await db.monthlyStock.create({
      data: values
    });

    return {
      success: 'Data berhasil ditambahkan!',
      data
    }
  } catch (error) {
    return null;
  }
}

export const deleteMonthlyStock = async (id: number) => {
  try {
    await db.monthlyStock.delete({
      where: { id }
    });

    return {
      success: 'Data berhasil dihapus!',
    }
  } catch (error) {
    return null;
  }
}

export const editMonthlyStock = async (values: MonthlyStock) => {
  try {
    const data = await db.monthlyStock.update({
      where: { id: values.id },
      data: {
        value: values.value,
        label: values.label
      }
    });

    return {
      success: 'Data berhasil diedit!',
      data
    }
  } catch (error) {
    return null;
  }
}