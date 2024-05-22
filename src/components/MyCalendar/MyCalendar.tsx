'use client';
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarToolbar } from "../CalendarToolbar/CalendarToolbar";
import { MainCalendarHeader } from "../MainCalendarHeader/MainCalendarHeader";


export function MyCalendar({ calendarState, selectedDate, onSelectDate }:any) {
    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    // 부모 컴포넌트의 date로 현재값 설정
    const today = selectedDate;
    // 선택된 날짜 변경시 부모 컴포넌트로 전달
    const handleDateSelect = (date:any) => {
        onSelectDate(date);
    };

    const events = [
        {
            title: '오늘',
            start: today,
            end: today
        }
    ]
    const [calendarView, setCalendarView] = useState(Views.MONTH)

    useEffect(()=>{
        console.log('얌미 ', calendarState)
        setCalendarView(calendarState)
    }, [calendarState])
    return (
        <div style={{ height: 500 }}>
            <Calendar
                defaultDate={today}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: 20 }}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                view={calendarView}
                components={{
                    toolbar: CalendarToolbar
                }}
            />
        </div>
    )
}