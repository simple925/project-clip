'use client';
import { AppShell, rem } from "@mantine/core";
// import classes from './MyPages.module.css';

import { MyPageNav } from "@/components/MyPageNav/MyPageNav";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";

export default function MyPages(props) {
  return (
    <AppShell withBorder={false} navbar={{ width: rem(350), breakpoint: 'sm' }}>
      <AppShell.Navbar>
        <MyPageNav id={props.params.id} />
      </AppShell.Navbar>
      <AppShell.Main>
        <MyPageSearchBar mt={20} />
        <MyContent />
      </AppShell.Main>
    </AppShell>
  );
}