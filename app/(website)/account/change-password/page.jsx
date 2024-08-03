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
import { useSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Field to display the error message
  });

const Page = () => {

  const router = useRouter();

  const { data: session, status, update } = useSession();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          newPassword: values.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      };

      toast.success("Password updated successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
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
                Change Your Password
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 mt-10"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                                type="password"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-gray-500 text-sm">
                            Confirm New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                                type="password"
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
                  <Button
                    disabled={loading}
                    className="bg-darkGreen text-white text-sm float-end hover:bg-darkGreen/90"
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
