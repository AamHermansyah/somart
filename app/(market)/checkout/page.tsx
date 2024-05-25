'use client'

import React, { useEffect, useState, useTransition } from 'react'
import FormCheckout from './_components/form-checkout'
import CheckoutInformation from './_components/checkout-information'
import useUserStore from '@/stores/user'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { getCheckoutForOrder } from '@/actions/checkout'
import { toast } from 'sonner'
import { CheckoutInformation as CheckoutInformationType } from '@/types'

function CheckoutPage() {
  const [checkoutInformation, setCheckoutInformation] = useState<CheckoutInformationType | null>(null);
  const [isLoading, startFetching] = useTransition();
  const { user } = useUserStore();
  const navigate = useRouter();

  useEffect(() => {
    if (!user) navigate.push('/auth/login');
  }, [user]);

  useEffect(() => {
    if (user) {
      startFetching(async () => {
        await getCheckoutForOrder(user.id)
          .then((res) => {
            if (res?.error) toast.error(res.error);
            if (res?.data) setCheckoutInformation(res.data);
          })
          .catch(() => toast.error('Gagal mengambil produk!'));
      })
    }
  }, []);

  return (
    <div>
      <div className="bg-primary p-2 text-center">
        <h1 className="text-primary-foreground font-semibold text-lg sm:text-xl">
          Konfirmasi Checkout
        </h1>
      </div>
      {(isLoading || checkoutInformation === null) && (
        <div className="h-[300px] flex justify-center items-center">
          <LoaderCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {checkoutInformation && (
        <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-10 md:gap-4 lg:gap-10 mt-10">
          <div className="md:col-span-6 lg:col-span-8">
            <FormCheckout data={checkoutInformation} />
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <CheckoutInformation data={checkoutInformation} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage