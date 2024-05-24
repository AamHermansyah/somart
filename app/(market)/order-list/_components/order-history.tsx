import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function OrderHistory() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-semibold">Gambar</TableHead>
          <TableHead className="font-semibold min-w-[150px]">Produk</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold">Tanggal Dibuat</TableHead>
          <TableHead className="text-right font-semibold">Harga</TableHead>
          <TableHead className="text-right font-semibold">Total Harga</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img
                src="https://source.unsplash.com/random/400x300/"
                alt="product-1"
                className="absolute w-full h-full object-cover"
              />
            </div>
          </TableCell>
          <TableCell className="font-semibold">
            <h1>Minyak Jelantah 200ml</h1>
            <span className="font-normal text-sm">Jumlah: 2</span>
          </TableCell>
          <TableCell className="font-semibold tracking-wider">
            <Badge>Dibayar</Badge>
          </TableCell>
          <TableCell>20 Mei 2024</TableCell>
          <TableCell className="text-right">Rp 12.000</TableCell>
          <TableCell className="text-right">Rp 32.000</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-semibold">Total</TableCell>
          <TableCell className="text-right font-semibold">Rp 32.000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
