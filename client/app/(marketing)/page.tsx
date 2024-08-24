import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export default function Home() {
  return (
    <main className="pt-48 md:max-w-screen-2xl m-auto  flex flex-col justify-center overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex flex-row items-center border shadow-sm p-4 rounded-full bg-amber-100 text-amber-700 uppercase font-medium">
          Welcome to Tazmaheyot&apos;s Blog
        </div>
        <h1 className="max-w-3xl text-3xl md:text-7xl  text-neutral-800 mb-6 text-center">
          Taking control of your life is easy when you know how!
        </h1>
      </div>
      <div className="mt-10">
        <div className="text-xl  font-semibold">Featured post</div>
      </div>
    </main>
  );
}
