import type { Metadata } from "next";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

export const metadata: Metadata = {
  title: "BlogMaster ",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="h-full pb-2 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
}
