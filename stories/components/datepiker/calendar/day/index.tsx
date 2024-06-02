import {DateObject} from "react-multi-date-picker";
import {MouseEventHandler} from "react";

interface DayProps  {
    date : DateObject ,
    onClick? : MouseEventHandler<HTMLButtonElement> | undefined
    disable? : boolean
    holiday?  : boolean
    weekendOf?  : boolean
    isOutOfRange ? : boolean,
    isPastDay? : boolean
    isSelected? : boolean
}
const Day = ({date , disable , holiday , weekendOf , isOutOfRange , isPastDay , isSelected , onClick } : DayProps) =>{
    return (
        <button onClick={onClick} disabled={disable || holiday || weekendOf || isOutOfRange || isPastDay} className={`w-full py-3 text-gray-800  hover:bg-green-dark hover:text-white flex items-center justify-center ${isSelected && 'bg-green-dark text-white'} disabled:text-red-500 `}>
                <p className="font-medium ">
                {
                    date.day
                }
                </p>
        </button>
    )
}
export default Day