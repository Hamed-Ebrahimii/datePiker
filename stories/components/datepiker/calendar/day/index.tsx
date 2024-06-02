import {DateObject} from "react-multi-date-picker";

interface DayProps  {
    date : DateObject ,
    onClick? : Function
    disable? : boolean
}
const Day = ({date , disable} : DayProps) =>{
    return (
        <div className={`w-full flex items-center justify-center ${disable && 'opacity-50'}`}>
                <p className="text-sm font-medium text-gray-600">
                {
                    date.day
                }
                </p>
        </div>
    )
}
export default Day