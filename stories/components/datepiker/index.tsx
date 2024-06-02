import { useState } from "react";
import { Input } from "./input";
import { DatePikerProps } from "./type";
import { useClickOutside } from "@mantine/hooks";
import Calendar from "./calendar";

const DatePiker = ({calendar , inputDate , selected , weekStartDayIndex , holidays} : DatePikerProps) =>{
    const [showCalendar, setShowCalendar] = useState(inputDate)
    const ref = useClickOutside(()=> setShowCalendar(false))
    const handleShowCalendar = () =>{
        setShowCalendar(!showCalendar)
    }
    return (
        <div ref={ref} className="w-full space-y-3" dir="rtl" >
            
                {
                    inputDate && <Input onClick={handleShowCalendar} placeholder="hello" />
                }
                {
                    !showCalendar && <Calendar selected={selected} calendar={calendar}  inputDate datePiker weekStartDayIndex={weekStartDayIndex}/>
                }
                
                    
                
        </div>
    )
}

export default DatePiker;