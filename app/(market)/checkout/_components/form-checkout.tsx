import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function FormCheckout() {
  return (
    <div className="grid col-span-1 sm:grid-cols-2 gap-4">
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" type="text" placeholder="Masukan Nama Lengkap" />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Masukan email" />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="phone">Nomor Telepon</Label>
        <Input id="phone" type="text" placeholder="Masukan Nomor Telepon" />
      </div>
      <div className="w-full flex flex-col space-y-1.5">
        <Label htmlFor="zip">Kode Zip</Label>
        <Input id="zip" type="text" placeholder="Masukan Kode Zip" />
      </div>
      <div className="sm:col-span-2 w-full flex flex-col space-y-1.5">
        <Label htmlFor="address">Alamat</Label>
        <Input id="address" type="text" placeholder="Masukan Alamat" />
      </div>
      <div className="sm:col-span-2">
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  )
}

export default FormCheckout