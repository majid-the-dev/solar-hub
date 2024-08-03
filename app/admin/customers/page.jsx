"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { CgTrashEmpty } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getCustomers = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching customers!");
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      toast.error("Error fetching customers!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Customers</h1>
          <p className="text-xs font-normal text-gray-500 mt-1">
            Manage customers account here.
          </p>
        </div>
        <div>
          {/* <AddProductModal onProductCreated={handleProductCreated} /> */}
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
                  placeholder="Search customer email here..."
                  className="w-full bg-gray-100 text-xs border border-gray-200 rounded-lg outline-none pl-9 pr-5 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>

          {filteredCustomers?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="mt-6 min-w-full">
                <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                  <TableRow>
                    <TableHead className="whitespace-nowrap font-normal">
                      Customer Name
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap font-normal px-14">
                      Customer Email
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap font-normal px-14">
                      Date Joined
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {filteredCustomers?.length > 0 &&
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer._id}>
                        <TableCell className="flex items-start gap-1 font-medium max-w-[300px] truncate">
                          {customer.firstName} {customer.lastName}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap px-14">
                          {customer.email}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap px-14">
                          {formatDate(customer.createdAt)}
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
                No customers available!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
