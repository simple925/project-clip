import { Accordion, ColorSwatch, CheckIcon, rem } from "@mantine/core";
import styles from "./MainGroup.module.css";
import { useEffect, useState } from "react";

export function MainGroup({ calendarGroups, onGroupSelect }) {
  // 선택된 그룹의 배열 상태
  const [selectedGroupDates, setSelectedGroupDates] = useState(null);

  // calendarGroups를 상태로 관리 (초기값을 빈 배열로 설정)
  const [groupDatas, setGroupDatas] = useState([]);

  // calendarGroups가 변경될 때 groupDatas 상태 업데이트
  useEffect(() => {
    if (Array.isArray(calendarGroups)) {
      setGroupDatas(calendarGroups);
    } else {
      console.error("calendarGroups is not an array:", calendarGroups);
      setGroupDatas([]); // 잘못된 데이터가 들어온 경우 빈 배열로 초기화
    }
  }, [calendarGroups]);

  const [selectedColor, setSelectedColor] = useState(null);

  function onSelectedColorBtn(item: any) {
    setSelectedColor(item.color);
    setSelectedGroupDates(item);
  }

  // 선택된 그룹 날짜가 변경될 때 부모 컴포넌트에 전달
  useEffect(() => {
    if (selectedGroupDates) {
      onGroupSelect(selectedGroupDates);
    }
  }, [selectedGroupDates, onGroupSelect]);

  // groupDatas 상태를 기반으로 Accordion 항목 생성
  const items = groupDatas.map((item) => {
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
      <Accordion.Item key={item.id} value={item.name}>
        <Accordion.Control onClick={() => onSelectedColorBtn(item)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {colors}
            <span>{item.name}</span>
          </div>
        </Accordion.Control>
        <Accordion.Panel>{item.description || item.color}</Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <div className={styles.MainGroup}>
      <Accordion defaultValue="내 캘린더">{items}</Accordion>
    </div>
  );
}