'use client';
import { AppShell, rem } from "@mantine/core";
// import classes from './MyPages.module.css';

import { MyPageNav } from "@/components/MyPageNav/MyPageNav";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { ManageAuth } from "@/components/ManageAuth/ManageAuth";
import MyPagesDetail from "./[link]/page";

export default function MyPages(props: any) {
  
  return (
    <AppShell withBorder={false} navbar={{ width: rem(350), breakpoint: 'sm' }}>
      <AppShell.Navbar>
        <MyPageNav id={props.id} />
      </AppShell.Navbar>
      <AppShell.Main>
        <MyPagesDetail />
      </AppShell.Main>
    </AppShell>
  );
}