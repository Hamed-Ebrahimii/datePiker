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
        <button disabled={disable || holiday || weekendOf || isOutOfRange || isPastDay} className={`w-full flex items-center justify-center ${disable || holiday || weekendOf || isOutOfRange || isPastDay && 'opacity-50'}`}>
                <p className="text-sm font-medium text-gray-600">
                {
                    date.day
                }
                </p>
        </button>
    )
}
export default Day