'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { CartSheet } from './cart-sheet'
import { MenuProfile } from './menu-profile'
import useUserStore from '@/stores/user'
import { usePathname } from 'next/navigation'

function Navbar() {
  const { user } = useUserStore();
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-10 py-2 flex justify-between items-center">
        <Link href="/" className="scroll-m-10 text-primary text-xl sm:text-2xl font-bold tracking-tight">
          SoMart
        </Link>
        <div className="flex-auto flex justify-end items-center gap-4">
          {!!user ? (
            <>
              {pathname !== '/checkout' && (
                <CartSheet />
              )}
              <MenuProfile />
            </>
          ) : (
            <Link href="/auth/login">
              <Button>
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar