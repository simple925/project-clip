"use client";

import React from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useState } from "react";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import styles from "./MainCalendarSideCalendar.module.css";

const dayRenderer: DatePickerProps["renderDay"] = (date) => {
  // 오늘 날짜 표기
  const day = date.getDate();
  return (
    <>
      <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
        <div>{day}</div>
      </Indicator>
    </>
  );
};

export function MainCalendarSideCalendar({ selectedDate, onSelectDate }) {
  const [localSelectedDate, setLocalSelectedDate] = useState<Date | null>(null);
  // 날짜 선택시
  const handleDateSelect = (date) => {
    onSelectDate(date); // 선택 날짜를 부모 컴포넌트로 전달
    console.log('###현재 선택 날짜 :', date)
  };
  return (
    <div className={styles.MainCalendarSideNav}>
      <div className={styles.MainCalendarSideCalendar}>
        <div className={styles.calendar}>
          <DatePicker value={selectedDate} renderDay={dayRenderer} onChange={handleDateSelect}></DatePicker>
        </div>
      </div>
    </div>
  );
}
