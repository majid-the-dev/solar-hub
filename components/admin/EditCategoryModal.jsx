"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { LoaderIcon } from "lucide-react";
import { FaCheck } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  parent: z.string().nullable(),
});

const EditCategoryModal = ({
  category,
  parentCategories,
  setEdit,
  onCategoryEdited,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      parent: category?.parent?._id || null,
    },
  });

  const checkCircularDependency = (catId, parentId) => {
    if (!parentId) return false;
    if (catId === parentId) return true;
    const parentCategory = parentCategories.find((cat) => cat._id === parentId);
    return parentCategory
      ? checkCircularDependency(catId, parentCategory.parent?._id)
      : false;
  };

  const onSubmit = async (values) => {
    if (category._id === values.parent) {
      setError("A category cannot be its own parent.");
      return;
    }

    if (checkCircularDependency(category._id, values.parent)) {
      setError(
        "Circular dependency detected. Cannot set a child category as parent."
      );
      return;
    }

    const existingCategory = parentCategories.find(
      (cat) =>
        cat.name.toLowerCase() === values.name.toLowerCase() &&
        cat._id !== category._id
    );

    if (existingCategory) {
      setError("Category name already exists.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        body: JSON.stringify({
          id: category._id,
          name: values.name,
          parent: values.parent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Category edited successfully!");
        setEdit(false); // Close the modal after success
        form.reset();
        if (onCategoryEdited) {
          onCategoryEdited();
        }
      } else {
        throw new Error("Failed to update category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
        <div className="bg-white w-full max-w-lg rounded-lg p-7">
          <h1 className="text-left text-[18px] font-medium">
            Edit Product Category
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-10 text-left"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Category Name&nbsp;
                      <span className="text-red-400">(required)</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="text-sm font-medium" />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Parent Category{" "}
                      <span className="text-red-400">(optional)</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-sm font-medium">
                          <SelectValue placeholder="Select a parent category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={null}>
                          Select parent category
                        </SelectItem>
                        {parentCategories.map((parent) => (
                          <SelectItem key={parent._id} value={parent._id}>
                            {parent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {error && (
                <p className="flex gap-2 bg-red-50 text-xs text-red-500 rounded-lg px-2 py-3">
                  <BsFillInfoCircleFill className="mt-0.5" />
                  {error}
                </p>
              )}

              <div className="w-full flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-black/80 py-6 mt-5 disabled:bg-black/80"
                >
                  {loading ? (
                    <LoaderIcon size={17} className="animate-spin text-white" />
                  ) : (
                    <span className="flex items-center gap-3">
                      <FaCheck className="text-[14px]" />
                      Save Category
                    </span>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setEdit(false);
                    form.reset();
                  }}
                  className="text-xs text-red-600 mt-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditCategoryModal;
