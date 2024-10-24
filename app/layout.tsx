
import type { Metadata } from "next";
import { Header } from "@/components";
import { CartProvider } from "@/components/cart/cartContext";
import "./globals.css";
import { Categories } from "@/components/menunav/Categories";

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
      <body className="bg-stone-100 text-lg overflow-y-scroll">
        <CartProvider>
          <Header />
          <Categories/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
