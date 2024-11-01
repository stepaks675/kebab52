"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
export default function OrderPage() {
  const [orders, setOrders] = useState([]); //получим все заказы
  const [products, setProducts] = useState({}); //получим все продукты для сопоставления по id
  useEffect(() => {
    fetch("/api/admin/product")
      .then((res) => res.json())
      .then((data) => {
        let prodmap = {};
        data.forEach((item) => {
          prodmap[Object.keys(item)[0]] = Object.values(item)[0];
        });
        setProducts({ ...prodmap });
        console.log(prodmap);
      });
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);
  return (
    <div>
      {orders.length > 0 ? (
        <div className="grid grid-cols-5 grid-flow-row px-10 gap-5 mt-10">
          {orders.map((item) => {
            let items: string[] = [];
            Object.keys(item.products).forEach((prod, index) => {
              const amount = Object.values(item.products)[index];
              const product = products[prod];
              items.push(`${product} ${amount}шт.`);
            });
            console.log(items)
            return <Order key={item.id} status={item.status} id={item.id} items={items} date={item.date} name={item?.name || undefined} phone={item.phone || undefined}/>
          })}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

function Order(props: {
  status: string;
  id: number;
  date: string;
  items: string[];
  phone: string;
  name: string | undefined;
}) {
  const [status, setStatus] = useState(props.status);
  const statusClass = clsx("font-semibold", {
    "text-red-500": status == "Текущий",
    "text-green-500": status == "Выполнен",
    "text-grey-500": status == "Отменён",
  });

  return (
    <div className="p-4 h-fit flex-col bg-slate-200 rounded-xl border border-slate-500 text-wrap">
      <span className="text-2xl font-semibold block">Заказ №{props.id}</span>
      <span className="text-lg font-light block">от {props.date}</span>
      <span className="text-xl ">
        Статус: <span className={statusClass}>{status}</span>
      </span>

      <div>
        Состав:
        {props.items.map((item, index) => {
          return <Item key={index} name={item} />;
        })}
      </div>
      <span className="text-lg block">Контакты:</span>
      {props?.name && <span className="text-lg">{props.name} </span>}
      {props?.phone && <span className="text-lg">{props.phone}</span>}
      <div className="flex w-full mt-3 mb-2 justify-between px-2">
        <button className="bg-orange-500  text-white text-xl px-3 py-2 hover:bg-orange-600 transistion-colors rounded-lg"
          onClick={() => {
            const r = confirm("Подтвердить изменение статуса на 'Отменён'?");
            if (r) setStatus("Отменён");
          }}
        >
          Отменён
        </button>
        <button className="bg-green-500 text-white text-xl px-3 py-2 hover:bg-green-600 transition-colors rounded-lg"
          onClick={() => {
            const r = confirm("Подтвердить изменение статуса на 'Выполнен'?");
            if (r) setStatus("Выполнен");
          }}
        >
          Выполнен
        </button>
      </div>
    </div>
  );
}

function Item({ name }: { name: string }) {
  const [isDone, setIsDone] = useState(false);
  const itemClass = clsx("block ml-3 cursor-pointer max-w-full", {
    "text-green-500 line-through": isDone,
    "text-black": !isDone,
  });
  return (
    <span
      className={itemClass}
      onClick={() => {
        setIsDone((prev) => !prev);
      }}
    >
      {name}
    </span>
  );
}
