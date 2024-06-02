import {DateObject} from "react-multi-date-picker";

interface DayProps  {
    date : DateObject ,
    onClick? : Function
    disable? : boolean
    holiday?  : boolean
    weekendOf?  : boolean
    isOutOfRange ? : boolean
}
const Day = ({date , disable , holiday , weekendOf , isOutOfRange} : DayProps) =>{
    console.log(weekendOf , holiday , disable)
    return (
        <div className={`w-full flex items-center justify-center ${disable || holiday || weekendOf || isOutOfRange && 'opacity-50'}`}>
                <p className="text-sm font-medium text-gray-600">
                {
                    date.day
                }
                </p>
        </div>
    )
}
export default Day