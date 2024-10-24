"use client"
import { Product } from "./Product"
export const ProductList = ({category}: {category:string}) => {
    //запрос к бд по категории
    return (<div className="grid grid-cols-4 gap-5">
        <Product id={1} name={"HYPNODANCE"} img={"/template.jpg"} price={300} weight={400} />
        <Product id={1} name={"HYPNODANCE"} img={"/shashlik.jpeg"} price={300} weight={100} />
        <Product id={1} name={"HYPNODANCE"} img={"/template.jpg"} price={300} weight={400} />
        <Product id={1} name={"HYPNODANCE"} img={"/shashlik.jpeg"} price={300} weight={100} />
        <Product id={1} name={"HYPNODANCE"} img={"/template.jpg"} price={300} weight={400} />
        <Product id={1} name={"HYPNODANCE"} img={"/shashlik.jpeg"} price={300} weight={100} />
        <Product id={1} name={"HYPNODANCE"} img={"/template.jpg"} price={300} weight={400} />
        <Product id={1} name={"HYPNODANCE"} img={"/shashlik.jpeg"} price={300} weight={100} />

        </div>
    )
}