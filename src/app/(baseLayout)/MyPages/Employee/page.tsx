"use client";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { Container, Grid, Textarea, Title } from "@mantine/core";
import { Accordion, Avatar, Button, TextInput, Text, Group, ActionIcon, rem, Stack, Modal, Mark, Select } from '@mantine/core';
import { IconPhoneCall, IconAt, IconTrash, IconPencil } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './UserInfoIcons.module.css';

export default function VacationPage() {
const [opened, { open, close }] = useDisclosure(false);

{/* 유저정보 */}
const userInfoList =[
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    role: 'Collaborator',
    lastActive: '2 days ago',
    active: true,
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    role: 'Collaborator',
    lastActive: '6 days ago',
    active: true,
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    role: 'Contractor',
    lastActive: '2 days ago',
    active: false,
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    role: 'Contractor',
    lastActive: '5 days ago',
    active: true,
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    role: 'Manager',
    lastActive: '3 days ago',
    active: false,
  },
  {
    id: '6',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    role: 'Collaborator',
    lastActive: '2 days ago',
    active: true,
  },
  {
    id: '7',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    role: 'Collaborator',
    lastActive: '6 days ago',
    active: true,
  },
  {
    id: '8',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    role: 'Contractor',
    lastActive: '2 days ago',
    active: false,
  },
  {
    id: '9',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    role: 'Contractor',
    lastActive: '5 days ago',
    active: true,
  },
  {
    id: '10',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    role: 'Manager',
    lastActive: '3 days ago',
    active: false,
  },
];

// 삭제 이벤트
const deleteClick = () => {
  if(window.confirm("회원정보를 삭제하시겠습니까?")){
    console.log("OK");
  } else {
    console.log("NO");
  }
}

  {/* 아코디언설정 */}
 const items = userInfoList.map((item) => (
    <>
    <Grid>
    {/* 아코디언 부분 */}
    <Grid.Col span={11}>  
    <Accordion.Item value={item.id} key={item.id}>
      <Accordion.Control>
        <Group wrap="nowrap">
          <Avatar
          src={item.avatar}
          size={50}
          radius="md"
          />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {item.job}
            </Text>
            <Text fz="lg" fw={500} className={classes.name}>
              {item.name}
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
              {item.role}
            </Text>
          </Group>
      </Accordion.Panel>
    </Accordion.Item>
    </Grid.Col>
    {/* 수정, 삭제 버튼 */}
    <Grid.Col span={1}>
    <Stack key={item.id} gap="xs">
         <ActionIcon variant="light" color="gray" onClick={open}>
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
    <Container>
      <Title c="dimmed" mt={50} fw={700} className="title">
        사원관리
      </Title>
      <MyPageSearchBar/>
      {/*
      <Text ta="left" mt={20} fw={700}>
        사원리스트
      </Text>
      */}
      <MyContent userInfo={items} />

      {/*수정하는 Modal 수정중*/}
      <Modal opened={opened} withCloseButton onClose={close} size="sm" size="h4" title="사원정보 수정" centered>
        <Title c="dimmed" size="xs" mb="xs" fw={500}>
          사원정보를 수정하고 <Mark color="gray">'저장'</Mark> 버튼을 누르세요.
        </Title>
        <Stack gap="sm">
          <TextInput label="이름" style={{ flex: 1 }} />
          <Select
            label="직급"
            placeholder="직급을 선택하세요"
            data={['사원', '대리', '과장', '차장']}
          />
          <TextInput label="이메일" style={{ flex: 1 }} />
          <TextInput label="연락망" style={{ flex: 1 }} />
          <Button onClick={close}>저장</Button>
        </Stack>
      </Modal>
    </Container>
    
  );
}
