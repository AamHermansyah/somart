import { Carousel } from "./_components/carousel"
import Hero from "./_components/hero"
import Products from "./_components/products"

export default function Home() {
  return (
    <div className="space-y-10 overflow-x-hidden">
      <Carousel />
      <Products />
      <Hero />
    </div>
  );
}
