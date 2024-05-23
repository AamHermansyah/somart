import {
  Carousel as CarouselWrapper,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Carousel() {
  return (
    <CarouselWrapper className="w-full mx-auto">
      <CarouselContent>
        {['bag', 'river', 'night'].map((title, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-video md:aspect-[16/5] rounded-lg overflow-hidden bg-muted">
              <img
                src={`https://source.unsplash.com/random/1600x500/?${title}`}
                alt={`slide-${index + 1}`}
                className="absolute w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselWrapper>
  )
}
