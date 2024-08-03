import { User } from "@/models/Users";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const PUT = async (req) => {
    await mongooseConnect();
    const data = await req.json();
    const { fullName, phone, email, streetAddress, city, state } = data;
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    };

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    };

    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.streetAddress = streetAddress || user.streetAddress;
    user.city = city || user.city;
    user.state = state || user.state;

    await user.save();

    return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
}