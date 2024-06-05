"use client";

import { Accordion, ColorSwatch, CheckIcon, rem } from "@mantine/core";
import styles from "./MainGroup.module.css";
import { useEffect, useState } from "react";

export function MainGroup({groups, onGroupSelect}) {

  // 선택된 그룹의 배열 상태
  const [selectedGroupDates, setSelectedGroupDates] = useState([]);

  const [obj, setObj] = useState([
    { key: 1, value: "생일", description: "생일", color: "#fe4365", selectedDate: ["2024-06-10 00:00:00", "2024-06-18 00:00:00",] },
    { key: 2, value: "여름 휴가", description: "여름 휴가", color: "#fc9d9a", selectedDate: ["2024-06-12 00:00:00", "2024-06-19 00:00:00",] },
    { key: 3, value: "프로젝트 회의", description: "프로젝트 회의", color: "#f9cdad", selectedDate: ["2024-06-03 00:00:00", "2024-06-05 00:00:00",] },
  ]);
  const [selectedColor, setSelectedColor] = useState(null);

  function onSelectedColorBtn(item: any) {
    setSelectedColor(item.color);
    setSelectedGroupDates(item)
  }

  useEffect(() => {
    if (selectedGroupDates) {
      onGroupSelect(selectedGroupDates);
    }
  }, [selectedGroupDates, onGroupSelect]);


  const items = obj.map((item) => {
    const isActive = item.color === selectedColor;
    const colorBtn = isActive ? '#fff' : 'none';
    const cursorBtn = isActive ? 'pointer' : 'default';

    const colors = (
      <ColorSwatch
        color={item.color}
        style={{ color: colorBtn, cursor: cursorBtn }}
      >
        {isActive && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
      </ColorSwatch>
    );

    return (
      <Accordion.Item key={item.value} value={item.value}>
        <Accordion.Control onClick={() => onSelectedColorBtn(item)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          {colors}
          <span>{item.value}</span>
          </div>
          </Accordion.Control>
        <Accordion.Panel>{item.color}</Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <div className={styles.MainGroup}>
      <Accordion defaultValue="내 캘린더">{items}</Accordion>
    </div>
  );
}
