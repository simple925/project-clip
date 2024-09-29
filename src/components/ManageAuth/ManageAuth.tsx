"use client";
import cx from "clsx";
import {
  Paper,
  Title,
  Text,
  Container,
  Grid,
  ActionIcon,
  Checkbox,
  ScrollArea,
  Table,
  Stack,
  Button,
  Flex,
  Group,
  Divider,
  CloseButton,
  Modal,
  AutocompleteProps,
  Avatar,
  Autocomplete,
  Input,
  rem,
} from "@mantine/core";
import classes from "./ManageAuth.module.css";
import { IconCheck, IconRefresh, IconTablePlus, IconUserCheck, IconUserPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure, useListState } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { trpc } from "@/server/client";
import { IconPlus } from "@tabler/icons-react";

/**
 * @todo
 * 1. 권한 대상 클릭 시 대상이 갖고 있는 권한들의 체크 박스 활성화하는 로직 추가 필요
 * 2. 저장 클릭 시 DB Insert 또는 Update
 * 3. 초기화 버튼 추가 필요 - 로직 추가해야함
 * 4. 동일한 사용자 입력 시 --> 이미 존재함 alert
 */

export function ManageAuth() {
  /* 사용자 정보 */
  const usersData: Record<string, { image: string; email: string }> = {
    "Emily Johnson": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
      email: "emily92@gmail.com",
    },
    "Ava Rodriguez": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
      email: "ava_rose@gmail.com",
    },
    "Olivia Chen": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
      email: "livvy_globe@gmail.com",
    },
    "Ethan Barnes": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
      email: "ethan_explorer@gmail.com",
    },
    "Mason Taylor": {
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
      email: "mason_musician@gmail.com",
    },
  };
  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <Avatar src={usersData[option.value].image} size={36} radius="xl" />
      <div>
        <Text size="sm">{option.value}</Text>
        <Text size="xs" opacity={0.5}>
          {usersData[option.value].email}
        </Text>
      </div>
    </Group>
  );

  /* 대상 입력 값 */
  const [input, setInput] = useState({
    name: "",
    uuid: "",
  });

  /* 권한 대상 테이블에 신규 대상 추가 */
  function plusObject(props: any) {
    if (props.name === null || props.name === "") {
      alert("권한 대상을 입력하세요.");
    } else {
      const newInput = { name: props.name, uuid: props.uuid };
      setObj([newInput, ...obj]);
      setInput({ name: "", uuid: "" });
    }
  }
  
  /* 권한 대상 영역 */
  const [obj, setObj] = useState([
    { name: "김ㅇㅇ", uuid: "uuid1" },
    { name: "이ㅇㅇ", uuid: "uuid2" },
    { name: "박ㅇㅇ", uuid: "uuid3" },
    { name: "정ㅇㅇ", uuid: "uuid4" },
    { name: "배ㅇㅇ", uuid: "uuid5" },
    { name: "최ㅇㅇ", uuid: "uuid6" },
  ]);
  
  /* 권한 목록 영역 */
  const elements = [
    { key: 1, name: "권한1", checked: false },
    { key: 2, name: "권한2", checked: false },
    { key: 3, name: "권한3", checked: false },
    { key: 4, name: "권한4", checked: false },
    { key: 5, name: "권한5", checked: false },
    { key: 6, name: "권한6", checked: false },
    { key: 7, name: "권한7", checked: false },
    { key: 8, name: "권한8", checked: false },
  ];

  /* 권한 대상 삭제 */
  function removeObject(uuid: String) {
    const newObjList = obj.filter((item) => item.uuid !== uuid);
    setObj(newObjList);
  }

  /* 권한 대상 List  */
  const [activeObj, setActiveObj] = useState(0);

  const items = obj.map((item, index) => (
    <Grid
      grow
      key={item.uuid}
      className={cx(classes.link, {
        [classes.linkActive]: activeObj === index,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActiveObj(index);
      }}
    >
      <Grid.Col span={9}>{item.name}</Grid.Col>
      <Grid.Col span={1}>
        <CloseButton size={20} onClick={() => removeObject(item.uuid)} />
      </Grid.Col>
    </Grid>
  ));

  /* 권한 목록 List */
  // 체크박스 row 컨트롤
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // 체크박스 전체 선택 컨트롤
  const [values, handlers] = useListState(elements);
  const allChecked = selectedRows.length == values.length ? true : false;
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const rows = values.map((element) => (
    <Table.Tr
      key={element.name}
      bg={
        selectedRows.includes(element.key)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          checked={selectedRows.includes(element.key)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.key]
                : selectedRows.filter((key) => key !== element.key)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
    </Table.Tr>
  ));

  /* 권한관리 modal */
  const [authList, listHandler] = useListState([])
  
  // 권한 조회
  const selectAuthList = trpc.permission.managePermissions.useQuery()
  useEffect(() => {
    if (selectAuthList.data) {
      listHandler.setState(selectAuthList.data);
    }
  }, [selectAuthList.data])

  // 신규 입력 값 handle
  const [newAuth, setNewAuth] = useState({
    id: "",
    name: "",
    notes: ""
  })
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setNewAuth({
      ...newAuth,
      [name]: value
    })
  }

  // 신규 권한 추가
  const insertManageAuthMutation = trpc.permission.insertPermission.useMutation({
    onSettled: () => {
      selectAuthList.refetch()
    }
  })

  const insertManageAuthHandler = () => {
    insertManageAuthMutation.mutate(newAuth)
    setShowNewInput(false)
  }
  // 권한 추가 버튼 toggle
  const [showNewInput, setShowNewInput] = useState(false)
  const toggleAddBtn = () => {
    setShowNewInput(!showNewInput)
    setNewAuth({
      id: "",
      name: "",
      notes: ""
    })
  }

  const [opened, { open, close }] = useDisclosure(false);
  const modalRows = authList.map((list) => (
    <Table.Tr key={list.id}>
      <Table.Td>{list.name}</Table.Td>
      <Table.Td colSpan={3}>{list.notes}</Table.Td>
      <Table.Td>
        {/* Stack에 key 값 추가 필요 */}
        <Stack gap="xs">
          <ActionIcon variant="light" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="light" color="gray">
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container my={40}>
      <Group justify="center">
        <Title ta="center" className={classes.title}>
          사용자별 권한 관리
        </Title>
        <Flex></Flex>
        <Button variant="light" color="indigo" size="xs">
          <IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
          초기화
        </Button>
        <Grid style={{ width: "100%", height: "40%" }} justify="center">
          <Grid.Col span={4}>
            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              style={{ height: "90%" }}
            >
              <Group>
                <Text size="sm">권한 대상</Text>
              </Group>
              <Divider my="xs" />
              <ScrollArea
                className={classes.groupBorder}
                h={200}
                scrollbarSize={4}
              >
                <Stack style={{ gap: "inherit" }}>{items}</Stack>
              </ScrollArea>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              style={{ height: "90%" }}
            >
              <Group mt={-10}>
                <Text size="sm" mr={20}>
                  권한 추가
                </Text>
                <Autocomplete
                  data={[
                    "Emily Johnson",
                    "Ava Rodriguez",
                    "Olivia Chen",
                    "Ethan Barnes",
                    "Mason Taylor",
                  ]}
                  renderOption={renderAutocompleteOption}
                  size="xs"
                  w={250}
                  maxDropdownHeight={300}
                  placeholder="Search for employee"
                  value={input.name}
                  onChange={(name) => {
                    setInput({
                      name: name,
                      uuid: "aaaa",
                    });
                  }}
                />
                <ActionIcon
                  variant="filled"
                  onClick={() => {
                    plusObject(input);
                  }}
                >
                  <IconUserPlus style={{ width: "60%", height: "60%" }} />
                </ActionIcon>
              </Group>
              <Divider my="xs" />
              <ScrollArea
                className={classes.groupBorder}
                h={200}
                scrollbarSize={4}
              >
                <Table stickyHeader>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th w={20}>
                        <Checkbox
                          checked={allChecked}
                          indeterminate={indeterminate}
                          onChange={() =>
                            handlers.setState((current) => {
                              const check = current.map((value) => ({
                                ...value,
                                checked: !value.checked,
                              }));
                              allChecked
                                ? setSelectedRows([])
                                : setSelectedRows(check.map((v) => v.key));
                              return check;
                            })
                          }
                        />
                      </Table.Th>
                      <Table.Th>권한명</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </ScrollArea>
              <Button
                variant="light"
                color="red"
                size="xs"
                mt={7}
                justify="Flex-end"
                onClick={open}
              >
                <IconUserCheck
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
                권한 관리
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
        <Flex gap="md" direction="row" wrap="wrap" mt={15}>
          <Button variant="filled" radius="xl">
            저장
          </Button>
          <Button variant="filled" color="gray" radius="xl">
            취소
          </Button>
        </Flex>
      </Group>
      {/* 권한관리 모달 */}
      <Modal opened={opened} onClose={close} size="lg">
        <Container>
          <Title mb={15}>권한 관리</Title>
          {/* 권한 추가 버튼 */}
          <ActionIcon variant="light" color="black" onClick={toggleAddBtn}>
            <IconPlus />
          </ActionIcon>
          <Group>
            <Table className={classes.tableBorder}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>권한명</Table.Th>
                  <Table.Th colSpan={3}>권한내용</Table.Th>
                  <Table.Th>설정</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {showNewInput && 
                  <Table.Tr>
                    <Table.Td>
                      <Input placeholder="key값" name="id" value={newAuth.id} onChange={handleInputChange}></Input>
                      <Input placeholder="권한명을 입력하세요." name="name" value={newAuth.name} onChange={handleInputChange}></Input>
                    </Table.Td>
                    <Table.Td colSpan={3}>
                      <Input placeholder="권한 내용을 입력하세요." name="notes" value={newAuth.notes} onChange={handleInputChange}></Input>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap="xs">
                        {/* 신규 권한 insert */}
                        <ActionIcon variant="light" color="indigo" onClick={insertManageAuthHandler}>
                          <IconCheck style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </ActionIcon>
                        {/* 입력 취소 후 input hidden */}
                        <ActionIcon variant="light" color="red" onClick={() => setShowNewInput(false)}>
                          <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </ActionIcon>
                      </Stack>
                    </Table.Td>
                  </Table.Tr>
                }
                {modalRows}
              </Table.Tbody>
            </Table>
          </Group>
        </Container>
      </Modal>
    </Container>
  );
}
