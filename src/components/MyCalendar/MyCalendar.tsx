'use client';
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)


export function MyCalendar({ selectedDate , onSelectDate }) {
    // 부모 컴포넌트의 date로 현재값 설정
    const today = selectedDate;

    // 선택된 날짜 변경시 부모 컴포넌트로 전달
    const handleDateSelect = (date) => {
        onSelectDate(date);
    };

    const events = [
        {
            title: '오늘',
            start: today,
            end: today
        }
    ]

    return (
        <div style={{height: 500}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{margin: 20}}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
            />
        </div>
    )
}