import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

// const headingFont = localFont({
//   src: "../../public/fonts/font.woff2",
// });

// const textFont = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export default function Home() {
  return (
    <main className="md:max-w-screen-2xl m-auto relative flex flex-col justify-center overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-center flex-col relative z-10"
          //   headingFont.className
        )}
      >
        <div className="mb-4 flex flex-row items-center border shadow-sm p-4 rounded-full bg-amber-100 text-amber-700 uppercase font-semibold">
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
