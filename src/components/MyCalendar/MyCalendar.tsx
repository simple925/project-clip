'use client';
import React, {  useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarToolbar } from "../CalendarToolbar/CalendarToolbar";
import style from './MyCalendar.module.css';

export function MyCalendar({ calendarState, selectedDate, onSelectDate }:any) {
    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    const today = selectedDate;     // 부모 컴포넌트의 date로 현재값 설정
    const handleDateSelect = (date: any) => {     // 선택된 날짜 변경시 부모 컴포넌트로 전달
        onSelectDate(date);
    };

    const events = [
        {
            title: '오늘',
            start: today,
            end: today
        }
    ]

    const [calendarView, setCalendarView] = useState(Views.MONTH) // default Views.MONTH 보여주기 설정
    useEffect(()=>{
        console.log('얌미 ', calendarState) // 1) console에 calendarState값 로깅
        setCalendarView(calendarState) // 2) calendarView에 불러온 값 담기
    }, [calendarState]) // calendarState가 변경될 때 동작
    return (
        <div className={style["my_calendar"]}>
            <Calendar
                defaultDate={today} // 오늘 날짜(상위 컴포넌트에서 받아옴)
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: 30 }}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                view={calendarView} // view 속성
                components={{
                    toolbar: CalendarToolbar // 툴바 컴포넌트 사용
                }}
            />
        </div>
    )
}