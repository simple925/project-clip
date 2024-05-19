'use client';

import React, { useState } from "react";
import cx from "clsx";
import {
  UnstyledButton,
  Group,
  Text,
  Menu,
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
import classes from "./CalendarToolbar.module.css";
import { IconBrowserCheck } from "@tabler/icons-react";


const range = [
  { label: "월간", value: "monthly", iconName: IconBrowserCheck, },
  { label: "주간", value: "weekly", iconName: IconBoxMultiple7, },
  { label: "일간", value: "daily", iconName: IconBrowserCheck, },
];

export function CalendarToolbar({ date, onNavigate }) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigate = (action) => {
    onNavigate(action);
  };
  
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => navigate('TODAY')}>
          이번달
        </button>
        <button type="button" onClick={() => navigate('PREV')}>
          이전
        </button>
        <span className="rbc-toolbar-label">
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        </span>
        <button type="button" onClick={() => navigate('NEXT')}>
          다음
        </button>
      </span>
      <Group justify="space-between">
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
                  {range[0].label}
                </Text>
                <IconChevronDown
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            {range.map((d) => (
              <Menu.Item
                key={d.value}
                onClick={() => navigate(d.value.toUpperCase())}
                leftSection={
                  <d.icon style={{ width: rem(16), height: rem(16), stroke: 1.5 }} />
                }
              >
                {d.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
}