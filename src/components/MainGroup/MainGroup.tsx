import { Accordion, ColorSwatch, CheckIcon, rem } from "@mantine/core";
import styles from "./MainGroup.module.css";
import { useEffect, useState } from "react";
import { trpc } from '@/server/client';

export function MainGroup({ calendarGroups }) {
  const [selectedColor, setSelectedColor] = useState(null); // 선택된 색상
  const [activeGroupId, setActiveGroupId] = useState(""); // 현재 선택된 그룹 ID
  const [selectedEvents, setSelectedEvents] = useState({}); // 그룹별 이벤트 데이터 저장

  // console.log('##################', calendarGroups);

  // calendarGroups가 변경될 때 상태 업데이트
  useEffect(() => {
    if (calendarGroups.length > 0) {
      setActiveGroupId(calendarGroups[0].id); // 초기 선택된 그룹 설정 (첫 번째 그룹)
    }
  }, [calendarGroups]);

  // activeGroupId가 변경될 때 이벤트 조회
  const { data: events, isLoading } = trpc.calendarEvents.getCalendarEventsByCalendarGroupId.useQuery(
    { calendar_group_id: activeGroupId },
    {
      enabled: !!activeGroupId,
    }
  );
  // 이벤트 데이터가 업데이트될 때 selectedEvents 상태를 업데이트
  useEffect(() => {
    if (events) {
      console.log("불러온 이벤트 데이터: ", events);
      setSelectedEvents((prev) => ({
        ...prev,
        [activeGroupId]: events,
      }));
    }
  }, [events, activeGroupId]);

  const handleGroupSelect = (group) => {
    setSelectedColor(group.color);
    setActiveGroupId(group.id);
  };

  // 아코디언 아이템 생성 함수
  const renderAccordionItems = () => {
    return calendarGroups.map((group) => {
      const isActive = group.color === selectedColor;
      const eventsForGroup = selectedEvents[group.id];

      return (
        <Accordion.Item key={group.id} value={group.name}>
          <Accordion.Control onClick={() => handleGroupSelect(group)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ColorSwatch
                color={group.color}
                style={{ color: isActive ? "#fff" : "none", cursor: "pointer" }}
              >
                {isActive && (
                  <CheckIcon style={{ width: rem(12), height: rem(12) }} />
                )}
              </ColorSwatch>
              <span>{group.name}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            {isLoading && activeGroupId === group.id ? (
              <p>로딩 중...</p>
            ) : eventsForGroup && eventsForGroup.length > 0 ? (
              eventsForGroup.map((event) => (
                <div key={event.id}>
                  {/* <strong>{event.title}</strong> */}
                  {/* <p>{event.description}</p> */}
                  <p>
                    {new Date(event.start_date).toLocaleDateString()} -{" "}
                    {new Date(event.end_date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>이벤트 없음</p>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      );
    });
  };

  return (
    <div className={styles.MainGroup}>
      <Accordion>{renderAccordionItems()}</Accordion>
    </div>
  );
}