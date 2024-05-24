import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner";
import RefetchingUser from "@/components/refetching-user";

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
        <Toaster />
        <RefetchingUser />
        {children}
      </body>
    </html>
  );
}
