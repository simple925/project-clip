"use client";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { Container, Flex, Grid, Textarea, Title } from "@mantine/core";
import { Accordion, Avatar, Button, TextInput, Text, Group, ActionIcon, rem, Stack, Modal, Mark, Select } from '@mantine/core';
import { IconPhoneCall, IconAt, IconTrash, IconPencil, IconUserPlus, IconHome } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './UserInfoIcons.module.css';
// import { trpc } from '@/server/client';
import { trpc } from '@/server/client';
import { MemberModal } from "@/components/MemberModal/MemberModal";
import { useState } from "react";

export default function VacationPage() {

  const [data, setData] = useState('');
 
  const [opened, { open, close }] = useDisclosure(false);
  // accounts select

{/* 유저정보 */}


// 삭제 이벤트
const deleteClick = () => {
  if(window.confirm("회원정보를 삭제하시겠습니까?")){
    console.log("OK");
  } else {
    console.log("NO");
  }
}

const memberList = trpc.members.list.useQuery({});
console.log(memberList);

let userInfoList = [];

if(memberList.data != null){
  userInfoList = memberList.data.members;
}

  {/* 아코디언설정 */}
 const items = userInfoList.map((item, i) => (
    <>
    <Grid>
    {/* 아코디언 부분 */}
    <Grid.Col span={11} key={item.i}>  
    <Accordion.Item value={item.id} key={item.i}>
      <Accordion.Control>
        <Group wrap="nowrap">
          <Avatar
          src={item.avatar}
          size={50}
          radius="md"
          />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {item.position}
            </Text>
            <Text fz="lg" fw={500} className={classes.name}>
              {item.name==null?'no name':item.name} ({item.id})
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="s" c="dimmed">
              {item.email}
            </Text>
        </Group>
        <Group wrap="nowrap" gap={10} mt={5}>
          <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
          <Text fz="s" c="dimmed">
            {item.contact_number}
          </Text>
        </Group>
        <Group wrap="nowrap" gap={10} mt={5}>
          <IconHome  stroke={1.5} size="1rem" className={classes.icon} />
          <Text fz="s" c="dimmed">
            {item.address}
          </Text>
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
    </Grid.Col>
    {/* 수정, 삭제 버튼 */}
    <Grid.Col span={1}>
    <Stack key={item.id} gap="xs">
         <ActionIcon variant="light" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="light" color="gray" onClick={deleteClick}> 
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
    </Stack> 
    </Grid.Col>
    </Grid>
  </>
  ));

  return (
    <div style={{width: "660px", marginLeft:"100px"}}>
      <Title c="dimmed" mt={50} fw={700} className="t66itle">
        사원관리
      </Title>
      
      
      <Group justify="space-between">
        <MyPageSearchBar/>
        {/* 신규등록버튼 */}
        <Button mt={40} p={5} onClick={open}><IconUserPlus/></Button>
      </Group>

      {/*
      <Text ta="left" mt={20} fw={700}>
        사원리스트
      </Text>
      */}
      <MyContent userInfo={items} />
      
      {/*수정하는 Modal*/}
      <MemberModal opened={opened} close={close} ></MemberModal>
    </div>
  );
}
