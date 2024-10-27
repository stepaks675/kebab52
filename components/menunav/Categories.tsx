import { CategoryItem } from "./CategoryItem";
import { BreakLine } from "../utility/BreakLine";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
export const Categories = () => {
  return (
    <div className="sticky top-0 w-full z-10 bg-orange-800 h-12">
      <div className="max-w-[1500px] mx-auto h-full relative">
        <div className="h-full w-fit flex justify-start items-center gap-4">
          <CategoryItem category="shaurma">Шаурма</CategoryItem>
          <BreakLine position="vertical" />
          <CategoryItem category="shashlik">Шашлык</CategoryItem>
          <BreakLine position="vertical" />
          <CategoryItem category="shashlikmisc">Для шашлыка</CategoryItem>
          <BreakLine position="vertical" />
          <CategoryItem category="salad">Салаты</CategoryItem>
          <BreakLine position="vertical" />
          <CategoryItem category="sweets">Сладости</CategoryItem>
          <BreakLine position="vertical" />
          <CategoryItem category="drinks">Напитки</CategoryItem>
        </div>
        <Link href="/cart"><div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-2 items-center">
        <MdShoppingCart className="text-white size-6"/>
        <span className="text-white font-semibold">Корзина</span>
        </div></Link>
      </div>
    </div>
  );
};
