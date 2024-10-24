
import { Filter } from "@/components/menu/Filter";
import { ProductList } from "@/components/menu/ProductList";
import { Search } from "@/components/menu/Search";
import React from "react";
const CategoryPage = ({ params }: { params: any }) => {
  const data = React.use(params)
  return (
    <div className="flex items-start max-w-[1500px] mx-auto mt-5 h-fit gap-3">
      <Filter/>
      <div className="flex flex-col justify-start">
        <Search/>
        <ProductList category="food"/>
      </div>
    </div>
  );
};

export default CategoryPage;
