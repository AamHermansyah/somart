import { getOrderList } from "@/actions/order";
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDateToIndonesian, formatRupiah } from "@/lib/utils";
import useUserStore from "@/stores/user";
import { Order } from "@prisma/client";
import { Frown, LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, startFetching] = useTransition();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      startFetching(async () => {
        await getOrderList(user.id)
          .then((data) => {
            if (data) setOrders(data);
          })
          .catch(() => toast.error('Gagal mengambil produk!'));
      })
    }
  }, [user]);

  return (
    <>
      {(isLoading || orders === null) && (
        <div className="h-[300px] flex justify-center items-center">
          <LoaderCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {orders && !!orders.length && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold w-[50px]">No</TableHead>
              <TableHead className="font-semibold">Jumlah</TableHead>
              <TableHead className="font-semibold min-w-[150px]">Alamat</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Tanggal Dibuat</TableHead>
              <TableHead className="text-right font-semibold">Nomor Telepon</TableHead>
              <TableHead className="text-right font-semibold">Total Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={`order-${order.id}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.totalProducts} Produk</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell className="font-semibold tracking-wider">
                  <Badge className="bg-blue-600 hover:bg-blue-700">{order.status}</Badge>
                </TableCell>
                <TableCell>{formatDateToIndonesian(order.createdAt)}</TableCell>
                <TableCell className="text-right">{order.phone}</TableCell>
                <TableCell className="text-right">{formatRupiah(order.totalPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {orders && !orders.length && (
        <div className="w-full h-[200px] flex flex-col gap-3 items-center justify-center">
          <Frown className="w-16 sm:w-20 h-16 sm:h-20 text-muted-foreground" />
          <p className="text-sm sm:text-base">Pengguna tidak ditemukan.</p>
        </div>
      )}
    </>
  )
}
