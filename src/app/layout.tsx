import { TRPCProvider,  } from "@/components/providers";
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import ReduxProvider from './reduxProvider'; // 실제 파일 경로에 맞게 수정

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
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </MantineProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}

export default (RootLayout);