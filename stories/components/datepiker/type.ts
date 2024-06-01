import { ReactNode } from "react";

export interface DatePikerProps {
    calendar : 'gregorian' | 'persian',
    inputDate : boolean ,
    inputIcon? : boolean ,
    icon? : ReactNode,
    placeholder? : string,
    value? : string,
    onChange? : (value : string) => void,
    onBlur? : (value : string) => void,
    onFocus? : (value : string) => void,
    datePiker  : boolean ,
    weekStartDayIndex? :   1| 2| 3 |4| 5| 6 ,
    weekDayString? : string[]
}