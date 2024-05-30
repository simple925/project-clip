/**
 * 메인 캘린더의 layout
 * 
 * MainCalenderHear (메인 헤더 : 전체/휴가/일정 그룹 + 일간/주간/월간/일정목록 메뉴바)
 * MainCalendarSideCalendar (사이드 달력 : 현재 날짜, onSelect 동작)
 * MainGroup (사이드 그룹 : 내 캘린더 그룹 보기. TODO : 추가 기능 정의 필요)
 * MyCalendar (중앙 메인 달력 : react-big-calendar. 현재 날짜, onSelect 동작, calendarStateValue)
 */

"use client";
import React, { useState } from "react";
import { AppShell, Stack, rem, MantineProvider } from '@mantine/core';
import { MenuBar } from "@/components/MenuBar/MenuBar";
import { MainCalendarHeader } from "@/components/MainCalendarHeader/MainCalendarHeader";
import { MainCalendarSideCalendar } from "@/components/MainCalendarSideCalendar/MainCalendarSideCalendar";
import { MainGroup } from "@/components/MainGroup/MainGroup";
import { MyCalendar } from "@/components/MyCalendar/MyCalendar";
import { View, Views } from "react-big-calendar";
// ==> react-big-calendar의 view 속성 참고
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--view
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--cal-views


export default function MyPageLayout({ children }: { children: any }) {

  const [calendarStateValue, setCalendarStateValue] = useState<View>(Views.MONTH) // Views 상태 관리( MainCalendarHeader와 MyCalendar에서 공유)
  const _calendarState = (state:View) => { // MainCalendarHeader.calendarView<View> 값이 변할 경우 호출됨
    console.log('드갈께~ ', state)
    setCalendarStateValue(state) // MainCalendarHeader에서 변경된 state 값을 setCalendarStateValue에 담는다
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
          {/* ### MainCalendarHeader: 전체, 휴가, 일정 선택 + 일간/주간/월간/일정목록 메뉴바 */}
          {/* MainCalendarHearder에서 calendarState라는 prop 전달(_calendarState값 전달) */}
        </AppShell.Header>
        {/* 해당 부분 page에 형제 컴포넌트로 만들어 데이터 통신에 용이하게 함 */}
        <AppShell.Navbar zIndex={100} p="md">
          <MainCalendarSideCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
          {/* ### MainCalendarSideCalendar: 사이드 달력, 오늘 날짜 자동 선택, 선택할 때마다 동작 */}
          <MainGroup />
          {/* ### MainGroup: 내 캘린더 그룹별 볼 수 있음. 추가적인 기능 정의 필요 */}
        </AppShell.Navbar>
        <AppShell.Main>
          <MyCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} calendarState={calendarStateValue} />
          {/* ### MyCalendar: react-big-calender 라이브러리 이용한 메인 달력. 오늘 날짜 자동 선택, 선택할 때마다 동작, (MainCalendarHeader에서 변경된)상태 정보 */}
        </AppShell.Main>
        <AppShell.Footer bg="orange.1">
          <MenuBar></MenuBar>
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
