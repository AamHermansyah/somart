import { Trash } from 'lucide-react'

function CartItem() {
  return (
    <div className="w-full flex items-start gap-3 -z-[1]">
      <div className="relative basis-[65px] sm:basis-[75px] aspect-square rounded-lg border overflow-hidden bg-muted">
        <img
          src="https://source.unsplash.com/random/400x300/"
          alt="product-1"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <h1 className="text-sm sm:text-base font-semibold line-clamp-1">Minyak Jelantah 200ml</h1>
        <p className="text-xs sm:text-sm">Jumlah: 2</p>
        <div className="w-full flex justify-between items-center gap-2">
          <span className="font-semibold text-base sm:text-lg">Rp 12.000</span>
          <button className="text-destructive">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem