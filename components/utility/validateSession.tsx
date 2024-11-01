import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
export default async function Validator(){
    try {
        const cookieStorage = await cookies();
        const uSession = await cookieStorage.get("admin")?.value;


        const probvalidSession = await prisma.session.findFirst({
          where: {
            cookie: String(uSession),
          },
        });

        if (!probvalidSession || !uSession) {
            return false
        }
        if (parseInt(probvalidSession.expires) > Date.now()) {
          return true
        } else {
          await prisma.session.delete({
            where: {
              cookie: String(uSession),
            },
          });
          return false
        }
      } catch (err) {
        console.log(err)
        return false
      }
}