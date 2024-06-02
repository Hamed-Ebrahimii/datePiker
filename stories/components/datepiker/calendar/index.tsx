import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import {DatePikerProps} from "../type";
import persian_fa from "react-date-object/locales/persian_fa"
import Day from "./day";
import { useState } from "react";
const Calendar = ({calendar , disableOutOfRangeDays = true , disablingThePreviousDay , weekStartDayIndex = 0 , weekDayString , disablePastDays , holidays = []  , weekendOff , multipleChoice}: DatePikerProps) => {
    const [showMonth, setShowMonth] = useState(false)
    const [showYear, setShowYear] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
        locale: calendar === 'persian' ? persian_fa : undefined
    }).toFirstOfMonth());
    const [dateObject , setDateObject] = useState<DateObject[]>([])
    const today = new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
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
    const handleSelectDate = (data : DateObject) =>{
         multipleChoice ? setDateObject([...dateObject , data]) : setDateObject([data])
    }
    const weekDays = currentMonth.weekDays
    const orderedWeekDays = [...weekDays.slice(weekStartDayIndex || 0), ...weekDays.slice(0, weekStartDayIndex || 0)];

    return (
        <div className={`w-1/4 p-4 bg-white rounded-lg shadow-sm`}>
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
                !showMonth && !showYear && <div className="w-full border-separate  border-spacing-y-8 border-spacing-x-1">
                    <div className={'h-20 w-full grid grid-cols-7 items-center justify-center '}>
                        {
                            weekDayString ? weekDayString?.map(item => (
                                <div className={'-rotate-90 block text-start font-tanha font-medium'} key={item}>{item}</div>)) : orderedWeekDays.map(item => (
                                <div className={'-rotate-90 block text-start font-tanha font-medium'} key={item.index}>{item.name}</div>))
                        }
                    </div>

                    <div className={''}>
                    {Array.from({length : 5}).map((_ , weekIndex) => (
                        <div key={weekIndex} className={'grid grid-cols-7 items-center justify-between'}>
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const realDayIndex = (dayIndex + weekStartDayIndex) % 7;
                                const day = new DateObject(currentMonth).add(weekIndex * 7 + realDayIndex - currentMonth.weekDay.index, 'day');
                                const isWeekendOff = weekendOff && (realDayIndex === 5 || realDayIndex === 6);
                                const isDisabled = disablingThePreviousDay ? day.valueOf() < today.valueOf() : false;
                                const isHoliday = holidays.includes(day.format("YYYY-MM-DD"));
                                const isOutOfRange = disableOutOfRangeDays && day.month.index !== currentMonth.month.index;
                                const isPastDay = disablePastDays && day.valueOf() < today.valueOf();
                                const isSelected = dateObject.find(item => item.valueOf() === day.valueOf()) ? true : false;
                                return (
                                    <div className={''} key={day.valueOf()}>
                                        <Day isSelected={isSelected} isPastDay={isPastDay} isOutOfRange={isOutOfRange} key={dayIndex} disable={isDisabled} date={day} holiday={isHoliday} weekendOf={isWeekendOff} onClick={()=> handleSelectDate(day)}/>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    </div>
                </div>
            }
            {
                showMonth && <div className="w-full grid grid-cols-4">
                    {
                        new DateObject({
                            calendar: calendar === 'persian' ? persian : undefined,
                            locale: calendar === 'persian' ? persian_fa : undefined
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
                            Array.from({length : (new DateObject({ calendar: calendar === 'persian' ? persian : undefined, locale: persian_fa }).year + 10) - (calendar === 'persian' ? 1300 : 1900)}).map((_ , year) => (
                                <p key={year} className="text-lg font-medium">
                                    {
                                      calendar === 'persian' ?  1300 +  year : 1900 + year
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