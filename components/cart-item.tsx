import { removeItemCheckout } from '@/actions/checkout';
import { formatRupiah } from '@/lib/utils';
import { Checkout, Product } from '@prisma/client'
import { Trash } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

type PropTypes = {
  data: ({ Product: Product } & Checkout);
  onDeleteSuccess: (idCheckout: number) => void;
}

function CartItem({ data, onDeleteSuccess }: PropTypes) {
  const [isDeleting, startDeleting] = useTransition();
  const navigate = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full flex items-start gap-3">
      <div className="relative basis-[65px] sm:basis-[75px] aspect-square rounded-lg border overflow-hidden bg-muted">
        <img
          src={data.Product.image}
          alt={data.Product.title}
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <h1 className="text-sm sm:text-base font-semibold line-clamp-1">{data.Product.title}</h1>
        <p className="text-xs sm:text-sm">Jumlah: {data.amount}</p>
        <div className="w-full flex justify-between items-center gap-2">
          <span className="font-semibold text-base sm:text-lg">{formatRupiah(data.totalPrice)}</span>
          <button
            className="text-destructive disabled:opacity-50"
            disabled={isDeleting}
            onClick={() => {
              startDeleting(async () => {
                removeItemCheckout(data.id)
                  .then((res) => {
                    if (res?.success) {
                      toast.success(res.success);
                      onDeleteSuccess(data.id);

                      if (pathname === '/') {
                        navigate.push(`?refreshToken=${crypto.randomUUID()}`);
                      }
                    }
                  });
              })
            }}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem