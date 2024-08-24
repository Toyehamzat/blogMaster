import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import { Provider } from "@/provider";
export const metadata: Metadata = {
  title: "BlogMaster",
  description: "blog",
};

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={textFont.className}>
          {children}
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
