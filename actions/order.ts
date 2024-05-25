'use server'

import { getOrderListByUserId } from "@/data/order"
import { db } from "@/db"
import { Order } from "@prisma/client"

type OrderForm = Omit<Order, 'id' | 'status' | 'createdAt'>

export const createOrder = async (values: OrderForm, idUser: number) => {
  try {
    await db.order.create({
      data: {
        ...values,
        status: 'Dibayar'
      }
    });

    await db.checkout.deleteMany({
      where: { idUser }
    });

    await db.user.update({
      where: { id: idUser },
      data: {
        purchaseAmount: {
          increment: values.totalProducts
        },
        totalPrice: {
          increment: values.totalPrice
        }
      }
    });

    const dashboard = await db.dashboard.findFirst();

    if (dashboard) {
      await db.dashboard.update({
        where: { id: dashboard.id },
        data: {
          totalIncome: { increment: values.totalPrice },
          totalProductsSold: { increment: values.totalProducts }
        }
      });
    } else {
      await db.dashboard.create({
        data: {
          totalIncome: values.totalPrice,
          totalProductsSold: values.totalProducts
        }
      });
    }

    return { success: 'Order berhasil dilakukan!' }
  } catch (error) {
    return { error: 'Terjadi kesalahan di server!' }
  }
}

export const getOrderList = async (idUser: number) => {
  return await getOrderListByUserId(idUser);
}