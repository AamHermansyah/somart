import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { editMonthlyStock } from '@/actions/monthly-stock'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserStore from '@/stores/user'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { MonthlyStock } from "@prisma/client"

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: MonthlyStock | null;
  onRefreshData: () => void;
}

export function EditAlert({ open, setOpen, data, onRefreshData }: PropTypes) {
  const [label, setLabel] = useState('');
  const [stock, setStock] = useState('');
  const [isLoading, startFetching] = useTransition();
  const { user } = useUserStore();


  const handleEditMonthlyStock = () => {
    if (user && data) {
      startFetching(async () => {
        await editMonthlyStock({ ...data, label, value: +stock })
          .then((data) => {
            if (data?.success) {
              toast.success(data.success);
              setOpen(false);
              onRefreshData();
            };
          })
          .catch(() => toast.error('Gagal mengedit stok!'));
      });
    }
  }

  useEffect(() => {
    if (data) {
      setLabel(data.label);
      setStock(data.value + '');
    }
  }, [data]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Data</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
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
          <div className="grid w-full items-center gap-1.5">
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
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button
            disabled={isLoading || !label.length || !stock.length}
            onClick={handleEditMonthlyStock}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Edit Data
              </>
            ) : 'Edit Data'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
