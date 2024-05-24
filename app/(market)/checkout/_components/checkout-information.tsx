import { Separator } from '@/components/ui/separator'
import React from 'react'

function CheckoutInformation() {
  return (
    <div className="border rounded-lg lg:text-lg">
      <div className="bg-muted text-center p-2">
        <h1 className="font-semibold">Total Keranjang (2)</h1>
      </div>
      <div className="p-4 space-y-3">
        <div className="w-full flex justify-between gap-2 font-semibold">
          <span>Subtotal</span>
          <span>Rp 12.000</span>
        </div>
        <Separator />
        <div className="w-full flex justify-between gap-2">
          <span>Pengiriman</span>
          <span>Rp 19.000</span>
        </div>
        <div className="w-full flex justify-between gap-2">
          <span>PPN (12%)</span>
          <span>Rp 1.000</span>
        </div>
        <Separator />
        <div className="w-full flex justify-between gap-2 font-semibold">
          <span>Total</span>
          <span>Rp 32.000</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutInformation