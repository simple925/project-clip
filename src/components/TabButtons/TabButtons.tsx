"use client";
// use client 사용해야 함

import { useState, useRef } from "react";
import { Tabs, rem } from "@mantine/core";
import style from "./TabButtons.module.css";


// export function TabItem(
//   props: ButtonProps & React.ComponentPropsWithoutRef<"button">
// ) {
//   return <Button variant="default" {...props} />;
// }

// export default function으로 외부 출력해주어야 합니다
export default function TabButtons() {

  return (
    <Tabs variant="pills" radius="xl" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection="">
          공지
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection="">
          휴가
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection="">
          지출
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}