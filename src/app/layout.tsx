import { TRPCProvider,  } from "@/components/providers";
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import './global.css'

function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=yes"
        />
      </head>
      <body>
        <TRPCProvider>
        <MantineProvider theme={theme}>
          {children}
          </MantineProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}

export default (RootLayout);