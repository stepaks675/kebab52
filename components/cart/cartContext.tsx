"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  img: string;
  weight:number
}
interface Cart {
  items: Product[];
  total: number;
}
interface Action {
  type: "add" | "remove" | "clear" | "init";
  item: Product;
}
const cartContext = createContext<{
  state: Cart;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const CartReducer = (state: Cart, action: Action): Cart => {
  switch (action.type) {
    case "init":
      return {
        items: action.items,
        total: action.total,
      }
      
    case "add":
      const newCart1 = state.items;
      let flag = false;
      for (let i = 0; i < state.items.length; i++) {
        if (newCart1[i].id == action.item.id) {
          flag = true;
          newCart1[i].quantity += action.item.quantity;
          break;
        }
      }
      if (!flag) newCart1.push(action.item);
      return {
        items: [...newCart1],
        total: state.total + action.item.price * action.item.quantity,
      };

    case "remove":
      const newCart = state.items.map((item) =>
        item.id == action.item.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        items: newCart.filter((item) => item.quantity > 0),
        total: state.total - action.item.price,
      };

    case "clear":
      return {
        items: [],
        total: 0,
      };
  }
};

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const initialState = {
    items: [],
    total: 0
  };
  const [state, dispatch] = useReducer(CartReducer, initialState);
  useEffect(()=>{
    dispatch({
      type: "init",
      items: JSON.parse(localStorage.getItem("cart") || "[]"),
      total: JSON.parse(localStorage.getItem("total") || "0"),
    })
  },[])
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(state.items))
    localStorage.setItem("total", JSON.stringify(state.total))
  },[state])
  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
