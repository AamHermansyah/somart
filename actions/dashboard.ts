'use server'

import { getOverviewDashboard } from "@/data/dashboard"

export const getDataOverview = async () => {
  return await getOverviewDashboard();
}