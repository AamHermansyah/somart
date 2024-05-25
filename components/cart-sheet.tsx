'use client'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItem from "./cart-item"
import { Badge } from "./ui/badge"
import { Frown, LoaderCircle, ShoppingBasket } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { Checkout, Product } from "@prisma/client"
import { getCheckout } from "@/actions/checkout"
import useUserStore from "@/stores/user"
import { toast } from "sonner"
import { formatRupiah } from "@/lib/utils"

type CartItems = ({ Product: Product } & Checkout)[];

export function CartSheet() {
  const [checkoutItems, setCheckoutItems] = useState<CartItems | null>(null);
  const [isLoading, startFetching] = useTransition();
  const [display, setDisplay] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    if (display && user) {
      setCheckoutItems(null);

      startFetching(async () => {
        await getCheckout(user.id)
          .then((data) => {
            if (data) setCheckoutItems(data.data);
          })
          .catch(() => toast.error('Gagal mengambil produk!'));
      });
    }
  }, [display]);

  return (
    <Sheet open={display} onOpenChange={setDisplay}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <Button variant="ghost" className="text-2xl p-2 rounded-full h-auto">
            <ShoppingBasket />
          </Button>
          {checkoutItems && !!checkoutItems.length && (
            <Badge className="absolute -top-1 -right-1 w-[20px] text-[10px] bg-destructive hover:bg-destructive aspect-square flex justify-center items-center">
              {checkoutItems.length}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="px-4">
        <div className="absolute inset-x-0 px-4">
          <SheetHeader className="bg-primary p-2">
            <SheetTitle className="text-primary-foreground text-lg sm:text-xl">
              Keranjang Saya
            </SheetTitle>
          </SheetHeader>
        </div>
        <div className="pb-28 pt-12 h-screen overflow-y-auto hidden-scrollbar-y -z-[1]">
          {(isLoading || checkoutItems === null) && (
            <div className="h-[300px] flex justify-center items-center">
              <LoaderCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {checkoutItems && !!checkoutItems.length && (
            <div className="grid gap-6 py-4">
              {checkoutItems.map((item) => (
                <CartItem
                  key={item.id}
                  data={item}
                  onDeleteSuccess={(id) => {
                    setCheckoutItems((prev) => {
                      if (prev && !!prev.length) {
                        return prev.filter((item) => item.id !== id)
                      }

                      return prev;
                    })
                  }}
                />
              ))}
            </div>
          )}
          {checkoutItems && !checkoutItems.length && (
            <div className="w-full h-[200px] flex flex-col gap-3 items-center justify-center">
              <Frown className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm sm:text-base">Keranjang anda masih kosong!</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-background p-4 pt-1">
          <div className="w-full flex justify-between gap-2 sm:text-lg font-semibold">
            <h2>Subtotal:</h2>
            <span>
              {checkoutItems && !!checkoutItems.length ?
                formatRupiah(checkoutItems.reduce((acc, val) => acc + val.totalPrice, 0))
                : formatRupiah(0)
              }
            </span>
          </div>
          {isLoading ? (
            <Button className="w-full" disabled={true}>Checkout</Button>
          ) : (
            <Link href="/checkout">
              <Button className="w-full">Checkout</Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
