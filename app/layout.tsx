import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/components/cart/cartContext";
import { Header } from "@/components";
import { Categories } from "@/components/menunav/Categories";
import { Footer } from "@/components";

export const metadata: Metadata = {
  title: "Шашлык52",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-stone-100 text-lg overflow-y-scroll min-h-screen">
        <div className="flex-grow">
        <CartProvider>
          <Header />
          <Categories/>
          {children}
        </CartProvider>
        </div>
        <Footer/>
      </body>
    </html>
  );
}
