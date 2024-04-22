import React from "react";
import { AppShell, ColorSchemeScript, rem } from "@mantine/core";
import { MyPageNav } from "@/components/MyPageNav/MyPageNav";

export default function MyPageLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <AppShell withBorder={false} navbar={{ width: rem(350), breakpoint: 'sm' }}>
          {children}
        </AppShell>
      </body>

    </html>
  )

}