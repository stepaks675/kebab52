import Link from "next/link"

export const LogoSection = ():React.ReactNode => {
    return <div className="text-2xl py-1 w-1/2 h-max border border-slate-400  px-auto flex justify-between items-center">
        <Link href="/">Доставка</Link>
        <Link href="/">Оплата</Link>
        <Link href="/"><img className="w-32"src="/mainlogo.png"></img></Link> 
        <Link href="/">Статьи</Link>
        <Link href="/">Контакты</Link>
    </div>
}