import { Separator } from '@/components/ui/separator'
import { formatRupiah } from '@/lib/utils';
import { CheckoutInformation as CheckoutInformationType } from '@/types'

type PropTypes = {
  data: CheckoutInformationType;
}

function CheckoutInformation({ data }: PropTypes) {
  return (
    <div className="border rounded-lg lg:text-lg">
      <div className="bg-muted text-center p-2">
        <h1 className="font-semibold">Total Keranjang ({data.totalProducts} Produk)</h1>
      </div>
      <div className="p-4 space-y-3">
        <div className="w-full flex justify-between gap-2 font-semibold">
          <span>Subtotal</span>
          <span>{formatRupiah(data.subTotal)}</span>
        </div>
        <Separator />
        <div className="w-full flex justify-between gap-2">
          <span>Pengiriman</span>
          <span>{formatRupiah(data.deliveryFee)}</span>
        </div>
        <div className="w-full flex justify-between gap-2">
          <span>PPN (12%)</span>
          <span>{formatRupiah(data.taxFee)}</span>
        </div>
        <Separator />
        <div className="w-full flex justify-between gap-2 font-semibold">
          <span>Total</span>
          <span>{formatRupiah(data.subTotal + data.deliveryFee + data.taxFee)}</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutInformation