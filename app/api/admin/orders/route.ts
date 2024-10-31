import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation"
export async function GET (){
    const res = await fetch("/api/admin/validate")
    if (res.status!=200) redirect("/login")
    try {
        const orders = await prisma.order.findMany({
        })
        console.log(orders)
        return NextResponse.json("OK",{status:200})
    }
    catch (err) {
        return NextResponse.json(err,{status:400})
    }
}

export async function POST( req: Request){
    try {
        
    } catch (error) {
        return NextResponse.json(error,{status:400})
    }
}