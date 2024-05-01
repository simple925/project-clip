"use client";

import React from "react";
import "./MainCalendarSideNav.module.css";
import { MainCalendarSideCalendar } from "../MainCalendarSideCalendar/MainCalendarSideCalendar";
import { MainGroup } from "../MainGroup/MainGroup";

export default function MainCalendarSideNav() {
  return (
    <>
      <MainCalendarSideCalendar />
      <MainGroup />
    </>
  );
}
