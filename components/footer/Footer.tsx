import { BreakLine } from "@/components";
import Link from "next/link";
export const Footer = () => {
  return (
    <div className="font-mono text-white bg-[url('/footer.jpg')] bg-no-repeat bg-cover mt-16 pt-5 pb-7  w-full h-fit">
      <div className="max-w-[1500px] mx-auto flex flex-col items-center">
        <div className="flex justify-start gap-52 mb-5 w-full">
          <div className="flex flex-col gap-3 items-start">
            <SpanHeader>Информация</SpanHeader>
            <SpanItem href="/">Главная</SpanItem>
            <SpanItem href="/about">О нас</SpanItem>
            <SpanItem href="/articles">Статьи</SpanItem>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <SpanHeader>Покупателю</SpanHeader>
            <SpanItem href="/contacts">Доставка</SpanItem>
            <SpanItem href="/payment">Оплата</SpanItem>
            <SpanItem href="/cart">Корзина</SpanItem>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <SpanHeader>Контакты</SpanHeader>
          </div>
        </div>
        <BreakLine position={"horizontal"} />
        <span className="mt-5">2024 © Shashlyk52.ru - Нижний Новгород, ул.Мещерский бульвар, 10Б. Телефон: +7 (831) 413-41-04 круглосуточно
        Внешний вид доставляемых блюд может несколько отличаться от фото, представленных на этом сайте.</span>
      </div>
    </div>
  );
};

const SpanItem = ({ children, href }: { children: React.ReactNode , href: string}) => {
  return <Link href={href} className="text-lg">{children}</Link>;
};

const SpanHeader = ({ children }: { children: React.ReactNode }) => {
  return <span className="mb-3 text-2xl font-semibold">{children}</span>;
};
