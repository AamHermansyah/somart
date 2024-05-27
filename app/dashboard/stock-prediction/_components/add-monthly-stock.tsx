import { addMonthlyStock } from '@/actions/monthly-stock';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserStore from '@/stores/user';
import { LoaderCircle } from 'lucide-react';
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner';

type PropTypes = {
  onRefreshData: () => void;
}

function AddMonthlyStock({ onRefreshData }: PropTypes) {
  const [label, setLabel] = useState('');
  const [stock, setStock] = useState('');
  const [isLoading, startFetching] = useTransition();
  const { user } = useUserStore();


  const handleAddMonthlyStock = () => {
    if (user) {
      startFetching(async () => {
        await addMonthlyStock({ idUser: user.id, label, value: +stock })
          .then((data) => {
            if (data?.success) {
              toast.success(data.success);
              setLabel('');
              setStock('');
              onRefreshData();
            };
          })
          .catch(() => toast.error('Gagal menambah stok!'));
      });
    }
  }

  return (
    <div className="grid grid-cols-2 sm:flex sm:items-end sm:justify-end gap-4 sm:flex-nowrap">
      <div className="grid w-full sm:max-w-[150px] items-center gap-1.5">
        <Label htmlFor="label">Label Bulan</Label>
        <Input
          value={label}
          type="text"
          id="label"
          placeholder="Misal: Mei 2020"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          disabled={isLoading}
        />
      </div>
      <div className="grid w-full sm:max-w-[150px] items-center gap-1.5">
        <Label htmlFor="stock">Produk Terjual</Label>
        <Input
          value={stock}
          type="text"
          id="stock"
          placeholder="Masukan stok"
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(+value) && +value >= 0) {
              setStock(value);
            }
          }}
          disabled={isLoading}
        />
      </div>
      <Button
        disabled={isLoading || !label.length || !stock.length}
        onClick={handleAddMonthlyStock}
        className="gap-2 col-span-2"
      >
        {isLoading ? (
          <>
            <LoaderCircle className="w-4 h-4 animate-spin" />
            Tambah Data
          </>
        ) : 'Tambah Data'}
      </Button>
    </div>
  )
}

export default AddMonthlyStock