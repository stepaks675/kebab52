import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import fs from "fs"
import path from 'path';

async function saveImage(img : any){
  const arrayBuffer = await img.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = path.join(process.cwd(), 'public', 'uploads', img.name);
  console.log(filePath)
  fs.writeFileSync(filePath, buffer);
  return `../uploads/${img.name}`
}

export async function POST(request: Request) {
  const res = await fetch("/api/admin/validate")
    if (res.status!=200) redirect("/login")
  //создание нового продукта, удаление старого, изменение
  const data = await request.formData();
  switch (data.get("option")) {
    case "ADD":
      try {
        const imgpath = await saveImage(data.get("img"))
        await prisma.product.upsert({
          where: {
            name: data.get("name") as string,
          },
          update:{},
          create: {
            name: data.get("name") as string,
            price: parseFloat(data.get("price") as string),
            category: data.get("category") as string,
            weight : parseFloat(data.get("weight") as string) ,
            img: imgpath,
          },
        });
        return NextResponse.json({ status: 200 });
      } catch (err) {
        return NextResponse.json(err, { status: 404 });
      }
    case "DELETE":
      try {
        console.log(data)
        await prisma.product.delete({
          where: {
            id: parseInt(data.get("id") as string),
          },
        });
        return NextResponse.json({ status: 200 });
      } catch (err) {
        return NextResponse.json(err, { status: 404 });
      }
  }
}

export async function GET() {
  const res = await fetch("/api/admin/validate")
    if (res.status!=200) redirect("/login")
  try {
    const productList = await prisma.product.findMany({});
    const prodmap = productList.map(item = > { return {item.id : item.name}})
    return NextResponse.json(prodmap, {status:200})
  } catch (err) {
    
  }
}