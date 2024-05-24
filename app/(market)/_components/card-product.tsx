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
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { formatRupiah } from "@/lib/utils";

type PropTypes = {
  onAddToCart: (product: Product) => void;
  hiddenAddToCart?: boolean;
  data: Product;
}

export function CardProduct({ onAddToCart, hiddenAddToCart, data }: PropTypes) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/2] bg-muted">
          <img
            src={data.image}
            alt={data.title}
            className="absolute w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2">Stock: {data.stock}</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center py-4 px-2 sm:px-6">
        <CardTitle className="text-base sm:text-lg">{data.title}</CardTitle>
        <CardDescription className="text-xs sm:text-base font-semibold tracking-wide">
          {formatRupiah(data.price)}
        </CardDescription>
      </CardContent>
      {!hiddenAddToCart && (
        <CardFooter className="justify-center pb-4 sm:pb-6">
          <Button variant="outline" onClick={() => {
            onAddToCart(data);
          }}>
            Add to cart
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
