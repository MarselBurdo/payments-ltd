import {ReactNode} from "react";
import type { Metadata } from "next";
import { Inter,  } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Payments Ltd",
  description: "Save payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
