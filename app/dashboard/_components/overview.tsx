'use client'

import React, { useEffect, useState, useTransition } from 'react'
import ClockOverview from './clock-overview'
import { dataOverview } from '../_constants/data'
import CardOverview from './card-overview'
import { Skeleton } from '@/components/ui/skeleton'
import { getDataOverview } from '@/actions/dashboard'
import { toast } from 'sonner'
import { formatRupiah } from '@/lib/utils'

function Overview() {
  const [data, setData] = useState<typeof dataOverview | null>(null);
  const [isLoading, startFetching] = useTransition();

  useEffect(() => {
    startFetching(async () => {
      await getDataOverview()
        .then((data) => {
          if (data?.data) {
            const currentData = dataOverview.map((item, index) => {
              switch (item.title) {
                case 'Total Produk':
                  return {
                    ...item,
                    value: data.data.totalProducts + ' Item'
                  }
                case 'Total Orderan':
                  return {
                    ...item,
                    value: data.data.totalOrders + ' Order'
                  }
                case 'Total Produk Terjual':
                  return {
                    ...item,
                    value: data.data.totalProductsSold + ' Item'
                  }
                case 'Penghasilan':
                  return {
                    ...item,
                    value: formatRupiah(data.data.totalIncome)
                  }
                case 'Total Pengguna':
                default:
                  return {
                    ...item,
                    value: data.data.totalUsers + ' User'
                  }
              }
            });

            setData(currentData);
          };
        })
        .catch(() => toast.error('Gagal mengambil produk!'));
    });
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <ClockOverview />
      {data && data.map((item, index) => (
        <CardOverview
          key={`overview-${index}`}
          Icon={item.Icon}
          title={item.title}
          value={item.value}
        />
      ))}
      {(isLoading || data === null) && (
        <>
          <Skeleton className="w-full h-[110px] bg-white rounded-3xl" />
          <Skeleton className="w-full h-[110px] bg-white rounded-3xl" />
          <Skeleton className="w-full h-[110px] bg-white rounded-3xl" />
          <Skeleton className="w-full h-[110px] bg-white rounded-3xl" />
          <Skeleton className="w-full h-[110px] bg-white rounded-3xl" />
        </>
      )}

    </div>
  )
}

export default Overview