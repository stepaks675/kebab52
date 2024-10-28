import Link from "next/link";

export default function AdminMain(){
    return (
        
        <div className="flex flex-col text-center w-fit mx-auto h-fit mt-10 gap-4">
            <Link className="text-5xl bg-green-300 text-white px-3 py-2" href="/admin/menu">Управление меню</Link>
            <Link className="text-5xl bg-orange-300 text-white px-3 py-2" href="/admin/orders">Заказы</Link>
        </div>
    )
}