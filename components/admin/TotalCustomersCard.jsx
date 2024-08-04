"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";

const TotalCustomersCard = () => {
    
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

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

  return (
    <div className="w-full bg-gray-50/50 border border-gray-200/55 rounded-lg">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-1.5">
          <span className="text-purple-500">
            <BsPersonCircle />
          </span>
          <p className="text-xs font-medium">Total Customers</p>
        </div>
      </div>
      <div className="px-4 py-5">
        <p className="text-[24px] font-semibold">{customers.length}</p>
      </div>
      <Link
        href={"/admin/customers"}
        className="w-full flex items-center justify-between bg-gray-200/40 rounded-b-lg px-4 py-3 mt-5"
      >
        <p className="text-xs text-gray-500">
          {customers.length} active customers
        </p>
        <span className="text-[18px] text-gray-500">
          <IoMdArrowDropright />
        </span>
      </Link>
    </div>
  );
};

export default TotalCustomersCard;
