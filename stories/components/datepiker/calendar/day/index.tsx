import {DateObject} from "react-multi-date-picker";
import {MouseEventHandler} from "react";

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
}

const Day = ({date , disable , holiday , weekendOff , isOutOfRange , isPastDay , isSelected , onClick  , activeDayStyle , selectedDayStyle , inactiveDayStyle , holidayStyle , dayItemSize , rangeStartDayBorder , rangeEndDayBorder} : DayProps) =>{
    return (
        <button onClick={onClick} disabled={disable || holiday || weekendOff || isOutOfRange || isPastDay} className={`${activeDayStyle} ${isSelected && selectedDayStyle} disabled:${inactiveDayStyle}`}>
                <p className="font-medium font-titr">
                {
                    date.day
                }
                </p>
        </button>
    )
}
export default Day