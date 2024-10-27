import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs"
import path from 'path';

async function saveImage(img : any){
  const arrayBuffer = await img.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = path.join(process.cwd(), 'public', 'uploads', img.name);
  fs.writeFileSync(filePath, buffer);
  return filePath
}

export async function POST(request: Request) {
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
            id: parseInt(data.get("id")),
          },
        });
        return NextResponse.json({ status: 200 });
      } catch (err) {
        return NextResponse.json(err, { status: 404 });
      }
  }
}
