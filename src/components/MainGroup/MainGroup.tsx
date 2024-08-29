import { Accordion, ColorSwatch, CheckIcon, rem } from "@mantine/core";
import styles from "./MainGroup.module.css";
import { useEffect, useState } from "react";
import { trpc } from '@/server/client';

export function MainGroup({ calendarGroups, onGroupSelect }) {
  // 선택된 그룹의 배열 상태
  const [selectedGroupDates, setSelectedGroupDates] = useState(null);
  // calendarGroups를 상태로 관리 (초기값을 빈 배열로 설정)
  const [groupDatas, setGroupDatas] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeGroupId, setActiveGroupId] = useState(null); // 현재 선택된 그룹 ID
  console.log( '##################', calendarGroups );
  
  // 특정 그룹의 이벤트를 가져오는 함수
  const { data: events } = trpc.calendarEvents.getCalendarEventsByCalendarGroupId.useQuery(
    { calendar_group_id: activeGroupId },  // 현재 선택된 그룹 ID로 쿼리 실행
    {
      enabled: !!activeGroupId,  // 그룹 ID가 있을 때만 쿼리 실행
      onSuccess: (data) => {
        // 이벤트 데이터를 상태로 저장
        setSelectedEvents((prev) => ({ ...prev, [activeGroupId]: data }));
      },
      onError: (error) => {
        console.error("Error loading events:", error);
      },
    }
  );


  // 아코디언 항목 클릭 시 처리
  const onSelectedColorBtn = (item) => {
    setSelectedColor(item.color);
    setSelectedGroupDates(item);

    // 선택된 그룹 ID 업데이트 (쿼리 실행을 트리거)
    setActiveGroupId(item.id);
  };

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
        <Accordion.Panel>
          {selectedEvents[item.id] ? (
            selectedEvents[item.id].map(event => (
              <div key={event.id}>
                <strong>{event.title}</strong>
                <p>{event.description}</p>
                <p>{new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>이벤트 없음</p>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <div className={styles.MainGroup}>
      <Accordion defaultValue="내 캘린더">{items}</Accordion>
    </div>
  );
}