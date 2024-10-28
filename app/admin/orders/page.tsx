"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
export default function OrderPage(){
    const [orders, setOrders] = useState([]) //получим все заказы
    const [products, setProducts] = useState([]) //получим все продукты для сопоставления по id
    useEffect(()=>{
        fetch("/api/admin/orders").then(res =>res.json()).then( data => {
            setOrders(data)
        })
        fetch("/api/admin/orders").then(res =>res.json()).then( data => {
            setOrders(data)
        })
    },[])
    return <div
    className="grid grid-cols-5 grid-flow-row px-10 gap-5 mt-10">
        <Order status="Текущий" id={1} date={"29.10.2024"} name="Егор" phone="+79535540878" items={["Понос с какашками", "Икра из говна", "Холодец с хуем" , "ПЕПСИКОЛО"]}/>
        <Order status="Выполнен" id={1} date={"29.10.2024"} name="Егор" phone="+79535540878" items={["Понос с какашками", "Икра из говна", "Холодец с хуем" , "ПЕПСИКОЛО"]}/>
        <Order status="Выполнен" id={1} date={"29.10.2024"} name="Егор" phone="+79535540878" items={["Понос с какашками", "Икра из говна", "Холодец с хуем" , "ПЕПСИКОЛО"]}/>
        <Order status="Выполнен" id={1} date={"29.10.2024"} name="Егор" phone="+79535540878" items={["Понос с какашками", "Икра из говна", "Холодец с хуем" , "ПЕПСИКОЛО"]}/>
        <Order status="Выполнен" id={1} date={"29.10.2024"} name="Егор" phone="+79535540878" items={["Понос с какашками", "Икра из говна", "Холодец с хуем" , "ПЕПСИКОЛО"]}/>
        <Order status="Выполнен" id={1} date={"29.10.2024"} name="Егор" phone="+79535540878" items={["Понос с какашками", "Икра из говна", "Холодец с хуем" , "ПЕПСИКОЛО"]}/>
    </div>
}

function Order(props : {status: string, id:number, date: string, items: string[], name: string | undefined, phone: string | undefined}){
    const [status, setStatus] = useState(props.status)
    const statusClass= clsx("font-semibold",{
        "text-red-500" : status=="Текущий",
        "text-green-500" : status=="Выполнен",
        "text-grey-500": status=="Отменён"
    })

    return <div className="p-4 h-fit flex-col bg-slate-200 rounded-xl border border-slate-500 text-wrap" >
        <span className="text-2xl font-semibold block">Заказ №{props.id}</span>
        <span className="text-lg font-light block">от {props.date}</span>
        <span className="text-xl ">Статус: <span className={statusClass}>{status}</span></span>

        <div>Состав:{props.items.map((item,index)=> {
            return <Item key={index} name={item}/>
        })}</div>
        <span className="text-lg block">Контакты:</span>
        {props?.name && <span className="text-lg">{props.name} </span>}
        {props?.phone && <span className="text-lg">{props.phone}</span>}
        <div className="flex w-full mt-3 mb-2 justify-between px-2">
            <button onClick={()=>{
                const r = confirm("Подтвердить изменение статуса на 'Отменён'?")
                if (r) setStatus("Отменён")
            }}>Отменён</button>
            <button
            onClick={()=>{
                const r = confirm("Подтвердить изменение статуса на 'Выполнен'?")
                if (r) setStatus("Выполнен")
            }}>Выполнен</button>
        </div>
    </div>
}

function Item({name} : { name: string}){
    const [isDone, setIsDone] = useState(false)
    const itemClass = clsx("block ml-3 cursor-pointer max-w-full",{
        "text-green-500 line-through" : isDone,
        "text-black" : !isDone
    })
    return <span className={itemClass} onClick={()=>{
        setIsDone(prev => !prev)
    }}>{name}</span>
}