"use client";
import {
  Paper,
  Title,
  Text,
  Container,
  Group,
  Grid,
  Input,
  ActionIcon,
  Checkbox,
  ScrollArea,
  Table,
} from "@mantine/core";
import classes from "./ManageAuth.module.css";
import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useListState } from "@mantine/hooks";

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
            <Text size="sm" mb={20}>
              권한 목록
            </Text>
            <Group className={classes.group}></Group>
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
            <Grid grow justify="flex-start" align="initial" mb={10}>
              <Grid.Col span={2}>
                <Text size="sm">권한 추가</Text>
              </Grid.Col>
              <Grid.Col span={7}>
                <Input size="xs" placeholder="대상을 입력하세요." />
              </Grid.Col>
              <Grid.Col span="auto">
                <ActionIcon variant="filled">
                  <IconUserPlus style={{ width: "60%", height: "60%" }} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
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
    </Container>
  );
}
