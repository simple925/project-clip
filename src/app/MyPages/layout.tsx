'use client';
import React, { useState } from "react";
import { AppShell, Stack, rem } from "@mantine/core";
import { MyPageNav } from "@/components/MyPageNav/MyPageNav";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { MenuBar } from "@/components/MenuBar/MenuBar"
import { Modal } from "@/components/Modal/Modal";

export default function MyPageLayout({ children }: { children: any }) {
  const [clickState, setClickState] = useState(false);
  const handleValue = (newValue: any) => {
    setClickState(newValue);
  }
  return (
    <>
      <AppShell withBorder={false} navbar={{ width: rem(350), breakpoint: 'sm' }} footer={{height: 90}} >
        <AppShell.Header>
          {/* <Stack align="flex-end">
            <MyPageSearchBar />
          </Stack> */}
        </AppShell.Header>
        <AppShell.Navbar>
          <MyPageNav id={1} />
        </AppShell.Navbar>
        <AppShell.Main>
          {children}
        </AppShell.Main>
        <AppShell.Footer><MenuBar onValue={handleValue}></MenuBar><Modal id={"sdfs"} clickState={clickState}></Modal></AppShell.Footer>
      </AppShell>
    </>
  )

}