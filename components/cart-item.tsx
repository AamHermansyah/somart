import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'

function CartItem() {
  return (
    <div className="w-full flex items-start gap-3 -z-[1]">
      <div className="relative basis-[75px] aspect-square rounded-lg border overflow-hidden bg-muted">
        <img
          src="https://source.unsplash.com/random/400x300/"
          alt="product-1"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <h1 className="font-semibold line-clamp-1">Minyak Jelantah 200ml</h1>
        <p className="text-sm">Jumlah: 2</p>
        <div className="w-full flex justify-between items-center gap-2">
          <span className="font-semibold text-lg">Rp 12.000</span>
          <button className="text-lg text-destructive">
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem