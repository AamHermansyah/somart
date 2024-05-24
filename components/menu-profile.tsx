import {
  CircleUserRound,
  LayoutDashboard,
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
import useUserStore from "@/stores/user"
import { toast } from "sonner"

export function MenuProfile() {
  const { removeUserAndToken, user } = useUserStore();

  const handleLogout = () => {
    removeUserAndToken();
    toast.warning('Berhasil logout!');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-2xl p-2 rounded-full h-auto">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user!.role === 'ADMIN' && (
          <Link href="/dashboard">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        <Link href="/order-list">
          <DropdownMenuItem>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Order Saya</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
