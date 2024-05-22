"use client";

import React, { useEffect, useState } from "react";
import cx from "clsx";
import {
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPaperclip,
  IconChevronDown,
  IconBoxMultiple1,
  IconBoxMultiple7,
} from "@tabler/icons-react";
import classes from "./MainCalendarHeader.module.css";
import { IconBrowserCheck } from "@tabler/icons-react";
import { View, Views } from "react-big-calendar";

const range = { label: "일간" };
const tabs = ["전체", "휴가", "일정"];

export function MainCalendarHeader(prop:any) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  /* start
    calendarView handle
  */
  const [ calendarView, setCalendarView ] = useState<View>(Views.MONTH)
  useEffect(() => {
    console.log('잇히 ', calendarView)
    prop.calendarState(calendarView)
  }, [calendarView])
  /* end
    calendarView handle
  */
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group justify="space-between">
          <IconPaperclip size={28} />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.range, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {range.label}
                  </Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
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
                  setCalendarView(Views.DAY)
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
                  setCalendarView(Views.WEEK)
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
                  setCalendarView(Views.MONTH)
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
                  setCalendarView(Views.AGENDA)
                  range.label = '일정목록'
                }}
              >
                일정목록
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue="전체"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
