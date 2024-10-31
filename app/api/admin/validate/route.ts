import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
export async function GET(req : Request ){
    try {
        const cookieStorage = await cookies();
        const uSession = await cookieStorage.get("admin")?.value;
        console.log(uSession);
        const allsess = await prisma.session.findMany({});
        console.log(allsess);
        const probvalidSession = await prisma.session.findFirst({
          where: {
            cookie: String(uSession),
          },
        });
        console.log(probvalidSession);
        if (!probvalidSession || !uSession) {
            return NextResponse.json("NOT OK", {status:404})
        }
        if (parseInt(probvalidSession.expires) > Date.now()) {
          return NextResponse.json("OK",{status:200});
        } else {
          await prisma.session.delete({
            where: {
              cookie: String(uSession),
            },
          });
          return NextResponse.json("NOT OK", {status:404})
        }
      } catch (err) {
        console.log(err)
        return NextResponse.json("NOT OK", {status:404})
      }
}