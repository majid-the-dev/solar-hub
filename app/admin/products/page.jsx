"use client";

import NewProductModal from "@/components/admin/NewProductModal";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CgTrashEmpty } from "react-icons/cg";
import { IoClose, IoSearch } from "react-icons/io5";
import { formatPrice } from "@/lib/utils";
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
import ProductActionDropdown from "@/components/admin/ProductActionDropdown";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching products!");
      }

      const data = await response.json();
      setProducts(data.reverse());
    } catch (error) {
      toast.error("Error fetching products!");
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = async () => {
    await getProducts();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({ id: productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Product deleted successfully!");
      }

      await getProducts();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-xs font-normal text-gray-500 mt-1">
            Create and manage all products here.
          </p>
        </div>
        <div>
          <NewProductModal onProductCreated={handleProductCreated} />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={30} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-end mt-8">
            <form className="w-full flex items-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search product here..."
                  className="w-full bg-gray-100 text-xs border border-gray-200 rounded-lg outline-none pl-9 pr-5 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>

          {filteredProducts?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="mt-6 min-w-full">
                <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                  <TableRow>
                    <TableHead className="whitespace-nowrap font-normal">
                      Product Title
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap font-normal px-14">
                      Product Availability
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap font-normal px-14">
                      Product Price (&#8358;)
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap font-normal px-14">
                      Discount Price (&#8358;)
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap font-normal">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {filteredProducts?.length > 0 &&
                    filteredProducts.map((product) => (
                      <TableRow key={product.title}>
                        <TableCell className="flex items-start gap-1 font-medium max-w-[300px] truncate">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-10 h-10 mr-2 rounded-full"
                            />
                          )}
                          <div className="flex flex-col items-start gap-2 truncate">
                            <p className="truncate font-medium">
                              {product.title}
                            </p>
                            <p className="bg-gray-200/60 text-gray-500 font-normal rounded-lg px-2 py-1">
                              {product.category.name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center px-14 capitalize">
                          {product.availability}
                        </TableCell>
                        <TableCell className="text-center px-14">
                          {formatPrice(product.price)}
                        </TableCell>
                        <TableCell className="text-center px-14">
                          {product.discount ? (
                            <p>{formatPrice(product.discount)}</p>
                          ) : (
                            <IoClose className="mx-auto text-red-500 text-lg" />
                          )}
                        </TableCell>
                        <TableCell className="float-end">
                          {" "}
                          <ProductActionDropdown
                            product={product}
                            onEdit={setSelectedProduct}
                            onProductEdited={handleProductCreated}
                            onDelete={handleDeleteProduct}
                          />{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center">
              <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                <CgTrashEmpty />
              </p>
              <p className="text-xs text-gray-500 font-normal mt-4">
                No product available!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
