'use client';
import { AppShell } from "@mantine/core";
// import classes from './MyPages.module.css';

import { MyPageNav } from "@/components/MyPageNav/MyPageNav";
import { MyContent } from "@/components/MyContent/MyContent";

 export default function MyPages() {
    return (
      <AppShell withBorder={false} navbar={{ width: 350, breakpoint: 'sm' }}>
        <AppShell.Navbar>
          <MyPageNav />
        </AppShell.Navbar>
        <AppShell.Main>
          <MyContent />
        </AppShell.Main>
      </AppShell>
      );
 }