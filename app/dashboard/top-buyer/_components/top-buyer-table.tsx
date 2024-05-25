'use client'

import { getUserByTopPurchaseAmount } from "@/actions/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatRupiah } from "@/lib/utils";
import { User } from "@prisma/client";
import { Frown, LoaderCircle } from "lucide-react"
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

function TopBuyerTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, startFetching] = useTransition();

  useEffect(() => {
    startFetching(async () => {
      await getUserByTopPurchaseAmount()
        .then((data) => {
          if (data) setUsers(data);
        })
        .catch(() => toast.error('Gagal mengambil produk!'));
    })
  }, []);

  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">Peringkat Pembelian Terbanyak</h1>
      {(isLoading || users === null) && (
        <div className="h-[300px] flex justify-center items-center">
          <LoaderCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {users && !!users.length && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold w-[50px] text-center">No</TableHead>
              <TableHead className="font-semibold min-w-[150px]">Nama</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold text-right">Total Pembelian</TableHead>
              <TableHead className="text-right font-semibold">Total Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-semibold text-center">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="relative basis-[50px] aspect-square rounded-full bg-primary/20 flex justify-center items-center">
                      <h1 className="text-xl font-bold text-muted-foreground/60">{user.name[0]}</h1>
                    </div>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.purchaseAmount} Produk</TableCell>
                <TableCell className="text-right">{formatRupiah(user.totalPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {users && !users.length && (
        <div className="w-full h-[200px] flex flex-col gap-3 items-center justify-center">
          <Frown className="w-16 sm:w-20 h-16 sm:h-20 text-muted-foreground" />
          <p className="text-sm sm:text-base">Pengguna tidak ditemukan.</p>
        </div>
      )}
    </div>
  )
}

export default TopBuyerTable