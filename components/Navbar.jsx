"use client";

import Image from "next/image";
import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { CgMenuLeft } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("error");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between px-5 py-6 md:py-8">
        <Link href={"/"}>
          <Image
            src={"/assets/dark--logo.png"}
            height={100}
            width={100}
            alt="logo"
          />
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <Link
            href={"/"}
            className={`${
              path === "/"
                ? "text-darkGreen font-semibold"
                : "font-normal"
            } text-[13px] rounded-full px-6 py-2 hover:text-darkGreen hover:font-semibold animation`}
          >
            Home
          </Link>
          <Link
            href={"/about-us"}
            className={`${
              path === "/about-us"
                ? "text-darkGreen font-semibold"
                : "font-normal"
            } text-[13px] whitespace-nowrap rounded-full px-6 py-2 hover:text-darkGreen hover:font-semibold animation`}
          >
            About Us
          </Link>
          <Link
            href={"/stores"}
            className={`${
              path === "/stores"
                ? "text-darkGreen font-semibold"
                : "font-normal"
            } text-[13px] rounded-full px-6 py-2 hover:text-darkGreen hover:font-semibold animation`}
          >
            Stores
          </Link>
          <Link
            href={"/contact"}
            className={`${
              path === "/contact"
                ? "text-darkGreen font-semibold"
                : "font-normal"
            } text-[13px] rounded-full px-6 py-2 hover:text-darkGreen hover:font-semibold animation`}
          >
            Contact
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 text-[13px] font-normal rounded-full px-6 py-2 hover:text-darkGreen hover:font-semibold animation"
              onClick={toggleDropdown}
            >
              Products
              <MdKeyboardArrowDown className="text-lg" />
            </button>
            {dropdownVisible && (
              <div className="absolute top-[74px] bg-white shadow z-[9999]">
                {loading ? (
                  <div>
                    <LoaderIcon />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 p-3">
                    {categories?.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products/${encodeURIComponent(category.name.replace(/ /g, "-"))}`}
                        className="text-[13px] whitespace-nowrap rounded pl-3 pr-10 py-2 hover:bg-darkGreen/10 hover:text-darkGreen"
                        onClick={() => setDropdownVisible(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-7">
          {/* <SearchModal /> */}
          <Link href={'/cart'} className="block md:hidden text-darkGreen text-[21px] -mt-1">
            <HiShoppingCart />
          </Link>
          <Link
            target="_blank" href={"https://wa.me/+2348182012345/"}
            className="animation hidden md:block text-xs bg-darkGreen text-white font-semibold whitespace-nowrap rounded-full px-6 py-3 hover:bg-darkGreen/80"
          >
            Get Quote
          </Link>
          <MobileSidebar categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
