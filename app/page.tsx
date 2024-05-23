import { Carousel } from "./_components/carousel"
import Hero from "./_components/hero";
import Products from "./_components/products";

export default function Home() {
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-10 mt-10 space-y-10 overflow-x-hidden">
      <Carousel />
      <Products />
      <Hero />
    </div>
  );
}
