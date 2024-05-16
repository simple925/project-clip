"use client";

import React from "react";
import cx from "clsx";
import { useState } from "react";
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

const range = { label: "일간" };
const tabs = ["전체", "휴가", "일정"];

export function MainCalendarHeader() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group justify="space-between">
          <IconPaperclip size={28} />
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
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
            </Menu.Target> */}
            {/* 드롭다운 메뉴바로 일간, 주간, 월간 표기 */}
            {/* <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconBoxMultiple1
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
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
              >
                월간
              </Menu.Item>
            </Menu.Dropdown>
          </Menu> */}
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
