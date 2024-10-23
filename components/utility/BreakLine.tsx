import clsx from "clsx"
export const BreakLine = ({position}: {position: "vertical" | "horizontal"})=>{
    const className :string = clsx({
        "w-[90%] h-0 border-r border-slate-300 rounded-lg" : position == "horizontal",
        "h-[75%] w-0 border-r border-slate-300 rounded-lg" : position == "vertical"
    })
    return <div className={className}></div>
}