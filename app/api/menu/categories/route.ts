import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET () {
    try{
        const categories = await prisma.product.findMany({
            select: {
                category: true
            }
        })
        
        const uniquecategories = Array.from(new Set(categories.map(item => item.category)))
        if (!uniquecategories.length) return NextResponse.json({status:204})
        else return NextResponse.json(uniquecategories, {status:200})
    } catch (err){
        return NextResponse.json(err, {status:404})
    }
}