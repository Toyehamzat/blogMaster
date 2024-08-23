import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BlogMaster",
  description: "blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children} <Toaster />
      </body>
    </html>
  );
}
