"use client";
import '@mantine/carousel/styles.css';
import carouselCss from './Carousel.module.css';
import { Button, ScrollArea, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
  //한번만 호출
  // useEffect(() => {
  //   fetch('http://localhost:9999/comments')
  //     .then(res => res.json())
  //     .then(data => {
  //           setData(data)
  //     });
  //   },[]);
    const data = [
    {
      "id": 1,
      "title": "첫번째 알림의 제목입니다",
      "content": "첫번째 내용......",
      "postId": 1
    },
    {
      "id": 2,
      "title": "두번째 알림의 제목입니다",
      "content": "두번째 내용......",
      "postId": 2
    },
    {
      "id": 3,
      "title": "세번째 알림의 제목입니다",
      "content": "세번째 내용......",
      "postId": 3
    },
    {
      "id": 4,
      "title": "네번째 알림의 제목입니다",
      "content": "네번째 내용......",
      "postId": 4
    },
    {
      "id": 5,
      "title": "다섯번째 알림의 제목입니다",
      "content": "다섯번째 내용......",
      "postId": 5
    }
  ]
  // if (!data) return <p>No profile data</p>

  const openModal = (data: any) => {
    modals.open({
      title: (
        <>
          <IconBell />
          <span style={{ fontWeight: "bold", padding: "10px" }}>
            {props.id+"님의 알림"}
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
