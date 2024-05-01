"use client";
import '@mantine/carousel/styles.css';
import carouselCss from './Carousel.module.css';
import { Button, ScrollArea, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function Modal(props: {id:  string }) {
  //   const [opened, { open, close }] = useDisclosure(false);
  const TRANSITION_DURATION = 50;
  const [data, setData] = useState<any>(null);
  const [embla, setEmbla] = useState<any | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  //한번만 호출
  useEffect(() => {
    fetch('http://localhost:9999/comments')
      .then(res => res.json())
      .then(data => {
            setData(data)
      });
    },[]);

  if (!data) return <p>No profile data</p>

  const openModal = () => {
    console.log("dddd")
  
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
            data.map((d: any,i: number) => {
              return <>
                <Carousel.Slide key={i}>
                <ScrollArea h={300}>
                  <p style={{fontWeight: "bold"}}>{d.title}</p>
                  {d.content}  리자몽 (포켓몬) Bulbapedia의 리자몽 설명 리자몽은 용감한 이족보행
                  포켓몬입니다. 주로 주황색이며 가슴부터 꼬리 끝까지 아래쪽에 크림색이
                  있습니다. 긴 목, 작은 파란 눈, 약간 올라간 콧구멍, 직사각형 머리
                  뒤쪽에 두 개의 뿔 같은 구조물이 튀어나와 있습니다. 입을 닫았을 때
                  점으로 나누어집니다. 각 날개 팔의 세 번째 관절은 발톱 모양의
                  스파이크로 장식되어 있습니다. 메가리자몽X는 입가에서 푸른 불꽃을
                  내뿜고, 꼬리의 불꽃도 푸른색으로 타오른다. 새로운 힘으로 인해 몸이
                  검게 변하고, 더욱 강렬한 불길을 일으킨다고 합니다.
                  검게 변하고, 더욱 강렬한 불길을 일으킨다고 합니다.
                  리자몽 (포켓몬) Bulbapedia의 리자몽 설명 리자몽은 용감한 이족보행
                  포켓몬입니다. 주로 주황색이며 가슴부터 꼬리 끝까지 아래쪽에 크림색이
                  있습니다. 긴 목, 작은 파란 눈, 약간 올라간 콧구멍, 직사각형 머리
                  뒤쪽에 두 개의 뿔 같은 구조물이 튀어나와 있습니다. 입을 닫았을 때
                  점으로 나누어집니다. 각 날개 팔의 세 번째 관절은 발톱 모양의
                  스파이크로 장식되어 있습니다. 메가리자몽X는 입가에서 푸른 불꽃을
                  내뿜고, 꼬리의 불꽃도 푸른색으로 타오른다. 새로운 힘으로 인해 몸이
                  검게 변하고, 더욱 강렬한 불길을 일으킨다고 합니다.
                  검게 변하고, 더욱 강렬한 불길을 일으킨다고 합니다.
                </ScrollArea>
                </Carousel.Slide>
              </>
            })}
          </Carousel>
          <Button fullWidth onClick={() => modals.closeAll()} mt="md">
            확인
          </Button>
        </>
      ),
    });
  }
  openModal();
  return (
    <></>
  );
}
