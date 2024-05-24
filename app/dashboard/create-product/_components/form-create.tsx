import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function FormCreate() {
  return (
    <div className="grid col-span-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2 w-full flex flex-col space-y-1.5">
        <Label htmlFor="title">Nama Product</Label>
        <Input id="title" type="text" placeholder="Masukan nama produk" />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="stock">Stok Tersedia</Label>
        <Input id="stock" type="text" placeholder="Masukan stok tersedia" />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="price">Harga Satuan (Rp)</Label>
        <Input id="price" type="text" placeholder="Masukan harga satuan" />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="quantity">Jumlah/Berat Satuan</Label>
        <Input id="quantity" type="text" placeholder="Misal: 1pc, 100ml, 2l, 2kg, etc." />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="category">kategori</Label>
        <Input id="category" type="text" placeholder="Masukan kategori" />
      </div>
      <div className="sm:col-span-2 w-full flex flex-col space-y-1.5">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" placeholder="Masukan deskripsi"></Textarea>
      </div>
      <div className="sm:col-span-2">
        <Button className="w-full">Unggah Produk</Button>
      </div>
    </div>
  )
}

export default FormCreate