"use client";
import { Product } from "./Product";
import { useState, useEffect } from "react";
interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  weight: number;
  option: "DEV" | "NORMAL";
}
export const ProductList = ({ category }: { category: string }) => {
  //запрос к бд по категории
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(`/api/menu/${category}`);
        const arr: Product[] = await res.json()
        console.log(arr)
        setProducts([...arr])
      } catch (err) {
        alert(err);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map(item => <Product key={item.id} id={item.id} img={item.img} price={item.price} name={item.name} weight={item.weight} option="NORMAL"></Product>)}
    </div>
  );
};
