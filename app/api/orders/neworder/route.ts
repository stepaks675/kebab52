import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST (req : Request){
    const data = await req.formData()
    try{
        const positionsRaw = JSON.parse(data.get("positions"));
        const positions = {};

        positionsRaw.forEach(item => {
            const key = Object.keys(item)[0]; 
            const value = Object.values(item)[0]; 
            positions[key] = value; 
        });


        const dborder = {
            status:"Текущий",
            products: positions,
            date: new Date(Date.now()).toLocaleString(),
            takeaway: data.get("takeaway") == "true" ? true : false,
            phone: JSON.parse(data.get("contacts")).phone
        }

        if (JSON.parse(data.get("contacts")).name.length>0){
            dborder.name = JSON.parse(data.get("contacts")).name;
        }

        if (data.get("address")){
            dborder.adress = data.get("address")
        }
        if (data.get("suggestion")){
            dborder.suggestion = data.get("suggestion")
        }
        console.log(dborder)
        await prisma.order.create({
            data:{
                ...dborder
            }
        }) 
        return NextResponse.json("Заказ сформирован успешно", {status:200})
    } catch (err){
        console.log(err)
        return NextResponse.json(err,{status:404})
    }
}