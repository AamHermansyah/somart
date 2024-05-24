import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className="sm:py-10">
      <div className="bg-primary px-6 sm:px-10 md:px-20 py-10 md:py-20 text-primary-foreground rounded-lg space-y-4 lg:space-y-8">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl leading-[120%] lg:leading-[130%] font-bold tracking-wide max-w-5xl">
          Ayo segera berbelanja di SoMart! Murah dan Berkualitas.
        </h1>
        <Link href="#product-list" className="inline-block">
          <Button variant="secondary" className="rounded-full px-6">Mulai Belanja</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero