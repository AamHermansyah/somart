import React from 'react'
import FormCreate from './_components/form-create'

function CreateProductPage() {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">Unggah Produk Baru</h1>
      <FormCreate />
    </div>
  )
}

export default CreateProductPage