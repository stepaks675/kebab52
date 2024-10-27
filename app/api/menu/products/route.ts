import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(){
    try{
    const prods = await prisma.product.findMany({
        select:{
            id:true,
            name:true,
            category:true
        }
    })
    return NextResponse.json(prods, {status:200})
} catch(err) {
    return NextResponse.json(err, {status:400})
}

}