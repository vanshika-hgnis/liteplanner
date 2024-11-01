import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import {Toaster} from "sonner"
import { ModalProvider } from "@/components/providers/modal-provider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "LitePlanner",
  description: "Notetaking Tool",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: light)",
        url: "/only-logo.svg",
        href: "/only-logo.svg"
      },
      {
        media:"(prefers-color-scheme: dark)",
        url: "/only-logo-dark.svg",
        href: "/only-logo-dark.svg"
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="bottom-center" />
            <ModalProvider/>
          <main>{children}</main>
          </ThemeProvider>
          </ConvexClientProvider>
      </body>
    </html>
  );
}
