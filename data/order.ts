import { db } from "@/db";

export const getOrderListByUserId = async (idUser: number) => {
  try {
    const orders = await db.order.findMany({
      where: { idUser }
    });

    return orders
  } catch (error) {
    return null;
  }
}