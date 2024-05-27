import { db } from "@/db";

export const getOverviewDashboard = async () => {
  try {
    const data = await db.dashboard.findFirst();
    const totalUsers = await db.user.count();
    const totalOrders = await db.order.count();
    const totalProducts = await db.product.count();

    if (data) {
      return {
        data: {
          ...data,
          totalOrders,
          totalUsers,
          totalProducts
        }
      }
    } else {
      return {
        data: {
          totalProductsSold: 0,
          totalIncome: 0,
          totalOrders,
          totalUsers,
          totalProducts
        }
      }
    }
  } catch (error) {
    return null;
  }
}