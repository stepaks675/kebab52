export const PhoneSection = ():React.ReactNode => {
    return(
    <div className="flex flex-col justify-center w-1/4 text-center">
        <PhoneNumber number="78314134104"/>
        <PhoneNumber number="78314101611"/>
        <span>Работаем <span className="text-orange-400">круглосуточно</span></span>
    </div>
    )
}

const PhoneNumber: React.FC<{number:string}> = ({number}) =>{
    return <span className="text-slate-800 text-3xl"><span className="text-orange-400">+ {number.substring(0,1)} ({number.substring(1,4)}) </span>{number.substring(4,7)}-{number.substring(7,9)}-{number.substring(9,11)}</span>
}