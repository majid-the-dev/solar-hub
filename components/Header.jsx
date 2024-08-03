"use client";

import Image from "next/image";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import AuthModal from "./AuthModal";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const { data: session, status, update } = useSession();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between gap-4 px-5 py-4">
          <p className="text-xs font-light whitespace-nowrap">
            Need more info? Call 07071793075
          </p>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={"/cart"}
              className="text-xs font-light hover:text-darkGreen hover:font-medium"
            >
              Cart
            </Link>
            <span className="text-[13px] font-light">|</span>
            <Link
              href={"/"}
              className="text-xs font-light hover:text-darkGreen hover:font-medium"
            >
              Orders
            </Link>
            <span className="text-[13px] font-light">|</span>
            {status === "authenticated" ? (
              <Link
                href={"/account"}
                className="text-xs font-light hover:text-darkGreen hover:font-medium"
              >
                Account
              </Link>
            ) : (
              <button onClick={() => setModal(true)} className='text-xs font-light hover:text-darkGreen hover:font-medium'>Account</button>
            )}
          </div>
          {status === "authenticated" ? (
            <Link href={"/account"} className="block md:hidden text-darkGreen">
              <IoPerson />
            </Link>
          ) : (
            <button onClick={() => setModal(true)} className="block md:hidden text-darkGreen">
              <IoPerson />
            </button>
          )}
        </div>
      </div>
      {modal && <AuthModal modal={modal} setModal={setModal} />}
    </>
  );
};

export default Header;
