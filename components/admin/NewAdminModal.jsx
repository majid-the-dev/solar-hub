"use client";

import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  phone: z.string().min(8, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const NewAdminModal = ({ onAdminAdded }) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("admin");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admins", {
        method: "POST",
        body: JSON.stringify({
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Admin added successfully!");
        setModal(false);
        form.reset();
        if (onAdminAdded) {
          onAdminAdded();
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="animation bg-black text-white text-xs flex items-center gap-2 rounded-lg px-4 py-3 hover:opacity-80"
      >
        <span>
          <AiOutlinePlusCircle className="text-[16px]" />
        </span>
        Add Admin
      </button>

      {modal && (
        <div
          onClick={() => {
            setModal(false);
            form.reset();
          }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-lg p-7"
          >
            <h1 className="text-[18px] font-medium">New Admin</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-8"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Full Name&nbsp;
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Phone&nbsp;
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Email&nbsp;
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Password&nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />

                <div className="w-full flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black hover:bg-black/80 py-6 mt-5 disabled:bg-black/80"
                  >
                    {loading ? (
                      <LoaderIcon
                        size={17}
                        className="animate-spin text-white"
                      />
                    ) : (
                      <span className="flex items-center gap-2">
                        <AiOutlinePlusCircle className="text-[16px]" />
                        Add Admin
                      </span>
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setModal(false);
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
      )}
    </>
  );
};

export default NewAdminModal;
