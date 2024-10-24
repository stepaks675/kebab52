"use client";
import { createContext, useContext, useReducer } from "react";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
interface Cart {
  items: Product[];
  total: number;
}
interface Action {
  type: "add" | "remove" | "clear";
  item: Product;
}
const cartContext = createContext<{
  state: Cart;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const initialState: Cart = { items: [], total: 0 };

const CartReducer = (state: Cart, action: Action): Cart => {
  switch (action.type) {
    case "add":
      const newCart1 = state.items;
      let flag = false;
      for (let i = 0; i < state.items.length; i++) {
        if (newCart1[i].id == action.item.id) {
          flag = true;
          newCart1[i].quantity+= action.item.quantity;
          break;
        }
      }
      if (!flag) newCart1.push(action.item);
      return {
        items: [...newCart1],
        total: state.total + action.item.price,
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
  const [state, dispatch] = useReducer(CartReducer, initialState);
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
