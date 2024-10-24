import Link from "next/link"
import { ReactNode } from "react"

interface CategoryProps {
    category : string,
    children : ReactNode 
}
export const CategoryItem:React.FC<CategoryProps> = ({category, children}) =>{
    return <Link className="text-xl text-white font-semibold hover:text-orange-300 transition-colors"href={`/menu/${category}`}>{children}</Link>
}