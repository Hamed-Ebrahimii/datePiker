import {CSSProperties, ReactNode} from "react";
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
    multipleChoice?  : boolean,
    displayMonthAndYearName? : boolean,
    disablingThePreviousDay? : boolean ,
    minDate? : string,
    maxDate? : string,
    holidays? : string[]
    weekendOff? : boolean,
    weekendOffStyle? : CSSProperties,
    disableOutOfRangeDays? : boolean
    disablePastDays : boolean
    activeDayStyle?: CSSProperties;
    inactiveDayStyle?: CSSProperties;
    holidayStyle?: CSSProperties;
    selectedDayStyle?: CSSProperties;
    rangeStartDayBorder?: string;
    rangeEndDayBorder?: string;
    dayItemSize?: string | number;
    monthYearStyle?: CSSProperties;
    monthYearClassName? : string
    weekDayStyle?: CSSProperties;
    dayStyle? : CSSProperties;
    dayClassName ? : string;
    inputClassName? : string;
    inputStyle? : CSSProperties
    yearStyle ? : CSSProperties;
    yearClassName? : string;
    setValue : (value: DateObject[]) => void;
    weekdaysStyle? : CSSProperties;
    weekdaysClassName? : string; 
    isRange ? : boolean
    NumberOfMonths ? :1 | 2 | 3
    showMonths ? : number[] 
    rangeInMonth? : {
        month : number,
        startDay : number,
        endDay : number
    }
    disabledMonth ? : boolean
    disabledYear ? : boolean,
    calendarStyle? : CSSProperties 
}