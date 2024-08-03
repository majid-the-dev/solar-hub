"use client";

import Image from "next/image";
import toast from "react-hot-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  phone: z.string().min(8, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(8, "Message is required"),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    // console.log(values);
  };

  return (
    <div>
      <div className="relative h-[45vh] w-full bg-darkGreen flex flex-col items-center justify-center overflow-x-hidden">
        <Image src={"/assets/hero-bg.jpg"} layout="fill" objectFit="cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-darkGreen"></div>
        <h1 className="text-white text-3xl md:text-5xl text-center font-bold uppercase md:leading-[60px] z-50 px-5 md:px-0">
          CONTACT
        </h1>
      </div>

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-start gap-16 py-20 lg:py-32 px-5">
        <div className="col-span-1">
          <h1 className="text-lg md:text-3xl font-semibold">
            Let&apos;s have a conversation
          </h1>
          <p className="text-sm font-light mt-4 leading-6">We look forward to hearing from you and helping you harness the power of the sun. Thank you for choosing Solar Hub!</p>
          <div className="mt-10">
            <p className="text-lg font-semibold">Lagos</p>
            <p className="text-sm font-light leading-6 mt-2">Solar Hub Unit L17, Ikeja City Mall, 176/194 Obafemi Awolowo Way Alausa, Lagos</p>
            <p className="text-sm font-light mt-2">Tel: 08077286191</p>
          </div>
          <div className="mt-6">
            <p className="text-lg font-semibold">Abuja</p>
            <p className="text-sm font-light leading-6 mt-2">Solar Hub Jabi Lake Mall - Upper Level, Unit U5 Jabi Lake Mall, Plot 1260 Jabi District, Cadastral Zone BO4, FCT Abuja</p>
            <p className="text-sm font-light mt-2">Tel: 08172142345</p>
          </div>
        </div>
        <div className="col-span-1 -order-1 md:order-1">
          <div className="bg-gray-100/70 shadow-sm p-5 md:p-10">
            {/* <h1 className="text-lg text-center font-bold">Send a Message</h1> */}
            <p className="text-sm font-light leading-6 mt-2">Please fill out the quick form and we will be in touch with lightening speed.</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-7"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-light">
                        Full Name <span className="text-red-600">*</span>
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
                      <FormLabel className="text-xs font-light">
                        Phone Number <span className="text-red-600">*</span>
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
                      <FormLabel className="text-xs font-light">
                        Email Address <span className="text-red-600">*</span>
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-light">
                        Message <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />
                <Button className="bg-darkGreen text-white hover:bg-darkGreen/90">Send Message</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
