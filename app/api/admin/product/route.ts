import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(request: Request) {
  //создание нового продукта, удаление старого, изменение
  const data = await request.json();
  switch (data.option) {
    case "ADD":
      try {
        const prod = await prisma.product.findFirst({
          where: {
            name: data.name,
          },
        });
        if (prod) throw new Error("Такая позиция уже существует");
        await prisma.product.create({
          data: {
            name: data.name,
            price: data.price,
            category: data.category,
            img: data.img
          },
        });
        return NextResponse.json({ status: 200 });
      } catch (err) {
        return NextResponse.json(err, { status: 404 });
      }
    case "DELETE":
      try{
        await prisma.product.delete({
          where:{
            id: data.id
          }
        })
        return NextResponse.json({ status: 200 });
      }catch(err){
        return NextResponse.json(err, { status: 404 });
      }
  }
}
