import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "login",
};

export default function loginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center py-36">
      {children}
    </div>
  );
}
