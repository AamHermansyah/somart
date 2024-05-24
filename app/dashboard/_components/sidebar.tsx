'use client'

import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { sidebarNavigations } from "../_constants/data"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ExternalLink, SquareChevronRight } from "lucide-react"
import useUserStore from "@/stores/user"
import { toast } from "sonner"

function Sidebar() {
  const pathname = usePathname();
  const [display, setDisplay] = useState(false);
  const { user } = useUserStore();
  const navigate = useRouter();
  const { removeUserAndToken } = useUserStore();

  const handleLogout = () => {
    removeUserAndToken();
    navigate.push('/');
    toast.warning('Berhasil logout!');
  }

  useEffect(() => {
    if (display) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;

        // If the click target is outside the element with id #idElement
        if (target && (target.closest('#sidebar') === null)) {
          setDisplay(false);
        }
      }

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      }
    }
  }, [display]);

  useEffect(() => {
    if (!user || (user.role === 'USER')) navigate.push('/');
  }, [user]);

  return (
    <aside id="sidebar" className={cn(
      'fixed w-[250px] left-0 h-screen py-10 space-y-6 bg-background z-[1] shadow-xl lg:shadow-none transition-all duration-200 ease-in-out',
      display ? 'translate-x-0' : '-translate-x-[100%] lg:translate-x-0'
    )}>
      <button
        className={cn(
          'absolute top-4 right-0 text-primary p-1 rounded-md bg-background border lg:hidden',
          !display ? 'translate-x-[90%]' : 'translate-x-[50%]'
        )}
        onClick={() => setDisplay((prev) => !prev)}
      >
        <SquareChevronRight className={cn('w-6 h-6', !display ? '' : 'rotate-180')} />
      </button>
      <h1 className="text-center text-primary text-xl sm:text-2xl font-bold tracking-tight">
        SoMart
      </h1>
      <Separator />
      <div className="relative">
        <nav className="px-4">
          {sidebarNavigations.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              target={item.isTargetBlank ? '_blank' : '_self'}
              className="relative block px-4 py-3"
            >
              <button className={cn(
                'w-full flex items-center gap-4 font-semibold tracking-wide',
                pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              )}>
                <item.Icon className="w-4 h-4" /> {item.label}
              </button>
              {item.isTargetBlank && (
                <ExternalLink className="absolute top-[48%] -translate-y-[50%] right-0 w-4 h-4" />
              )}
              {(pathname === item.path) && (
                <Separator
                  orientation="vertical"
                  className="absolute top-[50%] -translate-y-[50%] right-0 h-[80%] w-[2px] bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-0 w-full bg-background p-4">
        <Button
          size="sm"
          variant="destructive"
          className="w-full py-2 h-auto"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar