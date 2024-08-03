import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
};

export const authFormSchema = (type) => {
  if (type === "sign-up") {
    return z.object({
      fullName: z.string().min(3, "Full Name is required"),
      phone: z.string().min(8, "Phone Number is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters long"),
    });
  } else if (type === "sign-in") {
    return z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters long"),
    });
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return ""; // Return an empty string if dateString is undefined
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};




