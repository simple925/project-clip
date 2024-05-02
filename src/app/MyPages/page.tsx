'use client'
// 뼈대
import { Container, Title, Grid, Skeleton, rem,
    ThemeIcon, Progress, Text, Group, Badge, Paper
 } from '@mantine/core';
// 목록 구현을 위한 import
import cx from 'clsx';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DndListStyle from './DndList.module.css';
// 현황 태그 import
import { IconSwimming, IconBeach } from '@tabler/icons-react';
import StatsCardStyle from './StatsCard.module.css';
export default function MyPages() {
    const PRIMARY_COL_HEIGHT = rem(300);
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`
    /* 데이터 */
    const data = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' , loading: false},
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen', loading: false },
        { position: 39, mass: 88.906, symbol: 'M', name: 'Yttrium', loading: true },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium', loading: true },
        { position: 58, mass: 140.12, symbol: 'A', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'B', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'F', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'G', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'D', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'W', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'Q', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'E', name: 'Cerium', loading: true },
        { position: 58, mass: 140.12, symbol: 'Y', name: 'Cerium', loading: true },
    ];
    /* 데이터 만큼 목록 태그 생성*/
    const [state, handlers] = useListState(data);
    const items = state.map((item, index) => (
        <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
                {(provided: any, snapshot: any) =>
                    (
                        <div
                        className={cx(DndListStyle.item, { [DndListStyle.itemDragging]: snapshot.isDragging })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        >
                        <Text className={DndListStyle.symbol}>{item.symbol}</Text>

                            <div>
                                <Text>{item.name}</Text>
                                <Text c="dimmed" size="sm">
                                    Position: {item.position} • Mass: {item.mass}
                                </Text>
                            </div>
                        </div>
                    )
                }
            </Draggable>
    ));
    const totalVacationDays = 15
    const usedVacationDays = 5
    const remainingVacationDays = totalVacationDays - usedVacationDays
    const emainingVacationPercentage = Number((remainingVacationDays / totalVacationDays * 100).toFixed(0))
return (
    <Container my="md">
        <Title ta="center" mt={100}> 부탁해 홈즈 </Title>
            <Grid gutter="md">
                <Grid.Col span={4}>
                    {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
                    <Paper radius="md" withBorder className={StatsCardStyle.card} mt={20}>
                    <ThemeIcon className={StatsCardStyle.icon} size={60} radius={60}>
                        <IconBeach style={{ width: rem(32), height: rem(32) }} stroke={1.5} />
                    </ThemeIcon>

                    <Text ta="center" fw={700} className={StatsCardStyle.title}>
                        남은 휴가 {remainingVacationDays > 10 ? '😁' :'😭'}
                    </Text>

                    <Group justify="space-between" mt="xs">
                        {/* <Text fz="sm" c="dimmed">
                        잔여휴가
                        </Text> */}
                        <Text fz="sm" c="dimmed">
                        {emainingVacationPercentage}%
                        </Text>
                    </Group>

                    <Progress value={emainingVacationPercentage} mt={5} />

                    <Group justify="space-between" mt="md">
                        <Text fz="sm">{remainingVacationDays} / {totalVacationDays}</Text>
                        <Badge color='red' size="sm">{usedVacationDays} day</Badge>
                    </Group>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col>
                    <DragDropContext
                        onDragEnd={({ destination, source }: any) =>
                            handlers.reorder({ from: source.index, to: destination?.index || 0 })
                        }
                    >
                        <Droppable droppableId="dnd-list" direction="vertical">
                            {(provided: any) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {items}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Grid.Col>
            </Grid>
    </Container>
)

}