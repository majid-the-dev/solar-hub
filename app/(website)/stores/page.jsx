import GetQoute from "@/components/GetQoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDashLg } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";

const page = () => {
  return (
    <div>
      <div className="relative h-[45vh] w-full bg-darkGreen flex flex-col items-center justify-center overflow-x-hidden">
        <Image src={"/assets/hero-bg.jpg"} layout="fill" objectFit="cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-darkGreen"></div>
        <h1 className="text-white text-3xl md:text-5xl text-center font-bold uppercase md:leading-[60px] z-50 px-5 md:px-0">
          STORES
        </h1>
      </div>

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 py-20 lg:py-32 px-5">
        <div className="col-span-1">
          <div className="w-full h-full rounded-xl shadow p-6">
            <h1 className="text-darkGreen text-2xl font-semibold">ABUJA</h1>
            <p className="text-sm leading-6 mt-3">
              Upper Level, Unit U5 Jabi Lake Mall, Plot 1260 Jabi District,
              Cadastral Zone BO4, FCT Abuja
            </p>
            <p className="text-sm leading-6 mt-3">08172142345</p>
            <Link
              href={"/"}
              className="flex items-center gap-2 text-darkGreen text-sm underline underline-offset-8 mt-3"
            >
              See map
              <MdArrowOutward />
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full h-full rounded-xl shadow p-6">
            <h1 className="text-darkGreen text-2xl font-semibold">LAGOS</h1>
            <p className="text-sm leading-6 mt-3">
            Unit L17, Ikeja City Mall, 176/194 Obafemi Awolowo Way Alausa, Ikeja
            </p>
            <p className="text-sm leading-6 mt-3">08077286191</p>
            <Link
              href={"/"}
              className="flex items-center gap-2 text-darkGreen text-sm underline underline-offset-8 mt-3"
            >
              See map
              <MdArrowOutward />
            </Link>
          </div>
        </div>
      </div>

      <GetQoute />
    </div>
  );
};

export default page;
