'use client';
import { AppShell, rem } from "@mantine/core";

import { MyPageNav } from "@/components/MyPageNav/MyPageNav";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import MyVacationPage from "./Vacation/page";
import { Component } from "react";

export default function MyPages(props: any) {
  return (
    <>
      <AppShell.Navbar>
        <MyPageNav id={1} />
      </AppShell.Navbar>
      <AppShell.Main>
        <MyPageSearchBar mt={20} />
        {/* <Component {...props.pagesProps} /> */}
        <MyVacationPage />
      </AppShell.Main>
    </>
  );
}