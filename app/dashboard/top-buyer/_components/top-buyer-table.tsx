import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function TopBuyerTable() {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">Peringkat Pembelian Terbanyak</h1>
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
          <TableRow>
            <TableCell className="font-semibold text-center">1</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="relative basis-[50px] aspect-square rounded-full bg-muted overflow-hidden">
                  <img
                    src="https://source.unsplash.com/random/400x300/"
                    alt="product-1"
                    className="absolute w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">@Aam Hermansyah</span>
              </div>
            </TableCell>
            <TableCell>amzhermanzyah@gmail.com</TableCell>
            <TableCell className="text-right">12 Produk</TableCell>
            <TableCell className="text-right">Rp 102.000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-center">2</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="relative basis-[50px] aspect-square rounded-full bg-muted overflow-hidden">
                  <img
                    src="https://source.unsplash.com/random/400x300/?man"
                    alt="product-1"
                    className="absolute w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">@Syamsul Maarip</span>
              </div>
            </TableCell>
            <TableCell>syamsulmaarip@gmail.com</TableCell>
            <TableCell className="text-right">10 Produk</TableCell>
            <TableCell className="text-right">Rp 99.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default TopBuyerTable