import { useState } from "react";
import { Input } from "./input";
import { DatePikerProps } from "./type";
import { useClickOutside } from "@mantine/hooks";
import Calendar from "./calendar";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const DatePiker = ({ calendar, NumberOfMonths = 1 , showMonths ,rangeInMonth , calendarStyle , disabledMonth = false , disabledYear =false,    inputDate, weekStartDayIndex, disablePastDays, weekendOff, datePiker, minDate, weekDayStyle, activeDayStyle, maxDate, weekDayString, setValue, disablingThePreviousDay, disableOutOfRangeDays, multipleChoice, value, monthYearClassName, dayClassName, monthYearStyle, dayStyle, displayMonthAndYearName, inactiveDayStyle, selectedDayStyle, dayItemSize, holidayStyle, holidays, rangeEndDayBorder, rangeStartDayBorder, placeholder, inputIcon, icon, inputClassName = "w-48 py-2 px-1 border-2 rounded-md flex items-center justify-between border border-white my-4 bg-white ", inputStyle  , weekdaysClassName , weekdaysStyle , weekendOffStyle , yearClassName , yearStyle , isRange}: DatePikerProps) => {
    const [showCalendar, setShowCalendar] = useState(inputDate)
    const ref = useClickOutside(() => setShowCalendar(false))
    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar)
    }
    const [startDate, setStartDate] = useState<DateObject | null>(null);
    const [endDate, setEndDate] = useState<DateObject | null>(null);
    const [date, setDate] = useState([new DateObject({
        calendar: calendar === 'persian' ? persian : undefined,
        locale: calendar === 'persian' ? persian_fa : undefined
    })])
    
        const handleValue = (value : DateObject[]) =>{
            setValue(value)
            setDate(value)
        }
    return (
        <div ref={ref} className={"w-full space-y-3 font-vazir bg-gray-200 min-h-screen flex flex-col justify-center items-center "} dir="rtl" >

            {
                inputDate && <Input style={inputStyle} icon={inputIcon && <CalendarIcon  className="h-6 w-6 text-gray-500" />} onClick={handleShowCalendar} placeholder="hello" className={inputClassName} value={date[0]?.format()}  />
            }
            <div className="w-full flex  flex-col items-center justify-center gap-2">
            {
                !showCalendar && <Calendar setEndDate={setEndDate} setStartDate={setStartDate} listDate={date} startDate={startDate} endDate={endDate} calendarStyle={calendarStyle} showMonths={showMonths} disabledMonth={disabledMonth} disabledYear={disabledYear} setValue={handleValue}  calendar={calendar} disablePastDays={disablePastDays} multipleChoice={multipleChoice} inputDate={inputDate} datePiker={datePiker} weekStartDayIndex={weekStartDayIndex} holidays={holidays} isRange={isRange} weekendOff={weekendOff} weekendOffStyle={weekendOffStyle} activeDayStyle={activeDayStyle} weekDayStyle={weekDayStyle} inactiveDayStyle={inactiveDayStyle} monthYearClassName={monthYearClassName} monthYearStyle={monthYearStyle} disableOutOfRangeDays={disableOutOfRangeDays} disablingThePreviousDay={disablingThePreviousDay} displayMonthAndYearName={displayMonthAndYearName} dayClassName={dayClassName} dayItemSize={dayItemSize} dayStyle={dayStyle} holidayStyle={holidayStyle} maxDate={maxDate} minDate={minDate} rangeEndDayBorder={rangeEndDayBorder} rangeStartDayBorder={rangeStartDayBorder} />
            }
            {
                !showCalendar && NumberOfMonths > 1 && <Calendar setEndDate={setEndDate} setStartDate={setStartDate} listDate={date} startDate={startDate} endDate={endDate} calendarStyle={calendarStyle} disabledMonth={disabledMonth} disabledYear={disabledYear} rangeInMonth={rangeInMonth} showMonths={showMonths} setValue={handleValue}  calendar={calendar} disablePastDays={disablePastDays} multipleChoice={multipleChoice} inputDate={inputDate} datePiker={datePiker} weekStartDayIndex={weekStartDayIndex} holidays={holidays} isRange={isRange} weekendOff={weekendOff} activeDayStyle={activeDayStyle} weekDayStyle={weekDayStyle} inactiveDayStyle={inactiveDayStyle} monthYearClassName={monthYearClassName} monthYearStyle={monthYearStyle} disableOutOfRangeDays={disableOutOfRangeDays} disablingThePreviousDay={disablingThePreviousDay} displayMonthAndYearName={displayMonthAndYearName} dayClassName={dayClassName} dayItemSize={dayItemSize} dayStyle={dayStyle} holidayStyle={holidayStyle} maxDate={maxDate} minDate={minDate} rangeEndDayBorder={rangeEndDayBorder} rangeStartDayBorder={rangeStartDayBorder} />
            }
            {
                !showCalendar && NumberOfMonths > 2 && <Calendar setEndDate={setEndDate} setStartDate={setStartDate} listDate={date} endDate={endDate} startDate={startDate} calendarStyle={calendarStyle} disabledMonth={disabledMonth} disabledYear={disabledYear}  setValue={handleValue} rangeInMonth={rangeInMonth} showMonths={showMonths} calendar={calendar} disablePastDays={disablePastDays} multipleChoice={multipleChoice} inputDate={inputDate} datePiker={datePiker} weekStartDayIndex={weekStartDayIndex} holidays={holidays} isRange={isRange} weekendOff={weekendOff} activeDayStyle={activeDayStyle} weekDayStyle={weekDayStyle} inactiveDayStyle={inactiveDayStyle} monthYearClassName={monthYearClassName} monthYearStyle={monthYearStyle} disableOutOfRangeDays={disableOutOfRangeDays} disablingThePreviousDay={disablingThePreviousDay} displayMonthAndYearName={displayMonthAndYearName} dayClassName={dayClassName} dayItemSize={dayItemSize} dayStyle={dayStyle} holidayStyle={holidayStyle}  maxDate={maxDate} minDate={minDate} rangeEndDayBorder={rangeEndDayBorder} rangeStartDayBorder={rangeStartDayBorder} />
            }
            </div>
        </div>
    )
}

export default DatePiker;