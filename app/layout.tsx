import type { Metadata } from "next";
import "./globals.css";
import {Notifications} from "@mantine/notifications";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from "@mantine/core";
import {theme} from "@/theme";
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <ColorSchemeScript defaultColorScheme={"dark"}/>
    </head>

    <body>
    <MantineProvider theme={theme}>
      <Notifications/>
      {children}
    </MantineProvider>
    </body>
    </html>
  );
}
