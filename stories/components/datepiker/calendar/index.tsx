import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import { DatePikerProps } from "../type";
import persian_fa from "react-date-object/locales/persian_fa"
import Day from "./day";
const Calendar = (props : DatePikerProps) =>{
    
    return(
        <div className="w-1/3 p-4 bg-gray-200 rounded-lg shadow-sm">
            <div className="w-full py-2 flex items-center justify-center gap-3 text-xl font-medium">
                    <p>
                        {
                            new DateObject({calendar : props.calendar === 'persian' ? persian : undefined , locale : persian_fa}).month.name
                        }
                    </p>
                    <p>
                            {
                                new DateObject({calendar : props.calendar === 'persian' ? persian : undefined , locale : persian_fa}).year
                            }
                    </p>
            </div>
                    <div className="w-full grid grid-cols-7 grid-rows-5">
                            {
                             props.weekDayString ?  props.weekDayString?.map(item => (<div>{item}</div>)) : new DateObject({calendar : props.calendar === 'persian' ? persian : undefined , locale : persian_fa}).weekDays.map(item => (<div>{item.name}</div>))
                            }
                            
                               {
                                 Array.from<number>({length : 30}).map((item , index) => (<Day day={index + 1}/>) )
                               }
                            
                    </div>
        </div>
    )
}
export default Calendar