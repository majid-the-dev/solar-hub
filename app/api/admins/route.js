import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/Users";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  await mongooseConnect();
  const { fullName, phone, email, password, role } = await req.json();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const adminDoc = await User.create({
    fullName,
    phone,
    email,
    password: hashedPassword,
    role,
  });
  return Response.json(adminDoc);
};

export const GET = async () => {
  await mongooseConnect();
  const customersDoc = await User.find({ role: "admin" });
  return Response.json(customersDoc);
};
