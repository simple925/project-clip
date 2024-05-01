"use client";
import React from "react";
import { AppShell, Stack, rem } from "@mantine/core";
import { MenuBar } from "@/components/MenuBar/MenuBar";
import { MainCalendarHeader } from "@/components/MainCalendarHeader/MainCalendarHeader";
import MainCalendarSideNav from "@/components/MainCalendarSideNav/MainCalendarSideNav";
export default function MyPageLayout({ children }: { children: any }) {
  return (
    <>
      <AppShell
        header={{ height: 85 }}
        withBorder={false}
        navbar={{ width: rem(350), breakpoint: "sm" }}
        footer={{ height: 120 }}
      >
        {/* zIndex의 수치를 Header에 더 높이 주어서, 자연스럽게 출력되게끔 조정 */}
        <AppShell.Header zIndex={300}>
          <MainCalendarHeader />
        </AppShell.Header>
        <AppShell.Navbar zIndex={100} p="md">
          <MainCalendarSideNav />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
        <AppShell.Footer bg="orange.1">
          <MenuBar></MenuBar>
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
