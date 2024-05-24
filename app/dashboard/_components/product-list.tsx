import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function ProductList() {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">Daftar Produk</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-semibold">Gambar</TableHead>
            <TableHead className="font-semibold min-w-[150px]">Produk</TableHead>
            <TableHead className="font-semibold">Kategori</TableHead>
            <TableHead className="font-semibold text-right">Stok</TableHead>
            <TableHead className="text-right font-semibold">Harga</TableHead>
            <TableHead className="text-right font-semibold">Total Biaya</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="relative w-full aspect-square rounded-lg bg-muted overflow-hidden">
                <img
                  src="https://source.unsplash.com/random/400x300/"
                  alt="product-1"
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </TableCell>
            <TableCell className="font-semibold">Minyak Jelantah 200ml</TableCell>
            <TableCell>Sayuran</TableCell>
            <TableCell className="font-semibold text-right">999</TableCell>
            <TableCell className="text-right">Rp 12.000</TableCell>
            <TableCell className="text-right">Rp 3.250.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductList