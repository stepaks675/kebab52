import { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

interface Product {
    id: number,
    category: string,
    name: string
}

export const DeleteForm = () => {
  const [prods, setProds] = useState<Product[]>([]);
  const [update, setUpdate] = useState(false)
  
  useEffect(() => {
    async function getProds() {
      const res = await fetch("/api/menu/products");
      const produc = await res.json();
      setProds(produc);
    }
    getProds();
  }, [update]);

  async function onDelete(id : number){
    const data = new FormData()
    data.append("id", String(id))
    data.append("option", "DELETE")
    const res = await fetch("/api/admin/product", {
        method: "POST",
        body: data
    })
    if (res.status==200) {alert("Успешно удалено")
        setUpdate((prev)=>!prev);
    }
  } 
  return (
    <div className="flex flex-col mx-auto gap-1 border border-orange-400 mt-5 px-2">
      Меню:
      {prods.map((item, index) => {
        return (
          <div key={index} className="flex items-center gap-2 border border-slate-200 pl-2">
            <MdOutlineDeleteForever className="text-red-400 scale-150 cursor-pointer" onClick={()=>{onDelete(item.id)}} />
            <div className="flex flex-col gap-1" >
              <span>Название: {item.name}</span>{" "}
              <span>Категория: {item.category}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
