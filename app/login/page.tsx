"use client"
import { useState } from "react"
export default function Login (){
    const [formState, setFormState]= useState({
        uname: "",
        pass: ""
    })
    async function submitForm(){

        const data = new FormData()

        data.append("uname", formState.uname)
        data.append("pass", formState.pass)

        const res = await fetch("/api/admin/login", {
            method: "POST",
            body: data
        })
        

    }
    return (
        <form className="flex flex-col gap-2 w-[200px] mx-auto mt-20" onSubmit={submitForm} method="POST">
            <input value={formState.uname} type="text" name="username" placeholder="Имя" onChange={(e)=>{
                setFormState(prev => {
                    return {...prev, uname: e.target.value}
                })
            }}></input>
            <input value={formState.pass} type="password" name="password" placeholder="Пароль" onChange={(e)=>{
                setFormState(prev => {
                    return {...prev, pass: e.target.value}
                })
            }}></input>
            <button type="submit">Войти</button>
        </form>
    )
}