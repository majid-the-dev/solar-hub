import Link from "next/link";
import React from "react";
import { BsArrowUpRight, BsDashLg } from "react-icons/bs";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from "next/image";

const GetQoute = () => {
  return (
    <div className="relative">
      <Image src={"/assets/quote-bg.jpg"} layout="fill" objectFit="cover" />
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-7 py-20 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-darkGreen/85 to-darkGreen/85 lg:from-darkGreen/100 lg:to-darkGreen/0"></div>
          <div className="z-50 text-center lg:text-left">
            <h1 className="text-white text-[32px] font-bold leading-[44px]">
              Start your journey <br /> to clean energy savings today
            </h1>
            <span className="w-full lg:hidden flex items-center justify-center text-white text-center text-4xl mt-5">
              <BsDashLg />
            </span>
            <p className="text-white text-sm font-light leading-6 -mt-1 lg:mt-5 max-w-xl">
              Take the first step towards a sustainable and cost-effective
              energy solution with Solar Hub. Whether you're looking to power
              your home, business, or community, our experts are here to guide
              you every step of the way.
            </p>
            <div className="mt-6">
            <Link target="_blank" href={"https://wa.me/+2347071793075/"} className="inline-flex items-center justify-center lg:justify-start bg-white text-darkGreen text-sm font-semibold whitespace-nowrap rounded-full px-6 py-3">
              Get Quote
            </Link>
            </div>
          </div>
          {/* <Link
            href={"/"}
            className="bg-inherit text-white text-sm md:text-lg font-semibold whitespace-nowrap border border-white rounded-full px-6 py-2.5 hover:bg-white hover:text-darkGreen z-50"
          >
            Get Quote
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default GetQoute;
