import { useState } from "react";
import { Input } from "./input";
import { DatePikerProps } from "./type";
import { useClickOutside } from "@mantine/hooks";
import Calendar from "./calendar";
import {CalendarIcon} from "@heroicons/react/24/solid";

const DatePiker = ({calendar , inputDate , selected , weekStartDayIndex , holidays , disablePastDays} : DatePikerProps) =>{
    const [showCalendar, setShowCalendar] = useState(inputDate)
    const ref = useClickOutside(()=> setShowCalendar(false))
    const handleShowCalendar = () =>{
        setShowCalendar(!showCalendar)
    }
    return (
        <div ref={ref} className="w-full space-y-3" dir="rtl" >
            
                {
                    inputDate && <Input icon={<CalendarIcon className="h-6 w-6 text-gray-500" />} onClick={handleShowCalendar} placeholder="hello" />
                }
                {
                    !showCalendar && <Calendar selected={selected} calendar={calendar} disablePastDays={disablePastDays}   inputDate datePiker weekStartDayIndex={weekStartDayIndex} holidays={['1403-04-12']}/>
                }
                
                    
                
        </div>
    )
}

export default DatePiker;