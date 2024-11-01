import { NextResponse } from "next/server"
import Validator from "@/components/utility/validateSession";
export async function GET(req : Request ){
  const res = await Validator()
  if (!res) return NextResponse.json("BAD", {status:404})
  return NextResponse.json("OK",{status:200})
}