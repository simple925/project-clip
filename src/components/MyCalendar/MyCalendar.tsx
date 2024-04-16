'use client';
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)


export function MyCalendar() {
    const today = new Date()

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
            />
        </div>
    )
}