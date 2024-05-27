'use client'

import { MonthlyStock } from "@prisma/client"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { getAllMonthlyStock } from "@/actions/monthly-stock"
import MonthlyStockTable from './_components/monthly-stock-table'
import Chart from './_components/chart'
import { calculateCAGR, calculatePercentageGrowth, calculateSMA, transformStockArray } from "@/lib/utils"
import { EditAlert } from "./_components/edit-alert"
import { DeleteAlert } from "./_components/delete-alert"

type ChartState = {
  series: {
    name: string;
    data: number[];
  }[];
}

function StockPredictionPage() {
  const [monthlyStock, setMonthlyStock] = useState<MonthlyStock[] | null>(null);
  const [ftGrowth, setFtGrowth] = useState(0);
  const [editData, setEditData] = useState<MonthlyStock | null>(null);
  const [editDisplay, setEditDisplay] = useState(false);
  const [deleteData, setDeleteData] = useState<MonthlyStock | null>(null);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [isLoading, startFetching] = useTransition();
  const [calculateSMALoading, setCalculateSMALoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<ChartState>({
    series: [],
  });

  const fetchData = () => {
    setCalculateSMALoading(true);
    startFetching(async () => {
      await getAllMonthlyStock()
        .then((data) => {
          if (data && data.length >= 5) {
            setMonthlyStock(data);
            const transformStock = transformStockArray(data);
            const originalStockLength = transformStock.values.length;
            const period = 5;

            // SMA
            calculateSMA(transformStock.values, period)
              .then((res) => {
                setCategories([
                  ...transformStock.labels.map((label) => label.split(' ')[0]),
                  ...Array.from({ length: res.length }).map((_, index) => `X${index + 1}`)
                ]);

                setSeries(() => ({
                  series: [
                    {
                      name: "Produk Terjual",
                      data: [...transformStock.values, ...Array(originalStockLength === 5 ? res.length : res.length - 1).fill(null)],
                    },
                    {
                      name: "Prediksi Stok",
                      data: [...Array(originalStockLength).fill(null), ...res],
                    },
                    {
                      name: "Gap Stok",
                      data: [
                        ...Array(originalStockLength - 1).fill(null),
                        transformStock.values[originalStockLength - 1],
                        res[0],
                        ...Array(res.length - 1).fill(null),
                      ],
                    },
                  ],
                }));
                setCalculateSMALoading(false);

                setFtGrowth(calculateCAGR(data));
              });
          } else setMonthlyStock(data);
        })
        .catch(() => toast.error('Gagal mengambil produk!'));
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <EditAlert
        data={editData}
        open={editDisplay}
        setOpen={(open) => {
          if (!open) setEditData(null);
          setEditDisplay(open);
        }}
        onRefreshData={() => {
          fetchData();
        }}
      />
      <DeleteAlert
        data={deleteData}
        open={deleteDisplay}
        setOpen={(open) => {
          if (!open) setDeleteData(null);
          setDeleteDisplay(open);
        }}
        onRefreshData={() => {
          fetchData();
        }}
      />
      <MonthlyStockTable
        monthlyStock={
          monthlyStock ? monthlyStock.map((item, index, arr) => ({
            ...item,
            growth: !index ? 0 : calculatePercentageGrowth(arr[index - 1], item)
          })) : null
        }
        isLoading={isLoading}
        onRefreshData={() => {
          fetchData();
        }}
        onClickEdit={(item) => {
          setEditData(item);
          setEditDisplay(true);
        }}
        onClickDelete={(item) => {
          setDeleteData(item);
          setDeleteDisplay(true);
        }}
      />
      {monthlyStock && (monthlyStock.length >= 5) && (
        <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
          <div className="w-full flex flex-wrap justify-between items-end gap-2 sm:gap-4">
            <h1 className="text-xl font-semibold">Prediksi Stock Bulanan</h1>
            <h1 className="tracking-wider">Total FT-Growth: <b className="text-emerald-500">{`${(ftGrowth * 100).toFixed(2)}%`}</b></h1>
          </div>
          <Chart
            isLoading={calculateSMALoading}
            series={series.series}
            categories={categories}
          />
        </div>
      )}
    </>
  )
}

export default StockPredictionPage