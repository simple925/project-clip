"use client";
import cx from "clsx";
import {
  Paper,
  Title,
  Text,
  Container,
  Grid,
  Input,
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
} from "@mantine/core";
import classes from "./ManageAuth.module.css";
import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useListState } from "@mantine/hooks";

/**
 * @todo
 * 1. 권한 대상 클릭 시 대상이 갖고 있는 권한들의 체크 박스 활성화하는 로직 추가 필요
 * 2. 저장 클릭 시 DB Insert 또는 Update
 * 3. 초기화 버튼 추가 필요 (변경 사항 모두 reset)
 * 4. 권한 대상 삭제 버튼 필요(삭제 후 grid 자체를 지워야함 + 연속으로 삭제 가능하도록 해야함)
 * 5. 현재 페이지는 사용자 권한 관리 페이지이므로 권한만 따로 관리하는 팝업(화면) 필요
 */

export function ManageAuth() {
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
      setInput({
        name: "",
        uuid: "",
      });
    }
  }

  /* 권한 대상 삭제 */
  function removeObject(props: any) {
    console.log(props);
    const newObjList = [
      {
        name: input.name,
        uuid: input.uuid,
      },
    ];
    obj.forEach((item) => {
      if (item.uuid !== props.uuid) {
        newObjList.push(item);
      }
    });
    setObj(newObjList);
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
        <CloseButton size={20} onClick={() => removeObject(item)} />
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

  return (
    <Container my={40}>
      <Group justify="center">
        <Title ta="center" className={classes.title}>
          권한 관리
        </Title>
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
                <Input
                  size="xs"
                  w="250"
                  placeholder="대상을 입력하세요."
                  value={input.name}
                  onChange={(event) => {
                    event.preventDefault();
                    setInput({
                      name: event.currentTarget.value,
                      uuid: "#plus",
                      // link --> 사용자uuid로 추후 변경 필요
                    });
                  }}
                />
                <ActionIcon variant="filled" onClick={() => plusObject(input)}>
                  <IconUserPlus style={{ width: "60%", height: "60%" }} />
                </ActionIcon>
              </Group>
              <Divider my="xs" />
              <ScrollArea
                className={classes.groupBorder}
                h={200}
                scrollbarSize={4}
              >
                <Table>
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
                              // onChange() 종료 이후에 allChecked 값이 변경됨
                              // console.log("allChecked >> ", allChecked)
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
    </Container>
  );
}
