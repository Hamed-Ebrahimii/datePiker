import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import { DatePikerProps } from "../type";
import persian_fa from "react-date-object/locales/persian_fa"
import Day from "./day";
import { useState } from "react";
const Calendar = (props: DatePikerProps) => {
    const [showMonth, setShowMonth] = useState(false)
    const [showYear, setShowYear] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new DateObject({
        calendar: props.calendar === 'persian' ? persian : undefined,
        locale: persian_fa
    }).toFirstOfMonth());

    const today = new DateObject({
        calendar: props.calendar === 'persian' ? persian : undefined,
        locale: persian_fa
    });
    const handleMonthChange = (monthIndex : number) => {
        setCurrentMonth(currentMonth.set('month', monthIndex).toFirstOfMonth());
    };
    const nextMonth = () => {
        handleMonthChange(currentMonth.month.index + 1);
    };
    const prevMonth = () => {
        handleMonthChange(currentMonth.month.index - 1);
    };
    const handleYearChange = (year : number) => {
        setCurrentMonth(currentMonth.set('year', year).toFirstOfMonth());
    };
    const nextYear = () => {
        handleYearChange(currentMonth.year + 1);
    };

    const prevYear = () => {
        handleYearChange(currentMonth.year - 1);
    };
    const weekDays = currentMonth.weekDays
    const orderedWeekDays = [...weekDays.slice(props.weekStartDayIndex || 0), ...weekDays.slice(0, props.weekStartDayIndex || 0)];

    return (
        <div className="w-1/3 p-4 bg-gray-200 rounded-lg shadow-sm">
            <div className="w-full py-2 flex items-center justify-center gap-3 text-xl font-medium">
                <p onClick={() => {setShowMonth(true) ; setShowYear(false) }}>
                    {
                        currentMonth.month.name
                    }
                </p>
                <p onClick={() => {setShowMonth(false) ; setShowYear(true) }}>
                    {
                        today.year
                    }
                </p>
            </div>
            {
                !showMonth && !showYear && <table className="w-full">
                    <thead>
                    <tr>
                        {
                            props.weekDayString ? props.weekDayString?.map(item => (
                                <th key={item}>{item}</th>)) : orderedWeekDays.map(item => (
                                <th key={item.index}>{item.name}</th>))
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {today.weekDays.map((weekDay, weekIndex) => (
                        <tr key={weekIndex}>
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const day = new DateObject(currentMonth).add(weekIndex * 7 + dayIndex - currentMonth.weekDay.index, 'day');
                                const isDisabled = props.disablingThePreviousDay ? day.valueOf() < today.valueOf() : false;

                                return (
                                    <td className="text-center rounded-full hover:bg-blue-300" key={dayIndex}>
                                        <Day key={dayIndex} disable={isDisabled} date={day} />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
            {
                showMonth && <div className="w-full grid grid-cols-4">
                    {
                        new DateObject({
                            calendar: props.calendar === 'persian' ? persian : undefined,
                            locale: props.calendar === 'persian' ? persian_fa : undefined
                        }).months.map(month => (
                            <p key={month.index} className="text-lg font-medium" onClick={()=> {
                                handleMonthChange(month.index + 1)
                                setShowMonth(false)
                            }}>
                                {
                                    month.name
                                }
                            </p>
                        ))
                    }
                </div>
            }
            {
                showYear && <div className="w-full grid grid-cols-4">
                    {
                            Array.from({length : (new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: persian_fa }).year + 10) - (props.calendar === 'persian' ? 1300 : 1900)}).map((_ , year) => (
                                <p key={year} className="text-lg font-medium">
                                    {
                                      props.calendar === 'persian' ?  1300 +  year : 1900 + year
                                    }
                                </p>
                            ))
                    }
                </div>
            }
        </div>
    )
}
export default Calendar