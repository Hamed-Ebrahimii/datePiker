import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Day from "./day";
import { useState} from "react";
import { DatePikerProps } from "../type";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import {useDidUpdate} from "@mantine/hooks";

const Calendar = ({
                      calendar,
                      disableOutOfRangeDays = true,
                      disablingThePreviousDay,
                      weekStartDayIndex = 0,
                      weekDayString,
                      disablePastDays,
                      holidays = [],
                      weekendOff,
                      multipleChoice,
                      activeDayStyle = "w-full py-3 text-gray-800  hover:bg-green-dark hover:text-white flex items-center justify-center",
                      inactiveDayStyle,
                      holidayStyle,
                      selectedDayStyle = "w-full py-3 text-gray-800  bg-green-dark text-white flex items-center justify-center",
                      yearClassName = "text-lg font-medium text-center border border-green-dark rounded-lg py-4 ",
                      yearStyle,
                      dayItemSize,
                      monthYearStyle,
                      weekDayStyle ,
                      setValue,
                      monthYearClassName = "text-lg font-medium text-center border border-green-dark rounded-lg py-4 cur" ,
                  }: DatePikerProps) => {
    const [showMonth, setShowMonth] = useState(false);
    const [showYear, setShowYear] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
        locale: calendar === 'persian' ? persian_fa : undefined
    }).toFirstOfMonth());
    const [dateObject, setDateObject] = useState<DateObject[]>([]);
    const today = new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
        locale: calendar === 'persian' ? persian_fa : undefined
    });

    const handleMonthChange = (monthIndex: number) => {
        setCurrentMonth(new DateObject({
            calendar: calendar === 'persian' ? persian : undefined,
            locale: calendar === 'persian' ? persian_fa : undefined
        }).set('month', monthIndex).toFirstOfMonth());
    };

    const nextMonth = () => {
        handleMonthChange(currentMonth.month.number + 1);
    };

    const prevMonth = () => {
        handleMonthChange(currentMonth.month.number - 1);
    };

    const handleYearChange = (year: number) => {
        setCurrentMonth(new DateObject({
            calendar: calendar === 'persian' ? persian : undefined,
            locale: calendar === 'persian' ? persian_fa : undefined
        }).set('year', year).toFirstOfMonth());
    };

    const nextYear = () => {
        handleYearChange(currentMonth.year + 1);
    };

    const prevYear = () => {
        handleYearChange(currentMonth.year - 1);
    };

    const handleSelectDate = (data: DateObject) => {
        const dateIndex = dateObject.findIndex(item => item.valueOf() === data.valueOf());

        if (dateIndex >= 0){
            setDateObject(dateObject.filter(item => item.valueOf() !== data.valueOf()))
            return
        }
        multipleChoice ? setDateObject([...dateObject, data]) : setDateObject([data]);
    };
    const handleNext = () =>{
        if (!showMonth && !showYear) {
            nextMonth();
        }
        if (showMonth) {
            nextYear()
        }
    }
    const handlePrev =  () =>{
        if (!showMonth && !showYear) {
            prevMonth();
        }
        if (showMonth) {
            prevYear()
        }
    }
    const weekDays = currentMonth.weekDays;
    const orderedWeekDays = [...weekDays.slice(weekStartDayIndex || 0), ...weekDays.slice(0, weekStartDayIndex || 0)];
    useDidUpdate(()=>{
        setValue(dateObject[0])
    } , [dateObject])
    return (
        <div className={`w-1/4 p-4 bg-white rounded-lg shadow-sm`}>
            <div className={`w-full py-2 flex items-center justify-center gap-3 text-xl font-medium relative ${monthYearStyle}`}>
                <p onClick={() => { setShowMonth(true); setShowYear(false); }} className={'cursor-pointer'}>
                    {currentMonth.month.name}
                </p>
                <p onClick={() => { setShowMonth(false); setShowYear(true); }} className={'cursor-pointer font-titr'}>
                    {currentMonth.year}
                </p>
                <ChevronLeftIcon onClick={handleNext} className="size-10 text-gray-500 absolute left-0 cursor-pointer" />
                <ChevronRightIcon onClick={handlePrev} className="size-10 text-gray-500 absolute right-0 cursor-pointer" />
            </div>
            {!showMonth && !showYear && (
                <div className="w-full border-separate border-spacing-y-8 border-spacing-x-1">
                    <div className={`h-20 w-full grid grid-cols-7 items-center justify-center ${weekDayStyle}`}>
                        {weekDayString
                            ? weekDayString.map(item => (
                                <div className="-rotate-90 block text-start font-tanha font-medium" key={item}>{item}</div>
                            ))
                            : orderedWeekDays.map(item => (
                                <div className="-rotate-90 block text-start font-tanha font-medium" key={item.index}>{item.name}</div>
                            ))
                        }
                    </div>
                    <div>
                        {Array.from({ length: 5 }).map((_, weekIndex) => (
                            <div key={weekIndex} className="grid grid-cols-7 items-center justify-between">
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const realDayIndex = (dayIndex + weekStartDayIndex) % 7;
                                    const day = new DateObject(currentMonth).add(weekIndex * 7 + realDayIndex - currentMonth.weekDay.index, 'day');
                                    const isWeekendOff = weekendOff && (realDayIndex === 5 || realDayIndex === 6);
                                    const isDisabled = disablingThePreviousDay ? day.valueOf() < today.valueOf() : false;
                                    const isHoliday = holidays.includes(day.format("YYYY-MM-DD"));
                                    const isOutOfRange = disableOutOfRangeDays && day.month.index !== currentMonth.month.index;
                                    const isPastDay = disablePastDays && day.valueOf() < today.valueOf();
                                    const isSelected = dateObject.find(item => item.valueOf() === day.valueOf()) ? true : false;
                                    const dayStyle = isDisabled
                                        ? inactiveDayStyle
                                        : isHoliday
                                            ? holidayStyle
                                            : isSelected
                                                ? selectedDayStyle
                                                : activeDayStyle;
                                    return (
                                        <div className={dayStyle} key={day.valueOf()} style={{ width: dayItemSize, height: dayItemSize }}>
                                            <Day
                                                isSelected={isSelected}
                                                isPastDay={isPastDay}
                                                isOutOfRange={isOutOfRange}
                                                key={dayIndex}
                                                disable={isDisabled}
                                                date={day}
                                                holiday={isHoliday}
                                                weekendOff={isWeekendOff}
                                                onClick={() => handleSelectDate(day)}
                                                activeDayStyle={''}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showMonth && (
                <div className="w-full grid grid-cols-2 gap-2 mt-4">
                    {currentMonth.months.map(month => (
                        <button key={month.index} className={`text-center cursor-pointer ` + monthYearClassName} style={monthYearStyle} onClick={() => { handleMonthChange(month.index + 1); setShowMonth(false); }}>
                            {month.name}
                        </button>
                    ))}
                </div>
            )}
            {showYear && (
                <div className="w-full grid grid-cols-2 gap-4 mt-3">
                    {Array.from({ length: 10 }).map((_, year) => (
                        <button key={year} className={yearClassName} style={yearStyle} onClick={() => { handleYearChange(year); setShowYear(false); }}>
                            {calendar === 'persian' ? 1300 + year : 1900 + year}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calendar;
