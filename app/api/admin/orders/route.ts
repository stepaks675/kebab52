import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation"
import Validator from "@/components/utility/validateSession";
export async function GET (){
    const res = await Validator();
    if (!res) redirect("/login")

    try {
        const orders = await prisma.order.findMany({
        })
        return NextResponse.json(orders,{status:200})
    }
    catch (err) {
        return NextResponse.json(err,{status:400})
    }
}

export async function POST( req: Request){
    try {   
        const body = await req.json()
        await prisma.order.update({
            where: {
                id: body.id
            },
            data: {
                status: body.status
            }
        })
        return NextResponse.json("OK",{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:400})
    }
}