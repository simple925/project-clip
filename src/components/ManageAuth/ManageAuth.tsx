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
  rem,
} from "@mantine/core";
import classes from "./ManageAuth.module.css";
import { IconCodePlus } from "@tabler/icons-react";

export function ManageAuth() {
  
  return (
    <Container my={40}>
      <Title ta="center" className={classes.title}>
        권한 관리
      </Title>
      <Grid style={{ width: "100%", height:"40%"}} justify="center">
        <Grid.Col span={4}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Text size="sm" style={{ height: "70%" }} mb={10}>
              권한 목록
            </Text>
            <Group className={classes.group}></Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Grid grow justify="flex-start" align="center" mb={10}>
              <Grid.Col span={2} style={{ minHeight: rem(10) }}>
                <Text size="sm">권한 추가</Text>
              </Grid.Col>
              <Grid.Col span={7} style={{ minHeight: rem(10) }}>
                <Input size="xs" placeholder="대상을 입력하세요." />
              </Grid.Col>
              <Grid.Col span="auto">
                <ActionIcon variant="filled">
                  <IconCodePlus style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
            <Group className={classes.group}></Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
