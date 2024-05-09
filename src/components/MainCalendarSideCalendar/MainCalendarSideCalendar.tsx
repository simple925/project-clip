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

export function MainCalendarSideCalendar() {
  return (
    <div className={styles.MainCalendarSideNav}>
      <div className={styles.MainCalendarSideCalendar}>
        <div className={styles.calendar}>
          <DatePicker renderDay={dayRenderer}></DatePicker>
        </div>
      </div>
    </div>
  );
}
