"use client";

import React, { useEffect, useState } from "react";
import cx from "clsx";
import { Container, UnstyledButton, Group, Text, Menu, Tabs, Burger, rem, useMantineTheme, Button, Title, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPaperclip, IconChevronDown, IconBoxMultiple1, IconBoxMultiple7 } from "@tabler/icons-react";
import { IconBrowserCheck } from "@tabler/icons-react";
import classes from "./MainCalendarHeader.module.css";
import { View, Views } from "react-big-calendar";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import dayjs from "dayjs";


// ==> react-big-calendar의 view 속성 참고
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--view
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--cal-views

const range = { label: "월간" }; // default 값 월간으로 지정 
const tabs = ["전체", "휴가", "일정"];
const today = new Date();

export function MainCalendarHeader({ calendarState, currentAction, currentDate }:any) {

  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);  // 메뉴바 open 관리

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const [ calendarView, setCalendarView ] = useState<View>(Views.MONTH) //View 속성 지정 관리: 초기값 설정(Views.MONTH)
  const [today, setToday] = useState(currentDate) // 현재 날짜 관리

  useEffect(() => {
  //  console.log('잇히 ', calendarState) 
    if (calendarState){
      setCalendarView(calendarState)  
    }
  }, [calendarState]);

  const handleCalendarView = (view:View, label:string) => {
    setCalendarView(view) // calendarView를 클릭한 view로 설정
    calendarState(view) // calendarState에 해당 view 설정
    range.label = label // range.label에 해당 label 설정  
  }
  const returnCurrentMonth = () => {

  }

  return (
    <div className={classes.header} >
      <Container>
        <div className={classes.toolbar}>
          <Group>
            <IconArrowLeft className={classes.arrowIcon} />
            <div className={classes.dateTitle}>
              <span className={classes.year}>{`${dayjs(today).format('YYYY')}년`}</span>
              <span className={classes.month}>{`${dayjs(today).format('MM')}월`}</span>
            </div>
            <IconArrowRight className={classes.arrowIcon}/>
            <Button variant="default" className={classes.todayButton} onClick={returnCurrentMonth}>이번달</Button>
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
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={120}
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            trapFocus={false} // 포커스를 트랩하지 않도록 설정하여 에러 방지
            closeOnEscape={true} // ESC로 닫기 가능하게 설정
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
                  handleCalendarView(Views.DAY, "일간") // 클릭시 일간 Views 설정
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
                  handleCalendarView(Views.WEEK, "주간") 
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
                  handleCalendarView(Views.MONTH, "월간")   // 클릭시 월간 Views 설정(해당 속성 default)
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
                  handleCalendarView(Views.AGENDA, "일정목록") // 클릭시 일정 목록 Views 설정
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
