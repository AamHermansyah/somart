import { db } from "@/db";

export const getCheckoutByIdUser = async (idUser: number) => {
  try {
    const checkoutItems = await db.checkout.findMany({
      where: { idUser },
      include: {
        Product: true
      }
    });

    return { data: checkoutItems }
  } catch (error) {
    return null;
  }
}