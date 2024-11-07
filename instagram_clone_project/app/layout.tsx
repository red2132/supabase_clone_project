import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "config/material-tailwind-theme-provider";
import ReactQueryClientProvider from "config/ReactQueryClientProvider";
import RecoilProvider from "config/RecoilProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "instagram clone project",
  description: "인스타그램 클론 프로젝트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <RecoilProvider>
        <ThemeProvider>
          <ReactQueryClientProvider>
            <body className={inter.className}>
              {children}
            </body>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </RecoilProvider>
    </html>
  );
}
