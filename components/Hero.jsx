import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsArrowUpRightCircle, BsDashLg } from "react-icons/bs";
import { BsArrowUpRightCircleFill, BsArrowUpRight } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-[90vh] w-full bg-darkGreen flex flex-col items-center justify-center overflow-x-hidden">
      <div class="custom-shape-divider-bottom-1722112102 z-[50]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <Image src={"/assets/hero-bg.jpg"} layout="fill" objectFit="cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-darkGreen"></div>
      <h1 className="text-white text-3xl md:text-5xl text-center font-bold uppercase md:leading-[60px] z-50 px-5 md:px-0">
        Experience Uninterrupted <br /> Energy with Solar Hub
      </h1>
      <p className="text-white text-sm font-light text-center max-w-3xl leading-6 z-50 px-5 md:px-0 mt-5">
        Join us in transforming the world with clean, cost-effective solar power
        solutions. From solar panels to inverters, we provide seamless sales,
        installation, and maintenance. Empower your home and business with Solar
        Hub.
      </p>
      <div className="inline-flex items-center gap-4 z-50 mt-8">
        <Link
          target="_blank" href={"https://wa.me/+2347071793075/"}
          className="bg-white flex items-center gap-2 text-darkGreen text-[15px] font-semibold rounded-full px-8 py-4"
        >
          Contact Sales Today
        </Link>
      </div>
    </div>
  );
};

export default Hero;
