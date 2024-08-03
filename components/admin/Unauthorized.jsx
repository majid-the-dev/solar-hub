import Link from "next/link";
import Image from "next/image";

const Unauthorized = () => {
  return (
    <div className="relative h-screen px-6 bg-gray-100">
      <div className="h-full flex flex-col items-center justify-center">
        {/* <Image src={"/assets/error.png"} alt="icon" height={70} width={70} /> */}
        <h1 className="text-4xl font-semibold mt-8">Oops!</h1>
        <p className="text-gray-500 text-sm mt-2">
          You are not auhorized to access this portal!
        </p>
        <Link
          href={"/"}
          className="animation bg-black text-white text-xs font-medium rounded-lg px-6 py-3 mt-5 hover:bg-black/80"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
