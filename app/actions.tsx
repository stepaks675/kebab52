"use server"
import { redirect } from "next/navigation"
export async function backToLogin(){
    redirect("/login");
}