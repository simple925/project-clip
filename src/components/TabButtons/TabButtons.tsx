"use client";
// use client 사용해야 함

import { useState, useRef } from "react";
import { Tabs, rem } from "@mantine/core";
import style from "./TabButtons.module.css";

// export default function으로 외부 출력해주어야 합니다
export default function TabButtons(prop: {
  tabItems: { label: string; value: string }[];
}) {
  const tabItems: any = prop.tabItems;

  return (
    <Tabs variant="pills" radius="xl" defaultValue={tabItems[0].value}>
      <Tabs.List>
        {tabItems.map((item: any, index: any) => (
          <Tabs.Tab key={index} value={item.value} leftSection="">
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {/* 
      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel> */}
    </Tabs>
  );
}
