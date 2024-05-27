'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Frown, LoaderCircle } from "lucide-react"
import AddMonthlyStock from "./add-monthly-stock"
import { MonthlyStock } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PropTypes = {
  monthlyStock: (MonthlyStock & { growth: number })[] | null;
  isLoading: boolean;
  onRefreshData: () => void;
  onClickEdit: (item: MonthlyStock) => void;
  onClickDelete: (item: MonthlyStock) => void;
}

function MonthlyStockTable({ isLoading, monthlyStock, onRefreshData, onClickEdit, onClickDelete }: PropTypes) {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">History Stock Bulanan</h1>
      <AddMonthlyStock
        onRefreshData={onRefreshData}
      />
      {(isLoading || monthlyStock === null) && (
        <div className="h-[300px] flex justify-center items-center">
          <LoaderCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {monthlyStock && !!monthlyStock.length && (
        <Table>
          <TableCaption>Prediksi stock minimal harus memiliki 5 data</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold w-[50px] text-center">No</TableHead>
              <TableHead className="font-semibold min-w-[150px]">Label</TableHead>
              <TableHead className="font-semibold text-right">Pertumbuhan (%)</TableHead>
              <TableHead className="font-semibold text-right">Produk Terjual</TableHead>
              <TableHead className="font-semibold text-center w-[160px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyStock.map((stock, index) => (
              <TableRow key={stock.id}>
                <TableCell className="font-semibold text-center">{index + 1}</TableCell>
                <TableCell>{stock.label}</TableCell>
                <TableCell className={cn(
                  'text-right',
                  stock.growth > 0 ? 'text-emerald-500' : !stock.growth ? '' : 'text-destructive'
                )}>
                  {stock.growth}%
                </TableCell>
                <TableCell className="text-right">{stock.value} Produk</TableCell>
                <TableCell className="space-x-2 text-center whitespace-nowrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onClickEdit(stock)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onClickDelete(stock)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {monthlyStock && !monthlyStock.length && (
        <div className="w-full h-[200px] flex flex-col gap-3 items-center justify-center">
          <Frown className="w-16 sm:w-20 h-16 sm:h-20 text-muted-foreground" />
          <p className="text-sm sm:text-base">Data stok tidak ditemukan.</p>
        </div>
      )}
    </div>
  )
}

export default MonthlyStockTable