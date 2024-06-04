"use client";

import React from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useState } from "react";
import { Indicator } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import styles from "./MainCalendarSideCalendar.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";

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

export function MainCalendarSideCalendar({ selectedDate, onSelectDate, onNavigate }: any) {
  // 날짜 선택시
  const handleDateSelect = (date: Date) => {
    onSelectDate(date); // 선택 날짜를 부모 컴포넌트로 전달
    console.log('###현재 선택 날짜 :', date)
  };
  
  const handleNextMonth = (date: Date) => {
    onNavigate('NEXT'); // 'NEXT' action 전달
    onSelectDate(date); // 선택 날짜를 부모 컴포넌트로 전달
  };

  const handlePreviousMonth = (date: Date) => {
    onNavigate('PREV'); // 'PREV' action 전달
    onSelectDate(date); // 선택 날짜를 부모 컴포넌트로 전달
  };

  return (
    <div className={styles.MainCalendarSideNav}>
      <div className={styles.MainCalendarSideCalendar}>
        <div className={styles.calendar}>
          <DatePicker
            locale="ko" // 한국어 설정  
            firstDayOfWeek={0} // 시작일 설정(일요일 : 0)
            value={selectedDate}
            renderDay={dayRenderer}
            onChange={handleDateSelect}
            onNextMonth={handleNextMonth}
            onPreviousMonth={handlePreviousMonth}
          />
        </div>
      </div>
    </div>
  );
}
