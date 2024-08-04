"use client";

import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

const AllCategoriesCard = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error fetching categories!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50/50 border border-gray-200/55 rounded-lg">
      <div className="flex items-center justify-between bg-gray-100 rounded-t-lg px-4 py-4">
        <p className="text-xs font-medium">All Categories</p>
        {categories.length > 0 && (
          <p className="bg-white text-xs rounded-full border border-gray-300 px-2 py-1">
            {categories.length}
          </p>
        )}
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={22} className="animate-spin text-black" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-4 px-3">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.name}
                href={"/admin/categories"}
                className="flex items-center justify-between text-xs hover:bg-gray-200/40 rounded-lg px-2 py-2"
              >
                {category.name}
                <span className="text-[18px] text-gray-500">
                  <IoMdArrowDropright />
                </span>
              </Link>
            ))
          ) : (
            <div>No categories</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCategoriesCard;
