import type { Metadata } from "next";
import "./globals.css";
import {Notifications} from "@mantine/notifications";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from "@mantine/core";
import {theme} from "@/theme";
import '@mantine/core/styles.css';
import {NavBar} from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Cookcraft",
  description: "A recipe generator platform",
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
      <NavBar/>
      {children}
    </MantineProvider>
    </body>
    </html>
  );
}
