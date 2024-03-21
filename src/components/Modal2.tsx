"use client";
import { Button, ScrollArea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Carousel } from '@mantine/carousel';
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import carouselHover from '@/components/Carousel.module.css';

export function Demo(props) {
  //   const [opened, { open, close }] = useDisclosure(false);

  const [data, setData] = useState(null);
  
  //한번만 호출
  useEffect(() => {
    fetch('http://localhost:9999/comments')
      .then(res => res.json())
      .then(data => {
            setData(data)
      })
    },[]);

  if (!data) return <p>No profile data</p>
  
  console.log(data);
  const openModal = () =>
    modals.open({
      title: (
        <>
          <IconBell />
          <span style={{ fontWeight: "bold", padding: "10px" }}>
            {props.id+"님의 알림"}
          </span>
        </>
      ),
      size: "md",
      centered: true,
      children: (
        <>
          <ScrollArea h={300}>
            <Carousel>
              <Carousel.Slide>
            <img
              src="https://cataas.com/cat"
              alt="Cat"
              style={{ width: rem(300), height: rem(200), objectFit: 'cover' }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://cataas.com/cat/cute"
              alt="Cat"
              style={{ width: rem(300), height: rem(200), objectFit: 'cover' }}
            />
            </Carousel>
            <p style={{fontWeight: "bold"}}>{data[1].body}</p>
            {data[0].body} 리자몽 (포켓몬) Bulbapedia의 리자몽 설명 리자몽은 용감한 이족보행
            포켓몬입니다. 주로 주황색이며 가슴부터 꼬리 끝까지 아래쪽에 크림색이
            있습니다. 긴 목, 작은 파란 눈, 약간 올라간 콧구멍, 직사각형 머리
            뒤쪽에 두 개의 뿔 같은 구조물이 튀어나와 있습니다. 입을 닫았을 때
            위턱에 두 개의 송곳니가 보입니다. 밑면이 청록색인 두 개의 큰 날개가
            등에서 돋아나고, 각 날개의 세 번째 마디 꼭대기에서 뿔 같은 부속물이
            튀어나옵니다. 각 날개 막의 중앙을 통해 단일 날개 손가락이 보입니다.
            리자몽의 팔은 탄탄한 배에 비해 짧고 가늘며, 각 팔다리에는 세 개의
            흰색 발톱이 있습니다. 땅딸막한 다리와 각 식물 발에 크림색 밑창이
            있습니다. 길고 가늘어지는 꼬리 끝은 상당한 불꽃으로 타오릅니다. Mega
            Charizard X로서 팔은 여전히 ​​가늘지만 몸과 다리는 신체적으로 더
            건강합니다. 피부는 검게 변하고 밑면과 밑창은 하늘색이다. 끝이
            파란색인 스파이크 2개는 각 어깨의 앞뒤에서 위쪽으로 휘어지고, 뿔
            끝은 뾰족해지며 파란색으로 바뀌며 약간 위쪽으로 휘어집니다. 눈썹과
            발톱이 더 크고 눈은 이제 빨갛습니다. 각 뿔 아래에 두 개의 작은
            지느러미 모양의 스파이크가 있고 아래쪽 목 아래에 두 개가 더
            있습니다. 날개 막에서 손가락이 사라지고 아래쪽 가장자리가 크고 둥근
            점으로 나누어집니다. 각 날개 팔의 세 번째 관절은 발톱 모양의
            스파이크로 장식되어 있습니다. 메가리자몽X는 입가에서 푸른 불꽃을
            내뿜고, 꼬리의 불꽃도 푸른색으로 타오른다. 새로운 힘으로 인해 몸이
            검게 변하고, 더욱 강렬한 불길을 일으킨다고 합니다.
          </ScrollArea>
          <Button fullWidth onClick={() => modals.closeAll()} mt="md">
            확인
          </Button>
        </>
      ),
    });
  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
    </>
  );
}
