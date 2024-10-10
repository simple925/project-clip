"use client";
import '@mantine/carousel/styles.css';
import carouselCss from './Carousel.module.css';
import { Button, ScrollArea, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { trpc } from '@/server/client';

export function Modal(props: {id:  string , clickState: boolean}) {
  //   const [opened, { open, close }] = useDisclosure(false);
  const TRANSITION_DURATION = 50;
  // const [data, setData] = useState<any>(null);
  const [embla, setEmbla] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // props로 전달된 clickState 값을 isOpen 상태에 설정
    setIsOpen(props.clickState);
  }, [props.clickState]); // props.clickState 값이 변경될 때마다 실행

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  // 공지사항 조회
  const notice = trpc.notifications.getNotificationAll.useQuery();
  const data = notice.data

  const openModal = (data: any) => {
    modals.open({
      title: (
        <>
          <IconBell />
          <span style={{ fontWeight: "bold", padding: "10px" }}>
            New 알림
          </span>
        </>
      ),
      size: 500,
      centered: true,
      transitionProps: { duration: TRANSITION_DURATION },
      children: (
        <>
          <Carousel loop getEmblaApi={setEmbla} maw={500} classNames={carouselCss}>
          {
            data.map((d: any) => {
              return (
                  <Carousel.Slide key={d.id}>
                    <ScrollArea h={300}>
                      <p style={{fontWeight: "bold"}}>{d.title}</p>
                      {d.content}
                    </ScrollArea>
                  </Carousel.Slide>
                )
            })
          }
          </Carousel>
          <Button fullWidth onClick={() => modals.closeAll()} mt="md">
            확인
          </Button>
        </>
      ),
    });
  }
  // openModal();
  useEffect(()=>{
    if(isOpen){
        openModal(data);
    }
  })
  return (
    <></>
  );
}
