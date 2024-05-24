import React from 'react'
import FormCreate from './_components/form-create'
import { Image } from 'lucide-react'

function CreateProductPage() {
  return (
    <div className="p-6 rounded-xl bg-background shadow-sm space-y-4">
      <h1 className="text-xl font-semibold">Unggah Produk Baru</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 lg:col-span-4">
          <label className="block h-full bg-muted/50 rounded-lg border-dashed border-2 cursor-pointer">
            <div className="flex flex-col gap-2 justify-center items-center w-full h-full aspect-[3/2] md:aspect-auto">
              <Image className="w-10 h-10 text-primary" />
              <span>Unggah gambar</span>

              <input
                accept="image/*"
                type="file"
                className="w-0 h-0"
                name="image"
              />
            </div>
          </label>
        </div>
        <div className="md:col-span-6 lg:col-span-8">
          <FormCreate />
        </div>
      </div>
    </div>
  )
}

export default CreateProductPage