'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { CardProduct } from './card-product'
import AddToCartDialog from './add-to-cart-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Product } from '@prisma/client'
import { getAllProducts } from '@/data/product'
import { toast } from 'sonner'
import { Frown } from 'lucide-react'

type PropTypes = {
  hiddenAddToCart?: boolean;
}

function Products({ hiddenAddToCart }: PropTypes) {
  const [dialogDisplay, setDialogDisplay] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, startFetching] = useTransition();
  const [productDialog, setProductDialog] = useState<Product | null>(null);

  useEffect(() => {
    startFetching(async () => {
      await getAllProducts()
        .then((data) => {
          if (data) setProducts(data);
        })
        .catch(() => toast.error('Gagal mengambil produk!'));
    })
  }, []);

  return (
    <main id="product-list" className="pb-4">
      <AddToCartDialog
        data={productDialog}
        open={dialogDisplay}
        setOpen={setDialogDisplay}
        onCloseDialog={() => setProductDialog(null)}
      />
      <h1 className="scroll-m-10 text-primary text-2xl font-bold tracking-tight">
        Daftar Produk
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
        {(isLoading || products === null) && (
          <>
            <Skeleton className="w-full aspect-[3/3.8] rounded-lg" />
            <Skeleton className="w-full aspect-[3/3.8] rounded-lg" />
            <Skeleton className="w-full aspect-[3/3.8] rounded-lg" />
            <Skeleton className="w-full aspect-[3/3.8] rounded-lg" />
          </>
        )}
        {products && products.map((product) => (
          <CardProduct
            key={product.id}
            data={product}
            onAddToCart={(data) => {
              setProductDialog(data);
              setDialogDisplay(true);
            }}
            hiddenAddToCart={hiddenAddToCart}
          />
        ))}
      </div>
      {products && !products.length && (
        <div className="w-full h-[200px] flex flex-col gap-3 items-center justify-center">
          <Frown className="w-16 sm:w-20 h-16 sm:h-20 text-muted-foreground" />
          <p className="text-sm sm:text-base">Produk tidak ditemukan.</p>
        </div>
      )}
    </main>
  )
}

export default Products