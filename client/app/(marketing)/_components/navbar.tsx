"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import LogoutButton from "./logOutbtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorClosed, LogOut, LogOutIcon, PenBox, User } from "lucide-react";

export const Navbar = () => {
  const { isLoggedIn, user } = useUserStore((state) => state);
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-grey flex items-center ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Link
          href="/"
          className="text-[22px] font-extrabold border-b-4 tracking-tighter"
        >
          BlogMaster
        </Link>
        <div>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-12 h-12 font-semibold text-xl rounded-full"
                >
                  {user?.username.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem className="flex text-center gap-1">
                  <User size={15} />
                  my account
                </DropdownMenuItem>
                <hr />
                <DropdownMenuItem
                  className="flex text-center gap-1"
                  onClick={() => router.push("/create-post")}
                >
                  <PenBox size={15} />
                  Create post
                </DropdownMenuItem>
                <hr />
                <DropdownMenuItem className="flex text-center gap-1">
                  <LogOutIcon size={14} />
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="mr-2" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up for free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
