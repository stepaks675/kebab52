import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
export async function GET (request: Request){
    try{
        const cookieStorage = await cookies()
        const validSession = await prisma.session.findFirst({
            select: {
                cookie:true
            }
        })
        const uSession = await cookieStorage.get("admin")
        if (!uSession) {return NextResponse.json("undef",{status:404})}
        //console.log(uSession)
        console.log(validSession) 
        if (uSession == validSession){
            return NextResponse.json({status:200})
        }
        else{
            return NextResponse.json({status:404})
        }
    } catch (err){
        return NextResponse.json(err,{status:404})
    }
}