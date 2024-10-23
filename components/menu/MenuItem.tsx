import Link from "next/link"
import { ReactNode } from "react"

interface MenuProps {
    category : string,
    children : ReactNode 
}
export const MenuItem:React.FC<MenuProps> = ({category, children}) =>{
    return <Link className="text-lg text-white font-semibold hover:text-orange-300 transition-colors"href={`/menu/${category}`}>{children}</Link>
}