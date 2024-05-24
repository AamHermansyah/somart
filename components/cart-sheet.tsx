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
import { ShoppingBasket } from "lucide-react"
import Link from "next/link"

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <Button variant="ghost" className="text-2xl p-2 rounded-full h-auto">
            <ShoppingBasket />
          </Button>
          <Badge className="absolute -top-1 -right-1 w-[20px] text-[10px] bg-destructive hover:bg-destructive aspect-square flex justify-center items-center">
            2
          </Badge>
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
        <div className="pb-28 pt-12 h-screen overflow-y-auto hidden-scrollbar-y">
          <div className="grid gap-6 py-4">
            <CartItem />
            <CartItem />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-background p-4 pt-1">
          <div className="w-full flex justify-between gap-2 sm:text-lg font-semibold">
            <h2>Subtotal:</h2>
            <span>Rp 12.000</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
