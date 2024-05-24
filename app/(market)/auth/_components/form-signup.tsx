'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signupSchema } from "@/schemas"
import { FormError } from "@/components/form-error"
import { useEffect, useState, useTransition } from "react"
import { LoaderCircle } from "lucide-react"
import { signup } from "@/actions/signup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import useUserStore from "@/stores/user"

export function SignupForm() {
  const [isPending, startFetching] = useTransition();
  const [error, setError] = useState('');
  const navigate = useRouter();
  const { user, token } = useUserStore();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    setError('');

    startFetching(() => {
      signup(values)
        .then((data) => {
          if (data.error) setError(data?.error || '');
          if (data.success) {
            navigate.push('/auth/login');
            toast.success(data.success);
            form.reset();
          }
        });
    });
  }

  useEffect(() => {
    if (user && token) {
      if (user.role === 'USER') navigate.push('/');
      else navigate.push('/dashboard');
    }
  }, [token, user]);

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
          {/* @ts-ignore */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan nama lengkap"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Masukan kata sandi"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <Button
                type="submit"
                className="w-full items-center gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Daftar
                  </>
                ) : 'Daftar'}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sudah punya akun? <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Masuk</Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
