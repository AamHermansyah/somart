import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PropTypes = {
  onAddToCart: () => void;
}

export function CardProduct({ onAddToCart }: PropTypes) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="w-full aspect-[3/2] bg-muted">
          <img
            src="https://source.unsplash.com/random/400x300/"
            alt="product-1"
            className="w-full h-full object-cover aspect-[3/2]"
          />
        </div>
      </CardHeader>
      <CardContent className="text-center py-4 px-2 sm:px-6">
        <CardTitle className="text-base sm:text-lg">Minyak Jelantah 200ml</CardTitle>
        <CardDescription className="text-xs sm:text-base font-semibold tracking-wide">Rp 12.000</CardDescription>
      </CardContent>
      <CardFooter className="justify-center pb-4 sm:pb-6">
        <Button variant="outline" onClick={onAddToCart}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
