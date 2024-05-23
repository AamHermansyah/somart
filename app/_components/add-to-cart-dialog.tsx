import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BiSolidShoppingBag } from "react-icons/bi";

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function AddToCartDialog({ open, setOpen }: PropTypes) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md md:max-w-3xl grid-cols-12 gap-3 sm:gap-6 p-10">
        <div className="relative col-span-12 md:col-span-5 w-full max-w-[200px] md:max-w-none mx-auto aspect-square rounded-lg bg-muted overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x300"
            alt="product-1"
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="col-span-12 md:col-span-7 space-y-2 sm:space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center md:text-left text-xl sm:text-2xl font-bold">
              Minyak Jelantah 200ml
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-center md:text-left">
              Minyak berkualitas dengan wadah yang sangat besar, cocok digunakan untuk sekali pakai!
            </DialogDescription>
          </DialogHeader>
          <div className="text-center md:text-left">
            <span className="text-2xl sm:text-3xl font-bold">Rp 12.000</span>
            <p className="text-base sm:text-lg font-medium tracking-wide">Jumlah (200ml)</p>
          </div>
          <div className="space-x-3 flex justify-center md:justify-start items-center">
            <div className="inline-flex w-full max-w-[120px] border rounded-lg px-4 py-2">
              <button> - </button>
              <div className="flex-auto text-center">1</div>
              <button> + </button>
            </div>
            <div className="inline-block">
              <h4 className="text-lg sm:text-xl font-bold"> = Rp 12.000</h4>
            </div>
          </div>
          <div className="grid space-y-2 pt-2 sm:pt-0">
            <Button className="w-full md:w-max gap-2" type="submit">
              <BiSolidShoppingBag />
              Add To Cart
            </Button>
            <span className="text-sm text-center md:text-left"><b>Kategori:</b> Kebutuhan Rumah Tangga</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCartDialog;
