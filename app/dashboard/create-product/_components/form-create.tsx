'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { productSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image, LoaderCircle, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from "sonner"
import { FormError } from "@/components/form-error"
import { createProduct } from "@/actions/product"

function FormCreate() {
  const [isPending, startFetching] = useTransition();
  const [error, setError] = useState('');
  const navigate = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: '',
      description: '',
      price: '',
      quantity: '',
      stock: '',
      title: ''
    },
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    const reader = new FileReader();
    reader.readAsDataURL(values.image!);

    reader.onload = () => {
      const base64Image = reader.result as string;
      const dataToSend = { ...values, image: base64Image };

      startFetching(async () => {
        createProduct(dataToSend).then((data) => {
          if (data.error) setError(data?.error || '');
          if (data.success) {
            toast.success(data.success);
            form.setValue('image', undefined);
            form.reset();
            navigate.push('/dashboard/products');
          }
        });
      });
    };

    reader.onerror = () => {
      toast.error('Gagal membaca gambar!');
    };
  }

  return (
    <>
      {/* @ts-ignore */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 lg:col-span-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="h-full space-y-2 md:pb-4">
                  <FormControl className="block md:h-full bg-muted/50 rounded-lg border-dashed border-2 overflow-hidden">
                    <div>
                      {!field.value ? (
                        <label className="flex flex-col gap-2 justify-center items-center w-full h-full aspect-[3/2] md:aspect-auto cursor-pointer">
                          <Image className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
                          <span className="text-sm sm:text-base">Unggah gambar</span>

                          <input
                            accept="image/*"
                            type="file"
                            className="w-0 h-0"
                            name="image"
                            disabled={isPending}
                            onChange={(event) => {
                              if (event.target.files) {
                                field.onChange(event.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      ) : (
                        <div className="relative aspect-[3/2] md:aspect-auto w-full h-full">
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="uploaded-pic"
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            className="absolute bottom-3 right-3 p-2 rounded-full border bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                            onClick={() => field.onChange(undefined)}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-6 lg:col-span-8">
            <div className="grid col-span-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Nama Product</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan nama produk"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok Tersedia</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan stok tersedia"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Satuan (Rp)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan harga satuan"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah/Berat Satuan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Misal: 1pc, 100ml, 2l, 2kg, etc."
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan kategori"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Masukan deskripsi"
                        disabled={isPending}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="sm:col-span-2 space-y-4">
                <FormError message={error} />
                <Button className="w-full">
                  {isPending ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      Unggah Produk
                    </>
                  ) : 'Unggah Produk'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default FormCreate