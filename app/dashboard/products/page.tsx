import Products from '@/app/(market)/_components/products'
import React, { Suspense } from 'react'

function ProductsPage() {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <Suspense>
        <Products hiddenAddToCart={true} />
      </Suspense>
    </div>
  )
}

export default ProductsPage