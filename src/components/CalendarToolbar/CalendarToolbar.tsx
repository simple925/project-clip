'use client';

import React, { useState } from "react";
import {
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBoxMultiple7,
} from "@tabler/icons-react";
import { IconBrowserCheck } from "@tabler/icons-react";


const range = [
  { label: "월간", value: "monthly", iconName: IconBrowserCheck, },
  { label: "주간", value: "weekly", iconName: IconBoxMultiple7, },
  { label: "일간", value: "daily", iconName: IconBrowserCheck, },
];

export function CalendarToolbar({ date, onNavigate }:any) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigate = (action:any) => {
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
    </div>
  );
}