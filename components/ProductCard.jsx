import Image from "next/image";
import Link from "next/link";
import { BsCart, BsCart2, BsCart3, BsCart4 } from "react-icons/bs";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { formatPrice } from "@/lib/utils";

const ProductCard = ({ product, link }) => {
  return (
    <Link
      href={link}
      className="w-full max-w-56 group hover:scale-105 animation"
    >
      <div className="relative bg-white p-7">
        <div className="relative h-24 md:h-32 mx-auto">
          <Image
            src={product?.images[0]}
            alt="product"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        {/* Discount */}
        {product?.discount && (
          <p className="absolute top-3 left-0 text-red-600 text-xs font-light bg-red-100 px-2 py-1">
            -{Math.round(((product?.price - product?.discount) / product?.price) * 100)}%
          </p>
        )}
      </div>
      <div className="flex flex-col items-center">
        {/* Brand */}
        <p className="inline-flex items-center justify-center text-center text-xs text-gray-500 capitalize font-light whitespace-nowrap bg-gray-100 px-4 py-1.5 mt-2">
          {product?.brand}
        </p>
        {/* Title */}
        <h1 className="text-center text-[15px] font-normal line-clamp-2 mt-4 group-hover:underline underline-offset-2">
          {product?.title}
        </h1>
        {product?.discount ? (
          <div className="flex flex-col md:flex-row items-center gap-1 mt-3">
            <p className="text-center text-red-600 text-sm font-normal whitespace-nowrap">
              &#8358; {formatPrice(product?.discount)}
            </p>
            <p className="text-center text-gray-400 text-xs font-light whitespace-nowrap line-through">
              &#8358; {formatPrice(product?.price)}
            </p>
          </div>
        ) : (
          <p className="text-center text-red-600 text-sm font-normal mt-3">
            &#8358; {formatPrice(product?.price)}
          </p>
        )}
        {/* Availability */}
        {product?.availability !== "Available" && (
          <p className="text-red-600 text-sm font-light mt-2">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
