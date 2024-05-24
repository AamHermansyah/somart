'use client'

import React, { useEffect } from 'react'
import FormCheckout from './_components/form-checkout'
import CheckoutInformation from './_components/checkout-information'
import useUserStore from '@/stores/user'
import { useRouter } from 'next/navigation'

function CheckoutPage() {
  const { user } = useUserStore();
  const navigate = useRouter();

  useEffect(() => {
    if (!user) navigate.push('/auth/login');
  }, [user]);

  return (
    <div>
      <div className="bg-primary p-2 text-center">
        <h1 className="text-primary-foreground font-semibold text-lg sm:text-xl">
          Konfirmasi Checkout
        </h1>
      </div>
      <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-10 md:gap-4 lg:gap-10 mt-10">
        <div className="md:col-span-6 lg:col-span-8">
          <FormCheckout />
        </div>
        <div className="md:col-span-6 lg:col-span-4">
          <CheckoutInformation />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage