import Image from "next/image";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {

  const date = new Date();

  return (
    <footer className="bg-gray-100">
      <div className="w-full mx-auto max-w-7xl flex flex-col lg:flex-row items-start justify-between gap-16 pt-24 pb-10 px-5">
        <div>
          <Image
            src={"/assets/dark--logo.png"}
            alt="logo"
            height={110}
            width={110}
            className=""
          />
          <p className="text-xs font-normal leading-6 max-w-lg mt-8">
            Discover the future of energy with Solar Hub. We deliver top-notch
            solar power solutions that ensure an uninterrupted, cost-effective,
            and eco-friendly power supply. From solar panels to batteries,
            generators, street lights, and inverters, we've got you covered.
          </p>
        </div>
        <div className="max-lg:w-full grid grid-cols-2 md:grid-cols-3 gap-14">
            <div className="col-span-1">
                <h1 className="text-lg font-medium whitespace-nowrap">Company</h1>
                <div className="inline-flex flex-col gap-7 mt-8">
                    <Link href={'/about-us'} className="text-xs font-normal whitespace-nowrap">About Us</Link>
                    <Link href={'/contact'} className="text-xs font-normal whitespace-nowrap">Contact</Link>
                    <Link href={'/stores'} className="text-xs font-normal whitespace-nowrap">Stores</Link>
                    <Link href={'/'} className="text-xs font-normal whitespace-nowrap">Privacy Policy</Link>
                    <Link href={'/'} className="text-xs font-normal whitespace-nowrap">Terms</Link>
                </div>
            </div>
            <div className="col-span-1">
                <h1 className="text-lg font-medium whitespace-nowrap">Quick Links</h1>
                <div className="inline-flex flex-col gap-7 mt-8">
                    <Link href={'/products/Solar-Panels'} className="text-xs font-normal whitespace-nowrap">Panels</Link>
                    <Link href={'/products/Solar-Batteries'} className="text-xs font-normal whitespace-nowrap">Batteries</Link>
                    <Link href={'/products/Solar-Inverters'} className="text-xs font-normal whitespace-nowrap">Inverters</Link>
                    <Link href={'/products/Solar-Generators'} className="text-xs font-normal whitespace-nowrap">Generators</Link>
                    <Link href={'/products/Charge-Controllers'} className="text-xs font-normal whitespace-nowrap">Charge Controllers</Link>
                    <Link href={'/products/Solar-Accessories'} className="text-xs font-normal whitespace-nowrap"></Link>
                </div>
            </div>
            <div className="col-span-1">
                <h1 className="text-lg font-medium whitespace-nowrap">Socials</h1>
                <div className="flex items-center gap-4 mt-6">
                    <Link href={'https://www.instagram.com/solarhubng/'} target="_blank" className="bg-white/10 rounded-lg p-2">
                        <RiInstagramFill className="text-2xl" />
                    </Link>
                    <Link href={'/'} className="bg-white/10 rounded-lg p-2.5">
                        <BsFacebook className="text-[22px]" />
                    </Link>
                    <Link href={'https://www.tiktok.com/@solarhubng'} target="_blank" className="bg-white/10 rounded-lg p-2">
                        <AiFillTikTok className="text-[28px]" />
                    </Link>
                </div>
            </div>
        </div>
        <hr />
      </div>

      <div className="mx-auto mt-12 pb-10">
        <p className="text-xs font-normal text-center leading-8">
          &copy; {date.getFullYear()} Harmony Group NG. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
