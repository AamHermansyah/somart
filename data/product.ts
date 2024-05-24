'use server'

import { db } from "@/db"

export const getAllProducts = async () => {
  try {
    const products = await db.product.findMany({
      take: 20
    });

    return products
  } catch (error) {
    return null;
  }
}