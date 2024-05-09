"use client";

import { Accordion } from "@mantine/core";
import styles from "./MainGroup.module.css";

const calendarItems = [
  {
    value: "내 캘린더",
    description: "생일",
  },
];

export function MainGroup() {
  const items = calendarItems.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className={styles.MainGroup}>
      <Accordion defaultValue="내 캘린더">{items}</Accordion>;
    </div>
  );
}
