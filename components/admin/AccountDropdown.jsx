"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoTriangleDown } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AccountDropdown = () => {
  const { data: session, status, update } = useSession();
  const { user } = session || {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
        <div className="flex items-center justify-center bg-black text-white text-[10px] font-medium h-8 w-8 rounded-full border-[1.5px] border-default">
          {user?.fullName[0]}
          {user?.fullName[1]}
        </div>
        <span className="text-[14px]">
          <GoTriangleDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-6">
        <DropdownMenuItem>
          <Link href={"/admin/admins"} className="flex items-center gap-2.5 text-xs">
            <span className="">
              <IoSettingsOutline />
            </span>
            Admins
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2.5 text-xs">
          <span className="rotate-180">
            <FiLogOut />
          </span>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
