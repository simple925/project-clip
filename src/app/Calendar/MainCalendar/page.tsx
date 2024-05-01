"use client";

import React from "react";
import { MyCalendar } from "@/components/MyCalendar/MyCalendar";
import "./MainCalendar.module.css";

export default function MainCalendar() {
  return (
    <>
      {/* <h1>오늘 날짜 기준 달력</h1> */}
      <MyCalendar />
    </>
  );
}
