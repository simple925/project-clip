import { ColorSwatch, Group, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export function MyPageSearchBar() {
    return (
        <Group>
            <Input placeholder="검색어를 입력하세요." />
            <ColorSwatch w={30} h={30} color="lightblue"><IconSearch width={18} height={18}/></ColorSwatch>            
        </Group>
    );
}