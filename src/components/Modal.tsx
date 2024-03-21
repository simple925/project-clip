"use client";
import { Button, ScrollArea, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import carouselHover from '@/components/Carousel.module.css';

export function Demo(props) {
  //   const [opened, { open, close }] = useDisclosure(false);
  const TRANSITION_DURATION = 50;
  const [data, setData] = useState(null);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  //한번만 호출
  useEffect(() => {
    fetch('http://localhost:9999/comments')
      .then(res => res.json())
      .then(data => {
            setData(data)
      })
    },[]);

  if (!data) return <p>No profile data</p>
  
  // console.log(data);
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
      transitionProps: { duration: TRANSITION_DURATION },
      children: (
        <>
          <Carousel loop getEmblaApi={setEmbla} size="md">           
          <Carousel.Slide>
            <img
              src="https://cataas.com/cat/angry"
              alt="Cat"
              style={{ width: rem(300), height: rem(200), objectFit: 'cover' }}
            />
          </Carousel.Slide>
          </Carousel>
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
