import {DateObject} from "react-multi-date-picker";

interface DayProps  {
    date : DateObject ,
    onClick? : Function
    disable? : boolean
    holiday?  : boolean
    weekendOf?  : boolean
    isOutOfRange ? : boolean,
    isPastDay? : boolean
}
const Day = ({date , disable , holiday , weekendOf , isOutOfRange , isPastDay} : DayProps) =>{
    console.log(weekendOf , holiday , disable)
    return (
        <button disabled={disable || holiday || weekendOf || isOutOfRange || isPastDay} className={`size-10 text-gray-800  hover:bg-green-dark hover:text-white flex items-center justify-center ${disable || holiday || weekendOf || isOutOfRange || isPastDay && 'opacity-50'}`}>
                <p className="font-medium ">
                {
                    date.day
                }
                </p>
        </button>
    )
}
export default Day