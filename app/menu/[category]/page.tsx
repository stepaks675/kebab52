"use client";
import { useCart } from "@/components/cart/cartContext";
import React from "react";
const CategoryPage = ({ params }: { params: any }) => {
  const cat: any = React.use(params);
  const { dispatch } = useCart();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "add",
            item: { id: 1, name: "Govno", quantity: 1, price: 100 },
          });
        }}
      >
        ДОБАВИТЬ ПОНОСИК{" "}
      </button>
    </div>
  );
};

export default CategoryPage;
