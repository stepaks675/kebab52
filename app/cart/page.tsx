"use client";

import { useCart } from "@/components/cart/cartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
export default function CartPage(): React.ReactElement {
  const { state, dispatch } = useCart();

  return (
    <div className="mx-auto max-w-[1500px] pt-10">
      <div className="flex flex-col gap-5 items-start">
        {state.items.map((item, index) => (
          <div
            key={index}
            className="flex shadow-sm rounded-lg h-[125px] overflow-hidden border-t border-gray-200 hover:shadow-md hover:border-gray-300 transistion-all duration-300"
          >
            <div className="mr-5">
              <img
                className="w-[150px] h-full object-fill  "
                src={item.img}
              />
            </div>
            <div className="h-full flex-col w-48">
              <span className="text-xl font-semibold block">{item.name}</span>
              <span className="text-lg font-light block">
                {item.weight} г.{" "}
              </span>
            </div>
            <div className="ml-72 mr-8 flex flex-col items-center justify-center gap-1">
              <div>
                <div className="flex justify-center  gap-2">
                  <button
                    onClick={() => {
                      dispatch({type: "remove", item:{
                        id : item.id,
                        name: item.name,
                        img: item.img,
                        price:item.price,
                        quantity: item.quantity,
                        weight: item.weight
                      }})
                    }}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-orange-600 font-semibold border border-slate-300 px-1 rounded-md min-w-16">
                    {" "}
                    {item.quantity} шт.{" "}
                  </span>
                  <button
                    onClick={() => {
                      dispatch({type:"add", item:{
                        id : item.id,
                        name: item.name,
                        img: item.img,
                        price:item.price,
                        quantity: 1,
                        weight: item.weight
                      }})
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <span className="block font-semibold">{item.quantity * item.price}р.</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-2xl">ИТОГОВЫЙ ПРАЙС: {state.total} РУБЛЕВ</div>
      <button className="border px-3 py-2 rounded-xl bg-orange-400 text-white text-2xl">
        ORDER
      </button>
    </div>
  );
}
