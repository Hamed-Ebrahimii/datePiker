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
    weekStartDayIndex? : 0 |  1| 2| 3 |4| 5| 6 ,
    weekDayString? : string[] ,
    selected : boolean ,
    multipleChoice?  : boolean,
    displayMonthAndYearName? : boolean,
    disablingThePreviousDay? : boolean ,
    minDate? : string,
    maxDate? : string,
    holidays? : string[]
    weekendOff? : boolean,
    disableOutOfRangeDays? : boolean
}