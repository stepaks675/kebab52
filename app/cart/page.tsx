"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
const defOrder = {
  isTakeAway: false,
  address: {
    street: "",
    house: "",
    flat: "",
  },
  contacts: {
    name: "",
    phone: "",
  },
  positions: {
    // id : amount
  },
  comments: "",
}
export default function CartPage(): React.ReactElement {
  const { state, dispatch } = useCart();
  const [order, setOrder] = useState(defOrder);
  const handleSubmit = () => {
    //валидация и отправка заказа
    const data = new FormData();

    data.append("takeaway", String(order.isTakeAway));

    if (
      !order.isTakeAway &&
      (!order.address.street || !order.address.house || !order.address.flat)
    ) {
      alert("Заполните поля адреса для доставки");
      return;
    }
    data.append("address", Object.values(order.address).join(", "));

    if (!order.contacts.phone) {
      alert("Укажите номер для связи");
      return;
    }

    data.append("contacts", JSON.stringify(order.contacts));

    const positions = state.items.map((item) => {
      return { [item.id]: item.quantity };
    });
    data.append("positions", JSON.stringify(positions));
    data.append("suggestion", order.comments);

    if (confirm(`Подтверждаете заказ на сумму ${state.total}`)) {
      fetch("/api/orders/neworder", {
        method: "POST",
        body: data,
      });
      dispatch({type:"clear"})
      alert("Спасибо за заказ!")
      setOrder(defOrder)
    }
  };
  console.log(order);
  return (
    <div className="mx-auto max-w-[1500px] pt-10 px-2">
      <div className="flex gap-24 flex-wrap">
        <div className="flex flex-col gap-5 items-start">
          {state.items.length>0 && state.items.map((item, index) => (
            <div
              key={index}
              className="flex shadow-sm rounded-lg h-[125px] overflow-hidden border-t border-gray-200 hover:shadow-md hover:border-gray-300 transistion-all duration-300"
            >
              <div className="mr-5 w-[150px]">
                <img
                  className="w-[150px] h-full object-fill  "
                  src={item.img}
                />
              </div>
              <div className="h-full flex-col min-w-48">
                <span className="text-xl font-semibold block">{item.name}</span>
                <span className="text-lg font-light block">
                  {item.weight} г.{" "}
                </span>
              </div>
              <div className="ml-8 sm:ml-36 md:ml-48 lg:ml-72 xl:ml-96  mr-8 flex flex-col items-center justify-center gap-1">
                <div>
                  <div className="flex justify-center  gap-2">
                    <button
                      onClick={() => {
                        dispatch({
                          type: "remove",
                          item: {
                            id: item.id,
                            name: item.name,
                            img: item.img,
                            price: item.price,
                            quantity: item.quantity,
                            weight: item.weight,
                          },
                        });
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
                        dispatch({
                          type: "add",
                          item: {
                            id: item.id,
                            name: item.name,
                            img: item.img,
                            price: item.price,
                            quantity: 1,
                            weight: item.weight,
                          },
                        });
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <span className="block font-semibold">
                  {item.quantity * item.price}р.
                </span>
              </div>
            </div>
          ))}
          {state.items.length>0 && <button className="text-red-600 bg-slate-200 text-2xl p-3 rounded-xl border border-black hover:bg-slate-300 transition-colors " onClick={()=>{
            dispatch({type:"clear" , item : {}})
          }}>Очистить корзину</button>}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="text-2xl">Сумма заказа: {state.total} р.</div>
          <form className="max-w-full flex-col">
            <div className="flex flex-col gap-1">
              <div>
                <input
                  className="mr-3"
                  name="delivery"
                  type="radio"
                  id="delivery1"
                  checked={!order.isTakeAway}
                  onChange={() => {
                    setOrder((prev) => {
                      return { ...prev, isTakeAway: false };
                    });
                  }}
                />
                <label htmlFor="delivery1">Доставка</label>
              </div>
              <div>
                <input
                  className="mr-3"
                  name="delivery"
                  type="radio"
                  id="delivery2"
                  onChange={() => {
                    setOrder((prev) => {
                      return { ...prev, isTakeAway: true };
                    });
                  }}
                />
                <label htmlFor="delivery2">Самовывоз</label>
              </div>
            </div>
            {!order.isTakeAway && (
              <div className="flex flex-col gap-1 items-start">
                <div className="mt-2">
                  <label className="mr-3 " htmlFor="street">
                    Улица
                  </label>
                  <input
                    className="rounded-xl px-2"
                    type="text"
                    name="street"
                    value={order.address.street}
                    onChange={(e) => {
                      setOrder((prev) => {
                        return {
                          ...prev,
                          address: { ...prev.address, street: e.target.value },
                        };
                      });
                    }}
                  />
                </div>
                <div className="flex gap-2 my-2">
                  <label className="mr-3 " htmlFor="house">
                    Дом
                  </label>
                  <input
                    className="rounded-lg px-1 w-20"
                    type="text"
                    name="house"
                    value={order.address.house}
                    onChange={(e) => {
                      setOrder((prev) => {
                        return {
                          ...prev,
                          address: { ...prev.address, house: e.target.value },
                        };
                      });
                    }}
                  />
                  <label className="mr-3 " htmlFor="flat">
                    Квартира
                  </label>
                  <input
                    className="rounded-lg px-1 w-20"
                    type="text"
                    name="flat"
                    value={order.address.flat}
                    onChange={(e) => {
                      setOrder((prev) => {
                        return {
                          ...prev,
                          address: { ...prev.address, flat: e.target.value },
                        };
                      });
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col mt-2 gap-4">
              <div>
                <label className="mr-3" htmlFor="name">
                  Имя
                </label>
                <input
                  className="rounded-lg px-2"
                  type="text"
                  name="name"
                  value={order.contacts.name}
                  onChange={(e) => {
                    setOrder((prev) => {
                      return {
                        ...prev,
                        contacts: { ...prev.contacts, name: e.target.value },
                      };
                    });
                  }}
                />
              </div>
              <div>
                <label className="mr-3" htmlFor="phone">
                  Номер телефона
                </label>
                <input
                  className="rounded-lg px-2"
                  type="text"
                  name="phone"
                  value={order.contacts.phone}
                  onChange={(e) => {
                    setOrder((prev) => {
                      return {
                        ...prev,
                        contacts: { ...prev.contacts, phone: e.target.value },
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex mt-4">
              <label className="mr-3" htmlFor="sugg">
                Пожелания
              </label>
              <textarea
                className="rounded-lg px-2 resize-none overflow-visible"
                rows={3}
                name="sugg"
                value={order.comments}
                onChange={(e) => {
                  setOrder((prev) => {
                    return {
                      ...prev,
                      comments: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </form>
          <button
            disabled={state.items.length == 0}
            className="border mt-2 px-3 py-2 rounded-xl bg-orange-400 text-white text-2xl disabled:bg-gray-300 hover:bg-orange-500 transition-colors"
            onClick={handleSubmit}
          >
            Сделать заказ
          </button>
        </div>
      </div>
    </div>
  );
}
