import { ReactNode } from "react";
import {DateObject} from "react-multi-date-picker";

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
    disablePastDays : boolean
    activeDayStyle?: string;
    inactiveDayStyle?: string;
    holidayStyle?: string;
    selectedDayStyle?: string;
    rangeStartDayBorder?: string;
    rangeEndDayBorder?: string;
    dayItemSize?: string | number;
    monthYearStyle?: string;
    weekDayStyle?: string;
    setValue : (value: DateObject) => void
}