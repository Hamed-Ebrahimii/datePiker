import {DateObject} from "react-multi-date-picker";
import {CSSProperties, MouseEventHandler} from "react";
import { convertEnglishNumbersToPersian, convertPersianNumbersToEnglish } from "@/utils/convertPersianNumberToEnglish";

export interface DayProps {
    date: DateObject;
    isSelected: boolean;
    isPastDay: boolean;
    isOutOfRange: boolean;
    disable: boolean;
    holiday: boolean;
    weekendOff: boolean | undefined;
    onClick: () => void;
    activeDayStyle?: CSSProperties;
    inactiveDayStyle?: CSSProperties;
    holidayStyle?: CSSProperties;
    selectedDayStyle?: CSSProperties;
    rangeStartDayBorder?: string;
    rangeEndDayBorder?: string;
    dayItemSize?: string | number;
    range_start? : boolean
    range_end? : boolean
    dayStyle? : CSSProperties
    weekendOffStyle? : CSSProperties
    isRange? : boolean
    dayClassName? : string
    outOfRange ?  :boolean
    calendarType : "gregorian" | "persian"
}

const Day = ({date , disable , holiday , weekendOff , weekendOffStyle , isOutOfRange , isPastDay , isSelected , onClick  , calendarType , activeDayStyle , selectedDayStyle , inactiveDayStyle , holidayStyle , dayItemSize , rangeStartDayBorder , rangeEndDayBorder , range_end , range_start , dayStyle  , isRange , dayClassName , outOfRange} : DayProps) =>{
    const isDisabled = disable   || isOutOfRange || isPastDay 
    const className = ` w-full py-2 text-gray-800  hover:bg-green-dark hover:text-white flex items-center justify-center ${isRange && 'rounded-none'} disabled:opacity-50 ${holiday && 'text-red-500'} ${range_start && 'rounded-r-full'} ${range_end && 'rounded-l-full'}  ${!isRange && 'rounded-sm'} ${outOfRange && 'hidden'} ${weekendOff && 'text-red-500'} ${isSelected && ' bg-green-dark text-white'}`
    const style = (weekendOff && weekendOffStyle) || (isSelected && selectedDayStyle) || (holiday && holidayStyle) || (isOutOfRange && inactiveDayStyle) || (isPastDay && inactiveDayStyle) || dayStyle
    return (
        <button onClick={onClick} disabled={isDisabled} style={style} className={className}>
                <p className="font-medium  ">
                {
                   calendarType === 'persian' ? convertEnglishNumbersToPersian(String(date.day)) : convertPersianNumbersToEnglish(String(date.day))
                }
                </p>
        </button>
    )
}
export default Day