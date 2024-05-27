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
        {['1', '20', '16'].map((id, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-video md:aspect-[16/5] rounded-lg overflow-hidden bg-muted">
              <img
                src={`https://picsum.photos/id/${id}/1600/400`}
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
