import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: Request, {params}: {params: {category: string}}){
    const {category} = params
    console.log(category)
    const products = await prisma.product.findMany({
        where: {
            category:category,
        },
    })
    return NextResponse.json(products)
}

