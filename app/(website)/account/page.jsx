"use client";

import { useState, useEffect } from "react";
import AccountTab from "@/components/AccountTab";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import { SlLogout } from "react-icons/sl";

const formSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  phone: z.string().min(8, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().nullable(),
});

const Page = () => {
  const router = useRouter();

  const { data: session, status, update } = useSession();

  const { user } = session || {};

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      streetAddress: "",
      city: "",
      state: null,
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated" && user) {
      form.reset({
        fullName: user.fullName || "",
        phone: user.phone || "",
        email: user.email || "",
        streetAddress: user.streetAddress || "",
        city: user.city || "",
        state: user.state || null,
      });
    }
  }, [status, user, router, form]);

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await update();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <LoadingScreen />
      ) : (
        <div className="bg-gray-50">
          <AccountTab />
          <div className="w-full min-h-[70vh] flex items-center justify-center px-5 py-24">
            <div className="w-full mx-auto max-w-4xl bg-white border border-gray-100 rounded shadow-sm px-5 md:px-10 py-14">
              <h1 className="text-darkGreen text-xl text-center font-medium">
                Manage Your Profile
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 mt-10"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white font-medium px-3 py-2 focus:border focus:border-darkGreen/35"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white font-medium px-3 py-2 focus:border focus:border-darkGreen/35"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white font-medium px-3 py-2 focus:border focus:border-darkGreen/35"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            Street Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white font-medium px-3 py-2 focus:border focus:border-darkGreen/35"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white font-medium px-3 py-2 focus:border focus:border-darkGreen/35"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            State
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white font-medium px-3 py-2 focus:border focus:border-darkGreen/35"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-normal" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-5">
                    <Button type="button" onClick={() => signOut()} className="flex items-center gap-3 bg-inherit text-red-600 hover:bg-inherit">
                      <SlLogout />
                      Sign Out
                    </Button>
                    <Button
                      disabled={loading}
                      className="bg-darkGreen text-white text-sm hover:bg-darkGreen/90"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <LoaderIcon
                            size={15}
                            className="animate-spin text-white"
                          />
                          Saving Changes
                        </span>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
