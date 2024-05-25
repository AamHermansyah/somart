'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllProducts } from "@/data/product";
import { formatRupiah } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Frown, LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, startFetching] = useTransition();

  useEffect(() => {
    startFetching(async () => {
      await getAllProducts()
        .then((data) => {
          if (data) setProducts(data);
        })
        .catch(() => toast.error('Gagal mengambil produk!'));
    });
  }, []);

  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">Daftar Produk</h1>
      {(isLoading || products === null) && (
        <div className="h-[300px] flex justify-center items-center">
          <LoaderCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {products && !!products.length && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-semibold">Gambar</TableHead>
              <TableHead className="font-semibold min-w-[150px]">Produk</TableHead>
              <TableHead className="font-semibold">Kategori</TableHead>
              <TableHead className="font-semibold text-right">Stok</TableHead>
              <TableHead className="text-right font-semibold">Harga</TableHead>
              <TableHead className="text-right font-semibold">Total Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-full aspect-square rounded-lg bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-semibold text-right">{product.stock}</TableCell>
                <TableCell className="text-right">{formatRupiah(product.price)}</TableCell>
                <TableCell className="text-right">{formatRupiah(product.stock * product.price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {products && !products.length && (
        <div className="w-full h-[200px] flex flex-col gap-3 items-center justify-center">
          <Frown className="w-16 sm:w-20 h-16 sm:h-20 text-muted-foreground" />
          <p className="text-sm sm:text-base">Produk tidak ditemukan.</p>
        </div>
      )}
    </div>
  )
}

export default ProductList