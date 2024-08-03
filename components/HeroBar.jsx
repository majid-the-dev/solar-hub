import Image from "next/image";
import React from "react";

const HeroBar = () => {
  return (
    <div className="bg-darkGreen py-14">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={"/assets/eco.png"} height={60} width={60} alt="icon" />
          <div className="flex flex-col text-white">
            <h1 className="text-xl font-semibold">Eco Friendly</h1>
            <p className="text-[13px] text-gray-300">
              Environment sustainable products
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={"/assets/maintenance.png"}
            height={45}
            width={45}
            alt="icon"
          />
          <div className="flex flex-col text-white">
            <h1 className="text-xl font-semibold">Low Maintenance</h1>
            <p className="text-[13px] text-gray-300">Effortless upkeep solution</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={"/assets/wallet.png"}
            height={50}
            width={50}
            alt="icon"
          />
          <div className="flex flex-col text-white">
            <h1 className="text-xl font-semibold">Affordable Price</h1>
            <p className="text-[13px] text-gray-300">Budget friendly cost</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBar;
