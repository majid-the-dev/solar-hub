import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/Users";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    await mongooseConnect();
    const body = await req.json();
    const { password, ...userData} = body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({...userData, password:hashedPassword});
    return Response.json(userDoc);
};