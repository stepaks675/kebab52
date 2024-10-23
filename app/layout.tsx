
import type { Metadata } from "next";
import { Header } from "@/components";
import { CartProvider } from "@/components/cart/cartContext";
import "./globals.css";
import { Menu } from "@/components/menu/Menu";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-100 text-lg">
        <CartProvider>
          <Header />
          <Menu />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}