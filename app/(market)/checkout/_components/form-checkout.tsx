import { createOrder } from '@/actions/order';
import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { orderSchema } from '@/schemas';
import useUserStore from '@/stores/user';
import { CheckoutInformation } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type PropTypes = {
  data: CheckoutInformation;
}

function FormCheckout({ data }: PropTypes) {
  const [isPending, startFetching] = useTransition();
  const [error, setError] = useState('');
  const { user } = useUserStore();
  const navigate = useRouter();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      codeZip: '',
      phone: ''
    },
  });

  function onSubmit(values: z.infer<typeof orderSchema>) {
    if (user) {
      setError('');

      startFetching(() => {
        createOrder({
          ...values,
          idUser: user.id,
          deliveryFee: data.deliveryFee,
          taxFee: data.taxFee,
          totalPrice: data.subTotal,
          totalProducts: data.totalProducts
        }, user.id)
          .then((data) => {
            if (data.error) setError(data?.error || '');
            if (data.success) {
              navigate.push('/order-list');
              toast.success(data.success);
              form.reset();
            }
          });
      });
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid col-span-1 sm:grid-cols-2 gap-4">
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan nomor telepon"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codeZip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Zip</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan kode zip"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan alamat"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-2 space-y-4">
            <FormError message={error} />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  Order Sekarang
                </>
              ) : 'Order Sekarang'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default FormCheckout