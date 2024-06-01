import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import { DatePikerProps } from "../type";
import persian_fa from "react-date-object/locales/persian_fa"
import Day from "./day";
import { useState } from "react";
const Calendar = (props: DatePikerProps) => {
    const [showMonth, setShowMonth] = useState(false)
    const [showYear, setShowYear] = useState(false)
    const daysMonth = new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: persian_fa }).toLastOfMonth().day
    const daysArray = Array.from({ length: daysMonth }, (_, index) => index + 1);
    const startDay = new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: persian_fa }).toFirstOfMonth().weekDay.index
    const calendarArray = Array(42).fill(null);
    const [month , setMonth] = useState(0)
    const [year , setYear] = useState(0)
    for (let i = 0; i < daysArray.length; i++) {
        calendarArray[startDay + i] = daysArray[i];
    }

    return (
        <div className="w-1/3 p-4 bg-gray-200 rounded-lg shadow-sm">
            <div className="w-full py-2 flex items-center justify-center gap-3 text-xl font-medium">
                <p onClick={() => {setShowMonth(true) ; setShowYear(false) }}>
                    {
                        new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: props.calendar === 'persian' ? persian_fa : undefined }).month.name
                    }
                </p>
                <p onClick={() => {setShowMonth(false) ; setShowYear(true) }}>
                    {
                        new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: props.calendar === 'persian' ? persian_fa : undefined }).year
                    }
                </p>
            </div>
            {
                !showMonth && !showYear && <table className="w-full">
                    <thead>
                        <tr>
                            {
                                props.weekDayString ? props.weekDayString?.map(item => (<th>{item}</th>)) : new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: props.calendar === 'persian' ? persian_fa : undefined }).weekDays.map(item => (<th>{item.name}</th>))
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 6 }).map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const day = calendarArray[weekIndex * 7 + dayIndex];
                                    return <td className="text-center rounded-full hover:bg-blue-300" key={dayIndex}>{day ? day : ''}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>

                </table>
            }
            {
                showMonth && <div className="w-full grid grid-cols-4">
                    {
                        new DateObject({ calendar: props.calendar === 'persian' ? persian : undefined, locale: props.calendar === 'persian' ? persian_fa : undefined }).months.map(month => (
                            <p className="text-lg font-medium">
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
                                <p className="text-lg font-medium">
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