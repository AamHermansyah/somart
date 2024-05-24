import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

function MarketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-10 mt-10">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default MarketLayout