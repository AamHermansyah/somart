import Products from '@/app/(market)/_components/products'
import React from 'react'

function ProductsPage() {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <Products hiddenAddToCart={true} />
    </div>
  )
}

export default ProductsPage