"use client";
import { AddForm } from "@/components/admin/AddForm";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { useState } from "react";


export default function AdminPage() {


  const [option, setOption] = useState("ADD")



  
  return (
    <div className="w-1/2 min-w-[500px] h-fit flex flex-col mx-auto">
      <label>Выбор действия</label>
      <select onChange={(e)=>setOption(e.target.value)}>
        <option value="ADD">Создать/обновить</option>
        <option value="DELETE">Удалить</option>
      </select>
      {option == "ADD" ?  <AddForm/> : <DeleteForm/>}
      
    </div>
  );
}
