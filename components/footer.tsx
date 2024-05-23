import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full max-w-[1500px] mx-auto px-4 sm:px-10 my-10">
      <div className="bg-muted px-4 p-10 sm:p-20 rounded-xl text-center">
        <h1 className="scroll-m-10 text-primary text-2xl sm:text-3xl font-bold tracking-tight">
          SoMart - Sistem Operasi Market | © 2023
        </h1>
        <p className="text-sm sm:text-base leading-5 sm:leading-7 [&:not(:first-child)]:mt-6 max-w-2xl mx-auto text-muted-foreground">
          Website termurah untuk semua barang yang anda inginkan.
          Ayo segera berbelanja! Kami sangat menanti anda
          untuk menikmati produk yang kami sediakan.
        </p>
        <ul className="text-sm sm:text-base w-full flex justify-center flex-wrap items-center mt-10">
          <li>
            <Link href="" className="hover:underline me-4 md:me-6">About</Link>
          </li>
          <li>
            <Link href="" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
          </li>
          <li>
            <Link href="" className="hover:underline me-4 md:me-6">Licensing</Link>
          </li>
          <li>
            <Link href="" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer