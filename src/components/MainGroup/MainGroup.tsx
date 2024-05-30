"use client";

import { Accordion, ColorSwatch, CheckIcon, rem } from "@mantine/core";
import styles from "./MainGroup.module.css";
import { useState } from "react";

export function MainGroup() {

  const [obj, setObj] = useState([
    { key: 1, value: "생일", description: "생일", color: "red" },
    { key: 2, value: "여름 휴가", description: "여름 휴가", color: "blue" },
    { key: 3, value: "프로젝트 회의", description: "프로젝트 회의", color: "green" },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(
    { key: 1, value: "생일", description: "생일", color: "red" }
  );

  const [checkedColor, setCheckedColor] = useState(true); // 선택
  const [selectedColor, setSelectedColor] = useState(null);

  function onSelectedColorBtn(item: any) {
    setCheckedColor((c) => !c)
    setSelectedColor(item.color);
    setSelectedEvent(item)
    console.log('###현재 선택 이벤트 :', item)
  }

  // function onSelectedEvent(value: any) {
  //   setSelectedEvent(value)
  //   console.log('###현재 선택 이벤트 :', value)
  // }

  const items = obj.map((item) => {
    const isActive = item.color === selectedColor;
    const colorBtn = isActive ? '#fff' : 'none';
    const cursorBtn = isActive ? 'pointer' : 'default';

    const colors = (
      <ColorSwatch
        component="button"
        color={item.color}
        style={{ color: colorBtn, cursor: cursorBtn }}
      >
        {checkedColor && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
      </ColorSwatch>
    );
    return (
      <Accordion.Item key={item.value} value={item.value}>
        <Accordion.Control onClick={() => onSelectedColorBtn(item)}>{colors}{item.value}</Accordion.Control>
        <Accordion.Panel>{item.color}</Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <div className={styles.MainGroup}>
      <Accordion defaultValue="내 캘린더">{items}</Accordion>;
    </div>
  );
}
