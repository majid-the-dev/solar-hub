import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDashLg } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";

const About = () => {
  return (
    <div className="mx-auto w-full max-w-7xl py-28 px-5 border-none">
      <div className="flex items-center justify-center gap-1 text-darkGreen mx-auto">
        <BsDashLg className="text-lg" />
        <p className="text-xs md:text-sm font-light">Who we are</p>
      </div>
      <h1 className="text-3xl md:text-4xl text-center font-bold mt-3">
        We illuminate your world
      </h1>
      <p className="text-xs md:text-sm text-center font-light leading-5 mt-8 mx-auto max-w-3xl">
        Discover the future of energy with Solar Hub. We deliver top-notch solar
        power solutions that ensure an uninterrupted, cost-effective, and
        eco-friendly power supply. From solar panels to batteries, generators,
        street lights, and inverters, we&apos;ve got you covered.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mt-14">
        <div className="relative w-full max-w-sm h-72 bg-gray-400 rounded-3xl overflow-hidden">
          <Image
            src={"/assets/sales.jpg"}
            alt="sales"
            layout="fill"
            objectFit="cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl"></div>
          <div className="absolute bottom-7 left-6 right-7">
            <h1 className="text-white text-2xl font-semibold">Sales</h1>
            <p className="text-gray-300 text-sm font-light leading-[18px] mt-1">
              We offer a wide range of solar products to meet your unique energy
              needs
            </p>
            {/* <Link
              href={"/"}
              className="flex items-center gap-2 text-gray-300 text-sm font-light mt-2 underline underline-offset-4"
            >
              Learn more
              <MdArrowOutward />
            </Link> */}
          </div>
        </div>
        <div className="relative w-full max-w-sm h-72 bg-gray-400 rounded-3xl overflow-hidden">
          <Image
            src={"/assets/installation.jpg"}
            alt="sales"
            layout="fill"
            objectFit="cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl"></div>
          <div className="absolute bottom-7 left-6 right-7">
            <h1 className="text-white text-2xl font-semibold">Installation</h1>
            <p className="text-gray-300 text-sm font-light leading-[18px] mt-1">
              Our team of certified professionals ensures a seamless
              installation process
            </p>
            {/* <Link
              href={"/"}
              className="flex items-center gap-2 text-gray-300 text-xs mt-2 underline underline-offset-4"
            >
              Learn more
              <MdArrowOutward />
            </Link> */}
          </div>
        </div>
        <div className="relative w-full max-w-sm h-72 bg-gray-400 rounded-3xl overflow-hidden">
          <Image
            src={"/assets/maintenance.jpg"}
            alt="sales"
            layout="fill"
            objectFit="cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl"></div>
          <div className="absolute bottom-7 left-6 right-7">
            <h1 className="text-white text-2xl font-semibold">Maintenance</h1>
            <p className="text-gray-300 text-sm font-light leading-[18px] mt-1">
              Keep your solar running with our comprehensive maintenance
              services.
            </p>
            {/* <Link
              href={"/"}
              className="flex items-center gap-2 text-gray-300 text-xs mt-2 underline underline-offset-4"
            >
              Learn more
              <MdArrowOutward />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
