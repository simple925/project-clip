"use client";

import React, { useState } from "react";
import { MyCalendar } from "@/components/MyCalendar/MyCalendar";
import MainCalendarSideNav from "@/components/MainCalendarSideNav/MainCalendarSideNav";
import { MainCalendarSideCalendar } from "@/components/MainCalendarSideCalendar/MainCalendarSideCalendar";
import { MainGroup } from "@/components/MainGroup/MainGroup";
import styles from "./MainCalendar.module.css";

export default function MainCalendar() {
  // 현재 선택된 날짜 
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={styles.main}>
      <div className={styles.main_sideNav}>
        <MainCalendarSideCalendar selectedDate={selectedDate} />
        <MainGroup />
      </div>
      <div className={styles.main_content}>
        <MyCalendar selectedDate={selectedDate} />
      </div>
    </div>
  );
}
