import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatRupiah } from "@/lib/utils"
import { Product } from "@prisma/client"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: Product | null;
  onCloseDialog?: () => void;
}

function AddToCartDialog({ open, setOpen, data, onCloseDialog }: PropTypes) {
  const [amount, setAmount] = useState(1);

  const handleDecrement = () => {
    setAmount((prev) => {
      if (prev > 1) return prev - 1;
      return prev;
    })
  }

  const handleIncrement = () => {
    if (data) {
      setAmount((prev) => {
        if (prev < data.stock) return prev + 1;
        return prev;
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open && onCloseDialog) onCloseDialog();
      setOpen(open);
    }}>
      {data && (
        <DialogContent className="max-w-md md:max-w-3xl grid-cols-12 gap-3 sm:gap-6 p-10 rounded-lg">
          <div className="relative col-span-12 md:col-span-5 w-full max-w-[200px] md:max-w-none mx-auto aspect-square rounded-lg bg-muted overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="absolute w-full h-full object-cover"
            />
            <Badge className="absolute top-2 left-2">Stock: {data.stock}</Badge>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-2 sm:space-y-4">
            <DialogHeader>
              <DialogTitle className="text-center md:text-left text-xl sm:text-2xl font-bold">
                {data.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-center md:text-left">
                {data.description}
              </DialogDescription>
            </DialogHeader>
            <div className="text-center md:text-left">
              <span className="text-2xl sm:text-3xl font-bold">
                {formatRupiah(data.price)}
              </span>
              <p className="text-base sm:text-lg font-medium tracking-wide">Jumlah ({data.quantity})</p>
            </div>
            <div className="space-x-3 flex justify-center md:justify-start items-center">
              <div className="inline-flex w-full max-w-[120px] border rounded-lg px-4 py-2">
                <button onClick={handleDecrement}> - </button>
                <div className="flex-auto text-center">{amount}</div>
                <button onClick={handleIncrement}> + </button>
              </div>
              <div className="inline-block">
                <h4 className="text-lg sm:text-xl font-bold"> = {formatRupiah(amount * data.price)}</h4>
              </div>
            </div>
            <div className="grid space-y-2 pt-2 sm:pt-0">
              <Button className="w-full md:w-max gap-2" type="submit">
                <ShoppingCart className="h-4 w-4" />
                Add To Cart
              </Button>
              <span className="text-sm text-center md:text-left"><b>Kategori:</b> {data.category}</span>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default AddToCartDialog;
