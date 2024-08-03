import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/Users";

export const GET = async () => {
    await mongooseConnect();
    const customersDoc = await User.find({ role: 'user' });
    return Response.json(customersDoc);
};