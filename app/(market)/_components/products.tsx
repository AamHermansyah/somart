'use client'

import React, { useState } from 'react'
import { CardProduct } from './card-product'
import AddToCartDialog from './add-to-cart-dialog'

function Products() {
  const [dialogDisplay, setDialogDisplay] = useState(false);

  return (
    <main id="product-list">
      <AddToCartDialog
        open={dialogDisplay}
        setOpen={setDialogDisplay}
      />
      <h1 className="scroll-m-10 text-primary text-2xl font-bold tracking-tight">
        Daftar Produk
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
        <CardProduct onAddToCart={() => setDialogDisplay(true)} />
        <CardProduct onAddToCart={() => setDialogDisplay(true)} />
        <CardProduct onAddToCart={() => setDialogDisplay(true)} />
        <CardProduct onAddToCart={() => setDialogDisplay(true)} />
      </div>
    </main>
  )
}

export default Products