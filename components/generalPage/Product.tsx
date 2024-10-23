import Link from "next/link";
export const Product = ({
  img,
  children,
  category
}: {
  children: React.ReactNode;
  img: string;
  category: string
}): React.ReactElement => {
  return (
    <Link href={`/menu/${category}`}>
      <div className="relative overflow-hidden cursor-pointer group h-[250px]">
        <img
          className="w-full h-full group-hover:scale-110 group-hover:blur-[1px] transition-all duration-500"
          src={img}
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold px-4 py-2 bg-black text-white text-nowrap">
          {children}
        </span>
      </div>
    </Link>
  );
};
