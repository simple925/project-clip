import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import ReduxProvider from "../components/Provider/reduxProvider";
import { Provider } from "../components/Provider/trcProvider";
import './global.css'

export const metadata = {
  title: 'clip',
  description: '모두 도망쳐',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=yes"
        />
      </head>
      <body>
        <ReduxProvider>
          <Provider>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}