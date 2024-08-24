import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "platform ",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full md:max-w-screen-2xl mx-auto pt-20 pb-2">
      {children}
    </div>
  );
}
