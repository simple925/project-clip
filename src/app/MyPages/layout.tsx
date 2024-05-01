'use client';
import React from "react";
import { AppShell, Stack, rem } from "@mantine/core";
import { MyPageNav } from "@/components/MyPageNav/MyPageNav";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { MenuBar } from "@/components/MenuBar/MenuBar"

export default function MyPageLayout({ children }: { children: any }) {
  return (
    <>
      <AppShell withBorder={false} navbar={{ width: rem(350), breakpoint: 'sm' }} footer={{height: 90}} >
        <AppShell.Header>
          <Stack align="flex-end">
            <MyPageSearchBar mt={20} mr={20} />
          </Stack>
        </AppShell.Header>
        <AppShell.Navbar>
          <MyPageNav id={1} />
        </AppShell.Navbar>
        <AppShell.Main>
          {children}
        </AppShell.Main>
        <AppShell.Footer><MenuBar ></MenuBar></AppShell.Footer>
      </AppShell>
    </>
  )

}