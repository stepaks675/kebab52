import { MenuItem } from "./MenuItem";
import { BreakLine } from "../utility/BreakLine";
import Link from "next/link";
export const Menu = () => {
  return (
    <div className="sticky top-0 w-100% bg-orange-800 h-12">
      <div className="max-w-[1500px] mx-auto h-full relative">
        <div className="h-full w-fit flex justify-start items-center gap-4">
          <MenuItem category="shaurma">Шаурма</MenuItem>
          <BreakLine position="vertical" />
          <MenuItem category="shashlik">Шашлык</MenuItem>
          <BreakLine position="vertical" />
          <MenuItem category="shashlikmisc">Для шашлыка</MenuItem>
          <BreakLine position="vertical" />
          <MenuItem category="salad">Салаты</MenuItem>
          <BreakLine position="vertical" />
          <MenuItem category="sweets">Сладости</MenuItem>
          <BreakLine position="vertical" />
          <MenuItem category="drinks">Напитки</MenuItem>
        </div>
        <Link href="/cart"><div className="absolute right-1 top-1/2 -translate-y-1/2">КАРЗИНА</div></Link>
      </div>
    </div>
  );
};
