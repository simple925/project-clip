"use client";

import React, { useState } from "react";
import { MyCalendar } from "@/components/MyCalendar/MyCalendar";
import MainCalendarSideNav from "@/components/MainCalendarSideNav/MainCalendarSideNav";
import { MainCalendarSideCalendar } from "@/components/MainCalendarSideCalendar/MainCalendarSideCalendar";
import { MainGroup } from "@/components/MainGroup/MainGroup";
import styles from "./MainCalendar.module.css";

export default function MainCalendar() {

  // 현재 선택된 날짜 
  const [selectedDate, setSelectedDate] = useState(new Date());

    // MainCalendarSideCalendar에서 선택된 날짜가 변경될 때 호출되는 콜백 함수
  const handleDateSelect = (date) => {
    setSelectedDate(date); // 선택된 날짜를 상태로 업데이트
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_sideNav}>
        <MainCalendarSideCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
        <MainGroup />
      </div>
      <div className={styles.main_content}>
        <MyCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
      </div>
    </div>
  );
}
