'use client';
import React, {  useState, useEffect, use } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarToolbar } from "../CalendarToolbar/CalendarToolbar";
import style from './MyCalendar.module.css';
import 'moment-timezone'
import 'moment/locale/ko' // 한글 옵션을 위해서 import 추가

export function MyCalendar({ calendarState, selectDate, onSelectDate, selectedGroupEvent, currentAction }:any) {
    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    const today = selectDate;     // 부모 컴포넌트의 date로 현재값 설정
    const handleDateSelect = (date: any) => {     // 선택된 날짜 변경시 부모 컴포넌트로 전달
        onSelectDate(date);
    };
    // console.log('###현재 선택된 이벤트 :', selectedGroupEvent)
    const selectedEvents = selectedGroupEvent && Array.isArray(selectedGroupEvent.selectedDate) // selectedDate 값이 있을 경우에만,
        ? selectedGroupEvent.selectedDate.map((date: string, index: number) => ({
            id: index + 1,
            title: selectedGroupEvent.description,
            start: new Date(date),
            end: new Date(date),
            color: selectedGroupEvent.color
        }))
        : [];

    const initialEvents = [
        {
            id: 0,
            title: '오늘',
            start: today,
            end: today,
        },
    ];
    const events = [
        ...initialEvents,
        ...selectedEvents
    ];

    console.log('현재 선택된 이벤트 리스트:', events)

    // 이벤트 스타일링 속성 추가 
    const eventStyleGetter = (event: any) => {
        const backgroundColor = event.color || '#c8c8a9';
        const style = {
            backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    };

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
                events={events} // 모든 이벤트 추가
                startAccessor="start"
                endAccessor="end"
                style={{ margin: 30 }}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                view={calendarView} // view 속성
                components={{
                    // toolbar: CalendarToolbar // 툴바 컴포넌트 사용
                        toolbar: (props) => {
                        const toolbarProps = { ...props, currentAction }; // nextMonth 값을 props에 추가
                        return <CalendarToolbar {...toolbarProps} />; // CalendarToolbar 컴포넌트에 nextMonth 값 전달
                    },
                }}
                eventPropGetter={eventStyleGetter} // 이벤트 스타일 설정 함수 추가
            />
        </div>
    )
}