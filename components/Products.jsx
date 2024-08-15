import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDashLg } from "react-icons/bs";

const Products = () => {
  return (
    <div className="mx-auto w-full max-w-7xl md:pt-10 pb-28 px-5">
      <div className="flex items-center justify-center gap-1 text-darkGreen mx-auto">
        <BsDashLg className="text-lg" />
        <p className="text-xs md:text-sm font-light">What we sell</p>
      </div>
      <h1 className="text-2xl md:text-4xl text-center font-bold mt-3">Our product range</h1>
      <p className="text-xs md:text-sm text-center font-light leading-5 mt-6 mx-auto max-w-3xl">
        Discover our wide range of top-quality solar products designed to meet
        all your energy needs. From residential to commercial applications, we
        sell products engineered to deliver exceptional performance and lasting
        value.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-y-16 gap-x-10 mt-14">
        <div className="col-span-1 w-full flex flex-col items-center gap-7">
          <div className="relative w-full max-w-sm h-52 rounded-3xl overflow-hidden p-6 group">
            <Image
              src={"/assets/solar-panel.png"}
              alt="solar panel"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={"/products/Solar-Panels"}
                className="bg-lightGreen text-white text-sm font-semibold px-4 py-3 rounded-lg"
              >
                Shop now
              </Link>
            </div>
          </div>
          <h1 className="text-sm md:text-md font-semibold">Solar Panels</h1>
        </div>

        <div className="col-span-1 w-full flex flex-col items-center gap-7">
          <div className="relative w-full max-w-sm h-52 rounded-3xl overflow-hidden p-6 group">
            <Image
              src={"/assets/cworth-battery.webp"}
              alt="solar battery"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={"/products/Solar-Batteries"}
                className="bg-lightGreen text-white text-sm font-semibold px-4 py-3 rounded-lg"
              >
                Shop now
              </Link>
            </div>
          </div>
          <h1 className="text-sm md:text-md font-semibold">Solar Batteries</h1>
        </div>

        <div className="col-span-1 w-full flex flex-col items-center gap-7">
          <div className="relative w-full max-w-sm h-52 rounded-3xl overflow-hidden p-6 group">
            <Image
              src={"/assets/stb-inverter.jpg"}
              alt="solar inverters"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={"/products/Solar-Inverters"}
                className="bg-lightGreen text-white text-sm font-semibold px-4 py-3 rounded-lg"
              >
                Shop now
              </Link>
            </div>
          </div>
          <h1 className="text-sm md:text-md font-semibold">Solar Inverters</h1>
        </div>

        <div className="col-span-1 w-full flex flex-col items-center gap-7">
          <div className="relative w-full max-w-sm h-52 rounded-3xl overflow-hidden p-6 group">
            <Image
              src={"/assets/generator.png"}
              alt="solar panel"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={"/products/Solar-Generators"}
                className="bg-lightGreen text-white text-sm font-semibold px-4 py-3 rounded-lg"
              >
                Shop now
              </Link>
            </div>
          </div>
          <h1 className="text-sm md:text-md font-semibold">Solar Generators</h1>
        </div>

        <div className="col-span-1 w-full flex flex-col items-center gap-7">
          <div className="relative w-full max-w-sm h-52 rounded-3xl overflow-hidden p-6 group">
            <Image
              src={"/assets/felicity-mptt.webp"}
              alt="solar panel"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={"/products/Charge-Controllers"}
                className="bg-lightGreen text-white text-sm font-semibold px-4 py-3 rounded-lg"
              >
                Shop now
              </Link>
            </div>
          </div>
          <h1 className="text-sm md:text-md font-semibold">Charge Controllers</h1>
        </div>

        <div className="col-span-1 w-full flex flex-col items-center gap-7">
          <div className="relative w-full max-w-sm h-52 rounded-3xl overflow-hidden p-6 group">
            <Image
              src={"/assets/accessories.webp"}
              alt="solar panel"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={"/products/Solar-Accessories"}
                className="bg-lightGreen text-white text-sm font-semibold px-4 py-3 rounded-lg"
              >
                Shop now
              </Link>
            </div>
          </div>
          <h1 className="text-sm md:text-md font-semibold">Solar Accessories</h1>
        </div>
      </div>
    </div>
  );
};

export default Products;
