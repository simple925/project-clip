"use client";
// use client 사용해야 함

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MenuBar } from "@/components/MenuBar/MenuBar"

export default function MenuTestPage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
    {/* 테스트 페이지 */}
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      footer={{height: 120}}
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
      <AppShell.Footer><MenuBar ></MenuBar></AppShell.Footer>
    </AppShell>
    </>
  );
}