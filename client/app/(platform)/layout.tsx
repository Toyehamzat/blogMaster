import type { Metadata } from "next";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "platform ",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
