import { DollarSign, Package, UserCircle } from 'lucide-react'
import React from 'react'

function Overview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="w-full flex items-start gap-4 bg-background rounded-3xl px-4 py-6 shadow-sm">
        <Package className="basis-10 sm:basis-14 h-10 sm:h-14 bg-primary/10 text-primary p-3 rounded-full" />
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-muted-foreground">Total Produk</h4>
          <span className="text-xl sm:text-2xl font-semibold tracking-wide">21 Item</span>
        </div>
      </div>
      <div className="w-full flex items-start gap-4 bg-background rounded-3xl px-4 py-6 shadow-sm">
        <DollarSign className="basis-10 sm:basis-14 h-10 sm:h-14 bg-primary/10 text-primary p-3 rounded-full" />
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-muted-foreground">Penghasilan</h4>
          <span className="text-xl sm:text-2xl font-semibold tracking-wide">Rp 12.000.000</span>
        </div>
      </div>
      <div className="w-full flex items-start gap-4 bg-background rounded-3xl px-4 py-6 shadow-sm">
        <UserCircle className="basis-10 sm:basis-14 h-10 sm:h-14 bg-primary/10 text-primary p-3 rounded-full" />
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-muted-foreground">Total Pengguna</h4>
          <span className="text-xl sm:text-2xl font-semibold tracking-wide">1000 User</span>
        </div>
      </div>
    </div>
  )
}

export default Overview