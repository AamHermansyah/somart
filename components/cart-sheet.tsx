import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BiSolidShoppingBag } from "react-icons/bi"
import CartItem from "./cart-item"

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-2xl p-3 rounded-full h-auto">
          <BiSolidShoppingBag />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-4">
        <div className="absolute inset-x-0 px-4">
          <SheetHeader className="bg-primary p-2">
            <SheetTitle className="text-primary-foreground text-xl">
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
          <div className="w-full flex justify-between gap-2 text-lg font-semibold">
            <h2>Subtotal:</h2>
            <span>Rp 12.000</span>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
