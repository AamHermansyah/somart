'use server'

import { getCheckoutByIdUser } from "@/data/checkout";
import { db } from "@/db";
import { Checkout } from "@prisma/client"

export const addProductToCheckout = async (data: Omit<Checkout, 'id'>) => {
  try {
    const product = await db.product.findUnique({
      where: { id: data.idProduct }
    });

    if (product) {
      if (product.stock === 0) {
        return { error: 'Produk sudah habis!' };
      }

      if ((product.stock - data.amount) < 0) {
        return { error: 'Stok produk tidak cukup!' };
      }

      const isProductCheckoutExist = await db.checkout.findFirst({
        where: { idProduct: product.id }
      });

      if (isProductCheckoutExist) {
        await db.checkout.update({
          where: { id: isProductCheckoutExist.id },
          data: {
            amount: isProductCheckoutExist.amount + data.amount,
            totalPrice: isProductCheckoutExist.totalPrice + data.totalPrice
          }
        });
      } else {
        await db.checkout.create({
          data
        });
      }

      await db.product.update({
        where: { id: data.idProduct },
        data: {
          stock: {
            decrement: data.amount
          }
        }
      });

      return { success: 'Produk berhasil ditambahkan!' }
    }

    return { error: 'Produk tidak ditemukan! ' }
  } catch (error) {
    return { error: 'Terjadi kesalahan di server!' }
  }
}

export const getCheckout = async (idUser: number) => {
  return await getCheckoutByIdUser(idUser);
}

export const removeItemCheckout = async (idCheckout: number) => {
  try {
    const checkoutItem = await db.checkout.delete({
      where: { id: idCheckout },
    });

    await db.product.update({
      where: { id: checkoutItem.idProduct },
      data: {
        stock: {
          increment: checkoutItem.amount
        }
      }
    });

    return { success: 'Item berhasil dihapus!' }
  } catch (error) {
    return null;
  }
}

export const getCheckoutForOrder = async (idUser: number) => {
  const TAX_FEE_RATIO = 12 / 100;
  const DELIVERY_FEE = 12000;

  try {
    const checkoutItems = await getCheckoutByIdUser(idUser);

    if (!checkoutItems || !checkoutItems.data || !checkoutItems.data.length) {
      return { error: 'Produk masih kosong tidak bisa checkout!' }
    }

    const { data } = checkoutItems;
    const subTotal = data.reduce((acc, val) => acc + val.totalPrice, 0);

    return {
      data: {
        totalProducts: data.reduce((acc, val) => acc + val.amount, 0),
        subTotal,
        taxFee: subTotal * TAX_FEE_RATIO,
        deliveryFee: DELIVERY_FEE,
      }
    }
  } catch (error) {
    return null
  }
}