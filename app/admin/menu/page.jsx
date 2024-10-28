"use client";
import { IoReturnDownBack } from "react-icons/io5";

import { AddForm } from "@/components/admin/AddForm";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { useState } from "react";
import Link from "next/link";


export default function AdminPage() {


  const [option, setOption] = useState("ADD")



  
  return (
  
    <div className="w-1/2 min-w-[500px] h-fit flex flex-col mx-auto">
      <Link className="text-3xl px-2 py-1 bg-red-600 my-3 text-center text-white" href="/admin">Назад</Link>
      <label>Выбор действия</label>
      <select onChange={(e)=>setOption(e.target.value)}>
        <option value="ADD">Создать/обновить</option>
        <option value="DELETE">Удалить</option>
      </select>
      {option == "ADD" ?  <AddForm/> : <DeleteForm/>}
      
    </div>
  );
}
