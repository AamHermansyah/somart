import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignupForm() {
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-center scroll-m-10 text-primary text-2xl sm:text-3xl font-bold tracking-tight">
        Sistem Operasi Market
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar</CardTitle>
          <CardDescription>Silahkan daftar untuk dapat berbelanja di toko kami!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Masukan email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" type="text" placeholder="Masukan nama lengkap" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input id="password" type="password" placeholder="Masukan kata sandi" />
              </div>
              <Button className="w-full">Daftar</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sudah punya akun? <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Masuk</Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
