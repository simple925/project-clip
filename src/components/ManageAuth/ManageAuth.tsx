"use client";
import cx from 'clsx';
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
  UnstyledButton,
  Stack,
  Button,
  Flex,
  Group,
  Divider,
} from "@mantine/core";
import classes from "./ManageAuth.module.css";
import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useListState } from "@mantine/hooks";

/**
 * @todo
 * 1. 권한 대상 추가 시 Insert 후 목록 상단에 추가한 대상 위치 하도록 로직 추가 필요
 * 2. 권한 대상 클릭 시 대상이 갖고 있는 권한들의 체크 박스 활성화하는 로직 추가 필요
 */

/** 권한 대상 영역 */
const obj = [
  { label: 'Usage', link: '#usage', order: 1 },
  { label: 'Position and placement', link: '#position', order: 1 },
  { label: 'With other overlays', link: '#overlays', order: 1 },
  { label: 'Manage focus', link: '#focus1', order: 1 },
  { label: 'Manage focus', link: '#focus2', order: 1 },
  { label: 'Manage focus', link: '#focus3', order: 1 },
];

const active = '#overlays';

/** 권한 목록 영역 */
const elements = [
  { key: 1, name: "Carbon", checked: false },
  { key: 2, name: "Nitrogen", checked: false },
  { key: 3, name: "Yttrium", checked: false },
  { key: 4, name: "Barium", checked: false },
  { key: 5, name: "aaaa", checked: false },
  { key: 6, name: "bbbb", checked: false },
  { key: 7, name: "bccc", checked: false },
  { key: 8, name: "dddddd", checked: false },
];

export function ManageAuth() {
  /** 권한 대상 List  */
  const [activeObj, setActiveObj] = useState(0)

  const items = obj.map((item, index) => (
    <UnstyledButton key={item.link}
      className={cx(classes.link, { [classes.linkActive]: activeObj === index })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
      onClick={(event) => {
        event.preventDefault()
        setActiveObj(index)
      }}>
      {item.label}
    </UnstyledButton>
  ));

  /** 권한 목록 List */
  // 체크박스 전체 선택 컨트롤
  const [values, handlers] = useListState(elements);
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  // 체크박스 row 컨트롤
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
                <Text size="sm">
                  권한 대상
                </Text>
              </Group>
              <Divider my="xs" />
              <ScrollArea
                className={classes.groupBorder}
                h={200}
                scrollbarSize={4}
              >
                <Stack style={{
                  transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
                  gap: 'inherit'
                }}>
                  {items}
                </Stack>

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
                <Text size="sm" mr={20}>권한 추가</Text>
                <Input size="xs" w="250" placeholder="대상을 입력하세요." />
                <ActionIcon variant="filled">
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
                      <Table.Th>
                        <Checkbox
                          checked={allChecked}
                          indeterminate={indeterminate}
                          label="전체 선택"
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
          <Button variant="filled" radius="xl">저장</Button>
          <Button variant="filled" color="gray" radius="xl">취소</Button>
        </Flex>
      </Group>
    </Container>
  );
}
