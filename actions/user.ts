'use server'

import { db } from "@/db";

export const getUserByTopPurchaseAmount = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        purchaseAmount: 'desc'
      },
      take: 20
    });

    return users.map((user) => ({ ...user, password: '' }))
  } catch (error) {
    return null;
  }
}