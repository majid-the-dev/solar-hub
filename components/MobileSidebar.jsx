"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import MobileCategoryItem from "./MobileCategoryItem";

const MobileSidebar = ({ categories }) => {
  const [sidebar, setSidebar] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const openSidebar = () => {
    setAnimationClass("animate__animated animate__fadeInLeft");
    setSidebar(true);
  };

  const closeSidebar = () => {
    setAnimationClass("animate__animated animate__fadeOutLeft");
    setTimeout(() => {
      setSidebar(false);
    }, 650);
  };

  return (
    <div className="block md:hidden">
      <button onClick={openSidebar} className="text-darkGreen text-xl">
        <CgMenuLeft />
      </button>

      {sidebar && (
        <div
          onClick={closeSidebar}
          className="bg-dark/90 fixed inset-0 z-[99999]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-white w-2/3 h-full p-4 overflow-y-scroll ${animationClass}`}
          >
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 text-xl"
            >
              <IoClose />
            </button>
            {/* <Image src={'/assets/solarhub-icon.png'} alt="logo" height={30} width={30} /> */}
            <div className="flex flex-col mt-7">
              <Link
                href={"/"}
                className="text-sm w-full font-normal border-b border-black/10 py-5"
              >
                Home
              </Link>
              <Link
                href={"/about-us"}
                className="text-sm w-full font-normal border-b border-black/10 py-5"
              >
                About Us
              </Link>
              <Link
                href={"/stores"}
                className="text-sm w-full font-normal border-b border-black/10 py-5"
              >
                Stores
              </Link>
              <Link
                href={"/contact"}
                className="text-sm w-full font-normal border-b border-black/10 py-5"
              >
                Contact
              </Link>
              <div className="w-full border-b border-black/10">
                <button onClick={() => setShowCategories(!showCategories)} className="w-full flex items-center justify-between text-sm text-left font-normal py-5">
                  Products
                  <span className="text-[15px]">{showCategories ? <FiMinus /> : <FiPlus />}</span>
                </button>
                {showCategories && (
                  <div className="flex flex-col gap-6 mt-2 mb-6">
                    {categories?.map((category) => (
                      // <Link href={'/'}>{category.name}</Link>
                      <MobileCategoryItem 
                        key={category._id}
                        category={category}
                        closeSidebar={closeSidebar}
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* <Link href={'/'} className="text-sm w-full font-normal border-b border-black/10 py-5">Products</Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
