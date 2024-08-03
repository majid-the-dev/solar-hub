"use client";

import NewCategoryModal from "@/components/admin/NewCategoryModal";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { CgTrashEmpty } from "react-icons/cg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryActionDropdown from "@/components/admin/CategoryActionDropdown";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        toast.error("Error fetching categories!");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error fetching categories!");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryCreated = async () => {
    await getCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch("/api/categories", {
        method: "DELETE",
        body: JSON.stringify({ id: categoryId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // await axios.delete(`/api/categories/${categoryId}`);
      if (response.ok) {
        toast.success("Category deleted successfully!");
      }
      await getCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Product Categories</h1>
          <p className="text-xs font-normal text-gray-500 mt-1">
            Create and manage all product categories here.
          </p>
        </div>
        <div>
          <NewCategoryModal
            onCategoryCreated={handleCategoryCreated}
            parentCategories={categories}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={30} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          {categories?.length > 0 ? (
            <Table className="mt-8">
              <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Parent Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {categories?.length > 0 &&
                  categories.map((category) => (
                    <TableRow key={category.name}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {category.parent ? (
                          <p className="mx-auto inline-block bg-gray-200/60 text-gray-500 font-medium rounded-lg px-4 py-2">
                            {category.parent.name}
                          </p>
                        ) : (
                          <p className="text-red-500 text-lg">
                            <IoClose className="mx-auto" />
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="flex items-center justify-end text-right">
                        {" "}
                        <CategoryActionDropdown
                          category={category}
                          parentCategories={categories}
                          onEdit={setSelectedCategory}
                          onCategoryEdited={handleCategoryCreated}
                          onDelete={handleDeleteCategory}
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center">
              <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                <CgTrashEmpty />
              </p>
              <p className="text-xs text-gray-400 mt-4">
                No product categories!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
