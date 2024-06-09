import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Day from "./day";
import { DatePikerProps } from "../type";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useDidUpdate } from "@mantine/hooks";

const Calendar: React.FC<DatePikerProps> = ({
    calendar,
    disableOutOfRangeDays = true,
    disablingThePreviousDay,
    weekStartDayIndex = 0,
    weekDayString,
    datePiker,
    disablePastDays,
    holidays = [],
    weekendOff,
    multipleChoice,
    activeDayStyle = "w-full py-2 text-gray-800  hover:bg-green-dark hover:text-white flex items-center justify-center",
    inactiveDayStyle = "opacity-50",
    holidayStyle = "text-red-500",
    selectedDayStyle = "w-full py-2  bg-green-dark text-white flex items-center justify-center",
    yearClassName = "text-lg font-medium text-center border border-green-dark rounded-lg py-4 text-center cursor-pointer",
    yearStyle,
    displayMonthAndYearName,
    dayItemSize,
    monthYearStyle,
    weekDayStyle,
    setValue,
    weekdaysClassName = "-rotate-90 block text-start font-tanha font-medium",
    weekdaysStyle,
    dayStyle,
    weekendOffStyle = "text-red-500",
    monthYearClassName = "text-lg font-medium text-center border border-green-dark rounded-lg py-4 cur",
    isRange,
    dayClassName
}) => {
    const [showMonth, setShowMonth] = useState(false);
    const [showYear, setShowYear] = useState(false);
    const [startDate, setStartDate] = useState<DateObject | null>(null);
    const [endDate, setEndDate] = useState<DateObject | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
        locale: calendar === 'persian' ? persian_fa : undefined
    }).toFirstOfMonth());
    const [dateObject, setDateObject] = useState<DateObject[]>([]);
    const [yearPage, setYearPage] = useState(0);
    const yearsPerPage = 12;
    const today = new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
        locale: calendar === 'persian' ? persian_fa : undefined
    });

    const handleMonthChange = (monthIndex: number) => {
        setCurrentMonth(new DateObject(currentMonth).set('month', monthIndex).toFirstOfMonth());
        setShowMonth(false);
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
        setShowYear(false);
    };

    const nextYear = () => {
        handleYearChange(currentMonth.year + 1);
    };

    const prevYear = () => {
        handleYearChange(currentMonth.year - 1);
    };

    const getDatesInRange = (start: DateObject, end: DateObject) => {
        let dates = [];
        let currentDate = new DateObject(start);
        while (currentDate <= end) {
            dates.push(new DateObject(currentDate));
            currentDate.add(1, "day");
        }
        return dates;
    };

    const handleSelectDate = (date: DateObject) => {
        if (!datePiker) return
        if (isRange) {
            if (startDate && !endDate) {
                if (date < startDate) {
                    setStartDate(date);
                } else {
                    setEndDate(date);
                    const datesInRange = getDatesInRange(startDate, date);
                    setDateObject(datesInRange);
                    setValue && setValue([startDate, date]);
                }
            } else {
                setStartDate(date);
                setEndDate(null);
                setDateObject([date]);
            }
        } else {
            setStartDate(null);
            setEndDate(null);
            multipleChoice ? setDateObject([...dateObject, date]) : setDateObject([date]);
            setValue && setValue([date]);
        }
    };

    const weekDays = currentMonth.weekDays;
    const orderedWeekDays = [...weekDays.slice(weekStartDayIndex), ...weekDays.slice(0, weekStartDayIndex)];

    const renderYears = () => {
        const startYear = currentMonth.year - Math.floor(currentMonth.year % yearsPerPage);
        const years = Array.from({ length: yearsPerPage }, (_, i) => startYear + i + (yearPage * yearsPerPage));
        return (
            <div className="w-full grid grid-cols-4 mt-6 gap-4">
                {years.map(year => (
                    <button className={yearClassName} style={yearStyle} key={year} onClick={() => handleYearChange(year)}>
                        {year}
                    </button>
                ))}
            </div>
        );
    };

    const handleNext = () => {
        if (!showMonth && !showYear) {
            nextMonth();
        }
        if (showYear) {
            setYearPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!showMonth && !showYear) {
            prevMonth();
        }
        if (showYear) {
            setYearPage(prev => prev - 1);
        }
    };

    const isWeekend = (dayIndex: number) => {
        const realDayIndex = (dayIndex + weekStartDayIndex) % 7;
        if (weekStartDayIndex === 0) {
            return realDayIndex === 5 || realDayIndex === 6;
        } else if (weekStartDayIndex === 1) {
            return realDayIndex === 6 || realDayIndex === 0;
        } else if (weekStartDayIndex === 2) {
            return realDayIndex === 0 || realDayIndex === 1;
        } else if (weekStartDayIndex === 3) {
            return realDayIndex === 1 || realDayIndex === 2;
        } else if (weekStartDayIndex === 4) {
            return realDayIndex === 2 || realDayIndex === 3;
        } else if (weekStartDayIndex === 5) {
            return realDayIndex === 3 || realDayIndex === 4;
        } else if (weekStartDayIndex === 6) {
            return realDayIndex === 4 || realDayIndex === 5;
        }
    };

    useDidUpdate(() => {
        setCurrentMonth(new DateObject({
            calendar: calendar === 'persian' ? persian : undefined,
            locale: calendar === 'persian' ? persian_fa : undefined
        }).toFirstOfMonth());
    }, [calendar]);



    const generateCalendarDays = () => {
        const days = [];
        const firstDayOfMonth = new DateObject(currentMonth).toFirstOfMonth();
        const startDay = firstDayOfMonth.weekDay.index - weekStartDayIndex >= 0
            ? firstDayOfMonth.weekDay.index - weekStartDayIndex
            : 7 + (firstDayOfMonth.weekDay.index - weekStartDayIndex);
        const firstVisibleDay = firstDayOfMonth.subtract(startDay, "day");
        const stop = currentMonth.weekDay.index < 5 ? 5 :6;
        for (let week =  0  ; week <  stop; week++) {
            for (let day = 0; day < 7; day++) {
                days.push(new DateObject(firstVisibleDay).add(week * 7 + day, "day"));
            }
        }
        return days;
    };

    const calendarDays = generateCalendarDays();
    const isDateInRange = (date: DateObject) => {
        return dateObject.some(selectedDate => selectedDate.valueOf === date.valueOf);
    };
    return (
        <div className={`w-1/4 p-4 bg-white rounded-lg shadow-sm`}>
            {displayMonthAndYearName && (
                <div className={`w-full py-2 flex items-center justify-center gap-3 text-xl font-medium relative ${monthYearStyle}`}>
                    <p onClick={() => { setShowMonth(true); setShowYear(false); }} className={'cursor-pointer'}>
                        {currentMonth.month.name}
                    </p>
                    <p onClick={() => { setShowMonth(false); setShowYear(true); }} className={'cursor-pointer font-titr'}>
                        {currentMonth.year}
                    </p>
                    <ChevronLeftIcon onClick={handleNext} className="size-10 text-gray-500  absolute left-0 cursor-pointer" />

                    <ChevronRightIcon onClick={handlePrev} className="size-10 text-gray-500 absolute right-0 cursor-pointer" />
                </div>
            )}
            {!showMonth && !showYear && (
                <div className="w-full  border-spacing-x-1">
                    <div className={`h-20 w-full grid grid-cols-7 items-center justify-center ${weekDayStyle}`}>
                        {weekDayString ? weekDayString.map((item: string) => (
                            <div className={weekdaysClassName} key={item}>{item}</div>
                        )) : orderedWeekDays.map(item => (
                            <div className={weekdaysClassName} key={item.index}>{item.name}</div>
                        ))}
                    </div>
                    <div className='mt-5 grid grid-cols-7 gap-y-2'>
                        {calendarDays?.map((day, index) => {
                            const holidayList = holidays?.map((item) => new DateObject({
                                date: item, calendar: calendar === 'persian' ? persian : undefined,
                                locale: calendar === 'persian' ? persian_fa : undefined
                            }))


                            const isWeekendOff = weekendOff && isWeekend(index);
                            const isDisabled = disablingThePreviousDay && day.add(1 , 'days').valueOf() < today.valueOf() ;
                            const isHoliday = holidayList?.find(item => day.format() === item.format());
                            const isOutOfRange = disableOutOfRangeDays && day.month.index !== currentMonth.month.index;
                            const isPastDay = disablePastDays && day.valueOf() < today.valueOf();  ;
                            const isSelected = dateObject?.find(item => item.format() === day.format()) ? true : false;
                            console.log(isHoliday);

                            return (
                                <div key={day.valueOf()} className=''>
                                    <Day
                                        isRange={isRange}
                                        weekendOffStyle={weekendOffStyle}
                                        isSelected={isSelected}
                                        isPastDay={isPastDay}
                                        isOutOfRange={isOutOfRange}
                                        key={index}
                                        disable={isDisabled || false}
                                        date={day}
                                        dayClassName={dayClassName}
                                        holiday={Boolean(isHoliday)}
                                        weekendOff={isWeekendOff}
                                        onClick={() => handleSelectDate(day)}
                                        activeDayStyle={activeDayStyle}
                                        inactiveDayStyle={inactiveDayStyle}
                                        holidayStyle={holidayStyle}
                                        selectedDayStyle={selectedDayStyle}
                                        dayItemSize={dayItemSize}
                                        dayStyle={dayStyle}
                                        range_end={endDate?.daysLeft === day.daysLeft}
                                        range_start={startDate?.daysLeft === day.daysLeft}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {showMonth && (
                <div className="w-full grid grid-cols-3 gap-4 mt-6">
                    {Array.from({ length: 12 }).map((_, monthIndex) => (
                        <button className={monthYearClassName} style={monthYearStyle} key={monthIndex} onClick={() => handleMonthChange(monthIndex + 1)}>
                            {new DateObject({
                                calendar: calendar === 'persian' ? persian : undefined,
                                locale: calendar === 'persian' ? persian_fa : undefined,
                            }).set('month', monthIndex + 1).month.name}
                        </button>
                    ))}
                </div>
            )}
            {showYear && (
                <div>
                    {renderYears()}
                </div>
            )}
        </div>
    );
};

export default Calendar;
