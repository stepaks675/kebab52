import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
export async function POST(request : Request){
    try{
        const data = await request.formData();
        const cookieStore = await cookies();
        if (data.get("pass") == process.env.ADMIN_PASSWORD && data.get("uname")==process.env.ADMIN_UNAME){
            if (cookieStore.has("admin")){
                return NextResponse.json("Already logged as admin", {status:200})
            }
            else{
                const enc = uuidv4()
                cookieStore.set("admin",String(enc),{
                    expires:Date.now()+60*1000*60*12,
                    httpOnly: true
                })
                await prisma.session.deleteMany({
                    where: {

                    }
                })
                await prisma.session.create({
                    data:{
                        cookie: enc
                    }
                })
                return NextResponse.json("OK", {status:200})
            }
        }
        return NextResponse.json("Wrong uname/pass", {status:404})
    } catch(err){
        return NextResponse.json(err, {status:404})
    }
}