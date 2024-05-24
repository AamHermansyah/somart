'use client'

import React, { useEffect } from 'react'
import { OrderHistory } from './_components/order-history'
import useUserStore from '@/stores/user';
import { useRouter } from 'next/navigation';

function OrderListPage() {
  const { user } = useUserStore();
  const navigate = useRouter();

  useEffect(() => {
    if (!user) navigate.push('/auth/login');
  }, [user]);

  return (
    <div>
      <div className="bg-primary p-2 text-center">
        <h1 className="text-primary-foreground font-semibold text-lg sm:text-xl">
          Order Saya
        </h1>
      </div>
      <div className="mt-10">
        <OrderHistory />
      </div>
    </div>
  )
}

export default OrderListPage