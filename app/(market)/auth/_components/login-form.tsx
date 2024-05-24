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
import { loginSchema } from "@/schemas"
import { FormError } from "@/components/form-error"
import { useEffect, useState, useTransition } from "react"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { login } from "@/actions/login"
import useUserStore from "@/stores/user"

export function LoginForm() {
  const [isPending, startFetching] = useTransition();
  const [error, setError] = useState('');
  const navigate = useRouter();
  const { setToken, setUser, token, user } = useUserStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError('');

    startFetching(() => {
      login(values)
        .then((data) => {
          if (data.error) setError(data?.error || '');
          if (data.user) {
            setUser(data.user);
            setToken(data.token);
            form.reset();

            if (data.user.role === 'USER') navigate.push('/');
            else navigate.push('/dashboard');
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
          <CardTitle>Masuk</CardTitle>
          <CardDescription>Silahkan masuk ke akun anda untuk melanjutkan belanja!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* @ts-ignore */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
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
                    Masuk
                  </>
                ) : 'Masuk'}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Belum punya akun? <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Daftar</Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
