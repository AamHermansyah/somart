import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoMart",
  description: "Belanja dengan mudah lewat SoMart!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-10 mt-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
