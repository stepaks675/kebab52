"use client"
import { useCart } from "@/components/cart/cartContext";
export default function CartPage(): React.ReactElement {
  const { state, dispatch } = useCart();

  return (
    <div>
      {state.items.map((item, index) => (
        <div key={index}>{item.name} : {item.quantity}</div>
      ))}
    </div>
  );
}
