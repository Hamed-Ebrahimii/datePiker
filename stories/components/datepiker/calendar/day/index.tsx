import {DateObject} from "react-multi-date-picker";
import {CSSProperties, MouseEventHandler} from "react";

export interface DayProps {
    date: DateObject;
    isSelected: boolean;
    isPastDay: boolean;
    isOutOfRange: boolean;
    disable: boolean;
    holiday: boolean;
    weekendOff: boolean | undefined;
    onClick: () => void;
    activeDayStyle?: string;
    inactiveDayStyle?: string;
    holidayStyle?: string;
    selectedDayStyle?: string;
    rangeStartDayBorder?: string;
    rangeEndDayBorder?: string;
    dayItemSize?: string | number;
    range_start? : boolean
    range_end? : boolean
    dayStyle? : CSSProperties
}

const Day = ({date , disable , holiday , weekendOff , isOutOfRange , isPastDay , isSelected , onClick  , activeDayStyle , selectedDayStyle , inactiveDayStyle , holidayStyle , dayItemSize , rangeStartDayBorder , rangeEndDayBorder , range_end , range_start} : DayProps) =>{
    const isDisabled = disable || holiday || weekendOff || isOutOfRange || isPastDay
    const className = `${isSelected && selectedDayStyle} ${activeDayStyle}   disabled:opacity-50 ${holiday && holidayStyle} ${range_start && 'rounded-r-lg'} ${range_end && 'rounded-l-lg'}`
    return (
        <button onClick={onClick} disabled={isDisabled} className={className}>
                <p className="font-medium font-titr">
                {
                    date.day
                }
                </p>
        </button>
    )
}
export default Day