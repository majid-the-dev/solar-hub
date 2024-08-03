"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { CartContext } from "@/utils/AppContext";
import Image from "next/image";
import GetQoute from "@/components/GetQoute";

const page = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageDisplay, setImageDisplay] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/product-page/${id}`);
          const data = await response.json();
          setProduct(data);
          setImageDisplay(data.images[0]);
        } catch (error) {
          toast.error("Something went wrong!");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <LoaderIcon size={40} className="animate-spin text-default" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <LoaderIcon size={40} className="animate-spin text-default" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-7xl px-5 py-28">
        <div className="grid grid-cols-2 gap-16">
          <div className="col-span-2 md:col-span-1">
            <div className="h-full w-full grid grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1">
                <div className="flex md:flex-col gap-4 w-full overflow-x-scroll md:overflow-y-scroll md:h-full">
                  {product?.images?.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-32 md:w-full h-32 cursor-pointer overflow-hidden border border-gray-200 hover:border-darkGreen/40"
                      onClick={() => setImageDisplay(image)}
                    >
                      <Image
                        src={image}
                        alt="product"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        className="p-6" // Add padding around the image
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 -order-1 md:order-1">
                <div className="relative h-72 md:h-full w-full overflow-hidden border border-gray-200">
                  <Image
                    src={imageDisplay}
                    alt="product"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    className="p-6 md:p-10" // Add padding around the image
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="inline-block bg-gray-100 text-sm font-light px-3 py-1">
              {product?.brand}
            </p>
            <h1 className="text-lg md:text-2xl font-normal max-w-md leading-[29px] md:leading-[35px] mt-5">
              {product?.title}
            </h1>
            {product.discount ? (
              <div>
                <div className="flex items-center gap-4">
                  <p className="text-red-600 text-lg font-light mt-5">
                    &#8358; {formatPrice(product?.discount)}
                  </p>
                  <p className="text-gray-400 text-sm font-light line-through mt-5">
                    &#8358; {formatPrice(product?.price)}
                  </p>
                </div>
                <p className="text-red-600 text-sm font-light mt-2">
                  You save &#8358;{" "}
                  {formatPrice(product?.price - product?.discount)} when you
                  purchase this item
                </p>
              </div>
            ) : (
              <p className="text-red-600 text-lg font-light mt-5">
                &#8358; {formatPrice(product?.price)}
              </p>
            )}
            <div className="mt-5">
              <button
                disabled={product.availability !== "Available"}
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to cart!");
                }}
                className="bg-darkGreen text-white text-sm font-medium px-5 py-3 hover:bg-darkGreen/80 disabled:bg-darkGreen/80 disabled:cursor-not-allowed animation"
              >
                {product.availability === "Available" ? (
                  <span>Add To Cart</span>
                ) : (
                  <span>Out of Stock</span>
                )}
              </button>
            </div>
            <p className="text-xs font-light mt-5">
              * Same day delivery available in Lagos and FCT
            </p>
          </div>
        </div>
        <div className="mt-14">
          <h1 className="text-lg font-medium">Product Description</h1>
          <p className="text-sm font-light mt-3">{product?.description}</p>
          <h1 className="text-lg font-medium mt-10">Product Properties</h1>
          <div className="mt-5">
            <Table>
              <TableBody>
                {product?.properties?.map((property, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 hover:bg-gray-100"
                        : "bg-white hover:bg-white"
                    }
                  >
                    <TableCell className="text-sm font-medium">
                      {property?.name}
                    </TableCell>
                    <TableCell className="text-sm font-light">
                      {property.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <GetQoute />
    </div>
  );
};

export default page;
