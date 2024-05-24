import {
  CircleUserRound,
  LogOut,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function MenuProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-2xl p-2 rounded-full h-auto">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href="/order-list">
          <DropdownMenuItem>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Order Saya</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
