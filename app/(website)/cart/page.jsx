"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/utils/AppContext";
import { formatPrice } from "@/lib/utils";
import { AiFillShop, AiTwotoneInfoCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";

const Page = () => {
  const { cartProducts, removeCartProduct, clearCart } =
    useContext(CartContext);
  const [anyOutOfStock, setAnyOutOfStock] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Initialize quantities with 1 for each product
    const initialQuantities = cartProducts.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setAnyOutOfStock(
      cartProducts.some((product) => product.availability === "Out of Stock")
    );
  }, [cartProducts]);

  const reduceQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]:
        prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const price = product.discount ? product.discount : product.price;
      return total + price * quantities[product._id];
    }, 0);
  };

  return (
    <div>
      {cartProducts.length === 0 && (
        <div className="px-16 h-[75vh]">
          <div className="h-full flex flex-col items-center justify-center">
            {/* <BiSolidSad className="text-default text-4xl" /> */}
            {/* <Image
              src={"/assets/shopping-bag.png"}
              height={60}
              width={60}
              alt="icon"
            /> */}
            <AiTwotoneInfoCircle className="text-3xl" />
            <p className="text-[17px] md:text-xl text-center font-semibold mt-5">
              Ooops! Cart is Empty
            </p>
            <p className="text-xs text-gray-500 text-center font-light leading-4 mt-2">
              Before proceeding to checkout, you must add some products to your
              shopping bag!
            </p>
          </div>
        </div>
      )}
      {cartProducts.length > 0 && (
        <div className="mx-auto w-full max-w-7xl relative px-5 pt-20 pb-24">
          <h1 className="text-2xl font-medium">Shopping Cart</h1>
          <div className="mt-12">
            {/* {anyOutOfStock && ( */}
              <p className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-4 py-2">
                <BsInfoCircle />
                Some products in your cart are out of stock
              </p>
            {/* )} */}
            <div className="grid grid-cols-5 gap-6 mt-5">
              <div className="col-span-5 lg:col-span-3">
                <div className="border shadow border-gray-300/70 p-6">
                  <div className="flex flex-col">
                    {cartProducts.map((product, index) => (
                      <div
                        key={product._id}
                        className={`flex flex-col md:flex-row justify-between gap-7 py-10 ${
                          index !== cartProducts.length - 1
                            ? "border-b border-gray-300/60"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-10">
                          <div className="relative w-32 h-32">
                            <Image
                              src={product.images[0]}
                              alt="product"
                              layout="fill"
                              objectFit="contain"
                              className="rounded-lg"
                            />
                          </div>
                          <div className="inline-flex flex-col gap-3">
                            <p className="mr-auto bg-gray-100 text-xs font-light px-3 py-1">
                              {product.brand}
                            </p>
                            <p className="text-sm font-medium line-clamp-2 mt-2">
                              {product.title}
                            </p>
                            {product.discount ? (
                              <div className="flex items-center gap-3">
                                <p className="text-red-600 text-sm">
                                  &#8358; {formatPrice(product.discount)}
                                </p>
                                <p className="text-xs text-gray-400 font-light line-through">
                                  &#8358; {formatPrice(product.price)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-red-600 text-sm">
                                &#8358; {formatPrice(product.discount)}
                              </p>
                            )}
                            {product.availability === "Out of Stock" && (
                              <div className="inline-block">
                                <p className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium rounded-lg px-3 py-1.5">
                                  <BsInfoCircle className="text-[12px]" />
                                  Out of stock
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-5 lg:col-span-2">
                <div className="border border-gray-300/60 shadow p-6">
                  <h1 className="text-sm font-medium">Payment Summary</h1>
                  <div className="flex flex-col gap-5 mt-7">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Item quantity</p>
                      <p className="text-gray-500 text-sm font-semibold">
                        {cartProducts.reduce(
                          (acc, product) => acc + quantities[product._id],
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Order Total</p>
                      <p className="text-sm font-semibold">
                        &#8358; {formatPrice(calculateTotalPrice())}
                      </p>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Link
                      href={"/cart/checkout"}
                      className={`animation inline-flex items-center gap-2 bg-black text-white text-xs font-medium px-5 py-3 hover:bg-black/80 ${
                        anyOutOfStock
                          ? "disabled cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <IoBagCheckOutline className="text-[14px]" />
                      Proceed To Checkout
                    </Link>
                  </div>
                </div>
                <Link
                  href={"/"}
                  className="animation inline-flex items-center float-end gap-2 text-red-600 text-xs font-semibold mt-5"
                >
                  <AiFillShop />
                  Return to shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
