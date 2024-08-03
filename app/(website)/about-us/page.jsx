import GetQoute from "@/components/GetQoute";
import Image from "next/image";
import React from "react";
import { BsDashLg } from "react-icons/bs";

const page = () => {
  return (
    <div>
      <div className="relative h-[45vh] w-full bg-darkGreen flex flex-col items-center justify-center overflow-x-hidden">
        <Image src={"/assets/hero-bg.jpg"} layout="fill" objectFit="cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-darkGreen"></div>
        <h1 className="text-white text-3xl md:text-5xl text-center font-bold uppercase md:leading-[60px] z-50 px-5 md:px-0">
          ABOUT US
        </h1>
      </div>

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-20 lg:py-32 px-5">
        <div className="col-span-1">
          <BsDashLg className="mx-auto text-3xl text-darkGreen lg:hidden" />
          <h1 className="text-darkGreen text-2xl md:text-4xl text-center lg:text-left font-semibold lg:border-l-4 border-darkGreen pl-4">
            Who we are
          </h1>
          <p className="text-sm text-center lg:text-left font-light leading-6 mt-7">
            We are a leading provider of innovative solar energy solutions
            dedicated to powering a sustainable future. With a passion for
            renewable energy, we specialize in the sale, installation, and
            maintenance of high-quality solar panels, batteries, inverters,
            generators, and street lights. Our comprehensive range of products
            and services is designed to meet the diverse energy needs of homes,
            businesses, and communities.
          </p>
        </div>
        <div className="col-span-1">
          <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
            <Image
              src={"/assets/about-image-1.jpg"}
              height={450}
              width={450}
              className="relative rounded-2xl z-50"
              alt="image"
            />
            <Image
              src={"/assets/ornament-1.png"}
              height={150}
              width={150}
              className="absolute -top-7 -right-7 rounded-2xl hidden"
              alt="image"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-16 pb-20 lg:pb-36 px-5">
        <div className="col-span-1 order-1 lg:-order-1">
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start">
            <Image
              src={"/assets/about-image-2.jpg"}
              height={450}
              width={450}
              className="relative rounded-2xl z-50"
              alt="image"
            />
            <Image
              src={"/assets/ornament-1.png"}
              height={150}
              width={150}
              className="absolute -top-7 -right-7 rounded-2xl hidden"
              alt="image"
            />
          </div>
        </div>
        <div className="col-span-1">
          <BsDashLg className="mx-auto text-3xl text-darkGreen lg:hidden" />
          <h1 className="text-darkGreen text-2xl md:text-4xl text-center lg:text-left font-semibold lg:border-l-4 border-darkGreen pl-4">
            Our Mission
          </h1>
          <p className="text-sm text-center lg:text-left font-light leading-6 mt-7">
            At Solar Hub, our mission is to deliver reliable, cost-effective,
            and environmentally friendly energy solutions. We aim to reduce our
            reliance on traditional energy sources, decrease carbon footprints,
            and promote the widespread adoption of clean energy technologies. We
            believe that by harnessing the power of the sun, we can create a
            brighter and more sustainable future for generations to come.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl gap-16 pb-20 lg:pb-32 px-5">
        {/* <div className="flex items-center justify-center gap-1 mx-auto">
          <BsDashLg className="text-lg" />
          <p className="text-xs md:text-sm font-light">Get started</p>
        </div> */}
        <h1 className="text-darkGreen text-2xl md:text-4xl text-center font-semibold mt-3">
          Ready to explore solar hub?
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mt-12 md:mt-16">
          <div className="relative w-full max-w-sm flex flex-col items-center">
            {/* <div className="inline-flex items-center justify-center rounded-full p-3">
              <Image
                src={"/assets/cart-icon.png"}
                height={25}
                width={25}
                alt="icon"
              />
            </div> */}
            <h1 className="text-lg text-center font-semibold mt-4">Sales</h1>
            <p className="text-sm text-center font-light leading-6 mt-1.5">
              We offer a diverse selection of high-quality solar panels,
              batteries, inverters, generators, and street lights to meet your
              unique energy requirements.
            </p>
          </div>
          <div className="relative w-full max-w-sm flex flex-col items-center">
            {/* <div className="inline-flex items-center justify-center rounded-full p-3">
              <Image
                src={"/assets/cart-icon.png"}
                height={25}
                width={25}
                alt="icon"
              />
            </div> */}
            <h1 className="text-lg text-center font-semibold mt-4">
              Installation
            </h1>
            <p className="text-sm text-center font-light leading-6 mt-1.5">
              Our certified professionals provide seamless and efficient
              installation services, ensuring your solar system operates at its
              best.
            </p>
          </div>
          <div className="relative w-full max-w-sm flex flex-col items-center">
            {/* <div className="inline-flex items-center justify-center rounded-full p-3">
              <Image
                src={"/assets/maintenance-icon.png"}
                height={25}
                width={25}
                alt="icon"
              />
            </div> */}
            <h1 className="text-lg text-center font-semibold mt-4">
              Maintenance
            </h1>
            <p className="text-sm text-center font-light leading-6 mt-1.5">
              Keep your solar systems in peak condition with our comprehensive
              maintenance services, designed to maximize efficiency and
              longevity.
            </p>
          </div>
        </div>
      </div>

      <GetQoute />
    </div>
  );
};

export default page;
