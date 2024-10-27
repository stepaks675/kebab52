import { useState } from "react";
import { useCart } from "../cart/cartContext";
import { FaCartPlus } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
export const Product = ({
  id,
  price,
  name,
  img,
  weight,
  option = "NORMAL"
}: {
  id: number;
  price: number;
  name: string;
  img: string;
  weight: number;
  option: "DEV" | "NORMAL"
}) => {
  const { dispatch } = useCart();
  const handleSubmit = () => {
    dispatch({
      type: "add",
      item: { id: id, price: price, name: name, quantity: amount },
    });
  };
  const [amount, setAmount] = useState(0);
  return (
    <div className="flex flex-col items-center py-2 px-3 hover:shadow-2xl  transistion-all duration-500">
      <span className="font-semibold text-lg">{name}</span>
      <img className="w-[300px] h-[200px] rounded-lg overflow-hidden" src={img} />
      <div className="flex items-center justify-around gap-1">
        <span className="font-bold ">{price} р. </span>
        <span className="font-extralight"> / {weight} гр.</span>
      </div>

      <div className="flex items-center justify-around w-full mt-1">
        <div className="flex justify-center  gap-2">
          <button
            onClick={() => {
              setAmount((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
            }}
          >
            <FaMinus/>
          </button>
          <span className="text-orange-600 font-semibold border border-slate-300 px-1 rounded-md min-w-16"> {amount} шт. </span>
          <button
            onClick={() => {
              setAmount((prev) => prev + 1);
            }}
          >
           <FaPlus/>
          </button>
        </div>
        <button disabled={option == "DEV"} onClick={handleSubmit} className="border  px-2 py-1 border-slate-200 rounded-2xl bg-orange-600 flex items-center gap-1 hover:bg-orange-400 transistion-all duration-200">
          <FaCartPlus/>
          <span className="text-white font-semibold">В корзину</span>
        </button>
      </div>
    </div>
  );
};
