"use client";

import React, { useEffect, useState } from "react";
import cx from "clsx";
import { Container, UnstyledButton, Group, Text, Menu, Tabs, Burger, rem, useMantineTheme, Button, Title, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPaperclip, IconChevronDown, IconBoxMultiple1, IconBoxMultiple7 } from "@tabler/icons-react";
import { IconBrowserCheck } from "@tabler/icons-react";
import classes from "./MainCalendarHeader.module.css";
import { View, Views } from "react-big-calendar";
import { MainCalendarTitle } from "@/components/MainCalendarTitle/MainCalendarTitle";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';


// ==> react-big-calendar의 view 속성 참고
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--view
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--cal-views

const range = { label: "월간" }; // default 값 월간으로 지정 
const tabs = ["전체", "휴가", "일정"];
const today = new Date();

export function MainCalendarHeader({ date, onNavigate, currentAction, calendarState }:any) {

  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);  // 메뉴바 open 관리

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  /* start
  calendarView handle
  */
  const [ calendarView, setCalendarView ] = useState<View>(Views.MONTH) //View 속성 지정 관리: 초기값 설정(Views.MONTH)
  // useEffect(() => {
  //  console.log('잇히 ', calendarView) // 1) console에 현재 calendarView값 로깅(MainCalendarHeader.tsx에서 찍힘)  
  //  calendarState.calendarState(calendarView) // 2) calendarState값을 상위 컴포넌트에 전달(prop)
  //}, [calendarView]) // calendarView가 변경될 때마다 해당 작업을 수행한다.
  /* end
    calendarView handle
  */
  return (
    <div className={classes.header} >
      <Container>
        {/* <MainCalendarTitle date={today} calendarState={calendarView} /> */}
        <div className={classes.toolbar}>
          <Group>
            <IconArrowLeft className={classes.arrowIcon} />
            <div className={classes.dateTitle}>
              <span className={classes.year}>{`${today.getFullYear()}년`}</span>
              <span className={classes.month}>{`${today.getMonth() + 1}월`}</span>
            </div>
            <IconArrowRight className={classes.arrowIcon}  />
            <Button variant="default" className={classes.todayButton} >이번달</Button>
          </Group>
        </div>
        <div className={classes.container}>
        <Tabs
          defaultValue="전체"
          variant="outline"
          visibleFrom="sm"
          className="tabs"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
        <Group className="group">
          {/* <IconPaperclip size={28} /> */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={120}
            // position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton className={cx(classes.range, { [classes.userActive]: userMenuOpened, })}>
                <Group gap={7}>
                  <Text fw={500} size="sm" lh={1} mr={3}>{range.label}</Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            {/* 드롭다운 메뉴바로 일간, 주간, 월간 표기 */}
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconBoxMultiple1
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
                onClick={() => {
                  setCalendarView(Views.DAY) // 클릭시 일간 Views 설정
                  range.label = '일간'
                }}
              >
                일간
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconBoxMultiple7
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
                onClick={() => {
                  setCalendarView(Views.WEEK)  // 클릭시 주간 Views 설정
                  range.label = '주간'
                }}
              >
                주간
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconBrowserCheck
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
                onClick={() => {
                  setCalendarView(Views.MONTH)  // 클릭시 월간 Views 설정(해당 속성 default)
                  range.label = '월간'
                }}
              >
                월간
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconBrowserCheck
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.green[6]}
                    stroke={1.5}
                  />
                }
                onClick={() => {
                  setCalendarView(Views.AGENDA) // 클릭시 일정 목록 Views 설정
                  range.label = '일정목록'
                }}
              >
                일정목록
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
      </Container>
    </div>
  );
}
