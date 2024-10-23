import { Product } from "@/components/generalPage/Product";
import { Banner } from "@/components/generalPage/Banner";
export default function Home() {
  return (
    <div className="max-w-[1500px] mx-auto pt-5">
      <Banner/>
      <div className="grid grid-cols-4 gap-5">
        <Product category="shaurma" img="/shaurma.jpg">Шаурма</Product>
        <Product category="shashlik" img="/shashlik.jpeg">Шашлык</Product>
        <Product category="shashlikmisc" img="/shashlikmisc.jpg">Для шашлыка</Product>
        <Product category="salad" img="/salad.jpg">Салаты</Product>
        <Product category="sweets" img="/sweets.jpg">Сладости</Product>
        <Product category="drinks" img="/drinks.jpg">Напитки</Product>
      </div>
    </div>
  );
}
