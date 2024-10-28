import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: Request, {params}: {params: {category: string}}){
    const {category} = await params
    console.log(category)
    const products = await prisma.product.findMany({
        where: {
            category:category,
        },
    })
    return NextResponse.json(products, {status:200})
}

