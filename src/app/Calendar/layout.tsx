"use client";
import React, { useState } from "react";
import { AppShell, Stack, rem, MantineProvider } from '@mantine/core';
import { MenuBar } from "@/components/MenuBar/MenuBar";
import { MainCalendarHeader } from "@/components/MainCalendarHeader/MainCalendarHeader";
import { MainCalendarSideCalendar } from "@/components/MainCalendarSideCalendar/MainCalendarSideCalendar";
import { MainGroup } from "@/components/MainGroup/MainGroup";
import { MyCalendar } from "@/components/MyCalendar/MyCalendar";
import { View, Views } from "react-big-calendar";
// import MainCalendarSideNav from "@/components/MainCalendarSideNav/MainCalendarSideNav";
export default function MyPageLayout({ children }: { children: any }) {

  const generatedValue = "This is a generated value";
  const [calendarStateValue, setCalendarStateValue] = useState<View>(Views.MONTH)
  const _calendarState = (state:View) => {
    /*
      MainCalendarHeader.calendarView<View> 값이 변할 경우 호출됨
    */
    console.log('드갈께~ ', state)
    setCalendarStateValue(state)
  }

  // 현재 선택된 날짜 
  const [selectedDate, setSelectedDate] = useState(new Date());

    // MainCalendarSideCalendar에서 선택된 날짜가 변경될 때 호출되는 콜백 함수
  const handleDateSelect = (date:any) => {
    setSelectedDate(date); // 선택된 날짜를 상태로 업데이트
  };
  return (
    <>
      <AppShell
        header={{ height: 85 }}
        withBorder={false}
        footer={{ height: 120 }}
      >
        {/* zIndex의 수치를 Header에 더 높이 주어서, 자연스럽게 출력되게끔 조정 */}
        <AppShell.Header zIndex={300}>
          <MainCalendarHeader calendarState={_calendarState}/>
        </AppShell.Header>
        {/* 해당 부분 page에 형제 컴포넌트로 만들어 데이터 통신에 용이하게 함 */}
        <AppShell.Navbar zIndex={100} p="md">
          <MainCalendarSideCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
          <MainGroup />
        </AppShell.Navbar>
        <AppShell.Main>
          <MyCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} calendarState={calendarStateValue} />
        </AppShell.Main>
        <AppShell.Footer bg="orange.1">
          <MenuBar></MenuBar>
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
