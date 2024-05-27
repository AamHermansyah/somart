import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { addMonthlyStock, deleteMonthlyStock, editMonthlyStock } from '@/actions/monthly-stock'
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

export function DeleteAlert({ open, setOpen, data, onRefreshData }: PropTypes) {
  const [isLoading, startFetching] = useTransition();
  const { user } = useUserStore();


  const handleDeleteMonthlyStock = () => {
    if (user && data) {
      startFetching(async () => {
        await deleteMonthlyStock(data.id)
          .then((data) => {
            if (data?.success) {
              toast.success(data.success);
              setOpen(false);
              onRefreshData();
            };
          })
          .catch(() => toast.error('Gagal menghapus stok!'));
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus stok data? Aksi tidak dapat dibatalkan setelah menghapusnya!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button
            disabled={isLoading}
            onClick={handleDeleteMonthlyStock}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Hapus Data
              </>
            ) : 'Hapus Data'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
